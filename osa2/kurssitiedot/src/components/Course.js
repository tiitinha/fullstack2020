import React from 'react';

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(coursePart => 
            <Part key={coursePart.id} part={coursePart} />
        )}
      </div>
    )
}
  
const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
}

const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}

const Total = ({parts}) => {

    const exercises = 
        parts.reduce((prevValue, currentValue) => prevValue + currentValue.exercises, 0)

    return (
        <b>
            Total of {exercises} exercises
        </b>
    )
}


const Course = ({course}) => {
    return(
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>       
    )
}

export default Course