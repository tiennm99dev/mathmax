/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiệt độ cho biết nóng hay lạnh; độ C, viết là °C, là đơn vị đo nhiệt độ. Em đọc nhiệt kế, so sánh nhiệt độ không khí và nhiệt độ cơ thể.',
  intro:
    'Hôm nay trời nóng hay lạnh? Em có bị sốt không? Muốn biết, em dùng nhiệt kế. Hôm nay em học đọc nhiệt kế nhé!',
  objectives: [
    'Biết độ C là đơn vị đo nhiệt độ, viết là °C.',
    'Đọc được nhiệt độ trên nhiệt kế.',
    'So sánh nhiệt độ, biết nhiệt độ cơ thể bình thường là 37 °C.',
  ],
  sections: [
    {
      heading: 'Nhiệt độ và độ C',
      blocks: [
        {
          type: 'p',
          text: 'Trời nắng, em thấy nóng. Trời rét, em thấy lạnh. Nhiệt độ cho biết nóng hay lạnh bao nhiêu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ C',
          text: 'Độ C là một đơn vị đo nhiệt độ. Độ C viết là °C. Ví dụ: 30 °C đọc là ba mươi độ C.',
        },
        {
          type: 'p',
          text: 'Số độ càng lớn thì càng nóng. Số độ càng bé thì càng lạnh.',
        },
      ],
    },
    {
      heading: 'Đọc nhiệt kế',
      blocks: [
        {
          type: 'p',
          text: 'Nhiệt kế là dụng cụ đo nhiệt độ. Trong nhiệt kế có một cột chất lỏng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Em nhìn đỉnh của cột chất lỏng.',
            'Em xem đỉnh cột ở ngang vạch số nào.',
            'Em đọc số đó, rồi đọc "độ C".',
          ],
        },
        {
          type: 'table',
          head: ['Nơi đo', 'Nhiệt độ buổi sáng'],
          rows: [
            ['Hà Nội', '30 °C'],
            ['Lào Cai', '26 °C'],
            ['Sa Pa', '10 °C'],
          ],
          caption: 'Vì 30 > 26 nên Hà Nội nóng hơn Lào Cai. Vì 10 < 26 nên Sa Pa lạnh hơn Lào Cai.',
        },
        {
          type: 'p',
          text: 'Em xem nhiệt độ không khí để chọn quần áo cho phù hợp.',
        },
      ],
    },
    {
      heading: 'Nhiệt độ cơ thể',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhiệt độ cơ thể bình thường của người là khoảng 37 °C.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi em thấy mệt',
          text: 'Nếu em thấy sốt hoặc mệt, em báo người lớn đo nhiệt độ giúp em. Cao hơn 37 °C nhiều là bị sốt.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nhiệt kế kéo được',
    instruction:
      'Em chọn một tình huống, rồi kéo cột đỏ đến đúng số độ. Em cũng có thể bấm "Tăng 1 °C", "Giảm 1 °C". Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Nhiệt độ buổi sáng ở Lào Cai là 26 °C, ở Hà Nội là 30 °C. Nơi nào nóng hơn?',
      steps: ['Em so sánh hai số: 30 > 26.', 'Số độ lớn hơn thì nóng hơn.'],
      answer: 'Hà Nội nóng hơn Lào Cai.',
    },
    {
      problem:
        'Một ngày ở một nơi: buổi sáng 27 °C, buổi trưa 36 °C, buổi đêm 15 °C. Lúc nào nhiệt độ thấp nhất, lúc nào cao nhất?',
      steps: ['Em xếp các số từ bé đến lớn: 15 < 27 < 36.', 'Số bé nhất là 15, số lớn nhất là 36.'],
      answer: 'Buổi đêm thấp nhất, 15 °C. Buổi trưa cao nhất, 36 °C.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '35 °C đọc là gì?',
      options: ['Ba mươi lăm độ C', 'Ba lăm', 'Năm mươi ba độ C'],
      answer: 0,
      hints: ['Em đọc số trước, rồi đọc "độ C".'],
      solution: '35 °C đọc là ba mươi lăm độ C.',
    },
    {
      type: 'choice',
      prompt: '"Bốn mươi mốt độ C" viết là gì?',
      options: ['14 °C', '41 °C', '401 °C'],
      answer: 1,
      hints: ['Bốn mươi mốt là số có hai chữ số. Em viết số trước, rồi viết °C.'],
      solution: 'Bốn mươi mốt độ C viết là 41 °C.',
    },
    {
      type: 'choice',
      prompt: 'Em đo nhiệt độ bằng dụng cụ nào?',
      options: ['Nhiệt kế', 'Thước kẻ', 'Cân đồng hồ'],
      answer: 0,
      hints: ['Dụng cụ này có cột chất lỏng và các vạch số độ.'],
      solution: 'Em đo nhiệt độ bằng nhiệt kế.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi vạch nhỏ trên nhiệt kế là 1 °C. Đỉnh cột cao hơn vạch số 20 là 8 vạch nhỏ. Nhiệt kế chỉ bao nhiêu độ C?',
      answer: 28,
      unit: '°C',
      hints: ['Em bắt đầu từ vạch số 20 rồi đếm thêm từng vạch nhỏ.'],
      solution: '20 + 8 = 28. Nhiệt kế chỉ 28 °C.',
    },
    {
      type: 'choice',
      prompt:
        'Nam đo được 38 °C, Việt đo được 37 °C, Mai đo được 39 °C. Bạn nào có nhiệt độ cơ thể bình thường?',
      options: ['Nam', 'Việt', 'Mai'],
      answer: 1,
      hints: ['Nhiệt độ cơ thể bình thường là khoảng 37 °C.'],
      solution: 'Việt đo được 37 °C là bình thường. Nam và Mai cao hơn 37 °C.',
    },
    {
      type: 'order',
      prompt: 'Xếp các nhiệt độ theo thứ tự từ lạnh đến nóng.',
      items: ['27 °C', '8 °C', '36 °C', '15 °C'],
      answer: [1, 3, 0, 2],
      hints: ['Số độ càng bé thì càng lạnh.'],
      solution: '8 °C < 15 °C < 27 °C < 36 °C.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tình huống với nhiệt độ thích hợp.',
      left: ['Cốc nước đá', 'Sa Pa ngày rét', 'Buổi sáng mát mẻ', 'Trưa hè nắng nóng'],
      right: ['0 °C', '10 °C', '25 °C', '36 °C'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Càng lạnh thì số độ càng bé.', 'Nước đá lạnh nhất, trưa hè nóng nhất.'],
      solution: 'Nước đá 0 °C, Sa Pa ngày rét 10 °C, buổi sáng mát mẻ 25 °C, trưa hè 36 °C.',
    },
    {
      type: 'number',
      prompt:
        'Buổi sáng trời 24 °C. Đến trưa, nhiệt độ cao hơn buổi sáng 9 °C. Buổi trưa trời bao nhiêu độ C?',
      answer: 33,
      unit: '°C',
      hints: ['Cao hơn thì em làm phép cộng.'],
      solution: '24 + 9 = 33. Buổi trưa trời 33 °C.',
    },
  ],
  takeaways: [
    'Độ C là đơn vị đo nhiệt độ, viết là °C.',
    'Em đo nhiệt độ bằng nhiệt kế.',
    'Nhiệt độ cơ thể bình thường là khoảng 37 °C.',
  ],
};
