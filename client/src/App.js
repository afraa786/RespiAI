import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const ReadMore = lazy(() => import('./pages/ReadMore'));
const BreathTimer = lazy(() => import('./pages/BreathTimer'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Survey and Response components
const SurveyComponent = lazy(() => import('./components/SurveyComponent'));
const ResponseComponent = lazy(() => import('./components/ResponseComponent'));

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="app bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <Navbar />
      <Disclaimer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/read-more" element={<ReadMore />} />
          <Route path="/breath-timer" element={<BreathTimer />} />

          {/* New routes for Survey and Response components */}
          <Route path="/survey" element={<SurveyComponent />} />
          <Route path="/responses/:userId" element={<ResponseComponent />} />

          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;