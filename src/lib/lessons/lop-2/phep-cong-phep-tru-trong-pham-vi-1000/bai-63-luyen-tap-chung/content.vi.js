/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về phép cộng, phép trừ trong phạm vi 1000: đặt tính rồi tính, có nhớ và không nhớ, tính nhẩm, tìm phép tính sai và giải bài toán.',
  intro:
    'Em đã biết cộng, trừ các số đến 1000. Hôm nay em ôn lại: đặt tính, nhớ đúng lúc, tìm phép tính sai và giải bài toán. Em bắt đầu nhé!',
  objectives: [
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ và không nhớ.',
    'Tính nhẩm số tròn trăm, tính từ trái sang phải.',
    'Tìm và sửa phép tính sai.',
    'Giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đặt tính thẳng cột. Tính từ phải sang trái. Cộng đủ 10 thì nhớ 1. Trừ không đủ thì lấy thêm 10 và nhớ 1.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Cách tính', 'Kết quả'],
          rows: [
            ['267 + 731', '7 + 1 = 8, 6 + 3 = 9, 2 + 7 = 9', '998'],
            ['328 + 56', '8 + 6 = 14, viết 4, nhớ 1. 2 + 5 = 7, thêm 1 bằng 8. Hạ 3', '384'],
            [
              '721 − 350',
              '1 − 0 = 1. 2 không trừ được 5, lấy 12 − 5 = 7, nhớ 1. 3 thêm 1 bằng 4, 7 − 4 = 3',
              '371',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Nhiều hơn, ít hơn',
      blocks: [
        { type: 'p', text: '"Nhiều hơn", "cao hơn", "tất cả" thường là phép cộng.' },
        { type: 'p', text: '"Ít hơn", "còn lại", "lấy đi" thường là phép trừ.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính từ trái sang phải',
          text: '800 − 200 + 135: em tính 800 − 200 = 600, rồi 600 + 135 = 735.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Em chạm vào đáp án đúng. Chọn sai thì có gợi ý và được chọn lại. Cuối bộ bài, em xem phần nào cần ôn.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 698 − 47.',
      steps: ['8 trừ 7 bằng 1, viết 1.', '9 trừ 4 bằng 5, viết 5.', 'Hạ 6, viết 6.'],
      answer: '698 − 47 = 651.',
    },
    {
      problem:
        'Một cửa hàng buổi sáng bán được 250 kg gạo, buổi chiều bán được 175 kg gạo. Cả hai buổi bán được bao nhiêu ki-lô-gam gạo?',
      steps: [
        'Tìm cả hai buổi nên em làm phép cộng: 250 + 175.',
        '0 cộng 5 bằng 5, viết 5.',
        '5 cộng 7 bằng 12, viết 2, nhớ 1.',
        '2 cộng 1 bằng 3, thêm 1 bằng 4, viết 4.',
      ],
      answer: '250 + 175 = 425. Cả hai buổi bán được 425 kg gạo.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Em tính: 267 + 731 = ?',
      answer: 998,
      hints: ['Em cộng từ hàng đơn vị. Phép tính này không có nhớ.'],
      solution: '7 cộng 1 bằng 8. 6 cộng 3 bằng 9. 2 cộng 7 bằng 9. Vậy 267 + 731 = 998.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 328 + 56 = ?',
      answer: 384,
      hints: ['8 cộng 6 được hơn 10, em nhớ 1 sang hàng chục.'],
      solution:
        '8 cộng 6 bằng 14, viết 4, nhớ 1. 2 cộng 5 bằng 7, thêm 1 bằng 8, viết 8. Hạ 3. Vậy 328 + 56 = 384.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 698 − 47 = ?',
      answer: 651,
      hints: ['Viết 47 sao cho 7 thẳng cột với 8.'],
      solution: '8 trừ 7 bằng 1. 9 trừ 4 bằng 5. Hạ 6. Vậy 698 − 47 = 651.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 721 − 350 = ?',
      answer: 371,
      hints: ['Hàng chục: 2 không trừ được 5. Em lấy 12 trừ 5, nhớ 1.'],
      solution:
        '1 trừ 0 bằng 1. 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1. 3 thêm 1 bằng 4, 7 trừ 4 bằng 3. Vậy 721 − 350 = 371.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép tính với kết quả đúng.',
      left: ['523 + 365', '572 − 416', '250 + 175', '850 − 70'],
      right: ['888', '156', '425', '780'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đặt tính rồi tính từng phép tính.'],
      solution: '523 + 365 = 888. 572 − 416 = 156. 250 + 175 = 425. 850 − 70 = 780.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Mai cầm miếng bìa ghi phép tính 689 − 357. Bạn Nam cầm 341 + 250. Bạn Lan cầm 914 − 372. Ai cầm phép tính có kết quả bé nhất?',
      options: ['Bạn Mai', 'Bạn Nam', 'Bạn Lan'],
      answer: 0,
      hints: ['Em tính cả ba phép tính rồi so sánh.'],
      solution:
        '689 − 357 = 332. 341 + 250 = 591. 914 − 372 = 542. Vì 332 < 542 < 591, bạn Mai cầm phép tính có kết quả bé nhất.',
    },
    {
      type: 'multi',
      prompt: 'Bạn Mai đã tính như sau. Những phép tính nào sai? Em chọn tất cả.',
      options: ['267 + 731 = 998', '759 + 231 = 980', '698 − 47 = 651', '421 − 70 = 451'],
      answers: [1, 3],
      hints: ['Em tính lại từng phép tính.', 'Em xem bạn Mai có quên nhớ 1 không.'],
      solution:
        '759 + 231 = 990, không phải 980. 421 − 70 = 351, không phải 451. Hai phép tính còn lại đúng.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 800 − 200 + 135 = ?',
      answer: 735,
      hints: ['Em tính từ trái sang phải: 800 − 200 trước.'],
      solution: '800 − 200 = 600. 600 + 135 = 735.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 1000 − 500 + 216 = ?',
      answer: 716,
      hints: ['Em tính từ trái sang phải: 1000 − 500 trước.'],
      solution: '1000 − 500 = 500. 500 + 216 = 716.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các phép tính theo kết quả, từ bé đến lớn.',
      items: ['914 − 372', '341 + 250', '689 − 357'],
      answer: [2, 0, 1],
      hints: ['Em tính kết quả của mỗi phép tính trước.'],
      solution: '689 − 357 = 332. 914 − 372 = 542. 341 + 250 = 591. Vậy 332 < 542 < 591.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng buổi sáng bán được 250 kg gạo, buổi chiều bán được 175 kg gạo. Cả hai buổi bán được bao nhiêu ki-lô-gam gạo?',
      answer: 425,
      unit: 'kg',
      hints: ['"Cả hai buổi" nên em làm phép cộng.', 'Em tính 250 + 175.'],
      solution: 'Cả hai buổi bán được: 250 + 175 = 425 (kg). Đáp số: 425 kg gạo.',
    },
    {
      type: 'number',
      prompt:
        'Đội Một sửa được 850 m đường. Đội Hai sửa được ít hơn đội Một 70 m. Đội Hai sửa được bao nhiêu mét đường?',
      answer: 780,
      unit: 'm',
      hints: ['"Ít hơn" nên em làm phép trừ.', 'Em tính 850 − 70.'],
      solution: 'Đội Hai sửa được: 850 − 70 = 780 (m). Đáp số: 780 m.',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột, tính từ phải sang trái.',
    'Cộng đủ 10 thì nhớ 1. Trừ không đủ thì lấy thêm 10 và nhớ 1.',
    'Có nhiều phép tính thì tính từ trái sang phải.',
  ],
};
