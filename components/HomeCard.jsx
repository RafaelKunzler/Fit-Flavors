import Image from "next/image"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"

const HomeCard = ({ title, desc, cta, image }) => {
  return (
    <div className="flex flex-col items-center">
  <Image
    src={image} 
    width={350} 
    height={350} 
    alt=''
    className="md:w-[320px] md:h-[180px] w-full rounded-md shadow-md object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
  />
  <div className="flex flex-col gap-3 w-[300px] text-center mt-4">
    <div className="flex flex-col gap-2 mt-3">
      <h2 className="font-bold text-lg text-gray-800">{title}</h2>
      <p className="font-light text-gray-600 text-sm">{desc}</p>
    </div>
    <Button variant="ghost" className="flex gap-2 items-center text-primary text-xs">{cta} <ChevronRight className="w-4" /></Button>
  </div>
</div>


  )
}

export default HomeCard