import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import CountryList from './components/CountryList';

// Fetch options to restrict fields and keep payload size small
const USE_REGION_ENDPOINT = false;
const FIELDS = 'name,flags,capital,population,currencies,languages,region,cca3';
const REGION = 'europe';
const REGION_LABELS = {
  africa: "African",
  americas: "American",
  antarctic: "Antarctic",
  asia: "Asian",
  europe: "European",
  oceania: "Oceanian",
};

const pascalCase = (str = "", del = " ") => {
  return str
    .split(del)
    ?.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(del);
};

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const hasFetched = useRef(false);

  const fetchCountries = async () => {
    setIsLoading(true);
    setError(null);
    setIsSlowConnection(false);

    // Flag slow connection after 5 seconds
    const slowTimer = setTimeout(() => setIsSlowConnection(true), 5000);

    // Force abort after 15 seconds
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), 15000);

    try {
      const url = USE_REGION_ENDPOINT
        ? `https://restcountries.com/v3.1/region/${REGION}?fields=${FIELDS}`
        : `https://restcountries.com/v3.1/all?fields=${FIELDS}`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      let list = [];

      if (USE_REGION_ENDPOINT) {
        list = Array.isArray(data) ? data : [];
      } else {
        // Filter regional matches locally if using the global endpoint
        list = data.filter(c => c.region?.toLowerCase() === REGION);
      }

      setCountries(list);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Connection timed out. Please check your network and try again.');
      } else {
        setError(err.message || 'Failed to load countries. Please try again.');
      }
    } finally {
      clearTimeout(slowTimer);
      clearTimeout(abortTimer);
      setIsLoading(false);
      hasFetched.current = false;
    }
  };

  useEffect(() => {
    if(hasFetched.current) return;

    hasFetched.current = true;
    fetchCountries();
  }, []);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredCountries = countries.filter(c => {
    const name = c.name?.common || '';
    return name.toLowerCase().includes(debouncedQuery.toLowerCase());
  });

  return (
    <div className="app-container" id="countries-directory-app">
      <header className="app-header" id="app-main-header">
        <h1 className="app-title">{REGION_LABELS[REGION]} Countries Directory</h1>
        <p className="app-subtitle">
          Discover details, demographics, and currencies of nations across {pascalCase(REGION)}. 
          Use the search bar below to filter results instantly.
        </p>
      </header>

      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery('')}
      />

      {isLoading ? (
        <div className="loading-wrapper" id="loading-state-view">
          <div className="spinner" aria-label="Loading spinner"></div>
          <p className="loading-text">Fetching country database...</p>
          {isSlowConnection && (
            <p className="slow-connection-notice" id="slow-connection-message">
              This is taking longer than usual. Please wait...
            </p>
          )}
        </div>
      ) : error ? (
        <div className="error-wrapper" id="error-state-view">
          <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="error-title">Operational Failure</h2>
          <p className="error-message">{error}</p>
          <button type="button" className="retry-button" onClick={fetchCountries} id="retry-fetch-btn">
            Try Again
          </button>
        </div>
      ) : filteredCountries.length === 0 ? (
        <div className="empty-wrapper" id="empty-state-view">
          <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="empty-title">No Search Matches</h2>
          <p className="empty-message">
            No countries found matching '{searchQuery}'.
          </p>
        </div>
      ) : (
        <CountryList countries={filteredCountries} />
      )}
    </div>
  );
}
