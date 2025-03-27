"use client"

import { useState, useEffect } from "react"

interface ExperienceScreenProps {
  handleBack: () => void
}

// Define types for our data
interface WorkExperience {
  id: number
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  logo: string
}

interface Education {
  id: number
  degree: string
  institution: string
  location: string
  period: string
  description: string
  achievements: string[]
  logo: string
}

interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  logo: string
}

interface SkillCategory {
  category: string
  items: string[]
}

interface ExperienceData {
  work: WorkExperience[]
  education: Education[]
  skills: SkillCategory[]
  certifications: Certification[]
}

export default function ExperienceScreen({ handleBack }: ExperienceScreenProps) {
  const [selectedTab, setSelectedTab] = useState<"work" | "education" | "skills">("work")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Initialize with sample data or load from localStorage
  const [experienceData, setExperienceData] = useState<ExperienceData>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("aether-experience-data")
      if (savedData) {
        return JSON.parse(savedData)
      }
    }

    // Sample experience data as fallback
    return {
      work: [
        {
          id: 1,
          role: "Senior Product Manager",
          company: "TechCorp International",
          location: "San Francisco, CA",
          period: "2020 - Present",
          description:
            "Leading cross-functional teams to develop and execute product strategy for enterprise SaaS platform. Managed product roadmap resulting in 35% revenue growth and 25% improvement in user engagement metrics.",
          achievements: [
            "Led redesign of core platform features, increasing user retention by 22%",
            "Implemented agile methodologies, reducing time-to-market by 40%",
            "Secured $2.5M in additional engineering resources through data-driven proposals",
          ],
          logo: "T",
        },
        {
          id: 2,
          role: "Product Manager",
          company: "InnovateSoft",
          location: "Boston, MA",
          period: "2017 - 2020",
          description:
            "Managed full product lifecycle for analytics suite serving 200+ enterprise clients. Collaborated with engineering, design, and sales teams to drive product development and go-to-market strategy.",
          achievements: [
            "Launched 3 major product features that generated $1.2M in incremental revenue",
            "Reduced customer churn by 15% through implementation of early warning system",
            "Established customer feedback program now used company-wide",
          ],
          logo: "I",
        },
        {
          id: 3,
          role: "Associate Product Manager",
          company: "DataViz Solutions",
          location: "New York, NY",
          period: "2015 - 2017",
          description:
            "Supported senior product managers in feature development for data visualization platform. Conducted market research, user interviews, and competitive analysis to inform product decisions.",
          achievements: [
            "Created user personas and journey maps now used across product teams",
            "Developed analytics dashboard used by C-suite for strategic planning",
            "Optimized onboarding flow, increasing activation rate by 28%",
          ],
          logo: "D",
        },
      ],
      education: [
        {
          id: 1,
          degree: "MBA, Technology Management",
          institution: "Stanford University",
          location: "Stanford, CA",
          period: "2015 - 2017",
          description:
            "Focused on product management, technology strategy, and entrepreneurship. Graduated with honors (3.8 GPA).",
          achievements: [
            "Led winning team in annual product innovation competition",
            "Published research paper on AI applications in product management",
            "Served as president of Product Management Club",
          ],
          logo: "S",
        },
        {
          id: 2,
          degree: "BS, Computer Science",
          institution: "University of California, Berkeley",
          location: "Berkeley, CA",
          period: "2011 - 2015",
          description:
            "Specialized in human-computer interaction and software engineering. Minor in Business Administration.",
          achievements: [
            "Dean's List for 6 consecutive semesters",
            "Developed mobile app for campus navigation used by 5,000+ students",
            "Teaching assistant for intro to programming courses",
          ],
          logo: "B",
        },
      ],
      skills: [
        {
          category: "Technical",
          items: [
            "SQL",
            "Python",
            "Data Analysis",
            "A/B Testing",
            "API Design",
            "Product Analytics",
            "Tableau",
            "Figma",
          ],
        },
        {
          category: "Business",
          items: [
            "Market Research",
            "Strategic Planning",
            "Competitive Analysis",
            "Revenue Modeling",
            "Pricing Strategy",
            "Go-to-Market Planning",
          ],
        },
        {
          category: "Leadership",
          items: [
            "Cross-functional Team Leadership",
            "Stakeholder Management",
            "Agile/Scrum",
            "Mentoring",
            "Roadmap Development",
            "User Interviews",
          ],
        },
      ],
      certifications: [
        {
          id: 1,
          name: "Certified Scrum Product Owner (CSPO)",
          issuer: "Scrum Alliance",
          date: "May 2022",
          logo: "📜",
        },
        {
          id: 2,
          name: "Product Analytics Certification",
          issuer: "Product School",
          date: "January 2023",
          logo: "📊",
        },
        {
          id: 3,
          name: "Strategic Leadership Program",
          issuer: "Harvard Business School Online",
          date: "September 2021",
          logo: "🎓",
        },
      ],
    }
  })

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aether-experience-data", JSON.stringify(experienceData))
    }
  }, [experienceData])

  // Function to add a new work experience
  const addWorkExperience = (newExperience: Omit<WorkExperience, "id">) => {
    const newId = experienceData.work.length > 0 ? Math.max(...experienceData.work.map((item) => item.id)) + 1 : 1

    setExperienceData({
      ...experienceData,
      work: [
        {
          ...newExperience,
          id: newId,
          achievements: newExperience.achievements || [],
        },
        ...experienceData.work,
      ],
    })
    setShowAddModal(false)
  }

  // Function to add a new education
  const addEducation = (newEducation: Omit<Education, "id">) => {
    const newId =
      experienceData.education.length > 0 ? Math.max(...experienceData.education.map((item) => item.id)) + 1 : 1

    setExperienceData({
      ...experienceData,
      education: [
        {
          ...newEducation,
          id: newId,
          achievements: newEducation.achievements || [],
        },
        ...experienceData.education,
      ],
    })
    setShowAddModal(false)
  }

  // Function to add a new certification
  const addCertification = (newCertification: Omit<Certification, "id">) => {
    const newId =
      experienceData.certifications.length > 0
        ? Math.max(...experienceData.certifications.map((item) => item.id)) + 1
        : 1

    setExperienceData({
      ...experienceData,
      certifications: [
        {
          ...newCertification,
          id: newId,
        },
        ...experienceData.certifications,
      ],
    })
    setShowAddModal(false)
  }

  // Function to add a new skill
  const addSkill = (category: string, skill: string) => {
    const updatedSkills = [...experienceData.skills]
    const categoryIndex = updatedSkills.findIndex((c) => c.category === category)

    if (categoryIndex >= 0) {
      // Category exists, add skill if it doesn't already exist
      if (!updatedSkills[categoryIndex].items.includes(skill)) {
        updatedSkills[categoryIndex].items.push(skill)
      }
    } else {
      // Create new category
      updatedSkills.push({
        category,
        items: [skill],
      })
    }

    setExperienceData({
      ...experienceData,
      skills: updatedSkills,
    })
    setShowAddModal(false)
  }

  // Function to delete an item
  const deleteItem = (type: "work" | "education" | "certification", id: number) => {
    if (type === "work") {
      setExperienceData({
        ...experienceData,
        work: experienceData.work.filter((item) => item.id !== id),
      })
    } else if (type === "education") {
      setExperienceData({
        ...experienceData,
        education: experienceData.education.filter((item) => item.id !== id),
      })
    } else if (type === "certification") {
      setExperienceData({
        ...experienceData,
        certifications: experienceData.certifications.filter((item) => item.id !== id),
      })
    }
  }

  // Function to delete a skill
  const deleteSkill = (category: string, skill: string) => {
    const updatedSkills = [...experienceData.skills]
    const categoryIndex = updatedSkills.findIndex((c) => c.category === category)

    if (categoryIndex >= 0) {
      updatedSkills[categoryIndex].items = updatedSkills[categoryIndex].items.filter((item) => item !== skill)

      // Remove category if empty
      if (updatedSkills[categoryIndex].items.length === 0) {
        updatedSkills.splice(categoryIndex, 1)
      }
    }

    setExperienceData({
      ...experienceData,
      skills: updatedSkills,
    })
  }

  // Function to update an existing work experience
  const updateWorkExperience = (updatedExperience: WorkExperience) => {
    setExperienceData({
      ...experienceData,
      work: experienceData.work.map((item) => (item.id === updatedExperience.id ? updatedExperience : item)),
    })
    setIsEditing(false)
    setEditingItem(null)
  }

  // Function to update an existing education
  const updateEducation = (updatedEducation: Education) => {
    setExperienceData({
      ...experienceData,
      education: experienceData.education.map((item) => (item.id === updatedEducation.id ? updatedEducation : item)),
    })
    setIsEditing(false)
    setEditingItem(null)
  }

  // Function to update an existing certification
  const updateCertification = (updatedCertification: Certification) => {
    setExperienceData({
      ...experienceData,
      certifications: experienceData.certifications.map((item) =>
        item.id === updatedCertification.id ? updatedCertification : item,
      ),
    })
    setIsEditing(false)
    setEditingItem(null)
  }

  // Function to handle starting the edit process
  const handleEdit = (type: "work" | "education" | "certification", id: number) => {
    let itemToEdit

    if (type === "work") {
      itemToEdit = experienceData.work.find((item) => item.id === id)
    } else if (type === "education") {
      itemToEdit = experienceData.education.find((item) => item.id === id)
    } else if (type === "certification") {
      itemToEdit = experienceData.certifications.find((item) => item.id === id)
    }

    if (itemToEdit) {
      setEditingItem({ ...itemToEdit, type })
      setIsEditing(true)
    }
  }

  // Function to handle adding a new item
  const handleAdd = (type: "work" | "education" | "certification" | "skill") => {
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
          <h1 className="text-xl font-bold ml-4">Professional Experience</h1>
        </div>

        <button
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          onClick={() =>
            handleAdd(selectedTab === "skills" ? "skill" : selectedTab === "education" ? "education" : "work")
          }
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
      </header>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              selectedTab === "work" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("work")}
          >
            Work
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              selectedTab === "education" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("education")}
          >
            Education
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              selectedTab === "skills" ? "bg-white shadow-sm" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("skills")}
          >
            Skills
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 px-5 overflow-y-auto pb-4">
        {selectedTab === "work" && (
          <div className="space-y-4">
            {experienceData.work.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm p-4 relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => handleEdit("work", job.id)}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => deleteItem("work", job.id)}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="flex">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl font-bold text-blue-600 mr-3 flex-shrink-0">
                    {job.logo}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold">{job.role}</h3>
                    <p className="text-sm text-gray-500">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{job.period}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">{job.description}</p>

                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Key Achievements:</p>
                  <ul className="space-y-1">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <svg
                          className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {experienceData.work.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-gray-500 mb-4">No work experience added yet</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                  onClick={() => handleAdd("work")}
                >
                  Add Work Experience
                </button>
              </div>
            )}
          </div>
        )}

        {selectedTab === "education" && (
          <div className="space-y-4">
            {experienceData.education.map((edu) => (
              <div key={edu.id} className="bg-white rounded-xl shadow-sm p-4 relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => handleEdit("education", edu.id)}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => deleteItem("education", edu.id)}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="flex">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl font-bold text-blue-600 mr-3 flex-shrink-0">
                    {edu.logo}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-gray-500">
                      {edu.institution} • {edu.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{edu.period}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">{edu.description}</p>

                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Highlights:</p>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <svg
                          className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          ></path>
                        </svg>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {experienceData.education.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-gray-500 mb-4">No education added yet</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                  onClick={() => handleAdd("education")}
                >
                  Add Education
                </button>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Certifications</h3>
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleAdd("certification")}
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {experienceData.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center bg-gray-50 rounded-lg p-3 relative group">
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={() => handleEdit("certification", cert.id)}
                      >
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={() => deleteItem("certification", cert.id)}
                      >
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3 flex-shrink-0">
                      {cert.logo}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{cert.name}</h4>
                      <p className="text-xs text-gray-500">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                ))}

                {experienceData.certifications.length === 0 && (
                  <div className="text-center py-3">
                    <p className="text-sm text-gray-500">No certifications added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "skills" && (
          <div className="space-y-4">
            {experienceData.skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-semibold">{skillGroup.category} Skills</h3>
                  <button
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => handleAdd("skill")}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, itemIdx) => (
                    <span
                      key={itemIdx}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full group relative ${
                        skillGroup.category === "Technical"
                          ? "bg-blue-50 text-blue-600"
                          : skillGroup.category === "Business"
                            ? "bg-green-50 text-green-600"
                            : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {skill}
                      <button
                        className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteSkill(skillGroup.category, skill)}
                      >
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {experienceData.skills.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-gray-500 mb-4">No skills added yet</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                  onClick={() => handleAdd("skill")}
                >
                  Add Skills
                </button>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-base font-semibold mb-3">Strengths Assessment</h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Strategic Planning</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Product Vision</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Data Analysis</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Cross-functional Leadership</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Technical Communication</span>
                    <span className="text-sm font-medium">83%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "83%" }}></div>
                  </div>
                </div>
              </div>
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
                  {editingItem?.type === "work"
                    ? "Work Experience"
                    : editingItem?.type === "education"
                      ? "Education"
                      : editingItem?.type === "certification"
                        ? "Certification"
                        : "Skill"}
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

              {/* Work Experience Form */}
              {editingItem?.type === "work" && (
                <WorkExperienceForm
                  initialData={editingItem}
                  onSubmit={isEditing ? updateWorkExperience : addWorkExperience}
                  onCancel={() => {
                    setIsEditing(false)
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Education Form */}
              {editingItem?.type === "education" && (
                <EducationForm
                  initialData={editingItem}
                  onSubmit={isEditing ? updateEducation : addEducation}
                  onCancel={() => {
                    setIsEditing(false)
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Certification Form */}
              {editingItem?.type === "certification" && (
                <CertificationForm
                  initialData={editingItem}
                  onSubmit={isEditing ? updateCertification : addCertification}
                  onCancel={() => {
                    setIsEditing(false)
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
                />
              )}

              {/* Skill Form */}
              {editingItem?.type === "skill" && (
                <SkillForm
                  categories={experienceData.skills.map((s) => s.category)}
                  onSubmit={(category, skill) => {
                    addSkill(category, skill)
                    setShowAddModal(false)
                    setEditingItem(null)
                  }}
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

// Work Experience Form Component
function WorkExperienceForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    role: initialData?.role || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    period: initialData?.period || "",
    description: initialData?.description || "",
    achievements: initialData?.achievements || [""],
    logo: initialData?.logo || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements]
    newAchievements[index] = value
    setFormData({
      ...formData,
      achievements: newAchievements,
    })
  }

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ""],
    })
  }

  const removeAchievement = (index) => {
    const newAchievements = [...formData.achievements]
    newAchievements.splice(index, 1)
    setFormData({
      ...formData,
      achievements: newAchievements,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Filter out empty achievements
    const filteredAchievements = formData.achievements.filter((a) => a.trim() !== "")
    onSubmit({
      ...formData,
      achievements: filteredAchievements,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role/Title</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
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
            placeholder="e.g., 2020 - Present"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo (Single Character)</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            maxLength={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Achievements</label>
            <button type="button" className="text-xs text-blue-600 hover:text-blue-800" onClick={addAchievement}>
              + Add Achievement
            </button>
          </div>

          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter achievement"
              />
              {formData.achievements.length > 1 && (
                <button
                  type="button"
                  className="ml-2 p-1.5 text-gray-500 hover:text-red-500"
                  onClick={() => removeAchievement(index)}
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
            {initialData?.id ? "Update" : "Add"} Experience
          </button>
        </div>
      </div>
    </form>
  )
}

// Education Form Component
function EducationForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    degree: initialData?.degree || "",
    institution: initialData?.institution || "",
    location: initialData?.location || "",
    period: initialData?.period || "",
    description: initialData?.description || "",
    achievements: initialData?.achievements || [""],
    logo: initialData?.logo || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements]
    newAchievements[index] = value
    setFormData({
      ...formData,
      achievements: newAchievements,
    })
  }

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ""],
    })
  }

  const removeAchievement = (index) => {
    const newAchievements = [...formData.achievements]
    newAchievements.splice(index, 1)
    setFormData({
      ...formData,
      achievements: newAchievements,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Filter out empty achievements
    const filteredAchievements = formData.achievements.filter((a) => a.trim() !== "")
    onSubmit({
      ...formData,
      achievements: filteredAchievements,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
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
            placeholder="e.g., 2015 - 2019"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo (Single Character)</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            maxLength={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Highlights</label>
            <button type="button" className="text-xs text-blue-600 hover:text-blue-800" onClick={addAchievement}>
              + Add Highlight
            </button>
          </div>

          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter highlight"
              />
              {formData.achievements.length > 1 && (
                <button
                  type="button"
                  className="ml-2 p-1.5 text-gray-500 hover:text-red-500"
                  onClick={() => removeAchievement(index)}
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
            {initialData?.id ? "Update" : "Add"} Education
          </button>
        </div>
      </div>
    </form>
  )
}

// Certification Form Component
function CertificationForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    name: initialData?.name || "",
    issuer: initialData?.issuer || "",
    date: initialData?.date || "",
    logo: initialData?.logo || "📜",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
          <input
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="e.g., May 2022"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo (Emoji)</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
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
            {initialData?.id ? "Update" : "Add"} Certification
          </button>
        </div>
      </div>
    </form>
  )
}

// Skill Form Component
function SkillForm({ categories, onSubmit, onCancel }) {
  const [category, setCategory] = useState(categories[0] || "Technical")
  const [newCategory, setNewCategory] = useState("")
  const [skill, setSkill] = useState("")
  const [showNewCategory, setShowNewCategory] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const finalCategory = showNewCategory ? newCategory : category
    if (finalCategory.trim() && skill.trim()) {
      onSubmit(finalCategory, skill)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          {!showNewCategory ? (
            <div className="flex items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
                {categories.length === 0 && <option value="Technical">Technical</option>}
              </select>
              <button
                type="button"
                className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                onClick={() => setShowNewCategory(true)}
              >
                + New
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                onClick={() => setShowNewCategory(false)}
              >
                Use Existing
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
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
            Add Skill
          </button>
        </div>
      </div>
    </form>
  )
}

