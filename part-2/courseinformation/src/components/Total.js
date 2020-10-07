import React from 'react'

const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => {
        sum = sum + part.exercises
        return sum
    }, 0)
    return(
      <h3>total of exercises {sum}</h3>
    ) 
  }

export default Total