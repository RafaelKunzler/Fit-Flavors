'use client'

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"

import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
  const isUserLoggedIn = true

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
        {isUserLoggedIn ? (
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
                src="logo_2.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile picture"
              />
            </Link>
          </div>
        ) : (
          <>
          </>
        )}
      </div>


      {/* desktop nav */}


    </nav>
    
  )
}

export default Navbar