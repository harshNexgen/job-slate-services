const mongoose = require("mongoose");

const post = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    _class: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    categoryId: {
        type: String,
    },
    city: {
        type: String,
    },
    cityId: {
        type: String,
    },
    clicks: {
        type: Number,
    },
    company: {
        type: String,
    },
    companyId: {
        type: String,
    },
    country: {
        type: String,
    },
    cpc: {
        type: Number,
    },
    date: {
        type: String,
    },
    description: {
        type: String,
    },
    feedId: {
        type: String,
    },
    htmlDescription: {
        type: String,
    },
    isIndexed: {
        type: Boolean,
    },
    jobType: {
        type: Array,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    postedAt: {
        type: String,
    },
    region: {
        type: String,
    },
    salary: {
        type: Object,
    },
    state: {
        type: String,
    },
    stateId: {
        type: String
    },
    timestamp: {
        type: Number
    },
    title: {
        type: String
    },
    url: {
        type: String
    }
});

export const Postings = mongoose.model("UK_JOB_POSTING", post);