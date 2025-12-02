import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ShieldCheck } from 'lucide-react';

export default function Payment() {
  const { amount } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 px-4 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
          <p className="text-gray-500">Pay securely with PayPal to confirm.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <span className="text-gray-500 font-medium">Total Amount</span>
            <span className="text-3xl font-bold text-slate-900">${amount}.00</span>
          </div>

          {/* PayPal Button */}
          <div className="relative z-0">
            <PayPalButtons 
                style={{ layout: "vertical", shape: "rect" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: amount } }]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(() => {
                        alert("Payment Successful! Dr. Musa will contact you.");
                        navigate('/');
                    });
                }}
            />
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8">
          Encrypted Security by PayPal • No card details stored on this server.
        </p>
      </div>
    </div>
  );
}