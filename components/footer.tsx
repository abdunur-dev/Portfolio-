"use client"

import { Github, Send } from "lucide-react"
import { XIcon } from "@/components/icons/x-icon"
import { LinkedInIcon } from "@/components/icons/linkedin-icon"
import { InstagramIcon } from "@/components/icons/instagram-icon"
import { useState, useEffect, useRef } from "react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} id="contact" className="border-t border-border/40 py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                Let's Build Something{" "}
                <span className="text-primary inline-block hover:scale-110 transition-transform duration-300">
                  Amazing
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out through
                any of my social channels.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://x.com/AbdurhamanNur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/50"
              >
                <XIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdurhaman-nur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/50"
                style={{ transitionDelay: "50ms" }}
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/esmiz_student"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/50"
                style={{ transitionDelay: "100ms" }}
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://t.me/abdunur_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/50"
                style={{ transitionDelay: "150ms" }}
              >
                <Send className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/abdunur-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-lg hover:shadow-primary/50"
                style={{ transitionDelay: "200ms" }}
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div
            id="about"
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-bold">
              About <span className="text-primary">Me</span>
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Web3 and full-stack developer specializing in building decentralized applications and
                modern web experiences. My expertise spans blockchain technology, smart contracts, and cutting-edge web
                development frameworks.
              </p>
              <p>
                With a strong foundation in React, Next.js, TypeScript, and blockchain ecosystems, I create scalable
                applications that bridge Web2 and Web3. I'm constantly exploring emerging technologies in the
                decentralized space while maintaining excellence in traditional web development.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/40">
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="font-semibold">abdu{"{dev}"}</span>. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with <span className="text-primary">Next.js</span> &{" "}
              <span className="text-primary">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
