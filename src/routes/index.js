const express = require("express");
const router = express.Router();

const userRoutes = require("./../domains/user");

router.use("/", userRoutes);
router.use("/", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
