const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A post must have a title'],
        trim: true,
        maxlength: [100, 'A post title must have less or equal then 100 characters']
    },
    content: {
        type: String,
        required: [true, 'A post must have content']
    },
    image: {
        type: String,
        default: 'https://source.unsplash.com/random/800x600?blog'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to a user']
    },
    authorName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
