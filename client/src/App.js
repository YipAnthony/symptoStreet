import React, {useState} from 'react'
import postFetch from './components/postFetch'
import SearchBar from './components/SearchBar'
import SearchFilters from './components/SearchFilters'

function App() {

  const testSubmit = () => {
    const data = {zipcode: 94131, zipcodeRadius: 1, bedsInput: 40}

    // data must be in object format
    postFetch(data)
    .then(data => console.log(data))
  }

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
    })

  return (
    <div className="App">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <SearchFilters searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <button className="btn btn-primary" onClick={testSubmit}>Test Submit</button>
    </div>
  );
 }
 export default App;