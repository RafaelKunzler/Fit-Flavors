'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { BarChart, CookingPot, Salad, Soup, Vegan } from "lucide-react"
import StarRating from "@/components/StarRating"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

const RecipeId = () => {

  const [recipe, setRecipe] = useState({})
  const params = useParams()

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipe/${params.recipeId}`)
      const data = await res.json()

      setRecipe(data);

    }

    fetchRecipe()
  }, [params])

  return (
    <section className="md:mt-9 md:px-24 bg-primary-foreground w-full">
      <div className="flex flex-col md:flex-row md:py-10 justify-between text-left gap-12">
        <img src={recipe?.recipe?.image} alt={recipe?.recipe?.recipeName} className="w-full md:w-[45vw] h-auto md:rounded-md" />
        <div className="flex flex-col justify-between max-w-full md:max-w-[45vw]">
          <div className=" flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mt-5">{recipe?.recipe?.recipeName}</h1>
            <div className="flex gap-1 pt-1">
              {recipe?.recipe?.vegan ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Vegan
                        size={20}
                        className="text-primary"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary text-primary-foreground px-3 py-1 rounded-md font-medium">Receita vegana!</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <></>
              )
              }

              {recipe?.recipe?.vegetarian ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Salad
                        size={20}
                        className="text-primary"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary text-primary-foreground px-3 py-1 rounded-md font-medium">Receita vegetariana!</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <></>
              )
              }
            </div>
            <StarRating 
              id={recipe._id}
              readOnly={false}
            />

          </div>

          <div className="mt-8">
            <div className="flex px-5 md:px-14 gap-3 items-center">
              <CookingPot size={18} />
              <p className="text-lg"><span className="font-semibold">Tempo de Preparo:</span> {recipe?.recipe?.preparationTime} minutos</p>
            </div>
            <div className="mt-4">
              <div className="flex px-5 md:px-14 gap-3 items-center">
                <Soup size={18} />
                <p className="text-lg"><span className="font-semibold">Porções:</span> {recipe?.recipe?.servings}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex px-5 md:px-14 gap-3 items-center">
                <BarChart size={18} />
                <p className="text-lg"><span className="font-semibold">Calorias por Porção:</span> {recipe?.recipe?.caloriesPerServing} kcal</p>
              </div>
            </div>
          </div>

          <div className="flex px-5 md:px-14 gap-3 items-center mt-8">
            <Avatar>
              <AvatarImage src={recipe?.creator?.image} />
              <AvatarFallback className="bg-primary text-primary-foreground">ID</AvatarFallback>
            </Avatar>
            <p className="text-lg font-semibold">Criado por: <span className="text-primary font-medium">{recipe?.creator?.username}</span></p>
          </div>
        </div>
      </div>


      
      <div className="container md:mt-12 mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="py-5 md:w-1/2">
            <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-300 pb-2">Ingredientes</h2>
            <ul className="list-disc pl-5">
              {recipe?.recipe?.ingredients.map((ingredient, index) => (
                <li key={index} className="mb-2 text-lg">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="py-5 md:w-1/2">
            <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-300 pb-2">Modo de Preparo</h2>
            <ol className="list-decimal pl-5">
              {recipe?.recipe?.cookingSteps.map((step, index) => (
                <li key={index} className="mb-2 text-lg">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="py-5 mt-8">
          <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-300 pb-2">Notas do Autor</h2>
          <p className="text-lg">{recipe?.recipe?.authorNotes}</p>
        </div>
      </div>






    </section>
  )
}

export default RecipeId