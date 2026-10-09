import React, { useState } from 'react';

export const PastoralScene: React.FC = () => {
  const [sheepMood, setSheepMood] = useState<string>('Bình an gặm cỏ');
  const [showBubble, setShowBubble] = useState<boolean>(false);

  const handleSheepClick = () => {
    const moods = [
      'Bình an bên đồng cỏ xanh tươi 🌿',
      'Được Người Chăn dắt đến mé nước bình tịnh 💧',
      'Được yêu thương và che chở 🌸',
      'Tâm hồn thư thái, ngập tràn biết ơn 🐑'
    ];
    const nextMood = moods[Math.floor(Math.random() * moods.length)];
    setSheepMood(nextMood);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3500);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-sky-200 via-sky-100/70 to-emerald-50 border border-emerald-100/60 shadow-xl shadow-emerald-900/5 my-6">
      {/* Sky & Sun & Clouds */}
      <div className="absolute top-0 inset-x-0 h-44 overflow-hidden pointer-events-none">
        {/* Soft morning sun */}
        <div className="absolute top-4 right-16 w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-yellow-100/80 blur-lg opacity-80" />
        <div className="absolute top-6 right-18 w-14 h-14 rounded-full bg-amber-100/90 shadow-lg shadow-amber-300/40" />

        {/* Floating Clouds */}
        <div className="absolute top-5 left-10 opacity-75 animate-cloud-slow">
          <svg width="120" height="42" viewBox="0 0 120 42" fill="none">
            <path d="M20 32C11.1634 32 4 24.8366 4 16C4 7.16344 11.1634 0 20 0C25.4411 0 30.2524 2.70939 33.1557 6.84883C36.4678 4.45781 40.5739 3.06452 45 3.06452C54.9411 3.06452 63 11.1234 63 21.0645C63 21.464 62.9868 21.8596 62.9608 22.2505C65.5976 19.6469 69.2131 18.0645 73.2 18.0645C81.4843 18.0645 88.2 24.7802 88.2 33.0645H20V32Z" fill="white" fillOpacity="0.85" />
          </svg>
        </div>

        <div className="absolute top-12 left-1/3 opacity-60 animate-cloud-reverse">
          <svg width="160" height="50" viewBox="0 0 160 50" fill="none">
            <path d="M25 40C13.9543 40 5 31.0457 5 20C5 8.9543 13.9543 0 25 0C31.8014 0 37.8155 3.38674 41.4446 8.56104C45.5847 5.57226 50.7174 3.83065 56.25 3.83065C68.6764 3.83065 78.75 13.9042 78.75 26.3306C78.75 26.83 78.7335 27.3245 78.701 27.8131C81.997 24.5586 86.5164 22.5806 91.5 22.5806C101.855 22.5806 110.25 30.9753 110.25 41.3306H25V40Z" fill="white" fillOpacity="0.8" />
          </svg>
        </div>

        <div className="absolute top-3 right-1/4 opacity-70 animate-cloud-slow">
          <svg width="90" height="35" viewBox="0 0 90 35" fill="none">
            <path d="M15 28C8.37258 28 3 22.6274 3 16C3 9.37258 8.37258 4 15 4C19.0808 4 22.6893 6.03206 24.8668 9.13662C27.3508 7.34336 30.4304 6.29839 33.75 6.29839C41.2058 6.29839 47.25 12.3425 47.25 19.7984H15V28Z" fill="white" fillOpacity="0.75" />
          </svg>
        </div>
      </div>

      {/* Pastoral Hills SVG Landscape */}
      <div className="relative pt-16 sm:pt-20">
        <svg
          viewBox="0 0 1200 360"
          className="w-full h-auto min-h-[220px] max-h-[360px] object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hillBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="hillFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="60%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background Hill */}
          <path
            d="M0,190 C300,120 500,210 800,140 C1000,90 1150,170 1200,180 L1200,360 L0,360 Z"
            fill="url(#hillBack)"
          />

          {/* Distant trees on ridge */}
          <g fill="#22c55e" opacity="0.45">
            <circle cx="280" cy="148" r="16" />
            <circle cx="300" cy="144" r="20" />
            <circle cx="320" cy="150" r="15" />
            <circle cx="760" cy="138" r="18" />
            <circle cx="785" cy="132" r="22" />
            <circle cx="810" cy="140" r="16" />
          </g>

          {/* Middle Hill */}
          <path
            d="M0,230 C220,170 450,260 720,200 C950,150 1100,220 1200,210 L1200,360 L0,360 Z"
            fill="url(#hillMid)"
            opacity="0.85"
          />

          {/* Peaceful Meadow Stream */}
          <path
            d="M720,200 C680,240 640,270 590,300 C530,335 480,360 460,360 L510,360 C535,360 580,335 630,300 C680,270 710,240 735,200 Z"
            fill="url(#streamGrad)"
          />

          {/* Foreground lush hill */}
          <path
            d="M0,270 C180,220 400,290 650,240 C900,190 1080,260 1200,250 L1200,360 L0,360 Z"
            fill="url(#hillFront)"
          />

          {/* Dotted wildflowers */}
          <g opacity="0.9">
            {/* White daisies */}
            <circle cx="90" cy="290" r="3.5" fill="#ffffff" />
            <circle cx="90" cy="290" r="1.5" fill="#fbbf24" />
            <circle cx="160" cy="320" r="4" fill="#ffffff" />
            <circle cx="160" cy="320" r="1.8" fill="#fbbf24" />
            <circle cx="240" cy="295" r="3" fill="#ffffff" />
            <circle cx="240" cy="295" r="1.2" fill="#fbbf24" />
            <circle cx="380" cy="325" r="4" fill="#ffffff" />
            <circle cx="380" cy="325" r="1.8" fill="#fbbf24" />
            <circle cx="780" cy="290" r="3.5" fill="#ffffff" />
            <circle cx="780" cy="290" r="1.5" fill="#fbbf24" />
            <circle cx="890" cy="330" r="4" fill="#ffffff" />
            <circle cx="890" cy="330" r="1.8" fill="#fbbf24" />
            <circle cx="1060" cy="290" r="3.5" fill="#ffffff" />
            <circle cx="1060" cy="290" r="1.5" fill="#fbbf24" />
            {/* Lavender touches */}
            <circle cx="130" cy="305" r="3" fill="#c084fc" opacity="0.8" />
            <circle cx="340" cy="310" r="3.5" fill="#c084fc" opacity="0.8" />
            <circle cx="840" cy="315" r="3" fill="#c084fc" opacity="0.8" />
            <circle cx="1010" cy="315" r="3.5" fill="#c084fc" opacity="0.8" />
          </g>
        </svg>

        {/* Characters & Interactive Layer over Landscape */}
        <div className="absolute inset-0 flex items-end justify-between px-6 sm:px-14 pb-4 pointer-events-none">
          {/* Left Side: Shepherd Figure with Crook */}
          <div className="pointer-events-auto group relative flex flex-col items-center select-none cursor-pointer mb-2 transition-transform hover:scale-105 duration-300">
            {/* Shepherd Tooltip */}
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-stone-700 text-xs px-3 py-1.5 rounded-full shadow-md border border-emerald-100 whitespace-nowrap z-20">
              🌿 Người Chăn hiền lành bảo vệ đàn chiên
            </div>

            <div className="relative">
              {/* Shepherd Graphic SVG */}
              <svg width="74" height="110" viewBox="0 0 74 110" fill="none">
                {/* Shepherd's Crook / Staff */}
                <path
                  d="M14 102 L14 26 C14 14 26 12 28 20 C29 25 24 28 20 27"
                  stroke="#78350f"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Halo / Aura */}
                <ellipse cx="44" cy="22" rx="16" ry="10" fill="#fef08a" fillOpacity="0.4" />
                {/* Head */}
                <circle cx="44" cy="24" r="11" fill="#fde68a" />
                {/* Shepherd Headdress / Cloth */}
                <path d="M35 18 C37 13 51 13 53 18 C55 24 53 32 52 35 L36 35 C35 32 33 24 35 18 Z" fill="#b45309" fillOpacity="0.75" />
                {/* Headband */}
                <path d="M35 22 Q44 19 53 22" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
                {/* Gentle Eyes & Smile */}
                <circle cx="41" cy="25" r="1.2" fill="#451a03" />
                <circle cx="47" cy="25" r="1.2" fill="#451a03" />
                <path d="M42 28 Q44 30 46 28" stroke="#451a03" strokeWidth="1" strokeLinecap="round" />
                {/* Robe / Tunic */}
                <path
                  d="M32 35 C34 44 26 80 24 98 C36 102 54 102 64 98 C62 80 54 44 56 35 Z"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                {/* Robe Sash / Belt */}
                <path d="M29 55 Q44 58 59 55" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                <path d="M38 56 L36 78" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                {/* Arm holding staff */}
                <path d="M34 44 C26 52 18 48 15 38" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-emerald-950 bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full mt-1 border border-emerald-200/60 shadow-xs">
              Người Chăn
            </span>
          </div>

          {/* Center: Flock of Peaceful Sheep */}
          <div className="pointer-events-auto flex items-end gap-3 sm:gap-6 mb-2">
            {/* Interactive Main Sheep */}
            <div
              onClick={handleSheepClick}
              className="relative cursor-pointer transition-transform hover:scale-110 active:scale-95 duration-200 animate-sheep-bob select-none group"
            >
              {/* Click Speech Bubble */}
              {showBubble && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-emerald-900 text-xs font-medium px-3 py-1.5 rounded-2xl shadow-lg border border-emerald-200 whitespace-nowrap animate-gentle-float z-30">
                  {sheepMood}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-emerald-200 rotate-45" />
                </div>
              )}

              {/* Sheep SVG */}
              <svg width="68" height="54" viewBox="0 0 68 54" fill="none">
                {/* Legs */}
                <rect x="18" y="40" width="4" height="12" rx="2" fill="#475569" />
                <rect x="26" y="40" width="4" height="12" rx="2" fill="#334155" />
                <rect x="42" y="40" width="4" height="12" rx="2" fill="#475569" />
                <rect x="50" y="40" width="4" height="12" rx="2" fill="#334155" />
                {/* Fluffy Wool Cloud Body */}
                <ellipse cx="36" cy="28" rx="22" ry="17" fill="#ffffff" />
                <circle cx="22" cy="24" r="10" fill="#f8fafc" />
                <circle cx="34" cy="18" r="11" fill="#f8fafc" />
                <circle cx="48" cy="22" r="10" fill="#f8fafc" />
                <circle cx="44" cy="34" r="9" fill="#f1f5f9" />
                <circle cx="28" cy="34" r="9" fill="#f1f5f9" />
                {/* Tail */}
                <circle cx="58" cy="26" r="5" fill="#f8fafc" />
                {/* Sheep Head */}
                <ellipse cx="16" cy="22" rx="9" ry="8" fill="#f1f5f9" />
                <ellipse cx="9" cy="16" rx="4" ry="2.5" fill="#e2e8f0" transform="rotate(-25 9 16)" />
                {/* Little Wool Tuft on Head */}
                <circle cx="16" cy="15" r="4.5" fill="#ffffff" />
                {/* Eye & Sweet Smile */}
                <circle cx="14" cy="21" r="1.5" fill="#1e293b" />
                <path d="M12 25 Q14 27 16 25" stroke="#64748b" strokeWidth="1" strokeLinecap="round" />
                {/* Little Pink Cheek */}
                <circle cx="17" cy="24" r="1.8" fill="#f472b6" opacity="0.65" />
              </svg>
              <div className="text-center text-[11px] font-bold text-emerald-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-emerald-200 shadow-xs mt-0.5">
                Cừu Thơ Ngây 🐑
              </div>
            </div>

            {/* Little Baby Lamb Resting */}
            <div className="hidden sm:block select-none opacity-90 transition-transform hover:scale-105">
              <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
                <ellipse cx="24" cy="20" rx="14" ry="10" fill="#ffffff" />
                <circle cx="16" cy="18" r="6" fill="#f8fafc" />
                <circle cx="24" cy="14" r="7" fill="#f8fafc" />
                <circle cx="32" cy="18" r="6" fill="#f8fafc" />
                <ellipse cx="10" cy="16" rx="6" ry="5" fill="#f1f5f9" />
                <circle cx="9" cy="16" r="1" fill="#334155" />
                <circle cx="11" cy="18" r="1.2" fill="#f472b6" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Right Side: Faithful & Gentle Cow */}
          <div className="pointer-events-auto group relative flex flex-col items-center select-none cursor-pointer mb-2 transition-transform hover:scale-105 duration-300">
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-stone-700 text-xs px-3 py-1.5 rounded-full shadow-md border border-amber-200 whitespace-nowrap z-20">
              🐄 Chú Bò cần cù, trung tín phục vụ
            </div>

            <div className="relative">
              {/* Cow Graphic SVG */}
              <svg width="84" height="66" viewBox="0 0 84 66" fill="none">
                {/* Legs */}
                <rect x="22" y="48" width="5" height="16" rx="2.5" fill="#334155" />
                <rect x="32" y="48" width="5" height="16" rx="2.5" fill="#1e293b" />
                <rect x="54" y="48" width="5" height="16" rx="2.5" fill="#334155" />
                <rect x="64" y="48" width="5" height="16" rx="2.5" fill="#1e293b" />
                {/* Body */}
                <rect x="18" y="24" width="54" height="28" rx="14" fill="#ffffff" />
                {/* Spots (Pastoral Cow) */}
                <path d="M26 24 C30 29 36 29 38 24 Z" fill="#334155" />
                <ellipse cx="48" cy="38" rx="8" ry="6" fill="#334155" />
                <path d="M62 30 C64 36 70 38 72 32 Z" fill="#334155" />
                {/* Udder / Gentle details */}
                <ellipse cx="40" cy="51" rx="4" ry="2" fill="#fbcfe8" />
                {/* Cow Tail */}
                <path d="M71 36 Q78 40 76 52" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="76" cy="53" r="2.5" fill="#1e293b" />
                {/* Cow Head */}
                <ellipse cx="14" cy="25" rx="12" ry="10" fill="#ffffff" />
                {/* Ears */}
                <ellipse cx="5" cy="18" rx="5" ry="2.5" fill="#fbcfe8" transform="rotate(-20 5 18)" />
                <ellipse cx="23" cy="18" rx="5" ry="2.5" fill="#fbcfe8" transform="rotate(20 23 18)" />
                {/* Horns */}
                <path d="M10 16 Q8 10 11 9" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 16 Q20 10 17 9" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" />
                {/* Snout / Muzzle */}
                <rect x="4" y="26" width="16" height="11" rx="5.5" fill="#fbcfe8" />
                <circle cx="9" cy="31" r="1.2" fill="#db2777" />
                <circle cx="15" cy="31" r="1.2" fill="#db2777" />
                {/* Eyes */}
                <circle cx="12" cy="21" r="1.6" fill="#1e293b" />
                {/* Pastoral Bell on Neck */}
                <path d="M22 35 L20 40 L24 40 Z" fill="#f59e0b" />
                <circle cx="22" cy="41" r="1.5" fill="#b45309" />
              </svg>
            </div>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-50/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full mt-0.5 border border-amber-200 shadow-xs">
              Bò Trung Tín 🐄
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
