const ExcelJS = require('exceljs')

class Excel {


    visitDownloadExcel() {
        cy.visit("https://rahulshettyacademy.com/upload-download-test/")
        cy.get('[id="downloadButton"]').click()
    }

    readExcelFile() {
        const path = 'cypress/downloads/download.xlsx';
        const workbook = new ExcelJS.Workbook();

        workbook.xlsx.readFile(path).then((workbook) => {
            const worksheet = workbook.getWorksheet('Sheet1');

            worksheet.eachRow((row, rowNumber) => {
                row.eachCell((cell, colNumber) => {

                    if (cell.value === 'Mango') {
                        console.log(rowNumber, colNumber);
                        cy.log(`Row: ${rowNumber}, Col: ${colNumber}`);
                    }

                });
            });
        });
    }

    uploadExcelfile(searchTextValue,replaceValue){
         cy.get('[id="fileinput"]').selectFile('cypress/downloads/download.xlsx')
         cy.contains(searchTextValue).parent().parent().find('[id="cell-4-undefined"]').should('contain',replaceValue)   

    }


}
export const excel = new Excel()