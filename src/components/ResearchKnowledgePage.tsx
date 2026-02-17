import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, TrendingUp, FileText, Calendar, ExternalLink, Search, Filter } from 'lucide-react';

export function ResearchKnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'Improving Adverse Event Reporting in Chemotherapy: A Systematic Review',
      category: 'research',
      date: '2024-12-15',
      author: 'Dr. Sarah Johnson et al.',
      journal: 'Journal of Pharmacovigilance',
      summary: 'A comprehensive analysis of current adverse event reporting systems and recommendations for improvement using digital health technologies.',
      tags: ['Pharmacovigilance', 'Chemotherapy', 'Digital Health']
    },
    {
      id: 2,
      title: 'The Role of AI in Severity Classification of Drug Reactions',
      category: 'research',
      date: '2024-11-28',
      author: 'Dr. Michael Chen et al.',
      journal: 'AI in Medicine',
      summary: 'Exploring machine learning approaches to automatically classify the severity of adverse drug reactions, improving triage efficiency.',
      tags: ['Artificial Intelligence', 'Machine Learning', 'ADR Classification']
    },
    {
      id: 3,
      title: 'Patient-Reported Outcomes: Bridging the Gap in Oncology Care',
      category: 'research',
      date: '2024-10-10',
      author: 'Prof. Emily Watson',
      journal: 'Oncology Today',
      summary: 'Examining how patient-reported outcome measures enhance clinical decision-making and improve quality of life in cancer treatment.',
      tags: ['Patient-Reported Outcomes', 'Oncology', 'Quality of Life']
    },
    {
      id: 4,
      title: 'New WHO Guidelines for Pharmacovigilance Systems',
      category: 'news',
      date: '2024-12-01',
      author: 'World Health Organization',
      journal: 'WHO Bulletin',
      summary: 'Updated global standards for pharmacovigilance systems emphasizing digital transformation and patient-centric approaches.',
      tags: ['WHO Guidelines', 'Global Health', 'Policy']
    },
    {
      id: 5,
      title: 'Understanding Anthracycline-Related Cardiotoxicity',
      category: 'education',
      date: '2024-11-15',
      author: 'Dr. Robert Martinez',
      journal: 'Clinical Education Series',
      summary: 'A clinician\'s guide to recognizing, monitoring, and managing cardiotoxicity in patients receiving anthracycline chemotherapy.',
      tags: ['Cardiotoxicity', 'Chemotherapy', 'Clinical Guidelines']
    },
    {
      id: 6,
      title: 'Substandard Medications: A Growing Global Health Crisis',
      category: 'news',
      date: '2024-12-10',
      author: 'Global Health Institute',
      journal: 'Health Security Review',
      summary: 'Investigating the prevalence of substandard and falsified medications in global supply chains and strategies for detection.',
      tags: ['Drug Quality', 'Global Health', 'Supply Chain']
    },
    {
      id: 7,
      title: 'Managing Chemotherapy-Induced Nausea: Best Practices',
      category: 'education',
      date: '2024-10-25',
      author: 'Dr. Lisa Anderson',
      journal: 'Patient Care Guidelines',
      summary: 'Evidence-based recommendations for preventing and treating chemotherapy-induced nausea and vomiting in cancer patients.',
      tags: ['Side Effect Management', 'CINV', 'Best Practices']
    },
    {
      id: 8,
      title: 'Digital Health Tools Transform Drug Safety Monitoring',
      category: 'news',
      date: '2024-12-18',
      author: 'Healthcare Innovation Forum',
      journal: 'Digital Health Today',
      summary: 'How mobile apps and AI-powered platforms are revolutionizing real-time adverse event monitoring and reporting.',
      tags: ['Digital Health', 'Innovation', 'Real-Time Monitoring']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Content', icon: BookOpen },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'news', label: 'News & Updates', icon: TrendingUp },
    { id: 'education', label: 'Education', icon: Calendar }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Research & Knowledge Center
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Stay informed with the latest research, news, and educational content in pharmacovigilance, 
            drug safety, and oncology care.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, or tags..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Category Badge */}
              <div className={`h-2 ${
                article.category === 'research' ? 'bg-blue-600' :
                article.category === 'news' ? 'bg-green-600' :
                'bg-purple-600'
              }`} />

              <div className="p-6">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    article.category === 'research' ? 'bg-blue-100 text-blue-700' :
                    article.category === 'news' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                {/* Author & Journal */}
                <p className="text-sm text-slate-600 mb-3">
                  <strong>{article.author}</strong>
                  <br />
                  <span className="italic">{article.journal}</span>
                </p>

                {/* Summary */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group">
                  <span>Read Full Article</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest research findings, safety alerts, and educational resources.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
            Subscribe Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
