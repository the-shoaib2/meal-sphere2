import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if the user doesn't exist for security reasons
    if (!user) {
      return NextResponse.json(
        { message: 'If an account with that email exists, you will receive a password reset link.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save the reset token to the database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send email with reset link
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    await resend.emails.send({
      from: 'Meal Sphere <noreply@meal-sphere.vercel.app>',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div>
          <h2>Reset Your Password</h2>
          <p>You requested a password reset. Click the link below to set a new password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'If an account with that email exists, you will receive a password reset link.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}