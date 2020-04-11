const FS = require("fs");
const parse = require("csv-parse/lib/sync");
const { convert } = require("./convert");

const parseInput = ({ input }) => {
  const contents = FS.readFileSync(input, { encoding: "utf8" });
  return parse(contents, {
    columns: true,
    delimiter: ";"
  });
};

const writeOutput = ({ output }, data) => {
  const contents = data
    .map(entry => entry.map(s => (Number.isFinite(s) ? s : `"${s}"`)).join(";"))
    .join("\n");

  FS.writeFileSync(output, contents, { encoding: "utf8" });
};

exports.handler = argv => {
  const rows = parseInput(argv);
  const data = convert(argv, rows);
  writeOutput(argv, data);
};
