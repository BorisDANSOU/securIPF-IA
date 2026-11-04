import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Icon from './Icon'
import useOnline from '../hooks/useOnline'
import { compterParStatut } from '../data/stocks'
import { APP_NAME } from '../lib/config'

// Les 4 destinations de l'espace professionnel
const ONGLETS = [
  { chemin: '/centre', libelle: 'Tableau', libelleLong: 'Tableau de bord', icone: 'dashboard', fin: true },
  { chemin: '/centre/stocks', libelle: 'Stocks', libelleLong: 'Stocks', icone: 'inventory_2' },
  { chemin: '/centre/alertes', libelle: 'Alertes', libelleLong: 'Alertes', icone: 'notifications_active', alertes: true },
  { chemin: '/centre/profil', libelle: 'Profil', libelleLong: 'Profil', icone: 'account_circle' },
]

// Cadre commun de l'espace professionnel :
//  - en-tête fixe en haut
//  - barre de navigation EN BAS sur téléphone / tablette (< 1024px)
//  - barre latérale À GAUCHE sur ordinateur (>= 1024px)
// <Outlet /> est l'endroit où s'affiche la page choisie (Dashboard, etc.).
export default function AppShell() {
  const enLigne = useOnline()
  const [synchro, setSynchro] = useState(false)
  const { alertes } = compterParStatut()

  // Simule une synchronisation : l'icône tourne 1 seconde
  const actualiser = () => {
    setSynchro(true)
    setTimeout(() => setSynchro(false), 1000)
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* ===== En-tête fixe ===== */}
      <header className="fixed top-0 inset-x-0 z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-margin lg:px-space-lg flex items-center justify-between gap-space-sm">
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

      {/* ===== Barre latérale (ordinateur uniquement) ===== */}
      <aside className="hidden lg:flex fixed top-16 bottom-0 left-0 w-64 flex-col gap-space-xs p-space-md bg-surface-container-lowest border-r border-outline-variant/40">
        {ONGLETS.map((o) => (
          <NavLink
            key={o.chemin}
            to={o.chemin}
            end={o.fin}
            className={({ isActive }) =>
              `flex items-center gap-3 h-12 px-4 rounded-lg text-label-lg transition-colors ${
                isActive ? 'bg-primary-fixed text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={o.icone} filled={isActive} className="text-[22px]" />
                <span>{o.libelleLong}</span>
                {o.alertes && alertes > 0 && (
                  <span className="ml-auto bg-error text-on-error text-label-sm px-2 py-0.5 rounded-full">{alertes}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </aside>

      {/* ===== Contenu de la page ===== */}
      {/* pt = hauteur de l'en-tête ; pb = place pour la barre du bas (mobile) ; pl = place pour la barre latérale (ordinateur) */}
      <main className="pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-24 lg:pb-space-lg lg:pl-64">
        <Outlet />
      </main>

      {/* ===== Barre de navigation du bas (téléphone / tablette) ===== */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-space-xs max-w-md mx-auto">
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