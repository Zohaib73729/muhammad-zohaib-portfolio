/**
 * Muhammad Zohaib — Portfolio Main Script
 * Handles:
 * - Dark / Light Theme Manager with LocalStorage & OS Preference
 * - Responsive Mobile Drawer Navigation
 * - ScrollSpy & Sticky Header
 * - Animated Hero Title Rotating Text
 * - Skills Filter Navigation
 * - Project Showcase & Interactive Details Modal
 * - Legitimate Live Weather Application Demo (Open-Meteo API)
 * - Transparent Contact Form Validation & Mailto Bridge
 * - Toast Notification System & Clipboard Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initHeroRoleRotator();
  initSkillsFilter();
  initProjectModals();
  initWeatherDemo();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. THEME ENGINE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');

  // Determine initial theme
  const savedTheme = localStorage.getItem('mz_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'dark'); // Default to brand dark
  applyTheme(currentTheme);

  // Listen to OS scheme changes if user hasn't explicitly chosen
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('mz_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = active === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('mz_theme', newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* ==========================================================================
   2. NAVIGATION, STICKY HEADER & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavOnScroll();
  }, { passive: true });

  // Mobile drawer controls
  function openMobileMenu() {
    mobileToggle.classList.add('open');
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Smooth scroll & close mobile menu on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          e.preventDefault();
          closeMobileMenu();
          const headerHeight = header.offsetHeight || 70;
          const targetPos = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ScrollSpy to highlight active link
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   3. HERO ROTATING ROLE TEXT
   ========================================================================== */
function initHeroRoleRotator() {
  const roleElement = document.getElementById('hero-rotating-role');
  if (!roleElement) return;

  const roles = [
    "Frontend Developer",
    "BSCS 4th Sem @ CUI Sahiwal",
    "Modern Web UI Engineer",
    "Creative Problem Solver"
  ];
  let currentIdx = 0;

  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  setInterval(() => {
    currentIdx = (currentIdx + 1) % roles.length;
    roleElement.style.opacity = '0';
    roleElement.style.transform = 'translateY(6px)';

    setTimeout(() => {
      roleElement.textContent = roles[currentIdx];
      roleElement.style.opacity = '1';
      roleElement.style.transform = 'translateY(0)';
    }, 250);
  }, 3200);
}

/* ==========================================================================
   4. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('project-modal-close');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTags = document.getElementById('modal-project-tags');
  const modalFeatures = document.getElementById('modal-project-features');
  const modalImg = document.getElementById('modal-project-img');
  const modalLink = document.getElementById('modal-project-link');

  const viewBtns = document.querySelectorAll('.btn-project-view');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const project = PORTFOLIO_CONFIG.projects.find(p => p.id === projectId);
      if (!project) return;

      modalTitle.textContent = project.title;
      modalCategory.textContent = project.category;
      modalDesc.textContent = project.fullDesc;
      modalImg.src = project.image;
      modalImg.alt = `${project.title} Preview`;

      // Render tags
      modalTags.innerHTML = project.tags
        .map(t => `<span class="tech-tag">${t}</span>`)
        .join('');

      // Render features
      modalFeatures.innerHTML = project.features
        .map(f => `<li><span style="color:var(--cyan-accent);margin-right:8px;">✦</span>${f}</li>`)
        .join('');

      // Link button logic
      if (project.id === 'weather-app') {
        modalLink.textContent = "Open Live Weather Demo";
        modalLink.href = "javascript:void(0)";
        modalLink.onclick = () => {
          closeProjectModal();
          openWeatherModal();
        };
      } else {
        modalLink.textContent = project.liveUrl !== '#' ? "Visit Project" : "Explore Project Details";
        modalLink.href = project.liveUrl !== '#' ? project.liveUrl : "javascript:void(0)";
        modalLink.onclick = null;
      }

      openProjectModal();
    });
  });

  function openProjectModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   6. LEGITIMATE LIVE WEATHER APP DEMO (OPEN-METEO API)
   ========================================================================== */
function initWeatherDemo() {
  const triggerBtns = document.querySelectorAll('.open-weather-demo-btn');
  const weatherModal = document.getElementById('weather-modal-overlay');
  const weatherClose = document.getElementById('weather-modal-close');
  const searchInput = document.getElementById('weather-city-input');
  const searchBtn = document.getElementById('weather-search-submit');
  const resultBox = document.getElementById('weather-live-result');
  const chips = document.querySelectorAll('.weather-quick-chip');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openWeatherModal();
      fetchWeatherForCity(PORTFOLIO_CONFIG.weatherApi.defaultCity || "Sahiwal");
    });
  });

  function openWeatherModal() {
    weatherModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWeatherModal() {
    weatherModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (weatherClose) weatherClose.addEventListener('click', closeWeatherModal);
  if (weatherModal) {
    weatherModal.addEventListener('click', (e) => {
      if (e.target === weatherModal) closeWeatherModal();
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const city = searchInput.value.trim();
      if (city) fetchWeatherForCity(city);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) fetchWeatherForCity(city);
      }
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.getAttribute('data-city');
      if (searchInput) searchInput.value = city;
      fetchWeatherForCity(city);
    });
  });

  async function fetchWeatherForCity(cityName) {
    if (!resultBox) return;

    resultBox.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;color:var(--cyan-accent);padding:20px;">
        <div style="width:28px;height:28px;border:3px solid var(--border-glow);border-top-color:var(--cyan-accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        <span style="font-size:0.9rem;font-weight:600;">Fetching live weather data for "${cityName}" via Open-Meteo API...</span>
      </div>
      <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
    `;

    try {
      // Step 1: Geocoding via Open-Meteo
      const geoRes = await fetch(`${PORTFOLIO_CONFIG.weatherApi.geocodingUrl}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error("Geocoding service unavailable.");
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        resultBox.innerHTML = `
          <div style="color:#ef4444;padding:16px;">
            <p style="font-weight:700;margin-bottom:6px;">⚠️ City "${cityName}" not found.</p>
            <p style="font-size:0.85rem;color:var(--text-secondary);">Please verify the spelling or select one of the suggested city chips above.</p>
          </div>
        `;
        return;
      }

      const location = geoData.results[0];
      const { latitude, longitude, name, country, admin1 } = location;

      // Step 2: Fetch current weather & daily forecast
      const weatherRes = await fetch(
        `${PORTFOLIO_CONFIG.weatherApi.forecastUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      if (!weatherRes.ok) throw new Error("Weather forecast service unavailable.");
      const weatherData = await weatherRes.json();
      const current = weatherData.current;

      const condition = getWeatherCondition(current.weather_code, current.is_day);

      resultBox.innerHTML = `
        <div style="width:100%;text-align:left;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
            <div>
              <h3 style="font-size:1.4rem;font-weight:800;color:var(--text-primary);">${name}, <span style="font-size:1rem;font-weight:600;color:var(--cyan-accent);">${country || ''}</span></h3>
              <p style="font-size:0.82rem;color:var(--text-secondary);">${admin1 ? admin1 + ' • ' : ''}Coordinates: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°</p>
            </div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:var(--bg-badge);padding:4px 12px;border-radius:20px;border:1px solid var(--border-glow);color:var(--cyan-accent);font-size:0.8rem;font-weight:700;">
              <span>●</span> LIVE API
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:14px;background:var(--bg-secondary);padding:18px;border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
            <div>
              <p style="font-size:0.75rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Condition</p>
              <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
                <span style="font-size:1.8rem;">${condition.icon}</span>
                <span style="font-size:0.95rem;font-weight:700;color:var(--text-primary);">${condition.label}</span>
              </div>
            </div>

            <div>
              <p style="font-size:0.75rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Temperature</p>
              <p style="font-size:1.8rem;font-weight:800;color:var(--text-primary);margin-top:2px;">${Math.round(current.temperature_2m)}°C</p>
              <p style="font-size:0.75rem;color:var(--text-secondary);">Feels like ${Math.round(current.apparent_temperature)}°C</p>
            </div>

            <div>
              <p style="font-size:0.75rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Humidity</p>
              <p style="font-size:1.8rem;font-weight:800;color:var(--text-primary);margin-top:2px;">${current.relative_humidity_2m}%</p>
              <p style="font-size:0.75rem;color:var(--cyan-accent);">Atmospheric moisture</p>
            </div>

            <div>
              <p style="font-size:0.75rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">Wind Speed</p>
              <p style="font-size:1.8rem;font-weight:800;color:var(--text-primary);margin-top:2px;">${current.wind_speed_10m} <span style="font-size:0.9rem;">km/h</span></p>
              <p style="font-size:0.75rem;color:var(--text-secondary);">Surface level</p>
            </div>
          </div>
          <p style="margin-top:12px;font-size:0.74rem;color:var(--text-muted);text-align:right;">Data provided dynamically by Open-Meteo Meteorological Service.</p>
        </div>
      `;
    } catch (err) {
      resultBox.innerHTML = `
        <div style="color:#ef4444;padding:16px;">
          <p style="font-weight:700;margin-bottom:6px;">⚠️ Unable to retrieve weather data.</p>
          <p style="font-size:0.85rem;color:var(--text-secondary);">Error: ${err.message}. Please verify your internet connection.</p>
        </div>
      `;
    }
  }

  function getWeatherCondition(code, isDay) {
    if (code === 0) return { label: isDay ? "Sunny" : "Clear Night", icon: isDay ? "☀️" : "🌙" };
    if ([1, 2].includes(code)) return { label: isDay ? "Partly Cloudy" : "Mainly Clear", icon: isDay ? "⛅" : "🌤️" };
    if (code === 3) return { label: "Overcast", icon: "☁️" };
    if ([45, 48].includes(code)) return { label: "Foggy", icon: "🌫️" };
    if ([51, 53, 55].includes(code)) return { label: "Drizzle", icon: "🌦️" };
    if ([61, 63, 65].includes(code)) return { label: "Rain Showers", icon: "🌧️" };
    if ([71, 73, 75].includes(code)) return { label: "Snow", icon: "❄️" };
    if ([95, 96, 99].includes(code)) return { label: "Thunderstorm", icon: "⛈️" };
    return { label: "Mild Weather", icon: "🌤️" };
  }
}

/* ==========================================================================
   7. CONTACT FORM & FIREBASE FIRESTORE DATABASE INTEGRATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const confirmModal = document.getElementById('contact-confirm-modal');
  const confirmClose = document.getElementById('contact-confirm-close');
  const btnTriggerMailto = document.getElementById('btn-open-email-client');
  const btnCopyMessage = document.getElementById('btn-copy-formatted-msg');
  const previewBox = document.getElementById('contact-confirm-preview');

  let db = null;
  const fbConfig = PORTFOLIO_CONFIG.firebase;
  const isFirebaseConfigured = fbConfig && 
                               fbConfig.apiKey && 
                               fbConfig.apiKey !== "YOUR_API_KEY" && 
                               fbConfig.projectId && 
                               fbConfig.projectId !== "YOUR_PROJECT_ID";

  if (isFirebaseConfigured && typeof firebase !== 'undefined') {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(fbConfig);
      }
      db = firebase.firestore();
      console.log("Firebase Firestore initialized successfully.");
    } catch (err) {
      console.warn("Firebase initialization notice:", err);
    }
  }

  let activeMessageData = null;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validation
      if (!nameInput.value.trim()) {
        showError(nameInput, "Please provide your name.");
        isValid = false;
      } else {
        clearError(nameInput);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (!subjectInput.value.trim()) {
        showError(subjectInput, "Please provide a subject.");
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Message must contain at least 10 characters.");
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (!isValid) return;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      activeMessageData = {
        name,
        email,
        subject,
        message,
        recipient: PORTFOLIO_CONFIG.personal.email
      };

      // If Firebase Firestore is active, save directly to Database!
      if (db) {
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Saving to Database...</span>`;
        }

        try {
          await db.collection("messages").add({
            name: name,
            email: email,
            subject: subject,
            message: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: "unread"
          });

          form.reset();
          showToast("Message saved to Firebase database successfully! 🎉");

          if (previewBox) {
            previewBox.innerHTML = `
              <div style="text-align:center;padding:10px 0;">
                <p style="color:#10b981;font-weight:700;font-size:1.15rem;margin-bottom:8px;">✅ Message Received &amp; Stored!</p>
                <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;">Thank you, <strong>${name}</strong>! Your inquiry has been recorded directly in Muhammad Zohaib's database. He will get back to you at <strong>${email}</strong> shortly.</p>
              </div>
            `;
          }

          if (confirmModal) {
            const modalTitle = confirmModal.querySelector('h3');
            if (modalTitle) modalTitle.textContent = "Message Delivered!";
            const modalDesc = confirmModal.querySelector('p');
            if (modalDesc) modalDesc.textContent = "Your message has been directly submitted to the database.";
            
            // Hide the mailto buttons in success mode
            const actionButtons = confirmModal.querySelectorAll('#btn-open-email-client, #btn-copy-formatted-msg');
            actionButtons.forEach(btn => btn.style.display = 'none');

            confirmModal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        } catch (dbError) {
          console.error("Firestore Save Error:", dbError);
          showToast("Database busy. Opening email fallback...");
          fallbackToModal(activeMessageData);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
          }
        }
      } else {
        // Fallback when Firebase credentials are not yet configured
        fallbackToModal(activeMessageData);
      }
    });
  }

  function fallbackToModal(data) {
    if (previewBox) {
      previewBox.innerHTML = `
        <strong>To:</strong> ${data.recipient}<br>
        <strong>From:</strong> ${data.name} (${data.email})<br>
        <strong>Subject:</strong> ${data.subject}<br><br>
        <div style="background:var(--bg-secondary);padding:12px;border-radius:8px;border:1px solid var(--border-subtle);white-space:pre-wrap;font-size:0.88rem;color:var(--text-secondary);">${data.message}</div>
      `;
    }

    if (confirmModal) {
      const modalTitle = confirmModal.querySelector('h3');
      if (modalTitle) modalTitle.textContent = "Message Ready to Send";
      const modalDesc = confirmModal.querySelector('p');
      if (modalDesc) modalDesc.textContent = "Your message has been validated and formatted. Since Firebase credentials are being connected, choose your preferred method below:";
      
      const actionButtons = confirmModal.querySelectorAll('#btn-open-email-client, #btn-copy-formatted-msg');
      actionButtons.forEach(btn => btn.style.display = 'block');

      confirmModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function showError(inputEl, msg) {
    const group = inputEl.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    let errorEl = group.querySelector('.form-error-msg');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(inputEl) {
    const group = inputEl.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }

  // Handle direct mailto trigger
  if (btnTriggerMailto) {
    btnTriggerMailto.addEventListener('click', () => {
      if (!activeMessageData) return;
      const { recipient, subject, name, email, message } = activeMessageData;
      const body = `Hello Muhammad Zohaib,\n\n${message}\n\n---\nSender: ${name}\nContact Email: ${email}`;
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showToast("Opening default email application...");
    });
  }

  // Handle clipboard copy
  if (btnCopyMessage) {
    btnCopyMessage.addEventListener('click', () => {
      if (!activeMessageData) return;
      const { recipient, subject, name, email, message } = activeMessageData;
      const fullText = `To: ${recipient}\nSubject: ${subject}\n\nHello Muhammad Zohaib,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`;
      
      navigator.clipboard.writeText(fullText).then(() => {
        showToast("Formatted message copied to clipboard!");
      }).catch(() => {
        showToast("Could not access clipboard. Please copy manually.");
      });
    });
  }

  if (confirmClose && confirmModal) {
    confirmClose.addEventListener('click', () => {
      confirmModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        confirmModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   8. CLIPBOARD HELPERS & TOAST SYSTEM
   ========================================================================== */
function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || `Copied "${text}" to clipboard!`);
  }).catch(() => {
    showToast(`Copy failed. Please manually select: ${text}`);
  });
}

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:var(--cyan-accent);font-size:1.1rem;">✦</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* ==========================================================================
   9. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Global helper attachments for onclick attributes in HTML
window.copyToClipboard = copyToClipboard;
window.openWeatherModal = function() {
  const trigger = document.querySelector('.open-weather-demo-btn');
  if (trigger) trigger.click();
};
