import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, Users, Award, Heart, Globe, Zap, CheckCircle, ArrowRight, Star, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme, getThemeClasses } from '@/lib/themeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const AboutUs = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  // Animation variants
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const teamMembers = [
    {
      name: "Abhay Chavan",
      role: "Chief Executive Officer",
      image: "/placeholder.svg",
      description: "Visionary leader with 15+ years in fintech and digital banking innovation.",
      expertise: ["Fintech Innovation", "Strategic Leadership", "Digital Transformation"],
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer",
      image: "/placeholder.svg", 
      description: "Expert in blockchain technology and secure banking infrastructure.",
      expertise: ["Blockchain Technology", "Cybersecurity", "System Architecture"],
      linkedin: "#"
    },
    {
      name: "Rahul Singh",
      role: "Head of Product",
      image: "/placeholder.svg",
      description: "Product strategist focused on user experience and financial accessibility.",
      expertise: ["Product Strategy", "UX Design", "Market Research"],
      linkedin: "#"
    },
    {
      name: "Sarah Wilson",
      role: "Chief Risk Officer",
      image: "/placeholder.svg",
      description: "Risk management specialist ensuring regulatory compliance and security.",
      expertise: ["Risk Management", "Compliance", "Financial Regulation"],
      linkedin: "#"
    },
    {
      name: "Michael Chen",
      role: "Head of Engineering",
      image: "/placeholder.svg",
      description: "Engineering leader building scalable and robust banking solutions.",
      expertise: ["Software Engineering", "Cloud Architecture", "DevOps"],
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Advanced encryption and multi-layer security protecting your financial data 24/7."
    },
    {
      icon: Heart,
      title: "Customer Centric", 
      description: "Every feature designed with our customers' needs and convenience in mind."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Banking services accessible to everyone, anywhere, breaking geographical barriers."
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "Constantly evolving with cutting-edge technology and user-centric solutions."
    }
  ];

  const achievements = [
    { number: "500K+", label: "Happy Customers" },
    { number: "₹2.5B+", label: "Transactions Processed" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
      {/* Header */}
      <header className={`${themeClasses.headerBackground} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ChevronLeft className={`w-5 h-5 ${themeClasses.primaryText}`} />
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`w-8 h-8 ${themeClasses.accentGradient} rounded-lg flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xl font-bold text-white">₹</span>
                </motion.div>
                <motion.span
                  className={`text-xl font-bold ${themeClasses.primaryText}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  VaultX
                </motion.span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/customer/login">
                <Button variant="outline" size="sm" className={themeClasses.secondaryButton}>Login</Button>
              </Link>
              <Link to="/customer/register">
                <Button size="sm" className={themeClasses.primaryButton}>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge className={`mb-4 ${theme === 'dark' ? 'bg-slate-800 text-cyan-400 border-slate-700' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                  <Building2 className="w-4 h-4 mr-2" />
                  About VaultX
                </Badge>
              </motion.div>
              
              <motion.h1
                className={`text-4xl md:text-6xl font-bold ${themeClasses.primaryText} mb-6`}
                variants={fadeInUp}
              >
                Revolutionizing
                <motion.span
                  className={`text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-green-600'} block`}
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  Digital Banking
                </motion.span>
              </motion.h1>
              
              <motion.p
                className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto mb-8`}
                variants={fadeInUp}
              >
                VaultX is India's premier digital banking platform, combining cutting-edge technology 
                with personalized financial services. We're building the future of banking, one innovation at a time.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Link to="/customer/register">
                  <Button size="lg" className={themeClasses.primaryButton}>
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className={themeClasses.secondaryButton}>
                  <Globe className="w-4 h-4 mr-2" />
                  Explore Features
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className={`absolute top-20 left-10 w-20 h-20 ${themeClasses.floatingElements[0]} rounded-full blur-xl`}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className={`absolute top-40 right-10 w-16 h-16 ${themeClasses.floatingElements[1]} rounded-full blur-xl`}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className={`absolute bottom-20 left-1/4 w-12 h-12 ${themeClasses.floatingElements[2]} rounded-full blur-xl`}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </section>

        {/* Achievements Section */}
        <section className={`py-16 ${themeClasses.featureBackground}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {achievements.map((achievement, index) => (
                <motion.div key={index} className="text-center" variants={scaleIn}>
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} mb-2`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                  >
                    {achievement.number}
                  </motion.div>
                  <div className={`${themeClasses.secondaryText} font-medium`}>{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}>Our Core Values</h2>
            <p className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}>
                The principles that guide every decision we make and every service we provide.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-shadow ${themeClasses.cardBackground}`}>
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-16 h-16 ${themeClasses.highlightGradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${theme === 'dark' ? 'shadow-cyan-500/20' : ''}`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <value.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className={`text-xl font-semibold ${themeClasses.primaryText} mb-3`}>{value.title}</h3>
                      <p className={`${themeClasses.secondaryText}`}>{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-r from-slate-900/80 via-blue-900/80 to-purple-900/80' : 'bg-gradient-to-r from-blue-50 to-green-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}>Meet Our Leadership Team</h2>
              <p className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}>
                Exceptional leaders driving innovation and excellence in digital banking.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${themeClasses.teamCard} group hover:scale-105`}>
                    <CardContent className="p-6">
                      <motion.div
                        className="relative mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`w-24 h-24 mx-auto ${themeClasses.highlightGradient} rounded-full flex items-center justify-center overflow-hidden shadow-xl ${theme === 'dark' ? 'shadow-cyan-500/30' : ''}`}>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden text-2xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <motion.div
                          className={`absolute -top-2 -right-2 w-6 h-6 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-green-500'} rounded-full flex items-center justify-center shadow-lg`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      </motion.div>

                      <div className="text-center">
                        <h3 className={`text-xl font-semibold ${themeClasses.primaryText} mb-1`}>{member.name}</h3>
                        <p className={`${theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'} font-medium mb-3`}>{member.role}</p>
                        <p className={`${themeClasses.secondaryText} text-sm mb-4`}>{member.description}</p>

                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {member.expertise.map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              className={`px-2 py-1 ${theme === 'dark' ? 'bg-slate-700 text-cyan-300 border border-slate-600' : 'bg-blue-100 text-blue-800'} rounded-full text-xs`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>

                        <motion.button
                          className={`${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Users className="w-4 h-4 inline mr-1" />
                          Connect
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-r from-slate-950 via-blue-950 to-purple-950' : 'bg-gradient-to-r from-blue-600 to-green-600'} relative overflow-hidden`}>
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-cyan-500/5' : 'bg-black/10'}`} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                variants={fadeInUp}
              >
                Ready to Experience the Future of Banking?
              </motion.h2>
              <motion.p 
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Join thousands of customers who have already transformed their banking experience with VaultX.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Link to="/customer/register">
                  <Button size="lg" className={`${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500' : 'bg-white text-blue-600 hover:bg-gray-100'} shadow-xl`}>
                    Open Your Account Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className={`${theme === 'dark' ? 'border-slate-400 text-slate-200 hover:bg-slate-800/30' : 'border-white text-white hover:bg-white/10'}`}>
                  <Star className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated Background Elements */}
          <motion.div
            className={`absolute top-10 left-10 w-32 h-32 border ${theme === 'dark' ? 'border-cyan-400/30' : 'border-white/20'} rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={`absolute bottom-10 right-10 w-24 h-24 border ${theme === 'dark' ? 'border-blue-400/30' : 'border-white/20'} rounded-full`}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
