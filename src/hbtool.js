const Yargs = require("yargs");

Yargs(process.argv.slice(2), process.cwd())
  .version()
  .commandDir("cmds")
  .demandCommand()
  .help()
  .parse();
