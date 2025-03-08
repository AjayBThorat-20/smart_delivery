"use client";

import React from "react";

export default function Footer() {

  return (
    <>
      {/* Divider */}
      <hr
        className="border-t border-gray-300"
      />

      {/* Footer */}
      <footer
        className= "w-full text-center py-4 z-50 bg-gray-100 text-gray-800"
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ajay Bhimrao Thorat. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}