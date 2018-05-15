import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pinSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  text: String,
  user: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Array,
    default: []
  }
});

let Pin = (module.exports = mongoose.model("Pin", pinSchema));
