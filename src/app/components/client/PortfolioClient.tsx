import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";

import SectionManager from "./SectionManager";
import ContactButton from "./ContactButton";
import MouseTracker from "./MouseTracker";
import LanguageToggle from "./LanguageToggle";
import { getLocale } from "@/i18n/actions";

export default async function Portfolio() {
    const locale = await getLocale()
    const sections = [
        {
            key: "home" as const,
            content: <HeroSection />,
            className: "w-full text-center",
        },
        {
            key: "about" as const,
            content: (
                <MouseTracker className="w-full max-w-6xl">
                    <AboutSection />
                </MouseTracker>
            ),
            className: "z-20 w-full max-w-6xl",
        },
        {
            key: "skills" as const,
            content: <SkillsSection lang={locale} />,
            className: "w-full max-w-4xl",
        },
        {
            key: "projects" as const,
            content: <ProjectsSection locale={locale} />,
            className: "w-full max-w-4xl",
        },
    ];

    return (
        <div className="overflow-hidden">
            <div dir='ltr' className="flex justify-between mt-5 mr-5 ml-5">
                <LanguageToggle />
                <ContactButton />
            </div>
            <SectionManager sections={sections} locale={locale} />
        </div>
    );
}
