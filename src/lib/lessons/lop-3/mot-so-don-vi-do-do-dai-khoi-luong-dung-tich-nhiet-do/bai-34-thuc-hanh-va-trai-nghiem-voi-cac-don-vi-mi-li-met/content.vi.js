/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo độ dài bằng mi-li-mét, cân bằng gam, đong bằng mi-li-lít và đọc nhiệt độ bằng độ C; ước lượng và chọn đơn vị phù hợp.',
  intro:
    'Hôm nay em là nhà đo đạc nhỏ! Em chọn dụng cụ và đơn vị để đo từng vật, rồi tự đo đồ vật ở nhà và ở lớp nhé.',
  objectives: [
    'Đo được độ dài bằng mi-li-mét, cân bằng gam, đong bằng mi-li-lít.',
    'Đọc được nhiệt độ trên nhiệt kế.',
    'Ước lượng và chọn đơn vị đo phù hợp với từng vật.',
  ],
  sections: [
    {
      heading: 'Chọn dụng cụ và đơn vị',
      blocks: [
        {
          type: 'table',
          head: ['Em muốn đo', 'Dụng cụ', 'Đơn vị'],
          rows: [
            ['Độ dài', 'Thước kẻ', 'mm'],
            ['Khối lượng', 'Cân', 'g'],
            ['Dung tích', 'Ống đong, ca đong', 'ml'],
            ['Nhiệt độ', 'Nhiệt kế', '°C'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Trước khi đo, em ước lượng: đoán xem vật dài, nặng, chứa được khoảng bao nhiêu. Đo xong, em so sánh với số đã đoán.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em tự đo đồ vật thật và ghi kết quả vào bảng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị (cùng bố mẹ hoặc thầy cô): thước kẻ, cân, chai hoặc ca có vạch ml, nhiệt kế đo không khí, vài đồ vật nhỏ.',
            'Kẻ bảng 3 cột: Đồ vật, Em đoán, Đo được.',
            'Đo chiều dài chiếc bút, cục tẩy, kẹp giấy theo mi-li-mét. Em viết vào bảng.',
            'Cân một gói bánh, một quả táo theo gam. Em cũng thử cân cho đủ 1 kg gạo.',
            'Đong nước vào chai, ca theo mi-li-lít. Nhờ người lớn giúp nếu chai nặng.',
            'Đọc nhiệt kế trong phòng vài ngày trong tuần. Em ghi nhiệt độ từng ngày vào bảng.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: vật nào em đoán gần đúng nhất? Ngày nào nóng nhất, ngày nào mát nhất?',
        },
      ],
    },
  ],
  explore: {
    title: 'Phòng thí nghiệm nhỏ',
    instruction:
      'Với mỗi vật, em chọn dụng cụ, chọn đơn vị rồi đọc số đo trên dụng cụ. Chọn đúng ngay lần đầu, em được một sao.',
  },
  examples: [
    {
      problem:
        'Mai cần cân đúng 1 kg gạo. Mai có các quả cân 500 g, 200 g, 200 g và 100 g. Mai dùng những quả cân nào?',
      steps: ['1 kg = 1 000 g.', '500 + 200 + 200 + 100 = 1 000.'],
      answer: 'Mai dùng cả bốn quả cân.',
    },
    {
      problem:
        'Ca A có 300 ml nước, ca B có 150 ml nước. Hai ca có tất cả bao nhiêu mi-li-lít nước?',
      steps: ['Em cộng hai số: 300 + 150.', '300 + 150 = 450.'],
      answer: 'Hai ca có tất cả 450 ml nước.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi việc đo với dụng cụ phù hợp.',
      left: ['Đo chiều dài cục tẩy', 'Cân quả cam', 'Đong nước trong cốc', 'Đo nhiệt độ phòng'],
      right: ['Thước kẻ', 'Cân', 'Ống đong', 'Nhiệt kế'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mỗi dụng cụ đo một thứ khác nhau.', 'Nhiệt kế đo nóng lạnh, ống đong đo nước.'],
      solution: 'Cục tẩy dùng thước kẻ, quả cam dùng cân, nước dùng ống đong, phòng dùng nhiệt kế.',
    },
    {
      type: 'choice',
      prompt: 'Chiều dài chiếc kẹp giấy nên đo bằng đơn vị nào?',
      options: ['mm', 'g', 'ml', '°C'],
      answer: 0,
      hints: ['Chiều dài là độ dài. Đơn vị nào đo độ dài?'],
      solution: 'Độ dài đo bằng mi-li-mét, viết là mm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật với cân nặng phù hợp.',
      left: ['Quả trứng gà', 'Túi cà chua', 'Quả tạ'],
      right: ['50 g', '1 kg', '100 kg'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Vật càng to, càng khó nhấc thì càng nặng.',
        'Quả trứng rất nhẹ, em cầm một tay rất dễ.',
      ],
      solution: 'Quả trứng gà 50 g, túi cà chua 1 kg, quả tạ 100 kg.',
    },
    {
      type: 'choice',
      prompt: 'Một cái cốc uống nước chứa được khoảng bao nhiêu?',
      options: ['200 ml', '200 l', '2 ml'],
      answer: 0,
      hints: ['Một chai to chứa 1 l. Cốc nhỏ hơn chai nhiều.'],
      solution: 'Một cái cốc chứa được khoảng 200 ml.',
    },
    {
      type: 'choice',
      prompt: 'Trời mùa đông rét, em phải mặc áo ấm. Nhiệt kế ngoài trời có thể chỉ bao nhiêu?',
      options: ['10 °C', '37 °C', '50 °C'],
      answer: 0,
      hints: ['Số độ càng bé thì trời càng lạnh.'],
      solution: 'Trời rét nên nhiệt độ thấp: 10 °C.',
    },
    {
      type: 'number',
      prompt: 'Có quả cân 500 g và 200 g trên đĩa. Em cần thêm bao nhiêu gam nữa để đủ 1 kg?',
      answer: 300,
      unit: 'g',
      hints: ['1 kg = 1 000 g.', 'Em cộng hai quả cân, rồi lấy 1 000 trừ đi.'],
      solution: '500 + 200 = 700. 1 000 − 700 = 300. Em cần thêm 300 g.',
    },
    {
      type: 'multi',
      prompt: 'Có 4 ca: A 300 ml, B 150 ml, C 200 ml, D 250 ml. Chọn hai ca có tất cả 350 ml nước.',
      options: ['Ca A', 'Ca B', 'Ca C', 'Ca D'],
      answers: [1, 2],
      hints: ['Em cộng số nước của hai ca rồi so với 350 ml.', 'Em thử từ ca có ít nước nhất.'],
      solution: 'Ca B và ca C: 150 + 200 = 350.',
    },
    {
      type: 'multi',
      prompt: 'Có 4 ca: A 300 ml, B 150 ml, C 200 ml, D 250 ml. Chọn hai ca có tất cả 550 ml nước.',
      options: ['Ca A', 'Ca B', 'Ca C', 'Ca D'],
      answers: [0, 3],
      hints: ['Em cộng số nước của hai ca rồi so với 550 ml.', 'Em thử từ ca có nhiều nước nhất.'],
      solution: 'Ca A và ca D: 300 + 250 = 550.',
    },
    {
      type: 'choice',
      prompt: 'Có 4 ca: A 300 ml, B 150 ml, C 200 ml, D 250 ml. Ca nào có ít nước nhất?',
      options: ['Ca A', 'Ca B', 'Ca C', 'Ca D'],
      answer: 1,
      hints: ['Em tìm số bé nhất trong bốn số.'],
      solution: '150 < 200 < 250 < 300. Ca B có ít nước nhất.',
    },
    {
      type: 'number',
      prompt:
        'Bạn Hà đoán cục tẩy dài 30 mm. Em đo được 25 mm. Hà đoán dài hơn số đo bao nhiêu mi-li-mét?',
      answer: 5,
      unit: 'mm',
      hints: ['Em lấy số lớn trừ số bé.'],
      solution: '30 − 25 = 5. Hà đoán dài hơn 5 mm.',
    },
  ],
  takeaways: [
    'Độ dài: thước, mm. Khối lượng: cân, g. Dung tích: ống đong, ml. Nhiệt độ: nhiệt kế, °C.',
    'Em ước lượng trước, rồi đo để kiểm tra.',
  ],
};
