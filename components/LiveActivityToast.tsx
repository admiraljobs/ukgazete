'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Users } from 'lucide-react';

const activities = [
  { type: 'apply',    name: 'Ahmed',    country: 'Qatar' },
  { type: 'apply',    name: 'Fatima',   country: 'UAE' },
  { type: 'approved', name: 'Pierre',   country: 'France' },
  { type: 'apply',    name: 'Mehmet',   country: 'Turkey' },
  { type: 'approved', name: 'Sofia',    country: 'Bulgaria' },
  { type: 'apply',    name: 'Yusuf',    country: 'Saudi Arabia' },
  { type: 'approved', name: 'Layla',    country: 'Kuwait' },
  { type: 'apply',    name: 'Marco',    country: 'Italy' },
  { type: 'approved', name: 'Hana',     country: 'Bahrain' },
  { type: 'apply',    name: 'Elif',     country: 'Turkey' },
  { type: 'approved', name: 'Khalid',   country: 'Oman' },
  { type: 'apply',    name: 'Céline',   country: 'France' },
];

// Random number of active users between 12-31
function randomActive() {
  return Math.floor(Math.random() * 20) + 12;
}

export function LiveActivityToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeCount, setActiveCount] = useState(randomActive());
  const [showCount, setShowCount] = useState(false);

  useEffect(() => {
    // Alternate between activity message and active user count
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);

      setTimeout(() => {
        setShowCount((prev) => !prev);
        setIndex((i) => (i + 1) % activities.length);
        setActiveCount(randomActive());
        // Fade in
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
