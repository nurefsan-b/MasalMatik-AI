import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookOpen, RotateCcw, Sparkles } from 'lucide-react';
import demoStoryData from '../data/demoStoryData';

export default function DemoStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentNode, setCurrentNode] = useState('node_start');
  const [history, setHistory] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const node = demoStoryData[currentNode];
  const isEnd = node?.isEnd || false;

  const handleChoice = (choice) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setHistory((prev) => [...prev, currentNode]);
    setTimeout(() => {
      setCurrentNode(choice.nextNode);
      setIsTransitioning(false);
    }, 400);
  };

  const handleRestart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNode('node_start');
      setHistory([]);
      setIsTransitioning(false);
    }, 400);
  };

  const progress = history.length;
  const maxSteps = 3;

  return (
    <section id="demo" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="glow-orb w-[500px] h-[500px] bg-accent-600 top-[20%] left-[-5%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-primary-600 bottom-[10%] right-[-5%]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="gradient-text">Demo Masal</span> Dene! 📖
          </h2>
          <p className="section-subtitle">
            Seçimlerinle hikâyeyi şekillendir! Her tıklama farklı bir maceraya kapı açar.
          </p>
        </motion.div>

        {/* Story Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-dark-800" />
              <span className="text-sm font-inter text-dark-800">
                {isEnd ? 'Masal Tamamlandı!' : `Sayfa ${progress + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {Array.from({ length: maxSteps + 1 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i <= progress
                        ? 'w-8 bg-gradient-to-r from-primary-500 to-accent-500'
                        : 'w-4 bg-magic-green/10'
                    }`}
                  />
                ))}
              </div>
              {history.length > 0 && (
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-inter text-dark-800 hover:text-magic-green bg-magic-green/5 hover:bg-magic-green/10 rounded-full transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  Baştan
                </button>
              )}
            </div>
          </div>

          {/* Story Card */}
          <div
            className={`relative rounded-3xl overflow-hidden border border-magic-green/20`}
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 253, 247, 0.95) 0%, rgba(254, 243, 199, 0.9) 100%)',
              boxShadow: '0 0 40px rgba(255, 213, 79, 0.2), 0 0 80px rgba(46, 90, 67, 0.1)',
            }}
          >
            {/* Inner glow at top */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNode}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* End badge */}
                  {isEnd && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="flex justify-center mb-6"
                    >
                      <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30">
                        <Sparkles className="w-4 h-4 text-magic-green" />
                        <span className="text-sm font-nunito font-bold text-dark-900">
                          {node.endTitle}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Emoji icon */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl"
                    >
                      {node.emoji}
                    </motion.div>
                  </div>

                  {/* Story text */}
                  <p className="text-base md:text-lg font-nunito text-dark-800 leading-relaxed text-center max-w-2xl mx-auto mb-8">
                    {node.text}
                  </p>

                  {/* Choices */}
                  {!isEnd && node.choices && node.choices.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                      {node.choices.map((choice, i) => (
                        <motion.button
                          key={choice.nextNode}
                          initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.15 }}
                          onClick={() => handleChoice(choice)}
                          disabled={isTransitioning}
                          className="group relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer
                            bg-white/60 border border-magic-green/20 shadow-sm
                            hover:bg-white hover:border-magic-green/40
                            hover:shadow-[0_4px_20px_rgba(46,90,67,0.15)]
                            active:scale-[0.97]
                            disabled:opacity-50 disabled:cursor-wait"
                        >
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:to-accent-500/5 transition-all duration-300" />
                          <span className="relative text-sm md:text-base font-nunito font-semibold text-dark-800 group-hover:text-magic-green transition-colors">
                            {choice.text}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Restart button at end */}
                  {isEnd && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex justify-center mt-6"
                    >
                      <button
                        onClick={handleRestart}
                        className="btn-magic group"
                      >
                        <span className="flex items-center gap-2">
                          <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
                          Yeni Maceraya Başla
                        </span>
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="flex justify-center mt-6 gap-1">
            {['🌟', '✨', '💫', '⭐', '🌟'].map((star, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="text-xs"
              >
                {star}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
