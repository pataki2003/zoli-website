-- ============================================
-- Nádasdi Zoltán Blog Rendszer
-- Supabase Database Schema
-- ============================================

-- Blog Posts tábla létrehozása
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    cover_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_status CHECK (status IN ('draft', 'published')),
    CONSTRAINT valid_category CHECK (category IN (
        'Kezdőknek',
        'Edzéstechnika',
        'Táplálkozás',
        'Motiváció',
        'Sérülésmegelőzés',
        'Edzésterv'
    ))
);

-- Index a slug-ra (gyorsabb keresés)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Index a status-ra (gyorsabb szűrés)
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);

-- Index a kategóriára (gyorsabb szűrés)
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Index a published_at-ra (rendezéshez)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- RLS bekapcsolása
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Bárki olvashatja a publikált cikkeket
CREATE POLICY "Anyone can read published posts"
ON blog_posts
FOR SELECT
USING (status = 'published');

-- Policy 2: Csak bejelentkezett admin olvashatja a draft cikkeket
-- TODO: Állítsd be Zoltán Supabase user id-ját az admin jogosultsági policy-kben
-- Példa: auth.uid() = 'ZOLTAN_USER_ID_IDE'
CREATE POLICY "Admin can read all posts"
ON blog_posts
FOR SELECT
TO authenticated
USING (
    auth.uid() IN (
        -- TODO: Ide illeszd be Zoltán Supabase user id-ját
        -- Példa: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid
        '00000000-0000-0000-0000-000000000000'::uuid
    )
);

-- Policy 3: Csak admin hozhat létre új cikket
CREATE POLICY "Admin can create posts"
ON blog_posts
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() IN (
        -- TODO: Ide illeszd be Zoltán Supabase user id-ját
        '00000000-0000-0000-0000-000000000000'::uuid
    )
);

-- Policy 4: Csak admin módosíthat cikket
CREATE POLICY "Admin can update posts"
ON blog_posts
FOR UPDATE
TO authenticated
USING (
    auth.uid() IN (
        -- TODO: Ide illeszd be Zoltán Supabase user id-ját
        '00000000-0000-0000-0000-000000000000'::uuid
    )
)
WITH CHECK (
    auth.uid() IN (
        -- TODO: Ide illeszd be Zoltán Supabase user id-ját
        '00000000-0000-0000-0000-000000000000'::uuid
    )
);

-- Policy 5: Csak admin törölhet cikket
CREATE POLICY "Admin can delete posts"
ON blog_posts
FOR DELETE
TO authenticated
USING (
    auth.uid() IN (
        -- TODO: Ide illeszd be Zoltán Supabase user id-ját
        '00000000-0000-0000-0000-000000000000'::uuid
    )
);

-- ============================================
-- Trigger az updated_at automatikus frissítéséhez
-- ============================================

-- Függvény az updated_at frissítéséhez
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger létrehozása
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Megjegyzések
-- ============================================

COMMENT ON TABLE blog_posts IS 'Blog cikkek tárolása Nádasdi Zoltán személyi edző weboldalához';
COMMENT ON COLUMN blog_posts.status IS 'Cikk státusza: draft (piszkozat) vagy published (publikált)';
COMMENT ON COLUMN blog_posts.slug IS 'URL-barát egyedi azonosító a cikkhez';
COMMENT ON COLUMN blog_posts.published_at IS 'Publikálás időpontja (csak published státusznál van kitöltve)';

-- Made with Bob
