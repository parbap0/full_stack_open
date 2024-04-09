import { useEffect, useState } from "react"
import axios from 'axios'
import Countries from "./components/Countries"
import CountryData from "./components/CountryData"

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState("")
  const [countriesToShow, setCountriesToShow] = useState([])

  const handleQueryChange = (e) =>{
    e.preventDefault()
    setQuery(e.target.value)
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    );
    console.log(countriesToShow)
  }
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {
      setCountries(response.data);
      console.log(countries)
    });
  }, []);

  return (
    <div>
      <div>
        Find countries <input value={query} onChange={handleQueryChange} />
      </div>
      {countriesToShow.length === 1 ? (
        <CountryData country={countriesToShow[0]} />
      ) : null}
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countriesToShow={countriesToShow}
          setCountriesToShow={setCountriesToShow}
        />
      )}
    </div>
  )
}

export default App