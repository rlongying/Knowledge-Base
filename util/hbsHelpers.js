const TEXT_ALLOWED_LENGTH = 100;

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

module.exports = {
  ellipsis: ellipsisText
};
