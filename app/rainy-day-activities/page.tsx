import type { Metadata } from "next";
import RainyDayContent from "./rainy-day-content";

export const metadata: Metadata = {
  title: "Rainy Day Activities in Jervis Bay | What to Do When It Rains",
  description:
    "Discover what to do in Jervis Bay when it rains. From coastal drives in light rain to storm watching and cozy pubs, make the most of any weather.",
  keywords:
    "Rainy day Jervis Bay, things to do Jervis Bay rain, storm watching, Flaming Galah Brewery, Huskisson Pub, coastal drive rain",
  openGraph: {
    title: "Rainy Day Activities in Jervis Bay",
    description:
      "Don't let rain ruin your trip. Discover local tips for enjoying Jervis Bay in any weather.",
    type: "article",
  },
};

export default function RainyDayActivities() {
  return <RainyDayContent />;
}