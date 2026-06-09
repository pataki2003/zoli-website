# Nádasdi Zoltán - Személyi Edző Weboldal

Többoldalas, statikus HTML/CSS/JavaScript alapú weboldal egy kezdő személyi edző számára.

## 📁 Projekt Struktúra

```
Zoli website/
├── index.html              # Főoldal
├── rolam.html             # Rólam oldal
├── szolgaltatasok.html    # Szolgáltatások oldal
├── arak.html              # Árak oldal
├── cikkek.html            # Cikkek oldal
├── kapcsolat.html         # Kapcsolat oldal
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

### Színek
- **Elsődleges:** Sötétkék (#1e3a8a)
- **Másodlagos:** Világoskék (#0ea5e9)
- **Háttér:** Törtfehér (#f8fafc)
- **Szöveg:** Sötétszürke (#1e293b)

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
- ⏳ Google Form integráció
- ⏳ Időpontfoglalás rendszer
- ⏳ CMS integráció cikkekhez
- ⏳ Képgaléria
- ⏳ Testimonials (vélemények)
- ⏳ Blog funkció

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

## 📄 Licensz

Ez a projekt Nádasdi Zoltán tulajdona. Minden jog fenntartva.

---

**Verzió:** 1.0.0  
**Utolsó frissítés:** 2026. június 9.  
**Készítette:** Bob (AI Assistant)