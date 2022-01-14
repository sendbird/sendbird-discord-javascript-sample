import { createContext } from "react"
import { initialState } from "./state"
import { RoomType } from "sendbird-calls"

const stub = () => {
  throw new Error("You forgot to wrap your component in <AuthContext>.")
}

export const initialContext = {
  ...initialState,
  isAuthenticated: false,
  init: stub,
  auth: stub,
  deauth: stub,

  // Media Device Control
  updateMediaDevices: stub,
  selectAudioInputDevice: stub,
  selectAudioOutputDevice: stub,
  selectVideoInputDevice: stub,

  // Direct Calls
  isBusy: false,
  currentCall: undefined,
  dial: stub,
  addDirectCallSound: stub,
  clearCalls: stub,

  // Rooms
  createRoom: stub,
  getCachedRoomById: stub,
  fetchRoomById: stub,
  RoomType: RoomType
}

const CallContext = createContext(initialContext)

export default CallContext
