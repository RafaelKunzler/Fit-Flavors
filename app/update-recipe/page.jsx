'use client'

import CreateRecipesForm from "@/components/CreateRecipesForm"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const page = () => {
  const searchParams = useSearchParams()
  const recipeId = searchParams.get('id')

  const [recipe, setRecipes] = useState({})

  useEffect(() => {
    const getRecipeDetails = async () => {
      const res = await fetch(`/api/recipe/${recipeId}`)
      const data = await res.json()

      setRecipes({
        recipe: data.recipe
      })
    }

    if(recipeId) getRecipeDetails()
  }, [recipeId])
  
  return (
    <div>
      <div className="mt-9 md:px-24 bg-primary-foreground w-screen">
        <div className="py-4 bg-gray-100 text-center max-w-fit md:max-w-full">
          <h2 className="text-4xl font-bold text-gray-800">Edite sua Receita</h2>
          <p className="text-gray-400 my-3">Faça ajustes e atualize os detalhes de sua receita favorita</p>
        </div>
        <CreateRecipesForm 
          recipe={recipe}
          recipeId={recipeId}
          type="Editar"
        />
      </div>
    </div>
  )
}

export default page