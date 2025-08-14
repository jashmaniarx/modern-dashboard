"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  Users, 
  Activity,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  ShoppingCart,
  Target,
  Zap,
  Clock,
  Calendar,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  Database,
  Server,
  Bell,
  Star,
  ThumbsUp,
  MessageSquare,
  Heart,
  Share2,
  Download,
  Upload,
  CreditCard,
  Settings
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricData {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: number[]
}

interface ChartData {
  name: string
  value: number
  change: number
}

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl ${className}`}>
      {children}
    </div>
  )
}

const SparklineChart = ({ data, color = "#10B981", width = 100, height = 40 }: { 
  data: number[], 
  color?: string, 
  width?: number, 
  height?: number 
}) => {
  const minVal = Math.min(...data)
  const maxVal = Math.max(...data)
  const range = maxVal - minVal || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - minVal) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon 
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#gradient-${color.replace('#', '')})`}
      />
    </svg>
  )
}

const AnimatedCounter = ({ value, duration = 2000 }: { value: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""))
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const currentValue = numericValue * progress
      const formatted = value.includes('$') 
        ? `$${currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        : value.includes('%')
        ? `${currentValue.toFixed(1)}%`
        : currentValue.toLocaleString()
      
      setDisplayValue(formatted)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{displayValue}</span>
}

// Modern animated card component with hover effects
const ModernCard = ({ children, className = "", delay = 0, onClick }: { 
  children: React.ReactNode, 
  className?: string,
  delay?: number,
  onClick?: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// Pulse animation component
const PulseIcon = ({ children, color = "blue" }: { children: React.ReactNode, color?: string }) => {
  const colors = {
    blue: "shadow-blue-500/50",
    green: "shadow-green-500/50",
    purple: "shadow-purple-500/50",
    red: "shadow-red-500/50",
    yellow: "shadow-yellow-500/50"
  }
  
  return (
    <motion.div
      animate={{ 
        boxShadow: [
          `0 0 0 0 rgba(59, 130, 246, 0.4)`,
          `0 0 0 10px rgba(59, 130, 246, 0)`,
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`p-3 rounded-xl bg-white/10 ${colors[color as keyof typeof colors]}`}
    >
      {children}
    </motion.div>
  )
}

export default function DashboardStatsWidget() {
  const [showValues, setShowValues] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedMetric, setSelectedMetric] = useState(0)

  // Extended data with more metrics
  const mainMetrics = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: 12.5,
      icon: <DollarSign className="h-6 w-6" />,
      trend: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000, 124563],
      color: "green"
    },
    {
      title: "Active Users",
      value: "8,429",
      change: -2.1,
      icon: <Users className="h-6 w-6" />,
      trend: [7800, 8100, 7950, 8200, 8350, 8150, 8400, 8500, 8429],
      color: "blue"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: 8.7,
      icon: <Target className="h-6 w-6" />,
      trend: [2.8, 2.9, 3.1, 2.95, 3.0, 3.15, 3.2, 3.18, 3.24],
      color: "purple"
    },
    {
      title: "Orders",
      value: "1,247",
      change: 15.3,
      icon: <ShoppingCart className="h-6 w-6" />,
      trend: [800, 900, 850, 1100, 1000, 1200, 1300, 1250, 1247],
      color: "yellow"
    }
  ]

  const deviceData = [
    { device: "Desktop", percentage: 65, users: 5479, color: "#3B82F6", icon: <Monitor className="h-4 w-4" /> },
    { device: "Mobile", percentage: 28, users: 2360, color: "#10B981", icon: <Smartphone className="h-4 w-4" /> },
    { device: "Tablet", percentage: 7, users: 590, color: "#8B5CF6", icon: <Tablet className="h-4 w-4" /> }
  ]

  const topCountries = [
    { country: "United States", users: 3247, percentage: 38.5, flag: "🇺🇸" },
    { country: "United Kingdom", users: 1852, percentage: 22.0, flag: "🇬🇧" },
    { country: "Germany", users: 1243, percentage: 14.7, flag: "🇩🇪" },
    { country: "France", users: 987, percentage: 11.7, flag: "🇫🇷" },
    { country: "Canada", users: 1100, percentage: 13.1, flag: "🇨🇦" }
  ]

  const recentTransactions = [
    { id: "#12345", customer: "Alice Johnson", amount: "$2,450", status: "completed", time: "2 min ago" },
    { id: "#12346", customer: "Bob Smith", amount: "$1,200", status: "pending", time: "5 min ago" },
    { id: "#12347", customer: "Carol Davis", amount: "$3,100", status: "completed", time: "8 min ago" },
    { id: "#12348", customer: "David Wilson", amount: "$899", status: "failed", time: "12 min ago" }
  ]

  const socialMetrics = [
    { platform: "Twitter", followers: "24.5K", growth: 12.3, color: "#1DA1F2", icon: <Share2 className="h-5 w-5" /> },
    { platform: "Instagram", followers: "18.2K", growth: 8.7, color: "#E4405F", icon: <Heart className="h-5 w-5" /> },
    { platform: "LinkedIn", followers: "12.8K", growth: 15.2, color: "#0077B5", icon: <ThumbsUp className="h-5 w-5" /> },
    { platform: "YouTube", followers: "8.4K", growth: 22.1, color: "#FF0000", icon: <Star className="h-5 w-5" /> }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <ModernCard className="p-8">
              <div className="flex justify-between items-center">
                <div>
                  <motion.h1 
                    className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Analytics Dashboard
                  </motion.h1>
                  <motion.p 
                    className="text-white/70 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Real-time business insights • Live data stream • {new Date().toLocaleDateString()}
                  </motion.p>
                </div>
                <div className="flex items-center gap-6">
                  <motion.div 
                    className="text-right"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-white/80 text-sm font-medium">Local Time</div>
                    <div className="text-2xl font-mono text-white">
                      {formatTime(currentTime)}
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={() => setShowValues(!showValues)}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <AnimatePresence mode="wait">
                      {showValues ? (
                        <motion.div
                          key="eye"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                        >
                          <Eye className="h-6 w-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="eye-off"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                        >
                          <EyeOff className="h-6 w-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </ModernCard>
          </motion.div>

          {/* Bento Box Layout */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Main Metrics - Top Row */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainMetrics.map((metric, index) => (
                <ModernCard 
                  key={metric.title}
                  delay={index * 0.1}
                  className="p-6 cursor-pointer group"
                  onClick={() => setSelectedMetric(index)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <PulseIcon color={metric.color}>
                      <div className="text-white">
                        {metric.icon}
                      </div>
                    </PulseIcon>
                    <motion.div 
                      className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                        metric.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {metric.change >= 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(metric.change)}%
                    </motion.div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-white/70 text-sm font-medium tracking-wide uppercase">
                      {metric.title}
                    </h3>
                    <motion.div 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {showValues ? (
                        <AnimatedCounter value={metric.value} />
                      ) : (
                        "••••••"
                      )}
                    </motion.div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <SparklineChart 
                        data={metric.trend} 
                        color={metric.change >= 0 ? "#10B981" : "#EF4444"}
                        width={100}
                        height={40}
                      />
                    </motion.div>
                  </div>
                </ModernCard>
              ))}
            </div>

            {/* Revenue Chart - Large */}
            <div className="col-span-12 lg:col-span-8">
              <ModernCard delay={0.5} className="p-8 h-full">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Revenue Analytics</h3>
                    <p className="text-white/60">Monthly performance breakdown</p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <BarChart3 className="h-8 w-8 text-white/40" />
                  </motion.div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { month: "January", revenue: 45000, growth: 8.2, color: "#3B82F6" },
                    { month: "February", revenue: 52000, growth: 15.6, color: "#10B981" },
                    { month: "March", revenue: 48000, growth: -7.7, color: "#EF4444" },
                    { month: "April", revenue: 61000, growth: 27.1, color: "#8B5CF6" },
                    { month: "May", revenue: 55000, growth: -9.8, color: "#F59E0B" },
                    { month: "June", revenue: 67000, growth: 21.8, color: "#06B6D4" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.month}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/80 font-medium text-lg">{item.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-white font-bold text-xl">
                            {showValues ? `$${item.revenue.toLocaleString()}` : "••••••"}
                          </span>
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            item.growth >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {item.growth >= 0 ? '+' : ''}{item.growth}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.revenue / 67000) * 100}%` }}
                          transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Performance Ring - Medium */}
            <div className="col-span-12 lg:col-span-4">
              <ModernCard delay={0.6} className="p-8 h-full">
                <h3 className="text-xl font-bold text-white mb-8">System Health</h3>
                
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="10"
                          fill="none"
                        />
                        <motion.circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#healthGradient)"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - 0.87) }}
                          transition={{ duration: 2.5, delay: 1 }}
                        />
                        <defs>
                          <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div 
                            className="text-4xl font-bold text-white mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 }}
                          >
                            {showValues ? <AnimatedCounter value="87%" /> : "••%"}
                          </motion.div>
                          <div className="text-white/60 text-sm">Health Score</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "CPU", value: "23%", status: "good", icon: <Zap className="h-4 w-4" /> },
                      { label: "Memory", value: "67%", status: "warning", icon: <Database className="h-4 w-4" /> },
                      { label: "Disk", value: "45%", status: "good", icon: <Server className="h-4 w-4" /> },
                      { label: "Network", value: "12ms", status: "excellent", icon: <Wifi className="h-4 w-4" /> }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="flex justify-center mb-2 text-white/60">
                          {metric.icon}
                        </div>
                        <div className="text-sm text-white/70 mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-white">
                          {showValues ? metric.value : "••"}
                        </div>
                        <div className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                          metric.status === 'excellent' ? 'bg-green-400' :
                          metric.status === 'good' ? 'bg-blue-400' :
                          metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                        }`} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ModernCard>
            </div>

            {/* Device Analytics */}
            <div className="col-span-12 md:col-span-6">
              <ModernCard delay={0.7} className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Device Analytics</h3>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <motion.div
                      key={device.device}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-white/80">
                          {device.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">{device.device}</div>
                          <div className="text-white/60 text-sm">
                            {showValues ? device.users.toLocaleString() : "••••"} users
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">
                          {showValues ? `${device.percentage}%` : "••%"}
                        </div>
                        <div className="w-16 h-2 bg-white/10 rounded-full mt-2">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: device.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${device.percentage}%` }}
                            transition={{ duration: 1, delay: 1 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Top Countries */}
            <div className="col-span-12 md:col-span-6">
              <ModernCard delay={0.8} className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="h-5 w-5 text-white/80" />
                  <h3 className="text-xl font-bold text-white">Top Countries</h3>
                </div>
                <div className="space-y-3">
                  {topCountries.map((country, index) => (
                    <motion.div
                      key={country.country}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <div className="text-white font-medium">{country.country}</div>
                          <div className="text-white/60 text-sm">
                            {showValues ? country.users.toLocaleString() : "••••"} visitors
                          </div>
                        </div>
                      </div>
                      <div className="text-white font-bold">
                        {showValues ? `${country.percentage}%` : "••%"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Social Media Metrics */}
            <div className="col-span-12 lg:col-span-8">
              <ModernCard delay={0.9} className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Social Media Growth</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {socialMetrics.map((social, index) => (
                    <motion.div
                      key={social.platform}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="p-4 bg-white/5 rounded-xl text-center group hover:bg-white/10 transition-all"
                    >
                      <div 
                        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white"
                        style={{ backgroundColor: social.color + '20' }}
                      >
                        <div style={{ color: social.color }}>
                          {social.icon}
                        </div>
                      </div>
                      <div className="text-white font-medium mb-1">{social.platform}</div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {showValues ? social.followers : "••••"}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-green-400 text-sm">
                        <ArrowUpRight className="h-3 w-3" />
                        +{social.growth}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Quick Actions */}
            <div className="col-span-12 lg:col-span-4">
              <ModernCard delay={1.0} className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { action: "Export Report", icon: <Download className="h-4 w-4" />, color: "blue" },
                    { action: "Share Dashboard", icon: <Share2 className="h-4 w-4" />, color: "green" },
                    { action: "Schedule Report", icon: <Calendar className="h-4 w-4" />, color: "purple" },
                    { action: "Settings", icon: <Settings className="h-4 w-4" />, color: "yellow" }
                  ].map((action, index) => (
                    <motion.button
                      key={action.action}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-all flex items-center gap-3"
                    >
                      <div className="text-white/80">
                        {action.icon}
                      </div>
                      <span className="text-white font-medium">{action.action}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/40 ml-auto" />
                    </motion.button>
                  ))}
                </div>
              </ModernCard>
            </div>

            {/* Recent Transactions */}
            <div className="col-span-12">
              <ModernCard delay={1.1} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CreditCard className="h-5 w-5 text-white/60" />
                  </motion.div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-white/60 font-medium p-3">Transaction ID</th>
                        <th className="text-left text-white/60 font-medium p-3">Customer</th>
                        <th className="text-left text-white/60 font-medium p-3">Amount</th>
                        <th className="text-left text-white/60 font-medium p-3">Status</th>
                        <th className="text-left text-white/60 font-medium p-3">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-3 text-white/80 font-mono">{transaction.id}</td>
                          <td className="p-3 text-white">{transaction.customer}</td>
                          <td className="p-3 text-white font-bold">
                            {showValues ? transaction.amount : "••••"}
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="p-3 text-white/60">{transaction.time}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ModernCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}