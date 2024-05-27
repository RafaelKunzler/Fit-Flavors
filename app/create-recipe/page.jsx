
import CreateRecipesForm from '@/components/CreateRecipesForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="mt-9 md:px-24 bg-primary-foreground w-screen">
        <div className="py-4 bg-gray-100 text-center max-w-fit md:max-w-full">
          <h2 className="text-4xl font-bold text-gray-800">Envie sua Receita</h2>
          <p className="text-gray-400 my-3">Compartilhe suas criações culinárias com a comunidade!</p>
        </div>
        <CreateRecipesForm 
          type="Criar"
        />
      </div>
    </div>
  )
}

export default page