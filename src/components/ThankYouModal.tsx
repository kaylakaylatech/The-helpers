import React from 'react';
import { Heart, Sparkles, Home, CheckCircle2 } from 'lucide-react';

interface ThankYouModalProps {
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center shadow-2xl border border-emerald-100 relative overflow-hidden animate-gentle-float">
        {/* Decorative Top pastoral aura */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-100 rounded-full blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-100 rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* Peaceful Icon illustration */}
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-4xl shadow-inner mb-5">
            🕊️
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Đã tiếp nhận thành công
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-800 tracking-tight">
            Cảm Ơn Anh/Chị/Em!
          </h3>

          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Những dòng chia sẻ chân thành của anh/chị/em đã được lưu giữ cẩn trọng và trân quý. Nguyện chúc anh/chị/em luôn nhận được sự an nghỉ, niềm vui tươi mới và hoa trái bình an bên đồng cỏ xanh tươi.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
            🌿 <em>"Người chăn hiền lành dẫn dắt từng chiên con đến mé nước bình tịnh, bảo bọc và đồng hành trong mọi hoàn cảnh."</em>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 transition-all hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Hoàn tất &amp; Về trang chủ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
