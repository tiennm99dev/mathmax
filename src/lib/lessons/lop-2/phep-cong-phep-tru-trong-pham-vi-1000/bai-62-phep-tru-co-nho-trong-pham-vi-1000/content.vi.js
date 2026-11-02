/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ có nhớ trong phạm vi 1000: hàng nào không đủ để trừ thì lấy thêm 10, viết hiệu và nhớ 1 sang hàng bên trái.',
  intro:
    'Vườn ươm có 456 cây giống, lấy đi 148 cây để trồng rừng. Còn lại bao nhiêu cây? Hàng đơn vị thiếu khối rồi: em tháo khối ở hàng trên nhé!',
  objectives: [
    'Trừ có nhớ ở hàng đơn vị: tháo 1 chục thành 10 đơn vị.',
    'Trừ có nhớ ở hàng chục: tháo 1 trăm thành 10 chục.',
    'Đặt tính rồi tính và giải bài toán có phép trừ.',
  ],
  sections: [
    {
      heading: 'Thiếu đơn vị, tháo 1 thanh chục',
      blocks: [
        { type: 'p', text: 'Tính 485 − 128. Hàng đơn vị có 5 khối, phải bớt 8 khối. Không đủ!' },
        {
          type: 'p',
          text: 'Em tháo 1 thanh chục thành 10 khối đơn vị. Bây giờ có 15 khối, bớt 8 khối còn 7 khối.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 485 − 128',
          text: '5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1. 2 thêm 1 bằng 3, 8 trừ 3 bằng 5, viết 5. 4 trừ 1 bằng 3, viết 3. Vậy 485 − 128 = 357.',
        },
      ],
    },
    {
      heading: 'Thiếu chục, tháo 1 tấm trăm',
      blocks: [
        { type: 'p', text: 'Tính 427 − 251. Hàng chục có 2 thanh, phải bớt 5 thanh. Không đủ!' },
        { type: 'p', text: 'Em tháo 1 tấm trăm thành 10 thanh chục. Bây giờ có 12 thanh chục.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 427 − 251',
          text: '7 trừ 1 bằng 6, viết 6. 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1. 2 thêm 1 bằng 3, 4 trừ 3 bằng 1, viết 1. Vậy 427 − 251 = 176.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hàng nào không đủ để trừ thì em lấy thêm 10 rồi trừ, viết hiệu và nhớ 1. Hàng bên trái phải trừ thêm 1 nhớ đó.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên nhớ',
          text: 'Quên nhớ 1 thì kết quả lớn hơn đúng 10 hoặc 100. Em nhớ cộng 1 vào chữ số ở dưới của hàng bên trái.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tháo khối để trừ',
    instruction:
      'Nếu không đủ để bớt, em tháo 1 khối của hàng trên thành 10 khối. Bớt rồi đếm số khối còn lại để viết kết quả.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 362 − 36.',
      steps: [
        '2 không trừ được 6, lấy 12 trừ 6 bằng 6, viết 6, nhớ 1.',
        '3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2.',
        'Hạ 3, viết 3.',
      ],
      answer: '362 − 36 = 326.',
    },
    {
      problem: 'Đặt tính rồi tính: 608 − 315.',
      steps: [
        '8 trừ 5 bằng 3, viết 3.',
        '0 không trừ được 1, lấy 10 trừ 1 bằng 9, viết 9, nhớ 1.',
        '3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2.',
      ],
      answer: '608 − 315 = 293.',
    },
    {
      problem:
        'Vườn ươm có 456 cây giống. Người ta lấy đi 148 cây để trồng rừng. Vườn ươm còn lại bao nhiêu cây giống?',
      steps: [
        '"Lấy đi" nên em làm phép trừ: 456 − 148.',
        '6 không trừ được 8, lấy 16 trừ 8 bằng 8, viết 8, nhớ 1.',
        '4 thêm 1 bằng 5, 5 trừ 5 bằng 0, viết 0.',
        '4 trừ 1 bằng 3, viết 3.',
      ],
      answer: '456 − 148 = 308. Vườn ươm còn lại 308 cây giống.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '574 − 136 = ?',
      options: ['438', '448', '338', '428'],
      answer: 0,
      hints: ['4 không trừ được 6. Em lấy 14 trừ 6 rồi nhớ 1.', 'Hàng chục: 3 thêm 1 bằng 4.'],
      solution:
        '4 không trừ được 6, lấy 14 trừ 6 bằng 8, viết 8, nhớ 1. 3 thêm 1 bằng 4, 7 trừ 4 bằng 3, viết 3. 5 trừ 1 bằng 4, viết 4.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 780 − 68 = ?',
      answer: 712,
      hints: [
        '0 không trừ được 8. Em lấy 10 trừ 8 rồi nhớ 1.',
        'Hàng chục: 6 thêm 1 rồi lấy 8 trừ đi. Hạ 7.',
      ],
      solution:
        '0 không trừ được 8, lấy 10 trừ 8 bằng 2, viết 2, nhớ 1. 6 thêm 1 bằng 7, 8 trừ 7 bằng 1, viết 1. Hạ 7. Vậy 780 − 68 = 712.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 651 − 635 = ?',
      answer: 16,
      hints: [
        'Hàng đơn vị thiếu, em lấy 11 trừ 5 và nhớ 1.',
        'Hàng trăm được 0 thì không viết chữ số 0 ở đầu.',
      ],
      solution:
        '1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6, nhớ 1. 3 thêm 1 bằng 4, 5 trừ 4 bằng 1, viết 1. 6 trừ 6 bằng 0. Vậy 651 − 635 = 16.',
    },
    {
      type: 'choice',
      prompt: '382 − 190 = ?',
      options: ['192', '292', '182', '212'],
      answer: 0,
      hints: [
        'Hàng chục: 8 không trừ được 9. Em lấy 18 trừ 9 rồi nhớ 1.',
        'Hàng trăm: 1 thêm 1 bằng 2.',
      ],
      solution:
        '2 trừ 0 bằng 2, viết 2. 8 không trừ được 9, lấy 18 trừ 9 bằng 9, viết 9, nhớ 1. 1 thêm 1 bằng 2, 3 trừ 2 bằng 1, viết 1.',
    },
    {
      type: 'match',
      prompt: 'Em tìm địa chỉ cho mỗi bức thư: nối phép trừ với kết quả.',
      left: ['473 − 281', '364 − 126', '560 − 226', '900 − 700'],
      right: ['192', '238', '334', '200'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính từng hàng. Thiếu thì lấy thêm 10 và nhớ 1.'],
      solution: '473 − 281 = 192. 364 − 126 = 238. 560 − 226 = 334. 900 − 700 = 200.',
    },
    {
      type: 'number',
      prompt:
        'Đầu năm, một công ty có 205 người làm việc. Cuối năm có 12 người nghỉ việc. Công ty còn lại bao nhiêu người?',
      answer: 193,
      unit: 'người',
      hints: [
        'Em tính 205 − 12.',
        'Hàng chục: 0 không trừ được 1. Em lấy 10 trừ 1 và nhớ 1 sang hàng trăm.',
      ],
      solution: 'Công ty còn lại số người là: 205 − 12 = 193 (người). Đáp số: 193 người.',
    },
    {
      type: 'number',
      prompt:
        'Đoàn Thể thao Việt Nam giành được 288 huy chương Vàng, Bạc và Đồng, trong đó có 190 huy chương Bạc và Đồng. Đoàn giành được bao nhiêu huy chương Vàng?',
      answer: 98,
      unit: 'huy chương',
      hints: ['Tất cả bớt đi huy chương Bạc và Đồng.', 'Em tính 288 − 190.'],
      solution: 'Số huy chương Vàng là: 288 − 190 = 98 (huy chương). Đáp số: 98 huy chương Vàng.',
    },
    {
      type: 'choice',
      prompt: 'Rô-bốt tìm phép tính sai. Phép tính nào sai?',
      options: ['762 − 70 = 692', '529 − 130 = 499', '430 − 50 = 380'],
      answer: 1,
      hints: ['Em tính lại từng phép trừ.', 'Hàng nào không đủ để trừ thì đừng quên nhớ 1.'],
      solution:
        '762 − 70 = 692 và 430 − 50 = 380 đều đúng. 529 − 130 = 399, nên 529 − 130 = 499 là phép tính sai.',
    },
    {
      type: 'multi',
      prompt: 'Biết 800 + 200 = 1000. Phép trừ nào đúng? Em chọn tất cả.',
      options: ['1000 − 200 = 800', '1000 − 800 = 200', '1000 − 200 = 600', '1000 − 800 = 300'],
      answers: [0, 1],
      hints: ['Từ phép cộng, em lấy tổng trừ đi số này thì được số kia.'],
      solution: '800 + 200 = 1000 nên 1000 − 200 = 800 và 1000 − 800 = 200.',
    },
  ],
  takeaways: [
    'Hàng nào không đủ để trừ thì lấy thêm 10, viết hiệu rồi nhớ 1.',
    '1 chục đổi được 10 đơn vị, 1 trăm đổi được 10 chục.',
    'Hàng bên trái phải trừ thêm 1 đã nhớ.',
  ],
};
