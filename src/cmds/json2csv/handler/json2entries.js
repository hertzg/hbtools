const convertDate = (string) => {
  const dt = new Date(string)
  return [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-')
}

const covertAmount = (number) => number / 100

const PAYMODE_NONE = 0
const PAYMODE_CREDIT_CARD = 1
const PAYMODE_TRANSFER = 4
const PAYMODE_DEBIT_CARD = 6
const PAYMODE_DIRECT_DEBIT = 11

const findTraitByType = (t, type) =>
  t.traits.find((trait) => trait.type === type)

const getPaymentStatus = (t) => {
  const paymentStatus = findTraitByType(t, 'paymentStatus')
  if (paymentStatus) {
    return paymentStatus.status
  }

  const returned = findTraitByType(t, 'returned')
  if (returned) {
    return 'returned'
  }

  return 'unknown'
}

const isPaid = (t) => getPaymentStatus(t) === 'paid'

const findPaidAt = (t) => {
  const events = findTraitByType(t, 'historyEvents')
  if (!events) {
    return null
  }

  const paymentConfirmation = events.history.find(
    (event) => event.type === 'payment_confirmed',
  )
  if (!paymentConfirmation) {
    return null
  }

  return paymentConfirmation.occurredAt
}

const findPaymentReference = (t) => {
  const paymentMethod = findTraitByType(t, 'paymentMethod')
  if (!paymentMethod) {
    return null
  }
  return paymentMethod.paymentReference
}

const createEntry = (
  paymode,
  date,
  amount,
  { info = '', payee = '', memo = '', category = '', tags = '' },
) => ({
  date,
  paymode,
  info,
  payee,
  memo: memo != null ? memo : info,
  amount,
  category,
  tags: Array.isArray(tags) ? tags.join(' ') : tags != null ? tags : '',
})

const createCreditCardEntry = (date, amount, extra = {}) =>
  createEntry(PAYMODE_CREDIT_CARD, date, amount, extra)

const createTransferEntry = (date, amount, extra = {}) =>
  createEntry(PAYMODE_TRANSFER, date, amount, extra)

const processExpense = (t) => {
  const entries = [
    createCreditCardEntry(
      convertDate(t.createdAt),
      covertAmount(t.totalAmount.amount),
      {
        payee: t.description,
      },
    ),
  ]

  if (!!findPaymentReference(t) || isPaid(t)) {
    const paidAt = findPaidAt(t)
    const paymentReference = findPaymentReference(t)
    entries.push(
      createTransferEntry(
        convertDate(paidAt ? paidAt : t.createdAt),
        -covertAmount(t.totalAmount.amount),
        {
          memo: `Payment for ${
            paymentReference ? paymentReference : t.description
          }`,
          info: t.description,
        },
      ),
    )
  }

  return entries
}

const processIncome = (t) => {
  const {
    totalAmount: { amount },
  } = t

  return [
    createTransferEntry(convertDate(t.createdAt), covertAmount(amount), {
      payee: t.description,
      info: t.description,
    }),
    createTransferEntry(convertDate(t.createdAt), -covertAmount(amount), {
      memo: 'Transfer positive balance to linked bank account',
      info: t.description,
    }),
  ]
}

const processTransaction = (t) => {
  const entries = []

  const {
    totalAmount: { amount },
  } = t

  if (amount < 0) {
    entries.push(...processExpense(t))
  } else if (amount > 0) {
    entries.push(...processIncome(t))
  }

  return entries
}

module.exports = async (root) => {
  const { responses } = root

  return responses.flatMap((batch) =>
    batch.transactions.flatMap(processTransaction),
  )
}
