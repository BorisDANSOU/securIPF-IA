import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Toast from '../components/Toast'
import { useStocks } from '../data/StockContext'

export default function StockUpdate() {
  const navigate = useNavigate()
  const { produits, enregistrerStock } = useStocks()
  const [produitId, setProduitId] = useState(produits[0]?.id ?? '')
  const produit = produits.find((item) => item.id === produitId)
  const [quantite, setQuantite] = useState(String(produit?.quantite ?? ''))
  const [consommation, setConsommation] = useState(
    String(produit ? (produit.quantite / produit.couvertureJours).toFixed(1) : ''),
  )
  const [delai, setDelai] = useState(String(produit?.delaiFournisseur ?? ''))
  const [erreur, setErreur] = useState('')
  const [toast, setToast] = useState({ message: '', visible: false })

  const couverture = Number(quantite) / Number(consommation)
  const marge = couverture - Number(delai)

  const soumettre = (event) => {
    event.preventDefault()
    setErreur('')

    try {
      enregistrerStock(produitId, Number(quantite), Number(consommation), Number(delai))
      setToast({ message: 'Stock enregistré et sauvegardé sur cet appareil.', visible: true })
    } catch (error) {
      console.error("Impossible d'enregistrer la mise à jour du stock.", error)
      setErreur("La mise à jour n'a pas pu être sauvegardée. Vérifiez l'espace de stockage de votre appareil.")
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-space-md px-margin py-space-md md:px-space-lg">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex w-fit items-center gap-1 text-label-md text-primary"
      >
        <Icon name="arrow_back" className="text-[18px]" />
        Retour
      </button>

      <header>
        <h1 className="text-headline-lg-mobile text-on-surface">Mise à jour des stocks</h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Actualisez les niveaux réels pour recalculer les risques de rupture.
        </p>
      </header>

      <section className="rounded-xl bg-primary-container p-space-md text-on-primary shadow-sm" aria-live="polite">
        <div className="flex items-center gap-2">
          <Icon name="analytics" className="text-[22px]" />
          <div>
            <p className="text-label-lg">Estimation automatique en direct</p>
            <p className="text-body-sm text-on-primary/80">
              {Number.isFinite(couverture) && couverture > 0
                ? `${couverture.toFixed(1)} jours de couverture · marge fournisseur ${marge >= 0 ? '+' : ''}${marge.toFixed(1)} jour(s)`
                : 'Saisissez une quantité et une consommation valides.'}
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={soumettre} className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <label className="flex flex-col gap-1.5 text-label-md text-on-surface">
          Médicament ou produit de santé
          <select
            value={produitId}
            onChange={(event) => {
              const selectionne = produits.find((item) => item.id === event.target.value)
              setProduitId(event.target.value)
              setQuantite(String(selectionne?.quantite ?? ''))
              setConsommation(
                String(selectionne ? (selectionne.quantite / selectionne.couvertureJours).toFixed(1) : ''),
              )
              setDelai(String(selectionne?.delaiFournisseur ?? ''))
            }}
            className="h-12 rounded-lg border border-outline-variant bg-surface px-3 text-body-md"
          >
            {produits.map((item) => (
              <option key={item.id} value={item.id}>{item.nom} — {item.detail}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-label-md text-on-surface">
          Quantité physique en stock ({produit?.unite ?? 'unités'})
          <input
            required
            type="number"
            min="0"
            step="1"
            value={quantite}
            onChange={(event) => setQuantite(event.target.value)}
            className="h-12 rounded-lg border border-outline-variant bg-surface px-3 text-body-md"
          />
          <span className="text-body-sm font-normal text-on-surface-variant">
            Comptez les unités disponibles en réserve et en officine.
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-label-md text-on-surface">
          Consommation moyenne par jour
          <input
            required
            type="number"
            min="0.1"
            step="0.1"
            value={consommation}
            onChange={(event) => setConsommation(event.target.value)}
            className="h-12 rounded-lg border border-outline-variant bg-surface px-3 text-body-md"
          />
          <span className="text-body-sm font-normal text-on-surface-variant">
            Estimation modifiable selon la consommation récente.
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-label-md text-on-surface">
          Délai habituel du fournisseur (jours ouvrés)
          <input
            required
            type="number"
            min="0"
            step="1"
            value={delai}
            onChange={(event) => setDelai(event.target.value)}
            className="h-12 rounded-lg border border-outline-variant bg-surface px-3 text-body-md"
          />
        </label>

        <label className="flex items-start gap-2 rounded-lg bg-surface-container-low p-3 text-body-sm text-on-surface-variant">
          <input type="checkbox" defaultChecked className="mt-0.5 accent-primary" />
          <span>
            Mettre à jour la disponibilité publique. Seul le statut du produit est partagé, sans donnée patient.
          </span>
        </label>

        {erreur && <p role="alert" className="text-body-sm font-semibold text-error">{erreur}</p>}

        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="submit" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary-container px-4 text-label-lg text-on-primary hover:bg-primary">
            <Icon name="save" className="text-[20px]" />
            Enregistrer le stock
          </button>
          <button
            type="button"
            onClick={() => navigate('/centre')}
            className="h-12 rounded-lg bg-surface-container px-5 text-label-lg text-on-surface"
          >
            Annuler
          </button>
        </div>
      </form>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast((current) => ({ ...current, visible: false }))}
      />
    </div>
  )
}
