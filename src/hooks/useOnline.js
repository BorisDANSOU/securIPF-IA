import { useEffect, useState } from 'react'

// Retourne true si le navigateur est connecté à Internet, et se met à jour
// tout seul quand la connexion revient ou disparaît (utile pour une PWA).
export default function useOnline() {
  const [enLigne, setEnLigne] = useState(navigator.onLine)

  useEffect(() => {
    const surConnexion = () => setEnLigne(true)
    const surDeconnexion = () => setEnLigne(false)
    window.addEventListener('online', surConnexion)
    window.addEventListener('offline', surDeconnexion)
    // Nettoyage quand le composant disparaît
    return () => {
      window.removeEventListener('online', surConnexion)
      window.removeEventListener('offline', surDeconnexion)
    }
  }, [])

  return enLigne
}