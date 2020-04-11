const convertDate = (row, context) => {
  const [m, d, y] = row["Booking date"].split("/");
  context.m = m;
  context.d = d;
  context.y = y;

  const date = `${y}-${m}-${d}`;
  context.date = date;

  return { date };
};

module.exports = {
  convertDate
};
