import React, {useState} from 'react'
import postFetch from './functions/postFetch'
import SearchBar from './components/SearchBar'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'

function App() {
  
  const [ searchInput, setSearchInput ] = useState(
    {
      address: "",
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
  
  const submitSearch = async () => {
    const data = {...searchInput, ...searchFilters}
    return await postFetch(data)
  }

  const handleSearch = async () => {
    const fetchResults = await submitSearch()
    
    // Update searchResults state
    setSearchResults(fetchResults)
  }
      
  return (
    <div className="App">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <SearchFilters searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <button className="btn btn-primary" onClick={handleSearch}>Test Submit</button>
      <section id="searchResultsContainer">
        <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} />
      </section>
    </div>
  );
 }
 export default App;