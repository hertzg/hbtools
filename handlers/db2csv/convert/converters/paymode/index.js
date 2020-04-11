const PAYMODE_NONE = 0;
const PAYMODE_CASH = 3;
const PAYMODE_TRANSFER = 4;
const PAYMODE_DEBIT_CARD = 6;
const PAYMODE_STANDING_ORDER = 7;
const PAYMODE_DEPOSIT = 9;
const PAYMODE_DIRECT_DEBIT = 11;

const convertPaymode = row => {
  const paymode = (row => {
    switch (row["Transaction Type"]) {
      case "Debit Card Payment":
        return PAYMODE_DEBIT_CARD; // Debit Card
      case "Cash Deposit":
        return PAYMODE_DEPOSIT; // Deposit
      case "Cash Withdrawal":
        return PAYMODE_CASH; // Cash
      case "SEPA-Credit Transfer":
        return PAYMODE_TRANSFER; // Transfer
      case "SEPA-Direct Debit":
      case "SEPA-Direct Debit (ELV)":
        return PAYMODE_DIRECT_DEBIT; // Direct Debit
      case "SEPA-Standing Order":
        return PAYMODE_STANDING_ORDER; // Standing Order
      default:
        return PAYMODE_NONE;
    }
  })(row);

  return { paymode };
};

module.exports = {
  PAYMODE_NONE,
  PAYMODE_CASH,
  PAYMODE_TRANSFER,
  PAYMODE_DEBIT_CARD,
  PAYMODE_STANDING_ORDER,
  PAYMODE_DEPOSIT,
  PAYMODE_DIRECT_DEBIT,
  convertPaymode
};
