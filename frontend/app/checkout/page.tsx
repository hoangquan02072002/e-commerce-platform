"use client";

import * as React from "react";
import { InputField } from "../../components/InputField";
import { OrderItem } from "../../components/OrderItem";
// import { PaymentMethod } from "../../components/PaymentMethod";
import checkout from "../../public/checkout.png";
const CheckoutPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    stateCountry: "",
    country: "",
    paymentMethod: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <main className="flex flex-col items-start px-12 py-12 bg-white rounded-xl max-md:px-5">
      <h1 className="text-lg font-bold leading-tight text-black uppercase">
        checkout
      </h1>

      <section className="flex flex-wrap gap-8 self-stretch mt-7 text-sm leading-relaxed text-black max-md:max-w-full">
        <div className="grow px-12 py-6 rounded-xl border border-solid bg-stone-200 border-stone-200 w-fit max-md:px-5 max-md:max-w-full">
          Returning customer?{" "}
          <button className="text-red-600 underline">
            Click here to log in
          </button>
        </div>
        <div className="grow px-12 py-6 rounded-xl border border-solid bg-stone-200 border-stone-200 w-fit max-md:px-5 max-md:max-w-full">
          Have a coupon?{" "}
          <button className="text-red-600 underline">
            Click here to enter your code
          </button>
        </div>
      </section>

      <form className="w-full">
        <h2 className="mt-12 text-base font-bold leading-tight text-black max-md:mt-10">
          Billing Detail
        </h2>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex-1">
            <InputField
              label="First Name"
              required={true}
              type="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Last Name"
              required={true}
              type="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </div>
        </div>

        <InputField
          label="Company Name"
          required={true}
          type="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          name="companyName"
        />

        <InputField
          label="Country / Region"
          required={true}
          type="country"
          value={formData.country}
          onChange={handleInputChange}
          name="country"
        />

        <InputField
          label="Street Address"
          required={true}
          type="tel"
          value={formData.address}
          onChange={handleInputChange}
          name="address"
        />

        <InputField
          label="Town / City"
          required={true}
          type="city"
          value={formData.city}
          onChange={handleInputChange}
          name="city"
        />

        <div className="flex gap-5 justify-between self-stretch mt-6">
          <section className="w-[59%]">
            <InputField
              label="Zip Code"
              required={true}
              type="tel"
              value={formData.zipCode}
              onChange={handleInputChange}
              name="zipCode"
            />

            <InputField
              label="Phone Number"
              required={true}
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
            />

            <InputField
              label="Email Address"
              required={true}
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
            />
          </section>

          <section className="w-[41%]">
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="text-base font-bold mb-4">Your Order</h3>

              <OrderItem
                image={checkout}
                title="Pinnaeple Macbook Pro 2022 M1/ 512GB"
                quantity={3}
                shipping={{
                  text: "Worldwide Standard Shipping Free",
                  price: "+ $9.50",
                }}
              />

              <div className="flex gap-5 justify-between mt-5 text-base font-bold">
                <div className="text-black">Order Total</div>
                <div className="text-green-600">$1,746.50</div>
              </div>
            </div>

            <div className="bg-zinc-200 rounded-xl p-6 mt-4">
              {/* <PaymentMethod
                icon="https://cdn.builder.io/api/v1/image/assets/23bfc636ee104ce0bd0731262d29eee7/1ce9affdfbfe49058a8a8978b80fbd1c2426af6c0bb37de066e9aa9c68710bd4?apiKey=23bfc636ee104ce0bd0731262d29eee7&"
                title="Direct Bank Transfer"
                description="Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
              />

              <PaymentMethod
                icon="https://cdn.builder.io/api/v1/image/assets/23bfc636ee104ce0bd0731262d29eee7/671270fac946e7e8784d97fc3cfc8d38299af39ca309a677f8feee95ebde1b37?apiKey=23bfc636ee104ce0bd0731262d29eee7&"
                title="PayPal"
                helpText="What's Paypal?"
                paypalImage="https://cdn.builder.io/api/v1/image/assets/23bfc636ee104ce0bd0731262d29eee7/671270fac946e7e8784d97fc3cfc8d38299af39ca309a677f8feee95ebde1b37?apiKey=23bfc636ee104ce0bd0731262d29eee7&"
              /> */}

              <button
                type="submit"
                className="w-full px-16 py-5 mt-11 text-xs font-medium text-center text-white uppercase bg-green-600 rounded-xl"
              >
                place order
              </button>
            </div>
          </section>
        </div>
      </form>
    </main>
  );
};

export default CheckoutPage;
