const bcrypt = require("bcrypt");

const hashData = async (data, saltRound = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(data, saltRound);
    return hashedPassword;
  } catch (error) {
    throw Error(error);
  }
};

const verifyHashedData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = { hashData, verifyHashedData };
