"use client";
import * as React from "react";
import { OrderItem } from "../../components/OrderItem";
// import { PaymentMethod } from "../../components/PaymentMethod";
import { selectCartItems } from "@/redux/cart/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { RootState } from "@/redux/store";

const CheckoutPage: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    stateCountry: "",
    country: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const userInfo = useSelector((state: RootState) => state.userLogin.user);
  const userId = userInfo?.user_info.user.id;

  const orderTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please login to place an order");
      return;
    }

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "city",
      "zipCode",
      "phoneNumber",
      "email",
      "stateCountry",
      "country",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    const orderData = {
      amount: orderTotal.toString(),
      productId: cartItems.map((item) => item.id),
      quantity: cartItems.map((item) => item.quantity),
      userId: userId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      phoneNumber: formData.phoneNumber,
      stateCountry: formData.stateCountry,
      country: formData.country,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/payments/create-checkout-session",
        orderData
      );
      const sessionId = response.data.id;

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

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
    <main className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-black uppercase">checkout</h1>

      <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div className="p-6 rounded-xl border bg-stone-100 border-stone-200">
          <p className="text-sm text-black">
            Returning customer?{" "}
            <button className="text-red-600 underline hover:text-red-700">
              Click here to log in
            </button>
          </p>
        </div>
        <div className="p-6 rounded-xl border bg-stone-100 border-stone-200">
          <p className="text-sm text-black">
            Have a coupon?{" "}
            <button className="text-red-600 underline hover:text-red-700">
              Click here to enter your code
            </button>
          </p>
        </div>
      </section>

      <form className="w-full" onSubmit={handlePlaceOrder}>
        <h2 className="mb-6 text-xl font-bold text-black">Billing Detail</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="w-full">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="stateCountry"
                    value={formData.stateCountry}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="p-6 bg-gray-100 rounded-xl">
              <h3 className="mb-4 text-lg font-bold">Your Order</h3>
              <div className="space-y-4">
                {cartItems.map((cart) => (
                  <div key={cart.id}>
                    <OrderItem
                      image={cart.image}
                      title={cart.name}
                      quantity={cart.quantity}
                      shipping={{
                        text: "Worldwide Standard Shipping Free",
                        price: "+ $9.50",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 text-lg font-bold">
                <div className="text-black">Order Total</div>
                <div className="text-green-600">${orderTotal.toFixed(2)}</div>
              </div>
            </div>

            <div className="p-6 mt-6 rounded-xl bg-zinc-100">
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
                className="px-6 py-4 w-full text-sm font-medium text-white uppercase bg-green-600 rounded-xl transition-colors hover:bg-green-700"
              >
                Place order
              </button>
            </div>
          </section>
        </div>
      </form>
    </main>
  );
};

export default CheckoutPage;

const getStripe = async (): Promise<Stripe | null> => {
  return loadStripe(
    "pk_test_51PsgZxJ7yblNqdVjluihYfsOcWvR30KXXJjckXX5VRVxn63sX4IqWtQk3hwPfTYNMT3upnwGefqVpNHpVMGC4EQ900qm4vF82f"
  );
};
