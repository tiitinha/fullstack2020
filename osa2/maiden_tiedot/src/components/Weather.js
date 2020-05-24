import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({city, apiKey}) => {

    const [cityWeather, setCityWeather] = useState()

    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
          .then(response => {
              setCityWeather(response.data)
          })
        }, [city, apiKey])

    if (cityWeather !== undefined) {
        return (
            <div>
                <h3>{city} weather</h3>
                <p>Temperature: {cityWeather.main.temp} C </p>
                <p> Wind: {cityWeather.wind.speed} m/s </p>
                <p>{cityWeather.weather[0].main}, {cityWeather.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt={city}/>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Weather


// ed049725c09812fec023f44d2e4d4e72