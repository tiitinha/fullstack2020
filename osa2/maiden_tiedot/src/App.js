import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'

const App = () => {

  const apiKey = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(filter)))
  }

  const handleClick = (event) => {
    const filter = event.target.value
    setFilteredCountries(countries.filter(country => country.name.toLowerCase() === (filter.toLowerCase())))
  }

  return (
    <div>
      <Filter 
        handleFilterChange={handleFilterChange}
      />
      <Display
        countries={filteredCountries} apiKey={apiKey} handleClick={handleClick}
      />
    </div>
  );
}

export default App;
