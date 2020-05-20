import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({city, apiKey}) => {

    const [cityWeather, setCityWeather] = useState()

    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
          .then(response => {
              console.log(response.data.main.temp)
              console.log(response.data.wind.speed)
              setCityWeather(response.data)
          })
        }, [city, apiKey])

    if (cityWeather !== undefined) {
        return (
            <div>
                <h3>{city} weather</h3>
                <p>Temperature: {cityWeather.main.temp} C </p>
                <p> Wind: {cityWeather.wind.speed} m/s </p>
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