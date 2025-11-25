import React, { useState } from 'react';
import { energyGraphData } from '../constants/data';

export default function EnergyGraph() {
  const [hoveredBar, setHoveredBar] = useState(null);

  // Find max power value for scaling (use power instead of cost so solar shows up)
  const maxPower = Math.max(...energyGraphData.map(d => Math.abs(d.power)));
  const maxHeight = 100; // Maximum bar height in pixels

  const getBarHeight = (power) => {
    if (power === 0) return 0;
    return (Math.abs(power) / maxPower) * maxHeight;
  };

  const getBarColor = (source) => {
    switch (source) {
      case 'solar':
        return 'bg-yellow-400';
      case 'v2g':
        return 'bg-purple-400';
      case 'grid':
        return 'bg-brand-primary';
      default:
        return 'bg-brand-secondary';
    }
  };

  const formatTime = (hour) => {
    if (hour === 0) return '12AM';
    if (hour === 12) return '12PM';
    if (hour < 12) return `${hour}AM`;
    return `${hour - 12}PM`;
  };

  const getSourceLabel = (source) => {
    switch (source) {
      case 'solar':
        return 'Solar';
      case 'v2g':
        return 'V2G Export';
      case 'grid':
        return 'Grid';
      default:
        return source;
    }
  };

  return (
    <div className="bg-surface-card rounded-2xl p-5 shadow-lg border border-border-light">
      <h2 className="text-lg font-bold text-text-primary mb-4">Energy Overview - Today</h2>
      
      {/* Graph Container */}
      <div className="relative pt-4 pb-8">
        {/* Bar chart with center zero line */}
        <div className="flex items-center justify-between gap-0.5 relative" style={{ height: '220px' }}>
          {/* Zero line in the middle */}
          <div className="absolute left-0 right-0 border-t-2 border-border" style={{ top: '50%' }}></div>
          
          {energyGraphData.map((data, idx) => {
            const height = getBarHeight(data.power);
            const isNegative = data.power < 0;
            const isHovered = hoveredBar === idx;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center relative"
                style={{ height: '100%' }}
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Container split in half */}
                <div className="flex-1 flex flex-col justify-end items-center w-full">
                  {/* Positive bars (grid/solar) go up from center */}
                  {!isNegative && height > 0 && (
                    <div
                      className={`w-full ${getBarColor(data.source)} rounded-t transition-all cursor-pointer ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-80'
                      }`}
                      style={{ height: `${height}px` }}
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-start items-center w-full">
                  {/* Negative bars (v2g) go down from center */}
                  {isNegative && height > 0 && (
                    <div
                      className={`w-full ${getBarColor(data.source)} rounded-b transition-all cursor-pointer ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-80'
                      }`}
                      style={{ height: `${height}px` }}
                    />
                  )}
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-20 pointer-events-none">
                    <div className="bg-brand-dark border border-border rounded-lg p-2 shadow-xl min-w-[120px]">
                      <p className="text-xs font-semibold text-text-primary mb-1">{formatTime(data.hour)}</p>
                      <p className="text-xs text-text-secondary mb-1">{getSourceLabel(data.source)}</p>
                      <p className="text-xs text-text-secondary mb-1">{Math.abs(data.power).toFixed(1)} kW</p>
                      {data.source === 'solar' ? (
                        <p className="text-xs font-semibold text-yellow-400">Free</p>
                      ) : data.source === 'v2g' ? (
                        <p className="text-xs font-semibold text-emerald-400">+£{Math.abs(data.cost).toFixed(2)}</p>
                      ) : (
                        <>
                          <p className="text-xs text-text-tertiary">{data.rate}p/kWh</p>
                          <p className="text-xs font-semibold text-brand-primary">£{data.cost.toFixed(2)}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* X-axis label (show every 3 hours) */}
                {data.hour % 3 === 0 && (
                  <div className="text-[9px] text-text-tertiary mt-2 absolute -bottom-8">
                    {formatTime(data.hour)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <span className="text-xs text-text-secondary">Solar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-brand-primary rounded"></div>
          <span className="text-xs text-text-secondary">Grid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-purple-400 rounded"></div>
          <span className="text-xs text-text-secondary">V2G Export</span>
        </div>
      </div>
    </div>
  );
}

