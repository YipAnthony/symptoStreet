import React, { useState, useEffect } from 'react'
import SingleResult from './SingleResult'
import { leftArrow, rightArrow } from '../icons/icons'

export default function SearchResults(props) {

    const { searchResults, setSearchResults } = props

    const [ resultGrouping, setResultGrouping ] = useState({groups: Number, currentGroup: 1})
    const [ resultsOutput, setResultsOutput ] = useState([])
    
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

    useEffect(() => {
        let output = []
        for (let i = resultGroup()[0] - 1; i < resultGroup()[1]; i++) {
            output.push(
                
                <SingleResult result={searchResults[i]} index={i} key={searchResults[i]._id}/>
            )
        }
        setResultsOutput(output)
    }, [resultGrouping])

    const scrollToTop = () => {
        document.getElementById('logoBar').scrollIntoView({behavior: 'smooth'})
    }

    const handleLeftArrowClick = (e) => {
        scrollToTop()
        if (resultGrouping.currentGroup === 1) return
        setResultGrouping(prev => {
            return {
                ...prev,
                currentGroup: prev.currentGroup - 1
            }
        })
    }

    const handleRightArrowClick = () => {
        scrollToTop()
        
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
            <h3 id="searchResultsTitle">
                {searchResults.length === 0 ? 
                    "No results...":
                    "Showing results " + resultGroup()[0] + "-" + resultGroup()[1] + " of " + searchResults.length
                }
            </h3>
            <div className="d-flex flex-wrap">
                {resultsOutput}
            </div>
            {resultGrouping.groups > 1 ? 
                <span id="resultPageNavIcons">
                    <span id="leftArrow" className="arrowIcon" onClick={handleLeftArrowClick}>{leftArrow}</span>
                    <span id="rightArrow" className="arrowIcon" onClick={handleRightArrowClick}>{rightArrow}</span>
                </span>:
                null            
            }
        </div>
    )
}
