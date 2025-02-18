"use client";

import { nanumGothicCoding } from "@/fonts/ko";
import styles from "./hero.module.scss";

import Logo from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  return (
    <div
      className={`common-container`} //mt-[64px]
    >
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`${styles.hero || ""}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center mb-3"
          >
            <Logo className="text-6xl" />
          </motion.div>
          {/* <motion.div
            className={`code ${nanumGothicCoding.className} `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-primary2">{`<strong>`}</span>
            <span className="font-extrabold text-accent">frontend</span>
            <span className="text-primary2">{`</strong>`}</span>
            <span className=""> developer</span>
            <wbr />
          </motion.div> */}
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
            <strong>프론트엔드</strong> 엔지니어
          </motion.p>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
