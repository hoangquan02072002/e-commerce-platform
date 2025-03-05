import * as React from "react";
import { ProfileImageProps } from "../lib/types";
import Image from "next/image";

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  className = "object-contain aspect-[0.98] w-[215px]",
}) => {
  const [error, setError] = React.useState(false);

  return (
    <div className="relative">
      <Image
        loading="lazy"
        src={error ? "/default-profile.png" : src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        width={215}
        height={220}
      />
    </div>
  );
};
