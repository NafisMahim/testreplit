"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
// In AetherApp component, add import statements for all the new screens
import ProfileScreenComponent from "./profile-screen"
import NotificationsScreenComponent from "./notifications-screen"
import MessagesScreenComponent from "./messages-screen"
// Add these imports at the top of the file, after the existing imports
import ExperienceScreenComponent from "./experience-screen"
import FinancialsScreenComponent from "./financials-screen"
import LocationsScreenComponent from "./locations-screen"
import PremiumScreen from "./premium-screen"

export default function AetherApp() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState<
    | "login"
    | "home"
    | "quiz"
    | "interests"
    | "experience"
    | "financials"
    | "locations"
    | "search"
    | "profile"
    | "notifications"
    | "messages"
    | "premium"
  >("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [quizResults, setQuizResults] = useState<any>(null)

  // Handle login
  const handleLogin = () => {
    if (username && password) {
      setCurrentScreen("home")
      setErrorMessage("")
    } else {
      setErrorMessage("Please enter your username and password.")
    }
  }

  // Handle navigation
  const navigateTo = (page: string, data?: any) => {
    if (page === "home" && data) {
      // If coming from quiz with results
      setQuizResults(data)
    }
    setCurrentScreen(page as any)
  }

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`)
    // In a real app, this would handle OAuth
    setCurrentScreen("home")
  }

  // Handle back navigation
  const handleBack = (data?: any) => {
    if (data) {
      navigateTo("home", data)
    } else {
      navigateTo("home")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#e3f2fd] to-[#bbdefb]">
      <div className="w-[360px] h-[740px] bg-black rounded-[40px] border-[8px] border-black shadow-xl relative overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[15px] z-10"></div>

        {/* Inner screen */}
        <div className="w-full h-full rounded-[32px] bg-gradient-to-b from-[#f8f9fa] to-[#e3f2fd] overflow-hidden">
          {currentScreen === "login" ? (
            <LoginScreen
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSocialLogin={handleSocialLogin}
              errorMessage={errorMessage}
            />
          ) : currentScreen === "home" ? (
            <HomeScreen username="Richard Wang" navigateTo={navigateTo} quizResults={quizResults} />
          ) : currentScreen === "quiz" ? (
            <QuizScreen handleBack={handleBack} />
          ) : currentScreen === "interests" ? (
            <InterestsScreen handleBack={handleBack} />
          ) : currentScreen === "experience" ? (
            <ExperienceScreenComponent handleBack={handleBack} />
          ) : currentScreen === "financials" ? (
            <FinancialsScreenComponent handleBack={handleBack} />
          ) : currentScreen === "locations" ? (
            <LocationsScreenComponent handleBack={handleBack} />
          ) : currentScreen === "profile" ? (
            <ProfileScreenComponent handleBack={handleBack} username="Richard Wang" quizResults={quizResults} />
          ) : currentScreen === "notifications" ? (
            <NotificationsScreenComponent handleBack={handleBack} />
          ) : currentScreen === "messages" ? (
            <MessagesScreenComponent handleBack={handleBack} />
          ) : currentScreen === "search" ? (
            <SearchScreen handleBack={handleBack} />
          ) : currentScreen === "premium" ? (
            <PremiumScreen handleBack={handleBack} />
          ) : (
            <ComingSoonScreen screen={currentScreen} handleBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  )
}

interface LoginScreenProps {
  username: string
  setUsername: (value: string) => void
  password: string
  setPassword: (value: string) => void
  handleLogin: () => void
  handleSocialLogin: (provider: string) => void
  errorMessage: string
}

function LoginScreen({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleSocialLogin,
  errorMessage,
}: LoginScreenProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full px-6">
      <div className="w-full max-w-[320px] bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center mb-4">
          <div className="relative w-[100px] h-[100px]">
            <Image src="/images/aether-logo.png" alt="Aether Logo" fill className="object-contain" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-1">Aether</h1>
        <p className="text-sm text-gray-500 text-center mb-6">The Ultimate Personal Assistant</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email or Username"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            onClick={handleLogin}
          >
            Continue
          </button>

          <p className="text-sm text-blue-600 text-center cursor-pointer hover:underline">Forgot Password?</p>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <p className="mx-4 text-sm text-gray-500 font-medium">OR</p>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            className="w-full py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
            onClick={() => handleSocialLogin("Google")}
          >
            <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="truncate">Continue with Google</span>
          </button>

          <button
            className="w-full py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
            onClick={() => handleSocialLogin("Microsoft")}
          >
            <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 23 23">
              <path fill="#f25022" d="M1 1h10v10H1z" />
              <path fill="#00a4ef" d="M1 12h10v10H1z" />
              <path fill="#7fba00" d="M12 1h10v10H12z" />
              <path fill="#ffb900" d="M12 12h10v10H12z" />
            </svg>
            <span className="truncate">Continue with Microsoft</span>
          </button>

          <button
            className="w-full py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
            onClick={() => handleSocialLogin("Phone")}
          >
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="truncate">Continue with Phone</span>
          </button>

          <p className="text-sm text-center mt-4">
            No account yet? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  )
}

interface HomeScreenProps {
  username: string
  navigateTo: (page: string) => void
  quizResults: any
}

function HomeScreen({ username, navigateTo, quizResults }: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-8 pb-4">
        <div className="flex items-center">
          <div className="relative w-[40px] h-[40px]">
            <Image src="/images/aether-logo.png" alt="Aether Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold">
            Aether<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xs text-gray-500">The Ultimate Personal Assistant</p>
        </div>

        <button
          className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg"
          onClick={() => navigateTo("premium")}
        >
          Premium
        </button>
      </header>

      {/* User Profile */}
      <section className="px-5 mt-2">
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md p-5 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-2xl font-bold text-gray-400">
            {username.charAt(0)}
          </div>
          <h2 className="text-lg font-bold">{username}</h2>
          <p className="text-xs text-gray-500 italic mt-1">"Exploring new opportunities and personal growth!"</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 px-5 mt-6 flex flex-col items-center">
        <button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3 rounded-lg shadow-md mb-4 transform hover:scale-[1.02] transition-all duration-200"
          onClick={() => navigateTo("quiz")}
        >
          Take a Quiz
        </button>

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 rounded-lg shadow-md mb-6 flex items-center justify-center transform hover:scale-[1.02] transition-all duration-200"
          onClick={() => navigateTo("search")}
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Search
        </button>

        <div className="grid grid-cols-2 gap-4 w-full">
          <CategoryButton icon="🌟" label="Interests" onClick={() => navigateTo("interests")} />
          <CategoryButton icon="💼" label="Experience" onClick={() => navigateTo("experience")} />
          <CategoryButton icon="💰" label="Financials" onClick={() => navigateTo("financials")} />
          <CategoryButton icon="📍" label="Locations" onClick={() => navigateTo("locations")} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="mt-auto px-4 pb-6">
        <nav className="bg-gray-100 rounded-2xl p-2 flex justify-around">
          <NavButton icon="🏠" label="Home" active onClick={() => navigateTo("home")} />
          <NavButton icon="🔔" label="Notifications" onClick={() => navigateTo("notifications")} />
          <NavButton icon="💬" label="Messages" onClick={() => navigateTo("messages")} />
          <NavButton icon="👤" label="Profile" onClick={() => navigateTo("profile")} />
        </nav>
      </footer>
    </div>
  )
}

interface QuizScreenProps {
  handleBack: (data?: any) => void
}

function QuizScreen({ handleBack }: QuizScreenProps) {
  const [quizState, setQuizState] = useState<"questions" | "results">("questions")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  // Career-oriented advanced questions
  const questions = [
    {
      question:
        "Which strategic leadership approach do you most frequently employ in complex organizational challenges?",
      options: [
        "Transformational (inspiring innovation and change)",
        "Servant (prioritizing team needs and development)",
        "Situational (adapting style to specific contexts)",
        "Directive (providing clear structure and guidance)",
      ],
    },
    {
      question:
        "When evaluating potential career advancement opportunities, which factor carries the most weight in your decision-making process?",
      options: [
        "Intellectual challenge and skill development",
        "Organizational culture and work-life integration",
        "Compensation package and financial incentives",
        "Leadership potential and decision-making authority",
      ],
    },
    {
      question: "How do you typically approach cross-functional collaboration in high-stakes projects?",
      options: [
        "Establish clear governance and decision frameworks first",
        "Focus on relationship-building before tactical execution",
        "Implement agile methodologies with regular feedback loops",
        "Leverage subject matter expertise with defined handoffs",
      ],
    },
    {
      question:
        "Which professional development methodology has yielded the most significant growth in your career trajectory?",
      options: [
        "Structured mentorship and executive coaching",
        "Self-directed learning and specialized certifications",
        "Experiential learning through stretch assignments",
        "Peer learning networks and communities of practice",
      ],
    },
    {
      question: "When navigating organizational change, which approach best characterizes your contribution?",
      options: [
        "Change catalyst - driving innovation and new initiatives",
        "Change stabilizer - ensuring operational continuity",
        "Change communicator - facilitating understanding and buy-in",
        "Change analyst - evaluating impacts and optimizing processes",
      ],
    },
    {
      question: "How do you primarily measure your professional success and impact?",
      options: [
        "Quantifiable business outcomes and financial metrics",
        "Team development and organizational capability building",
        "Innovation implementation and market differentiation",
        "Stakeholder satisfaction and relationship strength",
      ],
    },
    {
      question:
        "Which technological competency do you believe will be most critical to develop in your field over the next 5 years?",
      options: [
        "AI/ML implementation and ethical governance",
        "Data analytics and insight generation",
        "Digital transformation and legacy system integration",
        "Cybersecurity and privacy protection frameworks",
      ],
    },
    {
      question:
        "In resource-constrained environments, how do you typically prioritize competing strategic initiatives?",
      options: [
        "ROI-based analysis with quantitative scoring models",
        "Alignment with core organizational mission and values",
        "Stakeholder influence mapping and coalition building",
        "Capability-based assessment of execution feasibility",
      ],
    },
    {
      question: "Which approach to professional networking has proven most valuable in your career development?",
      options: [
        "Industry-specific communities and formal associations",
        "Cross-industry thought leadership and knowledge exchange",
        "Strategic internal relationship building and sponsorship",
        "Digital platform engagement and content creation",
      ],
    },
    {
      question: "When faced with significant professional setbacks, which resilience strategy do you most rely upon?",
      options: [
        "Analytical problem deconstruction and root cause analysis",
        "Seeking diverse perspectives and collaborative solutions",
        "Rapid prototyping of alternative approaches",
        "Reflective practice and mindfulness techniques",
      ],
    },
  ]

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed, show results
      setQuizState("results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Sophisticated analysis of quiz answers
  const calculateResults = () => {
    // Skip if no answers
    if (answers.length === 0) {
      return {
        leadershipStyle: { transformational: 0, servant: 0, situational: 0, directive: 0 },
        careerPriorities: { intellectual: 0, cultural: 0, financial: 0, authority: 0 },
        recommendedTopics: [],
        careerPath: "",
        developmentAreas: [],
        strengths: [],
      }
    }

    // Initialize counters for different aspects
    const leadershipStyle = { transformational: 0, servant: 0, situational: 0, directive: 0 }
    const careerPriorities = { intellectual: 0, cultural: 0, financial: 0, authority: 0 }
    const collaborationStyle = { structured: 0, relational: 0, agile: 0, expertise: 0 }
    const developmentPreference = { mentorship: 0, selfDirected: 0, experiential: 0, peer: 0 }
    const changeRole = { catalyst: 0, stabilizer: 0, communicator: 0, analyst: 0 }
    const successMetrics = { business: 0, people: 0, innovation: 0, stakeholder: 0 }
    const techFocus = { ai: 0, data: 0, digital: 0, security: 0 }
    const prioritizationApproach = { roi: 0, mission: 0, stakeholder: 0, capability: 0 }
    const networkingStyle = { industry: 0, thought: 0, internal: 0, digital: 0 }
    const resilienceStrategy = { analytical: 0, collaborative: 0, experimental: 0, reflective: 0 }

    // Analyze leadership style (Q1)
    if (answers[0]?.includes("Transformational")) leadershipStyle.transformational += 3
    else if (answers[0]?.includes("Servant")) leadershipStyle.servant += 3
    else if (answers[0]?.includes("Situational")) leadershipStyle.situational += 3
    else if (answers[0]?.includes("Directive")) leadershipStyle.directive += 3

    // Analyze career priorities (Q2)
    if (answers[1]?.includes("Intellectual")) careerPriorities.intellectual += 3
    else if (answers[1]?.includes("Organizational culture")) careerPriorities.cultural += 3
    else if (answers[1]?.includes("Compensation")) careerPriorities.financial += 3
    else if (answers[1]?.includes("Leadership potential")) careerPriorities.authority += 3

    // Analyze collaboration style (Q3)
    if (answers[2]?.includes("Establish clear governance")) collaborationStyle.structured += 3
    else if (answers[2]?.includes("relationship-building")) collaborationStyle.relational += 3
    else if (answers[2]?.includes("agile methodologies")) collaborationStyle.agile += 3
    else if (answers[2]?.includes("subject matter expertise")) collaborationStyle.expertise += 3

    // Analyze development preference (Q4)
    if (answers[3]?.includes("mentorship")) developmentPreference.mentorship += 3
    else if (answers[3]?.includes("Self-directed")) developmentPreference.selfDirected += 3
    else if (answers[3]?.includes("Experiential")) developmentPreference.experiential += 3
    else if (answers[3]?.includes("Peer learning")) developmentPreference.peer += 3

    // Analyze change role (Q5)
    if (answers[4]?.includes("Change catalyst")) changeRole.catalyst += 3
    else if (answers[4]?.includes("Change stabilizer")) changeRole.stabilizer += 3
    else if (answers[4]?.includes("Change communicator")) changeRole.communicator += 3
    else if (answers[4]?.includes("Change analyst")) changeRole.analyst += 3

    // Analyze success metrics (Q6)
    if (answers[5]?.includes("Quantifiable business")) successMetrics.business += 3
    else if (answers[5]?.includes("Team development")) successMetrics.people += 3
    else if (answers[5]?.includes("Innovation implementation")) successMetrics.innovation += 3
    else if (answers[5]?.includes("Stakeholder satisfaction")) successMetrics.stakeholder += 3

    // Analyze tech focus (Q7)
    if (answers[6]?.includes("AI/ML")) techFocus.ai += 3
    else if (answers[6]?.includes("Data analytics")) techFocus.data += 3
    else if (answers[6]?.includes("Digital transformation")) techFocus.digital += 3
    else if (answers[6]?.includes("Cybersecurity")) techFocus.security += 3

    // Analyze prioritization approach (Q8)
    if (answers[7]?.includes("ROI-based")) prioritizationApproach.roi += 3
    else if (answers[7]?.includes("Alignment with core")) prioritizationApproach.mission += 3
    else if (answers[7]?.includes("Stakeholder influence")) prioritizationApproach.stakeholder += 3
    else if (answers[7]?.includes("Capability-based")) prioritizationApproach.capability += 3

    // Analyze networking style (Q9)
    if (answers[8]?.includes("Industry-specific")) networkingStyle.industry += 3
    else if (answers[8]?.includes("Cross-industry")) networkingStyle.thought += 3
    else if (answers[8]?.includes("Strategic internal")) networkingStyle.internal += 3
    else if (answers[8]?.includes("Digital platform")) networkingStyle.digital += 3

    // Analyze resilience strategy (Q10)
    if (answers[9]?.includes("Analytical problem")) resilienceStrategy.analytical += 3
    else if (answers[9]?.includes("Seeking diverse perspectives")) resilienceStrategy.collaborative += 3
    else if (answers[9]?.includes("Rapid prototyping")) resilienceStrategy.experimental += 3
    else if (answers[9]?.includes("Reflective practice")) resilienceStrategy.reflective += 3

    // Cross-question analysis for leadership style
    if (answers[4]?.includes("Change catalyst")) leadershipStyle.transformational += 1
    if (answers[5]?.includes("Team development")) leadershipStyle.servant += 1
    if (answers[2]?.includes("agile methodologies")) leadershipStyle.situational += 1
    if (answers[7]?.includes("ROI-based")) leadershipStyle.directive += 1

    // Cross-question analysis for career priorities
    if (answers[3]?.includes("Self-directed")) careerPriorities.intellectual += 1
    if (answers[8]?.includes("Strategic internal")) careerPriorities.cultural += 1
    if (answers[5]?.includes("Quantifiable business")) careerPriorities.financial += 1
    if (answers[0]?.includes("Directive")) careerPriorities.authority += 1

    // Determine dominant leadership style
    const dominantLeadership = Object.entries(leadershipStyle).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

    // Determine dominant career priority
    const dominantPriority = Object.entries(careerPriorities).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

    // Determine dominant tech focus
    const dominantTech = Object.entries(techFocus).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

    // Determine career path based on patterns
    let careerPath = ""
    if (leadershipStyle.transformational > 2 && successMetrics.innovation > 2) {
      careerPath = "Innovation Leadership"
    } else if (leadershipStyle.servant > 2 && successMetrics.people > 2) {
      careerPath = "People & Culture Leadership"
    } else if (leadershipStyle.directive > 2 && successMetrics.business > 2) {
      careerPath = "Operational Excellence"
    } else if (prioritizationApproach.roi > 2 && careerPriorities.financial > 2) {
      careerPath = "Strategic Finance"
    } else if (techFocus.ai > 2 || techFocus.data > 2) {
      careerPath = "Data & AI Strategy"
    } else if (changeRole.communicator > 2 && networkingStyle.thought > 2) {
      careerPath = "Change & Communications Leadership"
    } else if (collaborationStyle.agile > 2 && resilienceStrategy.experimental > 2) {
      careerPath = "Agile Transformation"
    } else {
      careerPath = "Strategic Leadership"
    }

    // Determine recommended topics based on patterns
    const recommendedTopics = []

    // Leadership development topics
    if (dominantLeadership === "transformational") {
      recommendedTopics.push("Disruptive Innovation Strategies")
      recommendedTopics.push("Leading Through Organizational Transformation")
    } else if (dominantLeadership === "servant") {
      recommendedTopics.push("Coaching for High Performance")
      recommendedTopics.push("Building Psychological Safety in Teams")
    } else if (dominantLeadership === "situational") {
      recommendedTopics.push("Adaptive Leadership in Complex Environments")
      recommendedTopics.push("Contextual Decision-Making Frameworks")
    } else if (dominantLeadership === "directive") {
      recommendedTopics.push("Strategic Planning and Execution")
      recommendedTopics.push("Performance Management Systems")
    }

    // Tech-focused topics
    if (dominantTech === "ai") {
      recommendedTopics.push("AI Ethics and Governance")
      recommendedTopics.push("Machine Learning Implementation Strategy")
    } else if (dominantTech === "data") {
      recommendedTopics.push("Data-Driven Decision Making")
      recommendedTopics.push("Advanced Analytics for Business Leaders")
    } else if (dominantTech === "digital") {
      recommendedTopics.push("Digital Transformation Roadmapping")
      recommendedTopics.push("Legacy System Modernization")
    } else if (dominantTech === "security") {
      recommendedTopics.push("Cybersecurity Risk Management")
      recommendedTopics.push("Privacy-by-Design Principles")
    }

    // Career development topics
    if (dominantPriority === "intellectual") {
      recommendedTopics.push("Continuous Learning Ecosystems")
      recommendedTopics.push("Knowledge Management Strategy")
    } else if (dominantPriority === "cultural") {
      recommendedTopics.push("Organizational Culture Design")
      recommendedTopics.push("Work-Life Integration Models")
    } else if (dominantPriority === "financial") {
      recommendedTopics.push("Executive Compensation Strategies")
      recommendedTopics.push("Financial Acumen for Leaders")
    } else if (dominantPriority === "authority") {
      recommendedTopics.push("Executive Presence Development")
      recommendedTopics.push("Strategic Influence and Persuasion")
    }

    // Determine development areas
    const developmentAreas = []

    // Find lowest scores across different dimensions
    const lowestLeadership = Object.entries(leadershipStyle).reduce((a, b) => (a[1] < b[1] ? a : b))[0]
    const lowestPriority = Object.entries(careerPriorities).reduce((a, b) => (a[1] < b[1] ? a : b))[0]

    if (lowestLeadership === "transformational") developmentAreas.push("Innovation Mindset")
    if (lowestLeadership === "servant") developmentAreas.push("Empathetic Leadership")
    if (lowestLeadership === "situational") developmentAreas.push("Contextual Adaptability")
    if (lowestLeadership === "directive") developmentAreas.push("Structured Decision Making")

    if (lowestPriority === "intellectual") developmentAreas.push("Continuous Learning")
    if (lowestPriority === "cultural") developmentAreas.push("Organizational Awareness")
    if (lowestPriority === "financial") developmentAreas.push("Financial Acumen")
    if (lowestPriority === "authority") developmentAreas.push("Executive Presence")

    if (resilienceStrategy.analytical < 2) developmentAreas.push("Critical Problem Analysis")
    if (networkingStyle.thought < 2) developmentAreas.push("Thought Leadership")
    if (collaborationStyle.agile < 2) developmentAreas.push("Agile Methodologies")

    // Determine strengths
    const strengths = []

    // Leadership strengths
    if (leadershipStyle.transformational > 2) strengths.push("Change Leadership")
    if (leadershipStyle.servant > 2) strengths.push("Team Development")
    if (leadershipStyle.situational > 2) strengths.push("Adaptability")
    if (leadershipStyle.directive > 2) strengths.push("Strategic Direction")

    // Collaboration strengths
    if (collaborationStyle.structured > 2) strengths.push("Process Optimization")
    if (collaborationStyle.relational > 2) strengths.push("Relationship Building")
    if (collaborationStyle.agile > 2) strengths.push("Agile Implementation")
    if (collaborationStyle.expertise > 2) strengths.push("Subject Matter Expertise")

    // Additional strengths
    if (changeRole.catalyst > 2) strengths.push("Innovation Catalyst")
    if (successMetrics.business > 2) strengths.push("Business Acumen")
    if (resilienceStrategy.reflective > 2) strengths.push("Reflective Practice")
    if (networkingStyle.digital > 2) strengths.push("Digital Engagement")

    // Calculate percentages for visualization
    const total = Object.values(leadershipStyle).reduce((sum, val) => sum + val, 0) || 1
    const leadershipPercentages = {
      transformational: Math.round((leadershipStyle.transformational / total) * 100),
      servant: Math.round((leadershipStyle.servant / total) * 100),
      situational: Math.round((leadershipStyle.situational / total) * 100),
      directive: Math.round((leadershipStyle.directive / total) * 100),
    }

    // Ensure percentages add up to 100%
    const sum = Object.values(leadershipPercentages).reduce((s, v) => s + v, 0)
    if (sum < 100) {
      leadershipPercentages.transformational += 100 - sum
    } else if (sum > 100) {
      leadershipPercentages.transformational -= sum - 100
    }

    return {
      leadershipStyle: leadershipPercentages,
      careerPriorities,
      recommendedTopics: recommendedTopics.slice(0, 6), // Top 6 recommendations
      careerPath,
      developmentAreas: developmentAreas.slice(0, 4), // Top 4 development areas
      strengths: strengths.slice(0, 4), // Top 4 strengths
    }
  }

  const results = calculateResults()

  if (quizState === "results") {
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
          <h1 className="text-xl font-bold ml-4">Career Insights</h1>
        </header>

        {/* Results */}
        <div className="flex-1 px-5 overflow-y-auto">
          {/* Career Path */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-5 mb-5 text-white">
            <h2 className="text-lg font-bold mb-1">Recommended Career Path</h2>
            <p className="text-2xl font-bold">{results.careerPath}</p>
          </div>

          {/* Leadership Style */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-5">
            <h2 className="text-lg font-bold mb-3">Leadership Style Profile</h2>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Transformational</span>
                  <span className="text-sm font-medium">{results.leadershipStyle.transformational}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${results.leadershipStyle.transformational}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Servant</span>
                  <span className="text-sm font-medium">{results.leadershipStyle.servant}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${results.leadershipStyle.servant}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Situational</span>
                  <span className="text-sm font-medium">{results.leadershipStyle.situational}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: `${results.leadershipStyle.situational}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Directive</span>
                  <span className="text-sm font-medium">{results.leadershipStyle.directive}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: `${results.leadershipStyle.directive}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Development Areas */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-bold mb-3">Key Strengths</h2>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-bold mb-3">Development Areas</h2>
              <ul className="space-y-2">
                {results.developmentAreas.map((area, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
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
                    <span className="text-sm">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Topics */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-5">
            <h2 className="text-lg font-bold mb-3">Recommended Learning Topics</h2>
            <div className="grid grid-cols-1 gap-2">
              {results.recommendedTopics.map((topic, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full mr-2 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{topic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 pb-6 mt-4">
          <button
            className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg mb-3"
            onClick={() => handleBack(results)}
          >
            Apply Insights to Profile
          </button>
          <button
            className="w-full py-3 border border-gray-300 font-medium rounded-lg"
            onClick={() => {
              setQuizState("questions")
              setCurrentQuestion(0)
              setAnswers([])
            }}
          >
            Retake Assessment
          </button>
        </div>
      </div>
    )
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
        <h1 className="text-xl font-bold ml-4">Career Assessment</h1>
      </header>

      {/* Progress Bar */}
      <div className="px-5">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 px-5 mt-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                answers[currentQuestion] === option
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-5 pb-6 mt-auto">
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <button className="flex-1 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg" onClick={handlePrevious}>
              Previous
            </button>
          )}
          <button
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
              answers[currentQuestion] ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
          </button>
        </div>
      </div>
    </div>
  )
}

interface InterestsScreenProps {
  handleBack: () => void
}

function InterestsScreen({ handleBack }: InterestsScreenProps) {
  const interests = [
    { id: 1, name: "Technology", icon: "💻", selected: true },
    { id: 2, name: "Business", icon: "💼", selected: false },
    { id: 3, name: "Arts", icon: "🎨", selected: true },
    { id: 4, name: "Science", icon: "🔬", selected: false },
    { id: 5, name: "Sports", icon: "⚽", selected: true },
    { id: 6, name: "Music", icon: "🎵", selected: false },
    { id: 7, name: "Travel", icon: "✈️", selected: true },
    { id: 8, name: "Food", icon: "🍕", selected: false },
    { id: 9, name: "Fashion", icon: "👕", selected: false },
    { id: 10, name: "Health", icon: "💪", selected: true },
    { id: 11, name: "Education", icon: "📚", selected: false },
    { id: 12, name: "Finance", icon: "💰", selected: true },
  ]

  const [selectedInterests, setSelectedInterests] = useState(
    interests.filter((interest) => interest.selected).map((interest) => interest.id),
  )

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((interestId) => interestId !== id))
    } else {
      setSelectedInterests([...selectedInterests, id])
    }
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
        <h1 className="text-xl font-bold ml-4">Your Interests</h1>
      </header>

      {/* Interests Grid */}
      <div className="flex-1 px-5 mt-2 overflow-y-auto">
        <p className="text-sm text-gray-500 mb-4">
          Select the topics you're interested in to personalize your experience.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest) => (
            <button
              key={interest.id}
              className={`p-4 rounded-xl border-2 flex items-center transition-all duration-200 ${
                selectedInterests.includes(interest.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => toggleInterest(interest.id)}
            >
              <span className="text-2xl mr-3">{interest.icon}</span>
              <span className="font-medium">{interest.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="px-5 pb-6 mt-4">
        <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg" onClick={handleBack}>
          Save Interests
        </button>
      </div>
    </div>
  )
}

interface SearchScreenProps {
  handleBack: () => void
}

function SearchScreen({ handleBack }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches] = useState([
    "Machine learning courses",
    "Web development jobs",
    "Financial planning tips",
    "Travel destinations 2023",
  ])

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
        <h1 className="text-xl font-bold ml-4">Search</h1>
      </header>

      {/* Search Input */}
      <div className="px-5">
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
            placeholder="Search for anything..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Recent Searches */}
      <div className="flex-1 px-5 mt-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-3">RECENT SEARCHES</h2>

        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setSearchQuery(search)}
            >
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{search}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ComingSoonScreenProps {
  screen: string
  handleBack: () => void
}

function ComingSoonScreen({ screen, handleBack }: ComingSoonScreenProps) {
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
        <h1 className="text-xl font-bold ml-4">{screen.charAt(0).toUpperCase() + screen.slice(1)}</h1>
      </header>

      {/* Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-center">We're working hard to bring you this feature. Check back soon!</p>
      </div>

      {/* Back Button */}
      <div className="px-5 pb-6">
        <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg" onClick={handleBack}>
          Go Back Home
        </button>
      </div>
    </div>
  )
}

interface CategoryButtonProps {
  icon: string
  label: string
  onClick: () => void
}

function CategoryButton({ icon, label, onClick }: CategoryButtonProps) {
  return (
    <button
      className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transform hover:scale-[1.03] transition-all duration-200"
      onClick={onClick}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

interface NavButtonProps {
  icon: string
  label: string
  active?: boolean
  onClick: () => void
}

function NavButton({ icon, label, active = false, onClick }: NavButtonProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl ${
        active ? "bg-white shadow-md" : "hover:bg-white/50 transition-colors duration-200"
      }`}
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

interface ProfileScreenProps {
  handleBack: () => void
  username: string
  quizResults: any
}

function ProfileScreen({ handleBack, username, quizResults }: ProfileScreenProps) {
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

      {/* Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-center">We're working hard to bring you this feature. Check back soon!</p>
      </div>

      {/* Back Button */}
      <div className="px-5 pb-6">
        <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg" onClick={handleBack}>
          Go Back Home
        </button>
      </div>
    </div>
  )
}

interface NotificationsScreenProps {
  handleBack: () => void
}

function NotificationsScreen({ handleBack }: NotificationsScreenProps) {
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
        <h1 className="text-xl font-bold ml-4">Notifications</h1>
      </header>

      {/* Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="text-6xl mb-4">🔔</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-center">We're working hard to bring you this feature. Check back soon!</p>
      </div>

      {/* Back Button */}
      <div className="px-5 pb-6">
        <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg" onClick={handleBack}>
          Go Back Home
        </button>
      </div>
    </div>
  )
}

interface MessagesScreenProps {
  handleBack: () => void
}

function MessagesScreen({ handleBack }: MessagesScreenProps) {
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
        <h1 className="text-xl font-bold ml-4">Messages</h1>
      </header>

      {/* Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-center">We're working hard to bring you this feature. Check back soon!</p>
      </div>

      {/* Back Button */}
      <div className="px-5 pb-6">
        <button className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg" onClick={handleBack}>
          Go Back Home
        </button>
      </div>
    </div>
  )
}

