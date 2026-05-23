# 🌍 Countries Directory App

A premium, fast, and responsive React single-page application built with **Vite** and **Vanilla CSS**, featuring real-time data fetching, search, filtering, and sorting.

🚀 **Live Demo:** [Regional Countries](https://regional-countries.vercel.app/)

---

## ⚡ Features

- **Dynamic Region Switcher**: Easily filter countries by continent (Asia, Europe, Africa, Americas, Oceania, Antarctic).
- **Alphabetical Sorting**: Sort countries instantly from A-Z or Z-A.
- **Optimized Live Search**: Snappy search bar with a built-in 300ms debounce to prevent unnecessary renders.
- **Performant Data Fetching**: Queries only necessary fields to reduce payload size by ~99% (~15MB down to ~150KB).
- **Network Resilience**: Enforces a 15-second timeout via `AbortController` and displays custom notices for slow connections.
- **Vibrant Dark Theme**: Responsive glassmorphic layout created entirely from scratch using vanilla CSS and Flexbox.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vanilla CSS
- **Build Tool**: Vite 8
- **Data Source**: [REST Countries API](https://restcountries.com/)

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Locally (Development)
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── CountryCard.jsx   # Normalization & details card
│   ├── CountryList.jsx   # Flexbox layout wrapper
│   └── SearchInput.jsx   # Debounced search bar
├── App.css               # Premium variables and glassmorphism styling
├── App.jsx               # Global state, fetch handlers, and controls
├── index.css             # Base resets
└── main.jsx              # DOM entrypoint
```
