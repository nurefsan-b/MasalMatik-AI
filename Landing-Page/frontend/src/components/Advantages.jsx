import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

const comparisons = [
  { feature: 'İnteraktif hikâye', traditional: false, masalmatik: true },
  { feature: 'Her seferinde benzersiz masal', traditional: false, masalmatik: true },
  { feature: 'Çocuğun yaratıcı katılımı', traditional: false, masalmatik: true },
  { feature: 'AI ile kişiselleştirilmiş içerik', traditional: false, masalmatik: true },
  { feature: 'Otomatik görsel üretimi', traditional: false, masalmatik: true },
  { feature: 'PDF olarak kaydetme', traditional: false, masalmatik: true },
  { feature: 'Çoklu dil desteği', traditional: false, masalmatik: true },
  { feature: 'Ebeveyn ilerleme takibi', traditional: false, masalmatik: true },
];

const stats = [
  { value: '3x', label: 'Daha Fazla Yaratıcılık', emoji: '🎨' },
  { value: '%87', label: 'Çocuk Memnuniyeti', emoji: '😊' },
  { value: '2x', label: 'Daha Uzun Odaklanma', emoji: '🎯' },
  { value: '%95', label: 'Ebeveyn Güveni', emoji: '🛡️' },
];

export default function Advantages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-magic-blue top-[20%] right-[-10%]" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Neden <span className="gradient-text">MasalMatik?</span>
          </h2>
          <p className="section-subtitle">
            Geleneksel masallarla karşılaştırın ve farkı görün.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card overflow-hidden mb-16"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-magic-green/10">
            <div className="font-inter font-semibold text-dark-800 text-sm">
              Özellik
            </div>
            <div className="text-center font-inter font-semibold text-red-300/70 text-sm">
              Geleneksel 📖
            </div>
            <div className="text-center font-inter font-semibold text-dark-800 text-sm">
              MasalMatik AI ✨
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className={`grid grid-cols-3 gap-4 px-6 py-4 ${
                i % 2 === 0 ? 'bg-white/[0.02]' : ''
              } hover:bg-white/[0.04] transition-colors`}
            >
              <div className="font-inter text-sm text-dark-800">
                {row.feature}
              </div>
              <div className="flex justify-center">
                {row.traditional ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <X className="w-5 h-5 text-red-400/50" />
                )}
              </div>
              <div className="flex justify-center">
                <Check className="w-5 h-5 text-dark-800" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-3xl md:text-4xl font-nunito font-black gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-inter text-dark-800">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
