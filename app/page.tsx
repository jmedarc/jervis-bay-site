import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(5, 150, 105, 0.85) 100%),
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
            Jervis Bay, Australia
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Things To Do Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Local guides to beaches, walks, hidden gems and free activities around Jervis Bay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-things-to-do"
              className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Exploring
            </Link>
            <Link
              href="/hidden-gems"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Hidden Gems
            </Link>
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

      {/* Explore Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Jervis Bay
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover the best of Jervis Bay with our local guides. From pristine beaches to hidden trails, find your perfect adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/free-things-to-do"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  🆓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Free Things To Do
                  </h3>
                  <p className="text-sm text-gray-500">No-cost activities and attractions</p>
                </div>
              </div>
            </Link>

            <Link
              href="/hidden-gems"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                  💎
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    Hidden Gems
                  </h3>
                  <p className="text-sm text-gray-500">Secret spots locals love</p>
                </div>
              </div>
            </Link>

            <Link
              href="/rainy-day-activities"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  🌧
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    Rainy Day Activities
                  </h3>
                  <p className="text-sm text-gray-500">Indoor fun for wet weather</p>
                </div>
              </div>
            </Link>

            <Link
              href="/best-walks"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-amber-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xl font-bold">
                  🥾
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    Best Walks
                  </h3>
                  <p className="text-sm text-gray-500">Trails, runs & bike rides</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dog-friendly"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl font-bold">
                  🐕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    Dog Friendly Guide
                  </h3>
                  <p className="text-sm text-gray-500">Pet-friendly spots</p>
                </div>
              </div>
            </Link>

            <Link
              href="/best-beaches"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-cyan-300 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-xl font-bold">
                  🏖
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                    Best Beaches
                  </h3>
                  <p className="text-sm text-gray-500">Pristine shores & swimming spots</p>
                </div>
              </div>
            </Link>

            <Link
              href="/weekend-itinerary"
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 md:col-span-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  🗓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Weekend Itinerary
                  </h3>
                  <p className="text-sm text-gray-500">Perfect 2-3 day plans</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="/Rainbow Collingwood Beach.jpg"
          alt="Rainbow over Jervis Bay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Dramatic Skies Over Jervis Bay</h2>
          <p className="text-lg opacity-90">Some of the most memorable moments happen right after the rain clears</p>
        </div>
      </section>

      {/* Footer */}
      <section className="py-10 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay adventure?</p>
          <p className="text-sm text-gray-500">
            Local guides to help you make the most of your visit.
          </p>
        </div>
      </section>
    </main>
  );
}