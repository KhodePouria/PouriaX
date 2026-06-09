import localFont from "next/font/local"

export const Voga = localFont({
    src: [{ path: "./fonts/Voga-Medium.otf" }],
    variable: "--font-voga"
})

export const Peyda = localFont({
    src: [
        { path: "./fonts/Peyda-Thin.woff2", weight: "100" },
        { path: "./fonts/peyda-extralight.woff2", weight: "200" },
        { path: "./fonts/peyda-light.woff2", weight: "300" },
        { path: "./fonts/Peyda-Regular.woff2", weight: "400" },
        { path: "./fonts/Peyda-Medium.woff2", weight: "500" },
        { path: "./fonts/Peyda-Regular.woff2", weight: "600" },
        { path: "./fonts/Peyda-Bold.woff2", weight: "700" },
        { path: "./fonts/Peyda-ExtraBold.woff2", weight: "800" },
        { path: "./fonts/Peyda-Black.woff2", weight: "900" },
    ],
    variable: "--font-peyda",
})

export const Rubik = localFont({
    src: [{ path: "./fonts/Rubik-Medium.ttf" }],

    variable: "--font-Rubik"
})