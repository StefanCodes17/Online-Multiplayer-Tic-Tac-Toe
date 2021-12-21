import React, {createContext, useEffect, useState} from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
  
  const [socket, setSocket] = useState()

  useEffect(()=>{
    setSocket(io(`http://${window.location.hostname}:4000`, {transports: ['websocket']}))
    return ()=> socket.disconnect()
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
