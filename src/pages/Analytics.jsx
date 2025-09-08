import React from "react";
import { motion } from "framer-motion";
import Background from "../components/Background";

export default function Analytics() {
  const analyticsData = [
    {
      title: "Flight Status Distribution",
      desc: "This chart reveals the distribution of on-time, delayed, diverted, and cancelled flights, giving a quick snapshot of air travel reliability.",
      src: "/graphs/pie_flight_status.jpg",
    },
    {
      title: "Monthly Delay Trends",
      desc: "See how delays vary seasonally across different causes—airline, weather, and late aircraft. Useful for resource allocation and travel planning.",
      src: "/graphs/line_monthly_delay.jpg",
    },
    {
      title: "Delay Correlation Heatmap",
      desc: "Understand how delay factors influence each other. For example, departure delays strongly correlate with arrival delays, helping refine predictions.",
      src: "/graphs/heatmap_correlation.jpg",
    },
    {
      title: "Weekly Delay Patterns",
      desc: "Explore total delays across weeks of the year to uncover hidden patterns during holidays, seasons, and high-traffic times.",
      src: "/graphs/bar_weekly_delay.jpg",
    },
    {
      title: "Feature Importance",
      desc: "Highlights the most important predictors of flight delays, such as departure delay and airline performance, making models smarter and actionable.",
      src: "/graphs/feature_importance.jpeg",
    },
  ];

  return (
    <Background>
      <div className="bg-black/60 text-white p-12 min-h-screen">
        {/* Page Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-lg">
            Analytics Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Gain <span className="text-yellow-400 font-semibold">real-time insights</span> into flight
            delays, seasonal patterns, and predictive factors{" "}
            <span className="italic text-orange-400">with interactive visualizations</span>.
          </p>
        </motion.div>

        {/* Graph Sections */}
        <div className="space-y-20">
          {analyticsData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="p-[2px] rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 
                           shadow-[0_0_25px_rgba(255,140,0,0.6)] hover:shadow-[0_0_40px_rgba(255,100,0,0.9)] 
                           transition duration-300"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center 
                             bg-gradient-to-br from-gray-900 via-black-800 to-black 
                             rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl 
                             transition duration-300"
                >
                  {isEven ? (
                    <>
                      {/* Graph (slide from left) */}
                      <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="bg-black flex justify-center items-center p-8"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="rounded-xl shadow-lg w-full h-[320px] object-contain hover:scale-105 transform transition duration-300"
                        />
                      </motion.div>

                      {/* Text (slide from right) */}
                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-8 text-left"
                      >
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                          {item.title}
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Text (slide from left) */}
                      <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-8 text-left"
                      >
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                          {item.title}
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>

                      {/* Graph (slide from right) */}
                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="bg-black flex justify-center items-center p-8"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="rounded-xl shadow-lg w-full h-[320px] object-contain hover:scale-105 transform transition duration-300"
                        />
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Background>
  );
}
