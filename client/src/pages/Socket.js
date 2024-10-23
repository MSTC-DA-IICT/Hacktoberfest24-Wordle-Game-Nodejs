import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

function SocketPage() {
  const socket = useRef();
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.current = io("ws://localhost:5000");

    socket.current.on("connection", () => {
      console.log("connected to server");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleClick = () => {
    socket.current.emit("message", message);
    setMessage(''); // Clear the input field after sending the message
  };

  return (
    <div className="App flex flex-col justify-center items-center mt-10">
      <p>Socket.io app</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        className="mb-4 p-2 border rounded mt-40 "
      />
      <button type="button mt-20" className="bg-slate-700 p-2 text-white rounded-sm" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}

export default SocketPage;