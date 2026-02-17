"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {ChevronLeft, ChevronRight, Zap, Hash, XCircle} from "lucide-react"
import {AnimatedButton} from "@/components/button/button";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import {
  Document,
  SecuritySafe,
  Setting3,
  People,
  Book1,
  MessageProgramming,
  Shield,
  Home,
  Code,
  InfoCircle,
  Star,
  Teacher,
  Note,
  Tag, TickCircle, CloseCircle, Category2, Hierarchy2, DirectboxSend
} from "@/components/icons";
import {AnimatedTextStream} from "@/components/HeroTemplateTabAnimation";
import {AnimatedBeamDemo} from "@/components/HeroKnowledgeTabAnimation";
import {SingleAnimatedBeam} from "@/components/HeroTriageTabAnimation";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

interface FeatureContent {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  metrics: {
    label: string
    value: string
  }[]
  dashboard: {
    title: string
    leftMetric: {
      label: string
      value: string
      unit?: string
    }
    rightMetric: {
      label: string
      value: string
    }
  }
}

const features: FeatureContent[] = [
  {
    title: "Templates",
    subtitle: "Create and customize email templates for consistent, professional communication.",
    description: "Build a comprehensive library of reusable email templates that maintain your brand voice and dramatically reduce response time. Our smart template system learns from your writing patterns and suggests dynamic content based on context, recipient history, and conversation flow. Templates support variable insertion, and automatic personalization—ensuring every message feels authentic while maintaining consistency across your team. Perfect for sales outreach, customer support, project updates, and recurring communications.",
    icon: <Note size={20} variant="Bulk" />,
    metrics: [
      { label: "TEMPLATES CREATED", value: "127" },
      { label: "TIME SAVED", value: "8.2hrs" },
      { label: "USAGE RATE", value: "94%" }
    ],
    dashboard: {
      title: "TEMPLATE DASHBOARD",
      leftMetric: {
        label: "Active Templates",
        value: "42"
      },
      rightMetric: {
        label: "This Month",
        value: "1,247"
      }
    }
  },
  {
    title: "Knowledge Base",
    subtitle: "Centralized information repository for accurate, context-aware email responses.",
    description: "Transform your scattered company information into an intelligent, searchable knowledge hub that powers accurate AI responses. Upload documents, procedures, FAQs, product specs, and company policies—our system automatically indexes and connects related information for instant retrieval. When crafting responses, AI pulls from verified sources to provide accurate, up-to-date information without hallucination. Advanced semantic search ensures the most relevant knowledge is surfaced.",
    icon: <Book1 size={20} variant="Bulk" />,
    metrics: [
      { label: "DOCUMENTS", value: "156" },
      { label: "ACCURACY", value: "98.2%" },
      { label: "QUERIES", value: "2,847" }
    ],
    dashboard: {
      title: "KNOWLEDGE DASHBOARD",
      leftMetric: {
        label: "Search Success",
        value: "96",
        unit: "%"
      },
      rightMetric: {
        label: "References",
        value: "3,421"
      }
    }
  },
  {
    title: "AI Tuning",
    subtitle: "Fine-tune your AI's behavior to match your exact communication style and preferences.",
    description: "Take complete control over your AI's personality and communication style with granular tuning controls that go far beyond basic settings. Adjust temperature for creativity vs. consistency, set confidence thresholds to avoid uncertain responses, and configure response length preferences for different scenarios. Choose from professional, casual, friendly, or authoritative tones, set emoji usage policies, and control call-to-action strength. Advanced users can fine-tune presence penalties to reduce repetition, adjust top-p values for response diversity, and create custom banned phrases lists. Create multiple profiles for different contexts—formal for executive communications, casual for team updates, technical for developer interactions.",
    icon: <Setting3 size={20} variant="Bulk" />,
    metrics: [
      { label: "TUNING PROFILES", value: "24" },
      { label: "ACCURACY", value: "99.1%" },
      { label: "BRAND ALIGNMENT", value: "96.8%" }
    ],
    dashboard: {
      title: "AI TUNING DASHBOARD",
      leftMetric: {
        label: "Active Profiles",
        value: "8"
      },
      rightMetric: {
        label: "This Month",
        value: "2,134"
      }
    }
  },
  {
    title: "Auto Draft Detection",
    subtitle: "Intelligent draft creation that anticipates your email responses automatically.",
    description: "Never miss an important reply with AI that monitors your inbox and automatically creates draft responses for emails that require your attention. Our intelligent system analyzes incoming messages, determines response urgency and context, then generates personalized draft replies that match your communication style. Advanced scheduling ensures drafts are created at optimal times, while smart filtering prevents draft overload by focusing only on messages that truly need responses. Integration with your existing email workflow means drafts appear seamlessly in your drafts folder, ready for review and sending. Perfect for busy professionals who need to maintain responsiveness without constant inbox monitoring.",
    icon: <MessageProgramming size={20} variant="Bulk" />,
    metrics: [
      { label: "DRAFTS CREATED", value: "2,347" },
      { label: "RESPONSE RATE", value: "94.8%" },
      { label: "TIME SAVED", value: "15.6hrs" }
    ],
    dashboard: {
      title: "DRAFT DASHBOARD",
      leftMetric: {
        label: "Auto Drafts",
        value: "89",
        unit: "%"
      },
      rightMetric: {
        label: "This Week",
        value: "234"
      }
    }
  },
  {
    title: "Auto Labeling",
    subtitle: "Intelligent email categorization that keeps your inbox organized automatically.",
    description: "Transform email chaos into organized clarity with intelligent labeling that works around the clock. Our advanced AI analyzes email content, sender patterns, subject lines, and contextual cues to automatically apply the most relevant labels to every incoming message. Set up custom rules for specific projects, clients, or workflows—the system learns from your preferences and adapts over time. Labels can trigger automated workflows, priority settings, and routing rules, ensuring critical emails never get buried. Integration with popular email clients means labels sync seamlessly across all your devices. Advanced pattern recognition identifies newsletter subscriptions, automated messages, and spam with unprecedented accuracy.",
    icon: <Tag size={20} variant="Bulk" />,
    metrics: [
      { label: "LABELS APPLIED", value: "1,847" },
      { label: "ACCURACY", value: "97.3%" },
      { label: "TIME SAVED", value: "12.4hrs" }
    ],
    dashboard: {
      title: "LABELING DASHBOARD",
      leftMetric: {
        label: "Auto Labels",
        value: "87",
        unit: "%"
      },
      rightMetric: {
        label: "This Week",
        value: "456"
      }
    }
  },
  {
    title: "More Features",
    subtitle: "Additional powerful tools to enhance your email security and workflow management.",
    description: "Essential email management features that enhance security and workflow control. DMARC and SPF validation provide robust email authentication protocols to prevent spoofing and ensure message authenticity. Quiet hours functionality offers timezone-aware scheduling to prevent after-hours disruptions while maintaining access to urgent communications. Create direct email capability allows you to send drafts as separate emails, providing flexibility in communication workflows. These foundational features work together to create a secure, efficient email environment.",
    icon: <Category2 size={20} variant="Bulk" />,
    metrics: [
      { label: "SECURITY CHECKS", value: "12,847" },
      { label: "QUIET HOURS", value: "87%" },
      { label: "FEATURES ACTIVE", value: "15+" }
    ],
    dashboard: {
      title: "ADVANCED FEATURES",
      leftMetric: {
        label: "Security Score",
        value: "98",
        unit: "%"
      },
      rightMetric: {
        label: "Active Rules",
        value: "42"
      }
    }
  }
]

const tabVariants = {
  enter: {
    opacity: 0,
    y: 10
  },
  center: {
    zIndex: 1,
    opacity: 1,
    y: 0
  },
  exit: (direction: number) => ({
    zIndex: 0,
    opacity: 0,
    x: direction < 0 ? 30 : -30,
  })
}

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [direction, setDirection] = useState(0)
  
  // Animated values for AI Tuning tab
  const [temperatureValue, setTemperatureValue] = useState(0)
  const [confidenceValue, setConfidenceValue] = useState(0)
  const [maxWordsValue, setMaxWordsValue] = useState(0)

  // Animate values when AI Tuning tab is active
  useEffect(() => {
    if (activeTab === 2) {
      const timeouts = [
        setTimeout(() => setTemperatureValue(0.7), 800),
        setTimeout(() => setConfidenceValue(85), 900),
        setTimeout(() => setMaxWordsValue(150), 1000),
      ]
      return () => timeouts.forEach(clearTimeout)
    } else {
      // Reset values when tab changes
      setTemperatureValue(0)
      setConfidenceValue(0)
      setMaxWordsValue(0)
    }
  }, [activeTab])

  const paginate = (newDirection: number, newTab: number) => {
    setDirection(newDirection)
    setActiveTab(newTab)
  }

  const activeFeature = features[activeTab]

  return (
    <section 
      id="features"
      className="py-20 px-6 bg-gray-50 h-[1000px]"
      
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.1, ease: [0, 0.55, 0.45, 1]}}
            viewport={{once: true}}
          >
            Powerful Email Intelligence
          </motion.h2>
          
          <motion.p
            className="  max-w-2xl mx-auto mb-12 text-md text-gray-600 leading-relaxed "
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2, ease: [0, 0.55, 0.45, 1]}}
            viewport={{once: true}}
          >
            Streamline your email workflow with AI-powered templates, knowledge management, and intelligent labeling.
          </motion.p>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-2 mb-16">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > activeTab ? 1 : -1
                  paginate(newDirection, index)
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-gray-900 text-white rounded-full shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-full'
                }`}
              >
                {feature.icon}
                <span>{feature.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeTab}
                custom={direction}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: [0, 0.55, 0.45, 1],
                  opacity: { duration: 0.15 },
                  x: { duration: 0.3 }
                }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
                    {activeFeature.title}
                  </h3>
                  <p className="text-md text-gray-600 leading-relaxed mb-2">
                    {activeFeature.description}
                  </p>
                </motion.div>

                {/* Learn More Button */}
               {/* <motion.div*/}
               {/*     initial={{ opacity: 0, y: 10 }}*/}
               {/*     animate={{ opacity: 1, y: 0 }}*/}
               {/*     transition={{ delay: 0.15, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}*/}
               {/* >*/}
               {/*<AnimatedButton text={'Learn More'} variant={'primary'}/>*/}
               {/* </motion.div>*/}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Animated Graphics */}
          <div className="relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeTab}
                custom={direction}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: [0, 0.55, 0.45, 1],
                  opacity: { duration: 0.15 },
                  x: { duration: 0.3 }
                }}
                className="relative"
              >
                <div className=" min-h-[400px] flex flex-col justify-center">
                  {/* Animated Content */}
                  <div className="flex-1 flex items-center justify-center -mt-24 pointer-events-none">
                    {activeTab === 0 && (
                      // Templates - Multi-row infinite marquee of template badges
                      <div className="w-full h-64 space-y-6 -mt-24">
                        <div className="space-y-2">
                          <div className="text-gray-600">
                            <AnimatedTextStream text={["Hi", { type: "badge", content: "Recipient Name", variant: "system" }, ","]} className="text-base" wordDelay={0.02} />
                          </div>

                          <div className="text-gray-800">
                            <AnimatedTextStream
                                text={[
                                  "Thank",
                                  "you",
                                  "for",
                                  "reaching",
                                  "out",
                                  "about",
                                  "your",
                                  "upcoming",
                                  "project.",
                                  "I've",
                                  "reviewed",
                                  "the",
                                  "requirements",
                                  ":",
                                  { type: "badge", content: "AI Content", variant: "ai" },
                                  "and",
                                  "I'm",
                                  "excited",
                                  "to",
                                  "help",
                                  "you",
                                  "bring",
                                  "this",
                                  "vision",
                                  "to",
                                  "life.",
                                  "Based",
                                  "on",
                                  "our",
                                  "discussion,",
                                  "I",
                                  "understand",
                                  "you're",
                                  "looking",
                                  "for",
                                  "a",
                                  "modern,",
                                  "responsive",
                                  "web",
                                  "application",
                                  "with",
                                  "real-time",
                                  "features",
                                  { type: "badge", content: "AI Content", variant: "ai" },
                                  "and",
                                  "seamless",
                                  "user",
                                  "experience.",
                                  "Our",
                                  "team",
                                  "is",
                                  "well-equipped",
                                  "to",
                                  "deliver",
                                  "on",
                                  "these",
                                  "requirements",
                                  "while",
                                  "ensuring",
                                  "scalability,",
                                  "performance,",
                                  "and",
                                  "robust",
                                  "security.",
                                ]}
                                className="text-base leading-relaxed"
                                delay={100}
                                wordDelay={0.02}
                            />
                          </div>
                          <div className="text-gray-800">
                            <AnimatedTextStream
                                text={[
                                  "We",
                                  "can",
                                  "also",
                                  "integrate",
                                  "advanced",
                                  "features",
                                  "like",
                                  "analytics,",
                                  "notifications,",
                                  "and",
                                  "customized",
                                  "dashboards",
                                  "to",
                                  "enhance",
                                  "user",
                                  "engagement.",
                                  { type: "badge", content: "AI Content", variant: "ai" },
                                  "Furthermore,",
                                  "our",
                                  "approach",
                                  "will",
                                  "prioritize",
                                  "intuitive",
                                  "design",
                                  "and",
                                  "a",
                                  "smooth",
                                  "workflow,",
                                  "ensuring",
                                  "that",
                                  "your",
                                  "team",
                                  "can",
                                  "easily",
                                  "manage",
                                  "and",
                                  "scale",
                                  "the",
                                  "application",
                                  "as",
                                  "your",
                                  "needs",
                                  "grow.",
                                  "We",
                                  "look",
                                  "forward",
                                  "to",
                                  "collaborating",
                                  "closely",
                                  "with",
                                  "you",
                                  "to",
                                  "turn",
                                  "this",
                                  "project",
                                  "into",
                                  "a",
                                  "success."
                                ]}
                                className="text-base leading-relaxed"
                                delay={1600}
                                wordDelay={0.02}
                            />
                          </div>

                            <div className="text-gray-600">
                              <AnimatedTextStream text={["From,", { type: "badge", content: "Sender Name", variant: "system" },]} className="text-base" delay={2850} wordDelay={0.02} />
                            </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      // Knowledge Base - Scrolling document marquees
                      <div className="relative w-full space-y-4">
                        <AnimatedBeamDemo/>
                      </div>
                    )}

                    {activeTab === 2 && (
                      // AI Tuning - Business dashboard with animated sliders and numbers
                      <motion.div
                        className="relative w-full  rounded-lg border shadow-sm p-6 mt-24"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg  text-gray-900">AI Configuration</h4>
                          <motion.div
                            className="flex items-center gap-2 text-sm "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Active
                          </motion.div>
                        </div>

                        <div className="space-y-6">
                          {/* Temperature Slider */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.4, ease: [0, 0.55, 0.45, 1], }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">Temperature</label>
                              <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1, duration: 0.4 }}
                              >
                                <NumberFlow
                                    spinTiming={{ duration: 1000, delay: 250, easing: 'cubic-bezier(0.83, 0, 0.17, 1)' }}
                                  value={temperatureValue} 
                                  format={{ minimumFractionDigits: 1 }} 
                                  className="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded"
                                />
                              </motion.div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "70%" }}
                                transition={{ delay: 1.0, duration: 0.8,  ease: [0.83, 0, 0.17, 1] }}
                              />
                            </div>
                          </motion.div>

                          {/* Confidence Level Slider */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.4, ease: [0, 0.55, 0.45, 1], }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">Confidence Level</label>
                              <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1, duration: 0.4 }}
                              >
                                <NumberFlow
                                    spinTiming={{ duration: 1000, delay: 300, easing: 'cubic-bezier(0.83, 0, 0.17, 1)' }}
                                  value={confidenceValue} 
                                  suffix="%" 
                                  className="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded"
                                />
                              </motion.div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "85%" }}
                                transition={{ delay: 1.1, duration: 0.8,  ease: [0.83, 0, 0.17, 1] }}
                              />
                            </div>
                          </motion.div>

                          {/* Max Words Slider */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.4, ease: [0, 0.55, 0.45, 1], }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium text-gray-700">Max Words</label>
                              <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1, duration: 0.4 }}
                              >
                                <NumberFlow
                                  spinTiming={{ duration: 1000, delay: 350, easing: 'cubic-bezier(0.83, 0, 0.17, 1)' }}
                                  value={maxWordsValue} 
                                  className="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded"
                                />
                              </motion.div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "60%" }}
                                transition={{ delay: 1.2, duration: 0.8,  ease: [0.83, 0, 0.17, 1] }}
                              />
                            </div>
                          </motion.div>

                          {/* Settings Row */}
                          <motion.div
                            className="flex items-center justify-between pt-4 border-t border-gray-100"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Tone:</span>
                                <span className="text-xs font-medium text-gray-900 px-2 py-1 bg-gray-100  rounded-full">Professional</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Length:</span>
                                <span className="text-xs font-medium text-gray-900 px-2 py-1 bg-gray-100 rounded-full">Concise</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 3 && (
                      // Auto Draft Detection - Animated workflow
                        <div className="relative w-full h-80 p-6 space-y-4">
                          {/* Top Input Email */}
                          <motion.div
                              className="w-full px-4 py-2 border rounded-lg flex justify-between items-center"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 p-1 rounded-full bg-secondary flex items-center justify-center">
                                <img
                                    className="w-full h-full object-contain"
                                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-02-512.png"
                                />
                              </div>
                              <p className="text-sm text-black">Gmail</p>
                            </div>
                            <div className={'flex space-x-2 items-center'}>
                              <div className={'h-2 rounded-full w-2 animate-pulse bg-gray-200'} />
                              <p className="text-xs text-gray-700">2 new messages</p>
                            </div>
                          </motion.div>

                          <div className={'flex space-x-2'}>
                            <motion.div
                                className="w-full px-4 py-2 border rounded-lg flex justify-between items-center"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 p-1 rounded-full bg-gray-200 flex items-center justify-center">
                                  <p>JS</p>
                                </div>
                                <p className="text-sm text-black">Business Partnership</p>
                              </div>
                            </motion.div>

                            <motion.div
                                className="w-full px-4 py-2 border rounded-lg flex justify-between items-center"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 p-1 rounded-full bg-gray-200 flex items-center justify-center">
                                  <p>A</p>
                                </div>
                                <p className="text-sm text-black">Trial Over</p>
                              </div>
                            </motion.div>
                          </div>

                          <div className="flex space-x-2 w-full justify-around">
                            {/* Left Column */}
                            <div className="flex flex-col space-y-2 items-center w-full">
                              {/* Top vertical line */}
                              <motion.div
                                  className="h-10 w-0.5 bg-gray-200 rounded-full"
                                  initial={{ scaleY: 0, originY: 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{ delay: 0.3, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                              />

                              {/* Tick Circle */}
                              <motion.div
                                  className="flex items-center gap-2 text-black cursor-pointer"
                                  whileHover={{ opacity: 0 }}
                                  whileTap={{ opacity: 0 }}
                                  transition={{ delay: 0.5, duration: 0.2, ease: [0, 0.55, 0.45, 1] }}
                              >
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5, ease: [0, 0.55, 0.45, 1] }}
                                >
                                  <TickCircle variant={'Bulk'} />
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5, ease: [0, 0.55, 0.45, 1] }}
                                    className="text-sm"
                                >
                                  Accept
                                </motion.span>
                              </motion.div>

                              {/* Bottom vertical line */}
                              <motion.div
                                  className="h-10 w-0.5 bg-gray-200 rounded-full"
                                  initial={{ scaleY: 0, originY: 0 }}
                                  animate={{ scaleY: 1 }}
                                  transition={{ delay: 0.4, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                              />

                              {/* Output content box */}
                              <motion.div
                                  className="w-full px-4 py-2 border rounded-lg space-y-2"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                              >
                                {[0.6, 0.7, 0.8, 0.9, 1.0].map((delay, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scaleX: 0, originX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{ delay, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                                    >
                                      <Skeleton
                                          className={[
                                            'w-10 h-4',
                                            'w-2/3 h-4',
                                            'w-full h-4',
                                            'w-full h-4',
                                            'w-20 h-4',
                                          ][i] + ' rounded-full'}
                                      />
                                    </motion.div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Right Column */}
                            <div className="flex space-x-2 w-full">
                              <div className="flex flex-col space-y-2 items-center w-full">
                                {/* Top vertical line */}
                                <motion.div
                                    className="h-10 w-0.5 bg-gray-200 rounded-full"
                                    initial={{ scaleY: 0, originY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ delay: 0.2, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                                />

                                {/* Close Circle */}
                                <motion.div
                                    className="flex items-center gap-2 text-black cursor-pointer"
                                    whileHover={{ opacity: 0 }}
                                    whileTap={{ opacity: 0 }}
                                    transition={{ delay: 0.5, duration: 0.2, ease: [0, 0.55, 0.45, 1] }}
                                >
                                  <motion.span
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: 0.6, ease: [0, 0.55, 0.45, 1] }}
                                  >
                                    <CloseCircle variant={'Bulk'} />
                                  </motion.span>
                                  <motion.span
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: 0.6, ease: [0, 0.55, 0.45, 1] }}
                                      className="text-sm"
                                  >
                                    Reject
                                  </motion.span>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}

                    {activeTab === 4 && (
                      // Auto Labeling - Email list with animated labels
                      <div className="relative w-full h-64 space-y-3 pointer-events-none">
                        {[
                          {
                            from: "sarah@company.com",
                            name: "Sarah Johnson",
                            subject: "Quarterly Budget Review",
                            labels: ["Important", "Budget"],
                            labelColors: ["bg-red-100 text-black", "bg-green-100 text-black"],
                            avatar: "/memojis/f1.png"
                          },
                          {
                            from: "mike@client.com",
                            name: "Mike Chen",
                            subject: "Meeting scheduled for Friday",
                            labels: ["Client", "Meeting"],
                            labelColors: ["bg-blue-100 text-black", "bg-purple-100 text-black"],
                            avatar: "/memojis/m4.png"
                          },
                          {
                            from: "invoice@vendor.com",
                            name: "TechVendor Inc",
                            subject: "Invoice #2024-001",
                            labels: ["Invoice", "Urgent"],
                            labelColors: ["bg-green-100 text-black", "bg-orange-100 text-black"],
                            avatar: "/memojis/f5.png"
                          },
                        ].map((email, idx) => (
                            <motion.div
                                key={idx}
                                className="rounded-lg p-4 border shadow-sm"
                                initial={{ opacity: 0, y: 10, filter: "blur(4px)", }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)", }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                            >
                              {/* Top row: avatar + sender info + time */}
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                    <Image
                                        src={email.avatar}
                                        alt={email.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-gray-900 truncate">{email.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{email.from}</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 flex-shrink-0">2m ago</div>
                              </div>

                              {/* Subject full-width under top row */}
                              <div className="text-sm font-medium text-gray-800 mb-3">
                                {email.subject}
                              </div>

                              {/* Labels row */}
                              <div className="flex gap-2 items-center flex-wrap">
                                {email.labels.map((label, labelIdx) => (
                                    <motion.div
                                        key={labelIdx}
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${email.labelColors[labelIdx]}`}
                                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{
                                          delay: idx * 0.1 + labelIdx * 0.2 + 0.5,
                                          duration: 0.4,
                                          ease: [0, 0.55, 0.45, 1],
                                        }}
                                    >
                                      {label}
                                    </motion.div>
                                ))}
                                <motion.div
                                    className="text-xs text-gray-400 ml-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.1 + 1 }}
                                >
                                  Auto-labeled
                                </motion.div>
                              </div>
                            </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === 5 && (
                      // More Features - Individual cards for each setting
                      <div className="relative w-full space-y-3 mt-24">
                        {/* DMARC Security Card */}
                        <motion.div
                          className="rounded-lg border shadow-sm p-4 "
                          initial={{ opacity: 0, y: 10, filter: "blur(4px)", }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)", }}
                          transition={{ delay: 0.1, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                <Shield size={16} variant="Bulk" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">DMARC Security</div>
                                <div className="text-xs text-gray-500">Email authentication protocol</div>
                              </div>
                            </div>
                            <motion.div
                              initial={{ opacity: 0, x: -10, }}
                              animate={{ opacity: 1, x: 0,}}
                              transition={{ delay: 0.2, duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                            >
                              <Badge variant="success">Enabled</Badge>
                            </motion.div>
                          </div>
                        </motion.div>
                        
                        {/* SPF Validation Card */}
                        <motion.div
                            className="rounded-lg border shadow-sm p-4 "
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)", }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", }}
                            transition={{ delay: 0.2, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                <Shield size={16} variant="Bulk" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">SPF Validation</div>
                                <div className="text-xs text-gray-500">Sender policy framework</div>
                              </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: -10, }}
                                animate={{ opacity: 1, x: 0,}}
                                transition={{ delay: 0.3, duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                            >
                              <Badge variant="success">Enabled</Badge>
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Quiet Hours Card */}
                        <motion.div
                          className="rounded-lg border shadow-sm p-4 "
                          initial={{ opacity: 0, y: 10, filter: "blur(4px)", }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)",}}
                          transition={{ delay: 0.3, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                <Setting3 size={16} variant="Bulk" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">Quiet Hours</div>
                                <div className="text-xs text-gray-500">Timezone aware scheduling</div>
                              </div>
                            </div>
                            <motion.div
                              className="w-10 h-6 rounded-full transition-colors bg-primary"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <motion.div
                                className="w-4 h-4 bg-white rounded-full mt-1 transition-transform"
                                animate={{ x: 20 }}
                                transition={{ delay: 0.4, duration: 0.2 }}
                              />
                            </motion.div>
                          </div>
                          <div className="flex items-center gap-2 pl-11">
                            <motion.input
                              type="text"
                              placeholder="9:00 PM"
                              className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 w-16 text-center"
                              initial={{ opacity: 0, x: -10, }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5, duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                              readOnly
                            />
                            <motion.span  initial={{ opacity: 0, x: -15, }}
                                          animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.3, ease: [0, 0.55, 0.45, 1] }} className="text-xs text-gray-500">to</motion.span>
                            <motion.input
                              type="text"
                              placeholder="7:00 AM"
                              className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 w-16 text-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5, duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                              readOnly
                            />
                            <motion.span
                              className="text-xs text-gray-400 ml-2"
                              initial={{ opacity: 0, x: -25 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5, duration: 0.3, ease: [0, 0.55, 0.45, 1] }}
                            >
                              UTC-8
                            </motion.span>
                          </div>
                        </motion.div>

                        {/* Create Direct Email Card */}
                        <motion.div
                          className="rounded-lg border shadow-sm p-4 "
                          initial={{ opacity: 0, y: 10, filter: "blur(4px)", }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)", }}
                          transition={{ delay: 0.4, duration: 0.4, ease: [0, 0.55, 0.45, 1] }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                <DirectboxSend className={'rotate-90'} size={16} variant="Bulk" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">Create Direct Email</div>
                                <div className="text-xs text-gray-500">Send draft as seperate email</div>
                              </div>
                            </div>
                            <motion.div
                              className="w-10 h-6 rounded-full transition-colors bg-primary"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <motion.div
                                className="w-4 h-4 bg-white rounded-full mt-1 transition-transform"
                                animate={{ x: 20 }}
                                transition={{ delay: 0.5, duration: 0.2 }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}