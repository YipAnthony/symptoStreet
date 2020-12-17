import React, { useState } from 'react'
import numeral from 'numeral'

import { downArrow, upArrow } from '../icons/icons'

export default function SearchFilters(props) {

    const { searchFilters, setSearchFilters } = props
    const { priceInputMin, priceInputMax, sqftInputMin, sqftInputMax, bedsInput, bathsInput } = searchFilters

    const [ filterToggles, setFilterToggles ] = useState({price: false, sqft: false, bedBath: false})

    const handleFilterToggle = (e) => {
        setFilterToggles(prev => {
            return {
                ...prev,
                [e.target.id]: !prev[e.target.id]
            }
        })
    }

    const handleChange = (e) => {
        const input = e.target.value

        // price & sqft input must be type Number
        const priceRegex = /^[$0-9\s][0-9,.\s]*$/
        const isValidNumber = priceRegex.test(input)

        if (isValidNumber || input === "" || e.target.id === "bathsInput" || e.target.id === "bedsInput") {
            setSearchFilters(prev => {
                return {
                    ...prev,
                    [e.target.id]: input.replace(/[,$]/g, "")
                }
            })
        }
    }

    return (
        <form id="searchFilterContainer" className="" autoComplete="off">
            
            <h3 id="filterContainerTitle">Filter by:</h3>
            <hr/>

            <p id="priceFilter">
                <span className="toggleFilter">
                    <button 
                        id="price"
                        className="btn btn-light shadow-none" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapsePriceFilter" 
                        aria-expanded="false" 
                        aria-controls="collapsePriceFilter"
                        onClick={handleFilterToggle}
                        >
                        {filterToggles.price ? upArrow: downArrow}
                        <span className="toggleText">Price</span>
                    </button>
                </span>
            </p>
            <div className="collapse" id="collapsePriceFilter">
                <input 
                    id="priceInputMin" 
                    className="priceInput filterInput" 
                    value={priceInputMin === "" ? "": numeral(priceInputMin).format('$0,0')} 
                    type="text" 
                    placeholder="Min" 
                    onChange={handleChange}
                /> {` - `}
                <input 
                    id="priceInputMax" 
                    className="priceInput filterInput" 
                    value={priceInputMax === "" ? "": numeral(priceInputMax).format('$0,0')} 
                    type="text" 
                    placeholder="Max" 
                    onChange={handleChange}
                />
            </div>
            <hr/>

            <p id="sqftFilter">
                <button 
                    id="sqft"
                    className="btn btn-light shadow-none" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseSqftFilter" 
                    aria-expanded="false" 
                    aria-controls="collapseSqftFilter"
                    onClick={handleFilterToggle}
                >
                    {filterToggles.sqft ? upArrow: downArrow}
                    <span className="toggleText">Square Feet</span>
                </button>
            </p>
            <div className="collapse" id="collapseSqftFilter">
                <input 
                    id="sqftInputMin" 
                    className="sqftInput filterInput" 
                    value={sqftInputMin === "" ? "": numeral(sqftInputMin).format('0,0')} 
                    type="text" 
                    placeholder="Min" 
                    onChange={handleChange}/> 
                    {` - `}
                <input 
                    id="sqftInputMax" 
                    className="sqftInput filterInput" 
                    value={sqftInputMax === "" ? "": numeral(sqftInputMax).format('0,0')} 
                    type="text" 
                    placeholder="Max" 
                    onChange={handleChange}/>
            </div>
            <hr/>

            <p id="bedsBathFilter">
                <button 
                    id="bedBath"
                    className="btn btn-light shadow-none" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseBedsBathFilter" 
                    aria-expanded="false" 
                    aria-controls="collapseBedsBathFilter"
                    onClick={handleFilterToggle}
                >
                    {filterToggles.bedBath ? upArrow: downArrow}
                    <span className="toggleText">Bed & Bath</span>
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
        </form>
    )
}
