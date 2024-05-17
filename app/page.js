import Image from "next/image";

import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <section className="w-full flex-center flex-col px-24 mt-12">
      <div className="flex justify-between">
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
        />
      </div>
    </section>
  );
}
