const xlsx = require("xlsx");

const wb = xlsx.readFile("../files/testexcel.xlsx", {
  cellDates: true, // gives date backinjs format
});

// Sheetnames
console.log(wb.SheetNames); // [ 'Sheet1', 'Sheet2Test' ]

// Select Sheet
const ws = wb.Sheets["Sheet1"];

// console.log(ws);

const data = xlsx.utils.sheet_to_json(ws);

// converts excel into data
console.log(data);

const newWB = xlsx.utils.book_new(); // create new excel
const newWS = xlsx.utils.json_to_sheet(data); // creates new sheet
xlsx.utils.book_append_sheet(newWB, newWS, "NEW DATA"); // adds new sheet to work book with name

xlsx.writeFile(newWB, "newDataFile.xlsx"); // creates new file from virtual wb
