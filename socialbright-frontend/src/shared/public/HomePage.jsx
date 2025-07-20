import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 text-black font-sans">

        {/* Hero Section */}
        <section
          className="relative h-[400px] sm:h-[450px] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/teamwork.jpg')" }}
        >
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2 leading-tight">
              Welcome to Social Bright
            </h1>
            <p className="text-base sm:text-lg text-white max-w-xl">
              HIPAA-compliant case management made simple and modern.
            </p>
            <div className="mt-6">
              <Link
                to="/plans"
                className="inline-block px-6 py-3 bg-[#007B94] text-white rounded-lg text-sm font-semibold shadow hover:bg-[#00657a] transition"
              >
                Explore Plans
              </Link>
            </div>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="py-12 px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Why Use Social Bright?</h2>
          <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              'HIPAA-Compliant case management platform',
              'Streamlined workflows for programs',
              'Easy-to-use interface for staff and providers',
              'Customizable for NH and soon nationwide use',
              'Accessible design for providers and case managers',
              'Customizable to your agency needs',
            ].map((point, i) => (
              <li
                key={i}
                className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#007B94]"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* What Makes Us Stand Out */}
        <section className="py-12 bg-white">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            What Makes Us Stand Out
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {[
              {
                title: 'Real-Time Alerts',
                description: 'Never miss an eligibility deadline or documentation request again.',
              },
              {
                title: 'Fully HIPAA-Compliant',
                description: 'All data stored and transmitted with full security compliance.',
              },
              {
                title: 'Simple, Intuitive UI',
                description: 'No training required. Your staff can get started right away.',
              },
            ].map(({ title, description }, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-[#007B94]"
              >
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-sm text-gray-700">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 text-center bg-white px-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Ready to simplify your workflow?
          </h2>
          <p className="mb-6 text-gray-600 max-w-xl mx-auto">
            Explore plans or reach out for a demo today.
          </p>
          <Link
            to="/plans"
            className="inline-block px-6 py-3 bg-[#007B94] text-white rounded-lg font-semibold shadow hover:bg-[#00657a] transition"
          >
            Get Started
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Social Bright. All rights reserved.
        </footer>
      </div>
    </>
  );
}
