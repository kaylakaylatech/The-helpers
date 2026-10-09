import React, { useMemo, useState } from 'react';
import { SurveyData } from '../types/survey';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { PieChart as PieIcon, BarChart3, TrendingUp, CheckCircle, Clock, BookOpen, Users } from 'lucide-react';

interface AdminStatsChartsProps {
  surveys: SurveyData[];
}

export const AdminStatsCharts: React.FC<AdminStatsChartsProps> = ({ surveys }) => {
  const [chartMode, setChartMode] = useState<'subject' | 'byRole'>('subject');

  // 1. Compute Category Distribution (Cừu vs Bò)
  const roleDistribution = useMemo(() => {
    const sheep = surveys.filter((s) => s.surveyType === 'sheep').length;
    const cow = surveys.filter((s) => s.surveyType === 'cow').length;
    return [
      {
        name: 'Cừu (Anh/Chị/Em)',
        value: sheep,
        color: '#059669', // Emerald
        textColor: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        emoji: '🐑',
      },
      {
        name: 'Bò (Người Giúp Việc)',
        value: cow,
        color: '#d97706', // Amber
        textColor: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        emoji: '🐄',
      },
    ];
  }, [surveys]);

  // 2. Compute Learning Progress
  const learningProgress = useMemo(() => {
    const parseStatus = (text: string) => {
      const lower = (text || '').toLowerCase().trim();
      if (!lower || lower.includes('chưa') || lower === '0' || lower.includes('không')) {
        return 'notYet';
      }
      if (
        lower.includes('hoàn thành') ||
        lower.includes('xong') ||
        lower.includes('hết') ||
        lower.includes('lần 1') ||
        lower.includes('lần 2') ||
        lower.includes('lần 3') ||
        lower.includes('100%') ||
        lower.includes('rồi')
      ) {
        return 'completed';
      }
      return 'inProgress';
    };

    let p70 = { completed: 0, inProgress: 0, notYet: 0 };
    let pFather = { completed: 0, inProgress: 0, notYet: 0 };
    let pPreach = { completed: 0, inProgress: 0, notYet: 0 };

    // Sheep vs Cow completion breakdown
    let sheepCompletedCount = 0;
    let cowCompletedCount = 0;

    surveys.forEach((s) => {
      const s70 = parseStatus(s.completed70Lessons);
      const sFather = parseStatus(s.completedFatherBook);
      const sPreach = parseStatus(s.completedPreachBook);

      p70[s70]++;
      pFather[sFather]++;
      pPreach[sPreach]++;

      // Has completed at least 70 lessons or Father's book
      if (s70 === 'completed' || sFather === 'completed') {
        if (s.surveyType === 'sheep') sheepCompletedCount++;
        else cowCompletedCount++;
      }
    });

    const subjectData = [
      {
        name: '70 Bài Học',
        'Đã hoàn thành': p70.completed,
        'Đang học / Đọc': p70.inProgress,
        'Chưa hoàn thành': p70.notYet,
      },
      {
        name: 'Sách Cha',
        'Đã hoàn thành': pFather.completed,
        'Đang học / Đọc': pFather.inProgress,
        'Chưa hoàn thành': pFather.notYet,
      },
      {
        name: 'Sách Giảng Đạo',
        'Đã hoàn thành': pPreach.completed,
        'Đang học / Đọc': pPreach.inProgress,
        'Chưa hoàn thành': pPreach.notYet,
      },
    ];

    const sheepCount = surveys.filter((s) => s.surveyType === 'sheep').length;
    const cowCount = surveys.filter((s) => s.surveyType === 'cow').length;

    const byRoleData = [
      {
        name: 'Cừu (Anh/Chị/Em)',
        'Đã hoàn thành bài/sách': sheepCompletedCount,
        'Đang học & hoàn thiện': Math.max(0, sheepCount - sheepCompletedCount),
      },
      {
        name: 'Bò (Người Giúp Việc)',
        'Đã hoàn thành bài/sách': cowCompletedCount,
        'Đang học & hoàn thiện': Math.max(0, cowCount - cowCompletedCount),
      },
    ];

    const totalLessonsCompleted = p70.completed + pFather.completed + pPreach.completed;
    const totalPossible = surveys.length * 3;
    const completionRate = totalPossible > 0 ? Math.round((totalLessonsCompleted / totalPossible) * 100) : 0;

    return {
      subjectData,
      byRoleData,
      p70,
      pFather,
      pPreach,
      completionRate,
    };
  }, [surveys]);

  const totalSurveys = surveys.length;

  if (totalSurveys === 0) {
    return null;
  }

  // Custom Tooltip for Pie Chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percent = totalSurveys > 0 ? ((data.value / totalSurveys) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-xl text-xs">
          <p className="font-extrabold text-stone-800 flex items-center gap-1.5 mb-1">
            <span>{data.payload.emoji}</span>
            <span>{data.name}</span>
          </p>
          <p className="text-stone-600 font-medium">
            Số lượng: <span className="font-bold text-stone-900">{data.value}</span> thành viên
          </p>
          <p className="text-stone-500 font-semibold mt-0.5">
            Tỷ lệ: <span className="text-emerald-700 font-bold">{percent}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-xl text-xs min-w-[170px]">
          <p className="font-extrabold text-stone-800 border-b border-stone-100 pb-1.5 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{label}</span>
          </p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-stone-600">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}:</span>
                </span>
                <span className="font-bold text-stone-900">{entry.value} người</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-8 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-lg shadow-stone-900/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Bảng Thống Kê Trực Quan (Recharts Analytics)
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-800 tracking-tight flex items-center gap-2">
            <span>📊 Thống Kê Đối Tượng &amp; Tiến Độ Học Tập</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Cung cấp cái nhìn toàn diện về cơ cấu bầy chiên và tỷ lệ trang bị lời dạy.
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-600 block leading-tight">Tỷ lệ hoàn thành chung</span>
              <span className="font-extrabold text-sm">{learningProgress.completionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid with 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Chart 1: Pie Chart - Phân loại đối tượng (Cừu / Bò) */}
        <div className="lg:col-span-5 bg-stone-50/50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-stone-800 text-sm sm:text-base flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-emerald-600" />
                <span>Phân Loại Đối Tượng (Cừu / Bò)</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                Tổng: {totalSurveys}
              </span>
            </div>

            {/* Recharts Pie Chart Container */}
            <div className="w-full h-56 sm:h-64 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={800}
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-black text-stone-800 leading-none">
                  {totalSurveys}
                </span>
                <span className="text-[11px] font-semibold text-stone-400 mt-0.5">
                  Thành viên
                </span>
              </div>
            </div>
          </div>

          {/* Legend and Breakdown Cards */}
          <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-stone-200/70">
            {roleDistribution.map((item, idx) => {
              const percent = totalSurveys > 0 ? ((item.value / totalSurveys) * 100).toFixed(0) : 0;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border ${item.bg} ${item.border} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className={`text-xs font-bold ${item.textColor} leading-tight`}>
                        {idx === 0 ? 'Cừu' : 'Bò'}
                      </p>
                      <span className="text-[10px] text-stone-500">
                        {idx === 0 ? 'Anh/Chị/Em' : 'Người giúp việc'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-stone-800 block">
                      {item.value}
                    </span>
                    <span className={`text-[10px] font-bold ${item.textColor}`}>
                      {percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Bar Chart - Tiến độ hoàn thành bài học */}
        <div className="lg:col-span-7 bg-stone-50/50 p-5 sm:p-6 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="font-bold text-stone-800 text-sm sm:text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Tiến Độ Hoàn Thành Bài Học &amp; Sách</span>
              </h3>

              {/* View Mode Toggle */}
              <div className="inline-flex items-center p-0.5 bg-stone-200/80 rounded-xl text-[11px] font-bold text-stone-600">
                <button
                  type="button"
                  onClick={() => setChartMode('subject')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    chartMode === 'subject'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'hover:text-stone-900'
                  }`}
                >
                  Theo Môn Học
                </button>
                <button
                  type="button"
                  onClick={() => setChartMode('byRole')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    chartMode === 'byRole'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'hover:text-stone-900'
                  }`}
                >
                  Theo Cừu &amp; Bò
                </button>
              </div>
            </div>

            {/* Recharts Bar Chart Container */}
            <div className="w-full h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartMode === 'subject' ? (
                  <BarChart
                    data={learningProgress.subjectData}
                    margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#57534e', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#d6d3d1' }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#78716c', fontSize: 11 }}
                      axisLine={{ stroke: '#d6d3d1' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ paddingBottom: 10, fontSize: 11, fontWeight: 600 }}
                    />
                    <Bar
                      dataKey="Đã hoàn thành"
                      fill="#059669" // Emerald
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                    <Bar
                      dataKey="Đang học / Đọc"
                      fill="#f59e0b" // Amber
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                    <Bar
                      dataKey="Chưa hoàn thành"
                      fill="#cbd5e1" // Slate-300
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                ) : (
                  <BarChart
                    data={learningProgress.byRoleData}
                    margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#57534e', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#d6d3d1' }}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#78716c', fontSize: 11 }}
                      axisLine={{ stroke: '#d6d3d1' }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ paddingBottom: 10, fontSize: 11, fontWeight: 600 }}
                    />
                    <Bar
                      dataKey="Đã hoàn thành bài/sách"
                      fill="#059669"
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                    <Bar
                      dataKey="Đang học & hoàn thiện"
                      fill="#f59e0b"
                      radius={[6, 6, 0, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick learning progress pill summary */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/70 text-center">
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-500 block font-medium">70 Bài Học</span>
              <span className="text-xs font-bold text-emerald-700">
                {learningProgress.p70.completed} / {totalSurveys} xong
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-500 block font-medium">Sách Cha</span>
              <span className="text-xs font-bold text-emerald-700">
                {learningProgress.pFather.completed} / {totalSurveys} xong
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <span className="text-[10px] text-stone-500 block font-medium">Tập Giảng Đạo</span>
              <span className="text-xs font-bold text-emerald-700">
                {learningProgress.pPreach.completed} / {totalSurveys} xong
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
