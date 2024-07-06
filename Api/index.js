const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json())

const authRoute = require('./routes/authRoute')

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(
    DB
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });



app.listen(3000, () => {
  console.log("server is running");
});


app.use('/apisd/auth', authRoute )


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
  
    res.status(statusCode).json({
      sucess : false,
      statusCode,
      message
    })
  
  }) 