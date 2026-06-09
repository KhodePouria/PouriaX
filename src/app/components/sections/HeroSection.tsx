
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
    const t = await getTranslations("hero");

    return (
        <div className="flex items-end justify-center select-none gap-2" >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black select-none ">
                {t("name")}
            </h1>
            <h3 className="text-3xl sm:text-4xl md:text-5xl  font-black select-none p-1 bg-gradient-to-r animated-gradient-text">
                {t("suffix")}
            </h3>
        </div>
    );
}
