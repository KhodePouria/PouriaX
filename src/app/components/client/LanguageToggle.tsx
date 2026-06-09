"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/request";
import { Languages } from "lucide-react";
import { Spinner } from "../ui/spinner";

export default function LanguageToggle() {
    const t = useTranslations("language");
    const locale = useLocale() as Locale;
    const [isPending, startTransition] = useTransition();

    const toggleLocale = () => {
        const newLocale: Locale = locale === "en" ? "fa" : "en";
        startTransition(async () => {
            await setLocale(newLocale);
            window.location.reload();
        });
    };

    return (
        <button
            onClick={toggleLocale}
            disabled={isPending}
            aria-label={t("label")}
            className="bg-none border border-white/20 text-white rounded-3xl h-fit p-3 hover:bg-white hover:text-black transition-colors hover:cursor-pointer"
        >
            {isPending ? (
                <Spinner />
            ) : (
                <Languages size={18} />
            )}
        </button>
    );
}
