import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full h-full min-h-screen">
      <div
        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage: "url('/img/register_bg_2.png')",
        }}
      ></div>
      {children}
    </section>
  );
}
