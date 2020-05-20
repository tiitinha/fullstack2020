import React from 'react';
import Weather from './Weather.js'

const Country = ({country, apiKey}) => {

    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages:</h2>
            <ul>
                {country.languages.map(lang => 
                    <li key={lang.name}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} width={250} alt={country.name}/>
            <Weather city={country.capital} apiKey={apiKey} />
        </>
    )
    

}

export default Country