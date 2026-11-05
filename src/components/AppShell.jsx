import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Icon from './Icon'
import useOnline from '../hooks/useOnline'
import { compterParStatut } from '../data/stocks'
import { useStocks } from '../data/StockContext'
import { APP_NAME } from '../lib/config'

// Les 4 destinations de l'espace professionnel (barre de navigation du bas)
const ONGLETS = [
  { chemin: '/centre', libelle: 'Tableau', icone: 'dashboard', fin: true },
  { chemin: '/centre/stocks', libelle: 'Stocks', icone: 'inventory_2' },
  { chemin: '/centre/alertes', libelle: 'Alertes', icone: 'notifications_active', alertes: true },
  { chemin: '/centre/profil', libelle: 'Profil', icone: 'account_circle' },
]

// Cadre commun de l'espace professionnel, comme sur la maquette :
//  - en-tête fixe en haut (pleine largeur)
//  - barre de navigation fixe en bas (pleine largeur)
// <Outlet /> est l'endroit où s'affiche la page choisie (Dashboard, etc.).
export default function AppShell() {
  const enLigne = useOnline()
  const [synchro, setSynchro] = useState(false)
  const { produits } = useStocks()
  const { alertes } = compterParStatut(produits)

  // Simule une synchronisation : l'icône tourne 1 seconde
  const actualiser = () => {
    setSynchro(true)
    setTimeout(() => setSynchro(false), 1000)
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* ===== En-tête fixe ===== */}
      <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-margin md:px-space-lg xl:px-space-xl flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-9 h-9 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center shrink-0">
              <Icon name="health_and_safety" filled className="text-primary-container text-headline-md" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="text-headline-sm text-primary truncate">{APP_NAME}</span>
                <span className="hidden sm:inline-block text-label-sm text-outline-variant">•</span>
                <span className="hidden sm:inline-block text-label-sm text-on-surface-variant truncate">Espace professionnel</span>
              </div>
              {/* Statut de connexion (réel : réagit aux coupures Internet) */}
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${enLigne ? 'bg-tertiary-container' : 'bg-error'}`} />
                <span className={`text-label-sm truncate ${enLigne ? 'text-tertiary' : 'text-error'}`}>
                  {enLigne ? 'En ligne / PWA Synchronisée' : 'Hors ligne / Données locales'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-sm shrink-0">
            <button
              type="button"
              onClick={actualiser}
              aria-label="Actualiser la synchronisation"
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <Icon name="sync" className={`text-[20px] ${synchro ? 'animate-spin' : ''}`} />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="person" className="text-on-primary text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* ===== Contenu de la page ===== */}
      {/* pt = hauteur de l'en-tête (+ encoche du téléphone) ; pb = place pour la barre du bas */}
      <main className="pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-24">
        <Outlet />
      </main>

      {/* ===== Barre de navigation du bas ===== */}
      <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
        {/* max-w-xl : sur grand écran, les 4 onglets restent groupés au centre */}
        <div className="flex justify-around items-center h-16 px-space-xs max-w-xl mx-auto">
          {ONGLETS.map((o) => (
            <NavLink
              key={o.chemin}
              to={o.chemin}
              end={o.fin}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
                  isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={o.icone} filled={isActive} className="text-[22px]" />
                  {/* Petit point rouge s'il y a des alertes */}
                  {o.alertes && alertes > 0 && <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-error" />}
                  <span className="text-label-sm">{o.libelle}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}