import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLungs, FaExclamationTriangle, FaNotesMedical, FaHospital, FaHeadSideMask } from 'react-icons/fa';

const Explore = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = {
    overview: {
      title: 'Understanding Respiratory Diseases',
      content: `Respiratory diseases are conditions that affect the airways and other structures of the lung. They can be caused by infection, smoking, air pollution, or genetics. Common respiratory diseases include asthma, COPD, pneumonia, and bronchitis. Rising air quality concerns in many regions have increased the importance of respiratory health awareness.`,
      icon: FaLungs
    },
    symptoms: {
      title: 'Common Symptoms and Warning Signs',
      content: `Common symptoms across respiratory conditions include:
      • Shortness of breath or difficulty breathing
      • Persistent cough, sometimes with phlegm
      • Wheezing or whistling sound when breathing
      • Chest tightness or pain
      • Frequent respiratory infections
      • Fatigue due to low oxygen levels
      • Cyanosis (bluish discoloration of lips, skin, or nails) in severe cases`,
      icon: FaExclamationTriangle
    },
    diagnosis: {
      title: 'Diagnosis and Tests',
      content: `Diagnosis typically involves:
      • Physical examination
      • Pulmonary function tests (spirometry)
      • Chest X-rays
      • CT scans
      • Blood tests to measure oxygen levels
      • Sputum tests to identify infections
      • Bronchoscopy in certain cases`,
      icon: FaNotesMedical
    },
    treatment: {
      title: 'Treatment Options',
      content: `Treatment approaches include:
      • Bronchodilators to open airways
      • Inhaled corticosteroids to reduce inflammation
      • Antibiotics for bacterial infections
      • Pulmonary rehabilitation
      • Oxygen therapy when needed
      • Lifestyle changes including avoiding triggers
      • Air purifiers and masks in high pollution areas`,
      icon: FaHospital
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 text-center mb-12">
          Understanding Respiratory Health
        </h1>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-full transition-all flex items-center space-x-2 ${
                activeSection === section
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-100'
              }`}
            >
              {React.createElement(sections[section].icon, { className: 'text-lg' })}
              <span className="capitalize">{section}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            {React.createElement(sections[activeSection].icon, {
              className: 'text-3xl text-purple-600'
            })}
            <h2 className="text-2xl font-semibold text-purple-900">
              {sections[activeSection].title}
            </h2>
          </div>
          <div className="prose prose-purple max-w-none">
            {sections[activeSection].content.split('•').map((point, index) => (
              index === 0 ? (
                <p key={index} className="text-gray-700 text-lg">
                  {point}
                </p>
              ) : (
                <div key={index} className="flex items-start space-x-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <p className="text-gray-700">{point}</p>
                </div>
              )
            ))}
          </div>
        </motion.div>

        {/* Common Respiratory Conditions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <FaLungs className="text-xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800">Asthma</h3>
            </div>
            <p className="text-gray-600">
              A chronic condition causing inflammation and narrowing of the airways, leading to breathing difficulties and wheezing.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <FaLungs className="text-xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800">COPD</h3>
            </div>
            <p className="text-gray-600">
              Chronic Obstructive Pulmonary Disease includes emphysema and chronic bronchitis, causing airflow blockage and breathing difficulties.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <FaLungs className="text-xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800">Pneumonia</h3>
            </div>
            <p className="text-gray-600">
              An infection causing inflammation in the air sacs of the lungs, which may fill with fluid or pus.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <FaHeadSideMask className="text-xl text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Pollution Effects</h3>
            </div>
            <p className="text-gray-600">
              Air pollution can trigger and worsen respiratory conditions, with both short-term and long-term health impacts.
            </p>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="mt-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-red-800 mb-4">
            Emergency Information
          </h3>
          <p className="text-red-700">
            If you experience severe difficulty breathing, chest pain, or bluish discoloration of lips or face,
            seek immediate medical attention or call emergency services.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-red-800">Emergency Numbers:</h4>
              <p className="text-red-700">National Emergency: 112</p>
              <p className="text-red-700">Ambulance: 102</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-red-800">Key Hospitals:</h4>
              <p className="text-red-700">AIIMS New Delhi: 011-26588500</p>
              <p className="text-red-700">Medanta Hospital: 0124-4141414</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-red-800">Support Contacts:</h4>
              <p className="text-red-700">Apollo Hospitals: 1860-500-1066</p>
              <p className="text-red-700">National Health Helpline: 1800-180-1104</p>
            </div>
          </div>
        </div>

        {/* Citations and Resources */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Medical Resources & Citations
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• AIIMS Pulmonology Department</li>
            <li>• Indian Chest Society</li>
            <li>• World Health Organization (WHO) India</li>
            <li>• National Air Quality Monitoring Programme</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Explore;
