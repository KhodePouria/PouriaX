"use client"
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import gsap from 'gsap';
import  {useGSAP}  from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
    window.addEventListener("load",()=>{
        ScrollTrigger.refresh();
    })
    const lenis = new Lenis({
        autoRaf: true,
      });
      lenis.on('scroll', (e) => {
        console.log(e);
      });
  }

  
  // Listen for the scroll event and log the event data
  


export default function Pouriax(){

    const menu = ['Home','About','Skills','Projects','Contact']

    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);

    let tl = gsap.timeline({
        
        scrollTrigger: {
            pin: true, 
            markers:true,
            // pin the trigger element while active
            start: 'top top', // when the top of the trigger hits the top of the viewport
            end: '+=500', // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            snap: {
                snapTo: 'labels', // snap to the closest label in the timeline
                duration: { min: 1, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                delay: 1, // wait 0.2 seconds from the last scroll event before doing the snapping
                ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
            }
        }
    });

    

    useGSAP((()=>{

        tl.addLabel('first').to(scrollRef1.current,{
            x:-800,
            opacity:0,
            scrollTrigger: {
                trigger: scrollRef1.current,
                
                  },
        }).addLabel('second').fromTo(scrollRef2.current,
            { x: '45%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
              scrollTrigger: {
            trigger: scrollRef2.current,
            
              },
              
            }) 

        /* const Name = scrollRef1.current;
        gsap.to(Name,{
            x:-800,
            opacity:0,
            scrollTrigger:{
                trigger:Name,
                scrub:true,
                start:"bottom 10%",
                end:"bottom -40%",
                markers:true
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
            start: 'bottom 40%',
            end: 'bottom -20%',
            markers:true,
            scrub: true,
              },
              ease:"sine.inOut"
            }
            
          ); */
        
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

            <div ref={scrollRef2} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 opacity-0">
                <div className='flex flex-row rounded-[50px] border-2 border-[#708654] p-10 m-100'>
                    <h1 className='text-3xl'>About</h1><h1 className='text-[#708654] text-3xl'>Me</h1>
                    <h3 className='text-xl'>I’ve always been drawn to things that let me create — sometimes with guitar, sometimes with drawing, and often with code.
                    Whether I’m sketching an idea on paper or building it in a browser, it’s all part of the same rhythm: making something out of nothing. That’s what keeps me going.
                    I like working quietly, thinking deeply, and building tools that (hopefully) make someone’s day a little easier — even if I never know they used it. There’s something beautiful about that.</h3>
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