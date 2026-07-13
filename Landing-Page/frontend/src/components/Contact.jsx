import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[400px] h-[400px] bg-accent-600 top-[20%] right-[-10%]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Bize <span className="gradient-text">Ulaşın</span>
          </h2>
          <p className="section-subtitle">
            Sorularınız veya önerileriniz mi var? Sizden haber almaktan mutluluk duyarız!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                label: 'E-posta',
                value: 'hello@masalmatik.ai',
                gradient: 'from-primary-500 to-primary-700',
              },
              {
                icon: <Phone className="w-5 h-5" />,
                label: 'Telefon',
                value: '+90 (212) 555 0123',
                gradient: 'from-accent-500 to-accent-700',
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: 'Adres',
                value: 'Manisa, Türkiye',
                gradient: 'from-magic-teal to-magic-blue',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-dark-900 flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-inter text-dark-800 mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-inter font-medium text-dark-800">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-4">
              <div className="text-xs font-inter text-dark-800 mb-3">
                Sosyal Medya
              </div>
              <div className="flex gap-3">
                {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-magic-green/5 border border-magic-green/10 flex items-center justify-center text-sm font-bold text-dark-800 hover:bg-magic-green/10 hover:text-magic-green hover:border-primary-500/30 transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-inter text-dark-800 mb-2">
                    Adınız
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-4 py-3 rounded-xl bg-magic-green/5 border border-magic-green/10 text-sm font-inter text-dark-900 placeholder-dark-800/40 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-inter text-dark-800 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-magic-green/5 border border-magic-green/10 text-sm font-inter text-dark-900 placeholder-dark-800/40 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-inter text-dark-800 mb-2">
                  Mesajınız
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mesajınızı buraya yazın..."
                  className="w-full px-4 py-3 rounded-xl bg-magic-green/5 border border-magic-green/10 text-sm font-inter text-dark-900 placeholder-dark-800/40 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-magic w-full group"
              >
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {submitted ? '✅ Gönderildi!' : 'Mesaj Gönder'}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
