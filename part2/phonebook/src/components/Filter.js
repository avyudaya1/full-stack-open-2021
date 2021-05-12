const Filter = ({filterText, handleFilterChange}) => {
    return (
        <form>
            <div>
                filter shown with <input value={filterText} onChange={handleFilterChange}/>
            </div>
        </form>
    )
}

export default Filter;