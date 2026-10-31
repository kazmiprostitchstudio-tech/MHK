import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';
import { NextResponse } from 'next/server';

// GET: Fetch all customers & pending balance ledger
export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({}).populate('user', 'email status');
    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching customer ledger', error: error.message }, 
      { status: 500 }
    );
  }
}

// POST: Add new customer profile
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { companyName, contactPerson, phone, address, pendingBalance } = body;

    if (!companyName || !contactPerson || !phone) {
      return NextResponse.json(
        { message: 'Company name, contact person, and phone are required' }, 
        { status: 400 }
      );
    }

    const newCustomer = await Customer.create({
      companyName,
      contactPerson,
      phone,
      address,
      pendingBalance: pendingBalance || 0
    });

    return NextResponse.json({
      message: 'Customer profile created successfully',
      customer: newCustomer
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating customer record', error: error.message }, 
      { status: 500 }
    );
  }
}