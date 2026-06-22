/**
 * Admin Authentication
 * Handles login, logout, and session management for the blog admin
 */

(function() {
    'use strict';

    // Check if we're on an admin page
    const isAdminPage = window.location.pathname.includes('/admin/');
    const isLoginPage = window.location.pathname.includes('/admin/login.html');
    const isDashboardPage = window.location.pathname.includes('/admin/dashboard.html');
    const isEditorPage = window.location.pathname.includes('/admin/editor.html');

    /**
     * Check if user is authenticated
     */
    async function checkAuth() {
        if (!SupabaseHelper.isInitialized()) {
            console.error('Supabase not initialized');
            return null;
        }

        try {
            const { data: { session }, error } = await supabaseClient.auth.getSession();
            
            if (error) {
                console.error('Auth check error:', error);
                return null;
            }

            return session;
        } catch (error) {
            console.error('Auth check failed:', error);
            return null;
        }
    }

    /**
     * Redirect to login if not authenticated
     */
    async function requireAuth() {
        const session = await checkAuth();
        
        if (!session && !isLoginPage) {
            window.location.href = '/admin/login.html';
            return false;
        }

        if (session && isLoginPage) {
            window.location.href = '/admin/dashboard.html';
            return false;
        }

        return true;
    }

    /**
     * Handle login form submission
     */
    async function handleLogin(email, password) {
        if (!SupabaseHelper.isInitialized()) {
            throw new Error('Supabase nincs inicializálva. Ellenőrizd a konfigurációt.');
        }

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Handle logout
     */
    async function handleLogout() {
        if (!SupabaseHelper.isInitialized()) {
            console.error('Supabase not initialized');
            return;
        }

        try {
            const { error } = await supabaseClient.auth.signOut();
            
            if (error) {
                console.error('Logout error:', error);
            }

            window.location.href = '/admin/login.html';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    /**
     * Get current user
     */
    async function getCurrentUser() {
        const session = await checkAuth();
        return session ? session.user : null;
    }

    // ============================================
    // Login Page Logic
    // ============================================
    if (isLoginPage) {
        document.addEventListener('DOMContentLoaded', async () => {
            // Check if already logged in
            const session = await checkAuth();
            if (session) {
                window.location.href = '/admin/dashboard.html';
                return;
            }

            const loginForm = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const loginButton = document.getElementById('loginButton');
            const errorMessage = document.getElementById('errorMessage');

            if (!loginForm) return;

            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = emailInput.value.trim();
                const password = passwordInput.value;

                // Hide previous errors
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';

                // Disable button
                loginButton.disabled = true;
                loginButton.textContent = 'Belépés...';

                try {
                    await handleLogin(email, password);
                    window.location.href = '/admin/dashboard.html';
                } catch (error) {
                    // Show error
                    errorMessage.style.display = 'block';
                    
                    if (error.message.includes('Invalid login credentials')) {
                        errorMessage.textContent = 'Hibás email vagy jelszó.';
                    } else if (error.message.includes('Email not confirmed')) {
                        errorMessage.textContent = 'Az email cím még nincs megerősítve.';
                    } else if (error.message.includes('nincs inicializálva')) {
                        errorMessage.textContent = error.message;
                    } else {
                        errorMessage.textContent = 'Belépési hiba. Próbáld újra később.';
                    }

                    // Re-enable button
                    loginButton.disabled = false;
                    loginButton.textContent = 'Belépés';
                }
            });
        });
    }

    // ============================================
    // Dashboard & Editor Page Logic
    // ============================================
    if (isDashboardPage || isEditorPage) {
        document.addEventListener('DOMContentLoaded', async () => {
            // Require authentication
            const isAuthenticated = await requireAuth();
            if (!isAuthenticated) return;

            // Setup logout button
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await handleLogout();
                });
            }
        });
    }

    // Export functions to global scope
    window.AdminAuth = {
        checkAuth,
        requireAuth,
        handleLogin,
        handleLogout,
        getCurrentUser
    };

})();

// Made with Bob
