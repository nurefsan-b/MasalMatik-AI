import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Mascot3D() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[400px] h-[400px] bg-primary-500 top-[30%] left-[10%]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Tanışın: <span className="gradient-text">Duki</span> 🦆
          </h2>
          <p className="section-subtitle">
            Çocuğunuzun masallarına rehberlik eden büyülü arkadaşı
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[500px]"
        >
          {/* 3D Mascot Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, type: 'spring' }}
            className="relative"
            style={{
              transform: `perspective(800px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 10}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Glow circle behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-3xl animate-pulse-glow" />
            </div>

            {/* Duki Image */}
            <div className="relative z-10 flex flex-col items-center">
              <img 
                src="/src/assets/duki.png" 
                alt="Duki Mascot" 
                className="w-72 h-auto object-contain drop-shadow-2xl relative z-20"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(255, 152, 0, 0.3))' }}
              />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-12 text-3xl"
            >
              ⭐
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute top-4 -left-16 text-2xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-20 -right-16 text-2xl"
            >
              🌟
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute bottom-8 -left-20 text-xl"
            >
              💫
            </motion.div>
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2, type: 'spring' }}
            className="absolute top-8 right-8 md:right-16 glass-card px-6 py-4 max-w-[200px]"
          >
            <p className="text-sm font-nunito font-semibold text-dark-800">
              "Haydi, birlikte harika bir masal yazalım!" 🦉
            </p>
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-magic-green/5 border border-magic-green/10 rotate-45 backdrop-blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
