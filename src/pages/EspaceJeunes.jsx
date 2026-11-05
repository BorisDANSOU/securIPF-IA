import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const CATEGORIES = [
  'Tous les produits',
  'Kits prévention',
  "Pilule d'urgence",
  'Dépistage',
  'Paracétamol',
]

const CENTRES = [
  {
    nom: 'Espace Santé Jeunes & Planning - Jean Jaurès',
    adresse: '12 rue de la République · Métro B',
    distance: '650 m',
    horaires: "Ouvert aujourd'hui jusqu'à 19h00 · Accès libre",
    maj: 'Mis à jour à 11h20',
    produits: ['Kits prévention', "Pilule d'urgence", 'Dépistage'],
    statut: 'Disponible',
    icone: 'medical_services',
  },
  {
    nom: 'Centre de Santé Polyvalent Saint-Michel',
    adresse: '45 avenue Pasteur · Tram T1',
    distance: '1,4 km',
    horaires: "Ouvert aujourd'hui de 8h30 à 18h00",
    maj: 'Mis à jour il y a 35 min',
    produits: ['Kits prévention', 'Paracétamol'],
    statut: 'Disponible',
    icone: 'local_hospital',
  },
  {
    nom: 'Maison Médicale Universitaire des Quais',
    adresse: '8 quai Claude Bernard',
    distance: '2,1 km',
    horaires: 'Prochain arrivage prévu vendredi',
    maj: 'Mis à jour il y a 2 h',
    produits: ["Pilule d'urgence", 'Dépistage'],
    statut: 'Disponibilité limitée',
    icone: 'healing',
  },
  {
    nom: 'Dispensaire Quartier Nord',
    adresse: '104 boulevard des États-Unis',
    distance: '3,8 km',
    horaires: 'Centre relais conseillé pour ce produit',
    maj: 'Mis à jour ce matin',
    produits: ['Paracétamol'],
    statut: 'Indisponible temporairement',
    icone: 'local_pharmacy',
  },
]

const COULEURS_STATUT = {
  Disponible: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  'Disponibilité limitée': 'bg-secondary-fixed text-on-secondary-fixed',
  'Indisponible temporairement': 'bg-error-container text-on-error-container',
}

export default function EspaceJeunes() {
  const [recherche, setRecherche] = useState('')
  const [categorie, setCategorie] = useState(CATEGORIES[0])
  const [statut, setStatut] = useState('Tous statuts')
  const centres = useMemo(() => CENTRES.filter((centre) => {
    const texte = `${centre.nom} ${centre.adresse} ${centre.produits.join(' ')}`.toLocaleLowerCase('fr')
    return (!recherche || texte.includes(recherche.toLocaleLowerCase('fr')))
      && (categorie === CATEGORIES[0] || centre.produits.includes(categorie))
      && (statut === 'Tous statuts' || centre.statut === statut)
  }), [recherche, categorie, statut])

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-space-md px-margin pb-space-xl pt-safe md:px-space-lg">
      <header className="flex items-center justify-between gap-3 pt-space-md">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-fixed text-tertiary">
            <Icon name="favorite" filled className="text-[21px]" />
          </div>
          <div>
            <h1 className="text-headline-sm text-primary">Portail Disponibilité Publique</h1>
            <p className="text-label-sm text-tertiary">Santé inclusive & gratuite</p>
          </div>
        </div>
        <Link to="/" aria-label="Retour à l'accueil" className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-on-surface">
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
      </header>

      <section className="rounded-xl bg-primary-container p-space-md text-on-primary">
        <h2 className="text-headline-lg-mobile">Trouver un centre disponible</h2>
        <p className="mt-1 text-body-md text-on-primary/85">
          Consulte les disponibilités près de chez toi. Service libre d’accès et 100 % anonyme.
        </p>
      </section>

      <section className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <label htmlFor="recherche-centres" className="mb-1.5 block text-label-md text-on-surface">
          Rechercher un centre ou un produit
        </label>
        <div className="flex h-12 items-center gap-2 rounded-lg border border-outline-variant bg-surface px-3">
          <Icon name="search" className="text-[20px] text-on-surface-variant" />
          <input
            id="recherche-centres"
            type="search"
            value={recherche}
            onChange={(event) => setRecherche(event.target.value)}
            placeholder="Ex. centre, dépistage…"
            className="min-w-0 flex-1 bg-transparent text-body-md outline-none"
          />
          {recherche && (
            <button type="button" onClick={() => setRecherche('')} aria-label="Effacer la recherche">
              <Icon name="close" className="text-[18px] text-on-surface-variant" />
            </button>
          )}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={categorie === item}
              onClick={() => setCategorie(item)}
              className={`shrink-0 rounded-full px-3 py-2 text-label-sm ${categorie === item ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <label htmlFor="filtre-statut" className="sr-only">Filtrer par disponibilité</label>
        <select
          id="filtre-statut"
          value={statut}
          onChange={(event) => setStatut(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border border-outline-variant bg-surface px-3 text-body-sm text-on-surface"
        >
          <option>Tous statuts</option>
          {Object.keys(COULEURS_STATUT).map((item) => <option key={item}>{item}</option>)}
        </select>
      </section>

      <aside className="flex items-start gap-2 rounded-xl bg-tertiary-fixed/40 p-space-md text-on-tertiary-fixed-variant">
        <Icon name="shield" className="mt-0.5 text-[19px]" />
        <p className="text-body-sm">
          <strong>Respect total de ta vie privée.</strong> Aucune inscription, géolocalisation enregistrée ou donnée personnelle stockée.
        </p>
      </aside>

      <section aria-live="polite" className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm text-on-surface">Centres à proximité</h2>
          <span className="text-label-sm text-on-surface-variant">{centres.length} résultat(s)</span>
        </div>
        {centres.length === 0 && (
          <p className="rounded-xl bg-surface-container-low p-space-md text-body-md text-on-surface-variant">
            Aucun centre ne correspond à ces filtres. Essaie une autre recherche.
          </p>
        )}
        {centres.map((centre) => (
          <article key={centre.nom} className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                <Icon name={centre.icone} className="text-[21px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-headline-sm text-on-surface">{centre.nom}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-label-sm ${COULEURS_STATUT[centre.statut]}`}>
                    {centre.statut}
                  </span>
                </div>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  <Icon name="location_on" className="mr-1 align-middle text-[15px]" />
                  {centre.adresse} · {centre.distance}
                </p>
                <p className="mt-2 text-label-sm text-on-surface">{centre.produits.join(' · ')}</p>
                <p className="mt-1 text-body-sm text-on-surface-variant">{centre.horaires}</p>
                <p className="mt-1 text-label-sm text-outline">{centre.maj}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${centre.nom} ${centre.adresse}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-surface-container text-label-md text-primary"
                >
                  <Icon name="directions" className="text-[18px]" />
                  Itinéraire
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl bg-error-container p-space-md text-on-error-container">
        <h2 className="text-headline-sm">Aide & urgences médicales</h2>
        <p className="mt-1 text-body-sm">
          En cas d’urgence vitale, contacte le <strong>15 (SAMU)</strong> ou le <strong>112</strong>.
        </p>
      </section>

      <footer className="pb-space-lg text-center text-label-sm text-on-surface-variant">
        Navigation confidentielle · Disponibilités de démonstration
      </footer>
    </main>
  )
}
