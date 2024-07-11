const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors());

const authRoute = require('./routes/authRoute')
const enrollRoute = require('./routes/enrollRoute')
const userRoutes = require('./routes/userRoute')

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

const Port = 5000

app.listen(Port , () => {
  console.log(`server is running in ${Port}`);
});


app.use('/apisd/auth', authRoute )
app.use('/apisd/enroll',enrollRoute)
app.use('/apisd/user', userRoutes )


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
  
    res.status(statusCode).json({
      sucess : false,
      statusCode,
      message
    })
  
  }) 