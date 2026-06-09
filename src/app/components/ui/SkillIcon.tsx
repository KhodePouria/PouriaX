// Server Component - No "use client" needed
interface SkillIconProps {
    path: string;
    name: string;
    viewBox?: string;
    size?: number;
}

export default function SkillIcon({
    path,
    name,
    viewBox = "0 0 50 50",
    size = 50
}: SkillIconProps) {
    // Determine the correct viewBox based on the icon
    const getViewBox = () => {
        if (name === "React") return "0 0 16 16";
        if (name === "Next.js") return "0 0 48 48";
        return viewBox;
    };

    return (
        <svg
            fill="#FFFFFF"
            viewBox={getViewBox()}
            width={size}
            height={size}
            className="md:w-[75px] md:h-[75px] transition-transform hover:scale-110"
            aria-label={name}
        >
            <path d={path} />
        </svg>
    );
}
