// Constants
export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const PLUG_IN_STREAK = [true, true, true, false, true, false, false];

// Rewards Data
export const rewardsData = {
  totalEarned: 142.30,
  thisMonth: 42.30,
  weekStreak: 5,
  badges: [
    { name: 'Early Adopter', icon: '🌟', earned: true, date: 'Oct 2024' },
    { name: 'Flex Champion', icon: '💪', earned: true, date: 'Nov 2024' },
    { name: 'Solar Master', icon: '☀️', earned: true, date: 'Nov 2024' },
    { name: 'Week Warrior', icon: '🔥', earned: false, date: 'Lock in 7 days' },
  ],
  transactions: [
    { date: 'Nov 10', type: 'v2g', amount: 2.50, description: 'Peak Response - Evening window', status: 'pending' },
    { date: 'Nov 9', type: 'flex', amount: 1.80, description: 'Flexibility Service - Load shift', status: 'paid' },
    { date: 'Nov 8', type: 'v2g', amount: 3.20, description: 'Peak Response - Evening window', status: 'paid' },
    { date: 'Nov 7', type: 'bonus', amount: 5.00, description: 'Week Streak Bonus', status: 'paid' },
    { date: 'Nov 6', type: 'flex', amount: 1.95, description: 'Flexibility Service - Load shift', status: 'paid' },
    { date: 'Nov 5', type: 'v2g', amount: 2.80, description: 'Peak Response - Evening window', status: 'paid' },
  ],
};

// Today's Schedule
export const todaySchedule = [
  { timeSlot: 'Right now', action: 'Charging from solar', target: '+23%', cost: 'Free', reason: 'Utilising free energy', icon: 'solar', consumption: 7.2 },
  { timeSlot: '3:45 - 5:00 PM', action: 'Paused', target: '0%', cost: '£0.00', reason: 'High grid rate window', icon: 'pause', consumption: 0 },
  { timeSlot: '5:00 - 10:30 PM', action: 'Powering home with Tesla (V2H)', target: '-15%', cost: 'Save £0.80', reason: 'Peak rate avoidance', icon: 'v2h', consumption: -4.8 },
  { timeSlot: '10:30 PM - 6:00 AM', action: 'Off-peak charging', target: '+35%', cost: '£1.20', reason: 'Night rate advantage', icon: 'night', consumption: 11.2 },
  { timeSlot: '6:00 - 7:30 AM', action: 'Final top-up', target: '+8%', cost: '£0.30', reason: 'Ready for morning', icon: 'charge', consumption: 2.4 },
  { timeSlot: '7:30 - 8:00 AM', action: 'Preconditioning', target: '0%', cost: '£0.10', reason: 'Cabin heating', icon: 'precondition', consumption: 0.3 },
];

// Activity Events
export const activityEvents = [
  {
    date: 'Today',
    events: [
      { time: '10:30 AM', type: 'plug-in', title: 'EV plugged in', details: 'Tesla Model 3 • Battery: 45%' },
      { time: '10:45 AM', type: 'solar', title: 'Solar peak detected', details: 'Charging initiated at 7.2kW • Weather: Clear' },
      { time: '12:00 PM', type: 'schedule-change', title: 'Schedule adjusted', details: 'Solar forecast dropped 20% • Added more grid charging' },
      { time: '1:00 PM', type: 'v2h', title: 'V2H activated', details: 'Discharging to home • Peak rate window active' },
      { time: '3:15 PM', type: 'alert', title: 'Minor alert resolved', details: 'Low voltage condition detected • Status: Fixed' },
    ]
  },
  {
    date: 'Yesterday',
    events: [
      { time: '9:15 PM', type: 'session-end', title: 'Charging session complete', details: 'Tesla Model 3 • Charged to 87% • Saved £1.80' },
      { time: '3:30 PM', type: 'schedule-change', title: 'Plan optimized', details: 'Better off-peak rates available' },
      { time: '10:15 AM', type: 'plug-in', title: 'EV plugged in', details: 'Tesla Model 3 • Battery: 62%' },
    ]
  }
];

// Usage Data
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
  'Based on current conditions, I would recommend charging now while solar is strong.',
  'You could save £0.50 more today by shifting usage 2–3 PM instead.',
  'V2G window opens at 5 PM. Your battery will be ready by then!',
];

// Energy Graph Data - 24 hour overview
export const energyGraphData = [
  { hour: 0, source: 'grid', cost: 0.15, rate: 12, power: 1.2 },
  { hour: 1, source: 'grid', cost: 0.18, rate: 12, power: 1.5 },
  { hour: 2, source: 'grid', cost: 0.14, rate: 12, power: 1.1 },
  { hour: 3, source: 'grid', cost: 0.16, rate: 12, power: 1.3 },
  { hour: 4, source: 'grid', cost: 0.19, rate: 12, power: 1.6 },
  { hour: 5, source: 'grid', cost: 0.17, rate: 12, power: 1.4 },
  { hour: 6, source: 'grid', cost: 0.22, rate: 18, power: 1.2 },
  { hour: 7, source: 'grid', cost: 0.28, rate: 18, power: 1.5 },
  { hour: 8, source: 'solar', cost: 0, rate: 0, power: 2.1 },
  { hour: 9, source: 'solar', cost: 0, rate: 0, power: 3.8 },
  { hour: 10, source: 'solar', cost: 0, rate: 0, power: 5.2 },
  { hour: 11, source: 'solar', cost: 0, rate: 0, power: 6.4 },
  { hour: 12, source: 'solar', cost: 0, rate: 0, power: 7.2 },
  { hour: 13, source: 'solar', cost: 0, rate: 0, power: 6.8 },
  { hour: 14, source: 'solar', cost: 0, rate: 0, power: 5.6 },
  { hour: 15, source: 'solar', cost: 0, rate: 0, power: 4.2 },
  { hour: 16, source: 'solar', cost: 0, rate: 0, power: 2.5 },
  { hour: 17, source: 'v2g', cost: -0.52, rate: 45, power: -1.2 },
  { hour: 18, source: 'v2g', cost: -0.68, rate: 45, power: -1.5 },
  { hour: 19, source: 'v2g', cost: -0.56, rate: 45, power: -1.2 },
  { hour: 20, source: 'v2g', cost: -0.48, rate: 45, power: -1.1 },
  { hour: 21, source: 'grid', cost: 0.35, rate: 28, power: 1.2 },
  { hour: 22, source: 'grid', cost: 0.18, rate: 12, power: 1.5 },
  { hour: 23, source: 'grid', cost: 0.16, rate: 12, power: 1.3 },
];

