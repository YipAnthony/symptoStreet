import React, { useEffect, useState } from 'react'

export default function SearchBar(props) {
    const { searchInput, setSearchInput } = props
    const { address, googleAddress, zipcode, zipcodeRadius } = searchInput

    const [ isGoogleAPIOn, setIsGoogleAPIOn ] = useState(true)

    const handleSearchInput = (e) => {
        const userInput = e.target.value

        // Test if zipcode is type Number
        const numberRegex = /^[0-9]*$/
        const isZipcodeANumber = numberRegex.test(userInput)

        if (e.target.id === "zipcode" && !isZipcodeANumber) {
            return
        }

        // Set address/zipcode state
        setSearchInput(prev => {
            return {
                ...prev,
                [e.target.id]: userInput
            }
        })
    }

    const handleGoogleAPIToggle = () => {
        setIsGoogleAPIOn(prev => !prev)
        setSearchInput(prev => {
            return {
                ...prev,
                address: "",
                googleAddress: ""
            }
        })
    }

    // Toggle disable attribute for zipcode radius slider
    useEffect(() => {
        const zipcodeRadiusElement = document.getElementById('zipcodeRadius')

        if (zipcode !== "") {
            zipcodeRadiusElement.removeAttribute("disabled")
        } else {
            zipcodeRadiusElement.setAttribute("disabled", "")
        }
    }, [zipcode])

    return (
        <div id="searchFilterContainer" className="">
            <h3>Search By: </h3>
            <form autoComplete="off">
                <div id="addressSearchContainer">
                    <div className="d-flex">
                        <input 
                            id="googleAddress"
                            className="form-control mr-sm-2" 
                            type="search"
                            hidden={!isGoogleAPIOn}
                            value={googleAddress}
                            onChange={handleSearchInput}
                            placeholder="Search by address"
                        />
                    </div>
                    {isGoogleAPIOn ? null:
                    <div className="d-flex">
                        <input 
                            id="address"
                            className="form-control mr-sm-2" 
                            type="search"
                            value={address}
                            onChange={handleSearchInput}
                            placeholder="Search by address"
                        />
                    </div>
                }

                </div>
                {/* Toggle Google Search API */}
                <div className="form-check form-switch mt-2">
                    <input className="form-check-input" checked={isGoogleAPIOn} onChange={handleGoogleAPIToggle} type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label">{isGoogleAPIOn ? "Google Search API On": "Google Search API Off"}</label>
                </div>

                <span className="d-flex justify-content-center">or</span>
                <div className="d-flex">
                    <input 
                        id="zipcode"
                        className="form-control mr-sm-2" 
                        type="search"
                        placeholder="Search by zipcode"
                        value={zipcode}
                        onChange={handleSearchInput}
                    />

                </div>
                    <div className="zipcodeSlideContainer">
                        <label 
                            id="searchRadiusText"
                            style={zipcode === "" ? {"color": "lightgrey"}: {"color": "black"}}
                        >   
                            Search Radius: {zipcodeRadius} mi
                        </label>
                        <input 
                            id="zipcodeRadius"
                            className="slider" 
                            type="range" 
                            min="1" 
                            max="5" 
                            disabled 
                            value={zipcodeRadius} 
                            onChange={handleSearchInput} 
                        />
                    </div>
            </form>
            
        </div>
    )
}
