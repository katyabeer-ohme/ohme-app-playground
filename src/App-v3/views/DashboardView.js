import React from 'react';
import { Zap, Sun, Car, Sparkles, Home, Cloud, CloudSun } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import { WEEK_DAYS, PLUG_IN_STREAK, todaySchedule } from '../constants/data';

export default function DashboardView({ setScheduleOpen, setView }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;
  const currentBattery = 45;
  const targetBattery = 80;
  const batteryProgress = currentBattery;

  // Hub status data
  const hubStatus = {
    charger: { status: 'Online', rate: '7 kW' },
    grid: { power: '1.1 kW' },
    solar: { export: '1.6 kW' },
    home: { consumption: '2.1 kW' },
    vehicles: [
      { name: 'Tesla Model 3', status: 'Charging', battery: 45 },
      { name: 'BMW i3', status: 'Unplugged', battery: 78 }
    ]
  };

  const currentRate = {
    price: 7.5,
    period: 'Now until 04:00 AM'
  };

  const planSummary = {
    totalCost: '£4.57',
    totalEnergy: '68 kWh'
  };

  const weatherForecast = [
    { time: '12 AM', condition: 'cloudy', temp: '8°C' },
    { time: '3 AM', condition: 'cloudy', temp: '7°C' },
    { time: '6 AM', condition: 'partly-cloudy', temp: '6°C' },
    { time: '9 AM', condition: 'partly-cloudy', temp: '9°C' },
    { time: '12 PM', condition: 'sunny', temp: '14°C' },
    { time: '3 PM', condition: 'sunny', temp: '16°C' },
    { time: '6 PM', condition: 'partly-cloudy', temp: '12°C' },
    { time: '9 PM', condition: 'cloudy', temp: '10°C' }
  ];

  return (
    <div className="pb-24">
      {/* HUB STATUS WIDGET */}
      <div className="mb-6">
        <div className="bg-surface py-4">
          <div className="grid grid-cols-2 gap-4 px-4">
            {/* Grid */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-brand-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-tertiary">Grid</p>
                <p className="text-sm font-bold text-text-primary">{hubStatus.grid.power}</p>
              </div>
            </div>

            {/* Solar */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Sun className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-tertiary">Solar</p>
                <p className="text-sm font-bold text-yellow-400">+{hubStatus.solar.export}</p>
              </div>
            </div>

            {/* Home */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-tertiary">Home</p>
                <p className="text-sm font-bold text-text-primary">{hubStatus.home.consumption}</p>
              </div>
            </div>

            {/* Car 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-4 h-4 text-brand-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-tertiary">{hubStatus.vehicles[0].name}</p>
                <p className="text-sm font-bold text-text-primary">6.3 kW</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SESSION STATUS */}
      <div className="px-4 mb-6 pt-0">
        <div className="bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 rounded-xl p-4 shadow-lg border border-brand-primary/20">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-brand-primary" />
              <p className="text-xs font-medium text-text-secondary">Tesla Model 3</p>
              <span className="text-xs bg-brand-primary/30 text-brand-primary px-1.5 py-0.5 rounded-full font-semibold">Charging
              </span>
            </div>
            <span className="text-xl">⚡☀️</span>
          </div>
          
          <p className="text-xs text-text-tertiary mb-3">Adding <span className="text-text-primary font-medium">+4% </span>until <span className="text-text-primary font-medium">16:40 PM</span></p>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Current</p>
              <p className="text-2xl font-bold text-text-primary">{currentBattery}%</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Target</p>
              <p className="text-2xl font-bold text-brand-primary">{targetBattery}%</p>
            </div>
          </div>

          <div className="mb-3 relative">
            <div className="bg-brand-dark-900/40 rounded-full h-2 overflow-hidden border border-brand-accent/30">
              <div 
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500"
                style={{ width: `${batteryProgress}%` }}
              ></div>
            </div>
            {/* Target marker */}
            <div 
              className="absolute -top-1 bottom-0 w-0.5 h-4 bg-text-primary rounded-full"
              style={{ left: `${targetBattery}%` }}
            ></div>
          </div>

          <p className="text-xs text-text-tertiary mb-3">Ready by <span className="text-text-primary font-medium">Wed 8:00 AM</span></p>

          <div className="grid grid-cols-3 gap-2">
            <button className="bg-brand-primary hover:bg-brand-primary-600 text-brand-dark py-1.5 px-2 rounded-lg font-medium text-xs transition">
              Boost charge
            </button>
            <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
              Edit target
            </button>
            <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
              Stop
            </button>
          
          </div>
        </div>
      </div>

      {/* TODAY'S PLAN */}
      <div className="px-4 mb-6">
        <div className="bg-surface-card rounded-2xl p-5 shadow-lg border border-border-light">
          <h2 className="text-lg font-bold text-text-primary mb-2">Today's Plan</h2>
          
          {/* Smart Suggestion Inside Card */}
          <div className="bg-brand-secondary/15 border border-brand-secondary/30 rounded-lg p-3 mb-4 flex gap-3">
            <Sparkles className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">Charging dynamically is going to save you <span className="font-semibold text-brand-primary">£1.57</span>.</p>
          </div>

          <div className="space-y-0 relative pl-6 mb-4">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-brand-accent"></div>
            {todaySchedule.slice(0, 3).map((item, idx) => (
              <div key={idx} className="relative pb-6 last:pb-0">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-brand-primary border-2 border-brand-dark"></div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-text-tertiary mb-1 font-medium">{item.timeSlot}</p>
                    <p className="text-sm font-semibold text-text-primary mb-1">{item.action}</p>
                    <p className="text-xs text-text-tertiary">{item.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-primary mb-0.5">{item.power}</p>
                    <p className="text-xs text-text-tertiary">{item.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Plan Summary */}
          <div className="pt-4 mt-4 border-t border-border-light">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-text-tertiary mb-1">Estimated total cost</p>
                <p className="text-text-primary font-semibold">{planSummary.totalCost}</p>
              </div>
              <div>
                <p className="text-text-tertiary mb-1">Total energy to use</p>
                <p className="text-text-primary font-semibold">{planSummary.totalEnergy}</p>
              </div>
            </div>
          </div>

          <button onClick={() => setScheduleOpen(true)} className="w-full text-brand-secondary hover:text-brand-secondary-300 font-medium text-sm mt-4">
            View full plan →
          </button>
        </div>
      </div>

      {/* CURRENT RATE */}
      <div className="px-4 mb-6">
        <div className="bg-surface-card rounded-lg p-4 shadow-lg border border-brand-primary/30 shadow-glow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-text-primary">{currentRate.price}p <span className="text-sm font-normal text-text-tertiary">per kWh</span></p>
              <p className="text-xs text-text-tertiary mt-0.5">{currentRate.period}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Today So Far */}
      <div className="px-4 mb-6 hidden">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-card rounded-lg p-4 shadow-lg">
            <p className="text-xs text-text-tertiary mb-1">Energy Used</p>
            <p className="text-2xl font-bold text-text-primary mb-2">£0.95</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-yellow-400" />
                  <span className="text-text-tertiary">Solar</span>
                </div>
                <span className="text-text-primary font-medium">11.4 kWh</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-text-tertiary">Grid</span>
                </div>
                <span className="text-text-primary font-medium">3.2 kWh</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/30 rounded-lg p-4 shadow-lg border border-emerald-500/20">
            <p className="text-xs text-emerald-300 mb-1">Savings</p>
            <p className="text-2xl font-bold text-emerald-400 mb-2">£2.35</p>
            <p className="text-xs text-emerald-300">vs peak rates</p>
          </div>
        </div>
      </div>

      {/* PLUG-IN STREAK SECTION */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 rounded-2xl p-5 shadow-lg border border-brand-secondary/30">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-text-primary">This Week's Streak</h2>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-sm text-text-secondary">{streakCount} out of 7 days plugged in</p>
          </div>

          {/* Week Days Grid */}
          <div className="flex gap-2 mb-6">
            {WEEK_DAYS.map((day, idx) => (
              <WeekDayBox key={idx} day={day} active={PLUG_IN_STREAK[idx]} />
            ))}
          </div>

          {/* Smart Suggestion Inside Card */}
          <div className="bg-brand-primary/15 border border-brand-primary/30 rounded-lg p-3 mb-4 flex gap-3">
            <Sparkles className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">Customers who plug in every day tend to save more money. Keep your car plugged in as long as possible to maximise your savings.</p>
          </div>

        </div>
      </div>

      {/* WEATHER WIDGET */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-text-tertiary mb-3 uppercase">Weather today</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {weatherForecast.map((weather, idx) => {
            const getWeatherIcon = () => {
              if (weather.condition === 'sunny') {
                return <Sun className="w-6 h-6 text-yellow-400" />;
              } else if (weather.condition === 'partly-cloudy') {
                return <CloudSun className="w-6 h-6 text-brand-secondary" />;
              } else {
                return <Cloud className="w-6 h-6 text-brand-accent" />;
              }
            };

            const getCardStyle = () => {
              if (weather.condition === 'sunny') {
                return 'bg-surface-card rounded-lg p-3 border border-yellow-500/30 min-w-[80px]';
              } else if (weather.condition === 'partly-cloudy') {
                return 'bg-surface-card rounded-lg p-3 border border-brand-secondary/30 min-w-[80px]';
              } else {
                return 'bg-surface-card rounded-lg p-3 border border-brand-accent/30 min-w-[80px]';
              }
            };

            return (
              <div key={idx} className={getCardStyle()}>
                <p className="text-xs text-text-tertiary mb-2 text-center">{weather.time}</p>
                <div className="flex items-center justify-center mb-2">
                  {getWeatherIcon()}
                </div>
                <p className="text-sm font-medium text-text-primary text-center">{weather.temp}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
