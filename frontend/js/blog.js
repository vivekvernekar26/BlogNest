// API base URL
const API_URL = 'http://localhost:5000/api';

// DOM Elements
const postsGrid = document.getElementById('latest-posts-grid');
const loadingIndicator = document.getElementById('loading-indicator');

// Fetch and display blog posts
async function fetchPosts() {
    try {
        showLoading();
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();

        if (data.status === 'success') {
            displayPosts(data.data.posts);
        } else {
            showError('Failed to load posts');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        showError('Error loading posts. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Display posts in the grid
function displayPosts(posts) {
    if (!posts || posts.length === 0) {
        postsGrid.innerHTML = '<p class="no-posts">No posts found. Be the first to create one!</p>';
        return;
    }

    const postsHTML = posts.map(post => `
        <article class="post-card">
            <div class="post-image">
                <img src="${post.image || `https://source.unsplash.com/random/400x300?blog,${post._id}`}" alt="${post.title}">
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p class="post-excerpt">${post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}</p>
                <div class="post-meta">
                    <span class="author">By ${post.authorName || 'Anonymous'}</span>
                    <span class="date">${new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <a href="post.html?id=${post._id}" class="read-more">Read More</a>
            </div>
        </article>
    `).join('');

    postsGrid.innerHTML = postsHTML;
}

// Show loading indicator
function showLoading() {
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

// Hide loading indicator
function hideLoading() {
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    if (postsGrid) {
        postsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// Check if we're on the homepage and the latest posts grid exists before fetching
if ((window.location.pathname.endsWith('index.html') || window.location.pathname === '/') && postsGrid) {
    document.addEventListener('DOMContentLoaded', fetchPosts);
}

// Handle single post view
if (window.location.pathname.endsWith('post.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (postId) {
            fetchPost(postId);
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Fetch a single post
async function fetchPost(postId) {
    try {
        showLoading();
        const response = await fetch(`${API_URL}/posts/${postId}`);
        const data = await response.json();

        if (data.status === 'success') {
            displayPost(data.data.post);
        } else {
            showError('Post not found');
            // Redirect to homepage after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        showError('Error loading post. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Display a single post
function displayPost(post) {
    const postContainer = document.querySelector('.single-post');
    if (!postContainer) return;

    postContainer.innerHTML = `
        <article class="post-full">
            ${post.image ? `<div class="post-image-full" style="margin-bottom: 30px;"><img src="${post.image}" alt="${post.title}" style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 12px;"></div>` : ''}
            <h1>${post.title}</h1>
            <div class="post-meta">
                <span class="author">By ${post.authorName || 'Anonymous'}</span>
                <span class="date">${new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="post-content">
                ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
            <div class="post-actions">
                <a href="index.html" class="btn btn-back">← Back to Posts</a>
                ${(post.author === getCurrentUser()?._id || post.author === getCurrentUser()?.id) ? `
                    <div class="post-actions-right">
                        <a href="edit.html?id=${post._id}" class="btn btn-edit">Edit Post</a>
                        <button class="btn btn-delete" onclick="deletePost('${post._id}')">Delete</button>
                    </div>
                ` : ''}
            </div>
        </article>
    `;
}

// Get current user from localStorage
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function checkAuth() {
    const user = getCurrentUser();
    const loginLink = document.querySelector('a[href="login.html"]');
    const signupLink = document.querySelector('a[href="signup.html"]');
    const createPostLink = document.querySelector('a[href="create.html"]');
    const userMenu = document.getElementById('user-menu');

    if (user) {
        // User is logged in
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (createPostLink) createPostLink.style.display = 'inline-block';

        // Add My Blogs link if not exists
        if (!document.querySelector('a[href="my-blogs.html"]')) {
            const navLinks = document.querySelector('.nav-links');
            const myBlogsLi = document.createElement('li');
            myBlogsLi.innerHTML = '<a href="my-blogs.html">My Blogs</a>';
            // Insert after Home (index 1)
            navLinks.insertBefore(myBlogsLi, navLinks.children[1]);
        }
    } else {
        // User is not logged in
        if (loginLink) loginLink.style.display = 'inline-block';
        if (signupLink) signupLink.style.display = 'inline-block';
        if (userMenu) userMenu.style.display = 'none';
        if (createPostLink) createPostLink.style.display = 'none';
    }
}

// Delete post function
async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 204 || response.ok) {
            alert('Post deleted successfully');
            window.location.href = 'my-blogs.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', checkAuth);
