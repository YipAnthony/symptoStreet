import React from 'react'

export default function SearchBar(props) {
    const { searchInput, setSearchInput } = props
    const { address, zipcode, zipcodeRadius } = searchInput


    const handleSearchInput = (e) => {
        const userInput = e.target.value

        // Test if zipcode is type Number
        const numberRegex = /^[0-9]*$/
        const isZipcodeANumber = numberRegex.test(userInput)

        if (e.target.id === "zipcode" && !isZipcodeANumber) {
            return
        }
        setSearchInput(prev => {
            return {
                ...prev,
                [e.target.id]: userInput
            }
        })
    }

    return (
        <div>
            <form className="d-flex justify-content-around">
                <div className="d-flex">
                    <input 
                        id="address"
                        className="form-control mr-sm-2" 
                        type="search"
                        value={address}
                        onChange={handleSearchInput}
                        placeholder="Search by address"
                    />
                    <button className="btn btn-primary">Search</button>
                </div>
                <div className="d-flex">
                    <input 
                        id="zipcode"
                        className="form-control mr-sm-2" 
                        type="search"
                        value={zipcode}
                        onChange={handleSearchInput}
                        placeholder="Search by zipcode"
                    />
                    <div className="zipcodeSlideContainer">
                        <label>Search Radius: {zipcodeRadius}mi</label>
                        <input type="range" min="1" max="5" value={zipcodeRadius} onChange={handleSearchInput} className="slider" id="zipcodeRadius"/>
                    </div>
                    <button className="btn btn-primary">Search</button>

                </div>

            </form>
            
        </div>
    )
}
