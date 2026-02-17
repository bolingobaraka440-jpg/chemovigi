import React from 'react';
import { FileText, Brain, Shield, MessageSquare, AlertCircle, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Quick & Easy Reporting',
      description: 'Submit chemotherapy side effects or symptoms using one simple message.',
    },
    {
      icon: AlertCircle,
      title: 'AI-Powered Severity Detection',
      description: 'Our AI analyzes symptom severity, detects risks, and suggests next actions.',
    },
    {
      icon: Lock,
      title: 'Secure Patient Accounts',
      description: 'Encrypted data, role-based access, and secure communication between patients and clinicians.',
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-blue-600 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}