const ExcelJS = require('exceljs')

async function writeExcelFile(findValue, replaceValue) {

    const path = 'cypress/downloads/download.xlsx';
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(path);   // ✅ wait for file

    const worksheet = workbook.getWorksheet('Sheet1');

    const output = readExcelFile(findValue, worksheet);

    if (output.row && output.column) {
        const cell = worksheet.getCell(output.row, output.column);
        cell.value = replaceValue;
    } else {
        console.log("Value not found");
    }

    await workbook.xlsx.writeFile(path);  // ✅ write AFTER update
}

function readExcelFile(findValue, worksheet) {

    const output = { row: null, column: null };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === findValue) {
                output.row = rowNumber;
                output.column = colNumber;

                console.log(`Row: ${rowNumber}, Col: ${colNumber}`);
            }

        });
    });

    return output;
}

writeExcelFile("Mango", "April");