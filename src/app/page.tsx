import { Suspense } from "react";
import Portfolio from "./components/client/PortfolioClient";

function PortfolioLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center justify-center select-none animate-pulse">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black select-none mb-6 sm:mb-8 md:mb-10 text-gray-700">
                    Pouria
                </h1>
                <h3 className="text-3xl sm:text-4xl md:text-5xl mb-1 font-black select-none p-1 text-gray-600">
                    X
                </h3>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main>
            <Suspense fallback={<PortfolioLoading />}>
                <Portfolio />
            </Suspense>
        </main>
    );
}
