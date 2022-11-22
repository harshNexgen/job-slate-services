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
        index: true
    },
    categoryId: {
        type: String,
    },
    city: {
        type: String,
        index: true
    },
    cityId: {
        type: String,
    },
    clicks: {
        type: Number,
    },
    company: {
        type: String,
        index: true
    },
    companyId: {
        type: String,
    },
    country: {
        type: String,
        index: true
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
    location: {
        type: String,
        index: true
    },
    postedAt: {
        type: String,
    },
    region: {
        type: String,
        index: true
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