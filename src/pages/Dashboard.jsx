import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { CENTRE, KPI, PRODUITS, compterParStatut } from '../data/stocks'

export default function Dashboard() {
  const navigate = useNavigate()
  const [filtre, setFiltre] = useState('tous') // 'tous' | 'alertes' | 'normaux'
  const [toast, setToast] = useState({ message: '', visible: false })

  const nb = compterParStatut()
  const critique = PRODUITS.find((p) => p.statut === 'critique') // produit en alerte prioritaire

  // Filtre la liste selon la pastille choisie
  const produitsAffiches = PRODUITS.filter((p) => {
    if (filtre === 'alertes') return p.statut !== 'normal'
    if (filtre === 'normaux') return p.statut === 'normal'
    return true
  })

  // Affiche un message temporaire en bas de l'écran
  const afficherToast = (message) => setToast({ message, visible: true })
  const fermerToast = () => setToast((t) => ({ ...t, visible: false }))

  // Cache le message automatiquement après 3,5 secondes
  useEffect(() => {
    if (!toast.visible) return
    const minuteur = setTimeout(fermerToast, 3500)
    return () => clearTimeout(minuteur)
  }, [toast])

  // Pastilles de filtre
  const filtres = [
    { cle: 'tous', libelle: 'Tous', nombre: nb.total, point: null },
    { cle: 'alertes', libelle: 'Alertes', nombre: nb.alertes, point: 'bg-error' },
    { cle: 'normaux', libelle: 'Normaux', nombre: nb.normal, point: 'bg-tertiary' },
  ]

  // Jauge en anneau du KPI "Couverture" : 30 jours = anneau complet
  const anneau = Math.min(100, Math.round((KPI.couvertureMoyenne / 30) * 100))

  return (
    <div className="w-full px-margin md:px-space-lg xl:px-space-xl pt-space-md pb-space-lg flex flex-col gap-space-md">      {/* ===== Bienvenue + alerte prioritaire (côte à côte dès la tablette) ===== */}
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        {/* Bienvenue */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-sm">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary-fixed/30 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start justify-between gap-space-sm relative z-10">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-headline-lg-mobile text-on-surface">Bonjour {CENTRE.responsable}</span>
                <span className="text-xl inline-block animate-bounce" style={{ animationDuration: '2.5s' }}>
                  👋
                </span>
              </div>
              <p className="text-label-md text-primary font-semibold mt-0.5 truncate">{CENTRE.nom}</p>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-sm">
              <Icon name="local_hospital" className="text-[22px]" />
            </div>
          </div>
          <div className="mt-space-sm flex items-center gap-1.5 text-on-surface-variant relative z-10">
            <Icon name="check_circle" className="text-[15px] text-tertiary" />
            <span className="text-body-sm">Mis à jour il y a 12 min (Automatique)</span>
          </div>
        </div>

        {/* Alerte prioritaire */}
        {critique && (
          <div
            className="relative overflow-hidden rounded-xl bg-error-container text-on-error-container p-space-md shadow-md animate-pulse"
            style={{ animationDuration: '4s' }}
          >
            <div className="flex items-start gap-space-sm">
              <div className="w-9 h-9 rounded-lg bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Icon name="warning" filled className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-label-sm uppercase tracking-wider text-error font-bold">Alerte Prioritaire</span>
                  <span className="text-label-sm text-on-error-container opacity-80">Action requise</span>
                </div>
                <p className="text-body-sm font-semibold text-on-error-container mt-1 leading-snug">
                  Rupture critique imminente sur <span className="underline">{critique.nom}</span> : délai fournisseur (
                  {critique.delaiFournisseur}j) {'>'} couverture restante ({critique.couvertureJours}j) !
                </p>
                <div className="mt-space-sm flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => afficherToast("Demande de réapprovisionnement d'urgence transmise au dépôt")}
                    className="h-9 px-space-md bg-error text-on-error rounded-lg text-label-md font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Traiter l'alerte</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFiltre('alertes')}
                    className="text-label-sm text-error font-bold flex items-center gap-0.5"
                  >
                    <span>Voir tout ({nb.alertes})</span>
                    <Icon name="chevron_right" className="text-[14px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== 3 indicateurs clés ===== */}
      <div className="grid grid-cols-3 gap-2 md:gap-space-md">
        {/* KPI 1 : stock global */}
        <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <Icon name="inventory_2" className="text-[18px]" />
            </div>
            <Icon name="trending_up" className="text-[16px] text-tertiary" />
          </div>
          <div className="mt-2">
            <div className="text-headline-lg-mobile text-on-surface font-bold tracking-tight">{KPI.stockGlobal}%</div>
            <div className="text-label-sm text-on-surface-variant line-clamp-1">Stock Global</div>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            <span className="text-label-sm text-tertiary">Optimale</span>
          </div>
        </div>

        {/* KPI 2 : couverture moyenne (avec mini anneau) */}
        <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
              <Icon name="timelapse" className="text-[18px]" />
            </div>
            <svg className="w-4 h-4 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-container-high"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="100, 100"
                strokeWidth="5"
              />
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${anneau}, 100`}
                strokeWidth="5"
              />
            </svg>
          </div>
          <div className="mt-2">
            <div className="text-headline-lg-mobile text-on-surface font-bold tracking-tight">
              {KPI.couvertureMoyenne}
              <span className="text-label-md text-on-surface-variant font-normal"> j</span>
            </div>
            <div className="text-label-sm text-on-surface-variant line-clamp-1">Couverture</div>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-label-sm text-secondary">Autonomie</span>
          </div>
        </div>

        {/* KPI 3 : alertes actives */}
        <div className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-error-container flex items-center justify-center text-error">
              <Icon name="notifications_active" className="text-[18px]" />
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error" />
            </span>
          </div>
          <div className="mt-2">
            <div className="text-headline-lg-mobile text-error font-bold tracking-tight">{nb.alertes}</div>
            <div className="text-label-sm text-on-surface-variant line-clamp-1">Alertes</div>
          </div>
          <div className="mt-1 flex items-center gap-1 text-label-sm">
            <span className="text-error font-bold">{nb.critique} Crit.</span>
            <span className="text-on-surface-variant">•</span>
            <span className="text-on-surface-variant">{nb.preventive} Prév.</span>
          </div>
        </div>
      </div>

      {/* ===== Bouton principal ===== */}
      <button
        type="button"
        onClick={() => navigate('/centre/stocks')}
        className="w-full md:w-auto md:self-start md:px-space-xl h-12 bg-primary-container text-on-primary rounded-xl text-label-lg font-bold shadow-md hover:bg-primary active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm"
      >
        <Icon name="qr_code_scanner" className="text-[22px]" />
        <span>+ Mettre à jour le stock</span>
      </button>

      {/* ===== État des stocks + filtres ===== */}
      <div className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-headline-md text-on-surface">État des stocks</h2>
            <p className="text-body-sm text-on-surface-variant">Surveillance des approvisionnements vitaux</p>
          </div>
          <span className="text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-semibold">
            {nb.total} produits suivis
          </span>
        </div>

        {/* Pastilles de filtre */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {filtres.map((f) => {
            const actif = filtre === f.cle
            return (
              <button
                key={f.cle}
                type="button"
                onClick={() => setFiltre(f.cle)}
                className={`px-3.5 py-1.5 rounded-full text-label-sm font-semibold transition-all flex items-center gap-1 ${
                  actif
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {f.point && <span className={`w-1.5 h-1.5 rounded-full ${f.point}`} />}
                <span>{f.libelle}</span>
                <span className={`text-[10px] px-1 rounded-full ${actif ? 'bg-white/20 opacity-80' : 'bg-surface-container-high'}`}>
                  {f.nombre}
                </span>
              </button>
            )
          })}
        </div>

        {/* Liste des produits (1 colonne sur mobile, 2 dès la tablette) */}
        <div className="grid grid-cols-1 gap-space-sm md:grid-cols-2 xl:grid-cols-3 md:gap-space-md mt-1">          {produitsAffiches.map((p) => (
            <ProductCard key={p.id} produit={p} onAction={(prod) => afficherToast(`${prod.action.libelle} : ${prod.nom}`)} />
          ))}
        </div>
    </div>

      {/* ===== Bandeau réseau d'entraide ===== */}
      <div className="rounded-xl bg-surface-container p-space-md flex items-center gap-space-sm mt-1">
        <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
          <Icon name="hub" className="text-[20px]" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-headline-sm text-on-surface truncate">Réseau d'entraide Sanitaire</h4>
          <p className="text-body-sm text-on-surface-variant">
            2 centres voisins possèdent un surplus de Paracétamol disponible pour transfert immédiat.
          </p>
        </div>
        <button
          type="button"
          aria-label="Voir les centres voisins"
          onClick={() => afficherToast('Centres relais : bientôt disponible')}
          className="shrink-0 w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <Icon name="chevron_right" className="text-[18px]" />
        </button>
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={fermerToast} />
    </div>
  )
}