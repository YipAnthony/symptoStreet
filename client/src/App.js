import React, {useState, useEffect, useRef } from 'react'

import LogoBar from './components/LogoBar'
import SearchAddressZipcode from './components/SearchAddressZipcode'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'

import postFetch from './functions/postFetch'
import getZipcodeFromLatLong from './functions/reverseGeocode'

function App() {
 
  const [ searchInput, setSearchInput ] = useState(
    {
      address: "",
      googleAddress: "",
      zipcode: "",
      zipcodeRadius: "3",
      priceSort: "ascending"
    }
  )

  const [ searchFilters, setSearchFilters ] = useState(
    {
      priceInputMin: "",
      priceInputMax: "",
      sqftInputMin: "",
      sqftInputMax: "",
      bedsInput: "",
      bathsInput: "",
    }
  )

  const [ isGoogleAPIOn, setIsGoogleAPIOn ] = useState(false)  
  const [ searchResults, setSearchResults ] = useState([])
  const [ hasResults, setHasResults ] = useState(true)

  const initialRender = useRef(true)
  
  // Resort results via price
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else handleSearch()
  }, [searchInput.priceSort])

  const retrieveGoogleAddressNameAndUpdateState = () => {
    const resultName = document.getElementById('googleAddress').getAttribute('resultName')
    setSearchInput(prev => {
      return {
        ...prev,
        googleAddress: resultName ? resultName: ""
      }
    })
  }

  const submitSearch = async () => {
    const data = {...searchInput, ...searchFilters}
    retrieveGoogleAddressNameAndUpdateState();

    if (isGoogleAPIOn) {
      data.zipcode = getZipcodeFromLatLong()
    }

    return await postFetch(data)
  }

  const handleSearch = async () => {
    const fetchResults = await submitSearch()
    setSearchResults(fetchResults)
    fetchResults.length === 0 ? setHasResults(false) : setHasResults(true)
  }

      
  return (
    <div className="App">
      <div><LogoBar /></div>
      <hr/>
      <div id="mainContent" className="d-flex">
        <section >
          <div id="searchBox" className="card">
            <SearchAddressZipcode 
              searchInput={searchInput} 
              setSearchInput={setSearchInput} 
              isGoogleAPIOn={isGoogleAPIOn} 
              setIsGoogleAPIOn={setIsGoogleAPIOn} 
            />
            <SearchFilters 
              searchFilters={searchFilters} 
              setSearchFilters={setSearchFilters} 
            />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </section>
        <section id="searchResultsContainer">
          <SearchResults 
            searchResults={searchResults} 
            setSearchResults={setSearchResults} 
            hasResults={hasResults} 
            priceSort={searchInput.priceSort}
            setSearchInput={setSearchInput}
          />
        </section>
      </div>
    </div>
  );
 }
 export default App;