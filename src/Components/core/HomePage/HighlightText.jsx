import React from 'react'

const HighlightText = ({text,color}) => {
  return (
    <span className = {`font-bold text-transparent bg-clip-text bg-gradient-to-br ${color ? (' from-caribbeangreen-500 to-caribbeangreen-50') : (' from-blue-500 to-blue-50') } ` }>
        {
            " " + text
        }
    </span>
  )
}

export default HighlightText