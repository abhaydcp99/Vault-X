import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, Shield, CreditCard, Smartphone, Globe, Zap, 
  TrendingUp, Lock, Wallet, Building, Users, ArrowRight, 
  CheckCircle, Star, Phone, Clock, Crown, Banknote, Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme, getThemeClasses } from '@/lib/themeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Services = () => {
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

  const services = [
    {
      icon: Wallet,
      title: "Personal Banking",
      description: "Complete banking solutions for your everyday financial needs",
      features: ["Zero Balance Savings Account", "High Interest FDs", "Easy Money Transfers", "24/7 Customer Support"],
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      icon: CreditCard,
      title: "Credit Cards",
      description: "Premium credit cards with exclusive benefits and rewards",
      features: ["Cashback Rewards", "Zero Annual Fee", "Airport Lounge Access", "Travel Insurance"],
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      icon: Building,
      title: "Business Banking",
      description: "Tailored solutions for businesses of all sizes",
      features: ["Current Account", "Business Loans", "Corporate Cards", "Merchant Services"],
      color: "from-green-500 to-emerald-500",
      popular: false
    },
    {
      icon: TrendingUp,
      title: "Investment Services",
      description: "Grow your wealth with our investment solutions",
      features: ["Mutual Funds", "Stock Trading", "Portfolio Management", "Expert Advisory"],
      color: "from-orange-500 to-red-500",
      popular: false
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Comprehensive insurance solutions for peace of mind",
      features: ["Life Insurance", "Health Insurance", "Vehicle Insurance", "Property Insurance"],
      color: "from-indigo-500 to-blue-500",
      popular: false
    },
    {
      icon: Smartphone,
      title: "Digital Banking",
      description: "Banking reimagined for the digital age",
      features: ["Mobile Banking App", "UPI Payments", "QR Code Payments", "Digital Wallet"],
      color: "from-teal-500 to-green-500",
      popular: false
    }
  ];

  const premiumFeatures = [
    {
      icon: Crown,
      title: "VaultX Premium",
      description: "Exclusive banking with premium benefits",
      benefits: ["Dedicated Relationship Manager", "Priority Customer Service", "Exclusive Lounge Access", "Premium Debit Card"]
    },
    {
      icon: Globe,
      title: "International Banking",
      description: "Banking across borders made simple",
      benefits: ["Foreign Exchange", "International Wire Transfers", "Multi-Currency Accounts", "Global ATM Access"]
    },
    {
      icon: Lock,
      title: "Wealth Management",
      description: "Personalized wealth management solutions",
      benefits: ["Investment Planning", "Tax Optimization", "Estate Planning", "Portfolio Review"]
    }
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
                <Badge className={`mb-4 ${themeClasses.cardBackground} border`}>
                  <Building className="w-4 h-4 mr-2" />
                  Our Services
                </Badge>
              </motion.div>
              
              <motion.h1 
                className={`text-4xl md:text-6xl font-bold ${themeClasses.primaryText} mb-6`}
                variants={fadeInUp}
              >
                Banking Services
                <motion.span 
                  className={`text-transparent bg-clip-text ${themeClasses.accentGradient} block`}
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: "100% 50%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  Designed for You
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className={`text-xl ${themeClasses.secondaryText} max-w-3xl mx-auto mb-8`}
                variants={fadeInUp}
              >
                Discover comprehensive banking solutions tailored to meet your financial goals. 
                From everyday banking to wealth management, we've got you covered.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Link to="/customer/register">
                  <Button size="lg" className={themeClasses.primaryButton}>
                    Open Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className={themeClasses.secondaryButton}>
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
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
          <motion.div
            className={`absolute bottom-20 left-1/4 w-12 h-12 ${themeClasses.floatingElements[2]} rounded-full opacity-30`}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}>Complete Banking Solutions</h2>
              <p className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}>
                Everything you need for your financial journey, all in one place.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={scaleIn} className="relative">
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${themeClasses.cardBackground} group`}>
                    <CardHeader className="text-center pb-4">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className={`text-xl ${themeClasses.primaryText} mb-3`}>{service.title}</CardTitle>
                      <p className={`${themeClasses.secondaryText} text-sm`}>{service.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className={`text-sm ${themeClasses.mutedText}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className={`w-full ${themeClasses.primaryButton}`}>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Premium Services */}
        <section className={`py-20 ${themeClasses.cardBackground}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.primaryText} mb-4`}>Premium Services</h2>
              <p className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}>
                Exclusive services for our valued customers who deserve the best.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {premiumFeatures.map((feature, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${themeClasses.cardBackground} border border-gradient group`}>
                    <CardContent className="p-8 text-center">
                      <motion.div 
                        className={`w-16 h-16 ${themeClasses.accentGradient} rounded-full flex items-center justify-center mx-auto mb-6`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className={`text-xl font-semibold ${themeClasses.primaryText} mb-3`}>{feature.title}</h3>
                      <p className={`${themeClasses.secondaryText} mb-6`}>{feature.description}</p>
                      
                      <div className="space-y-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <motion.div 
                            key={benefitIndex} 
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: benefitIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                            <span className={`text-sm ${themeClasses.mutedText}`}>{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div
                        className="mt-6"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className={`w-full ${themeClasses.secondaryButton} group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all`}
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade Now
                        </Button>
                      </motion.div>
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
                Ready to Experience Premium Banking?
              </motion.h2>
              <motion.p 
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Join thousands of customers who have transformed their financial journey with VaultX services.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <Link to="/customer/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Clock className="w-4 h-4 mr-2" />
                  Book Appointment
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

export default Services;
