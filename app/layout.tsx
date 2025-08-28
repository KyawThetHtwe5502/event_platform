import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const poppins = Poppins({
   subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-poppins'
  })

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management",
  icons: {
    icon :'/assets/images/LOGOf.jpg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} flex flex-col min-h-screen`}
      >
            <ClerkProvider>

              <Header/>
              <main className="">
        {children}

              </main>
              <Footer/>
    </ClerkProvider>

      </body>
    </html>
  );
}
