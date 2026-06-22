import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Hidden Gems in Jervis Bay That Most Visitors Miss | Local Secrets",
  description:
    "Discover the secret spots locals love in Jervis Bay. From hidden tunnels to remote beaches and spectacular lighthouse views, explore beyond the tourist hotspots.",
  keywords:
    "Hidden Gems Jervis Bay, secret spots Jervis Bay, Jervis Bay local secrets, Gosangs Tunnel, Steamers Beach, Point Perpendicular, Cape St George Lighthouse",
  openGraph: {
    title: "5 Hidden Gems in Jervis Bay That Most Visitors Miss",
    description:
      "Discover the secret spots locals love in Jervis Bay. Explore beyond Hyams Beach and find your own slice of paradise.",
    type: "article",
  },
};

export default function HiddenGems() {
  const gems = [
    {
      id: "scribbly-gum-track",
      number: 1,
      title: "Scribbly Gum Track & White Sands Walk",
      icon: "🥾",
    },
    {
      id: "gosangs-tunnel",
      number: 2,
      title: "Gosangs Tunnel",
      icon: "🕳️",
    },
    {
      id: "steamers-beach",
      number: 3,
      title: "Steamers Beach",
      icon: "🏖️",
    },
    {
      id: "point-perpendicular",
      number: 4,
      title: "Point Perpendicular Lighthouse",
      icon: "🗼",
    },
    {
      id: "cape-st-george",
      number: 5,
      title: "Cape St George Lighthouse",
      icon: "🌅",
    },
  ];

  return (
    <main className="min-h-full">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(20, 83, 45, 0.85) 100%),
            url('/Crystal_Clear_Hyams_Beach_White_Sand.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Local Secrets Revealed
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            5 Hidden Gems in Jervis Bay
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 font-light opacity-90">
              That Most Visitors Miss
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90 leading-relaxed">
            Everyone knows about Hyams Beach and dolphin cruises. But if you're willing to
            explore a little further, Jervis Bay has some incredible hidden gems that many
            visitors never discover.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#introduction"
              className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discover the Secrets
            </a>
            <a
              href="#table-of-contents"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View All Gems
            </a>
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

      {/* Introduction Section */}
      <section id="introduction" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Beyond the Tourist Trail
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Everyone knows about Hyams Beach, dolphin cruises and the famous white sand beaches.
              But if you're willing to explore a little further, Jervis Bay has some incredible
              hidden gems that many visitors never discover.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              These are five places I regularly recommend to friends and family when they visit.
              Some require a bit of effort to reach, others are hidden in plain sight, but all
              offer something special that most tourists miss.
            </p>
          </div>

          {/* Decorative element */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gray-300"></div>
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
              <div className="h-px w-16 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section
        id="table-of-contents"
        className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Table of Contents
            </h2>
            <p className="text-gray-500">Jump to any hidden gem</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {gems.map((gem, index) => (
                <a
                  key={gem.id}
                  href={`#${gem.id}`}
                  className="flex items-center gap-4 p-4 md:p-5 hover:bg-blue-50/50 transition-colors duration-200 group"
                >
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-full font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-200">
                    {gem.number}
                  </span>
                  <span className="flex-1 text-gray-700 font-medium group-hover:text-blue-700 transition-colors">
                    {gem.title}
                  </span>
                  <span className="text-2xl">{gem.icon}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gem #1: Scribbly Gum Track & White Sands Walk */}
      <section
        id="scribbly-gum-track"
        className="py-20 px-6 bg-white scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-2xl font-bold text-xl shadow-lg">
              1
            </span>
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Coastal Walk
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Scribbly Gum Track & White Sands Walk
              </h2>
            </div>
          </div>

          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/Greenfield_Beach.jpg"
                alt="Scribbly Gum Track and White Sands Walk coastal scenery"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 md:p-8 mb-8 border border-blue-100">
            <p className="text-lg text-blue-900 font-medium italic leading-relaxed">
              If Hyams Beach is on your bucket list, this is the local secret you should know
              first.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              During busy periods, parking at Hyams Beach can become extremely limited and traffic
              can build up throughout the village. The Scribbly Gum Track and White Sands Walk
              offer an alternative way to experience the area while avoiding much of the parking
              frustration.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The walk passes through beautiful coastal bushland and connects several stunning
              beaches along the way. One of the best parts is that you're not limited to Hyams
              Beach itself. Many visitors discover another beach during the walk that they end up
              loving even more, often with far fewer people around.
            </p>
            <p className="text-gray-700 leading-relaxed">
              It's a moderate walk, but the combination of bushland, white sand and
              crystal-clear water makes it one of the most rewarding experiences in Jervis Bay.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🌿</div>
              <h4 className="font-semibold text-gray-900 mb-1">Coastal Bushland</h4>
              <p className="text-sm text-gray-600">Scenic native vegetation</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🏖️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Multiple Beaches</h4>
              <p className="text-sm text-gray-600">Connect stunning beaches</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🚶</div>
              <h4 className="font-semibold text-gray-900 mb-1">Moderate Walk</h4>
              <p className="text-sm text-gray-600">Rewarding experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gem #2: Gosangs Tunnel */}
      <section id="gosangs-tunnel" className="py-20 px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg">
              2
            </span>
            <div>
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">
                Adventure
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Gosangs Tunnel</h2>
            </div>
          </div>

          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/Gosang Tunnel.jpeg"
                alt="Gosangs Tunnel coastal adventure"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 mb-8 border border-purple-100">
            <p className="text-lg text-purple-900 font-medium italic leading-relaxed">
              Gosangs Tunnel is one of the most unique adventures on the South Coast and remains
              surprisingly unknown to many visitors.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The hardest part is actually finding it. Many people walk straight past without
              realising it's there. Fortunately, if you follow the route shown in our guide,
              locating the tunnel is much easier.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The experience itself is not for everyone. Reaching the tunnel involves navigating a
              narrow cave-like passage and areas close to cliff edges. For this reason, it
              isn't particularly suitable for young children and may not appeal to those
              uncomfortable with heights.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For adventurous visitors, however, Gosangs Tunnel offers a memorable experience and
              some incredible coastal scenery.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🔍</div>
              <h4 className="font-semibold text-gray-900 mb-1">Hidden Location</h4>
              <p className="text-sm text-gray-600">Easy to walk past</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">⚠️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Adventure Required</h4>
              <p className="text-sm text-gray-600">Not for everyone</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🌊</div>
              <h4 className="font-semibold text-gray-900 mb-1">Coastal Scenery</h4>
              <p className="text-sm text-gray-600">Incredible views</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gem #3: Steamers Beach */}
      <section id="steamers-beach" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-xl shadow-lg">
              3
            </span>
            <div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Remote Beach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Steamers Beach</h2>
            </div>
          </div>

          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/Steamers Beach View from top.jpg"
                alt="Steamers Beach remote coastline view"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8 border border-amber-100">
            <p className="text-lg text-amber-900 font-medium italic leading-relaxed">
              Steamers Beach is not exactly hidden, but the effort required to reach it keeps
              visitor numbers lower than many of Jervis Bay's more accessible beaches.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Getting there involves travelling along a dirt road, completing a decent walk and
              tackling a long staircase before finally reaching the sand.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The reward is a spectacular beach that feels far more remote than its location
              inside Booderee National Park would suggest. The dramatic coastline, powerful ocean
              views and sense of isolation make it feel like a true escape from the crowds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you don't mind a little effort, Steamers Beach is one of the most impressive
              beaches in the region.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🚙</div>
              <h4 className="font-semibold text-gray-900 mb-1">Dirt Road Access</h4>
              <p className="text-sm text-gray-600">Off the beaten path</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🪜</div>
              <h4 className="font-semibold text-gray-900 mb-1">Long Staircase</h4>
              <p className="text-sm text-gray-600">Worth the climb</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🏞️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Dramatic Coastline</h4>
              <p className="text-sm text-gray-600">Powerful ocean views</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gem #4: Point Perpendicular Lighthouse */}
      <section
        id="point-perpendicular"
        className="py-20 px-6 bg-gray-50 scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-2xl font-bold text-xl shadow-lg">
              4
            </span>
            <div>
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                Spectacular Views
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Point Perpendicular Lighthouse
              </h2>
            </div>
          </div>

          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/Point-Perpendicular-Lighthouse.jpg"
                alt="Point Perpendicular Lighthouse dramatic coastal cliffs"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border border-indigo-100">
            <p className="text-lg text-indigo-900 font-medium italic leading-relaxed">
              At first glance, Point Perpendicular Lighthouse might seem too obvious to appear on a
              hidden gems list.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              However, many visitors don't realise that access is often restricted because the
              lighthouse is located within a naval range. The area is generally open on weekends
              and during school holidays, but planning ahead is essential.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Those lucky enough to visit are rewarded with some of the most spectacular coastal
              views in New South Wales. Towering cliffs drop dramatically into the ocean, creating
              one of the most impressive viewpoints anywhere in the Jervis Bay region.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Because access can be limited, many visitors miss the opportunity entirely.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📅</div>
              <h4 className="font-semibold text-gray-900 mb-1">Limited Access</h4>
              <p className="text-sm text-gray-600">Plan ahead</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🏔️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Towering Cliffs</h4>
              <p className="text-sm text-gray-600">Dramatic drop to ocean</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">👁️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Best Views in NSW</h4>
              <p className="text-sm text-gray-600">Spectacular coastline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Gem #5: Cape St George Lighthouse */}
      <section
        id="cape-st-george"
        className="py-20 px-6 bg-white scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-rose-500 to-red-500 text-white rounded-2xl font-bold text-xl shadow-lg">
              5
            </span>
            <div>
              <span className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
                Historic Site
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Cape St George Lighthouse
              </h2>
            </div>
          </div>

          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/Cape St George Lighthouse - Water View.jpg"
                alt="Cape St George Lighthouse historic ruins with ocean view"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-6 md:p-8 mb-8 border border-rose-100">
            <p className="text-lg text-rose-900 font-medium italic leading-relaxed">
              Cape St George Lighthouse is one of the most fascinating historic sites in Jervis
              Bay.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The lighthouse was eventually decommissioned and today only the ruins remain. While
              some visitors assume there isn't much to see, the location itself is worth the
              trip.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The headland provides outstanding views across the coastline and is one of my
              favourite local lookout spots. In particular, it offers an uninterrupted
              south-easterly outlook over the ocean.
            </p>
            <p className="text-gray-700 leading-relaxed">
              That makes it one of the best places in the area to watch for the Southern Lights
              during rare aurora events. Even on an ordinary day, the scenery alone makes Cape St
              George Lighthouse well worth visiting.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🏛️</div>
              <h4 className="font-semibold text-gray-900 mb-1">Historic Ruins</h4>
              <p className="text-sm text-gray-600">Decommissioned lighthouse</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🔭</div>
              <h4 className="font-semibold text-gray-900 mb-1">Lookout Spot</h4>
              <p className="text-sm text-gray-600">Uninterrupted ocean views</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🌌</div>
              <h4 className="font-semibold text-gray-900 mb-1">Aurora Viewing</h4>
              <p className="text-sm text-gray-600">Best place for Southern Lights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-5xl">✨</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Discover the Real Jervis Bay
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-8"></div>
          <p className="text-xl leading-relaxed opacity-95 mb-6">
            Some of the best experiences in Jervis Bay aren't found in the brochures or the
            busiest tourist hotspots. Whether you're exploring coastal walking trails,
            searching for hidden tunnels, discovering remote beaches or simply enjoying
            spectacular views, these five locations showcase a different side of the region.
          </p>
          <p className="text-lg leading-relaxed opacity-90 mb-10">
            If you're looking to experience Jervis Bay beyond the usual attractions, start
            with these local favourites.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
            <a
              href="#scribbly-gum-track"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Start Exploring
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Enjoyed this guide to hidden gems in Jervis Bay?
          </p>
          <p className="text-sm text-gray-500">
            Share these secret spots with friends and help them discover the real Jervis Bay.
          </p>
        </div>
      </section>
    </main>
  );
}