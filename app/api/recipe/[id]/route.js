import { connectToDB } from "@/utils/database"
import Recipe from "@/models/recipe"

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const recipe = await Recipe.findById(params.id).populate('creator')
    if(!recipe) return new Response("Recipe not found", {
      status: 404
    })

    return new Response(JSON.stringify(recipe), {
      status: 200
    })
  } catch (error) {
    return new Response("Failed to fetch recipe", {
      status: 500
    })
  }
}

export const PATCH = async (req, { params }) => {
  const { recipe, ratings } = await req.json()

  try {
    await connectToDB()

    const existingRecipe = await Recipe.findById(params.id)
    if(!existingRecipe) return new Response("Recipe not found", {
      status: 404
    })

    if (ratings) {
      const existingRatingIndex = existingRecipe.ratings.findIndex(rating => rating.userId.toString() === ratings.userId)
      if (existingRatingIndex !== -1) {
        existingRecipe.ratings[existingRatingIndex].rating = ratings.rating
      } else {
        existingRecipe.ratings.push(ratings)
      }
    }

    existingRecipe.recipe = recipe
    

    await existingRecipe.save()

    return new Response(JSON.stringify(recipe), {
      status: 200
    })

  } catch (error) {
    return new Response("Failed to update the recipe", {
      status: 500
    })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Recipe.findByIdAndDelete(params.id)

    return new Response("Recipe deleted successfully", {
      status: 200
    })
  } catch (error) {
    return new Response("Failed to delete the recipe", {
      status: 500
    })
  }
}