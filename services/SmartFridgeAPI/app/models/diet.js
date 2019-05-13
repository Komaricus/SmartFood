const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
    },
    rules: {
        type: String
    },
    recommended: {
        type: String
    },
    prohibited: {
        type: String
    },
    menu: {
        type: String
    },
});

mongoose.model('Diet', Schema);