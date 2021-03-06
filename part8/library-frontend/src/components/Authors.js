import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetAuthorBirthYear from './SetAuthorBirthYear'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)

  useEffect(()=> {
    if(!result)
      setAuthors(result.data.allAuthors)
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors && authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetAuthorBirthYear authorsNames={authors.map((a) => a.name)} />
    </div>
  )
}

export default Authors