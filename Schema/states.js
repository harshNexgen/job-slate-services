const mongoose = require("mongoose");

const state = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  _class: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
  isFeatured: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  permLink: {
    type: String,
  },
  showOnMainPage: {
    type: Boolean,
  },
});

export const States = mongoose.model("UK_STATE", state);