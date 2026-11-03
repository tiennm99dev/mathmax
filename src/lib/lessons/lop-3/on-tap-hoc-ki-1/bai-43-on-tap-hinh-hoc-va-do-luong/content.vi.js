/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học và đo lường: góc vuông, trung điểm, bán kính, đường kính, khối lập phương, khối hộp chữ nhật, mi-li-mét, gam, mi-li-lít, độ C.',
  intro:
    'Quả bưởi nặng bao nhiêu gam? Đường gấp khúc dài bao nhiêu mi-li-mét? Hôm nay em ôn lại hình học và đo lường. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Nhận ra góc vuông, trung điểm, bán kính, đường kính.',
    'Biết số mặt, đỉnh, cạnh của khối lập phương, khối hộp chữ nhật.',
    'Tính độ dài đường gấp khúc theo mi-li-mét.',
    'Tính với mi-li-mét, gam, mi-li-lít.',
    'Chọn số đo thích hợp với đồ vật.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Hình phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trung điểm',
          text: 'M là trung điểm của đoạn thẳng AB khi M ở giữa A, B và AM = MB.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bán kính, đường kính',
          text: 'Bán kính nối tâm với một điểm trên đường tròn. Đường kính đi qua tâm, hai đầu nằm trên đường tròn. Đường kính dài gấp 2 lần bán kính.',
        },
        {
          type: 'p',
          text: 'Hình chữ nhật và hình vuông đều có 4 góc vuông. Em dùng ê ke để kiểm tra góc vuông.',
        },
      ],
    },
    {
      heading: 'Khối hình',
      blocks: [
        {
          type: 'table',
          head: ['Khối', 'Mặt', 'Đỉnh', 'Cạnh'],
          rows: [
            ['Khối lập phương', '6 hình vuông', '8', '12'],
            ['Khối hộp chữ nhật', '6 hình chữ nhật', '8', '12'],
          ],
        },
      ],
    },
    {
      heading: 'Đơn vị đo',
      blocks: [
        {
          type: 'table',
          head: ['Đo', 'Đơn vị', 'Đổi'],
          rows: [
            ['Độ dài', 'mm', '1 cm = 10 mm, 1 m = 1 000 mm'],
            ['Khối lượng', 'g', '1 kg = 1 000 g'],
            ['Dung tích', 'ml', '1 l = 1 000 ml'],
            ['Nhiệt độ', '°C', 'Cơ thể người bình thường: 37 °C'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính với số đo',
          text: 'Em tính như với số, rồi viết thêm đơn vị. Ví dụ: 840 mm : 3 = 280 mm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu sẽ có gợi ý. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Bảng màu cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Đĩa bên trái có quả bưởi và quả cân 100 g. Đĩa bên phải có hai quả cân 500 g. Cân thăng bằng. Quả bưởi nặng bao nhiêu gam?',
      steps: [
        'Hai đĩa nặng bằng nhau. Đĩa bên phải nặng: 500 + 500 = 1 000 (g).',
        'Quả bưởi nhẹ hơn 1 000 g đúng bằng quả cân 100 g: 1 000 − 100 = 900 (g).',
      ],
      answer: 'Quả bưởi nặng 900 g.',
    },
    {
      problem:
        'Mỗi gói mì tôm cân nặng 80 g, một hộp sữa cân nặng 455 g. Hỏi 3 gói mì tôm và 1 hộp sữa cân nặng bao nhiêu gam?',
      steps: ['3 gói mì tôm nặng: 80 × 3 = 240 (g).', 'Cả mì và sữa nặng: 240 + 455 = 695 (g).'],
      answer: 'Cân nặng 695 g.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Đoạn thẳng AC dài 8 cm. K là trung điểm của AC. Đoạn thẳng KC dài bao nhiêu xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: ['Trung điểm chia đoạn thẳng thành hai phần bằng nhau.'],
      solution: 'KC = 8 : 2 = 4 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Đoạn thẳng nào sau đây chắc chắn là đường kính?',
      options: [
        'Đi qua tâm, hai đầu nằm trên đường tròn',
        'Nối tâm với một điểm trên đường tròn',
        'Nối hai điểm trên đường tròn, không đi qua tâm',
      ],
      answer: 0,
      hints: ['Đường kính đi qua tâm của hình tròn.'],
      solution: 'Đường kính đi qua tâm và có hai đầu nằm trên đường tròn.',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có bán kính 5 cm. Đường kính dài bao nhiêu xăng-ti-mét?',
      answer: 10,
      unit: 'cm',
      hints: ['Đường kính dài gấp 2 lần bán kính.'],
      solution: '5 × 2 = 10 (cm).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi câu hỏi với số đúng.',
      left: [
        'Khối lập phương có mấy mặt?',
        'Khối lập phương có mấy đỉnh?',
        'Khối hộp chữ nhật có mấy cạnh?',
      ],
      right: ['6', '8', '12', '4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em cầm một hộp giấy rồi đếm.'],
      solution: 'Khối lập phương có 6 mặt và 8 đỉnh. Khối hộp chữ nhật có 12 cạnh.',
    },
    {
      type: 'number',
      prompt:
        'Xếp 12 khối lập phương nhỏ thành khối hộp cao 3 lớp, mỗi lớp 2 hàng, mỗi hàng 2 khối. Sơn tất cả mặt ngoài. Có bao nhiêu khối nhỏ được sơn 3 mặt?',
      answer: 8,
      hints: ['Khối nhỏ ở đỉnh của khối hộp được sơn 3 mặt.'],
      solution: 'Khối hộp có 8 đỉnh, mỗi đỉnh có 1 khối nhỏ được sơn 3 mặt. Có 8 khối.',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc ABCD có ba đoạn, mỗi đoạn dài 28 mm. Đường gấp khúc dài bao nhiêu mi-li-mét?',
      answer: 84,
      unit: 'mm',
      hints: ['Em cộng ba đoạn, hoặc lấy 28 nhân với 3.'],
      solution: '28 + 28 + 28 = 84 (mm).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật với số đo thích hợp.',
      left: [
        'Quyển sách Toán 3 tập một dày khoảng',
        'Lọ thuốc nhỏ mắt chứa khoảng',
        'Cơ thể người bình thường có nhiệt độ',
      ],
      right: ['5 mm', '15 ml', '37 °C', '5 dm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em nghĩ đến vật đó ở ngoài đời.'],
      solution:
        'Sách dày khoảng 5 mm. Lọ nhỏ mắt chứa khoảng 15 ml. Cơ thể người bình thường: 37 °C.',
    },
    {
      type: 'number',
      prompt: '840 mm : 3 = ? mm',
      answer: 280,
      unit: 'mm',
      hints: ['Em tính 840 : 3 rồi viết thêm mm.'],
      solution: '840 : 3 = 280. Vậy 840 mm : 3 = 280 mm.',
    },
    {
      type: 'number',
      prompt: '465 g + 340 g = ? g',
      answer: 805,
      unit: 'g',
      hints: ['Em tính 465 + 340 rồi viết thêm g.'],
      solution: '465 + 340 = 805. Vậy 465 g + 340 g = 805 g.',
    },
    {
      type: 'number',
      prompt: '250 ml × 3 = ? ml',
      answer: 750,
      unit: 'ml',
      hints: ['Em tính 250 × 3 rồi viết thêm ml.'],
      solution: '250 × 3 = 750. Vậy 250 ml × 3 = 750 ml.',
    },
    {
      type: 'number',
      prompt: '1 kg = ? g',
      answer: 1000,
      unit: 'g',
      hints: ['Em nhớ lại bảng đơn vị đo khối lượng.'],
      solution: '1 kg = 1 000 g.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi gói mì tôm cân nặng 80 g, một hộp sữa cân nặng 455 g. Hỏi 3 gói mì tôm và 1 hộp sữa cân nặng bao nhiêu gam?',
      answer: 695,
      unit: 'g',
      hints: ['Em tính cân nặng 3 gói mì tôm trước.'],
      solution: '80 × 3 = 240 (g). 240 + 455 = 695 (g).',
    },
  ],
  takeaways: [
    'Trung điểm chia đoạn thẳng thành hai phần bằng nhau.',
    'Đường kính dài gấp 2 lần bán kính.',
    'Khối lập phương và khối hộp chữ nhật đều có 6 mặt, 8 đỉnh, 12 cạnh.',
    '1 cm = 10 mm, 1 kg = 1 000 g, 1 l = 1 000 ml.',
  ],
};
