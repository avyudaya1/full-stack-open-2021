import React, { useState } from 'react'

const Statistic = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  let all = good + neutral + bad
  let average = (good * 1 + bad * -1) / all
  let positive = good * 100 / all

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive + " %"} />
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.clickEvent}>{props.text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => {
    setGood(good + 1)
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }

  const handleBadReview = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' clickEvent={handleGoodReview} />
      <Button text='neutral' clickEvent={handleNeutralReview} />
      <Button text='bad' clickEvent={handleBadReview} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;