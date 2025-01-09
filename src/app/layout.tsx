import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Raleway } from "next/font/google";
import styles from "./app.module.scss";

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
        <div className={styles.container}>
          {/* <Header /> */}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
