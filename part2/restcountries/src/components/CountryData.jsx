import React from 'react'
import WeatherReport from './WeatherReport'

const CountryData = ({country}) => {
  return (
    <div>
    <h1>{country.name.common} ({country.name.official})</h1>
    <div>Capital:{country.capital}</div>
    <div>Area:{country.area}</div>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li>{language}</li>
      ))}
    </ul>
    <img src={country.flags.png}/>
    <WeatherReport city={country.capital} />
  </div>
  )
}

export default CountryData