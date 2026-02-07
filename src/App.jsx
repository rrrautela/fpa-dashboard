import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  LayoutDashboard, TrendingUp, BarChart3, PieChart as PieIcon, Settings, 
  DollarSign, Globe, Download, Bell, Menu, X, ChevronLeft 
} from 'lucide-react';

const DATA = {
  kpis: [
    { label: "Net Sales", value: "₹119.1M", icon: DollarSign, color: "#2563eb", bg: "#eff6ff" },
    { label: "Gross Profit", value: "₹38.3M", icon: TrendingUp, color: "#059669", bg: "#ecfdf5" },
    { label: "Net Income", value: "₹15.0M", icon: BarChart3, color: "#7c3aed", bg: "#f5f3ff" },
    { label: "EBITDA", value: "₹19.0M", icon: Globe, color: "#d97706", bg: "#fffbeb" },
  ],
  monthly: [
    { name: 'Apr', Act: 10041812, Bud: 10772113 },
    { name: 'May', Act: 9643030, Bud: 10656412 },
    { name: 'Jun', Act: 8693637, Bud: 10170695 },
    { name: 'Jul', Act: 11991008, Bud: 9266355 },
    { name: 'Aug', Act: 10681595, Bud: 8098487 },
    { name: 'Sep', Act: 11740002, Bud: 8324448 },
    { name: 'Oct', Act: 9121629, Bud: 11686728 },
    { name: 'Nov', Act: 7887241, Bud: 10808181 },
    { name: 'Dec', Act: 8924062, Bud: 10464227 },
    { name: 'Jan', Act: 11675135, Bud: 10356566 },
    { name: 'Feb', Act: 8988796, Bud: 10227594 },
    { name: 'Mar', Act: 9670361, Bud: 9678456 },
  ],
  regions: [
    { name: 'East', value: 26898924 },
    { name: 'North', value: 24021060 },
    { name: 'Central', value: 22871066 },
    { name: 'South', value: 22763496 },
    { name: 'West', value: 22503767 },
  ]
};

const COLORS = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] font-sans overflow-hidden relative">
      
      {/* 1. MOBILE SIDEBAR OVERLAY (The Drawer) */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <aside className={`absolute left-0 top-0 h-full w-72 bg-[#0f172a] p-8 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
            <BrandLogo />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400"><X size={24} /></button>
          </div>
          <NavLinks />
        </aside>
      </div>

      {/* 2. DESKTOP SIDEBAR (Static) */}
      <aside className="hidden lg:flex w-72 bg-[#0f172a] text-white p-8 flex-col shrink-0 shadow-2xl">
        <div className="mb-12"><BrandLogo /></div>
        <NavLinks />
        <StatusBox />
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Responsive Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger Button for Mobile */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Executive Dashboard</h2>
              <p className="text-xs lg:text-sm text-slate-400 font-medium">FY 2025-26 Performance</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 lg:p-3 text-slate-400 hover:bg-slate-50 rounded-full border border-slate-100"><Bell size={20}/></button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm">
              <Download size={18} className="hidden sm:block"/> Export
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-10 space-y-8 lg:space-y-10">
          
          {/* KPI Grid - Responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
            {DATA.kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-6 rounded-[24px] lg:rounded-[32px] border border-slate-200/60 shadow-sm transition-all hover:border-blue-200">
                <div className="flex justify-between items-start mb-4">
                  <div style={{ backgroundColor: kpi.bg, color: kpi.color }} className="p-2.5 rounded-xl">
                    <kpi.icon size={24} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+14.2%</span>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] mb-1">{kpi.label}</p>
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">{kpi.value}</h3>
              </div>
            ))}
          </div>

          {/* Charts Section - Stacked on Mobile */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
            
            <div className="xl:col-span-2 bg-white p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] border border-slate-200/60 shadow-sm">
              <h3 className="text-lg lg:text-xl font-black text-slate-900 tracking-tight mb-6">Revenue vs. Budget</h3>
              <div style={{ height: '300px', width: '100%' }} className="lg:h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA.monthly} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(v) => `₹${v/1e6}M`} />
                    <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="Act" name="Actual" stroke="#2563eb" strokeWidth={3} fill="url(#colorAct)" />
                    <Area type="monotone" dataKey="Bud" name="Budget" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="8 5" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-[30px] lg:rounded-[40px] border border-slate-200/60 shadow-sm">
              <h3 className="text-lg lg:text-xl font-black text-slate-900 tracking-tight mb-6">Regional Share</h3>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA.regions} innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                      {DATA.regions.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Helpers to keep code clean
function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-lg text-white">T</div>
      <h1 className="text-xl font-black tracking-tight uppercase text-white">Trial Analytics</h1>
    </div>
  );
}

function NavLinks() {
  return (
    <nav className="space-y-2 flex-1">
      <SidebarItem icon={<LayoutDashboard size={22}/>} label="Dashboard" active />
      <SidebarItem icon={<TrendingUp size={22}/>} label="Forecasting" />
      <SidebarItem icon={<PieIcon size={22}/>} label="Analysis" />
      <SidebarItem icon={<Settings size={22}/>} label="Settings" />
    </nav>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <button className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold transition-all ${active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800'}`}>
      {icon} <span>{label}</span>
    </button>
  );
}

function StatusBox() {
  return (
    <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 mt-auto">
      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status</p>
      <p className="text-sm text-emerald-400 flex items-center gap-2 font-medium">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Systems Online
      </p>
    </div>
  );
}