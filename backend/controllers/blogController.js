const Post = require('../models/postModel');

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// @desc    Get single blog post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'No post found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// @desc    Create a blog post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                message: 'You need to be logged in to create a post'
            });
        }

        const { title, content } = req.body;

        let image = req.body.image; // Fallback to URL if provided
        if (req.file) {
            image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        if (!title || !content) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide title and content'
            });
        }

        const newPost = await Post.create({
            title,
            content,
            image,
            author: req.user.id,
            authorName: req.user.name
        });

        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// @desc    Update a blog post
// @route   PATCH /api/posts/:id
// @access  Private
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'No post found with that ID'
            });
        }

        // Check if the user is the author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to update this post'
            });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                post: updatedPost
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'No post found with that ID'
            });
        }

        // Check if the user is the author
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to delete this post'
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};

// @desc    Get posts by current user
// @route   GET /api/posts/my-posts
// @access  Private
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
};
