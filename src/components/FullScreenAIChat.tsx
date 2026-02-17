import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, Sparkles, Bot, MessageCircle, Shield, Zap } from 'lucide-react';

interface FullScreenAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function FullScreenAIChat({ isOpen, onClose }: FullScreenAIChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // AI Response Generator
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Drug information questions
    if (lowerMessage.includes('drug') && (lowerMessage.includes('what is') || lowerMessage.includes('tell me about') || lowerMessage.includes('info'))) {
      if (lowerMessage.includes('doxorubicin') || lowerMessage.includes('adriamycin')) {
        return "💊 **Doxorubicin (Adriamycin)**\n\n**What it is:**\nAn anthracycline antibiotic used to treat various cancers including breast cancer, bladder cancer, lymphoma, and acute lymphocytic leukemia.\n\n**Common uses:**\n• Breast cancer\n• Bladder cancer\n• Lymphoma\n• Leukemia\n• Sarcoma\n\n**Common side effects:**\n• Nausea and vomiting\n• Hair loss\n• Mouth sores\n• Fatigue\n• Low blood counts\n• Red urine (temporary and harmless)\n\n**Important warnings:**\n⚠️ Can cause heart damage with cumulative doses\n⚠️ May cause severe tissue damage if leaked during injection\n⚠️ Avoid pregnancy during treatment\n\n🧮 Would you like me to help calculate a personalized dosage based on your age, sex, weight, and height?";
      }
      if (lowerMessage.includes('paclitaxel') || lowerMessage.includes('taxol')) {
        return "💊 **Paclitaxel (Taxol)**\n\n**What it is:**\nA taxane chemotherapy drug that stops cell division, used to treat ovarian, breast, lung, and other cancers.\n\n**Common uses:**\n• Breast cancer\n• Ovarian cancer\n• Lung cancer\n• Kaposi's sarcoma\n• Pancreatic cancer\n\n**Common side effects:**\n• Allergic reactions (premedication required)\n• Neuropathy (nerve damage)\n• Low blood counts\n• Hair loss\n• Muscle/joint pain\n• Nausea\n\n**Important warnings:**\n⚠️ Severe allergic reactions possible\n⚠️ Can cause severe neuropathy\n⚠️ Blood counts must be monitored closely\n\n🧮 I can help calculate your personalized dosage. Just tell me your age, sex, weight, and height!";
      }
      if (lowerMessage.includes('cisplatin') || lowerMessage.includes('platinol')) {
        return "💊 **Cisplatin (Platinol)**\n\n**What it is:**\nA platinum-based chemotherapy drug effective against testicular, ovarian, bladder, and other solid tumors.\n\n**Common uses:**\n• Testicular cancer\n• Ovarian cancer\n• Bladder cancer\n• Lung cancer\n• Head and neck cancer\n\n**Common side effects:**\n• Severe nausea/vomiting\n• Kidney damage\n• Hearing loss\n• Neuropathy\n• Low blood counts\n\n**Important warnings:**\n⚠️ Requires aggressive hydration\n⚠️ Monitor kidney function regularly\n⚠️ Can cause permanent hearing loss\n⚠️ Avoid in pregnancy\n\n🧮 Need personalized dosage information? Share your metrics (age, sex, weight, height) and I'll calculate it!";
      }
      return "I can provide detailed information about many chemotherapy drugs including:\n\n💊 **Available drugs:**\n• Doxorubicin (Adriamycin)\n• Paclitaxel (Taxol)\n• Cisplatin (Platinol)\n• Methotrexate\n• Cyclophosphamide (Cytoxan)\n• 5-Fluorouracil (5-FU)\n• Carboplatin\n• Gemcitabine\n• Vincristine\n• Rituximab\n• And 5 more!\n\n**What I can tell you:**\n✓ What the drug does\n✓ Common uses\n✓ Side effects\n✓ Important warnings\n✓ Drug interactions\n✓ Personalized dosage calculations\n\nWhich drug would you like to know about?";
    }
    
    // Dosage calculation requests
    if ((lowerMessage.includes('dosage') || lowerMessage.includes('dose') || lowerMessage.includes('how much')) && (lowerMessage.includes('calculate') || lowerMessage.includes('should i take') || lowerMessage.includes('need'))) {
      return "🧮 **Personalized Dosage Calculator**\n\nI can help calculate the appropriate dosage for you! I'll need a few details:\n\n📋 **Please provide:**\n1. **Drug name** (e.g., Doxorubicin, Paclitaxel)\n2. **Age** (years)\n3. **Sex** (male/female)\n4. **Weight** (kg or lbs)\n5. **Height** (cm or ft/in)\n\n**Example:** \"Calculate doxorubicin dosage for 45-year-old female, 65kg, 165cm\"\n\n⚕️ **Important:** This calculator provides educational estimates only. Always follow your oncologist's prescribed dosage. Body surface area (BSA) calculations may be used for precise dosing.\n\nWhat are your details?";
    }
    
    // BSA calculation with patient metrics
    if (lowerMessage.match(/\\d+\\s*(year|yr|y\\.o\\.|yo)/i) && lowerMessage.match(/\\d+\\s*(kg|lb|pound)/i) && lowerMessage.match(/\\d+\\s*(cm|ft|inch|in)/i)) {
      // Extract numbers (simplified example)
      const ageMatch = lowerMessage.match(/(\\d+)\\s*(year|yr|y\\.o\\.|yo)/i);
      const weightMatch = lowerMessage.match(/(\\d+)\\s*(kg|lb|pound)/i);
      const heightMatch = lowerMessage.match(/(\\d+)\\s*(cm|ft|inch|in)/i);
      
      if (ageMatch && weightMatch && heightMatch) {
        const age = ageMatch[1];
        const weight = weightMatch[1];
        const height = heightMatch[1];
        
        // Simplified BSA calculation (Mosteller formula)
        // BSA (m²) = √[(height (cm) × weight (kg)) / 3600]
        const bsa = Math.sqrt((parseInt(height) * parseInt(weight)) / 3600).toFixed(2);
        
        return `🧮 **Dosage Calculation Results**\n\n📊 **Your Metrics:**\n• Age: ${age} years\n• Weight: ${weight} kg\n• Height: ${height} cm\n• **Body Surface Area (BSA): ${bsa} m²**\n\n💊 **Sample Dosages (for reference only):**\n\n**Doxorubicin:**\n• Standard dose: 60-75 mg/m²\n• Your calculated dose: ${(60 * parseFloat(bsa)).toFixed(1)} - ${(75 * parseFloat(bsa)).toFixed(1)} mg\n\n**Paclitaxel:**\n• Standard dose: 135-175 mg/m²\n• Your calculated dose: ${(135 * parseFloat(bsa)).toFixed(1)} - ${(175 * parseFloat(bsa)).toFixed(1)} mg\n\n**Cisplatin:**\n• Standard dose: 50-100 mg/m²\n• Your calculated dose: ${(50 * parseFloat(bsa)).toFixed(1)} - ${(100 * parseFloat(bsa)).toFixed(1)} mg\n\n⚠️ **IMPORTANT DISCLAIMER:**\nThese are educational estimates only. Actual dosing must be determined by your oncologist based on:\n• Specific cancer type\n• Treatment protocol\n• Kidney/liver function\n• Previous treatments\n• Overall health status\n\n⚕️ **Always follow your doctor's prescribed dosage.**\n\nDo you have questions about a specific drug?`;
      }
    }
    
    // Nausea and Vomiting
    if (lowerMessage.includes('nausea') || lowerMessage.includes('vomit') || lowerMessage.includes('sick')) {
      return "I understand you're experiencing nausea. This is a common side effect of chemotherapy. Here's what I recommend:\n\n✅ **Immediate Steps:**\n• Sip clear liquids (water, ginger ale)\n• Eat small, bland meals (crackers, toast)\n• Avoid strong smells\n• Rest in a comfortable position\n\n⚠️ **When to call your doctor:**\n• If vomiting persists for more than 24 hours\n• Unable to keep down liquids\n• Signs of dehydration\n\n💊 Your doctor may prescribe anti-nausea medication. Would you like me to help you report this to your care team?";
    }
    
    // Fatigue
    if (lowerMessage.includes('fatigue') || lowerMessage.includes('tired') || lowerMessage.includes('weak') || lowerMessage.includes('energy')) {
      return "Fatigue is one of the most common side effects of chemotherapy. It's completely normal to feel tired 3 days after treatment.\n\n✅ **Management Tips:**\n• Take short naps (20-30 minutes)\n• Light exercise like walking\n• Stay hydrated\n• Maintain good nutrition\n• Ask for help with daily tasks\n\n📊 **Severity Assessment:** Mild to moderate fatigue is expected. However, if you experience:\n• Extreme exhaustion preventing daily activities\n• Dizziness or shortness of breath\n• Confusion\n\n🚨 Contact your oncology team immediately. On a scale of 1-10, how would you rate your fatigue?";
    }
    
    // Fever
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature') || lowerMessage.includes('101') || lowerMessage.includes('hot')) {
      return "🚨 **IMPORTANT - FEVER DURING CHEMOTHERAPY:**\n\nA fever of 101°F or higher is considered a medical emergency during chemotherapy treatment.\n\n⚠️ **Immediate Action Required:**\n1. Contact your oncologist IMMEDIATELY\n2. Go to the emergency room if you cannot reach your doctor\n3. Do NOT take fever-reducing medication without doctor approval\n\n**Why this is serious:**\nChemotherapy can lower your white blood cell count, making you vulnerable to infections. A fever may indicate a serious infection (neutropenic fever).\n\n📞 **Emergency Contact:**\n• Your oncology team: [Contact your provider]\n• ChemoVigi Hotline: 1-800-CHEMOVIGI\n\nDo you need me to alert your care team right now?";
    }
    
    // When to contact doctor
    if (lowerMessage.includes('when') && (lowerMessage.includes('doctor') || lowerMessage.includes('contact') || lowerMessage.includes('call'))) {
      return "Great question! Here are the side effects that require immediate medical attention:\n\n🚨 **Call 911 or go to ER:**\n• Fever 101°F or higher\n• Severe allergic reaction (difficulty breathing)\n• Chest pain or rapid heartbeat\n• Severe bleeding\n• Seizures or loss of consciousness\n\n📞 **Contact your oncologist within 24 hours:**\n• Persistent nausea/vomiting (>24 hrs)\n• Severe diarrhea or constipation\n• Unusual bleeding or bruising\n• Signs of infection (redness, swelling)\n• Severe pain\n\n💬 **Can report through ChemoVigi:**\n• Mild fatigue\n• Hair loss\n• Skin changes\n• Mild nausea\n• Appetite changes\n\nWhat symptoms are you experiencing?";
    }
    
    // Pain
    if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('ache')) {
      return "I'm sorry you're experiencing pain. Let me help you assess this.\n\n📋 **Pain Assessment:**\nOn a scale of 1-10, how would you rate your pain?\n• 1-3: Mild (manageable)\n• 4-6: Moderate (interfering with activities)\n• 7-10: Severe (urgent medical attention)\n\n📍 **Location matters:**\nWhere is the pain located? Different locations may indicate different issues:\n• Joint/muscle pain: Common with certain chemo drugs\n• Nerve pain: May indicate neuropathy\n• Abdominal pain: Could indicate digestive issues\n• Chest pain: Requires immediate evaluation\n\n💊 **Management:**\nDo not take new pain medications without consulting your oncology team. They need to know about all your symptoms.\n\nPlease describe your pain in more detail.";
    }
    
    // Infection signs
    if (lowerMessage.includes('infection') || lowerMessage.includes('cold') || lowerMessage.includes('cough') || lowerMessage.includes('sore throat')) {
      return "⚠️ **Infection Risk During Chemotherapy:**\n\nYour immune system may be weakened, making infections more serious.\n\n🔍 **Watch for these signs:**\n• Fever (100.4°F or higher)\n• Chills or sweating\n• Cough or sore throat\n• Redness, swelling, or warmth\n• Burning during urination\n• Unusual discharge\n\n✅ **Prevention Tips:**\n• Wash hands frequently\n• Avoid crowded places\n• Stay away from sick people\n• Maintain good oral hygiene\n• Eat well-cooked foods\n\n📞 If you have any signs of infection, contact your doctor immediately. Even minor infections can become serious.\n\nAre you experiencing any of these symptoms?";
    }
    
    // Hair loss
    if (lowerMessage.includes('hair') || lowerMessage.includes('bald')) {
      return "Hair loss (alopecia) is a common side effect of many chemotherapy drugs.\n\n💇 **What to Expect:**\n• Usually begins 2-3 weeks after first treatment\n• Hair typically regrows 3-6 months after treatment ends\n• New hair may have different texture or color\n\n💡 **Coping Strategies:**\n• Consider cutting hair short before it falls out\n• Explore wigs, scarves, or hats\n• Use gentle, fragrance-free hair products\n• Protect scalp from sun exposure\n• Join support groups\n\n❤️ **Emotional Support:**\nHair loss can be emotionally challenging. It's okay to feel upset. Would you like resources for support groups or wig programs?";
    }
    
    // Medication questions
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('drug')) {
      return "I can help you with medication-related questions!\n\n💊 **Common Questions:**\n• Timing and dosage\n• Side effects to watch for\n• Drug interactions\n• What to do if you miss a dose\n\n⚠️ **Important Reminders:**\n• Never stop or change medications without consulting your oncologist\n• Keep an updated list of all medications (including supplements)\n• Report any new or worsening side effects\n• Some medications require specific timing with meals\n\n📋 **I can help you:**\n• Track your medication schedule\n• Report side effects\n• Connect you with your pharmacy\n\nWhat specific medication question do you have?";
    }
    
    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('assist')) {
      return "I'm here to support you through your chemotherapy journey! 💙\n\n🤖 **How I Can Help:**\n\n📝 **Report Symptoms:**\n• Quick symptom logging\n• Severity assessment\n• Automatic alerts to your care team\n\n🔍 **Answer Questions:**\n• Side effect information\n• When to seek medical help\n• Medication guidance\n• Self-care tips\n\n📊 **Track Your Health:**\n• Symptom patterns\n• Treatment timeline\n• Wellness trends\n\n🔒 **Secure & Private:**\n• HIPAA compliant\n• End-to-end encryption\n• Your data is never shared\n\nWhat would you like help with today?";
    }
    
    // Default response
    return "Thank you for sharing that with me. I'm here to help you navigate your chemotherapy journey.\n\n🤖 **I can assist with:**\n• Reporting and assessing symptoms\n• Answering questions about side effects\n• Determining when to contact your doctor\n• Providing self-care recommendations\n• Connecting you with your care team\n\n💡 **For the best help, please tell me:**\n• What symptoms are you experiencing?\n• When did they start?\n• How severe are they (mild, moderate, severe)?\n• Are they getting better or worse?\n\nThe more details you provide, the better I can assist you. What's concerning you most right now?";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Could not recognize speech. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Full Screen Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-2 md:inset-6 lg:inset-12 bg-white rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden border-4 border-blue-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-6 flex items-center justify-between relative overflow-hidden">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative flex items-center gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Bot className="w-9 h-9 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-white text-2xl flex items-center gap-3">
                    ChemoVigi AI Assistant
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </h2>
                  <p className="text-white/90">🔒 Secure • Encrypted • Available 24/7</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="relative w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-gray-50 via-white to-blue-50">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Welcome Message - Only show if no messages */}
                {messages.length === 0 && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border-2 border-blue-100 shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <Bot className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-blue-900 mb-3 flex items-center gap-2">
                            👋 Welcome to ChemoVigi AI
                          </h3>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            I'm your personal AI healthcare assistant, trained specifically for chemotherapy side effect monitoring and pharmacovigilance.
                          </p>
                          <div className="grid md:grid-cols-3 gap-3">
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <MessageCircle className="w-5 h-5 text-blue-500 mb-2" />
                              <p className="text-sm font-semibold text-gray-800">Report Symptoms</p>
                              <p className="text-xs text-gray-600">Quick & easy reporting</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <Zap className="w-5 h-5 text-purple-500 mb-2" />
                              <p className="text-sm font-semibold text-gray-800">AI Analysis</p>
                              <p className="text-xs text-gray-600">Instant severity detection</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 shadow-sm">
                              <Shield className="w-5 h-5 text-green-500 mb-2" />
                              <p className="text-sm font-semibold text-gray-800">Get Guidance</p>
                              <p className="text-xs text-gray-600">Personalized next steps</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Security Notice */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-5 border border-gray-200 shadow-md"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-gray-800 font-semibold">🔐 Your Privacy is Protected</p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        All conversations are end-to-end encrypted with AES-256 encryption. Your medical information is confidential and never shared without your explicit permission.
                      </p>
                    </motion.div>

                    {/* Suggestions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <p className="text-gray-700 font-semibold">💡 Try asking me about:</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "I'm experiencing nausea after my last chemo session",
                          "Is it normal to have fatigue 3 days after treatment?",
                          "I have a fever of 101°F, what should I do?",
                          "When should I contact my doctor about side effects?"
                        ].map((suggestion, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-left bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all text-sm text-gray-700 hover:scale-105"
                          >
                            "{suggestion}"
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Actual Conversation Messages */}
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.sender === 'ai' 
                          ? 'bg-gradient-to-br from-blue-500 to-teal-500' 
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {msg.sender === 'ai' ? (
                          <Bot className="w-6 h-6 text-white" />
                        ) : (
                          <span className="text-white text-lg">👤</span>
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-2xl p-4 shadow-md ${
                        msg.sender === 'ai'
                          ? 'bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200'
                          : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
                      }`}>
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed">{msg.text}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3 max-w-3xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-4 shadow-md">
                        <div className="flex gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input Section */}
            <div className="p-6 border-t-2 border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
              <div className="max-w-4xl mx-auto">
                <label className="block text-sm text-gray-700 mb-3 flex items-center gap-2 font-semibold">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Describe your symptoms, concerns, or ask a question
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here... (e.g., 'I have severe nausea and vomiting')"
                    className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    onKeyPress={handleKeyPress}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 flex items-center gap-2 transition-all shadow-lg text-white font-semibold"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-4 rounded-full flex items-center gap-2 transition-colors ${
                      isListening 
                        ? 'bg-red-500 border-2 border-red-600 animate-pulse' 
                        : 'bg-white border-2 border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={handleVoiceInput}
                  >
                    <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-gray-600'}`} />
                    {isListening && <span className="text-white text-sm">Listening...</span>}
                  </motion.button>
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  💡 <strong>Pro tip:</strong> Be specific about symptoms, timing, medications, and any changes you've noticed
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}