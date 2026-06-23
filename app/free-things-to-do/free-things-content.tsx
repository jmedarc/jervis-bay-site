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
  freeCategory?: string[];
  ranking?: number;
}

type FreeCategory = "beaches" | "walks-hikes" | "lookouts" | "wildlife-nature" | "swimming" | "photography" | "historical";

const freeCategories: { id: FreeCategory; label: string; icon: string }[] = [
  { id: "beaches", label: "Beaches", icon: "🏖️" },
  { id: "walks-hikes", label: "Walks & Hikes", icon: "🥾" },
  { id: "lookouts", label: "Lookouts", icon: "🔭" },
  { id: "wildlife-nature", label: "Wildlife & Nature", icon: "🐬" },
  { id: "swimming", label: "Swimming & Rock Pools", icon: "🏊" },
  { id: "photography", label: "Photography Spots", icon: "📸" },
  { id: "historical", label: "Historical & Cultural", icon: "🏛️" },
];

function formatDistance(km: number | null): string {
  if (km === null) return "Location varies";
  if (km === 0) return "In Huskisson";
  if (km <= 10) return `~${km} km from Huskisson`;
  if (km <= 30) return `~${Math.round(km / 5) * 5} min drive`;
  if (km <= 100) return `~${Math.round(km / 60)} hr drive`;
  return `~${Math.round(km / 60)}–${Math.round(km / 45)} hr drive`;
}

export default function FreeThingsContent() {
  const [selectedCategories, setSelectedCategories] = useState<FreeCategory[]>([]);
  const typedActivities = activities as ActivityData[];

  // Filter to only free activities
  const freeActivities = typedActivities.filter(
    (a) => a.costCategory === "free"
  );

  // Filter by selected categories and sort by ranking (descending)
  const filteredActivities = useMemo(() => {
    let result = freeActivities;
    if (selectedCategories.length > 0) {
      result = result.filter((activity) =>
        activity.freeCategory && selectedCategories.some((cat) => activity.freeCategory?.includes(cat))
      );
    }
    // Sort by ranking descending (higher ranking = better)
    return [...result].sort((a, b) => (b.ranking || 0) - (a.ranking || 0));
  }, [freeActivities, selectedCategories]);

  const toggleCategory = (category: FreeCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Premium Design */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/Crystal_Clear_Hyams_Beach_White_Sand.jpg')`,
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
              rgba(37, 99, 235, 0.85) 0%,
              rgba(20, 184, 166, 0.82) 50%,
              rgba(6, 182, 212, 0.8) 100%
            )`,
          }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <span className="inline-block px-5 py-2 mb-6 text-sm font-semibold tracking-widest uppercase bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white shadow-lg">
            Budget-Friendly Guide
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white tracking-tight">
            Free Things To Do<br className="hidden md:block" /> in Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 font-light leading-relaxed">
            Some of the best experiences in Jervis Bay don't cost a cent. From white sand beaches and scenic walks to hidden lookouts and wildlife encounters.
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

      {/* Filter Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Explore Free Activities</h2>
              <p className="text-gray-500 mt-1">Filter by category to find what interests you</p>
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

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {freeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategories.includes(category.id)
                    ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 scale-105"
                    : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-700 shadow-sm border border-gray-200 hover:border-primary-300"
                }`}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-500 text-sm">Showing</span>
              <span className="font-bold text-gray-900">{filteredActivities.length}</span>
              <span className="text-gray-500 text-sm">free activities</span>
              {hasActiveFilters && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400 text-sm">from {freeActivities.length} total</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Premium Cards */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
              <div className="text-6xl mb-6">🆓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No activities found</h3>
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
              {filteredActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {activity.images.length > 0 ? (
                      <img
                        src={activity.images[0]}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        <span className="text-5xl">🆓</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                        Free
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {activity.type && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                          {activity.type}
                        </span>
                      )}
                      {activity.freeCategory && activity.freeCategory.slice(0, 2).map((cat) => {
                        const category = freeCategories.find((c) => c.id === cat);
                        return category ? (
                          <span key={cat} className="px-2 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                            {category.label}
                          </span>
                        ) : null;
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{activity.title}</h3>

                    {/* Distance */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{formatDistance(activity.distanceFromHuskissonKm)}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{activity.description}</p>

                    {/* Tags */}
                    {activity.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
                        {activity.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-5xl">🆓</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">More Free Experiences Await</h2>
          <div className="w-20 h-1.5 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed text-white/90 mb-10">
            Jervis Bay offers countless free activities beyond these highlights. From coastal walks to pristine beaches, many of the best experiences here don't cost a thing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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

      {/* Footer */}
      <section className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay trip?</p>
          <p className="text-sm text-gray-500">Check out our other guides for more things to do in the region.</p>
        </div>
      </section>
    </main>
  );
}