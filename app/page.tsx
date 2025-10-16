import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import AdminLink from "@/components/AdminLink";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <Footer />
    </main>
  )
}
