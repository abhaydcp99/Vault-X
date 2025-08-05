import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Users,
  Clock,
  CreditCard,
  PieChart,
  Smartphone,
  Lock,
  Award,
  Star,
  TrendingUp,
  UserCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { useTheme, getThemeClasses } from "@/lib/themeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
      {/* Header */}
      <header
        className={`${themeClasses.headerBackground} border-b sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <motion.div
                className={`w-10 h-10 ${themeClasses.accentGradient} rounded-xl flex items-center justify-center`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
              >
                <span className="text-xl font-bold text-white">₹</span>
              </motion.div>
              <motion.span
                className={`text-2xl font-bold ${themeClasses.primaryText}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                VaultX
              </motion.span>
              <motion.span
                className={`${themeClasses.secondaryText} text-sm font-medium`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Digital Banking
              </motion.span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className={`${themeClasses.secondaryText} hover:${themeClasses.primaryText} transition-colors`}
              >
                Features
              </a>
              <Link
                to="/services"
                className={`${themeClasses.secondaryText} hover:${themeClasses.primaryText} transition-colors`}
              >
                Services
              </Link>
              <Link
                to="/about"
                className={`${themeClasses.secondaryText} hover:${themeClasses.primaryText} transition-colors`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`${themeClasses.secondaryText} hover:${themeClasses.primaryText} transition-colors`}
              >
                Contact
              </Link>
              <Link
                to="/backend-demo"
                className={`${themeClasses.secondaryText} hover:${themeClasses.primaryText} transition-colors`}
              >
                Backend Demo
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Theme-aware floating elements */}
        <div className="absolute inset-0">
          <motion.div
            className={`absolute top-20 left-20 w-72 h-72 ${themeClasses.floatingElements[0]} rounded-full blur-3xl`}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute bottom-20 right-20 w-96 h-96 ${themeClasses.floatingElements[1]} rounded-full blur-3xl`}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute top-1/2 left-1/4 w-64 h-64 ${themeClasses.floatingElements[2]} rounded-full blur-3xl`}
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Trust Badge */}
            <motion.div
              className={`inline-flex items-center space-x-2 ${themeClasses.cardBackground} rounded-full px-6 py-3 mb-8`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
              <span
                className={`${themeClasses.primaryText} text-sm font-medium`}
              >
                India's Most Trusted Digital Bank
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="mb-12">
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.span
                  className={`${themeClasses.accentGradient} bg-clip-text text-transparent`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  VaultX
                </motion.span>
              </motion.h1>
              <motion.p
                className={`text-2xl md:text-3xl ${themeClasses.secondaryText} mb-8 max-w-4xl mx-auto leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Experience the future of banking with instant transactions,
                <br />
                AI-powered security, and seamless digital experiences.
              </motion.p>
            </div>

            {/* Login Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link to="/employee/login">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    className={`w-64 ${themeClasses.primaryButton} text-white text-lg px-8 py-4 h-auto shadow-lg`}
                  >
                    <Building2 className="w-5 h-5 mr-3" />
                    System Login
                    <span className="text-xs ml-2 opacity-75"></span>
                  </Button>
                </motion.div>
              </Link>

              <Link to="/customer/login">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    className={`w-64 ${themeClasses.accentGradient} text-white font-semibold text-lg px-8 py-4 h-auto shadow-lg`}
                  >
                    <UserCheck className="w-5 h-5 mr-3" />
                    Customer Login
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Link to="/customer/register">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    className={`w-64 ${themeClasses.accentGradient} text-white font-semibold text-lg px-8 py-4 h-auto shadow-lg`}
                  >
                    <UserCheck className="w-5 h-5 mr-3" />
                    Open New Account
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {[
                { value: "10M+", label: "Happy Customers" },
                { value: "₹500Cr+", label: "Daily Transactions" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 2 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <h3
                    className={`text-3xl font-bold ${themeClasses.statsGradient}`}
                  >
                    {stat.value}
                  </h3>
                  <p className={`${themeClasses.mutedText} text-sm`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 ${themeClasses.featureBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className={`text-4xl md:text-5xl font-bold ${themeClasses.primaryText} mb-6`}
            >
              Why Choose VaultX?
            </h2>
            <p
              className={`text-xl ${themeClasses.secondaryText} max-w-2xl mx-auto`}
            >
              Experience banking reimagined with cutting-edge technology and
              unmatched security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`${themeClasses.featureCard} ${theme === "dark" ? "text-white" : "text-white"}`}
              >
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-14 h-14 ${theme === "dark" ? "bg-gradient-to-r from-emerald-400 to-cyan-500" : "bg-gradient-to-r from-green-400 to-emerald-500"} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Shield className="w-7 h-7 text-white" />
                  </motion.div>
                  <CardTitle
                    className={`text-lg mb-3 ${theme === "dark" ? "text-white" : "text-white"}`}
                  >
                    Bank-Grade Security
                  </CardTitle>
                  <CardDescription
                    className={`${theme === "dark" ? "text-slate-300" : "text-white/70"}`}
                  >
                    256-bit encryption and multi-factor authentication protect
                    your assets
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`${themeClasses.featureCard} ${theme === "dark" ? "text-white" : "text-white"}`}
              >
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-14 h-14 ${theme === "dark" ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gradient-to-r from-blue-400 to-cyan-500"} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-7 h-7 text-white" />
                  </motion.div>
                  <CardTitle
                    className={`text-lg mb-3 ${theme === "dark" ? "text-white" : "text-white"}`}
                  >
                    Instant KYC
                  </CardTitle>
                  <CardDescription
                    className={`${theme === "dark" ? "text-slate-300" : "text-white/70"}`}
                  >
                    Get verified in minutes with our AI-powered video KYC
                    technology
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`${themeClasses.featureCard} ${theme === "dark" ? "text-white" : "text-white"}`}
              >
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-14 h-14 ${theme === "dark" ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-purple-400 to-pink-500"} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Smartphone className="w-7 h-7 text-white" />
                  </motion.div>
                  <CardTitle
                    className={`text-lg mb-3 ${theme === "dark" ? "text-white" : "text-white"}`}
                  >
                    Mobile First
                  </CardTitle>
                  <CardDescription
                    className={`${theme === "dark" ? "text-slate-300" : "text-white/70"}`}
                  >
                    Access your account anywhere, anytime with our responsive
                    platform
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`${themeClasses.featureCard} ${theme === "dark" ? "text-white" : "text-white"}`}
              >
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-14 h-14 ${theme === "dark" ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-amber-400 to-orange-500"} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <PieChart className="w-7 h-7 text-white" />
                  </motion.div>
                  <CardTitle
                    className={`text-lg mb-3 ${theme === "dark" ? "text-white" : "text-white"}`}
                  >
                    Smart Analytics
                  </CardTitle>
                  <CardDescription
                    className={`${theme === "dark" ? "text-slate-300" : "text-white/70"}`}
                  >
                    Track expenses and manage finances with intelligent insights
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className={`py-20 ${themeClasses.trustBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              className={`flex flex-col items-center ${themeClasses.primaryText}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`w-20 h-20 ${theme === "dark" ? "bg-gradient-to-r from-emerald-400 to-cyan-500" : "bg-gradient-to-r from-green-400 to-emerald-500"} rounded-full flex items-center justify-center mb-6 shadow-xl ${theme === "dark" ? "shadow-emerald-500/20" : ""}`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              <h3
                className={`text-2xl font-bold mb-3 ${themeClasses.primaryText}`}
              >
                RBI Approved
              </h3>
              <p className={`${themeClasses.secondaryText}`}>
                Fully licensed and regulated by Reserve Bank of India
              </p>
            </motion.div>
            <motion.div
              className={`flex flex-col items-center ${themeClasses.primaryText}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`w-20 h-20 ${theme === "dark" ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gradient-to-r from-blue-400 to-cyan-500"} rounded-full flex items-center justify-center mb-6 shadow-xl ${theme === "dark" ? "shadow-cyan-500/20" : ""}`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>
              <h3
                className={`text-2xl font-bold mb-3 ${themeClasses.primaryText}`}
              >
                DICGC Insured
              </h3>
              <p className={`${themeClasses.secondaryText}`}>
                Your deposits are protected up to ₹5 lakhs
              </p>
            </motion.div>
            <motion.div
              className={`flex flex-col items-center ${themeClasses.primaryText}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`w-20 h-20 ${theme === "dark" ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-amber-400 to-orange-500"} rounded-full flex items-center justify-center mb-6 shadow-xl ${theme === "dark" ? "shadow-amber-500/20" : ""}`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Star className="w-10 h-10 text-white" />
              </motion.div>
              <h3
                className={`text-2xl font-bold mb-3 ${themeClasses.primaryText}`}
              >
                ISO Certified
              </h3>
              <p className={`${themeClasses.secondaryText}`}>
                International standards for quality and security
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${themeClasses.footerBackground} ${themeClasses.primaryText} py-16`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  className={`w-10 h-10 ${theme === "dark" ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gradient-to-r from-amber-400 to-orange-500"} rounded-xl flex items-center justify-center`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xl font-bold text-white">₹</span>
                </motion.div>
                <span
                  className={`text-2xl font-bold ${themeClasses.primaryText}`}
                >
                  VaultX
                </span>
              </div>
              <p className={`${themeClasses.secondaryText} leading-relaxed`}>
                Your trusted partner for secure and modern banking solutions in
                the digital age.
              </p>
            </div>
            <div>
              <h4
                className={`text-lg font-semibold mb-6 ${themeClasses.primaryText}`}
              >
                Services
              </h4>
              <ul className={`space-y-3 ${themeClasses.secondaryText}`}>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Personal Banking
                </li>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Business Banking
                </li>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Digital Payments
                </li>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Investment Services
                </li>
              </ul>
            </div>
            <div>
              <h4
                className={`text-lg font-semibold mb-6 ${themeClasses.primaryText}`}
              >
                Support
              </h4>
              <ul className={`space-y-3 ${themeClasses.secondaryText}`}>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Customer Care
                </li>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Branch Locator
                </li>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Help Center
                </li>
                <li
                  className={`hover:${themeClasses.primaryText} cursor-pointer transition-colors`}
                >
                  Security Center
                </li>
              </ul>
            </div>
            <div>
              <h4
                className={`text-lg font-semibold mb-6 ${themeClasses.primaryText}`}
              >
                Contact
              </h4>
              <ul className={`space-y-3 ${themeClasses.secondaryText}`}>
                <li>1800-VAULTX-1</li>
                <li>support@vaultx.com</li>
                <li>Main Branch, Financial District</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div
            className={`border-t ${theme === "dark" ? "border-slate-700/50" : "border-white/20"} mt-12 pt-8 text-center ${themeClasses.secondaryText}`}
          >
            <p>
              &copy; 2024 VaultX. All rights reserved. | Privacy Policy | Terms
              of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
