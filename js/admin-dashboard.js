/**
 * Admin Dashboard
 * Handles the blog posts list, edit, and delete operations
 */

(function() {
    'use strict';

    let posts = [];
    let postToDelete = null;

    /**
     * Load all posts from Supabase
     */
    async function loadPosts() {
        if (!SupabaseHelper.isInitialized()) {
            showError('Supabase nincs inicializálva.');
            return;
        }

        showLoading();

        try {
            const { data, error } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) {
                throw error;
            }

            posts = data || [];
            renderPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
            showError('Hiba a cikkek betöltésekor: ' + error.message);
        }
    }

    /**
     * Render posts table
     */
    function renderPosts() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const postsContainer = document.getElementById('postsContainer');
        const emptyState = document.getElementById('emptyState');
        const postsTable = document.getElementById('postsTable');
        const postsTableBody = document.getElementById('postsTableBody');

        if (!postsContainer || !postsTableBody) return;

        // Hide loading and error
        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
        postsContainer.style.display = 'block';

        // Check if empty
        if (posts.length === 0) {
            if (emptyState) emptyState.style.display = 'flex';
            if (postsTable) postsTable.style.display = 'none';
            return;
        }

        // Show table
        if (emptyState) emptyState.style.display = 'none';
        if (postsTable) postsTable.style.display = 'block';

        // Render rows
        postsTableBody.innerHTML = posts.map(post => `
            <tr>
                <td>
                    <div class="post-title-cell">
                        <strong>${escapeHtml(post.title)}</strong>
                        <span class="post-slug">${escapeHtml(post.slug)}</span>
                    </div>
                </td>
                <td>
                    <span class="badge badge-category">${escapeHtml(post.category)}</span>
                </td>
                <td>
                    <span class="badge ${post.status === 'published' ? 'badge-success' : 'badge-draft'}">
                        ${post.status === 'published' ? 'Publikált' : 'Piszkozat'}
                    </span>
                </td>
                <td>
                    <span class="post-date">${formatDate(post.updated_at)}</span>
                </td>
                <td>
                    <div class="post-actions">
                        <button class="btn btn-sm btn-secondary" onclick="AdminDashboard.editPost('${post.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Szerkesztés
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="AdminDashboard.confirmDelete('${post.id}', '${escapeHtml(post.title)}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Törlés
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Edit post - redirect to editor
     */
    function editPost(postId) {
        window.location.href = `editor.html?id=${postId}`;
    }

    /**
     * Show delete confirmation modal
     */
    function confirmDelete(postId, postTitle) {
        postToDelete = postId;
        
        const modal = document.getElementById('deleteModal');
        const modalText = modal.querySelector('.modal-text');
        
        if (modalText) {
            modalText.textContent = `Biztosan törölni szeretnéd ezt a cikket: "${postTitle}"? Ez a művelet nem vonható vissza.`;
        }
        
        modal.style.display = 'flex';
    }

    /**
     * Delete post
     */
    async function deletePost() {
        if (!postToDelete) return;

        try {
            const { error } = await supabaseClient
                .from('blog_posts')
                .delete()
                .eq('id', postToDelete);

            if (error) {
                throw error;
            }

            // Close modal
            closeDeleteModal();

            // Reload posts
            await loadPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Hiba a cikk törlésekor: ' + error.message);
        }
    }

    /**
     * Close delete modal
     */
    function closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        modal.style.display = 'none';
        postToDelete = null;
    }

    /**
     * Show loading state
     */
    function showLoading() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const postsContainer = document.getElementById('postsContainer');

        if (loadingState) loadingState.style.display = 'flex';
        if (errorState) errorState.style.display = 'none';
        if (postsContainer) postsContainer.style.display = 'none';
    }

    /**
     * Show error state
     */
    function showError(message) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const postsContainer = document.getElementById('postsContainer');
        const errorMessageEl = errorState ? errorState.querySelector('.error-message') : null;

        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'block';
        if (postsContainer) postsContainer.style.display = 'none';
        if (errorMessageEl) errorMessageEl.textContent = message;
    }

    /**
     * Format date
     */
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Most';
        if (diffMins < 60) return `${diffMins} perce`;
        if (diffHours < 24) return `${diffHours} órája`;
        if (diffDays < 7) return `${diffDays} napja`;

        return date.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Escape HTML
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // Initialize Dashboard
    // ============================================
    document.addEventListener('DOMContentLoaded', async () => {
        // Only run on dashboard page
        if (!window.location.pathname.includes('/admin/dashboard.html')) {
            return;
        }

        // Setup delete modal
        const cancelDelete = document.getElementById('cancelDelete');
        const confirmDeleteBtn = document.getElementById('confirmDelete');
        const modal = document.getElementById('deleteModal');

        if (cancelDelete) {
            cancelDelete.addEventListener('click', closeDeleteModal);
        }

        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', deletePost);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeDeleteModal();
                }
            });
        }

        // Load posts
        await loadPosts();
    });

    // Export functions to global scope
    window.AdminDashboard = {
        loadPosts,
        editPost,
        confirmDelete,
        deletePost
    };

})();

// Made with Bob
