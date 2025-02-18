"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./projectCard.module.scss";

type ProjectCardProps = {
  index: number;
  title: string;
  thumbs: string[];
};

export default function ProjectCard({
  title,
  index,
  thumbs,
}: ProjectCardProps) {
  const id = `project-card-${index}`;
  const mainThumb = thumbs[0] || "";
  return (
    <motion.li
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }} // exit 애니메이션 추가
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className={styles.card}
    >
      <Link href={`/${id}`}>
        <div className={styles.thumb}>
          {mainThumb && (
            <Image
              src={mainThumb}
              alt={mainThumb}
              width={480}
              height={360}
              loading="lazy"
            />
          )}
          {/* <Image
            // src={`/strongerDeer${thumb}`}
            alt=""
            width={480}
            height={360}
          /> */}
        </div>
      </Link>
      <div className={styles.cardContent}>
        <h3 className="title">{title}</h3>
      </div>
    </motion.li>
  );
}
