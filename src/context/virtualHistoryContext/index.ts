import { createContext } from 'react'
import { VirtualHistoryTypes } from './type'

const VirtualHistoryContext = createContext<VirtualHistoryTypes>({ histories: [] })

export default VirtualHistoryContext
