import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';
import { NextResponse } from 'next/server';

// GET: Fetch all employees list
export async function GET() {
  try {
    await dbConnect();
    const employees = await Employee.find({}).populate('user', 'name email role status');
    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching employees', error: error.message }, 
      { status: 500 }
    );
  }
}

// POST: Add new employee profile
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newEmployee = await Employee.create(body);

    return NextResponse.json({
      message: 'Employee record created successfully',
      employee: newEmployee
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating employee profile', error: error.message }, 
      { status: 500 }
    );
  }
}