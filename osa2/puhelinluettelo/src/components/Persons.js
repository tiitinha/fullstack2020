import React from 'react'
import Person from './Person'


const Persons = ({persons, filterValue}) => (

    persons
        .filter(person => 
            person.name.toLowerCase()
            .includes(filterValue))
        .map(person => 
            <Person key={person.name} 
                name={person.name} 
                number={person.number}
            />
        )
        
)


export default Persons