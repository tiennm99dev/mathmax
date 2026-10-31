const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đếm đồ vật đến 10, đọc và viết các số 6, 7, 8, 9, 10, và biết thứ tự các số từ 0 đến 10.',
  intro:
    'Em đã biết đếm đến 5. Hôm nay em đếm tiếp: sáu, bảy, tám, chín, mười! Em sẽ đọc, viết các số 6, 7, 8, 9, 10 và xếp chúng theo thứ tự.',
  objectives: [
    'Đếm đúng số đồ vật trong một nhóm có đến 10 đồ vật.',
    'Đọc và viết các số 6, 7, 8, 9, 10.',
    'Biết thứ tự các số từ 0 đến 10.',
  ],
  sections: [
    {
      heading: 'Đếm đến 10',
      blocks: [
        {
          type: 'p',
          text: 'Em chạm vào từng đồ vật và đếm tiếp: sáu, bảy, tám, chín, mười.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Có 5 đồ vật rồi, em đếm tiếp từ năm: sáu, bảy, ... cho nhanh.',
        },
        {
          type: 'p',
          text: 'Số cuối cùng em đọc là số đồ vật trong nhóm.',
        },
      ],
    },
    {
      heading: 'Các số 6, 7, 8, 9, 10',
      blocks: [
        {
          type: 'table',
          head: ['Số', 'Đọc là', 'Số chấm'],
          rows: [
            ['6', 'sáu', '●●●●● ●'],
            ['7', 'bảy', '●●●●● ●●'],
            ['8', 'tám', '●●●●● ●●●'],
            ['9', 'chín', '●●●●● ●●●●'],
            ['10', 'mười', '●●●●● ●●●●●'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số 10',
          text: 'Số 10 đọc là "mười". Số 10 viết bằng hai chữ số: chữ số 1 đứng trước, chữ số 0 đứng sau.',
        },
      ],
    },
    {
      heading: 'Thứ tự các số',
      blocks: [
        {
          type: 'p',
          text: 'Khi đếm, em đọc các số theo thứ tự: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thêm 1',
          text: 'Mỗi số sau nhiều hơn số trước 1 đơn vị. 6 thêm 1 là 7, 7 thêm 1 là 8.',
        },
        {
          type: 'p',
          text: 'Đếm ngược lại: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khung mười ô',
    instruction:
      'Chạm vào ô để thêm một chấm tròn, chạm lần nữa để bỏ chấm. Em xem số tương ứng và vị trí của nó trên dãy số. Chọn "Tạo số" để tạo đúng số được giao.',
  },
  examples: [
    {
      problem: 'Có mấy bông hoa: 🌸🌸🌸🌸🌸 🌸🌸 ?',
      steps: [
        'Nhóm đầu có 5 bông hoa.',
        'Đếm tiếp từ năm: sáu, bảy.',
        'Số cuối cùng em đọc là bảy.',
      ],
      answer: 'Có 7 bông hoa.',
    },
    {
      problem: 'Số nào còn thiếu: 6, 7, ?, 9, 10?',
      steps: ['Em đếm: sáu, bảy, ...', 'Sau 7 là 8, sau 8 là 9.'],
      answer: 'Số còn thiếu là 8.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả chuối?',
      picture: 'banana',
      answer: 7,
      choices: ZERO_TO_TEN,
      hints: ['Chạm từng quả chuối và đếm to.', 'Đếm đến năm rồi đếm tiếp: sáu, ...'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu, bảy. Có 7 quả chuối.',
    },
    {
      type: 'count',
      prompt: 'Có mấy ngôi sao?',
      picture: 'star',
      answer: 9,
      choices: ZERO_TO_TEN,
      hints: ['Đếm từ trái sang phải, mỗi ngôi sao một lần.'],
      solution: 'Đếm: một, hai, ..., tám, chín. Có 9 ngôi sao.',
    },
    {
      type: 'count',
      prompt: 'Có mấy quả bóng bay?',
      picture: 'balloon',
      answer: 10,
      choices: ZERO_TO_TEN,
      hints: ['Đếm chậm, đừng bỏ sót quả nào.', 'Sau chín là mười.'],
      solution: 'Đếm: một, hai, ..., chín, mười. Có 10 quả bóng bay.',
    },
    {
      type: 'count',
      prompt: 'Có mấy con gà con?',
      picture: 'chick',
      answer: 6,
      choices: ZERO_TO_TEN,
      hints: ['Chạm vào từng con gà con và đếm.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu. Có 6 con gà con.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc.',
      left: ['6', '7', '9'],
      right: ['chín', 'sáu', 'bảy', 'tám'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em nhớ lại bảng: 6 là sáu, 7 là bảy, 8 là tám, ...'],
      solution: '6 đọc là "sáu", 7 đọc là "bảy", 9 đọc là "chín".',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm, từ bé đến lớn.',
      items: ['8', '6', '10', '7', '9'],
      answer: [1, 3, 0, 4, 2],
      hints: ['Bắt đầu từ số 6.', 'Sau 6 là 7, sau 7 là 8.'],
      solution: 'Thứ tự đếm là 6, 7, 8, 9, 10.',
    },
    {
      type: 'choice',
      prompt: 'Số nào còn thiếu: 7, 8, ?, 10?',
      options: ['6', '9', '11'],
      answer: 1,
      hints: ['Em đếm: bảy, tám, ...'],
      solution: 'Sau 8 là 9, sau 9 là 10. Số còn thiếu là 9.',
    },
    {
      type: 'choice',
      prompt: 'Em có 5 cái kẹo. Mẹ cho thêm 1 cái. Em có mấy cái kẹo?',
      options: ['4', '5', '6'],
      answer: 2,
      hints: ['5 thêm 1 là số đứng ngay sau 5 khi đếm.'],
      solution: 'Đếm tiếp từ 5 thêm 1: sáu. Em có 6 cái kẹo.',
    },
  ],
  takeaways: [
    'Đếm tiếp sau năm: sáu, bảy, tám, chín, mười.',
    'Các số: 6 (sáu), 7 (bảy), 8 (tám), 9 (chín), 10 (mười).',
    'Số 10 viết bằng hai chữ số: 1 và 0.',
    'Thứ tự đếm: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
  ],
};
