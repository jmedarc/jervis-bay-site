import type { Metadata } from "next";
import BestBeachesContent from "./best-beaches-content";

export const metadata: Metadata = {
  title: "Best Beaches in Jervis Bay | Condition-Based Guide",
  description: "Find the best beach for today's conditions in Jervis Bay. Filter by swimming, surfing, family-friendly or quiet beaches based on weather, wind, and swell.",
  keywords: ["best beaches Jervis Bay", "swimming beaches", "surf spots", "family beaches", "quiet beaches"],
};

export default function BestBeachesPage() {
  return <BestBeachesContent />;
}