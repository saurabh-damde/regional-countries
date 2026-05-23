import React from 'react';

function normalizeCountry(raw) {
  const name = raw?.name?.common || 'N/A';
  const flagUrl = raw?.flags?.svg || raw?.flags?.png || '';
  
  let capital = 'N/A';
  if (Array.isArray(raw?.capital) && raw.capital.length > 0) {
    capital = raw.capital[0] || 'N/A';
  }
  
  let population = 'N/A';
  if (typeof raw?.population === 'number') {
    population = raw.population.toLocaleString();
  }
  
  let currency = 'N/A';
  if (raw?.currencies && typeof raw.currencies === 'object') {
    const keys = Object.keys(raw.currencies);
    if (keys.length > 0) {
      const curr = raw.currencies[keys[0]];
      if (curr) {
        if (curr.name && curr.symbol) {
          currency = `${curr.name} (${curr.symbol})`;
        } else {
          currency = curr.name || curr.symbol || 'N/A';
        }
      }
    }
  }
  
  let languages = 'N/A';
  if (raw?.languages && typeof raw.languages === 'object') {
    const list = Object.values(raw.languages);
    if (list.length > 0) {
      languages = list.join(', ');
    }
  }

  return { name, flagUrl, capital, population, currency, languages };
}

export default function CountryCard({ country }) {
  const data = normalizeCountry(country);

  return (
    <article className="country-card" id={`country-card-${data.name.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="flag-container">
        {data.flagUrl ? (
          <img
            src={data.flagUrl}
            alt={`Flag of ${data.name}`}
            className="flag-image"
            loading="lazy"
          />
        ) : (
          <div className="flag-placeholder">No Flag Available</div>
        )}
      </div>
      <div className="card-info">
        <h2 className="country-title">{data.name}</h2>
        <div className="info-row">
          <span className="info-label">Capital:</span>
          <span className="info-value">{data.capital}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Population:</span>
          <span className="info-value">{data.population}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Currency:</span>
          <span className="info-value">{data.currency}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Languages:</span>
          <span className="info-value">{data.languages}</span>
        </div>
      </div>
    </article>
  );
}
