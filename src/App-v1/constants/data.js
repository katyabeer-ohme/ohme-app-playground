// Constants
export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const PLUG_IN_STREAK = [true, true, true, false, true, false, false];

// Today's Schedule
export const todaySchedule = [
  { timeSlot: 'Righ now until 16:40 PM', action: 'Charging from solar and grid', rate: '£0.00', cost: '£0.00', reason: 'Utilising free energy', power: '+4%' },
  { timeSlot: '16:40 PM - 22:00 PM', action: 'Paused', rate: 'Peak', cost: '£0.00', reason: 'Waiting for off-peak', power: '+0%' },
  { timeSlot: '22:00 PM - 6:00 AM', action: 'Charging at off-peak rate', rate: '£1.20', cost: '£1.20', reason: 'Cheapest window', power: '+23%' },
  { timeSlot: '6:00 - 7:30 AM', action: 'Final top-up', rate: '£0.97', cost: '£0.30', reason: 'Ready for morning', power: '+11%' },
];

// Activity Events
export const activityEvents = [
  {
    date: 'Today',
    events: [
      { time: '1:00 PM', type: 'alert', title: 'Minor alert resolved', details: 'Low voltage condition detected • Status: Fixed' },
      { time: '3:45 PM', type: 'plug-in', title: 'Car plugged in', details: 'Tesla Model 3 • Battery: 45%' },
      { time: '4:00 PM', type: 'tariff', title: 'Peak rate detected', details: 'Grid rate: 45p/kWh • Charging paused' },
      { time: '11:00 PM', type: 'rate-drop', title: 'Off-peak rate active', details: 'Grid rate: 12p/kWh • Charging started' },
    ]
  }
];

// Usage Data - 24-hour breakdown format for v2 UsageView
export const usageData = [
  { time: '00:00', cost: 0.45, saving: 0, kwh: 1.5 },
  { time: '06:00', cost: 0.42, saving: 0, kwh: 1.4 },
  { time: '10:00', cost: 0.72, saving: 0, kwh: 2.3 },
  { time: '12:00', cost: 0, saving: 1.20, kwh: 0 },
  { time: '17:00', cost: 0.92, saving: 0, kwh: 3.0 },
  { time: '20:00', cost: 0, saving: 0.60, kwh: 0 },
  { time: '23:00', cost: 0.28, saving: 0, kwh: 0.9 },
];

// AI Responses
export const AI_RESPONSES = [
  'Off-peak rates start at 11 PM. You\'ll save £0.45 by waiting.',
  'Your cheapest window tomorrow is 12 AM - 6 AM. Consider charging then.',
  'If you enable V2G, you could earn £2-3 during tonight\'s peak window.',
];

// Energy Graph Data - 24 hour overview (rates matching tariff tiers)
export const energyGraphData = [
  { hour: 0, source: 'off-peak', cost: 0.15, rate: 24.8, power: 1.2 },
  { hour: 1, source: 'off-peak', cost: 0.18, rate: 26.5, power: 1.5 },
  { hour: 2, source: 'off-peak', cost: 0.14, rate: 25.2, power: 1.1 },
  { hour: 3, source: 'off-peak', cost: 0.16, rate: 27.1, power: 1.3 },
  { hour: 4, source: 'off-peak', cost: 0.19, rate: 28.5, power: 1.6 },
  { hour: 5, source: 'off-peak', cost: 0.17, rate: 26.8, power: 1.4 },
  { hour: 6, source: 'standard', cost: 0.22, rate: 35.2, power: 1.2 },
  { hour: 7, source: 'standard', cost: 0.28, rate: 38.5, power: 1.5 },
  { hour: 8, source: 'peak', cost: 0.42, rate: 48.5, power: 2.1 },
  { hour: 9, source: 'peak', cost: 0.58, rate: 52.3, power: 3.8 },
  { hour: 10, source: 'peak', cost: 0.62, rate: 55.8, power: 5.2 },
  { hour: 11, source: 'peak', cost: 0.68, rate: 58.2, power: 6.4 },
  { hour: 12, source: 'peak', cost: 0.72, rate: 60.5, power: 7.2 },
  { hour: 13, source: 'peak', cost: 0.65, rate: 57.8, power: 6.8 },
  { hour: 14, source: 'peak', cost: 0.58, rate: 54.2, power: 5.6 },
  { hour: 15, source: 'peak', cost: 0.52, rate: 51.5, power: 4.2 },
  { hour: 16, source: 'peak', cost: 0.48, rate: 49.8, power: 2.5 },
  { hour: 17, source: 'peak', cost: 0.55, rate: 52.5, power: 3.0 },
  { hour: 18, source: 'peak', cost: 0.62, rate: 58.3, power: 3.5 },
  { hour: 19, source: 'peak', cost: 0.58, rate: 55.2, power: 3.3 },
  { hour: 20, source: 'peak', cost: 0.48, rate: 50.5, power: 2.8 },
  { hour: 21, source: 'standard', cost: 0.35, rate: 42.5, power: 1.2 },
  { hour: 22, source: 'off-peak', cost: 0.18, rate: 26.8, power: 1.5 },
  { hour: 23, source: 'off-peak', cost: 0.16, rate: 25.5, power: 1.3 },
];

