const fs = require('fs');
const xlsx = require('xlsx');

function readExcelToJson(fileName) {
    const workbook = xlsx.readFile(fileName);
    const sheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    console.log(jsonData);
}

readExcelToJson('./lib/marks.xlsx');
