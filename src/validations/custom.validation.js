const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const mobile = (value, helpers) => {
  if (value.length !== 10) {
    return helpers.message('mobile number must be 10 digits');
  }
  return value;
};

const otp = (value, helpers) => {
  if (value.length !== 6) {
    return helpers.message('otp must be 6 digits');
  }
  return value;
};

module.exports = {
  password,
  mobile,
  otp,
};
