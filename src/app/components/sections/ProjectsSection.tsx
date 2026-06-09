"use client";

import { projects } from "@/lib/data";
import ExternalLink from "../ui/ExternalLink";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../ui/carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SquareArrowOutUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProjectsSection({ locale }: { locale: string }) {
    const t = useTranslations("projects");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [activeProject, setActiveProject] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl md:text-4xl text-center mb-4">
                {t("title")}{" "}
                <span className="text-amber-400 font-bold">
                    {t("titleHighlight")}
                </span>{" "}
                {t("subtitle")}
            </p>

            <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
                dir="ltr"
            >
                <CarouselContent>
                    {projects.map((project) => {
                        const name = t(`items.${project.key}.name`);
                        const description = t(`items.${project.key}.description`);
                        const moreDesc = t(`items.${project.key}.moreDesc`);

                        return (
                            <CarouselItem dir={locale === "fa" ? "rtl" : "ltr"} key={project.id}>
                                <div
                                    onClick={() => {
                                        setActiveProject(project.key);
                                        setDialogOpen(true);
                                    }}
                                    className="group relative h-60 rounded-2xl overflow-hidden border border-white/10 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-500 hover:cursor-pointer"
                                >
                                    <Image
                                        src={project.image}
                                        alt={name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                                    <div className="absolute inset-0 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end items-center gap-3">
                                        <div className="flex flex-col gap-3 m-6">
                                            <div className="gap-1">
                                                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-amber-400 group-hover:to-amber-200 transition-all duration-500">
                                                    {name}
                                                </h3>

                                                <p className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
                                                    {description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/20 hover:border-amber-400/50 hover:text-amber-400 transition-all"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 self-end sm:self-start">
                                            <ExternalLink
                                                href={project.link}
                                                className="p-3 group/btn backdrop-blur-sm"
                                            >
                                                <SquareArrowOutUpRight size={25} />
                                            </ExternalLink>
                                        </div>
                                    </div>
                                </div>

                                <Dialog
                                    open={dialogOpen && activeProject === project.key}
                                    onOpenChange={(open) => {
                                        setDialogOpen(open);
                                        if (!open) {
                                            setShowMore(false);
                                            setActiveProject(null);
                                        }
                                    }}
                                >
                                    <DialogTitle></DialogTitle>
                                    <DialogContent className="max-w-[95vw] md:max-w-[70vw] max-h-[90vh] bg-black/90 border-none backdrop-blur-sm">
                                        <div className="flex flex-col gap-4 md:gap-6 p-2 md:p-6">
                                            <div className="flex flex-col md:gap-3 border-b border-white/10 pb-4 md:pb-6">
                                                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent mb-2">
                                                    {name}
                                                </h2>

                                                <div className="relative mt-0">
                                                    <div
                                                        className={`text-gray-300 whitespace-pre-line transition-all duration-500 ${showMore
                                                            ? "max-h-[500px]"
                                                            : "max-h-24 overflow-hidden"
                                                            }`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: moreDesc.replace(/\n/g, "<br/>")
                                                        }}
                                                    />

                                                    {!showMore && (
                                                        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent" />
                                                    )}

                                                    <button
                                                        onClick={() => setShowMore(!showMore)}
                                                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 mb-2"
                                                    >
                                                        <ChevronDown
                                                            size={22}
                                                            className={`transition-transform duration-300 ${showMore
                                                                ? "rotate-180 text-amber-400"
                                                                : "text-white"
                                                                }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            {!showMore && (
                                                <Carousel
                                                    opts={{ align: "start", loop: true }}
                                                    className="w-full"
                                                    dir="ltr"
                                                >
                                                    <CarouselContent>
                                                        {project.images?.map((img, idx) => (
                                                            <CarouselItem key={idx}>
                                                                <div className="relative w-full rounded-xl max-h-[50vh] md:max-h-[60vh] border border-white/10 shadow-2xl overflow-x-hidden overflow-y-auto custom-scrollbar">
                                                                    <Zoom >
                                                                        <Image
                                                                            src={img}
                                                                            alt={`${name} ${idx + 1}`}
                                                                            width={1400}
                                                                            height={900}
                                                                            className="w-full h-auto"
                                                                        />
                                                                    </Zoom>
                                                                </div>
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>

                                                    <CarouselPrevious className="left-2 md:-left-10 bg-transparent border-none" />
                                                    <CarouselNext className="right-2 md:-right-10 bg-transparent border-none" />
                                                </Carousel>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <CarouselPrevious className="left-4 md:-left-12 bg-transparent border-none" />
                <CarouselNext className="right-4 md:-right-12 bg-transparent border-none" />
            </Carousel>
        </div>
    );
}
