/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Menu, X, Shield, Clock, Globe, ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: "Start", href: "#start" },
    { name: "Story", href: "#story" },
    { name: "Rates", href: "#rates" },
    { name: "Benefits", href: "#benefits" },
    { name: "FAQ", href: "#faq" },
  ];

  const fleet = [
    {
      name: "Global 7500",
      category: "Ultra Long Range",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop",
      seats: 19
    },
    {
      name: "Citation Longitude",
      category: "Super Mid-Size",
      image: "https://images.unsplash.com/photo-1610471206122-349f485038c3?q=80&w=800&auto=format&fit=crop",
      seats: 12
    },
    {
      name: "Phenom 300E",
      category: "Light Jet",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop",
      seats: 8
    }
  ];

  const benefits = [
    { icon: <Clock className="w-6 h-6" />, title: "Time Efficiency", description: "Bypass long lines and rigid schedules with direct departures." },
    { icon: <Shield className="w-6 h-6" />, title: "Absolute Privacy", description: "Your journey remains strictly confidential and secure." },
    { icon: <Globe className="w-6 h-6" />, title: "Global Access", description: "Land closer to your final destination in 5,000+ airports." },
  ];

  const benefitsRef = useRef(null);
  const fleetRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress: benefitsProgress } = useScroll({
    target: benefitsRef,
    offset: ["start end", "center center", "end start"]
  });
  const benefitsOpacity = useTransform(benefitsProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  const { scrollYProgress: fleetProgress } = useScroll({
    target: fleetRef,
    offset: ["start end", "center center", "end start"]
  });
  const fleetOpacity = useTransform(fleetProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "center center", "end start"]
  });
  const ctaOpacity = useTransform(ctaProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 scroll-smooth">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Global Fixed Background Video */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
            type="video/mp4"
          />
        </video>
        {/* Unified Overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="start" className="relative h-screen overflow-hidden">
          {/* Content Wrapper */}
          <div className="flex h-full flex-col">
            {/* Navigation Bar */}
            <nav className="mx-auto w-full max-w-7xl px-8 py-6">
            <div className="flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-semibold tracking-tight text-gray-900"
              >
                SkyElite
              </motion.div>

              <div className="hidden items-center gap-8 md:flex">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-xs font-medium tracking-wide text-gray-900 transition-colors uppercase hover:text-gray-500"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <button
                className="flex items-center justify-center rounded-md p-2 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-900" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-900" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-8 right-8 top-20 z-50 overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md md:hidden border border-gray-100"
                >
                  <div className="flex flex-col p-6 space-y-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium text-gray-900 transition-colors hover:text-gray-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Main Hero Content */}
          <main className="-mt-32 flex flex-1 items-center justify-center px-8 sm:-mt-40 md:-mt-60 lg:-mt-80">
            <div className="text-center">
              <motion.p 
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 0.8 }}
                className="mb-4 text-xs font-semibold text-gray-600 uppercase"
              >
                Private Jets
              </motion.p>

              <div className="relative mb-8 flex flex-col items-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-7xl font-normal leading-none tracking-tighter text-gray-400 sm:text-8xl md:text-9xl"
                >
                  Premium.
                </motion.h1>
                <motion.h1 
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="relative -mt-4 text-7xl font-normal leading-none tracking-tighter sm:-mt-6 sm:text-8xl md:-mt-8 md:text-9xl"
                  style={{ color: "#202A36" }}
                >
                  Accessible.
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mx-auto mb-10 max-w-2xl text-lg text-gray-500 md:text-xl"
              >
                Your dedication deserves recognition. Experience the pinnacle of aviation tailored to your lifestyle.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <button className="rounded-full bg-gray-100 px-10 py-4 text-sm font-medium text-gray-800 transition-all hover:bg-gray-200">
                  Discover
                </button>
                <button 
                  className="rounded-full px-10 py-4 text-sm font-medium text-white transition-all shadow-lg"
                  style={{ backgroundColor: "#202A36" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2d3c4d")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#202A36")}
                >
                  Book Now
                </button>
              </motion.div>
            </div>
          </main>
        </div>
      </section>

      {/* Benefits Content (Body) */}
      <motion.section 
        id="benefits" 
        ref={benefitsRef}
        style={{ opacity: benefitsOpacity }}
        className="py-24 bg-white/40 backdrop-blur-sm border-y border-white/20"
      >
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-white/40 shadow-sm backdrop-blur-md transition-all hover:bg-white/60 border border-white/30"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-900 shadow-sm transition-transform group-hover:scale-110">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Fleet Section (Body) */}
      <motion.section 
        id="story" 
        ref={fleetRef}
        style={{ opacity: fleetOpacity }}
        className="py-24 bg-transparent text-white md:text-gray-900"
      >
        <div className="mx-auto max-w-7xl px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-4 text-xs font-semibold tracking-widest text-gray-600 uppercase">Our Fleet</p>
              <h2 className="text-4xl font-normal tracking-tight md:text-5xl">The pinnacle of engineering.</h2>
            </div>
            <button className="group flex items-center gap-2 text-sm font-medium text-gray-900 md:text-gray-900">
              View all aircraft <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {fleet.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-md transition-all hover:shadow-2xl border border-white/40"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 p-8 text-white">
                  <p className="mb-1 text-xs font-medium text-gray-200">{item.category}</p>
                  <h3 className="text-2xl font-medium">{item.name}</h3>
                  <div className="mt-4 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm font-light">Up to {item.seats} passengers</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Banner */}
      <motion.section 
        ref={ctaRef}
        style={{ opacity: ctaOpacity }}
        className="py-24 bg-transparent"
      >
        <div className="mx-auto max-w-7xl px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#202A36" }}
          >
            <div className="relative z-10 mx-auto max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-4xl font-normal leading-tight md:text-6xl tracking-tight"
              >
                Your journey starts with a single click.
              </motion.h2>
              <button className="rounded-full bg-white px-12 py-5 text-sm font-semibold text-gray-900 transition-transform hover:scale-105">
                Request a Quote
              </button>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-xl pt-24 pb-12 border-t border-white/20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-12 border-b border-gray-200 pb-16 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">SkyElite</div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Elevating global travel through unmatched precision, privacy, and performance.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:text-gray-900 transition-colors shadow-sm"><Twitter size={18}/></a>
                <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:text-gray-900 transition-colors shadow-sm"><Instagram size={18}/></a>
                <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:text-gray-900 transition-colors shadow-sm"><Linkedin size={18}/></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Solutions</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900 transition-colors">On-Demand Charter</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Jet Card Program</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Aircraft Management</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Corporate Travel</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Global Partners</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Press Room</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Safety Protocols</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
            <p className="text-xs text-gray-400">© 2026 SkyElite Aviation. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Bespoke Inquiries</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
