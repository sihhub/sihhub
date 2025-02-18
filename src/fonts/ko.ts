import { Nanum_Gothic_Coding, Noto_Sans_KR, Roboto } from "next/font/google";

export const nanumGothicCoding = Nanum_Gothic_Coding({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "600", "700", "100", "200", "300", "900", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});
