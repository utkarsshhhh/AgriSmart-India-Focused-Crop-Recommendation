import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, ZAxis } from 'recharts';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const cropData = [
  { name: 'Rice', N: 80, P: 48, K: 40, temp: 24, humidity: 82, ph: 6.4, rainfall: 236 },
  { name: 'Maize', N: 78, P: 48, K: 20, temp: 22, humidity: 65, ph: 6.2, rainfall: 85 },
  { name: 'Chickpea', N: 40, P: 68, K: 80, temp: 19, humidity: 17, ph: 7.4, rainfall: 80 },
  { name: 'Kidneybeans', N: 21, P: 68, K: 20, temp: 20, humidity: 22, ph: 5.7, rainfall: 106 },
  { name: 'Pigeonpeas', N: 21, P: 68, K: 20, temp: 28, humidity: 48, ph: 5.7, rainfall: 150 },
  { name: 'Mothbeans', N: 21, P: 48, K: 20, temp: 28, humidity: 53, ph: 6.8, rainfall: 51 },
  { name: 'Mungbean', N: 21, P: 48, K: 20, temp: 28, humidity: 85, ph: 6.7, rainfall: 48 },
  { name: 'Blackgram', N: 40, P: 68, K: 20, temp: 30, humidity: 65, ph: 7.2, rainfall: 68 },
  { name: 'Lentil', N: 21, P: 68, K: 20, temp: 25, humidity: 65, ph: 6.9, rainfall: 45 },
  { name: 'Pomegranate', N: 21, P: 20, K: 40, temp: 22, humidity: 90, ph: 6.4, rainfall: 108 },
];

const correlationData = [
  { x: 1, y: 1, z: 1, name: 'N-P' },
  { x: 2, y: 2, z: -0.2, name: 'N-K' },
  { x: 3, y: 3, z: 0.8, name: 'P-K' },
  { x: 4, y: 4, z: -0.5, name: 'Temp-Hum' },
];

export default function EDA() {
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
      className="max-w-7xl mx-auto space-y-12"
    >
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black text-[var(--text-main)] tracking-tighter">Exploratory <span className="text-emerald-600">Insights</span></h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
          Visualizing the Indian Crop Recommendation Dataset to understand the relationship between soil nutrients, climate, and optimal growth.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-none shadow-2xl shadow-[var(--shadow-color)] rounded-[2.5rem] overflow-hidden bg-[var(--bg-card)]">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                <CardTitle className="text-xl font-black tracking-tight text-[var(--text-main)]">Soil Nutrient Profile</CardTitle>
              </div>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Average NPK Requirements by Crop</p>
            </CardHeader>
            <CardContent className="h-96 p-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} 
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} />
                  <Tooltip 
                    cursor={{ fill: cursorColor }}
                    contentStyle={{ backgroundColor: tooltipBg, borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px', color: isDark ? '#f8fafc' : '#0f172a' }} 
                    itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="N" fill="#10b981" name="Nitrogen" radius={[6, 6, 0, 0]} barSize={12} />
                  <Bar dataKey="P" fill="#3b82f6" name="Phosphorus" radius={[6, 6, 0, 0]} barSize={12} />
                  <Bar dataKey="K" fill="#f59e0b" name="Potassium" radius={[6, 6, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="border-none shadow-2xl shadow-[var(--shadow-color)] rounded-[2.5rem] overflow-hidden bg-[var(--bg-card)]">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-blue-500 rounded-full" />
                <CardTitle className="text-xl font-black tracking-tight text-[var(--text-main)]">Climate Correlation</CardTitle>
              </div>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Temperature vs Humidity Requirements</p>
            </CardHeader>
            <CardContent className="h-96 p-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cropData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} 
                  />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: tooltipBg, borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px', color: isDark ? '#f8fafc' : '#0f172a' }} 
                    itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#ef4444" name="Temp (°C)" strokeWidth={4} dot={{ r: 6, fill: '#ef4444', strokeWidth: 3, stroke: isDark ? '#0f172a' : '#fff' }} activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity (%)" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: isDark ? '#0f172a' : '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="lg:col-span-2">
          <Card className="border-none shadow-2xl shadow-[var(--shadow-color)] rounded-[2.5rem] overflow-hidden bg-[var(--bg-card)]">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-sky-500 rounded-full" />
                <CardTitle className="text-xl font-black tracking-tight text-[var(--text-main)]">Hydrological Distribution</CardTitle>
              </div>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Rainfall Requirements Across Different Crops</p>
            </CardHeader>
            <CardContent className="h-96 p-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} 
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: tickColor }} />
                  <Tooltip 
                    cursor={{ fill: cursorColor }}
                    contentStyle={{ backgroundColor: tooltipBg, borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px', color: isDark ? '#f8fafc' : '#0f172a' }} 
                    itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                  />
                  <Bar dataKey="rainfall" fill="url(#rainGradient)" name="Rainfall (mm)" radius={[10, 10, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
