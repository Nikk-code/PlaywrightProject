// website used
// https://rahulshettyacademy.com/upload-download-test/index.html


const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');


async function writeExcelTest(searchText, replaceText, change, filePath) {


    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })


    })
    return output;
}
// Update Mango price to 467
// writeExcelTest("Mango", 467, { rowChange: 0, colChange: 2 }, "C:/Newfolder/Testing/playwright/ExcelJSUtil/exceldownloadTest.xlsx");


test("Upload download excel validation", async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    // await page.pause()
    const download = await downloadPromise;
    await download.saveAs(
        "C:/Newfolder/Testing/playwright/practice/Files/download.xlsx"
    );

    // await downloadPromise;


    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:/Newfolder/Testing/playwright/practice/Files/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Newfolder/Testing/playwright/practice/Files/download.xlsx")
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});

