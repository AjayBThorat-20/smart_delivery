import React from "react";
import Link from "next/link";

interface CustomLinkVerticalProps {
  href: string;
  title: string;
  onClick: () => void;
  isActive: boolean;
}

export const CustomLinkVertical: React.FC<CustomLinkVerticalProps> = ({
  href,
  title,
  onClick,
  isActive,
}) => {
  return (
    <Link href={href} passHref>
      <div
        className="relative overflow-hidden group cursor-pointer"
        onClick={onClick}
      >
        <span className="block transition-transform duration-300 transform group-hover:-translate-y-full">
          {title}
        </span>
        <span className="block absolute top-full left-0 transition-transform duration-300 transform group-hover:-translate-y-full">
          {title}
        </span>
        {/* Active Page Underline */}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
        )}
      </div>
    </Link>
  );
};