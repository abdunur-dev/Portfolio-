"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Send } from "lucide-react"
import { XIcon } from "@/components/icons/x-icon"
import { LinkedInIcon } from "@/components/icons/linkedin-icon"
import { InstagramIcon } from "@/components/icons/instagram-icon"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const roles = ["Web3 Dev", "Web2 Dev", "Full-Stack Dev"]

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(roleInterval)
    }
  }, [])

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <div className="inline-block animate-bounce">
                <span className="text-sm font-mono text-primary">
                  {"<"}
                  <span className="inline-block transition-all duration-500" key={roleIndex}>
                    {roles[roleIndex]}
                  </span>
                  {" />"}
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-balance">
                Building Digital{" "}
                <span className="text-primary inline-block hover:scale-110 transition-transform duration-300">
                  Experiences
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Web3 & Full-stack developer crafting decentralized applications and modern web experiences. Specializing
                in blockchain technology, smart contracts, React, Next.js, and TypeScript.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://x.com/AbdurhamanNur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdurhaman-nur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/esmiz_student"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/abdunur_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/abdunur-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-6"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl animate-pulse" />
              <div
                className="relative bg-card border border-border rounded-3xl p-8 lg:p-12 hover:scale-105 transition-all duration-500 hover:rotate-2"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x / 5}deg) rotateX(${-mousePosition.y / 5}deg)`,
                }}
              >
                <div className="relative group">
                  <Image
                    src="/avatar.jpg"
                    alt="Abdurhaman Nur"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-2xl transition-all duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
