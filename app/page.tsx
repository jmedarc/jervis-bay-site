import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Premium Image-First Design */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/Crystal_Clear_Hyams_Beach_White_Sand - Cropped.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Gradient Overlay - Reduced opacity for more visible photo */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(2, 132, 199, 0.65) 0%,
              rgba(20, 184, 166, 0.55) 40%,
              rgba(6, 182, 212, 0.5) 100%
            )`,
          }}
        />

        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Tag Badge */}
          <span className="inline-block px-5 py-2 mb-8 text-sm font-semibold tracking-widest uppercase bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white shadow-lg">
            Jervis Bay, NSW, Australia
          </span>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white tracking-tight">
            Discover<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-white via-white to-white/80">Jervis Bay</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 text-white/90 font-light leading-relaxed">
            Your local guide to pristine beaches, scenic walks, hidden gems, and unforgettable coastal experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/free-things-to-do"
              className="group px-8 py-4 bg-white text-primary-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
            >
              Start Exploring
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/hidden-gems"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/20 hover:border-white/60 transition-all duration-300 flex items-center gap-2"
            >
              <span>💎</span>
              Hidden Gems
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Category Cards Section - Image-First Premium Design */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Explore Jervis Bay
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From iconic white sand beaches to secret local spots, discover the experiences that make Jervis Bay truly special.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Row 1, Card 1: Free Things To Do */}
            <Link
              href="/free-things-to-do"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-primary-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Crystal_Clear_Hyams_Beach_White_Sand.jpg"
                    alt="Free things to do in Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Budget Friendly
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Free Things To Do</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Discover pristine beaches, scenic walks, and natural attractions that won't cost a cent.
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700">
                    Explore now
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 1, Card 2: Iconic Experiences */}
            <Link
              href="/iconic-jervis-bay-experiences"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Whale Watching Boat Tour.jpg"
                    alt="Iconic Jervis Bay experiences"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Must Do
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Iconic Experiences</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Whale watching, snorkelling with dolphins, and other unforgettable adventures.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                    Book experiences
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 1, Card 3: Best Beaches */}
            <Link
              href="/best-beaches"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-cyan-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Flat Water Beautiful Beach.jpg"
                    alt="Best beaches in Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Condition Guide
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Best Beaches</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Find the perfect beach for today's conditions with our smart recommendation system.
                  </p>
                  <div className="flex items-center text-cyan-600 font-semibold text-sm group-hover:text-cyan-700">
                    Check conditions
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 2, Card 1: Best Walks */}
            <Link
              href="/best-walks"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-amber-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Recommended Np Walk.jpg"
                    alt="Best walks in Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    All Levels
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Best Walks & Runs</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Coastal trails, national park walks, and running routes for every fitness level.
                  </p>
                  <div className="flex items-center text-amber-600 font-semibold text-sm group-hover:text-amber-700">
                    Find your trail
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 2, Card 2: Rainy Day Activities */}
            <Link
              href="/rainy-day-activities"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Bad-Storm-Lightning-Jervis-Bay.jpg"
                    alt="Rainy day activities in Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Weather Proof
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Rainy Day Ideas</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Indoor activities, cafes, museums, and covered attractions for wet weather days.
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:text-indigo-700">
                    Stay dry
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 2, Card 3: Dog Friendly Guide */}
            <Link
              href="/dog-friendly"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-green-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Steamers Beach View from top.jpg"
                    alt="Dog friendly places in Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Pet Friendly
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Dog Friendly Guide</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Beaches, parks, cafes, and accommodations where your furry friend is welcome.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold text-sm group-hover:text-green-700">
                    Explore with your pup
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 3, Card 1: Weekend Itinerary (spans 2 cols) */}
            <Link
              href="/weekend-itinerary"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-500 hover:-translate-y-2 lg:col-span-2"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/2 h-48 md:h-auto overflow-hidden">
                  <img
                    src="/Collingwood_Beach_Beautiful_Sunset.jpg"
                    alt="Weekend itinerary for Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-center">
                  <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full uppercase tracking-wide self-start">
                    Complete Guide
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-3">Perfect Weekend Itinerary</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Make the most of 2-3 days with our carefully crafted itinerary covering the best of Jervis Bay's highlights.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    Plan your trip
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Row 3, Card 2: Hidden Gems */}
            <Link
              href="/hidden-gems"
              className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/Gosang Tunnel.jpeg"
                    alt="Hidden gems in Jervis Bay"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Local Secrets
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-3">Hidden Gems</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Secret spots and lesser-known locations that locals love to keep to themselves.
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700">
                    Discover more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Image Section - Full Bleed */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="/Rainbow Collingwood Beach.jpg"
          alt="Dramatic rainbow over Jervis Bay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Nature's Magic
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Dramatic Skies Over Jervis Bay</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Some of the most memorable moments happen right after the rain clears, when rainbows paint the sky over these pristine waters.
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-3xl">🌊</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Things To Do Jervis Bay</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Local guides to help you make the most of your visit to one of Australia's most beautiful coastal destinations.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <span className="text-gray-500 text-sm">Made with ❤️ for Jervis Bay visitors</span>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Things To Do Jervis Bay. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}