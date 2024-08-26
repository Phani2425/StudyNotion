import React from 'react'

const HighlightText = ({text,color}) => {
  return (
    <span className = {`font-bold text-transparent bg-clip-text bg-gradient-to-br ${color ? (' from-caribbeangreen-500 to-caribbeangreen-50') : (' from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] ') } ` }>
        {
            " " + text
        }
    </span>
  )
}

export default HighlightText