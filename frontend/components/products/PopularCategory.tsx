import React from "react";
import CategoryItem from "./Categoryitem";
import { CategoryItemProps } from "./Categoryitem";

interface PopularCategoriesProps {
  categories: CategoryItemProps[];
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({
  categories,
}) => {
  return (
    <div className="mt-10 ml-6">
      <div className="self-start text-lg font-bold leading-tight uppercase">
        popular categories
      </div>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            name={category.name}
            itemCount={category.itemCount}
            imageSrc={category.imageSrc}
            className="mt-3.5"
          />
        ))}
      </div>
    </div>
    // <div className="px-10 pt-8 pb-12 mt-4 w-full bg-white rounded-xl max-md:px-5 max-md:max-w-full">
    //   <div className="flex gap-5 max-md:flex-col">
    //     <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
    //       <div className="flex gap-5 justify-between text-black grow max-md:mt-10">
    //         <div className="flex flex-col">
    //           <div className="self-start text-lg font-bold leading-tight uppercase">
    //             popular categories
    //           </div>
    //           <div className="flex flex-col pl-4 mt-14 w-full max-md:mt-10">
    //             {categories.slice(0, 2).map((category, index) => (
    //               <CategoryItem key={index} {...category} />
    //             ))}
    //           </div>
    //         </div>
    //         <div className="flex flex-col items-start self-end mt-16 text-sm font-bold max-md:mt-10">
    //           {categories.slice(2, 4).map((category, index) => (
    //             <React.Fragment key={index}>
    //               <div className="">{category.name}</div>
    //               <div className="mt-3 text-xs">{category.itemCount} Items</div>
    //               {index === 0 && <div className="mt-16 max-md:mt-10" />}
    //             </React.Fragment>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex flex-col ml-5 w-[72%] max-md:ml-0 max-md:w-full">
    //       <div className="mt-16 grow max-md:mt-10 max-md:max-w-full">
    //         <div className="flex gap-5 max-md:flex-col">
    //           {[0, 1, 2].map((columnIndex) => (
    //             <div
    //               key={columnIndex}
    //               className={`flex flex-col ${
    //                 columnIndex === 0
    //                   ? "w-[26%]"
    //                   : columnIndex === 1
    //                   ? "w-[30%]"
    //                   : "w-[44%]"
    //               } max-md:ml-0 max-md:w-full`}
    //             >
    //               <div className="flex flex-col w-full text-black max-md:mt-10">
    //                 {categories
    //                   .slice(4 + columnIndex * 2, 6 + columnIndex * 2)
    //                   .map((category, index) => (
    //                     <CategoryItem
    //                       key={index}
    //                       {...category}
    //                       className={index === 1 ? "mt-12 max-md:mt-10" : ""}
    //                     />
    //                   ))}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PopularCategories;
