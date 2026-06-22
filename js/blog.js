/**
 * Blog Public Functions
 * Handles public blog list and single article display
 */

(function() {
    'use strict';

    let allPosts = [];
    let filteredPosts = [];
    let currentCategory = 'Összes';
    let searchQuery = '';

    /**
     * Load published posts
     */
    async function loadPublishedPosts() {
        if (!SupabaseHelper.isInitialized()) {
            console.error('Supabase not initialized');
            showError('A blog betöltése sikertelen. Próbáld újra később.');
            return;
        }

        showLoading();

        try {
            const { data, error } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (error) {
                throw error;
            }

            allPosts = data || [];
            filteredPosts = allPosts;
            renderPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
            showError('Hiba a cikkek betöltésekor.');
        }
    }

    /**
     * Load single post by slug
     */
    async function loadPostBySlug(slug) {
        if (!SupabaseHelper.isInitialized()) {
            console.error('Supabase not initialized');
            show404();
            return;
        }

        showLoading();

        try {
            const { data, error } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .eq('status', 'published')
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                show404();
                return;
            }

            renderSinglePost(data);
        } catch (error) {
            console.error('Error loading post:', error);
            show404();
        }
    }

    /**
     * Filter posts by category
     */
    function filterByCategory(category) {
        currentCategory = category;
        applyFilters();
    }

    /**
     * Search posts
     */
    function searchPosts(query) {
        searchQuery = query.toLowerCase();
        applyFilters();
    }

    /**
     * Apply all filters
     */
    function applyFilters() {
        filteredPosts = allPosts.filter(post => {
            // Category filter
            const categoryMatch = currentCategory === 'Összes' || post.category === currentCategory;
            
            // Search filter
            const searchMatch = !searchQuery || 
                post.title.toLowerCase().includes(searchQuery) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery)) ||
                post.category.toLowerCase().includes(searchQuery);

            return categoryMatch && searchMatch;
        });

        renderPosts();
    }

    /**
     * Render posts list
     */
    function renderPosts() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const postsGrid = document.getElementById('postsGrid');
        const emptyState = document.getElementById('emptyState');

        if (!postsGrid) return;

        // Hide loading and error
        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'none';

        // Check if empty
        if (filteredPosts.length === 0) {
            postsGrid.style.display = 'none';
            if (emptyState) {
                emptyState.style.display = 'flex';
                const emptyText = emptyState.querySelector('p');
                if (emptyText) {
                    if (searchQuery) {
                        emptyText.textContent = 'Nincs találat a keresésre.';
                    } else if (currentCategory !== 'Összes') {
                        emptyText.textContent = `Nincs cikk ebben a kategóriában: ${currentCategory}`;
                    } else {
                        emptyText.textContent = 'Még nincs publikált cikk.';
                    }
                }
            }
            return;
        }

        // Show posts
        if (emptyState) emptyState.style.display = 'none';
        postsGrid.style.display = 'grid';

        // Render post cards
        postsGrid.innerHTML = filteredPosts.map(post => `
            <article class="article-card">
                ${post.cover_image_url ? `
                    <div class="article-card-image">
                        <img src="${escapeHtml(post.cover_image_url)}" alt="${escapeHtml(post.title)}">
                    </div>
                ` : `
                    <div class="article-card-image article-card-placeholder">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                    </div>
                `}
                <div class="article-card-content">
                    <span class="badge badge-category">${escapeHtml(post.category)}</span>
                    <h3 class="article-card-title">
                        <a href="cikk.html?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a>
                    </h3>
                    ${post.excerpt ? `
                        <p class="article-card-excerpt">${escapeHtml(post.excerpt)}</p>
                    ` : ''}
                    <div class="article-card-footer">
                        <span class="article-card-date">${formatDate(post.published_at)}</span>
                        <a href="cikk.html?slug=${encodeURIComponent(post.slug)}" class="article-card-link">
                            Tovább olvasom
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');
    }

    /**
     * Render single post
     */
    function renderSinglePost(post) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const articleContainer = document.getElementById('articleContainer');

        if (!articleContainer) return;

        // Hide loading and error
        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
        articleContainer.style.display = 'block';

        // Update page title
        document.title = `${post.title} | Nádasdi Zoltán`;

        // Render article
        articleContainer.innerHTML = `
            <article class="article-single">
                <header class="article-header">
                    <span class="badge badge-category">${escapeHtml(post.category)}</span>
                    <h1 class="article-title">${escapeHtml(post.title)}</h1>
                    ${post.excerpt ? `
                        <p class="article-excerpt">${escapeHtml(post.excerpt)}</p>
                    ` : ''}
                    <div class="article-meta">
                        <span class="article-date">${formatDate(post.published_at)}</span>
                    </div>
                </header>

                ${post.cover_image_url ? `
                    <div class="article-cover">
                        <img src="${escapeHtml(post.cover_image_url)}" alt="${escapeHtml(post.title)}">
                    </div>
                ` : ''}

                <div class="article-content">
                    ${formatContent(post.content)}
                </div>

                <footer class="article-footer">
                    <div class="article-cta">
                        <h3 class="article-cta-title">Nem tudod, hogyan kezdj bele?</h3>
                        <p class="article-cta-text">Foglalj egy ingyenes konzultációt, és megnézzük, milyen első lépés lenne neked a legjobb.</p>
                        <a href="../kapcsolat.html" class="btn btn-primary btn-large">Konzultációt foglalok</a>
                    </div>
                </footer>
            </article>
        `;
    }

    /**
     * Format content (simple Markdown-like formatting)
     */
    function formatContent(content) {
        if (!content) return '';

        return content
            // Escape HTML first
            .replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            // Headers
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Line breaks to paragraphs
            .split('\n\n')
            .map(para => para.trim())
            .filter(para => para && !para.startsWith('<h'))
            .map(para => para.startsWith('<') ? para : `<p>${para.replace(/\n/g, '<br>')}</p>`)
            .join('\n');
    }

    /**
     * Show 404 error
     */
    function show404() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const articleContainer = document.getElementById('articleContainer');

        if (loadingState) loadingState.style.display = 'none';
        if (articleContainer) articleContainer.style.display = 'none';
        
        if (errorState) {
            errorState.style.display = 'block';
            const errorMessage = errorState.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.innerHTML = `
                    <h3>A keresett cikk nem található</h3>
                    <p>Ez a cikk nem létezik vagy már nem elérhető.</p>
                    <a href="cikkek.html" class="btn btn-primary">Vissza a cikkekhez</a>
                `;
            }
        }
    }

    /**
     * Show loading state
     */
    function showLoading() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const postsGrid = document.getElementById('postsGrid');
        const articleContainer = document.getElementById('articleContainer');

        if (loadingState) loadingState.style.display = 'flex';
        if (errorState) errorState.style.display = 'none';
        if (postsGrid) postsGrid.style.display = 'none';
        if (articleContainer) articleContainer.style.display = 'none';
    }

    /**
     * Show error state
     */
    function showError(message) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const postsGrid = document.getElementById('postsGrid');
        const articleContainer = document.getElementById('articleContainer');

        if (loadingState) loadingState.style.display = 'none';
        if (postsGrid) postsGrid.style.display = 'none';
        if (articleContainer) articleContainer.style.display = 'none';
        
        if (errorState) {
            errorState.style.display = 'block';
            const errorMessage = errorState.querySelector('.error-message') || errorState.querySelector('p');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
        }
    }

    /**
     * Format date
     */
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
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

    // Export functions to global scope
    window.Blog = {
        loadPublishedPosts,
        loadPostBySlug,
        filterByCategory,
        searchPosts
    };

})();

// Made with Bob
