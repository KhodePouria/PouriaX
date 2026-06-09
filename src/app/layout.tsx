import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { Peyda, Rubik, Voga } from "./fonts";


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = (messages as Record<string, Record<string, string>>).metadata;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t.title,
      template: `%s | ${siteConfig.name}`,
    },
    alternates: {
      canonical: `${process.env.PUBLIC_SITE_URL}/`,
    },
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      url: siteConfig.url,
      title: t.title,
      description: t.description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      creator: siteConfig.author.twitter,
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = locale === "fa";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} >
      <body className={`${isRTL ? Peyda.className : Rubik.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
