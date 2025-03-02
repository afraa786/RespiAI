import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaUser, FaPhone, FaMapMarkerAlt, FaStar, FaGlobe, FaArrowRight } from 'react-icons/fa';

export const HospitalConnect = ({ severityLevel }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  // Hospital data for Mumbai
  const hospitals = [
    {
      id: 1,
      name: "Kokilaben Dhirubhai Ambani Hospital",
      specialties: ["Pulmonology", "Critical Care", "Respiratory Medicine"],
      address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai",
      phone: "+91-22-4269-6969",
      rating: 4.8,
      website: "https://www.kokilabenhospital.com",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Lilavati Hospital and Research Centre",
      specialties: ["Respiratory Medicine", "Internal Medicine", "Cardiology"],
      address: "A-791, Bandra Reclamation, Bandra West, Mumbai",
      phone: "+91-22-2675-1000",
      rating: 4.7,
      website: "https://www.lilavatihospital.com",
      image: "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      name: "Fortis Hospital, Mulund",
      specialties: ["Pulmonology", "Internal Medicine", "Emergency Care"],
      address: "Mulund Goregaon Link Road, Mulund West, Mumbai",
      phone: "+91-22-6799-8989",
      rating: 4.6,
      website: "https://www.fortishealthcare.com/mumbai",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Hiranandani Hospital",
      specialties: ["Respiratory Care", "Pulmonary Rehabilitation", "Thoracic Surgery"],
      address: "Hillside Avenue, Hiranandani Gardens, Powai, Mumbai",
      phone: "+91-22-2576-3300",
      rating: 4.5,
      website: "https://www.hiranandanihospital.org",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 5,
      name: "P.D. Hinduja Hospital & Medical Research Centre",
      specialties: ["Pulmonology", "Thoracic Surgery", "Allergy & Immunology"],
      address: "Veer Savarkar Marg, Mahim, Mumbai",
      phone: "+91-22-2445-1515",
      rating: 4.7,
      website: "https://www.hindujahospital.com",
      image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  // List of renowned pulmonologists in Mumbai
  const specialists = [
    {
      id: 1,
      name: "Dr. Lancelot Pinto",
      hospital: "P.D. Hinduja Hospital",
      specialization: "Pulmonology and Sleep Medicine",
      contact: "+91-22-2445-1515",
    },
    {
      id: 2,
      name: "Dr. Zarir Udwadia",
      hospital: "Breach Candy Hospital",
      specialization: "Respiratory Medicine",
      contact: "+91-22-2366-7777",
    },
    {
      id: 3,
      name: "Dr. Prashant Chhajed",
      hospital: "Fortis Hospital",
      specialization: "Interventional Pulmonology",
      contact: "+91-22-6799-8989",
    },
    {
      id: 4,
      name: "Dr. Sundeep Salvi",
      hospital: "Kokilaben Dhirubhai Ambani Hospital",
      specialization: "Respiratory Medicine",
      contact: "+91-22-4269-6969",
    },
    {
      id: 5,
      name: "Dr. Farokh E. Udwadia",
      hospital: "Lilavati Hospital",
      specialization: "Respiratory Medicine & Critical Care",
      contact: "+91-22-2675-1000",
    },
    {
      id: 6, 
      name: "Dr. Jalil Parkar",
      hospital: "Lilavati Hospital",
      specialization: "Pulmonology and Respiratory Medicine",
      contact: "+91-22-2675-1000",
    },
    {
      id: 7,
      name: "Dr. Vijay Rai",
      hospital: "Hiranandani Hospital",
      specialization: "Pulmonary Medicine",
      contact: "+91-22-2576-3300",
    },
    {
      id: 8,
      name: "Dr. Sanjay Mehta",
      hospital: "Hiranandani Hospital",
      specialization: "Respiratory Medicine & Sleep Disorders",
      contact: "+91-22-2576-3300",
    }
  ];

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleBackToList = () => {
    setSelectedHospital(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Determine the background color based on severity
  const bgColor = severityLevel === 'Severe Concern' 
    ? 'bg-gradient-to-r from-red-50 to-pink-50' 
    : 'bg-gradient-to-r from-yellow-50 to-amber-50';

  // If a hospital is selected, show detailed view
  if (selectedHospital) {
    return (
      <div className={`rounded-xl p-6 ${bgColor} border border-gray-200 shadow-md`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{selectedHospital.name}</h3>
            <button 
              onClick={handleBackToList}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to list
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={selectedHospital.image} 
                alt={selectedHospital.name}
                className="w-full h-48 object-cover rounded-lg shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300";
                }}
              />
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <span className="text-gray-700 text-sm">{selectedHospital.address}</span>
                </div>
                
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <a href={`tel:${selectedHospital.phone}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    {selectedHospital.phone}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <span className="text-gray-700 text-sm">{selectedHospital.rating} / 5 rating</span>
                </div>
                
                <div className="pt-2">
                  <a 
                    href={selectedHospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaGlobe className="mr-2" /> Visit Website
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHospital.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Key Specialists</h4>
                <div className="space-y-3">
                  {specialists
                    .filter(s => s.hospital.includes(selectedHospital.name.split(' ')[0]))
                    .map(specialist => (
                      <div key={specialist.id} className="flex items-start p-2 hover:bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">{specialist.name}</h5>
                          <p className="text-sm text-gray-600">{specialist.specialization}</p>
                          <a href={`tel:${specialist.contact}`} className="text-sm text-blue-600 hover:text-blue-800">
                            {specialist.contact}
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="mt-4">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(selectedHospital.name + ' ' + selectedHospital.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaMapMarkerAlt className="mr-2" /> Get Directions
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show the list of hospitals
  return (
    <div className={`rounded-xl p-6 ${bgColor} border border-gray-200 shadow-md`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white p-2 rounded-full shadow-sm">
          <FaHospital className="text-blue-600 text-xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Connect with Top Hospitals in Mumbai
        </h3>
      </div>
      
      <p className="text-gray-700 mb-6">
        Based on your breathing assessment, we recommend consulting with respiratory specialists. 
        Choose a hospital below to view details and contact information.
      </p>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4"
      >
        {hospitals.map((hospital) => (
          <motion.div 
            key={hospital.id}
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleHospitalSelect(hospital)}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 h-32 sm:h-auto">
                <img 
                  src={hospital.image} 
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=300";
                  }}
                />
              </div>
              <div className="p-4 sm:w-3/4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800">{hospital.name}</h4>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 my-2">
                    {hospital.specialties.slice(0, 2).map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 2 && (
                      <span className="text-xs text-gray-500">+{hospital.specialties.length - 2} more</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 flex items-start">
                    <FaMapMarkerAlt className="text-gray-400 mr-1 mt-1 flex-shrink-0" />
                    <span>{hospital.address.substring(0, 60)}...</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <a 
                    href={`tel:${hospital.phone}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {hospital.phone}
                  </a>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                    View Details <FaArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}; 