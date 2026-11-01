/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài toán về nhiều hơn, ít hơn một số đơn vị: nhiều hơn thì làm phép cộng, ít hơn thì làm phép trừ; tóm tắt bằng sơ đồ đoạn thẳng và trình bày bài giải.',
  intro:
    'Lớp học bơi có 9 bạn nam. Số bạn nữ nhiều hơn số bạn nam 2 bạn. Có bao nhiêu bạn nữ? Em cùng vẽ sơ đồ để tìm nhé!',
  objectives: [
    'Nhận ra bài toán về nhiều hơn và bài toán về ít hơn một số đơn vị.',
    'Biết dùng sơ đồ đoạn thẳng để tóm tắt bài toán.',
    'Trình bày bài giải: câu lời giải, phép tính, đáp số.',
  ],
  sections: [
    {
      heading: 'Bài toán về nhiều hơn',
      blocks: [
        {
          type: 'p',
          text: 'Có 9 bạn nam. Số bạn nữ nhiều hơn số bạn nam 2 bạn. Hỏi có bao nhiêu bạn nữ?',
        },
        {
          type: 'p',
          text: 'Số bạn nữ bằng số bạn nam, và thêm 2 bạn nữa. Đoạn thẳng của bạn nữ dài hơn đoạn thẳng của bạn nam 2 phần.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhiều hơn thì cộng',
          text: 'Số bạn nữ là: 9 + 2 = 11 (bạn). Đáp số: 11 bạn.',
        },
      ],
    },
    {
      heading: 'Bài toán về ít hơn',
      blocks: [
        {
          type: 'p',
          text: 'Thôn Thượng có 9 tiết mục. Thôn Hạ ít hơn thôn Thượng 3 tiết mục. Hỏi thôn Hạ có bao nhiêu tiết mục?',
        },
        {
          type: 'p',
          text: 'Đoạn thẳng của thôn Hạ ngắn hơn đoạn thẳng của thôn Thượng 3 phần.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ít hơn thì trừ',
          text: 'Số tiết mục thôn Hạ có là: 9 − 3 = 6 (tiết mục). Đáp số: 6 tiết mục.',
        },
      ],
    },
    {
      heading: 'Trình bày bài giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tóm tắt: viết số đã biết, phần nhiều hơn hoặc ít hơn, và điều cần tìm.',
            'Câu lời giải: "Số ... là:".',
            'Phép tính, có tên đơn vị trong ngoặc: 9 + 2 = 11 (bạn).',
            'Đáp số: 11 bạn.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Đọc kĩ đề bài: "nhiều hơn" thì làm phép cộng, "ít hơn" thì làm phép trừ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ đoạn thẳng',
    instruction:
      'Đọc bài toán. Kéo chấm tròn ở đầu đoạn thẳng thứ hai, hoặc chạm "Kéo dài" và "Rút ngắn", cho đúng "nhiều hơn" hay "ít hơn". Sau đó chọn phép tính và kết quả. Chạm "Bài toán khác" để làm tiếp.',
  },
  examples: [
    {
      problem:
        'Trên sân có 14 con gà. Số vịt nhiều hơn số gà 5 con. Hỏi trên sân có bao nhiêu con vịt?',
      steps: [
        'Tóm tắt: Gà: 14 con. Vịt nhiều hơn gà: 5 con. Vịt: ... con?',
        'Nhiều hơn thì em làm phép cộng: 14 + 5.',
        'Số con vịt là: 14 + 5 = 19 (con).',
      ],
      answer: 'Đáp số: 19 con vịt.',
    },
    {
      problem:
        'Mai hái được 12 bông hoa. Việt hái được ít hơn Mai 4 bông hoa. Hỏi Việt hái được bao nhiêu bông hoa?',
      steps: [
        'Tóm tắt: Mai: 12 bông hoa. Việt ít hơn Mai: 4 bông hoa. Việt: ... bông hoa?',
        'Ít hơn thì em làm phép trừ: 12 − 4.',
        'Số bông hoa Việt hái được là: 12 − 4 = 8 (bông).',
      ],
      answer: 'Đáp số: 8 bông hoa.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Trên sân có 14 con gà. Số vịt nhiều hơn số gà 5 con. Hỏi trên sân có bao nhiêu con vịt?',
      options: ['19 con', '9 con', '18 con'],
      answer: 0,
      hints: ['Nhiều hơn thì em làm phép cộng.', 'Em tính 14 + 5.'],
      solution: 'Số con vịt là: 14 + 5 = 19 (con). Đáp số: 19 con vịt.',
    },
    {
      type: 'choice',
      prompt:
        'Thôn Thượng có 9 tiết mục. Thôn Hạ ít hơn thôn Thượng 3 tiết mục. Em làm phép tính nào để tìm số tiết mục của thôn Hạ?',
      options: ['9 + 3', '9 − 3'],
      answer: 1,
      hints: ['Ít hơn thì số tiết mục bé đi.'],
      solution: 'Ít hơn thì làm phép trừ: 9 − 3 = 6. Thôn Hạ có 6 tiết mục.',
    },
    {
      type: 'count',
      prompt:
        'Hàng trên có 7 quả cam. Hàng dưới nhiều hơn hàng trên 2 quả cam. Hình vẽ số cam ở hàng dưới. Hàng dưới có mấy quả cam?',
      picture: 'orange',
      answer: 9,
      choices: [8, 9, 10],
      hints: ['Nhiều hơn thì em làm phép cộng: 7 + 2.'],
      solution: 'Số quả cam ở hàng dưới là: 7 + 2 = 9 (quả). Đáp số: 9 quả cam.',
    },
    {
      type: 'count',
      prompt:
        'Lan gấp được 12 ngôi sao. Nam gấp được ít hơn Lan 4 ngôi sao. Hình vẽ số ngôi sao của Nam. Nam gấp được mấy ngôi sao?',
      picture: 'star',
      answer: 8,
      choices: [7, 8, 9],
      hints: ['Ít hơn thì em làm phép trừ: 12 − 4.', '12 − 2 = 10, rồi trừ tiếp 2.'],
      solution: 'Số ngôi sao Nam gấp được là: 12 − 4 = 8 (ngôi sao). Đáp số: 8 ngôi sao.',
    },
    {
      type: 'match',
      prompt: 'Mai có 8 quả táo. Nối mỗi bạn với số quả táo của bạn đó.',
      left: [
        'Việt nhiều hơn Mai 3 quả',
        'Nam ít hơn Mai 3 quả',
        'Hà nhiều hơn Mai 5 quả',
        'Lan ít hơn Mai 6 quả',
      ],
      right: ['11', '5', '13', '2', '12'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhiều hơn thì cộng với 8, ít hơn thì lấy 8 trừ đi.'],
      solution: 'Việt: 8 + 3 = 11. Nam: 8 − 3 = 5. Hà: 8 + 5 = 13. Lan: 8 − 6 = 2.',
    },
    {
      type: 'choice',
      prompt:
        'Hùng câu được 15 con cá. Minh câu được ít hơn Hùng 6 con cá. Hỏi Minh câu được bao nhiêu con cá?',
      options: ['9 con', '21 con', '8 con'],
      answer: 0,
      hints: ['Ít hơn thì em làm phép trừ.', '15 − 5 = 10, rồi trừ tiếp 1.'],
      solution: 'Số con cá Minh câu được là: 15 − 6 = 9 (con). Đáp số: 9 con cá.',
    },
    {
      type: 'choice',
      prompt:
        'Tàu thứ nhất chở 20 thùng hàng. Tàu thứ hai chở nhiều hơn tàu thứ nhất 8 thùng hàng. Bài giải nào đúng?',
      options: [
        'Số thùng hàng tàu thứ hai chở là: 20 + 8 = 28 (thùng)',
        'Số thùng hàng tàu thứ hai chở là: 20 − 8 = 12 (thùng)',
        'Số thùng hàng tàu thứ hai chở là: 20 + 8 = 27 (thùng)',
      ],
      answer: 0,
      hints: ['Nhiều hơn thì em làm phép cộng.', 'Tính lại 20 + 8 cho cẩn thận.'],
      solution: 'Số thùng hàng tàu thứ hai chở là: 20 + 8 = 28 (thùng). Đáp số: 28 thùng hàng.',
    },
    {
      type: 'order',
      prompt:
        'Có 9 bạn nam, số bạn nữ nhiều hơn số bạn nam 2 bạn. Xếp các dòng của bài giải theo đúng thứ tự.',
      items: ['Đáp số: 11 bạn.', 'Số bạn nữ là:', '9 + 2 = 11 (bạn)'],
      answer: [1, 2, 0],
      hints: ['Bài giải bắt đầu bằng câu lời giải.', 'Đáp số luôn ở cuối.'],
      solution: 'Số bạn nữ là: 9 + 2 = 11 (bạn). Đáp số: 11 bạn.',
    },
    {
      type: 'choice',
      prompt: 'Tóm tắt: Mai: 6 bông hoa. Việt nhiều hơn Mai: 2 bông hoa. Việt: ... bông hoa?',
      options: ['8 bông hoa', '4 bông hoa', '6 bông hoa'],
      answer: 0,
      hints: ['Đoạn thẳng của Việt dài hơn đoạn thẳng của Mai 2 phần.'],
      solution: 'Số bông hoa của Việt là: 6 + 2 = 8 (bông). Đáp số: 8 bông hoa.',
    },
  ],
  takeaways: [
    'Bài toán về nhiều hơn: em làm phép cộng.',
    'Bài toán về ít hơn: em làm phép trừ.',
    'Bài giải có câu lời giải, phép tính (có tên đơn vị) và đáp số.',
  ],
};
