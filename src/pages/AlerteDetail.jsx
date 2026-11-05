import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Toast from '../components/Toast'
import { useStocks } from '../data/StockContext'

const CENTRES_RELAIS = [
  { nom: 'Dispensaire Croix-Verte', distance: '1,8 km', stock: '38 flacons', couverture: '24 jours' },
  { nom: 'CMS Pasteur', distance: '3,2 km', stock: '22 flacons', couverture: '16 jours' },
]

export default function AlerteDetail() {
  const { produits } = useStocks()
  const produit = produits.find((item) => item.statut === 'critique') ?? produits[0]
  const [traitee, setTraitee] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false })

  if (!produit) {
    return <p className="p-space-lg text-body-md text-on-surface-variant">Aucun produit à afficher.</p>
  }

  const couverture = Number(produit.couvertureJours)
  const enRupture = couverture < produit.delaiFournisseur
  const afficherToast = (message) => setToast({ message, visible: true })

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-space-md px-margin py-space-md md:px-space-lg">
      <header className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-error-container text-error">
          <Icon name="crisis_alert" className="text-[24px]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-label-sm uppercase tracking-wide text-error">Détail médicament</p>
          <h1 className="text-headline-md text-on-surface">{produit.nom}</h1>
        </div>
        <span className={`rounded-full px-3 py-1 text-label-sm ${enRupture ? 'bg-error-container text-on-error-container' : 'bg-secondary-fixed text-on-secondary-fixed'}`}>
          {enRupture ? 'Alerte critique' : 'À surveiller'}
        </span>
      </header>

      <section className="rounded-xl bg-error-container p-space-md text-on-error-container">
        <p className="text-headline-sm">{enRupture ? 'Rupture imminente' : 'Réapprovisionnement à anticiper'}</p>
        <p className="mt-1 text-body-md">
          Il reste {couverture.toLocaleString('fr-FR')} jours de couverture, contre {produit.delaiFournisseur} jours de délai fournisseur.
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70">
          <div
            className={`h-full rounded-full ${enRupture ? 'bg-error' : 'bg-secondary'}`}
            style={{ width: `${Math.min(100, (couverture / Math.max(produit.delaiFournisseur, 1)) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-label-sm">
          {produit.quantite} {produit.unite} disponibles · {enRupture ? 'le délai dépasse la couverture restante' : 'surveillez le prochain réassort'}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <Icon name="inventory_2" className="text-[20px] text-primary" />
          <p className="mt-2 text-label-sm text-on-surface-variant">Stock restant</p>
          <p className="text-headline-sm text-on-surface">{produit.quantite} {produit.unite}</p>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <Icon name="local_shipping" className="text-[20px] text-primary" />
          <p className="mt-2 text-label-sm text-on-surface-variant">Délai fournisseur</p>
          <p className="text-headline-sm text-on-surface">{produit.delaiFournisseur} jours</p>
        </div>
      </section>

      <section className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center gap-2">
          <Icon name="bolt" className="text-[20px] text-secondary" />
          <h2 className="text-headline-sm text-on-surface">Action recommandée</h2>
        </div>
        <p className="mt-2 text-body-md text-on-surface-variant">
          {enRupture
            ? 'Demandez un réapprovisionnement d’urgence et vérifiez les possibilités de transfert depuis un centre voisin.'
            : 'Planifiez un réapprovisionnement avant que la couverture ne passe sous le délai de livraison.'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => afficherToast('Demande de réapprovisionnement enregistrée localement.')}
            className="flex h-11 items-center gap-2 rounded-lg bg-primary-container px-4 text-label-md text-on-primary"
          >
            <Icon name="shopping_cart_checkout" className="text-[18px]" />
            Commander
          </button>
          <Link to="/centre/stocks" className="flex h-11 items-center gap-2 rounded-lg bg-surface-container px-4 text-label-md text-on-surface">
            <Icon name="edit" className="text-[18px]" />
            Mettre à jour le stock
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-headline-sm text-on-surface">Centres relais disponibles</h2>
          <span className="text-label-sm text-tertiary">{CENTRES_RELAIS.length} excédents</span>
        </div>
        <div className="flex flex-col gap-2">
          {CENTRES_RELAIS.map((centre) => (
            <article key={centre.nom} className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
              <Icon name="local_pharmacy" className="text-[22px] text-primary" />
              <div className="min-w-0 flex-1">
                <h3 className="text-label-lg text-on-surface">{centre.nom}</h3>
                <p className="text-body-sm text-on-surface-variant">
                  {centre.distance} · {centre.stock} · couverture {centre.couverture}
                </p>
              </div>
              <button
                type="button"
                onClick={() => afficherToast(`Demande de contact envoyée à ${centre.nom}.`)}
                className="rounded-lg bg-surface-container px-3 py-2 text-label-sm text-primary"
              >
                Solliciter
              </button>
            </article>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setTraitee((current) => !current)}
        className="flex h-12 items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-label-lg text-on-surface"
      >
        <Icon name={traitee ? 'undo' : 'task_alt'} className="text-[20px]" />
        {traitee ? 'Rouvrir le signalement' : 'Marquer comme traitée'}
      </button>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast((current) => ({ ...current, visible: false }))}
      />
    </div>
  )
}
