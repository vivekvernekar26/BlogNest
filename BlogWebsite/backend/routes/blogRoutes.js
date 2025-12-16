const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
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

module.exports = router;
