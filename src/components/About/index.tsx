"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./about.module.scss";
import {
  Mail01Icon,
  Calendar01Icon,
  MapPinIcon,
  PhoneOff01Icon,
  Location01Icon,
  SmartPhone01Icon,
} from "hugeicons-react";
import { SKILLS } from "@/data/skills";

// 태그별 색상 설정
const getTagColor = (category: string) => {
  switch (category) {
    case "frontend":
      return "border-blue-300 text-blue-500"; // 푸른 계열 (프론트엔드)
    case "aws":
      return "border-violet-300 text-violet-500"; // 붉은 계열 (AWS 서버 관련)
    case "ios":
      return "border-black text-black"; // 보라 계열 (iOS)
    default:
      return "border-gray-300 text-gray-600"; // 무색 (나머지)
  }
};
export default function About() {
  return (
    <div className={`common-container bg-sky-50/40`} id="about">
      <section>
        <h2 className="mb-2">
          About <span>소개</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-end gap-4"
            >
              <div
                className={`${styles.profileImgContainer}  w-32 h-32 sm:w-40 sm:h-40 `}
              >
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className={`${styles.profileImg} w-32 h-32 sm:w-40 sm:h-40`}
                  loading="lazy"
                />
              </div>
              <motion.div
                className="text-sm sm:text-lg mt-10 mb-4 font-light space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="flex items-center gap-2">
                  <Mail01Icon size={20} />{" "}
                  <a href="mailto:hongsungin92@gmail.com">
                    hongsungin92@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar01Icon size={20} /> 1992.09.09
                </p>
                <p className="flex items-center gap-2">
                  <Location01Icon size={20} /> 서울, 대한민국
                </p>
                <p className="flex items-center gap-2">
                  <SmartPhone01Icon size={20} />{" "}
                  <a href="tel:01025074232">010-2507-4232</a>
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="text-sm sm:text-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="font-bold mt-4 mb-3">
                디테일한 인터랙션과 최적화된 퍼포먼스를 고민하는 개발자
                홍성인입니다.
              </h4>
              <p>
                Next.js와 TypeScript를 중심으로 다양한 기술을 활용하며,
                재사용성과 유지보수성을 고려한 설계를 중요하게 생각합니다.
              </p>
              <p>
                프론트엔드 개발자로서 더 나은 UI 와 사용자 경험을 구현하고자
                하며, 웹뿐만 아니라 iOS 앱 개발 경험도 갖추고 있습니다.
              </p>
              <p>
                또한, 서버리스 환경에서의 백엔드 개발을 경험하며 클라이언트와
                서버 의 연결을 깊이 이해하고, 효율적인 아키텍처를 탐구하고
                있습니다.
              </p>
            </motion.div>
            <motion.div
              className="text-sm sm:text-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h4 className="font-bold mt-4 mb-3">활용하는 기술들</h4>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium border rounded-full ${getTagColor(
                      skill.category
                    )}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
