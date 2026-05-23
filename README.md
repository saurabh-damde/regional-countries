# 🌍 Countries Directory App

A premium, fast, and responsive React single-page application built on top of **Vite** and **Vanilla CSS**. This application integrates with the public **REST Countries API** using dynamic strategies, debounced search inputs, robust data normalization layers, and high-fidelity glassmorphism designs.

🚀 **Live Demo:** [Regional Countries](https://regional-countries.vercel.app/)

---

## ✨ Features Implemented

### 1. Dual-Strategy API Integration & Performance Optimization
*   **Restricted Fields Payload Strategy:** Both regional and global API configurations query only the exact fields required (`name,flags,capital,population,currencies,languages,region,cca3`). This optimizes performance by shrinking JSON payloads from **~15MB** down to **~150KB** (a **~99% reduction**).
*   **Double-Fetch Prevention (`useRef` lock):** Solves the React Strict Mode mount-twice hook behavior using a `hasFetched` reference to ensure only a single API request triggers on initial startup.
*   **Resilient API Handling with Hard Timeouts:**
    *   **AbortController API:** Integrates a hard network timeout of **15 seconds** that cancels hanging network requests and prompts the user with an actionable failure message.
    *   **Slow Network Notification:** Detects connections that take longer than **5 seconds** and displays a helpful wait status message.

### 2. Custom Dynamic Region Switching
*   **Global Config-Driven Switching:** The directory can be targeted to show countries from any continent by updating the `REGION` config constant (`africa`, `americas`, `antarctic`, `asia`, `europe`, `oceania`).
*   **Local Filtering vs. API Strategy Switch:** Integrates an `USE_REGION_ENDPOINT` switch to fetch directly from regional endpoints or fetch globally and filter client-side.
*   **Polished UI Helpers:** Implements custom text-normalization helpers (`pascalCase`) and continent lookups (`REGION_LABELS`) to automatically synchronize all headers, subtitles, and search feedback.

### 3. Optimized Search Debounce Logic
*   **Instant/Lag-Free Input Updates:** The search bar reflects user inputs instantaneously for smooth key-stroke interaction.
*   **300ms Debounce Handler:** The search filter postpones data updates by **300ms** to minimize re-renders and deliver incredibly snappy responses.
*   **Clear Button Controls:** Features a modern input clear option which resets the search criteria instantly.

### 4. Custom Normalization & Error States
*   **Robust Normalization Layer:** Safely formats unpredictable REST Countries API data arrays, language dictionary keys, formatted currencies, and local populations into steady layouts, avoiding classic React runtime undefined errors.
*   **User Actionable Failure States:** Surfaces direct "Operational Failure" cards with "Try Again" triggers for failed or timed-out requests.
*   **Empty State Layouts:** Friendly search-not-found placeholders with descriptive responses.

### 5. Premium Layout & High-Fidelity UI Design
*   **Vanilla CSS Flexbox Layouts:** Modern fluid layout architecture designed completely from scratch (no external frameworks like Tailwind or Bootstrap).
*   **Glassmorphic Design Palette:** A curated, luxury dark-theme palette featuring rich HSL background gradients, soft backdrop-blur card layers, interactive neon highlights, and subtle micro-animations for key actions.

---

## 🛠️ Tech Stack
*   **Framework:** React 19 (JavaScript)
*   **Build Tool:** Vite 8
*   **Styling:** Custom Vanilla CSS (Flexbox Grid)
*   **API Sources:** [REST Countries v3.1 API](https://restcountries.com/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 20.19+ or 22.12+ recommended).

### 2. Installation
Clone the repository and install all dependencies:
```bash
# Install packages
npm install
```

### 3. Running Locally (Development Mode)
Launch the local development server:
```bash
npm run dev
```
The application will boot up at `http://localhost:5173` (or the next available port).

### 4. Building for Production
Bundle the production assets:
```bash
# Build the application
npm run build

# Preview the build locally
npm run preview
```
All production files will build into the `/dist` directory.

---

## 📂 File Architecture
```text
src/
├── components/
│   ├── CountryCard.jsx      # Individual normalization & UI card component
│   ├── CountryList.jsx      # Flexbox-driven cards grid wrapper
│   └── SearchInput.jsx      # Styled, instant-search bar input
├── App.css                  # Global style variables, transitions, and glassmorphic designs
├── App.jsx                  # Main application state, fetch controllers, and debouncing
├── index.css                # Initial base resets & root values
└── main.jsx                 # Application DOM entry-point
```
