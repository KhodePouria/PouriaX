"use client"
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import gsap from 'gsap';
import  {useGSAP}  from '@gsap/react'


gsap.registerPlugin(ScrollTrigger);


export default function Pouriax(){

    const menu = ['Home','About','Skills','Projects','Contact']

    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);


    useGSAP((()=>{
        const Name = scrollRef1.current;
        gsap.to(Name,{
            x:-800,
            opacity:0,
            scrollTrigger:{
                trigger:Name,
                scrub:true,
                start:"top bottom%",
                end:"bottom top"
            },
            ease:"sine.inOut"
        });
        const SecondPart = scrollRef2.current;
        gsap.fromTo(SecondPart,
            { x: '45%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
              scrollTrigger: {
            trigger: SecondPart,
            start: 'top bottom%',
            end: 'bottom -20%',
            scrub: true,
              },
              ease:"sine.inOut"
            }
            
          );
        
    }),[]);


    return(
        <div className="min-h-[500vh] flex justify-center items-center">
            
            <div ref={scrollRef1} 
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                <div className="flex items-center justify-center">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black hover:cursor-default mb-6 sm:mb-8 md:mb-10">Pouria</h1>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl mb-1 font-black hover:cursor-default p-1 bg-gradient-to-r animated-gradient-text ">X</h3>
                </div>
            </div>

            <div ref={scrollRef2} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 opacity-0">
                <h1 className='text-4xl'> SecondPart</h1>
            </div>

            <div className="fixed bottom-0 mb-6 sm:mb-8 md:mb-12 w-full text-center px-4">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    <a className="text-sm mb-10 sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(0)}</a>
                    <a className="text-sm mb-10 sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(1)}</a>
                    <a className="text-sm mb-10 sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(2)}</a>
                    <a className="text-sm mb-10 sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(3)}</a>
                    <a className="text-sm mb-10 sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(4)}</a>
                </div>
            </div>
        </div>
    )
}