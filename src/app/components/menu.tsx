'use client';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import gsap from 'gsap';
import  {useGSAP}  from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const menuItems = ['Projects', 'About', 'Home', 'Skills', 'Contact'];

export default function HorizontalMenuSlider() {

  /* from and fromto and to */
  
  /* useGSAP(() => {
    
    gsap.fromTo('#box',{
      x:-500,
    },{        
      x:500,
      repeat:-1,
      yoyo: true,
      duration: 1,
      ease:"power1.inOut"
    })
  },[])  */


  /* Time line */


   const timeline = gsap.timeline({
    repeat:-1,
    yoyo:true
  }); 

  /* useGSAP(()=>{
    timeline.from(("#box"),{
      x:-800,
      ease:"sine.inOut"
    })
    timeline.to(("#box"),{
      x:800,
      ease:"sine.inOut"
    })
    timeline.to(('#box'),{
      y: 350,
      ease:"sine.inOut"
    })
    timeline.to(('#box'),{
      x: -800,
      ease:"sine.inOut"
    })
    timeline.to(('#box'),{
      y: 0,
      ease:"sine.inOut"
    })
  
  },[]); */
  

  /* stagger */


  /* useGSAP((()=>{
    timeline.to(".class1",{
      x:500,
      stagger:{
        amount:0.125,
        grid:[2,4],
        axis:'x',
        ease:"sin.inOut"
      }
    })
  }),[]); */


  /* 
  const scrollRef = useRef(null);
  
  useGSAP((()=>{
    const box = scrollRef.current
    gsap.to(box,{
      scaleY:5,
      borderRadius:'10%',
      scrollTrigger:{
        trigger:box,
        start: "bottom, bottom",
        end:"top 0%",
        scrub:true
      },
      ease: "sine.inOut"
    })
  }),[]) */


  return(
    <div  className='flex flex-col justify-center items-center sticky'>
      <div id="box" className=' bg-blue-500 w-20 h-20 rounded-xl class1'>
      </div>
      {/*  <div id="box" className=' bg-blue-400 w-20 h-20 mb-20 rounded-xl class1'>
      </div> */}
      {/*
      <div id="box" className=' bg-blue-300 w-20 h-20 mb-20 rounded-xl class1'>
      </div> */}
      {/* <button id="button" onClick={()=>{
        timeline.paused() ? timeline.play() : timeline.pause()
      }} className='bg-blue-50 w-20 h-20 mb-300 rounded-xl hover:cursor-pointer'>
      </button> */}
      
    </div>
    
    )
    
  
}
