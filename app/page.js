'use client'

import Image from "next/image";
import Link from "next/link"

import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



import HomeCard from "@/components/HomeCard";

import { signIn, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from "react"
import BlogHighlight from "@/components/BlogHighlight";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)

  const [testimonials] = useState([
    {
      id: 1,
      name: 'Ana Silva',
      text: 'Encontrei diversas receitas incríveis neste site. Estou adorando compartilhar e experimentar novos pratos!',
      avatar: 'https://i.pravatar.cc/150?img=5',
      fallback: 'AS'
    },
    {
      id: 2,
      name: 'Pedro Santos',
      text: 'As receitas deste site são simplesmente maravilhosas! Já fiz várias delas e sempre são um sucesso em casa.',
      avatar: 'https://i.pravatar.cc/150?img=11',
      fallback: 'PS'
    },
    {
      id: 3,
      name: 'Mariana Oliveira',
      text: 'Fiquei impressionada com a rapidez na entrega e o profissionalismo da equipe. Parabéns!',
      avatar: 'https://i.pravatar.cc/150?img=49',
      fallback: 'MO'
    },
  ]);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <section className="w-full flex-center flex-col mt-12 text-slate-900">

      {/* Hero */}
      <div className="flex justify-between mx-24 items-center">
        <div className="flex flex-col w-full md:w-1/2 gap-6">
          <h1 className="head_text">Sua <span className="text-primary">jornada fitness</span> começa na cozinha.</h1>
          <p className="desc hidden md:flex">
            Transforme sua alimentação e alcance seus objetivos de saúde e bem-estar conosco!
          </p>
          <div className="flex flex-col gap-4 md:justify-between md:flex-row">

            {session?.user ?
              <Link href='/recipes-feed'>
                <Button>Descubra Receitas</Button>
              </Link>
              :
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
              </>}
          </div>
        </div>
        <Image
          src='/cooking-chef.png'
          width={420}
          height={420}
          className="organic_border_1 hidden md:flex"
          alt="homepage chef cozinhando comida saudavel"
        />
      </div>

      {/* Cards */}
      <div className="md:mt-14 mt-9 py-8">
        <h1 className="font-extrabold text-2xl md:text-5xl text-center mx-6 py-4 md:py-8 md:mb-6">
          Destaque suas receitas favoritas e <br className="hidden md:block" />descubra novas opções deliciosas
        </h1>

        <div className="flex flex-col md:flex-row py-8 md:mx-24 md:justify-between gap-4">
          <HomeCard
            title="Receitas Recomendadas para Você"
            desc="Descubra as receitas mais populares e recomendadas pelos nossos usuários."
            cta='Explorar'
            image='/home-card/home-card-1.jpg'
          />

          <HomeCard
            title="Receitas para o dia a dia"
            desc="Encontre opções deliciosas e fáceis de preparar para qualquer ocasião."
            cta='Ver mais'
            image='/home-card/home-card-2.jpeg'
          />

          <HomeCard
            title="Receitas Veganas Deliciosas"
            desc="Descubra pratos veganos que são tão saborosos quanto nutritivos."
            cta='Ver mais'
            image='/home-card/home-card-3.jpg'
          />
        </div>
      </div>
      <Separator />

      {/* Blog */}
      <div className=" flex flex-col items-center md:my-12 px-6 md:mx-28">
        <h2 className="font-extrabold text-2xl md:text-5xl text-center py-4">
          Últimas do Blog
        </h2>
        <p className="text-center text-muted-foreground mb-24">
          Mantenha-se atualizado com dicas de culinária, tendências alimentares e histórias inspiradoras de nossa comunidade.
        </p>

        <div className="w-full">
          <Carousel
            opts={{
              loop: true,
            }}

          >
            <CarouselContent>
              <CarouselItem>
                <BlogHighlight
                  title="Dicas para uma alimentação saudável"
                  desc="Descubra como manter uma dieta equilibrada com nossas dicas práticas."
                  linkText="Leia mais"
                  linkUrl="/blog/healthy-eating"
                  image='/home-card/home-card-1.jpg'
                />
              </CarouselItem>
              <CarouselItem>
                <BlogHighlight
                  title="Tendências alimentares de 2024"
                  desc="Fique por dentro das últimas tendências culinárias que estão dominando o ano."
                  linkText="Leia mais"
                  linkUrl="/blog/food-trends"
                  image='/home-card/home-card-1.jpg'
                />
              </CarouselItem>
              <CarouselItem>
                <BlogHighlight
                  title="Histórias inspiradoras da nossa comunidade"
                  desc="Conheça as histórias emocionantes de pessoas que transformaram suas vidas através da culinária."
                  linkText="Leia mais"
                  linkUrl="/blog/community-stories"
                  image='/home-card/home-card-1.jpg'
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>
      </div>
      <Separator />

      {/* FAQ */}
      <div className="mt-12 mx-4 md:mx-20 md:mt-20 bg-primary-foreground">
        <h2 className="font-extrabold text-3xl md:text-5xl text-center py-4">
          Perguntas Frequentes
        </h2>

        <Accordion
          type="single"
          collapsible
          className="space-y-4 text-left pt-6 px-8"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-left text-2xl'>Como posso criar uma conta?</AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <p>Para criar uma conta, clique no botão "Entrar" no canto superior direito da página e entre com sua conta Google.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" >
            <AccordionTrigger className='text-left text-2xl'>Posso compartilhar minhas próprias receitas?</AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <p>Sim, após criar uma conta, você pode facilmente compartilhar suas receitas favoritas com a nossa comunidade. Basta clicar no botão 'Adicionar Receita' localizado no menu principal. A partir daí, você poderá preencher todos os detalhes da sua receita, como ingredientes, modo de preparo, e até mesmo adicionar fotos para ilustrar.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className='text-left text-2xl'>Como faço para editar uma receita?</AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <p>Se você deseja editar uma receita que já adicionou, é simples também. Vá até a sua página de perfil clicando na sua foto no canto superior direito da tela. Na página de perfil, você encontrará uma lista de todas as receitas que compartilhou. Ache a receita que deseja editar e, em seguida, clique no botão "Editar". A partir daí, você pode fazer todas as alterações necessárias e salvar as atualizações. </p>
            </AccordionContent>
          </AccordionItem>


          <AccordionItem value="item-4">
            <AccordionTrigger className='text-left text-2xl'>O que são tags e como usá-las?</AccordionTrigger>
            <AccordionContent className='text-muted-foreground'>
              <p>Tags são palavras-chave ou etiquetas que ajudam a categorizar e organizar receitas dentro do site. Elas são uma forma eficiente de descrever o conteúdo e os principais ingredientes ou características de uma receita, facilitando a busca e a navegação pelos usuários. Ao adicionar tags relevantes às suas receitas, você torna mais fácil para outros usuários encontrarem suas criações com base em ingredientes específicos, tipos de pratos, ou dietas particulares.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator />

      {/* Testimonials */}
      <div className="py-12 mx-4 md:mx-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-extrabold text-2xl md:text-5xl text-center py-4">Depoimentos de Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-7">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex justify-between items-center">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                  </Avatar>
                  <p className="text-primary font-semibold">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
