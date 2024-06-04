'use client'

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { LoaderCircle } from "lucide-react"

const Navbar = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <nav className="flex justify-between items-center w-full mb-16 px-6 bg-primary">
      <Link
        href="/"
        className="flex gap-2 flex-center "
      >
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            width={55}
            height={55}
            className="p-2"
          />
          <p className="text-primary-foreground text-lg font-medium">Fit Flavors</p>
        </div>
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <NavigationMenu >
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:text-secondary-foreground">
                    Item One
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Link
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:text-secondary-foreground">
                    Receitas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='flex flex-col gap-2 p-4'>
                    <NavigationMenuLink>
                      <Link href="/recipes-feed">
                        <p className="w-max text-gray-600">
                          Ver Receitas
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink>
                      <Link href="/create-recipe">
                        <p className="w-max text-gray-600">
                          Criar Receita
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <Button variant="link" onClick={signOut} className='border-none bg-transparent py-1.5 px-5 text-white hover:text-destructive hover:no-underline'>
                  Sair
                </Button>
                <NavigationMenuItem>

                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>




            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile picture"
              />
            </Link>
          </div>
        ) : (
          <>
            {
              providers ? (
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  variant='secondary'
                >
                  Entrar
                </Button>
              ))) : (
                <LoaderCircle 
                  className="text-white spin"
                />
              )
            }
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile picture"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                <Link
                  href='/profile'
                  className="text-sm text-gray-700 hover:text-gray-500 font-medium;"
                  onClick={() => setToggleDropdown(false)}
                >
                  Meu Perfil
                </Link>

                <Link
                  href='/recipes-feed'
                  className="text-sm text-gray-700 hover:text-gray-500 font-medium;"
                  onClick={() => setToggleDropdown(false)}
                >
                  Ver Receitas
                </Link>

                <Link
                  href='/create-recipe'
                  className="text-sm text-gray-700 hover:text-gray-500 font-medium;"
                  onClick={() => setToggleDropdown(false)}
                >
                  Criar Receita
                </Link>

                <Button
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className='mt-5 w-full'
                  variant='destructive'
                >
                  Sair
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
              providers ? (
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  variant='secondary'
                >
                  Entrar
                </Button>
              ))) : (
                <LoaderCircle 
                  className="text-white spin"
                />
              )
            }
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar