const FS = require('fs').promises

const writeHBCSV = async (output, entries) => {
  const contents = [
    ['date', 'paymode', 'info', 'payee', 'memo', 'amount', 'category', 'tags'],
    ...entries,
  ]
    .map((entry) =>
      entry.map((s) => (Number.isFinite(s) ? s : `"${s}"`)).join(';'),
    )
    .join('\n')

  await FS.writeFile(output, contents, { encoding: 'utf8' })
}

module.exports = {
  writeHBCSV,
}
