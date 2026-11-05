import { useState } from 'react'
import { StockContext } from '../data/StockContext'
import { PRODUITS } from '../data/stocks'

const STORAGE_KEY = 'securipf-stocks'

function chargerProduits() {
  try {
    const stocke = localStorage.getItem(STORAGE_KEY)
    if (!stocke) return PRODUITS

    const produits = JSON.parse(stocke)
    if (!Array.isArray(produits) || produits.some((produit) => (
      typeof produit.id !== 'string' || !Number.isFinite(produit.quantite) ||
      !Number.isFinite(produit.couvertureJours) || !Number.isFinite(produit.jauge)
    ))) {
      throw new Error('Les données de stock enregistrées sont invalides.')
    }

    return produits
  } catch (error) {
    console.error('Impossible de charger les stocks enregistrés.', error)
    return PRODUITS
  }
}

export default function StockProvider({ children }) {
  const [produits, setProduits] = useState(chargerProduits)

  const enregistrerStock = (id, quantite, consommation, delaiFournisseur) => {
    const couvertureJours = quantite / consommation
    const statut = couvertureJours < delaiFournisseur
      ? 'critique'
      : couvertureJours <= delaiFournisseur + 3
        ? 'preventive'
        : 'normal'
    const prochain = produits.map((produit) => (
      produit.id === id
        ? {
            ...produit,
            quantite,
            couvertureJours: Math.round(couvertureJours * 10) / 10,
            delaiFournisseur,
            statut,
            jauge: Math.min(100, Math.round((couvertureJours / 30) * 100)),
          }
        : produit
    ))

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prochain))
    setProduits(prochain)
  }

  return (
    <StockContext.Provider value={{ produits, enregistrerStock }}>
      {children}
    </StockContext.Provider>
  )
}
