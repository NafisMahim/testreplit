"use client"

import { useState, useEffect } from "react"

interface LocationsScreenProps {
  handleBack: () => void
}

// Define types for our data
interface SavedLocation {
  id: number
  name: string
  type: string
  rating: number
  details: {
    [key: string]: string | number
  }
  notes: string
  image: string
}

interface HistoryLocation {
  id: number
  name: string
  period: string
  role: string
  highlights: string[]
  image: string
}

interface ExploreLocation {
  id: number
  name: string
  match: string
  details: {
    [key: string]: string
  }
  reasons: string[]
  image: string
}

interface LocationsData {
  saved: SavedLocation[]
  history: HistoryLocation[]
  explore: ExploreLocation[]
}

export default function LocationsScreen({ handleBack }: LocationsScreenProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "history" | "explore">("saved")
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Initialize with sample data or load from localStorage
  const [locationsData, setLocationsData] = useState<LocationsData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("aether-locations-data")
      if (savedData) {
        return JSON.parse(savedData)
      }
    }

    // Sample locations data as fallback
    return {
      saved: [
        {
          id: 1,
          name: "San Francisco Bay Area",
          type: "Home",
          rating: 4.8,
          details: {
            costOfLiving: "Very High",
            avgSalary: "$135,000",
            jobMarket: "Excellent",
            qualityOfLife: 4.5,
            industry: "Technology",
            climate: "Mild",
          },
          notes: "Current home base. Great tech scene but high cost of living.",
          image: "🌉",
        },
        {
          id: 2,
          name: "New York City",
          type: "Work Interest",
          rating: 4.5,
          details: {
            costOfLiving: "Very High",
            avgSalary: "$142,000",
            jobMarket: "Excellent",
            qualityOfLife: 4.0,
            industry: "Finance, Media, Tech",
            climate: "Four Seasons",
          },
          notes: "Considering for next career move. Strong finance and tech sectors.",
          image: "🗽",
        },
        {
          id: 3,
          name: "Austin, TX",
          type: "Future Home",
          rating: 4.6,
          details: {
            costOfLiving: "Moderate",
            avgSalary: "$110,000",
            jobMarket: "Very Good",
            qualityOfLife: 4.7,
            industry: "Technology, Manufacturing",
            climate: "Hot Summers",
          },
          notes: "Considering for relocation in next 2-3 years. Good balance of tech jobs and cost of living.",
          image: "🤠",
        },
        {
          id: 4,
          name: "Seattle, WA",
          type: "Work Interest",
          rating: 4.4,
          details: {
            costOfLiving: "High",
            avgSalary: "$125,000",
            jobMarket: "Excellent",
            qualityOfLife: 4.3,
            industry: "Technology, Aerospace",
            climate: "Rainy",
          },
          notes: "Good tech hub alternative to SF. Amazon and Microsoft presence.",
          image: "☔",
        },
      ],
      history: [
        {
          id: 1,
          name: "Boston, MA",
          period: "2016-2019",
          role: "Education",
          highlights: ["Graduated from MIT", "Internship at Boston Consulting Group"],
          image: "🎓",
        },
        {
          id: 2,
          name: "Chicago, IL",
          period: "2014-2016",
          role: "First Job",
          highlights: ["Entry-level position at Tribune Media", "Built network in digital media"],
          image: "🏙️",
        },
        {
          id: 3,
          name: "Los Angeles, CA",
          period: "Summer 2015",
          role: "Internship",
          highlights: ["Summer internship at Disney", "Entertainment industry exposure"],
          image: "🎬",
        },
      ],
      explore: [
        {
          id: 1,
          name: "Denver, CO",
          match: "94% Match",
          details: {
            costOfLiving: "Moderate",
            jobGrowth: "12% (Tech)",
            lifestyle: "Outdoor activities",
            salary: "$105,000 avg",
          },
          reasons: ["Growing tech hub", "Outdoor lifestyle", "Lower cost than SF or NYC"],
          image: "⛰️",
        },
        {
          id: 2,
          name: "Singapore",
          match: "88% Match",
          details: {
            costOfLiving: "High",
            jobGrowth: "15% (Finance/Tech)",
            lifestyle: "Urban, International",
            salary: "$120,000 avg",
          },
          reasons: ["International experience", "Gateway to Asia markets", "Strong financial sector"],
          image: "🇸🇬",
        },
        {
          id: 3,
          name: "Toronto, Canada",
          match: "86% Match",
          details: {
            costOfLiving: "High",
            jobGrowth: "10% (Tech/Finance)",
            lifestyle: "Urban, Multicultural",
            salary: "$95,000 avg",
          },
          reasons: ["Growing tech scene", "Quality healthcare", "Multicultural environment"],
          image: "🇨🇦",
        },
      ],
    }
  })

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aether-locations-data", JSON.stringify(locationsData))
    }
  }, [locationsData])

  // Filter locations based on search query
  const filteredSaved = locationsData.saved.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredExplore = locationsData.explore.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to add a new saved location
  const addSavedLocation = (newLocation: Omit<SavedLocation, "id">) => {
    const newId = locationsData.saved.length > 0 ? Math.max(...locationsData.saved.map((item) => item.id)) + 1 : 1

    setLocationsData({
      ...locationsData,
      saved: [
        ...locationsData.saved,
        {
          ...newLocation,
          id: newId,
        },
      ],
    })
    setShowAddModal(false)
    setEditingItem(null)
  }

  // Function to add a new history location
  const addHistoryLocation = (newLocation: Omit<HistoryLocation, "id">) => {
    const newId = locationsData.history.length > 0 ? Math.max(...locationsData.history.map((item) => item.id)) + 1 : 1

    setLocationsData({
      ...locationsData,
      history: [
        ...locationsData.history,
        {
          ...newLocation,
          id: newId,
        },
      ],
    })
    setShowAddModal(false)
    setEditingItem(null)
  }

  // Function to save an explore location to saved locations
  const saveExploreLocation = (exploreLocation: ExploreLocation) => {
    const newId = locationsData.saved.length > 0 ? Math.max(...locationsData.saved.map((item) => item.id)) + 1 : 1

    // Convert explore location to saved location format
    const newSavedLocation: SavedLocation = {
      id: newId,
      name: exploreLocation.name,
      type: "Interest",
      rating: 4.0,
      details: {
        ...exploreLocation.details,
        qualityOfLife: 4.0,
      },
      notes: exploreLocation.reasons.join(". "),
      image: exploreLocation.image,
    }

    setLocationsData({
      ...locationsData,
      saved: [...locationsData.saved, newSavedLocation],
    })

    // Show confirmation and return to list
    alert(`${exploreLocation.name} has been added to your saved locations!`)
    setSelectedLocation(null)
  }

  // Function to update a saved location
  const updateSavedLocation = (updatedLocation: SavedLocation) => {
    setLocationsData({
      ...locationsData,
      saved: locationsData.saved.map((location) => (location.id === updatedLocation.id ? updatedLocation : location)),
    })
    setIsEditing(false)
    setEditingItem(null)

    // If we're updating the currently selected location, update that too
    if (selectedLocation && selectedLocation.id === updatedLocation.id) {
      setSelectedLocation(updatedLocation)
    }
  }

  // Function to update a history location
  const updateHistoryLocation = (updatedLocation: HistoryLocation) => {
    setLocationsData({
      ...locationsData,
      history: locationsData.history.map((location) =>
        location.id === updatedLocation.id ? updatedLocation : location,
      ),
    })
    setIsEditing(false)
    setEditingItem(null)

    // If we're updating the currently selected location, update that too
    if (selectedLocation && selectedLocation.id === updatedLocation.id) {
      setSelectedLocation(updatedLocation)
    }
  }

  // Function to delete a saved location
  const deleteSavedLocation = (id: number) => {
    setLocationsData({
      ...locationsData,
      saved: locationsData.saved.filter((location) => location.id !== id),
    })

    // If we're deleting the currently selected location, go back to the list
    if (selectedLocation && selectedLocation.id === id) {
      setSelectedLocation(null)
    }
  }

  // Function to delete a history location
  const deleteHistoryLocation = (id: number) => {
    setLocationsData({
      ...locationsData,
      history: locationsData.history.filter((location) => location.id !== id),
    })

    // If we're deleting the currently selected location, go back to the list
    if (selectedLocation && selectedLocation.id === id) {
      setSelectedLocation(null)
    }
  }

  // Function to handle starting the edit process
  const handleEdit = (type: "saved" | "history", id: number) => {
    let itemToEdit

    if (type === "saved") {
      itemToEdit = locationsData.saved.find((item) => item.id === id)
    } else if (type === "history") {
      itemToEdit = locationsData.history.find((item) => item.id === id)
    }

    if (itemToEdit) {
      setEditingItem({ ...itemToEdit, type })
      setIsEditing(true)
    }
  }

  // Function to handle adding a new item
  const handleAdd = (type: "saved" | "history") => {
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
          <h1 className="text-xl font-bold ml-4">Locations</h1>
        </div>

        {!selectedLocation && (
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => handleAdd(activeTab === "saved" ? "saved" : "history")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        )}
      </header>

      {selectedLocation ? (
        // Location Detail View
        <div className="flex-1 overflow-y-auto">
          {/* Location Header */}
          <div className="px-5 mb-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mr-4">
                    {selectedLocation.image}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                    <p className="text-sm text-gray-500">{selectedLocation.type || ""}</p>
                  </div>
                </div>

                {selectedLocation.rating && (
                  <div className="bg-blue-50 px-2 py-1 rounded-lg flex items-center">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-sm font-medium">{selectedLocation.rating}</span>
                  </div>
                )}
              </div>

              {selectedLocation.match && (
                <div className="mt-3 bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full inline-block">
                  {selectedLocation.match}
                </div>
              )}

              {selectedLocation.period && (
                <div className="mt-3 text-sm">
                  <span className="text-gray-500">Period: </span>
                  <span className="font-medium">{selectedLocation.period}</span>
                  {selectedLocation.role && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-gray-500">Role: </span>
                      <span className="font-medium">{selectedLocation.role}</span>
                    </>
                  )}
                </div>
              )}

              {selectedLocation.notes && (
                <p className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Notes: </span>
                  {selectedLocation.notes}
                </p>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="px-5 mb-4">
            {selectedLocation.details && (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h3 className="text-base font-semibold mb-3">Location Details</h3>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedLocation.details).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedLocation.highlights && (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h3 className="text-base font-semibold mb-3">Highlights</h3>

                <ul className="space-y-2">
                  {selectedLocation.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedLocation.reasons && (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h3 className="text-base font-semibold mb-3">Why This Matches You</h3>

                <ul className="space-y-2">
                  {selectedLocation.reasons.map((reason: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Map Section (Simplified) */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h3 className="text-base font-semibold mb-3">Location Map</h3>

              <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl block mb-2">🗺️</span>
                  <span className="text-sm text-gray-500 block">Map view would appear here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-5 pb-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                className="py-3 bg-white border border-gray-300 rounded-lg font-medium text-sm"
                onClick={() => setSelectedLocation(null)}
              >
                Back to List
              </button>

              {activeTab === "saved" ? (
                <button
                  className="py-3 bg-blue-500 text-white rounded-lg font-medium text-sm"
                  onClick={() => handleEdit("saved", selectedLocation.id)}
                >
                  Edit Location
                </button>
              ) : activeTab === "explore" ? (
                <button
                  className="py-3 bg-blue-500 text-white rounded-lg font-medium text-sm"
                  onClick={() => saveExploreLocation(selectedLocation)}
                >
                  Save Location
                </button>
              ) : (
                <button
                  className="py-3 bg-blue-500 text-white rounded-lg font-medium text-sm"
                  onClick={() => handleEdit("history", selectedLocation.id)}
                >
                  Edit History
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="px-5 mb-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md ${
                  activeTab === "saved" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("saved")}
              >
                Saved
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md ${
                  activeTab === "history" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md ${
                  activeTab === "explore" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("explore")}
              >
                Explore
              </button>
            </div>
          </div>

          {/* Search Bar (for Saved and Explore tabs) */}
          {activeTab !== "history" && (
            <div className="px-5 mb-4">
              <div className="relative">
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder={`Search ${activeTab === "saved" ? "saved locations" : "new locations"}...`}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="flex-1 px-5 overflow-y-auto pb-4">
            {activeTab === "saved" && (
              <div className="space-y-3">
                {filteredSaved.map((location) => (
                  <div
                    key={location.id}
                    className="bg-white rounded-xl shadow-sm p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors group"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-3 flex-shrink-0">
                      {location.image}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-semibold truncate">{location.name}</h3>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-sm">{location.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500">{location.type}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{location.notes}</p>
                    </div>

                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteSavedLocation(location.id)
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

                {filteredSaved.length === 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    {searchQuery ? (
                      <p className="text-gray-500">No locations match your search</p>
                    ) : (
                      <>
                        <p className="text-gray-500 mb-4">No saved locations yet</p>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                          onClick={() => handleAdd("saved")}
                        >
                          Add Your First Location
                        </button>
                      </>
                    )}
                  </div>
                )}

                <button
                  className="w-full py-3 mt-2 bg-gray-100 text-blue-600 text-sm font-medium rounded-lg flex items-center justify-center"
                  onClick={() => handleAdd("saved")}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add New Location
                </button>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-3">
                {locationsData.history.map((location) => (
                  <div
                    key={location.id}
                    className="bg-white rounded-xl shadow-sm p-4 flex cursor-pointer hover:bg-gray-50 transition-colors group"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-3 flex-shrink-0">
                      {location.image}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold">{location.name}</h3>
                      <p className="text-sm text-gray-500">{location.period}</p>
                      <p className="text-xs text-gray-600 mt-1">{location.role}</p>
                    </div>

                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteHistoryLocation(location.id)
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

                {locationsData.history.length === 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-gray-500 mb-4">No location history yet</p>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                      onClick={() => handleAdd("history")}
                    >
                      Add Location History
                    </button>
                  </div>
                )}

                <button
                  className="w-full py-3 mt-2 bg-gray-100 text-blue-600 text-sm font-medium rounded-lg flex items-center justify-center"
                  onClick={() => handleAdd("history")}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add Location History
                </button>
              </div>
            )}

            {activeTab === "explore" && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 mb-2">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Location Suggestions</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Based on your career path, interests, and preferences
                      </p>
                    </div>
                  </div>
                </div>

                {filteredExplore.map((location) => (
                  <div
                    key={location.id}
                    className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-3">
                        {location.image}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-base font-semibold">{location.name}</h3>
                          <div className="bg-green-50 px-2 py-1 rounded-full">
                            <span className="text-xs font-medium text-green-600">{location.match}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {Object.entries(location.details).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-2">
                          <p className="text-xs text-gray-500 mb-0.5">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </p>
                          <p className="text-xs font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-2 border border-blue-500 text-blue-600 rounded-lg text-xs font-medium">
                      View Details
                    </button>
                  </div>
                ))}

                {filteredExplore.length === 0 && searchQuery && (
                  <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-gray-500">No locations match your search</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      {(isEditing || showAddModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {isEditing ? "Edit" : "Add"} {editingItem?.type === "saved" ? "Location" : "Location History"}
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

              {/* Saved Location Form */}
              {editingItem?.type === "saved" && (
                <SavedLocationForm
                  initialData={editingItem}
                  onSubmit={isEditing ? updateSavedLocation : addSavedLocation}
                  onCancel={() => {
                    setIsEditing(false)
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* History Location Form */}
              {editingItem?.type === "history" && (
                <HistoryLocationForm
                  initialData={editingItem}
                  onSubmit={isEditing ? updateHistoryLocation : addHistoryLocation}
                  onCancel={() => {
                    setIsEditing(false)
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

// Saved Location Form Component
function SavedLocationForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    name: initialData?.name || "",
    type: initialData?.type || "Interest",
    rating: initialData?.rating || 4.0,
    details: initialData?.details || {
      costOfLiving: "",
      avgSalary: "",
      jobMarket: "",
      qualityOfLife: 4.0,
      industry: "",
      climate: "",
    },
    notes: initialData?.notes || "",
    image: initialData?.image || "📍",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDetailChange = (key, value) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [key]: value,
      },
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Home">Home</option>
            <option value="Work Interest">Work Interest</option>
            <option value="Future Home">Future Home</option>
            <option value="Interest">Interest</option>
            <option value="Vacation">Vacation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image (Emoji)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location Details</label>

          <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Cost of Living</label>
              <input
                type="text"
                value={formData.details.costOfLiving}
                onChange={(e) => handleDetailChange("costOfLiving", e.target.value)}
                placeholder="e.g., High, Moderate, Low"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Average Salary</label>
              <input
                type="text"
                value={formData.details.avgSalary}
                onChange={(e) => handleDetailChange("avgSalary", e.target.value)}
                placeholder="e.g., $100,000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Job Market</label>
              <input
                type="text"
                value={formData.details.jobMarket}
                onChange={(e) => handleDetailChange("jobMarket", e.target.value)}
                placeholder="e.g., Excellent, Good, Fair"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Industry</label>
              <input
                type="text"
                value={formData.details.industry}
                onChange={(e) => handleDetailChange("industry", e.target.value)}
                placeholder="e.g., Technology, Finance, Healthcare"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Climate</label>
              <input
                type="text"
                value={formData.details.climate}
                onChange={(e) => handleDetailChange("climate", e.target.value)}
                placeholder="e.g., Mild, Four Seasons, Tropical"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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
            {initialData?.id ? "Update" : "Add"} Location
          </button>
        </div>
      </div>
    </form>
  )
}

// History Location Form Component
function HistoryLocationForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    name: initialData?.name || "",
    period: initialData?.period || "",
    role: initialData?.role || "",
    highlights: initialData?.highlights || [""],
    image: initialData?.image || "📍",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.highlights]
    newHighlights[index] = value
    setFormData({
      ...formData,
      highlights: newHighlights,
    })
  }

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, ""],
    })
  }

  const removeHighlight = (index) => {
    const newHighlights = [...formData.highlights]
    newHighlights.splice(index, 1)
    setFormData({
      ...formData,
      highlights: newHighlights,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Filter out empty highlights
    const filteredHighlights = formData.highlights.filter((h) => h.trim() !== "")
    onSubmit({
      ...formData,
      highlights: filteredHighlights,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
          <input
            type="text"
            name="period"
            value={formData.period}
            onChange={handleChange}
            placeholder="e.g., 2018-2020, Summer 2019"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Education, First Job, Internship"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image (Emoji)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Highlights</label>
            <button type="button" className="text-xs text-blue-600 hover:text-blue-800" onClick={addHighlight}>
              + Add Highlight
            </button>
          </div>

          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter highlight"
              />
              {formData.highlights.length > 1 && (
                <button
                  type="button"
                  className="ml-2 p-1.5 text-gray-500 hover:text-red-500"
                  onClick={() => removeHighlight(index)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          ))}
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
            {initialData?.id ? "Update" : "Add"} Location History
          </button>
        </div>
      </div>
    </form>
  )
}

