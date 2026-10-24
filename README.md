# Muhammad Zohaib — Professional Developer Portfolio Website

A modern, responsive, and high-performance personal portfolio website built for **Muhammad Zohaib**, Frontend Developer and BS Computer Science student (4th Semester) at **COMSATS University Islamabad, Sahiwal Campus**.

---

## 🌟 Visual Identity & Design Principles

- **Color Palette**: Dark navy & rich black primary background (`#070b14`), electric cyan-blue accents (`#00d2ff`, `#38bdf8`), vibrant blue-to-purple gradients (`linear-gradient(135deg, #00d2ff, #3a7bd5, #9d4edd)`), and subtle ambient glow effects.
- **Light Mode Integration**: Built-in toggle supporting a clean icy-white and deep slate navy palette (`#f8fafc`, `#0f172a`, `#0284c7`) with perfect accessibility contrast.
- **Glassmorphism & Cards**: Modern frosted glass backdrop filters, subtle glowing borders, interactive hover lifts, and clean typographic hierarchy.
- **Authentic Portrait Presentation**: Uses Muhammad Zohaib's authentic high-resolution photograph framed inside a rounded glowing tech portal with dynamic floating credentials ("BSCS 4th Semester @ COMSATS Sahiwal" and "Frontend Developer").
- **Zero Framework Overhead**: Built with pure HTML5, CSS3 Variables, and vanilla ES6+ JavaScript. Loads instantly in any modern web browser without requiring Node.js, npm, or build tools.

---

## 📁 Project Directory Structure

```text
muhammad-zohaib-portfolio/
│
├── index.html                   # Semantic HTML5 single-page portfolio
├── README.md                    # Documentation & setup guide
│
└── assets/
    ├── css/
    │   └── style.css            # Master stylesheet (theme variables, layout, animations)
    │
    ├── js/
    │   ├── config.js            # User configuration (social links, projects, contact info)
    │   └── main.js              # Interactive logic (theme, drawer, modal, weather demo)
    │
    └── images/
        ├── zohaib-portrait.jpg  # Authentic high-resolution portrait of Muhammad Zohaib
        └── projects/
            ├── agromart.svg     # AgroMart E-Commerce UI preview graphic
            ├── weather-app.svg  # Weather Web Application UI preview graphic
            ├── portfolio-preview.svg # Developer Portfolio UI preview graphic
            └── petcare.svg      # PetCare Veterinary UI preview graphic
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes, SVG iconography, OpenGraph and SEO meta tags.
- **CSS3**: CSS Custom Properties (CSS variables for dark/light themes), CSS Grid, Flexbox, `backdrop-filter`, responsive media queries, keyframe glow animations, and `prefers-reduced-motion` compliance.
- **Vanilla JavaScript (ES6+)**:
  - Theme engine with `localStorage` and system preference detection (`prefers-color-scheme`).
  - Mobile slide-out drawer with backdrop blur.
  - ScrollSpy active link tracking on scroll.
  - Dynamic typewriter/role rotator in Hero section.
  - Skills category filtering (All, Frontend, Tools & Backend, Core Strengths).
  - Modal window system for project deep-dives.
  - Interactive live Weather API demonstration powered by Open-Meteo.
  - Client-side contact validation with honest fallback email client / clipboard integration.
  - Non-intrusive toast notification system.

---

## 🚀 How to Run the Website Locally

Since the project is built with standard web technologies, **no build step, compiler, or npm packages are required**.

### Option 1: Double-Click to Open (Instant)
Simply open the folder in File Explorer and double-click `index.html`. It will launch in Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, or Safari.

### Option 2: Live Server in Visual Studio Code (Recommended)
1. Open the `muhammad-zohaib-portfolio` folder in **Visual Studio Code**.
2. Install the extension **"Live Server"** (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"** (runs at `http://127.0.0.1:5500`).

### Option 3: PowerShell Built-in Web Server (No Python or Node required)
If you wish to serve the folder over HTTP locally:
```powershell
# Open PowerShell in the project directory:
cd "C:\Users\Lenovo\.gemini\antigravity\scratch\muhammad-zohaib-portfolio"

# You can double-click index.html or launch it directly in your default browser:
Start-Process "index.html"
```

---

## ⚙️ How to Customize & Configure

All user-specific configurations are organized in a single file: `assets/js/config.js`.

### 1. Social Profile Links
In `assets/js/config.js`, update the `socialLinks` object with your actual profile URLs:
```javascript
socialLinks: {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  youtube: "https://www.youtube.com/@your-channel",
  facebook: "https://www.facebook.com/your-page",
  instagram: "https://www.instagram.com/your-handle",
  tiktok: "https://www.tiktok.com/@your-handle"
}
```

### 2. Project Repositories & Live Links
In `assets/js/config.js`, update the `liveUrl` and `githubUrl` fields for any project:
```javascript
{
  id: "agromart",
  title: "AgroMart",
  // ...
  liveUrl: "https://your-deployed-demo.vercel.app",
  githubUrl: "https://github.com/your-username/agromart"
}
```

### 3. Contact Email & WhatsApp
To update your phone or student email:
```javascript
personal: {
  fullName: "Muhammad Zohaib",
  phone: "0312-0640282",
  whatsappUrl: "https://wa.me/923120640282",
  email: "sp25-bcs-152@students.cuisahiwal",
  location: "Sahiwal, Punjab, Pakistan"
}
```

---

## 🌓 How the Dark / Light Theme Works

1. **First Visit Detection**: Automatically detects whether the user's operating system is set to dark or light mode using `window.matchMedia('(prefers-color-scheme: dark)')`.
2. **Toggle Button**: Clicking the sun/moon button in the top navigation or mobile drawer smoothly switches between themes by setting `data-theme="dark"` or `data-theme="light"` on the root `<html>` element.
3. **Persistence**: Saves the chosen preference in `localStorage.setItem('mz_theme', ...)`. On subsequent visits or page refreshes, the user's preference is instantly restored.
4. **CSS Architecture**: No duplicate CSS rules. All backgrounds, borders, shadows, glows, and text colors are tied to unified CSS variables.

---

## ⚡ Live Weather API Integration

The portfolio includes an interactive **Weather Demonstration** inside the Projects section:
- Uses the legitimate, free, keyless **Open-Meteo Geocoding & Meteorological API**.
- Allows querying any city worldwide (with one-click chips for **Sahiwal**, **Lahore**, **Islamabad**, **Karachi**, and **London**).
- Displays real-time temperature, condition icon, humidity, and wind speed.
- Includes error handling for invalid city names and offline network states.

---

## ✉️ Contact Form Functionality & Fallback

In accordance with professional standards for static websites:
1. Validates all fields (Full Name, Email format, Subject, Message character count).
2. Prevents empty or malformed submissions.
3. Once validated, launches a transparent confirmation dialog with two actions:
   - **Open in Default Email Client**: Automatically creates an encoded `mailto:` link directed to `sp25-bcs-152@students.cuisahiwal` with the subject and formatted body pre-populated.
   - **Copy Formatted Message**: Copies the formatted text to the user's clipboard so they can paste it directly into webmail (Gmail, Outlook, etc.).
4. Never displays false claims of a backend database delivery when running client-side.

---

## 📋 Summary of Website Sections

| Section | Content & Functionality |
| :--- | :--- |
| **Header / Nav** | Monogram `MZ` badge, responsive links, theme toggle, mobile drawer menu, active ScrollSpy. |
| **Hero** | Greeting badge, "Muhammad Zohaib", dynamic rotating role title, authentic portrait with floating badges, CTAs, and 6 social media icons. |
| **About Me** | Background story, 3 core engineering pillars, verified contact information cards (WhatsApp, student email, location, university). |
| **Education** | BS Computer Science card (COMSATS University Islamabad, Sahiwal Campus, 4th Semester), and 6 academic coursework cards (OOP, DSA, Databases, Networks, Software Engineering, Web Development). |
| **Skills** | Categorized grid (Frontend, Programming & Tools, Core Strengths) with crisp SVG icons and filter tabs. |
| **Projects** | Exactly 4 featured projects: **AgroMart**, **Weather App** (with live demo), **Personal Portfolio**, and **PetCare**. Complete with interactive details modal. *(CUI Helpdesk is completely absent)*. |
| **Contact** | Direct WhatsApp chat button, quick copy actions, location pin, and validated contact form with email client bridge. |
| **Footer** | Personal monogram, role summary, social links, "Better Code ✦ Better Tomorrow", copyright notice, and smooth back-to-top button. |

---

*Designed & Built for Muhammad Zohaib • Frontend Developer*
