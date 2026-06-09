"use client";

import { useState, useCallback, type ReactNode } from "react";
import { navigationKeys, type NavigationKey } from "@/lib/data";
import Navigation from "./Navigation";

interface SectionManagerProps {
    sections: {
        key: NavigationKey;
        content: ReactNode;
        className?: string;
    }[],
    locale: string;
}

export default function SectionManager({ sections, locale }: SectionManagerProps) {
    const [activeSection, setActiveSection] = useState<NavigationKey>("home");

    const handleNavigate = useCallback((section: NavigationKey) => {
        setActiveSection(section);
    }, []);

    return (
        <>
            {sections.map(({ key, content, className = "" }) => {
                const isActive = key === activeSection;
                const activeIndex = navigationKeys.indexOf(activeSection);
                const currentIndex = navigationKeys.indexOf(key);

                // Determine position for inactive sections
                const translateX = !isActive
                    ? currentIndex < activeIndex
                        ? (locale === "fa" ? "100%" : "-100%")
                        : (locale === "fa" ? "-100%" : "100%")
                    : "0";

                return (
                    <section
                        key={key}
                        id={key}
                        aria-label={`${key} section`}
                        aria-hidden={!isActive}
                        className={`fixed px-4 transform top-1/2 left-1/2 transition-all duration-500 ease-out ${className}`}
                        style={{
                            opacity: isActive ? 1 : 0,
                            transform: `translate(-50%, -50%) translateX(${translateX})`,
                            pointerEvents: isActive ? "auto" : "none",
                        }}
                    >
                        {content}
                    </section>
                );
            })}

            <Navigation locale={locale} onNavigate={handleNavigate} activeSection={activeSection} />
        </>
    );
}
