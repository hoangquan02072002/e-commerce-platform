import React from "react";

interface FilterSectionProps {
  title: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-start py-8 mx-4 mt-9 text-sm text-black border-b border-neutral-400 border-opacity-20 max-md:mx-2.5">
      <div className="font-bold text-black">{title}</div>
      {/* Add specific filter content based on the title */}
    </div>
  );
};

export default FilterSection;
