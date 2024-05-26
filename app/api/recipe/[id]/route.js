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
  const { recipe, ratings } = await request.json()

  try {
    await connectToDB()

    const existingRecipe = await Recipe.findById(params.id)
    if(!recipe) return new Response("Recipe not found", {
      status: 404
    })

    existingRecipe.recipe = recipe
    existingRecipe.ratings = ratings

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