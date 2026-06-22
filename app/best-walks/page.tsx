import type { Metadata } from "next";
import BestWalksContent from "./best-walks-content";

export const metadata: Metadata = {
  title: "Best Walks, Runs & Rides Around Jervis Bay | Local Guide",
  description:
    "Discover the best coastal walks, running routes, bike rides and hikes around Jervis Bay. From easy waterfront paths to challenging summit hikes, find your perfect adventure.",
  keywords:
    "Best walks Jervis Bay, running routes, bike rides, hiking trails, coastal walks, Huskisson walks, Booderee National Park",
  openGraph: {
    title: "Best Walks, Runs & Rides Around Jervis Bay",
    description:
      "A local guide to coastal walks, running routes, bike rides and hikes — from short waterfront paths to full-day adventures.",
    type: "article",
  },
};

export default function BestWalks() {
  return <BestWalksContent />;
}