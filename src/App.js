import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Make sure to install react-router-dom if not done already
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Selectroom from './components/Selectroom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/selectroom" element={<Selectroom />} />
        {/* <Route path="/signin" element={< />} /> */}
      </Routes>
    </Router>
  );
};

export default App;