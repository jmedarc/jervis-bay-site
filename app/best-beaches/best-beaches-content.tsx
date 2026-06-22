"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import activities from "../../src/data/activities";

type BeachCondition = "calm" | "windy" | "surf" | "after-rain" | "sunset";
type BeachSuitability = "swimming" | "surfing" | "family" | "quiet";

interface ActivityData {
  id: string;
  title: string;
  type: string;
  beachSuitability: BeachSuitability | null;
  distanceFromHuskissonKm: number | null;
  description: string;
  images: string[];
  tags: string[];
}

const beachConditions: { id: BeachCondition; label: string; icon: string; description: string }[] = [
  { id: "calm", label: "Calm & Sunny", icon: "🌞", description: "Perfect swimming weather" },
  { id: "windy", label: "Windy Day", icon: "🌬", description: "Kitesurf conditions" },
  { id: "surf", label: "Big Swell / Surf", icon: "🌊", description: "Surfing conditions" },
  { id: "after-rain", label: "After Rain", icon: "🌧", description: "Clear water returning" },
  { id: "sunset", label: "Sunset Session", icon: "🌅", description: "Golden hour beach time" },
];

function getSuitabilityBadge(suitability: BeachSuitability | null) {
  switch (suitability) {
    case "swimming":
      return { text: "Swimming", className: "bg-cyan-100 text-cyan-700" };
    case "surfing":
      return { text: "Surfing", className: "bg-blue-100 text-blue-700" };
    case "family":
      return { text: "Family", className: "bg-green-100 text-green-700" };
    case "quiet":
      return { text: "Quiet", className: "bg-purple-100 text-purple-700" };
    default:
      return { text: "Beach", className: "bg-gray-100 text-gray-700" };
  }
}

function formatDistance(km: number | null): string {
  if (km === null) return "Location varies";
  if (km === 0) return "In Huskisson";
  if (km <= 10) return `~${km} km from Huskisson`;
  if (km <= 30) return `~${Math.round(km / 5) * 5} min drive`;
  if (km <= 100) return `~${Math.round(km / 60)} hr drive`;
  return `~${Math.round(km / 60)}–${Math.round(km / 45)} hr drive`;
}

// Map conditions to suitability types for filtering
function getRecommendedSuitability(condition: BeachCondition): BeachSuitability[] {
  switch (condition) {
    case "calm":
      return ["swimming", "family"];
    case "windy":
      return ["surfing", "quiet"];
    case "surf":
      return ["surfing"];
    case "after-rain":
      return ["swimming", "quiet"];
    case "sunset":
      return ["quiet", "family"];
    default:
      return [];
  }
}

export default function BestBeachesContent() {
  const [selectedCondition, setSelectedCondition] = useState<BeachCondition>("calm");
  const [selectedSuitability, setSelectedSuitability] = useState<BeachSuitability | "all">("all");

  const typedActivities = activities as ActivityData[];

  // Filter to only beach-type activities
  const beachActivities = useMemo(() => {
    return typedActivities.filter((a) => a.type === "beach" || a.beachSuitability !== null);
  }, [typedActivities]);

  // Filter by condition and suitability
  const filteredBeaches = useMemo(() => {
    let result = beachActivities;

    // Filter by suitability if selected
    if (selectedSuitability !== "all") {
      result = result.filter((a) => a.beachSuitability === selectedSuitability);
    }

    return result;
  }, [beachActivities, selectedSuitability]);

  // Get recommended suitability based on condition
  const recommendedSuitability = useMemo(() => {
    return getRecommendedSuitability(selectedCondition);
  }, [selectedCondition]);

  const toggleSuitability = (suitability: BeachSuitability) => {
    setSelectedSuitability(selectedSuitability === suitability ? "all" : suitability);
  };

  const suitabilityOptions: BeachSuitability[] = ["swimming", "surfing", "family", "quiet"];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(8, 145, 178, 0.85) 0%, rgba(79, 70, 229, 0.85) 100%),
            url('/Crystal_Clear_Hyams_Beach_White_Sand.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Condition-Based Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Best Beaches in Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            There is no single best beach — only the best beach for today's conditions.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Condition Selector */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What kind of beach day is it?</h2>
            <p className="text-gray-600">Select today's conditions to see the best beach options</p>
          </div>

          {/* Condition Toggle */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {beachConditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => setSelectedCondition(condition.id)}
                className={`px-5 py-3 rounded-xl transition-all duration-300 ${
                  selectedCondition === condition.id
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{condition.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{condition.label}</div>
                    <div className={`text-xs ${selectedCondition === condition.id ? "text-white/80" : "text-gray-500"}`}>
                      {condition.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Suitability Filter */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">
              Filter by beach type:
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {suitabilityOptions.map((suitability) => {
                const badge = getSuitabilityBadge(suitability);
                const isRecommended = recommendedSuitability.includes(suitability);
                return (
                  <button
                    key={suitability}
                    onClick={() => toggleSuitability(suitability)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSuitability === suitability
                        ? `${badge.className} ring-2 ring-offset-2 ring-gray-300`
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {badge.text}
                    {isRecommended && <span className="ml-1 text-xs opacity-70">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredBeaches.length}</span> beaches
              {selectedSuitability !== "all" && (
                <span className="text-sm text-gray-500 ml-2">
                  (filtered by {getSuitabilityBadge(selectedSuitability).text.toLowerCase()})
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Condition-based recommendation header */}
          <div className="mb-10 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl px-6 py-4 border border-cyan-100">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">
                  {beachConditions.find((c) => c.id === selectedCondition)?.icon}{" "}
                  {beachConditions.find((c) => c.id === selectedCondition)?.label}:
                </span>{" "}
                Best for{" "}
                <span className="font-semibold text-cyan-700">
                  {recommendedSuitability.map((s) => getSuitabilityBadge(s).text).join(" & ")}
                </span>
              </p>
            </div>
          </div>

          {filteredBeaches.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🏖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No beaches found</h3>
              <p className="text-gray-600">Try selecting a different condition or beach type.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBeaches.map((beach) => {
                const badge = getSuitabilityBadge(beach.beachSuitability);
                const isRecommended = beach.beachSuitability && recommendedSuitability.includes(beach.beachSuitability);
                return (
                  <div
                    key={beach.id}
                    className={`bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition-shadow duration-300 ${
                      isRecommended ? "border-cyan-300" : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${badge.className}`}>
                        {badge.text}
                      </span>
                      {isRecommended && (
                        <span className="px-2 py-1 rounded-md text-xs font-semibold bg-cyan-100 text-cyan-700">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{beach.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>📍</span>
                      <span>{formatDistance(beach.distanceFromHuskissonKm)}</span>
                    </div>
                    {beach.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {beach.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{beach.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🏖</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            The Best Beach Depends on Today
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            Jervis Bay's beaches each have their own character. Wind direction, swell, tides, and recent weather
            all influence which beach is best on any given day. Use the condition selector above to find your
            perfect beach for today's conditions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-white text-cyan-700 font-semibold rounded-full hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
            <Link
              href="/dog-friendly"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Dog Friendly Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-10 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay beach day?</p>
          <p className="text-sm text-gray-500">Check out our other guides for more things to do in the region.</p>
        </div>
      </section>
    </main>
  );
}