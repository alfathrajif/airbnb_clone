import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header-v2";
import Footer from "@/components/footer";
import { Raleway } from "next/font/google";

export const metadata: Metadata = {
  title: "Airbnb Clone | Vacation rentals, cabins, beach houses & more",
  description: "Vacation rentals, cabins, beach houses, and more",
};

const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
      <body>
        <Header />
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
