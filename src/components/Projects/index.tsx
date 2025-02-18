"use client";

import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import styles from "./projects.module.scss";

export default function Projects({ projects }: { projects: any[] }) {
  return (
    <div
      className={`common-container`}
      id="projects"
      style={{
        minHeight: "960px",
      }}
    >
      <section>
        <h2>
          Projects <span>프로젝트</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.ul
            className={`md:grid-cols-2 xl:grid-cols-3 ${styles.projects}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                index={index}
                thumbs={project.thumbs}
              />
            ))}
          </motion.ul>
        </AnimatePresence>
      </section>
    </div>
  );
}
