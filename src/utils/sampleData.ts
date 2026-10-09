import { SurveyData } from '../types/survey';

export const INITIAL_SAMPLE_SURVEYS: SurveyData[] = [
  {
    id: 'sample_sheep_01',
    surveyType: 'sheep',
    submittedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    fullName: 'Nguyễn Thảo Nguyên',
    nickname: 'Nguyên An Yên',
    birthDate: '1998-05-14',
    address: 'Quận 7, TP. Hồ Chí Minh',
    phone: '0908123456',
    workplace: 'Công ty Cổ phần Thiết kế & Truyền thông Sáng Tạo',
    position: 'Chuyên viên Thiết kế Đồ họa (UI/UX Designer)',
    lmsRole: 'Học viên tích cực (Lớp Tăng Trưởng)',
    careRelation: 'Chị Mai Linh & Anh Minh Trí',
    completed70Lessons: 'Đã hoàn thành lần 1 (đang ôn lại lần 2)',
    completedFatherBook: 'Đã hoàn thành',
    completedPreachBook: 'Đang đọc (khoảng 60%)',
    fruitsCount: '3 linh hồn kết trái',
    sixMonthPlan: 'Mỗi tuần dành ít nhất 2 buổi tối thăm viếng các bạn mới, hoàn thành sách Tập Giảng Đạo và rèn luyện kỹ năng truyền tải sứ điệp gãy gọn.',
    uncomfortableThings: 'Cảm thấy áp lực và tổn thương khi có những lời so sánh thành quả giữa các thành viên, hoặc sự hối thúc thiếu thấu hiểu về hoàn cảnh bận rộn trong công việc chuyên môn.',
    twoYearDifficulties: 'Đôi lúc rơi vào trạng thái kiệt sức (burnout) do phải cân bằng giữa deadline công ty và các lịch sinh hoạt, cảm thấy bản thân chưa đủ xứng đáng khi kết quả chưa như kỳ vọng.',
    joyfulAchievements: 'Đã hướng dẫn và đồng hành cùng 2 bạn đồng nghiệp tiếp nhận đức tin, chứng kiến các bạn thay đổi tích cực và nở nụ cười rạng rỡ.',
    lovelyCompliments: 'Mọi người hay nói Nguyên có ánh mắt hiền hòa, lắng nghe rất kiên nhẫn và luôn mang lại cảm giác ấm áp như nắng sớm.',
    nextYearExpectations: 'Mong muốn có một người bạn đồng hành sâu sắc hơn để giãi bày những bế tắc nội tâm, và mong được Người Chăn định hướng xây dựng tính cách vững vàng trước thử thách.',
    aiAnalysis: {
      overview: 'Thảo Nguyên là một tâm hồn nghệ sĩ đầy nhạy cảm, sâu sắc và tận tâm. Em có khao khát dâng hiến mãnh liệt nhưng rất dễ tự trách mình khi gặp áp lực ngoại cảnh hoặc khi cảm thấy bản thân chưa đạt sự hoàn hảo.',
      personalityStrengths: [
        'Khả năng thấu cảm và lắng nghe sâu sắc, tạo cảm giác an tâm tuyệt đối cho người đối diện',
        'Tư duy thẩm mỹ và sự chu toàn trong công việc lẫn việc phục vụ',
        'Lòng trung tín, chân thành và tinh thần tự giác cao'
      ],
      hiddenChallenges: [
        'Hội chứng kẻ giả mạo (Imposter syndrome) và nỗi sợ bị phán xét khi đuối sức',
        'Ngại từ chối dẫn đến quá tải cả thể chất lẫn tinh thần',
        'Nhạy cảm với sự so sánh thành tích trong môi trường tập thể'
      ],
      communicationTips: [
        'Bắt đầu buổi trò chuyện bằng sự công nhận và ghi nhận công khó chân thành trước khi bàn đến mục tiêu',
        'Tạo không gian ấm áp, riêng tư để em cảm thấy an toàn tuyệt đối khi giãi bày sự yếu đuối',
        'Tránh dùng từ ngữ thúc ép hay so sánh với bất kỳ ai khác'
      ],
      actionPlan: [
        'Gặp gỡ 1-1 thư thái mỗi 2 tuần để giải tỏa áp lực và lắng nghe nhịp thở tâm hồn',
        'Hướng dẫn em thiết lập ranh giới lành mạnh (Healthy boundaries) giữa công việc và sinh hoạt',
        'Giao phó các vai trò sáng tạo/chăm sóc tinh tế phù hợp với tố chất lắng nghe và mỹ thuật'
      ],
      shepherdAdvice: 'Đừng đo lường Thảo Nguyên bằng số lượng công việc, hãy tưới mát lòng em bằng tình yêu thương không điều kiện. Khi tâm hồn được an nghỉ, hoa trái của em sẽ tự nhiên nảy nở thơm ngát.',
      analyzedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
    },
    adminNotes: 'Đã gọi điện hỏi thăm nhẹ nhàng cuối tuần trước. Nguyên cảm thấy xúc động và nhẹ nhõm hơn nhiều.'
  },
  {
    id: 'sample_cow_02',
    surveyType: 'cow',
    submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    fullName: 'Trần Văn Hoàng',
    nickname: 'Hoàng Tâm Giao',
    birthDate: '1992-11-20',
    address: 'Bình Thạnh, TP. Hồ Chí Minh',
    phone: '0912345678',
    workplace: 'Tập đoàn Công nghệ Phần mềm',
    position: 'Trưởng nhóm Kỹ thuật (Tech Lead)',
    lmsRole: 'Người hướng dẫn & Phục vụ (Mentor LMS)',
    careRelation: 'Đang trực tiếp đồng hành cùng 5 anh em: Tuấn, Dũng, Quốc, Huy, và Thành Đạt',
    completed70Lessons: 'Đã hoàn thành lần thứ 3 (thường xuyên ôn luyện)',
    completedFatherBook: 'Đã hoàn thành',
    completedPreachBook: 'Đã hoàn thành',
    fruitsCount: '7 linh hồn kết trái',
    sixMonthPlan: 'Xây dựng quy trình hướng dẫn cụ thể cho các anh em mới, đào tạo 2 người trong nhóm có thể đứng lớp chia sẻ 70 bài học độc lập, kết thêm trái mới vững vàng.',
    uncomfortableThings: 'Sự thiếu cam kết giờ giấc hoặc hứa hẹn mà không làm; việc giao tiếp thiếu thẳng thắn, che giấu vấn đề đến khi bùng nổ.',
    twoYearDifficulties: 'Thấy bế tắc khi một vài anh em trong nhóm chăm sóc chững lại, có dấu hiệu nguội lạnh nhưng bản thân chưa tìm ra cách khơi dậy ngọn lửa trong lòng các bạn.',
    joyfulAchievements: 'Nhóm nhỏ duy trì được buổi cầu nguyện đều đặn mỗi sáng Chủ Nhật; các anh em đã bắt đầu chủ động chăm sóc lẫn nhau thay vì chỉ trông cậy vào người phụ trách.',
    lovelyCompliments: 'Mọi người hay bảo Hoàng đáng tin cậy như một tảng đá vững chãi, nói ít làm nhiều, luôn xuất hiện khi người khác cần giúp đỡ.',
    nextYearExpectations: 'Mong muốn được Người Chăn chỉ dẫn thêm về phương pháp lãnh đạo tinh thần thấu cảm, cách xử lý khủng hoảng nội tâm cho đàn em một cách kiên nhẫn hơn.',
    aiAnalysis: {
      overview: 'Hoàng là một người phục vụ trụ cột kiên cường, có tinh thần trách nhiệm cực kỳ cao và năng lực tổ chức sắc sảo. Tuy nhiên, em có xu hướng gánh vác mọi trọng trách một mình và đôi khi quá nghiêm khắc với chính mình.',
      personalityStrengths: [
        'Năng lực lãnh đạo phụng sự (Servant Leadership) bền bỉ, uy tín vững chắc',
        'Tư duy logic, giải quyết vấn đề có phương pháp bài bản',
        'Tinh thần hy sinh và luôn nghĩ cho lợi ích của bầy chiên'
      ],
      hiddenChallenges: [
        'Dễ nản lòng thầm kín khi thấy người mình tận tâm chăm sóc không tiến bộ như kỳ vọng',
        'Áp lực làm gương mẫu mực khiến em khó bộc lộ sự yếu đuối hay mệt mỏi của bản thân',
        'Có xu hướng nhìn vấn đề qua lăng kính hiệu suất (task-oriented) hơn là cảm xúc (people-oriented)'
      ],
      communicationTips: [
        'Khẳng định và trân trọng những hy sinh thầm lặng của em trước tập thể',
        'Chủ động hỏi: "Gần đây em có đang mệt không? Em có cần một chỗ dựa không?" thay vì chỉ bàn về công việc nhóm',
        'Khích lệ em học cách trao quyền và kiên nhẫn với tốc độ trưởng thành của từng người'
      ],
      actionPlan: [
        'Cung cấp cho em các tài liệu/chuyên đề về "Khai vấn và Đồng cảm trong chăm sóc môn đồ"',
        'Thường xuyên có các buổi "Shepherd to Shepherd" để sưởi ấm tinh thần cho người gánh vác',
        'Giảm bớt gánh nặng hành chính để em tập trung vào bồi dưỡng hạt nhân nòng cốt'
      ],
      shepherdAdvice: 'Những người như Hoàng là phước hạnh lớn cho bầy, nhưng cũng là người dễ bị kiệt sức nhất vì không ai nghĩ họ đang đau. Hãy là người chăn chở che cho trái tim người giúp việc này.',
      analyzedAt: new Date(Date.now() - 3600000 * 18).toISOString()
    },
    adminNotes: 'Rất cần động viên Hoàng nghỉ ngơi thư giãn. Nhóm em hoạt động rất tốt nhưng bản thân em cần nạp lại năng lượng.'
  },
  {
    id: 'sample_sheep_03',
    surveyType: 'sheep',
    submittedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    fullName: 'Lê Diệu Linh',
    nickname: 'Linh Nhi',
    birthDate: '2001-03-22',
    address: 'Thủ Đức, TP. Hồ Chí Minh',
    phone: '0933557799',
    workplace: 'Đại học Khoa học Xã hội & Nhân văn',
    position: 'Sinh viên năm cuối ngành Ngôn ngữ học',
    lmsRole: 'Học viên mới',
    careRelation: 'Chị Bích Trâm',
    completed70Lessons: 'Đang học bài 18 (bắt đầu được 2 tháng)',
    completedFatherBook: 'Chưa đọc',
    completedPreachBook: 'Chưa đọc',
    fruitsCount: '0 (đang cầu nguyện cho bạn thân cùng phòng)',
    sixMonthPlan: 'Hoàn thành trọn vẹn 70 bài học lần 1, tham gia đầy đủ các buổi học Kinh Thánh nhóm nhỏ, tốt nghiệp đại học thuận lợi.',
    uncomfortableThings: 'Cảm thấy e ngại và sợ bị hỏi dồn dập trước đám đông khi bản thân chưa chuẩn bị kỹ bài học.',
    twoYearDifficulties: 'Mông lung về định hướng nghề nghiệp sau khi ra trường, áp lực tài chính tự lập và sự xa gia đình.',
    joyfulAchievements: 'Đã tập được thói quen cầu nguyện buổi sáng trước khi thức dậy đi học, cảm thấy lòng an vui hơn.',
    lovelyCompliments: 'Mọi người khen Linh lễ phép, chân thành và viết văn rất tình cảm.',
    nextYearExpectations: 'Mong được chị hướng dẫn kiên nhẫn giải thích các bài học sâu hơn, và tìm được công việc đầu đời bình an.',
    aiAnalysis: {
      overview: 'Diệu Linh là một cừu non thuần hậu, rụt rè nhưng có tấm lòng hướng thượng rất đẹp. Em đang ở bước ngoặt lớn của cuộc đời (tốt nghiệp ra trường) nên tâm lý có phần bấp bênh và cần sự nâng đỡ đầy tin cậy.',
      personalityStrengths: [
        'Tâm hồn trong sáng, khiêm nhường và ham học hỏi',
        'Khả năng diễn đạt cảm xúc tốt và sống chân thành',
        'Có lòng biết ơn và trân quý người đồng hành'
      ],
      hiddenChallenges: [
        'Nỗi lo âu về tương lai nghề nghiệp và gánh nặng tự lập',
        'Thiếu tự tin khi phát biểu trong tập thể đông người',
        'Dễ nản lòng nếu kiến thức bài học quá dồn dập'
      ],
      communicationTips: [
        'Trò chuyện theo nhịp độ chậm rãi, khuyến khích em đặt câu hỏi bất cứ lúc nào',
        'Gặp riêng 1-1 tại quán nước nhỏ ấm cúng hơn là họp nhóm lớn',
        'Khích lệ từng bước tiến nhỏ trong mỗi bài học 70 bài'
      ],
      actionPlan: [
        'Lên lịch học đều đặn 2 bài mỗi tuần cùng chị Bích Trâm',
        'Giới thiệu em với các anh chị đi trước trong ngành để hỗ trợ định hướng việc làm',
        'Tặng em cuốn Sách Cha và cùng đọc một vài chương đầu truyền cảm hứng'
      ],
      shepherdAdvice: 'Hãy ấp ủ chiên con này như người mẹ hiền ấp ủ con thơ. Sự kiên nhẫn và nụ cười dịu dàng của người chăn sẽ tháo gỡ mọi nỗi sợ trong lòng Linh.',
      analyzedAt: new Date(Date.now() - 3600000 * 8).toISOString()
    },
    adminNotes: 'Em rất ngoan và chăm chỉ. Cần hỗ trợ em tìm chỗ thực tập phù hợp.'
  },
  {
    id: 'sample_cow_04',
    surveyType: 'cow',
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    fullName: 'Đặng Quốc Bảo',
    nickname: 'Bảo Trung Tín',
    birthDate: '1995-08-09',
    address: 'Quận 3, TP. Hồ Chí Minh',
    phone: '0978999888',
    workplace: 'Ngân hàng Thương mại Cổ phần',
    position: 'Chuyên viên Phân tích Rủi ro Tín dụng',
    lmsRole: 'Trợ giảng & Quản lý khu vực',
    careRelation: 'Đang đồng hành cùng 3 anh em: Tuấn Anh, Minh Quân, và Đức Trí',
    completed70Lessons: 'Đã hoàn thành lần 2',
    completedFatherBook: 'Đang đọc (khoảng 80%)',
    completedPreachBook: 'Đã hoàn thành lần 1',
    fruitsCount: '4 linh hồn kết trái',
    sixMonthPlan: 'Hoàn thành đọc hết Sách Cha trong tháng này, huấn luyện Tuấn Anh có thể tự đồng hành cùng người mới, tăng cường thăm viếng gia đình các bạn.',
    uncomfortableThings: 'Việc hủy hẹn đột xuất không báo trước hoặc thái độ hời hợt khi đã nhận trách nhiệm.',
    twoYearDifficulties: 'Cân bằng thời gian biểu giữa ngành ngân hàng áp lực cao và các buổi phụng sự ban tối.',
    joyfulAchievements: 'Gia đình đã cởi mở hơn với đức tin của Bảo; bạn Minh Quân đã tái lập thói quen đọc Kinh Thánh đều đặn.',
    lovelyCompliments: 'Mọi người nhận xét Bảo chu đáo, đúng giờ và luôn giữ lời hứa.',
    nextYearExpectations: 'Mong muốn được tham gia các khóa đào tạo nâng cao kỹ năng truyền giảng và quản lý nhóm mục vụ hiệu quả.',
    aiAnalysis: {
      overview: 'Quốc Bảo là người giúp việc trung thành, có tính kỷ luật cao, tư duy cẩn trọng và chuẩn mực. Em rất đáng tin cậy trong các công tác tổ chức và quản trị nhóm nhỏ.',
      personalityStrengths: [
        'Kỷ luật cá nhân xuất sắc và uy tín về giờ giấc, cam kết',
        'Khả năng quản lý rủi ro và nhận diện vấn đề của thành viên nhạy bén',
        'Tấm lòng trung kiên và tận tụy'
      ],
      hiddenChallenges: [
        'Áp lực công việc ngân hàng cao dễ gây căng thẳng thần kinh',
        'Đôi khi đòi hỏi sự hoàn hảo quá mức ở người khác khiến các bạn mới cảm thấy áp lực',
        'Cần không gian nạp lại năng lượng tâm linh'
      ],
      communicationTips: [
        'Tôn trọng lịch trình của em, luôn hẹn trước rõ ràng',
        'Thảo luận dựa trên dữ liệu và giải pháp cụ thể',
        'Nhắc nhở em về ân điển và sự linh hoạt trong tình yêu thương'
      ],
      actionPlan: [
        'Cùng Bảo rà soát kế hoạch hoàn thành Sách Cha',
        'Phân công em làm điều phối viên cho lớp chia sẻ kỹ năng mục vụ',
        'Khuyến khích em dành 1 ngày tĩnh tâm hàng quý'
      ],
      shepherdAdvice: 'Bảo là trụ cột đắc lực của bầy. Hãy nâng đỡ em để tính kỷ luật được bao bọc trong sự dịu dàng, tạo nên một người lãnh đạo trọn vẹn.',
      analyzedAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    adminNotes: 'Bảo đề xuất mở thêm lớp học tối thứ Bảy cho các bạn đi làm ca kíp. Ý tưởng rất hay.'
  }
];
