// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import UserList from './pages/UserList';
// import WordleGame from './pages/WordleGame';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/users" element={<UserList />} /> */}
          {/* <Route path="/game" element={<WordleGame />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
