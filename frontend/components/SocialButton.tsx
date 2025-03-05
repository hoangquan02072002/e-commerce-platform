import * as React from "react";
import { SocialButtonProps } from "../lib/types";

export const SocialButton: React.FC<SocialButtonProps> = ({
  ariaLabel,
  icon,
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className="px-3 bg-white rounded-2xl h-[35px] w-[35px]"
    >
      {icon}
    </button>
  );
};
