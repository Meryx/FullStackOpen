import React, { useState, useEffect } from 'react'
import phoneService from './services/phone'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const hook = () => {
    console.log('effect')
    phoneService
      .getAll()
      .then(init => {
        setPersons(init)
      })
  }
  
  useEffect(hook, [])

  const handleSubmit = (e) => { 
    e.preventDefault()
    if(persons.some(person => person.name === newName)){
        alert(`${newName} is already added to the phonebook`)
        return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    phoneService
      .create(newPerson)
      .then(created => {
        setPersons(persons.concat(created))
        setNewName('')
        setNewNumber('')
      })
    
  }

  const handleChange = (e) =>{
      setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
      setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
      setFilter(e.target.value)
      console.log(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
          <div>
              filter shown with
              <input value={filter} onChange={handleFilter}/>
          </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map(person => {
              return (
                  <li key={person.name}>
                      {person.name} {person.number} <button type="button" onClick={
                        () => {
                          axios.delete(`http://localhost:3001/persons/${person.id}`)
                          .then(setPersons(persons.filter(
                            p => p.id !== person.id
                          ))) 
                        }
                      }>DELETE</button>
                  </li>
              )
          })}
      </ul>
    </div>
  )
}

export default App