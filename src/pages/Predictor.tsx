import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { predictCrop, getCropDetails } from '../services/gemini';
import { CropDetailsModal } from '../components/CropDetailsModal';
import { INDIAN_STATES_RAINFALL } from '../constants/rainfallData';
import { CROP_IMAGES } from '../constants/cropImages';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Droplets, 
  Thermometer, 
  FlaskConical, 
  Sprout, 
  Loader2, 
  CloudRain, 
  Sun, 
  Wind, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Zap,
  ChevronRight,
  Info,
  MapPin
} from 'lucide-react';

export default function Predictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [cropDetails, setCropDetails] = useState<any>(null);

  const [formData, setFormData] = useState({
    n: '90',
    p: '42',
    k: '43',
    temperature: '20.8',
    humidity: '82.0',
    ph: '6.5',
    rainfall: '202.9',
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'state') {
      const selectedState = INDIAN_STATES_RAINFALL.find(s => s.state === value);
      if (selectedState) {
        // We use a monthly average approximation for the model (Annual / 12)
        // Since the model expects a value around 200mm for rice, etc.
        const monthlyAvg = (selectedState.averageRainfall / 12).toFixed(1);
        setFormData(prev => ({ 
          ...prev, 
          state: value, 
          rainfall: monthlyAvg.toString() 
        }));
      } else {
        setFormData(prev => ({ ...prev, state: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await predictCrop(
        parseFloat(formData.n) || 0,
        parseFloat(formData.p) || 0,
        parseFloat(formData.k) || 0,
        parseFloat(formData.temperature) || 0,
        parseFloat(formData.humidity) || 0,
        parseFloat(formData.ph) || 0,
        parseFloat(formData.rainfall) || 0,
        formData.state
      );
      setResult(prediction);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async () => {
    if (!result?.crop) return;
    setIsModalOpen(true);
    setDetailsLoading(true);
    try {
      const details = await getCropDetails(result.crop);
      setCropDetails(details);
    } catch (err) {
      console.error("Failed to fetch crop details:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 shadow-sm"
        >
          <Zap className="w-3 h-3 fill-emerald-500" />
          AI-Powered Precision Analysis
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-5xl lg:text-6xl font-black text-[var(--text-main)] tracking-tighter">
            Crop Recommendation <span className="text-emerald-600">Engine</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
            Analyze soil nutrients and climate parameters using our advanced ML model to discover the most profitable crop for your specific land conditions.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none shadow-2xl shadow-[var(--shadow-color)] overflow-hidden rounded-[2rem]">
            <div className="organic-gradient p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Soil & Climate Data</h2>
                  <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest">Input Parameters</p>
                </div>
              </div>
            </div>
            <CardContent className="p-8 bg-[var(--bg-card)]">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Regional Context</span>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[var(--text-main)] ml-1">Select Indian State</label>
                    <div className="relative group">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3.5 bg-[var(--bg-input)] border border-[var(--border-main)] rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 text-[var(--text-main)] font-semibold appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[var(--bg-card)] text-[var(--text-main)]">Select a state (Optional)</option>
                        {INDIAN_STATES_RAINFALL.map((s) => (
                          <option key={s.state} value={s.state} className="bg-[var(--bg-card)] text-[var(--text-main)]">
                            {s.state}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)] group-hover:text-emerald-500 transition-colors">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] font-medium italic ml-1 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Auto-fills typical monthly rainfall for the region.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <FlaskConical className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Soil Nutrients</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-muted)] ml-1">Nitrogen (N)</label>
                      <Input 
                        name="n" 
                        type="number" 
                        min="0"
                        max="140"
                        value={formData.n} 
                        onChange={handleChange} 
                        required 
                        className="rounded-2xl bg-[var(--bg-input)] border-[var(--border-main)] focus:ring-emerald-500/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-muted)] ml-1">Phosphorus (P)</label>
                      <Input 
                        name="p" 
                        type="number" 
                        min="5"
                        max="145"
                        value={formData.p} 
                        onChange={handleChange} 
                        required 
                        className="rounded-2xl bg-[var(--bg-input)] border-[var(--border-main)] focus:ring-emerald-500/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-muted)] ml-1">Potassium (K)</label>
                      <Input 
                        name="k" 
                        type="number" 
                        min="5"
                        max="205"
                        value={formData.k} 
                        onChange={handleChange} 
                        required 
                        className="rounded-2xl bg-[var(--bg-input)] border-[var(--border-main)] focus:ring-emerald-500/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-muted)] ml-1">Soil pH</label>
                      <Input 
                        name="ph" 
                        type="number" 
                        step="0.1" 
                        min="0"
                        max="14"
                        value={formData.ph} 
                        onChange={handleChange} 
                        required 
                        className="rounded-2xl bg-[var(--bg-input)] border-[var(--border-main)] focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]">
                    <Sun className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Climate Conditions</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] ml-1">Temp (°C)</label>
                      <Input 
                        name="temperature" 
                        type="number" 
                        step="0.1" 
                        value={formData.temperature} 
                        onChange={handleChange} 
                        required 
                        className="rounded-xl bg-[var(--bg-input)] border-[var(--border-main)] text-center px-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] ml-1">Hum (%)</label>
                      <Input 
                        name="humidity" 
                        type="number" 
                        step="0.1" 
                        value={formData.humidity} 
                        onChange={handleChange} 
                        required 
                        className="rounded-xl bg-[var(--bg-input)] border-[var(--border-main)] text-center px-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] ml-1">Rain (mm)</label>
                      <Input 
                        name="rainfall" 
                        type="number" 
                        step="0.1" 
                        value={formData.rainfall} 
                        onChange={handleChange} 
                        required 
                        className="rounded-xl bg-[var(--bg-input)] border-[var(--border-main)] text-center px-1"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-black rounded-2xl organic-gradient shadow-xl shadow-emerald-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="tracking-tight">Analyzing Data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="tracking-tight uppercase tracking-widest text-sm">Generate Recommendation</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full min-h-[600px] flex flex-col items-center justify-center p-12 glass-card rounded-[3rem] text-center space-y-8"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-4 border-emerald-100 border-t-emerald-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sprout className="w-12 h-12 text-emerald-500" />
                    </motion.div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Processing Soil Profile</h3>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto">
                    Our AI is comparing your parameters with 2,200+ historical agricultural data points...
                  </p>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                    />
                  ))}
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <Card className="overflow-hidden border-none shadow-2xl rounded-[3rem] bg-white ring-1 ring-slate-100">
                  <div className="organic-gradient h-3 w-full" />
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center text-center space-y-10">
                      <div className="relative">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 12 }}
                          className="w-48 h-48 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-200/50 border-4 border-white ring-1 ring-slate-100"
                        >
                          {CROP_IMAGES[result.crop.toLowerCase()] ? (
                            <img 
                              src={CROP_IMAGES[result.crop.toLowerCase()]} 
                              alt={result.crop}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full organic-gradient flex items-center justify-center text-white">
                              <Sprout className="w-20 h-20" />
                            </div>
                          )}
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 p-2 rounded-xl shadow-lg"
                        >
                          <Zap className="w-5 h-5 fill-current" />
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] ml-1">Optimal Crop Found</span>
                        <h2 className="text-7xl font-black text-slate-900 tracking-tighter">{result.crop}</h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg pt-10 border-t border-slate-100">
                        <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100/50 space-y-4">
                          <div className="flex items-center justify-center gap-2 text-emerald-700">
                            <Zap className="w-4 h-4 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Confidence Score</span>
                          </div>
                          <div className="space-y-2">
                            <div className="relative h-3 bg-white rounded-full overflow-hidden border border-emerald-100">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${result.confidence * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 organic-gradient"
                              />
                            </div>
                            <p className="text-3xl font-black text-emerald-900 tracking-tighter">{(result.confidence * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                        
                        <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100/50 space-y-4">
                          <div className="flex items-center justify-center gap-2 text-blue-700">
                            <Calendar className="w-4 h-4 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Growth Season</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-3xl font-black text-blue-900 tracking-tighter">{result.season}</p>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Recommended Timing</p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleViewDetails}
                        className="w-full max-w-sm bg-slate-900 text-white hover:bg-emerald-600 transition-all duration-500 py-8 rounded-2xl text-lg font-black shadow-xl hover:shadow-emerald-200/50 group"
                      >
                        <div className="flex items-center gap-3">
                          <Info className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                          <span className="tracking-tight uppercase tracking-widest text-sm">View Cultivation Guide</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-emerald-600 p-8 flex items-center justify-center md:w-32">
                        <AlertCircle className="w-10 h-10 text-white" />
                      </div>
                      <div className="p-8 space-y-3 flex-1">
                        <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Expert Agronomist Insight</h4>
                        <p className="text-slate-700 leading-relaxed text-xl font-medium italic">
                          "{result.explanation}"
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-red-50 rounded-[3rem] border border-red-100 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-red-900 tracking-tight">Analysis Interrupted</h3>
                  <p className="text-red-600 font-medium max-w-xs mx-auto">{error}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setError(null)} 
                  className="mt-4 border-red-200 text-red-700 hover:bg-red-100 rounded-2xl px-8 py-6 font-bold"
                >
                  Try Again
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[600px] flex flex-col items-center justify-center p-12 bg-white/40 rounded-[3rem] border-4 border-dashed border-slate-200 text-center space-y-8"
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <Leaf className="w-16 h-16 text-slate-200" />
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg"
                  >
                    <Sprout className="w-6 h-6" />
                  </motion.div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-300 tracking-tight">Awaiting Soil Profile</h3>
                  <p className="text-slate-400 font-medium max-w-xs mx-auto">
                    Fill in your soil parameters and climate conditions to generate a personalized AI recommendation.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs opacity-20">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="h-2 bg-slate-300 rounded-full" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CropDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cropName={result?.crop || ''}
        details={cropDetails}
        loading={detailsLoading}
      />
    </div>
  );
}


