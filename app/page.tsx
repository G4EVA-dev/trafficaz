"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MapPin, Zap, Shield, Bell, ArrowRight, Github, Twitter, Mail, Play } from "lucide-react"
import EnhancedHero from "@/components/enhanced-hero"
import WowDemoSection from "@/components/wow-demo-section"

export default function TrafficAzLanding() {
  const { scrollYProgress } = useScroll()
  const [currentStep, setCurrentStep] = useState(0)

  // Auto-cycle through demo steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Mic,
      title: "Voice Assistant",
      description: "Natural voice commands for hands-free navigation",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: MapPin,
      title: "Location + Speed API",
      description: "Real-time GPS tracking with speed monitoring",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Shield,
      title: "Driver Safety Mode",
      description: "Intelligent alerts for safer driving experience",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Context-aware traffic and emergency alerts",
      gradient: "from-purple-500 to-pink-600",
    },
  ]

  const workflowSteps = [
    {
      title: "Voice Activation",
      description: "Hey TrafficAz, what's traffic like in Melen?",
      icon: Mic,
      gradient: "from-red-500 to-pink-600",
    },
    {
      title: "Real-Time Location Tracking",
      description: "GPS coordinates and speed detection",
      icon: MapPin,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Speed-Based Congestion Detection",
      description: "AI-powered traffic analysis",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      title: "Emergency Alerts",
      description: "Instant notifications for road conditions",
      icon: Bell,
      gradient: "from-purple-500 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              How It Works
            </motion.h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience seamless traffic intelligence through voice commands and real-time AI analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
                    }}
                  />

                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-2xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wow Demo Section */}
      <WowDemoSection />

      {/* Enhanced Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">Powerful Features</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Advanced AI technology stack for intelligent traffic management and driver safety
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full text-center border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to experience{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                smarter driving?
              </span>
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Join thousands of drivers who trust TrafficAz for safer, more efficient journeys every day
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-2xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="relative z-10 flex items-center">
                  <Play className="mr-3 h-6 w-6" />
                  Launch Demo
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <motion.h3 className="text-3xl font-bold mb-2" whileHover={{ scale: 1.05 }}>
                <span className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent">
                  Traffic
                </span>
                <span className="text-white">Az</span>
              </motion.h3>
              <p className="text-slate-400 text-lg">Smarter Navigation. Safer Roads.</p>
            </div>

            <div className="flex space-x-8">
              <motion.a
                href="https://github.com/CONIA-Hackathon/README.md"
                className="text-slate-400 hover:text-white transition-colors group"
                whileHover={{ scale: 1.2 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Twitter className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <Mail className="h-8 w-8" />
              </motion.a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 TrafficAz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
