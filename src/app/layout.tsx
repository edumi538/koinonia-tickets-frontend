"use client";
import React from "react";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <section className="relative w-full h-full py-40 min-h-screen">
            <div
              className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
              style={{
                backgroundImage: "url('/img/register_bg_2.png')",
              }}
            ></div>
            <SessionProvider>
              <AuthProvider>{children}</AuthProvider>
            </SessionProvider>
          </section>
        </main>
      </body>
    </html>
  );
}
