import React from 'react';
import { SurveyType } from '../types/survey';
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

interface SurveySelectionProps {
  onSelectType: (type: SurveyType) => void;
}

export const SurveySelection: React.FC<SurveySelectionProps> = ({ onSelectType }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-800">
          Xin vui lòng chọn biểu mẫu phù hợp với anh/chị/em
        </h2>
        <p className="text-sm sm:text-base text-stone-500 mt-1">
          Tất cả thông tin được bảo mật và chỉ dùng để thấu hiểu, chăm sóc và nâng đỡ nhau tốt hơn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1: Khảo sát Cừu */}
        <div
          onClick={() => onSelectType('sheep')}
          className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/50 p-6 sm:p-8 border-2 border-emerald-200/80 shadow-lg shadow-emerald-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-emerald-400"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-200/40 blur-2xl group-hover:bg-emerald-300/40 transition-all" />

          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Thành viên thân yêu
            </span>
            <span className="text-4xl animate-sheep-bob">🐑</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-800 group-hover:text-emerald-800 transition-colors">
            KHẢO SÁT CỪU
          </h3>
          <p className="text-sm font-semibold text-emerald-700 mt-1">
            (Dành cho Anh / Chị / Em)
          </p>

          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Dành cho quý anh chị em muốn sẻ chia tâm tình đời sống, những khó khăn cần người đồng hành thấu hiểu, cùng niềm vui và định hướng phát triển bản thân.
          </p>

          <div className="mt-6 pt-5 border-t border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Bảo mật & Tinh tế
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-md group-hover:bg-emerald-700 transition-all">
              <span>Bắt đầu khảo sát</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 2: Khảo sát Bò */}
        <div
          onClick={() => onSelectType('cow')}
          className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-b from-white via-amber-50/40 to-orange-50/50 p-6 sm:p-8 border-2 border-amber-200/80 shadow-lg shadow-amber-950/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-400"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-200/40 blur-2xl group-hover:bg-amber-300/40 transition-all" />

          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/60">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
              Người gánh vác & phục vụ
            </span>
            <span className="text-4xl transition-transform group-hover:scale-110">🐄</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-800 group-hover:text-amber-800 transition-colors">
            KHẢO SÁT BÒ
          </h3>
          <p className="text-sm font-semibold text-amber-800 mt-1">
            (Dành cho Người Giúp Việc)
          </p>

          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Dành cho quý anh chị em đang đảm trách công tác chăm sóc, phục vụ bầy chiên. Lắng nghe những trăn trở của người phục vụ và tiếp thêm sức mạnh cho hành trình đồng hành.
          </p>

          <div className="mt-6 pt-5 border-t border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Bảo mật & Tinh tế
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-600 text-white font-bold text-sm shadow-md group-hover:bg-amber-700 transition-all">
              <span>Bắt đầu khảo sát</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
