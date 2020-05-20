import React from 'react';

const Filter = ({filterValue, handleFilterChange}) => {
    return (
        <>
            Find countries <input value={filterValue} onChange={handleFilterChange}/>
        </>
    )
}

export default Filter