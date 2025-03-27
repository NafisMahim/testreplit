"use client"

import { useState } from "react"

interface ProfileScreenProps {
  handleBack: () => void
  username: string
  quizResults: any
}

export default function ProfileScreen({ handleBack, username, quizResults }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "career" | "activity" | "settings">("overview")

  // Sample profile data
  const profileData = {
    name: username,
    position: "Senior Product Manager",
    company: "TechCorp International",
    location: "San Francisco, CA",
    connections: 357,
    about:
      "Strategic product leader with 8+ years of experience delivering innovative solutions in SaaS and enterprise software. Passionate about user-centered design and data-driven decision making.",
    experience: [
      {
        title: "Senior Product Manager",
        company: "TechCorp International",
        period: "2020 - Present",
        description:
          "Leading cross-functional teams to develop and execute product strategy for enterprise SaaS platform.",
      },
      {
        title: "Product Manager",
        company: "InnovateSoft",
        period: "2017 - 2020",
        description: "Managed full product lifecycle for analytics suite serving 200+ enterprise clients.",
      },
    ],
    education: [
      {
        degree: "MBA, Technology Management",
        institution: "Stanford University",
        year: "2017",
      },
      {
        degree: "BS, Computer Science",
        institution: "University of California, Berkeley",
        year: "2013",
      },
    ],
    skills: [
      "Product Strategy",
      "UX Design",
      "Market Research",
      "Agile/Scrum",
      "Data Analytics",
      "Cross-functional Leadership",
    ],
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
        <h1 className="text-xl font-bold ml-4">Profile</h1>
      </header>

      {/* Profile Header */}
      <div className="px-5">
        <div className="bg-white rounded-xl shadow-md p-5 mb-5">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-xl font-bold text-blue-500 mr-4">
              {username.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-sm text-gray-500">{profileData.position}</p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                {profileData.company}
                <svg
                  className="w-4 h-4 ml-2 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                {profileData.location}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-lg font-bold">{profileData.connections}</p>
              <p className="text-xs text-gray-500">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">12</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">4</p>
              <p className="text-xs text-gray-500">Certifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-3">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === "overview" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === "career" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("career")}
          >
            Career
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === "activity" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              activeTab === "settings" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-5 flex-1 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="space-y-5">
            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-2">About</h3>
              <p className="text-sm text-gray-600">{profileData.about}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Insights (if quiz taken) */}
            {quizResults && (
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-md font-bold">Career Insights</h3>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">From Assessment</span>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="text-sm font-semibold text-blue-800">Recommended Path</p>
                  <p className="text-sm text-blue-700">{quizResults.careerPath}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Key Strengths</p>
                    <ul className="space-y-1">
                      {quizResults.strengths &&
                        quizResults.strengths.map((strength, idx) => (
                          <li key={idx} className="text-xs flex items-start">
                            <span className="text-green-500 mr-1">•</span> {strength}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Development Areas</p>
                    <ul className="space-y-1">
                      {quizResults.developmentAreas &&
                        quizResults.developmentAreas.map((area, idx) => (
                          <li key={idx} className="text-xs flex items-start">
                            <span className="text-blue-500 mr-1">•</span> {area}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full text-xs text-blue-600 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  View Full Assessment Results
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "career" && (
          <div className="space-y-5">
            {/* Experience */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Experience</h3>
              <div className="space-y-4">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h4 className="text-sm font-semibold">{exp.title}</h4>
                    <p className="text-xs text-gray-500">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Education</h3>
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h4 className="text-sm font-semibold">{edu.degree}</h4>
                    <p className="text-xs text-gray-500">
                      {edu.institution} • Class of {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Certifications</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex-shrink-0 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Certified Scrum Product Owner (CSPO)</h4>
                    <p className="text-xs text-gray-500">Scrum Alliance • Issued May 2022</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex-shrink-0 flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Product Analytics Certification</h4>
                    <p className="text-xs text-gray-500">Product School • Issued Jan 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-5">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Recent Activity</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-sm font-medium">
                        {username.charAt(0)}
                      </div>
                      <p className="text-sm font-medium">
                        {username} <span className="font-normal text-gray-500">completed an assessment</span>
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">2d ago</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 ml-10">
                    <p className="text-sm font-medium">Career Assessment Results</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Identified strengths in Team Leadership and Strategic Planning
                    </p>
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-sm font-medium">
                        {username.charAt(0)}
                      </div>
                      <p className="text-sm font-medium">
                        {username} <span className="font-normal text-gray-500">updated their interests</span>
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">1w ago</span>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-10">
                    <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">Technology</span>
                    <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">Finance</span>
                    <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full">Health</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-sm font-medium">
                        {username.charAt(0)}
                      </div>
                      <p className="text-sm font-medium">
                        {username} <span className="font-normal text-gray-500">added a new position</span>
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">2w ago</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 ml-10">
                    <p className="text-sm font-medium">Senior Product Manager at TechCorp International</p>
                    <p className="text-xs text-gray-500 mt-1">San Francisco, CA • Full-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-5">
            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Account Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium">Email Address</p>
                    <p className="text-xs text-gray-500">richard.wang@example.com</p>
                  </div>
                  <button className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium">Password</p>
                    <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                  </div>
                  <button className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Not enabled</p>
                  </div>
                  <button className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                    Set up
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Notification Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Push Notifications</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm">Email Notifications</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm">Marketing Communications</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-md font-bold mb-3">Privacy Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Profile Visibility</p>
                  <select className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white">
                    <option>Public</option>
                    <option>Connections Only</option>
                    <option>Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm">Activity Visibility</p>
                  <select className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white">
                    <option>All Users</option>
                    <option>Connections Only</option>
                    <option>Only Me</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

