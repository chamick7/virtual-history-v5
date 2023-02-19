import { Location } from 'history'
import { PREV_LOCATION_KEY, VIRTUAL_HISTORY_KEY } from '../constants'
import { HistoryLocation } from '../context/virtualHistoryContext/type'

export const getSessionHistories = (): HistoryLocation[] | undefined =>
  sessionStorage.getItem(VIRTUAL_HISTORY_KEY) ? JSON.parse(sessionStorage.getItem(VIRTUAL_HISTORY_KEY)!) : undefined

export const setSessionHistories = (histories: HistoryLocation[]) =>
  sessionStorage.setItem(VIRTUAL_HISTORY_KEY, JSON.stringify(histories))

export const getSessionPrevLocation = (): Location | undefined =>
  sessionStorage.getItem(PREV_LOCATION_KEY) ? JSON.parse(sessionStorage.getItem(PREV_LOCATION_KEY)!) : undefined

export const setSessionPrevLocation = (location: Location) =>
  sessionStorage.setItem(PREV_LOCATION_KEY, JSON.stringify(location))
