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
    const aboutCloseRef = useRef(null);

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

    const firstRender = useRef(true);
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        
        if (aboutActive) {
            gsap.fromTo(aboutpageRef.current, {
                width: "2.5rem",
                height: "2.5rem",
                scale: "1.1",
                borderRadius: "2rem",
            }, {
                width: "24rem",
                height: "2.5rem",
                scale: "1",
                borderRadius: "3rem",
                ease: "sine.in",
                duration: 0.3
            });
            gsap.to("#contactme", {
                opacity: "1",
                ease: "sine.out",
                duration: 1
            });
        } else {
            gsap.fromTo(aboutpageRef.current, {
                width: "24rem",
                height: "2.5rem",
                scale: "1",
                borderRadius: "3rem",
                ease: "sine.in",
                duration: 0.3
            }, {
                width: "2.5rem",
                height: "2.5rem",
                scale: "1",
                borderRadius: "2rem",
            });
            gsap.to("#contactme", {
                opacity: "0",
                ease: "sine.in",
                duration: 1
            });
        }
    }, [aboutActive]);

    // Show/hide sections based on active menu
    useGSAP(() => {
        // Play aboutActive animation only once when it becomes true
        

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
            <div className={`fixed top-12 right-[4rem] ${!aboutActive ? 'beat' : ''} z-[60]  }}`}>
                <div className='relative group '>
                    {aboutActive && (
                        <div id='contactme' className='select-none absolute left-1/4 top-1 -translate-x-1/5  flex flex-row items-center z-[60] gap-2 justify-center opacity-0'>
                            <a href='https://t.me/khodepouria'>
                                <p className='text-xl text-[#171717] animated-gradient-text1'>Telegram</p>  
                            
                            </a>
                            
                            <a href='https://instagram.com/pouria._.ramezani'>
                                <div className='flex flex-row gap-1 '>
                                <p className='text-xl text-[#171717] animated-gradient-text1'>Instagram</p>  
                            </div>
                            </a>
                            
                            <a href='https://www.linkedin.com/in/pouria-ramezani-79323b298' target="_blank" rel="noopener noreferrer">
                                <div className='flex flex-row gap-1 '>
                                <p className='text-xl text-[#171717] animated-gradient-text1'>LinkedIn</p>  
                            </div>
                            </a>
                            
                        </div>
                        
                    )}
                    {/* White Circle */}
                    <div
                        ref={aboutpageRef}
                        onClick={() => { setAboutActive(!aboutActive);} }
                        className={`z-[50] bg-[#d5d5d5] w-[2.5rem] h-[2.5rem] transition-transform ${!aboutActive ? " rounded-[9999px] hover:cursor-pointer hover:scale-[1.1]" : ""} relative`}
                    >
                        
                    </div>
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
