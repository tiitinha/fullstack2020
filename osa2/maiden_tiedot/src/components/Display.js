import React from 'react';
import Country from './Country'

const Display = ({countries, apiKey, handleClick}) => {


    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        return (
            <>
                {countries.map((country, i) => 
                    <p key={i}>{country.name}
                         <button value={country.name} onClick={handleClick}>show</button>  
                    </p>
                )}
    
            </>
        )
    } else if (countries.length === 1) {

        return (
            <>
                <Country country={countries[0]} apiKey={apiKey}/>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Display