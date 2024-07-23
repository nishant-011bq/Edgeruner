import { io } from 'socket.io-client'

const socket = io('https://socket.edgeruner.com', {
  query: 'uuid=69f770f0-bb38-4584-bd4a-c466fd6f85f7',
})

export default socket
