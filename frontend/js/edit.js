// API base URL
const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        alert('No post specified');
        window.location.href = 'my-blogs.html';
        return;
    }

    // Load post data
    fetchPostData(postId);

    // Handle form submission
    const form = document.getElementById('edit-post-form');
    form.addEventListener('submit', (e) => updatePost(e, postId));
});

async function fetchPostData(postId) {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`);
        const data = await response.json();

        if (data.status === 'success') {
            const post = data.data.post;

            // Check if current user is the author
            const user = JSON.parse(localStorage.getItem('user'));
            if (post.author !== user._id && post.author !== user.id) { // Handle both id formats just in case
                alert('You are not authorized to edit this post');
                window.location.href = 'my-blogs.html';
                return;
            }

            document.getElementById('title').value = post.title;
            document.getElementById('content').value = post.content;

            if (post.image) {
                const imgContainer = document.getElementById('current-image-container');
                const img = document.getElementById('current-image');
                img.src = post.image;
                imgContainer.style.display = 'block';
            }
        } else {
            alert('Failed to load post');
            window.location.href = 'my-blogs.html';
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        alert('Error loading post data');
    }
}

async function updatePost(e, postId) {
    e.preventDefault();

    const form = document.getElementById('edit-post-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('title', form.title.value);
        formData.append('content', form.content.value);

        const imageFile = document.getElementById('image').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert('Post updated successfully!');
            window.location.href = 'my-blogs.html';
        } else {
            throw new Error(data.message || 'Failed to update post');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        alert(error.message || 'Failed to update post');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
