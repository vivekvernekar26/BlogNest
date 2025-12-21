const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPendingPosts,
    approvePost
} = require('../controllers/blogController');

const router = express.Router();

// Public routes
router.route('/')
    .get(getPosts);

router.route('/:id')
    .get(getPost);

// Protected routes (require authentication)
router.use(protect);

router.route('/')
    .post(createPost);

router.route('/:id')
    .patch(updatePost)
    .delete(deletePost);

// Admin routes
router.route('/admin/pending')
    .get(authorize('admin'), getPendingPosts);

router.route('/admin/:id/approve')
    .patch(authorize('admin'), approvePost);

module.exports = router;
