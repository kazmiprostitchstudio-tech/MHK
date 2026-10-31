import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';

export async function POST(req: Request) {
  try {
    const { name, role } = await req.json();

    const doc = new jsPDF();

    // 🏆 Header & Branding
    doc.setFontSize(22);
    doc.setTextColor(217, 119, 6); // Amber Gold Color
    doc.text("SHAH EMBROIDERY", 105, 25, { align: "center" });
    
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("PRECISION IN EVERY STITCH | OFFICIAL EXPERIENCE CERTIFICATE", 105, 32, { align: "center" });

    // Decorative Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(217, 119, 6);
    doc.line(20, 38, 190, 38);

    // Certificate Title
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text("TO WHOM IT MAY CONCERN", 105, 55, { align: "center" });

    // Certificate Body Text
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    
    const bodyText = `This is to certify that Mr. ${name || 'Worker'} has been an active and valued employee at Shah Embroidery, serving in the capacity of ${role || 'Employee'}.\n\n` +
      `During their tenure with us, we found them to be industrious, punctual, and dedicated to maintaining high-quality standards in factory embroidery operations.\n\n` +
      `We appreciate their contributions to our team and wish them continued success in all their future professional endeavors.`;

    const formattedText = doc.splitTextToSize(bodyText, 160);
    doc.text(formattedText, 25, 75);

    // Issue Date & Signature Section
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Date of Issuance: ${currentDate}`, 25, 140);

    doc.text("Authorized Signature:", 130, 160);
    doc.setFontSize(12);
    doc.setTextColor(217, 119, 6);
    doc.text("Shah Embroidery Management", 130, 170);

    // Generate ArrayBuffer for response
    const pdfBuffer = doc.output('arraybuffer');

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${(name || 'Employee').replace(/\s+/g, '_')}_Experience_Letter.pdf"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}