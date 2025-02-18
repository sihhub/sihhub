import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import { getProjects } from "@/utils/projectUtils";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Projects projects={projects} />
    </div>
  );
}
