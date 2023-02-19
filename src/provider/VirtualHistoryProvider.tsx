import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Location, Action } from 'history'
import VirtualHistoryContext from '../context/virtualHistoryContext'
import { HistoryLocation, VirtualHistoryTypes } from '../context/virtualHistoryContext/type'
import { getSessionHistories, getSessionPrevLocation, setSessionHistories, setSessionPrevLocation } from '../utils'

interface VirtualHistoryProviderProps {
  children: ReactNode
}

export function VirtualHistoryProvider({ children }: VirtualHistoryProviderProps) {
  const firstLocation = useLocation()

  const [histories, setHistories] = useState<HistoryLocation[]>(getSessionHistories() || [firstLocation])
  const [prevLocation, setPrevLocation] = useState<Location>(getSessionPrevLocation() || firstLocation)

  const history = useHistory()

  const historyListener = (location: Location<unknown>, action: Action) => {
    switch (action) {
      case 'PUSH':
        const prevLocationIndex = histories.findIndex((pl) => prevLocation.key === pl.key)
        const cloneHistories = [...histories]
        cloneHistories.splice(prevLocationIndex + 1)

        setHistories([...cloneHistories, location])
        setPrevLocation(location)
        break

      case 'POP':
        setPrevLocation(location)
        break

      case 'REPLACE':
        const prevIndex = histories.findIndex((pl) => prevLocation.key === pl.key)
        const newHistories = [...histories]
        newHistories[prevIndex] = location
        setHistories(newHistories)
        setPrevLocation(location)
        break

      default:
    }
  }

  useEffect(() => {
    const unListen = history.listen(historyListener)

    return () => {
      unListen()
    }
  }, [history, prevLocation])

  useEffect(() => {
    setSessionHistories(histories)
  }, [histories])

  useEffect(() => {
    setSessionPrevLocation(prevLocation)
  }, [prevLocation])

  const contextValue: VirtualHistoryTypes = useMemo(() => ({ histories }), [histories])

  return <VirtualHistoryContext.Provider value={contextValue}>{children}</VirtualHistoryContext.Provider>
}
