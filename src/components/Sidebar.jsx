import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Search', path: '/search' },
  { label: 'Upload', path: '/upload' },
  { label: 'Profile', path: '/profile' },
  { label: 'Watch History', path: '/watch-history' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="w-full md:w-64 md:sticky md:top-20 h-fit">
      <div className="glass-panel rounded-2xl p-5">
        <h1 className="brand-mark text-lg font-semibold text-slate-900">Media Streamer</h1>
        <p className="mt-1 text-xs text-slate-500">Curated streams, calm focus.</p>
        <nav className="mt-6 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                location.pathname === item.path
                  ? 'border border-teal-300/60 bg-teal-500/10 text-teal-900'
                  : 'border border-transparent text-slate-600 hover:border-black/5 hover:bg-white/80 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}