import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import SideBar from "@/components/SideBar";
import VideoProvider from "@/context/VideoContext";
import Providers from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext";
import VideoModal from "@/components/VideoModal";
import ModalProvider from "@/context/ModalContext";

const outfit = Outfit({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Streamly",
  description: "Streamly lets you seamlessly explore movies and TV series, add bookmarks, and search across all pages.",
  generator: "Next.js",
  colorScheme: "dark",
  openGraph: {
    title: "Streamly — Entertainment Web App",
    description:
      "Explore a vast collection of movies and TV series, bookmark your favorites, and enjoy seamless navigation across genres.",
    images: [
      {
        url: "https://raw.githubusercontent.com/tapanshah13/streamly/main/public/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Streamly — Entertainment Web App",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Streamly — Entertainment Web App",
    description:
      "Explore a vast collection of movies and TV series, bookmark your favorites, and enjoy seamless navigation across genres.",
    creator: "tapanshah13",
    creatorId: "1243720976552144897",
    images: [
      "https://raw.githubusercontent.com/tapanshah13/streamly/main/public/assets/screenshot.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${outfit.className} bg-[#E0E3EB] dark:bg-[#10141E]`}>
        <AuthContext>
          <Providers>
            <VideoProvider>
              <ModalProvider>
                <SideBar />
                <VideoModal />
                {children}
              </ModalProvider>
            </VideoProvider>
          </Providers>
        </AuthContext>
      </body>
    </html>
  );
}
