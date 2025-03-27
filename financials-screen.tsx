"use client"

import { useState, useEffect } from "react"

interface FinancialsScreenProps {
  handleBack: () => void
}

// Define types for our data
interface FinancialCategory {
  category: string
  amount: number
  percentage: number
}

interface Transaction {
  id: number
  description: string
  amount: number
  date: string
  category: string
}

interface FinancialData {
  overview: {
    netWorth: number
    monthlyIncome: number
    monthlyExpenses: number
    savings: number
    investments: number
    debt: number
    savingsRate: number
    creditScore: number
  }
  income: FinancialCategory[]
  expenses: FinancialCategory[]
  investments: FinancialCategory[]
  recentTransactions: Transaction[]
}

export default function FinancialsScreen({ handleBack }: FinancialsScreenProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "income" | "expenses" | "investments">("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Initialize with sample data or load from localStorage
  const [financialData, setFinancialData] = useState<FinancialData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("aether-financial-data")
      if (savedData) {
        return JSON.parse(savedData)
      }
    }

    // Sample financial data as fallback
    return {
      overview: {
        netWorth: 215750,
        monthlyIncome: 12500,
        monthlyExpenses: 7325,
        savings: 68000,
        investments: 118000,
        debt: 45000,
        savingsRate: 28,
        creditScore: 795,
      },
      income: [
        { category: "Salary", amount: 9500, percentage: 76 },
        { category: "Investments", amount: 1200, percentage: 9.6 },
        { category: "Side Business", amount: 1500, percentage: 12 },
        { category: "Other", amount: 300, percentage: 2.4 },
      ],
      expenses: [
        { category: "Housing", amount: 2800, percentage: 38.2 },
        { category: "Transportation", amount: 650, percentage: 8.9 },
        { category: "Food", amount: 850, percentage: 11.6 },
        { category: "Utilities", amount: 375, percentage: 5.1 },
        { category: "Insurance", amount: 450, percentage: 6.1 },
        { category: "Entertainment", amount: 400, percentage: 5.5 },
        { category: "Shopping", amount: 500, percentage: 6.8 },
        { category: "Debt Payments", amount: 800, percentage: 10.9 },
        { category: "Savings", amount: 500, percentage: 6.8 },
      ],
      investments: [
        { category: "Stocks", amount: 58000, percentage: 49.2 },
        { category: "Bonds", amount: 18000, percentage: 15.3 },
        { category: "Real Estate", amount: 25000, percentage: 21.2 },
        { category: "Crypto", amount: 12000, percentage: 10.2 },
        { category: "Cash", amount: 5000, percentage: 4.2 },
      ],
      recentTransactions: [
        { id: 1, description: "Amazon Purchase", amount: -95.67, date: "Today", category: "Shopping" },
        { id: 2, description: "Salary Deposit", amount: 4750.0, date: "Yesterday", category: "Income" },
        { id: 3, description: "Starbucks", amount: -5.43, date: "Yesterday", category: "Food" },
        { id: 4, description: "Uber Ride", amount: -24.15, date: "2 days ago", category: "Transportation" },
        { id: 5, description: "Grocery Store", amount: -132.41, date: "3 days ago", category: "Food" },
      ],
    }
  })

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aether-financial-data", JSON.stringify(financialData))
    }
  }, [financialData])

  // Calculate total income and expenses
  const totalIncome = financialData.income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = financialData.expenses.reduce((sum, item) => sum + item.amount, 0)
  const totalInvestments = financialData.investments.reduce((sum, item) => sum + item.amount, 0)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format currency with decimals
  const formatCurrencyWithDecimals = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Function to update overview data
  const updateOverview = (newOverview) => {
    setFinancialData({
      ...financialData,
      overview: {
        ...financialData.overview,
        ...newOverview,
      },
    })
    setIsEditing(false)
    setEditingItem(null)
  }

  // Function to add a new income source
  const addIncome = (newIncome) => {
    // Recalculate percentages
    const newTotal = totalIncome + newIncome.amount
    const updatedIncome = financialData.income.map((item) => ({
      ...item,
      percentage: Number.parseFloat(((item.amount / newTotal) * 100).toFixed(1)),
    }))

    // Add new income with calculated percentage
    updatedIncome.push({
      ...newIncome,
      percentage: Number.parseFloat(((newIncome.amount / newTotal) * 100).toFixed(1)),
    })

    // Update overview
    const newMonthlyIncome = updatedIncome.reduce((sum, item) => sum + item.amount, 0)

    setFinancialData({
      ...financialData,
      income: updatedIncome,
      overview: {
        ...financialData.overview,
        monthlyIncome: newMonthlyIncome,
        savingsRate: Math.round(((newMonthlyIncome - financialData.overview.monthlyExpenses) / newMonthlyIncome) * 100),
      },
    })

    setShowAddModal(false)
    setEditingItem(null)
  }

  // Function to add a new expense
  const addExpense = (newExpense) => {
    // Recalculate percentages
    const newTotal = totalExpenses + newExpense.amount
    const updatedExpenses = financialData.expenses.map((item) => ({
      ...item,
      percentage: Number.parseFloat(((item.amount / newTotal) * 100).toFixed(1)),
    }))

    // Add new expense with calculated percentage
    updatedExpenses.push({
      ...newExpense,
      percentage: Number.parseFloat(((newExpense.amount / newTotal) * 100).toFixed(1)),
    })

    // Update overview
    const newMonthlyExpenses = updatedExpenses.reduce((sum, item) => sum + item.amount, 0)

    setFinancialData({
      ...financialData,
      expenses: updatedExpenses,
      overview: {
        ...financialData.overview,
        monthlyExpenses: newMonthlyExpenses,
        savingsRate: Math.round(
          ((financialData.overview.monthlyIncome - newMonthlyExpenses) / financialData.overview.monthlyIncome) * 100,
        ),
      },
    })

    setShowAddModal(false)
    setEditingItem(null)
  }

  // Function to add a new investment
  const addInvestment = (newInvestment) => {
    // Recalculate percentages
    const newTotal = totalInvestments + newInvestment.amount
    const updatedInvestments = financialData.investments.map((item) => ({
      ...item,
      percentage: Number.parseFloat(((item.amount / newTotal) * 100).toFixed(1)),
    }))

    // Add new investment with calculated percentage
    updatedInvestments.push({
      ...newInvestment,
      percentage: Number.parseFloat(((newInvestment.amount / newTotal) * 100).toFixed(1)),
    })

    // Update overview
    const newInvestmentsTotal = updatedInvestments.reduce((sum, item) => sum + item.amount, 0)

    setFinancialData({
      ...financialData,
      investments: updatedInvestments,
      overview: {
        ...financialData.overview,
        investments: newInvestmentsTotal,
        netWorth: financialData.overview.savings + newInvestmentsTotal - financialData.overview.debt,
      },
    })

    setShowAddModal(false)
    setEditingItem(null)
  }

  // Function to add a new transaction
  const addTransaction = (newTransaction) => {
    const newId =
      financialData.recentTransactions.length > 0
        ? Math.max(...financialData.recentTransactions.map((t) => t.id)) + 1
        : 1

    const updatedTransactions = [
      {
        ...newTransaction,
        id: newId,
      },
      ...financialData.recentTransactions,
    ]

    // Limit to 10 most recent transactions
    if (updatedTransactions.length > 10) {
      updatedTransactions.pop()
    }

    setFinancialData({
      ...financialData,
      recentTransactions: updatedTransactions,
    })

    setShowAddModal(false)
    setEditingItem(null)
  }

  // Function to delete an income source
  const deleteIncome = (category) => {
    const itemToDelete = financialData.income.find((item) => item.category === category)
    if (!itemToDelete) return

    // Remove the item
    const updatedIncome = financialData.income.filter((item) => item.category !== category)

    // Recalculate percentages
    const newTotal = updatedIncome.reduce((sum, item) => sum + item.amount, 0)
    const recalculatedIncome = updatedIncome.map((item) => ({
      ...item,
      percentage: Number.parseFloat(((item.amount / newTotal) * 100).toFixed(1)),
    }))

    // Update overview
    const newMonthlyIncome = recalculatedIncome.reduce((sum, item) => sum + item.amount, 0)

    setFinancialData({
      ...financialData,
      income: recalculatedIncome,
      overview: {
        ...financialData.overview,
        monthlyIncome: newMonthlyIncome,
        savingsRate: Math.round(((newMonthlyIncome - financialData.overview.monthlyExpenses) / newMonthlyIncome) * 100),
      },
    })
  }

  // Function to delete an expense
  const deleteExpense = (category) => {
    const itemToDelete = financialData.expenses.find((item) => item.category === category)
    if (!itemToDelete) return

    // Remove the item
    const updatedExpenses = financialData.expenses.filter((item) => item.category !== category)

    // Recalculate percentages
    const newTotal = updatedExpenses.reduce((sum, item) => sum + item.amount, 0)
    const recalculatedExpenses = updatedExpenses.map((item) => ({
      ...item,
      percentage: Number.parseFloat(((item.amount / newTotal) * 100).toFixed(1)),
    }))

    // Update overview
    const newMonthlyExpenses = recalculatedExpenses.reduce((sum, item) => sum + item.amount, 0)

    setFinancialData({
      ...financialData,
      expenses: recalculatedExpenses,
      overview: {
        ...financialData.overview,
        monthlyExpenses: newMonthlyExpenses,
        savingsRate: Math.round(
          ((financialData.overview.monthlyIncome - newMonthlyExpenses) / financialData.overview.monthlyIncome) * 100,
        ),
      },
    })
  }

  // Function to delete an investment
  const deleteInvestment = (category) => {
    const itemToDelete = financialData.investments.find((item) => item.category === category)
    if (!itemToDelete) return

    // Remove the item
    const updatedInvestments = financialData.investments.filter((item) => item.category !== category)

    // Recalculate percentages
    const newTotal = updatedInvestments.reduce((sum, item) => sum + item.amount, 0)
    const recalculatedInvestments = updatedInvestments.map((item) => ({
      ...item,
      percentage: Number.parseFloat(((item.amount / newTotal) * 100).toFixed(1)),
    }))

    // Update overview
    const newInvestmentsTotal = recalculatedInvestments.reduce((sum, item) => sum + item.amount, 0)

    setFinancialData({
      ...financialData,
      investments: recalculatedInvestments,
      overview: {
        ...financialData.overview,
        investments: newInvestmentsTotal,
        netWorth: financialData.overview.savings + newInvestmentsTotal - financialData.overview.debt,
      },
    })
  }

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    setFinancialData({
      ...financialData,
      recentTransactions: financialData.recentTransactions.filter((t) => t.id !== id),
    })
  }

  // Function to handle starting the edit process
  const handleEdit = (type, data) => {
    setEditingItem({ type, ...data })
    setIsEditing(true)
  }

  // Function to handle adding a new item
  const handleAdd = (type) => {
    setEditingItem({ type })
    setShowAddModal(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <div className="flex items-center">
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
          <h1 className="text-xl font-bold ml-4">Financial Dashboard</h1>
        </div>

        <button
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          onClick={() => {
            if (activeTab === "overview") {
              handleEdit("overview", financialData.overview)
            } else {
              handleAdd(activeTab)
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {activeTab === "overview" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            )}
          </svg>
        </button>
      </header>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === "overview" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === "income" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("income")}
          >
            Income
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === "expenses" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              activeTab === "investments" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("investments")}
          >
            Invest
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 px-5 overflow-y-auto pb-4">
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Net Worth */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-gray-500">Net Worth</h3>
                <div className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded-full">+5.2% MTD</div>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(financialData.overview.netWorth)}</p>

              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Assets</p>
                  <p className="text-base font-semibold text-green-600">
                    {formatCurrency(financialData.overview.savings + financialData.overview.investments)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Liabilities</p>
                  <p className="text-base font-semibold text-red-500">{formatCurrency(financialData.overview.debt)}</p>
                </div>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-base font-medium text-gray-500 mb-3">Monthly Summary</h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-600 mb-1">Income</p>
                  <p className="text-base font-semibold">{formatCurrency(financialData.overview.monthlyIncome)}</p>
                </div>

                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs text-red-600 mb-1">Expenses</p>
                  <p className="text-base font-semibold">{formatCurrency(financialData.overview.monthlyExpenses)}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 mb-1">Savings</p>
                  <p className="text-base font-semibold">{financialData.overview.savingsRate}%</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-base font-medium text-gray-500 mb-3">Quick Stats</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Savings</p>
                    <p className="text-sm font-semibold">{formatCurrency(financialData.overview.savings)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Investments</p>
                    <p className="text-sm font-semibold">{formatCurrency(financialData.overview.investments)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Debt</p>
                    <p className="text-sm font-semibold">{formatCurrency(financialData.overview.debt)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Credit Score</p>
                    <p className="text-sm font-semibold">{financialData.overview.creditScore}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-medium text-gray-500">Recent Transactions</h3>
                <button className="text-xs text-blue-600" onClick={() => handleAdd("transaction")}>
                  Add Transaction
                </button>
              </div>

              <div className="space-y-3">
                {financialData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between group">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {transaction.category === "Income"
                          ? "$"
                          : transaction.category === "Food"
                            ? "🍽️"
                            : transaction.category === "Shopping"
                              ? "🛒"
                              : transaction.category === "Transportation"
                                ? "🚗"
                                : "💼"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p
                        className={`text-sm font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-gray-800"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrencyWithDecimals(transaction.amount)}
                      </p>
                      <button
                        className="ml-2 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteTransaction(transaction.id)
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {financialData.recentTransactions.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No transactions yet</p>
                    <button className="mt-2 text-sm text-blue-600" onClick={() => handleAdd("transaction")}>
                      Add your first transaction
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "income" && (
          <div className="space-y-4">
            {/* Income Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-gray-500">Monthly Income</h3>
                <button className="text-xs text-blue-600" onClick={() => handleAdd("income")}>
                  Add Income Source
                </button>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>

              <div className="mt-4 space-y-3">
                {financialData.income.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{item.category}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                        <button
                          className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteIncome(item.category)}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total</p>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg text-sm"
                onClick={() => handleAdd("income")}
              >
                Add Income Source
              </button>
            </div>

            {/* Income History */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-base font-medium text-gray-500 mb-3">Income History</h3>

              <div className="flex items-end">
                <div className="flex-1 flex items-end space-x-2">
                  <div className="bg-blue-100 rounded w-8 h-28"></div>
                  <div className="bg-blue-200 rounded w-8 h-36"></div>
                  <div className="bg-blue-300 rounded w-8 h-32"></div>
                  <div className="bg-blue-400 rounded w-8 h-40"></div>
                  <div className="bg-blue-500 rounded w-8 h-48"></div>
                  <div className="bg-blue-400 rounded w-8 h-52"></div>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Jun</span>
                <span className="text-xs text-gray-500">Jul</span>
                <span className="text-xs text-gray-500">Aug</span>
                <span className="text-xs text-gray-500">Sep</span>
                <span className="text-xs text-gray-500">Oct</span>
                <span className="text-xs text-gray-500">Nov</span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Month over Month</p>
                    <p className="text-xs text-gray-500">Nov vs Oct</p>
                  </div>
                  <div className="text-sm font-semibold text-green-600">+8.3%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "expenses" && (
          <div className="space-y-4">
            {/* Expenses Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-gray-500">Monthly Expenses</h3>
                <button className="text-xs text-blue-600" onClick={() => handleAdd("expense")}>
                  Add Expense
                </button>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>

              <div className="mt-4 space-y-3">
                {financialData.expenses.map((item, idx) => (
                  <div key={idx} className="flex items-center group">
                    <div
                      className={`w-2 h-8 rounded-full mr-3 ${
                        item.category === "Housing"
                          ? "bg-red-500"
                          : item.category === "Food"
                            ? "bg-green-500"
                            : item.category === "Transportation"
                              ? "bg-blue-500"
                              : item.category === "Utilities"
                                ? "bg-yellow-500"
                                : item.category === "Debt Payments"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm">{item.category}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                          <button
                            className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteExpense(item.category)}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            item.category === "Housing"
                              ? "bg-red-500"
                              : item.category === "Food"
                                ? "bg-green-500"
                                : item.category === "Transportation"
                                  ? "bg-blue-500"
                                  : item.category === "Utilities"
                                    ? "bg-yellow-500"
                                    : item.category === "Debt Payments"
                                      ? "bg-purple-500"
                                      : "bg-gray-500"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg text-sm"
                onClick={() => handleAdd("expense")}
              >
                Add Expense
              </button>
            </div>

            {/* Spending Insights */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-base font-medium text-gray-500 mb-3">Spending Insights</h3>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="text-sm font-medium text-blue-800">Food spending is 12% higher than last month</p>
                  </div>
                  <p className="text-xs text-blue-600 mt-1 ml-6">Consider meal planning to reduce costs</p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-sm font-medium text-green-800">Entertainment spending decreased by 15%</p>
                  </div>
                  <p className="text-xs text-green-600 mt-1 ml-6">Great job sticking to your budget!</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                    <p className="text-sm font-medium text-yellow-800">Shopping expenses near monthly limit</p>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1 ml-6">You've used 85% of your shopping budget</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "investments" && (
          <div className="space-y-4">
            {/* Investment Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-gray-500">Total Investments</h3>
                <div className="text-xs font-medium px-2 py-1 bg-green-100 text-green-600 rounded-full">+12.8% YTD</div>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(financialData.overview.investments)}</p>

              {/* Donut Chart (Simplified) */}
              <div className="my-4 flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Circle segments would be here in a real app */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="20" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray="94.2"
                      strokeDashoffset="251.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="20"
                      strokeDasharray="62.8"
                      strokeDashoffset="345.4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="20"
                      strokeDasharray="37.7"
                      strokeDashoffset="408.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="20"
                      strokeDasharray="25.1"
                      strokeDashoffset="445.9"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Annual Return</p>
                      <p className="text-lg font-bold text-green-600">+15.2%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Allocation */}
              <div className="space-y-2">
                {financialData.investments.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          item.category === "Stocks"
                            ? "bg-blue-500"
                            : item.category === "Bonds"
                              ? "bg-green-500"
                              : item.category === "Real Estate"
                                ? "bg-purple-500"
                                : item.category === "Crypto"
                                  ? "bg-amber-500"
                                  : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{formatCurrency(item.amount)}</span>
                      <span className="text-xs text-gray-500 mr-2">{item.percentage}%</span>
                      <button
                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteInvestment(item.category)}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg text-sm"
                onClick={() => handleAdd("investment")}
              >
                Add Investment
              </button>
            </div>

            {/* Investment Opportunities */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-base font-medium text-gray-500 mb-3">Investment Opportunities</h3>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-xs font-bold">ETF</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Diversified ETF Portfolio</p>
                        <p className="text-xs text-gray-500">Low Risk • 8-10% Est. Return</p>
                      </div>
                    </div>
                    <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">Learn More</button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-xs font-bold">ESG</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sustainable Investing</p>
                        <p className="text-xs text-gray-500">Medium Risk • 10-12% Est. Return</p>
                      </div>
                    </div>
                    <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">Learn More</button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 text-xs font-bold">REIT</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Real Estate Investment Trust</p>
                        <p className="text-xs text-gray-500">Medium Risk • 7-9% Est. Return</p>
                      </div>
                    </div>
                    <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">Learn More</button>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg text-sm">
                See All Opportunities
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(isEditing || showAddModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {isEditing ? "Edit" : "Add"}{" "}
                  {editingItem?.type === "overview"
                    ? "Financial Overview"
                    : editingItem?.type === "income"
                      ? "Income Source"
                      : editingItem?.type === "expense"
                        ? "Expense"
                        : editingItem?.type === "investment"
                          ? "Investment"
                          : "Transaction"}
                </h3>
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => {
                    setIsEditing(false)
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Overview Form */}
              {editingItem?.type === "overview" && (
                <OverviewForm
                  initialData={editingItem}
                  onSubmit={updateOverview}
                  onCancel={() => {
                    setIsEditing(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Income Form */}
              {editingItem?.type === "income" && (
                <IncomeForm
                  onSubmit={addIncome}
                  onCancel={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Expense Form */}
              {editingItem?.type === "expense" && (
                <ExpenseForm
                  onSubmit={addExpense}
                  onCancel={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Investment Form */}
              {editingItem?.type === "investment" && (
                <InvestmentForm
                  onSubmit={addInvestment}
                  onCancel={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Transaction Form */}
              {editingItem?.type === "transaction" && (
                <TransactionForm
                  onSubmit={addTransaction}
                  onCancel={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Overview Form Component
function OverviewForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    netWorth: initialData?.netWorth || 0,
    monthlyIncome: initialData?.monthlyIncome || 0,
    monthlyExpenses: initialData?.monthlyExpenses || 0,
    savings: initialData?.savings || 0,
    investments: initialData?.investments || 0,
    debt: initialData?.debt || 0,
    savingsRate: initialData?.savingsRate || 0,
    creditScore: initialData?.creditScore || 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "creditScore" || name === "savingsRate" ? Number.parseInt(value) : Number.parseFloat(value),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses</label>
          <input
            type="number"
            name="monthlyExpenses"
            value={formData.monthlyExpenses}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Savings</label>
          <input
            type="number"
            name="savings"
            value={formData.savings}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investments</label>
          <input
            type="number"
            name="investments"
            value={formData.investments}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Debt</label>
          <input
            type="number"
            name="debt"
            value={formData.debt}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
          <input
            type="number"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="300"
            max="850"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            Update Overview
          </button>
        </div>
      </div>
    </form>
  )
}

// Income Form Component
function IncomeForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "amount" ? (value === "" ? "" : Number.parseFloat(value)) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      category: formData.category,
      amount: Number.parseFloat(formData.amount),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Income Source</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Salary, Investments, Side Business"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="100"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            Add Income
          </button>
        </div>
      </div>
    </form>
  )
}

// Expense Form Component
function ExpenseForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "amount" ? (value === "" ? "" : Number.parseFloat(value)) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      category: formData.category,
      amount: Number.parseFloat(formData.amount),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expense Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Housing, Food, Transportation"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="10"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            Add Expense
          </button>
        </div>
      </div>
    </form>
  )
}

// Investment Form Component
function InvestmentForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "amount" ? (value === "" ? "" : Number.parseFloat(value)) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      category: formData.category,
      amount: Number.parseFloat(formData.amount),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Investment Type</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Stocks, Bonds, Real Estate"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="1000"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            Add Investment
          </button>
        </div>
      </div>
    </form>
  )
}

// Transaction Form Component
function TransactionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: "Today",
    category: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "amount" ? (value === "" ? "" : Number.parseFloat(value)) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      description: formData.description,
      amount: Number.parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Grocery Shopping, Rent Payment"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Use negative for expenses, positive for income"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="e.g., Today, Yesterday, 2 days ago"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Food, Shopping, Income"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            Add Transaction
          </button>
        </div>
      </div>
    </form>
  )
}

