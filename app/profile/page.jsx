'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'


const MyProfile = () => {

  const { data: session } = useSession();

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/recipes`)
      const data = await res.json()

      setRecipes(data)
    }

    if(session?.user.id)fetchRecipes()
  }, [])

  const handleEdit = () => {

  }

  const handleDelete = async () => {

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