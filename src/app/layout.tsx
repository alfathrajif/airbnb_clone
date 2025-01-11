import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";
import styles from "./app.module.scss";

export const metadata: Metadata = {
  title: "Airbnb Clone | Vacation rentals, cabins, beach houses & more",
  description: "Vacation rentals, cabins, beach houses, and more",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div className={styles.container}>
          {/* <Header /> */}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
