"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import activities from "../../src/data/activities";

type DogMode = "with-dog" | "without-dog" | "mixed";
type ActivityType = "walk" | "run" | "hike" | "bike" | "food" | "activity";
type DistanceCategory = "local" | "nearby" | "day-trip" | "regional" | "adventure";

interface ActivityData {
  id: string;
  title: string;
  type: string;
  dogFriendly: "yes" | "no" | "partial" | null;
  intensity: string | null;
  surface: string | null;
  distanceFromHuskissonKm: number | null;
  activityDistanceKm: string | null;
  description: string;
  images: string[];
  tags: string[];
}

const dogModes: { id: DogMode; label: string; icon: string }[] = [
  { id: "with-dog", label: "With Dog", icon: "🐶" },
  { id: "without-dog", label: "Without Dog", icon: "🚫" },
  { id: "mixed", label: "Mixed Day", icon: "🔄" },
];

const activityTypes: ActivityType[] = ["walk", "run", "hike", "bike", "food", "activity"];

const distanceCategories: { value: DistanceCategory; label: string; range: string }[] = [
  { value: "local", label: "Local", range: "0–5 km" },
  { value: "nearby", label: "Nearby", range: "5–15 km" },
  { value: "day-trip", label: "Day trips", range: "15–50 km" },
  { value: "regional", label: "Regional", range: "50–100 km" },
  { value: "adventure", label: "Big adventures", range: "100km+" },
];

function getDogFriendlyBadge(dogFriendly: "yes" | "no" | "partial" | null) {
  switch (dogFriendly) {
    case "yes":
      return { text: "Dog Friendly", className: "bg-green-100 text-green-700 border-green-200" };
    case "no":
      return { text: "No Dogs", className: "bg-red-100 text-red-700 border-red-200" };
    case "partial":
      return { text: "Partial", className: "bg-amber-100 text-amber-700 border-amber-200" };
    default:
      return { text: "Unknown", className: "bg-gray-100 text-gray-600 border-gray-200" };
  }
}

function getActivityBadge(type: string) {
  switch (type) {
    case "walk":
      return { text: "Walk", className: "bg-blue-100 text-blue-700" };
    case "run":
      return { text: "Run", className: "bg-purple-100 text-purple-700" };
    case "hike":
      return { text: "Hike", className: "bg-orange-100 text-orange-700" };
    case "bike":
      return { text: "Bike", className: "bg-teal-100 text-teal-700" };
    case "food":
      return { text: "Food", className: "bg-pink-100 text-pink-700" };
    case "activity":
      return { text: "Activity", className: "bg-indigo-100 text-indigo-700" };
    default:
      return { text: type, className: "bg-gray-100 text-gray-700" };
  }
}

function getDistanceCategory(km: number | null): DistanceCategory {
  if (km === null) return "local";
  if (km <= 5) return "local";
  if (km <= 15) return "nearby";
  if (km <= 50) return "day-trip";
  if (km <= 100) return "regional";
  return "adventure";
}

function formatDistance(km: number | null): string {
  if (km === null) return "Location varies";
  if (km === 0) return "In Huskisson";
  if (km <= 10) return `~${km} km from Huskisson`;
  if (km <= 30) return `~${Math.round(km / 5) * 5} min drive`;
  if (km <= 100) return `~${Math.round(km / 60)} hr drive`;
  return `~${Math.round(km / 60)}–${Math.round(km / 45)} hr drive`;
}

export default function DogFriendlyContent() {
  const [selectedDogMode, setSelectedDogMode] = useState<DogMode>("mixed");
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<ActivityType[]>([]);
  const [selectedDistanceCategory, setSelectedDistanceCategory] = useState<DistanceCategory | "all">("all");

  const typedActivities = activities as ActivityData[];

  const filteredActivities = useMemo(() => {
    let result = typedActivities;

    // Filter by dog mode
    if (selectedDogMode === "with-dog") {
      result = result.filter((a) => a.dogFriendly === "yes");
    } else if (selectedDogMode === "without-dog") {
      result = result.filter((a) => a.dogFriendly === "no" || a.dogFriendly === "partial");
    }

    // Filter by activity type
    if (selectedActivityTypes.length > 0) {
      result = result.filter((a) => selectedActivityTypes.includes(a.type as ActivityType));
    }

    // Filter by distance category
    if (selectedDistanceCategory !== "all") {
      result = result.filter((a) => {
        const category = getDistanceCategory(a.distanceFromHuskissonKm);
        return category === selectedDistanceCategory;
      });
    }

    return result;
  }, [typedActivities, selectedDogMode, selectedActivityTypes, selectedDistanceCategory]);

  // For mixed mode, separate into dog-friendly and non-dog-friendly
  const dogFriendlyActivities = useMemo(() => {
    if (selectedDogMode !== "mixed") return [];
    return filteredActivities.filter((a) => a.dogFriendly === "yes");
  }, [filteredActivities, selectedDogMode]);

  const nonDogActivities = useMemo(() => {
    if (selectedDogMode !== "mixed") return [];
    return filteredActivities.filter((a) => a.dogFriendly !== "yes");
  }, [filteredActivities, selectedDogMode]);

  const toggleActivityType = (type: ActivityType) => {
    setSelectedActivityTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedActivityTypes([]);
    setSelectedDistanceCategory("all");
  };

  const hasActiveFilters = selectedActivityTypes.length > 0 || selectedDistanceCategory !== "all";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(217, 119, 6, 0.85) 0%, rgba(220, 38, 38, 0.85) 100%),
            url('/Rainbow Collingwood Beach.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Pet-Friendly Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Dog Friendly Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Plan your day around your dog — from coastal walks to rest stops and longer adventure days.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Plan Your Day</h2>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Clear filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dog Mode Toggle */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🐾</span> Dog Mode
              </h3>
              <div className="space-y-2">
                {dogModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedDogMode(mode.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDogMode === mode.id
                        ? "bg-amber-100 text-amber-700 border border-amber-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{mode.icon}</span>
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Type Filter */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🎯</span> Activity Type
              </h3>
              <div className="space-y-2">
                {activityTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleActivityType(type)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedActivityTypes.includes(type)
                        ? getActivityBadge(type).className
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {getActivityBadge(type).text}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Filter */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📍</span> Distance from Huskisson
              </h3>
              <div className="space-y-2">
                {distanceCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() =>
                      setSelectedDistanceCategory(
                        selectedDistanceCategory === category.value ? "all" : category.value
                      )
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDistanceCategory === category.value
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-semibold">{category.label}</span>
                    <span className="text-xs ml-2 opacity-70">{category.range}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredActivities.length}</span> activities
              {hasActiveFilters && (
                <span className="text-sm text-gray-500 ml-2">(filtered from {typedActivities.length} total)</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {selectedDogMode === "mixed" ? (
            <>
              {/* Dog Friendly Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🐶</span>
                  Dog Friendly Activities
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({dogFriendlyActivities.length} options)
                  </span>
                </h2>
                {dogFriendlyActivities.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No dog-friendly activities found for these filters.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dogFriendlyActivities.map((activity) => {
                      const badge = getDogFriendlyBadge(activity.dogFriendly);
                      const typeBadge = getActivityBadge(activity.type);
                      return (
                        <div
                          key={activity.id}
                          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                              {badge.text}
                            </span>
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${typeBadge.className}`}>
                              {typeBadge.text}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>📍</span>
                            <span>{formatDistance(activity.distanceFromHuskissonKm)}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Non-Dog Friendly Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🚫</span>
                  Leave Dog Behind
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({nonDogActivities.length} options)
                  </span>
                </h2>
                {nonDogActivities.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No activities requiring leaving dog behind.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nonDogActivities.map((activity) => {
                      const badge = getDogFriendlyBadge(activity.dogFriendly);
                      const typeBadge = getActivityBadge(activity.type);
                      return (
                        <div
                          key={activity.id}
                          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                              {badge.text}
                            </span>
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${typeBadge.className}`}>
                              {typeBadge.text}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>📍</span>
                            <span>{formatDistance(activity.distanceFromHuskissonKm)}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => {
                const badge = getDogFriendlyBadge(activity.dogFriendly);
                const typeBadge = getActivityBadge(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${badge.className}`}>
                        {badge.text}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${typeBadge.className}`}>
                        {typeBadge.text}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>📍</span>
                      <span>{formatDistance(activity.distanceFromHuskissonKm)}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🐕</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Explore with Your Best Friend</h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            Whether you're traveling with your dog or planning activities that require leaving them behind,
            Jervis Bay offers options for every situation. Use the filters above to plan your perfect day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-white text-amber-700 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
            <Link
              href="/best-beaches"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Explore Beaches
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-10 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay adventure?</p>
          <p className="text-sm text-gray-500">Check out our other guides for more things to do in the region.</p>
        </div>
      </section>
    </main>
  );
}