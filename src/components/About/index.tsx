"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./about.module.scss";

export default function About() {
  return (
    <div className={`common-container bg-sky-50/40`} id="about">
      <section>
        <h2 className="title">
          About <span>소개</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.profileImgContainer}>
              <img
                src="/images/profile.png"
                alt="Profile"
                className={styles.profileImg}
              />
            </div>
          </motion.section>
        </AnimatePresence>
      </section>
    </div>
  );
}
