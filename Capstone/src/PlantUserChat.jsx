import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {withCredentials: true});

export default function PlantUserChat() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }, []);

  const [message, setMessage] = useState('');
  
  const sendMessage = () => {
    socket.emit('message', message);
  };

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
    });
  }, []);
  
  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}