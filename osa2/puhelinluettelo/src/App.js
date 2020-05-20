import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [ filterValue, setFilterValue ] = useState('')


  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = persons.find(p => p.name === newName)

    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    if (newPerson == null) {
      personsService
        .create(phonebookObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(
            `ERROR! Cannot add ${phonebookObject.name}`
          )
        })
    } else {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with the new one?`)) {
        personsService
          .replace(phonebookObject, newPerson.id)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== newPerson.id ? person : returnedPerson))
          })
      }
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

  const handleDeleteClick = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      const removedPerson = persons.find(p => p.name === event.target.name)
      personsService
        .remove(event.target.id)
        .then(
          setPersons(persons.filter(p => p !== removedPerson))
        )
    }
  }
  

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
        <Persons persons={persons} filterValue={filterValue} handleDelete={handleDeleteClick}/>
    </div>
  )

}

export default App