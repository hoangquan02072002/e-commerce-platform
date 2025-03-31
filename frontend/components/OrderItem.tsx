import * as React from "react";
import { OrderItemProps } from "../lib/types";
import Image from "next/image";

export const OrderItem: React.FC<OrderItemProps> = ({
  image,
  title,
  quantity,
  shipping,
}) => {
  return (
    <div className="flex flex-col py-3 mt-2 w-full text-sm border-b border-zinc-200">
      <div className="flex gap-4 self-start">
        <Image
          loading="lazy"
          src={image}
          alt={title}
          className="object-contain shrink-0 aspect-square w-[60px]"
          width={60}
          height={60}
        />
        <div className="flex flex-col my-auto">
          <div className="font-medium leading-5 text-black">{title}</div>
          <div className="self-start mt-3 leading-relaxed text-stone-500">
            x {quantity}
          </div>
        </div>
      </div>
      {shipping && (
        <div className="flex gap-5 justify-between mt-6">
          <div className="text-black">{shipping.text}</div>
          <div className="text-red-600">{shipping.price}</div>
        </div>
      )}
    </div>
  );
};
