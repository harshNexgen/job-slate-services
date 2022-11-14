const mongoose = require("mongoose");

const jobHistory = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  _class: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
  },
  cityId: {
    type: String,
  },
  companyId: {
    type: String,
  },
  expDate: {
    type: Number,
  },
  region: {
    type: String,
  },
  stateId: {
    type: String,
  },
  title: {
    type: String,
  },
});

export const JobHistories = mongoose.model("JOB_HISTORIE", jobHistory);