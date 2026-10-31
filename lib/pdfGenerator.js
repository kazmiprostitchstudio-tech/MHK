import PDFDocument from 'pdfkit';

export async function generateExperienceLetter(employee) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers = [];

      doc.on('data', (data) => buffers.push(data));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // --- Header Section ---
      doc.fillColor('#1A365D')
         .fontSize(24)
         .text('SHAH EMBROIDERY', { align: 'center' });

      doc.fontSize(9)
         .fillColor('#718096')
         .text('Precision in Every Stitch | Royal Perfection in Every Thread', { align: 'center' });

      doc.moveDown(0.5);
      doc.strokeColor('#CBD5E0').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1.5);

      // --- Document Title ---
      doc.fillColor('#2B6CB0')
         .fontSize(16)
         .text('EXPERIENCE & SERVICE CERTIFICATE', { align: 'center', underline: true });

      doc.moveDown(2);

      // --- Date ---
      const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      doc.fontSize(10).fillColor('#2D3748').text(`Date: ${today}`, { align: 'right' });
      doc.moveDown(1.5);

      // --- Certificate Body ---
      doc.fontSize(11).fillColor('#2D3748').lineGap(8);
      doc.text('TO WHOM IT MAY CONCERN', { underline: true });
      doc.moveDown(1);

      const joiningDateStr = new Date(employee.joiningDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      const endingDateStr = employee.endingDate 
        ? new Date(employee.endingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Present';

      doc.text(
        `This is to certify that Mr. ${employee.name}, S/O ${employee.fatherName} (CNIC: ${employee.cnic}), has been employed with Shah Embroidery as a ${employee.role} from ${joiningDateStr} to ${endingDateStr}.`
      );

      doc.moveDown(0.8);
      doc.text(
        `During his tenure with Shah Embroidery, we found him to be hard-working, punctual, and dedicated to his duties. His technical skills and professional conduct were highly satisfactory.`
      );

      doc.moveDown(0.8);
      doc.text(
        `We appreciate his valuable contribution to our factory operations and wish him success in all his future endeavors.`
      );

      doc.moveDown(4);

      // --- Signatures Footer ---
      const currentY = doc.y;
      doc.fontSize(10).text('____________________', 50, currentY);
      doc.text('Authorized Signature', 50, currentY + 15);

      doc.text('____________________', 370, currentY);
      doc.text('Shah Embroidery Management', 350, currentY + 15);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}