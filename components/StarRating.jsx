'use client'

import { Rating as ReactRating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

const StarRating = ({ readOnly, id }) => {
  const { data: session } = useSession()

  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [recipe, setRecipe] = useState({})
  const [userRating, setUserRating] = useState(null)
  const [averageRating, setAverageRating] = useState(0)
  const [numRatings, setNumRatings] = useState(0)

  useEffect(() => {
    const getRecipeDetails = async () => {
      const res = await fetch(`/api/recipe/${id}`)
      const data = await res.json()

      setRecipe(data)

      const ratings = data.ratings || []
      const userRating = ratings.find(r => r.userId === session?.user.id)

      if (userRating) {
        setUserRating(userRating.rating)
      } else {
        const average = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0
        setAverageRating(average)
      }

      setNumRatings(ratings.length)
    }

    if (id) getRecipeDetails()
  }, [id, session?.user.id])

  useEffect(() => {
    if (rating === 0 || readOnly || userRating === rating) return

    const sendRating = async () => {
      setSubmitting(true)

      try {
        const res = await fetch(`/api/recipe/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            recipe: recipe.recipe,
            ratings: {
              rating: rating,
              userId: session?.user.id
            }
          })
        })



        if (res.ok) alert("nota enviada!")
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false)
      }
    }

    sendRating()
  }, [rating])

  const displayRating = userRating ? userRating : averageRating

  return (
    <div className='flex flex-1 items-center gap-3 mt-3'>
      <ReactRating
        style={{ maxWidth: 100 }}
        value={rating > 0 ? rating : displayRating}
        onChange={setRating}
        readOnly={readOnly}
        items={5}
      />
      <p className='text-xs text-slate-700'>{numRatings} avaliações</p>
    </div>
  )
}

export default StarRating
