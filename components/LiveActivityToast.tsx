'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Users } from 'lucide-react';

const activities = [
  { type: 'apply',    name: 'Ahmed',     country: 'Qatar' },
  { type: 'apply',    name: 'Fatima',    country: 'UAE' },
  { type: 'approved', name: 'Pierre',    country: 'France' },
  { type: 'apply',    name: 'Mehmet',    country: 'Turkey' },
  { type: 'approved', name: 'Sofia',     country: 'Bulgaria' },
  { type: 'apply',    name: 'Yusuf',     country: 'Saudi Arabia' },
  { type: 'approved', name: 'Layla',     country: 'Kuwait' },
  { type: 'apply',    name: 'Marco',     country: 'Italy' },
  { type: 'approved', name: 'Hana',      country: 'Bahrain' },
  { type: 'apply',    name: 'Elif',      country: 'Turkey' },
  { type: 'approved', name: 'Khalid',    country: 'Oman' },
  { type: 'apply',    name: 'Céline',    country: 'France' },
  { type: 'approved', name: 'Rania',     country: 'Jordan' },
  { type: 'apply',    name: 'Tariq',     country: 'UAE' },
  { type: 'approved', name: 'Nadia',     country: 'Morocco' },
  { type: 'apply',    name: 'Luca',      country: 'Italy' },
  { type: 'approved', name: 'Sara',      country: 'Qatar' },
  { type: 'apply',    name: 'Karim',     country: 'Egypt' },
  { type: 'approved', name: 'Ingrid',    country: 'Sweden' },
  { type: 'apply',    name: 'Dimitri',   country: 'Bulgaria' },
  { type: 'approved', name: 'Aisha',     country: 'Saudi Arabia' },
  { type: 'apply',    name: 'Thomas',    country: 'France' },
  { type: 'approved', name: 'Zeynep',    country: 'Turkey' },
  { type: 'apply',    name: 'Omar',      country: 'Kuwait' },
];

function randomActive() {
  return Math.floor(Math.random() * 24) + 11;
}

let lastIndex = -1;
function randomActivityIndex() {
  let next;
  do { next = Math.floor(Math.random() * activities.length); }
  while (next === lastIndex);
  lastIndex = next;
  return next;
}

export function LiveActivityToast() {
  const [index, setIndex] = useState(() => randomActivityIndex());
  const [visible, setVisible] = useState(true);
  const [activeCount, setActiveCount] = useState(randomActive());
  const [showCount, setShowCount] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setShowCount((prev) => !prev);
        setIndex(randomActivityIndex());
        setActiveCount(randomActive());
        setVisible(true);
      }, 400);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[index];

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="flex items-center gap-3 bg-white border border-brand-royal shadow-lg rounded-xl px-4 py-3 max-w-xs">
        {showCount ? (
          <>
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-brand-accent" />
            </div>
            <div>
              <p className="text-brand-dark text-sm font-medium">
                <span className="text-brand-accent font-bold">{activeCount} people</span> currently applying
              </p>
              <p className="text-brand-muted text-xs">Right now on this site</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-brand-dark text-sm font-medium">
                <span className="font-semibold">{activity.name}</span> from {activity.country}
              </p>
              <p className="text-brand-muted text-xs">
                {activity.type === 'approved'
                  ? 'ETA approved successfully'
                  : 'just started their application'}
              </p>
            </div>
          </>
        )}

        {/* Live dot */}
        <span className="flex-shrink-0 relative flex h-2 w-2 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      </div>
    </div>
  );
}
