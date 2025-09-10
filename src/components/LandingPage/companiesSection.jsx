export default function CompaniesSection() {
  return (
    <section className="bg-black py-16">
      {/* Heading */}
      <p className="text-center text-gray-300 mb-12 text-lg">
        Join <span className="font-semibold text-white">4,000+ companies</span> already growing
      </p>

      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-16 px-6 bg-amber-50 py-5">
        <img
          src="https://cdn.prod.website-files.com/6177739448baa66404ce1d9c/630e8a89d2ae29fb1ffe51d6_Headspace%20logo.png"
          alt="ProLine"
          className="h-10 opacity-90 hover:opacity-100 transition"
        />
        <img
          src="https://cdn.prod.website-files.com/6177739448baa66404ce1d9c/6834408058f0ebe311f81f31_darktrace-logo.png"
          alt="Hues"
          className="h-10 opacity-90 hover:opacity-100 transition"
        />
        <img
          src="https://cdn.prod.website-files.com/6177739448baa66404ce1d9c/64d085d1b6c6593d163b1938_nike%20logo.png"
          alt="Greenish"
          className="h-10 opacity-90 hover:opacity-100 transition"
        />
        <img
          src="https://cdn.prod.website-files.com/6177739448baa66404ce1d9c/651fa49688972afb0178604c_Webflow%20logo.png"
          alt="Cloud"
          className="h-10 opacity-90 hover:opacity-100 transition"
        />
        <img
          src="https://cdn.prod.website-files.com/6177739448baa66404ce1d9c/63872b9cb348d175d53cbd10_Jasper-logo.png"
          alt="Volume"
          className="h-10 opacity-90 hover:opacity-100 transition"
        />
        <img
          src="https://cdn.prod.website-files.com/6177739448baa66404ce1d9c/630e8a899ef16e91397a5c0b_edgar%20allen%20logo.png"
          alt="PinPoint"
          className="h-10 opacity-90 hover:opacity-100 transition"
        />
      </div>
    </section>
  );
}
