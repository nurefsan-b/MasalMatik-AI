import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'MasalMatik AI nedir?',
    a: 'MasalMatik AI, çocukların seçimleriyle anlık olarak şekillenen, yapay zekâ destekli interaktif bir dijital hikâye platformudur. Her masal benzersizdir çünkü çocuğunuzun kararlarına göre dallanır.',
  },
  {
    q: 'Hangi yaş grubuna uygun?',
    a: 'MasalMatik AI, öncelikle 4-10 yaş arası çocuklar için tasarlanmıştır. Ayrıca dil öğrenen her yaştan birey de hikâye tabanlı dil pratiği yapabilir.',
  },
  {
    q: 'İçerikler güvenli mi?',
    a: 'Kesinlikle! Tüm içerikler çocuk dostu AI filtreleri ile üretilir. Ebeveyn panelinden içerik filtreleri, süre sınırları ve ilerleme takibi yapabilirsiniz. Hiçbir uygunsuz içerik üretilmez.',
  },
  {
    q: 'Hangi dilleri destekliyor?',
    a: 'Şu anda Türkçe ve İngilizce desteklenmektedir. Almanca, Fransızca ve İspanyolca desteği çok yakında gelecek!',
  },
  {
    q: 'Masalları kaydedebilir miyim?',
    a: 'Evet! Tamamlanan her masal otomatik olarak kaydedilir. İsterseniz görselleriyle birlikte PDF olarak indirebilir veya doğrudan ebeveyn e-postasına göndertebilirsiniz.',
  },
  {
    q: 'İnternet bağlantısı gerekli mi?',
    a: 'Hikâye üretimi için internet bağlantısı gereklidir. Ancak daha önce kaydedilmiş masalları çevrimdışı okuyabilirsiniz.',
  },
  {
    q: 'Ücretsiz deneme var mı?',
    a: 'Evet! Ücretsiz planda haftada 3 masal üretebilirsiniz. Sınırsız masallar ve tüm premium özellikler için aylık veya yıllık abonelik seçeneklerimizi inceleyebilirsiniz.',
  },
  {
    q: 'Verilerimiz güvende mi?',
    a: 'Çocuk gizliliği bizim için önceliktir. KVKK ve COPPA uyumlu altyapımızla tüm veriler şifreli olarak saklanır. Veriler asla üçüncü taraflarla paylaşılmaz.',
  },
];

function FAQItem({ faq, isOpen, onToggle, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-magic-green/5 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
      >
        <span className="text-sm md:text-base font-nunito font-semibold text-dark-800 group-hover:text-magic-green transition-colors pr-8">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-dark-800" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm font-inter text-dark-800 leading-relaxed pb-5 px-1">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[400px] h-[400px] bg-magic-blue top-[30%] left-[-10%]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-magic-blue flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-dark-900" />
            </div>
          </div>
          <h2 className="section-title">
            Sık Sorulan <span className="gradient-text">Sorular</span>
          </h2>
          <p className="section-subtitle">
            Merak ettiğiniz her şeyin cevabı burada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-6 md:p-8"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
