import React, { useState } from 'react';
import Navbar from '@components/Navbar';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51Rj3oNIyTgynHwoMWmQLPDKQ1d7i29kcs2VrDkZOwU60cUsZXEjbYDTpJXgQSVE497trJNIqWc3TMGg3jUjQI7lf00evMlZhHC'); // Replace with your real key

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const tenantId = "2";
  const [showModal, setShowModal] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: { monthly: '$149', annual: '$1500' },
      priceIds: {
        monthly: 'price_1RlVJuIyTgynHwoMl5psyRff',
        annual: 'price_1RlVKMIyTgynHwoMGZpZ1DPY',
      },
      description: 'For teams of 1–5 users. All features included.',
      features: ['Up to 5 users', 'All features included', 'Demographics, eligibility, documents', 'Client and case management'],
    },
    {
      name: 'Standard',
      price: { monthly: '$299', annual: '$3000' },
      priceIds: {
        monthly: 'price_1RlVKvIyTgynHwoMAsZ4SuSy',
        annual: 'price_1RlVLXIyTgynHwoMwFn2xSFa',
      },
      description: 'For teams of 6–15 users.',
      features: ['Up to 15 users', 'All features included', 'Tasks, Reports, Plan of Care', 'File uploads and PDF export'],
      highlight: true,
    },
    {
      name: 'Professional',
      price: { monthly: '$499', annual: '$5000' },
      priceIds: {
        monthly: 'price_1RlVM1IyTgynHwoMLkV8Wo7X',
        annual: 'price_1RlVMMIyTgynHwoMimSG5lJ7',
      },
      description: 'For teams of 16–50 users.',
      features: ['Up to 50 users', 'All features included', 'Audit logs and alerts', 'Staff management tools'],
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Contact Us', annual: 'Contact Us' },
      priceIds: {},
      description: 'For large organizations with custom needs.',
      features: ['Unlimited users and clients', 'Custom forms & onboarding', 'Advanced support & training', 'Custom security & audit features'],
    },
  ];

  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:8000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, tenantId }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Checkout failed.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 pt-24 pb-12 text-black">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Choose Your Plan
          </h1>

          {/* Billing toggle */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-sm bg-white rounded-full border border-gray-300 p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  billingCycle === 'monthly'
                    ? 'bg-[#007B94] text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  billingCycle === 'annual'
                    ? 'bg-[#007B94] text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white p-4 rounded-2xl shadow-sm border flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight
                    ? 'border-[#007B94] ring-2 ring-[#007B94] scale-[1.01]'
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                <div>
                  <h2 className="text-base font-medium mb-1">{plan.name}</h2>
                  <p className="text-lg font-semibold text-black mb-1">
                    {plan.price[billingCycle]}
                    {billingCycle === 'annual' &&
                      typeof plan.price.annual === 'string' &&
                      plan.price.annual.includes('$') && (
                        <span className="ml-2 text-xs text-green-600 font-medium">
                          Save 20%
                        </span>
                      )}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">{plan.description}</p>
                  <ul className="space-y-1 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#007B94] font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.name === 'Enterprise' ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-[#007B94] hover:bg-[#00657a] text-white font-medium text-sm py-1.5 px-3 rounded-md transition"
                  >
                    Contact Sales
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckout(plan.priceIds[billingCycle])}
                    className="mt-4 bg-[#007B94] hover:bg-[#00657a] text-white font-medium text-sm py-1.5 px-3 rounded-md transition"
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Contact Sales</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Message sent!');
                setShowModal(false);
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full mb-3 p-2 border rounded"
                rows="4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#007B94] text-white px-4 py-1.5 rounded"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
