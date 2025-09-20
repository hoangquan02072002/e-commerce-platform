"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Home, Download, Mail } from "lucide-react";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState({
    paymentIntentId: "",
    amount: "",
    currency: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get payment details from URL parameters
    const paymentIntentId = searchParams.get("payment_intent");
    const paymentIntentClientSecret = searchParams.get(
      "payment_intent_client_secret"
    );
    const redirectStatus = searchParams.get("redirect_status");

    if (paymentIntentId && redirectStatus === "succeeded") {
      // Verify payment status with your backend
      verifyPayment(paymentIntentId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`/api/payments/verify/${paymentIntentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentDetails({
          paymentIntentId: data.id,
          amount: (data.amount / 100).toFixed(2), // Convert from cents
          currency: data.currency.toUpperCase(),
          status: data.status,
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleDownloadReceipt = () => {
    // Implement receipt download functionality
    console.log("Downloading receipt...");
  };

  const handleEmailReceipt = () => {
    // Implement email receipt functionality
    console.log("Sending receipt via email...");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-green-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 animate-bounce" />
        </div>

        {/* Success Message */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="mb-8 text-gray-600">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        {/* Payment Details */}
        {paymentDetails.paymentIntentId && (
          <div className="p-4 mb-6 text-left rounded-lg bg-gray-50">
            <h3 className="mb-3 font-semibold text-gray-900">
              Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">
                  {paymentDetails.amount} {paymentDetails.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {paymentDetails.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-xs text-gray-800 break-all">
                  {paymentDetails.paymentIntentId}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Button - Go Home */}
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition duration-300 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Go to Home Page</span>
          </button>

          {/* Secondary Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center flex-1 px-4 py-2 space-x-2 font-medium text-gray-700 transition duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>
            <button
              onClick={handleEmailReceipt}
              className="flex items-center justify-center flex-1 px-4 py-2 space-x-2 font-medium text-gray-700 transition duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Mail className="w-4 h-4" />
              <span>Email Receipt</span>
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="pt-6 mt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
