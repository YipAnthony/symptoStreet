import React, { useEffect, useState } from 'react'

export default function SearchBar(props) {
    const { searchInput, setSearchInput } = props
    const { address, googleAddress, zipcode, zipcodeRadius } = searchInput

    const { isGoogleAPIOn, setIsGoogleAPIOn } = props
    const [ isSearchByAddress, setIsSearchByAddress ] = useState(true)

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

    const handleAddressZipcodeToggle = () => {
        // Delete address/zipcode value when toggling
        if (isSearchByAddress) {
            setSearchInput(prev => {
                return {
                    ...prev,
                    address: "",
                    googleAddress: ""
                }
            })
        } else {
            setSearchInput(prev => {
                return {
                    ...prev,
                    zipcode: ""
                }
            })
        }
        setIsSearchByAddress(prev => !prev)
    }

    // Toggle disable attribute for zipcode radius slider
    useEffect(() => {
        if (isSearchByAddress) return

        const zipcodeRadiusElement = document.getElementById('zipcodeRadius')

        if (zipcode !== "") {
            zipcodeRadiusElement.removeAttribute("disabled")
        } else {
            zipcodeRadiusElement.setAttribute("disabled", "")
        }
    }, [zipcode])

    return (
        <div >
            <h3 id="mainSearchText">Search By:
                <select 
                    id="selectAddressorZipcode" 
                    className="form-select form-select-lg d-inline-block shadow-none" 
                    value={isSearchByAddress? "Address": "Zipcode"} 
                    onChange={handleAddressZipcodeToggle}
                >
                    <option value="Address">Address</option>
                    <option value="Zipcode">Zipcode</option>
                </select>
            </h3>

            <form id="searchAddressZipcodeContainer" autoComplete="off">
                <div className="addressOrZipcode">
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
                    
                    {isSearchByAddress ? 
                    <div className="form-check form-switch mt-2">
                        <input className="form-check-input" checked={isGoogleAPIOn} onChange={handleGoogleAPIToggle} type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label">{isGoogleAPIOn ? "Google Search API On": "Google Search API Off"}</label>
                    </div>:null}

                </div>
                {isSearchByAddress ? null:
                    <div className="addressOrZipcode">
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
                    </div>    
                }
            </form>
            
        </div>
    )
}
