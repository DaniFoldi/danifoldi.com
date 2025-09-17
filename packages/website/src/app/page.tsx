import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Github, Twitter, Linkedin } from "lucide-react";

const projects = [
  {
    name: "CleverEV",
    description: "Manage your home EV charger or charge at public stations",
    link: "https://cleverev.net",
    cta: "View",
    cleverev: true,
  },
  {
    name: "Adventure",
    description: "A text-based adventure game narrated by AI",
    link: "/adventure",
    cta: "Play",
  },
  {
    name: "forest",
    description: "Minecraft server plugin with microservice architecture and dynamic loading",
    link: "https://github.com/DaniFoldi/forest",
    cta: "View Source",
    github: true,
  },
  {
    name: "ProtoGUI",
    description: "Minecraft Proxy Plugin for creating Menu GUIs",
    link: "https://github.com/DaniFoldi/protogui",
    cta: "View Source",
    github: true,
  },
  {
    name: "Personal Blog",
    description: "Ideas, projects, and anything else I wanted to share",
    link: "/blog",
    cta: "Read",
    blog: true,
  },
  {
    name: "DML",
    description: "Different Markup Language, JSON, but simpler",
    link: "https://github.com/DaniFoldi/dml",
    cta: "View Source",
    github: true,
  },
  {
    name: "vulnerabill",
    description: "Check your website for vulnerabilities",
    link: "https://github.com/DaniFoldi/vulnerabill",
    cta: "View Source",
    github: true,
  },
  {
    name: "Async_Operations",
    description: "Arduino library for running asynchronous timers",
    link: "https://github.com/DaniFoldi/async_operations",
    cta: "View Source",
    github: true,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Flickering grid background, full screen */}
      <FlickeringGrid
        color={"var(--primary)"}
        className="fixed inset-0 w-full h-full z-0"
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh" }}
      />
      {/* Main content card */}
      <main className="relative z-10 w-full max-w-4xl mx-auto p-8 sm:p-12 bg-white/80 dark:bg-black/80 rounded-2xl shadow-xl backdrop-blur-md flex flex-col items-center gap-8 mt-16 mb-16">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-center text-primary">Dániel Földi</h1>
          <p className="text-lg text-center text-muted-foreground max-w-xl">
            Software engineer passionate about building delightful developer tools, modern web apps, and open source projects. Always learning, always shipping.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://github.com/DaniFoldi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-black dark:hover:text-white transition-colors">
              <Github size={28} />
            </a>
            <a href="https://x.com/DaniFoldi" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-sky-500 transition-colors">
              <Twitter size={28} />
            </a>
            <a href="https://www.linkedin.com/in/daniel-foldi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors">
              <Linkedin size={28} />
            </a>
          </div>
        </div>
        <section className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Blog card, full width on large screens */}
            {/*
            {projects.filter(p => p.blog).map(project => (
              <a
                key={project.name}
                href={project.link}
                className="block rounded-xl border border-border bg-white/90 dark:bg-zinc-900/80 p-5 shadow hover:shadow-lg transition-all hover:-translate-y-1 col-span-1 sm:col-span-2 lg:col-span-3"
              >
                <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <span className="text-xs text-primary font-medium">{project.cta}</span>
              </a>
            ))}
            */}
            {/* Other projects */}
            {projects.filter(p => !p.blog).map(project => (
              <a
                key={project.name}
                href={project.link}
                {...(project.cleverev
                  ? { target: "_blank" }
                  : project.link.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                className="block rounded-xl border border-border bg-white/90 dark:bg-zinc-900/80 p-5 shadow hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <span className="text-xs text-primary font-medium">{project.cta}</span>
              </a>
            ))}
          </div>
        </section>
        <footer className="w-full flex justify-center items-center py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dániel Földi
        </footer>
      </main>
    </div>
  );
}
