import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const hook = () => {
    if(name !== ''){
      axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`).then((response) => setCountry(response.data[0]))
      .catch(err => setCountry({found: false}))
    }
  }

  useEffect(hook, [name])

  return country
}

