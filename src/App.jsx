import { Routes, Route, Link } from 'react-router-dom'
import Accueil from './pages/Accueil'

// Écran provisoire pour les pages que l'on construira aux prochaines étapes
function EnConstruction({ titre }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-space-lg text-center">
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
    // Sur ordinateur, l'app reste une colonne "mobile" centrée (max 448px)
    <div className="mx-auto w-full max-w-md min-h-screen bg-surface shadow-md">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/centre" element={<EnConstruction titre="Espace centre de santé" />} />
        <Route path="/jeunes" element={<EnConstruction titre="Espace jeunes" />} />
      </Routes>
    </div>
  )
}