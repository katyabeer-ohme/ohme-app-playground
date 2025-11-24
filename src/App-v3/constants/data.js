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

