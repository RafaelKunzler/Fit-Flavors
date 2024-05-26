'use client'

import { Rating as ReactRating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { useState } from 'react'

const StarRating = ({ readOnly, id }) => {
  const [rating, setRating] = useState(0)

  return( 
    <div className='flex flex-1 items-center gap-3 mt-3'>
      <ReactRating 
        style={{ maxWidth: 100 }} 
        value={rating} 
        onChange={setRating} 
        readOnly={readOnly}
        className=''
        
      />
      <p className='text-xs text-slate-700'>{rating} avaliações</p>
    
    </div>
  )}

export default StarRating