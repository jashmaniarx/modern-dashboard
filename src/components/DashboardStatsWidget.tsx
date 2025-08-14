"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
  ArrowDownRight
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

export default function DashboardStatsWidget() {
  const [showValues, setShowValues] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  const metricsData: MetricData[] = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: 12.5,
      icon: <DollarSign className="h-5 w-5" />,
      trend: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000, 124563]
    },
    {
      title: "Active Users",
      value: "8,429",
      change: -2.1,
      icon: <Users className="h-5 w-5" />,
      trend: [7800, 8100, 7950, 8200, 8350, 8150, 8400, 8500, 8429]
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: 8.7,
      icon: <TrendingUp className="h-5 w-5" />,
      trend: [2.8, 2.9, 3.1, 2.95, 3.0, 3.15, 3.2, 3.18, 3.24]
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: -5.2,
      icon: <Activity className="h-5 w-5" />,
      trend: [48.5, 47.2, 46.8, 45.1, 44.7, 43.9, 43.2, 42.8, 42.3]
    }
  ]

  const chartData: ChartData[] = [
    { name: "Jan", value: 4000, change: 5.2 },
    { name: "Feb", value: 3000, change: -2.1 },
    { name: "Mar", value: 5000, change: 8.7 },
    { name: "Apr", value: 4500, change: 3.4 },
    { name: "May", value: 6000, change: 12.1 },
    { name: "Jun", value: 5500, change: -1.8 }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
                <p className="text-white/70">Real-time business metrics and insights</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-white/80 text-sm">
                  {formatTime(currentTime)}
                </div>
                <button
                  onClick={() => setShowValues(!showValues)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  {showValues ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <div className="text-white/80">
                      {metric.icon}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.change >= 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-white/70 text-sm font-medium">{metric.title}</h3>
                  <div className="text-2xl font-bold text-white">
                    {showValues ? (
                      <AnimatedCounter value={metric.value} />
                    ) : (
                      "••••••"
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <SparklineChart 
                    data={metric.trend} 
                    color={metric.change >= 0 ? "#10B981" : "#EF4444"}
                    width={80}
                    height={30}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Revenue Trend</h3>
                <BarChart3 className="h-5 w-5 text-white/60" />
              </div>
              
              <div className="space-y-4">
                {chartData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/70 text-sm w-8">{item.name}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2 min-w-[120px]">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / 6000) * 100}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">
                        {showValues ? `$${item.value.toLocaleString()}` : "••••"}
                      </span>
                      <span className={`text-xs ${
                        item.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.change >= 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Performance Overview</h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - 0.73) }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {showValues ? <AnimatedCounter value="73%" /> : "••%"}
                        </div>
                        <div className="text-white/60 text-sm">Overall Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-lg font-semibold text-white">
                      {showValues ? <AnimatedCounter value="94%" /> : "••%"}
                    </div>
                    <div className="text-white/60 text-sm">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-lg font-semibold text-white">
                      {showValues ? <AnimatedCounter value="1.2s" /> : "•••"}
                    </div>
                    <div className="text-white/60 text-sm">Load Time</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { action: "New user registration", time: "2 minutes ago", type: "success" },
                { action: "Payment processed", time: "5 minutes ago", type: "success" },
                { action: "Server maintenance completed", time: "1 hour ago", type: "info" },
                { action: "High traffic detected", time: "2 hours ago", type: "warning" }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`} />
                    <span className="text-white">{activity.action}</span>
                  </div>
                  <span className="text-white/60 text-sm">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}