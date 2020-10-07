import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodhandler = () => {
    setGood(good + 1)
  }

  const neutralhandler = () => {
    setNeutral(neutral + 1)
  }

  const badhandler = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <DisplayTitle text="give feedback" />
      <Button onClick={goodhandler} text="good" />
      <Button onClick={neutralhandler} text="neutral" />
      <Button onClick={badhandler} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Display = ({ text }) => {
  return (
    <>
      <p>{text}</p>
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if ((good + bad + neutral) <= 0) {
    return (
      <>
        <DisplayTitle text="statistics" />
        <Display text="No feedback given" />
      </>
    )
  }
  return (
    <>
      <DisplayTitle text="statistics" />
      <table>
        <Statistic text="good" counter={good}/>
        <Statistic text="neutral" counter={neutral}/>
        <Statistic text="bad" counter={bad}/>
        <Statistic text="all" counter={good + bad + neutral} />
        <Statistic text="average" counter={(good - bad) / (good + neutral + bad)} />
        <Statistic text="positive" counter = {(good) / (good + neutral + bad)} unit = "%" />
      </table>
    </>
  )
}

const Statistic = ({ text, counter, unit }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td><td>{counter}</td><td>{unit}</td>
      </tr>
    </tbody>
  )
}




const DisplayTitle = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <> 
      <button type="button" onClick={onClick}>
        {text}
      </button>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)