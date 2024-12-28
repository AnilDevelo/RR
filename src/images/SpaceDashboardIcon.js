import React from 'react'

function SpaceDashboardIcon() {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="64"
    height="64"
>
    <rect width="64" height="64" fill="#f0f0f0" />
    <rect x="8" y="8" width="24" height="24" fill="#4A90E2" />
    <rect x="32" y="8" width="24" height="24" fill="#7ED321" />
    <rect x="8" y="32" width="24" height="24" fill="#E94E77" />
    <rect x="32" y="32" width="24" height="24" fill="#F5A623" />
    
    <circle cx="20" cy="20" r="8" fill="white" />
    <circle cx="44" cy="20" r="8" fill="white" />
    <circle cx="20" cy="44" r="8" fill="white" />
    <circle cx="44" cy="44" r="8" fill="white" />
    
    <line x1="20" y1="20" x2="20" y2="28" stroke="#4A90E2" stroke-width="2" />
    <line x1="44" y1="20" x2="44" y2="28" stroke="#7ED321" stroke-width="2" />
    <line x1="20" y1="44" x2="20" y2="52" stroke="#E94E77" stroke-width="2" />
    <line x1="44" y1="44" x2="44" y2="52" stroke="#F5A623" stroke-width="2" />
</svg>
  )
}

export default SpaceDashboardIcon
