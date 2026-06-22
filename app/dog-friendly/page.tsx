import type { Metadata } from "next";
import DogFriendlyContent from "./dog-friendly-content";

export const metadata: Metadata = {
  title: "Dog Friendly Jervis Bay Guide | Pet-Friendly Activities",
  description: "Plan your Jervis Bay trip with your dog. Find dog-friendly beaches, walks, cafes and activities, plus options for when you need to leave your pet behind.",
  keywords: ["dog friendly Jervis Bay", "pet friendly beaches", "dogs allowed", "Jervis Bay with dogs"],
};

export default function DogFriendlyPage() {
  return <DogFriendlyContent />;
}