-- ============================================
-- Nádasdi Zoltán Blog Rendszer
-- Seed Data - Példa cikk
-- ============================================

-- Példa cikk beszúrása
INSERT INTO blog_posts (
    title,
    slug,
    excerpt,
    content,
    category,
    cover_image_url,
    status,
    published_at
) VALUES (
    'Hogyan kezdj el edzeni, ha teljesen kezdő vagy?',
    'hogyan-kezdj-el-edzeni-kezdokent',
    'Az első lépés nem az, hogy mindent tökéletesen csinálj, hanem hogy biztonságosan és követhető rendszerben indulj el.',
    E'# Hogyan kezdj el edzeni, ha teljesen kezdő vagy?

Ha még sosem edzettél rendszeresen, vagy most szeretnéd újrakezdeni, az első lépés gyakran a legnehezebb. Sokan azt gondolják, hogy azonnal mindent tökéletesen kell csinálni, de ez nem így van.

## Az első lépés: ne a tökéletességre törekedj

A legfontosabb, hogy **biztonságosan** és **követhető rendszerben** indulj el. Nem kell azonnal profi szinten edzened, és nem kell minden gyakorlatot hibátlanul végrehajtanod az első héten.

### Mit jelent a biztonságos kezdés?

- **Helyes technika megtanulása** - Még akkor is, ha könnyű súlyokkal dolgozol
- **Fokozatos terhelés** - Ne próbálj meg túl sokat, túl gyorsan
- **Testmozgás előtti bemelegítés** - Felkészíted az izmokat a munkára
- **Pihenőnapok betartása** - A fejlődés a pihenés alatt történik

## Miért fontos a személyi edző kezdőként?

Sok kezdő azért hagyja abba az edzést, mert:

- Nem tudja, mit csináljon a teremben
- Bizonytalan a gyakorlatok végrehajtásában
- Nem lát eredményt, mert rossz technikával edz
- Túlterheli magát és megsérül

Egy jó személyi edző **megtanítja a helyes technikát**, **felépíti az alapokat**, és **segít elkerülni a tipikus hibákat**.

## Hogyan néz ki az első alkalom?

Az első konzultáción nem azonnal az edzést kezdjük. Először:

1. **Megbeszéljük a céljaidat** - Mit szeretnél elérni?
2. **Felmérjük a jelenlegi állapotot** - Honnan indulsz?
3. **Megtervezzük az első lépéseket** - Mi lenne neked a legjobb?
4. **Elkezdünk dolgozni** - Biztonságosan, lépésről lépésre

## Következő lépés

Ha úgy érzed, hogy szeretnél segítséget az induláshoz, **foglalj egy ingyenes konzultációt**. Megnézzük, honnan indulsz, és közösen megtervezzük, hogyan tudsz biztonságosan fejlődni.

**Ne félj elkezdeni.** Mindenki kezdő volt egyszer.',
    'Kezdőknek',
    NULL,
    'published',
    NOW()
);

-- Ellenőrzés: listázd ki a beszúrt cikket
SELECT 
    id,
    title,
    slug,
    category,
    status,
    created_at
FROM blog_posts
WHERE slug = 'hogyan-kezdj-el-edzeni-kezdokent';

-- Made with Bob
