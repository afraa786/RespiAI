import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FaBook, FaSearch, FaFilter, FaBookMedical, FaRegNewspaper, FaResearchgate, FaLungs } from 'react-icons/fa';

const ReadMore = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location]);

  const articles = [
    {
      id: 1,
      title: "Understanding Respiratory Health: A Comprehensive Guide",
      category: "guide",
      date: "Feb 2025",
      author: "Dr. Sarah Johnson",
      readTime: "20 min read",
      preview: "A detailed overview of common respiratory conditions, their causes, symptoms, and treatment options. This comprehensive guide covers everything from initial diagnosis to long-term management strategies.",
      content: `
        Respiratory Health: A Comprehensive Understanding

        Introduction to Respiratory Health
        Respiratory diseases encompass a range of conditions that affect the airways and other structures of the lungs. With increasing air pollution levels and environmental challenges, understanding respiratory health has become more important than ever.

        Historical Background
        The study of respiratory medicine has evolved significantly over centuries, from early descriptions of asthma by Hippocrates to modern pulmonology. Recent decades have seen major advances in understanding how air quality affects respiratory health.

        Understanding the Respiratory System
        To understand respiratory conditions, it's crucial to know how the respiratory system works:
        1. Upper Respiratory Tract
           - Nose and nasal passages
           - Sinuses
           - Pharynx
        2. Lower Respiratory Tract
           - Trachea
           - Bronchi and bronchioles
           - Alveoli
           - Lungs

        Common Respiratory Conditions
        There are several major respiratory conditions:
        1. Asthma
           - Chronic inflammatory disorder with airway hyperresponsiveness
           - Affects airways and causes inflammation
           - Symptoms include coughing, wheezing, and shortness of breath
           - Treatment options include medications, lifestyle changes, and emergency care

        2. Chronic Obstructive Pulmonary Disease (COPD)
           - Progressive lung disease that obstructs airflow
           - Includes emphysema and chronic bronchitis
           - Symptoms include shortness of breath, cough, and sputum production
           - Treatment options include medications, oxygen therapy, and pulmonary rehabilitation

        3. Pneumonia
           - Infection of the lung tissue
           - Symptoms include cough, fever, and chest pain
           - Treatment options include antibiotics, rest, and hydration

        Detailed Symptoms
        Respiratory conditions can vary in severity and progression:

        Early Stage (Acute):
        - Mild symptoms that may resolve on their own
        - Symptoms may worsen over time if left untreated

        Progressive Stage (Chronic):
        - Persistent symptoms that affect daily activities
        - May lead to complications such as heart and lung damage

        Peak Stage (Severe):
        - Severe symptoms that may require immediate medical attention
        - Can be life-threatening if not treated promptly

        Diagnostic Process
        Accurate diagnosis involves:

        1. Medical History and Physical Examination
        2. Diagnostic Tests
           - X-rays
           - CT scans
           - Pulmonary Function Tests (PFTs)
           - Blood tests
           - Sputum analysis

        Treatment Approaches
        Treatment varies depending on the condition:

        1. Medications
           - Inhaled medications for asthma and COPD
           - Antibiotics for pneumonia
           - Oxygen therapy for severe cases

        2. Lifestyle Changes
           - Smoking cessation
           - Avoidance of respiratory irritants
           - Regular exercise
           - Healthy diet

        3. Home Care
           - Monitoring symptoms
           - Managing acute exacerbations
           - Using inhalers as prescribed

        Recovery Timeline
        Recovery time varies:

        - Acute conditions may resolve within a few days to weeks
        - Chronic conditions require ongoing management and treatment

        Long-term Prognosis
        Understanding the long-term outlook:
        - COPD is a progressive disease that worsens over time
        - Asthma can be managed with proper care and avoidance of triggers
        - Pneumonia is treatable and can be prevented with vaccinations and good hygiene

        Prevention and Risk Factors
        Respiratory conditions can be prevented or managed by:

        Common Triggers:
        1. Smoking
        2. Air Pollution
        3. Occupational Hazards
        4. Infections
        5. Genetic Factors

        Living with Respiratory Conditions
        Practical advice for daily life:

        1. Medication Adherence
           - Follow treatment plans
           - Take medications as prescribed
           - Monitor for side effects

        2. Lifestyle Modifications
           - Quit smoking
           - Avoid respiratory irritants
           - Engage in regular exercise
           - Maintain a healthy diet

        3. Emotional Support
           - Join support groups
           - Seek counseling for coping strategies
           - Connect with others who share similar experiences

        4. Work and Social Life
           - Workplace accommodations
           - Social support systems
           - Activity modifications
           - Travel considerations

        Research and Future Directions
        Current research focuses on:
        1. New treatment options
        2. Biomarker identification
        3. Genetic factors
        4. Prevention strategies

        Emergency Preparedness
        Knowing when to seek immediate help:
        1. Warning signs
        2. Emergency contacts
        3. Hospital preparations
        4. Family response plan

        Resources and Support
        Comprehensive list of:
        1. Support organizations
        2. Medical centers
        3. Research programs
        4. Financial assistance
        5. Educational materials

        Conclusion
        Respiratory conditions require comprehensive understanding and management. With proper care and support, most patients can achieve good outcomes and improve their quality of life.
      `
    },
    {
      id: 2,
      title: "Latest Research in Respiratory Health",
      category: "research",
      date: "Jan 2025",
      author: "Research Team at Mayo Clinic",
      readTime: "20 min read",
      preview: "Recent developments in respiratory health research and their effectiveness in clinical trials. New insights into immunotherapy and rehabilitation techniques.",
      content: `
        Recent Advances in Respiratory Health Research

        Introduction:
        The field of respiratory health research has seen significant advances in recent years. This article summarizes the latest research findings and their implications for patient care.

        New Treatment Approaches:
        1. Enhanced Immunotherapy Protocols
        - Optimized IVIg dosing schedules
        - Combination therapy approaches
        - Targeted immune modulation

        2. Biomarker Research
        Recent studies have identified several promising biomarkers that may help in:
        - Earlier diagnosis
        - Predicting disease severity
        - Monitoring treatment response

        3. Rehabilitation Innovations
        - Virtual reality-based therapy
        - Robot-assisted gait training
        - Neuromuscular electrical stimulation

        Clinical Trial Results:
        Several recent clinical trials have shown promising results:
        
        Trial A: IVIg Optimization Study
        - 25% faster recovery time
        - Reduced hospital stay
        - Better long-term outcomes

        Trial B: Early Intervention Protocol
        - 40% reduction in severe cases
        - Improved respiratory function
        - Reduced need for ventilation

        Future Directions:
        Ongoing research focuses on:
        1. Personalized treatment approaches
        2. Novel therapeutic agents
        3. Prevention strategies
        4. Long-term outcome improvement

        Implications for Practice:
        These findings suggest that:
        - Earlier intervention is crucial
        - Combined treatment approaches may be more effective
        - Regular monitoring of biomarkers can guide treatment
        - Rehabilitation should start as early as possible
      `
    },
    {
      id: 3,
      title: "Living with Respiratory Conditions: Patient Stories",
      category: "stories",
      date: "Feb 2025",
      author: "Respiratory Support Community",
      readTime: "10 min read",
      preview: "Real-life experiences and recovery journeys of respiratory condition patients. These inspiring stories offer hope and practical advice for those affected by respiratory conditions.",
      content: `
        Living with Respiratory Conditions: Stories of Hope and Recovery

        Introduction:
        These are real stories from respiratory condition survivors, sharing their journeys of challenge, resilience, and triumph.

        Sarah's Story: A Journey Back to Running
        "I was diagnosed with respiratory condition in 2024. Initially, I couldn't even wiggle my toes. Through determination and excellent medical care, I'm now back to running marathons. Here's my journey..."

        Key Milestones:
        - Week 1: Initial diagnosis
        - Month 1: Starting physical therapy
        - Month 3: First steps without support
        - Month 6: Return to work
        - Year 1: Running again

        David's Experience: Finding Strength in Support
        "The support of my family and the respiratory condition community was crucial. Here's how I navigated the challenges..."

        Recovery Strategies:
        1. Regular physical therapy
        2. Mental health support
        3. Lifestyle modifications
        4. Support group participation

        Maria's Recovery Tips:
        - Stay positive but realistic
        - Follow medical advice strictly
        - Celebrate small victories
        - Build a support network
        - Keep a recovery journal

        Lessons Learned:
        1. Recovery is not linear
        2. Mental strength is as important as physical
        3. Support systems are crucial
        4. Patience is key
        5. Hope makes a difference
      `
    },
    {
      id: 4,
      title: "Emergency Response Guide for Respiratory Conditions",
      category: "guide",
      date: "Feb 2025",
      author: "Emergency Medicine Team",
      readTime: "8 min read",
      preview: "What to do when experiencing respiratory condition symptoms and when to seek immediate medical attention. A practical guide for patients and caregivers.",
      content: `
        Emergency Response Guide for Respiratory Conditions

        Immediate Action Steps:
        If you or someone you know is showing symptoms of respiratory condition, follow these steps:

        1. Recognize Early Warning Signs:
        - Progressive muscle weakness
        - Tingling in extremities
        - Difficulty walking or climbing stairs
        - Facial weakness
        - Double vision
        - Difficulty breathing

        2. Emergency Contacts in India:
        National Emergency Number: 112
        Ambulance: 102
        Key Hospitals:
        - AIIMS New Delhi: 011-26588500
        - Medanta Hospital: 0124-4141414
        - Apollo Hospitals: 1860-500-1066

        3. What to Tell Emergency Services:
        - Mention "suspected respiratory condition"
        - Describe progression of symptoms
        - List any recent infections
        - Mention any breathing difficulties
        - Current medications

        4. While Waiting for Help:
        - Stay calm
        - Remain in a safe position
        - Monitor breathing
        - Keep warm
        - Have someone stay with you

        5. Hospital Preparation:
        Documents to bring:
        - ID proof
        - Insurance cards
        - Medical history
        - List of medications
        - Recent medical reports

        6. Follow-up Care:
        After emergency treatment:
        - Regular neurologist visits
        - Physical therapy
        - Respiratory monitoring
        - Support group participation
      `
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', icon: FaBook },
    { id: 'guide', name: 'Guides', icon: FaBookMedical },
    { id: 'research', name: 'Research', icon: FaResearchgate },
    { id: 'stories', name: 'Patient Stories', icon: FaRegNewspaper }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 text-center mb-8">
          Respiratory Health Knowledge Hub
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-lg">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {React.createElement(category.icon, { className: 'text-lg' })}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                const dialog = document.createElement('dialog');
                dialog.className = 'p-8 max-w-3xl mx-auto rounded-xl bg-white shadow-2xl';
                dialog.innerHTML = `
                  <div class="relative">
                    <button class="absolute top-0 right-0 text-gray-500 hover:text-gray-700" onclick="this.closest('dialog').close()">
                      ✕
                    </button>
                    <h2 class="text-2xl font-bold text-purple-900 mb-4">${article.title}</h2>
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-sm text-purple-600">${article.date}</span>
                      <span class="text-sm text-gray-500">${article.readTime}</span>
                    </div>
                    <div class="prose max-w-none">
                      ${article.content.split('\n').map(line => 
                        line.trim().startsWith('-') ? 
                        `<li>${line.substring(1)}</li>` : 
                        line.trim().startsWith('#') ?
                        `<h3>${line.substring(1)}</h3>` :
                        `<p>${line}</p>`
                      ).join('')}
                    </div>
                  </div>
                `;
                document.body.appendChild(dialog);
                dialog.showModal();
                
                dialog.addEventListener('click', (e) => {
                  if (e.target === dialog) {
                    dialog.close();
                  }
                });
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-purple-600">{article.date}</span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">{article.preview}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.author}</span>
                  <span className="text-purple-600 hover:text-purple-800 font-medium">
                    Read more →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Research Resources */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Research Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Medical Journals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• The New England Journal of Medicine</li>
                <li>• The Lancet Neurology</li>
                <li>• Journal of Neurology</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Research Institutions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• AIIMS Research Division</li>
                <li>• NIMHANS Bangalore</li>
                <li>• WHO India Research Database</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Support Organizations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• GBS/CIDP Foundation India</li>
                <li>• Indian Association of Neurology</li>
                <li>• National Health Portal India</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReadMore;
