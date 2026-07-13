import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Ürün', href: '#product' },
  { label: 'Özellikler', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Yorumlar', href: '#testimonials' },
  { label: 'SSS', href: '#faq' },
  { label: 'İletişim', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-magic-green/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <img src="/src/assets/web_logo.png" alt="MasalMatik Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-nunito font-extrabold gradient-text">
              MasalMatik
            </span>
            <span className="text-[10px] font-inter font-medium text-dark-800 bg-primary-500/10 px-2 py-0.5 rounded-full border border-primary-500/20">
              AI
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-inter font-medium text-dark-800 hover:text-magic-green transition-colors duration-300 rounded-lg hover:bg-magic-green/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#pricing" className="btn-magic text-sm !px-6 !py-2.5">
              <span>Satın Al</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-800 hover:text-magic-green transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-magic-green/10 shadow-xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-inter text-dark-800 hover:text-magic-green hover:bg-magic-green/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <a href="#pricing" className="btn-magic w-full text-center text-sm !py-3">
                  <span>Satın Al</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
