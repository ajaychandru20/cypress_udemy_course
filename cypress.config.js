const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const ExcelJS = require('exceljs')
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// ✅ ADD THESE
const { Client } = require("pg");
const fs = require("fs");
const { Workbook } = require("exceljs");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",

    async setupNodeEvents(on, config) {

      // ✅ DB TASK
      on("task", {
        async queryDb(query) {
          require("dotenv").config();
          const client = new Client({
            host: "database-1.ccra6oi4mr7u.us-east-1.rds.amazonaws.com",
            port: 5432,
            user: "postgres",
            password: process.env.DB_PASSWORD, // ✅ BEST PRACTICE
            database: "postgres",
            ssl: {
              rejectUnauthorized: false, // ✅ safer for now
              // OR if you want strict:
              // ca: fs.readFileSync("./global-bundle.pem").toString(),
            },
          });

          await client.connect();
          const res = await client.query(query);
          await client.end();

          return res.rows;
        },
      });

      on('task', {
        async writeTaskExcel({ searchText, replaceText, change, filePath }) {
          const workbook = new ExcelJS.Workbook;
          await workbook.xlsx.readFile(filePath)

          const worksheet = await workbook.getWorksheet("Sheet1")
          const output = readExcelFile(searchText, worksheet)


          if (output.row && output.column) {
            console.log('Found at row:', output.row, '| column:', output.column);
            console.log('Writing to column:', change.columnNumber);
            const cell = worksheet.getCell(output.row, output.column + change.columnNumber);
            cell.value = replaceText;
          } else {
            console.log("Value not found");
          }

          return await workbook.xlsx.writeFile(filePath).then(() => {
            return (output.row, output.column + change.columnNumber);
          }).catch((error) => {

          });


        }
      })

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

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    stepDefinitions: "cypress/support/step_definitions/**/*.cy.js",
  },
});