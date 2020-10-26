const json2entries = require('./json2entries')
const { writeHBCSV } = require('../../../helpers')
const FS = require('fs').promises

const readInput = async ({ input }) => {
  const buffer = await FS.readFile(input)
  return JSON.parse(buffer.toString('utf8'))
}

exports.handler = async (argv) => {
  const json = await readInput(argv)
  const entries = await json2entries(json)
  const lines = entries.map(
    ({ date, paymode, info, payee, memo, amount, category, tags }) => [
      date,
      paymode,
      info,
      payee,
      memo,
      amount,
      category,
      tags,
    ],
  )
  await writeHBCSV(argv.output, lines)
}
