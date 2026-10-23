import React from 'react'
import { STATS_HIGHLIGHTS } from '../data/landingData'

export default function StatsCounterBar() {
  return (
    <section className="stats-highlight-bar">
      <div className="section-container">
        <div className="stats-bar-grid">
          {STATS_HIGHLIGHTS.map((stat, i) => (
            <div key={i} className="stat-highlight-item">
              <div className="stat-highlight-val">{stat.value}</div>
              <div className="stat-highlight-lbl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
