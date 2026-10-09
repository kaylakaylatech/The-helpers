import React, { useState } from 'react';
import { SurveyData } from '../types/survey';
import { generateStandaloneHtml } from '../utils/singleFileHtmlGenerator';
import { AdminStatsCharts } from './AdminStatsCharts';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  Download,
  Printer,
  Trash2,
  X,
  FileText,
  Heart,
  MessageCircle,
  Lightbulb,
  CheckCircle,
  RefreshCw,
  Clock,
  Phone,
  MapPin,
  Briefcase,
  BookOpen,
  Calendar,
  Save,
  LogOut,
  PlusCircle,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  surveys: SurveyData[];
  onLogout: () => void;
  onRefresh: () => void;
  onDeleteSurvey: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onReanalyze: (id: string) => Promise<void>;
  onLoadSampleData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  surveys,
  onLogout,
  onRefresh,
  onDeleteSurvey,
  onSaveNotes,
  onReanalyze,
  onLoadSampleData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sheep' | 'cow'>('all');
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyData | null>(null);
  const [activeTab, setActiveTab] = useState<'ai' | 'answers' | 'notes'>('ai');
  const [currentNote, setCurrentNote] = useState('');
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Statistics
  const totalCount = surveys.length;
  const sheepCount = surveys.filter((s) => s.surveyType === 'sheep').length;
  const cowCount = surveys.filter((s) => s.surveyType === 'cow').length;
  const analyzedCount = surveys.filter((s) => !!s.aiAnalysis).length;

  // Filtered surveys
  const filteredSurveys = surveys.filter((s) => {
    const matchesType = filterType === 'all' || s.surveyType === filterType;
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      s.fullName.toLowerCase().includes(query) ||
      s.nickname?.toLowerCase().includes(query) ||
      s.phone?.includes(query) ||
      s.careRelation?.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  const handleOpenDetail = (survey: SurveyData) => {
    setSelectedSurvey(survey);
    setCurrentNote(survey.adminNotes || '');
    setActiveTab('ai');
  };

  const handleSaveCurrentNote = async () => {
    if (!selectedSurvey) return;
    setIsSavingNote(true);
    await onSaveNotes(selectedSurvey.id, currentNote);
    setSelectedSurvey({ ...selectedSurvey, adminNotes: currentNote });
    setIsSavingNote(false);
  };

  const handleTriggerReanalyze = async () => {
    if (!selectedSurvey) return;
    setIsReanalyzing(true);
    await onReanalyze(selectedSurvey.id);
    setIsReanalyzing(false);
  };

  const handleExportCSV = () => {
    if (surveys.length === 0) return;
    const headers = [
      'ID',
      'Loại khảo sát',
      'Thời gian',
      'Họ và tên',
      'Biệt danh',
      'Ngày sinh',
      'SĐT',
      'Địa chỉ',
      'Nơi làm việc',
      'Vị trí',
      'Vai trò LMS',
      'Mối quan hệ chăm sóc',
      '70 bài học',
      'Sách Cha',
      'Sách Tập Giảng Đạo',
      'Số lượng kết trái',
      'Kế hoạch 6 tháng',
      'Điều không thoải mái',
      'Khó khăn 2 năm',
      'Thành tựu vui mừng',
      'Lời khen đáng yêu',
      'Mong đợi tiếp theo'
    ];

    const rows = surveys.map((s) => [
      `"${s.id}"`,
      `"${s.surveyType === 'sheep' ? 'Cừu (Anh/Chị/Em)' : 'Bò (Người Giúp Việc)'}"`,
      `"${new Date(s.submittedAt).toLocaleString('vi-VN')}"`,
      `"${s.fullName || ''}"`,
      `"${s.nickname || ''}"`,
      `"${s.birthDate || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.address?.replace(/"/g, '""') || ''}"`,
      `"${s.workplace?.replace(/"/g, '""') || ''}"`,
      `"${s.position?.replace(/"/g, '""') || ''}"`,
      `"${s.lmsRole?.replace(/"/g, '""') || ''}"`,
      `"${s.careRelation?.replace(/"/g, '""') || ''}"`,
      `"${s.completed70Lessons?.replace(/"/g, '""') || ''}"`,
      `"${s.completedFatherBook?.replace(/"/g, '""') || ''}"`,
      `"${s.completedPreachBook?.replace(/"/g, '""') || ''}"`,
      `"${s.fruitsCount?.replace(/"/g, '""') || ''}"`,
      `"${s.sixMonthPlan?.replace(/"/g, '""') || ''}"`,
      `"${s.uncomfortableThings?.replace(/"/g, '""') || ''}"`,
      `"${s.twoYearDifficulties?.replace(/"/g, '""') || ''}"`,
      `"${s.joyfulAchievements?.replace(/"/g, '""') || ''}"`,
      `"${s.lovelyCompliments?.replace(/"/g, '""') || ''}"`,
      `"${s.nextYearExpectations?.replace(/"/g, '""') || ''}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Khao_Sat_Dong_Co_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSingleFileHtml = () => {
    const html = generateStandaloneHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Khao_Sat_Dong_Co_SingleFile.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Không Gian Bảo Mật Người Chăn
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800">
            🌿 Bảng Quản Trị &amp; Định Hướng Chăm Sóc
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Tổng hợp dữ liệu khảo sát, phân tích tâm lý cá nhân hóa và đồng hành cùng bầy chiên.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadSingleFileHtml}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold shadow-xs transition-all"
            title="Tải về file HTML độc lập chứa toàn bộ mã nguồn"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Tải Single-File HTML</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold shadow-xs transition-all"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Xuất Excel / CSV</span>
          </button>

          <button
            onClick={onLoadSampleData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold shadow-xs transition-all"
            title="Nạp dữ liệu mẫu thực tế để trải nghiệm giao diện"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>Dữ liệu mẫu</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold shadow-xs transition-all"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider">
            <span>Tổng khảo sát</span>
            <Users className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-800 mt-2">
            {totalCount}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Đã lưu trữ an toàn</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200/80 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span>Khảo sát Cừu</span>
            <span className="text-base">🐑</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">
            {sheepCount}
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">Anh/Chị/Em thành viên</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-amber-50/50 border border-amber-200/80 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>Khảo sát Bò</span>
            <span className="text-base">🐄</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-2">
            {cowCount}
          </div>
          <p className="text-[11px] text-amber-600 mt-1">Người gánh vác phục vụ</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-purple-50/50 border border-purple-200/80 shadow-xs">
          <div className="flex items-center justify-between text-purple-800 text-xs font-bold uppercase tracking-wider">
            <span>Phân tích Gemini AI</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 mt-2">
            {analyzedCount}
          </div>
          <p className="text-[11px] text-purple-600 mt-1">Đã định hướng chăm sóc</p>
        </div>
      </div>

      {/* Visual Analytics with Recharts: Pie Chart (Cừu/Bò) & Bar Chart (Tiến độ bài học) */}
      <AdminStatsCharts surveys={surveys} />

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, biệt danh, SĐT, người chăm sóc..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-stone-500 font-medium">Lọc theo:</span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tất cả ({totalCount})
          </button>
          <button
            onClick={() => setFilterType('sheep')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'sheep'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            🐑 Cừu ({sheepCount})
          </button>
          <button
            onClick={() => setFilterType('cow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'cow'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            🐄 Bò ({cowCount})
          </button>
        </div>
      </div>

      {/* List of Surveys */}
      {filteredSurveys.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs">
          <div className="text-4xl mb-3">🌿</div>
          <h3 className="text-lg font-bold text-stone-700">Chưa tìm thấy bản khảo sát phù hợp</h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
            {surveys.length === 0
              ? 'Hiện chưa có khảo sát nào được gửi. Bạn có thể bấm nút "Dữ liệu mẫu" ở góc trên để xem thử các bản phân tích mẫu.'
              : 'Thử thay đổi từ khóa tìm kiếm hoặc bỏ chọn bộ lọc để xem danh sách.'}
          </p>
          {surveys.length === 0 && (
            <button
              onClick={onLoadSampleData}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nạp dữ liệu mẫu ngay</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSurveys.map((survey) => {
            const isSheep = survey.surveyType === 'sheep';
            return (
              <div
                key={survey.id}
                onClick={() => handleOpenDetail(survey)}
                className={`group cursor-pointer p-5 rounded-2xl bg-white border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  isSheep
                    ? 'border-emerald-200/90 hover:border-emerald-400'
                    : 'border-amber-200/90 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-stone-50 border border-stone-100">
                      {isSheep ? '🐑' : '🐄'}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-stone-800 text-base group-hover:text-emerald-800 transition-colors">
                        {survey.fullName}
                      </h3>
                      {survey.nickname && (
                        <p className="text-xs font-semibold text-stone-500">
                          Tên gọi: <span className="text-emerald-700 font-bold">"{survey.nickname}"</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isSheep
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isSheep ? 'Cừu' : 'Bò'}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{survey.phone || 'Chưa có SĐT'}</span>
                  </div>
                  {survey.careRelation && (
                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">
                        {isSheep ? 'Người chăm:' : 'Đang chăm:'} {survey.careRelation}
                      </span>
                    </div>
                  )}
                  {survey.twoYearDifficulties && (
                    <div className="flex items-center gap-2 text-stone-500">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate italic">
                        Trăn trở: "{survey.twoYearDifficulties}"
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(survey.submittedAt).toLocaleDateString('vi-VN')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {survey.aiAnalysis && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        <Sparkles className="w-2.5 h-2.5" />
                        Đã phân tích AI
                      </span>
                    )}
                    {survey.adminNotes && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        📝 Có ghi chú
                      </span>
                    )}
                    <span className="text-emerald-700 font-bold group-hover:underline ml-1">
                      Xem chi tiết →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal / Drawer */}
      {selectedSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden relative">
            {/* Modal Header */}
            <div
              className={`p-6 text-white flex items-center justify-between ${
                selectedSurvey.surveyType === 'sheep'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
                  : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">
                  {selectedSurvey.surveyType === 'sheep' ? '🐑' : '🐄'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {selectedSurvey.fullName}
                    </h2>
                    {selectedSurvey.nickname && (
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
                        "{selectedSurvey.nickname}"
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/90 mt-0.5">
                    {selectedSurvey.surveyType === 'sheep'
                      ? 'KHẢO SÁT CỪU (Anh/Chị/Em)'
                      : 'KHẢO SÁT BÒ (Người Giúp Việc)'}{' '}
                    • Gửi lúc {new Date(selectedSurvey.submittedAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="no-print p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                  title="In báo cáo chi tiết"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2">
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'ai'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Phân Tích Gemini AI &amp; Định Hướng</span>
              </button>

              <button
                onClick={() => setActiveTab('answers')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'answers'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Chi Tiết 19 Câu Khảo Sát</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'notes'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-amber-600" />
                <span>Ghi Chú Người Chăn</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: AI ANALYSIS */}
              {activeTab === 'ai' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                        ✨
                      </div>
                      <div>
                        <h4 className="font-extrabold text-stone-800 text-base">
                          Chân Dung Tâm Lý &amp; Cố Vấn Đồng Hành
                        </h4>
                        <p className="text-xs text-stone-500">
                          Phân tích chuyên sâu từ mô hình Gemini 3.8 Flash
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleTriggerReanalyze}
                      disabled={isReanalyzing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-all"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isReanalyzing ? 'animate-spin' : ''}`}
                      />
                      <span>{isReanalyzing ? 'Đang phân tích...' : 'Phân tích lại'}</span>
                    </button>
                  </div>

                  {selectedSurvey.aiAnalysis ? (
                    <div className="space-y-5">
                      {/* Overview */}
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                          🌿 Chân Dung Tổng Quan &amp; Tâm Thái
                        </span>
                        <p className="text-sm text-stone-800 leading-relaxed font-medium">
                          {selectedSurvey.aiAnalysis.overview}
                        </p>
                      </div>

                      {/* Strengths & Challenges Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Strengths */}
                        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80">
                          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 mb-2.5">
                            <CheckCircle className="w-4 h-4 text-teal-600" />
                            Điểm Mạnh &amp; Tiềm Năng Nổi Bật
                          </span>
                          <ul className="space-y-2">
                            {selectedSurvey.aiAnalysis.personalityStrengths?.map(
                              (strength, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-stone-700 flex items-start gap-2 bg-white/70 p-2 rounded-xl border border-teal-100"
                                >
                                  <span className="text-teal-600 font-bold">•</span>
                                  <span>{strength}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        {/* Challenges */}
                        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            Nỗi Trăn Trở &amp; Rào Cản Cần Gỡ Bỏ
                          </span>
                          <ul className="space-y-2">
                            {selectedSurvey.aiAnalysis.hiddenChallenges?.map(
                              (challenge, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-stone-700 flex items-start gap-2 bg-white/70 p-2 rounded-xl border border-amber-100"
                                >
                                  <span className="text-amber-600 font-bold">•</span>
                                  <span>{challenge}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Communication Tips */}
                      <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80">
                        <span className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5 mb-2.5">
                          <Lightbulb className="w-4 h-4 text-sky-600" />
                          Gợi Ý Cách Tiếp Cận &amp; Giao Tiếp Cho Người Chăn
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {selectedSurvey.aiAnalysis.communicationTips?.map(
                            (tip, idx) => (
                              <div
                                key={idx}
                                className="bg-white p-3 rounded-xl border border-sky-100 text-xs text-stone-700 shadow-2xs leading-relaxed"
                              >
                                <span className="font-bold text-sky-700 block mb-1">
                                  Nguyên tắc #{idx + 1}
                                </span>
                                {tip}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Action Plan */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Lộ Trình Đồng Hành Cá Nhân Hóa (1 - 6 Tháng)
                        </span>
                        <div className="space-y-2">
                          {selectedSurvey.aiAnalysis.actionPlan?.map((plan, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 bg-white p-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 font-medium"
                            >
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                                {idx + 1}
                              </span>
                              <span>{plan}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shepherd's Advice */}
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border border-rose-200/80">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-1.5">
                          <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
                          Lời Gửi Gắm Dành Riêng Cho Người Chăn
                        </span>
                        <p className="text-xs sm:text-sm text-stone-800 italic leading-relaxed font-medium">
                          "{selectedSurvey.aiAnalysis.shepherdAdvice}"
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200">
                      <p className="text-sm text-stone-600 mb-3">
                        Bản khảo sát này chưa có kết quả phân tích AI.
                      </p>
                      <button
                        onClick={handleTriggerReanalyze}
                        disabled={isReanalyzing}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md hover:bg-purple-700 transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Kích hoạt phân tích Gemini AI ngay</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: DETAILED 19 ANSWERS */}
              {activeTab === 'answers' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* PHẦN A */}
                  <div className="bg-stone-50/60 p-4 rounded-2xl border border-stone-200">
                    <h5 className="font-extrabold text-stone-800 text-sm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      PHẦN A: THÔNG TIN CÁ NHÂN
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <strong className="text-stone-500 block">1. Họ và tên:</strong>
                        <span className="text-stone-800 font-semibold">{selectedSurvey.fullName}</span>
                      </div>
                      <div>
                        <strong className="text-stone-500 block">2. Biệt danh muốn gọi:</strong>
                        <span className="text-stone-800">{selectedSurvey.nickname || 'Không có'}</span>
                      </div>
                      <div>
                        <strong className="text-stone-500 block">3. Ngày sinh:</strong>
                        <span className="text-stone-800">{selectedSurvey.birthDate || 'Chưa điền'}</span>
                      </div>
                      <div>
                        <strong className="text-stone-500 block">4. Địa chỉ:</strong>
                        <span className="text-stone-800">{selectedSurvey.address || 'Chưa điền'}</span>
                      </div>
                      <div>
                        <strong className="text-stone-500 block">5. Số điện thoại:</strong>
                        <span className="text-stone-800 font-semibold">{selectedSurvey.phone}</span>
                      </div>
                      <div>
                        <strong className="text-stone-500 block">6. Nơi học/làm việc:</strong>
                        <span className="text-stone-800">{selectedSurvey.workplace || 'Chưa điền'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <strong className="text-stone-500 block">7. Vị trí/Công việc:</strong>
                        <span className="text-stone-800">{selectedSurvey.position || 'Chưa điền'}</span>
                      </div>
                    </div>
                  </div>

                  {/* PHẦN B */}
                  <div className="bg-stone-50/60 p-4 rounded-2xl border border-stone-200">
                    <h5 className="font-extrabold text-stone-800 text-sm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      PHẦN B: THÔNG TIN ĐỨC TIN &amp; QUAN HỆ CHĂM SÓC
                    </h5>
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <strong className="text-stone-500 block">8. Vai trò Edu LMS:</strong>
                          <span className="text-stone-800 font-semibold">{selectedSurvey.lmsRole || 'Chưa điền'}</span>
                        </div>
                        <div>
                          <strong className="text-stone-500 block">
                            9.{' '}
                            {selectedSurvey.surveyType === 'sheep'
                              ? 'Ai đang chăm sóc:'
                              : 'Đang chăm sóc những ai:'}
                          </strong>
                          <span className="text-stone-800 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {selectedSurvey.careRelation || 'Chưa điền'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <strong className="text-stone-500 block">10. 70 bài học:</strong>
                          <span className="text-stone-800">{selectedSurvey.completed70Lessons || 'Chưa điền'}</span>
                        </div>
                        <div>
                          <strong className="text-stone-500 block">11. Sách Cha:</strong>
                          <span className="text-stone-800">{selectedSurvey.completedFatherBook || 'Chưa điền'}</span>
                        </div>
                        <div>
                          <strong className="text-stone-500 block">12. Sách Tập Giảng Đạo:</strong>
                          <span className="text-stone-800">{selectedSurvey.completedPreachBook || 'Chưa điền'}</span>
                        </div>
                      </div>

                      <div>
                        <strong className="text-stone-500 block">13. Số lượng kết trái trong năm:</strong>
                        <span className="text-stone-800 font-bold text-amber-800">{selectedSurvey.fruitsCount || '0'}</span>
                      </div>

                      <div>
                        <strong className="text-stone-500 block">14. Kế hoạch &amp; định hướng 6 tháng gần nhất:</strong>
                        <p className="text-stone-800 bg-white p-3 rounded-xl border border-stone-200 mt-1 leading-relaxed">
                          {selectedSurvey.sixMonthPlan || 'Chưa chia sẻ'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PHẦN C */}
                  <div className="bg-stone-50/60 p-4 rounded-2xl border border-stone-200">
                    <h5 className="font-extrabold text-stone-800 text-sm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      PHẦN C: ĐỊNH HƯỚNG PHÁT TRIỂN &amp; CHIA SẺ
                    </h5>
                    <div className="space-y-3 text-xs">
                      <div>
                        <strong className="text-stone-600 block">15. Những điều/hành vi cảm thấy không thoải mái, không chấp nhận:</strong>
                        <p className="text-stone-800 bg-white p-3 rounded-xl border border-rose-100 text-rose-950 mt-1 leading-relaxed">
                          {selectedSurvey.uncomfortableThings || 'Không có chia sẻ'}
                        </p>
                      </div>

                      <div>
                        <strong className="text-stone-600 block">16. Khó khăn gặp phải trong 2 năm gần đây chưa giải quyết:</strong>
                        <p className="text-stone-800 bg-white p-3 rounded-xl border border-amber-100 text-amber-950 mt-1 leading-relaxed">
                          {selectedSurvey.twoYearDifficulties || 'Không có chia sẻ'}
                        </p>
                      </div>

                      <div>
                        <strong className="text-stone-600 block">17. Kết quả / thành tựu vui mừng ghi nhận được:</strong>
                        <p className="text-stone-800 bg-white p-3 rounded-xl border border-emerald-100 text-emerald-950 mt-1 leading-relaxed">
                          {selectedSurvey.joyfulAchievements || 'Không có chia sẻ'}
                        </p>
                      </div>

                      <div>
                        <strong className="text-stone-600 block">18. Lời khen hoặc nhận xét đáng yêu hay nhận được:</strong>
                        <p className="text-stone-800 bg-white p-3 rounded-xl border border-stone-200 mt-1 leading-relaxed">
                          {selectedSurvey.lovelyCompliments || 'Không có chia sẻ'}
                        </p>
                      </div>

                      <div>
                        <strong className="text-stone-600 block">19. Mong đợi lớn nhất cho chặng đường / năm tiếp theo:</strong>
                        <p className="text-stone-800 bg-white p-3 rounded-xl border border-sky-100 text-sky-950 mt-1 leading-relaxed">
                          {selectedSurvey.nextYearExpectations || 'Không có chia sẻ'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SHEPHERD'S NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="font-extrabold text-stone-800 text-sm">
                      Sổ Tay Chăm Sóc Riêng Của Người Chăn
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Ghi chép các cuộc gặp, tiến độ thăm viếng, cảm xúc và lời cầu nguyện dành riêng cho {selectedSurvey.fullName}.
                    </p>
                  </div>

                  <textarea
                    rows={6}
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Ví dụ: Ngày 15/10 đã gặp gỡ uống trà; em cởi mở chia sẻ về áp lực công việc. Cần tiếp tục cầu nguyện và khích lệ em..."
                    className="w-full p-4 rounded-2xl border border-stone-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 leading-relaxed bg-amber-50/20"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveCurrentNote}
                      disabled={isSavingNote}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSavingNote ? 'Đang lưu...' : 'Lưu Ghi Chú'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm(`Bạn có chắc chắn muốn xóa bản khảo sát của ${selectedSurvey.fullName}?`)) {
                    onDeleteSurvey(selectedSurvey.id);
                    setSelectedSurvey(null);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-bold px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa bản khảo sát này</span>
              </button>

              <button
                onClick={() => setSelectedSurvey(null)}
                className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
