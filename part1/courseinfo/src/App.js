import React from 'react'
//dont mutate state components directly like allClicks.push('L')
//useState, useEffect must not be called from a loop, conditional expression or any place that is not a function defining a component.

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts : [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.map(part => part.exercises).reduce((a, b)=> a+b, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

export default App;
