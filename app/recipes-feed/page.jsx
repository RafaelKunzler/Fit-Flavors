'use client'

import { useState, useEffect } from "react"

import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import RecipeCard from "@/components/RecipeCard"

const RecipeCardList =({ data, handleTagClick }) => {
  return(
    <div className="mt-16 space-y-6 py-8 sm:columns-3 sm:gap-6 ">
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

  const handleSearchChange = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/recipe')
      const data = await res.json()

      setRecipes(data)
    }

    fetchRecipes()
  }, [])


  return (
    <section className="mx-auto w-full md:px-24 px-6 flex justify-center items-center flex-col gap-2">
      <Form className='relative w-full flex-center'>
        <Input 
          type="text"
          placeholder='Pesquise por receitas'
          onChange={handleSearchChange}
          required
          className=''
        />
      </Form>
      <RecipeCardList 
        data={recipes}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default RecipesFeed