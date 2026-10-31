import dbConnect from '@/lib/db';
import Production from '@/models/Production';
import { NextResponse } from 'next/server';

// GET: Fetch daily production logs
export async function GET() {
  try {
    await dbConnect();
    const logs = await Production.find({})
      .populate('operator', 'name phone')
      .populate('machine', 'machineNumber model')
      .sort({ createdAt: -1 });

    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching production logs', error: error.message }, 
      { status: 500 }
    );
  }
}

// POST: Employee enters daily stitch & machine output
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { jobOrderNo, designName, stitchCount, machine, operator, totalStitchesRun, totalGarments, shift } = body;

    if (!jobOrderNo || !designName || !stitchCount || !machine || !operator || !totalStitchesRun) {
      return NextResponse.json(
        { message: 'All required production fields must be provided' }, 
        { status: 400 }
      );
    }

    const newProductionLog = await Production.create({
      jobOrderNo,
      designName,
      stitchCount,
      machine,
      operator,
      totalStitchesRun,
      totalGarments: totalGarments || 0,
      shift: shift || 'Day'
    });

    return NextResponse.json({
      message: 'Daily production entry saved successfully',
      log: newProductionLog
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error logging daily production', error: error.message }, 
      { status: 500 }
    );
  }
}