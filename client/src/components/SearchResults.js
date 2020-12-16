import React, { useState, useEffect } from 'react'
import SingleResult from './SingleResult'
import { leftArrow, rightArrow } from '../icons/icons'

export default function SearchResults(props) {

    const { searchResults, setSearchResults } = props

    const [ resultGrouping, setResultGrouping ] = useState({groups: Number, currentGroup: 1})
    
    // Determine number of result groups
    useEffect(() => {
        const numberOfGroups = Math.round(searchResults.length/10)
        setResultGrouping(prev => { 
            return {...prev, groups: numberOfGroups}
        })
    }, [searchResults])

    const resultGroup = () => {
        const { currentGroup, groups} = resultGrouping

        if (currentGroup < groups) {
            return [currentGroup*10-9, currentGroup*10]
        } else {
            return [currentGroup*10-9, searchResults.length]
        }
    }

    let resultsOutput = []
    for (let i = resultGroup()[0] - 1; i < resultGroup()[1]; i++) {
        resultsOutput.push(
            <SingleResult result={searchResults[i]} index={i}/>
        )
    }

    const handleLeftArrowClick = (e) => {
        if (resultGrouping.currentGroup === 1) return

        setResultGrouping(prev => {
            return {
                ...prev,
                currentGroup: prev.currentGroup - 1
            }
        })
    }

    const handleRightArrowClick = () => {
        if (resultGrouping.currentGroup === resultGrouping.groups) return
        
        setResultGrouping(prev => {
            return {
                ...prev,
                currentGroup: prev.currentGroup + 1
            }
        })
    }
        

    return (
        <div>
            {resultGrouping.groups > 1 ? 
                <>
                    <span id="leftArrow" onClick={handleLeftArrowClick}>{leftArrow}</span>
                    <span id="rightArrow" onClick={handleRightArrowClick}>{rightArrow}</span>
                </>:
                null            
            }
            <h3 id="searchResultsTitle">
                {searchResults.length === 0 ? 
                    "No results...":
                    "Showing results " + resultGroup()[0] + "-" + resultGroup()[1] + " of " + searchResults.length
                }
            </h3>
            {resultsOutput}
        </div>
    )
}
