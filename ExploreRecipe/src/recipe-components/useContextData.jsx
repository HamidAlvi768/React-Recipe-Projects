import { useContext } from 'react'
import { context } from './context'

export const useContextData = () => {
  const contextData = useContext(context)
  return contextData
}
