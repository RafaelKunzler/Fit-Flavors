'use client'

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"

import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

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
        <Image 
          src="/logo.svg"
          width={100}
          height={100}          
        />
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-recipe">
              <Button variant="secondary" className='rounded-full'>
                Criar Receita
              </Button>
            </Link>

            <Button variant="secondary" onClick={signOut} className='rounded-full border border-white bg-transparent py-1.5 px-5 text-white'>
              Sair
            </Button>

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
              providers && 
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    variant='secondary'
                   > 
                    Entrar
                  </Button>
                ))
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
              providers && 
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                   > 
                    Entrar
                  </Button>
                ))
            }
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar