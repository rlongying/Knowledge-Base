const TEXT_ALLOWED_LENGTH = 100;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
/**
 * truncate the string and append "..." if the length of text if greater than TEXT_ALLOWED_LENGTH
 * @param {string} text
 */
const ellipsisText = text => {
  let result = " ";

  if (text && typeof text == "string") {
    if (text.length > TEXT_ALLOWED_LENGTH) {
      result = text.substr(0, TEXT_ALLOWED_LENGTH) + "...";
    } else {
      result = text;
    }
  }
  return result;
};

const parseDate = date => {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  date = `${day}  ${MONTHS[month]}, ${year}`;
  return date;
};

module.exports = {
  ellipsis: ellipsisText,
  parseDate: parseDate
};
