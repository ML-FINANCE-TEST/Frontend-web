// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3002'); // Change the URL to match your server

// const CommunityChat = () => {
//   const [userId, setUserId] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [showModal, setShowModal] = useState(true);

//   useEffect(() => {
//     // Join the community room when component mounts
//     if (userId) {
//       socket.emit('join community', userId);
//       setShowModal(false);
//     }

//     // Listen for incoming messages
//     socket.on('community message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       // Clean up event listeners when component unmounts
//       socket.off('community message');
//     };
//   }, [userId]);

//   const sendMessage = () => {
//     if (message.trim() !== '') {
//       socket.emit('community message', userId, { msg: message });
//       setMessage('');
//     }
//   };

//   const handleModalClose = () => {
//     if (userId.trim() !== '') {
//       setShowModal(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Community Chat</h1>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Enter your User ID</h2>
//             <input
//               type="text"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               autoFocus
//             />
//             <button onClick={handleModalClose}>Submit</button>
//           </div>
//         </div>
//       )}
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.userId}: {msg?.firstName}: {msg?.lastName} </strong> {msg.msg} ({msg.timestamp})
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Type your message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default CommunityChat;
