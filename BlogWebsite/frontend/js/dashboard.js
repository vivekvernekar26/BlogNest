const API_URL = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}
function showAlert(msg, ok = true) {
  const el = document.getElementById('admin-alert');
  if (!el) return;
  el.style.display = 'block';
  el.style.background = ok ? '#dcfce7' : '#fee2e2';
  el.style.color = ok ? '#166534' : '#991b1b';
  el.textContent = msg;
  setTimeout(() => { el.style.display = 'none'; }, 2500);
}

async function fetchPending() {
  const list = document.getElementById('pending-list');
  const loading = document.getElementById('loading');
  try {
    loading.style.display = 'block';
    const res = await fetch(`${API_URL}/posts/admin/pending`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message || 'Failed to load pending');
    renderPending(data.data.posts || []);
  } catch (e) {
    showAlert(e.message || 'Error loading pending posts', false);
  } finally {
    loading.style.display = 'none';
  }
}

function renderPending(posts) {
  const list = document.getElementById('pending-list');
  if (!posts.length) {
    list.innerHTML = '<p class="no-posts">No pending posts.</p>';
    return;
  }
  list.innerHTML = posts.map(p => `
    <article class="admin-card">
      <div class="content">
        <h3>${p.title}</h3>
        <p>${p.content.length > 200 ? p.content.slice(0,200)+'...' : p.content}</p>
        <div class="post-meta">
          <span>By ${p.authorName || 'Anonymous'}</span>
          <span> · ${new Date(p.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-approve" onclick="approvePost('${p.id}')">
          <i class="fas fa-check"></i> Approve
        </button>
      </div>
    </article>
  `).join('');
}

async function approvePost(id) {
  try {
    const res = await fetch(`${API_URL}/posts/admin/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    if (data.status !== 'success') throw new Error(data.message || 'Approve failed');
    showAlert('Post approved');
    fetchPending();
  } catch (e) {
    showAlert(e.message || 'Error approving post', false);
  }
}
window.approvePost = approvePost;

document.addEventListener('DOMContentLoaded', fetchPending);