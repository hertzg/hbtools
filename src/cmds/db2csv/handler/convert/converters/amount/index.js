// noinspection JSUnusedLocalSymbols
const convertAmount = (row, context) => {
  const amount = row['Debit'] ? row['Debit'] : row['Credit']
  return { amount }
}

module.exports = {
  convertAmount,
}
