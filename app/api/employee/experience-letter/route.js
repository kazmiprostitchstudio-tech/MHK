import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';
import { generateExperienceLetter } from '@/lib/pdfGenerator';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const { employeeId, endingDate, status } = await req.json();

    if (!employeeId) {
      return NextResponse.json({ message: 'Employee ID is required' }, { status: 400 });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return NextResponse.json({ message: 'Employee record not found' }, { status: 404 });
    }

    // Update status and ending date if employee is leaving
    if (endingDate) employee.endingDate = new Date(endingDate);
    if (status) employee.status = status;
    employee.experienceLetterGenerated = true;
    await employee.save();

    // Generate PDF Buffer
    const pdfBuffer = await generateExperienceLetter(employee);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Experience_Letter_${employee.name.replace(/\s+/g, '_')}.pdf`,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error generating experience letter', error: error.message },
      { status: 500 }
    );
  }
}