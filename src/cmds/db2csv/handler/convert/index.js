const { convertRow } = require("./converters");

exports.convert = (args, rows) => {
  return [
    ["date", "paymode", "info", "payee", "memo", "amount", "category", "tags"],
    ...rows.map(convertRow)
  ];
};
