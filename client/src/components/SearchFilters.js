import React, { useState } from 'react'
import numeral from 'numeral'

import { downArrow, upArrow } from '../icons/icons'

export default function SearchFilters(props) {

    const { searchFilters, setSearchFilters } = props
    const { priceInputMin, priceInputMax, sqftInputMin, sqftInputMax, bedsInput, bathsInput } = searchFilters

    const [ filterToggles, setFilterToggles ] = useState({price: false, sqft: false, bedBath: false})

    const clearFilters = (e) => {
        e.preventDefault()

        setSearchFilters({
            priceInputMin: "",
            priceInputMax: "",
            sqftInputMin: "",
            sqftInputMax: "",
            bedsInput: "",
            bathsInput: "",
        })
        
    }

    const handleFilterToggle = (e) => {
        const selectedToggleElement = document.getElementById(e.target.id)
        const isCollapsed = selectedToggleElement.classList.contains('collapsed')

        setFilterToggles(prev => {
            return {
                ...prev,
                [e.target.id]: !isCollapsed
            }
        })
    }

    const handleChange = (e) => {
        const input = e.target.value
        
        // price & sqft input must be Numbers/,/./$
        const priceRegex = /^[$0-9\s][0-9,.\s]*$/
        const isValidInput = priceRegex.test(input)
        
        if(!isValidInput) return
        
        const formattedInput = input.replace(/[,$]/g, "")
        setSearchFilters(prev => {
            return {
                ...prev,
                [e.target.id]: formattedInput
            }
        })
    }

    return (
        <form id="searchFilterContainer" className="" autoComplete="off">
            <h3 id="filterContainerTitle">Filter by:
                <button className="btn btn-secondary btn-sm clearfilters" onClick={clearFilters}>Clear filters</button>
            </h3> 
            <p id="priceFilter">
                <span className="toggleFilter">
                    <button 
                        id="price"
                        className="btn btn-light shadow-none " 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#collapsePriceFilter" 
                        aria-expanded="false" 
                        aria-controls="collapsePriceFilter"
                        onClick={handleFilterToggle}
                    >
                        {filterToggles.price ? upArrow: downArrow}
                        <span className="toggleText untargetable">Price</span>
                    </button>
                </span>
            </p>
            <div className="collapse" id="collapsePriceFilter">
                <input 
                    id="priceInputMin" 
                    className="priceInput filterInput form-control mr-sm-2" 
                    value={priceInputMin === "" ? "": numeral(priceInputMin).format('$0,0')} 
                    type="text" 
                    placeholder="Min" 
                    onChange={handleChange}
                /> {` - `}
                <input 
                    id="priceInputMax" 
                    className="priceInput filterInput form-control mr-sm-2" 
                    value={priceInputMax === "" ? "": numeral(priceInputMax).format('$0,0')} 
                    type="text" 
                    placeholder="Max" 
                    onChange={handleChange}
                />
            </div>

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
                    <span className="toggleText untargetable">Square Feet</span>
                </button>
            </p>
            <div className="collapse" id="collapseSqftFilter">
                <input 
                    id="sqftInputMin" 
                    className="sqftInput filterInput form-control mr-sm-2" 
                    value={sqftInputMin === "" ? "": numeral(sqftInputMin).format('0,0')} 
                    type="text" 
                    placeholder="Min" 
                    onChange={handleChange}
                /> 
                {` - `}
                <input 
                    id="sqftInputMax" 
                    className="sqftInput filterInput form-control mr-sm-2" 
                    value={sqftInputMax === "" ? "": numeral(sqftInputMax).format('0,0')} 
                    type="text" 
                    placeholder="Max" 
                    onChange={handleChange}
                />
            </div>

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
                    <span className="toggleText untargetable" >Bed & Bath</span>
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
                            <option value="4">4+</option>
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
                            <option value="4">4+</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    )
}
