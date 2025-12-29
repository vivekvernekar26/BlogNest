const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getMyPosts
} = require('../controllers/blogController');

const router = express.Router();

// Specific routes must come before generic :id routes
router.get('/my-posts', protect, getMyPosts);

// Public routes
router.route('/')
    .get(getPosts);

router.route('/:id')
    .get(getPost);

// Protected routes (require authentication)
router.use(protect);


router.route('/')
    .post(upload.single('image'), createPost);

router.route('/:id')
    .patch(upload.single('image'), updatePost)
    .delete(deletePost);

// Admin routes removed

module.exports = router;
