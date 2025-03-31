"use client";
import * as React from "react";
import { InputField } from "../../components/InputField";
import { OrderItem } from "../../components/OrderItem";
// import { PaymentMethod } from "../../components/PaymentMethod";
import { selectCartItems } from "@/redux/cart/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { RootState } from "@/redux/store";
const CheckoutPage: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const userId = useSelector((state: RootState) => state.userLogin.user?.user);
  console.log(userId);
  // const [formData, setFormData] = React.useState({
  //   firstName: "",
  //   lastName: "",
  //   companyName: "",
  //   address: "",
  //   city: "",
  //   zipCode: "",
  //   phoneNumber: "",
  //   email: "",
  //   stateCountry: "",
  //   country: "",
  //   paymentMethod: "",
  // });
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const orderTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      amount: orderTotal, // Total amount to charge
      productId: cartItems.map((item) => item.id), // Array of product IDs
      quantity: cartItems.map((item) => item.quantity), // Array of quantities
      userId: userId.id, // Replace with actual user ID
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/payments/create-checkout-session",
        orderData
      );
      const sessionId = response.data.id; // Get the session ID from the response

      // Redirect to Stripe Checkout
      const stripe = await getStripe(); // Function to get Stripe instance
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };
  return (
    <main className="flex flex-col items-start px-12 py-12 bg-white rounded-xl max-md:px-5">
      <h1 className="text-lg font-bold leading-tight text-black uppercase">
        checkout
      </h1>

      <section className="flex flex-wrap gap-8 self-stretch mt-7 text-sm leading-relaxed text-black max-md:max-w-full">
        <div className="px-12 py-6 rounded-xl border border-solid grow bg-stone-200 border-stone-200 w-fit max-md:px-5 max-md:max-w-full">
          Returning customer?{" "}
          <button className="text-red-600 underline">
            Click here to log in
          </button>
        </div>
        <div className="px-12 py-6 rounded-xl border border-solid grow bg-stone-200 border-stone-200 w-fit max-md:px-5 max-md:max-w-full">
          Have a coupon?{" "}
          <button className="text-red-600 underline">
            Click here to enter your code
          </button>
        </div>
      </section>

      <form className="w-full" onSubmit={handlePlaceOrder}>
        <h2 className="mt-12 text-base font-bold leading-tight text-black max-md:mt-10">
          Billing Detail
        </h2>

        {/* <div className="flex flex-wrap gap-4 mt-4">
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
        </div> */}

        {/* <InputField
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
        /> */}

        <div className="flex gap-5 justify-between self-stretch mt-6">
          {/* <section className="w-[59%]">
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
          </section> */}

          <section className="w-[41%]">
            <div className="p-6 bg-gray-100 rounded-xl">
              <h3 className="mb-4 text-base font-bold">Your Order</h3>
              {cartItems.map((cart) => (
                <div key={cart.id}>
                  <OrderItem
                    image={cart.image}
                    title="Pinnaeple Macbook Pro 2022 M1/ 512GB"
                    quantity={cart.quantity}
                    shipping={{
                      text: "Worldwide Standard Shipping Free",
                      price: "+ $9.50",
                    }}
                  />
                </div>
              ))}

              <div className="flex gap-5 justify-between mt-5 text-base font-bold">
                <div className="text-black">Order Total</div>
                <div className="text-green-600">{orderTotal} USD</div>
              </div>
            </div>

            <div className="p-6 mt-4 rounded-xl bg-zinc-200">
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
                className="px-16 py-5 mt-11 w-full text-xs font-medium text-center text-white uppercase bg-green-600 rounded-xl"
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
const getStripe = () => {
  return new Promise((resolve) => {
    const stripe = loadStripe(
      "pk_test_51PsgZxJ7yblNqdVjluihYfsOcWvR30KXXJjckXX5VRVxn63sX4IqWtQk3hwPfTYNMT3upnwGefqVpNHpVMGC4EQ900qm4vF82f"
    );
    resolve(stripe);
  });
};
