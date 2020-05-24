import React from 'react'


const Person = ({name, number, handleDelete, id}) => (
    <p>
        {name} {number}
        <button onClick={handleDelete} id={id} name={name}>delete</button>
    </p>
)

export default Person