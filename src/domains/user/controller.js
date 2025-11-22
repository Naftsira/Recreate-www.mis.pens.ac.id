const User = require("./model");
const { hashData } = require("./../../util/hashData");

const createNewUser = async (data) => {
  try {
    const { name, email, password } = data;

    // cek user
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw Error("User Sudah ada mas");
    }
    // hash
    const hashedPassword = await hashData(password);

    //   add
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // save
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser };
