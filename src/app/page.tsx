"use client"
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/projects';
import Pouriax from "./components/pouriax";


export default function Home() {
  const highlightRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<(HTMLDivElement|null)[]>([]);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menu = ['Home', 'About', 'Skills', 'Projects'];
    const [active, setActive] = useState('Home');
    const [isInitialized, setIsInitialized] = useState(false);  
    const [aboutActive, setAboutActive] = useState(false);

    const aboutpageRef = useRef(null);

    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef<HTMLDivElement>(null);
    const scrollRef3 = useRef(null);
    const scrollRef4 = useRef(null);
    const scrollRef5 = useRef(null);

    const sectionRefs = [scrollRef1, scrollRef2, scrollRef3, scrollRef4, scrollRef5];

    // About page overlay mask effect
    const applyOverlayMask = (e: PointerEvent) => {
        if (!scrollRef2.current) return;
        const rect = scrollRef2.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const secondDiv = scrollRef2.current.querySelector('.second') as HTMLElement;
        if (secondDiv) {
            secondDiv.style.setProperty('--x', `${x}px`);
            secondDiv.style.setProperty('--y', `${y}px`);
            secondDiv.style.setProperty('opacity', '1');
        }
    };

    // Initialize overlay mask
    useEffect(() => {
        document.body.addEventListener("pointermove", applyOverlayMask);
        return () => document.body.removeEventListener("pointermove", applyOverlayMask);
    }, []);

    // Handle menu click
    const handleMenuClick = (item: string, index: number) => {
        if (item === active) return;
        setActive(item);
    };

    // Update highlight position
    const updateHighlight = (activeIndex: number) => {
        const targetItem = menuRef.current[activeIndex];
        if (!highlightRef.current || !targetItem) return;

        const targetOffsetLeft = targetItem.offsetLeft;
        const targetOffsetTop = targetItem.offsetTop;
        const targetWidth = targetItem.offsetWidth;
        const targetHeight = targetItem.offsetHeight;

        gsap.to(highlightRef.current, {
            x: targetOffsetLeft,
            y: targetOffsetTop,
            width: targetWidth,
            height: targetHeight,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    // Show/hide sections based on active menu
    useGSAP(() => {
        if(aboutActive){
            gsap.fromTo(aboutpageRef.current,{
                width: "2rem",
                height: "2rem",
                scale: "1.2",
                borderRadius: "2rem",
                },{
                  width: "16rem",
                height: "14rem",
                scale: "1",
                borderRadius: "1rem",
                ease: "sine.in",
                duration:"0.3"
                });
            gsap.to("#contactme",{
                opacity: "1",
                ease: "sine.out",
                duration:"1"
            })
        }

        if (!isInitialized) return;

        const activeIndex = menu.indexOf(active);

        // Update text colors
        menuRef.current.forEach((item, index) => {
            if (item) {
                gsap.to(item, {
                    color: index === activeIndex ? "#1E1E1E" : "#BFBFBF",
                    duration: 0.2,
                    ease: "power1.out"
                });
            }
        });

        // Update highlight position
        updateHighlight(activeIndex);

        // Show active section, hide others
        sectionRefs.forEach((ref, index) => {
            if (ref.current) {
                if (index === activeIndex) {
                    gsap.to(ref.current, {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(ref.current, {
                        opacity: 0,
                        x: index < activeIndex ? "-150%" : "150%",
                        duration: 1,
                        ease: "power1.out"
                    });
                }
            }
        });

    }, [active, isInitialized, aboutActive]);

    // Initialize menu
    useEffect(() => {
        const initializeMenu = () => {
            const allRefsReady = menuRef.current.every(item => item !== null) && 
                                highlightRef.current && 
                                menuContainerRef.current;
            
            if (!allRefsReady) {
                requestAnimationFrame(initializeMenu);
                return;
            }

            // Set initial colors
            menuRef.current.forEach((item, index) => {
                if (item) {
                    gsap.set(item, {
                        color: index === 0 ? "#1E1E1E" : "#BFBFBF"
                    });
                }
            });
            
            // Set initial highlight position
            const firstItem = menuRef.current[0];
            if (firstItem && highlightRef.current) {
                gsap.set(highlightRef.current, {
                    x: firstItem.offsetLeft,
                    y: firstItem.offsetTop,
                    width: firstItem.offsetWidth,
                    height: firstItem.offsetHeight
                });
            }

            // Set initial section states
            sectionRefs.forEach((ref, index) => {
                if (ref.current) {
                    gsap.set(ref.current, {
                        opacity: index === 0 ? 1 : 0,
                        x: index === 0 ? 0 : "100%"
                    });
                }
            });
            
            setIsInitialized(true);
        };

        initializeMenu();
    }, []);

    // Handle window resize
    useEffect(() => {
        if (!isInitialized) return;
        
        const handleResize = () => {
            const activeIndex = menu.indexOf(active);
            updateHighlight(activeIndex);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [active, isInitialized]);

    return(
        <div className="flex items-center justify-center min-h-screen overflow-hidden ">
            {/* about items */}
            <div className={`fixed top-12 right-[4rem] ${!aboutActive ? 'beat' : ''} z-[60]`}>
                <div className='relative group '>
                    
                    {aboutActive && (
                        <div id='contactme' className='absolute left-1/2 top-4 -translate-x-1/2 flex flex-col items-center z-10 gap-2 justify-center opacity-0'>
                            <p className='text-2xl text-[#171717] mb-4'>Reach out:</p>
                            <a href='https://telegram.com/khodepouria'>
                                <div className='flex flex-row gap-1'>
                                <svg fill="#171717" width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="#000000"/></svg>
                                <p className='text-xl text-[#171717]'>Telegram</p>  
                            </div>
                            </a>
                            
                            <a href='https://instagram.com/pouria._.ramezani'>
                                <div className='flex flex-row gap-1'>
                                <svg fill="#171717" height="32" width="32" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 32 32" >
                                <path d="M23,0H9C4,0,0,4,0,9v6v8c0,5,4,9,9,9h14c5,0,9-4,9-9v-8V9C32,4,28,0,23,0z M16,10c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6
                                    S12.7,10,16,10z M22,7c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S22,8.1,22,7z"/>
                                </svg>
                                <p className='text-xl text-[#171717]'>Instagram</p>  
                            </div>
                            </a>
                            
                            <a href='https://www.linkedin.com/in/pouria-ramezani-79323b298' target="_blank" rel="noopener noreferrer">
                                <div className='flex flex-row gap-1'>
                                <svg fill="#171717" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"/></svg>
                                <p className='text-xl text-[#171717]'>LinkedIn</p>  
                            </div>
                            </a>
                            
                        </div>
                        
                    )}
                    {/* White Circle */}
                    <div
                        ref={aboutpageRef}
                        onClick={() => { setAboutActive(true); }}
                        className={`z-[60] bg-[#d5d5d5] w-10 h-10 transition-transform ${!aboutActive ? "hover:scale-[1.2] hover:cursor-pointer rounded-[9999px]" : ""}`}
                    />
                    
                    
                </div>
            </div>
            {/* Home Section */}
            <div ref={scrollRef1} id="Home"
                className="fixed w-full px-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <Pouriax/>
            </div>

            {/* About Section */}
            <div id='About' ref={scrollRef2} className="fixed z-20 w-full max-w-6xl px-4 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2">
                <About/>
            </div>

            {/* Skills Section */}
            <div id='Skills' ref={scrollRef3} className='fixed w-full max-w-4xl px-4 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2'>
                <Skills/>
            </div>

            {/* Projects Section */}
            <div id='Projects' ref={scrollRef4} className='fixed w-full max-w-4xl px-4 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2'>
                <Projects/>
            </div>

            {/* Contact Section */}
            <div id='Contact' ref={scrollRef5} className='fixed w-full max-w-4xl px-4 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2'>
                <div className="text-center">
                    <h1 className='mb-4 text-3xl font-bold'>Contact Me</h1>
                    <p className="text-gray-300">Get in touch for collaborations or opportunities</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="fixed bottom-0 z-50 w-full px-4 mb-6 text-center sm:mb-8 md:mb-12">
                <div 
                    ref={menuContainerRef}
                    className="relative inline-flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
                >
                    {/* Highlight Background */}
                    <div 
                        ref={highlightRef} 
                        className='absolute rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl bg-[#D9D9D9] pointer-events-none'
                        style={{
                            left: 0,
                            top: 0,
                            width: 0,
                            height: 0,
                            zIndex: -1,
                            opacity: isInitialized ? 1 : 0
                        }}
                    />
                    
                    {/* Menu Items */}
                    {menu.map((item, index) => (
                        <div  
                            ref={(el) => {menuRef.current[index] = el;}}  
                            onClick={() => handleMenuClick(item, index)} 
                            className="relative p-3 py-2 mb-5 text-base transition-transform duration-200 cursor-pointer select-none sm:text-base md:text-lg lg:text-xl sm:px-3 md:m-0 md:px-5 md:mb-0 sm:py-2 hover:scale-110"
                            style={{ 
                                color: '#BFBFBF',
                                position: 'relative'
                            }}
                            key={item}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
