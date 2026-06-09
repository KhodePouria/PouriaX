"use client";

import { useTranslations } from "next-intl";
import { skills } from "@/lib/data";
import SkillIcon from "../ui/SkillIcon";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function SkillsSection({ lang }: { lang: string }) {
    const t = useTranslations("skills");

    return (
        <div className="flex flex-col items-center justify-center gap-12">
            <p className="flex flex-row flex-wrap items-end justify-center text-xl md:text-3xl">
                {t("prefix")}
                <span className="text-xl md:text-4xl text-emerald-500 mx-1 font-bold">
                    {t("highlight")}
                </span>
                {t("suffix")}
            </p>

            <div className="relative w-full overflow-hidden">

                <div className="pointer-events-none absolute left-0 top-0 h-full w-30 bg-gradient-to-r from-background to-transparent z-10" />

                <div className="pointer-events-none absolute right-0 top-0 h-full w-30 bg-gradient-to-l from-background to-transparent z-10" />

                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                        dragFree: true,
                        direction: lang === "fa" ? "rtl" : "ltr",
                    }}
                    plugins={[
                        Autoplay({
                            delay: 1800,
                            stopOnInteraction: false,
                        }),
                    ]}
                    className="w-full h-fit"
                >
                    <CarouselContent>
                        {skills.map((skill) => (
                            <CarouselItem
                                key={skill.name}
                                className="py-15 basis-1/6 md:basis-1/8"
                            >
                                <SkillIcon path={skill.icon} name={skill.name} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
