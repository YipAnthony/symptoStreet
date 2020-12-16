import React from 'react'

export default function SearchBar(props) {
    const { searchInput, setSearchInput } = props

    const handleSearchInput = (e) => {
        const userInput = e.target.value
        setSearchInput(userInput)
    }

    return (
        <div>
            <form className="d-flex justify-content-around">
                <div className="d-flex">
                    <input 
                        id="addressSearch"
                        className="form-control mr-sm-2" 
                        type="search"
                        value={searchInput}
                        onChange={handleSearchInput}
                        placeholder="Search by address"
                    />
                    <button className="btn btn-primary">Search</button>
                </div>
                <div className="d-flex">
                    <input 
                        id="zipcodeSearch"
                        className="form-control mr-sm-2" 
                        type="search"
                        value={searchInput}
                        onChange={handleSearchInput}
                        placeholder="Search by zipcode"
                    />
                    <button className="btn btn-primary">Search</button>

                </div>

            </form>
            
        </div>
    )
}
