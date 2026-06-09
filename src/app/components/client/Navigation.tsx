"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { navigationKeys, type NavigationKey } from "@/lib/data";

interface NavigationProps {
    onNavigate: (section: NavigationKey) => void;
    activeSection: NavigationKey;
    locale: string
}

export default function Navigation({ onNavigate, activeSection, locale }: NavigationProps) {
    const t = useTranslations("navigation");
    const highlightRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<(HTMLDivElement | null)[]>([]);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const [highlightStyle, setHighlightStyle] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isInitialized, setIsInitialized] = useState(false);

    const updateHighlight = useCallback((activeIndex: number) => {
        const targetItem = menuRef.current[activeIndex];
        if (!targetItem) return;

        setHighlightStyle({
            x: targetItem.offsetLeft,
            y: targetItem.offsetTop,
            width: targetItem.offsetWidth,
            height: targetItem.offsetHeight,
        });
    }, []);

    const handleMenuClick = (key: NavigationKey) => {
        if (key === activeSection) return;
        onNavigate(key);
    };

    // Initialize and update highlight position
    useEffect(() => {
        const initializeMenu = () => {
            const allRefsReady =
                menuRef.current.every((item) => item !== null) &&
                menuContainerRef.current;

            if (!allRefsReady) {
                requestAnimationFrame(initializeMenu);
                return;
            }

            const activeIndex = navigationKeys.indexOf(activeSection);
            updateHighlight(activeIndex);
            setIsInitialized(true);
        };

        initializeMenu();
    }, [activeSection, updateHighlight]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const activeIndex = navigationKeys.indexOf(activeSection);
            updateHighlight(activeIndex);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeSection, updateHighlight]);

    return (
        <nav
            className="fixed bottom-0 z-50 w-full px-4 mb-6 text-center sm:mb-8 md:mb-12"
            role="navigation"
            aria-label="Main navigation"
        >
            <div
                ref={menuContainerRef}
                className="relative inline-flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
            >
                <div
                    ref={highlightRef}
                    className={`absolute rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl bg-[#D9D9D9] pointer-events-none transition-all duration-500 ease-out`}
                    style={{
                        left: 0,
                        top: 0,
                        transform: `translate(${highlightStyle.x}px, ${highlightStyle.y}px)`,
                        width: highlightStyle.width,
                        height: highlightStyle.height,
                        zIndex: -1,
                        opacity: isInitialized ? 1 : 0,
                    }}
                    aria-hidden="true"
                />

                {navigationKeys.map((key, index) => {
                    const isActive = activeSection === key;
                    return (
                        <div
                            key={key}
                            ref={(el) => {
                                menuRef.current[index] = el;
                            }}
                            onClick={() => handleMenuClick(key)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleMenuClick(key);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-current={isActive ? "page" : undefined}
                            className="relative p-3 py-2 mb-5 text-base cursor-pointer select-none sm:text-base md:text-lg lg:text-xl sm:px-3 md:m-0 md:px-5 md:mb-0 sm:py-2 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg transition-all duration-300"
                            style={{
                                color: isActive ? "#1E1E1E" : "#BFBFBF",
                            }}
                        >
                            {t(key)}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
