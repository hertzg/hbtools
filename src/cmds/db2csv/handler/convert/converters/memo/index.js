// noinspection JSUnusedLocalSymbols
const convertMemo = (row, context) => {
  const memo = row["Payment Details"];
  return { memo };
};

module.exports = {
  convertMemo
};
