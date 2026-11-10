/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ các số có nhiều chữ số: đặt tính sao cho các chữ số cùng hàng thẳng cột, trừ từ phải sang trái; chữ số trên bé hơn thì lấy thêm 10 rồi nhớ 1 cộng vào chữ số dưới ở hàng bên trái.',
  intro:
    'Kho có 245 680 kg thóc. Người ta chuyển đi 87 450 kg. Kho còn lại bao nhiêu ki-lô-gam thóc? Em cùng đặt tính để trừ nhé!',
  objectives: [
    'Đặt tính rồi tính được phép trừ các số có nhiều chữ số.',
    'Trừ có nhớ đúng, không quên số nhớ.',
    'Thử lại phép trừ bằng phép cộng và giải được bài toán có lời văn.',
  ],
  sections: [
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đặt tính: viết số trừ dưới số bị trừ sao cho các chữ số cùng hàng thẳng cột. Tính: trừ từ phải sang trái, bắt đầu từ hàng đơn vị.',
        },
        {
          type: 'p',
          text: 'Phép trừ không nhớ: 865 279 − 450 237. Em trừ từng hàng: 9 − 7 = 2; 7 − 3 = 4; 2 − 2 = 0; 5 − 0 = 5; 6 − 5 = 1; 8 − 4 = 4.',
        },
        { type: 'p', text: 'Vậy 865 279 − 450 237 = 415 042.' },
      ],
    },
    {
      heading: 'Trừ có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 647 253 − 285 749.' },
        {
          type: 'table',
          head: ['Hàng', 'Em làm'],
          rows: [
            ['Đơn vị', '3 không trừ được 9, lấy 13 trừ 9 bằng 4, viết 4, nhớ 1.'],
            ['Chục', '4 thêm 1 bằng 5; 5 trừ 5 bằng 0, viết 0.'],
            ['Trăm', '2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5, nhớ 1.'],
            ['Nghìn', '5 thêm 1 bằng 6; 7 trừ 6 bằng 1, viết 1.'],
            ['Chục nghìn', '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1.'],
            ['Trăm nghìn', '2 thêm 1 bằng 3; 6 trừ 3 bằng 3, viết 3.'],
          ],
        },
        { type: 'p', text: 'Vậy 647 253 − 285 749 = 361 504.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chữ số trên bé hơn chữ số dưới: em lấy thêm 10 rồi trừ, và nhớ 1. Ở hàng bên trái, em cộng 1 vào chữ số dưới rồi mới trừ.',
        },
      ],
    },
    {
      heading: 'Thử lại',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn thử lại phép trừ, em lấy hiệu cộng với số trừ. Được số bị trừ là em làm đúng.',
        },
        { type: 'p', text: 'Thử lại: 361 504 + 285 749 = 647 253. Đúng!' },
      ],
    },
  ],
  explore: {
    title: 'Trừ từng hàng',
    instruction:
      'Em chạm chữ số đúng để viết hiệu từng hàng, bắt đầu từ hàng đơn vị. Khi phải lấy thêm 10, em thấy +10 ở hàng đó và +1 ở chữ số dưới của hàng bên trái.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 92 714 − 3 948.',
      steps: [
        'Viết 3 948 dưới 92 714, thẳng cột từ hàng đơn vị.',
        '4 không trừ được 8, lấy 14 trừ 8 bằng 6, viết 6, nhớ 1.',
        '4 thêm 1 bằng 5; 1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6, nhớ 1.',
        '9 thêm 1 bằng 10; 7 không trừ được 10, lấy 17 trừ 10 bằng 7, viết 7, nhớ 1.',
        '3 thêm 1 bằng 4; 2 không trừ được 4, lấy 12 trừ 4 bằng 8, viết 8, nhớ 1.',
        '9 trừ 1 bằng 8, viết 8.',
      ],
      answer: '92 714 − 3 948 = 88 766.',
    },
    {
      problem:
        'Kho có 245 680 kg thóc. Người ta đã chuyển đi 87 450 kg thóc. Hỏi trong kho còn lại bao nhiêu ki-lô-gam thóc?',
      steps: [
        'Chuyển đi thì còn lại ít hơn, em làm phép trừ.',
        '245 680 − 87 450 = 158 230 (kg).',
        'Thử lại: 158 230 + 87 450 = 245 680.',
      ],
      answer: 'Trong kho còn lại 158 230 kg thóc.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 865 279 − 450 237 = ?',
      answer: 415042,
      hints: ['Trừ từ hàng đơn vị: 9 trừ 7 bằng 2.', 'Phép trừ này không có nhớ.'],
      solution:
        '9 − 7 = 2; 7 − 3 = 4; 2 − 2 = 0; 5 − 0 = 5; 6 − 5 = 1; 8 − 4 = 4. Vậy 865 279 − 450 237 = 415 042.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 92 714 − 3 948 = ?',
      answer: 88766,
      hints: [
        'Viết 3 948 thẳng cột từ hàng đơn vị.',
        '4 không trừ được 8, em lấy 14 trừ 8, nhớ 1.',
      ],
      solution:
        '14 − 8 = 6, nhớ 1; 11 − 5 = 6, nhớ 1; 17 − 10 = 7, nhớ 1; 12 − 4 = 8, nhớ 1; 9 − 1 = 8. Vậy 92 714 − 3 948 = 88 766.',
    },
    {
      type: 'choice',
      prompt: '520 000 − 152 384 = ?',
      options: ['367 616', '478 726', '368 616', '367 626'],
      answer: 0,
      hints: [
        'Hàng đơn vị: 0 không trừ được 4, lấy 10 trừ 4, nhớ 1.',
        'Ở mỗi hàng sau, em nhớ cộng 1 vào chữ số dưới.',
      ],
      solution:
        '10 − 4 = 6, nhớ 1; 10 − 9 = 1, nhớ 1; 10 − 4 = 6, nhớ 1; 10 − 3 = 7, nhớ 1; 12 − 6 = 6, nhớ 1; 5 − 2 = 3. Vậy 520 000 − 152 384 = 367 616. Số 478 726 là kết quả khi quên số nhớ.',
    },
    {
      type: 'match',
      prompt: 'Em tính nhẩm rồi nối phép trừ với kết quả.',
      left: ['800 000 − 300 000', '650 000 − 50 000', '1 000 000 − 200 000', '90 000 − 40 000'],
      right: ['500 000', '600 000', '800 000', '50 000', '700 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em nhẩm theo chục nghìn hoặc trăm nghìn: 10 trăm nghìn − 2 trăm nghìn = 8 trăm nghìn.',
      ],
      solution:
        '800 000 − 300 000 = 500 000; 650 000 − 50 000 = 600 000; 1 000 000 − 200 000 = 800 000; 90 000 − 40 000 = 50 000.',
    },
    {
      type: 'choice',
      prompt: 'Em thử lại phép trừ 72 506 − 38 147 = 34 359 bằng phép tính nào?',
      options: ['34 359 + 38 147', '72 506 + 38 147', '72 506 + 34 359'],
      answer: 0,
      hints: ['Thử lại: lấy hiệu cộng với số trừ.'],
      solution: 'Hiệu là 34 359, số trừ là 38 147. 34 359 + 38 147 = 72 506, đúng bằng số bị trừ.',
    },
    {
      type: 'choice',
      prompt: 'Phép trừ nào có nhớ ở hàng chục?',
      options: ['74 530 − 12 140', '58 463 − 21 352', '96 875 − 41 532'],
      answer: 0,
      hints: ['Em so sánh hai chữ số hàng chục. Chữ số trên bé hơn chữ số dưới thì có nhớ.'],
      solution:
        'Hàng chục của 74 530 − 12 140: 3 không trừ được 4, phải lấy 13 trừ 4, nhớ 1. Hai phép trừ kia: 6 − 5 và 7 − 3, không có nhớ.',
    },
    {
      type: 'number',
      prompt:
        'Núi Phan-xi-păng cao 3 143 m. Núi Bà Đen cao 986 m. Núi Phan-xi-păng cao hơn núi Bà Đen bao nhiêu mét?',
      answer: 2157,
      unit: 'm',
      hints: [
        'Cao hơn bao nhiêu: em lấy số lớn trừ số bé.',
        'Đặt tính 3 143 − 986, thẳng cột từ hàng đơn vị.',
      ],
      solution: '3 143 − 986 = 2 157 (m). Núi Phan-xi-păng cao hơn núi Bà Đen 2 157 m.',
    },
    {
      type: 'number',
      prompt:
        'Kho có 245 680 kg thóc. Người ta đã chuyển đi 87 450 kg thóc. Hỏi trong kho còn lại bao nhiêu ki-lô-gam thóc?',
      answer: 158230,
      unit: 'kg',
      hints: ['Chuyển đi thì còn lại ít hơn: em làm phép trừ.'],
      solution: '245 680 − 87 450 = 158 230 (kg). Trong kho còn lại 158 230 kg thóc.',
    },
  ],
  takeaways: [
    'Đặt tính: các chữ số cùng hàng thẳng cột.',
    'Trừ từ phải sang trái, bắt đầu từ hàng đơn vị.',
    'Chữ số trên bé hơn: lấy thêm 10 rồi trừ, nhớ 1 sang hàng bên trái.',
    'Thử lại: hiệu cộng số trừ bằng số bị trừ.',
  ],
};
