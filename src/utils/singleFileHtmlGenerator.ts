/**
 * Generates a complete, self-contained Single-File HTML/CSS/JS application
 * with all pasture graphics, 19 survey questions, Sheep & Cow toggling,
 * Gemini AI analysis capability, and password-protected Admin Dashboard.
 */
export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🌸 Khảo Sát Thông Tin & Định Hướng Phát Triển 🌸</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #059669;
      --primary-hover: #047857;
      --primary-light: #ecfdf5;
      --amber: #d97706;
      --amber-hover: #b45309;
      --amber-light: #fffbeb;
      --text: #292524;
      --text-muted: #57534e;
      --bg: #fefce8;
      --card-bg: #ffffff;
      --border: #e7e5e4;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Nunito', sans-serif;
      background: linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 40%, #fefce8 100%);
      color: var(--text);
      min-height: 100vh;
      padding-bottom: 60px;
    }
    h1, h2, h3, h4, .heading { font-family: 'Quicksand', sans-serif; }

    /* Container */
    .container { max-width: 900px; margin: 0 auto; padding: 0 16px; }

    /* Header */
    header { text-align: center; padding: 40px 16px 20px; }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 9999px;
      background: #d1fae5;
      color: #065f46;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 14px;
      border: 1px solid #a7f3d0;
    }
    h1 { font-size: 28px; font-weight: 800; color: #1c1917; line-height: 1.3; }
    @media (min-width: 640px) { h1 { font-size: 34px; } }
    .subtitle { color: var(--text-muted); font-size: 15px; margin-top: 10px; max-width: 640px; margin-left: auto; margin-right: auto; line-height: 1.5; }

    /* Meadow Visual */
    .meadow-card {
      position: relative;
      background: linear-gradient(180deg, #bae6fd 0%, #e0f2fe 50%, #dcfce7 100%);
      border-radius: 24px;
      overflow: hidden;
      margin: 24px auto;
      border: 1px solid #bbf7d0;
      box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.08);
      min-height: 180px;
    }
    .clouds {
      position: absolute; top: 12px; left: 0; right: 0; height: 60px;
      display: flex; justify-content: space-around; opacity: 0.8;
      animation: floatClouds 30s ease-in-out infinite alternate;
    }
    @keyframes floatClouds { from { transform: translateX(-15px); } to { transform: translateX(15px); } }
    .meadow-content {
      position: relative; padding: 30px 24px 20px; text-align: center;
      display: flex; justify-content: space-around; align-items: flex-end;
    }
    .pasture-actor { cursor: pointer; transition: transform 0.2s; user-select: none; }
    .pasture-actor:hover { transform: scale(1.1); }
    .actor-emoji { font-size: 48px; display: block; }
    .actor-name { font-size: 12px; font-weight: 700; background: rgba(255,255,255,0.85); padding: 2px 10px; border-radius: 9999px; }

    /* Selection Cards */
    .selection-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 24px; }
    @media (min-width: 640px) { .selection-grid { grid-template-columns: 1fr 1fr; } }
    .select-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 30px;
      border: 2px solid transparent;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .select-card.sheep-card { border-color: #a7f3d0; background: linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%); }
    .select-card.sheep-card:hover { transform: translateY(-4px); box-shadow: 0 12px 25px rgba(5, 150, 105, 0.15); border-color: #34d399; }
    .select-card.cow-card { border-color: #fde68a; background: linear-gradient(180deg, #ffffff 0%, #fffbeb 100%); }
    .select-card.cow-card:hover { transform: translateY(-4px); box-shadow: 0 12px 25px rgba(217, 119, 6, 0.15); border-color: #fbbf24; }
    .card-title { font-size: 22px; font-weight: 800; margin-top: 10px; }
    .sheep-card .card-title { color: #065f46; }
    .cow-card .card-title { color: #92400e; }
    .card-desc { font-size: 14px; color: var(--text-muted); margin: 12px 0 20px; line-height: 1.5; }
    .btn-action {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 12px 20px; border-radius: 16px; font-weight: 700; font-size: 14px;
      color: #fff; border: none; cursor: pointer; text-decoration: none; width: 100%;
    }
    .sheep-card .btn-action { background: var(--primary); }
    .sheep-card .btn-action:hover { background: var(--primary-hover); }
    .cow-card .btn-action { background: var(--amber); }
    .cow-card .btn-action:hover { background: var(--amber-hover); }

    /* Form Container */
    .form-box {
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      border: 1px solid var(--border);
      overflow: hidden;
      margin-top: 20px;
    }
    .form-header {
      padding: 24px 30px;
      color: white;
    }
    .form-header.sheep-header { background: linear-gradient(135deg, #059669 0%, #0d9488 100%); }
    .form-header.cow-header { background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); }
    .form-header h2 { font-size: 22px; font-weight: 800; }
    .form-body { padding: 30px; }

    /* Steps */
    .form-section-title {
      font-size: 17px; font-weight: 700; color: #1c1917;
      margin: 24px 0 16px; padding-bottom: 8px;
      border-bottom: 2px solid #f5f5f4;
      display: flex; align-items: center; gap: 8px;
    }
    .form-group { margin-bottom: 18px; }
    .form-group label { display: block; font-size: 14px; font-weight: 700; color: #292524; margin-bottom: 6px; }
    .form-group .hint { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
    .form-group input, .form-group textarea, .form-group select {
      width: 100%; padding: 12px 16px; font-size: 14px;
      border-radius: 14px; border: 1px solid #d6d3d1;
      background: #fafaf9; font-family: inherit; color: #1c1917;
      transition: border 0.2s;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none; border-color: var(--primary); background: #ffffff;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
    }
    .btn-submit {
      width: 100%; padding: 16px; border-radius: 16px;
      font-size: 16px; font-weight: 800; color: white;
      border: none; cursor: pointer; transition: transform 0.1s;
      margin-top: 15px;
    }
    .btn-submit:hover { opacity: 0.95; transform: scale(1.01); }

    /* Modal */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(28, 25, 23, 0.6);
      backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center;
      padding: 16px; z-index: 999;
    }
    .modal-overlay.active { display: flex; }
    .modal-card {
      background: #fff; border-radius: 24px; max-width: 480px; width: 100%;
      padding: 30px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    /* Admin View */
    .admin-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .admin-badge { background: #fee2e2; color: #991b1b; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; }
    .survey-item-card {
      background: white; border-radius: 18px; padding: 20px; margin-bottom: 14px;
      border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .footer-admin-btn {
      position: fixed; bottom: 16px; right: 16px; z-index: 100;
      background: #ffffff; border: 1px solid #d6d3d1; color: var(--text-muted);
      padding: 8px 16px; border-radius: 9999px; font-size: 12px; font-weight: 700;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08); cursor: pointer; display: flex; align-items: center; gap: 6px;
    }
    .footer-admin-btn:hover { background: #f5f5f4; color: var(--text); }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">🌸 ĐỒNG CỎ XANH TƯƠI & ME NƯỚC BÌNH TỊNH 🌸</div>
      <h1>🌸 KHẢO SÁT THÔNG TIN & ĐỊNH HƯỚNG PHÁT TRIỂN 🌸</h1>
      <p class="subtitle">Lắng nghe tâm tình chân thành, đồng hành kiên định và nuôi dưỡng sự bình an trong mỗi bước đường.</p>
    </header>

    <!-- Meadow Illustration -->
    <div class="meadow-card">
      <div class="clouds">
        <span>☁️</span><span>☁️</span><span>☁️</span>
      </div>
      <div class="meadow-content">
        <div class="pasture-actor" onclick="alert('🌿 Người Chăn hiền lành luôn dõi theo và cầu thay cho đàn chiên.')">
          <span class="actor-emoji">🧑‍🌾</span>
          <span class="actor-name">Người Chăn</span>
        </div>
        <div class="pasture-actor" onclick="alert('🐑 Chiên con bình an gặm cỏ bên đồng cỏ xanh tươi.')">
          <span class="actor-emoji">🐑</span>
          <span class="actor-name">Cừu Thơ Ngây</span>
        </div>
        <div class="pasture-actor" onclick="alert('🐄 Chú Bò cần cù, trung tín phục vụ và đồng hành.')">
          <span class="actor-emoji">🐄</span>
          <span class="actor-name">Bò Cần Mẫn</span>
        </div>
      </div>
    </div>

    <!-- Home: 2 Choice Buttons -->
    <div id="viewHome">
      <div class="selection-grid">
        <!-- Cừu -->
        <div class="select-card sheep-card" onclick="openSurvey('sheep')">
          <div>
            <div style="font-size: 36px;">🐑</div>
            <div class="card-title">1. KHẢO SÁT CỪU</div>
            <div style="font-size: 13px; font-weight: 700; color: #059669;">(Dành cho Anh / Chị / Em)</div>
            <p class="card-desc">Dành cho anh/chị/em giãi bày tâm sự, những điều trăn trở, khó khăn cần người đồng hành lắng nghe và hỗ trợ.</p>
          </div>
          <button class="btn-action">Bắt đầu Khảo Sát Cừu →</button>
        </div>

        <!-- Bò -->
        <div class="select-card cow-card" onclick="openSurvey('cow')">
          <div>
            <div style="font-size: 36px;">🐄</div>
            <div class="card-title">2. KHẢO SÁT BÒ</div>
            <div style="font-size: 13px; font-weight: 700; color: #d97706;">(Dành cho Người Giúp Việc)</div>
            <p class="card-desc">Dành cho quý anh/chị/em đang chăm sóc, phụng sự bầy chiên. Lắng nghe trăn trở và tiếp thêm sức mạnh trên hành trình.</p>
          </div>
          <button class="btn-action">Bắt đầu Khảo Sát Bò →</button>
        </div>
      </div>
    </div>

    <!-- Survey Form View -->
    <div id="viewSurvey" style="display: none;">
      <div style="margin-bottom: 16px;">
        <button onclick="goHome()" style="background: white; border: 1px solid #d6d3d1; padding: 8px 16px; border-radius: 12px; cursor: pointer; font-weight: 700;">← Quay lại chọn loại khảo sát</button>
      </div>

      <div class="form-box">
        <div id="surveyHeader" class="form-header sheep-header">
          <h2 id="surveyTitle">BẢN KHẢO SÁT CỪU (Anh/Chị/Em)</h2>
          <p style="font-size: 13px; opacity: 0.9; margin-top: 4px;">Thông tin được bảo mật và chỉ dùng để thấu hiểu và chăm sóc chu đáo hơn.</p>
        </div>

        <form id="mainSurveyForm" class="form-body" onsubmit="handleFormSubmit(event)">
          <!-- PHẦN A -->
          <div class="form-section-title">👤 PHẦN A: THÔNG TIN CÁ NHÂN (Câu 1 - 7)</div>
          <div class="form-group">
            <label>1. Họ và tên đầy đủ *</label>
            <input type="text" id="f_fullName" required placeholder="Nguyễn Văn A">
          </div>
          <div class="form-group">
            <label>2. Biệt danh / Tên anh/chị/em muốn được gọi</label>
            <input type="text" id="f_nickname" placeholder="Tên thân mật...">
          </div>
          <div class="form-group">
            <label>3. Ngày tháng năm sinh (DD/MM/YYYY)</label>
            <input type="text" id="f_birthDate" placeholder="15/08/1998">
          </div>
          <div class="form-group">
            <label>4. Địa chỉ hiện tại</label>
            <input type="text" id="f_address" placeholder="Quận/Huyện, Tỉnh/Thành phố">
          </div>
          <div class="form-group">
            <label>5. Số điện thoại liên hệ *</label>
            <input type="tel" id="f_phone" required placeholder="0901234567">
          </div>
          <div class="form-group">
            <label>6. Nơi đang làm việc hoặc học tập</label>
            <input type="text" id="f_workplace" placeholder="Tên công ty / trường học">
          </div>
          <div class="form-group">
            <label>7. Công việc / Vị trí hiện tại</label>
            <input type="text" id="f_position" placeholder="Vị trí đảm nhận">
          </div>

          <!-- PHẦN B -->
          <div class="form-section-title">📖 PHẦN B: THÔNG TIN ĐỨC TIN & QUAN HỆ CHĂM SÓC (Câu 8 - 14)</div>
          <div class="form-group">
            <label>8. Vai trò hiện tại (trên Edu LMS)</label>
            <input type="text" id="f_lmsRole" placeholder="Học viên, Trợ giảng...">
          </div>
          <div class="form-group">
            <label id="lbl_careRelation">9. Hiện tại AI đang chăm sóc, đồng hành cùng anh/chị/em?</label>
            <input type="text" id="f_careRelation" placeholder="Tên người đồng hành...">
          </div>
          <div class="form-group">
            <label>10. Anh/chị/em đã hoàn thành 70 bài học chưa? (Lần thứ mấy?)</label>
            <input type="text" id="f_completed70Lessons" placeholder="Ví dụ: Đã xong lần 1, đang học bài 30...">
          </div>
          <div class="form-group">
            <label>11. Anh/chị/em đã hoàn thành Sách Cha chưa?</label>
            <input type="text" id="f_completedFatherBook" placeholder="Chưa đọc / Đang đọc / Đã hoàn thành...">
          </div>
          <div class="form-group">
            <label>12. Anh/chị/em đã đọc hết Sách Tập Giảng Đạo chưa?</label>
            <input type="text" id="f_completedPreachBook" placeholder="Chưa đọc / Đang đọc / Đã hoàn thành...">
          </div>
          <div class="form-group">
            <label>13. Số lượng kết trái trong năm nay</label>
            <input type="text" id="f_fruitsCount" placeholder="Số lượng hoặc tình hình thực tế...">
          </div>
          <div class="form-group">
            <label>14. Định hướng và kế hoạch cụ thể của anh/chị/em trong 6 tháng gần nhất</label>
            <textarea rows="3" id="f_sixMonthPlan" placeholder="Kế hoạch học tập, phục vụ..."></textarea>
          </div>

          <!-- PHẦN C -->
          <div class="form-section-title">🌱 PHẦN C: ĐỊNH HƯỚNG PHÁT TRIỂN & CHIA SẺ (Câu 15 - 19)</div>
          <div class="form-group">
            <label>15. Những điều hoặc hành vi mà anh/chị/em cảm thấy không thoải mái / không chấp nhận</label>
            <textarea rows="3" id="f_uncomfortableThings" placeholder="Để người đồng hành biết cách giữ ranh giới tôn trọng..."></textarea>
          </div>
          <div class="form-group">
            <label>16. Những khó khăn gặp phải trong 2 năm gần đây mà chưa thể giải quyết</label>
            <textarea rows="3" id="f_twoYearDifficulties" placeholder="Về công việc, sức khỏe, tâm lý, gia đình..."></textarea>
          </div>
          <div class="form-group">
            <label>17. Những kết quả / thành tựu cảm thấy vui và ghi nhận được tính đến nay</label>
            <textarea rows="3" id="f_joyfulAchievements" placeholder="Những sự tiến bộ hoặc niềm vui nhận được..."></textarea>
          </div>
          <div class="form-group">
            <label>18. Lời khen hoặc nhận xét đáng yêu mà người khác hay dành cho anh/chị/em</label>
            <input type="text" id="f_lovelyCompliments" placeholder="Ví dụ: Hiền lành, nhiệt tình, biết lắng nghe...">
          </div>
          <div class="form-group">
            <label>19. Mong đợi lớn nhất cho chặng đường / năm tiếp theo</label>
            <textarea rows="3" id="f_nextYearExpectations" placeholder="Mong ước cho bản thân và sự hỗ trợ mong muốn..."></textarea>
          </div>

          <button type="submit" id="submitBtn" class="btn-submit" style="background: var(--primary);">
            🌸 GỬI KHẢO SÁT 🌸
          </button>
        </form>
      </div>
    </div>

    <!-- Admin Dashboard View -->
    <div id="viewAdmin" style="display: none; margin-top: 20px;">
      <div class="admin-nav">
        <div>
          <h2>BẢNG QUẢN TRỊ NGƯỜI CHĂN</h2>
          <span class="admin-badge">Khu vực bảo mật</span>
        </div>
        <button onclick="goHome()" style="background: white; border: 1px solid #d6d3d1; padding: 6px 14px; border-radius: 12px; cursor: pointer; font-weight: 700;">Thoát</button>
      </div>
      <div id="adminList"></div>
    </div>
  </div>

  <!-- Thank You Modal -->
  <div id="thankYouModal" class="modal-overlay">
    <div class="modal-card">
      <div style="font-size: 54px; margin-bottom: 12px;">🕊️</div>
      <h3 style="font-size: 22px; font-weight: 800; color: #065f46; margin-bottom: 10px;">Cảm Ơn Anh/Chị/Em!</h3>
      <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">Tâm tư và thông tin của anh/chị/em đã được lưu giữ cẩn trọng. Nguyện chúc anh/chị/em luôn nhận được sự bình an, vui tươi và hoa trái thơm lành bên đồng cỏ.</p>
      <button onclick="closeThankYou()" class="btn-action" style="background: var(--primary); margin-top: 20px;">Hoàn tất & Về trang chủ</button>
    </div>
  </div>

  <!-- Admin Login Modal -->
  <div id="loginModal" class="modal-overlay">
    <div class="modal-card">
      <div style="font-size: 40px; margin-bottom: 8px;">🔒</div>
      <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 6px;">Đăng Nhập Người Chăn</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Vui lòng nhập mật khẩu bảo mật (Mặc định: 123456)</p>
      <input type="password" id="adminPwdInput" placeholder="Nhập mật khẩu..." style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #d6d3d1; margin-bottom: 16px; font-size: 14px;">
      <div style="display: flex; gap: 10px;">
        <button onclick="closeLoginModal()" style="flex: 1; padding: 10px; border-radius: 12px; border: 1px solid #d6d3d1; background: #fafaf9; cursor: pointer;">Hủy</button>
        <button onclick="verifyAdminPassword()" style="flex: 1; padding: 10px; border-radius: 12px; background: var(--primary); color: white; border: none; font-weight: 700; cursor: pointer;">Đăng nhập</button>
      </div>
    </div>
  </div>

  <!-- Footer Admin Trigger Button -->
  <button class="footer-admin-btn" onclick="openLoginModal()">
    <span>🌿</span>
    <span>ADMIN / NGƯỜI CHĂN</span>
  </button>

  <script>
    let currentSurveyType = 'sheep';

    function openSurvey(type) {
      currentSurveyType = type;
      document.getElementById('viewHome').style.display = 'none';
      document.getElementById('viewAdmin').style.display = 'none';
      document.getElementById('viewSurvey').style.display = 'block';

      const isSheep = type === 'sheep';
      const header = document.getElementById('surveyHeader');
      const title = document.getElementById('surveyTitle');
      const careLabel = document.getElementById('lbl_careRelation');
      const submitBtn = document.getElementById('submitBtn');

      if (isSheep) {
        header.className = 'form-header sheep-header';
        title.innerText = '🐑 BẢN KHẢO SÁT CỪU (Anh / Chị / Em)';
        careLabel.innerText = '9. Hiện tại AI đang chăm sóc, đồng hành cùng anh/chị/em?';
        submitBtn.style.background = '#059669';
      } else {
        header.className = 'form-header cow-header';
        title.innerText = '🐄 BẢN KHẢO SÁT BÒ (Người Giúp Việc)';
        careLabel.innerText = '9. Hiện tại anh/chị/em đang chăm sóc, đồng hành cùng NHỮNG AI?';
        submitBtn.style.background = '#d97706';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function goHome() {
      document.getElementById('viewSurvey').style.display = 'none';
      document.getElementById('viewAdmin').style.display = 'none';
      document.getElementById('viewHome').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleFormSubmit(e) {
      e.preventDefault();
      const survey = {
        id: 'sv_' + Date.now(),
        surveyType: currentSurveyType,
        submittedAt: new Date().toISOString(),
        fullName: document.getElementById('f_fullName').value,
        nickname: document.getElementById('f_nickname').value,
        birthDate: document.getElementById('f_birthDate').value,
        address: document.getElementById('f_address').value,
        phone: document.getElementById('f_phone').value,
        workplace: document.getElementById('f_workplace').value,
        position: document.getElementById('f_position').value,
        lmsRole: document.getElementById('f_lmsRole').value,
        careRelation: document.getElementById('f_careRelation').value,
        completed70Lessons: document.getElementById('f_completed70Lessons').value,
        completedFatherBook: document.getElementById('f_completedFatherBook').value,
        completedPreachBook: document.getElementById('f_completedPreachBook').value,
        fruitsCount: document.getElementById('f_fruitsCount').value,
        sixMonthPlan: document.getElementById('f_sixMonthPlan').value,
        uncomfortableThings: document.getElementById('f_uncomfortableThings').value,
        twoYearDifficulties: document.getElementById('f_twoYearDifficulties').value,
        joyfulAchievements: document.getElementById('f_joyfulAchievements').value,
        lovelyCompliments: document.getElementById('f_lovelyCompliments').value,
        nextYearExpectations: document.getElementById('f_nextYearExpectations').value
      };

      // Save locally
      const list = JSON.parse(localStorage.getItem('standalone_surveys') || '[]');
      list.unshift(survey);
      localStorage.setItem('standalone_surveys', JSON.stringify(list));

      // Show Thank You modal
      document.getElementById('mainSurveyForm').reset();
      document.getElementById('thankYouModal').classList.add('active');
    }

    function closeThankYou() {
      document.getElementById('thankYouModal').classList.remove('active');
      goHome();
    }

    function openLoginModal() {
      document.getElementById('loginModal').classList.add('active');
    }

    function closeLoginModal() {
      document.getElementById('loginModal').classList.remove('active');
    }

    function verifyAdminPassword() {
      const pwd = document.getElementById('adminPwdInput').value;
      if (pwd === '123456') {
        closeLoginModal();
        renderAdminDashboard();
      } else {
        alert('Mật khẩu không chính xác! (Mặc định: 123456)');
      }
    }

    function renderAdminDashboard() {
      document.getElementById('viewHome').style.display = 'none';
      document.getElementById('viewSurvey').style.display = 'none';
      document.getElementById('viewAdmin').style.display = 'block';

      const list = JSON.parse(localStorage.getItem('standalone_surveys') || '[]');
      const container = document.getElementById('adminList');

      if (list.length === 0) {
        container.innerHTML = '<div style="background:white; padding:30px; border-radius:18px; text-align:center; color:#78716c;">Chưa có bản khảo sát nào được gửi.</div>';
        return;
      }

      container.innerHTML = list.map(item => \`
        <div class="survey-item-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="font-size:16px;">\${item.surveyType === 'sheep' ? '🐑 Cừu' : '🐄 Bò'}: \${item.fullName} (\${item.nickname || 'Không có'})</strong>
            <span style="font-size:12px; color:#78716c;">\${new Date(item.submittedAt).toLocaleString('vi-VN')}</span>
          </div>
          <div style="font-size:13px; color:#57534e; margin-bottom:6px;">
            📞 SĐT: \${item.phone} | 📍 Địa chỉ: \${item.address || 'N/A'} | 💼 Công việc: \${item.position || 'N/A'}
          </div>
          <div style="font-size:13px; color:#1c1917; background:#f5f5f4; padding:10px; border-radius:10px; margin-top:8px;">
            <strong>Mối quan hệ:</strong> \${item.careRelation || 'Chưa điền'}<br>
            <strong>Khó khăn 2 năm:</strong> \${item.twoYearDifficulties || 'Không có'}<br>
            <strong>Mong đợi lớn nhất:</strong> \${item.nextYearExpectations || 'Không có'}
          </div>
        </div>
      \`).join('');
    }
  </script>
</body>
</html>`;
}
