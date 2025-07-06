"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, AlertTriangle, MapPin, Smartphone, MessageSquare, Phone } from "lucide-react"

export default function WowDemoSection() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [voiceText, setVoiceText] = useState("")
  const [currentSpeed, setCurrentSpeed] = useState(45)
  const [userPosition, setUserPosition] = useState({ x: 50, y: 50 })
  const [activeFeature, setActiveFeature] = useState(0) // 0: Voice, 1: USSD, 2: SMS

  const phases = [
    { text: "Hey TrafficAz...", color: "from-blue-500 to-cyan-500" },
    { text: "What's traffic like in Melen?", color: "from-green-500 to-emerald-500" },
    { text: "Analyzing traffic patterns...", color: "from-yellow-500 to-orange-500" },
    { text: "Traffic is moderate. ETA: 12 minutes", color: "from-purple-500 to-pink-500" },
  ]

  const ussdPhases = [
    { text: "*123*TRAFFIC#", color: "from-orange-500 to-red-500" },
    { text: "Dialing USSD code...", color: "from-blue-500 to-purple-500" },
    { text: "Processing location...", color: "from-yellow-500 to-orange-500" },
    { text: "Traffic: Moderate. ETA: 12min", color: "from-green-500 to-emerald-500" },
  ]

  const smsPhases = [
    { text: "TRAFFIC MELEN", color: "from-pink-500 to-rose-500" },
    { text: "Sending SMS to 1234...", color: "from-blue-500 to-indigo-500" },
    { text: "Analyzing request...", color: "from-yellow-500 to-amber-500" },
    { text: "Reply: Moderate traffic. 12min ETA", color: "from-green-500 to-teal-500" },
  ]

  const getCurrentPhases = () => {
    switch (activeFeature) {
      case 1:
        return ussdPhases
      case 2:
        return smsPhases
      default:
        return phases
    }
  }

  useEffect(() => {
    if (isRecording) {
      const currentPhases = getCurrentPhases()
      const interval = setInterval(() => {
        setCurrentPhase((prev) => {
          if (prev < currentPhases.length - 1) {
            setVoiceText(currentPhases[prev + 1].text)
            return prev + 1
          } else {
            setIsRecording(false)
            return 0
          }
        })
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isRecording, activeFeature])

  // Simulate moving user and changing speed
  useEffect(() => {
    const interval = setInterval(() => {
      setUserPosition((prev) => ({
        x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 10)),
        y: Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 10)),
      }))
      setCurrentSpeed((prev) => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 10)))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const startDemo = (featureType: number) => {
    setActiveFeature(featureType)
    setIsRecording(true)
    setCurrentPhase(0)
    const currentPhases = featureType === 1 ? ussdPhases : featureType === 2 ? smsPhases : phases
    setVoiceText(currentPhases[0].text)
  }

  const getFeatureIcon = () => {
    switch (activeFeature) {
      case 1:
        return Phone
      case 2:
        return MessageSquare
      default:
        return Mic
    }
  }

  const getFeatureGradient = () => {
    switch (activeFeature) {
      case 1:
        return "from-orange-500 to-red-600"
      case 2:
        return "from-pink-500 to-rose-600"
      default:
        return "from-red-500 to-pink-600"
    }
  }

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            animate={{
              x: [0, Math.random() * 200],
              y: [0, Math.random() * 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, #ef4444, #ec4899, #8b5cf6)",
                "linear-gradient(45deg, #8b5cf6, #ef4444, #ec4899)",
                "linear-gradient(45deg, #ec4899, #8b5cf6, #ef4444)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Experience the Future
          </motion.h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Watch TrafficAz transform your driving experience with AI-powered voice intelligence, USSD, and SMS support
          </p>
        </motion.div>

        {/* Feature Selection Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex bg-slate-800/50 backdrop-blur-xl rounded-full p-2 border border-slate-700">
            {[
              { icon: Mic, label: "Voice AI", index: 0 },
              { icon: Phone, label: "USSD", index: 1 },
              { icon: MessageSquare, label: "SMS", index: 2 },
            ].map((tab) => (
              <motion.button
                key={tab.index}
                onClick={() => setActiveFeature(tab.index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFeature === tab.index
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Demo Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Voice/USSD/SMS Interface */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 p-8">
              <CardContent className="p-0">
                <div className="text-center">
                  <motion.div
                    className="relative w-40 h-40 mx-auto mb-8"
                    animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-full animate-pulse" />
                    <div
                      className={`absolute inset-4 bg-gradient-to-br ${getFeatureGradient()} rounded-full flex items-center justify-center`}
                    >
                      {(() => {
                        const IconComponent = getFeatureIcon()
                        return <IconComponent className="h-16 w-16 text-white" />
                      })()}
                    </div>
                    {isRecording && (
                      <motion.div
                        className="absolute inset-0 border-4 border-white rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </motion.div>

                  <motion.div
                    className="h-20 mb-8 flex items-center justify-center"
                    animate={{ opacity: isRecording ? 1 : 0.5 }}
                  >
                    <motion.p
                      className={`text-xl font-semibold bg-gradient-to-r ${
                        getCurrentPhases()[currentPhase]?.color || "from-slate-400 to-slate-600"
                      } bg-clip-text text-transparent text-center`}
                      key={voiceText}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {voiceText ||
                        (activeFeature === 0
                          ? "Click to start voice demo"
                          : activeFeature === 1
                            ? "Click to start USSD demo"
                            : "Click to start SMS demo")}
                    </motion.p>
                  </motion.div>

                  <Button
                    size="lg"
                    onClick={() => startDemo(activeFeature)}
                    disabled={isRecording}
                    className={`bg-gradient-to-r ${getFeatureGradient()} hover:opacity-90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300`}
                  >
                    {isRecording
                      ? "Processing..."
                      : activeFeature === 0
                        ? "Start Voice Demo"
                        : activeFeature === 1
                          ? "Dial USSD"
                          : "Send SMS"}
                  </Button>

                  {/* Feature Description */}
                  <motion.div
                    className="mt-6 p-4 bg-slate-700/30 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm text-slate-300">
                      {activeFeature === 0 && "AI-powered voice commands for hands-free navigation"}
                      {activeFeature === 1 && "Works on any phone - dial *123*TRAFFIC# for instant updates"}
                      {activeFeature === 2 && "Send 'TRAFFIC [LOCATION]' to 1234 for traffic info"}
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Map Simulation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Live Map Tracking</h3>
                  <motion.div
                    className="flex items-center space-x-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <MapPin className="h-5 w-5 text-green-500" />
                    <span className="text-green-400 font-mono">{Math.round(currentSpeed)} km/h</span>
                  </motion.div>
                </div>

                {/* Map Container */}
                <div className="bg-slate-700/50 rounded-xl p-4 relative overflow-hidden h-64 mb-4">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-10 grid-rows-10 h-full">
                      {[...Array(100)].map((_, i) => (
                        <div key={i} className="border border-slate-600/30" />
                      ))}
                    </div>
                  </div>

                  {/* Roads */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-0 right-0 h-1 bg-slate-600" />
                    <div className="absolute top-2/3 left-0 right-0 h-1 bg-slate-600" />
                    <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-slate-600" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-slate-600" />
                  </div>

                  {/* Animated User Location */}
                  <motion.div
                    className="absolute w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full z-10"
                    animate={{
                      x: `${userPosition.x}%`,
                      y: `${userPosition.y}%`,
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-red-500 rounded-full"
                      animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>

                  {/* Traffic Indicators */}
                  <div className="absolute top-2 right-2 space-y-1">
                    {[
                      { color: "bg-green-500", label: "Light", active: currentSpeed > 60 },
                      { color: "bg-yellow-500", label: "Moderate", active: currentSpeed >= 30 && currentSpeed <= 60 },
                      { color: "bg-red-500", label: "Heavy", active: currentSpeed < 30 },
                    ].map((traffic, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-1 text-xs"
                        animate={{ opacity: traffic.active ? 1 : 0.3 }}
                      >
                        <div
                          className={`w-2 h-2 ${traffic.color} rounded-full ${traffic.active ? "animate-pulse" : ""}`}
                        />
                        <span className="text-slate-300">{traffic.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Speed Display */}
                  <motion.div
                    className="absolute bottom-2 left-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="text-2xl font-bold text-white font-mono">{Math.round(currentSpeed)}</div>
                    <div className="text-xs text-slate-300">km/h</div>
                  </motion.div>
                </div>

                {/* Location Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Current Location</span>
                    <span className="text-green-400 font-medium">Melen, Ankara</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Traffic Level</span>
                    <span
                      className={`font-medium ${
                        currentSpeed > 60 ? "text-green-400" : currentSpeed >= 30 ? "text-yellow-400" : "text-red-400"
                      }`}
                    >
                      {currentSpeed > 60 ? "Light" : currentSpeed >= 30 ? "Moderate" : "Heavy"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">ETA to Destination</span>
                    <span className="text-blue-400 font-medium">
                      {Math.round(12 + (60 - currentSpeed) / 10)} minutes
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Alerts & Status */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Traffic Status */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">System Status</h3>
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Voice AI</span>
                    <span className="text-green-400">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">USSD Gateway</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">SMS Service</span>
                    <span className="text-green-400">Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">GPS Tracking</span>
                    <span className="text-blue-400">Precise</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Alerts */}
            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Live Alerts</h3>
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-sm">Construction on Main St</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Clear route ahead</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Weather: Clear skies</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Features */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-xl border-slate-600 p-6">
              <CardContent className="p-0">
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Smartphone className="h-6 w-6 text-white" />
                  </motion.div>
                  <h4 className="text-lg font-semibold mb-2">Universal Access</h4>
                  <p className="text-sm text-slate-300">
                    Works on smartphones, feature phones, and basic devices via USSD & SMS
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
