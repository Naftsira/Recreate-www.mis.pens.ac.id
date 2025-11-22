const bcrypt = require("bcrypt");

const hashData = async (data, saltRound = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(data, saltRound);
    return hashedPassword;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { hashData };
