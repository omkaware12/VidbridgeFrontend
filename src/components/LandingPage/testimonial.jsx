import React, { useState } from 'react';

const testimonials = [
  {
    quote: "Our team's productivity soared with this messaging tool. Its simplicity fosters quick decision-making and seamless collaboration, essential for our fast-paced product development.",
    name: 'Emily Rodriguez',
    title: 'Emily Rodriguez, PinPoint',
    avatar: 'https://placehold.co/48x48',
    companyLogo: 'https://placehold.co/80x24?text=PinPoint'
  },
  {
    quote: "With this tool, our team's workflow has become more efficient and organized. We spend less time navigating complex interfaces and more time focusing on what matters: delivering quality products to our customers.",
    name: 'David Patel',
    title: 'David Patel, Hues',
    avatar: 'https://placehold.co/48x48',
    companyLogo: 'https://placehold.co/80x24?text=Hues'
  },
  {
    quote: "We've seen remarkable results since integrating AI solutions from this company into our workflows. Their computer vision technology has enabled us to automate tasks and extract valuable insights from visual data.",
    name: 'Rachel Kim',
    title: 'Rachel Kim, Greenish',
    avatar: 'https://placehold.co/48x48',
    companyLogo: 'https://placehold.co/80x24?text=Greenish'
  },
  {
    quote: "Communication within our team improved dramatically. We no longer waste time switching between platforms or searching for messages.",
    name: 'Sofia Lin',
    title: 'Sofia Lin, FlowTech',
    avatar: 'https://placehold.co/48x48',
    companyLogo: 'https://placehold.co/80x24?text=FlowTech'
  },
  {
    quote: "This platform brought structure to our workflows. The AI features are a game-changer in extracting insights we would’ve missed otherwise.",
    name: 'Jake Morris',
    title: 'Jake Morris, InSight',
    avatar: 'https://placehold.co/48x48',
    companyLogo: 'https://placehold.co/80x24?text=InSight'
  },
  {
    quote: "Their intuitive design and seamless integrations have helped us streamline our collaboration across departments.",
    name: 'Anna Liu',
    title: 'Anna Liu, Synapse',
    avatar: 'https://placehold.co/48x48',
    companyLogo: 'https://placehold.co/80x24?text=Synapse'
  },
];

const TestimonialsSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 2, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 2, testimonials.length - 2));
  };

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 2);

  return (
    <div className="bg-black text-white px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 font-roboto">
        <h2 className="text-3xl font-bold">What our clients say</h2>
        <div className="space-x-4">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition disabled:opacity-30"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + 2 >= testimonials.length}
            className="w-10 h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      {/* Testimonials Grid (2 at a time) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-roboto">
        {visibleTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-black border border-gray-700 rounded-xl p-8 flex flex-col justify-between"
          >
            <p className="text-xl leading-snug mb-6">
              “{testimonial.quote}”
            </p>
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
              <img
                src={testimonial.companyLogo}
                alt="Company Logo"
                className="h-6"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSlider;
