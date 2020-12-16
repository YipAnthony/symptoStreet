import React from 'react'

export default function SearchBar(props) {
    const { searchInput, setSearchInput } = props

    const handleSearchInput = (e) => {
        const userInput = e.target.value
        setSearchInput(userInput)
    }

    return (
        <div>
            <form className="form-inline">
                <input 
                    className="form-control mr-sm-2" 
                    type="search"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search by zipcode or address"
                />

            </form>
        </div>
    )
}
