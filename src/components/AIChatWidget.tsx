import React, { useState } from 'react';
import { MessageCircle, X, Send, Mic, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIChatWidgetProps {
  onOpenChat?: () => void;
}

export function AIChatWidget({ onOpenChat }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Close when clicking outside
  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Minimized Chat Button with Enhanced Animation - BIGGER SIZE */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-8 right-8 z-50">
            {/* Pulsing Rings - Larger */}
            <motion.div
              className="absolute inset-0 w-28 h-28 -left-3 -top-3"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-30" />
            </motion.div>

            <motion.div
              className="absolute inset-0 w-28 h-28 -left-3 -top-3"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-20" />
            </motion.div>

            {/* Main Button - Larger */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                y: [0, -8, 0],
              }}
              exit={{ scale: 0 }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              onClick={handleClick}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-teal-600 to-green-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
              style={{
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.5), 0 0 60px rgba(20, 184, 166, 0.3)'
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <MessageCircle className="w-10 h-10 relative z-10" />
              
              {/* AI Badge - Larger */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-2 py-1 text-xs font-bold shadow-lg flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI</span>
              </motion.div>
            </motion.button>

            {/* Tooltip - Larger */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-24 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl whitespace-nowrap"
            >
              <span className="text-sm font-medium">💬 Need help? Ask our AI!</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-900"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window - BIGGER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-8 right-8 w-[440px] h-[650px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-blue-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600 p-4 flex items-center justify-between relative overflow-hidden">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white flex items-center gap-2">
                    ChemoVigi AI
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </h3>
                  <p className="text-white/80 text-xs">Secure chat • Always available</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4 mb-3 border border-blue-100"
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 mb-2">
                      👋 Hello! I'm your AI healthcare assistant.
                    </p>
                    <p className="text-sm text-gray-700">
                      I can help you report side effects, answer questions about medication safety, and provide immediate guidance.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-xs text-gray-600">🔒 End-to-end encrypted</p>
                </div>
                <p className="text-sm text-gray-600">
                  Your conversation is completely confidential and protected.
                </p>
              </motion.div>
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <label className="block text-xs text-gray-600 mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" />
                Describe your symptoms or concerns
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 flex items-center justify-center transition-all shadow-lg"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 hover:border-blue-500 flex items-center justify-center transition-colors"
                >
                  <Mic className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                💡 Be specific about symptoms, timing, and medications
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}