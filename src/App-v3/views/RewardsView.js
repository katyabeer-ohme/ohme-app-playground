import React from 'react';
import WeekDayBox from '../components/WeekDayBox';
import { WEEK_DAYS, PLUG_IN_STREAK, rewardsData } from '../constants/data';

export default function RewardsView({ rewardFilter, setRewardFilter }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Rewards</h2>
        <p className="text-sm text-slate-400">Earn money by being flexible</p>
      </div>

      {/* Earnings Summary */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 shadow-lg border border-purple-500/30">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Total Earned</p>
              <p className="text-3xl font-bold text-white">£{rewardsData.totalEarned.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">This Month</p>
              <p className="text-3xl font-bold text-emerald-400">+£{rewardsData.thisMonth.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-slate-900/30 rounded-lg p-3">
            <p className="text-xs text-slate-300 mb-2">💡 Earning tip</p>
            <p className="text-xs text-slate-400">Enable V2G during peak hours (5-9pm) to earn £2-3 more per day</p>
          </div>
        </div>
      </div>

      {/* Week Streak */}
      <div className="px-4 mb-6">
        <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">This Week's Streak</h3>
              <p className="text-sm text-slate-400">{streakCount} out of 7 days plugged in</p>
            </div>
            <span className="text-3xl">🔥</span>
          </div>

          {/* Week Days Grid */}
          <div className="flex gap-2 mb-4">
            {WEEK_DAYS.map((day, idx) => (
              <WeekDayBox key={idx} day={day} active={PLUG_IN_STREAK[idx]} />
            ))}
          </div>

          <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-500/20">
            <p className="text-xs text-emerald-300 mb-1">Next reward unlocks at 7 days</p>
            <p className="text-lg font-bold text-emerald-400">+£5.00 bonus</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-white mb-3">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {rewardsData.badges.map((badge, idx) => (
            <div key={idx} className={`rounded-xl p-4 ${
              badge.earned 
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                : 'bg-slate-800 border border-slate-700'
            }`}>
              <div className="text-3xl mb-2 text-center">{badge.icon}</div>
              <p className={`text-sm font-semibold text-center mb-1 ${badge.earned ? 'text-white' : 'text-slate-500'}`}>
                {badge.name}
              </p>
              <p className={`text-xs text-center ${badge.earned ? 'text-cyan-400' : 'text-slate-600'}`}>
                {badge.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Recent Earnings</h3>
          <select 
            value={rewardFilter} 
            onChange={(e) => setRewardFilter(e.target.value)}
            className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer border border-slate-700"
          >
            <option value="all">All</option>
            <option value="v2g">V2G Only</option>
            <option value="flex">Flex Only</option>
            <option value="bonus">Bonuses Only</option>
          </select>
        </div>

        <div className="space-y-2">
          {rewardsData.transactions
            .filter(tx => rewardFilter === 'all' || tx.type === rewardFilter)
            .map((transaction, idx) => {
              const typeColors = {
                v2g: { bg: 'bg-purple-500/20', icon: '⚡' },
                flex: { bg: 'bg-cyan-500/20', icon: '💪' },
                bonus: { bg: 'bg-yellow-500/20', icon: '🎁' },
              };
              const colors = typeColors[transaction.type];
              return (
                <div key={idx} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                      <span className="text-lg">{colors.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{transaction.description}</p>
                      <p className="text-xs text-slate-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">+£{transaction.amount.toFixed(2)}</p>
                    <p className={`text-xs ${transaction.status === 'paid' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {transaction.status === 'paid' ? '✓ Paid' : '⏱ Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Payout Info */}
      <div className="px-4 mb-6">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-3">Payout Information</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Next payout</span>
              <span className="text-white font-medium">Dec 5, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Pending amount</span>
              <span className="text-yellow-400 font-medium">£2.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Payment method</span>
              <span className="text-white font-medium">Bank •••• 4521</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-sm transition">
            Update payment method
          </button>
        </div>
      </div>
    </div>
  );
}

