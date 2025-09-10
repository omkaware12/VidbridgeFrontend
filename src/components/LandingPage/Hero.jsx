export default function Hero() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-12 lg:px-24 text-center">
      {/* Top Badge */}
      <div className="flex justify-center mb-6">
        <span className="flex items-center gap-2 bg-gray-900 px-4 py-1.5 rounded-full text-sm font-roboto">
          ⭐ Trusted by <span className="font-semibold">1,250+ creators</span>
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 font-roboto">
        Streamlined Communication <br />
        for Iterating Fast
      </h1>

      {/* Subtext */}
      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 font-roboto">
        VidBridge is a self-hosted, powerful team collaboration platform. 
        Share projects, upload videos, and stay connected—all in one place.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-4xl hover:bg-gray-200 transition font-roboto">
          Request Demo
        </button>
        <button className="px-6 py-3 border border-white text-white font-semibold rounded-4xl hover:bg-white hover:text-black transition font-roboto">
          Get Started for Free
        </button>
      </div>
    </section>
  );
}
