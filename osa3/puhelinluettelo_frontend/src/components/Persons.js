import React from 'react'
import Person from './Person'


const Persons = ({persons, filterValue, handleDelete}) => (

    persons
        .filter(person => 
            person.name.toLowerCase()
            .includes(filterValue))
        .map(person => 
            <Person key={person.id} 
                name={person.name} 
                number={person.number}
                id={person.id}
                handleDelete={handleDelete}
            />
        )
        
)


export default Persons