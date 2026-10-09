import React, { useState, useEffect } from 'react';
import { SurveyType, SurveyData } from '../types/survey';
import {
  User,
  BookOpen,
  Compass,
  ArrowLeft,
  ArrowRight,
  Send,
  Save,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Calendar,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface SurveyFormProps {
  surveyType: SurveyType;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({
  surveyType,
  onBack,
  onSubmitSuccess,
}) => {
  const isSheep = surveyType === 'sheep';
  const roleTitle = isSheep ? 'Cừu (Dành cho Anh/Chị/Em)' : 'Bò (Dành cho Người Giúp Việc)';
  const themeColor = isSheep ? 'emerald' : 'amber';

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [draftSavedToast, setDraftSavedToast] = useState<boolean>(false);

  // Form state initialized from localStorage draft if exists
  const draftKey = `survey_draft_${surveyType}`;

  const [formData, setFormData] = useState({
    // Phần A
    fullName: '',
    nickname: '',
    birthDate: '',
    address: '',
    phone: '',
    workplace: '',
    position: '',
    // Phần B
    lmsRole: '',
    careRelation: '',
    completed70Lessons: '',
    completedFatherBook: '',
    completedPreachBook: '',
    fruitsCount: '',
    sixMonthPlan: '',
    // Phần C
    uncomfortableThings: '',
    twoYearDifficulties: '',
    joyfulAchievements: '',
    lovelyCompliments: '',
    nextYearExpectations: '',
  });

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn('Cannot load draft', e);
    }
  }, [draftKey]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Save draft quietly
      localStorage.setItem(draftKey, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveDraftManually = () => {
    localStorage.setItem(draftKey, JSON.stringify(formData));
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 3000);
  };

  const validateStep = (step: number) => {
    setErrorMessage('');
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setErrorMessage('Xin vui lòng điền Họ và tên đầy đủ của anh/chị/em.');
        return false;
      }
      if (!formData.phone.trim()) {
        setErrorMessage('Xin vui lòng cung cấp Số điện thoại để tiện liên lạc, thăm hỏi.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) {
      setActiveStep(1);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      ...formData,
      surveyType,
    };

    try {
      // 1. Send to server
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Lỗi khi gửi dữ liệu lên máy chủ');
      }

      // Also save to client's local surveys archive for offline resiliency
      const localSurveysStr = localStorage.getItem('local_surveys_cache') || '[]';
      const localSurveys: SurveyData[] = JSON.parse(localSurveysStr);
      localSurveys.unshift({
        id: 'local_' + Date.now(),
        surveyType,
        submittedAt: new Date().toISOString(),
        ...formData,
      });
      localStorage.setItem('local_surveys_cache', JSON.stringify(localSurveys));

      // Clear draft
      localStorage.removeItem(draftKey);

      // Successfully submitted -> show Thank You screen
      onSubmitSuccess();
    } catch (err: any) {
      console.warn('Server error, saving to local fallback:', err);
      // Fallback: Save locally anyway so the user never loses submission!
      const localSurveysStr = localStorage.getItem('local_surveys_cache') || '[]';
      const localSurveys: SurveyData[] = JSON.parse(localSurveysStr);
      localSurveys.unshift({
        id: 'local_' + Date.now(),
        surveyType,
        submittedAt: new Date().toISOString(),
        ...formData,
      });
      localStorage.setItem('local_surveys_cache', JSON.stringify(localSurveys));
      localStorage.removeItem(draftKey);
      onSubmitSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 my-8">
      {/* Top Navigation & Status */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-sm px-3.5 py-2 rounded-2xl bg-white/80 hover:bg-white border border-stone-200 shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Chọn lại loại khảo sát</span>
        </button>

        <div className="flex items-center gap-2">
          {draftSavedToast && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/90 px-3 py-1.5 rounded-full border border-emerald-300 animate-fadeIn">
              ✓ Đã lưu nháp an toàn
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveDraftManually}
            className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-white/70 hover:bg-white px-3 py-1.5 rounded-xl border border-stone-200 transition-all shadow-xs"
            title="Lưu lại các câu đã điền để tiếp tục sau"
          >
            <Save className="w-3.5 h-3.5 text-stone-500" />
            <span>Lưu nháp</span>
          </button>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/5 overflow-hidden">
        {/* Banner with Pastoral Header */}
        <div
          className={`p-6 sm:p-8 text-white ${
            isSheep
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
              : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs tracking-wider uppercase">
              {isSheep ? '🐑 KHẢO SÁT CỪU' : '🐄 KHẢO SÁT BÒ'}
            </span>
            <span className="text-xs text-white/90 font-medium">Bảo Mật &amp; Tinh Kính</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold mt-3 tracking-tight">
            Biểu mẫu {roleTitle}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl font-light">
            {isSheep
              ? 'Mỗi dòng tâm sự của anh/chị/em đều là hạt mầm quý báu được lắng nghe trọn vẹn bằng tình thương.'
              : 'Tri ân tấm lòng tận tụy của người gánh vác; cùng thấu hiểu để đồng cỏ thêm vững vàng và kết nhiều hoa trái.'}
          </p>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/20">
            <button
              type="button"
              onClick={() => validateStep(1) && setActiveStep(1)}
              className={`flex items-center justify-center gap-2 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeStep === 1
                  ? 'bg-white text-stone-800 shadow-md'
                  : 'bg-white/15 text-white/90 hover:bg-white/25'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Phần A:</span> Cá Nhân
            </button>

            <button
              type="button"
              onClick={() => {
                if (validateStep(1)) setActiveStep(2);
              }}
              className={`flex items-center justify-center gap-2 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeStep === 2
                  ? 'bg-white text-stone-800 shadow-md'
                  : 'bg-white/15 text-white/90 hover:bg-white/25'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Phần B:</span> Đức Tin &amp; Chăm Sóc
            </button>

            <button
              type="button"
              onClick={() => {
                if (validateStep(1)) setActiveStep(3);
              }}
              className={`flex items-center justify-center gap-2 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeStep === 3
                  ? 'bg-white text-stone-800 shadow-md'
                  : 'bg-white/15 text-white/90 hover:bg-white/25'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Phần C:</span> Định Hướng &amp; Chia Sẻ
            </button>
          </div>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-2.5">
            <span className="text-rose-500 font-bold">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* ================= PHẦN A: THÔNG TIN CÁ NHÂN ================= */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    PHẦN A: THÔNG TIN CÁ NHÂN
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Những thông tin cơ bản giúp việc xưng hô và liên lạc thêm gần gũi.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                  Câu 1 - 7
                </span>
              </div>

              {/* 1. Họ và tên đầy đủ */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  1. Họ và tên đầy đủ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 2. Biệt danh / Tên muốn được gọi */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  2. Biệt danh / Tên anh/chị/em muốn được gọi
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => updateField('nickname', e.target.value)}
                  placeholder="Ví dụ: An An, Bình Yên, David, Esther..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 3. Ngày tháng năm sinh */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  3. Ngày tháng năm sinh (DD/MM/YYYY)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    placeholder="Ví dụ: 15/08/1996 hoặc chọn ngày"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                  />
                  <Calendar className="w-4 h-4 text-stone-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* 4. Địa chỉ hiện tại */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  4. Địa chỉ hiện tại
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="Quận/Huyện, Tỉnh/Thành phố đang sinh sống..."
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* 5. Số điện thoại liên hệ */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  5. Số điện thoại liên hệ <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="Ví dụ: 0912345678"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* 6. Nơi đang làm việc hoặc học tập */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  6. Nơi đang làm việc hoặc học tập
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.workplace}
                    onChange={(e) => updateField('workplace', e.target.value)}
                    placeholder="Tên cơ quan, công ty hoặc trường đại học..."
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                  />
                  <GraduationCap className="w-4 h-4 text-stone-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* 7. Công việc / Vị trí hiện tại */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  7. Công việc / Vị trí hiện tại
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => updateField('position', e.target.value)}
                    placeholder="Ví dụ: Kế toán, Nhân viên kinh doanh, Sinh viên, Tự do..."
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                  />
                  <Briefcase className="w-4 h-4 text-stone-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Tiếp tục: Phần B</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= PHẦN B: ĐỨC TIN & QUAN HỆ CHĂM SÓC ================= */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    PHẦN B: THÔNG TIN ĐỨC TIN &amp; QUAN HỆ CHĂM SÓC
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Hành trình học tập, sự gắn kết đồng hành và mục tiêu kết trái.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                  Câu 8 - 14
                </span>
              </div>

              {/* 8. Vai trò hiện tại trên Edu LMS */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  8. Vai trò hiện tại (trên Edu LMS)
                </label>
                <input
                  type="text"
                  value={formData.lmsRole}
                  onChange={(e) => updateField('lmsRole', e.target.value)}
                  placeholder="Ví dụ: Học viên, Trợ giảng, Quản trị viên, Người giúp việc..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 9. CÂU HỎI PHÂN LOẠI ĐẶC THÙ */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <label className="block text-sm font-bold text-stone-800 mb-1.5">
                  9.{' '}
                  {isSheep
                    ? 'Hiện tại AI đang chăm sóc, đồng hành cùng anh/chị/em?'
                    : 'Hiện tại anh/chị/em đang chăm sóc, đồng hành cùng NHỮNG AI?'}
                </label>
                <p className="text-xs text-stone-500 mb-2">
                  {isSheep
                    ? 'Ghi tên anh/chị người giúp việc hoặc người hướng dẫn đang đồng hành trực tiếp cùng bạn.'
                    : 'Ghi danh sách tên hoặc nhóm các anh/chị/em mà bạn đang trực tiếp chăm sóc, nâng đỡ.'}
                </p>
                <textarea
                  rows={2}
                  value={formData.careRelation}
                  onChange={(e) => updateField('careRelation', e.target.value)}
                  placeholder={
                    isSheep
                      ? 'Ví dụ: Anh Minh, Chị Hoa...'
                      : 'Ví dụ: Đồng hành cùng nhóm 4 bạn: An, Bình, Cường, Duyên...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all text-stone-800 bg-white text-sm sm:text-base"
                />
              </div>

              {/* 10. Hoàn thành 70 bài học */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  10. Anh/chị/em đã hoàn thành 70 bài học chưa? (Lần thứ mấy?)
                </label>
                <input
                  type="text"
                  value={formData.completed70Lessons}
                  onChange={(e) => updateField('completed70Lessons', e.target.value)}
                  placeholder="Ví dụ: Đang học bài 25, Đã hoàn thành lần 1, Đã hoàn thành lần 2..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 11. Hoàn thành Sách Cha */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  11. Anh/chị/em đã hoàn thành Sách Cha chưa?
                </label>
                <input
                  type="text"
                  value={formData.completedFatherBook}
                  onChange={(e) => updateField('completedFatherBook', e.target.value)}
                  placeholder="Ví dụ: Chưa đọc, Đang đọc dở, Đã hoàn thành trọn vẹn..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 12. Đọc hết Sách Tập Giảng Đạo */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  12. Anh/chị/em đã đọc hết Sách Tập Giảng Đạo chưa?
                </label>
                <input
                  type="text"
                  value={formData.completedPreachBook}
                  onChange={(e) => updateField('completedPreachBook', e.target.value)}
                  placeholder="Ví dụ: Chưa đọc, Đang đọc tập 1, Đã đọc hết..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 13. Số lượng kết trái trong năm nay */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  13. Số lượng kết trái trong năm nay
                </label>
                <input
                  type="text"
                  value={formData.fruitsCount}
                  onChange={(e) => updateField('fruitsCount', e.target.value)}
                  placeholder="Ví dụ: 0, 1 trái, 2 bạn đã tiếp nhận, đang cầu nguyện cho 3 người..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 14. Định hướng và kế hoạch cụ thể trong 6 tháng gần nhất */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  14. Định hướng và kế hoạch cụ thể của anh/chị/em trong 6 tháng gần nhất
                </label>
                <textarea
                  rows={3}
                  value={formData.sixMonthPlan}
                  onChange={(e) => updateField('sixMonthPlan', e.target.value)}
                  placeholder="Chia sẻ về mục tiêu học tập, rèn luyện thói quen cầu nguyện, kế hoạch thăm viếng hoặc phát triển kỹ năng..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại Phần A</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Tiếp tục: Phần C</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= PHẦN C: ĐỊNH HƯỚNG PHÁT TRIỂN & CHIA SẺ ================= */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-600" />
                    PHẦN C: ĐỊNH HƯỚNG PHÁT TRIỂN &amp; CHIA SẺ
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Mở lòng chia sẻ tâm tư, gỡ bỏ rào cản và mở ra kỳ vọng mới.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                  Câu 15 - 19
                </span>
              </div>

              {/* 15. Điều không thoải mái / không chấp nhận */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  15. Những điều hoặc hành vi mà anh/chị/em cảm thấy không thoải mái / không chấp nhận
                </label>
                <p className="text-xs text-stone-500 mb-2">
                  Giúp người đồng hành biết cách giữ ranh giới tôn trọng và tạo cảm giác an toàn nhất cho bạn.
                </p>
                <textarea
                  rows={3}
                  value={formData.uncomfortableThings}
                  onChange={(e) => updateField('uncomfortableThings', e.target.value)}
                  placeholder="Ví dụ: Sự thúc ép dồn dập, so sánh với người khác, không giữ lời hứa, thiếu sự lắng nghe..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 16. Khó khăn 2 năm gần đây chưa thể giải quyết */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  16. Những khó khăn gặp phải trong 2 năm gần đây mà chưa thể giải quyết
                </label>
                <p className="text-xs text-stone-500 mb-2">
                  Về công việc, sức khỏe, gia đình, tâm lý hoặc sự bế tắc trong đời sống tinh thần...
                </p>
                <textarea
                  rows={3}
                  value={formData.twoYearDifficulties}
                  onChange={(e) => updateField('twoYearDifficulties', e.target.value)}
                  placeholder="Chia sẻ chân thật để Người Chăn có thể hiệp một cầu nguyện và tìm phương cách nâng đỡ..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 17. Kết quả / thành tựu cảm thấy vui và ghi nhận được */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  17. Những kết quả / thành tựu cảm thấy vui và ghi nhận được tính đến nay
                </label>
                <textarea
                  rows={3}
                  value={formData.joyfulAchievements}
                  onChange={(e) => updateField('joyfulAchievements', e.target.value)}
                  placeholder="Những bước tiến nhỏ của bản thân, một lần vượt qua nỗi sợ, một người bạn được cứu rỗi, hay sự bình an nhận được..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 18. Lời khen hoặc nhận xét đáng yêu */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  18. Lời khen hoặc nhận xét đáng yêu mà người khác hay dành cho anh/chị/em
                </label>
                <input
                  type="text"
                  value={formData.lovelyCompliments}
                  onChange={(e) => updateField('lovelyCompliments', e.target.value)}
                  placeholder="Ví dụ: Nụ cười ấm áp, biết lắng nghe, chu đáo, đáng tin cậy..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* 19. Mong đợi lớn nhất cho chặng đường / năm tiếp theo */}
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1.5">
                  19. Mong đợi lớn nhất cho chặng đường / năm tiếp theo
                </label>
                <textarea
                  rows={3}
                  value={formData.nextYearExpectations}
                  onChange={(e) => updateField('nextYearExpectations', e.target.value)}
                  placeholder="Kỳ vọng về sự trưởng thành của chính mình, mong muốn được người chăn hỗ trợ điều gì cụ thể..."
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all text-stone-800 bg-stone-50/40 text-sm sm:text-base"
                />
              </div>

              {/* Submit Section */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition-all w-full sm:w-auto justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại Phần B</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-extrabold text-base shadow-lg transition-all hover:scale-[1.02] active:scale-98 w-full sm:w-auto ${
                    isSheep
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-700/20'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-700/20'
                  } ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang trân trọng lưu giữ khảo sát...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>🌸 GỬI KHẢO SÁT 🌸</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
