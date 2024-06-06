'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'

import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import RecipeCard from "@/components/RecipeCard"
import { Checkbox } from "@/components/ui/checkbox"

const RecipeCardList = ({ data, handleTagClick }) => {
  return (
    <div className="space-y-6 py-8 sm:columns-3 sm:gap-16 ">
      {data.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const RecipesFeed = () => {
  const [searchRecipe, setSearchRecipe] = useState('')
  const [recipes, setRecipes] = useState([])

  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isVegan, setIsVegan] = useState(false)

  const searchParams = useSearchParams()

  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchRecipe(e.target.value)
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/recipe')
      const data = await res.json()

      let filteredRecipes = data

      if (searchRecipe) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.recipe.recipeName.toLowerCase().includes(searchRecipe.toLowerCase())
        )
      }

      if (isVegan) {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.recipe.vegan)
      } else if (searchParams.get('vegan') === 'true') {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.recipe.vegan)
      }

      if (isVegetarian) {
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.recipe.vegetarian)
      }

      setRecipes(filteredRecipes)
    }

    fetchRecipes()
  }, [searchRecipe, isVegetarian, isVegan, searchParams])


  return (
    <section className="mx-auto w-full md:px-24 px-6 flex justify-center items-center flex-col gap-2  bg-gray-100">

      <div className="py-4 text-center max-w-fit md:max-w-full">
        <h2 className="text-4xl font-bold text-gray-800">Bem vindo a sua Jornada Fitness</h2>
        <p className="text-gray-400 my-3">Descubra e compartilhe suas receitas favoritas.</p>
      </div>
      <Form className='relative w-full flex-center'>
        <Input
          type="text"
          placeholder='Pesquise por receitas'
          onChange={handleSearchChange}
          required
          className=''
        />
        <div className="flex w-full gap-6">
          <div className="flex gap-1 items-center">
            <Checkbox
              id='vegetarian'
              onCheckedChange={() => setIsVegetarian(prevIsVegetarian => !prevIsVegetarian)}
            />
            <label
              htmlFor='vegetarian'
              className="text-sm text-muted-foreground"
            >
              Vegetariana
            </label>
          </div>

          <div className="flex gap-1 items-center">
            <Checkbox
              id='vegan'
              onCheckedChange={() => setIsVegan(prevIsVegan => !prevIsVegan)}
            />
            <label
              htmlFor='vegan'
              className="text-sm text-muted-foreground"
            >
              Vegana
            </label>
          </div>
        </div>
      </Form>
      <RecipeCardList
        data={recipes}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default RecipesFeed