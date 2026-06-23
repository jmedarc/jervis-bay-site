import type { Metadata } from "next";
import FreeThingsContent from "./free-things-content";

export const metadata: Metadata = {
  title: "Free Things To Do in Jervis Bay | Budget-Friendly Guide",
  description:
    "Discover the best free activities in Jervis Bay. From white sand beaches and scenic walks to hidden lookouts and wildlife encounters — enjoy the region without spending a cent.",
  keywords:
    "Free things Jervis Bay, budget activities, free beaches, free walks, Hyams Beach, coastal walks, family free activities",
  openGraph: {
    title: "Free Things To Do in Jervis Bay",
    description:
      "Some of the best experiences in Jervis Bay don't cost a cent. From pristine beaches to scenic coastal walks, discover the top free activities in the region.",
    type: "article",
  },
};

export default function FreeThingsToDo() {
  return <FreeThingsContent />;
}