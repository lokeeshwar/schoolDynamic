const enrollData = require('../models/enrollMoedel')
const errorHandler = require("../utils/error");


const enrollup = async (req, res, next) => {
    const { username, email, phoneNumber,youTubeAccount,instagramAccount,whyAreYouIntrested } = req.body;
    if (
      !username ||
      !phoneNumber ||
      !email ||
      username === "" ||
      email === "" ||
      phoneNumber === ""
    ) {
      next(errorHandler(400, "all fields are required"));
    }
  
    const newUserEnroll = new enrollData({
      username,
      email,
      phoneNumber,
      youTubeAccount,
      instagramAccount,
      whyAreYouIntrested
    });
  
    try {
      await newUserEnroll.save();
      res.json("new user enroll data saved");
    } catch (error) {
      if (error.code === 11000) {
        return next(errorHandler(409, "Email already exists"));
      }
      next(error);
    }
  };


  module.exports = {enrollup};