import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: '/ay',
    desc: 'Keşfetmek için ideal',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-slate-600 to-slate-800',
    features: [
      'Haftada 3 masal',
      '2 tema seçeneği',
      'Temel görseller',
      'Türkçe dil desteği',
    ],
    cta: 'Ücretsiz Başla',
    ctaStyle: 'bg-magic-green/5 border border-magic-green/10 hover:bg-magic-green/10 text-dark-800',
    popular: false,
  },
  {
    name: 'Premium',
    price: '₺79',
    period: '/ay',
    desc: 'En popüler plan',
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-primary-500 to-accent-500',
    features: [
      'Sınırsız masal',
      'Tüm temalar (5+)',
      'AI ile özel görseller',
      'PDF indirme & e-posta',
      'Sesli anlatım',
      'Ebeveyn paneli',
      'Öncelikli destek',
    ],
    cta: '✨ Satın Al',
    ctaStyle: 'btn-magic',
    popular: true,
  },
  {
    name: 'Aile',
    price: '₺149',
    period: '/ay',
    desc: '5 çocuk hesabına kadar',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-magic-teal to-magic-blue',
    features: [
      'Premium tüm özellikler',
      '5 çocuk profili',
      'Aile ilerleme takibi',
      'Özel temalar oluştur',
      'API erişimi',
      '7/24 destek',
    ],
    cta: 'Satın Al',
    ctaStyle: 'bg-magic-green/5 border border-magic-green/10 hover:bg-magic-green/10 text-dark-800',
    popular: false,
  },
];

export default function PricingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[600px] h-[600px] bg-primary-600 top-[10%] left-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-accent-600 bottom-[10%] right-[-5%]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Büyülü Yolculuğa <span className="gradient-text">Başla</span>
          </h2>
          <p className="section-subtitle">
            Her bütçeye uygun planlarla çocuğunuzun hayal dünyasını zenginleştirin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative glass-card p-8 flex flex-col ${
                plan.popular
                  ? 'border-primary-500/30 shadow-magic-lg scale-[1.02]'
                  : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-xs font-nunito font-bold text-dark-900 shadow-magic">
                    ⭐ En Popüler
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-4 text-dark-900`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-xl font-nunito font-bold text-dark-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs font-inter text-dark-800">
                  {plan.desc}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-4xl font-nunito font-black text-dark-900">
                  {plan.price}
                </span>
                <span className="text-sm font-inter text-dark-800">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-dark-800 flex-shrink-0" />
                    <span className="text-sm font-inter text-dark-800">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3.5 rounded-xl font-nunito font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 ${plan.ctaStyle}`}
              >
                <span>{plan.cta}</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Money back */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-xs font-inter text-dark-800 mt-8"
        >
          💳 30 gün para iade garantisi · İstediğiniz zaman iptal edin · Kredi kartı gerektirmez
        </motion.p>
      </div>
    </section>
  );
}
