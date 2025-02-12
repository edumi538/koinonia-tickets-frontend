import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full h-full min-h-screen">
      {children}
    </section>
  );
}
