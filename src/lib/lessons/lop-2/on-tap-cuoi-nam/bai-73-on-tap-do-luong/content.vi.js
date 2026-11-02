/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập đo lường lớp 2: tính với ki-lô-gam, lít và các đơn vị đo độ dài, đọc cân đĩa, chọn số đo phù hợp, xem đồng hồ và xem lịch.',
  intro:
    'Em đã biết cân, đong, đo, xem giờ và xem lịch. Hôm nay em tính với các đơn vị đo và giúp các bạn đến lớp đúng giờ. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính với các số đo ki-lô-gam, lít, ki-lô-mét, mét, đề-xi-mét, xăng-ti-mét.',
    'Đọc cân đĩa, chọn đúng can để lấy đủ số lít.',
    'Chọn số đo phù hợp với mỗi vật.',
    'Xem đồng hồ, xem lịch, biết sớm, muộn, đúng giờ.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đơn vị đo',
      blocks: [
        {
          type: 'table',
          head: ['Đo', 'Đơn vị'],
          rows: [
            ['Độ dài', 'km, m, dm, cm'],
            ['Cân nặng', 'kg'],
            ['Dung tích', 'l'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 dm = 10 cm. 1 m = 10 dm = 100 cm. 1 km = 1000 m.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính với số đo',
          text: 'Em tính như với số bình thường, rồi viết thêm đơn vị. Ví dụ: 5 cm × 4 = 20 cm.',
        },
      ],
    },
    {
      heading: 'Cân đĩa',
      blocks: [
        {
          type: 'p',
          text: 'Cân thăng bằng thì hai đĩa cân nặng bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Nếu đĩa có vật còn có quả cân, em phải trừ quả cân đó đi.',
        },
      ],
    },
    {
      heading: 'Giờ và lịch',
      blocks: [
        {
          type: 'table',
          head: ['Kim dài chỉ số', 'Em đọc'],
          rows: [
            ['12', 'giờ đúng'],
            ['3', '15 phút'],
            ['6', '30 phút, hay rưỡi'],
          ],
        },
        {
          type: 'p',
          text: 'Sau 12 giờ trưa, em lấy số giờ trừ đi 12. 15 giờ là 3 giờ chiều.',
        },
        {
          type: 'p',
          text: 'Một tuần có 7 ngày. Cùng thứ ở tuần sau thì cộng thêm 7 ngày.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Cân thăng bằng. Đĩa bên trái có con mèo. Đĩa bên phải có quả cân 1 kg và quả cân 3 kg. Con mèo nặng mấy ki-lô-gam?',
      steps: ['Hai đĩa nặng bằng nhau.', 'Đĩa bên phải nặng: 1 + 3 = 4 (kg).'],
      answer: 'Con mèo nặng 4 kg.',
    },
    {
      problem: 'Hôm nay là thứ Tư, ngày 15 tháng 3. Thứ Tư tuần sau là ngày nào?',
      steps: ['Một tuần có 7 ngày.', '15 + 7 = 22.'],
      answer: 'Thứ Tư tuần sau là ngày 22 tháng 3.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '35 kg + 28 kg = ?',
      answer: 63,
      unit: 'kg',
      hints: ['Em tính 35 + 28, nhớ 1 sang hàng chục.'],
      solution: '35 kg + 28 kg = 63 kg.',
    },
    {
      type: 'number',
      prompt: '20 dm : 5 = ?',
      answer: 4,
      unit: 'dm',
      hints: ['Em nghĩ: 5 nhân với mấy thì bằng 20?'],
      solution: '20 dm : 5 = 4 dm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật với số đo phù hợp.',
      left: [
        'Cột cờ của trường cao',
        'Cái gọt bút chì dài',
        'Đường từ nhà đến trường dài',
        'Cạnh bàn học dài',
      ],
      right: ['5 m', '5 cm', '5 km', '5 dm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em hình dung từng vật ở ngoài đời, rồi nghĩ xem đơn vị nào hợp.'],
      solution:
        'Cột cờ cao khoảng 5 m. Cái gọt bút chì dài khoảng 5 cm. Đường đến trường dài khoảng 5 km. Cạnh bàn dài khoảng 5 dm.',
    },
    {
      type: 'choice',
      prompt:
        'Cân thăng bằng. Đĩa bên trái có quả dưa và quả cân 1 kg. Đĩa bên phải có quả cân 3 kg. Quả dưa nặng mấy ki-lô-gam?',
      options: ['2 kg', '3 kg', '4 kg'],
      answer: 0,
      hints: ['Quả dưa cùng quả cân 1 kg nặng bằng 3 kg. Em làm phép trừ.'],
      solution: 'Quả dưa nặng: 3 − 1 = 2 (kg).',
    },
    {
      type: 'choice',
      prompt: 'Có các can 10 l, 5 l, 3 l và 2 l. Mai cần lấy 12 l nước. Mai lấy hai can nào?',
      options: ['Can 10 l và can 2 l', 'Can 10 l và can 3 l', 'Can 5 l và can 3 l'],
      answer: 0,
      hints: ['Em cộng số lít của hai can, rồi so với 12 l.'],
      solution: '10 l + 2 l = 12 l. Mai lấy can 10 l và can 2 l.',
    },
    {
      type: 'order',
      prompt: 'Xếp các độ dài từ ngắn nhất đến dài nhất.',
      items: ['1 m', '1 km', '1 cm', '1 dm'],
      answer: [2, 3, 0, 1],
      hints: ['Em nhớ: 1 dm = 10 cm, 1 m = 10 dm, 1 km = 1000 m.'],
      solution: '1 cm < 1 dm < 1 m < 1 km.',
    },
    {
      type: 'number',
      prompt: '3 m = ? dm',
      answer: 30,
      hints: ['Mỗi mét có 10 dm.'],
      solution: '1 m = 10 dm, nên 3 m = 30 dm.',
    },
    {
      type: 'choice',
      prompt: '20 giờ còn gọi là mấy giờ?',
      options: ['8 giờ tối', '10 giờ tối', '2 giờ chiều'],
      answer: 0,
      hints: ['Sau 12 giờ trưa, em lấy số giờ trừ đi 12.'],
      solution: '20 − 12 = 8. 20 giờ còn gọi là 8 giờ tối.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn ở giữa số 9 và số 10, kim dài chỉ số 6. Đồng hồ chỉ mấy giờ?',
      options: ['9 giờ 30 phút', '10 giờ 30 phút', '6 giờ 9 phút'],
      answer: 0,
      hints: ['Kim dài chỉ số 6 là 30 phút. Kim ngắn vừa đi qua số nào?'],
      solution: 'Kim ngắn vừa qua số 9, kim dài chỉ số 6: 9 giờ 30 phút.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Bảy, ngày 9 tháng 5. Thứ Bảy tuần trước là ngày mấy?',
      options: ['Ngày 2', 'Ngày 8', 'Ngày 16'],
      answer: 0,
      hints: ['Tuần trước là lùi lại 7 ngày.'],
      solution: '9 − 7 = 2. Thứ Bảy tuần trước là ngày 2 tháng 5.',
    },
    {
      type: 'choice',
      prompt:
        'Giờ vào học là 7 giờ 15 phút. Sóc đến lúc 7 giờ. Rùa đến lúc 7 giờ 15 phút. Thỏ đến lúc 7 giờ 30 phút. Bạn nào đến muộn?',
      options: ['Sóc', 'Rùa', 'Thỏ'],
      answer: 2,
      hints: ['Đến muộn là đến sau giờ vào học.'],
      solution: 'Thỏ đến lúc 7 giờ 30 phút, sau 7 giờ 15 phút. Thỏ đến muộn.',
    },
    {
      type: 'number',
      prompt: 'Mẹ mua 5 túi gạo, mỗi túi 2 kg. Mẹ mua bao nhiêu ki-lô-gam gạo?',
      answer: 10,
      unit: 'kg',
      hints: ['2 kg được lấy 5 lần. Em làm phép nhân.'],
      solution: 'Số gạo mẹ mua là: 2 × 5 = 10 (kg).',
    },
  ],
  takeaways: [
    'Tính với số đo: tính như số, rồi viết thêm đơn vị.',
    '1 dm = 10 cm. 1 m = 10 dm = 100 cm. 1 km = 1000 m.',
    'Cân thăng bằng thì hai đĩa nặng bằng nhau.',
    'Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút. Cùng thứ ở tuần sau thì cộng thêm 7 ngày.',
  ],
};
