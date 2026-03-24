import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, ShieldCheck, Cpu, BarChart3, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const modelData = [
  { name: 'Random Forest', accuracy: 99.3, precision: 99.1, recall: 99.4, f1: 99.2, color: '#10b981' },
  { name: 'XGBoost', accuracy: 98.9, precision: 98.7, recall: 99.0, f1: 98.8, color: '#3b82f6' },
  { name: 'SVM', accuracy: 98.1, precision: 98.0, recall: 98.2, f1: 98.1, color: '#8b5cf6' },
  { name: 'KNN', accuracy: 97.5, precision: 97.2, recall: 97.8, f1: 97.5, color: '#f59e0b' },
  { name: 'Decision Tree', accuracy: 90.1, precision: 89.5, recall: 90.4, f1: 89.9, color: '#ef4444' },
];

export default function Evaluation() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const tickColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const cursorColor = isDark ? '#1e293b' : '#f8fafc';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-12 pb-20"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-bold tracking-wide uppercase mb-4"
        >
          <Cpu className="w-4 h-4 mr-2" />
          Model Performance Analysis
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black text-[var(--text-main)] tracking-tighter">
          Algorithmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Precision</span>
        </h1>
        <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
          Comparative evaluation of 5 machine learning models for high-accuracy crop recommendation.
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Best Model",
            value: "Random Forest",
            sub: "99.3% Accuracy",
            icon: CheckCircle2,
            color: "emerald",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            text: "text-emerald-600 dark:text-emerald-400",
            border: "border-emerald-100 dark:border-emerald-500/20"
          },
          {
            title: "Runner Up",
            value: "XGBoost",
            sub: "98.9% Accuracy",
            icon: TrendingUp,
            color: "blue",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            text: "text-blue-600 dark:text-blue-400",
            border: "border-blue-100 dark:border-blue-500/20"
          },
          {
            title: "Methodology",
            value: "5-Fold CV",
            sub: "Robust Validation",
            icon: ShieldCheck,
            color: "purple",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            text: "text-purple-600 dark:text-purple-400",
            border: "border-purple-100 dark:border-purple-500/20"
          }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
          >
            <Card className={`glass-card border-none overflow-hidden group`}>
              <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500`} />
              <CardContent className="p-8 flex items-start space-x-6">
                <div className={`p-4 ${stat.bg} rounded-2xl ${stat.text} transition-transform group-hover:scale-110 duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <p className={`text-xs font-black ${stat.text} uppercase tracking-[0.2em] mb-1`}>{stat.title}</p>
                  <h3 className="text-2xl font-black text-[var(--text-main)] leading-tight">{stat.value}</h3>
                  <p className="text-sm font-bold text-[var(--text-muted)] mt-2 flex items-center">
                    <Zap className="w-3 h-3 mr-1 text-amber-500" />
                    {stat.sub}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Section */}
      <motion.div 
        whileHover={{ y: -5 }} 
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100/20 to-blue-100/20 rounded-[3rem] blur-3xl -z-10" />
        <Card className="glass-card border-none shadow-2xl shadow-[var(--shadow-color)] rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-10 pb-0 border-b border-[var(--border-main)]/50">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-3xl font-black tracking-tight flex items-center text-[var(--text-main)]">
                  <BarChart3 className="w-8 h-8 mr-3 text-emerald-600" />
                  Performance Metrics Comparison
                </CardTitle>
                <p className="text-[var(--text-muted)] font-medium">Detailed breakdown of accuracy, precision, recall, and F1-score.</p>
              </div>
              <div className="hidden md:flex space-x-2">
                {['Accuracy', 'Precision', 'Recall', 'F1'].map((m) => (
                  <span key={m} className="px-3 py-1 rounded-full bg-[var(--bg-input)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 h-[32rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 13, fontWeight: 800, fill: tickColor }} 
                  dy={15}
                />
                <YAxis 
                  domain={[80, 100]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 13, fontWeight: 800, fill: tickColor }} 
                />
                <Tooltip 
                  cursor={{ fill: cursorColor }}
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    padding: '20px',
                    backgroundColor: tooltipBg,
                    backdropFilter: 'blur(10px)',
                    color: isDark ? '#f8fafc' : '#0f172a'
                  }} 
                  itemStyle={{ fontWeight: 700, fontSize: '14px', color: isDark ? '#f8fafc' : '#0f172a' }}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ paddingTop: '40px', fontWeight: 700, color: tickColor }}
                />
                <Bar dataKey="accuracy" fill="#10b981" name="Accuracy" radius={[8, 8, 0, 0]} barSize={40} />
                <Bar dataKey="precision" fill="#3b82f6" name="Precision" radius={[8, 8, 0, 0]} barSize={40} />
                <Bar dataKey="recall" fill="#8b5cf6" name="Recall" radius={[8, 8, 0, 0]} barSize={40} />
                <Bar dataKey="f1" fill="#f59e0b" name="F1 Score" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {[
          {
            title: "Why Random Forest Wins",
            points: [
              { label: "Ensemble Learning", desc: "Builds multiple decision trees and merges them for stable, accurate predictions." },
              { label: "Reduced Variance", desc: "Averages multiple trees to eliminate overfitting risks inherent in single trees." },
              { label: "Non-linear Mastery", desc: "Naturally handles complex agricultural relationships without data transformation." }
            ],
            color: "emerald"
          },
          {
            title: "Bias vs Variance Analysis",
            points: [
              { label: "Decision Tree", desc: "Low bias but high variance; prone to memorizing training data noise." },
              { label: "KNN", desc: "Sensitive to feature scaling and choice of K; can suffer from high bias." },
              { label: "Random Forest", desc: "Perfect balance; maintains low bias while slashing variance via bagging." }
            ],
            color: "blue"
          }
        ].map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card border-none shadow-xl rounded-[2rem] overflow-hidden h-full">
              <CardHeader className={`bg-${insight.color}-50/50 dark:bg-${insight.color}-900/10 p-8 border-b border-${insight.color}-100/50 dark:border-${insight.color}-500/20`}>
                <CardTitle className="text-2xl font-black tracking-tight text-[var(--text-main)]">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {insight.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex space-x-4">
                    <div className={`mt-1.5 w-2 h-2 rounded-full bg-${insight.color}-500 flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]`} />
                    <div className="space-y-1">
                      <p className="font-black text-[var(--text-main)] tracking-tight">{point.label}</p>
                      <p className="text-[var(--text-muted)] font-medium leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
