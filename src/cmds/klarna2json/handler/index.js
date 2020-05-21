const transactionResponses = require('./api/transactionResponses')
const FS = require('fs')

const writeOutput = ({ output }, responses) => {
  const contents = JSON.stringify({
    createdAt: (new Date).toISOString(),
    responses
  })
  FS.writeFileSync(output, contents, { encoding: 'utf8' })
}

exports.handler = async (argv) => {
  if (argv.mode === 'single') {
    throw new Error('Single mode is not yet implemented')
  }

  const batches = await transactionResponses(argv)
  writeOutput(argv, batches)
}
