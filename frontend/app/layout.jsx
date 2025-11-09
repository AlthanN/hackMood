import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] })
const _inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SoundScape - Your Music. Your World.",
  description: "Transform your music taste into personalized 3D worlds powered by AI",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/web_assets/moodscape_crc_logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
