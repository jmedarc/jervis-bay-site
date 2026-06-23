"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import activities from "../../src/data/activities";

interface ActivityData {
  id: string;
  title: string;
  type: string;
  description: string;
  images: string[];
  tags: string[];
  distanceFromHuskissonKm: number | null;
  costCategory?: string;
  iconicCategory?: string[];
  ranking?: number;
  timeRequiredHours?: number;
}

type IconicCategory = "wildlife" | "paddling" | "marine" | "all";

const iconicCategories: { id: IconicCategory; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🌊" },
  { id: "wildlife", label: "Wildlife", icon: "🐋" },
  { id: "paddling", label: "Paddling", icon: "🛶" },
  { id: "marine", label: "Marine", icon: "🐠" },
];

function formatDistance(km: number | null): string {
  if (km === null) return "Location varies";
  if (km === 0) return "In Huskisson";
  if (km <= 10) return `~${km} km from Huskisson`;
  if (km <= 30) return `~${Math.round(km / 5) * 5} min drive`;
  if (km <= 100) return `~${Math.round(km / 60)} hr drive`;
  return `~${Math.round(km / 60)}–${Math.round(km / 45)} hr drive`;
}

export default function IconicJervisBayExperiencesContent() {
  const [selectedCategory, setSelectedCategory] = useState<IconicCategory>("all");
  const typedActivities = activities as ActivityData[];

  // Filter to only iconic experiences
  const iconicActivities = typedActivities.filter(
    (a) => a.type === "iconic"
  );

  // Filter by selected category and sort by ranking
  const filteredActivities = useMemo(() => {
    let result = iconicActivities;
    if (selectedCategory !== "all") {
      result = result.filter((activity) =>
        activity.iconicCategory && activity.iconicCategory.includes(selectedCategory)
      );
    }
    // Sort by ranking descending (higher ranking = better)
    return [...result].sort((a, b) => (b.ranking || 0) - (a.ranking || 0));
  }, [iconicActivities, selectedCategory]);

  const hasActiveFilters = selectedCategory !== "all";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(20, 184, 166, 0.85) 100%),
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
            Must-Do Experiences
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Iconic Jervis Bay Experiences
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Some experiences define a trip to Jervis Bay. Whether you're paddling across crystal-clear waters, snorkelling vibrant marine habitats or watching migrating whales pass the coastline, these are the activities visitors remember long after they leave.
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
            <h2 className="text-2xl font-bold text-gray-900">Find Your Adventure</h2>
            {hasActiveFilters && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Show all experiences
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {iconicCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                }`}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredActivities.length}</span> iconic experiences
              {hasActiveFilters && (
                <span className="text-sm text-gray-500 ml-2">
                  (filtered from {iconicActivities.length} total)
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🌊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No experiences found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
                >
                  {activity.images.length > 0 ? (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img
                        src={activity.images[0]}
                        alt={activity.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 h-40 flex items-center justify-center">
                      <span className="text-4xl">🌊</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      Iconic
                    </span>
                    {activity.costCategory && (
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        activity.costCategory === "free"
                          ? "bg-green-100 text-green-700"
                          : activity.costCategory === "budget"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {activity.costCategory === "free" ? "Free" : activity.costCategory === "budget" ? "Budget" : "Paid"}
                      </span>
                    )}
                    {activity.iconicCategory && activity.iconicCategory.slice(0, 2).map((cat) => {
                      const category = iconicCategories.find((c) => c.id === cat);
                      return category ? (
                        <span key={cat} className="px-2 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {category.icon} {category.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                  {activity.timeRequiredHours && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>⏱️</span>
                      <span>{activity.timeRequiredHours}–{activity.timeRequiredHours + 1} hours</span>
                    </div>
                  )}
                  {activity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {activity.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🌊</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Create Unforgettable Memories
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            These iconic experiences showcase the very best of Jervis Bay — from swimming with gentle giants to exploring underwater worlds and paddling through pristine waters. Each activity offers a unique way to connect with this remarkable coastal paradise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
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