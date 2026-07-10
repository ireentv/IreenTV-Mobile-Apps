import React, { useState, useMemo } from "react";
import { 
  Tv, 
  Smartphone, 
  Download, 
  ExternalLink, 
  Send, 
  User, 
  Search, 
  Globe, 
  Layers, 
  ShieldCheck, 
  Play, 
  Pause, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  Server, 
  Sparkles, 
  Menu, 
  X,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Interactive channel dataset representing IreenTV features
interface Channel {
  id: string;
  name: string;
  category: string;
  servers: number;
  logoColor: string;
  nowPlaying: string;
}

const CHANNELS: Channel[] = [
  { id: "1", name: "Lancashire vs Yorkshire Live", category: "Sports", servers: 3, logoColor: "from-blue-600 to-indigo-600", nowPlaying: "Vitality Blast T20 Cricket - LIVE" },
  { id: "2", name: "Star Sports 1 HD", category: "Sports", servers: 4, logoColor: "from-green-600 to-emerald-600", nowPlaying: "Live Match Stream" },
  { id: "3", name: "Sony Sports 5 HD", category: "Sports", servers: 2, logoColor: "from-indigo-600 to-violet-600", nowPlaying: "International Football Tournament" },
  { id: "4", name: "T-Sports Live", category: "Sports", servers: 3, logoColor: "from-red-600 to-rose-600", nowPlaying: "Bangladeshi Domestic League" },
  { id: "5", name: "BeIN Sports 1 EN HD", category: "Sports", servers: 4, logoColor: "from-amber-600 to-orange-600", nowPlaying: "Live Football League Match" },
  { id: "6", name: "BTV", category: "Bangla", servers: 2, logoColor: "from-green-700 to-yellow-600", nowPlaying: "BTV Sangbad (Daily News)" },
  { id: "7", name: "Somoy TV", category: "Bangla", servers: 4, logoColor: "from-red-700 to-orange-600", nowPlaying: "Somoy Bulletins (Live News Updates)" },
  { id: "8", name: "Jamuna TV", category: "Bangla", servers: 3, logoColor: "from-blue-700 to-sky-600", nowPlaying: "Investigation 360 Degree" },
  { id: "9", name: "DBC News HD", category: "Bangla", servers: 2, logoColor: "from-rose-700 to-red-600", nowPlaying: "Rajkahon Talk Show Live" },
  { id: "10", name: "Ekattor HD", category: "Bangla", servers: 3, logoColor: "from-emerald-700 to-green-600", nowPlaying: "Khelajog Sports News" },
  { id: "11", name: "Channel 24 HD", category: "Bangla", servers: 3, logoColor: "from-violet-700 to-purple-600", nowPlaying: "Beyond the Gallery" },
  { id: "12", name: "ATN News", category: "Bangla", servers: 2, logoColor: "from-amber-700 to-yellow-600", nowPlaying: "Live News Updates" },
  { id: "13", name: "GTV (Gazi TV)", category: "Bangla", servers: 4, logoColor: "from-cyan-700 to-blue-600", nowPlaying: "Bangla Cinema Blockbuster" },
  { id: "14", name: "Deepto TV", category: "Bangla", servers: 3, logoColor: "from-pink-700 to-rose-600", nowPlaying: "Sultan Suleiman Drama Dubbed" },
  { id: "15", name: "Movie Bangla", category: "Movie", servers: 4, logoColor: "from-purple-800 to-indigo-800", nowPlaying: "Bangla Golden Movie Classics" },
  { id: "16", name: "Zee Bangla Cinema", category: "Movie", servers: 4, logoColor: "from-pink-600 to-rose-500", nowPlaying: "Superhit Bengali Movies" },
  { id: "17", name: "Jalsha Movies HD", category: "Movie", servers: 4, logoColor: "from-orange-600 to-amber-500", nowPlaying: "Blockbuster Tollywood Premieres" },
  { id: "18", name: "Color Bangla Cinema", category: "Movie", servers: 3, logoColor: "from-violet-600 to-fuchsia-500", nowPlaying: "Bangla Movie Marathon" },
  { id: "19", name: "Zee Cinema HD", category: "Movie", servers: 6, logoColor: "from-red-600 to-pink-500", nowPlaying: "Bollywood Premieres Live" },
  { id: "20", name: "Sony Max HD", category: "Movie", servers: 7, logoColor: "from-blue-800 to-cyan-600", nowPlaying: "IPL Classic Matches Replay" },
  { id: "21", name: "HBO", category: "Movie", servers: 5, logoColor: "from-slate-800 to-slate-950", nowPlaying: "Hollywood Blockbuster Films" },
  { id: "22", name: "Movies Now", category: "Movie", servers: 4, logoColor: "from-neutral-800 to-stone-600", nowPlaying: "Latest Action Releases" },
  { id: "23", name: "Star Plus", category: "Hindi", servers: 3, logoColor: "from-red-600 to-orange-500", nowPlaying: "Anupama Drama Serial" },
  { id: "24", name: "Sony Entertainment TV", category: "Hindi", servers: 4, logoColor: "from-blue-700 to-indigo-500", nowPlaying: "Kaun Banega Crorepati (KBC)" },
  { id: "25", name: "Gaan Bangla HD", category: "Music", servers: 3, logoColor: "from-purple-600 to-pink-500", nowPlaying: "Wind of Change Sessions" },
  { id: "26", name: "MTV India", category: "Music", servers: 3, logoColor: "from-stone-800 to-yellow-600", nowPlaying: "Roadies & Music Videos" },
  { id: "27", name: "Nick Jr", category: "Kids", servers: 2, logoColor: "from-sky-500 to-blue-400", nowPlaying: "PAW Patrol Episodes" },
  { id: "28", name: "Cartoon Network", category: "Kids", servers: 3, logoColor: "from-zinc-900 to-zinc-750", nowPlaying: "Ben 10 & Tom and Jerry" },
  { id: "29", name: "Discovery Channel", category: "Documentary", servers: 3, logoColor: "from-teal-800 to-sky-700", nowPlaying: "Man vs Wild Survival" },
  { id: "30", name: "National Geographic", category: "Documentary", servers: 4, logoColor: "from-amber-500 to-zinc-900", nowPlaying: "Uncharted Expeditions" }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<Channel>(CHANNELS[0]);
  const [selectedServer, setSelectedServer] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"mobile" | "tv">("mobile");
  const [tvStatus, setTvStatus] = useState<string>("Active • 380+ Channels Live");

  // Filter logic
  const categories = ["All", "Sports", "Bangla", "Movie", "Hindi", "Music", "Kids", "Documentary"];
  
  const filteredChannels = useMemo(() => {
    return CHANNELS.filter(channel => {
      const matchesCategory = selectedCategory === "All" || channel.category === selectedCategory;
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            channel.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    setSelectedServer(1);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-600 selection:text-white">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-rose-900/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* TOP NOTIFICATION BAR */}
      <div className="bg-rose-950/80 backdrop-blur-md border-b border-rose-900/30 text-rose-200 text-xs py-2 px-4 text-center sticky top-0 z-50">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>ওয়েবসাইটে কিছু চ্যানেল প্লে হতে সমস্যা হলে আইরিন টিভি মোবাইল অ্যাপস অথবা স্মার্ট টিভি অ্যাপটি ডাউনলোড করুন!</span>
        </p>
      </div>

      {/* NAVIGATION BAR */}
      <nav id="nav" className="border-b border-neutral-900 bg-neutral-950/90 backdrop-blur-lg sticky top-[33px] z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-rose-600 to-orange-600 rounded-xl shadow-lg shadow-rose-950/20">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-rose-100 to-rose-500 bg-clip-text text-transparent">IreenTV</span>
                <span className="ml-1.5 text-[10px] uppercase tracking-widest text-rose-500 font-mono font-medium px-1.5 py-0.5 rounded border border-rose-950 bg-rose-950/20">Pro</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#simulator" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">IPTV Simulator</a>
              <a href="#features" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Features</a>
              <a href="#downloads" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">App Downloads</a>
              <a href="#installation" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Setup Guide</a>
              <a href="#developer" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Developer</a>
              <a 
                href="https://t.me/ireentv" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 px-4 py-2 bg-sky-950/40 border border-sky-900/30 rounded-xl text-sky-400 text-xs font-semibold hover:bg-sky-900/30 transition-all hover:scale-[1.02]"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram Channel
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                id="menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-neutral-900 bg-neutral-950 px-4 pt-2 pb-6 space-y-3"
              id="mobile-menu"
            >
              <a 
                href="#simulator" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                IPTV Simulator
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                Features
              </a>
              <a 
                href="#downloads" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                App Downloads
              </a>
              <a 
                href="#installation" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                Setup Guide
              </a>
              <a 
                href="#developer" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                Developer
              </a>
              <a 
                href="https://t.me/ireentv" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-900/30 border border-sky-800/50 rounded-xl text-sky-400 font-semibold"
              >
                <Send className="w-4 h-4" />
                Telegram Channel
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-900/40 bg-rose-950/30 text-rose-400 text-xs font-semibold font-mono"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>অফিশিয়াল আইপটিভি প্ল্যাটফর্ম — ৩৮০+ চ্যানেল লাইভ</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
              >
                বিনোদনের নতুন দিগন্ত <br />
                <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  IreenTV
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                লাইভ স্পোর্টস, মুভি, খবর ও আপনার প্রিয় সকল বাংলাদেশি ও আন্তর্জাতিক টিভি চ্যানেল স্ট্রিমিং করুন সম্পূর্ণ বাফারিং ছাড়া। অ্যান্ড্রয়েড মোবাইল, স্মার্ট টিভি কিংবা ওয়েব ব্রাউজারের মাধ্যমে সরাসরি উপভোগ করুন যেকোনো সময়ে, যেকোনো স্থানে।
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <a 
                  href="#downloads"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2.5 shadow-xl shadow-rose-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  id="cta-download"
                >
                  <Download className="w-5 h-5" />
                  ডাউনলোড করুন (APK)
                </a>
                <a 
                  href="https://ireentv.pages.dev/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-white rounded-2xl font-semibold text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Globe className="w-5 h-5 text-rose-500" />
                  সরাসরি ওয়েবসাইটে দেখুন
                  <ExternalLink className="w-4 h-4 text-neutral-500" />
                </a>
              </motion.div>

              {/* Specs Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-neutral-900"
              >
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">380+</p>
                  <p className="text-neutral-500 text-xs">টিভি চ্যানেল</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">4+</p>
                  <p className="text-neutral-500 text-xs">হাই-স্পিড সার্ভার</p>
                </div>
                <div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">100%</p>
                  <p className="text-neutral-500 text-xs">ফ্রি লাইভ স্পোর্টস</p>
                </div>
              </motion.div>
            </div>

            {/* Hero App Render Mock */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-[2.5rem] blur-3xl" />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto max-w-[320px] rounded-[2.5rem] border-[10px] border-neutral-800 bg-neutral-950 p-3.5 shadow-2xl shadow-rose-950/10"
              >
                {/* Speaker */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-neutral-800 rounded-full z-20" />
                
                {/* Mobile screen */}
                <div className="relative bg-neutral-950 rounded-[1.8rem] overflow-hidden aspect-[9/19] flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-4 py-2 text-[10px] text-neutral-500 font-mono">
                    <span>15:28</span>
                    <span className="flex items-center gap-1">
                      <span>4G</span>
                      <span className="w-4 h-2 bg-emerald-500 rounded-xs" />
                    </span>
                  </div>

                  {/* App Header */}
                  <div className="px-4 py-3 border-b border-neutral-900 bg-neutral-950/60 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Tv className="w-4 h-4 text-rose-500" />
                        <span className="font-display font-bold text-xs">IreenTV Mobile</span>
                      </div>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">ONLINE</span>
                    </div>
                  </div>

                  {/* Video Player Box inside mock */}
                  <div className="relative aspect-video bg-neutral-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540747737956-378721767678?q=80&w=600&auto=format&fit=crop')" }} />
                    <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-rose-600 rounded text-[8px] font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                    
                    {/* Channel name and server overlay */}
                    <div className="absolute bottom-2 left-2 z-10 text-left">
                      <p className="text-[10px] font-bold text-white">Star Sports 1 HD</p>
                      <p className="text-[8px] text-neutral-400">Server 2 (High Speed)</p>
                    </div>

                    <div className="relative p-2.5 rounded-full bg-rose-600 text-white shadow-lg animate-pulse">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  </div>

                  {/* Channel Categories & List simulator in mobile */}
                  <div className="flex-1 p-3 flex flex-col space-y-2.5 overflow-hidden">
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider text-left">Featured Channels</p>
                    
                    {/* Small category selector */}
                    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                      {["All", "Sports", "Bangla", "Movie"].map(c => (
                        <span key={c} className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap ${c === "Sports" ? "bg-rose-600 text-white" : "bg-neutral-900 text-neutral-400"}`}>
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Small channel item blocks */}
                    <div className="space-y-1.5 overflow-y-auto pr-0.5 max-h-[160px] scrollbar-none text-left">
                      {CHANNELS.slice(0, 4).map(ch => (
                        <div key={ch.id} className="flex items-center justify-between p-1.5 rounded bg-neutral-900 border border-neutral-800">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${ch.logoColor}`} />
                            <span className="text-[9px] font-medium text-neutral-200 truncate max-w-[120px]">{ch.name}</span>
                          </div>
                          <span className="text-[7px] text-rose-400 bg-rose-950/40 px-1 rounded">Play</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Banner Info on mock */}
                  <div className="p-3 bg-neutral-900 border-t border-neutral-800 text-center">
                    <p className="text-[9px] font-medium text-rose-400">বিনোদন হোক আপনার প্রতিদিনের সঙ্গী</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITY INTERACTIVE SIMULATOR */}
      <section id="simulator" className="py-16 bg-neutral-900/40 border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
            <span className="text-rose-500 font-mono text-xs font-semibold uppercase tracking-wider">Live Web Simulator</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              আইরিন টিভি ইন্টারেক্টিভ সিমুলেটর
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              নিচের সিমুলেটরের মাধ্যমে অ্যাপটি ইনস্টল করার আগেই চ্যানেল সিলেকশন এবং সার্ভার চেঞ্জিং ফিচারটি পরখ করে দেখুন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Player Panel (Left) */}
            <div className="lg:col-span-8 flex flex-col justify-between p-4 sm:p-6 bg-neutral-950 border border-neutral-800 rounded-3xl relative overflow-hidden shadow-2xl">
              
              {/* Header inside simulated screen */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Live Player Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 hidden sm:inline">Category: <span className="text-rose-400 font-semibold">{selectedChannel.category}</span></span>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-rose-950/30 text-rose-400 text-[10px] font-bold rounded-lg border border-rose-900/30">
                    <Server className="w-3 h-3" />
                    <span>Server {selectedServer}</span>
                  </div>
                </div>
              </div>

              {/* Simulated TV Display Screen */}
              <div className="relative w-full aspect-video bg-neutral-950 rounded-2xl overflow-hidden group border border-neutral-900 my-5 flex items-center justify-center">
                {/* Background Dynamic Streaming Effect */}
                <div className="absolute inset-0 bg-neutral-950" />
                
                {isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Simulated Streaming Static Noise Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10" />
                    
                    {/* Dynamic Graphic */}
                    <div className="absolute inset-0 opacity-20 bg-cover bg-center transform scale-105 filter blur-[2px] transition-all duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop')` }} />
                    
                    {/* Glowing Accent from center */}
                    <div className="w-48 h-48 rounded-full bg-rose-600/10 blur-3xl absolute animate-pulse" />

                    {/* Simulation Status Overlay */}
                    <div className="z-10 text-center space-y-4 px-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs rounded-full shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Streaming Online • HD Quality</span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">{selectedChannel.name}</h3>
                        <p className="text-xs text-rose-400 flex items-center justify-center gap-1.5">
                          <span className="font-semibold">{selectedChannel.nowPlaying}</span>
                        </p>
                      </div>

                      {/* Mock Player Stats */}
                      <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 font-mono bg-neutral-900/80 px-4 py-1.5 rounded-lg border border-neutral-800">
                        <span>FPS: <strong className="text-white">60.0</strong></span>
                        <span className="text-neutral-700">|</span>
                        <span>Bitrate: <strong className="text-white">4500 Kbps</strong></span>
                        <span className="text-neutral-700">|</span>
                        <span>Server Latency: <strong className="text-white">12ms</strong></span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/90 text-neutral-400 space-y-2">
                    <Pause className="w-12 h-12 text-rose-500 animate-bounce" />
                    <p className="text-xs font-semibold text-neutral-400">Stream Paused. Click play below to resume.</p>
                  </div>
                )}

                {/* Video controls bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-neutral-950 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <span className="text-xs font-medium text-white">{selectedChannel.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-800">1080p HD</span>
                  </div>
                </div>
              </div>

              {/* Server Switches */}
              <div className="p-4 bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-rose-500" />
                    <span>সিলেক্ট করুন অল্টারনেটিভ সার্ভার (সার্ভার ডাউন হলে চেঞ্জ করুন):</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">সর্বমোট সার্ভার সংখ্যা: ৪টি</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(srv => (
                    <button
                      key={srv}
                      onClick={() => {
                        setSelectedServer(srv);
                        setIsPlaying(true);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${selectedServer === srv ? "bg-rose-600 text-white shadow-lg shadow-rose-950/30 font-bold" : "bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-neutral-300"}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedServer === srv ? "bg-white" : "bg-emerald-500"}`} />
                      Server {srv}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Channels & Filters Sidebar (Right) */}
            <div className="lg:col-span-4 p-5 bg-neutral-950 border border-neutral-800 rounded-3xl flex flex-col shadow-2xl">
              <div className="space-y-4 flex-1 flex flex-col h-full justify-start">
                
                <div className="text-left">
                  <h3 className="font-display font-bold text-lg text-white">চ্যানেল ডিরেক্টরি</h3>
                  <p className="text-xs text-neutral-500">চ্যানেলটি সিলেক্ট করে লাইভ দেখতে প্লে বাটনে ক্লিক করুন</p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="চ্যানেলের নাম লিখুন..."
                    className="w-full bg-neutral-900 text-xs pl-10 pr-4 py-3 rounded-xl border border-neutral-800 focus:outline-none focus:border-rose-500 text-neutral-200"
                  />
                </div>

                {/* Categories Scrollable Box */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-800 text-left">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${selectedCategory === cat ? "bg-rose-900/40 text-rose-400 border border-rose-500/30 font-semibold" : "bg-neutral-900 hover:bg-neutral-850 text-neutral-400 border border-transparent"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Channels List Box */}
                <div className="space-y-2 overflow-y-auto max-h-[360px] pr-1.5 scrollbar-thin scrollbar-thumb-neutral-800 flex-1 text-left">
                  {filteredChannels.length > 0 ? (
                    filteredChannels.map(ch => (
                      <button
                        key={ch.id}
                        onClick={() => handleChannelSelect(ch)}
                        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${selectedChannel.id === ch.id ? "bg-rose-950/20 border-rose-900/40" : "bg-neutral-900/50 border-neutral-850 hover:bg-neutral-900 hover:border-neutral-800"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ch.logoColor} flex items-center justify-center font-bold text-xs text-white shadow-sm`}>
                            {ch.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-neutral-200 line-clamp-1">{ch.name}</p>
                            <p className="text-[10px] text-neutral-500 mt-0.5">{ch.category} • {ch.servers} Servers</p>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-md font-bold transition-colors ${selectedChannel.id === ch.id ? "bg-rose-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}>
                          Play
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <HelpCircle className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                      <p className="text-xs text-neutral-500">কোনো চ্যানেল খুঁজে পাওয়া যায়নি!</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DETAILED FEATURES */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-rose-500 font-mono text-xs font-semibold uppercase tracking-wider">High Fidelity App Features</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              আইরিন টিভির আকর্ষণীয় ফিঙ্গারপ্রিন্ট বৈশিষ্ট্যসমূহ
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              একটি মাত্র অ্যাপ্লিকেশন বা ওয়েবসাইটের মাধ্যমেই পাবেন সেরা সব প্রিমিয়াম ফিচার সম্পূর্ণ বিনামূল্যে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl relative group hover:border-neutral-800 transition-all text-left">
              <div className="p-3 bg-rose-950/30 border border-rose-900/30 rounded-xl text-rose-500 w-fit mb-5">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">৩৮০+ লাইভ টিভি চ্যানেল</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                বাংলাদেশী সকল বড় চ্যানেল (যেমন: সময় টিভি, যমুনা টিভি, দীপ্ত টিভি) সহ জনপ্রিয় ভারতীয় ও আন্তর্জাতিক চ্যানেলগুলো সরাসরি সম্প্রচার করুন কোনো সাবস্ক্রিপশন ছাড়াই।
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl relative group hover:border-neutral-800 transition-all text-left">
              <div className="p-3 bg-amber-950/30 border border-amber-900/30 rounded-xl text-amber-500 w-fit mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">হাই-স্পিড মাল্টি-সার্ভার সাপোর্ট</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                কোনো একটি সার্ভার জ্যাম বা ডাউন থাকলে সেকেন্ডের মধ্যে অন্য সার্ভারে (Server 1-4) শিফট করুন। এটি নিশ্চিত করে বাফারিং-হীন নিরবচ্ছিন্ন ব্রডকাস্টিং।
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl relative group hover:border-neutral-800 transition-all text-left">
              <div className="p-3 bg-emerald-950/30 border border-emerald-900/30 rounded-xl text-emerald-500 w-fit mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">১০০% ফ্রি লাইভ স্পোর্টস</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                ফুটবল বিশ্বকাপ, টি-২০ ক্রিকেট ম্যাচ, ওয়ানডে, আইপিএল সহ দেশী ও বিদেশী সকল স্পোর্টস চ্যানেল যেমন- Star Sports, Sony Sports ও T-Sports সম্পূর্ণ ফ্রিতে উপভোগ করুন।
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl relative group hover:border-neutral-800 transition-all text-left">
              <div className="p-3 bg-indigo-950/30 border border-indigo-900/30 rounded-xl text-indigo-500 w-fit mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">রেস্পন্সিভ লেআউট</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                মোবাইল স্ক্রিন, আইপ্যাড, কম্পিউটার কিংবা স্মার্ট টিভির বিশাল স্ক্রিনে অটো-ফিট হয়ে যায়। প্রতিটি ভিউপোর্ট এবং স্ক্রিন সাইজে পাবেন নিখুঁত এইচডি আউটপুট।
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl relative group hover:border-neutral-800 transition-all text-left">
              <div className="p-3 bg-pink-950/30 border border-pink-900/30 rounded-xl text-pink-500 w-fit mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">সেফ ও ম্যালওয়্যার ফ্রি APK</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                আমাদের অফিসিয়াল অ্যাপ কোড সম্পূর্ণ সিকিউর এবং ক্ষতিকারক অ্যাডওয়্যার বা ভাইরাস মুক্ত। আপনি নির্ভয়ে আপনার ফোনে এবং স্মার্ট টিভিতে ইনস্টল করতে পারেন।
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-neutral-900/30 border border-neutral-900 rounded-2xl relative group hover:border-neutral-800 transition-all text-left">
              <div className="p-3 bg-cyan-950/30 border border-cyan-900/30 rounded-xl text-cyan-500 w-fit mb-5">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">লাইভ চ্যাট ও সাপোর্ট</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                টেলিগ্রাম চ্যানেলে যুক্ত হয়ে সরাসরি নতুন চ্যানেল রিকুয়েস্ট করার সুবিধা। যেকোনো সমস্যা রিপোর্ট করার সাথে সাথেই কুইক সল্যুশন দেওয়া হয়।
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* APP DOWNLOADS HUB */}
      <section id="downloads" className="py-20 bg-gradient-to-b from-neutral-950 to-neutral-900 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-rose-500 font-mono text-xs font-semibold uppercase tracking-wider">Official Distribution Hub</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              অ্যাপ্লিকেশন ডাউনলোড হাব (APK)
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              নিচের অফিশিয়াল গিটহাব রিলিজ সোর্স থেকে সরাসরি ফাইল ডাউনলোড করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Download Mobile Card */}
            <div className="p-8 bg-neutral-950/80 border border-neutral-800 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all text-left shadow-xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-2xl group-hover:bg-rose-600/10 transition-all" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-rose-950/30 border border-rose-900/30 rounded-2xl text-rose-500">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-rose-950/40 text-rose-400 font-bold border border-rose-900/30">MOBILE OPTIMIZED</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">IreenTV Mobile App</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    অ্যান্ড্রয়েড স্মার্টফোনের জন্য বিশেষভাবে অপ্টিমাইজড অ্যাপ্লিকেশন। ওয়ান-ক্লিক প্লে, চ্যানেল সার্চিং এবং লাইটওয়েট ডাটা সেভিং প্রযুক্তি যুক্ত করা আছে।
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    পোর্ট্রেট ও ল্যান্ডস্কেপ উভয় ওরিয়েন্টেশন সাপোর্ট।
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    অ্যান্ড্রয়েড ৫.০ ও পরবর্তী সকল সংস্করণে কার্যকর।
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    নরমাল নেটওয়ার্কেও ফাস্ট লোডিং বাফার-ফ্রি স্ট্রিমিং।
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  href="https://github.com/ireentv/Ireen-TV-Mobile/raw/refs/heads/main/IreenTV%20Mobile.apk"
                  className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  id="dl-mobile"
                >
                  <Download className="w-4 h-4" />
                  Download Mobile APK
                </a>
                <p className="text-[10px] text-neutral-500 text-center mt-3 font-mono">File Name: IreenTV Mobile.apk</p>
              </div>
            </div>

            {/* Download Smart TV Card */}
            <div className="p-8 bg-neutral-950/80 border border-neutral-800 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all text-left shadow-xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 rounded-full blur-2xl group-hover:bg-cyan-600/10 transition-all" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-cyan-950/30 border border-cyan-900/30 rounded-2xl text-cyan-400">
                    <Tv className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-400 font-bold border border-cyan-900/30">SMART TV HD</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">Smart TV HD App</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    স্মার্ট টিভি এবং টিভি বক্সের বড় স্ক্রিনের জন্য ডেডিকেটেড ডিজাইন। আপনার টিভি রিমোট কন্ট্রোলার (D-pad) দিয়ে সহজে ব্রাউজ ও চ্যানেল চুজ করার চমৎকার লেআউট।
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    ফুল রিমোট কন্ট্রোল ডি-প্যাড নেভিগেশন ইন্টিগ্রেশন।
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    ফায়ারস্টিক, এমআই বক্স, অ্যান্ডয়েড টিভি ও প্রজেক্টর সাপোর্ট।
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    ১০৮০p এইচডি রেজোলিউশন হাই-কোয়ালিটি ভিডিও।
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  href="https://github.com/ireentv/Smart-TV/raw/refs/heads/main/Smart%20TV%20HD.apk"
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  id="dl-tv"
                >
                  <Download className="w-4 h-4" />
                  Download Smart TV APK
                </a>
                <p className="text-[10px] text-neutral-500 text-center mt-3 font-mono">File Name: Smart TV HD.apk</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOW TO INSTALL GUIDE */}
      <section id="installation" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-display text-3xl font-bold text-white">ইনস্টলেশন ও সেটআপ গাইড</h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto">
              খুব সহজে নিচের স্টেপগুলো অনুসরণ করে আপনার কাঙ্ক্ষিত ডিভাইসে আইরিন টিভি সেটআপ করে নিন।
            </p>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 sm:p-8">
            {/* Tabs selector */}
            <div className="flex border-b border-neutral-800 pb-4 mb-8">
              <button
                onClick={() => setActiveTab("mobile")}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === "mobile" ? "border-rose-500 text-rose-500" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                📱 Mobile Setup (অ্যান্ড্রয়েড ফোন)
              </button>
              <button
                onClick={() => setActiveTab("tv")}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === "tv" ? "border-cyan-500 text-cyan-500" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                📺 Smart TV Setup (স্মার্ট টিভি)
              </button>
            </div>

            {/* Tab contents */}
            <AnimatePresence mode="wait">
              {activeTab === "mobile" ? (
                <motion.div
                  key="mobile-setup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-rose-950/50 text-rose-400 border border-rose-900/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">১</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">এপিকে ডাউনলোড করুন</h4>
                      <p className="text-xs text-neutral-400">উপরে উল্লেখিত <strong>Download Mobile APK</strong> লিংকে ক্লিক করে সরাসরি আপনার মোবাইলে APK ফাইলটি ডাউনলোড করে নিন।</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-rose-950/50 text-rose-400 border border-rose-900/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">২</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">অজানা সোর্স অন করুন (প্রয়োজন হলে)</h4>
                      <p className="text-xs text-neutral-400">প্রথমবার থার্ডপার্টি অ্যাপ ডাউনলোডের ক্ষেত্রে ব্রাউজার কর্তৃক পারমিশন চাইতে পারে। আপনার ফোনের <code>Settings</code> {`->`} <code>Security</code> {`->`} <code>Install Unknown Apps</code> অপশন থেকে আপনার ব্যবহৃত ব্রাউজারটিকে অনুমতি দিন।</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-rose-950/50 text-rose-400 border border-rose-900/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">৩</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">ইনস্টল সম্পন্ন করুন</h4>
                      <p className="text-xs text-neutral-400">ডাউনলোড ফোল্ডার থেকে <strong>IreenTV Mobile.apk</strong> ফাইলটিতে ক্লিক করুন এবং <strong>Install</strong> সিলেক্ট করুন। ইনস্টলেশন সম্পন্ন হলে অ্যাপটি ওপেন করে সরাসরি চ্যানেল প্লে করুন।</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tv-setup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-left"
                >
                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-900/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">১</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">পেনড্রাইভ অথবা ডাউনলোডার অ্যাপের ব্যবহার</h4>
                      <p className="text-xs text-neutral-400">আপনার কম্পিউটার থেকে <strong>Smart TV HD.apk</strong> ডাউনলোড করে একটি পেনড্রাইভের মাধ্যমে টিভিতে কানেক্ট করতে পারেন। অথবা আপনার টিভির গুগল প্লে স্টোর থেকে <strong>Downloader</strong> অ্যাপ ব্যবহার করে ব্রাউজারের মাধ্যমে সরাসরি এপিকে ফাইল ডাউনলোড করে নিতে পারেন।</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-900/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">২</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">টিভির সিকিউরিটি পারমিশন</h4>
                      <p className="text-xs text-neutral-400">টিভির <code>Settings</code> {`->`} <code>Device Preferences</code> {`->`} <code>Security & Restrictions</code> অপশনে গিয়ে <strong>Unknown Sources</strong> অন করে দিন।</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-900/30 flex items-center justify-center font-mono font-bold text-sm shrink-0">৩</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">ইনস্টল করুন এবং চ্যানেল উপভোগ করুন</h4>
                      <p className="text-xs text-neutral-400">টিভির ফাইল ম্যানেজার ওপেন করে পেনড্রাইভ সিলেক্ট করুন এবং APK ফাইলটিতে ক্লিক করে ইনস্টল সম্পূর্ণ করুন। আপনার পছন্দের ক্যাটাগরি ব্রাউজ করতে টিভি রিমোট ব্যবহার করুন।</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* TELEGRAM COMMUNICATION BANNER */}
      <section className="py-12 bg-neutral-900/20 border-y border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="p-3 bg-sky-950/30 border border-sky-900/30 rounded-full text-sky-400 w-fit mx-auto">
            <Send className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl text-white">যুক্ত হন আমাদের অফিশিয়াল টেলিগ্রাম গ্রুপে!</h3>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
              নতুন চ্যানেল অ্যাড করার জন্য রিকোয়েস্ট করা, লিংক আপডেট জানা এবং টেকনিক্যাল সমস্যার তাৎক্ষণিক সমাধানের জন্য আমাদের ৩,০০০+ মেম্বারের অ্যাক্টিভ টেলিগ্রাম চ্যানেলে যোগ দিন।
            </p>
          </div>
          <a 
            href="https://t.me/ireentv" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02]"
            id="telegram-join-btn"
          >
            <Send className="w-4 h-4 fill-white" />
            টেলিগ্রাম চ্যানেলে জয়েন করুন
          </a>
        </div>
      </section>

      {/* DEVELOPER SECTION */}
      <section id="developer" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-rose-500 font-mono text-xs font-semibold uppercase tracking-wider">Meet The Visionary Creator</span>
            <h2 className="font-display text-3xl font-bold text-white">ডেভেলপার প্রোফাইল</h2>
          </div>

          <div className="p-8 bg-neutral-900/30 border border-neutral-900 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-2xl" />
            
            {/* Developer Logo Placeholder or Icon */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-rose-600 via-orange-600 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg relative group">
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              <div className="absolute inset-0.5 rounded-[14px] bg-neutral-950/10" />
            </div>

            {/* Developer Details */}
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="font-display font-bold text-2xl text-white">MD ANAMUL HOQUE</h3>
                <p className="text-xs text-rose-500 font-medium tracking-wide uppercase mt-1 font-mono">Lead Developer & System Architect</p>
              </div>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                আইরিন টিভির সম্পূর্ণ আইপিটিভি আর্কিটেকচার, অ্যান্ড্রয়েড এপিকে বিল্ডস এবং হাই-স্পিড চ্যানেল ম্যানেজমেন্ট সিস্টেমটি অত্যন্ত দক্ষতার সাথে ডিজাইন ও ডেভেলপ করেছেন **মোঃ এনামুল হক**। তিনি আধুনিক ওয়েব ও টিভি অ্যাপ্লিকেশনের একজন পেশাদার কারিগর।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a 
                  href="https://anamul.pages.dev/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 rounded-xl text-xs font-semibold transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-neutral-400" />
                  Portfolio Website
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
                
                <a 
                  href="mailto:ireenfeni01@gmail.com" 
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-950/30 hover:bg-rose-900/30 text-rose-400 border border-rose-900/20 rounded-xl text-xs font-semibold transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Email
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-neutral-950/60 py-12 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-gradient-to-br from-rose-600 to-orange-600 rounded-lg">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">IreenTV</span>
          </div>

          <p className="text-xs text-neutral-500 max-w-xl mx-auto leading-relaxed">
            দাবিত্যাগ: আইরিন টিভি একটি মিডিয়া ডিরেক্টরি এবং ভিজ্যুয়াল প্লেয়ার হিসেবে কাজ করে। এই প্লাটফর্মে প্রদর্শিত সকল লিংক বা স্ট্রিম ইন্টারনেটের উন্মুক্ত উৎস হতে সংগৃহীত। আমরা আমাদের সার্ভারে কোনো কপিরাইটযুক্ত কনটেন্ট হোস্ট করি না।
          </p>

          <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© 2026 IreenTV. All Rights Reserved. Designed & Developed by <a href="https://anamul.pages.dev/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-rose-500 transition-colors">MD ANAMUL HOQUE</a>.</p>
            <div className="flex gap-4">
              <a href="#simulator" className="hover:text-white transition-colors">Simulator</a>
              <a href="#downloads" className="hover:text-white transition-colors">APK Downloads</a>
              <a href="https://t.me/ireentv" className="hover:text-white transition-colors">Telegram Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
