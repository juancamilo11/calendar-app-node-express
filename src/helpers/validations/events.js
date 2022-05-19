const moment = require("moment");

const isValidDate = (value, rest) => {
  console.log(rest);

  if (!value) {
    return false;
  }

  const date = moment(value);
  if (!date.isValid()) {
    return false;
  }
  return true;
};

module.exports = { isValidDate };
