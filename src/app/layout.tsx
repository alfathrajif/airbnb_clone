import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Poppins, DM_Serif_Text } from "next/font/google";
import styles from "./app.module.scss";

export const metadata: Metadata = {
  title: "Airbnb Clone | Vacation rentals, cabins, beach houses & more",
  description: "Vacation rentals, cabins, beach houses, and more",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const dmSerifText = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dmSerifText",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSerifText.variable}`}>
      <body className="font-poppins">
        <div className={styles.container}>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
