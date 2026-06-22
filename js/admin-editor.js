/**
 * Admin Editor
 * Handles creating and editing blog posts
 */

(function() {
    'use strict';

    let currentPostId = null;
    let isEditMode = false;

    /**
     * Initialize editor
     */
    async function initEditor() {
        // Get post ID from URL if editing
        const urlParams = new URLSearchParams(window.location.search);
        currentPostId = urlParams.get('id');
        isEditMode = !!currentPostId;

        // Update page title
        const editorTitle = document.getElementById('editorTitle');
        if (editorTitle) {
            editorTitle.textContent = isEditMode ? 'Cikk szerkesztése' : 'Új cikk írása';
        }

        // Load post if editing
        if (isEditMode) {
            await loadPost(currentPostId);
        }

        // Setup form handlers
        setupFormHandlers();
    }

    /**
     * Load post for editing
     */
    async function loadPost(postId) {
        if (!SupabaseHelper.isInitialized()) {
            showError('Supabase nincs inicializálva.');
            return;
        }

        showLoading();

        try {
            const { data, error } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (error) {
                throw error;
            }

            if (!data) {
                throw new Error('Cikk nem található');
            }

            // Populate form
            populateForm(data);
            hideLoading();
        } catch (error) {
            console.error('Error loading post:', error);
            showError('Hiba a cikk betöltésekor: ' + error.message);
        }
    }

    /**
     * Populate form with post data
     */
    function populateForm(post) {
        document.getElementById('title').value = post.title || '';
        document.getElementById('slug').value = post.slug || '';
        document.getElementById('excerpt').value = post.excerpt || '';
        document.getElementById('category').value = post.category || '';
        document.getElementById('coverImage').value = post.cover_image_url || '';
        document.getElementById('content').value = post.content || '';

        // Set status radio
        const statusRadios = document.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => {
            radio.checked = radio.value === post.status;
        });
    }

    /**
     * Setup form handlers
     */
    function setupFormHandlers() {
        const form = document.getElementById('editorForm');
        const titleInput = document.getElementById('title');
        const slugInput = document.getElementById('slug');
        const saveDraftButton = document.getElementById('saveDraftButton');
        const publishButton = document.getElementById('publishButton');

        if (!form) return;

        // Auto-generate slug from title
        if (titleInput && slugInput) {
            titleInput.addEventListener('input', () => {
                if (!isEditMode || !slugInput.value) {
                    slugInput.value = generateSlug(titleInput.value);
                }
            });
        }

        // Save draft button
        if (saveDraftButton) {
            saveDraftButton.addEventListener('click', async (e) => {
                e.preventDefault();
                await savePost('draft');
            });
        }

        // Publish button (form submit)
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await savePost('published');
        });
    }

    /**
     * Generate slug from title
     */
    function generateSlug(title) {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[áä]/g, 'a')
            .replace(/[éë]/g, 'e')
            .replace(/[íï]/g, 'i')
            .replace(/[óöő]/g, 'o')
            .replace(/[úüű]/g, 'u')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Save post
     */
    async function savePost(status) {
        if (!SupabaseHelper.isInitialized()) {
            showFormError('Supabase nincs inicializálva.');
            return;
        }

        // Get form data
        const title = document.getElementById('title').value.trim();
        const slug = document.getElementById('slug').value.trim();
        const excerpt = document.getElementById('excerpt').value.trim();
        const category = document.getElementById('category').value;
        const coverImage = document.getElementById('coverImage').value.trim();
        const content = document.getElementById('content').value.trim();

        // Validate
        if (!title || !slug || !category || !content) {
            showFormError('Kérlek, töltsd ki az összes kötelező mezőt.');
            return;
        }

        // Validate slug format
        if (!/^[a-z0-9-]+$/.test(slug)) {
            showFormError('A slug csak kisbetűket, számokat és kötőjelet tartalmazhat.');
            return;
        }

        // Prepare post data
        const postData = {
            title,
            slug,
            excerpt: excerpt || null,
            category,
            cover_image_url: coverImage || null,
            content,
            status,
            updated_at: new Date().toISOString()
        };

        // Set published_at if publishing
        if (status === 'published' && !isEditMode) {
            postData.published_at = new Date().toISOString();
        }

        // Disable buttons
        const saveDraftButton = document.getElementById('saveDraftButton');
        const publishButton = document.getElementById('publishButton');
        if (saveDraftButton) saveDraftButton.disabled = true;
        if (publishButton) publishButton.disabled = true;

        try {
            let result;

            if (isEditMode) {
                // Update existing post
                result = await supabaseClient
                    .from('blog_posts')
                    .update(postData)
                    .eq('id', currentPostId)
                    .select()
                    .single();
            } else {
                // Create new post
                result = await supabaseClient
                    .from('blog_posts')
                    .insert([postData])
                    .select()
                    .single();
            }

            if (result.error) {
                throw result.error;
            }

            // Success - redirect to dashboard
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Error saving post:', error);
            
            let errorMessage = 'Hiba a cikk mentésekor.';
            
            if (error.message.includes('duplicate key')) {
                errorMessage = 'Ez a slug már használatban van. Válassz másikat.';
            } else if (error.message.includes('violates check constraint')) {
                errorMessage = 'Érvénytelen kategória vagy státusz.';
            } else {
                errorMessage += ' ' + error.message;
            }
            
            showFormError(errorMessage);

            // Re-enable buttons
            if (saveDraftButton) saveDraftButton.disabled = false;
            if (publishButton) publishButton.disabled = false;
        }
    }

    /**
     * Show loading state
     */
    function showLoading() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const form = document.getElementById('editorForm');

        if (loadingState) loadingState.style.display = 'flex';
        if (errorState) errorState.style.display = 'none';
        if (form) form.style.display = 'none';
    }

    /**
     * Hide loading state
     */
    function hideLoading() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const form = document.getElementById('editorForm');

        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
        if (form) form.style.display = 'block';
    }

    /**
     * Show error state
     */
    function showError(message) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const form = document.getElementById('editorForm');
        const errorMessageEl = errorState ? errorState.querySelector('.error-message') : null;

        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'block';
        if (form) form.style.display = 'none';
        if (errorMessageEl) errorMessageEl.textContent = message;
    }

    /**
     * Show form error
     */
    function showFormError(message) {
        const formError = document.getElementById('formError');
        if (formError) {
            formError.textContent = message;
            formError.style.display = 'block';
            
            // Scroll to error
            formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // ============================================
    // Initialize Editor
    // ============================================
    document.addEventListener('DOMContentLoaded', async () => {
        // Only run on editor page
        if (!window.location.pathname.includes('/admin/editor.html')) {
            return;
        }

        await initEditor();
    });

    // Export functions to global scope
    window.AdminEditor = {
        initEditor,
        savePost,
        generateSlug
    };

})();

// Made with Bob
