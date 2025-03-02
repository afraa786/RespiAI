import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaLungs, FaHeadSideMask, FaBook, FaRobot, FaBookMedical } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: FaLungs },
    { path: '/explore', label: t('nav.explore'), icon: FaBook },
    { path: '/chatbot', label: t('nav.assistant'), icon: FaRobot },
    { path: '/read-more', label: t('nav.resources'), icon: FaBookMedical },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaLungs className="text-purple-600 text-2xl" />
            <span className="font-bold text-xl text-purple-900">RespirAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Regular Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {link.icon && <link.icon className="text-lg" />}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Language Selector */}
            <LanguageSelector />

            {/* Prominent Breath Timer Button */}
            <Link
              to="/breath-timer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white font-medium transition-colors ${
                location.pathname === '/breath-timer'
                  ? 'bg-purple-700'
                  : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              <FaLungs className="text-lg" />
              <span>{t('nav.testYourself')}</span>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden fixed left-0 right-0 top-16 bg-purple-500 shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-white hover:text-purple-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <link.icon className="text-lg" />}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Language Selector in Mobile Menu */}
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
              
              {/* Prominent Breath Timer Button in Mobile Menu */}
              <Link
                to="/breath-timer"
                className="flex items-center space-x-2 px-4 py-3 rounded-md text-white font-medium bg-purple-600 hover:bg-purple-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaLungs className="text-lg" />
                <span>{t('nav.testYourself')}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
