const turbinesInformations = [];

const fs = require("fs");
const { parse } = require("csv-parse");

const readTurbinesInformation = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./turbinesInformation.csv")
      .pipe(parse({ columns: true, trim: true }))
      .on("data", (row) => {
        const formattedRow = formatRow(row);
        turbinesInformations.push(formattedRow);
      })
      .on("end", () => {
        console.log("Reading CSV finished");
        resolve(turbinesInformations);
      });
  });
};

function formatRow(row) {
  const formattedRow = {};

  for (const key in row) {
    if (row.hasOwnProperty(key)) {
      const keys = key.split(".");
      keys.reduce((acc, currentKey, index) => {
        if (index === keys.length - 1) {
          if (currentKey.includes("[")) {
            // Handle array notation, e.g., coordinates[0]
            const arrayKey = currentKey.substring(0, currentKey.indexOf("["));
            const arrayIndex = parseInt(currentKey.match(/\[(.*?)\]/)[1], 10);
            if (!acc[arrayKey]) {
              acc[arrayKey] = [];
            }
            acc[arrayKey][arrayIndex] = row[key];
          } else {
            acc[currentKey] = row[key];
          }
        } else {
          if (!acc[currentKey]) {
            acc[currentKey] = {};
          }
        }
        return acc[currentKey];
      }, formattedRow);
    }
  }

  return formattedRow;
}

module.exports = { readTurbinesInformation };
