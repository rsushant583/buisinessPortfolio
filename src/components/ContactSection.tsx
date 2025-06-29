import React, { useState, useRef, useEffect } from 'react';
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
    budget: 5000,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    { value: 'website', label: '🌐 Website Development', budget: [2000, 10000] },
    { value: 'ecommerce', label: '🛒 E-commerce Platform', budget: [5000, 25000] },
    { value: 'app', label: '📱 Mobile App', budget: [8000, 30000] },
    { value: 'design', label: '🎨 UI/UX Design', budget: [1500, 8000] },
    { value: 'consulting', label: '💡 Consulting', budget: [500, 3000] }
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
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-24 px-6 overflow-hidden bg-gradient-to-br from-black via-blue-950/20 to-purple-950/20">
      {/* Background Effects */}
      <ContactBackground />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
            viewport={{ once: true }}
          >
            Let's Create Magic ✨
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to transform your vision into a digital masterpiece? Let's discuss your next project.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassmorphismCard className="p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-8"
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
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-14 text-lg focus:border-blue-400 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
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
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 h-14 text-lg focus:border-blue-400 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
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
                            className={`p-3 rounded-lg border text-left transition-all duration-300 ${formData.service === service.value ? 'border-blue-400 bg-blue-400/20 text-blue-400' : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'}`}
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
                      <div className="flex items-center justify-between mb-1">
                        <Label className="text-sm text-blue-400 font-semibold">💰 Project Budget</Label>
                        <span className="text-white font-bold text-lg">${formData.budget.toLocaleString()}</span>
                      </div>
                      <BudgetSlider
                        value={formData.budget}
                        onChange={(value) => handleInputChange('budget', value)}
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>$1,000</span>
                        <span>$50,000+</span>
                      </div>
                    </motion.div>

                    {/* Message Input */}
                    <motion.div className="flex flex-col gap-2 relative" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Label htmlFor="message" className="text-sm text-blue-400 font-semibold flex items-center gap-1">
                        {getSentimentEmoji(formData.message)} Tell me about your project
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-32 text-lg focus:border-blue-400 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                        placeholder="Describe your vision, goals, and what makes your project special..."
                        required
                      />
                      {/* Voice Recording Button */}
                      <motion.button
                        type="button"
                        onClick={toggleRecording}
                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                      </motion.button>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              <span>Launching Your Message...</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="send"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <Rocket className="w-5 h-5" />
                              <span>Send Message</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="mb-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-4">Thank You! 🚀</h3>
                    <p className="text-gray-300 mb-6">
                      Your message has been received! I'll get back to you within 24 hours with a detailed proposal.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassmorphismCard>
          </motion.div>

          {/* Right Side - 3D Envelope & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 3D Envelope Animation */}
            <AnimatedEnvelope isTyping={!!formData.message} />

            {/* Contact Information */}
            <GlassmorphismCard className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@sushantrai.dev' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <contact.icon className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">{contact.label}</p>
                      <p className="text-white">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassmorphismCard>

            {/* AI Assistant Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-2xl"
                onClick={() => toast("🤖 AI Assistant coming soon!", { description: "This feature will be available in the next update!" })}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
