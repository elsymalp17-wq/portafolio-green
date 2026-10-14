import React, { useState, useEffect, useRef } from 'react';
import {
  Leaf,
  Droplets,
  ShieldCheck,
  Award,
  FileText,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Layers,
  Download,
  Sparkles,
  ArrowRight,
  Send,
  Globe,
  Users,
  CheckCircle2,
  BookOpen,
  Compass,
  HardHat,
  Cpu,
  BarChart3,
  Flame,
  Check,
  Printer,
  Copy,
  MessageSquare,
  Info
} from 'lucide-react';
import { CV_DATA } from './data/cvData.ts';
import { generateCvPdf, printCvClean } from './utils/generatePdf.ts';

export default function App() {
  const [scrolledPastCover, setScrolledPastCover] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('cover');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillsTab, setActiveSkillsTab] = useState<'software' | 'normativa' | 'ssoma' | 'blandas'>('software');
  const [showCvModal, setShowCvModal] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [typewriterPhrase, setTypewriterPhrase] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    triggerToast('Generando documento PDF oficial...');
    try {
      generateCvPdf();
      setTimeout(() => {
        triggerToast('¡Archivo PDF generado y descargado con éxito!');
        setDownloadingPdf(false);
      }, 500);
    } catch (err) {
      console.error('Error al generar PDF:', err);
      printCvClean();
      setDownloadingPdf(false);
    }
  };

  const handlePrintCv = () => {
    triggerToast('Preparando vista de impresión sin fondos oscuros...');
    printCvClean();
  };

  const handleCopyCvText = () => {
    const fullText = `${CV_DATA.fullName}
${CV_DATA.fullTitle}
Tel: ${CV_DATA.phone} | Email: ${CV_DATA.email} | Ubicación: ${CV_DATA.location}
LinkedIn: ${CV_DATA.linkedInUser}
${CV_DATA.availability}

RESUMEN PROFESIONAL:
${CV_DATA.summary}

EXPERIENCIA:
${CV_DATA.experiences.map(e => `• ${e.role} - ${e.company} (${e.period})\n  Logros: ${e.achievements.join(', ')}`).join('\n')}

EDUCACIÓN:
${CV_DATA.education[0].degree} - ${CV_DATA.education[0].institution} (${CV_DATA.education[0].period})

REFERENCIA:
${CV_DATA.reference.name} - ${CV_DATA.reference.role} (Tel: ${CV_DATA.reference.phone})`;

    navigator.clipboard.writeText(fullText).then(() => {
      triggerToast('¡Datos del CV copiados al portapapeles!');
    }).catch(() => {
      triggerToast('Texto listo para copiar.');
    });
  };

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    asunto: '',
    mensaje: ''
  });

  // Animated counters
  const [counts, setCounts] = useState({
    compliance: 0,
    operations: 0,
    fieldwork: 0,
    courses: 0
  });
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Typewriter phrases
  const phrases = [
    "Monitoreo de PTARI y Calidad de Efluentes",
    "Control Documentario SSOMA & Anexo 5",
    "Gestión de Residuos Sólidos (SIGERSOL)",
    "Instrumentos de Gestión Ambiental (EIA / IGA)",
    "Régimen Atípico 14x7 / 20x10 & Reubicación Nacional"
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = phrases[typewriterIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypewriterPhrase(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypewriterPhrase(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTypewriterIndex(prev => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 35 : 75);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typewriterIndex]);

  // Scroll listener for Navbar visibility, progress bar & active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalDocHeight = document.documentElement.scrollHeight - windowHeight;

      // Progress bar
      if (totalDocHeight > 0) {
        setScrollProgress((scrollY / totalDocHeight) * 100);
      }

      // Show navbar when scrolled past 75% of cover
      if (scrollY > windowHeight * 0.75) {
        setScrolledPastCover(true);
      } else {
        setScrolledPastCover(false);
      }

      // Section spy
      const sections = ['cover', 'hero', 'sobre-mi', 'experiencia', 'educacion', 'habilidades', 'certificaciones', 'contacto'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Trigger stats counter when visible
      const statsEl = document.getElementById('stats-grid');
      if (statsEl && !statsAnimated) {
        const rect = statsEl.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.85) {
          setStatsAnimated(true);
          // Animate counters
          animateCounters();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const animateCounters = () => {
    let start = 0;
    const duration = 1500;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        compliance: Math.min(100, Math.floor(progress * 100)),
        operations: Math.min(2, Math.floor(progress * 2)),
        fieldwork: Math.min(15, Math.floor(progress * 15)),
        courses: Math.min(6, Math.floor(progress * 6))
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          compliance: 100,
          operations: 2,
          fieldwork: 15,
          courses: 6
        });
      }
    }, interval);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.nombre.trim() || !formData.mensaje.trim()) {
      triggerToast('Por favor completa al menos tu Nombre y Mensaje.');
      return;
    }
    const text = `¡Hola Elsy! Te contacto desde tu Portafolio Web:\n\n👤 *Nombre:* ${formData.nombre}\n📧 *Correo:* ${formData.email || 'No especificado'}\n🏢 *Empresa:* ${formData.empresa || 'No especificada'}\n📌 *Asunto:* ${formData.asunto || 'Consulta / Requerimiento'}\n\n💬 *Mensaje:* ${formData.mensaje}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/51918246429?text=${encoded}`;
    window.open(url, '_blank');
    triggerToast('Abriendo WhatsApp para enviar a +51 918 246 429...');
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ nombre: '', email: '', empresa: '', asunto: '', mensaje: '' });
    }, 5000);
  };

  const handleSendEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.nombre.trim() || !formData.mensaje.trim()) {
      triggerToast('Por favor completa al menos tu Nombre y Mensaje.');
      return;
    }
    const subject = encodeURIComponent(formData.asunto ? `[Portafolio] ${formData.asunto} - ${formData.nombre}` : `[Portafolio] Mensaje de contacto - ${formData.nombre}`);
    const body = encodeURIComponent(`Hola Elsy,\n\nTe contacto desde tu portafolio web con la siguiente información:\n\n• Nombre: ${formData.nombre}\n• Correo: ${formData.email}\n• Empresa / Operación: ${formData.empresa || 'N/A'}\n• Asunto: ${formData.asunto || 'N/A'}\n\n• Mensaje:\n${formData.mensaje}\n\nSaludos cordiales.`);
    const mailtoUrl = `mailto:${CV_DATA.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    triggerToast('Abriendo tu correo para enviar a elsymalp17@gmail.com...');
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ nombre: '', email: '', empresa: '', asunto: '', mensaje: '' });
    }, 5000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendWhatsApp(e);
  };

  return (
    <div className="min-h-screen bg-white text-[#2D3436] font-body relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div
        className={`fixed top-0 left-0 h-1.5 z-50 transition-opacity duration-300 ${
          scrolledPastCover ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #2D6A4F, #52B788, #C9A84C)'
        }}
      />

      {/* ═══════════════════════════════════════════════════
          1. CARÁTULA / COVER PAGE A PANTALLA COMPLETA (100vh)
          ═══════════════════════════════════════════════════ */}
      <header
        id="cover"
        className="relative w-screen h-screen min-h-[640px] flex flex-col items-center justify-center text-center px-4 overflow-hidden z-20"
        style={{
          background: 'radial-gradient(circle at center, #1B4332 0%, #0d281e 65%, #05140e 100%)'
        }}
      >
        {/* Topographic Lines Background Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(#95D5B2 1.2px, transparent 1.2px), radial-gradient(#C9A84C 1.2px, #05140e 1.2px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px'
          }}
        />

        {/* Contour waves pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.09]"
          style={{
            background: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 45px, rgba(149, 213, 178, 0.45) 46px, transparent 47px)'
          }}
        />

        {/* Floating Spores / Fireflies */}
        <div className="spore-particle" style={{ left: '12%', animationDuration: '7.5s', animationDelay: '0.2s' }} />
        <div className="spore-particle" style={{ left: '26%', animationDuration: '9.2s', animationDelay: '1.4s' }} />
        <div className="spore-particle" style={{ left: '48%', animationDuration: '6.8s', animationDelay: '0.6s' }} />
        <div className="spore-particle" style={{ left: '68%', animationDuration: '8.4s', animationDelay: '2.1s' }} />
        <div className="spore-particle" style={{ left: '84%', animationDuration: '10s', animationDelay: '1.1s' }} />
        <div className="spore-particle" style={{ left: '92%', animationDuration: '7.8s', animationDelay: '2.8s' }} />

        {/* Ambient Leaves Floating */}
        <div className="floating-cover-leaf" style={{ top: '10%', left: '8%', width: '56px', height: '56px', animationDuration: '8s' }}>
          <svg viewBox="0 0 24 24" fill="#95D5B2" className="opacity-20 w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25V8.25C12,7.25 16,7 17,8Z" />
          </svg>
        </div>
        <div className="floating-cover-leaf" style={{ top: '16%', right: '10%', width: '68px', height: '68px', animationDuration: '11s', animationDelay: '1.5s' }}>
          <svg viewBox="0 0 24 24" fill="#52B788" className="opacity-20 w-full h-full">
            <path d="M2.5,19C2,17 3.5,14 6,11C9,8 14.5,4 20,4C20,9.5 16,15 13,18C10,20.5 7,22 5,21.5L2.5,19Z" />
          </svg>
        </div>
        <div className="floating-cover-leaf" style={{ bottom: '15%', left: '12%', width: '60px', height: '60px', animationDuration: '9s', animationDelay: '2s' }}>
          <svg viewBox="0 0 24 24" fill="#40916C" className="opacity-20 w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25V8.25C12,7.25 16,7 17,8Z" />
          </svg>
        </div>
        <div className="floating-cover-leaf" style={{ bottom: '18%', right: '14%', width: '48px', height: '48px', animationDuration: '7s', animationDelay: '0.7s' }}>
          <svg viewBox="0 0 24 24" fill="#D8F3DC" className="opacity-20 w-full h-full">
            <path d="M2.5,19C2,17 3.5,14 6,11C9,8 14.5,4 20,4C20,9.5 16,15 13,18C10,20.5 7,22 5,21.5L2.5,19Z" />
          </svg>
        </div>

        {/* Central Portrait with Rotating Ring and Glow */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Dashed Orbit Ring */}
          <div
            className="absolute w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-[#C9A84C]/50 animate-spin-slow pointer-events-none"
          />

          {/* Glowing Circular Photo Frame */}
          <div className="w-[190px] h-[190px] sm:w-[225px] sm:h-[225px] rounded-full p-1 bg-gradient-to-tr from-[#C9A84C] via-[#52B788] to-[#40916C] animate-pulse-glow shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105">
            <img
              src={CV_DATA.photoUrl}
              alt={CV_DATA.fullName}
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-inner"
              onError={(e) => {
                // Fallback avatar if external image fails
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
              }}
            />
          </div>
        </div>

        {/* Name with Word-by-Word + Letter-by-Letter Reveal Effect (Words and surnames never split across lines) */}
        <h1
          className="font-display text-xl sm:text-3xl md:text-5xl font-bold text-white tracking-[1.5px] sm:tracking-[3px] max-w-4xl drop-shadow-md mb-2 flex flex-wrap justify-center gap-x-2 sm:gap-x-3.5 gap-y-1 px-2 text-center"
          aria-label={CV_DATA.fullName}
        >
          {CV_DATA.fullName.split(' ').map((word, wordIndex, wordArr) => {
            const charOffset = wordArr.slice(0, wordIndex).reduce((acc, w) => acc + w.length + 1, 0);
            return (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIdx) => {
                  const globalIdx = charOffset + charIdx;
                  return (
                    <span
                      key={charIdx}
                      className="inline-block transition-all duration-500"
                      style={{
                        animation: `fadeInUp 0.6s ease forwards ${0.6 + globalIdx * 0.03}s`
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        {/* Expanding Gradient Divider */}
        <div
          className="h-[2px] w-48 sm:w-64 my-3 rounded-full mx-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A84C, #52B788, #C9A84C, transparent)'
          }}
        />

        {/* Professional Title */}
        <h2 className="font-heading text-xs sm:text-sm md:text-base font-semibold text-[#95D5B2] uppercase tracking-[3px] sm:tracking-[5px] mb-3 px-4 max-w-2xl">
          {CV_DATA.fullTitle}
        </h2>

        {/* Inspirational Motto */}
        <p className="font-display italic text-[#95D5B2]/90 text-sm sm:text-base max-w-2xl px-6 mb-8 leading-relaxed">
          &ldquo;{CV_DATA.inspirationalQuote}&rdquo;
        </p>

        {/* Scroll CTA Button */}
        <button
          onClick={() => scrollTo('hero')}
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#C9A84C]/60 bg-[#2D6A4F]/30 backdrop-blur-md text-white font-heading text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#2D6A4F] hover:border-[#52B788] hover:shadow-[0_0_20px_rgba(82,183,136,0.5)] transition-all duration-300 animate-bounce-slow"
        >
          <span>Explorar mi perfil</span>
          <ChevronDown className="w-4 h-4 text-[#C9A84C] group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════
          2. NAVBAR FLOTANTE CON GLASSMORPHISM (POST-CARÁTULA)
          ═══════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolledPastCover
            ? 'translate-y-0 opacity-100 shadow-md glass-nav border-b border-emerald-900/10'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollTo('cover')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2D6A4F] to-[#52B788] flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-[#D8F3DC]" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm sm:text-base text-[#1B4332] block leading-tight">
                Elsy Malpartida <span className="whitespace-nowrap">Carhuaz</span>
              </span>
              <span className="text-[11px] font-medium text-[#40916C] tracking-wide block">
                Ingeniería Ambiental &amp; SSOMA
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {[
              { id: 'hero', label: 'Inicio' },
              { id: 'sobre-mi', label: 'Sobre Mí' },
              { id: 'experiencia', label: 'Experiencia' },
              { id: 'educacion', label: 'Educación' },
              { id: 'habilidades', label: 'Habilidades' },
              { id: 'certificaciones', label: 'Cursos & RGA' },
              { id: 'contacto', label: 'Contacto' },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`font-heading text-xs uppercase tracking-wider font-semibold transition-colors py-1 relative ${
                  activeSection === link.id
                    ? 'text-[#2D6A4F]'
                    : 'text-[#55655E] hover:text-[#2D6A4F]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#52B788] rounded-full" />
                )}
              </button>
            ))}

            <button
              onClick={() => setShowCvModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white font-heading text-xs font-semibold tracking-wider hover:shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ver / Descargar CV</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#C9A84C] text-[#1B4332] font-heading text-xs font-bold hover:bg-[#dfca7d] transition-all cursor-pointer shadow-sm"
              title="Descarga directa en formato PDF"
            >
              <Download className="w-3 h-3" />
              <span>PDF</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setShowCvModal(true)}
              className="p-2 rounded-full bg-emerald-100 text-[#2D6A4F] hover:bg-emerald-200"
              title="Ver CV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#1B4332] hover:bg-emerald-50 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-emerald-900/10 px-6 py-5 shadow-2xl space-y-3">
            {[
              { id: 'hero', label: 'Inicio' },
              { id: 'sobre-mi', label: 'Sobre Mí' },
              { id: 'experiencia', label: 'Experiencia Laboral' },
              { id: 'educacion', label: 'Educación & Liderazgo' },
              { id: 'habilidades', label: 'Habilidades & Normativa' },
              { id: 'certificaciones', label: 'Cursos & Certificaciones' },
              { id: 'contacto', label: 'Contáctame' },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left font-heading text-sm py-2 font-semibold ${
                  activeSection === link.id ? 'text-[#2D6A4F] font-bold' : 'text-[#2D3436]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowCvModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D6A4F] text-white font-heading text-xs font-semibold tracking-wider"
              >
                <Download className="w-4 h-4" />
                <span>Hoja de Vida Completa (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════
          3. HERO SECTION (POST-CARÁTULA)
          ═══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-white"
        style={{
          background: 'linear-gradient(145deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)'
        }}
      >
        {/* Falling Ambient Leaves */}
        <div className="hero-falling-leaf" style={{ left: '8%', width: '36px', height: '36px', animationDuration: '14s' }}>
          <svg viewBox="0 0 24 24" fill="#D8F3DC" className="opacity-25 w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25V8.25C12,7.25 16,7 17,8Z" />
          </svg>
        </div>
        <div className="hero-falling-leaf" style={{ left: '46%', width: '42px', height: '42px', animationDuration: '18s', animationDelay: '3s' }}>
          <svg viewBox="0 0 24 24" fill="#95D5B2" className="opacity-20 w-full h-full">
            <path d="M2.5,19C2,17 3.5,14 6,11C9,8 14.5,4 20,4C20,9.5 16,15 13,18C10,20.5 7,22 5,21.5L2.5,19Z" />
          </svg>
        </div>
        <div className="hero-falling-leaf" style={{ left: '82%', width: '32px', height: '32px', animationDuration: '15s', animationDelay: '6s' }}>
          <svg viewBox="0 0 24 24" fill="#52B788" className="opacity-20 w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25V8.25C12,7.25 16,7 17,8Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Availability Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#D8F3DC]/15 border border-[#95D5B2]/30 text-[#D8F3DC] backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Régimen Atípico 14x7 / 20x10</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#DFCA7D] backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Reubicación a Nivel Nacional</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Ingeniería Ambiental &amp; Gestión SSOMA en Minería
              </h1>

              {/* Interactive Typewriter Subtitle */}
              <div className="min-h-[3rem] flex items-center justify-center lg:justify-start">
                <p className="font-heading text-lg sm:text-xl font-semibold text-[#D8F3DC] flex items-center">
                  <span className="border-b-2 border-[#52B788] pb-0.5">{typewriterPhrase}</span>
                  <span className="inline-block w-0.5 h-5 bg-[#C9A84C] ml-1 animate-pulse" />
                </p>
              </div>

              {/* Summary Description */}
              <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Especialista en monitoreo de efluentes industriales en PTARI, gestión de residuos sólidos no municipales, control documentario de seguridad (Anexo 5) y evaluación de instrumentos ambientales (EIA, DIA, PAMA) conforme a normativa peruana y estándares internacionales.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollTo('sobre-mi')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#52B788] text-[#1B4332] font-heading font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/30 hover:bg-[#64ca9b] hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>Conóceme más</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('contacto')}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-heading font-semibold text-sm tracking-wide hover:-translate-y-0.5 transition-all"
                >
                  <Mail className="w-4 h-4 text-[#D8F3DC]" />
                  <span>Contactar</span>
                </button>
              </div>
            </div>

            {/* Right Card / Photo Display */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                {/* Decorative background glow circle */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#C9A84C]/30 to-[#52B788]/30 rounded-full blur-2xl opacity-70" />

                {/* Circular Portrait Frame */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-[#C9A84C] via-[#52B788] to-[#2D6A4F] shadow-2xl">
                  <img
                    src={CV_DATA.photoUrl}
                    alt={CV_DATA.fullName}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                  />
                  {/* Floating verification badge */}
                  <div className="absolute bottom-2 right-0 sm:right-2 bg-white text-[#1B4332] px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-emerald-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[#2D6A4F]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-heading font-bold text-xs leading-none">
                        Bachiller Ing. Ambiental
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">
                        UNDAC · Reg. 2020-2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 sm:h-16 text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. SOBRE MÍ & STATS
          ═══════════════════════════════════════════════════ */}
      <section id="sobre-mi" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-[#40916C] uppercase tracking-[3px] block mb-2">
              Perfil Profesional
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332] relative inline-block">
              Sobre Mí
              <span className="block w-16 h-1 bg-gradient-to-r from-[#40916C] to-[#C9A84C] rounded-full mx-auto mt-3" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Biography & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Bachiller en <strong className="text-[#1B4332] font-semibold">Ingeniería Ambiental</strong> de la Universidad Nacional Daniel Alcides Carrión, con experiencia comprobada en <strong className="text-[#2D6A4F] font-semibold">gestión ambiental y SSOMA</strong> en operaciones mineras y plantas de beneficio.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Capacitada en el <span className="text-[#1B4332] font-medium">monitoreo de efluentes, agua y ruido</span> conforme a los Estándares de Calidad Ambiental (ECA) y Límites Máximos Permisibles (LMP) vigentes; operación de PTARI, segregación y control de residuos sólidos no municipales (SIGERSOL) y gestión documentaria de seguridad (Anexo 5, ATS, PETS).
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Orientada al desarrollo de permisos, licencias y títulos habilitantes ambientales, fiscalización y SSOMA a lo largo de todo el ciclo de vida del proyecto minero (exploración, operación y cierre).
              </p>

              {/* Highlights checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {CV_DATA.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/60">
                    <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-[#1B4332]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Animated Stats Cards */}
            <div className="lg:col-span-5" id="stats-grid">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#EDF2F7] border border-gray-200/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-[#2D6A4F] mb-1 group-hover:scale-105 transition-transform">
                    {counts.compliance}%
                  </div>
                  <div className="font-heading text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Cumplimiento Documentario
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Fichas Anexo 5 y requerimientos SSOMA
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#EDF2F7] border border-gray-200/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-[#2D6A4F] mb-1 group-hover:scale-105 transition-transform">
                    {counts.operations}+
                  </div>
                  <div className="font-heading text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Operaciones Mineras
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    Construcción minera y mina-planta
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#EDF2F7] border border-gray-200/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-[#2D6A4F] mb-1 group-hover:scale-105 transition-transform">
                    {counts.fieldwork}+
                  </div>
                  <div className="font-heading text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Monitoreos de Campo
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    PTARI, pH, sólidos, efluentes y ruido
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#EDF2F7] border border-gray-200/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="font-heading text-4xl sm:text-5xl font-extrabold text-[#2D6A4F] mb-1 group-hover:scale-105 transition-transform">
                    {counts.courses}+
                  </div>
                  <div className="font-heading text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Cursos &amp; Normativas
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    SEIA, IGA, aguas ácidas y cierre minero
                  </p>
                </div>
              </div>

              {/* Availability Callout Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#2D6A4F] text-white flex items-center gap-3.5 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#95D5B2]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#D8F3DC]">
                    Disponibilidad Operativa
                  </h4>
                  <p className="text-xs text-white/90 leading-snug">
                    Régimen atípico 14x7 / 20x10, aptitud médica para trabajos en altura geográfica y reubicación inmediata a cualquier unidad minera del Perú.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. EXPERIENCIA LABORAL (TIMELINE VERTICAL)
          ═══════════════════════════════════════════════════ */}
      <section id="experiencia" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-[#40916C] uppercase tracking-[3px] block mb-2">
              Trayectoria en Minería &amp; SSOMA
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332] relative inline-block">
              Experiencia Laboral
              <span className="block w-16 h-1 bg-gradient-to-r from-[#40916C] to-[#C9A84C] rounded-full mx-auto mt-3" />
            </h2>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative pl-6 sm:pl-10 border-l-2 border-[#52B788]/40 space-y-12 ml-2 sm:ml-6">
            {CV_DATA.experiences.map((exp, idx) => (
              <div key={exp.id} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[33px] sm:-left-[49px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-4 border-[#2D6A4F] shadow-md flex items-center justify-center text-[#2D6A4F] group-hover:scale-110 group-hover:bg-[#52B788] group-hover:text-white transition-all">
                  {idx === 0 ? <HardHat className="w-4 h-4 sm:w-5 sm:h-5" /> : <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D8F3DC] text-[#1B4332]">
                      <Briefcase className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8B6F47]" />
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1B4332] mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-[#8B6F47] mb-4 flex items-center gap-2">
                    <span>{exp.company}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500 font-normal">{exp.sector}</span>
                  </div>

                  {/* Duties */}
                  <div className="mb-5">
                    <h4 className="font-heading text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                      Funciones Principales:
                    </h4>
                    <ul className="space-y-2">
                      {exp.duties.map((duty, dIdx) => (
                        <li key={dIdx} className="text-sm text-gray-600 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] mt-2 shrink-0" />
                          <span>{duty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 mb-5">
                    <h4 className="font-heading text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C9A84C]" />
                      <span>Logros Destacados:</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    {exp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. EDUCACIÓN & LIDERAZGO
          ═══════════════════════════════════════════════════ */}
      <section id="educacion" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-[#40916C] uppercase tracking-[3px] block mb-2">
              Formación Académica &amp; Actividades
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332] relative inline-block">
              Educación &amp; Liderazgo
              <span className="block w-16 h-1 bg-gradient-to-r from-[#40916C] to-[#C9A84C] rounded-full mx-auto mt-3" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Degree Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-8 border-2 border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#52B788]/10 rounded-bl-full pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#D8F3DC] text-[#2D6A4F] flex items-center justify-center mb-6 shadow-sm">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#C9A84C]/20 text-[#8B6F47] mb-3">
                  2020 – 2025
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1B4332] mb-2">
                  Bachiller en Ingeniería Ambiental
                </h3>
                <div className="text-sm font-semibold text-[#40916C] mb-4">
                  Universidad Nacional Daniel Alcides Carrión
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Pasco, Perú</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {CV_DATA.education[0].description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-emerald-100 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#2D6A4F] shrink-0" />
                <span className="text-xs font-semibold text-[#1B4332]">
                  Aptitud para tramitación de colegiatura e incorporación al CIP.
                </span>
              </div>
            </div>

            {/* Leadership & CONEIA Congresses */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#1B4332] mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2D6A4F]" />
                <span>Liderazgo Estudiantil &amp; Congresos Nacionales</span>
              </h3>

              {CV_DATA.leadership.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#52B788]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="font-heading font-bold text-base text-[#1B4332]">
                      {item.title}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2D6A4F]">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#8B6F47] mb-2">
                    {item.institution}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. HABILIDADES PROFESIONALES & NORMATIVA
          ═══════════════════════════════════════════════════ */}
      <section id="habilidades" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-heading text-xs font-bold text-[#40916C] uppercase tracking-[3px] block mb-2">
              Competencias Integrales
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332] relative inline-block">
              Habilidades Profesionales
              <span className="block w-16 h-1 bg-gradient-to-r from-[#40916C] to-[#C9A84C] rounded-full mx-auto mt-3" />
            </h2>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: 'software', label: 'Software & SIG', icon: Cpu },
              { id: 'normativa', label: 'Normativa Ambiental & SST', icon: ShieldCheck },
              { id: 'ssoma', label: 'Herramientas SSOMA & Minería', icon: HardHat },
              { id: 'blandas', label: 'Competencias Blandas', icon: Users },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSkillsTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                    activeSkillsTab === tab.id
                      ? 'bg-[#2D6A4F] text-white shadow-md shadow-emerald-950/20'
                      : 'bg-white text-gray-600 hover:text-[#2D6A4F] border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Software & SIG */}
          {activeSkillsTab === 'software' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CV_DATA.softwareSkills.map((soft, sIdx) => (
                <div key={sIdx} className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-heading font-bold text-sm text-[#1B4332]">{soft.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-[#2D6A4F]">
                      {soft.level}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${soft.percentage}%`,
                        background: 'linear-gradient(90deg, #2D6A4F, #52B788)'
                      }}
                    />
                  </div>
                  <div className="text-right text-[11px] font-medium text-gray-400">
                    Nivel Dominio: {soft.percentage}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Normativa Ambiental & SST */}
          {activeSkillsTab === 'normativa' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CV_DATA.normativaItems.map((norm, nIdx) => (
                <div key={nIdx} className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm hover:border-[#52B788] transition-all flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D8F3DC] text-[#2D6A4F] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#1B4332] mb-1">
                      {norm.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {norm.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Herramientas SSOMA & Gestión Minera */}
          {activeSkillsTab === 'ssoma' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SSOMA Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#1B4332]">Herramientas de Gestión SSOMA</h3>
                    <p className="text-xs text-gray-500">Procedimientos y control operacional en mina</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CV_DATA.ssomaItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700">
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gestión Ambiental Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D6A4F] flex items-center justify-center">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#1B4332]">Gestión Ambiental Operativa</h3>
                    <p className="text-xs text-gray-500">Monitoreo de campo, PTARI y permisos</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CV_DATA.gestionAmbientalItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700">
                      <Check className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Competencias Blandas */}
          {activeSkillsTab === 'blandas' && (
            <div className="bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm">
              <div className="max-w-2xl mb-6">
                <h3 className="font-heading font-bold text-xl text-[#1B4332] mb-1">
                  Valores y Competencias Personales
                </h3>
                <p className="text-sm text-gray-600">
                  Cualidades esenciales demostradas en campo para el liderazgo de cuadrillas, resolución de contingencias operativas y relacionamiento colaborativo:
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {CV_DATA.softSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs sm:text-sm font-semibold text-[#1B4332] hover:bg-emerald-100/80 hover:-translate-y-0.5 transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          8. CERTIFICACIONES, CURSOS & IDIOMAS
          ═══════════════════════════════════════════════════ */}
      <section id="certificaciones" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-[#40916C] uppercase tracking-[3px] block mb-2">
              Especialización Continua
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332] relative inline-block">
              Cursos &amp; Capacitaciones
              <span className="block w-16 h-1 bg-gradient-to-r from-[#40916C] to-[#C9A84C] rounded-full mx-auto mt-3" />
            </h2>
          </div>

          {/* Grid of Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {CV_DATA.courses.map((course, cIdx) => (
              <div
                key={cIdx}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#52B788] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-[#8B6F47] border border-amber-200/60">
                      {course.category}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        course.inProgress
                          ? 'bg-emerald-100 text-[#1B4332] animate-pulse'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {course.year}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#1B4332] mb-2 group-hover:text-[#2D6A4F] transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#40916C] mb-3">
                    {course.institution}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#2D6A4F]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Acreditación Técnica</span>
                </div>
              </div>
            ))}
          </div>

          {/* Languages & References Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Idiomas */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-gray-200">
              <h3 className="font-heading font-bold text-lg text-[#1B4332] mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#2D6A4F]" />
                <span>Idiomas</span>
              </h3>

              <div className="space-y-6">
                {CV_DATA.languages.map((lang, lIdx) => (
                  <div key={lIdx} className="bg-white p-4 rounded-xl border border-gray-200/80">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-heading font-bold text-sm text-[#1B4332]">{lang.name}</span>
                      <span className="text-xs font-semibold text-[#40916C]">{lang.level}</span>
                    </div>
                    {/* Visual Dots */}
                    <div className="flex gap-1.5 mt-2">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`h-2 flex-1 rounded-full ${
                            dot <= lang.dots ? 'bg-[#2D6A4F]' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referencias Profesionales */}
            <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-[#D8F3DC]">
                  <Award className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  Referencia Profesional
                </h3>
                <p className="text-xs text-[#D8F3DC] mb-6">
                  Contacto de supervisión directa en gestión de seguridad y operaciones mineras:
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15">
                  <div className="font-heading font-bold text-base text-white">
                    {CV_DATA.reference.name}
                  </div>
                  <div className="text-xs font-medium text-[#95D5B2] mb-3">
                    {CV_DATA.reference.role}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <Phone className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <a
                      href={`tel:${CV_DATA.reference.phone.replace(/\s+/g, '')}`}
                      className="hover:underline hover:text-[#C9A84C] font-semibold"
                    >
                      {CV_DATA.reference.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D8F3DC]/80">
                <span>Cartas de recomendación disponibles a solicitud.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          9. CONTACTO & FORMULARIO
          ═══════════════════════════════════════════════════ */}
      <section
        id="contacto"
        className="py-24 px-4 sm:px-6 lg:px-8 text-white relative"
        style={{
          background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-[#95D5B2] uppercase tracking-[3px] block mb-2">
              Conectemos
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white relative inline-block">
              Contáctame
              <span className="block w-16 h-1 bg-gradient-to-r from-[#95D5B2] to-[#C9A84C] rounded-full mx-auto mt-3" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card-dark rounded-2xl p-6 sm:p-8">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">
                  ¿Hablamos de un proyecto minero o ambiental?
                </h3>
                <p className="text-sm text-[#D8F3DC] mb-6 leading-relaxed">
                  Disponible para incorporación inmediata en operaciones mineras, consultorías de evaluación de impacto ambiental, monitoreo de PTARI o jefaturas de SSOMA bajo regímenes atípicos.
                </p>

                {/* Email item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 mb-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#52B788]/20 flex items-center justify-center text-[#95D5B2] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#95D5B2] font-semibold block">
                      Correo Electrónico
                    </span>
                    <a
                      href={`mailto:${CV_DATA.email}`}
                      className="font-heading font-semibold text-sm text-white hover:text-[#C9A84C] transition-colors break-all"
                    >
                      {CV_DATA.email}
                    </a>
                  </div>
                </div>

                {/* Phone / WhatsApp item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 mb-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#52B788]/20 flex items-center justify-center text-[#95D5B2] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#95D5B2] font-semibold block">
                      Teléfono / WhatsApp Directo
                    </span>
                    <a
                      href="https://wa.me/51918246429?text=Hola%20Elsy,%20vi%20tu%20portafolio%20de%20Ingenier%C3%ADa%20Ambiental%20y%20me%20gustar%C3%ADa%20conversar."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-semibold text-sm text-white hover:text-[#C9A84C] transition-colors"
                    >
                      {CV_DATA.phone}
                    </a>
                  </div>
                </div>

                {/* Location item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 mb-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#52B788]/20 flex items-center justify-center text-[#95D5B2] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#95D5B2] font-semibold block">
                      Ubicación &amp; Movilidad
                    </span>
                    <span className="font-heading font-semibold text-sm text-white block">
                      {CV_DATA.location} (Reubicación Nacional)
                    </span>
                  </div>
                </div>

                {/* LinkedIn item */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 mb-6 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#52B788]/20 flex items-center justify-center text-[#95D5B2] shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#95D5B2] font-semibold block">
                      Perfil LinkedIn
                    </span>
                    <a
                      href={CV_DATA.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-semibold text-sm text-[#C9A84C] hover:underline flex items-center gap-1"
                    >
                      <span>{CV_DATA.linkedInUser}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* CV Action Button */}
                <button
                  type="button"
                  onClick={() => setShowCvModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#DFCA7D] text-[#1B4332] font-heading font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar / Imprimir Hoja de Vida</span>
                </button>

                {/* Direct Action Buttons for Immediate PDF & Print */}
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={downloadingPdf}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-heading text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-75"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingPdf ? 'Generando...' : 'Descargar PDF'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintCv}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-heading text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Directo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl text-[#2D3436]">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1B4332] mb-1.5">
                  Envía un Mensaje Directo
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                  Completa los campos para coordinar una entrevista técnica o solicitar información documentaria:
                </p>

                {/* Explicación transparente del destino del mensaje */}
                <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-[#1B4332] flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-bold text-[#1B4332] block mb-0.5 text-xs sm:text-sm">
                      ¿A dónde se envía tu mensaje?
                    </span>
                    <p className="text-gray-700">
                      Tu mensaje se envía directamente a los canales oficiales verificados de <strong>Elsy Melina Malpartida</strong>: su WhatsApp personal (<span className="font-semibold text-[#2D6A4F]">+51 918 246 429</span>) o su correo electrónico (<span className="font-semibold text-[#2D6A4F]">elsymalp17@gmail.com</span>). Puedes elegir el medio que prefieras con los botones a continuación.
                    </p>
                  </div>
                </div>

                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#52B788] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#1B4332]">
                      ¡Canal de contacto abierto con éxito!
                    </h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                      Tu mensaje ha sido remitido a <strong>Elsy Melina Malpartida</strong> (WhatsApp: +51 918 246 429 / Correo: elsymalp17@gmail.com). Te responderá a la brevedad.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-1.5">
                          Nombre y Apellidos *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          placeholder="Ej. Ing. Carlos Mendoza"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-1.5">
                          Correo Corporativo / Personal *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="carlos@minera.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-1.5">
                          Empresa / Operación Minera
                        </label>
                        <input
                          type="text"
                          value={formData.empresa}
                          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                          placeholder="Ej. Compañía Minera ..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-1.5">
                          Asunto / Vacante
                        </label>
                        <input
                          type="text"
                          value={formData.asunto}
                          onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                          placeholder="Ej. Especialista SSOMA / Monitoreo"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-1.5">
                        Mensaje o Requerimientos *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        placeholder="Describe los requerimientos del puesto, régimen laboral o proyecto..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all resize-y"
                      />
                    </div>

                    {/* Botones de Envío Directo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSendWhatsApp}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
                        title="Envía el mensaje directamente al WhatsApp de Elsy"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Enviar por WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendEmail}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#40916C] hover:from-[#1B4332] hover:to-[#2D6A4F] text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
                        title="Envía el mensaje directamente al correo elsymalp17@gmail.com"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Enviar por Correo</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          10. FOOTER
          ═══════════════════════════════════════════════════ */}
      <footer className="bg-[#0a1f14] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#2D6A4F] text-[#D8F3DC] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#52B788]" />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl text-white">
              Elsy Melina Malpartida <span className="whitespace-nowrap">Carhuaz</span>
            </span>
          </div>

          <p className="font-display italic text-[#95D5B2] text-sm max-w-xl mb-6">
            &ldquo;La tierra provee lo suficiente para satisfacer las necesidades de cada hombre, pero no la codicia de cada hombre.&rdquo; &mdash; Mahatma Gandhi
          </p>

          {/* Socials / Links */}
          <div className="flex gap-4 mb-8">
            <a
              href={CV_DATA.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#52B788] hover:text-[#1B4332] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CV_DATA.email}`}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#52B788] hover:text-[#1B4332] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/51918246429"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#52B788] hover:text-[#1B4332] transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              &copy; {new Date().getFullYear()} Elsy Melina Malpartida Carhuaz. Todos los derechos reservados.
            </div>

            <button
              onClick={() => scrollTo('cover')}
              className="inline-flex items-center gap-1.5 text-[#95D5B2] hover:text-white font-semibold transition-colors"
            >
              <span>Volver a la carátula</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════
          MODAL: VISTA PREVIA Y DESCARGA / IMPRESIÓN DE CV
          ═══════════════════════════════════════════════════ */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 text-gray-800">
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2D6A4F] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#1B4332]">
                    Hoja de Vida Profesional
                  </h3>
                  <span className="text-xs text-gray-500">
                    Formato oficial de postulación para minería &amp; SSOMA
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4332] text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingPdf ? 'Generando...' : 'Descargar PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintCv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-[#2D6A4F] hover:bg-emerald-100 text-xs font-bold border border-emerald-300 transition-colors cursor-pointer"
                  title="Imprimir documento oficial en formato limpio"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyCvText}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition-colors cursor-pointer"
                  title="Copiar texto del CV"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCvModal(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer ml-1"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable CV Content */}
            <div className="space-y-6 text-sm">
              {/* Header Info */}
              <div className="border-b border-gray-200 pb-5">
                <h1 className="font-heading font-bold text-xl sm:text-2xl text-[#1B4332] flex flex-wrap gap-x-2">
                  {CV_DATA.fullName.split(' ').map((word, idx) => (
                    <span key={idx} className="inline-block whitespace-nowrap">{word}</span>
                  ))}
                </h1>
                <p className="text-sm font-semibold text-[#40916C] mb-2">
                  {CV_DATA.fullTitle}
                </p>
                <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-gray-600">
                  <span><strong>Teléfono:</strong> {CV_DATA.phone}</span>
                  <span><strong>Email:</strong> {CV_DATA.email}</span>
                  <span><strong>Ubicación:</strong> {CV_DATA.location}</span>
                  <span><strong>LinkedIn:</strong> {CV_DATA.linkedInUser}</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#8B6F47]">
                  {CV_DATA.availability}
                </div>
              </div>

              {/* Resumen */}
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] uppercase tracking-wider mb-1.5 pb-1 border-b border-gray-200">
                  Resumen Profesional
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {CV_DATA.summary}
                </p>
              </div>

              {/* Experiencia */}
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] uppercase tracking-wider mb-3 pb-1 border-b border-gray-200">
                  Experiencia Laboral
                </h4>
                <div className="space-y-4">
                  {CV_DATA.experiences.map((exp) => (
                    <div key={exp.id} className="text-xs sm:text-sm">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{exp.role}</span>
                        <span className="text-[#2D6A4F]">{exp.period}</span>
                      </div>
                      <div className="text-xs text-[#8B6F47] font-semibold mb-1">
                        {exp.company} &mdash; {exp.location}
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 pl-1 text-xs">
                        {exp.duties.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                      <div className="mt-1 text-xs text-[#1B4332] bg-emerald-50/70 p-2 rounded">
                        <strong>Logros:</strong> {exp.achievements.join(' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educación */}
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">
                  Educación
                </h4>
                <div className="text-xs sm:text-sm">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{CV_DATA.education[0].degree}</span>
                    <span className="text-[#2D6A4F]">{CV_DATA.education[0].period}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {CV_DATA.education[0].institution} &mdash; {CV_DATA.education[0].location}
                  </div>
                </div>
              </div>

              {/* Cursos & Capacitaciones */}
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">
                  Cursos &amp; Capacitaciones
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {CV_DATA.courses.map((c, i) => (
                    <div key={i} className="p-2 rounded bg-gray-50 border border-gray-100">
                      <div className="font-bold text-gray-900">{c.title}</div>
                      <div className="text-gray-500">{c.institution} ({c.year})</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referencia */}
              <div className="pt-2">
                <h4 className="font-heading font-bold text-sm text-[#1B4332] uppercase tracking-wider mb-1.5 pb-1 border-b border-gray-200">
                  Referencia Profesional
                </h4>
                <div className="text-xs text-gray-700">
                  <strong>{CV_DATA.reference.name}</strong> &mdash; {CV_DATA.reference.role} (Tel: {CV_DATA.reference.phone})
                </div>
              </div>
            </div>

            {/* Sticky Bottom Actions inside Modal */}
            <div className="sticky -bottom-6 sm:-bottom-10 -mx-6 sm:-mx-10 mt-8 pt-4 pb-4 px-6 sm:px-10 bg-white/95 backdrop-blur-md border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <span className="text-xs text-gray-500 font-medium">
                📄 Documento oficial verificado listo para procesos de selección y auditoría SSOMA.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4332] text-xs font-bold shadow transition-all cursor-pointer disabled:opacity-75"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingPdf ? 'Generando...' : 'Descargar PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintCv}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-[#2D6A4F] border border-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B4332] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#52B788]/40 flex items-center gap-3 animate-bounce-slow">
          <div className="w-7 h-7 rounded-full bg-[#52B788] text-[#1B4332] flex items-center justify-center font-bold text-xs shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}

