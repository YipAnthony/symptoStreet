import React, {useState} from 'react'

import LogoBar from './components/LogoBar'
import SearchBar from './components/SearchBar'
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
  
  const [ searchResults, setSearchResults ] = useState([])
  const [ hasResults, setHasResults ] = useState(true)

  const updateAddressStateWithSelection = () => {
    const resultName = document.getElementById('googleAddress').getAttribute('resultName')
    setSearchInput(prev => {
      return {
        ...prev,
        googleAddress: resultName
      }
    })
  }

  const submitSearch = async () => {
    updateAddressStateWithSelection();
    const data = {...searchInput, ...searchFilters}
    delete data.googleAddress
    data.zipcode = getZipcodeFromLatLong()
    return await postFetch(data)
  }

  const handleSearch = async () => {

    const fetchResults = await submitSearch()
    
    // Update searchResults state
    setSearchResults(fetchResults)
    if (fetchResults.length === 0) {
      setHasResults(false)
    } else {
      setHasResults(true)
    }
  }
      
  return (
    <div className="App">
      <div><LogoBar /></div>
      <hr/>
      <div id="mainContent" className="d-flex">
        <section >
          <div id="searchBox" className="card">
            <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
            <SearchFilters searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </section>
        <section id="searchResultsContainer">
          <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} hasResults={hasResults} />
        </section>
      </div>
    </div>
  );
 }
 export default App;