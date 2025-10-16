"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border/40 bg-background/95 backdrop-blur-md shadow-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300 group-hover:scale-110">
                <Image src="/avatar.jpg" alt="Abdu Dev" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                abdu<span className="text-primary">{"{dev}"}</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#projects"
                className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                PROJECTS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                ABOUT
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="#contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                CONTACT
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {/* Desktop CTA Button */}
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent"
                asChild
              >
                <Link href="#contact">Get In Touch</Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden relative z-50 hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out menu */}
          <nav className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-border z-40 md:hidden animate-in slide-in-from-right duration-300 shadow-2xl">
            <div className="flex flex-col h-full pt-20 px-6">
              <div className="flex flex-col gap-6">
                <Link
                  href="#projects"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/50"
                  onClick={handleLinkClick}
                >
                  PROJECTS
                </Link>
                <Link
                  href="/blog"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/50"
                  onClick={handleLinkClick}
                >
                  BLOG
                </Link>
                <Link
                  href="#about"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/50"
                  onClick={handleLinkClick}
                >
                  ABOUT
                </Link>
                <Link
                  href="#contact"
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/50"
                  onClick={handleLinkClick}
                >
                  CONTACT
                </Link>
              </div>

              <div className="mt-8">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                  asChild
                >
                  <Link href="#contact" onClick={handleLinkClick}>
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
