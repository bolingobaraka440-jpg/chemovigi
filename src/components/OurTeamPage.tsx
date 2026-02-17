import React from 'react';
import { motion } from 'motion/react';
import { Code, Shield, Brain, Award, Mail, Phone, Linkedin, Github } from 'lucide-react';

export function OurTeamPage() {
  const team = [
    {
      name: 'Manisha Prince',
      role: 'Project Lead & Vision Director',
      description: 'Guiding the ChemoVigi mission with strategic oversight and innovative direction.',
      phone: '0780606332',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      name: 'Baraka Bolingo',
      role: 'Lead Developer',
      description: 'Architecting and building the core platform with cutting-edge web technologies.',
      phone: '0795127587',
      email: 'bolingobaraka440@gmail.com',
      icon: Code,
      color: 'from-blue-500 to-teal-500',
      gradient: 'from-blue-50 to-teal-50'
    },
    {
      name: 'Elie Uwimana',
      role: 'System Security Tester',
      description: 'Ensuring hospital-grade security and protecting patient data with rigorous testing.',
      phone: '0788330973',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-50 to-emerald-50'
    },
    {
      name: 'Yvon Gatete',
      role: 'AI Development & Integration',
      description: 'Building intelligent systems that analyze symptoms and predict severity with precision.',
      phone: '+1(646) 565-1177',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl text-blue-800 mb-6 font-extrabold">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A passionate group of innovators dedicated to transforming chemotherapy care through technology, 
            compassion, and cutting-edge AI.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`bg-gradient-to-br ${member.gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white`}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                className="mb-6"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <member.icon className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Info */}
              <h3 className="text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 mb-4">{member.role}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>

              {/* Contact */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <a href={`tel:${member.phone}`} className="hover:text-blue-600 transition-colors">
                    {member.phone}
                  </a>
                </div>
                {member.email && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${member.email}`} className="hover:text-blue-600 transition-colors">
                      {member.email}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-3xl p-12 text-white shadow-2xl mb-16"
        >
          <h2 className="text-white text-center mb-8">Our Mission</h2>
          <p className="text-white/90 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            We believe technology can save lives. ChemoVigi was born from a simple but powerful idea: 
            every chemotherapy patient deserves immediate access to intelligent symptom monitoring and 
            personalized care guidance. Our team combines medical expertise, AI innovation, and 
            unwavering commitment to patient safety to make this vision a reality.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-blue-800 text-center mb-12">What Drives Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Patient First',
                description: 'Every decision we make prioritizes patient safety, privacy, and well-being.',
                icon: '❤️'
              },
              {
                title: 'Innovation with Care',
                description: 'We push technological boundaries while never losing sight of human compassion.',
                icon: '🚀'
              },
              {
                title: 'Transparency',
                description: 'Open communication, ethical AI, and honest partnerships with healthcare providers.',
                icon: '🔍'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-blue-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Us */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-16 bg-white rounded-3xl p-12 shadow-xl text-center"
        >
          <h2 className="text-blue-800 mb-6">Want to Join Our Mission?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented, compassionate individuals who want to make a real 
            difference in cancer care. Reach out to us if you share our vision.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Get In Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
}
