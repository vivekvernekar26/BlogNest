// API base URL
const API_URL = 'http://localhost:5000/api';

// DOM Elements
const postsGrid = document.getElementById('my-posts-grid');
const loadingIndicator = document.getElementById('loading-indicator');

// Check authentication on load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Update navbar for logged in user (reusing logic from blog.js/main.js would be better but keeping it simple here)
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLink = document.querySelector('a[href="login.html"]');
    const signupLink = document.querySelector('a[href="signup.html"]');
    const userMenu = document.getElementById('user-menu');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
    }

    fetchMyPosts();
});

// Fetch user's posts
async function fetchMyPosts() {
    try {
        const response = await fetch(`${API_URL}/posts/my-posts`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
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
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    }
}

// Display posts in the grid
function displayPosts(posts) {
    if (!posts || posts.length === 0) {
        postsGrid.innerHTML = `
            <div class="no-posts" style="grid-column: 1/-1;">
                <p>You haven't created any posts yet.</p>
                <a href="create.html" class="cta-button" style="margin-top: 15px;">Create Your First Post</a>
            </div>
        `;
        return;
    }

    const postsHTML = posts.map(post => `
        <article class="post-card">
            <div class="post-image">
                <img src="${post.image || `https://source.unsplash.com/random/400x300?blog,${post._id}`}" alt="${post.title}">
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p class="post-excerpt">${post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</p>
                <div class="post-meta">
                    <span class="date">${new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="action-buttons">
                    <a href="post.html?id=${post._id}" class="btn-sm" style="background-color: var(--primary-color); color: white;">View</a>
                    <a href="edit.html?id=${post._id}" class="btn-sm btn-edit"><i class="fas fa-edit"></i> Edit</a>
                    <button onclick="deletePost('${post._id}')" class="btn-sm btn-delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    postsGrid.innerHTML = postsHTML;
}

// Delete post
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

        if (response.status === 204) {
            alert('Post deleted successfully');
            fetchMyPosts(); // Refresh list
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
    }
}

function showError(message) {
    postsGrid.innerHTML = `<p class="error-message">${message}</p>`;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
