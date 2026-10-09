import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456';

app.use(express.json({ limit: '10mb' }));

// Ensure data folder exists
const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dataFile = path.join(dataDir, 'surveys.json');

interface SurveyData {
  id: string;
  surveyType: 'sheep' | 'cow'; // sheep: Cừu (Anh/Chị/Em), cow: Bò (Người Giúp Việc)
  submittedAt: string;
  fullName: string;
  nickname: string;
  birthDate: string;
  address: string;
  phone: string;
  workplace: string;
  position: string;
  lmsRole: string;
  careRelation: string; // sheep: "Ai đang chăm sóc?", cow: "Đang chăm sóc những ai?"
  completed70Lessons: string;
  completedFatherBook: string;
  completedPreachBook: string;
  fruitsCount: string;
  sixMonthPlan: string;
  uncomfortableThings: string;
  twoYearDifficulties: string;
  joyfulAchievements: string;
  lovelyCompliments: string;
  nextYearExpectations: string;
  aiAnalysis?: {
    overview: string;
    personalityStrengths: string[];
    hiddenChallenges: string[];
    communicationTips: string[];
    actionPlan: string[];
    shepherdAdvice: string;
    analyzedAt: string;
  };
  adminNotes?: string;
}

function loadSurveys(): SurveyData[] {
  try {
    if (fs.existsSync(dataFile)) {
      const content = fs.readFileSync(dataFile, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error loading surveys:', err);
  }
  return [];
}

function saveSurveys(surveys: SurveyData[]) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(surveys, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving surveys:', err);
  }
}

// In-memory cache synced with file
let cachedSurveys: SurveyData[] = loadSurveys();

// Helper to analyze survey using Gemini
async function analyzeSurveyWithGemini(survey: SurveyData) {
  const apiKey = process.env.GEMINI_API_KEY;
  const isCow = survey.surveyType === 'cow';
  const roleTitle = isCow ? 'BÒ (Người Giúp Việc / Người Chăm Sóc)' : 'CỪU (Anh/Chị/Em)';

  const prompt = `
Bạn là một Chuyên Gia Khai Vấn Tâm Lý & Cố Vấn Đồng Hành Trưởng Thành Đức Tin Cơ Đốc sâu sắc, nhân từ và tinh tế.
Dưới đây là bản khảo sát thực tế của một thành viên:

--- THÔNG TIN KHẢO SÁT ---
- Phân loại: ${roleTitle}
- Họ và tên: ${survey.fullName}
- Biệt danh muốn gọi: ${survey.nickname || 'Không có'}
- Ngày sinh: ${survey.birthDate || 'Chưa cung cấp'}
- Địa chỉ: ${survey.address || 'Chưa cung cấp'}
- Số điện thoại: ${survey.phone || 'Chưa cung cấp'}
- Nơi học tập/làm việc: ${survey.workplace || 'Chưa cung cấp'}
- Vị trí/Công việc: ${survey.position || 'Chưa cung cấp'}
- Vai trò trên Edu LMS: ${survey.lmsRole || 'Chưa cung cấp'}
- ${isCow ? 'Những ai đang được thành viên này chăm sóc/đồng hành' : 'Người đang chăm sóc/đồng hành cùng thành viên'}: ${survey.careRelation || 'Chưa cung cấp'}
- Tình trạng 70 bài học: ${survey.completed70Lessons || 'Chưa cung cấp'}
- Sách Cha: ${survey.completedFatherBook || 'Chưa cung cấp'}
- Sách Tập Giảng Đạo: ${survey.completedPreachBook || 'Chưa cung cấp'}
- Số lượng kết trái trong năm nay: ${survey.fruitsCount || 'Chưa cung cấp'}
- Kế hoạch & định hướng 6 tháng tới: ${survey.sixMonthPlan || 'Chưa cung cấp'}
- Những điều/hành vi không thoải mái, không chấp nhận: ${survey.uncomfortableThings || 'Chưa có'}
- Khó khăn 2 năm gần đây chưa thể giải quyết: ${survey.twoYearDifficulties || 'Chưa có'}
- Kết quả / Thành tựu vui mừng ghi nhận được: ${survey.joyfulAchievements || 'Chưa có'}
- Lời khen / Nhận xét đáng yêu hay nhận được: ${survey.lovelyCompliments || 'Chưa có'}
- Mong đợi lớn nhất cho năm / chặng đường tiếp theo: ${survey.nextYearExpectations || 'Chưa có'}

--- YÊU CẦU PHÂN TÍCH (DÀNH RIÊNG CHO NGƯỜI CHĂN / ADMIN) ---
Hãy phân tích thấu đáo, chuẩn mực, ấm áp, nhân ái và thấu thị về tâm lý để giúp Người Chăn hiểu rõ lòng thành viên này.
Trả về định dạng JSON thuần túy (không bọc trong markdown code block, hoặc JSON hợp lệ) với cấu trúc sau:
{
  "overview": "Tổng quan chân dung, phong thái và trạng thái cảm xúc, tâm linh hiện tại của anh/chị/em này (khoảng 3-4 câu sâu sắc, tinh tế)",
  "personalityStrengths": [
    "Điểm mạnh 1",
    "Điểm mạnh 2",
    "Điểm mạnh 3",
    "Điểm mạnh 4"
  ],
  "hiddenChallenges": [
    "Khó khăn/nỗi lòng 1 (tâm lý, hoàn cảnh hoặc nội tâm)",
    "Khó khăn/nỗi lòng 2",
    "Khó khăn/nỗi lòng 3"
  ],
  "communicationTips": [
    "Gợi ý 1: Cách Người Chăn nên mở lời hoặc tiếp cận",
    "Gợi ý 2: Những ranh giới hoặc điều cần tránh né để tôn trọng cảm xúc",
    "Gợi ý 3: Chủ đề trò chuyện để chạm tới trái tim"
  ],
  "actionPlan": [
    "Bước 1 trong định hướng chăm sóc 1-3 tháng tới",
    "Bước 2 trong bồi dưỡng và đồng hành",
    "Bước 3 trong hỗ trợ kế hoạch phát triển"
  ],
  "shepherdAdvice": "Lời gửi gắm tâm tình đặc biệt dành riêng cho Người Chăn khi hướng dẫn thành viên này (ấm áp, thấu cảm, đầy tình yêu thương)"
}
`;

  if (!apiKey) {
    // Generate intelligent heuristic fallback if API key is not present
    return {
      overview: `Thành viên ${survey.fullName} (${survey.nickname || 'Anh/Chị/Em'}) thể hiện tinh thần chân thành, khao khát kết nối và phát triển trong vai trò ${roleTitle}. Nội tâm có sự nhạy cảm, trân trọng những giá trị đạo đức và mối quan hệ bền vững.`,
      personalityStrengths: [
        survey.lovelyCompliments ? `Được mọi người quý mến nhờ: ${survey.lovelyCompliments}` : 'Có tinh thần cầu tiến và ý chí vượt khó',
        survey.joyfulAchievements ? `Có trải nghiệm tích cực qua: ${survey.joyfulAchievements}` : 'Tận tụy và trung tín trong công việc',
        'Có mục tiêu phấn đấu rõ ràng cho chặng đường tiếp theo',
        'Sẵn lòng mở lòng chia sẻ những điều khó khăn thực tế'
      ],
      hiddenChallenges: [
        survey.twoYearDifficulties ? `Trăn trở lớn: ${survey.twoYearDifficulties}` : 'Áp lực cân bằng giữa công việc và đời sống tinh thần',
        survey.uncomfortableThings ? `Nhạy cảm với môi trường: ${survey.uncomfortableThings}` : 'Cần thêm sự lắng nghe và thấu cảm không phán xét'
      ],
      communicationTips: [
        'Trò chuyện nhẹ nhàng nơi yên tĩnh, hỏi thăm bằng sự quan tâm chân thật',
        'Lắng nghe trọn vẹn trước khi đưa ra lời khuyên',
        'Tôn trọng những điều anh/chị/em cảm thấy chưa thoải mái'
      ],
      actionPlan: [
        'Sắp xếp một buổi cà phê ấm áp 1-1 trong tuần đầu tiên',
        `Đồng hành cùng kế hoạch 6 tháng: ${survey.sixMonthPlan || 'Xây dựng thói quen đều đặn'}`,
        'Tạo cơ hội để thành viên phát huy thế mạnh và kết trái vui mừng'
      ],
      shepherdAdvice: `Hãy ôm trọn tấm lòng của ${survey.nickname || survey.fullName} bằng sự bao dung và kiên nhẫn. Sự hiện diện ấm áp của Người Chăn sẽ là điểm tựa bình an nhất.`,
      analyzedAt: new Date().toISOString()
    };
  }

  try {
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    const cleanText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(cleanText);

    return {
      overview: parsed.overview || 'Chưa có phân tích tổng quan.',
      personalityStrengths: Array.isArray(parsed.personalityStrengths) ? parsed.personalityStrengths : [],
      hiddenChallenges: Array.isArray(parsed.hiddenChallenges) ? parsed.hiddenChallenges : [],
      communicationTips: Array.isArray(parsed.communicationTips) ? parsed.communicationTips : [],
      actionPlan: Array.isArray(parsed.actionPlan) ? parsed.actionPlan : [],
      shepherdAdvice: parsed.shepherdAdvice || 'Hãy giữ sự ân cần và đồng hành cùng thành viên.',
      analyzedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return {
      overview: `Bản khảo sát của ${survey.fullName} đã được ghi nhận. Hệ thống nhận thấy thành viên có mong muốn sâu sắc trong việc hoàn thiện bản thân và gắn kết đồng cỏ.`,
      personalityStrengths: [
        'Sự trung thực và cởi mở khi chia sẻ khảo sát',
        survey.joyfulAchievements || 'Nỗ lực kiên trì qua các giai đoạn'
      ],
      hiddenChallenges: [
        survey.twoYearDifficulties || 'Những khó khăn chưa giải quyết trong đời sống',
        survey.uncomfortableThings || 'Cần môi trường giao tiếp thấu cảm và an toàn'
      ],
      communicationTips: [
        'Lắng nghe không định kiến',
        'Động viên và khích lệ các điểm tích cực'
      ],
      actionPlan: [
        'Lên lịch gặp gỡ chia sẻ định kỳ',
        'Hỗ trợ giải quyết từng vướng mắc cụ thể'
      ],
      shepherdAdvice: 'Hãy kiên nhẫn đồng hành như người chăn hiền lành dẫn bầy cừu bên đồng cỏ xanh tươi.',
      analyzedAt: new Date().toISOString()
    };
  }
}

// API Endpoints
// 1. Submit survey
app.post('/api/surveys', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.fullName || !body.surveyType) {
      return res.status(400).json({ error: 'Họ tên và loại khảo sát là bắt buộc.' });
    }

    const newSurvey: SurveyData = {
      id: 'sv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      surveyType: body.surveyType,
      submittedAt: new Date().toISOString(),
      fullName: body.fullName.trim(),
      nickname: body.nickname?.trim() || '',
      birthDate: body.birthDate || '',
      address: body.address || '',
      phone: body.phone || '',
      workplace: body.workplace || '',
      position: body.position || '',
      lmsRole: body.lmsRole || '',
      careRelation: body.careRelation || '',
      completed70Lessons: body.completed70Lessons || '',
      completedFatherBook: body.completedFatherBook || '',
      completedPreachBook: body.completedPreachBook || '',
      fruitsCount: body.fruitsCount || '0',
      sixMonthPlan: body.sixMonthPlan || '',
      uncomfortableThings: body.uncomfortableThings || '',
      twoYearDifficulties: body.twoYearDifficulties || '',
      joyfulAchievements: body.joyfulAchievements || '',
      lovelyCompliments: body.lovelyCompliments || '',
      nextYearExpectations: body.nextYearExpectations || '',
    };

    // Analyze asynchronously or synchronously
    try {
      newSurvey.aiAnalysis = await analyzeSurveyWithGemini(newSurvey);
    } catch (err) {
      console.error('Analysis failed during submit:', err);
    }

    cachedSurveys.unshift(newSurvey);
    saveSurveys(cachedSurveys);

    // Notice: Do NOT return aiAnalysis to user!
    return res.status(200).json({
      success: true,
      id: newSurvey.id,
      message: 'Khảo sát đã được gửi thành công. Cảm ơn anh/chị/em!'
    });
  } catch (error) {
    console.error('Error saving survey:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi lưu khảo sát.' });
  }
});

// 2. Admin login verification
app.post('/api/admin/verify', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: 'token_' + Date.now() });
  }
  return res.status(401).json({ success: false, error: 'Mật khẩu Người Chăn không chính xác.' });
});

// 3. Get all surveys (Admin only)
app.get('/api/surveys', (req: Request, res: Response) => {
  // Check auth header
  const authHeader = req.headers.authorization;
  if (!authHeader && req.query.key !== ADMIN_PASSWORD) {
    // Return unauthorized
    return res.status(401).json({ error: 'Yêu cầu quyền Người Chăn (Admin).' });
  }
  return res.json(cachedSurveys);
});

// 4. Trigger re-analysis with Gemini
app.post('/api/surveys/:id/reanalyze', async (req: Request, res: Response) => {
  const { id } = req.params;
  const survey = cachedSurveys.find((s) => s.id === id);
  if (!survey) {
    return res.status(404).json({ error: 'Không tìm thấy bản khảo sát.' });
  }

  const analysis = await analyzeSurveyWithGemini(survey);
  survey.aiAnalysis = analysis;
  saveSurveys(cachedSurveys);

  return res.json({ success: true, aiAnalysis: analysis });
});

// 5. Update admin notes
app.post('/api/surveys/:id/note', (req: Request, res: Response) => {
  const { id } = req.params;
  const { note } = req.body;
  const survey = cachedSurveys.find((s) => s.id === id);
  if (!survey) {
    return res.status(404).json({ error: 'Không tìm thấy bản khảo sát.' });
  }

  survey.adminNotes = note;
  saveSurveys(cachedSurveys);
  return res.json({ success: true, survey });
});

// 6. Delete survey
app.delete('/api/surveys/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  cachedSurveys = cachedSurveys.filter((s) => s.id !== id);
  saveSurveys(cachedSurveys);
  return res.json({ success: true });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
