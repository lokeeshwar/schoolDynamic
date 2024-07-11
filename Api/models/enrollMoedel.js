const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    batch:{
        type: String,
        default : 'Batch-1'
    },
    youTubeAccount : {
        type : String,
    },
    instagramAccount : {
        type : String,
    },
    whyAreYouIntrested : {
        type : String,
    },
  },
  {
    timestamps: true,
  }
);

const enrollData = mongoose.model("enrollData", enrollSchema);

module.exports = enrollData;
