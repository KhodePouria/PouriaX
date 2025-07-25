"use client"
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import About from './about';
import Skills from './skills';
import Projects from './projects';

export default function Pouriax() {
    const highlightRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<(HTMLDivElement|null)[]>([]);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menu = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
    const [active, setActive] = useState('Home');
    const [isInitialized, setIsInitialized] = useState(false);

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

    }, [active, isInitialized]);

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
        <div className="min-h-screen flex justify-center items-center overflow-hidden">
            {/* Home Section */}
            <div ref={scrollRef1} id="Home"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                <div className="flex items-center justify-center select-none">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black hover:cursor-default mb-6 sm:mb-8 md:mb-10">Pouria</h1>
                     <h3 className="text-3xl sm:text-4xl md:text-5xl mb-1 font-black hover:cursor-default p-1 bg-gradient-to-r animated-gradient-text">X</h3>
                </div>
            </div>

            {/* About Section */}
            <div id='About' ref={scrollRef2} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4 opacity-0">
                <About/>
            </div>

            {/* Skills Section */}
            <div id='Skills' ref={scrollRef3} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 opacity-0'>
                <Skills/>
            </div>

            {/* Projects Section */}
            <div id='Projects' ref={scrollRef4} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 opacity-0'>
                <Projects/>
            </div>

            {/* Contact Section */}
            <div id='Contact' ref={scrollRef5} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 opacity-0'>
                <div className="text-center">
                    <h1 className='text-3xl font-bold mb-4'>Contact Me</h1>
                    <p className="text-gray-300">Get in touch for collaborations or opportunities</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="fixed bottom-0 mb-6 sm:mb-8 md:mb-12 w-full text-center px-4 z-50">
                <div 
                    ref={menuContainerRef}
                    className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 relative"
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
                            className="relative mb-5 text-base sm:text-base md:text-lg lg:text-xl select-none p-3 sm:px-3 md:m-0 md:px-5 md:mb-0 py-2 sm:py-2 transition-transform duration-200 cursor-pointer hover:scale-110"
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