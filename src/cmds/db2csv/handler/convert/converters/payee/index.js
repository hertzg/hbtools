const { PAYMODE_DEBIT_CARD } = require("../paymode");

const convertPayee = (row, context, value) => {
  let payee = row["Beneficiary / Originator"];

  if (!payee) {
    if (value.paymode === PAYMODE_DEBIT_CARD) {
      const vendorMatch = /^([^\/]*)\/\/.+$/i.exec(value.info);
      if (vendorMatch) {
        payee = vendorMatch[1];
      }
    }
  }

  return { payee };
};

module.exports = {
  convertPayee
};
