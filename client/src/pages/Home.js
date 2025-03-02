import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight, FaStethoscope, FaLungs, FaHospital, FaUserMd, FaHeadSideMask } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/read-more?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const tabs = [
    t('home.tabs.overview', 'Overview'),
    t('home.tabs.causes', 'Causes'),
    t('home.tabs.symptoms', 'Symptoms'),
    t('home.tabs.diagnosis', 'Diagnosis'),
    t('home.tabs.treatment', 'Treatment'),
    t('home.tabs.preventionTips', 'Prevention Tips')
  ];

  // Map the translated tab name back to the original key
  const getTabKey = (tabName) => {
    const mapping = {
      [t('home.tabs.overview', 'Overview')]: 'Overview',
      [t('home.tabs.causes', 'Causes')]: 'Causes',
      [t('home.tabs.symptoms', 'Symptoms')]: 'Symptoms',
      [t('home.tabs.diagnosis', 'Diagnosis')]: 'Diagnosis',
      [t('home.tabs.treatment', 'Treatment')]: 'Treatment',
      [t('home.tabs.preventionTips', 'Prevention Tips')]: 'Prevention Tips'
    };
    return mapping[tabName] || tabName;
  };

  const cardContent = {
    Overview: [
      {
        title: t('home.cards.overview.respiratoryHealth.title', 'Understanding Respiratory Health'),
        content: t('home.cards.overview.respiratoryHealth.content', 'Learn about the respiratory system and how it can be affected by environmental factors, infections, and other conditions...'),
        icon: FaLungs,
        link: '/read-more?article=understanding-respiratory-health'
      },
      {
        title: t('home.cards.overview.earlyDetection.title', 'Early Detection'),
        content: t('home.cards.overview.earlyDetection.content', 'Recognizing early signs of respiratory conditions is crucial for better outcomes. Learn about the initial symptoms and when to seek medical attention...'),
        icon: FaStethoscope,
        link: '/read-more?article=early-detection-guide'
      },
      {
        title: t('home.cards.overview.latestResearch.title', 'Latest Research'),
        content: t('home.cards.overview.latestResearch.content', 'Recent studies show promising developments in respiratory treatment methods and understanding of various conditions...'),
        icon: FaUserMd,
        link: '/read-more?article=latest-research'
      }
    ],
    Causes: [
      {
        title: t('home.cards.causes.airQuality.title', 'Air Quality Impact'),
        content: t('home.cards.causes.airQuality.content', 'High levels of air pollution can trigger or worsen respiratory conditions. Learn how AQI affects your breathing...'),
        icon: FaHeadSideMask,
        link: '/read-more?article=air-quality-impact'
      },
      {
        title: t('home.cards.causes.riskFactors.title', 'Risk Factors'),
        content: t('home.cards.causes.riskFactors.content', 'Various factors can increase your risk of respiratory issues. Understanding these can help in prevention strategies...'),
        icon: FaStethoscope,
        link: '/read-more?article=risk-factors'
      }
    ],
    Symptoms: [
      {
        title: t('home.cards.symptoms.warningSigns.title', 'Warning Signs'),
        content: t('home.cards.symptoms.warningSigns.content', 'Initial symptoms often include shortness of breath, persistent cough, wheezing, or chest tightness. Early recognition is key...'),
        icon: FaStethoscope,
        link: '/read-more?article=warning-signs'
      },
      {
        title: t('home.cards.symptoms.progression.title', 'Symptom Progression'),
        content: t('home.cards.symptoms.progression.content', 'Learn how respiratory symptoms typically progress and what to watch for during different stages of various conditions...'),
        icon: FaHospital,
        link: '/read-more?article=symptoms-progression'
      }
    ],
    Diagnosis: [
      {
        title: t('home.cards.diagnosis.process.title', 'Diagnostic Process'),
        content: t('home.cards.diagnosis.process.content', 'Healthcare providers use various tests including spirometry, chest X-rays, and breathing tests to diagnose respiratory conditions...'),
        icon: FaUserMd,
        link: '/read-more?article=diagnostic-process'
      },
      {
        title: t('home.cards.diagnosis.tests.title', 'Medical Tests'),
        content: t('home.cards.diagnosis.tests.content', 'Understanding the various tests used in respiratory diagnosis and what they mean for your treatment plan...'),
        icon: FaHospital,
        link: '/read-more?article=medical-tests'
      }
    ],
    Treatment: [
      {
        title: t('home.cards.treatment.options.title', 'Treatment Options'),
        content: t('home.cards.treatment.options.content', 'Current treatment approaches include medications, oxygen therapy, pulmonary rehabilitation, and lifestyle changes...'),
        icon: FaHospital,
        link: '/read-more?article=treatment-options'
      },
      {
        title: t('home.cards.treatment.recovery.title', 'Recovery Process'),
        content: t('home.cards.treatment.recovery.content', 'The recovery process varies for each condition but typically involves pulmonary rehabilitation and breathing exercises...'),
        icon: FaUserMd,
        link: '/read-more?article=recovery-process'
      }
    ],
    'Prevention Tips': [
      {
        title: t('home.cards.prevention.measures.title', 'Preventive Measures'),
        content: t('home.cards.prevention.measures.content', 'Many respiratory conditions can be prevented or managed through air quality awareness, masks, and reducing exposure to triggers...'),
        icon: FaStethoscope,
        link: '/read-more?article=preventive-measures'
      },
      {
        title: t('home.cards.prevention.practices.title', 'Healthy Practices'),
        content: t('home.cards.prevention.practices.content', 'Maintaining respiratory health through proper breathing exercises, diet, and avoiding smoke exposure...'),
        icon: FaUserMd,
        link: '/read-more?article=healthy-practices'
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              {t('home.heroTitle', 'Breathing Better in a Changing World')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.heroSubtitle', 'Your AI-powered assistant for navigating respiratory health, treatment options, and improving breathing in high AQI environments')}
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home.searchPlaceholder', 'Search for respiratory health information...')}
                className="w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none shadow-md text-lg"
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800">
                <FaSearch className="text-xl" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
            {t('home.trendingTopics', 'Trending Topics')}
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(getTabKey(tab))}
                className={`px-6 py-2 rounded-full transition-all ${
                  getTabKey(activeTab) === getTabKey(tab)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-600 hover:bg-purple-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardContent[activeTab].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(card.link)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  {React.createElement(card.icon, {
                    className: "text-2xl text-purple-600"
                  })}
                  <h3 className="text-xl font-semibold text-purple-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{card.content}</p>
                <div
                  className="inline-flex items-center text-purple-600 hover:text-purple-800"
                >
                  {t('home.learnMore', 'Learn more')} <FaArrowRight className="ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-900 mb-12 text-center">
            {t('home.resources.title', 'Resources')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">{t('home.aiChatbot', 'AI Chatbot')}</h3>
              <p className="mb-4">{t('home.resources.chatbot.description', 'Get instant answers to your questions about respiratory health from our AI assistant')}</p>
              <Link to="/chatbot" className="flex items-center text-white">
                {t('home.tryNow', 'Try Now')} <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">{t('home.informationHub', 'Information Hub')}</h3>
              <p className="mb-4">{t('home.resources.hub.description', 'Access comprehensive resources and latest research about respiratory health and air quality')}</p>
              <Link to="/explore" className="flex items-center text-white">
                {t('home.explore', 'Explore')} <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-800 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">{t('home.treatmentGuide', 'Treatment Guide')}</h3>
              <p className="mb-4">{t('home.resources.treatment.description', 'Learn about various treatment options for respiratory conditions and breathing improvement techniques')}</p>
              <Link to="/read-more" className="flex items-center text-white">
                {t('home.viewGuide', 'View Guide')} <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Emergency Contact */}
      <section className="py-8 px-4 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-xl bg-white shadow-lg">
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                {t('home.emergency.title', 'Emergency? Need immediate help?')}
              </h3>
              <p className="text-gray-600">
                {t('home.emergency.description', "If you're experiencing severe symptoms, don't wait - get help now.")}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <a
                href="tel:112"
                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('home.emergency.callEmergency', 'Call Emergency (112)')}
              </a>
              <a
                href="tel:102"
                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('home.emergency.callAmbulance', 'Call Ambulance (102)')}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
