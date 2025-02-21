import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Archivo from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthContexts } from "@/components/contexts/AuthContexts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const archivoBold = Archivo({
  src: "../../public/assets/fonts/Archivo/static/Archivo-Bold.ttf",
  variable: "--font-archivo-bold",
});

const archivoRegular = Archivo({
  src: "../../public/assets/fonts/Archivo/static/Archivo-Regular.ttf",
  variable: "--font-archivo-regular",
});

export const metadata: Metadata = {
  title: "Eventure",
  description:
    "Eventure is the best platform to find and purchase tickets for your favorite events. From music concerts, festivals, seminars, to sports-all in one place! Enjoy easy transactions, digital ticket access, and an unforgettable event experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoBold.variable} ${archivoRegular.variable} antialiased`}
      >
        <AuthContexts>{children}</AuthContexts>
        <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
