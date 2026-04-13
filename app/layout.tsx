import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website UMKM",
  description: "Website UMKM dengan Next.js dan Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 bg-black/50 px-4 py-5 backdrop-blur-sm sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-center text-sm text-white/60">
            <span>
              Made by{" "}
              <a
                href="https://github.com/OlssenLS/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white transition-colors hover:text-cyan-300 hover:underline hover:underline-offset-4"
              >
                OlssenLS
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
