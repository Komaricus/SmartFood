const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    recommended: {
        type: Array,
        required: true,
    },
    prohibited: {
        type: Array,
        required: true,
    },
    menu: {
        type: Array,
        required: true,
    },
});

mongoose.model('Diet', Schema);
