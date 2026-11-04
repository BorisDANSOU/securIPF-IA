import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { APP_NAME, APP_BASELINE, APP_VERSION } from '../lib/config'

export default function Accueil() {
  const navigate = useNavigate()

  // Petite vibration au toucher 
  // puis navigation vers l'espace choisi.
  const allerVers = (chemin) => {
    navigator.vibrate?.(25)
    navigate(chemin)
  }

  return (
    <main className="flex flex-col pt-safe pb-safe">
      {/* ===== En-tête : logo + statut hors-ligne ===== */}
      <div className="px-margin pt-space-md pb-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-space-sm">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center">
              <Icon name="health_and_safety" filled className="text-primary-container text-headline-lg-mobile" />
            </div>
            <div>
              <span className="text-headline-md text-primary tracking-tight block">{APP_NAME}</span>
              <span className="text-label-sm text-secondary block -mt-1">{APP_BASELINE}</span>
            </div>
          </div>

          {/* Pastille "Hors-ligne prêt" */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-tertiary-container/15 text-tertiary">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="text-label-sm font-semibold tracking-wide">Hors-ligne prêt</span>
          </div>
        </div>
      </div>

      {/* ===== Bloc principal : promesse + chiffres ===== */}
      <div className="px-margin pt-space-md pb-space-sm">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md shadow-sm">
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant mb-space-xs">
              <Icon name="shield_with_heart" filled className="text-body-sm" />
              <span className="text-label-sm">Engagement Santé Publique</span>
            </div>

            <h1 className="text-headline-xl-mobile text-on-surface tracking-tight mt-1 mb-space-xs">
              Anticiper les ruptures, <span className="text-primary">préserver les choix</span>
            </h1>

            <p className="text-body-md text-on-surface-variant leading-relaxed">
              La plateforme collaborative de santé publique pour surveiller les stocks de santé
              essentiels et orienter les jeunes vers les centres approvisionnés en temps réel.
            </p>

            {/* 3 indicateurs (chiffres de démonstration) */}
            <div className="grid grid-cols-3 gap-2 mt-space-md pt-space-sm">
              <div className="rounded-lg bg-surface-container-lowest p-2 shadow-sm text-center">
                <span className="text-headline-sm text-primary block">342</span>
                <span className="text-label-sm text-on-surface-variant block">Centres reliés</span>
              </div>
              <div className="rounded-lg bg-surface-container-lowest p-2 shadow-sm text-center">
                <span className="text-headline-sm text-tertiary block">98.4%</span>
                <span className="text-label-sm text-on-surface-variant block">Disponibilité</span>
              </div>
              <div className="rounded-lg bg-surface-container-lowest p-2 shadow-sm text-center">
                <span className="text-headline-sm text-secondary block">{'< 15 min'}</span>
                <span className="text-label-sm text-on-surface-variant block">Mise à jour</span>
              </div>
            </div>
          </div>

          {/* Illustration décorative en fond (croix + points) */}
          <div className="absolute -right-6 -bottom-6 w-44 h-44 opacity-20 pointer-events-none text-primary">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="currentColor" fillOpacity="0.15" r="80" />
              <path d="M90 40 h20 v120 h-20 z" fill="currentColor" />
              <path d="M40 90 h120 v20 h-120 z" fill="currentColor" />
              <circle cx="150" cy="50" fill="#006942" r="14" />
              <circle cx="50" cy="150" fill="#006398" r="10" />
              <path d="M125 125 L165 165 M125 165 L165 125" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
            </svg>
          </div>
        </div>
      </div>

      {/* ===== Choix du profil ===== */}
      <div className="px-margin pt-space-xs pb-space-sm flex flex-col space-y-space-md">
        <div className="flex items-center justify-between px-1">
          <span className="text-label-lg text-on-surface uppercase tracking-wider">Sélectionnez votre profil</span>
          <span className="text-label-sm text-on-surface-variant">Accès direct sans création de compte</span>
        </div>

        {/* Carte 1 : centre de santé */}
        <button
          type="button"
          onClick={() => allerVers('/centre')}
          className="group text-left w-full rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 active:scale-[0.98] active:shadow-none focus:outline-hidden"
        >
          <div className="flex items-start justify-between mb-space-sm">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
              <Icon name="local_hospital" filled className="text-headline-lg-mobile" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm">
              Professionnels de santé
            </span>
          </div>
          <h2 className="text-headline-md text-on-surface tracking-tight mb-1">Je suis un centre de santé</h2>
          <p className="text-body-md text-on-surface-variant mb-space-md">
            Piloter les stocks de médicaments, anticiper les tensions d'approvisionnement et recevoir des alertes intelligentes.
          </p>
          <div className="w-full h-12 rounded-lg bg-primary-container text-on-primary text-label-lg flex items-center justify-between px-space-md shadow-sm transition-colors group-hover:bg-primary">
            <span>Accéder à l'espace professionnel</span>
            <Icon name="arrow_forward" className="text-headline-sm transition-transform group-active:translate-x-1" />
          </div>
        </button>

        {/* Carte 2 : jeune */}
        <button
          type="button"
          onClick={() => allerVers('/jeunes')}
          className="group text-left w-full rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 active:scale-[0.98] active:shadow-none focus:outline-hidden"
        >
          <div className="flex items-start justify-between mb-space-sm">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shadow-sm">
              <Icon name="explore" filled className="text-headline-lg-mobile" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed-variant text-label-sm flex items-center space-x-1">
              <Icon name="lock" filled className="text-label-sm" />
              <span>100% Anonyme</span>
            </span>
          </div>
          <h2 className="text-headline-md text-on-surface tracking-tight mb-1">Je suis un jeune</h2>
          <p className="text-body-md text-on-surface-variant mb-space-md">
            Trouver un centre ouvert à proximité avec les produits de santé et prévention disponibles immédiatement.
          </p>
          <div className="w-full h-12 rounded-lg bg-tertiary-container text-on-tertiary text-label-lg flex items-center justify-between px-space-md shadow-sm transition-colors group-hover:bg-tertiary">
            <span>Consulter les disponibilités</span>
            <Icon name="explore" className="text-headline-sm" />
          </div>
        </button>
      </div>

      {/* ===== Bandeau confidentialité ===== */}
      <div className="px-margin pt-space-xs pb-space-md">
        <div className="rounded-xl bg-surface-container p-space-md flex items-start space-x-space-sm shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="verified_user" filled className="text-body-lg" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-label-lg text-on-surface mb-0.5">Sécurité & Confidentialité Garantie</h3>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Aucune donnée patient ou information personnelle n'est collectée ou stockée. Conforme santé publique et principes d'accès aux soins universels.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Pied de page : état de synchro + version ===== */}
      <div className="px-margin pb-space-lg pt-space-xs flex items-center justify-between text-on-surface-variant text-body-sm">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-tertiary" />
          <span className="text-label-sm">Synchro active • il y a 2 min</span>
        </div>
        <div className="text-label-sm text-outline">
          {APP_NAME} PWA {APP_VERSION}
        </div>
      </div>
    </main>
  )
}