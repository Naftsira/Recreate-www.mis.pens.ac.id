const User = require("./model");
const { hashData, verifyHashedData } = require("./../../util/hashData");
const createToken = require("./../../util/createToken");
const authenticateUser = async (data) => {
  try {
    const { email, password } = data;

    const fetchedUser = await User.findOne({ email });

    if (!fetchedUser) {
      throw Error("Invalid Credentials!");
    }

    const hashedPassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      throw Error("Invalid Password!");
    }
    // create JWToken
    const tokenData = { userId: fetchedUser._id };
    const token = await createToken(tokenData);

    // assign token to user db
    fetchedUser.token = token;
    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

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

module.exports = { createNewUser, authenticateUser };
