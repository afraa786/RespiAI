import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { getSurveyQuestions } from '../../api';  // Go one level up from 'ui' folder to 'src'

export const ResultCard = ({ result, duration }) => {
  // Define styles based on result status
  const statusStyles = {
    'Severe Concern': {
      icon: <FaExclamationTriangle className="text-4xl text-red-500" />,
      bg: 'bg-gradient-to-r from-red-50 to-red-100',
      border: 'border-red-200',
      shadow: 'shadow-red-100',
      title: 'text-red-700',
      subtitle: 'text-red-600',
      buttonBg: 'bg-white hover:bg-red-50',
      buttonBorder: 'border-red-200',
      buttonText: 'text-red-600',
      animation: {
        initial: { opacity: 0, y: 20, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
      }
    },
    'Moderate Concern': {
      icon: <FaInfoCircle className="text-4xl text-yellow-500" />,
      bg: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
      border: 'border-yellow-200',
      shadow: 'shadow-yellow-100',
      title: 'text-yellow-700',
      subtitle: 'text-yellow-600',
      buttonBg: 'bg-white hover:bg-yellow-50',
      buttonBorder: 'border-yellow-200',
      buttonText: 'text-yellow-600',
      animation: {
        initial: { opacity: 0, y: 20, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
      }
    },
    'Normal Range': {
      icon: <FaCheckCircle className="text-4xl text-green-500" />,
      bg: 'bg-gradient-to-r from-green-50 to-green-100',
      border: 'border-green-200',
      shadow: 'shadow-green-100',
      title: 'text-green-700',
      subtitle: 'text-green-600',
      buttonBg: 'bg-white hover:bg-green-50',
      buttonBorder: 'border-green-200',
      buttonText: 'text-green-600',
      animation: {
        initial: { opacity: 0, y: 20, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
      }
    }
  };

  // Get styles for current status
  const style = statusStyles[result.status] || statusStyles['Normal Range'];

  // State to store questions fetched from the API
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch survey questions when "Take Survey" button is clicked
  const fetchSurveyQuestions = async () => {
    setIsLoading(true);

    try {
      const data = await getSurveyQuestions(result.questionId);  // Assuming result has questionId
      setQuestions(data);  // Assuming the response data contains the list of questions
    } catch (error) {
      console.error('Error fetching survey questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={style.animation.initial}
      animate={style.animation.animate}
      className={`w-full max-w-md rounded-xl p-6 border ${style.border} ${style.bg} ${style.shadow} overflow-hidden relative`}
    >
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-10" />
      <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-white opacity-10" />

      <div className="flex items-start gap-4 relative z-10">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          {style.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-bold text-xl ${style.title}`}>{result.status}</h3>
            <span className="font-mono font-bold text-2xl bg-white bg-opacity-60 px-3 py-1 rounded-lg shadow-inner">
              {duration}s
            </span>
          </div>

          <p className={`${style.subtitle} leading-relaxed`}>
            {result.message}
          </p>
          
          {/* Survey button for all result types */}
          <div className="mt-4">
            <button 
              onClick={fetchSurveyQuestions}  // Trigger survey fetch on click
              className={`w-full py-2 border rounded-lg font-medium transition-colors ${style.buttonBg} ${style.buttonBorder} ${style.buttonText}`}
              disabled={isLoading}  // Disable button while loading
            >
              {isLoading ? 'Loading Survey...' : 'Take Assessment Survey'}
            </button>
          </div>
        </div>
      </div>

      {/* Display survey questions if they have been fetched */}
      {questions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-xl">Survey Questions</h4>
          <ul className="list-disc pl-6">
            {questions.map((question, index) => (
              <li key={index} className="my-2">
                {question.text} {/* Assuming each question has a `text` field */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
