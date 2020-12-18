import React, { useState, useEffect } from 'react'
import SingleResult from './SingleResult'

export default function SearchResults(props) {

    const { searchResults, hasResults, priceSort, setSearchInput } = props

    const [ resultGrouping, setResultGrouping ] = useState({})
    const [ resultsOutput, setResultsOutput ] = useState([])
    
    const handlePriceSort = (e) => {
        const userSelection = e.target.value
        setSearchInput(prev => {
            return {
                ...prev,
                priceSort: userSelection
            }
        })
    }

    const scrollToTop = () => {
        document.getElementById('logoBar').scrollIntoView({behavior: 'smooth'})
    }

    // Set initial grouping (1 group = 10 results/page) when searchResults change
    useEffect(() => {
        const numberOfGroups = Math.round(searchResults.length/10)
        let upperRange = searchResults.length
        if (1 < numberOfGroups) upperRange = 10 
        setResultGrouping({groups: numberOfGroups, currentGroup: 1, lowerRange: 1, upperRange})
    }, [searchResults])

    // Generate results based on current group
    useEffect(() => {
        
        if (!hasResults) return

        let output = []
        for (let i = resultGrouping.lowerRange - 1; i < resultGrouping.upperRange; i++) {
            if (!searchResults[i]) return
            output.push(
                <SingleResult result={searchResults[i]} index={i} key={searchResults[i]._id}/>
            )
        }
        setResultsOutput(output)
    }, [resultGrouping, searchResults])
        
        
    const generateResultRanges = (currentGroup, groups) => {
        const resultLowerRange = currentGroup*10-9
        const resultUpperRange = currentGroup*10
        
        if (currentGroup < groups) {
            return [resultLowerRange, resultUpperRange]
        } else {
            return [resultLowerRange, searchResults.length]
        }
    }

    const handleNavigationClick = (e) => {
        scrollToTop()
        
        const previousPage = e.target.classList.contains('previousPage')
        const newGroup = resultGrouping.currentGroup - (previousPage ? 1:-1)
        const newResultGroupRanges = generateResultRanges(newGroup, resultGrouping.groups)

        setResultGrouping(prev => {
            return {
                ...prev,
                currentGroup: newGroup,
                lowerRange: newResultGroupRanges[0],
                upperRange: newResultGroupRanges[1],
            }
        })
    }

    const pageNavigationButtons = (
        resultGrouping.groups > 1 ? 
        <span id="resultPageNavIcons">
            {
                resultGrouping.currentGroup === 1 ? 
                null:
                <button 
                    className="btn btn-primary m-2 shadow-none previousPage" 
                    onClick={handleNavigationClick}
                >
                    Prev Page
                </button>
            }
            {
                resultGrouping.currentGroup === resultGrouping.groups ? 
                null:
                <button 
                    className="btn btn-primary m-2 shadow-none" 
                    onClick={handleNavigationClick}
                >
                    Next Page
                </button>
            }
        </span>
        :null
    )

    return (
        <div>
            <h3 id="searchResultsTitle">
                {!hasResults ? "No results, try broadening your search": null}
                {
                    searchResults.length === 0 ? 
                    null:
                    "Showing results " + resultGrouping.lowerRange + "-" + resultGrouping.upperRange + " of " + searchResults.length
                }
                {searchResults.length > 1 ? 
                    <select className="priceSort form-select shadow-none" value={priceSort} onChange={handlePriceSort}>
                        <option value="ascending">Price: Low to High</option>
                        <option value="descending">Price: High to Low</option>
                    </select>: null
                }
            </h3>

            {pageNavigationButtons}

            <div className="d-flex flex-wrap justify-content-center">
                {resultsOutput}
            </div>
            
            {pageNavigationButtons}

        </div>
    )
}
