import * as XLSX from 'xlsx';

export function generateExcelReport(dataArray, sheetName = 'Sheet1') {
  const worksheet = XLSX.utils.json_to_sheet(dataArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  return buffer;
}