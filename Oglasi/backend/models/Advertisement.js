const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ['clothing', 'tools', 'sports', 'accessories', 'furniture', 'pets', 'games', 'books', 'technology'],
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    city: { type: String, required: true },
    postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);