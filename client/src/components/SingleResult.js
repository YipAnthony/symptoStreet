import React from 'react'
import numeral from 'numeral'

import { houseIcon } from '../icons/icons'

export default function SingleResult(props) {

    const { result } = props

    const openURL = () => {
        window.open(result.url, '_blank')
    } 

    return (
        <div className="card singleResult" onClick={openURL}>
            <div className="resultImageContainer">
                <span className="houseIcon">{houseIcon}</span>
            </div>
            <div className="resultContent">
                <h3>  {numeral(result.price).format('$0,0')} </h3>
                <span>
                    <span className="bedsBathSqftText">
                        {result.beds === 0 ? "-": result.beds}
                        {result.beds === 1 ? " Bed": " Beds"}

                    </span>
                    <span className="bedsBathSqftText">
                        {result.baths === 0 ? "-": result.baths}
                        {result.baths === 1 ? " Bath": " Baths"}
                    </span>
                    <span className="bedsBathSqftText">
                        {result.sqft === 0 ? "- ": numeral(result.sqft).format('0,0') + " "} 
                         Sq. Ft.
                    </span>
                </span>
                <div className="resultAddress">
                    {result.address}, San Francisco, CA {result.zipcode}
                </div>
            </div>
        </div>
    )
}
