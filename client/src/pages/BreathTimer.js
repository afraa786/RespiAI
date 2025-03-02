import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { CircularProgress } from "../components/ui/circular-progress";
import { BreathingAnimation } from "../components/ui/breathing-animation";
import { ResultCard } from "../components/ui/result-card";
import { SurveyCard } from "../components/ui/survey-card";
import { HospitalConnect } from "../components/ui/hospital-connect";
import { FaPlay, FaStop, FaRedo, FaLungs, FaInfoCircle, FaChartLine } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const shortnessQuestions = [
  { question: "Where do you feel difficulty in breathing?", options: ["Chest", "Throat", "Nose", "Whole body"] },
  { question: "How long have you been experiencing this issue?", options: ["Less than a week", "1-2 weeks", "More than 2 weeks", "Not sure"] },
  { question: "Are you a smoker?", options: ["Yes", "No", "Occasionally"] },
  { question: "Have you had any recent respiratory infections?", options: ["Yes", "No", "Not sure"] },
  { question: "Do you experience shortness of breath while resting or only during activity?", options: ["While resting", "Only during activity", "Both"] },
  { question: "Have you had any recent vaccinations or surgeries?", options: ["Yes, a vaccination", "Yes, a surgery", "No", "Not sure"] },
];

const generalQuestions = [
  { question: "Have you recently had any type of infection?", options: ["Yes", "No", "Not sure"] },
  { question: "Do you experience weakness in your legs or arms?", options: ["Yes, legs", "Yes, arms", "Yes, both", "No"] },
  { question: "Is the weakness gradually spreading to other parts of your body?", options: ["Yes", "No", "Not sure"] },
  { question: "Do you feel tingling or numbness in your hands, feet, or legs?", options: ["Yes", "No", "Not sure"] },
  { question: "Do you have trouble lifting your arms or holding objects?", options: ["Yes", "No", "Sometimes"] },
];

// Guided breathing patterns
const breathingPatterns = {
  relaxed: {
    name: "Relaxed Breathing",
    description: "Calm and steady breathing pattern to reduce stress",
    inhaleTime: 4,
    holdTime: 2,
    exhaleTime: 6,
    pauseTime: 2,
    color: "purple",
  },
  box: {
    name: "Box Breathing",
    description: "Equal time for each phase to improve focus and calm",
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    pauseTime: 4,
    color: "blue",
  },
  energizing: {
    name: "Energizing Breath",
    description: "Quick inhales and longer exhales to increase energy",
    inhaleTime: 2,
    holdTime: 1,
    exhaleTime: 4,
    pauseTime: 1,
    color: "green",
  },
};

export default function BreathTimer() {
  const { t } = useTranslation();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastDuration, setLastDuration] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyType, setSurveyType] = useState(null);
  const [surveyResponses, setSurveyResponses] = useState({});
  const [assessment, setAssessment] = useState(null);
  const [mode, setMode] = useState("timer"); // "timer" or "guided"
  const [guidedPattern, setGuidedPattern] = useState("relaxed");
  const [breathingPhase, setBreathingPhase] = useState("idle"); // idle, inhale, hold, exhale, pause
  const [countdown, setCountdown] = useState(3);
  const [isInCountdown, setIsInCountdown] = useState(false);
  const [activeTab, setActiveTab] = useState("timer");
  const [showHospitalConnect, setShowHospitalConnect] = useState(false);
  
  const timerRef = useRef(null);
  const phaseTimerRef = useRef(null);

  // Function to start breath hold timer
  const startTimer = () => {
    if (!isRunning) {
      setIsInCountdown(true);
      setCountdown(3);
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsInCountdown(false);
            
            // Start actual timer
      setIsRunning(true);
      setTime(0);
      timerRef.current = setInterval(() => {
              setTime(prevTime => prevTime + 1);
            }, 1000);
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Function to stop breath hold timer
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      setLastDuration(time);
      
      // No longer immediately showing the survey, just setting the lastDuration
      // The assessment will be displayed based on the lastDuration via useEffect
    }
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
    setLastDuration(null);
    setShowSurvey(false);
    setSurveyType(null);
    setSurveyResponses({});
    setAssessment(null);
  };

  // Set assessment based on breath hold duration
  useEffect(() => {
    if (lastDuration !== null) {
      const newAssessment = getBreathAssessment(lastDuration);
      setAssessment(newAssessment);
    }
  }, [lastDuration]);

  // Function to get assessment based on duration
  const getBreathAssessment = (lastDuration) => {
    if (lastDuration < 10) {
      return {
        status: t('assessments.severe'),
        message: t('assessments.severeDesc'),
        color: "text-red-600"
      };
    } else if (lastDuration < 15) {
      return {
        status: t('assessments.moderate'),
        message: t('assessments.moderateDesc'),
        color: "text-yellow-600"
      };
    } else {
      return {
        status: t('assessments.normal'),
        message: t('assessments.normalDesc'),
        color: "text-green-600"
      };
    }
  };

  // Handle survey completion
  const handleSurveyComplete = (responses) => {
    setSurveyResponses(responses);
    setShowSurvey(false);
    
    // Show hospital connect if breathing issue is severe or moderate
    if (assessment && (assessment.status === 'Severe Concern' || assessment.status === 'Moderate Concern')) {
      setShowHospitalConnect(true);
    }
    
    // Here you would typically send this data to your backend for analysis
    console.log("Survey responses:", responses);
  };

  // Function to handle the connect to hospitals button
  const handleConnectHospitals = () => {
    setShowHospitalConnect(true);
  };

  // Function to go back from hospital connect view
  const handleBackFromHospitals = () => {
    setShowHospitalConnect(false);
  };

  // Start guided breathing
  const startGuidedBreathing = () => {
    if (!isRunning) {
      setIsRunning(true);
      runBreathingCycle();
    }
  };

  // Stop guided breathing
  const stopGuidedBreathing = () => {
    if (isRunning) {
      clearTimeout(phaseTimerRef.current);
      setIsRunning(false);
      setBreathingPhase("idle");
    }
  };

  // Handle breathing cycle for guided breathing
  const runBreathingCycle = () => {
    const pattern = breathingPatterns[guidedPattern];
    
    // Start with inhale
    setBreathingPhase("inhale");
    
    // Schedule phases
    phaseTimerRef.current = setTimeout(() => {
      // Hold phase
      setBreathingPhase("hold");
      
      phaseTimerRef.current = setTimeout(() => {
        // Exhale phase
        setBreathingPhase("exhale");
        
        phaseTimerRef.current = setTimeout(() => {
          // Pause phase
          setBreathingPhase("pause");
          
          phaseTimerRef.current = setTimeout(() => {
            // If still running, start next cycle
            if (isRunning) {
              runBreathingCycle();
            }
          }, pattern.pauseTime * 1000);
        }, pattern.exhaleTime * 1000);
      }, pattern.holdTime * 1000);
    }, pattern.inhaleTime * 1000);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, []);

  // Tab animations
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Function to start the survey when the button is clicked
  const startSurvey = () => {
    // Show appropriate survey based on breath hold time
    if (lastDuration < 15) {
      setSurveyType("shortness");
    } else {
      setSurveyType("general");
    }
    setShowSurvey(true);
  };

  return (
        <motion.div 
      className="container mx-auto px-4 py-24 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
    >
      {!showHospitalConnect ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('breadthTimer.title')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('breadthTimer.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex space-x-2 border-b pb-4 mb-6">
            <button 
              onClick={() => setActiveTab("timer")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeTab === "timer" 
                    ? "bg-purple-100 text-purple-700" 
                    : "hover:bg-gray-100"
              }`}
            >
                <FaLungs />
                <span>{t('breadthTimer.holdTest')}</span>
            </button>
              
            <button 
              onClick={() => setActiveTab("guided")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                activeTab === "guided" 
                    ? "bg-purple-100 text-purple-700" 
                    : "hover:bg-gray-100"
              }`}
            >
                <FaLungs />
                <span>{t('breadthTimer.guidedBreathing')}</span>
            </button>
        </div>

        <AnimatePresence mode="wait">
              {activeTab === "timer" && (
            <motion.div
                  key="breath-timer"
                  variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {t('breadthTimer.holdTest')}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {t('breadthTimer.description')}
                  </p>
                </div>
                
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                      <FaInfoCircle className="mr-2 text-purple-500" />
                      {t('breadthTimer.instructions')}
                    </h3>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                      <li>{t('breadthTimer.step1')}</li>
                      <li>{t('breadthTimer.step2')}</li>
                      <li>{t('breadthTimer.step3')}</li>
                      <li>{t('breadthTimer.step4')}</li>
                    </ol>
                  </div>

                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <CircularProgress
                        progress={isRunning ? (time / 60) * 100 : 0}
                        size={220}
                        strokeWidth={12}
                        circleColor="#E9D5FF"
                        progressColor="#8B5CF6"
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {isInCountdown ? (
                            <div className="text-5xl font-bold text-purple-600">{countdown}</div>
                          ) : (
                            <>
                              <div className="text-5xl font-bold text-gray-800">
                                {time}
            </div>
                              <div className="text-gray-500">seconds</div>
                            </>
                          )}
              </div>
            </CircularProgress>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {!isRunning ? (
              <Button 
                onClick={startTimer}
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isInCountdown}
                      >
                        <FaPlay className="mr-2" />
                        {t('breadthTimer.startTest')}
              </Button>
                    ) : (
              <Button
                onClick={stopTimer}
                        className="bg-red-500 hover:bg-red-600"
              >
                        <FaStop className="mr-2" />
                        {t('breadthTimer.stopTest')}
              </Button>
            )}
                  
            {lastDuration && (
              <Button
                onClick={resetTimer}
                      variant="outline"
                        className="border-purple-300 text-purple-700"
              >
                        <FaRedo className="mr-2" />
                        {t('breadthTimer.tryAgain')}
              </Button>
            )}
          </div>
                  </motion.div>
                )}

              {activeTab === "guided" && (
            <motion.div
              key="guided"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 mb-2">Guided Breathing</h2>
                  <p className="text-gray-600 text-center max-w-lg mb-4">
                    Follow along with guided breathing patterns to improve lung function, reduce stress, and practice controlled breathing.
                  </p>
                </div>

                {!isRunning && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl"
                  >
                    <h3 className="text-xl font-medium text-gray-700 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <FaLungs size={16} />
                      </span>
                      Select a breathing pattern:
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                      {Object.keys(breathingPatterns).map((key) => {
                        const pattern = breathingPatterns[key];
                        const isSelected = guidedPattern === key;
                        
                        return (
                          <motion.div
                            key={key}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className={`
                              relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300
                              ${isSelected 
                                ? `border-${pattern.color}-400 shadow-lg shadow-${pattern.color}-100` 
                                : 'border-gray-200 hover:border-purple-200'
                              }
                            `}
                            onClick={() => setGuidedPattern(key)}
                          >
                            {/* Top colored band */}
                            <div className={`h-2 w-full bg-${pattern.color}-500`}></div>
                            
                            {/* Content with gradient background */}
                            <div className={`
                              p-5 flex flex-col h-full 
                              ${isSelected ? `bg-gradient-to-br from-${pattern.color}-50 to-white` : 'bg-white'}
                            `}>
                              {/* Pattern name with icon */}
                              <div className="flex items-center mb-2 gap-2">
                                <div className={`w-8 h-8 rounded-full bg-${pattern.color}-100 flex items-center justify-center`}>
                                  {key === 'relaxed' && <FaLungs className={`text-${pattern.color}-600`} size={14} />}
                                  {key === 'box' && <svg className={`text-${pattern.color}-600`} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                  </svg>}
                                  {key === 'energizing' && <svg className={`text-${pattern.color}-600`} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 3L4 14H12L11 21L20 10H12L13 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>}
                                </div>
                                <h3 className={`font-semibold text-${pattern.color}-700 text-lg`}>
                                  {pattern.name}
                                </h3>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-4 flex-grow">
                                {pattern.description}
                              </p>
                              
                              {/* Breathing cycle visualization */}
                              <div className="mt-auto">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-xs font-medium text-${pattern.color}-600`}>Breathing Cycle</span>
                                  <span className="text-xs text-gray-500">{pattern.inhaleTime + pattern.holdTime + pattern.exhaleTime + pattern.pauseTime}s</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                  <div className={`h-full bg-blue-500`} style={{width: `${(pattern.inhaleTime / (pattern.inhaleTime + pattern.holdTime + pattern.exhaleTime + pattern.pauseTime)) * 100}%`}}></div>
                                  <div className={`h-full bg-${pattern.color}-500`} style={{width: `${(pattern.holdTime / (pattern.inhaleTime + pattern.holdTime + pattern.exhaleTime + pattern.pauseTime)) * 100}%`}}></div>
                                  <div className={`h-full bg-green-500`} style={{width: `${(pattern.exhaleTime / (pattern.inhaleTime + pattern.holdTime + pattern.exhaleTime + pattern.pauseTime)) * 100}%`}}></div>
                                  <div className={`h-full bg-gray-300`} style={{width: `${(pattern.pauseTime / (pattern.inhaleTime + pattern.holdTime + pattern.exhaleTime + pattern.pauseTime)) * 100}%`}}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                  <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                                    <span>{pattern.inhaleTime}s</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
                                    <span>{pattern.holdTime}s</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                                    <span>{pattern.exhaleTime}s</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Selected indicator */}
                              {isSelected && (
                                <div className="absolute top-3 right-3">
                                  <div className={`w-6 h-6 rounded-full bg-${pattern.color}-500 text-white flex items-center justify-center`}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
              </div>
            </div>
          )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-8 mx-auto max-w-md">
                      <Button 
                        onClick={startGuidedBreathing}
                        variant="default"
                        size="xl"
                        icon={<FaPlay />}
                        className="w-full"
                      >
                        Start Breathing Exercise
                      </Button>
                    </div>
                  </motion.div>
                )}

                {isRunning && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-xl flex flex-col items-center"
                  >
                    <div className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-xl font-medium text-purple-800 shadow-inner">
                      {breathingPhase === "inhale" && 
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key="inhale"
                          className="flex items-center gap-2"
                        >
                          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                          Breathe In Slowly
                        </motion.div>
                      }
                      {breathingPhase === "hold" && 
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key="hold"
                          className="flex items-center gap-2"
                        >
                          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                          Hold Your Breath
                        </motion.div>
                      }
                      {breathingPhase === "exhale" && 
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key="exhale"
                          className="flex items-center gap-2"
                        >
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                          Exhale Slowly
                        </motion.div>
                      }
                      {breathingPhase === "pause" && 
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key="pause"
                          className="flex items-center gap-2"
                        >
                          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                          Pause
                        </motion.div>
                      }
                    </div>
                    
                    <div className="relative w-full flex justify-center py-8">
                      {/* Background elements */}
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-purple-50 to-blue-50 animate-pulse-slow opacity-20"></div>
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0, -5, 0],
                          }}
                          transition={{
                            duration: 10,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                          className="absolute w-[120%] h-[120%] bottom-[-10%] left-[-10%] rounded-full bg-gradient-to-tr from-blue-50 to-purple-50 opacity-10"
                        ></motion.div>
                      </div>

                      <BreathingAnimation 
                        state={breathingPhase} 
                        size={280}
                        primaryColor={breathingPatterns[guidedPattern].color}
                      />
                    </div>
                    
                    {/* Progress indicator with phase timer */}
                    <div className="w-full max-w-lg">
                      <div className="relative h-4 w-full rounded-full bg-gray-100 overflow-hidden mt-10 shadow-inner">
                        <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ 
                            duration: 
                              breathingPhase === "inhale" 
                                ? breathingPatterns[guidedPattern].inhaleTime 
                                : breathingPhase === "hold" 
                                ? breathingPatterns[guidedPattern].holdTime
                                : breathingPhase === "exhale"
                                ? breathingPatterns[guidedPattern].exhaleTime
                                : breathingPatterns[guidedPattern].pauseTime,
                            ease: "linear"
                          }}
                          className={`h-full rounded-full ${
                            breathingPhase === "inhale" 
                              ? "bg-blue-500 progress-solid" 
                              : breathingPhase === "hold" 
                              ? "bg-purple-500 progress-solid"
                              : breathingPhase === "exhale"
                              ? "bg-green-500 progress-solid"
                              : "bg-gray-400 progress-solid"
                          }`}
                        />
                        
                        {/* Countdown timer display */}
                        <CountdownTimer 
                          phase={breathingPhase}
                          pattern={breathingPatterns[guidedPattern]}
                        />
                      </div>
                    </div>
                    
                    {/* Phase legend */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-lg">
                      <div className={`p-3 bg-blue-50 rounded-lg border border-blue-100 text-center ${breathingPhase === "inhale" ? "ring-2 ring-blue-300" : ""}`}>
                        <span className="block text-xs text-blue-600 uppercase font-semibold tracking-wider mb-1">Inhale</span>
                        <span className="block text-lg text-blue-700 font-bold">{breathingPatterns[guidedPattern].inhaleTime}s</span>
                      </div>
                      <div className={`p-3 bg-purple-50 rounded-lg border border-purple-100 text-center ${breathingPhase === "hold" ? "ring-2 ring-purple-300" : ""}`}>
                        <span className="block text-xs text-purple-600 uppercase font-semibold tracking-wider mb-1">Hold</span>
                        <span className="block text-lg text-purple-700 font-bold">{breathingPatterns[guidedPattern].holdTime}s</span>
                      </div>
                      <div className={`p-3 bg-green-50 rounded-lg border border-green-100 text-center ${breathingPhase === "exhale" ? "ring-2 ring-green-300" : ""}`}>
                        <span className="block text-xs text-green-600 uppercase font-semibold tracking-wider mb-1">Exhale</span>
                        <span className="block text-lg text-green-700 font-bold">{breathingPatterns[guidedPattern].exhaleTime}s</span>
                      </div>
                      <div className={`p-3 bg-gray-50 rounded-lg border border-gray-200 text-center ${breathingPhase === "pause" ? "ring-2 ring-gray-300" : ""}`}>
                        <span className="block text-xs text-gray-600 uppercase font-semibold tracking-wider mb-1">Pause</span>
                        <span className="block text-lg text-gray-700 font-bold">{breathingPatterns[guidedPattern].pauseTime}s</span>
                    </div>
                  </div>
                    
                    <div className="mt-8 flex gap-4">
                <Button
                        onClick={stopGuidedBreathing}
                        variant="danger"
                        size="xl"
                        icon={<FaStop />}
                        className="min-w-[180px]"
                      >
                        Stop
                </Button>
                    </div>
                  </motion.div>
                )}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
          {assessment && !showSurvey && (
            <ResultCard 
              status={assessment.status} 
              message={assessment.message}
              color={assessment.color}
              onTakeSurvey={() => startSurvey()}
              onConnectHospitals={handleConnectHospitals}
              surveyButtonText={t('assessments.takeSurvey')}
              connectButtonText={t('assessments.connectHospitals')}
            />
          )}

          {showSurvey && (
            <SurveyCard 
              questions={surveyType === 'breathing' ? shortnessQuestions : generalQuestions}
              onComplete={handleSurveyComplete}
            />
          )}
        </>
      ) : (
        <HospitalConnect onBack={handleBackFromHospitals} />
      )}
    </motion.div>
  );
}

// Countdown timer component for guided breathing
const CountdownTimer = ({ phase, pattern }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  
  useEffect(() => {
    let duration = 0;
    switch(phase) {
      case 'inhale': duration = pattern.inhaleTime; break;
      case 'hold': duration = pattern.holdTime; break;
      case 'exhale': duration = pattern.exhaleTime; break;
      case 'pause': duration = pattern.pauseTime; break;
      default: duration = 0;
    }
    
    setTimeLeft(duration);
    
    if (duration <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [phase, pattern]);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className={`text-xs font-bold ${
        phase === 'inhale' ? 'text-white' :
        phase === 'hold' ? 'text-white' :
        phase === 'exhale' ? 'text-white' :
        'text-gray-600'
      }`}>
        {timeLeft.toFixed(1)}s
      </div>
    </div>
  );
};
 
