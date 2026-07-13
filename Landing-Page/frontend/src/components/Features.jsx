import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitBranch, Image, FileText, Globe, Mic, Shield } from 'lucide-react';

const features = [
  {
    icon: <GitBranch className="w-7 h-7" />,
    title: 'Dallanan Hikâyeler',
    desc: 'Her seçim farklı bir maceraya kapı açar. Yüzlerce olası son — her masal benzersiz!',
    gradient: 'from-purple-500 to-indigo-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  },
  {
    icon: <Image className="w-7 h-7" />,
    title: 'AI Görsel Üretimi',
    desc: 'Her sahne için yapay zekâ tarafından üretilen özel illüstrasyonlar.',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]',
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: 'PDF Kitapçık',
    desc: 'Tamamlanan masallar, görselleriyle birlikte PDF olarak ebeveynlere iletilir.',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: 'Çoklu Dil Desteği',
    desc: 'Türkçe, İngilizce ve daha fazlası. Dil öğrenenler için ideal!',
    gradient: 'from-teal-500 to-cyan-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]',
  },
  {
    icon: <Mic className="w-7 h-7" />,
    title: 'Sesli Anlatım',
    desc: 'AI ile üretilmiş doğal sesli anlatım. Göz yorulmadan dinleyebilme.',
    gradient: 'from-blue-500 to-indigo-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Ebeveyn Kontrolü',
    desc: 'İçerik filtreleri, süre sınırları ve ilerleme takibi — güvenli bir deneyim.',
    gradient: 'from-emerald-500 to-green-500',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-accent-600 bottom-[10%] left-[-5%]" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Büyülü <span className="gradient-text">Özellikler</span>
          </h2>
          <p className="section-subtitle">
            MasalMatik AI, çocukların hayal dünyasını zenginleştiren güçlü özelliklerle donatılmıştır.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card-hover p-7 group cursor-default ${feature.glow}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-dark-900 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-nunito font-bold text-dark-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm font-inter text-dark-800 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
