import Image from 'next/image';
import React from 'react'

const BlogHighlight = ({ title, desc, linkText, linkUrl, image }) => (
  <div className="flex flex-col w-full md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
    <Image
      src={image}
      width={350}
      height={350}
      alt=''
      className="w-full md:w-72 h-auto rounded-md"
    />
    <div className="flex flex-col text-center md:text-left self-center">
      <h3 className="font-extrabold text-lg">{title}</h3>
      <p className="font-light text-muted-foreground text-sm mt-3">{desc}</p>
      <a onClick={() => alert("Ops, o blog ainda esta em construção :)")} disabled className="mt-4 text-primary text-xs cursor-pointer hover:underline">
        {linkText}
      </a>
    </div>
  </div>
);


export default BlogHighlight