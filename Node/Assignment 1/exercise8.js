const xlsx = require('xlsx');

const jsonData = [
    { "name": "Anand", "age": 22, "gender": 0, "city": "Mumbai" },
    { "name": "Bihu", "age": 17, "gender": 1, "city": "Pune" }
];

const sheet = xlsx.utils.json_to_sheet(jsonData);

const excel = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(excel, sheet, 'Sheet1');

xlsx.writeFile(excel, 'output.xlsx');
