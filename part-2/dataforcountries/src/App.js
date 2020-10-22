import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Countryview from './components/Countryview'
import Weather from './components/Weather'

import axios from 'axios'





const App = () => {

  console.log("render")
  const api_key = process.env.REACT_APP_API_KEY


  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countryState, setCountryState ] = useState({})
  const [ temp, setTemp ] = useState({})


  const handleFilter = (e) => {
    setFilter(e.target.value)
    setCountryState({})
  }



  function getHandleView(country) {
    function handleFunction(){
      setCountryState(country)
    }
    
    return handleFunction
  }


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const renderHook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryState.capital}`)
      .then(response => {
        if(Object.keys(temp).length === 0){
          setTemp(response.data)
        }
      })
  }

  useEffect(renderHook)

  const filtered = countries.filter(country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))


  if(Object.keys(countryState).length !== 0)
  {
      return (
        <>
          <form>
            <div>
              find countries
              <input value={filter} onChange={handleFilter}/>
            </div>
          </form>
          <Countryview country={countryState} />
          <Weather country={countryState} temp={temp}/>
        </>
      )
      
  }

  if (filtered.length === 1){
    return (
        <>
          <form>
            <div>
              find countries
              <input value={filter} onChange={handleFilter}/>
            </div>
          </form>
          <Countryview country={filtered[0]} />
        </>
    )
  }




  return (
    <>
      <form>
        <div>
          find countries
          <input value={filter} onChange={handleFilter}/>
        </div>
      </form>
      <div>
        <Countries countries={filtered} callback={getHandleView} />
      </div>
    </>
  )
}



export default App;
