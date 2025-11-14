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

// Usage Data
export const usageData = {
  week: [
    { day: 'Mon', peakCost: 1.35, offPeakCost: 0.36, peakKwh: 3, offPeakKwh: 3, peakCarbon: 0.9, offPeakCarbon: 0.9 },
    { day: 'Tue', peakCost: 0.90, offPeakCost: 0.48, peakKwh: 2, offPeakKwh: 4, peakCarbon: 0.6, offPeakCarbon: 1.2 },
    { day: 'Wed', peakCost: 0.45, offPeakCost: 0.60, peakKwh: 1, offPeakKwh: 5, peakCarbon: 0.3, offPeakCarbon: 1.5 },
    { day: 'Thu', peakCost: 1.80, offPeakCost: 0.24, peakKwh: 4, offPeakKwh: 2, peakCarbon: 1.2, offPeakCarbon: 0.6 },
    { day: 'Fri', peakCost: 0.90, offPeakCost: 0.36, peakKwh: 2, offPeakKwh: 3, peakCarbon: 0.6, offPeakCarbon: 0.9 },
    { day: 'Sat', peakCost: 1.35, offPeakCost: 0.12, peakKwh: 3, offPeakKwh: 1, peakCarbon: 0.9, offPeakCarbon: 0.3 },
    { day: 'Sun', peakCost: 0.45, offPeakCost: 0.48, peakKwh: 1, offPeakKwh: 4, peakCarbon: 0.3, offPeakCarbon: 1.2 },
  ],
  month: [
    { day: 'Week 1', peakCost: 6.75, offPeakCost: 2.04, peakKwh: 15, offPeakKwh: 17, peakCarbon: 4.5, offPeakCarbon: 5.1 },
    { day: 'Week 2', peakCost: 5.85, offPeakCost: 2.40, peakKwh: 13, offPeakKwh: 20, peakCarbon: 3.9, offPeakCarbon: 6.0 },
    { day: 'Week 3', peakCost: 7.20, offPeakCost: 1.92, peakKwh: 16, offPeakKwh: 16, peakCarbon: 4.8, offPeakCarbon: 4.8 },
    { day: 'Week 4', peakCost: 5.40, offPeakCost: 2.64, peakKwh: 12, offPeakKwh: 22, peakCarbon: 3.6, offPeakCarbon: 6.6 },
  ],
};

// AI Responses
export const AI_RESPONSES = [
  'Off-peak rates start at 11 PM. You\'ll save £0.45 by waiting.',
  'Your cheapest window tomorrow is 12 AM - 6 AM. Consider charging then.',
  'If you enable V2G, you could earn £2-3 during tonight\'s peak window.',
];

