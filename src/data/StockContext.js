import { createContext, useContext } from 'react'

export const StockContext = createContext(null)

export function useStocks() {
  const contexte = useContext(StockContext)
  if (!contexte) throw new Error('useStocks doit être utilisé dans StockProvider.')
  return contexte
}
