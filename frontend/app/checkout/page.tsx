"use client";
import * as React from "react";
import { OrderItem } from "../../components/OrderItem";
import { selectCartItems } from "@/redux/cart/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { RootState } from "@/redux/store";
import {
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  Package,
  ArrowLeft,
  Truck,
  Clock,
  Gift,
  Star,
  Sparkles,
  ShoppingBag,
  Banknote,
} from "lucide-react";

const CheckoutPage: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const [isLoading, setIsLoading] = React.useState(false);
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
  const userId = userInfo?.userId;

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? (subtotal > 1000 ? 0 : 600) : 0;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shipping + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userId) {
      toast.error("Please login to place an order");
      setIsLoading(false);
      return;
    }

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
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-all duration-300 bg-white shadow-md hover:text-gray-900 rounded-xl hover:shadow-lg">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                Secure Checkout
              </h1>
            </div>

            <div className="flex items-center px-4 py-2 space-x-2 text-green-700 bg-green-100 rounded-xl">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">SSL Secured</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="w-2/3 h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span className="font-medium text-blue-600">Cart</span>
            <span className="font-medium text-green-600">Checkout</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
          <div className="p-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Returning customer?</p>
                <button className="text-sm text-blue-600 underline hover:text-blue-700">
                  Click here to log in
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-purple-900">Have a coupon?</p>
                <button className="text-sm text-purple-600 underline hover:text-purple-700">
                  Click here to enter your code
                </button>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Billing Details */}
          <div className="space-y-6 lg:col-span-2">
            <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
              <div className="flex items-center mb-8 space-x-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Billing Details
                </h2>
              </div>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <User className="w-4 h-4" />
                      <span>First Name *</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <User className="w-4 h-4" />
                      <span>Last Name *</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>Street Address *</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Enter your street address"
                    required
                  />
                </div>

                {/* City & ZIP */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>City *</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>ZIP Code *</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter ZIP code"
                      required
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* State & Country */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Globe className="w-4 h-4" />
                      <span>State/Province *</span>
                    </label>
                    <input
                      type="text"
                      name="stateCountry"
                      value={formData.stateCountry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter state/province"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Globe className="w-4 h-4" />
                      <span>Country *</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your country"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Options */}
            <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
              <div className="flex items-center mb-6 space-x-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Shipping Options
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 border-2 border-green-200 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-green-800">
                          Standard Shipping
                        </div>
                        <div className="text-sm text-green-600">
                          5-7 business days
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-green-700">
                      {shipping === 0 ? "FREE" : `${shipping} RUB`}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-2 border-gray-200 rounded-xl opacity-60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-gray-700">
                          Express Shipping
                        </div>
                        <div className="text-sm text-gray-500">
                          2-3 business days
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-500">1200 RUB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Fixed Scroll Issues */}
          <div className="space-y-6">
            {/* Order Details - Removed sticky, added max-height with scroll */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl">
              <div className="p-8 pb-6">
                <div className="flex items-center mb-6 space-x-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Order
                  </h3>
                </div>

                {/* Scrollable Order Items Container */}
                <div className="pr-2 mb-6 space-y-4 overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {cartItems.map((cart, index) => (
                    <div
                      key={cart.id}
                      className="p-4 bg-gray-50 rounded-xl"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <OrderItem
                        image={cart.image}
                        title={cart.name}
                        quantity={cart.quantity}
                        shipping={{
                          text: "Worldwide Standard Shipping",
                          price: shipping === 0 ? "FREE" : `+${shipping} RUB`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-6 space-y-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      {subtotal.toFixed(2)} RUB
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `${shipping.toFixed(2)} RUB`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%):</span>
                    <span className="font-semibold">{tax.toFixed(2)} RUB</span>
                  </div>

                  <div className="flex justify-between pt-4 text-2xl font-bold text-gray-900 border-t border-gray-200">
                    <span>Order Total:</span>
                    <span className="text-green-600">
                      {orderTotal.toFixed(2)} RUB
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods - Fixed height and scroll */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl">
              <div className="p-8">
                <div className="flex items-center mb-6 space-x-3">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Payment Methods
                  </h3>
                </div>

                <div className="mb-6 space-y-4">
                  {/* Stripe Payment */}
                  <div className="p-4 border-2 border-indigo-200 bg-indigo-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-indigo-800">
                          Credit/Debit Card
                        </div>
                        <div className="text-sm text-indigo-600">
                          Secure payment via Stripe
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center justify-center w-8 h-5 text-xs font-bold text-white bg-blue-500 rounded">
                          VISA
                        </div>
                        <div className="flex items-center justify-center w-8 h-5 text-xs font-bold text-white bg-red-500 rounded">
                          MC
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div className="p-4 border-2 border-gray-200 rounded-xl opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-700">
                          Direct Bank Transfer
                        </div>
                        <div className="text-sm text-gray-500">
                          Transfer directly to our bank account
                        </div>
                      </div>
                      <Banknote className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-2xl hover:shadow-xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>PLACE SECURE ORDER</span>
                    </div>
                  )}
                </button>

                {/* Security Info */}
                <div className="flex items-center justify-center p-3 mt-4 space-x-2 bg-gray-50 rounded-xl">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-6 text-white shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl">
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold">Why Choose Us?</span>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Fast Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

const getStripe = async (): Promise<Stripe | null> => {
  return loadStripe(
    "pk_test_51PsgZxJ7yblNqdVjluihYfsOcWvR30KXXJjckXX5VRVxn63sX4IqWtQk3hwPfTYNMT3upnwGefqVpNHpVMGC4EQ900qm4vF82f"
  );
};
