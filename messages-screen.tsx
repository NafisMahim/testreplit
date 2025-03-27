"use client"

import { useState } from "react"

interface MessagesScreenProps {
  handleBack: () => void
}

export default function MessagesScreen({ handleBack }: MessagesScreenProps) {
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: "Alex Morgan",
      avatar: "A",
      lastMessage: "Hey, I'd love to connect about the product manager role",
      time: "10:32 AM",
      unread: 2,
      messages: [
        {
          id: 1,
          text: "Hey Richard, I saw your profile and I'm impressed with your product experience!",
          sender: "them",
          time: "10:15 AM",
        },
        {
          id: 2,
          text: "I'd love to connect about a Senior PM role we have open at my company.",
          sender: "them",
          time: "10:16 AM",
        },
        {
          id: 3,
          text: "Thanks Alex! I'd be happy to hear more about the opportunity.",
          sender: "me",
          time: "10:30 AM",
        },
        {
          id: 4,
          text: "Great! Are you available for a quick call tomorrow around 2 PM?",
          sender: "them",
          time: "10:32 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "S",
      lastMessage: "The project timeline looks good. I'll review the details and get back to you.",
      time: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hi Richard, just following up on the project proposal we discussed.",
          sender: "them",
          time: "Yesterday, 3:45 PM",
        },
        {
          id: 2,
          text: "I've attached the updated timeline for your review.",
          sender: "them",
          time: "Yesterday, 3:46 PM",
        },
        {
          id: 3,
          text: "Thanks Sarah. I'll take a look and get back to you tomorrow.",
          sender: "me",
          time: "Yesterday, 4:30 PM",
        },
        {
          id: 4,
          text: "The project timeline looks good. I'll review the details and get back to you.",
          sender: "them",
          time: "Yesterday, 5:15 PM",
        },
      ],
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "M",
      lastMessage: "Looking forward to our meeting next week!",
      time: "Monday",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hi Richard, just confirming our meeting for next Tuesday at 11 AM.",
          sender: "them",
          time: "Monday, 2:20 PM",
        },
        { id: 2, text: "Yes, that works for me. I've added it to my calendar.", sender: "me", time: "Monday, 2:45 PM" },
        {
          id: 3,
          text: "Great! I'll send over some prep materials beforehand.",
          sender: "them",
          time: "Monday, 3:00 PM",
        },
        { id: 4, text: "Looking forward to our meeting next week!", sender: "them", time: "Monday, 3:01 PM" },
      ],
    },
    {
      id: 4,
      name: "Emily Johnson",
      avatar: "E",
      lastMessage: "The conference was amazing! So many great speakers and networking opportunities.",
      time: "Aug 15",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hey Richard, did you attend the ProductCon conference last week?",
          sender: "them",
          time: "Aug 15, 10:15 AM",
        },
        { id: 2, text: "Yes, I was there on Thursday. Did you go as well?", sender: "me", time: "Aug 15, 11:30 AM" },
        { id: 3, text: "Yes! I attended all three days. It was fantastic.", sender: "them", time: "Aug 15, 12:45 PM" },
        {
          id: 4,
          text: "The conference was amazing! So many great speakers and networking opportunities.",
          sender: "them",
          time: "Aug 15, 12:46 PM",
        },
      ],
    },
  ]

  const [newMessage, setNewMessage] = useState("")

  const currentChat = conversations.find((conv) => conv.id === activeChat)

  return (
    <div className="flex flex-col h-full">
      {activeChat === null ? (
        <>
          {/* Messages List Header */}
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
              <h1 className="text-xl font-bold ml-4">Messages</h1>
            </div>

            <button className="bg-blue-500 text-white p-2 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
          </header>

          {/* Search */}
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
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 px-5 overflow-y-auto">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="bg-white rounded-xl p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveChat(conversation.id)}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-600 mr-3 flex-shrink-0">
                    {conversation.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conversation.time}</span>
                    </div>

                    <p className="text-xs text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                  </div>

                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-medium text-white ml-2">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Chat Header */}
          <header className="flex items-center px-5 pt-8 pb-4 border-b border-gray-200">
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => setActiveChat(null)}
            >
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

            <div className="flex items-center ml-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold text-blue-600 mr-3">
                {currentChat?.avatar}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{currentChat?.name}</h3>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>

            <div className="ml-auto flex space-x-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 px-5 py-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {currentChat?.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  {message.sender !== "me" && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 mr-2 flex-shrink-0">
                      {currentChat.avatar}
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] ${
                      message.sender === "me"
                        ? "bg-blue-500 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl"
                        : "bg-white text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl border border-gray-200"
                    } px-3 py-2`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="px-5 py-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border-none focus:ring-0 bg-transparent px-3 py-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <button
                className={`p-2 rounded-full ${
                  newMessage.trim() ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
                disabled={!newMessage.trim()}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

