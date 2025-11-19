import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Zap, Sun, AlertTriangle, Car } from 'lucide-react';

export default function AssetsView() {
  const [activeAsset, setActiveAsset] = useState(null);
  const [v2hEnabled, setV2hEnabled] = useState(true);
  const [v2gEnabled, setV2gEnabled] = useState(true);
  const [minReserve, setMinReserve] = useState(20);
  const [minExportAmps, setMinExportAmps] = useState(4);
  const [tariffDetailOpen, setTariffDetailOpen] = useState(false);
  
  // Charge settings state
  const [minChargeTarget, setMinChargeTarget] = useState(60);
  const [maxChargeTarget, setMaxChargeTarget] = useState(80);
  const [readyByDate, setReadyByDate] = useState(new Date().toISOString().split('T')[0]);
  const [readyByTime, setReadyByTime] = useState('08:00');

  // Vehicle data
  const vehicles = [
    {
      id: 'tesla-1',
      name: 'Tesla Model 3',
      nickname: 'Tesla Model 3',
      currentCharge: 45,
      maxCapacity: 75,
      batteryHealth: 97,
      onboardCharger: '7kW',
      maxChargingSpeed: '11kW',
      range: 245,
      vin: '5YJ3E1EA0JF456789',
      recentCharges: [
        { date: 'Today', energy: 12.5, cost: '£3.20', duration: '4h 30m', location: 'Home' },
        { date: 'Yesterday', energy: 15.2, cost: '£2.95', duration: '5h 15m', location: 'Home' },
        { date: 'Nov 8', energy: 10.8, cost: '£4.50', duration: '3h 45m', location: 'Ohme Home Pro' },
      ]
    },
    {
      id: 'bmw-1',
      name: 'BMW i3',
      nickname: 'BMW i3',
      currentCharge: 78,
      maxCapacity: 42,
      batteryHealth: 94,
      onboardCharger: '11kW',
      maxChargingSpeed: '7kW',
      range: 168,
      vin: 'WBXYZ1234567890ABC',
      recentCharges: [
        { date: 'Nov 9', energy: 8.2, cost: '£1.95', duration: '1h 15m', location: 'Ohme Home Pro' },
        { date: 'Nov 6', energy: 9.5, cost: '£2.10', duration: '1h 30m', location: 'Ohme Home Pro' },
        { date: 'Nov 4', energy: 7.8, cost: '£1.85', duration: '1h 20m', location: 'Ohme Home Pro' },
      ]
    }
  ];

  // Charger data
  const charger = {
    id: 'ohme-1',
    name: 'Ohme Home Pro',
    location: 'Driveway',
    type: 'Smart Charger',
    power: '7kW',
    status: 'connected',
    connectorType: 'Type 2',
    totalSessions: 247,
    costThisMonth: 38.92,
    installedDate: 'March 2023',
    firmware: 'v2.1.4',
    warrantyExpiry: 'March 2028',
    warrantyRemaining: '3 years 4 months',
    warrantyStatus: 'active',
    currentSession: {
      vehicle: 'Tesla Model 3',
      progress: 65,
      timeLeft: '2h 15m',
      power: '6.8 kW',
      energy: 12.4,
    },
    stats: {
      thisMonth: 156.4,
      totalSessions: 247,
      avgSessionDuration: '3h 42m',
      totalEnergy: 3847.2,
    }
  };

  // Solar data
  const solar = {
    id: 'solar-1',
    name: 'Solar',
    type: 'solar',
    capacity: 5.5,
    capacityUnit: 'kWp',
    currentGeneration: 4.2,
    generationUnit: 'kW',
    panelCount: 14,
    panelWattage: '400W',
    inverter: 'SMA Sunny Boy 6.0',
    inverterRating: '6kW',
    orientation: 'South/East',
    angle: '25°',
    installedDate: 'June 2022',
    weatherService: 'MeteoBlue',
    forecastAccuracy: 94,
    status: 'exporting',
    todayGeneration: 28.4,
    weekGeneration: 165.2,
    minExportAmps: 4,
  };

  // Home Battery data
  const homeBattery = {
    id: 'hb-1',
    name: 'Home Battery',
    make: 'Tesla Powerwall',
    model: 'Gen 3',
    type: 'battery',
    currentCapacity: 12.8,
    maxCapacity: 13.5,
    currentPercent: 95,
    warrantyYears: 10,
    installedDate: 'March 2023',
    status: 'online',
    minReserve: 20,
    reserveAmount: 2.7,
    chargeCycles: 342,
    degradation: 0.8,
  };

  const rateData = [
    { time: '00:00', rate: 28.5, type: 'off-peak' },
    { time: '02:00', rate: 26.2, type: 'off-peak' },
    { time: '04:00', rate: 24.8, type: 'off-peak' },
    { time: '06:00', rate: 31.5, type: 'standard' },
    { time: '08:00', rate: 45.2, type: 'peak' },
    { time: '10:00', rate: 52.1, type: 'peak' },
    { time: '12:00', rate: 48.5, type: 'peak' },
    { time: '14:00', rate: 38.2, type: 'standard' },
    { time: '16:00', rate: 55.8, type: 'peak' },
    { time: '18:00', rate: 62.3, type: 'peak' },
    { time: '20:00', rate: 41.5, type: 'standard' },
    { time: '22:00', rate: 29.4, type: 'off-peak' },
  ];

  const maxRate = Math.max(...rateData.map(d => d.rate));

  const ToggleSwitch = ({ on, onChange }) => (
    <button
      onClick={() => onChange(!on)}
      className={`w-12 h-6 rounded-full flex items-center transition-all ${on ? 'bg-emerald-500' : 'bg-slate-600'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${on ? 'ml-auto mr-0.5' : 'ml-0.5'}`}></div>
    </button>
  );

  const TariffDetailScreen = () => (
    <div className="fixed inset-0 z-50 bg-slate-900 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-slate-800 sticky top-[56px] z-10 bg-slate-900 mt-[56px]">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => setTariffDetailOpen(false)} className="text-slate-400 hover:text-white">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Octopus Energy - Agile</h1>
            <p className="text-xs text-slate-400">Octopus Energy</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Current Rate Banner */}
        <div className="px-4 pt-6 pb-4">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-2">Current rate</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-white">28.5p</p>
              <p className="text-sm text-slate-400">/kWh</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">as of 10:00</p>
          </div>
        </div>

        {/* Rate Tiers */}
        <div className="px-4 pb-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">Off-peak</p>
                  <p className="text-xs text-slate-400">Midnight – 6 AM</p>
                </div>
              </div>
              <p className="text-sm font-bold text-white">24.8p–28.5p</p>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">Standard</p>
                  <p className="text-xs text-slate-400">Variable throughout day</p>
                </div>
              </div>
              <p className="text-sm font-bold text-white">31.5p–48.5p</p>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium text-white">Peak</p>
                  <p className="text-xs text-slate-400">8 AM – 10 PM (typical)</p>
                </div>
              </div>
              <p className="text-sm font-bold text-white">45.2p–62.3p</p>
            </div>
          </div>
        </div>

        {/* 24-Hour Rate Chart */}
        <div className="px-4 pb-6">
          <p className="text-sm font-medium text-white mb-4">Today's rates</p>
          <div className="border border-slate-700 rounded-xl p-4">
            <div className="h-40 flex items-end gap-1 pb-4 border-b border-slate-700 mb-4">
              {rateData.map((bar, idx) => {
                const height = (bar.rate / maxRate) * 100;
                const barColor = bar.type === 'peak' ? 'bg-red-500' : bar.type === 'standard' ? 'bg-orange-500' : 'bg-emerald-500';
                return (
                  <div key={idx} className="flex-1 flex flex-col items-end justify-end relative group h-full">
                    <div
                      className={`w-full rounded-t transition-opacity hover:opacity-80 cursor-pointer ${barColor}`}
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                        {bar.time}: {bar.rate}p
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-400">Off-peak</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-slate-400">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-slate-400">Peak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="px-4 pb-6">
          <div className="border border-slate-700 rounded-xl p-4 flex gap-3">
            <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white mb-1">Best time to charge</p>
              <p className="text-xs text-slate-400">Off-peak rates (midnight–6 AM) are 45% cheaper than peak hours. Schedule charging for 10 PM–6 AM when possible.</p>
            </div>
          </div>
        </div>

        {/* Savings Potential */}
        <div className="px-4 pb-6">
          <div className="border border-emerald-500/30 rounded-xl p-4 bg-emerald-500/5">
            <p className="text-xs text-emerald-300 mb-2">Savings potential</p>
            <p className="text-2xl font-bold text-emerald-400 mb-1">£8.50/month</p>
            <p className="text-xs text-slate-400">by shifting all charging to off-peak hours</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="px-4 pb-20 space-y-3">
          <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium text-sm transition">
            Change tariff
          </button>
          <button className="w-full py-3 border border-slate-600 hover:border-slate-500 text-slate-300 rounded-lg font-medium text-sm transition">
            Compare other tariffs
          </button>
        </div>
      </div>
    </div>
  );

  const renderCarScreen = (vehicle) => (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 border-b border-slate-700">
        <button onClick={() => setActiveAsset(null)} className="mb-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Assets</span>
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Vehicle</p>
            <h1 className="text-2xl font-bold text-white">{vehicle.nickname}</h1>
          </div>
          <span className="text-4xl font-bold text-cyan-400">{vehicle.currentCharge}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
          <div className="bg-cyan-500 h-3 rounded-full transition-all" style={{ width: `${(vehicle.currentCharge / vehicle.maxCapacity) * 100}%` }}></div>
        </div>
        <p className="text-xs text-slate-400">{vehicle.currentCharge}% of {vehicle.maxCapacity} kWh • {vehicle.range} miles range</p>
      </div>

      <div className="px-4 pt-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Battery Health</p>
            <p className="text-lg font-bold text-green-400">{vehicle.batteryHealth}%</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Max Charge Speed</p>
            <p className="text-lg font-bold text-white">{vehicle.maxChargingSpeed}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Capacity</p>
            <p className="text-lg font-bold text-white">{vehicle.maxCapacity} kWh</p>
          </div>
        </div>

        {/* Charge Settings */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Charge Settings</h3>
          
          {/* Min and Max Charge Targets */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Min Charge</label>
                <span className="text-sm font-bold text-cyan-400">{minChargeTarget}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={minChargeTarget}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < maxChargeTarget) {
                    setMinChargeTarget(value);
                  }
                }}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Max Charge</label>
                <span className="text-sm font-bold text-cyan-400">{maxChargeTarget}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={maxChargeTarget}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > minChargeTarget) {
                    setMaxChargeTarget(value);
                  }
                }}
                className="w-full"
              />
            </div>
          </div>

          {/* Ready By */}
          <div>
            <label className="text-sm text-slate-300 mb-2 block">Ready By</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={readyByDate}
                onChange={(e) => setReadyByDate(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="time"
                value={readyByTime}
                onChange={(e) => setReadyByTime(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Vehicle to Grid/Home</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">V2H (Vehicle to Home)</p>
                <p className="text-xs text-slate-400 mt-0.5">Power your home during peak rates</p>
              </div>
              <ToggleSwitch on={v2hEnabled} onChange={setV2hEnabled} />
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">V2G (Vehicle to Grid)</p>
                <p className="text-xs text-slate-400 mt-0.5">Export to grid for earnings</p>
              </div>
              <ToggleSwitch on={v2gEnabled} onChange={setV2gEnabled} />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Recent Charges</h3>
          <div className="space-y-2">
            {vehicle.recentCharges.map((charge, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium">{charge.date}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{charge.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{charge.energy} kWh</p>
                  <p className="text-xs text-slate-400">{charge.cost} • {charge.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">VIN</p>
              <p className="text-sm font-bold text-white font-mono text-xs">{vehicle.vin}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Onboard Charger</p>
              <p className="text-sm font-bold text-white">{vehicle.onboardCharger}</p>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-red-950/30 text-red-400 rounded-lg font-medium border border-red-900/30 hover:bg-red-950/50 transition">
          Unpair Vehicle
        </button>
      </div>
    </div>
  );

  const renderBatteryScreen = () => (
    <div className="pb-24">
      {/* Header with status */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-6 border-b border-slate-700">
        <button onClick={() => setActiveAsset(null)} className="mb-4 flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Assets</span>
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Home Battery</p>
            <h1 className="text-2xl font-bold text-white">{homeBattery.make}</h1>
            <p className="text-xs text-slate-400 mt-1">{homeBattery.model}</p>
          </div>
          <span className="text-4xl font-bold text-emerald-400">{homeBattery.currentPercent}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
          <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${homeBattery.currentPercent}%` }}></div>
        </div>
        <p className="text-xs text-slate-400">{homeBattery.currentCapacity.toFixed(1)} of {homeBattery.maxCapacity} kWh</p>
      </div>

      <div className="px-4 pt-6">
        {/* Status & Health */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-500/20">
            <p className="text-xs text-emerald-300 mb-1">Status</p>
            <p className="text-sm font-bold text-emerald-400">● Online</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Degradation</p>
            <p className="text-sm font-bold text-white">{homeBattery.degradation}%</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Charge Cycles</p>
            <p className="text-sm font-bold text-white">{homeBattery.chargeCycles}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Warranty</p>
            <p className="text-sm font-bold text-white">{homeBattery.warrantyYears} years</p>
          </div>
        </div>

        {/* Reserve Settings */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Battery Reserve</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Minimum Reserve</label>
                <span className="text-sm font-bold text-emerald-400">{minReserve}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={minReserve}
                onChange={(e) => setMinReserve(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-400 mt-2">Won't discharge below {minReserve}% ({(homeBattery.maxCapacity * minReserve / 100).toFixed(1)} kWh)</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-xs text-cyan-300">💡 Higher reserves = more safety, lower reserves = more flexibility</p>
            </div>
          </div>
        </div>

        {/* Connected Devices */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-3">Connected Chargers</h3>
          <div className="space-y-2">
            <div className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">Home Wall Box</p>
                <p className="text-xs text-slate-400 mt-0.5">7kW Charger</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Connected</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Paired car: Tesla Model 3</p>
        </div>

        {/* Battery Details */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Battery Details</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Model</span>
              <span className="text-white font-medium">{homeBattery.model}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Capacity</span>
              <span className="text-white font-medium">{homeBattery.maxCapacity} kWh</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Installed</span>
              <span className="text-white font-medium">{homeBattery.installedDate}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Warranty Until</span>
              <span className="text-white font-medium">March 2033</span>
            </div>
          </div>
        </div>

        {/* Disconnect Button */}
        <button className="w-full py-3 bg-red-950/30 text-red-400 rounded-lg font-medium border border-red-900/30 hover:bg-red-950/50 transition">
          Disconnect Battery
        </button>
      </div>
    </div>
  );

  const renderChargerScreen = () => (
    <div className="pb-24">
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-6 border-b border-slate-700">
        <button onClick={() => setActiveAsset(null)} className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Assets</span>
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">EV Charger</p>
            <h1 className="text-2xl font-bold text-white">{charger.name}</h1>
            <p className="text-xs text-slate-400 mt-1">{charger.location}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${charger.status === 'connected' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'}`}>
              ● Connected
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Power Rating</p>
            <p className="text-lg font-bold text-blue-400">{charger.power}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Type</p>
            <p className="text-lg font-bold text-white">{charger.type}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Connector</p>
            <p className="text-lg font-bold text-white">{charger.connectorType}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Sessions</p>
            <p className="text-lg font-bold text-white">{charger.totalSessions}</p>
          </div>
        </div>

        {charger.currentSession && (
          <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
            <h3 className="text-sm font-bold text-white mb-4">Current Session</h3>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white">{charger.currentSession.vehicle}</p>
                <span className="text-sm font-bold text-blue-400">{charger.currentSession.progress}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${charger.currentSession.progress}%` }}></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-slate-400">Time Left</p>
                  <p className="text-white font-semibold">{charger.currentSession.timeLeft}</p>
                </div>
                <div>
                  <p className="text-slate-400">Power</p>
                  <p className="text-white font-semibold">{charger.currentSession.power}</p>
                </div>
                <div>
                  <p className="text-slate-400">Energy</p>
                  <p className="text-white font-semibold">{charger.currentSession.energy} kWh</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Usage</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Energy This Month</p>
              <p className="text-sm font-bold text-white">{charger.stats.thisMonth} kWh</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Total Energy</p>
              <p className="text-sm font-bold text-white">{charger.stats.totalEnergy.toLocaleString()} kWh</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Avg. Session</p>
              <p className="text-sm font-bold text-white">{charger.stats.avgSessionDuration}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Total Cost</p>
              <p className="text-sm font-bold text-white">£{charger.costThisMonth}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-950/30 rounded-xl p-4 mb-6 border border-blue-500/30">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-1">Warranty Active</h3>
              <p className="text-xs text-blue-300 mb-3">{charger.warrantyRemaining} remaining</p>
              <div className="bg-slate-700/50 rounded-lg p-2 mb-3">
                <p className="text-xs text-slate-400">Expires: {charger.warrantyExpiry}</p>
              </div>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">
                Renew Warranty
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Installed Date</p>
              <p className="text-sm font-bold text-white">{charger.installedDate}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Firmware</p>
              <p className="text-sm font-bold text-white">{charger.firmware}</p>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-red-950/30 text-red-400 rounded-lg font-medium border border-red-900/30 hover:bg-red-950/50 transition">
          Remove Charger
        </button>
      </div>
    </div>
  );

  const renderSolarScreen = () => (
    <div className="pb-24">
      {/* Header with generation */}
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 border-b border-slate-700">
        <button onClick={() => setActiveAsset(null)} className="mb-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Assets</span>
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Solar Array</p>
            <h1 className="text-2xl font-bold text-white">{solar.capacity} {solar.capacityUnit}</h1>
          </div>
          <span className="text-4xl font-bold text-yellow-400">{solar.currentGeneration}kW</span>
        </div>
        <p className="text-xs text-slate-400">Currently generating • {solar.status === 'exporting' ? '📤 Exporting' : 'importing'}</p>
      </div>

      <div className="px-4 pt-6">
        {/* Generation Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Today</p>
            <p className="text-lg font-bold text-yellow-400">{solar.todayGeneration} kWh</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">This Week</p>
            <p className="text-lg font-bold text-yellow-400">{solar.weekGeneration} kWh</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Panels</p>
            <p className="text-lg font-bold text-white">{solar.panelCount} × {solar.panelWattage}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Forecast</p>
            <p className="text-lg font-bold text-white">{solar.forecastAccuracy}%</p>
          </div>
        </div>

        {/* System Details */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">System Details</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Array Size</span>
              <span className="text-white font-medium">{solar.capacity} {solar.capacityUnit}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Inverter</span>
              <span className="text-white font-medium text-right">{solar.inverter}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Inverter Rating</span>
              <span className="text-white font-medium">{solar.inverterRating}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Orientation</span>
              <span className="text-white font-medium">{solar.orientation} • {solar.angle}</span>
            </div>
            <div className="h-px bg-slate-700"></div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Installed</span>
              <span className="text-white font-medium">{solar.installedDate}</span>
            </div>
          </div>
        </div>

        {/* Weather & Forecast */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Forecast</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Weather Service</p>
                <p className="text-xs text-slate-400 mt-0.5">{solar.weatherService}</p>
              </div>
              <span className="text-sm font-bold text-white">{solar.forecastAccuracy}% accurate</span>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tomorrow</span>
                <span className="text-white font-medium">☀️ Sunny • 35 kWh expected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Day after</span>
                <span className="text-white font-medium">⛅ Partly cloudy • 22 kWh expected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Settings */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4">Export Settings</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Min Amps to Export</label>
                <span className="text-sm font-bold text-yellow-400">{minExportAmps}A</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                value={minExportAmps}
                onChange={(e) => setMinExportAmps(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-400 mt-2">Only export excess when above {minExportAmps}A available</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-xs text-cyan-300">💡 Lower amps = more frequent exports but smaller amounts</p>
            </div>
          </div>
        </div>

        {/* Disconnect Button */}
        <button className="w-full py-3 bg-red-950/30 text-red-400 rounded-lg font-medium border border-red-900/30 hover:bg-red-950/50 transition">
          Disconnect Solar
        </button>
      </div>
    </div>
  );

  const renderAssetsList = () => (
    <div className="pb-24">
      <div className="px-4 mb-4 pt-4">
      </div>

      {/* HOME ENERGY VISUALIZATION */}
      <div className="px-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="relative w-full h-64 flex items-center justify-center">
            {/* Dotted Lines - Triangle layout */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {/* Grid to Charger */}
              <line x1="15%" y1="80%" x2="50%" y2="20%" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
              {/* Charger to Car */}
              <line x1="50%" y1="20%" x2="85%" y2="80%" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
              {/* Car to Grid */}
              <line x1="85%" y1="80%" x2="15%" y2="80%" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
            
            {/* Grid (Bottom Left) */}
            <div className="absolute bottom-0 left-8 text-center">
              <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-slate-600">
                <Zap className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Grid</p>
              <p className="text-sm font-bold text-slate-300">45p/kWh</p>
            </div>
            
            {/* Charger (Top Center) */}
            <div className="absolute top-0 text-center">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-cyan-500">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Charger</p>
              <p className="text-sm font-bold text-cyan-400">{charger.status === 'connected' ? 'Online' : 'Offline'}</p>
            </div>
            
            {/* Car (Bottom Right) */}
            <div className="absolute bottom-0 right-8 text-center">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-emerald-500">
                <Car className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Car</p>
              <p className="text-sm font-bold text-emerald-400">{vehicles[0].currentCharge}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {/* Vehicles */}
        {vehicles.map(vehicle => (
          <button
            key={vehicle.id}
            onClick={() => setActiveAsset(vehicle.id)}
            className="w-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-4 text-left hover:from-cyan-500/30 hover:to-blue-500/30 transition border border-cyan-500/30"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-lg">🚗</span>
                <div>
                  <p className="text-sm font-bold text-white">{vehicle.nickname}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Battery: {vehicle.currentCharge}% • Range: {vehicle.range} miles</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
            </div>
          </button>
        ))}

        {/* Charger */}
        <button
          onClick={() => setActiveAsset('charger')}
          className="w-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg p-4 text-left hover:from-blue-500/30 hover:to-indigo-500/30 transition border border-blue-500/30"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-lg">🔌</span>
              <div>
                <p className="text-sm font-bold text-white">{charger.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{charger.power} • {charger.location}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
          <div className="flex gap-2">
            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">● Connected</span>
          </div>
        </button>

        {/* Solar */}
        <button
          onClick={() => setActiveAsset('solar')}
          className="w-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 text-left hover:from-yellow-500/30 hover:to-orange-500/30 transition border border-yellow-500/30"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-lg">☀️</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Solar Array</p>
                <p className="text-xs text-slate-400 mt-0.5">Capacity: {solar.capacity} {solar.capacityUnit} • Today: {solar.todayGeneration} kWh</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
          </div>
          <div className="flex gap-2">
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">📤 Exporting</span>
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">{solar.panelCount} panels</span>
          </div>
        </button>

        {/* Add Device */}
        <button className="w-full bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-700 transition border-2 border-dashed border-slate-700 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-medium text-slate-400">Add Device</span>
        </button>
      </div>

      <div className="pb-6"></div>

      {/* TARIFFS & PRICING */}
      <div className="px-4 pb-6">
        <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Tariffs & Pricing</h3>
        
        <div className="bg-slate-800 rounded-lg p-4 mb-3">
          <button 
            onClick={() => setTariffDetailOpen(true)}
            className="w-full text-left hover:opacity-80 transition"
          >
            <div className="mb-3">
              <p className="text-sm font-semibold text-white mb-1">Octopus Energy - Agile</p>
              <p className="text-xs text-slate-400">Octopus Energy</p>
            </div>
            
            <div className="mb-3 p-3 bg-slate-700/30 rounded border border-slate-700">
              <p className="text-xs text-slate-300 mb-1">Current rate</p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-bold text-white">28.5p</p>
                <p className="text-xs text-slate-400">/kWh</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">Next cheaper rate: 11 PM</p>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </button>
        </div>

        <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium text-left">
          + Add export tariff
        </button>
      </div>
    </div>
  );

  return (
    <>
      {!activeAsset && !tariffDetailOpen && renderAssetsList()}
      {activeAsset === 'tesla-1' && renderCarScreen(vehicles[0])}
      {activeAsset === 'bmw-1' && renderCarScreen(vehicles[1])}
      {activeAsset === 'charger' && renderChargerScreen()}
      {activeAsset === 'solar' && renderSolarScreen()}
      {activeAsset === 'battery' && renderBatteryScreen()}
      {tariffDetailOpen && <TariffDetailScreen />}
    </>
  );
}
