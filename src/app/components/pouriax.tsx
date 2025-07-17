"use client"
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import gsap from 'gsap';
import  {useGSAP}  from '@gsap/react'


gsap.registerPlugin(ScrollTrigger);


export default function Pouriax(){

    const menu = ['Projects','About','Home','Skills','Contact']
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
            
            <div ref={scrollRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
                <h1 className="text-8xl font-black hover:cursor-default mb-10">Pouria</h1>
                <h3 className="text-4xl font-black hover:cursor-default p-1 bg-gradient-to-r animated-gradient-text ">X</h3>
            </div>
            <div className="fixed bottom-0 mb-12 w-full text-center">
                <a className="text-xl mr-4 opacity-60 hover:opacity-100 transition-all hover:text-2xl hover:cursor-pointer">{menu.at(0)}</a>
                <a className="text-xl mr-4 opacity-60 hover:opacity-100 transition-all hover:text-2xl hover:cursor-pointer">{menu.at(1)}</a>
                <a className="text-xl opacity-60 hover:opacity-100 transition-all hover:text-2xl hover:cursor-pointer">{menu.at(2)}</a>
                <a className="text-xl ml-4 opacity-60 hover:opacity-100 transition-all hover:text-2xl hover:cursor-pointer">{menu.at(3)}</a>
                <a className="text-xl ml-4 opacity-60 hover:opacity-100 transition-all hover:text-2xl hover:cursor-pointer">{menu.at(4)}</a>
            </div>
        </div>
    )
}