/**
 * Muhammad Zohaib — Portfolio Configuration
 * Easily update your personal details, social media URLs, project links, and API settings here.
 */
const PORTFOLIO_CONFIG = {
  personal: {
    fullName: "Muhammad Zohaib",
    title: "Frontend Developer",
    education: "BS Computer Science (BSCS)",
    university: "COMSATS University Islamabad, Sahiwal Campus",
    semester: "4th Semester",
    phone: "0312-0640282",
    whatsappUrl: "https://wa.me/923120640282",
    email: "sp25-bcs-152@students.cuisahiwal",
    location: "Sahiwal, Punjab, Pakistan",
    tagline: "Better Code ✦ Better Tomorrow"
  },

  // Social media profile links
  // Replace '#' with your actual profile URLs whenever ready
  socialLinks: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/",
    youtube: "https://www.youtube.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/@"
  },

  // Featured Projects Configuration
  // Exactly 4 featured projects as specified
  projects: [
    {
      id: "agromart",
      title: "AgroMart",
      category: "Agricultural E-Commerce Website",
      shortDesc: "An online platform concept for agricultural products, including fertilizers, sprays, and related supplies.",
      fullDesc: "AgroMart is a modern web application concept designed specifically for farmers, growers, and agricultural suppliers. It streamlines the browsing and purchasing of certified fertilizers (NPK, Urea, bio-nutrients), pest protection sprays, high-yield seeds, and farming equipment with localized pricing and category filtering.",
      tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce UI", "Responsive Design"],
      image: "assets/images/projects/agromart.svg",
      liveUrl: "#", // Configure with live demo URL when deployed
      githubUrl: "#", // Configure with GitHub repo URL when pushed
      features: [
        "Product catalog with fertilizer, pesticide, and equipment filters",
        "Interactive shopping cart with real-time total calculation",
        "Responsive cards with high-contrast badge indicators",
        "Order request flow optimized for desktop and mobile devices"
      ]
    },
    {
      id: "weather-app",
      title: "Weather App",
      category: "Weather Web Application",
      shortDesc: "A weather application concept featuring city search, current weather information, temperature, and weather conditions.",
      fullDesc: "A sleek, responsive meteorological dashboard that retrieves real-time weather information and 5-day forecasts for any city worldwide using the legitimate Open-Meteo API. Features real-time temperature, condition indicators (clear, rainy, cloudy, snowy), wind speed, and humidity.",
      tags: ["JavaScript (ES6+)", "Open-Meteo API", "Async/Await", "Dynamic DOM", "Glassmorphism"],
      image: "assets/images/projects/weather-app.svg",
      liveUrl: "#weather-demo-modal", // Triggers the live interactive weather demo!
      githubUrl: "#",
      hasInteractiveDemo: true,
      features: [
        "Live real-time weather search powered by Open-Meteo API",
        "Detailed atmospheric metrics: Wind speed, UV index, Humidity, Feels like",
        "Dynamic condition icons adapting to day/night and cloud cover",
        "Graceful offline and invalid city error handling"
      ]
    },
    {
      id: "portfolio",
      title: "Personal Portfolio",
      category: "Frontend Development",
      shortDesc: "A responsive personal portfolio built to present my skills, education, and projects.",
      fullDesc: "A high-performance, modern developer portfolio website showcasing Muhammad Zohaib's frontend capabilities. Designed with a dark navy/cyan glowing aesthetic, functional dark/light mode toggle with localStorage persistence, fluid responsive navigation, glassmorphism card layouts, and accessible semantic markup.",
      tags: ["HTML5", "CSS3 Variables", "Vanilla JavaScript", "UI/UX Design", "Responsive Layout"],
      image: "assets/images/projects/portfolio-preview.svg",
      liveUrl: "#hero", // Current site
      githubUrl: "#",
      features: [
        "Bespoke dark navy/black & light mode theme engine with instant toggle",
        "Interactive live weather widget demonstration",
        "Zero external framework dependencies for maximum performance",
        "Fully responsive layout across mobile, tablet, and desktop screens"
      ]
    },
    {
      id: "petcare",
      title: "PetCare",
      category: "Pet Care Website",
      shortDesc: "A responsive website concept for pet-care services, with service sections and attractive visuals.",
      fullDesc: "PetCare is an elegant veterinary and pet-wellness platform concept. It presents veterinary healthcare consultation, pet grooming packages, dietary counseling, and emergency contact details in an approachable, warm, and highly professional layout.",
      tags: ["HTML5", "CSS Grid & Flexbox", "JavaScript", "Mobile-First", "UI/UX"],
      image: "assets/images/projects/petcare.svg",
      liveUrl: "#",
      githubUrl: "#",
      features: [
        "Interactive veterinary and grooming service showcase",
        "Appointment inquiry and scheduling card layout",
        "Emergency 24/7 care quick-contact highlight",
        "Clean, friendly visual identity with modern cards and icons"
      ]
    }
  ],

  // Weather API configuration (uses legitimate, free, keyless Open-Meteo API)
  weatherApi: {
    geocodingUrl: "https://geocoding-api.open-meteo.com/v1/search",
    forecastUrl: "https://api.open-meteo.com/v1/forecast",
    defaultCity: "Sahiwal"
  },

  // Firebase Firestore Database Configuration
  // Create a free project at https://console.firebase.google.com and paste your config here:
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
