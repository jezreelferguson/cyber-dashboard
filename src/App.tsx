import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SecurityDashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Simulated real-time security metrics
  const securityScore = 87;
  const activeThreats = 3;
  const blockedAttempts = 247;
  const monitoredAssets = 156;

  // Failed login attempts over time
  const loginData = [
    { time: '00:00', attempts: 12 },
    { time: '04:00', attempts: 8 },
    { time: '08:00', attempts: 23 },
    { time: '12:00', attempts: 45 },
    { time: '16:00', attempts: 67 },
    { time: '20:00', attempts: 34 },
    { time: '23:59', attempts: 28 }
  ];

  // Traffic by protocol
  const trafficData = [
    { name: 'HTTPS', value: 45, color: '#10b981' },
    { name: 'HTTP', value: 20, color: '#f59e0b' },
    { name: 'SSH', value: 15, color: '#3b82f6' },
    { name: 'DNS', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 8, color: '#6b7280' }
  ];

  // Top threat types
  const threatData = [
    { type: 'Brute Force', count: 89 },
    { type: 'Port Scan', count: 67 },
    { type: 'SQL Injection', count: 45 },
    { type: 'XSS Attempt', count: 28 },
    { type: 'Malware', count: 18 }
  ];

  // Recent security events
  const recentEvents = [
    { time: '23:47:12', severity: 'high', event: 'Multiple failed SSH login attempts from 192.168.1.45', ip: '192.168.1.45' },
    { time: '23:42:33', severity: 'medium', event: 'Unusual outbound traffic detected on port 4444', ip: '10.0.2.18' },
    { time: '23:38:56', severity: 'low', event: 'File integrity check: /etc/passwd modified', ip: 'localhost' },
    { time: '23:35:21', severity: 'high', event: 'Potential SQL injection attempt blocked', ip: '203.0.113.42' },
    { time: '23:31:09', severity: 'medium', event: 'Port scan detected from external IP', ip: '198.51.100.23' }
  ];

  const MetricCard = ({ icon, label, value, valueColor, bgColor }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:transform hover:-translate-y-1 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-full ${bgColor} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const SeverityBadge = ({ severity }) => {
    const colors = {
      high: 'bg-red-900 text-red-200',
      medium: 'bg-yellow-900 text-yellow-200',
      low: 'bg-blue-900 text-blue-200'
    };
    return (
      <span className={`text-xs px-2 py-1 rounded ${colors[severity]}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  const SeverityIndicator = ({ severity }) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return <div className={`w-2 h-2 rounded-full ${colors[severity]}`}></div>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <h1 className="text-xl font-bold">Security Operations Center</h1>
              <p className="text-sm text-gray-400">Real-time Security Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto-Refresh: {autoRefresh ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            icon="🛡️"
            label="Security Score"
            value={`${securityScore}%`}
            valueColor="text-green-400"
            bgColor="bg-green-900/30"
          />
          <MetricCard
            icon="⚠️"
            label="Active Threats"
            value={activeThreats}
            valueColor="text-red-400"
            bgColor="bg-red-900/30"
          />
          <MetricCard
            icon="🔒"
            label="Blocked Attempts"
            value={blockedAttempts}
            valueColor="text-yellow-400"
            bgColor="bg-yellow-900/30"
          />
          <MetricCard
            icon="🖥️"
            label="Monitored Assets"
            value={monitoredAssets}
            valueColor="text-blue-400"
            bgColor="bg-blue-900/30"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Failed Login Attempts Chart */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Failed Login Attempts
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={loginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attempts" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  dot={{ fill: '#ef4444', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Distribution */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Network Traffic by Protocol
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Types Bar Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Top Threat Types (Last 24h)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={threatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Security Events */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Recent Security Events
            </h3>
            <span className="text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          <div className="space-y-3">
            {recentEvents.map((event, idx) => (
              <div 
                key={idx} 
                className="bg-gray-700/50 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-700 transition-colors border border-gray-600"
              >
                <div className="mt-2">
                  <SeverityIndicator severity={event.severity} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <code className="text-sm text-gray-400 font-mono">{event.time}</code>
                    <SeverityBadge severity={event.severity} />
                  </div>
                  <p className="text-gray-200 mb-1">{event.event}</p>
                  <p className="text-sm text-gray-400">Source: <code className="text-blue-400">{event.ip}</code></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;