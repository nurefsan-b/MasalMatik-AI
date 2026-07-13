import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayşe K.',
    role: 'Anne, 2 Çocuk',
    avatar: '👩',
    rating: 5,
    text: 'Çocuklarım MasalMatik\'e bayılıyor! Her gece "bugün hangi masalı yaratalım?" diye soruyorlar. Yaratıcılıkları inanılmaz gelişti.',
  },
  {
    name: 'Mehmet Y.',
    role: 'Baba, 1 Çocuk',
    avatar: '👨',
    rating: 5,
    text: 'Kızım hikâyenin yönünü kendisi belirlediğinde gözleri parlıyor. PDF özelliği de harika — masalları bastırıp kitaplık yapıyoruz.',
  },
  {
    name: 'Elif D.',
    role: 'İlkokul Öğretmeni',
    avatar: '👩‍🏫',
    rating: 5,
    text: 'Sınıfta MasalMatik kullanıyoruz. Öğrenciler Türkçe ve İngilizce masallar oluşturuyor. Dil gelişimleri gözle görülür şekilde arttı.',
  },
  {
    name: 'Zeynep A.',
    role: 'Dil Öğrencisi',
    avatar: '📚',
    rating: 5,
    text: 'Türkçe öğrenirken MasalMatik mükemmel bir araç. İnteraktif hikâyeler sayesinde kelime dağarcığım çok hızlı gelişti.',
  },
  {
    name: 'Can B.',
    role: 'Baba, 3 Çocuk',
    avatar: '👨‍👧‍👦',
    rating: 5,
    text: 'Her çocuğum farklı seçimler yapıyor ve tamamen farklı masallar ortaya çıkıyor. Bu kadar kişiselleştirilmiş bir deneyim başka hiçbir yerde yok.',
  },
  {
    name: 'Selin T.',
    role: 'Pedagog',
    avatar: '🎓',
    rating: 5,
    text: 'Çocukların karar verme becerilerini geliştiren harika bir platform. Ailelerime sürekli öneriyorum. Ebeveyn paneli de çok güven verici.',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [autoplay, maxIndex]);

  const prev = () => {
    setAutoplay(false);
    setCurrent((p) => Math.max(0, p - 1));
  };

  const next = () => {
    setAutoplay(false);
    setCurrent((p) => Math.min(maxIndex, p + 1));
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[400px] h-[400px] bg-primary-700 bottom-[20%] right-[-5%]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Kullanıcılarımız <span className="gradient-text">Ne Diyor?</span>
          </h2>
          <p className="section-subtitle">
            Binlerce aile MasalMatik AI ile büyülü anlar yaşıyor.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${current * (100 / itemsPerPage + 2)}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ width: `${(testimonials.length / itemsPerPage) * 100}%` }}
            >
              {testimonials.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex-shrink-0"
                  style={{ width: `${100 / testimonials.length * itemsPerPage - 2}%` }}
                >
                  <div className="glass-card-hover p-7 h-full flex flex-col">
                    <Quote className="w-8 h-8 text-magic-green mb-4" />
                    <p className="text-sm font-inter text-dark-800 leading-relaxed flex-1 mb-6">
                      "{item.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-lg">
                          {item.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-nunito font-bold text-dark-900">
                            {item.name}
                          </div>
                          <div className="text-xs font-inter text-dark-800">
                            {item.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: item.rating }, (_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={current === 0}
              className="p-2 rounded-full bg-magic-green/5 border border-magic-green/10 text-dark-800 hover:bg-magic-green/10 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-gradient-to-r from-primary-500 to-accent-500' : 'w-2 bg-magic-green/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={current >= maxIndex}
              className="p-2 rounded-full bg-magic-green/5 border border-magic-green/10 text-dark-800 hover:bg-magic-green/10 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
