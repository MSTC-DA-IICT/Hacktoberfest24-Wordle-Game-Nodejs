// // src/pages/UserList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Replace with your server URL

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(''); // Set current user's email dynamically
//   const [invitee, setInvitee] = useState(null);

//   useEffect(() => {
//     // Fetch registered users from the server
//     axios.get('http://localhost:5000/api/users')
//       .then((response) => {
//         setUsers(response.data.users);
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   // Function to send invite to another user
//   const sendInvite = (inviteeEmail) => {
//     const inviteeSocketId = users.find(user => user.email === inviteeEmail)?.socketId; // Assume you have socketId saved
//     if (inviteeSocketId) {
//       socket.emit('invite', { inviter: currentUser, inviteeSocketId });
//     }
//   };

//   // Listen for incoming invites
//   useEffect(() => {
//     socket.on('invite-received', (data) => {
//       setInvitee(data.inviter);
//     });
//   }, []);

//   // Accept invite and join room
//   const acceptInvite = (inviter) => {
//     const room = `${inviter}-${currentUser}`;
//     socket.emit('join-room', room);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
//       <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
//         {users.map((user) => (
//           <li key={user.email} className="py-4 px-6 flex justify-between">
//             <span>{user.email}</span>
//             {user.email !== currentUser && (
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 onClick={() => sendInvite(user.email)}
//               >
//                 Invite
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>

//       {invitee && (
//         <div className="mt-6 p-4 bg-yellow-200 rounded-md shadow-md">
//           <p>You have been invited by {invitee}</p>
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//             onClick={() => acceptInvite(invitee)}
//           >
//             Accept Invite
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;
