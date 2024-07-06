const userdata = require("../models/userModels");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "all fields are required"));
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new userdata({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("new user data saved");
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(409, "Email already exists"));
    }
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const validUser = await userdata.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_Token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
