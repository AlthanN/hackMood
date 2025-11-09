import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

function handleLogin() {
  const backendUrl = 'http://127.0.0.1:8888';
  window.location.href = backendUrl;
}

export default function Navigation({ onLoginClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-foreground/10 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ backgroundColor: " #FFF4DB" }}
    >
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
      
        <Link href="/" className="flex items-center gap-2">
        {/* <img src="/web_assets/moodscape_header_2a.png" className="w-100"></img> */}
        <img src="/web_assets/moodscape_header_2b.png" className="w-130"></img>

    
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center text-xl gap-8">
          <a href="#about" className="text-[#543111] font-bold hover:text-foreground transition">
            Home
          </a>
          <a href="#about" className="text-[#543111] font-bold  hover:text-foreground transition">
            About
          </a>
          <a href="#how-it-works" className="text-[#543111] font-bold  hover:text-foreground transition">
            How It Works
          </a>
          <a href="#gallery" className="text-[#543111] font-bold  hover:text-foreground transition">
            Gallery
          </a>
          <a href="#footer" className="text-[#543111] font-bold  hover:text-foreground transition">
            Contact
          </a>
          <button
            onClick={onLoginClick}
            className="px-6 py-2 rounded-lg font-semibold transition cursor-pointer hover:scale-110"
            style={{ backgroundColor: "#79B76B", color: "#FFFFFF" }}
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-foreground/10" style={{ backgroundColor: "var(--nav-background)" }}>
          <div className="px-6 py-4 space-y-4">
            <a href="#about" className="block text-[#543111] font-bold hover:text-foreground ">
              Home
            </a>
            <a href="#about" className="block text-[#543111] font-bold hover:text-foreground">
              About
            </a>
            <a href="#how-it-works" className="block text-[#543111] font-bold hover:text-foreground">
              How It Works
            </a>
            <a href="#gallery" className="block text-[#543111] font-bold hover:text-foreground">
              Gallery
            </a>
            <a href="#footer" className="block text-[#543111] font-bold hover:text-foreground">
              Contact
            </a>
            <button
              onClick={() => {
                onLoginClick()
                setIsOpen(false)
              }}
              className="w-full px-6 py-2 rounded-lg font-semibold transition"
            style={{ backgroundColor: "#79B76B", color: "#FFFFFF" }}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}