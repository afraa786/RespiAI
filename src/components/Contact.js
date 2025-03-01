import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaHospital, FaShare } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid Indian phone number
    // Valid formats:
    // - 10 digits (e.g., 9876543210)
    // - Optional +91 or 0 prefix
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Format as per Indian standard: +91 XXXXX XXXXX
    if (cleanPhone.length >= 10) {
      const last10Digits = cleanPhone.slice(-10);
      return `+91 ${last10Digits.slice(0, 5)} ${last10Digits.slice(5)}`;
    }
    return phone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number as user types
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));

      // Validate phone number
      if (value.length > 0 && !validatePhone(value)) {
        setErrors(prev => ({
          ...prev,
          phone: 'Please enter a valid Indian phone number'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          phone: undefined
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number before submission
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors(prev => ({
        ...prev,
        phone: 'Please enter a valid Indian phone number'
      }));
      return;
    }
    
    // Create the message content
    const subject = 'Respiratory Health Query - Review Required';
    const body = `
Patient Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

This is an automated message from RespirAI Medical Platform.
Please review and respond to the patient's query as soon as possible.
    `;

    // List of respiratory health specialists
    const recipients = [
      'respiratory.aiims@gmail.com',
      'pulmonology.medanta@gmail.com',
      'respiratory.apollo@gmail.com'
    ];

    // Use Web Share API if available, fallback to mailto
    if (navigator.share) {
      try {
        await navigator.share({
          title: subject,
          text: body,
          url: window.location.href
        });
        setSubmitted(true);
      } catch (error) {
        // Fallback to mailto if user cancels share
        window.location.href = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSubmitted(true);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      window.location.href = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 px-4 bg-white" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about respiratory health or breathing issues? Our team of medical professionals is here to help.
            Fill out the form below and we'll connect you with a respiratory specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaHospital className="text-xl text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Main Office</h3>
                <p className="text-gray-600">AIIMS Pulmonology Department</p>
                <p className="text-gray-600">New Delhi, India</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaPhone className="text-xl text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">Emergency: 112</p>
                <p className="text-gray-600">Helpline: 1800-180-1104</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaEnvelope className="text-xl text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">respiratory.aiims@gmail.com</p>
                <p className="text-gray-600">pulmonology.support@aiims.edu</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700">
                  Your email client has been opened with the message. Please send the email to connect with our respiratory specialists.
                  They will review your query and get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500 ${
                        errors.phone ? 'border-red-500' : ''
                      }`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                    placeholder="Please describe your symptoms or questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShare className="text-lg" />
                  Share Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
