/**
 * Supabase Configuration
 * 
 * Ez a fájl inicializálja a Supabase klienst a blog rendszerhez.
 * 
 * FONTOS BIZTONSÁGI MEGJEGYZÉSEK:
 * - Csak az anon (public) key-t használd frontendben
 * - SOHA ne használj service_role key-t frontendben
 * - A jogosultságokat Supabase Row Level Security (RLS) policy-kkel védd
 */

// TODO: Cseréld ki ezeket a valódi Supabase projekt adataira
const SUPABASE_URL = "https://gjvwjpdxmhynrmbglfik.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdndqcGR4bWh5bnJtYmdsZmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMTcyNDIsImV4cCI6MjA5NzY5MzI0Mn0.hLCL0VmNMuArUCAPpNv4c4L7nNdZ2H5TpqVmImTIYcQ";

// Supabase client inicializálása
let supabase = null;

// Ellenőrizzük, hogy a Supabase library be van-e töltve
if (typeof window !== 'undefined' && window.supabase) {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase client initialized');
    } catch (error) {
        console.error('❌ Supabase initialization error:', error);
    }
} else {
    console.warn('⚠️ Supabase library not loaded. Make sure to include the Supabase CDN script.');
}

// Helper függvények
const SupabaseHelper = {
    /**
     * Ellenőrzi, hogy a Supabase client inicializálva van-e
     */
    isInitialized() {
        return supabase !== null;
    },

    /**
     * Visszaadja a Supabase client-et
     */
    getClient() {
        if (!this.isInitialized()) {
            throw new Error('Supabase client is not initialized');
        }
        return supabase;
    },

    /**
     * Ellenőrzi, hogy a konfiguráció be van-e állítva
     */
    isConfigured() {
        return SUPABASE_URL !== "IDE_ILLESZD_A_SUPABASE_URLT" && 
               SUPABASE_ANON_KEY !== "IDE_ILLESZD_A_SUPABASE_ANON_KEYT";
    }
};

// Export a global scope-ba
if (typeof window !== 'undefined') {
    window.supabaseClient = supabase;
    window.SupabaseHelper = SupabaseHelper;
}

// Made with Bob
