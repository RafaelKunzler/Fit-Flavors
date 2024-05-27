'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'


const MyProfile = () => {

  const { data: session } = useSession();
  const router = useRouter()

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/recipes`)
      const data = await res.json()

      setRecipes(data)
    }

    if(session?.user.id)fetchRecipes()
  }, [])

  const handleEdit = (recipe) => {
    router.push(`/update-recipe?id=${recipe._id}`)
  }

  const handleDelete = async (recipe) => {
    const hasConfirm = confirm("Tem certeza que deseja excluir essa receita?")

    if(hasConfirm){
      try {
        await fetch(`/api/recipe/${recipe._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredRecipes = recipes.filter((r) => r._id!== recipe._id)

        setRecipes(filteredRecipes)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name={session?.user.name}
      desc="Bem vindo a sua página de perfil"
      data={recipes}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile