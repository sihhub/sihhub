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
import { nanumGothicCoding, notoSansKR } from "@/fonts/ko";

// 태그별 색상 설정
const getTagColor = (category: string) => {
  switch (category) {
    case "frontend":
      return "bg-blue-100 text-blue-800"; // 푸른 계열 (프론트엔드)
    case "aws":
      return "bg-violet-100 text-violet-800"; // 붉은 계열 (AWS 서버 관련)
    case "ios":
      return "bg-black text-white"; // 보라 계열 (iOS)
    default:
      return "bg-gray-100 text-gray-800"; // 무색 (나머지)
  }
};
export default function About() {
  return (
    <div className={`common-container`} id="about">
      <section>
        <h2>
          About <span>소개</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-end gap-4"
            >
              <div
                className={`${styles.profileImgContainer}  w-[160px] h-[160px] sm:w-[190px] sm:h-[190px]`}
              >
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className={`${styles.profileImg}`}
                  loading="lazy"
                />
              </div>
              <motion.div
                className={`text-sm sm:text-lg mb-4 font-light space-y-2  ${notoSansKR.className}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
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
                  <SmartPhone01Icon size={20} />{" "}
                  <a href="tel:01025074232">010-2507-4232</a>
                </p>
                <p className="flex items-center gap-2">
                  <Location01Icon size={20} /> 서울, 대한민국
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="text-base sm:text-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-bold">
                Next.js와 TypeScript 기반의 확장성 있는 개발을 지향하며, iOS 및
                서버리스 경험 보유
              </h3>
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
            {/* <motion.div
              className="text-sm sm:text-base font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <h4 className="font-bold mt-4 mb-4">활용하는 기술들</h4>
              <div className="flex flex-wrap sm:gap-2 gap-2">
                {SKILLS.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium border rounded-full ${getTagColor(
                      skill.category
                    )}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div> */}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
