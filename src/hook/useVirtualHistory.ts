import { useHistory, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { LocationDescriptor } from 'history'
import VirtualHistoryContext from '../context/virtualHistoryContext'

export const useVirtualHistory = () => {
  const history = useHistory()
  const location = useLocation()
  const { histories } = useContext(VirtualHistoryContext)

  const currentLocationIndex = histories.findIndex((hs) => hs.key === location.key)

  const clearHistory = (toIndex = 0) => {
    const lengthToBegin = histories.slice(toIndex, currentLocationIndex + 1).length
    history.go(-lengthToBegin)
  }

  const moveTo = (key: string) => {
    const currentKey = location.key
    const currentIndex = histories.findIndex((hs) => hs.key === currentKey)
    const targetIndex = histories.findIndex((hs) => hs.key === key)

    if (targetIndex === -1) return

    history.go(targetIndex - currentIndex)
  }

  const restartWith = async (newLocation: LocationDescriptor, state?: any) => {
    clearHistory(1)
    setTimeout(() => history.replace(newLocation, state), 40)
  }

  return {
    histories,
    clearHistory,
    moveTo,
    restartWith,
  }
}
