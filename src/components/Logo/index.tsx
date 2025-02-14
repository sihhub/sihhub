"use client";

import styles from "./logo.module.scss";
import { nanumGothicCoding } from "@/fonts/ko";

export type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <span
      className={`${styles.logo} ${className || ""} ${
        nanumGothicCoding.className
      }`}
    >
      <span>s</span>
      <span>i</span>
      <span>h</span>
      <span>H</span>
      <span>u</span>
      <span>b</span>
    </span>
  );
}
