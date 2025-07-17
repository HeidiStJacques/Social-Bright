import React, { useState } from 'react';
import Navbar from '@components/Navbar';
import { loadStripe } from '@stripe/stripe-js';
import { useTenant } from '@context/TenantContext';


const stripePromise = loadStripe('pk_test_...'); // Replace with real key

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: { monthly: '$39', annual: '$390' },
      priceIds: {
        monthly: 'price_basic_monthly_id',
        annual: 'price_basic_annual_id'
      },
      description: 'For small providers just getting started.',
      features: [
        'Up to 25 clients',
        '1 staff user',
        'Demographics & eligibility',
        'Downloadable PDFs',
      ],
    },
    {
      name: 'Pro',
      price: { monthly: '$99', annual: '$990' },
      priceIds: {
        monthly: 'price_pro_monthly_id',
        annual: 'price_pro_annual_id'
      },
      description: 'For growing agencies needing more tools.',
      features: [
        'Unlimited clients',
        'Up to 5 staff users',
        'Document uploads & alerts',
        'Eligibility tracking',
      ],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Contact Us', annual: 'Contact Us' },
      priceIds: {},
      description: 'For large orgs needing custom features.',
      features: [
        'Unlimited users & clients',
        'Custom forms & dashboards',
        'Audit logs & BAAs',
        'Onboarding & training',
      ],
    },
  ];

  const { tenantId } = useTenant();

const handleCheckout = async (priceId) => {
  const stripe = await stripePromise;
  const response = await fetch('http://localhost:8000/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, tenantId }), // ✅ Add tenant context
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                        <span className="ml-2 text-xs text-green-600 font-medium">Save 20%</span>
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

                <button
                  onClick={() => plan.priceIds[billingCycle] && handleCheckout(plan.priceIds[billingCycle])}
                  className="mt-4 bg-[#007B94] hover:bg-[#00657a] text-white font-medium text-sm py-1.5 px-3 rounded-md transition"
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
