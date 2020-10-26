const { handler } = require('./handler')

module.exports = {
  command: 'json2csv <input> <output>',
  desc: 'Downloads Klarna transactions locally',
  builder: (cmd) =>
    cmd
      .parserConfiguration({
        'camel-case-expansion': false,
      })
      .example(
        '$0 json2csv <input> <output>',
        'coverts downloaded Klarna JSON file into HomeBank csv format',
      )
      .positional('input', {
        default: `./klarna.json`,
        type: 'string',
        describe: 'Klarna json file downloaded by klarna2json',
      })
      .positional('output', {
        default: `./klarna.csv`,
        type: 'string',
        describe: 'File name to write the resulting CSV to',
      }),
  handler: (...params) =>
    handler(...params).catch((err) => {
      throw err
    }),
}
