import React  from 'react'


const Countryview = ({ country }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <br/>
            <p>
                capital {country.capital}<br/>
                population {country.population}
            </p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => {
                    return (
                        <li key={language.iso639_1}>
                            {language.name}
                        </li>
                    )
                })}
            </ul>
            <img src={country.flag} alt="" width="200px" height="200px" />
        </>
    )
}

export default Countryview