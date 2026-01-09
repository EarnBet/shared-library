const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function toDateTimeFormat(date: Date): string {
  if (date.constructor.name != "Date") {
    console.log({ typeOfDate: typeof date, class: date.constructor?.name });

    throw new Error("date parameter should be a Date object");
  }

  const parts = date.toString().split(" ");

  const monthName = parts[1];

  const monthIndex = months.indexOf(monthName);

  if (monthIndex < 0) {
    throw new Error("Month NOT Found: " + monthName);
  }

  const monthNum = monthIndex + 1;

  const month: string = (monthNum < 10 ? "0" : "") + monthNum;

  const day = parts[2];
  const year = parts[3];
  const time = parts[4];

  return year + "-" + month + "-" + day + " " + time;
}
