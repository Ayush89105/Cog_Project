import React from "react";
import { motion } from "framer-motion";
import Background from "../components/Background";

export default function About() {
  return (
    <Background>
      {/* Overlay for readability */}
      <div className="bg-black/60 text-white p-12 min-h-screen">
        {/* Page Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-orange-400 to-red-900 drop-shadow-lg">
            About Us
          </h1>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
             Discover the <span className="text-yellow-400 font-semibold">mission, vision and values</span> 
            <span className="text-orange-300 text-orange-400"> that
            drive our work in delivering</span>.
            <span className="text-yellow-500 text-orange-400"> and impactful insights for the aviation industry.</span>.

          </p>
          
          
        </motion.div>

        {/* About Sections */}
        <div className="space-y-16 max-w-5xl mx-auto">
          {[
            {
              title: "Our Mission",
              desc: "To provide accurate, real-time predictions of flight delays, helping passengers, airlines, and stakeholders make informed decisions.",
            },
            {
              title: "Our Vision",
              desc: "We aim to revolutionize air travel analytics with cutting-edge AI models, making air journeys smoother, predictable, and stress-free.",
            },
            {
              title: "Our Values",
              desc: "Innovation, transparency, and reliability are at the heart of what we do. We strive to deliver solutions that create real-world impact.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="p-[2px] rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 
                         shadow-[0_0_25px_rgba(0,200,255,0.6)] hover:shadow-[0_0_40px_rgba(0,180,255,0.9)] 
                         transition duration-300"
            >
              <div className="bg-gradient-to-br from-gray-900 via-black-800 to-black rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-yellow-200 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Background>
  );
}
