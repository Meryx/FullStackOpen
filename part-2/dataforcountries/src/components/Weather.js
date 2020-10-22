import React from 'react'

const Weather = ({ country, temp }) =>{
    console.log(temp)
    if(temp.current){
        return (
            <>
                <h3>Weather in {country.name}</h3>
                <p><strong>temprature:</strong> {temp.current.temperature} Celcius</p>
            </>
        )
    }
    return (
        <>
        </>
    )
}

export default Weather