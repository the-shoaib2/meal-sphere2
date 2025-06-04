# Authentication Setup

This document outlines the authentication setup for the MealSphere application using NextAuth.js with Google OAuth and email/password credentials.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_mongodb_connection_string"
MONGODB_DB="meal-sphere"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"    # Update in production

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Session
SESSION_SECRET="your_session_secret"

# Production (update these in production)
NODE_ENV="development"
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://your-production-domain.com`
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-production-domain.com/api/auth/callback/google`
8. Save and note the Client ID and Client Secret

## Features

- **Google OAuth**: Sign in with Google
- **Email/Password**: Traditional email and password authentication
- **Protected Routes**: Middleware to protect routes
- **Session Management**: JWT-based session management
- **Password Hashing**: Secure password hashing with bcrypt

## Available Authentication Methods

### 1. Google Sign-In

```tsx
// Example usage in a component
import { signIn } from 'next-auth/react';

<button onClick={() => signIn('google')}>
  Sign in with Google
</button>
```

### 2. Email/Password Sign-In

```tsx
// Example form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
  
  if (result?.error) {
    // Handle error
  } else {
    // Handle success
  }
};
```

## Protected Routes

Use the `getServerSession` function to protect server components:

```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { redirect: { destination: '/login' } };
  }
  
  return <div>Protected Content</div>;
}
```

## Session Management

Access the session in client components:

```tsx
'use client';

import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { data: session } = useSession();
  
  if (!session) return <div>Not signed in</div>;
  
  return (
    <div>
      <p>Signed in as {session.user?.email}</p>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Google OAuth Error: redirect_uri_mismatch**
   - Ensure the redirect URI in Google Cloud Console matches exactly with your application URL
   - Include the full callback URL: `https://your-domain.com/api/auth/callback/google`

2. **Database Connection Issues**
   - Verify your MongoDB connection string
   - Ensure the database is running and accessible

3. **Environment Variables Not Loading**
   - Ensure the `.env` file is in the root directory
   - Restart your development server after modifying environment variables

## Security Considerations

- Always use HTTPS in production
- Keep your environment variables secure and never commit them to version control
- Use strong session secrets
- Implement rate limiting for authentication endpoints
- Regularly update dependencies to patch security vulnerabilities
