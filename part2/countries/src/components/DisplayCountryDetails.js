import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SpecificCountry = (props) => {
    const details = props.specificCountry
    const [flag, setFlag] = useState(false)
    const showDetails = () => { setFlag(true) }

    if (!flag) {
        return (
            <>
                <span>{details.name}</span>&nbsp;
                <button onClick={showDetails}>show</button>
                <br />
            </>
        )
    } else if (flag) {
        return (
            <>
                <h1>{details.name}</h1>
                <div>capital {details.capital}</div>
                <div>population {details.population}</div>
                <h2>languages</h2>
                {details.languages.map((language, i) => <li key={i}>{language.name}</li>)}
                <br />
                <img src={details.flag} alt="flag" height="150" width="150" />
                <br />
            </>
        )
    }
}

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})

    const hook = () => {
        axios.get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + capital).then((response) => setWeather(response.data.current))
    }
    useEffect(hook, {})
    return (
        <>
            <h2>Weather of {capital}</h2>
            <div><strong>temperature:</strong> {weather.temperature} Celcius</div>
            <img src={weather.weather_icons} alt="weather" />
            <div><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</div>
        </>
    )

}

const DisplayCountryDetails = ({ searchCountries, input }) => {
    if (input === '') {
        return (
            <></>
        )
    } else if (searchCountries.length > 10) {
        return (
            <div>Too many matches,specify another filter</div>
        )
    } else if (searchCountries.length === 1) {
        const country = searchCountries[0]

        return (
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
                <br />
                <img src={country.flag} alt="flag" height="150" width="150" />
                <Weather capital={country.capital} />
            </>
        )
    } else {
        return (
            <>
                {searchCountries.map((specificCountry, i) => {
                    return (<SpecificCountry key={i} specificCountry={specificCountry} />)
                })}
            </>
        )
    }

}

export default DisplayCountryDetails