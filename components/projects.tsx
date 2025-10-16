"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const projects = [
  {
    title: "BaseLink App",
    description:
      "Base Day 2 Challenge - A comprehensive blockchain application built on Base network with modern UI and seamless user experience.",
    tags: ["Next.js", "Base", "Web3", "TypeScript"],
    image: "/blockchain-app-interface.png",
    github: "https://github.com/abdunur-dev/Base-day-2-challeng",
    live: "https://baselink-app.vercel.app",
  },
  {
    title: "Base Day 1 Challenge",
    description:
      "Initial Base blockchain challenge project showcasing smart contract integration and decentralized application development.",
    tags: ["React", "Solidity", "Base", "Ethers.js"],
    image: "/web3-dapp-dashboard.jpg",
    github: "https://github.com/abdunur-dev/Base-day1-challeng",
    live: null,
  },
  {
    title: "Salah Apologetics",
    description:
      "A comprehensive Islamic resource platform providing educational content, prayer times, and community engagement features.",
    tags: ["Next.js", "TypeScript", "Tailwind", "API Integration"],
    image: "/islamic-website-modern-design.jpg",
    github: null,
    live: "https://salahapologetics.com",
  },
]

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleProjects((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }
          })
        },
        { threshold: 0.1 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A selection of recent work showcasing my expertise in building modern web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className={`transition-all duration-700 ${
                visibleProjects[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {project.live && (
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2 group/btn flex-1 hover:scale-105 transition-all duration-300"
                        asChild
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 group/btn flex-1 hover:scale-105 transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
