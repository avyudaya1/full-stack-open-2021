const Persons = ({persons, handleDelete}) => {
    return (
        <div>
           {
               persons.map(person => {
                   return (
                       <p key={person.id}>
                           {person.name} {person.number}
                           <button style={{marginLeft: 10}} onClick={()=>handleDelete(person.id, person.name)}>
                                delete
                           </button>
                       </p>
                   )
               })
           }
        </div>
    )
}

export default Persons;