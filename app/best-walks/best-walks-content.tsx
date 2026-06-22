"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import activities from "../../src/data/activities";

type ActivityType = "walk" | "run" | "hike" | "bike";
type Intensity = "easy" | "moderate" | "hard";
type Surface = "paved" | "trail" | "mixed";
type DistanceCategory = "local" | "nearby" | "day-trip" | "regional" | "adventure";

interface WalkRoute {
  id: string;
  name: string;
  distanceFromHuskisson: string;
  distanceCategory: DistanceCategory;
  activities: ActivityType[];
  intensity: Intensity;
  surface: Surface;
  distance: string;
  description: string;
  image?: string;
}

interface ActivityData {
  id: string;
  title: string;
  type: string;
  intensity: string | null;
  surface: string | null;
  distanceFromHuskissonKm: number | null;
  activityDistanceKm: string | null;
  description: string;
  images: string[];
}

// Convert activities data to walks format
const walkActivities = (activities as ActivityData[]).filter((a) =>
  ["walk", "run", "hike", "bike"].includes(a.type)
);

const routes: WalkRoute[] = walkActivities.map((activity) => {
  let distanceFromHuskisson = "0 km";
  const km = activity.distanceFromHuskissonKm;
  if (km === 0) {
    distanceFromHuskisson = "0 km";
  } else if (km && km <= 10) {
    distanceFromHuskisson = `~${km} km`;
  } else if (km && km <= 30) {
    distanceFromHuskisson = `~${Math.round(km / 5) * 5} min drive`;
  } else if (km && km <= 100) {
    distanceFromHuskisson = `~${Math.round(km / 60)}–${Math.round(km / 40)} hr drive`;
  } else if (km) {
    distanceFromHuskisson = `~${Math.round(km / 60)}–${Math.round(km / 45)} hr drive`;
  }

  let distanceCategory: DistanceCategory = "local";
  if (km && km <= 5) distanceCategory = "local";
  else if (km && km <= 15) distanceCategory = "nearby";
  else if (km && km <= 50) distanceCategory = "day-trip";
  else if (km && km <= 100) distanceCategory = "regional";
  else if (km && km > 100) distanceCategory = "adventure";

  return {
    id: activity.id,
    name: activity.title,
    distanceFromHuskisson,
    distanceCategory,
    activities: [activity.type as ActivityType],
    intensity: (activity.intensity as Intensity) || "easy",
    surface: (activity.surface as Surface) || "mixed",
    distance: activity.activityDistanceKm || "",
    description: activity.description,
    image: activity.images && activity.images.length > 0 ? activity.images[0] : undefined,
  };
});

const activityTypes: ActivityType[] = ["walk", "run", "hike", "bike"];
const intensities: Intensity[] = ["easy", "moderate", "hard"];
const surfaces: Surface[] = ["paved", "trail", "mixed"];

const distanceCategories: { value: DistanceCategory; label: string; range: string }[] = [
  { value: "local", label: "Local", range: "0–5 km" },
  { value: "nearby", label: "Nearby", range: "5–15 km" },
  { value: "day-trip", label: "Day trips", range: "15–50 km" },
  { value: "regional", label: "Regional", range: "50–100 km" },
  { value: "adventure", label: "Big adventures", range: "100km+" },
];

function getIntensityColor(intensity: Intensity) {
  switch (intensity) {
    case "easy":
      return "bg-green-100 text-green-700 border-green-200";
    case "moderate":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "hard":
      return "bg-red-100 text-red-700 border-red-200";
  }
}

function getActivityColor(activity: ActivityType) {
  switch (activity) {
    case "walk":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "run":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "hike":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "bike":
      return "bg-teal-100 text-teal-700 border-teal-200";
  }
}

export default function BestWalksContent() {
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>([]);
  const [selectedIntensities, setSelectedIntensities] = useState<Intensity[]>([]);
  const [selectedSurfaces, setSelectedSurfaces] = useState<Surface[]>([]);
  const [selectedDistanceCategory, setSelectedDistanceCategory] = useState<DistanceCategory | "all">("all");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxImage({ src, alt });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  }, []);

  // Handle escape key to close lightbox
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && lightboxImage) {
          closeLightbox();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    });
  }

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      if (selectedActivities.length > 0 && !selectedActivities.some((a) => route.activities.includes(a))) {
        return false;
      }
      if (selectedIntensities.length > 0 && !selectedIntensities.includes(route.intensity)) {
        return false;
      }
      if (selectedSurfaces.length > 0 && !selectedSurfaces.includes(route.surface)) {
        return false;
      }
      if (selectedDistanceCategory !== "all" && route.distanceCategory !== selectedDistanceCategory) {
        return false;
      }
      return true;
    });
  }, [selectedActivities, selectedIntensities, selectedSurfaces, selectedDistanceCategory]);

  const toggleActivity = (activity: ActivityType) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const toggleIntensity = (intensity: Intensity) => {
    setSelectedIntensities((prev) =>
      prev.includes(intensity) ? prev.filter((i) => i !== intensity) : [...prev, intensity]
    );
  };

  const toggleSurface = (surface: Surface) => {
    setSelectedSurfaces((prev) =>
      prev.includes(surface) ? prev.filter((s) => s !== surface) : [...prev, surface]
    );
  };

  const clearFilters = () => {
    setSelectedActivities([]);
    setSelectedIntensities([]);
    setSelectedSurfaces([]);
    setSelectedDistanceCategory("all");
  };

  const hasActiveFilters =
    selectedActivities.length > 0 ||
    selectedIntensities.length > 0 ||
    selectedSurfaces.length > 0 ||
    selectedDistanceCategory !== "all";

  return (
    <main className="min-h-full">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(5, 150, 105, 0.85) 0%, rgba(37, 99, 235, 0.85) 100%),
            url('/Recommended National Park Longer Walk.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Local Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Best Walks, Runs & Rides
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 font-light opacity-90">
              Around Jervis Bay
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90 leading-relaxed">
            A local guide to coastal walks, running routes, bike rides and hikes — from short
            waterfront paths to full-day adventures.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Find Your Adventure</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Activity Type Filter */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🏃</span> Activity Type
              </h3>
              <div className="space-y-2">
                {activityTypes.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedActivities.includes(activity)
                        ? getActivityColor(activity)
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Filter */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📊</span> Intensity
              </h3>
              <p className="text-xs text-gray-500 mb-3">Based on route distance:</p>
              <div className="space-y-2">
                {intensities.map((intensity) => {
                  const distanceGuide =
                    intensity === "easy"
                      ? "Up to 5 km"
                      : intensity === "moderate"
                      ? "5–15 km"
                      : "15+ km";
                  return (
                    <button
                      key={intensity}
                      onClick={() => toggleIntensity(intensity)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedIntensities.includes(intensity)
                          ? getIntensityColor(intensity)
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-semibold">{intensity}</span>
                      <span className="text-xs ml-2 opacity-70">({distanceGuide})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Surface Type Filter */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🛤️</span> Surface Type
              </h3>
              <div className="space-y-2">
                {surfaces.map((surface) => (
                  <button
                    key={surface}
                    onClick={() => toggleSurface(surface)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSurfaces.includes(surface)
                        ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {surface}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Slider */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📍</span> Distance from Huskisson
              </h3>
              <p className="text-sm text-gray-500 mb-4">How far are you willing to go?</p>
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
              Showing <span className="font-semibold text-gray-900">{filteredRoutes.length}</span> routes
              {hasActiveFilters && (
                <span className="text-sm text-gray-500 ml-2">
                  (filtered from {routes.length} total)
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Content Cards Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {filteredRoutes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No routes found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {route.image && (
                    <div className="relative overflow-hidden">
                      <img
                        src={route.image}
                        alt={route.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => openLightbox(route.image!, route.name)}
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 hover:opacity-100 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-opacity duration-300">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {route.activities.map((activity) => (
                        <span
                          key={activity}
                          className={`px-2 py-1 rounded-md text-xs font-semibold border ${getActivityColor(
                            activity
                          )}`}
                        >
                          {activity}
                        </span>
                      ))}
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold border ${getIntensityColor(
                          route.intensity
                        )}`}
                      >
                        {route.intensity}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{route.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📍</span>
                        <span>{route.distanceFromHuskisson} from Huskisson</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📏</span>
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>🛤️</span>
                        <span>{route.surface}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{route.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🥾</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Get Out and Explore
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            Whether you're after a gentle waterfront stroll, a challenging summit hike, or a
            scenic bike ride, Jervis Bay and the surrounding region offer routes for every level
            and interest. From local paths starting right in Huskisson to full-day adventures
            further afield, there's always a new trail to discover.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
            <Link
              href="/hidden-gems"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Explore Hidden Gems
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-4xl font-light z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[90vh] p-4">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/80 text-center mt-4 text-lg">{lightboxImage.alt}</p>
            <p className="text-white/50 text-center mt-2 text-sm">Click anywhere outside the image or press Escape to close</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <section className="py-10 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay adventure?</p>
          <p className="text-sm text-gray-500">
            Check out our other guides for more things to do in the region.
          </p>
        </div>
      </section>
    </main>
  );
}