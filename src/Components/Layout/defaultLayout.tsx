"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "../Footer/footer";
import Navbar from "../Header/navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="fixed top-0 z-50 w-full bg-red-500">
        <Navbar />
      </div>

      {/* Main Content */}
      <main>
        <div className="justify-center w-full min-h-full overflow-hidden hide-scrollbar mt-16 bg-white text-black">
          <div className="w-full min-h-screen text-center items-center justify-center space-y-6">
            <React.Fragment key={pathname}>{children}</React.Fragment>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;