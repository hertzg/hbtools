const CONVERTERS = [
  require("./date").convertDate,
  require("./paymode").convertPaymode,
  require("./info").convertInfo,
  require("./payee").convertPayee,
  require("./memo").convertMemo,
  require("./amount").convertAmount
];

const applyConverter = (converter, value, row, context) => {
  return {
    ...value,
    ...converter(row, context, { ...value })
  };
};

const convertRow = row => {
  let value = {
    date: "",
    paymode: "",
    info: "",
    payee: "",
    memo: "",
    amount: "",
    category: "",
    tags: ""
  };

  const context = {};
  CONVERTERS.forEach(
    converter => (value = applyConverter(converter, value, row, context))
  );

  const { date, paymode, info, payee, memo, amount, category, tags } = value;
  return [date, paymode, info, payee, memo, amount, category, tags];
};

module.exports = {
  CONVERTERS,
  convertRow,
  applyConverter
};
