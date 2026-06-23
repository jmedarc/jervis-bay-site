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
      {/* Hero Section - Premium Design */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/Recommended National Park Longer Walk.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(5, 150, 105, 0.88) 0%,
              rgba(20, 184, 166, 0.82) 50%,
              rgba(37, 99, 235, 0.8) 100%
            )`,
          }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <span className="inline-block px-5 py-2 mb-6 text-sm font-semibold tracking-widest uppercase bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white shadow-lg">
            Local Guide
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white tracking-tight">
            Best Walks, Runs & Rides<br className="hidden md:block" /> Around Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 font-light leading-relaxed">
            A local guide to coastal walks, running routes, bike rides and hikes — from short waterfront paths to full-day adventures.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Filter Section - Premium Design */}
      <section className="py-12 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Find Your Adventure</h2>
              <p className="text-gray-500 mt-1">Filter by activity type, intensity, and distance</p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        ? getActivityColor(activity) + " shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="capitalize">{activity}</span>
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
                          ? getIntensityColor(intensity) + " shadow-md"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-semibold capitalize">{intensity}</span>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      selectedSurfaces.includes(surface)
                        ? "bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-md"
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
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-md"
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
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-500 text-sm">Showing</span>
              <span className="font-bold text-gray-900">{filteredRoutes.length}</span>
              <span className="text-gray-500 text-sm">routes</span>
              {hasActiveFilters && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400 text-sm">from {routes.length} total</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Cards Section - Premium Design */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {filteredRoutes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No routes found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredRoutes.map((route) => (
                <div
                  key={route.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-amber-200 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {route.image && (
                      <>
                        <img
                          src={route.image}
                          alt={route.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                          onClick={() => openLightbox(route.image!, route.name)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-opacity duration-300">
                            Click to enlarge
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {route.activities.map((activity) => (
                        <span
                          key={activity}
                          className={`px-2 py-0.5 rounded-md text-xs font-semibold border capitalize ${getActivityColor(activity)}`}
                        >
                          {activity}
                        </span>
                      ))}
                      <span
                        className={`px-2 py-0.5 rounded-md text-xs font-semibold border capitalize ${getIntensityColor(route.intensity)}`}
                      >
                        {route.intensity}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{route.name}</h3>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{route.distanceFromHuskisson} from Huskisson</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>🛤️</span>
                        <span className="capitalize">{route.surface}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{route.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-5xl">🥾</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Out and Explore</h2>
          <div className="w-20 h-1.5 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed text-white/90 mb-10">
            Whether you're after a gentle waterfront stroll, a challenging summit hike, or a scenic bike ride, Jervis Bay and the surrounding region offer routes for every level and interest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Back to Home
            </Link>
            <Link
              href="/hidden-gems"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
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
            className="absolute top-6 right-6 text-white/80 hover:text-white text-4xl font-light z-10 transition-colors"
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
      <section className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay adventure?</p>
          <p className="text-sm text-gray-500">Check out our other guides for more things to do in the region.</p>
        </div>
      </section>
    </main>
  );
}