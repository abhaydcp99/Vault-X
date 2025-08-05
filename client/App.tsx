import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/themeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeRegister from "./pages/EmployeeRegister";
import ClerkDashboard from "./pages/ClerkDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Customer Routes */}
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />

          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/register" element={<EmployeeRegister />} />
          <Route path="/admin/login" element={<EmployeeLogin />} />

          {/* Employee Dashboards */}
          <Route path="/clerk/dashboard" element={<ClerkDashboard />} />
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
