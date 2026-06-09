
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function AboutSection() {
    const t = await getTranslations("about");

    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-center gap-6 p-4 lg:flex-row sm:gap-8 lg:gap-12 sm:p-6 lg:p-15">
                <div className="flex-shrink-0">
                    <Image
                        src='/Pic.jpg'
                        alt={t("imageAlt")}
                        width={250}
                        height={250}
                        className="object-cover w-32 h-32 rounded-full shadow-lg sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64"
                        priority
                    />
                </div>
                <div className="flex flex-col max-w-xs gap-3 text-center sm:gap-4 lg:text-start sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <div className="flex flex-row justify-center text-2xl font-bold lg:justify-start sm:text-3xl md:text-4xl lg:text-5xl">
                        <p>{t("title")}</p>
                        <p className="text-[#FEA182] ms-2">{t("titleHighlight")}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300 para sm:text-base lg:text-lg">
                        {t("mainText")}
                    </p>
                </div>
            </div>

            <div
                className="second flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 absolute inset-0 bg-transparent p-4 sm:p-6 lg:p-15 rounded-3xl border-2 border-[#FEA182] pointer-events-none"
                style={{
                    opacity: "var(--overlay-opacity, 0)",
                    mask: `radial-gradient(35rem 35rem at var(--mouse-x, 50%) var(--mouse-y, 50%), #000 0%, transparent 50%)`,
                    WebkitMask: `radial-gradient(35rem 35rem at var(--mouse-x, 50%) var(--mouse-y, 50%), #000 1%, transparent 50%)`,
                }}
            >
                <div className="flex-shrink-0">
                    <div className="object-cover w-32 h-32 rounded-full shadow-lg sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64" />
                </div>
                <div className="flex flex-col max-w-xs gap-3 text-center text-transparent select-none sm:gap-4 lg:text-start sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <div className="flex flex-row justify-center text-2xl font-bold lg:justify-start sm:text-3xl md:text-4xl lg:text-5xl">
                        <p>{t("title")}</p>
                        <p className="ms-2 text-transparent select-none">{t("titleHighlight")}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-transparent select-none para sm:text-base lg:text-lg">
                        {t("overlayText")}
                    </p>
                </div>
            </div>
        </div>
    );
}
