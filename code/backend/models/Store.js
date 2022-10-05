const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true,
        required: true
    },
    sundayOpen: {
        type: String
    },
    sundayClose: {
        type: String
    },
    weekdayOpen: {
        type: String
    },
    weekdayClose: {
        type: String
    }
});

module.exports = Store = mongoose.model('store', StoreSchema);