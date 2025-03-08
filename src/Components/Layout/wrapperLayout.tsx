"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface WrapperLayoutProps {
  firstPosition: string;
  secondPosition: string;
  children: React.ReactNode;
}

export default function WrapperLayout({ firstPosition, secondPosition, children }: WrapperLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isClient]); 
  if (!isClient) {
    return (
      <div className="px-6 sm:px-10 lg:px-16 my-auto">
        <div className="py-8">
          {firstPosition || secondPosition ? (
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-12 text-gray-800 dark:text-gray-200">
            <span>{firstPosition}</span> <span className="text-blue-500 dark:text-blue-400">{secondPosition}</span>
          </h1>
          ) : null}
          <div id="content-wrapper" style={{ visibility: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-10 lg:px-16">
      <div className="animate-slide-up">
        <div className="py-8">
          {firstPosition || secondPosition ? (
            <h1 className="text-3xl font-extrabold text-center mb-8 sm:mb-12 text-gray-800 dark:text-gray-200">
              <span>{firstPosition}</span> <span className="text-blue-500 dark:text-blue-400">{secondPosition}</span>
            </h1>
          ) : null}

          <div id="content-wrapper">{children}</div>
        </div>
      </div>
    </div>
  );
}