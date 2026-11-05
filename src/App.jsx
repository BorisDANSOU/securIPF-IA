import { Routes, Route, Link } from 'react-router-dom'
import Accueil from './pages/Accueil'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import StockUpdate from './pages/StockUpdate'
import AlerteDetail from './pages/AlerteDetail'
import EspaceJeunes from './pages/EspaceJeunes'
import StockProvider from './components/StockProvider'

// Écran provisoire pour les pages que l'on construira aux prochaines étapes
function EnConstruction({ titre }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-space-lg text-center">
      <h1 className="text-headline-lg-mobile text-on-surface">{titre}</h1>
      <p className="text-body-md text-on-surface-variant mt-space-sm">En construction…</p>
      <Link to="/" className="mt-space-md text-label-lg text-primary-container underline">
        Retour à l'accueil
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <StockProvider>
      <Routes>
        <Route path="/" element={<Accueil />} />

        {/* Espace professionnel : toutes ces pages partagent AppShell (en-tête + navigation) */}
        <Route path="/centre" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="stocks" element={<StockUpdate />} />
          <Route path="alertes" element={<AlerteDetail />} />
          <Route path="profil" element={<EnConstruction titre="Profil" />} />
        </Route>

        <Route path="/jeunes" element={<EspaceJeunes />} />
      </Routes>
    </StockProvider>
  )
}