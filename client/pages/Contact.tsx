import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, MapPin, Phone, Mail, Clock, Send, User, 
  MessageSquare, Building, Calendar, Headphones, Globe,
  Shield, Star, CheckCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTheme, getThemeClasses } from '@/lib/themeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Contact = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: ''
  });

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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["CDAC Mumbai", "Pune University Campus", "Ganeshkhind, Pune - 411007", "Maharashtra, India"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 1800-VAULTX-1", "+91 20-2570-4000", "24/7 Customer Support", "Emergency Helpline"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@vaultx.com", "business@vaultx.com", "careers@vaultx.com", "press@vaultx.com"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed", "24/7 Online Banking"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const departments = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "business", label: "Business Banking" },
    { value: "loans", label: "Loans & Credit" },
    { value: "investments", label: "Investment Services" },
    { value: "complaints", label: "Complaints & Feedback" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      department: ''
    });
  };

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
                <Badge className={`mb-4 ${themeClasses.cardBackground} border`}>
                  <Headphones className="w-4 h-4 mr-2" />
                  Contact Us
                </Badge>
              </motion.div>
              
              <motion.h1 
                className={`text-4xl md:text-6xl font-bold ${themeClasses.primaryText} mb-6`}
                variants={fadeInUp}
              >
                Get in Touch
                <motion.span 
                  className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block`}
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  We're Here to Help
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto mb-8`}
                variants={fadeInUp}
              >
                Have questions about our services? Need technical support? Want to explore business partnerships? 
                Our team is ready to assist you 24/7.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Button size="lg" className={themeClasses.primaryButton}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: 1800-VAULTX-1
                </Button>
                <Button variant="outline" size="lg" className={themeClasses.secondaryButton}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className={`absolute top-20 left-10 w-20 h-20 ${themeClasses.floatingElements[0]} rounded-full opacity-30`}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className={`absolute top-40 right-10 w-16 h-16 ${themeClasses.floatingElements[1]} rounded-full opacity-30`}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}>Contact Information</h2>
              <p className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}>
                Multiple ways to reach us. Choose what works best for you.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${themeClasses.cardBackground} group`}>
                    <CardContent className="p-6 text-center">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <info.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className={`text-xl font-semibold ${themeClasses.primaryText} mb-4`}>{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className={`text-sm ${themeClasses.mutedText}`}>{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className={`py-20 ${themeClasses.cardBackground}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className={`border-0 shadow-xl ${themeClasses.cardBackground}`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${themeClasses.primaryText} flex items-center`}>
                      <MessageSquare className="w-6 h-6 mr-2" />
                      Send us a Message
                    </CardTitle>
                    <p className={themeClasses.secondaryText}>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className={themeClasses.primaryText}>Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className={`${themeClasses.cardBackground} border`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className={themeClasses.primaryText}>Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email"
                            required
                            className={`${themeClasses.cardBackground} border`}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className={themeClasses.primaryText}>Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                            className={`${themeClasses.cardBackground} border`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department" className={themeClasses.primaryText}>Department *</Label>
                          <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                            <SelectTrigger className={`${themeClasses.cardBackground} border`}>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.value} value={dept.value}>
                                  {dept.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" className={themeClasses.primaryText}>Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Brief description of your inquiry"
                          required
                          className={`${themeClasses.cardBackground} border`}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className={themeClasses.primaryText}>Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Please provide details about your inquiry..."
                          required
                          rows={6}
                          className={`${themeClasses.cardBackground} border`}
                        />
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" className={`w-full ${themeClasses.primaryButton}`}>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className={`border-0 shadow-xl ${themeClasses.cardBackground} h-full`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${themeClasses.primaryText} flex items-center`}>
                      <MapPin className="w-6 h-6 mr-2" />
                      Our Location
                    </CardTitle>
                    <p className={themeClasses.secondaryText}>
                      Visit us at our headquarters in CDAC Mumbai campus.
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Embedded Google Map for CDAC Mumbai */}
                    <div className="relative h-96 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.060396952581!2d73.8567437!3d18.5204303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(C-DAC)!5e0!3m2!1sen!2sin!4v1635872400000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="CDAC Mumbai Location"
                        className="filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      
                      {/* Overlay with office details */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.div 
                          className={`${themeClasses.cardBackground} p-4 rounded-lg shadow-lg border backdrop-blur-sm`}
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <Building className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className={`font-semibold ${themeClasses.primaryText}`}>VaultX Headquarters</h4>
                              <p className={`text-sm ${themeClasses.mutedText}`}>CDAC Mumbai Campus</p>
                              <p className={`text-sm ${themeClasses.mutedText}`}>Pune University Campus, Ganeshkhind</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Open Now
                                </Badge>
                                <span className={`text-xs ${themeClasses.mutedText}`}>9:00 AM - 6:00 PM</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}>Quick Answers</h2>
              <p className={`text-xl ${themeClasses.secondaryText}`}>
                Find instant answers to common questions.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  question: "What are your customer support hours?",
                  answer: "Our customer support is available 24/7 for all your banking needs. You can reach us via phone, email, or live chat."
                },
                {
                  question: "How do I open a new account?",
                  answer: "You can open an account online in minutes or visit our nearest branch. Just have your ID and address proof ready."
                },
                {
                  question: "Is my money safe with VaultX?",
                  answer: "Yes, all deposits are insured and we use bank-grade security measures including 256-bit encryption to protect your data."
                },
                {
                  question: "Do you offer business banking services?",
                  answer: "Yes, we provide comprehensive business banking solutions including current accounts, loans, and merchant services."
                }
              ].map((faq, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${themeClasses.cardBackground}`}>
                    <CardContent className="p-6">
                      <h4 className={`font-semibold ${themeClasses.primaryText} mb-3`}>{faq.question}</h4>
                      <p className={`text-sm ${themeClasses.mutedText} leading-relaxed`}>{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={`py-20 ${themeClasses.accentGradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
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
                Still Have Questions?
              </motion.h2>
              <motion.p 
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Our expert team is standing by to help you with any questions about our banking services.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Now
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Star className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated Background Elements */}
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </section>
      </div>
    </div>
  );
};

export default Contact;
