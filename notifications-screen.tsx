"use client"

interface NotificationsScreenProps {
  handleBack: () => void
}

export default function NotificationsScreen({ handleBack }: NotificationsScreenProps) {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "connection",
      title: "Jane Cooper wants to connect",
      time: "Just now",
      read: false,
      image: "J",
      action: "Accept",
    },
    {
      id: 2,
      type: "message",
      title: "New message from Alex Morgan",
      preview: "Hey, I saw your profile and wanted to discuss...",
      time: "2 hours ago",
      read: false,
      image: "A",
    },
    {
      id: 3,
      type: "event",
      title: "Upcoming event: Career Fair 2023",
      time: "Tomorrow, 10:00 AM",
      read: true,
      image: "📅",
    },
    {
      id: 4,
      type: "recommendation",
      title: "We've found jobs matching your profile",
      preview: "5 new job opportunities in your area",
      time: "Yesterday",
      read: true,
      image: "💼",
    },
    {
      id: 5,
      type: "learning",
      title: "New course recommendation",
      preview: "Advanced Product Management - based on your interests",
      time: "2 days ago",
      read: true,
      image: "📚",
    },
    {
      id: 6,
      type: "connection",
      title: "David Lee accepted your connection",
      time: "3 days ago",
      read: true,
      image: "D",
    },
    {
      id: 7,
      type: "profile",
      title: "Your profile is getting noticed",
      preview: "Your profile appeared in 45 searches this week",
      time: "1 week ago",
      read: true,
      image: "📊",
    },
  ]

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
          <h1 className="text-xl font-bold ml-4">Notifications</h1>
        </div>

        <button className="text-blue-500 text-sm font-medium">Mark all read</button>
      </header>

      {/* Filter Tabs */}
      <div className="px-5 mb-4">
        <div className="flex overflow-x-auto hide-scrollbar space-x-2">
          <button className="bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            All
          </button>

          <button className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            Connections
          </button>
          <button className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            Messages
          </button>
          <button className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            Events
          </button>
          <button className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            Jobs
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 px-5 overflow-y-auto">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl p-4 ${!notification.read ? "border-l-4 border-blue-500" : ""}`}
            >
              <div className="flex">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    typeof notification.image === "string" && notification.image.length === 1
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "bg-gray-100"
                  }`}
                >
                  {notification.image}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-sm ${!notification.read ? "font-bold" : "font-medium"}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-400 ml-2">{notification.time}</span>
                  </div>

                  {notification.preview && <p className="text-xs text-gray-500 mt-1">{notification.preview}</p>}

                  {notification.action && (
                    <button className="mt-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-lg">
                      {notification.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

