import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FlightPredict from "./components/flightpredict";
import Analytics from "./pages/Analytics";
import About from "./components/About";

function App() {
  return (
    <Router>
      {/* Global Navbar */}
{/* Global Navbar */}
<header className="relative z-20 w-full flex justify-between items-center px-8 py-6 
                   bg-gradient-to-r from-gray-900 via-gray-800 to-black 
                   backdrop-blur-md shadow-lg">
  {/* Logo + Title */}
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center">
      <span className="text-gray-100 text-sm font-bold">✈</span>
    </div>
    <span className="font-bold text-xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
      Udaan Smart Predict
    </span>
  </div>

  {/* Navbar Links */}
  <nav className="hidden md:flex space-x-8 text-orange-400">
    <Link
      to="/"
      className="hover:text-yellow-400 transition-colors duration-200 font-medium"
    >
      Home
    </Link>
    <Link
      to="/analytics"
      className="hover:text-yellow-400 transition-colors duration-200 font-medium"
    >
      Analytics
    </Link>
    <Link
      to="/about"
      className="hover:text-yellow-400 transition-colors duration-200 font-medium"
    >
      About
    </Link>
  </nav>
</header>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<FlightPredict />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<About/> } />
      </Routes>
    </Router>
  );
}
export default App;