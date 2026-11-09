/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Cộng, trừ trong phạm vi 100 000: tính nhẩm, đặt tính rồi tính, kiểm tra phép tính đúng sai, tính giá trị biểu thức và giải bài toán thực tế.',
  intro:
    'Em đã biết cộng, trừ các số trong phạm vi 100 000. Giờ em luyện tập để tính thật chắc và giải các bài toán nhé!',
  objectives: [
    'Đặt tính rồi tính cộng, trừ trong phạm vi 100 000.',
    'Tính nhẩm với số tròn nghìn, tròn chục nghìn.',
    'Tính giá trị biểu thức có phép cộng, phép trừ và dấu ngoặc.',
    'Giải bài toán thực tế bằng hai bước tính.',
  ],
  sections: [
    {
      heading: 'Cộng, trừ theo cột',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Em làm thế nào?'],
          rows: [
            ['Cộng', 'Từ hàng đơn vị, sang trái. Đủ 10 thì nhớ 1.'],
            ['Trừ', 'Từ hàng đơn vị, sang trái. Không trừ được thì lấy thêm 10, nhớ 1.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi đặt tính, các hàng phải thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục, … chục nghìn thẳng chục nghìn.',
        },
        {
          type: 'p',
          text: 'Em thử lại phép trừ bằng phép cộng: 23 285 − 12 967 = 10 318, vì 10 318 + 12 967 = 23 285.',
        },
      ],
    },
    {
      heading: 'Tính giá trị biểu thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức chỉ có phép cộng, phép trừ: em tính từ trái sang phải. Biểu thức có dấu ngoặc: em tính trong ngoặc trước.',
        },
        { type: 'p', text: '30 000 + 6 000 − 20 000 = 36 000 − 20 000 = 16 000.' },
        { type: 'p', text: '80 000 − (40 000 + 10 000) = 80 000 − 50 000 = 30 000.' },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        { type: 'p', text: '"Nhiều hơn", "thêm", "tất cả": em thường làm phép cộng.' },
        { type: 'p', text: '"Ít hơn", "bán đi", "còn lại": em thường làm phép trừ.' },
        {
          type: 'p',
          text: 'Bài toán hai bước: em tìm cái chưa biết ở bước một, rồi dùng nó ở bước hai.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi câu em chạm vào đáp án đúng. Nếu sai, em đọc gợi ý rồi thử lại. Làm xong, em xem phần nào cần ôn và bấm "Làm bộ bài khác" để luyện tiếp.',
  },
  examples: [
    {
      problem:
        'Một cửa hàng có 16 500 l xăng. Cửa hàng nhập thêm 9 000 l xăng, rồi bán được 17 350 l xăng. Hỏi cửa hàng còn lại bao nhiêu lít xăng?',
      steps: [
        'Sau khi nhập thêm, cửa hàng có: 16 500 + 9 000 = 25 500 (l).',
        'Sau khi bán, cửa hàng còn lại: 25 500 − 17 350 = 8 150 (l).',
      ],
      answer: 'Cửa hàng còn lại 8 150 l xăng.',
    },
    {
      problem: 'Tính giá trị biểu thức: 15 654 − (7 460 + 2 140).',
      steps: [
        'Em tính trong ngoặc trước: 7 460 + 2 140 = 9 600.',
        'Rồi em tính: 15 654 − 9 600 = 6 054.',
      ],
      answer: '15 654 − (7 460 + 2 140) = 6 054.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi biểu thức với giá trị của nó.',
      left: [
        '18 000 − 9 000 + 40 000',
        '70 000 − (60 000 − 30 000)',
        '30 000 + 6 000 − 20 000',
        '80 000 − (40 000 + 10 000)',
      ],
      right: ['49 000', '40 000', '16 000', '30 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Không có ngoặc thì em tính từ trái sang phải.',
        'Có ngoặc thì em tính trong ngoặc trước: 60 000 − 30 000 = 30 000.',
      ],
      solution:
        '18 000 − 9 000 + 40 000 = 9 000 + 40 000 = 49 000. 70 000 − (60 000 − 30 000) = 70 000 − 30 000 = 40 000. 30 000 + 6 000 − 20 000 = 36 000 − 20 000 = 16 000. 80 000 − (40 000 + 10 000) = 80 000 − 50 000 = 30 000.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép tính đúng.',
      options: [
        '45 382 + 27 519 = 72 901',
        '63 450 − 18 275 = 45 175',
        '38 627 + 9 485 = 47 112',
        '70 000 − 26 384 = 53 616',
      ],
      answers: [0, 1],
      hints: [
        'Em đặt tính rồi tính lại từng phép tính.',
        'Có phép tính bị quên nhớ 1 ở hàng nghìn hoặc hàng chục nghìn.',
      ],
      solution:
        '45 382 + 27 519 = 72 901: đúng. 63 450 − 18 275 = 45 175: đúng. 38 627 + 9 485 = 48 112, không phải 47 112: sai. 70 000 − 26 384 = 43 616, không phải 53 616: sai.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 57 386 + 29 547 = ?',
      answer: 86933,
      hints: [
        'Hàng đơn vị: 6 cộng 7 bằng 13, em viết 3, nhớ 1.',
        'Hàng nghìn: 7 cộng 9 cũng phải nhớ.',
      ],
      solution:
        '6 cộng 7 bằng 13, viết 3, nhớ 1. 8 cộng 4 bằng 12, thêm 1 bằng 13, viết 3, nhớ 1. 3 cộng 5 bằng 8, thêm 1 bằng 9, viết 9. 7 cộng 9 bằng 16, viết 6, nhớ 1. 5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8. Vậy 57 386 + 29 547 = 86 933.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 81 205 − 46 738 = ?',
      answer: 34467,
      hints: [
        '5 không trừ được 8, em lấy 15 trừ 8, nhớ 1.',
        'Hàng nào chữ số trên bé hơn thì lấy thêm 10, rồi nhớ 1 vào số trừ ở hàng bên trái.',
      ],
      solution:
        '5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1. 3 thêm 1 bằng 4, 0 không trừ được 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1. 7 thêm 1 bằng 8, 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4, nhớ 1. 6 thêm 1 bằng 7, 1 không trừ được 7, lấy 11 trừ 7 bằng 4, viết 4, nhớ 1. 4 thêm 1 bằng 5, 8 trừ 5 bằng 3, viết 3. Vậy 81 205 − 46 738 = 34 467.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị biểu thức: 8 647 + 6 500 − 13 217 = ?',
      answer: 1930,
      hints: ['Em tính từ trái sang phải.', 'Trước hết em tính 8 647 + 6 500.'],
      solution: '8 647 + 6 500 = 15 147. 15 147 − 13 217 = 1 930.',
    },
    {
      type: 'choice',
      prompt: 'Để thử lại phép trừ 52 600 − 18 245 = 34 355, em làm phép tính nào?',
      options: ['34 355 + 18 245', '52 600 + 18 245', '52 600 + 34 355'],
      answer: 0,
      hints: ['Hiệu cộng với số trừ thì được số bị trừ.'],
      solution:
        'Em lấy hiệu cộng số trừ: 34 355 + 18 245 = 52 600, đúng bằng số bị trừ. Vậy phép trừ đã tính đúng.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['25 000 + 8 000', '50 000 − 19 000', '12 500 + 20 000', '40 000 − 6 000'],
      answer: [1, 2, 0, 3],
      hints: ['Em tính nhẩm kết quả của từng phép tính.', 'Rồi em so sánh các kết quả.'],
      solution:
        '50 000 − 19 000 = 31 000. 12 500 + 20 000 = 32 500. 25 000 + 8 000 = 33 000. 40 000 − 6 000 = 34 000. Thứ tự từ bé đến lớn: 31 000, 32 500, 33 000, 34 000.',
    },
    {
      type: 'number',
      prompt:
        'Nhà máy làm được 35 600 chai nước. Ngày thứ nhất bán 12 450 chai, ngày thứ hai bán 9 800 chai. Hỏi nhà máy còn lại bao nhiêu chai nước?',
      answer: 13350,
      hints: [
        'Trước hết em tìm số chai còn lại sau ngày thứ nhất.',
        'Rồi em trừ tiếp số chai bán ngày thứ hai.',
      ],
      solution:
        'Sau ngày thứ nhất còn lại: 35 600 − 12 450 = 23 150 (chai). Sau ngày thứ hai còn lại: 23 150 − 9 800 = 13 350 (chai).',
    },
    {
      type: 'choice',
      prompt:
        'Kho thứ nhất có 48 250 kg thóc. Kho thứ hai có ít hơn kho thứ nhất 5 600 kg thóc. Kho thứ hai có bao nhiêu ki-lô-gam thóc?',
      options: ['42 650 kg', '53 850 kg', '42 250 kg'],
      answer: 0,
      hints: ['"Ít hơn" thì em làm phép trừ.', 'Em tính 48 250 − 5 600.'],
      solution: 'Kho thứ hai có: 48 250 − 5 600 = 42 650 (kg). Đáp số: 42 650 kg thóc.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 100 000 − 30 000 + 5 000 = ?',
      options: ['75 000', '65 000', '35 000'],
      answer: 0,
      hints: ['Em tính từ trái sang phải.', '100 000 là 10 chục nghìn.'],
      solution: '100 000 − 30 000 = 70 000. 70 000 + 5 000 = 75 000.',
    },
  ],
  takeaways: [
    'Cộng, trừ theo cột: đặt thẳng hàng, tính từ phải sang trái, nhớ đúng chỗ.',
    'Biểu thức có ngoặc: tính trong ngoặc trước; không có ngoặc: tính từ trái sang phải.',
    'Thử lại phép trừ: hiệu + số trừ = số bị trừ.',
  ],
};
