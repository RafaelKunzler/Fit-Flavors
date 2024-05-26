import Image from "next/image";
import Link from "next/link"

import { Button } from "@/components/ui/button"

import HomeCard from "@/components/HomeCard";


export default function Home() {
  return (
    <section className="w-full flex-center flex-col mt-12 text-slate-900">
      <div className="flex justify-between mx-24 items-center">
        <div className="flex flex-col w-full md:w-1/2 gap-6">
          <h1 className="head_text">Sua <span className="text-primary">jornada fitness</span> começa na cozinha.</h1>
          <p className="desc hidden md:flex">
            Transforme sua alimentação e alcance seus objetivos de saúde e bem-estar conosco!
          </p>
          <div className="flex flex-col gap-4 md:justify-between md:flex-row">
            <Link href='/recipes-feed'>
              <Button>Descubra Receitas</Button>
            </Link>
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

      <div className="md:mt-14 mt-9 py-8">
        <h1 className="font-extrabold text-xl md:text-2xl text-center py-4 md:py-8">
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

    </section>
  );
}
