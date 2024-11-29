import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const SocketService = {
  init: () => {
    if (!socket) {
      socket = io(import.meta.env.VITE_API_SOCKET, {
        transports: ['websocket', 'polling'],
        reconnection: true
      })

      socket.on('connect', () => {
        console.log('Socket connected:', socket?.connected)
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })
    }
  },
  get: () => socket,
  disconnect: () => {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  },
  on: (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
      socket.on(event, callback)
    }
  },
  off: (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
      socket.off(event, callback)
    }
  }
}
