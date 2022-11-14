const mongoose = require("mongoose");

const category = new mongoose.Schema({
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
    type: Number,
  },
  permLink: {
    type: String,
  },
  showOnMainPage: {
    type: Boolean,
  },
});

export const Categories = mongoose.model("UK_CATEGORIE", category);