# Nádasdi Zoltán - Személyi Edző Weboldal

Többoldalas, statikus HTML/CSS/JavaScript alapú weboldal egy kezdő személyi edző számára.

## 📁 Projekt Struktúra

```
Zoli website/
├── index.html              # Főoldal
├── rolam.html             # Rólam oldal
├── szolgaltatasok.html    # Szolgáltatások oldal
├── arak.html              # Árak oldal (átirányít szolgaltatasok.html#arak-ra)
├── cikkek.html            # Cikkek oldal
├── kapcsolat.html         # Kapcsolat oldal (booking kártyák + elérhetőségek)
├── foglalas.html          # Időpontfoglalási folyamat oldal (nem a menüben)
├── allapotfelmeres.html   # Állapotfelmérő oldal (nem a menüben)
├── uzenet.html            # Üzenetküldő oldal (nem a menüben)
├── css/
│   └── style.css          # Fő CSS fájl (design system)
├── js/
│   └── main.js            # JavaScript funkciók
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
- ⏳ CMS integráció cikkekhez
- ⏳ Képgaléria
- ⏳ Testimonials (vélemények)
- ⏳ Blog funkció

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
- **Email:** info@nadasdizoltan.hu
- **Instagram:** @nadasdizoltan

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
- **cikkek.html** - Cikkek oldal (tudástár, placeholder cikkek)
- **kapcsolat.html** - Kapcsolat oldal (booking kártyák, folyamatábra, elérhetőségek, GYIK)

### Rejtett Oldalak (nem a menüben)
- **foglalas.html** - Időpontfoglalási folyamat oldal (2 lépéses booking flow)
- **allapotfelmeres.html** - Állapotfelmérő oldal (beágyazott Google Form)
- **uzenet.html** - Üzenetküldő oldal (kapcsolati űrlap)
- **arak.html** - Átirányít a szolgaltatasok.html#arak szekcióra

### Fontos Szabályok
- **4% Fitness Lotus helyszín** csak a `kapcsolat.html` oldalon szerepel
- **Árak** csak a `szolgaltatasok.html` oldalon vannak (id="arak")
- **Lime akcentus** csak kis elemeken (badge, checkmark, hover)
- **Gradient háttér** minden oldalon egységes

## 📄 Licensz

Ez a projekt Nádasdi Zoltán tulajdona. Minden jog fenntartva.

---

**Verzió:** 2.0.0
**Utolsó frissítés:** 2026. június 22.
**Készítette:** Pataki Attila Bence

### Changelog
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