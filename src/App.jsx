import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  LayoutDashboard, TrendingUp, BarChart3, PieChart as PieIcon, Settings, 
  DollarSign, Globe, Download, Bell, ChevronLeft, ChevronRight 
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {/* Sidebar - Width toggles between w-72 and w-24 */}
      <aside className={`${isCollapsed ? 'w-24' : 'w-72'} bg-[#0f172a] text-white p-6 flex flex-col shrink-0 shadow-2xl transition-all duration-300 ease-in-out relative`}>
        
        {/* Brand Logo / Icon */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} mb-12`}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 font-bold text-lg shrink-0">T</div>
          {!isCollapsed && <h1 className="text-xl font-black tracking-tight uppercase whitespace-nowrap">Trial Analytics</h1>}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 flex-1">
          <SidebarLink icon={<LayoutDashboard size={22}/>} label="Dashboard" active collapsed={isCollapsed} />
          <SidebarLink icon={<TrendingUp size={22}/>} label="Forecasting" collapsed={isCollapsed} />
          <SidebarLink icon={<PieIcon size={22}/>} label="Analysis" collapsed={isCollapsed} />
          <SidebarLink icon={<Settings size={22}/>} label="Settings" collapsed={isCollapsed} />
        </nav>

        {/* Status Box - Hidden when collapsed */}
        {!isCollapsed && (
          <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 mb-6">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Status</p>
            <p className="text-sm text-emerald-400 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Systems Online
            </p>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest"><ChevronLeft size={16}/> Collapse</div>}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Dashboard</h2>
            <p className="text-sm text-slate-400 font-medium">Real-time Financial Year 2025-26 Overview</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-full border border-slate-100"><Bell size={20}/></button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all">
              <Download size={18}/> Export Data
            </button>
          </div>
        </header>

        <div className="p-10 space-y-10">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DATA.kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-7 rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div style={{ backgroundColor: kpi.bg, color: kpi.color }} className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <kpi.icon size={28} />
                  </div>
                  <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">+14.2%</span>
                </div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.1em] mb-1">{kpi.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.value}</h3>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            <div className="xl:col-span-2 bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Revenue vs. Budget</h3>
              <div style={{ height: '420px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA.monthly}>
                    <defs>
                      <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600, fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1e6}M`} />
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="Act" name="Actual" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorAct)" />
                    <Area type="monotone" dataKey="Bud" name="Budget" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="8 5" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Regional Share</h3>
              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA.regions} innerRadius={80} outerRadius={110} paddingAngle={12} dataKey="value" stroke="none">
                      {DATA.regions.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
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

// Sub-component for sidebar links to handle collapsed state smoothly
function SidebarLink({ icon, label, active = false, collapsed = false }) {
  return (
    <button className={`flex items-center ${collapsed ? 'justify-center' : 'gap-4'} w-full p-4 rounded-2xl font-bold transition-all ${
      active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
    }`}>
      <div className="shrink-0">{icon}</div>
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );
}