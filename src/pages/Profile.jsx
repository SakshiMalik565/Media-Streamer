import React from 'react'

export default function Profile() {
  return (
    <div className="page-surface">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-title">Creator Profile</h1>
          <p className="section-subtitle">Keep your channel presence calm and consistent.</p>
        </div>
        <button className="btn-primary" type="button">Edit profile</button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="stat-card">
          <p className="text-xs uppercase text-slate-500">Followers</p>
          <p className="text-lg font-semibold text-slate-800">2.4k</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-slate-500">Uploads</p>
          <p className="text-lg font-semibold text-slate-800">128</p>
        </div>
        <div className="stat-card">
          <p className="text-xs uppercase text-slate-500">Watch time</p>
          <p className="text-lg font-semibold text-slate-800">4.8k hrs</p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-black/10 bg-white/80 p-4 text-sm text-slate-600">
        This space will show your latest uploads, playlists, and audience insights.
      </div>
    </div>
  )
}