"use client";

import { useRef, useEffect, useCallback } from "react";

interface MouseTrackerProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * A client component that tracks mouse position and updates CSS variables
 * Used for the About section overlay mask effect
 */
export default function MouseTracker({ children, className = "" }: MouseTrackerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePointerMove = useCallback((e: PointerEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS custom properties for the mask effect
        containerRef.current.style.setProperty("--mouse-x", `${x}px`);
        containerRef.current.style.setProperty("--mouse-y", `${y}px`);
        containerRef.current.style.setProperty("--overlay-opacity", "1");
    }, []);

    const handlePointerLeave = useCallback(() => {
        if (!containerRef.current) return;
        containerRef.current.style.setProperty("--overlay-opacity", "0");
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Use passive event listeners for better performance
        document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
        container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

        return () => {
            document.body.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, [handlePointerMove, handlePointerLeave]);

    return (
        <div ref={containerRef} className={className} id="about" aria-label="About section">
            {children}
        </div>
    );
}
