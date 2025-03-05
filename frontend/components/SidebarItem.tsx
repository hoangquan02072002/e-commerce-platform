import * as React from "react";
import { SidebarItemProps } from "../lib/types";

export const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  isActive,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-5 justify-between px-4 py-5 mt-2.5 text-center rounded-lg w-full transition-colors ${
        isActive ? "bg-green-600 text-white" : "bg-white hover:bg-gray-50"
      }`}
      aria-current={isActive ? "page" : undefined}
      aria-label={ariaLabel}
    >
      <span>{text}</span>
      <span
        className="self-start font-black leading-none"
        aria-hidden="true"
      ></span>
    </button>
  );
};
