import React, {useState} from 'react'
import postFetch from './components/postFetch'

function App() {

  const testSubmit = () => {
    const data = {zipcode: 94131, zipcodeRadius: 1}

    // data must be in object format
    postFetch(data)
    .then(data => console.log(data))
  }

  return (
    <div className="App">
      <button onClick={testSubmit}>Test Submit</button>
    </div>
  );
 }
 export default App;