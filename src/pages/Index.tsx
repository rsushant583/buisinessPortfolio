import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ExternalLink, Play, ArrowRight, Star, Code, Palette, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CustomCursor from '@/components/CustomCursor';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import AnimatedThemeToggle from '@/components/AnimatedThemeToggle';
import ContactSection from '@/components/ContactSection';
import ScrollAnimations from '../components/ScrollAnimations';

// Lazy load heavy components
const ThreeScene = lazy(() => import('@/components/ThreeScene'));

const Index = () => {
  console.log('Index component rendering');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', true); // Keep dark mode for now, as it's not removed
  }, []);

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
      description: "An Immersive Digital Dining Room. Engineered to increase online reservations and capture the essence of fine dining, resulting in a 40% uplift in table bookings for our client.",
      url: "https://batichokhawala.com",
      image: "/batichokha.png"
    },
    {
      title: "E-Commerce Platform",
      description: "A Scalable E-commerce Powerhouse. We redesigned the user journey and integrated a seamless checkout process, cutting cart abandonment by 25% and boosting sales.",
      url: "https://dine-aura.vercel.app",
      image: "/dineaura.png"
    },
    {
      title: "Creative Portfolio Website",
      description: "A Groundbreaking Digital Showcase. Developed an award-winning portfolio with interactive 3D elements that doubled client engagement and secured high-ticket leads.",
      url: "https://gaurav-madan-website.vercel.app",
      image: "/gm.png"
    },
    {
      title: "Ayushman Cafe",
      description: "A Modern Cafe Experience. Built to boost local discovery and online orders, helping the brand expand its loyal customer base.",
      url: "https://ayushmancafe.vercel.app/",
      image: "/ayushmancafe.png"
    },
    {
      title: "Ayushi Premium",
      description: "Premium Product Launchpad. Created a high-converting landing page that elevated brand perception and drove a successful product launch.",
      url: "https://ayushi-premium.vercel.app/",
      image: "/ayushipremium.png"
    },
    {
      title: "Retail Grid",
      description: "Retail Business Grid Platform. Enabled modern commerce with a scalable, easy-to-manage solution for multi-location retailers.",
      url: "https://retail-grid.vercel.app",
      image: "/retailgrid.png"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "We were struggling with a high bounce rate. Sushant rebuilt our site from the ground up, and the results were immediate. Our conversions are up by 35%, and the user feedback has been phenomenal. He's not just a developer; he's a growth partner.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Founder, StartupXYZ",
      content: "The entire process with Sushant was seamless. He took the time to understand our complex needs and delivered a platform that saved our team 10+ hours a week in manual work. He delivered on time and on budget. A true professional.",
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
    <div ref={containerRef} className={`min-h-screen ${true ? 'dark bg-black' : 'bg-white'} text-white overflow-x-hidden relative`}>
      <CustomCursor />
      {/* Restore original sticky navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <motion.div 
            className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            <span className="hidden sm:inline">Sushant Rai</span>
            <span className="sm:hidden">SR</span>
            <span className="text-xs sm:text-sm block sm:inline sm:ml-2 text-gray-400">web services</span>
          </motion.div>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
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
                className="hover:text-blue-400 transition-colors duration-300 reveal-text text-sm lg:text-base"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
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
                  className="block w-full text-left hover:text-blue-400 transition-colors duration-300 py-3 px-2 text-base font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
      <ScrollAnimations />
      
      {/* Hero Section */}
      <section id="home" className="hero-section relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        {/* 3D Background */}
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <motion.h1
            className="text-4xl sm:text-7xl md:text-8xl font-extrabold mb-4 text-center leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-300 to-purple-400 bg-clip-text text-transparent">Crafting Digital</span><br />
            <span className="text-blue-400">Masterpieces</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl font-light text-gray-200 mb-8 text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            I transform your vision into stunning, high-converting websites that captivate and engage your audience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-auto"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Our Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-auto flex items-center justify-center"
              asChild
            >
              <a href="tel:+918004642369">Book a Strategy Call</a>
            </Button>
          </motion.div>
        </div>
        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
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
      <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent reveal-text">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto reveal-text px-4">
              Discover the digital experiences I've crafted for forward-thinking brands and businesses.
            </p>
          </motion.div>

          <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <Suspense fallback={null}>
                  <GlassmorphismCard delay={index * 0.1}>
                    <div className="relative overflow-hidden rounded-t-lg mb-4">
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 sm:h-56 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
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
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm sm:text-base">{project.description}</p>
                    </div>
                  </GlassmorphismCard>
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent reveal-text">
              How We Drive Growth
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 reveal-text px-4">
              Comprehensive solutions tailored to elevate your digital presence and drive business growth.
            </p>
          </motion.div>

          <Suspense fallback={null}>
            <GlassmorphismCard className="mb-12">
              <div className="text-center mb-8 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Explore Our Complete Growth Solutions</h3>
                <p className="text-gray-400 mb-6 text-sm sm:text-base">
                  From concept to launch, we provide end-to-end digital solutions with transparent pricing and clear deliverables.
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                  onClick={() => window.open('https://service-offer-peach.vercel.app/', '_blank')}
                >
                  View Pricing & Packages <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
                {[
                  { icon: Code, title: "Strategic Web & Application Development", desc: "We don't just build—we architect digital solutions that are scalable, secure, and aligned with your business objectives." },
                  { icon: Palette, title: "Conversion-Focused Design (UI/UX)", desc: "Our design process is rooted in data and user psychology to create beautiful interfaces that guide users to action and maximize conversions." },
                  { icon: Rocket, title: "Performance & Growth Optimization", desc: "We fine-tune every aspect of your site for lightning-fast speed (Core Web Vitals), top search engine rankings (SEO), and continuous improvement." }
                ].map((service, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-white">{service.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </GlassmorphismCard>
          </Suspense>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent reveal-text">
              Client Success Stories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Suspense key={index} fallback={null}>
                <GlassmorphismCard delay={index * 0.2}>
                  <div className="p-4 sm:p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 sm:mb-6 italic text-sm sm:text-base">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </GlassmorphismCard>
              </Suspense>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm sm:text-base">© 2026 Sushant Rai. Crafted with passion and precision.</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
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
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
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
