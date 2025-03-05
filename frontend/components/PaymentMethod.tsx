import * as React from "react";
import { PaymentMethodProps } from "../lib/types";
import Image from "next/image";

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  icon,
  title,
  description,
  isSelected,
  paypalImage,
  helpText,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 self-start font-bold leading-tight text-black">
        <Image
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 w-5 rounded-md aspect-square"
        />
        <div className="my-auto basis-auto">{title}</div>
      </div>
      {description && (
        <div className="mt-3.5 mr-4 ml-8 text-sm leading-6 text-stone-500">
          {description}
        </div>
      )}
      {helpText && (
        <div className="flex gap-5 justify-between mt-5 w-full leading-tight">
          <div className="flex gap-2">
            <div className="flex shrink-0 self-start w-5 h-5 bg-white rounded-md border border-solid border-black border-opacity-30" />
            <div className="font-bold text-black">Paypal </div>
            <div className="text-blue-600">{helpText}</div>
          </div>
          {paypalImage && (
            <Image
              loading="lazy"
              src={paypalImage}
              alt="PayPal"
              className="object-contain shrink-0 self-start mt-1.5 aspect-[3.94] w-[59px]"
            />
          )}
        </div>
      )}
    </div>
  );
};
