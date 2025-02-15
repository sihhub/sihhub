"use client";

import { nanumGothicCoding } from "@/fonts/ko";
import styles from "./hero.module.scss";

import Logo from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  return (
    <div className={`${styles.hero || ""} common-container`} id="home">
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`code ${nanumGothicCoding.className} `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primary2">{`<strong>`}</span>
            <span className="font-extrabold text-accent">frontend</span>
            <span className="text-primary2">{`</strong>`}</span>
            <span className=""> developer</span>
            <wbr />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Logo className="text-8xl sm:text-9xl md:text-[150px]" />
          </motion.div>
          <motion.p
            className="text-xl leading-snug font-thin sm:text-2xl mt-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            디테일한 <span className="text-primary2">인터랙션</span>과
            <br />
            최적화된 <span className="text-primary">퍼포먼스</span>를 고민하는
            <br />
            개발자 <strong>홍성인</strong>입니다.
          </motion.p>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
