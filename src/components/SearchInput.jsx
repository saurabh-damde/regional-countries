import React from 'react';

export default function SearchInput({ value, onChange, onClear }) {
  return (
    <div className="search-container" id="search-container-wrapper">
      <div className="search-wrapper">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          id="country-search-input"
          className="search-input"
          value={value}
          onChange={onChange}
          placeholder="Search countries by name..."
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="clear-button"
            onClick={onClear}
            aria-label="Clear search"
            id="search-clear-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
