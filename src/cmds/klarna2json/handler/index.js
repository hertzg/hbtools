const batch = require('./api/batch')
const FS = require('fs')

const writeOutput = ({ output }, data) => {
  const contents = JSON.stringify(data)
  FS.writeFileSync(output, contents, { encoding: 'utf8' })
}

exports.handler = async (argv) => {
  if (argv.mode === 'single') {
    throw new Error('Single mode is not yet implemented')
  }

  const batches = await batch(argv)
  writeOutput(argv, JSON.stringify(batches))
}
