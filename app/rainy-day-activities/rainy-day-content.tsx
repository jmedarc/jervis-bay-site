"use client";

import { useState } from "react";
import Link from "next/link";

type WeatherMode = "no-rain" | "light-rain" | "heavy-rain" | "storm";

const weatherModes: {
  id: WeatherMode;
  label: string;
  icon: string;
  description: string;
  color: string;
}[] = [
  {
    id: "no-rain",
    label: "No Rain",
    icon: "☀️",
    description: "Normal Conditions",
    color: "from-amber-400 to-orange-400",
  },
  {
    id: "light-rain",
    label: "Light Rain",
    icon: "🌦",
    description: "Jacket Weather",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "heavy-rain",
    label: "Heavy Rain",
    icon: "🌧",
    description: "Storm Weather",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "storm",
    label: "Storm",
    icon: "⛈",
    description: "Full Storm",
    color: "from-gray-600 to-gray-800",
  },
];

export default function RainyDayContent() {
  const [selectedMode, setSelectedMode] = useState<WeatherMode>("light-rain");

  const renderContent = () => {
    switch (selectedMode) {
      case "no-rain":
        return (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">☀️</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    No Rain / Normal Conditions
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When the weather is clear or between showers, Jervis Bay offers some of its best
                  experiences without the crowds.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🚗</span> Coastal Drives and Scenic Lookouts
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Explore the coastline at your own pace, stopping at lookouts for dramatic ocean
                  views. With fewer people around during unsettled weather, you'll often have
                  these spots almost to yourself.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🚶</span> Short Walks Between Locations
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  When the weather is clear, short coastal walks connect beaches and lookouts,
                  offering fresh air and exercise without committing to a full day outdoors.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💡</span> Local Tip
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Rain in Jervis Bay is usually temporary. Breaks appear between weather systems,
                  so stay flexible and make the most of the clear periods.
                </p>
              </div>
            </div>
          </section>
        );

      case "light-rain":
        return (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">🌦</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Light Rain (Jacket Weather)
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Passing showers, moody skies, and bursts of rain between calm periods — this is
                  the most common "rainy day" in Jervis Bay.
                </p>
              </div>

              {/* Image: Rainbow - breaks in weather context */}
              <div className="mb-10">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/Rainbow Collingwood Beach.jpg"
                    alt="Rainbow over Collingwood Beach after rain clears"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center mt-2 italic">
                  Dramatic skies and rainbows often appear as storms clear
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  This is the most common "rainy day" in Jervis Bay — not a full washout,
                  but passing showers, moody skies, and bursts of rain between calm periods. Locals
                  rarely cancel the day completely. Instead, they slow things down, use indoor
                  spots to reset, and then head back out when the weather clears. The goal here
                  isn't to stay dry the whole time — it's to stay flexible.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🌊</span> Coastal Drive + Quick Lookouts
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  One of the best light-rain options is simply driving the coastline and jumping
                  out at lookouts when the weather breaks. In wet weather, the ocean looks darker,
                  the cliffs feel more dramatic, and there are far fewer people around. It's a
                  completely different version of Jervis Bay compared to sunny beach days. The key
                  is short stops — not long plans.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🌿</span> Short Walks Between Showers
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If the rain is light or patchy, short coastal walks can actually be better than
                  expected. A rain jacket is usually enough to stay comfortable, and the bonus is
                  you'll often have the tracks almost entirely to yourself. It's less
                  about destination walking and more about timing your movement between showers.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>☕</span> Reset Stops (Warm Up, Wait It Out)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Between bursts of rain, the smartest approach is to pause somewhere warm and wait
                  for the next break in weather. This is where places like breweries and pubs come
                  into play — not as "the activity", but as a base to reset the day.
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 md:p-8 mb-8 border border-blue-100">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <span>🌦</span> Local Tip: Don't Commit to the Weather
                  </h4>
                  <p className="text-blue-800 leading-relaxed">
                    One thing visitors often get wrong is treating rain as a full-day shutdown. In
                    reality, bad weather here usually comes in waves: heavy shower, break in the
                    weather, another shower. If you're flexible, you can still fit in some of
                    the best views of the day during those gaps. In fact, some of the most
                    memorable moments in Jervis Bay happen right after the rain clears — empty
                    lookouts, dramatic skies, and that fresh coastal air. The trick is simple:
                    don't rush the day, and don't wait for perfect weather.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "heavy-rain":
        return (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">🌧</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Heavy Rain / Storm Conditions
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Wind, driving rain, and conditions where the ocean looks wild rather than
                  inviting.
                </p>
              </div>

              {/* Image: Storm waves */}
              <div className="mb-10">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/Large Collingwood Beach Waves.jpg"
                    alt="Powerful waves at Collingwood Beach during storm conditions"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center mt-2 italic">
                  Powerful waves and dramatic coastal conditions during heavy rain
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Heavy rain days in Jervis Bay are usually the "proper weather days" —
                  wind, driving rain, and conditions where the ocean looks wild rather than
                  inviting. On days like this, the goal isn't to explore outdoors for long
                  periods. Instead, it's about finding a few good places to sit, eat, and
                  watch the storm roll through, then heading out briefly if there's a break in
                  the weather.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔥</span> Flaming Galah Brewery
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Flaming Galah Brewery is one of the best places to settle in during heavy
                  rain. With a warm fire, good food, and a relaxed indoor space, it's the kind
                  of spot where you can sit for hours while the weather does its thing outside. It
                  works especially well as a "base for the day" — somewhere you can return
                  to between short outings.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🍻</span> Huskisson Pub
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Huskisson Pub is another strong option for storm days. It's comfortable,
                  easygoing, and perfect for watching the weather roll across the bay while staying
                  dry. On heavy rain days, it often becomes a natural gathering point for both
                  locals and visitors.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🌊</span> Storm Watching Between Showers
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Even on heavy rain days, there are often short breaks in the weather — and this
                  is where Jervis Bay becomes surprisingly special. When the rain eases off, even
                  briefly, the coastline can look incredible: mist over the water, empty beaches,
                  powerful waves and dark skies. These moments are usually short, but they're
                  often the most memorable part of a rainy day. The key is not planning long
                  activities — just being ready to step outside when the weather opens up.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎬</span> Cinema in Huskisson (Full Reset Option)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If the weather turns into full storm conditions with strong wind and consistent
                  rain, the cinema becomes the easiest way to completely pause the day. It's
                  simple, low effort, and a good way to reset before heading back to food, drinks,
                  or waiting out the weather again.
                </p>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8 border border-indigo-100">
                  <h4 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <span>🌧</span> Local Tip: Storm Days Aren't Lost Days
                  </h4>
                  <p className="text-indigo-800 leading-relaxed">
                    Heavy rain looks like a write-off at first, but in Jervis Bay it usually comes
                    in cycles. Instead of thinking of it as a full day indoors, locals tend to
                    treat it like: wait for the storm, enjoy a warm stop, jump on the break,
                    repeat. Some of the most atmospheric views of the bay happen during or just
                    after heavy rain — when the coastline is empty and the weather is still
                    dramatic but clearing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "storm":
        return (
          <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-4xl">⛈</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Full Storm Conditions
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                  Strong winds, consistent rain, and severe weather — time to hunker down.
                </p>
              </div>

              {/* Image: Lightning storm */}
              <div className="mb-10">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/Bad-Storm-Lightning-Jervis-Bay.jpg"
                    alt="Lightning storm over Jervis Bay"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 text-center mt-2 italic">
                  Dramatic lightning storms can occur during severe weather
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  When full storm conditions hit with strong wind and consistent rain, it's
                  time to focus on indoor comfort and safety. These conditions call for a complete
                  reset of your plans.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎬</span> Cinema in Huskisson
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The cinema becomes the easiest way to completely pause the day during severe
                  storm conditions. It's simple, low effort, and a good way to reset before
                  heading back to food, drinks, or waiting out the weather again.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔥</span> Flaming Galah Brewery
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With a warm fire, good food, and a relaxed indoor space, the Flaming Galah
                  Brewery is the perfect place to settle in for hours while the storm rages
                  outside. Use it as your base — somewhere to return to between any brief outings.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🍻</span> Huskisson Pub
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Comfortable, easygoing, and perfect for watching the storm roll across the bay
                  while staying dry. During severe weather, it becomes a natural gathering point
                  for both locals and visitors seeking shelter and good company.
                </p>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 mb-8 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⛈</span> Local Tip: Ride Out the Storm
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Even in full storm conditions, the weather in Jervis Bay tends to move in
                    cycles. Stay patient, enjoy the indoor comforts available, and wait for a break
                    in the weather. Some of the most dramatic and memorable coastal scenes happen
                    just as the worst of the storm begins to clear — when the skies start to open
                    and the coastline is completely empty.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Section with Weather Slider */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(79, 70, 229, 0.9) 100%),
            url('/Beautiful-Double-Rainbow-Jervis-Bay.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Weather-Proof Your Trip
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Rainy Day Activities
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Don't let rain ruin your Jervis Bay trip. Discover what to do in any weather.
          </p>

          {/* Weather Decision Slider */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              How bad is it raining right now?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {weatherModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    selectedMode === mode.id
                      ? `bg-gradient-to-br ${mode.color} shadow-lg scale-105`
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <div className="text-3xl mb-2">{mode.icon}</div>
                  <div
                    className={`font-semibold text-sm ${
                      selectedMode === mode.id ? "text-white" : "text-white"
                    }`}
                  >
                    {mode.label}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      selectedMode === mode.id
                        ? "text-white/90"
                        : "text-white/70"
                    }`}
                  >
                    {mode.description}
                  </div>
                  {selectedMode === mode.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
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

      {/* Dynamic Content Section */}
      {renderContent()}

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🌈</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Rain Doesn't Mean Game Over
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            In Jervis Bay, rainy days can be just as memorable as sunny ones. The key is staying
            flexible, knowing where to find shelter, and being ready to step outside when the
            weather gives you a break. Some of the most dramatic skies, empty beaches, and
            atmospheric moments happen when the rain clears.
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
          <p className="text-gray-400 mb-2">Planning your Jervis Bay trip?</p>
          <p className="text-sm text-gray-500">
            Check out our other guides for things to do in any weather.
          </p>
        </div>
      </section>
    </>
  );
}