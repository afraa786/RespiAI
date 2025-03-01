import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your Respiratory Health Assistant. I can help you understand various respiratory conditions and how to manage them in high pollution environments. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);

    // Simulate bot response (replace with actual AI integration)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'I understand you want to know more about respiratory health. While I\'m being developed to provide more specific information, please consult with healthcare professionals for medical advice.'
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-purple-600 p-4 text-white">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-2xl" />
              <h2 className="text-xl font-semibold">Respiratory Health AI Assistant</h2>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-purple-600' : 'bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <FaUser className="text-white text-sm" />
                    ) : (
                      <FaRobot className="text-gray-600 text-sm" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question about respiratory health..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>This AI assistant is for informational purposes only.</p>
          <p>For medical emergencies, please contact your healthcare provider immediately.</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
