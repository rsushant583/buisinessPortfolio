import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ExternalLink, Play, ArrowRight, Star, Code, Palette, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThreeScene from '@/components/ThreeScene';
import CustomCursor from '@/components/CustomCursor';
import ScrollAnimations from '@/components/ScrollAnimations';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import AnimatedThemeToggle from '@/components/AnimatedThemeToggle';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  console.log('Index component rendering');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "Restaurant Website",
      description: "Premium restaurant website with immersive dining experience",
      url: "https://batichokhawala.com",
      image: "/batichokha.png",
      tech: ["React", "Tailwind", "Framer Motion"]
    },
    {
      title: "E-Commerce Platform",
      description: "Modern shopping experience with advanced filtering",
      url: "https://dine-aura.vercel.app",
      image: "/dineaura.png",
      tech: ["Next.js", "Stripe", "MongoDB"]
    },
    {
      title: "Creative Portfolio Website",
      description: "Award-winning design with interactive animations",
      url: "https://gaurav-madan-website.vercel.app",
      image: "/gm.png",
      tech: ["Vue.js", "Three.js", "GSAP"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "Absolutely mind-blowing work! The website exceeded all our expectations and converted 300% better.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Founder, StartupXYZ",
      content: "Professional, creative, and delivered on time. The best web designer I've ever worked with.",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Marketing Director",
      content: "The attention to detail and user experience is phenomenal. Our clients love the new site!",
      rating: 5
    }
  ];

  return (
    <div ref={containerRef} className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-white'} text-white overflow-x-hidden relative`}>
      <CustomCursor />
      <ScrollAnimations />
      
      {/* Sticky Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            <span className="hidden md:inline">Sushant Rai</span>
            <span className="md:hidden">SR</span>
            <span className="text-sm block md:inline md:ml-2 text-gray-400">web services</span>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'Projects', id: 'projects' },
              { name: 'Services', id: 'services' },
              { name: 'About', id: 'testimonials' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-blue-400 transition-colors duration-300 reveal-text"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <AnimatedThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Projects', id: 'projects' },
                { name: 'Services', id: 'services' },
                { name: 'About', id: 'testimonials' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left hover:text-blue-400 transition-colors duration-300 py-2"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        {/* 3D Background */}
        <ThreeScene />

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-400 bg-clip-text text-transparent reveal-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Crafting Digital
            <br />
            <span className="text-blue-400">Masterpieces</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto reveal-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            I transform your vision into stunning, high-converting websites that captivate and engage your audience.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center reveal-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group"
            >
              <span className="group-hover:mr-3 transition-all duration-300">View My Work</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> 
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent reveal-text">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto reveal-text">
              Discover the digital experiences I've crafted for forward-thinking brands and businesses.
            </p>
          </motion.div>

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <GlassmorphismCard delay={index * 0.1}>
                  <div className="relative overflow-hidden rounded-t-lg mb-4">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <Button
                        asChild
                        size="sm"
                        variant="secondary"
                        className="bg-white/20 backdrop-blur-md"
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-md text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassmorphismCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section py-24 px-6 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent reveal-text">
              Services & Packages
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 reveal-text">
              Comprehensive solutions tailored to elevate your digital presence and drive business growth.
            </p>
          </motion.div>

          <GlassmorphismCard className="mb-12">
            <div className="text-center mb-8 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Explore My Complete Service Offerings</h3>
              <p className="text-gray-400 mb-6">
                From concept to launch, I provide end-to-end solutions with transparent pricing and clear deliverables.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
                onClick={() => window.open('https://service-offer-peach.vercel.app/', '_blank')}
              >
                View Pricing & Packages <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 px-8 pb-8">
              {[
                { icon: Code, title: "Web Development", desc: "Custom websites & applications" },
                { icon: Palette, title: "UI/UX Design", desc: "Beautiful, user-centered design" },
                { icon: Rocket, title: "Optimization", desc: "Performance & SEO enhancement" }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <service.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2 text-white">{service.title}</h4>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </GlassmorphismCard>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent reveal-text">
              Client Success Stories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassmorphismCard key={index} delay={index * 0.2}>
                <div className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </GlassmorphismCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2026 Sushant Rai. Crafted with passion and precision.</p>
            </div>
            <div className="flex space-x-6">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/itsmehsushat/' },
                { name: 'GitHub', url: 'https://github.com/rsushant583' },
                { name: 'Twitter', url: 'https://x.com/rsushant583' },
                { name: 'Whatsapp', url: 'https://wa.me/918004642369' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
