import React from 'react';
import { motion } from 'motion/react';
import { Building2, HeartPulse, Shield, Globe, Users, CheckCircle } from 'lucide-react';

export function PartnershipsSection() {
  const partners = [
    {
      category: 'Regulatory Bodies',
      icon: Shield,
      color: 'blue',
      partners: [
        'WHO - World Health Organization',
        'FDA - Food & Drug Administration',
        'EMA - European Medicines Agency',
        'National Pharmacovigilance Centers'
      ]
    },
    {
      category: 'Healthcare Institutions',
      icon: HeartPulse,
      color: 'teal',
      partners: [
        'Cancer Treatment Centers',
        'University Teaching Hospitals',
        'Regional Oncology Networks',
        'Community Health Centers'
      ]
    },
    {
      category: 'Research Organizations',
      icon: Globe,
      color: 'purple',
      partners: [
        'Clinical Research Institutes',
        'Pharmaceutical Research Groups',
        'Medical Universities',
        'Global Health Initiatives'
      ]
    },
    {
      category: 'Patient Advocacy',
      icon: Users,
      color: 'green',
      partners: [
        'Cancer Patient Advocacy Groups',
        'Drug Safety Organizations',
        'Patient Support Networks',
        'Healthcare Consumer Groups'
      ]
    }
  ];

  const ecosystem = [
    {
      title: 'Integrated Reporting',
      description: 'Seamless data exchange with regulatory pharmacovigilance systems',
      icon: Building2
    },
    {
      title: 'Clinical Collaboration',
      description: 'Direct communication channels with healthcare providers',
      icon: HeartPulse
    },
    {
      title: 'Research Access',
      description: 'Anonymized data available for approved research studies',
      icon: Globe
    },
    {
      title: 'Patient Empowerment',
      description: 'Tools and resources for informed patient participation',
      icon: Users
    }
  ];

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Partnerships & Ecosystem
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Building a collaborative network of regulatory bodies, healthcare institutions, research organizations, 
            and patient advocacy groups to strengthen global pharmacovigilance.
          </p>
        </motion.div>

        {/* Partner Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>

              {/* Category Title */}
              <h3 className="font-bold text-slate-800 mb-4">{category.category}</h3>

              {/* Partner List */}
              <ul className="space-y-2">
                {category.partners.map((partner, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{partner}</span>
                  </li>
                ))}
              </ul>

              {/* Status Badge */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                  Future Partnership
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ecosystem Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-200 mb-12"
        >
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">
            Ecosystem Integration
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystem.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Our Partnership Principles
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Data Privacy First</h4>
              <p className="text-slate-600 text-sm">
                All partnerships maintain strict patient confidentiality and comply with data protection regulations.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Transparent Collaboration</h4>
              <p className="text-slate-600 text-sm">
                Open communication and shared goals drive our partnership ecosystem forward.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Patient-Centric Focus</h4>
              <p className="text-slate-600 text-sm">
                Every partnership prioritizes improving patient safety and healthcare outcomes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            Interested in partnering with ChemoVigi to improve global drug safety?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all">
            Contact Partnership Team
          </button>
        </motion.div>
      </div>
    </div>
  );
}
