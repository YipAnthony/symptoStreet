import React from 'react'

export default function LogoBar() {

    const handleSearch = () => {
        
        const searchBox = document.getElementById('searchBox')
        const searchBoxContainer = document.getElementById('searchBoxContainer')
        const backgroundFade = document.getElementById('backgroundFade')

        searchBox.setAttribute('search', 'on')
        backgroundFade.setAttribute('search', 'on')
        searchBoxContainer.setAttribute('search', 'on')

        backgroundFade.addEventListener('click', () => {
            searchBox.removeAttribute('search')
            searchBoxContainer.removeAttribute('search')
            backgroundFade.removeAttribute('search')
        })
    }

    
    return (
        <div id="logoBar" className="d-flex">
            <span id="combinedLogo">
                <span id="streetText">sympto-street</span>
            </span>
            <button id="mediaQueriedSearch" className="btn btn-primary btn-lg" onClick={handleSearch}>Search</button>
        </div>
    )
}
