import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Rocket, Mail, Phone, MapPin, MessageCircle, Mic, MicOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import GlassmorphismCard from './GlassmorphismCard';
import ContactBackground from './ContactBackground';
import AnimatedEnvelope from './AnimatedEnvelope';
import BudgetSlider from './BudgetSlider';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: 8500,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    { value: 'starter', label: '🚀 Starter - ₹8,500', budget: [8500, 8500], duration: '3-4 days', description: 'Perfect Entry Point' },
    { value: 'business', label: '💼 Business - ₹15,000', budget: [15000, 15000], duration: '6-8 days', description: 'Sweet Spot for Small Businesses' },
    { value: 'professional', label: '⭐ Professional - ₹25,000', budget: [25000, 25000], duration: '10-12 days', description: 'For Growing Businesses' },
    { value: 'ecommerce', label: '🛒 E-commerce - ₹35,000', budget: [35000, 35000], duration: '15-18 days', description: 'Complete Online Store Solution' },
    { value: 'premium', label: '👑 Premium - ₹45,000', budget: [45000, 45000], duration: '20-25 days', description: 'Enterprise-Grade E-commerce' },
    { value: 'ai-enterprise', label: '🤖 AI Enterprise - Contact Us', budget: [50000, 100000], duration: 'Custom', description: 'AI-Powered Custom Solutions' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-suggestions
    if (field === 'service' && value) {
      const selectedService = services.find(s => s.value === value);
      if (selectedService) {
        setFormData(prev => ({ 
          ...prev, 
          budget: selectedService.budget[0] 
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast("🚀 Awesome! Your message is flying to Sushant!", {
      description: "I'll get back to you within 24 hours!"
    });

    // Show confetti effect
    setTimeout(() => {
      // You can add confetti library here if needed
    }, 500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast("🎤 Voice recording started", {
        description: "Tap again to stop recording"
      });
    } else {
      toast("✅ Voice message recorded", {
        description: "Your voice note has been attached"
      });
    }
  };

  const getSentimentEmoji = (message: string) => {
    const positive = ['great', 'awesome', 'amazing', 'excellent', 'wonderful', 'fantastic'];
    const negative = ['urgent', 'problem', 'issue', 'help', 'asap', 'quickly'];
    
    const lowerMessage = message.toLowerCase();
    
    if (positive.some(word => lowerMessage.includes(word))) return '😊';
    if (negative.some(word => lowerMessage.includes(word))) return '⚡';
    if (lowerMessage.includes('budget')) return '💰';
    if (lowerMessage.includes('design')) return '🎨';
    return '💬';
  };

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-black via-blue-950/20 to-purple-950/20">
      {/* Background Effects */}
      <ContactBackground />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
            viewport={{ once: true }}
          >
            Ready to Build Your Competitive Edge?
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Let's discuss your growth goals and how we can help you build a website that delivers measurable results.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassmorphismCard className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 sm:space-y-8"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Name Input */}
                    <motion.div className="flex flex-col gap-2" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Label htmlFor="name" className="text-sm text-blue-400 font-semibold">✨ Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12 sm:h-14 text-base sm:text-lg focus:border-blue-400 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div className="flex flex-col gap-2" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Label htmlFor="email" className="text-sm text-blue-400 font-semibold">📧 Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-12 sm:h-14 text-base sm:text-lg focus:border-blue-400 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    {/* Service Selection */}
                    <motion.div className="flex flex-col gap-2" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Label className="text-sm text-blue-400 font-semibold mb-1">🎯 Service Type</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {services.map((service) => (
                          <motion.button
                            key={service.value}
                            type="button"
                            onClick={() => handleInputChange('service', service.value)}
                            className={`p-3 sm:p-4 rounded-lg border text-left transition-all duration-300 text-sm sm:text-base ${formData.service === service.value ? 'border-blue-400 bg-blue-400/20 text-blue-400' : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {service.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Budget Slider */}
                    <motion.div className="flex flex-col gap-2">
                      <Label className="text-sm text-blue-400 font-semibold mb-1">💰 What is your approximate budget for this project?</Label>
                      <div className="space-y-4">
                        <BudgetSlider min={30000} max={250000} value={formData.budget} onChange={(value) => handleInputChange('budget', value)} />
                        <div className="flex justify-between text-xs sm:text-sm text-gray-400">
                          <span>₹30,000</span>
                          <span>₹2,50,000+</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Message Input */}
                    <motion.div className="flex flex-col gap-2" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Label htmlFor="message" className="text-sm text-blue-400 font-semibold">💬 Tell me about your project</Label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-[120px] sm:min-h-[140px] text-base sm:text-lg focus:border-blue-400 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                          placeholder="Describe your project, goals, and any specific requirements..."
                          required
                        />
                        <div className="absolute bottom-3 right-3 flex space-x-2">
                          <motion.button
                            type="button"
                            onClick={toggleRecording}
                            className={`p-2 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold group relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                              Start the Conversation
                              <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="text-center py-8 sm:py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6, repeat: 2 }}
                    >
                      <Rocket className="h-10 w-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Message Sent Successfully! 🚀</h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-6">
                      Thank you for reaching out! I'll get back to you within 24 hours with a detailed response.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', service: '', budget: 8500, message: '' });
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassmorphismCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <GlassmorphismCard className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                    <a 
                      href="mailto:rsushant583@gmail.com" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base break-all"
                    >
                      rsushant583@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                    <a 
                      href="tel:+918004642369" 
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm sm:text-base"
                    >
                      +91 8004642369
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                    <p className="text-gray-300 text-sm sm:text-base">Uttar Pradesh, India</p>
                  </div>
                </motion.div>
              </div>
            </GlassmorphismCard>

            {/* Animated Envelope */}
            <div className="hidden lg:block">
              <Suspense fallback={null}>
                <AnimatedEnvelope />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
