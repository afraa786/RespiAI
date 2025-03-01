import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const SurveyCard = ({ 
  questions, 
  onComplete, 
  title = 'Assessment Survey',
  primaryColor = 'purple' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Color theme based on primary color
  const colorTheme = {
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      title: 'text-purple-800',
      progressBg: 'bg-purple-200',
      progressFill: 'bg-purple-600',
      optionBorder: 'border-purple-200',
      optionBg: 'bg-white',
      optionBgSelected: 'bg-purple-100',
      optionBorderSelected: 'border-purple-400',
      buttonBg: 'bg-purple-600',
      buttonHover: 'hover:bg-purple-700',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      title: 'text-blue-800',
      progressBg: 'bg-blue-200',
      progressFill: 'bg-blue-600',
      optionBorder: 'border-blue-200',
      optionBg: 'bg-white',
      optionBgSelected: 'bg-blue-100',
      optionBorderSelected: 'border-blue-400',
      buttonBg: 'bg-blue-600',
      buttonHover: 'hover:bg-blue-700',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      title: 'text-green-800',
      progressBg: 'bg-green-200',
      progressFill: 'bg-green-600',
      optionBorder: 'border-green-200',
      optionBg: 'bg-white',
      optionBgSelected: 'bg-green-100',
      optionBorderSelected: 'border-green-400',
      buttonBg: 'bg-green-600',
      buttonHover: 'hover:bg-green-700',
    }
  };

  const theme = colorTheme[primaryColor] || colorTheme.purple;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  const handleNext = () => {
    if (selectedOption) {
      // Save response
      setResponses({
        ...responses,
        [currentIndex]: selectedOption
      });
      
      // Go to next question or complete
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        // Survey complete
        onComplete(responses);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(responses[currentIndex - 1] || null);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
  };
  
  const optionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      } 
    })
  };

  return (
    <div className={`w-full max-w-2xl ${theme.bg} rounded-xl shadow-lg border ${theme.border} overflow-hidden`}>
      {/* Header */}
      <div className="p-6 border-b border-opacity-20 border-gray-300">
        <h3 className={`text-2xl font-bold ${theme.title}`}>{title}</h3>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className={`w-full h-2 rounded-full ${theme.progressBg} overflow-hidden`}>
            <div 
              className={`h-full ${theme.progressFill} transition-all duration-500 ease-out`} 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600 font-medium">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>
      </div>
      
      {/* Question content */}
      <motion.div 
        key={currentIndex}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardVariants}
        className="p-6"
      >
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h4>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => (
              <motion.div 
                custom={i}
                initial="hidden"
                animate="visible"
                variants={optionVariants}
                key={i}
              >
                <div
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${selectedOption === option 
                      ? `${theme.optionBgSelected} ${theme.optionBorderSelected}` 
                      : `${theme.optionBg} ${theme.optionBorder} hover:bg-gray-50`
                    }
                  `}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${selectedOption === option 
                        ? `${theme.optionBorderSelected} border-opacity-100` 
                        : 'border-gray-300'
                      }
                      mr-3
                    `}>
                      {selectedOption === option && (
                        <div className={`w-3 h-3 rounded-full ${theme.progressFill}`} />
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Footer with navigation */}
      <div className="p-6 border-t border-opacity-20 border-gray-300 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`
            flex items-center px-4 py-2 rounded-lg
            ${currentIndex === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <FaChevronLeft className="mr-2" size={14} /> Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`
            flex items-center px-6 py-2 rounded-lg text-white
            ${selectedOption 
              ? `${theme.buttonBg} ${theme.buttonHover}` 
              : 'bg-gray-300 cursor-not-allowed'
            }
            transition-colors duration-200
          `}
        >
          {currentIndex === questions.length - 1 ? 'Complete' : 'Next'} 
          <FaChevronRight className="ml-2" size={14} />
        </button>
      </div>
    </div>
  );
}; 