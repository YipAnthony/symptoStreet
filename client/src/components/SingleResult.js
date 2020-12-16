import React from 'react'

export default function SingleResult(props) {

    const { result, index } = props

    return (
        <div className="card" key={result._id}>
            <h3>{index + 1}.</h3>
            {result.address}
        </div>
    )
}
