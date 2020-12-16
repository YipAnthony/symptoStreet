import React from 'react'
import numeral from 'numeral'

export default function SearchFilters(props) {

    const { searchFilters, setSearchFilters } = props
    const { priceInputMin, priceInputMax, sqftInputMin, sqftInputMax, bedsInput, bathsInput } = searchFilters

    const handleChange = (e) => {
        const input = e.target.value

        // price input must be type Number
        const priceRegex = /^[$0-9\s][0-9,.\s]*$/
        const isValidNumber = priceRegex.test(input)

        if (e.target.id === "bathsInput" || e.target.id === "bedsInput") {
            setSearchFilters(prev => {
                return {
                    ...prev,
                    [e.target.id]: input
                }
            })
        } else if (isValidNumber || input === "") {
            setSearchFilters(prev => {
                return {
                    ...prev,
                    [e.target.id]: input.replace(/[,$]/g, "")
                }
            })
        }

    }

    // zipcoderadius
    // beds
    // baths
    // sqft

    return (
        <div id="searchFilterContainer" className="card">
            
            <h3 id="filterContainerTitle">Filter by:</h3>
            <hr/>

            <p id="priceFilter">
                <button 
                    className="btn btn-light" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapsePriceFilter" 
                    aria-expanded="false" 
                    aria-controls="collapsePriceFilter"
                >
                    Price
                </button>
            </p>
            <div className="collapse" id="collapsePriceFilter">
                <input 
                    id="priceInputMin" 
                    className="priceInput" 
                    value={priceInputMin === "" ? "": numeral(priceInputMin).format('$0,0')} 
                    type="text" 
                    placeholder="Min" 
                    onChange={handleChange}
                /> to
                <input 
                    id="priceInputMax" 
                    className="priceInput" 
                    value={priceInputMax === "" ? "": numeral(priceInputMax).format('$0,0')} 
                    type="text" 
                    placeholder="Max" 
                    onChange={handleChange}
                />
            </div>
            <hr/>

            <p id="sqftFilter">
                <button 
                    className="btn btn-light" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseSqftFilter" 
                    aria-expanded="false" 
                    aria-controls="collapseSqftFilter"
                >
                    Square Feet
                </button>
            </p>
            <div className="collapse" id="collapseSqftFilter">
                <input 
                    id="sqftInputMin" 
                    className="sqftInput" 
                    value={sqftInputMin === "" ? "": numeral(sqftInputMin).format('0,0')} 
                    type="text" 
                    placeholder="Min" 
                    onChange={handleChange}/> to
                <input 
                    id="sqftInputMax" 
                    className="sqftInput" 
                    value={sqftInputMax === "" ? "": numeral(sqftInputMax).format('0,0')} 
                    type="text" 
                    placeholder="Max" 
                    onChange={handleChange}/>
            </div>
            <hr/>

            <p id="bedsBathFilter">
                <button 
                    className="btn btn-light" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseBedsBathFilter" 
                    aria-expanded="false" 
                    aria-controls="collapseBedsBathFilter"
                >
                    Bed & Baths
                </button>
            </p>
            <div className="collapse" id="collapseBedsBathFilter">
                <div className="d-flex justify-content-around">
                    <div className="form-group">
                        <label>Bedrooms</label>
                        <select 
                            id="bedsInput" 
                            className="form-select form-select-sm bedbathInput" 
                            aria-label=".form-select-sm beds"
                            value={bedsInput}
                            onChange={handleChange}
                        >
                            <option value="">No preference</option>
                            <option value="12">1-2</option>
                            <option value="23">2-3</option>
                            <option value="40">4+</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Bathrooms</label>
                        <select 
                            id="bathsInput"
                            className="form-select form-select-sm bedbathInput" 
                            aria-label=".form-select-sm baths" 
                            value={bathsInput}
                            onChange={handleChange}
                        >
                            <option value="">No preference</option>
                            <option value="12">1-2</option>
                            <option value="23">2-3</option>
                            <option value="40">4+</option>
                        </select>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}
