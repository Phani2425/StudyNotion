import React,{useState} from 'react'
import { MdOutlineStarPurple500 } from "react-icons/md";


const starArray = new Array(5).fill(0);


const GiveRating = ({setrating}) => {



    const [hoverIndex, sethoverIndex] = useState(-1);
    const [clickedIndex, setclickedIndex] = useState(-1);

   const moueOverHandler = (index) => {
       sethoverIndex(index);
   }

   const clickHandler = (index) => {
    setclickedIndex(index);
      setrating(index + 1);
   }

  return (
    <div className='flex gap-2 items-center' onMouseLeave={() => {sethoverIndex(-1)}}>
      {
        starArray.map((
            star,index) => {
            return <MdOutlineStarPurple500   
            size={28} 
            key={index}
            onMouseOver={() => {moueOverHandler(index)}} 
            onClick={() => {clickHandler(index)}}
            className={`  ${index <= hoverIndex || index <= clickedIndex ? 'text-yellow-100' : 'bg-transparent' }`}
            />
        })
      }
    </div>
  )
}

export default GiveRating