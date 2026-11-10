/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dãy số tự nhiên 0; 1; 2; 3; ... và tia số. Thêm 1 vào một số được số liền sau, bớt 1 ở một số khác 0 được số liền trước. Số 0 là số tự nhiên bé nhất, không có số tự nhiên lớn nhất.',
  intro:
    'Em đếm 0, 1, 2, 3, ... rồi cứ đếm tiếp mãi. Có số nào là số cuối cùng không? Em cùng làm quen với dãy số tự nhiên nhé!',
  objectives: [
    'Nhận biết số tự nhiên và dãy số tự nhiên.',
    'Biểu diễn dãy số tự nhiên trên tia số.',
    'Tìm được số liền trước, số liền sau của một số tự nhiên.',
  ],
  sections: [
    {
      heading: 'Dãy số tự nhiên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Các số 0; 1; 2; 3; ...; 10; ...; 100; ...; 1 000; ... là các số tự nhiên.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Các số tự nhiên xếp theo thứ tự từ bé đến lớn tạo thành dãy số tự nhiên: 0; 1; 2; 3; 4; 5; 6; ...',
        },
        {
          type: 'p',
          text: 'Trên tia số, mỗi số tự nhiên ứng với một điểm. Số 0 ứng với điểm gốc của tia số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Dãy 1; 2; 3; 4; ... không phải dãy số tự nhiên, vì thiếu số 0. Dãy 0; 1; 2; 3; 4; 5 chỉ là một phần của dãy số tự nhiên, vì nó dừng lại ở số 5.',
        },
      ],
    },
    {
      heading: 'Số liền trước, số liền sau',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Thêm 1 vào bất kì số tự nhiên nào cũng được số tự nhiên liền sau số đó. Vì vậy không có số tự nhiên lớn nhất, dãy số tự nhiên kéo dài mãi.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Bớt 1 ở bất kì số tự nhiên nào khác 0 cũng được số tự nhiên liền trước số đó. Không có số tự nhiên nào liền trước số 0, nên 0 là số tự nhiên bé nhất.',
        },
        {
          type: 'table',
          head: ['Số liền trước', 'Số', 'Số liền sau'],
          rows: [
            ['18', '19', '20'],
            ['9 998', '9 999', '10 000'],
            ['999 999', '1 000 000', '1 000 001'],
            ['Không có', '0', '1'],
          ],
        },
        {
          type: 'p',
          text: 'Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tia số không có điểm cuối',
    instruction:
      'Em chạm vào một số trên tia số để thấy số liền trước và số liền sau. Em nhảy thật xa: tia số vẫn còn tiếp. Ở chế độ "Thử thách", em chạm vào số đúng.',
  },
  examples: [
    {
      problem: 'Tìm số liền trước và số liền sau của 99 999.',
      steps: ['Bớt 1: 99 999 − 1 = 99 998.', 'Thêm 1: 99 999 + 1 = 100 000.'],
      answer: 'Số liền trước là 99 998. Số liền sau là 100 000.',
    },
    {
      problem: 'Viết số thích hợp vào chỗ trống: 899 997; 899 998; ?; ?; 900 001.',
      steps: [
        'Đây là các số tự nhiên liên tiếp: số sau hơn số trước 1 đơn vị.',
        'Số liền sau của 899 998 là 899 999.',
        'Số liền sau của 899 999 là 900 000. Kiểm tra: 900 000 + 1 = 900 001.',
      ],
      answer: '899 997; 899 998; 899 999; 900 000; 900 001.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dãy số nào là dãy số tự nhiên?',
      options: ['0; 1; 2; 3; 4; 5; ...', '1; 2; 3; 4; 5; ...', '0; 1; 2; 3; 4; 5'],
      answer: 0,
      hints: ['Dãy số tự nhiên bắt đầu từ số nào?', 'Dãy số tự nhiên có dừng lại không?'],
      solution:
        'Dãy số tự nhiên bắt đầu từ 0 và kéo dài mãi: 0; 1; 2; 3; 4; 5; ... Dãy 1; 2; 3; ... thiếu số 0. Dãy 0; 1; 2; 3; 4; 5 dừng ở số 5.',
    },
    {
      type: 'choice',
      prompt: 'Số tự nhiên bé nhất là số nào?',
      options: ['0', '1', '10', 'Không có'],
      answer: 0,
      hints: ['Số nào đứng đầu dãy số tự nhiên?'],
      solution: 'Không có số tự nhiên nào liền trước số 0, nên 0 là số tự nhiên bé nhất.',
    },
    {
      type: 'choice',
      prompt: 'Có số tự nhiên lớn nhất không?',
      options: [
        'Không có, vì thêm 1 vào số nào cũng được số liền sau.',
        'Có, đó là số 999 999 999.',
        'Có, đó là số 1 000 000.',
      ],
      answer: 0,
      hints: ['Em thử thêm 1 vào số 999 999 999.'],
      solution:
        '999 999 999 + 1 = 1 000 000 000, lớn hơn nữa. Số nào cũng có số liền sau, nên không có số tự nhiên lớn nhất.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của 9 999 là số nào?',
      answer: 10000,
      hints: ['Số liền sau: em thêm 1.'],
      solution: '9 999 + 1 = 10 000. Số liền sau của 9 999 là 10 000.',
    },
    {
      type: 'number',
      prompt: 'Số liền trước của 100 000 là số nào?',
      answer: 99999,
      hints: ['Số liền trước: em bớt 1.'],
      solution: '100 000 − 1 = 99 999. Số liền trước của 100 000 là 99 999.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi câu với số đúng.',
      left: [
        'Số liền sau của 1 999',
        'Số liền trước của 1 999',
        'Số liền sau của 20 099',
        'Số liền trước của 20 099',
      ],
      right: ['2 000', '1 998', '20 100', '20 098'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Liền sau: thêm 1. Liền trước: bớt 1.'],
      solution: '1 999 + 1 = 2 000; 1 999 − 1 = 1 998; 20 099 + 1 = 20 100; 20 099 − 1 = 20 098.',
    },
    {
      type: 'choice',
      prompt: 'Hai số tự nhiên liên tiếp hơn kém nhau mấy đơn vị?',
      options: ['1', '2', '10', '0'],
      answer: 0,
      hints: ['Em nhìn hai số liên tiếp, chẳng hạn 7 và 8.'],
      solution:
        'Số liền sau hơn số đó 1 đơn vị: 8 − 7 = 1. Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.',
    },
    {
      type: 'number',
      prompt: 'Viết số tiếp theo của dãy số chẵn: 2; 4; 6; 8; 10; ?',
      answer: 12,
      hints: ['Mỗi số hơn số trước nó bao nhiêu?'],
      solution: 'Mỗi số hơn số trước 2 đơn vị: 10 + 2 = 12.',
    },
    {
      type: 'number',
      prompt: 'Viết số tiếp theo của dãy số lẻ: 1; 3; 5; 7; 9; ?',
      answer: 11,
      hints: ['Mỗi số hơn số trước nó bao nhiêu?'],
      solution: 'Mỗi số hơn số trước 2 đơn vị: 9 + 2 = 11.',
    },
    {
      type: 'number',
      prompt: 'Viết số tiếp theo: 5; 10; 15; 20; 25; ?',
      answer: 30,
      hints: ['Em đếm thêm 5.'],
      solution: 'Mỗi số hơn số trước 5 đơn vị: 25 + 5 = 30.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số thành bốn số tự nhiên liên tiếp, từ bé đến lớn.',
      items: ['1 000 000', '999 998', '1 000 001', '999 999'],
      answer: [1, 3, 0, 2],
      hints: ['Hai số có sáu chữ số đứng trước.', 'Mỗi số sau hơn số trước 1 đơn vị.'],
      solution: '999 998; 999 999; 1 000 000; 1 000 001.',
    },
  ],
  takeaways: [
    'Dãy số tự nhiên: 0; 1; 2; 3; ... Số 0 ứng với điểm gốc của tia số.',
    'Số liền sau: thêm 1. Số liền trước: bớt 1.',
    '0 là số tự nhiên bé nhất. Không có số tự nhiên lớn nhất.',
  ],
};
