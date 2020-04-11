const { handler } = require("./handler");

module.exports = {
  command: "handler <input> [output]",
  desc: "Convert DeutscheBank transaction export to HomeBank CSV",
  builder: cmd =>
    cmd
      .positional("input", {
        type: "string",
        describe: "Input Deutsche Bank transactions exported CSV"
      })
      .positional("output", {
        default: `./export-${Date.now()}.csv`,
        type: "string",
        describe: "Output file name to be used by HomeBank to import"
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
  handler
};
