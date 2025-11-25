import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'WK01', leads: 4000, conv: 2400 },
  { name: 'WK02', leads: 3000, conv: 1398 },
  { name: 'WK03', leads: 2000, conv: 9800 },
  { name: 'WK04', leads: 2780, conv: 3908 },
  { name: 'WK05', leads: 1890, conv: 4800 },
  { name: 'WK06', leads: 2390, conv: 3800 },
  { name: 'WK07', leads: 3490, conv: 4300 },
];

const StatCard: React.FC<{ label: string; value: string; trend: string }> = ({ label, value, trend }) => (
  <div className="bg-background-dark/40 backdrop-blur-sm border border-tech/10 p-6 rounded-2xl hover:border-tech-accent/30 transition-all group">
    <h3 className="font-mono text-xs text-tech/50 uppercase tracking-widest mb-2">{label}</h3>
    <div className="text-4xl font-display mb-2 group-hover:text-white transition-colors">{value}</div>
    <div className="font-mono text-xs text-tech-accent">{trend}</div>
  </div>
);

const DashboardScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center p-4 md:p-12 pb-24 pt-20 border-b border-tech/5">
      <header className="mb-12">
        <h2 className="text-4xl md:text-6xl uppercase tracking-tighter opacity-90">Revenue Data</h2>
        <div className="h-1 w-24 bg-tech-accent mt-4"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Pipeline" value="$4.2M" trend="+12.5% THIS WEEK" />
        <StatCard label="Active Deals" value="142" trend="+3 NEW TODAY" />
        <StatCard label="AI Efficiency" value="98.4%" trend="OPTIMAL PERFORMANCE" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background-dark/40 border border-tech/10 p-6 rounded-2xl h-[300px]">
          <h3 className="font-mono text-xs text-tech/50 uppercase mb-6">Lead Velocity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#4a4459" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#4a4459" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#11051D', border: '1px solid #4a4459', borderRadius: '8px' }}
                itemStyle={{ color: '#bfa3d9', fontFamily: 'monospace' }}
              />
              <Bar dataKey="leads" fill="#4a4459" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conv" fill="#bfa3d9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-background-dark/40 border border-tech/10 p-6 rounded-2xl h-[300px]">
           <h3 className="font-mono text-xs text-tech/50 uppercase mb-6">Forecast Accuracy</h3>
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#4a4459" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#4a4459" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#11051D', border: '1px solid #4a4459', borderRadius: '8px' }}
                 itemStyle={{ color: '#bfa3d9', fontFamily: 'monospace' }}
              />
              <Line type="monotone" dataKey="leads" stroke="#bfa3d9" strokeWidth={2} dot={{fill: '#11051D', strokeWidth: 2}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;