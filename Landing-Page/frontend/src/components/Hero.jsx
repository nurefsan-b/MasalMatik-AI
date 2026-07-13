import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, ChevronDown } from 'lucide-react';

function Star({ style }) {
  return (
    <div
      className="star"
      style={{
        ...style,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        key: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
        },
      })),
    []
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && stars.map((star) => <Star key={star.key} style={star.style} />)}
      </div>

      {/* Glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-primary-600 top-[-200px] right-[-200px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-accent-500 bottom-[-100px] left-[-100px]" />
      <div className="glow-orb w-[300px] h-[300px] bg-magic-blue top-[40%] left-[20%]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-magic-green/5 border border-magic-green/10 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-dark-800" />
          <span className="text-sm font-inter font-medium text-dark-800">
            Yapay Zekâ Destekli İnteraktif Masallar
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-nunito font-black leading-tight mb-6"
        >
          <span className="text-dark-900">Masallar Artık</span>
          <br />
          <span className="gradient-text text-shadow-magic">Senin Ellerinde!</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-dark-800 font-inter max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Çocuğunuzun hayal gücü ile şekillenen, yapay zekâ destekli kişisel masallar.
          Her seçim yeni bir maceraya kapı açar — her masal eşsiz ve benzersizdir.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#demo" className="btn-magic text-lg group">
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
              Ücretsiz Dene
            </span>
          </a>
          <a
            href="#product"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-nunito font-bold text-dark-800 rounded-full border border-magic-green/10 bg-magic-green/5 hover:bg-magic-green/10 hover:border-magic-green/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5" />
            Nasıl Çalışır?
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '10K+', label: 'Aktif Çocuk' },
            { value: '50K+', label: 'Masal Üretildi' },
            { value: '4.9', label: 'Puan ⭐' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-nunito font-black gradient-text">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-dark-800 font-inter mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-dark-800"
        >
          <span className="text-xs font-inter">Keşfet</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
