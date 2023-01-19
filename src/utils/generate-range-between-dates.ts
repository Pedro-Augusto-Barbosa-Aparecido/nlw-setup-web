import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDarOfYear = dayjs().startOf("year");
  const today = new Date();

  const dates = [];
  let compareDate = firstDarOfYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());

    compareDate.add(1, "day");
  }

  return dates;
}