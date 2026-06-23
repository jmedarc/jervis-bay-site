import type { Metadata } from "next";
import WeekendItineraryContent from "./weekend-itinerary-content";

export const metadata: Metadata = {
  title: "Weekend Itinerary Planner | Jervis Bay Trip Builder",
  description:
    "Create your perfect Jervis Bay itinerary with our custom trip planner. Select your interests, travel style, and accommodation to generate a personalised multi-day schedule of beaches, walks, hidden gems, and activities.",
  keywords:
    "Jervis Bay itinerary, weekend trip planner, Jervis Bay trip builder, 2 day itinerary, 3 day itinerary, Jervis Bay activities, personalised travel plan",
  openGraph: {
    title: "Weekend Itinerary Planner | Jervis Bay Trip Builder",
    description:
      "Build your perfect Jervis Bay trip with our interactive itinerary planner. Get personalised recommendations based on your preferences.",
    type: "article",
  },
};

export default function WeekendItinerary() {
  return <WeekendItineraryContent />;
}