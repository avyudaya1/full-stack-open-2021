import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DisplayCountryDetails from './components/DisplayCountryDetails';

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState([])

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => setCountries(response.data))
  }
  useEffect(hook, [])

  const findCountries = (event) => {
    setInput(event.target.value)
    const searchCountries = countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase()) === true)
    setSearchCountries(searchCountries)
  }

  return (
    <div>
      <form>
        find countries <input value={input} onChange={findCountries} />
      </form>
      <DisplayCountryDetails searchCountries={searchCountries} input={input} />
    </div>
  )
}


export default App
