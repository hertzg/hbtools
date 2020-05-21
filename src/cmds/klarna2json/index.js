const { handler } = require('./handler')

module.exports = {
  command: 'klarna2json <token> <output>',
  desc: 'Downloads Klarna transactions locally',
  builder: (cmd) =>
    cmd
      .parserConfiguration({
        'camel-case-expansion': false,
      })
      .example(
        '$0 klarna2json <token> <output>',
        'downloads Klarna transaction into a json format',
      )
      .positional('token', {
        type: 'string',
        describe: 'Authorization bearer token',
      })
      .positional('output', {
        default: `./klarna.json`,
        type: 'string',
        describe: 'File name to write the result & responses to',
      })
      .option('mode', {
        choices: ['batch', 'single'],
        default: 'batch',
        type: 'string',
        describe: 'Run a single request or collect transaction in batches',
      })
      .option('api.url', {
        default: 'https://app.klarna.com/de/api/orders_bff/v1/transactions',
        type: 'string',
      })
      .option('params.limit', {
        default: null,
        type: 'string',
        describe: 'Defines number of transactions to load per request',
      })
      .option('params.filter', {
        choices: ['all', 'klarnaCard'],
        default: 'all',
        type: 'string',
        describe: 'Loads all or only Klarna Card transactions',
      })
      .option('params.offset', {
        default: 0,
        type: 'number',
      })
      .option('params.useOTP', {
        default: true,
        type: 'boolean',
      }),
  handler: (...params) =>
    handler(...params).catch((err) => {
      throw err
    }),
}
