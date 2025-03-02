import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: t('common.languages.en') },
    { code: 'hi', name: t('common.languages.hi') },
    { code: 'ur', name: t('common.languages.ur') },
    { code: 'mr', name: t('common.languages.mr') },
    { code: 'ta', name: t('common.languages.ta') }
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaGlobe className="text-lg" />
        <span>{t('common.selectLanguage')}</span>
        <FaChevronDown className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 ring-1 ring-black ring-opacity-5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === lang.code
                  ? 'bg-purple-100 text-purple-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 