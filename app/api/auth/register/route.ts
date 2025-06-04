import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      )
    }

    // Hash the password with a higher salt round for better security
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    console.log('Password hashing complete');

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.MEMBER,
      },
    })

    // Don't send back the password hash
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { 
        message: 'Failed to create user',
        // Only include error details in development
        ...(process.env.NODE_ENV === 'development' && { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        })
      },
      { status: 500 }
    )
  }
}
