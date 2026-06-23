import { Metadata } from "next";
import IconicJervisBayExperiencesContent from "./iconic-jervis-bay-experiences-content";

export const metadata: Metadata = {
  title: "Iconic Jervis Bay Experiences | Whale Watching, Snorkelling & More",
  description: "Discover the unforgettable experiences that make Jervis Bay famous. From whale watching and snorkelling to kayaking and paddleboarding in crystal-clear waters.",
  keywords: ["Jervis Bay", "whale watching", "snorkelling", "kayaking", "paddleboarding", "marine life", "iconic experiences"],
  openGraph: {
    title: "Iconic Jervis Bay Experiences | Whale Watching, Snorkelling & More",
    description: "Discover the unforgettable experiences that make Jervis Bay famous. From whale watching and snorkelling to kayaking and paddleboarding.",
    type: "website",
  },
};

export default function IconicJervisBayExperiencesPage() {
  return <IconicJervisBayExperiencesContent />;
}