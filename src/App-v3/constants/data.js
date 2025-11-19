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
    { name: 'V2G Master', icon: '⚡', earned: true, date: 'Nov 2024' },
    { name: 'Week Warrior', icon: '🔥', earned: false, date: 'Lock in 7 days' },
  ],
  transactions: [
    { date: 'Nov 10', type: 'v2g', amount: 2.50, description: 'Peak Response - Evening window', status: 'pending' },
    { date: 'Nov 9', type: 'v2g', amount: 1.80, description: 'Peak Response - Evening window', status: 'paid' },
    { date: 'Nov 8', type: 'v2g', amount: 3.20, description: 'Peak Response - Evening window', status: 'paid' },
    { date: 'Nov 7', type: 'bonus', amount: 5.00, description: 'Week Streak Bonus', status: 'paid' },
    { date: 'Nov 6', type: 'v2g', amount: 1.95, description: 'Peak Response - Evening window', status: 'paid' },
    { date: 'Nov 5', type: 'v2g', amount: 2.80, description: 'Peak Response - Evening window', status: 'paid' },
  ],
};

// Today's Schedule
export const todaySchedule = [
  { timeSlot: 'Right now', action: 'Paused', rate: 'Peak', cost: '£0.00', reason: 'Waiting for off-peak', power: 0 },
  { timeSlot: '11:00 PM - 6:00 AM', action: 'Charging at off-peak rate', rate: 'Off-peak', cost: '£1.20', reason: 'Cheapest window', power: 11.2 },
  { timeSlot: '6:00 - 7:30 AM', action: 'Final top-up', rate: 'Off-peak', cost: '£0.30', reason: 'Ready for morning', power: 2.4 },
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

