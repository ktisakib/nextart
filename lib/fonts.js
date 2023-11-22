import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// to use google fonts
// use this google font in any html element <h1 className={jetBrains_Mono.className}></h1>
// or <h1 className={cn(jetBrains_Mono.className,"text-2xl")}></h1>
export const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

// to use localfont
export const array = localFont({ src: "./fonts/Array-BoldWide.ttf" });
