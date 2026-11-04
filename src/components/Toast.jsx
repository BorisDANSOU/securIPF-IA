import Icon from './Icon'

// Petit message qui glisse depuis le bas de l'écran (confirmation d'une action).
// - message : le texte à afficher
// - visible : true = affiché, false = caché
// - onClose : appelée quand on clique sur la croix
export default function Toast({ message, visible, onClose }) {
  return (
    <div
      role="status"
      className={`fixed z-50 bottom-20 left-4 right-4 lg:bottom-6 lg:left-auto lg:right-6 lg:w-96 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center justify-between transition-all duration-300 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon name="check_circle" className="text-tertiary-fixed text-[20px]" />
        <span className="text-body-sm font-semibold">{message}</span>
      </div>
      <button type="button" onClick={onClose} aria-label="Fermer" className="text-inverse-on-surface/70 hover:text-inverse-on-surface">
        <Icon name="close" className="text-[18px]" />
      </button>
    </div>
  )
}