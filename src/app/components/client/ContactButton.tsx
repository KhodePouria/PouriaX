"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/data";
import { Instagram, Send, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function ContactButton() {
    const t = useTranslations("contact");
    const [isOpen, setIsOpen] = useState(false);

    const getSocialLabel = (name: string) => {
        switch (name.toLowerCase()) {
            case "telegram": return t("telegram");
            case "instagram": return t("instagram");
            case "linkedin": return t("linkedIn");
            default: return name;
        }
    };

    return (
        <div dir="rtl" className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={t("button")}
                className="bg-none text-white border-white/20 p-2 rounded-3xl hover:bg-white hover:text-black border transition-all duration-300 hover: cursor-pointer"
            >
                {!isOpen ? <ChevronDown className="transition-transform duration-300" /> : <ChevronUp className="transition-transform duration-300" />}
            </button>

            <div className={`flex flex-col gap-2 mt-2 transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                {socialLinks.map((link, index) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        className="px-4 py-2 flex gap-2 items-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                        style={{
                            transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                            transform: isOpen ? "translateY(0)" : "translateY(-20px)",
                            opacity: isOpen ? 1 : 0,
                        }}
                    >
                        {link.name === 'Telegram' ? <Send size={18} /> : link.name === "Instagram" ? <Instagram size={18} /> : <Linkedin size={18} />}
                        <span className="text-sm">{getSocialLabel(link.name)}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
