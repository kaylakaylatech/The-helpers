import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const PastoralHeader: React.FC = () => {
  return (
    <header className="text-center pt-8 pb-4 px-4 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide mb-3 shadow-xs">
        <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span>ĐỒNG CỎ XANH TƯƠI & ME NƯỚC BÌNH TỊNH</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-800 tracking-tight leading-snug">
        🌸 KHẢO SÁT THÔNG TIN & ĐỊNH HƯỚNG PHÁT TRIỂN 🌸
      </h1>

      <p className="mt-3 text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
        Nơi sẻ chia chân thành những tâm tư, ghi nhận từng bước trưởng thành và xây dựng định hướng đồng hành tràn đầy sự thấu hiểu, tình yêu thương và bình an.
      </p>
    </header>
  );
};
