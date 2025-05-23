import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession, type DefaultSession, type DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { PrismaClient, Role } from "@prisma/client"
import NextAuth from "next-auth"

const prisma = new PrismaClient()

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: Role;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

// Helper to get the correct URL based on environment
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Automatically set by Vercel
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  return 'http://localhost:3000';
};

const baseUrl = getBaseUrl();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log('Authorization attempt for email:', credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing email or password');
            throw new Error("Email and password are required");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          console.log('User found in database:', user ? 'Yes' : 'No');
          
          if (!user) {
            console.log('No user found with email:', credentials.email);
            throw new Error("Invalid email or password");
          }

          if (!user.password) {
            console.log('User has no password (possibly signed up with OAuth)');
            throw new Error("Please sign in using the method you used to register");
          }

          console.log('Comparing passwords...');
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log('Password valid:', isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || Role.MEMBER,
          };
        } catch (error) {
          console.error('Error in authorize:', error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    // You can add more JWT options here if needed
  },
  events: {
    async signIn({ user }) {
      console.log('User signed in:', user?.email);
    },
    async signOut({ token }) {
      console.log('User signed out:', token?.email);
    }
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || Role.MEMBER;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        try {
          const email = user.email;
          if (!email) return false;

          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email,
                name: user.name || (profile as any).name || email.split('@')[0],
                image: user.image || (profile as any).picture,
                role: Role.MEMBER,
                emailVerified: new Date(),
              },
            });
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  debug: true, // Enable debug in production to help diagnose issues
  logger: {
    error(code, metadata) {
      console.error('Auth error:', { code, metadata });
    },
    warn(code) {
      console.warn('Auth warning:', code);
    },
    debug(code, metadata) {
      console.log('Auth debug:', { code, metadata });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.meal-sphere.vercel.app' : undefined
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export const getServerAuthSession = () => getServerSession(authOptions)
