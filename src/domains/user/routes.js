const express = require("express");
const router = express.Router();
const User = require("./model");
const { createNewUser, authenticateUser } = require("./controller");
const auth = require("./../../middleware/auth");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;
const loginCheck = require("./../../middleware/loginCheck");

// logout
router.get("/authenticated/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// dasbor
router.get("/authenticated/dashboard", auth, async (req, res) => {
  const data = req.cookies.token;
  const token = await jwt.verify(data, TOKEN_KEY);
  const userToken = token.userId;
  const dataUser = await User.findById(userToken);

  res.status(200).render("index", {
    name: dataUser.name,
  });
});

// login page
router.get("/login", loginCheck, (req, res) => {
  res.status(200).render("login");
});

// login
router.post("/login", async (req, res) => {
  console.log("Someone menembak!");
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!(email && password)) {
      throw Error("Empty Fields!");
    }

    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).cookie("token", authenticatedUser.token, { httpOnly: true, secure: false, sameSite: "lax", path: "/" }).json({ success: true });
  } catch (error) {
    res.status(403).json({ success: false });
  }
});

// Sign up
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name: name.trim();
    email: email.trim();
    password: password.trim();

    if (!(name && email && password)) {
      throw Error("Empty input fields!");
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      throw Error("Invalid name entered!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered!");
    } else if (password.length < 8) {
      throw Error("Password is too short!");
    } else {
      // semua valid? new acc
      const newUser = await createNewUser({ name, email, password });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
