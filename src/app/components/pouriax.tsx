"use client"
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import gsap from 'gsap';
import  {useGSAP}  from '@gsap/react'


gsap.registerPlugin(ScrollTrigger);


export default function Pouriax(){

    const menu = ['Home','About','Skills','Projects','Contact']
    const scrollRef = useRef(null);


    useGSAP((()=>{
        const Name = scrollRef.current;
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
        })
        
    }),[]);


    return(
        <div className="pagesize flex justify-center items-center">
            
            <div ref={scrollRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                <div className="flex items-center justify-center">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black hover:cursor-default mb-6 sm:mb-8 md:mb-10">Pouria</h1>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black hover:cursor-default p-1 bg-gradient-to-r animated-gradient-text ">X</h3>
                </div>
            </div>
            <div className="fixed bottom-0 mb-6 sm:mb-8 md:mb-12 w-full text-center px-4">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    <a className="text-sm sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(0)}</a>
                    <a className="text-sm sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(1)}</a>
                    <a className="text-sm sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(2)}</a>
                    <a className="text-sm sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(3)}</a>
                    <a className="text-sm sm:text-lg md:text-xl opacity-60 hover:opacity-100 transition-all hover:scale-110 hover:cursor-pointer">{menu.at(4)}</a>
                </div>
            </div>
        </div>
    )
}