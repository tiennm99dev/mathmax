/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giây và thế kỉ là hai đơn vị đo thời gian: 1 phút = 60 giây, 1 thế kỉ = 100 năm; tên thế kỉ được ghi bằng chữ số La Mã.',
  intro:
    'Một cái chớp mắt chỉ mất chưa đến một giây. Còn lịch sử nước ta thì dài hàng nghìn năm. Em cùng học giây và thế kỉ nhé!',
  objectives: [
    'Biết giây, thế kỉ là các đơn vị đo thời gian.',
    'Nhớ 1 phút = 60 giây và 1 thế kỉ = 100 năm.',
    'Đổi đơn vị thời gian; biết một năm thuộc thế kỉ nào.',
  ],
  sections: [
    {
      heading: 'Giây',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Giây là đơn vị đo thời gian bé hơn phút. Trên đồng hồ, kim giây quay một vòng hết 1 phút.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 phút = 60 giây.',
        },
        {
          type: 'p',
          text: 'Để đo những khoảng thời gian ngắn, như thời gian chạy 60 m, người ta dùng đồng hồ bấm giây.',
        },
        { type: 'widget', name: 'stopwatch' },
      ],
    },
    {
      heading: 'Thế kỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Thế kỉ là đơn vị đo thời gian rất dài. Người ta dùng chữ số La Mã để ghi tên thế kỉ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 thế kỉ = 100 năm.',
        },
        {
          type: 'table',
          head: ['Từ năm', 'Đến năm', 'Thế kỉ'],
          rows: [
            ['1', '100', 'I (thế kỉ một)'],
            ['101', '200', 'II (thế kỉ hai)'],
            ['…', '…', '…'],
            ['1901', '2000', 'XX (thế kỉ hai mươi)'],
            ['2001', '2100', 'XXI (thế kỉ hai mươi mốt)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Năm tròn trăm là năm cuối của một thế kỉ: năm 2000 thuộc thế kỉ XX, năm 2001 mới là năm đầu của thế kỉ XXI.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dòng thời gian các thế kỉ',
    instruction:
      'Em bấm các nút để đổi năm và xem năm đó thuộc thế kỉ nào. Rồi em giải câu đố lịch sử bên dưới.',
  },
  examples: [
    {
      problem: '2 phút 15 giây = ? giây',
      steps: ['1 phút = 60 giây, nên 2 phút = 120 giây.', '120 giây + 15 giây = 135 giây.'],
      answer: '2 phút 15 giây = 135 giây.',
    },
    {
      problem: 'Năm 1945, Bác Hồ đọc bản Tuyên ngôn Độc lập. Năm đó thuộc thế kỉ nào?',
      steps: ['Thế kỉ XX từ năm 1901 đến năm 2000.', '1945 nằm giữa 1901 và 2000.'],
      answer: 'Năm 1945 thuộc thế kỉ XX.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '2 phút = ? giây',
      answer: 120,
      unit: 'giây',
      hints: ['1 phút = 60 giây.'],
      solution: '2 phút = 60 giây + 60 giây = 120 giây.',
    },
    {
      type: 'number',
      prompt: '1 phút 20 giây = ? giây',
      answer: 80,
      unit: 'giây',
      hints: ['Em đổi 1 phút ra giây, rồi cộng thêm 20 giây.'],
      solution: '1 phút 20 giây = 60 giây + 20 giây = 80 giây.',
    },
    {
      type: 'number',
      prompt: '180 giây = ? phút',
      answer: 3,
      unit: 'phút',
      hints: ['Cứ 60 giây là 1 phút.'],
      solution: '180 : 60 = 3. Vậy 180 giây = 3 phút.',
    },
    {
      type: 'number',
      prompt: '5 thế kỉ = ? năm',
      answer: 500,
      unit: 'năm',
      hints: ['1 thế kỉ = 100 năm.'],
      solution: '5 thế kỉ = 5 × 100 năm = 500 năm.',
    },
    {
      type: 'choice',
      prompt: 'Năm 2026 thuộc thế kỉ nào?',
      options: ['XX', 'XXI', 'XXII'],
      answer: 1,
      hints: ['Thế kỉ XXI bắt đầu từ năm 2001.'],
      solution: 'Thế kỉ XXI từ năm 2001 đến năm 2100. Vậy năm 2026 thuộc thế kỉ XXI.',
    },
    {
      type: 'choice',
      prompt: 'Năm 1900 thuộc thế kỉ nào?',
      options: ['XVIII', 'XIX', 'XX'],
      answer: 1,
      hints: ['Năm tròn trăm là năm cuối của một thế kỉ.'],
      solution: 'Thế kỉ XIX từ năm 1801 đến năm 1900. Vậy năm 1900 thuộc thế kỉ XIX.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi năm với thế kỉ của nó.',
      left: ['Năm 938', 'Năm 1010', 'Năm 1789', 'Năm 2000'],
      right: ['X', 'XI', 'XVIII', 'XX', 'XXI'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Thế kỉ X từ năm 901 đến năm 1000.',
        'Năm 2000 là năm cuối của một thế kỉ, chưa sang thế kỉ mới.',
      ],
      solution:
        'Năm 938 thuộc thế kỉ X, năm 1010 thuộc thế kỉ XI, năm 1789 thuộc thế kỉ XVIII, năm 2000 thuộc thế kỉ XX.',
    },
    {
      type: 'choice',
      prompt: 'Chạy 60 m, bạn An hết 12 giây, bạn Bình hết 15 giây. Bạn nào chạy nhanh hơn?',
      options: ['Bạn An', 'Bạn Bình'],
      answer: 0,
      hints: ['Ai chạy hết ít thời gian hơn thì người đó chạy nhanh hơn.'],
      solution: '12 giây < 15 giây. Bạn An chạy nhanh hơn.',
    },
    {
      type: 'choice',
      prompt: '3 phút 50 giây ? 4 phút',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đổi cả hai số đo ra giây.'],
      solution: '3 phút 50 giây = 180 + 50 = 230 giây; 4 phút = 240 giây. Mà 230 < 240.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các khoảng thời gian từ ngắn đến dài.',
      items: ['100 giây', '1 phút', '2 phút', '1 phút 50 giây'],
      answer: [1, 0, 3, 2],
      hints: [
        'Em đổi tất cả ra giây.',
        '1 phút = 60 giây; 1 phút 50 giây = 110 giây; 2 phút = 120 giây.',
      ],
      solution:
        '60 giây < 100 giây < 110 giây < 120 giây. Vậy: 1 phút; 100 giây; 1 phút 50 giây; 2 phút.',
    },
  ],
  takeaways: [
    '1 phút = 60 giây; 1 thế kỉ = 100 năm.',
    'Thế kỉ ghi bằng chữ số La Mã. Năm tròn trăm là năm cuối của thế kỉ: năm 2000 thuộc thế kỉ XX.',
  ],
};
