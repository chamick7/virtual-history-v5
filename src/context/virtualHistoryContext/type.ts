import { Location, LocationState } from 'history'

export type HistoryLocation = Location<LocationState>

export interface VirtualHistoryTypes {
  histories: HistoryLocation[]
}
