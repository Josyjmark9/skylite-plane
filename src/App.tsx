import { useState, useEffect, useRef } from "react";
import { Menu, X, Shield, Clock, Globe, ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import gsap from "gsap";

const MouseRipple = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime.current < 80) return; // Drottle
      lastTime.current = now;
      
      const newRipple = { id: now, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-10), newRipple]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute rounded-full border border-white/10"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              boxShadow: "0 0 20px rgba(255,255,255,0.05)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(heroScrollProgress, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const textSpread = useTransform(heroScrollProgress, [0, 1], ["0px", "100px"]);
  const blurValue = useTransform(heroScrollProgress, [0, 0.5], ["blur(0px)", "blur(10px)"]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  const navLinks = [
    { name: "Start", href: "#start" },
    { name: "Story", href: "#story" },
    { name: "Safety", href: "#safety" },
    { name: "Fleet", href: "#fleet" },
  ];

  const fleet = [
    { name: "G650ER", category: "Ultra Long Range", seats: 16, image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop" },
    { name: "Global 7500", category: "The Ultimate", seats: 19, image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800&auto=format&fit=crop" },
    { name: "Challenger 350", category: "Super Midsize", seats: 10, image: "https://images.unsplash.com/photo-1520437358207-353af3a7135e?q=80&w=800&auto=format&fit=crop" },
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, title: "Supreme Safety", description: "Every mission is audited to the highest global safety standards." },
    { icon: <Clock className="w-6 h-6" />, title: "Ultimate Privacy", description: "Discreet operations keeping your travel plans absolutely confidential." },
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
    <div className="relative min-h-screen bg-[#0a0a0a] text-gray-100 scroll-smooth selection:bg-white selection:text-black overflow-x-hidden">
      <MouseRipple />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white/40 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section id="start" ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Video in Header */}
        <motion.div 
          style={{ scale: bgScale, opacity: heroOpacity, filter: blurValue }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
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
          {/* Transition Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Navigation Bar */}
          <nav className="mx-auto w-full max-w-7xl px-8 py-8">
            <div className="flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-semibold tracking-tighter text-white italic"
              >
                Josiah Johnmark
              </motion.div>

              <div className="hidden items-center gap-12 md:flex">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="group relative text-xs font-bold tracking-[0.2em] text-white/50 transition-colors uppercase hover:text-white"
                  >
                    {link.name}
                    <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-white transition-all group-hover:w-full" />
                  </motion.a>
                ))}
              </div>

              <button
                className="flex items-center justify-center rounded-full bg-white/5 p-4 md:hidden text-white backdrop-blur-md border border-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute left-8 right-8 top-24 z-50 overflow-hidden rounded-[2rem] bg-[#141414]/95 border border-white/10 shadow-2xl backdrop-blur-2xl md:hidden"
                >
                  <div className="flex flex-col p-10 space-y-8">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-light text-white tracking-tight hover:text-gray-400 transition-colors"
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
          <main className="flex flex-1 items-center justify-center px-8">
            <div className="text-center w-full max-w-5xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-8 inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase backdrop-blur-md"
              >
                Bespoke Flight Engineering
              </motion.div>

              <div className="relative mb-12 flex flex-col items-center">
                <motion.div 
                   style={{ gap: textSpread, opacity: heroOpacity }}
                   className="flex justify-center flex-wrap"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-8xl font-thin tracking-tighter text-white/30 sm:text-9xl md:text-[12rem]"
                  >
                    Timeless.
                  </motion.h1>
                </motion.div>
                
                <motion.div 
                   style={{ gap: textSpread, opacity: heroOpacity }}
                   className="flex justify-center flex-wrap -mt-8 md:-mt-16"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-8xl font-bold tracking-tighter text-white sm:text-9xl md:text-[12rem]"
                  >
                    Exceptional.
                  </motion.h1>
                </motion.div>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mx-auto mb-16 max-w-2xl text-xl text-gray-400 font-light leading-relaxed md:text-3xl"
              >
                Josiah Johnmark: Translating Nigerian ingenuity into the world's most refined aviation experiences.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap items-center justify-center gap-10"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-full border border-white/20 bg-[#141414] px-14 py-6 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-white hover:text-black"
                >
                  Explore Fleet
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-white px-14 py-6 text-xs font-black tracking-[0.2em] text-black transition-all shadow-[0_20px_40px_rgba(255,255,255,0.15)] group uppercase"
                >
                  Request Voyage
                </motion.button>
              </motion.div>
            </div>
          </main>
        </div>
      </section>

      {/* Parallax Section 1: Benefits */}
      <motion.section 
        id="benefits" 
        ref={benefitsRef}
        style={{ opacity: benefitsOpacity }}
        className="relative py-60 overflow-hidden"
      >
        <motion.div 
          style={{ 
            scale: useTransform(benefitsProgress, [0, 1], [1, 1.5]),
            y: useTransform(benefitsProgress, [0, 1], [0, 150])
          }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1544474735-a7460dec230f?q=80&w=2400&auto=format&fit=crop" 
            alt="Vintage Background" 
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                whileHover={{ y: -20, rotate: idx % 2 === 0 ? 1 : -1 }}
                className="group p-14 rounded-[4rem] bg-[#141414]/90 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-700 hover:border-white/20 hover:bg-[#1a1a1a]"
              >
                <div className="mb-12 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/5 text-white border border-white/10 transition-all group-hover:bg-white group-hover:text-black">
                  {benefit.icon}
                </div>
                <h3 className="mb-6 text-4xl font-extralight tracking-tight text-white">{benefit.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Parallax Section 2: Our Fleet */}
      <motion.section 
        id="story" 
        ref={fleetRef}
        style={{ opacity: fleetOpacity }}
        className="relative py-60 overflow-hidden"
      >
        <motion.div 
          style={{ 
            scale: useTransform(fleetProgress, [0, 1], [1, 1.4]),
            rotate: useTransform(fleetProgress, [0, 1], [0, 5])
          }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1518933221971-da01202e0b57?q=80&w=2400&auto=format&fit=crop" 
            alt="Legacy Image" 
            className="w-full h-full object-cover opacity-15 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2 }}
            className="mb-32 flex flex-col justify-between gap-12 md:flex-row md:items-end"
          >
            <div className="max-w-3xl">
              <p className="mb-8 text-xs font-black tracking-[0.5em] text-white/20 uppercase">Engineering Perfection</p>
              <h2 className="text-7xl font-extralight tracking-tighter md:text-9xl text-white">The Josiah <br /> <span className="italic font-normal">Standard.</span></h2>
            </div>
            <button className="group flex items-center gap-6 text-2xl font-thin text-white/40 hover:text-white transition-all">
              <span className="border-b border-white/10 pb-2">Full Inventory</span> 
              <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-4" />
            </button>
          </motion.div>

          <div className="grid gap-16 md:grid-cols-3">
            {fleet.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
                className="group relative h-[700px] overflow-hidden rounded-[5rem] bg-[#141414] border border-white/5 shadow-2xl"
              >
                <div className="h-full w-full overflow-hidden">
                  <motion.img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 p-16 text-white w-full">
                  <p className="mb-4 text-[10px] font-bold text-white/30 tracking-[0.4em] uppercase">{item.category}</p>
                  <h3 className="text-5xl font-thin tracking-tighter mb-4">{item.name}</h3>
                  <div className="h-0 overflow-hidden transition-all duration-700 group-hover:h-16 group-hover:mt-8 opacity-0 group-hover:opacity-100">
                    <p className="text-xl font-light text-white/40 italic">Configuration for {item.seats} VIPs</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Parallax Section 3: CTA */}
      <motion.section 
        ref={ctaRef}
        style={{ opacity: ctaOpacity }}
        className="relative py-80 overflow-hidden"
      >
        <motion.div 
          style={{ 
            scale: useTransform(ctaProgress, [0, 1], [1.5, 1]),
            rotate: useTransform(ctaProgress, [0, 1], [-10, 0])
          }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2400&auto=format&fit=crop" 
            alt="Horizon" 
            className="w-full h-full object-cover opacity-10 grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="rounded-[6rem] p-32 md:p-52 text-center text-white relative overflow-hidden bg-[#141414]/80 border border-white/5 shadow-[0_100px_200px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
          >
            <div className="relative z-10 mx-auto max-w-4xl">
              <motion.h2 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-16 text-7xl font-extralight leading-[1] md:text-9xl tracking-tighter"
              >
                Expand your <br /> <span className="italic font-normal">legacy.</span>
              </motion.h2>
              <motion.button 
                whileHover={{ scale: 1.1, boxShadow: "0 0 100px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white px-20 py-8 text-xs font-black tracking-[0.4em] text-black transition-all uppercase shadow-[0_0_80px_rgba(255,255,255,0.2)]"
              >
                Secure Access
              </motion.button>
            </div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full -mr-64 -mt-64 blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full -ml-64 -mb-64 blur-[200px]" />
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#050505] pt-60 pb-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-white/[0.01] rounded-t-full blur-[200px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <div className="grid gap-32 border-b border-white/5 pb-40 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <motion.div 
                whileHover={{ x: 20 }}
                className="text-5xl font-semibold tracking-tighter text-white mb-12 italic"
              >
                Josiah Johnmark
              </motion.div>
              <p className="text-gray-500 text-xl leading-relaxed mb-16 max-w-sm font-thin">
                Pioneering the future of elite travel, Josiah Johnmark brings a signature blend of Nigerian innovation and global sophistication to the skies.
              </p>
              <div className="flex gap-10">
                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    whileHover={{ scale: 1.2, color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
                    className="p-5 rounded-3xl bg-white/5 text-gray-400 transition-all border border-white/5"
                  >
                    <Icon size={28}/>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-12 text-xs tracking-[0.4em] uppercase opacity-40">The Fleet</h4>
              <ul className="space-y-6 text-lg text-gray-500 font-extralight tracking-wide">
                {["Private Charters", "Membership", "Management", "Acquisitions"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-12 text-xs tracking-[0.4em] uppercase opacity-40">Heritage</h4>
              <ul className="space-y-6 text-lg text-gray-500 font-extralight tracking-wide">
                {["The Vision", "Nigerian Roots", "Partnerships", "Archive"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="relative group">
              <h4 className="font-bold text-white mb-12 text-xs tracking-[0.4em] uppercase opacity-40">Concierge</h4>
              <ul className="space-y-6 text-lg text-gray-500 font-extralight tracking-wide">
                {["Privileged Access", "Safety", "Liaison", "Contact"].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
              <div className="absolute -inset-8 bg-white/[0.03] rounded-[4rem] -z-10 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 blur-2xl" />
            </div>
          </div>
          
          <div className="mt-32 flex flex-col items-center justify-between gap-16 md:flex-row md:gap-0">
            <p className="text-lg text-gray-700 font-thin tracking-widest italic uppercase">© 2026 Josiah Johnmark. Precision. Power. Peace.</p>
            <div className="flex gap-16 text-[10px] text-gray-700 uppercase tracking-[0.5em] font-black">
              {["Privacy", "Terms", "Security"].map((t) => (
                <a key={t} href="#" className="hover:text-white transition-colors">{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
