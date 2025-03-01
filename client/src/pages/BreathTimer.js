import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { CircularProgress } from "../components/ui/circular-progress";
import { BreathingAnimation } from "../components/ui/breathing-animation";
import { ResultCard } from "../components/ui/result-card";
import { SurveyCard } from "../components/ui/survey-card";
import { FaPlay, FaStop, FaRedo, FaLungs, FaInfoCircle, FaChartLine } from "react-icons/fa";

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
        status: "Severe Concern",
        message: "Your breath-holding time is significantly reduced, which could indicate respiratory issues. This may be related to existing respiratory conditions or environmental factors. Please complete the assessment survey for a more detailed analysis.",
        color: "text-red-600"
      };
    } else if (lastDuration < 15) {
      return {
        status: "Moderate Concern",
        message: "Your breath-holding capacity is below average. While this isn't necessarily alarming, it could indicate minor respiratory issues. Regular monitoring is recommended.",
        color: "text-yellow-600"
      };
    } else {
      return {
        status: "Normal Range",
        message: "Your breath-holding time is within the normal range. This suggests good respiratory function. Continue to monitor regularly for any changes.",
        color: "text-green-600"
      };
    }
  };

  // Handle survey completion
  const handleSurveyComplete = (responses) => {
    setSurveyResponses(responses);
    setShowSurvey(false);
    // Here you would typically send this data to your backend for analysis
    console.log("Survey responses:", responses);
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
    <div className="min-h-screen pt-16 pb-10 px-4 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 mb-4">
          Breath Test
        </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor your breathing capacity to detect potential respiratory conditions and track how air quality might affect your respiratory health.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 grid grid-cols-2 gap-1 w-full max-w-md">
            <button 
              onClick={() => setActiveTab("timer")}
              className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === "timer" 
                  ? "bg-purple-600 text-white font-medium shadow-md" 
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              <FaChartLine /> Breath Hold Timer
            </button>
            <button 
              onClick={() => setActiveTab("guided")}
              className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === "guided" 
                  ? "bg-purple-600 text-white font-medium shadow-md" 
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              <FaLungs /> Guided Breathing
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "timer" ? (
            <motion.div
              key="timer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-purple-800 mb-2">Breath Hold Test</h2>
                  <p className="text-gray-600 text-center max-w-lg mb-2">
                    Measures how long you can comfortably hold your breath after a normal inhale. Reduced capacity could be an early sign of respiratory issues.
                  </p>
                </div>
                
                {!isRunning && !lastDuration && !isInCountdown && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-purple-50 p-4 rounded-xl max-w-lg w-full text-center shadow-inner"
                  >
                    <h3 className="text-xl font-semibold text-purple-700 mb-4">How to Perform the Test</h3>
                    <ol className="text-left space-y-4 text-purple-800">
                      <motion.li 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-medium shrink-0 mt-0.5">1</span>
                        <span>Sit comfortably and take a few normal breaths to relax</span>
                      </motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-3"
                      >
                        <span className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-medium shrink-0 mt-0.5">2</span>
                        <span>Click "Start" and take a normal breath in (not too deep)</span>
                      </motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <span className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-medium shrink-0 mt-0.5">3</span>
                        <span>Hold your breath as long as comfortable (don't strain)</span>
                      </motion.li>
                      <motion.li 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <span className="bg-purple-200 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-medium shrink-0 mt-0.5">4</span>
                        <span>Click "Stop" when you need to exhale</span>
                      </motion.li>
              </ol>
                  </motion.div>
                )}

                {isInCountdown && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="absolute text-8xl font-bold text-purple-800 animate-pulse">
                      {countdown}
            </div>
                    <CircularProgress 
                      value={3 - countdown} 
                      max={3} 
                      size={300} 
                      strokeWidth={20}
                      animated={true}
                      primaryColor="purple"
                      secondaryColor="indigo"
                    />
                  </motion.div>
                )}

                {isRunning && !isInCountdown && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                  >
            <CircularProgress 
              value={time} 
              max={60} 
              size={300} 
              strokeWidth={20}
                      animated={true}
                      primaryColor="purple"
                      secondaryColor="indigo"
            >
              <div className="text-center">
                        <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">{time}</div>
                        <div className="text-2xl text-purple-600 mt-2 font-medium">seconds</div>
              </div>
            </CircularProgress>
                  </motion.div>
                )}

                {lastDuration && assessment && !showSurvey && (
                  <ResultCard 
                    result={assessment} 
                    duration={lastDuration}
                    onTakeSurvey={startSurvey} 
                  />
                )}

          <div className="flex gap-4">
                  {!isRunning && !lastDuration && !isInCountdown && (
              <Button 
                onClick={startTimer}
                      variant="default"
                      size="xl"
                      icon={<FaPlay />}
                      className="min-w-[180px]"
              >
                      Start Test
              </Button>
            )}
                  
                  {(isRunning || isInCountdown) && (
              <Button
                onClick={stopTimer}
                      variant="danger"
                      size="xl"
                      icon={<FaStop />}
                      className="min-w-[180px]"
              >
                      Stop
              </Button>
            )}
                  
            {lastDuration && (
              <Button
                onClick={resetTimer}
                      variant="outline"
                      size="xl"
                      icon={<FaRedo />}
                      className="min-w-[180px]"
              >
                      Try Again
              </Button>
            )}
          </div>

                {showSurvey && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-8"
                  >
                    <SurveyCard 
                      questions={surveyType === "shortness" ? shortnessQuestions : generalQuestions}
                      onComplete={handleSurveyComplete}
                      title={surveyType === "shortness" ? "Breathing Difficulty Assessment" : "General Symptoms Assessment"}
                      primaryColor="purple"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 bg-white p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <FaInfoCircle className="text-purple-600" />
            Why Monitoring Breath Capacity Matters
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            Breathing difficulties can be an early warning sign of respiratory conditions. Regular monitoring of your breath-holding capacity can help detect potential respiratory issues before they become severe, especially in areas with high air pollution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm border border-green-200"
            >
              <h4 className="font-semibold text-green-800 mb-2 text-lg">Normal Range</h4>
              <p className="text-green-700">15+ seconds</p>
              <p className="text-sm text-green-600 mt-2">Good respiratory function</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-sm border border-yellow-200"
            >
              <h4 className="font-semibold text-yellow-800 mb-2 text-lg">Moderate Concern</h4>
              <p className="text-yellow-700">10-15 seconds</p>
              <p className="text-sm text-yellow-600 mt-2">Possible minor respiratory issues</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-sm border border-red-200"
            >
              <h4 className="font-semibold text-red-800 mb-2 text-lg">High Concern</h4>
              <p className="text-red-700">Less than 10 seconds</p>
              <p className="text-sm text-red-600 mt-2">Potential respiratory issues - seek medical advice</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        .progress-solid {
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          opacity: 1 !important;
        }
      `}</style>
    </div>
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
 
