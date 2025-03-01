import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Chatbot from './pages/Chatbot';
import ReadMore from './pages/ReadMore';
import BreathTimer from './pages/BreathTimer';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    });
  }, []);

  return (
    <div className="app bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Navbar />
      <Disclaimer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/read-more" element={<ReadMore />} />
        <Route path="/breath-timer" element={<BreathTimer />} />
      </Routes>
    </div>
  );
}

export default App;
