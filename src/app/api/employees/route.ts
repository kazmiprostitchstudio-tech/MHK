import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Employee from '@/models/Employee';

export async function GET() {
  try {
    await dbConnect();
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: employees.length, data: employees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newEmployee = await Employee.create(body);
    return NextResponse.json({ success: true, data: newEmployee }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}