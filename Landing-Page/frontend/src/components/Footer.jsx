import { Sparkles } from 'lucide-react';

const footerLinks = {
  Ürün: ['Özellikler', 'Fiyatlandırma', 'Demo', 'Güncellemeler'],
  Destek: ['Yardım Merkezi', 'SSS', 'İletişim', 'Durum'],
  Yasal: ['Gizlilik Politikası', 'Kullanım Koşulları', 'KVKK', 'Çerez Politikası'],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-magic-green/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-4">
              <img src="/src/assets/web_logo.png" alt="MasalMatik Logo" className="w-9 h-9 object-contain" />
              <span className="text-lg font-nunito font-extrabold gradient-text">
                MasalMatik
              </span>
              <span className="text-[9px] font-inter font-medium text-dark-800 bg-primary-500/10 px-1.5 py-0.5 rounded-full border border-primary-500/20">
                AI
              </span>
            </a>
            <p className="text-sm font-inter text-dark-800 leading-relaxed mb-4">
              Yapay zekâ destekli interaktif masallarla
              çocuğunuzun hayal dünyasını zenginleştirin.
            </p>
            <div className="flex gap-2">
              {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-magic-green/5 border border-magic-green/5 flex items-center justify-center text-xs font-bold text-dark-800 hover:bg-magic-green/10 hover:text-magic-green transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-nunito font-bold text-dark-800 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-inter text-dark-800 hover:text-dark-800 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-magic-green/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-inter text-dark-800">
            © 2026 MasalMatik AI. Tüm hakları saklıdır.
          </p>
          <p className="text-xs font-inter text-dark-800">
            Sevgiyle Manisa'da yapıldı 💜
          </p>
        </div>
      </div>
    </footer>
  );
}
