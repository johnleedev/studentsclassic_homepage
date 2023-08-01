/*eslint-disable*/
let sundaylist = []

const currentYear = new Date().getFullYear();

const getSundaysInYear = (year) => {
  const sundays = [];
  const date = new Date(year, 0, 1);
  while (date.getFullYear() === year) {
    if (date.getDay() === 0) {
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString().padStart(2, "0");
      sundays.push({ month, day });
    }
    date.setDate(date.getDate() + 1);
  }
  return sundays;
};

sundaylist = getSundaysInYear(currentYear)

export default sundaylist;
