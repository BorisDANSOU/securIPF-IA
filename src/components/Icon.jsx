// Petit composant pour afficher une icône Material Symbols.

export default function Icon({ name, filled = false, className = '' }) {
  return (
    <span
      className={`msym ${className}`}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}