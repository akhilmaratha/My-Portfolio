import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "dev.name | Senior MERN Portfolio",
  description: "Cinematic MERN developer portfolio with admin tooling, MongoDB, and motion-driven UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetBrainsMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[#080b0f] text-white selection:bg-[#00ffaa] selection:text-[#05070a]">{children}</body>
    </html>
  );
}
