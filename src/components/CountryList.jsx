import React from 'react';
import CountryCard from './CountryCard';

export default function CountryList({ countries }) {
  return (
    <div className="countries-list-container" id="countries-list-container">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3 || country.name?.common || Math.random()}
          country={country}
        />
      ))}
    </div>
  );
}
