import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-8 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        {/* Simple Logo Box */}
        <span className="text-2xl font-stretch-75% tracking-wide font-roboto">VidBridge</span>
      </div>

      {/* Middle: Links */}
      <ul className="hidden md:flex space-x-8 text-md font-light font-roboto ">
        <li>
          <Link to="/features" className="hover:text-gray-300 transition">
            Features
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="hover:text-gray-300 transition">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/blog" className="hover:text-gray-300 transition">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/changelog" className="hover:text-gray-300 transition">
            Changelog
          </Link>
        </li>
      </ul>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="px-4 py-1 border border-white rounded-full text-md font-medium hover:bg-white hover:text-black transition font-roboto"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-4 py-1 bg-white text-black rounded-full text-md font-medium hover:bg-gray-200 transition font-roboto"
        >
          Get Started Today
        </Link>
      </div>
    </nav>
  );
}
