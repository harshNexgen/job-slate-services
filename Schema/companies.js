const mongoose = require("mongoose");

const company = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _class: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    companyDetails: {
        type: Object,
    },
    companyLogo: {
        type: String,
    },
    count: {
        type: Number,
    },
    coverPic: {
        type: String,
    },
    description: {
        type: String,
    },
    headQuarters: {
        type: String,
    },
    isMapped: {
        type: Boolean,
    },
    permLink: {
        type: String,
    },
    showOnMainPage: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    tagline: {
        type: String,
    },
    url: {
        type: String,
    },
});


export const Companies = mongoose.model("UK_COMPANIE", company);