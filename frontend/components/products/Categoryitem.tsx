import Image from "next/image";
import React from "react";

export interface CategoryItemProps {
  name: string;
  itemCount: number;
  imageSrc: string;
  className?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  itemCount,
  imageSrc,
  className = "",
}) => {
  return (
    <div className="flex flex-col justify-center items-center m-auto text-center">
      <div className={`grid grid-cols-5 gap-4 ${className}`}>
        <Image
          loading="lazy"
          src={imageSrc}
          alt={`${name} category icon`}
          className=""
          width={50}
          height={50}
        />
        <div className="flex flex-col self-start">
          <div className="text-sm font-bold leading-tight">{name}</div>
          <div className="self-start mt-2.5 text-xs">{itemCount} Items</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
