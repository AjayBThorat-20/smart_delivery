"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { CustomLink } from "../Common/Links/customLink";
import { CustomLinkVertical } from "../Common/Links/customLinkVertical";

export const navItems = [
  { label: "Home", href: "/", current: true },
    { label: "Partners", href: "/partners" },
    { label: "Orders", href: "/orders" },
    { label: "Assignments", href: "/assignments" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="relative shadow-sm bg-white text-gray-900">
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full px-8 lg:px-32 py-4 font-medium items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              {/* <img src="Logo.png" alt="K Sere Sera Logo" className="h-10 w-10" /> */}
              <span className="text-xl font-semibold">Smart Delhivery</span>
            </div>
          </Link>
        </div>
        <nav className="flex items-center space-x-8">
          {navItems.map((item) => (
            <CustomLink
              key={item.href}
              href={item.href}
              title={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center px-4 py-4 z-50 relative bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              {/* <img src="Logo.png" alt="K Sere Sera Logo" className="h-8 w-8" /> */}
              <span className="text-xl font-semibold">Smart Delhivery</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 rounded-full bg-gray-200 transition-colors duration-200"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu (Appears from the Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-slate-50 shadow-lg transform transition-transform duration-300 ease-in-out pt-24 z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map((item) => (
            <CustomLinkVertical
              key={item.href}
              href={item.href}
              title={item.label}
              onClick={() => handleLinkClick(item.href)}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}