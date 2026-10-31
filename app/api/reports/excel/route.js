import dbConnect from '@/lib/db';
import Production from '@/models/Production';
import { generateExcelReport } from '@/lib/excelGenerator';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const logs = await Production.find({})
      .populate('operator', 'name')
      .populate('machine', 'machineNumber')
      .sort({ createdAt: -1 })
      .lean();

    const formattedData = logs.map((log) => ({
      Date: new Date(log.date).toLocaleDateString(),
      JobOrderNo: log.jobOrderNo,
      DesignName: log.designName,
      StitchCount: log.stitchCount,
      Machine: log.machine?.machineNumber || 'N/A',
      Operator: log.operator?.name || 'N/A',
      TotalStitchesRun: log.totalStitchesRun,
      TotalGarments: log.totalGarments,
      Shift: log.shift,
    }));

    const excelBuffer = generateExcelReport(formattedData, 'Daily_Production');

    return new Response(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=Production_Report.xlsx',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error generating Excel report', error: error.message }, 
      { status: 500 }
    );
  }
}