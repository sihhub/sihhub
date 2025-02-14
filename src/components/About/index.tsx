"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./about.module.scss";

export default function About() {
  return (
    <div className={`common-container bg-sky-50/40`} id="about">
      <section>
        <h2>
          About <span>소개</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`${styles.profileImgContainer}  w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40`}
            >
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
