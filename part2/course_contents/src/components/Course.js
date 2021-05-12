const Course = ({ course }) => {

    const total = course.parts.reduce((sum, part) => {
        sum +=part.exercises
        return sum
    }, 0)
    
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(c => {
                return <p key={c.id}>{c.name} {c.exercises}</p>
            })}
            <p>total of {total} exercises</p>
        </div>
    )
}

export default Course;