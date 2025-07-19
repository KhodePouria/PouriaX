"use client"
import { ScrollTrigger } from 'gsap/all';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import  {useGSAP}  from '@gsap/react'
import Lenis from 'lenis'
import Image from 'next/image';
import pfp from '@/app/public/jpeg.jpeg'
gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
    // Reset scroll position on page load
    window.addEventListener("load", () => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    });
    
    // Also reset on beforeunload to ensure clean state
    window.addEventListener("beforeunload", () => {
        window.scrollTo(0, 0);
    });
    
    const lenis = new Lenis({
        autoRaf: true,
    });
    lenis.on('scroll', (e) => {
        console.log(e);
    });
}

export default function Pouriax(){
    // Reset scroll position on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    const menu = ['Home','About','Skills','Projects','Contact']

    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);

    useGSAP((()=>{
        const tl = gsap.timeline({
            scrollTrigger: {
                pin: true, 
                markers:true,
                start: '1% top', 
                end: '+=400', 
                scrub: 1, 
                snap: {
                    snapTo: 'labels', 
                    duration: { min: 0.2, max: 2 }, 
                    delay: 0.2, 
                    ease: 'power1.inOut' 
                }
            }
        });

        tl.addLabel('first').to(scrollRef1.current,{
            x:-800,
            opacity:0,
        }).addLabel('second').fromTo(scrollRef2.current,
            { x: '150%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
            }) 
        
    }),[]); 


    return(
        <div className="min-h-[1000vh] flex justify-center items-center">
            
            <div ref={scrollRef1} 
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                <div className="flex items-center justify-center">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black hover:cursor-default mb-6 sm:mb-8 md:mb-10">Pouria</h1>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl mb-1 font-black hover:cursor-default p-1 bg-gradient-to-r animated-gradient-text ">X</h3>
                </div>
            </div>

            <div ref={scrollRef2} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 opacity-0">
                <div className='flex flex-col md:flex-row items-center justify-center gap-12'>
                    <div className='flex-shrink-0'>
                        <Image 
                            src={pfp} 
                            alt='A portrait photo' 
                            width={250} 
                            height={250} 
                            className='rounded-full object-cover w-48 h-48 md:w-64 md:h-64 shadow-lg'
                        />
                    </div>
                    <div className='flex flex-col gap-4 text-left max-w-md'>
                        <div className='flex flex-row text-4xl md:text-5xl font-bold ml-2'>
                        <h2 >
                            About
                        </h2>
                        <h2 className='text-[#92856A] ml-2'>Me</h2>
                        </div>
                        
                        <p className='text-base md:text-lg text-gray-300 leading-relaxed'>
                            I’ve always been drawn to things that let me create — sometimes with guitar, sometimes with drawing, and often with code. Whether I’m sketching an idea on paper or building it in a browser, it’s all part of the same rhythm: making something out of nothing. That’s what keeps me going.
                        </p>
                    </div>
                </div>
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