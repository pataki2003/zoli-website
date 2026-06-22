# Nádasdi Zoltán - Személyi Edző Weboldal

Többoldalas, statikus HTML/CSS/JavaScript alapú weboldal egy kezdő személyi edző számára.

## 📁 Projekt Struktúra

```
Zoli website/
├── index.html              # Főoldal
├── rolam.html             # Rólam oldal
├── szolgaltatasok.html    # Szolgáltatások oldal
├── arak.html              # Árak oldal (átirányít szolgaltatasok.html#arak-ra)
├── cikkek.html            # Cikkek oldal (dinamikus blog lista)
├── cikk.html              # Egyedi cikk oldal
├── kapcsolat.html         # Kapcsolat oldal (booking kártyák + elérhetőségek)
├── foglalas.html          # Időpontfoglalási folyamat oldal (nem a menüben)
├── allapotfelmeres.html   # Állapotfelmérő oldal (nem a menüben)
├── uzenet.html            # Üzenetküldő oldal (nem a menüben)
├── admin/
│   ├── login.html         # Admin bejelentkezés
│   ├── dashboard.html     # Admin dashboard (cikklista)
│   └── editor.html        # Cikk szerkesztő
├── css/
│   └── style.css          # Fő CSS fájl (design system + blog komponensek)
├── js/
│   ├── main.js            # Általános JavaScript funkciók
│   ├── supabase.js        # Supabase konfiguráció
│   ├── blog.js            # Blog publikus funkciók
│   ├── admin-auth.js      # Admin autentikáció
│   ├── admin-dashboard.js # Admin dashboard funkciók
│   └── admin-editor.js    # Cikk szerkesztő funkciók
├── supabase/
│   ├── schema.sql         # Adatbázis séma
│   └── seed.sql           # Példa adat
├── assets/
│   └── images/            # Képek mappája
│       ├── trainer-hero.jpg
│       ├── trainer-about.jpg
│       ├── gym-placeholder.jpg
│       └── article-placeholder.jpg
└── README.md              # Ez a fájl
```

## 🚀 Használat

1. **Megnyitás böngészőben:**
   - Egyszerűen nyisd meg az `index.html` fájlt bármelyik modern böngészőben
   - Vagy használj egy helyi szervert (pl. Live Server VS Code extension)

2. **Képek cseréje:**
   - Cseréld le a placeholder képeket az `assets/images/` mappában
   - Használj JPG vagy PNG formátumot
   - Ajánlott méretek:
     - `trainer-hero.jpg`: 1920x1080px (hero háttér)
     - `trainer-about.jpg`: 800x1000px (bemutatkozó kép)
     - `gym-placeholder.jpg`: 1200x800px (szolgáltatások)
     - `article-placeholder.jpg`: 800x600px (cikkek)

3. **Tartalom szerkesztése:**
   - Nyisd meg a HTML fájlokat bármelyik szövegszerkesztőben
   - Cseréld le a placeholder szövegeket a saját tartalommal
   - A kapcsolati adatokat (email, Instagram) frissítsd minden oldalon

## 🎨 Design Rendszer

### Színpaletta
- **Page Background:** #f5f7fa (világos szürke gradient)
- **Section Background:** #eef2f6
- **Card Background:** #ffffff (fehér)
- **Primary Navy:** #0f172a (sötétkék)
- **Secondary Navy/Blue:** #1e3a8a
- **Muted Text:** #64748b
- **Border:** #dbe3ea
- **Lime Accent:** #a3e635 (akcentus)
- **Lime Hover:** #84cc16

### Gradient Háttér
```css
background: linear-gradient(
    180deg,
    #f7f9fc 0%,
    #f1f4f8 35%,
    #edf2f7 70%,
    #e7edf4 100%
);
```

### Tipográfia
- **Betűtípus:** System fonts (Segoe UI, Arial, sans-serif)
- **Címek:** Bold, 2-3rem
- **Szöveg:** Regular, 1rem

### Komponensek
- Gombok (primary, secondary)
- Kártyák (card)
- Badge-ek
- Űrlapok
- Grid rendszer

## ✨ Funkciók

### Jelenlegi Funkciók
- ✅ Reszponzív design (mobil, tablet, desktop)
- ✅ Hamburger menü mobilon
- ✅ Aktív navigációs link kiemelés
- ✅ Kapcsolati űrlap validáció
- ✅ Smooth scroll
- ✅ Hover animációk
- ✅ Sikeres üzenet megjelenítés

### Jövőbeli Fejlesztések
- ⏳ Valódi email küldés (backend integráció)
- ✅ Google Form integráció (állapotfelmérő)
- ✅ Időpontfoglalás rendszer (Google Calendar)
- ✅ Blog rendszer Supabase backenddel
- ⏳ Képgaléria
- ⏳ Testimonials (vélemények)
- ⏳ Newsletter integráció

## 📅 Időpontfoglalási Folyamat

A weboldal egy kétlépéses időpontfoglalási folyamatot használ:

### 1. Időpont Foglalás (Google Calendar)
- **Oldal:** `foglalas.html`
- **Link:** [Google Calendar Appointment Schedule](https://calendar.app.google/37BEUibsdtbyCGGm7)
- **Működés:** Új lapon nyílik meg, ahol a látogató kiválaszthat egy szabad időpontot

### 2. Állapotfelmérő Kitöltése (Google Form)
- **Oldal:** `allapotfelmeres.html`
- **Link:** [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSevt3dKTrg8oKmsezrwIc3HMYbInIoEhc3uf1CdNLmJtF6qsw/viewform?usp=header)
- **Működés:** Beágyazott Google Form, ahol a látogató kitölti az állapotfelmérőt

### 🔧 Google Calendar Beállítás

**FONTOS:** A Google Calendar Appointment Schedule leírásába (description) add hozzá ezt a szöveget:

```
Köszönöm a foglalásod!

Következő lépés: Kérlek, a konzultáció előtt töltsd ki az állapotfelmérő űrlapot:
https://zoli-website.vercel.app/allapotfelmeres.html

Ez segít abban, hogy a konzultáció során személyre szabott tanácsokat tudjak adni.

Várlak szeretettel!
Zoltán
```

**Miért fontos ez?**
- A foglalás után a látogató automatikusan kap egy emlékeztetőt az állapotfelmérő kitöltéséről
- A Google Calendar confirmation emailben megjelenik ez a szöveg
- Biztosítja, hogy mindkét lépés megtörténjen

### Booking Flow Útvonal

```
kapcsolat.html
    ↓ (Időpontot foglalok gomb)
foglalas.html
    ↓ (1. lépés: Megnyitom az időpontfoglalót)
Google Calendar (új lapon)
    ↓ (2. lépés: Töltsd ki az állapotfelmérőt)
allapotfelmeres.html
```

### Alternatív Kapcsolatfelvétel

Ha valaki nem szeretne időpontot foglalni, használhatja:
- **Üzenet küldés:** `uzenet.html` (kapcsolati űrlap)
- **Email:** nadasdizoltan1773@gmail.com
- **Instagram:** @zoli.nadasdi

## 📝 Blog Rendszer (Supabase Backend)

A weboldal egy teljes körű blog rendszert tartalmaz Supabase backenddel, amely lehetővé teszi cikkek írását, szerkesztését és publikálását admin felületen keresztül.

### Blog Funkciók

#### Publikus Funkciók
- ✅ Cikklista keresővel és kategória szűrővel (`cikkek.html`)
- ✅ Egyedi cikk oldal (`cikk.html?slug=cikk-slug`)
- ✅ Markdown-szerű formázás (címek, félkövér, dőlt, listák)
- ✅ Kategóriák: Kezdőknek, Edzéstechnika, Táplálkozás, Motiváció, Sérülésmegelőzés, Edzésterv
- ✅ Relatív dátum megjelenítés ("2 órája", "3 napja")
- ✅ Borítókép támogatás
- ✅ Loading/Error/Empty state kezelés

#### Admin Funkciók
- ✅ Admin bejelentkezés (`admin/login.html`)
- ✅ Cikklista dashboard (`admin/dashboard.html`)
- ✅ Cikk szerkesztő (`admin/editor.html`)
- ✅ Slug automatikus generálás magyar karakterekkel
- ✅ Piszkozat / Publikált státusz
- ✅ Cikk törlés megerősítéssel
- ✅ Valós idejű előnézet

### 🔧 Supabase Beállítás

#### 1. Supabase Projekt Létrehozása

1. Menj a [Supabase Dashboard](https://supabase.com/dashboard)-ra
2. Kattints a "New Project" gombra
3. Add meg a projekt nevét (pl. "zoli-website-blog")
4. Válassz egy erős adatbázis jelszót
5. Válaszd ki a régiót (Europe West ajánlott)
6. Kattints a "Create new project" gombra

#### 2. Adatbázis Séma Létrehozása

1. A Supabase Dashboard-on menj a **SQL Editor** menüpontra
2. Kattints a "New query" gombra
3. Másold be a `supabase/schema.sql` fájl teljes tartalmát
4. Kattints a "Run" gombra
5. Ellenőrizd, hogy a `blog_posts` tábla létrejött a **Table Editor**-ban

#### 3. Admin User Létrehozása

1. A Supabase Dashboard-on menj az **Authentication** → **Users** menüpontra
2. Kattints az "Add user" → "Create new user" gombra
3. Add meg az admin email címét (pl. `admin@nadasdizoltan.hu`)
4. Add meg egy erős jelszót
5. Kattints a "Create user" gombra
6. **FONTOS:** Másold ki a létrehozott user ID-ját (UUID formátum)

#### 4. RLS Policies Frissítése Admin User ID-val

1. Menj vissza a **SQL Editor**-ba
2. Futtasd ezt a query-t (cseréld le a `YOUR_ADMIN_USER_ID`-t):

```sql
-- Admin műveletek engedélyezése
DROP POLICY IF EXISTS "Admin can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can delete posts" ON blog_posts;

CREATE POLICY "Admin can insert posts"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = 'YOUR_ADMIN_USER_ID'::uuid);

CREATE POLICY "Admin can update posts"
ON blog_posts FOR UPDATE
TO authenticated
USING (auth.uid() = 'YOUR_ADMIN_USER_ID'::uuid);

CREATE POLICY "Admin can delete posts"
ON blog_posts FOR DELETE
TO authenticated
USING (auth.uid() = 'YOUR_ADMIN_USER_ID'::uuid);
```

#### 5. Supabase Credentials Beállítása

1. A Supabase Dashboard-on menj a **Settings** → **API** menüpontra
2. Másold ki a következő értékeket:
   - **Project URL** (pl. `https://abcdefgh.supabase.co`)
   - **anon public** API key (hosszú string)

3. Nyisd meg a `js/supabase.js` fájlt
4. Cseréld le a placeholder értékeket:

```javascript
const SUPABASE_URL = 'https://abcdefgh.supabase.co'; // Ide a Project URL
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // Ide az anon public key
```

#### 6. Példa Cikk Hozzáadása (Opcionális)

1. Menj a **SQL Editor**-ba
2. Másold be a `supabase/seed.sql` fájl tartalmát
3. Kattints a "Run" gombra
4. Ellenőrizd a **Table Editor**-ban, hogy megjelent a példa cikk

### 📖 Blog Használat

#### Admin Bejelentkezés

1. Menj az `admin/login.html` oldalra
2. Add meg az admin email címét és jelszót
3. Sikeres bejelentkezés után átirányít a dashboard-ra

#### Új Cikk Írása

1. A dashboard-on kattints az "Új cikk" gombra
2. Add meg a cikk címét (a slug automatikusan generálódik)
3. Írj egy rövid kivonatot (excerpt)
4. Válaszd ki a kategóriát
5. Add meg a borítókép URL-jét (opcionális)
6. Írd meg a cikk tartalmát markdown-szerű formázással:
   - `# Cím` → nagy cím
   - `## Alcím` → közepes cím
   - `### Kis cím` → kis cím
   - `**félkövér**` → **félkövér**
   - `*dőlt*` → *dőlt*
7. Válaszd ki a státuszt:
   - **Piszkozat**: csak te látod
   - **Publikált**: mindenki látja
8. Kattints a "Piszkozat mentése" vagy "Közzététel" gombra

#### Cikk Szerkesztése

1. A dashboard-on kattints a "Szerkesztés" ikonra a cikk mellett
2. Módosítsd a tartalmat
3. Kattints a "Mentés" gombra

#### Cikk Törlése

1. A dashboard-on kattints a "Törlés" ikonra a cikk mellett
2. Erősítsd meg a törlést a modal ablakban

### 🎨 Blog Design

A blog komponensek ugyanazt a design rendszert használják, mint a weboldal többi része:
- Világos szürke gradient háttér
- Fehér kártyák
- Sötétkék tipográfia
- Lime akcentusok (kategória badge-ek, hover állapotok)
- Reszponzív grid layout

### 🔒 Biztonság

- **Row Level Security (RLS)**: Csak az admin user módosíthatja a cikkeket
- **Publikált cikkek**: Mindenki láthatja
- **Piszkozatok**: Csak az admin láthatja
- **Auth védelem**: Admin oldalak védve Supabase Auth-tal

## 📝 Tartalom Frissítése

### Kapcsolati Adatok
Cseréld le a következő placeholder adatokat:
- Email: `info@nadasdizoltan.hu`
- Instagram: `@nadasdizoltan`
- Helyszín: `4% Fitness Lotus`

### Árak
Az árak az `arak.html` fájlban találhatók. Frissítsd őket szükség szerint.

### Szolgáltatások
A szolgáltatások leírása a `szolgaltatasok.html` fájlban található.

## 🔧 Testreszabás

### Színek Módosítása
Nyisd meg a `css/style.css` fájlt és módosítsd a CSS változókat a `:root` szekcióban:

```css
:root {
    --color-primary: #1e3a8a;  /* Módosítsd ezt */
    --color-secondary: #0ea5e9; /* És ezt */
    /* ... */
}
```

### Új Szekció Hozzáadása
1. Másold le egy meglévő szekció HTML kódját
2. Módosítsd a tartalmat
3. Használd a meglévő CSS osztályokat (`.section`, `.card`, `.grid`, stb.)

## 📱 Reszponzív Breakpointok

- **Desktop:** 1024px felett
- **Tablet:** 768px - 1024px
- **Mobil:** 768px alatt

## 🌐 Böngésző Támogatás

- ✅ Chrome (legújabb)
- ✅ Firefox (legújabb)
- ✅ Safari (legújabb)
- ✅ Edge (legújabb)
- ⚠️ Internet Explorer (nem támogatott)

## 📞 Támogatás

Ha kérdésed van a weboldallal kapcsolatban, vedd fel a kapcsolatot a fejlesztővel.

## 📄 Oldalak Leírása

### Fő Navigációs Oldalak
- **index.html** - Főoldal (hero, bemutatkozó, segítek ha..., hogyan zajlik, GYIK, CTA)
- **rolam.html** - Rólam oldal (személyes bemutatkozás, motiváció, hozzáállás)
- **szolgaltatasok.html** - Szolgáltatások és árak (edzés csomagok, online szolgáltatások, All In csomag)
- **cikkek.html** - Cikkek oldal (dinamikus blog lista keresővel és szűrővel)
- **kapcsolat.html** - Kapcsolat oldal (booking kártyák, folyamatábra, elérhetőségek, GYIK)

### Rejtett Oldalak (nem a menüben)
- **cikk.html** - Egyedi cikk oldal (slug alapú URL paraméterrel)
- **foglalas.html** - Időpontfoglalási folyamat oldal (2 lépéses booking flow)
- **allapotfelmeres.html** - Állapotfelmérő oldal (beágyazott Google Form)
- **uzenet.html** - Üzenetküldő oldal (kapcsolati űrlap)
- **arak.html** - Átirányít a szolgaltatasok.html#arak szekcióra

### Admin Oldalak
- **admin/login.html** - Admin bejelentkezés (Supabase Auth)
- **admin/dashboard.html** - Cikklista dashboard (szerkesztés, törlés)
- **admin/editor.html** - Cikk szerkesztő (új cikk, szerkesztés)

### Fontos Szabályok
- **4% Fitness Lotus helyszín** csak a `kapcsolat.html` oldalon szerepel
- **Árak** csak a `szolgaltatasok.html` oldalon vannak (id="arak")
- **Lime akcentus** csak kis elemeken (badge, checkmark, hover)
- **Gradient háttér** minden oldalon egységes

## 📄 Licensz

Ez a projekt Nádasdi Zoltán tulajdona. Minden jog fenntartva.

---

**Verzió:** 3.0.0
**Utolsó frissítés:** 2026. június 22.
**Készítette:** Pataki Attila Bence

### Changelog
- **v3.0.0** (2026.06.22)
  - ✅ Teljes blog rendszer Supabase backenddel
  - ✅ Admin felület (login, dashboard, editor)
  - ✅ Dinamikus cikklista keresővel és kategória szűrővel
  - ✅ Egyedi cikk oldal markdown-szerű formázással
  - ✅ Slug automatikus generálás magyar karakterekkel
  - ✅ RLS policies biztonságos adatkezeléshez
  - ✅ Blog CSS komponensek (search, categories, cards, admin)
  - ✅ README frissítése Supabase beállítási útmutatóval
  - ✅ Relatív dátum formázás
  - ✅ Loading/Error/Empty state kezelés

- **v2.0.0** (2026.06.22)
  - Új színpaletta (világos szürke + navy + lime)
  - Kétlépéses időpontfoglalási folyamat (Google Calendar + Google Form)
  - Új oldalak: foglalas.html, allapotfelmeres.html, uzenet.html
  - Booking flow komponensek CSS-ben
  - Kapcsolat oldal átstrukturálása
  - README frissítése booking flow dokumentációval

- **v1.0.0** (2026.06.09)
  - Kezdeti verzió
  - Alapvető HTML/CSS/JS struktúra
  - Reszponzív design
  - Hamburger menü