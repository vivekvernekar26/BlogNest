// In-memory storage for blog posts
let posts = [];
let postIdCounter = 1;

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: {
            posts
        }
    });
};

// @desc    Get single blog post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
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
};

// @desc    Create a blog post
// @route   POST /api/posts
// @access  Private
exports.createPost = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'You need to be logged in to create a post'
        });
    }

    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide title and content'
        });
    }

    const newPost = {
        id: postIdCounter++,
        title,
        content,
        author: req.user.id,
        authorName: req.user.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    posts.unshift(newPost); // Add to beginning of array (newest first)

    res.status(201).json({
        status: 'success',
        data: {
            post: newPost
        }
    });
};

// @desc    Update a blog post
// @route   PATCH /api/posts/:id
// @access  Private
exports.updatePost = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'You need to be logged in to update a post'
        });
    }

    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    if (!post) {
        return res.status(404).json({
            status: 'error',
            message: 'No post found with that ID'
        });
    }

    // Check if the user is the author
    if (post.author !== req.user.id) {
        return res.status(403).json({
            status: 'error',
            message: 'You are not authorized to update this post'
        });
    }

    const { title, content } = req.body;
    
    if (title) post.title = title;
    if (content) post.content = content;
    post.updatedAt = new Date().toISOString();

    res.status(200).json({
        status: 'success',
        data: {
            post
        }
    });
};

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            message: 'You need to be logged in to delete a post'
        });
    }

    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'No post found with that ID'
        });
    }

    // Check if the user is the author
    if (posts[postIndex].author !== req.user.id) {
        return res.status(403).json({
            status: 'error',
            message: 'You are not authorized to delete this post'
        });
    }

    posts.splice(postIndex, 1);

    res.status(204).json({
        status: 'success',
        data: null
    });
};
