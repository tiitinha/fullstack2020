import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])


  const [ newName, setNewName ] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [ filterValue, setFilterValue ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.map(person => person.name).includes(newName)) {
      setPersons(persons.concat(phonebookObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is aldeady added to phonebook`)
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => [
    setFilterValue(event.target.value)
  ]
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm 
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} filterValue={filterValue}/>
    </div>
  )

}

export default App