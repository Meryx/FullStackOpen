import React from 'react'
import Button from './Button'

const Countries = ({ countries, callback }) => {
    if (countries.length > 10){
        return (
            <>
                <p>Too many matches, specify another filter</p>
            </>
        )
    }
    return (
        <ul>
            {countries.map(country => {
                return (
                    <li key={country.name}>
                        {country.name} <Button text="show" handleClick={callback(country)} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Countries