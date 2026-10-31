import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' }, 
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' }, 
        { status: 401 }
      );
    }

    if (user.status === 'Suspended') {
      return NextResponse.json(
        { message: 'Account is suspended. Please contact Factory Admin.' }, 
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' }, 
        { status: 401 }
      );
    }

    const token = generateToken(user);

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Server error during login', error: error.message }, 
      { status: 500 }
    );
  }
}