"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var pinSchema = new Schema({
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

var Pin = module.exports = _mongoose2.default.model("Pin", pinSchema);