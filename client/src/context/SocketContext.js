import React, {createContext} from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {

    const socket = io(`http://${window.location.hostname}:4000`, {transports: ['websocket']});

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
