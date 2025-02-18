"use client";

import styles from "./logo.module.scss";
import { nanumGothicCoding, roboto } from "@/fonts/ko";

export type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <span
      className={`${styles.logo} ${className || ""} 
      ${roboto.className}
      `}
    >
      <span>홍</span>
      <span>성</span>
      <span>인</span>
    </span>
  );
}
