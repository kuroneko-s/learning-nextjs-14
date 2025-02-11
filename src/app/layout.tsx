import type {Metadata} from "next";
import {Geist, Geist_Mono, Open_Sans, Noto_Serif_Malayalam} from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
    subsets: ["cyrillic", "greek"],
    weight: ["400"],
    style: ["normal", "italic"],
    variable: "--font-sans"
})

const notoSerifMalayalam = Noto_Serif_Malayalam({
    subsets: ["malayalam"],
    weight: ["400", "700"],
    style: "normal",
    variable: "--font-noto"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
      template: "%s | Carrot Market",
      default: "Carrot Market"
  },
  description: "Carrot Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    console.log(openSans)
  return (
    <html lang="en" className={`${openSans.variable} ${notoSerifMalayalam.variable}`}>
      <body
        className={`font-sans font-malayalam  bg-neutral-900 text-white max-w-[480px] mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
