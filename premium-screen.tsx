"use client"

import { useState } from "react"

interface PremiumScreenProps {
  handleBack: () => void
}

export default function PremiumScreen({ handleBack }: PremiumScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual")

  const plans = {
    monthly: {
      basic: {
        price: "$9.99",
        features: ["Personalized recommendations", "Ad-free experience", "Basic analytics"],
      },
      pro: {
        price: "$19.99",
        features: [
          "All Basic features",
          "Advanced career insights",
          "Priority customer support",
          "Custom assessment tools",
        ],
      },
      enterprise: {
        price: "$39.99",
        features: [
          "All Pro features",
          "Team collaboration tools",
          "API access",
          "Dedicated account manager",
          "Custom integrations",
        ],
      },
    },
    annual: {
      basic: {
        price: "$99.99",
        saveText: "Save $19.89",
        features: ["Personalized recommendations", "Ad-free experience", "Basic analytics"],
      },
      pro: {
        price: "$199.99",
        saveText: "Save $39.89",
        features: [
          "All Basic features",
          "Advanced career insights",
          "Priority customer support",
          "Custom assessment tools",
        ],
      },
      enterprise: {
        price: "$399.99",
        saveText: "Save $79.89",
        features: [
          "All Pro features",
          "Team collaboration tools",
          "API access",
          "Dedicated account manager",
          "Custom integrations",
        ],
      },
    },
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center px-5 pt-8 pb-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleBack}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 className="text-xl font-bold ml-4">Premium Plans</h1>
      </header>

      {/* Plan Toggle */}
      <div className="px-5 mt-2">
        <div className="bg-gray-100 p-1 rounded-lg flex justify-between mb-6">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              selectedPlan === "monthly" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            Monthly
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
              selectedPlan === "annual" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setSelectedPlan("annual")}
          >
            Annual <span className="text-green-500 text-xs">Save 17%</span>
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="flex-1 px-5 overflow-y-auto">
        <div className="space-y-4">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Basic</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Popular</span>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold">{plans[selectedPlan].basic.price}</span>
                <span className="text-gray-500 text-sm">/{selectedPlan === "monthly" ? "month" : "year"}</span>
                {selectedPlan === "annual" && (
                  <span className="block text-green-500 text-sm mt-1">{plans.annual.basic.saveText}</span>
                )}
              </div>
              <button className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-gray-50 p-5 border-t border-gray-200">
              <h3 className="font-medium mb-3">What's included:</h3>
              <ul className="space-y-2">
                {plans[selectedPlan].basic.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl border-2 border-blue-500 overflow-hidden shadow-md">
            <div className="bg-blue-500 py-1.5 text-center">
              <span className="text-white text-xs font-medium">RECOMMENDED</span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold mb-2">Pro</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold">{plans[selectedPlan].pro.price}</span>
                <span className="text-gray-500 text-sm">/{selectedPlan === "monthly" ? "month" : "year"}</span>
                {selectedPlan === "annual" && (
                  <span className="block text-green-500 text-sm mt-1">{plans.annual.pro.saveText}</span>
                )}
              </div>
              <button className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-gray-50 p-5 border-t border-gray-200">
              <h3 className="font-medium mb-3">What's included:</h3>
              <ul className="space-y-2">
                {plans[selectedPlan].pro.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden mb-6">
            <div className="p-5">
              <h2 className="text-lg font-bold mb-2">Enterprise</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold">{plans[selectedPlan].enterprise.price}</span>
                <span className="text-gray-500 text-sm">/{selectedPlan === "monthly" ? "month" : "year"}</span>
                {selectedPlan === "annual" && (
                  <span className="block text-green-500 text-sm mt-1">{plans.annual.enterprise.saveText}</span>
                )}
              </div>
              <button className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-gray-50 p-5 border-t border-gray-200">
              <h3 className="font-medium mb-3">What's included:</h3>
              <ul className="space-y-2">
                {plans[selectedPlan].enterprise.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Money-back guarantee */}
      <div className="px-5 pb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center">
          <svg
            className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          <span className="text-sm">30-day money-back guarantee. No questions asked.</span>
        </div>
      </div>
    </div>
  )
}

