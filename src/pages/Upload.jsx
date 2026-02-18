import React from 'react'

export default function Upload() {
  return (
    <div className="page-surface">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-title">Upload Studio</h1>
          <p className="section-subtitle">Share calm, focused stories with your audience.</p>
        </div>
        <button className="btn-primary" type="button">Start upload</button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-sm font-semibold text-slate-800">Prepare your video</p>
          <p className="mt-2 text-sm text-slate-600">Choose a title, thumbnail, and a short description to make it easy to discover.</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-sm font-semibold text-slate-800">Set the vibe</p>
          <p className="mt-2 text-sm text-slate-600">Pick a category and tags so your story lands in the right stream.</p>
        </div>
      </div>
    </div>
  )
}