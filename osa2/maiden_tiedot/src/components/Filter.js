import React from 'react';

const Filter = ({handleFilterChange}) => {
    return (
        <>
            Find countries <input onChange={handleFilterChange}/>
        </>
    )
}

export default Filter