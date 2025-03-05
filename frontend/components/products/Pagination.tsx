import React from "react";

interface PaginationProps {
  // Add any necessary props here
}

const Pagination: React.FC<PaginationProps> = () => {
  return (
    <div className="flex gap-1.5 self-center mt-10 max-w-full text-sm text-center text-black w-[358px]">
      <div className="px-5 py-3 text-black whitespace-nowrap bg-green-600 rounded-md border border-green-600 border-solid">
        1
      </div>
      <div className="px-4 py-3 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
        2
      </div>
      <div className="px-4 py-3 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
        3
      </div>
      <div className="px-4 py-3 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
        4
      </div>
      <div className="px-4 pt-5 pb-3 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
        ...
      </div>
      <div className="px-3.5 py-3 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
        20
      </div>
      <div className="px-4 py-3 bg-white rounded-md border border-solid border-zinc-200 max-md:pr-5">
        Next{" "}
      </div>
    </div>
  );
};

export default Pagination;
