import React from 'react'

const Countries = ({ countriesToShow, setCountriesToShow }) => {
  if (countriesToShow.length === 1) return null;

  return countriesToShow.map((country) => (
    <p>{country.name.common}<button onClick={() => setCountriesToShow([country])}>show</button></p>
  ));
};

export default Countries;