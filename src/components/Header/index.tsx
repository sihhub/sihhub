import styles from "./header.module.scss";
import Link from "next/link";
import { GithubIcon, LicenseIcon } from "hugeicons-react";

export default function Header() {
  return (
    <header className={styles.header}>
      <span className="text-l sm:text-xl">
        <strong>sih</strong>Hub
      </span>
      <div className={styles.headerInner}>
        <Link href="#hero">
          <span>Home</span>
        </Link>
        <Link href="#about">
          <span>About</span>
        </Link>
        <Link href="#projects">
          <span>Projects</span>
        </Link>
      </div>
      <div className="fixed bottom-4 right-4 flex items-center justify-center gap-[10px]">
        <a
          href="https://velog.io/@sih99/posts"
          target="_blank"
          title="Blogger"
          className="w-10 flex items-center justify-center bg-stone-50 border border-black aspect-square rounded-full shadow"
        >
          <LicenseIcon className="h-5" />
          <span className="a11y-hidden">Blog</span>
        </a>
        <a
          href="https://github.com/sihhub"
          target="_blank"
          title="GitHub"
          className="w-10 flex items-center justify-center bg-gray-800 aspect-square rounded-full shadow"
        >
          <GithubIcon className="h-5 text-white" />
          <span className="a11y-hidden">GitHub</span>
        </a>
      </div>
    </header>
  );
}
