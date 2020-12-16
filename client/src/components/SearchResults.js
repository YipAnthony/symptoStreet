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

    const handleArrowClick = (e) => {
        if (e.target.id === "leftArrow") {
            if (resultGrouping.currentGroup === 1) {
                return
            } else {
                setResultGrouping(prev => {
                    return {
                        ...prev,
                        currentGroup: prev.currentGroup - 1
                    }
                })
            }
        } else {
            if (resultGrouping.currentGroup === resultGrouping.groups) {
                return
            } else {
                setResultGrouping(prev => {
                    return {
                        ...prev,
                        currentGroup: prev.currentGroup + 1
                    }
                })
            }
        }
    }

    return (
        <div>
                <span id="leftArrow" onClick={handleArrowClick}>{leftArrow}</span>
                <span id="rightArrow" onClick={handleArrowClick}>{rightArrow}</span>
            <h3 id="searchResultsTitle">
                {searchResults.length === 0 ? 
                    "No results...":
                    "Showing results " + resultGroup()[0] + "-" + resultGroup()[1] + " of " + searchResults.length
                }
            </h3>
            
            { resultsOutput }

        </div>
    )
}
