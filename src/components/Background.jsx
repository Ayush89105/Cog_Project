import React from "react";

export default function Background({ children }) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url("/graphs/worldmap.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
