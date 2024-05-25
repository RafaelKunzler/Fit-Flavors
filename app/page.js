import Image from "next/image";
import { Button } from "@/components/ui/button"

import HomeCard from "@/components/HomeCard";


export default function Home() {
  return (
    <section className="w-full flex-center flex-col mt-12 text-slate-900">
      <div className="flex justify-between mx-24">
        <div className="flex flex-col w-full md:w-1/2 gap-6">
          <h1 className="head_text">Sua <span className="text-primary">jornada fitness</span> começa na cozinha.</h1>
          <p className="desc hidden md:flex">
            Transforme sua alimentação e alcance seus objetivos de saúde e bem-estar conosco!
          </p>
          <div className="flex flex-col gap-4 md:justify-between md:flex-row">
            <Button>Descubra Receitas</Button>
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

      <div className="md:mt-2 mt-9 py-8">
        <h1 className="font-extrabold text-xl md:text-2xl text-center py-4 md:py-8">
          Destaque suas receitas favoritas e <br className="hidden md:block" />descubra novas opções deliciosas
        </h1>

        <div className="flex flex-col md:flex-row py-8 md:mx-24 md:justify-between gap-4">
          <HomeCard
            title="Explore nossa seleção de categorias populares."
            desc="Encontre inspiração culinária e compartilhe suas próprias receitas."
            cta='Explorar'
            image='/home-card/home-card-1.jpg'
          />

          <HomeCard
            title="Descubra as adições mais recentes à nossa coleção de receitas."
            desc="Encontre receitas fresquinhas e experimente sabores novos."
            cta='Ver mais'
            image='/home-card/home-card-2.png'
          />

          <HomeCard
            title="Encontre receitas para todas as ocasiões e inspire-se na cozinha."
            desc="Descubra novas ideias culinárias e surpreenda seus convidados."
            cta='Explorar'
            image='/home-card/home-card-3.jpg'
          />
        </div>
      </div>

    </section>
  );
}
