import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Zap, Shield } from 'lucide-react';

export default function ProductIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="product" className="section-padding relative overflow-hidden">
      {/* BG Orb */}
      <div className="glow-orb w-[500px] h-[500px] bg-primary-700 top-[10%] right-[-10%]" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="gradient-text">MasalMatik AI</span> Nedir?
          </h2>
          <p className="section-subtitle">
            Geleneksel masalların pasif dünyasından, çocuğunuzun aktif olarak şekillendirdiği
            interaktif hikâyelere geçin.
          </p>
        </motion.div>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <span className="text-xl">😔</span>
              </div>
              <h3 className="text-xl font-nunito font-bold text-red-300">
                Geleneksel Masallar
              </h3>
            </div>
            <ul className="space-y-3 font-inter text-dark-800">
              {[
                'Tek yönlü ve statik anlatım',
                'Çocuğun yaratıcılığını sınırlar',
                'Pasif içerik tüketimi',
                'Aynı hikâye tekrar tekrar',
                'Kişiselleştirme yok',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400/60 mt-1">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 relative overflow-hidden border-gradient"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-nunito font-bold gradient-text">
                MasalMatik AI
              </h3>
            </div>
            <ul className="space-y-3 font-inter text-dark-800">
              {[
                'İnteraktif, dallanan hikâye yapısı',
                'Çocuğun yaratıcılığını harekete geçirir',
                'Aktif katılım ve karar verme',
                'Her seferinde benzersiz maceralar',
                'Kişiselleştirilmiş AI içerik üretimi',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-dark-800 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen className="w-6 h-6" />,
              step: '01',
              title: 'Tema Seç',
              desc: 'Orman, deniz veya uzay — çocuğunuz masalın dünyasını seçer.',
              color: 'from-primary-500 to-primary-700',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              step: '02',
              title: 'Seçimlerle İlerle',
              desc: 'Her sahnede iki seçenek belirir. Karar çocuğun — macera şekillenir!',
              color: 'from-accent-500 to-accent-700',
            },
            {
              icon: <Shield className="w-6 h-6" />,
              step: '03',
              title: 'PDF Olarak Kaydet',
              desc: 'Tamamlanan masal, güzel görselleriyle PDF olarak ebeveyne gönderilir.',
              color: 'from-magic-teal to-magic-blue',
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
              className="glass-card-hover p-8 text-center group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 text-dark-900 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <div className="text-xs font-inter font-bold text-dark-800 mb-2">
                ADIM {item.step}
              </div>
              <h3 className="text-xl font-nunito font-bold text-dark-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm font-inter text-dark-800 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
