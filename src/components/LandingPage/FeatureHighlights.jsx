export default function FeatureHighlight() {
  return (
    <section className="bg-black py-20 px-6 text-center">
      {/* Category Badge */}
      <div className="inline-block px-4 py-1 rounded-full bg-white  text-black text-sm mb-6 font-roboto ">
        Communication
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-roboto">
        Enhanced Team Communication
      </h2>

      {/* Description */}
      <p className="text-gray-300 max-w-2xl mx-auto text-lg font-roboto">
        Simplify team discussions and collaboration with our efficient messaging
        features, enabling swift decision-making and project progress tracking.
      </p>
    </section>
  );
}
