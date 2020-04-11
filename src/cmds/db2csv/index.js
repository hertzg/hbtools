const { handler } = require('./handler')

module.exports = {
  command: 'db2csv <input> [output]',
  desc: 'Convert DeutscheBank transaction export to HomeBank CSV',
  builder: (cmd) =>
    cmd
      .example(
        '$0 db2csv ./Transactions.csv',
        'converts Transactions.csv to transactions-{timestamp}.csv in the current working directory',
      )
      .example(
        '$0 db2csv ./Transactions.csv ./transactions-last-180-days.csv',
        'converts Transactions.csv to transactions-last-180-days.csv in the current working directory',
      )
      .positional('input', {
        type: 'string',
        describe: 'Deutsche Bank transactions CSV file',
      })
      .positional('output', {
        default: `./transactions-${Date.now()}.csv`,
        type: 'string',
        describe: 'File name to write the homebank csv import file to',
      })
      .option('encoding', {
        choices: ['windows-1252', 'utf8'],
        type: 'string',
        default: 'windows-1252',
        describe:
          'Convert input file from the requested character encoding to utf8. Uses windows-1252 by default.',
      })
      .option('from-line', {
        describe:
          'Define line where the records headers start at. Skips first 4 summary lines by default.',
        type: 'number',
        default: 5,
      })
      .option('skip-bad-lines', {
        describe:
          'Skips the records containing an error inside and directly go process the next record.',
        type: 'boolean',
        default: false,
      }) /*
      .option("klarna", {
        type: "boolean",
        default: false,
        describe: "Map Klarna transaction information from JSON file",
        implies: ["klarna-json-path"]
      })
      .option("klarna-json-path", {
        type: "string",
        describe: "JSON file containing all pages of transactions page"
      })*/,
  handler,
}
