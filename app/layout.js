import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Medical Report",
  description: "Medical Reporting System using Biometrics",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="valentine" lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
