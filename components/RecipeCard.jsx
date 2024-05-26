'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Salad, Vegan } from "lucide-react"
import { Button } from "./ui/button"
import StarRating from "./StarRating"



const RecipeCard = ({ recipe, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  return (
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding backdrop-filter md:w-[280px] w-full h-fit'>
      <Card className='flex flex-col'>
        <img src={recipe.recipe.image} alt="" className="w-full h-48" />
        <CardHeader>
          <CardTitle className='flex font-bold'>
            {recipe.recipe.recipeName}

            <div className="flex gap-1">
              {recipe.recipe.vegan ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Vegan
                        size={16}
                        className="text-primary"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Receita vegana!</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <></>
              )
              }

              {recipe.recipe.vegetarian ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Salad
                        size={16}
                        className="text-primary"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Receita vegetariana!</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <></>
              )
              }
            </div>
          </CardTitle>
          <CardDescription>{truncateString(`${recipe.recipe.description}`, 99)}</CardDescription>
        </CardHeader>
        <CardContent>

          <p className="text-sm text-gray-800">Tempo de Preparo: {recipe.recipe.preparationTime}</p>
          <div className="flex gap-1 mt-3 flex-wrap">
            {recipe.recipe.tags.map((tag) => (
              <p className="text-xs text-cyan-700 cursor-pointer">
                #{tag}
              </p>
            ))}
          </div>

          <StarRating
            readOnly={true}
            id={recipe._id}
          />
          {session?.user.id === recipe.creator._id && pathName === '/profile' && (
            <div className="flex justify-center gap-6 mt-3 border-t border-gray-300 pt-3" >
              <p className="text-sm text-primary cursor-pointer" onClick={handleEdit}>
                Editar
              </p>

              <p className="text-sm text-destructive cursor-pointer" onClick={handleDelete}>
                Deletar
              </p>
            </div>
          )}
        </CardContent>


        <Button className='rounded-none'>Ver Receita</Button>
      </Card>
    </div>
  )
}

export default RecipeCard