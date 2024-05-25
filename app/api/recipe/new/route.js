import { connectToDB } from "@/utils/database"

import Recipe from "@/models/recipe"

export const POST = async (req) => {
  const { recipe, userId } = await req.json()

  try {
    await connectToDB()
    const newRecipe = new Recipe({
      creator: userId,
      recipe
    })

    await newRecipe.save();

    return new Response(JSON.stringify(newRecipe), {
      status: 201
    })

  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500
    })
  }
}