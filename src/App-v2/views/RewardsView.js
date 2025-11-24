import React from 'react';
import { TrendingUp, Award } from 'lucide-react';
import { WEEK_DAYS, PLUG_IN_STREAK, rewardsData } from '../constants/data';

export default function RewardsView({ rewardFilter, setRewardFilter }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Rewards</h2>
        <p className="text-sm text-slate-400">Your earnings and achievements</p>
      </div>

      {/* Earnings Summary */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl p-5 shadow-lg border border-emerald-500/30">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-xs text-slate-300 mb-2">Total Earned</p>
              <p className="text-3xl font-bold text-white">£{rewardsData.totalEarned.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-300 mb-2">This Month</p>
              <p className="text-3xl font-bold text-emerald-400">+£{rewardsData.thisMonth.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3 flex gap-3">
            <TrendingUp className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-200 leading-relaxed">Enable V2G during peak hours (5-9pm) for best earnings. More frequent participation increases rewards.</p>
          </div>
        </div>
      </div>

      {/* Week Streak */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 shadow-lg border border-purple-500/30">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">This Week's Streak</h3>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-sm text-slate-300">{streakCount} out of 7 days active</p>
          </div>

          <div className="flex gap-2">
            {WEEK_DAYS.map((day, idx) => (
              <div key={idx} className={`flex-1 rounded-lg p-2 text-center ${PLUG_IN_STREAK[idx] ? 'bg-purple-600' : 'bg-slate-700'}`}>
                <p className="text-xs font-bold text-white">{day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-bold text-white mb-3">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {rewardsData.badges.map((badge, idx) => (
            <div key={idx} className={`rounded-xl p-4 ${badge.earned ? 'bg-slate-700 border border-slate-600' : 'bg-slate-800 border border-slate-700 opacity-50'}`}>
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-sm font-bold text-white mb-1">{badge.name}</p>
              <p className="text-xs text-slate-400">{badge.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Recent Activity</h3>
          <select 
            className="bg-slate-700 text-white text-xs rounded-lg px-3 py-1 border border-slate-600"
            value={rewardFilter} 
            onChange={(e) => setRewardFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="v2g">V2G Only</option>
            <option value="flex">Flex Only</option>
            <option value="bonus">Bonuses</option>
          </select>
        </div>

        <div className="space-y-2">
          {rewardsData.transactions
            .filter(tx => rewardFilter === 'all' || tx.type === rewardFilter)
            .map((tx, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">{tx.description}</p>
                  <p className="text-xs text-slate-400">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-emerald-400">+£{tx.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-orange-500/20 text-orange-300'}`}>
                    {tx.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

