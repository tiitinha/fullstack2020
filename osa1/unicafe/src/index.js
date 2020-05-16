import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

)

const Statistics = ({ good, neutral, bad}) => {

  if (good + bad + neutral !== 0) {

  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = ((good / all) * 100).toFixed(1) + ' %'

  return(
  <>
  <h1>statistics</h1>
  <table>
    <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </tbody>
  </table>
  </>
  )}

  return (
    <>
    <h1>statistics</h1>
    <p>No feedback given</p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => setGood(good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const badFeedback= () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} text='good'/>
      <Button handleClick={neutralFeedback} text='neutral'/>
      <Button handleClick={badFeedback} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)