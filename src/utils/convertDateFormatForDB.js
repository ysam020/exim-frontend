export function convertDateFormatForDB(dateString) {
  const [year, month, day] = dateString?.split("-");
  const formattedDate = `${day}.${month}.${year.slice(-2)}`;
  return formattedDate;
}
