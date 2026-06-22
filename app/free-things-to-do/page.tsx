import Link from "next/link";

export default function FreeThingsToDo() {
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
            Budget-Friendly Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Free Things To Do in Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Discover the best free activities and attractions around Jervis Bay.
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

      {/* Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* White Sands Walk */}
          <div className="mb-16">
            <div className="overflow-hidden rounded-2xl shadow-lg mb-6">
              <img
                src="/Greenfield_Beach.jpg"
                alt="Greenfield Beach Jervis Bay"
                className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              White Sands Walk (Greenfield Beach)
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              One of the most scenic coastal walks in Australia, connecting crystal-clear beaches and white sand shoreline. This free walking trail offers stunning views of the turquoise waters and pristine coastline that Jervis Bay is famous for.
            </p>
          </div>

          {/* Hyams Beach */}
          <div className="mb-16">
            <div className="overflow-hidden rounded-2xl shadow-lg mb-6">
              <img
                src="/Crystal_Clear_Hyams_Beach_White_Sand.jpg"
                alt="Hyams Beach Jervis Bay"
                className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Hyams Beach
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Famous for its incredibly white sand and turquoise water, Hyams Beach is a must-visit destination. According to the Guinness World Records, Hyams Beach has the whitest sand in the world. Swimming, sunbathing, and beach walks are all free activities here.
            </p>
          </div>

          {/* Sunset at Collingwood Beach */}
          <div className="mb-16">
            <div className="overflow-hidden rounded-2xl shadow-lg mb-6">
              <img
                src="/Collingwood_Beach_Beautiful_Sunset.jpg"
                alt="Collingwood Beach sunset Jervis Bay"
                className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Sunset at Collingwood Beach
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              One of the best free sunset locations in the region. Watch as the sky transforms into a canvas of oranges, pinks, and purples over the calm waters of Jervis Bay. Perfect for photography enthusiasts and romantic evenings.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🆓</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            More Free Experiences Await
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            Jervis Bay offers countless free activities beyond these highlights. From coastal walks to pristine beaches, many of the best experiences here don't cost a thing. Explore our other guides to discover even more ways to enjoy the region.
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
            Check out our other guides for more things to do in the region.
          </p>
        </div>
      </section>
    </main>
  );
}