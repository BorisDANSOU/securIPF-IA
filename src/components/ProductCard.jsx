import Icon from './Icon'

// Les classes sont écrites EN ENTIER ici : Tailwind ne détecte pas les noms
// construits dynamiquement (ex. `text-${couleur}`), il faut donc les lister.
const STYLES = {
  critique: {
    icone: 'text-error',
    badge: 'bg-error-container text-on-error-container',
    badgeLibelle: 'Alerte Critique',
    point: 'bg-error animate-ping',
    quantite: 'text-error',
    couverture: 'text-error',
    jaugeTexte: 'text-error',
    jaugeBarre: 'bg-error',
    action: 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-container hover:text-on-primary',
  },
  preventive: {
    icone: 'text-secondary',
    badge: 'bg-secondary-fixed text-on-secondary-fixed',
    badgeLibelle: 'Alerte Préventive',
    point: 'bg-secondary',
    quantite: 'text-on-surface',
    couverture: 'text-secondary',
    jaugeTexte: 'text-secondary',
    jaugeBarre: 'bg-secondary',
    action: 'bg-surface-container text-on-surface hover:bg-surface-container-high',
  },
  normal: {
    icone: 'text-tertiary',
    badge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    badgeLibelle: 'Situation Normale',
    point: 'bg-tertiary',
    quantite: 'text-on-surface',
    couverture: 'text-tertiary',
    jaugeTexte: 'text-tertiary',
    jaugeBarre: 'bg-tertiary',
    action: 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container',
  },
}

// Carte d'un produit : nom, statut, quantité, couverture, jauge et action.
// - produit  : un objet de PRODUITS (voir src/data/stocks.js)
// - onAction : appelée quand on clique sur le bouton d'action
export default function ProductCard({ produit, onAction }) {
  const s = STYLES[produit.statut]

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all hover:shadow-md">
      {/* En-tête : icône + nom à gauche, badge de statut à droite */}
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Icon name={produit.icone} className={`text-[17px] ${s.icone}`} />
            <h3 className="text-headline-sm text-on-surface truncate">{produit.nom}</h3>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-0.5">{produit.detail}</p>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-bold ${s.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.point}`} />
          {s.badgeLibelle}
        </span>
      </div>

      {/* Quantité restante et couverture */}
      <div className="mt-space-md grid grid-cols-2 gap-2 bg-surface-container-low rounded-lg p-2.5">
        <div>
          <span className="text-label-sm text-on-surface-variant block">Quantité restante</span>
          <span className={`text-headline-sm font-bold ${s.quantite}`}>
            {produit.quantite} {produit.unite}
          </span>
        </div>
        <div className="text-right">
          <span className="text-label-sm text-on-surface-variant block">Couverture</span>
          <span className={`text-headline-sm font-bold ${s.couverture}`}>{produit.couvertureJours} jours</span>
        </div>
      </div>

      {/* Jauge de niveau (la largeur de la barre = produit.jauge en %) */}
      <div className="mt-space-sm">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-label-sm font-semibold ${s.jaugeTexte}`}>{produit.jaugeLibelle}</span>
          <span className="text-label-sm text-on-surface-variant">{produit.jaugeNote}</span>
        </div>
        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${s.jaugeBarre}`} style={{ width: `${produit.jauge}%` }} />
        </div>
      </div>

      {/* Pied : information + bouton d'action */}
      <div className="mt-space-sm pt-2 flex items-center justify-between">
        <span className="text-body-sm text-on-surface-variant flex items-center gap-1">
          <Icon name={produit.pied.icone} className="text-[16px]" />
          {produit.pied.texte}
        </span>
        <button
          type="button"
          onClick={() => onAction(produit)}
          className={`h-8 px-3 rounded-lg text-label-md font-semibold transition-colors flex items-center gap-1 ${s.action}`}
        >
          <span>{produit.action.libelle}</span>
          {produit.action.icone && <Icon name={produit.action.icone} className="text-[14px]" />}
        </button>
      </div>
    </div>
  )
}