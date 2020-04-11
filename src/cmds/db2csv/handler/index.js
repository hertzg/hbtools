const FS = require('fs')
const parse = require('csv-parse/lib/sync')
const { convert } = require('./convert')
const Encoding = require('encoding')

const readFile = ({ input, encoding }) => {
  const buffer = FS.readFileSync(input)
  let contents = buffer

  if (encoding !== 'utf8') {
    contents = Encoding.convert(buffer, 'utf8', encoding)
  }

  return contents.toString()
}

const parseInput = (argv) => {
  const contents = readFile(argv),
    lastLine = contents.split('\n').length - 1,
    toLine = lastLine - 1

  return parse(contents, {
    columns: true,
    delimiter: ';',
    from_line: argv.fromLine,
    to_line: toLine,
    skip_lines_with_error: argv.skipBadLines,
  })
}

const writeOutput = ({ output }, data) => {
  const contents = data
    .map((entry) =>
      entry.map((s) => (Number.isFinite(s) ? s : `"${s}"`)).join(';'),
    )
    .join('\n')

  FS.writeFileSync(output, contents, { encoding: 'utf8' })
}

exports.handler = (argv) => {
  const rows = parseInput(argv)
  const data = convert(argv, rows)
  writeOutput(argv, data)
}
