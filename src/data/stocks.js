// Données de démonstration du tableau de bord (un seul endroit à modifier).

export const CENTRE = {
  responsable: 'Dr. Diallo',
  nom: 'Centre de Santé Polyvalent Saint-Michel (Zone Nord)',
}

// Indicateurs globaux (démo)
export const KPI = {
  stockGlobal: 84, // en %
  couvertureMoyenne: 18, // en jours
}

// statut : 'critique' | 'preventive' | 'normal'
export const PRODUITS = [
  {
    id: 'paracetamol-pediatrique',
    nom: 'Paracétamol Pédiatrique',
    detail: '100mg/ml Solution buvable',
    icone: 'emergency',
    statut: 'critique',
    quantite: 14,
    unite: 'flacons',
    couvertureJours: 3,
    delaiFournisseur: 4,
    jaugeLibelle: 'Rupture imminente',
    jaugeNote: 'Seuil min: 50 flacons',
    jauge: 14,
    pied: { icone: 'local_shipping', texte: 'Fournisseur: 4j' },
    action: { libelle: 'Commander', icone: 'open_in_new' },
  },
  {
    id: 'amoxicilline-500',
    nom: 'Amoxicilline 500mg',
    detail: 'Gélules - Boîte de 12',
    icone: 'medication',
    statut: 'preventive',
    quantite: 85,
    unite: 'boîtes',
    couvertureJours: 7,
    delaiFournisseur: 5,
    jaugeLibelle: 'Réapprovisionnement requis',
    jaugeNote: 'Seuil min: 120 boîtes',
    jauge: 35,
    pied: { icone: 'warehouse', texte: 'Emplacement: Allée A2' },
    action: { libelle: 'Réappro' },
  },
  {
    id: 'preservatifs-kits',
    nom: 'Préservatifs & Kits Jeunes',
    detail: 'Prévention & SSR - Lot Standard',
    icone: 'health_and_safety',
    statut: 'normal',
    quantite: 320,
    unite: 'unités',
    couvertureJours: 28,
    delaiFournisseur: 7,
    jaugeLibelle: 'Stock sécurisé',
    jaugeNote: 'Conforme',
    jauge: 82,
    pied: { icone: 'schedule', texte: 'Rotatif 30j' },
    action: { libelle: 'Détails' },
  },
  {
    id: 'pilule-urgence',
    nom: "Pilule d'urgence Lévonorgestrel",
    detail: '1.5mg Comprimé unique',
    icone: 'female',
    statut: 'preventive',
    quantite: 18,
    unite: 'plaquettes',
    couvertureJours: 5,
    delaiFournisseur: 4,
    jaugeLibelle: 'Tension modérée',
    jaugeNote: 'Seuil min: 30 plq.',
    jauge: 25,
    pied: { icone: 'sync_alt', texte: 'Substituts: 2' },
    action: { libelle: 'Réappro' },
  },
  {
    id: 'sro',
    nom: 'Soluté Réhydratation (SRO)',
    detail: 'Sachets poudre pour 1L',
    icone: 'water_drop',
    statut: 'normal',
    quantite: 450,
    unite: 'sachets',
    couvertureJours: 42,
    delaiFournisseur: 7,
    jaugeLibelle: 'Stock excédentaire',
    jaugeNote: 'Conforme OMS',
    jauge: 95,
    pied: { icone: 'verified', texte: 'Lot: EXP 12/2026' },
    action: { libelle: 'Détails' },
  },
]

// Compte les produits par statut (sert aux pastilles, aux filtres et aux KPI)
export function compterParStatut(produits = PRODUITS) {
  const critique = produits.filter((p) => p.statut === 'critique').length
  const preventive = produits.filter((p) => p.statut === 'preventive').length
  const normal = produits.filter((p) => p.statut === 'normal').length
  return { critique, preventive, normal, alertes: critique + preventive, total: produits.length }
}