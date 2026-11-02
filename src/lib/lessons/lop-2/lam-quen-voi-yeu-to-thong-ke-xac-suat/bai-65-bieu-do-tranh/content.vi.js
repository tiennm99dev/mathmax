/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đọc biểu đồ tranh: mỗi hình là một đồ vật, đếm hình để biết số lượng, so sánh các hàng để trả lời câu hỏi.',
  intro:
    'Các bạn xếp ô tô cùng màu thẳng thành từng cột. Chỉ cần nhìn là biết màu nào nhiều nhất! Hình như thế gọi là biểu đồ tranh.',
  objectives: [
    'Nhận biết biểu đồ tranh.',
    'Đọc số lượng mỗi loại trên biểu đồ tranh.',
    'Trả lời câu hỏi: loại nào nhiều nhất, ít nhất, nhiều hơn mấy.',
  ],
  sections: [
    {
      heading: 'Biểu đồ tranh là gì?',
      blocks: [
        {
          type: 'p',
          text: 'Mai có nhiều ô tô đủ màu, để lộn xộn nên khó đếm. Mai xếp ô tô cùng màu vào một cột.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu đồ tranh',
          text: 'Hình xếp đồ vật hoặc hình vẽ thành từng cột hay từng hàng theo loại gọi là biểu đồ tranh.',
        },
        {
          type: 'p',
          text: 'Cột nào cao hơn, hàng nào dài hơn thì loại đó nhiều hơn.',
        },
        { type: 'widget', name: 'san-nha-bac-ba' },
      ],
    },
    {
      heading: 'Cách đọc biểu đồ tranh',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xem biểu đồ nói về đồ vật gì, có mấy loại.',
            'Đếm số hình của mỗi loại.',
            'So sánh các số để trả lời câu hỏi.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi hình là một đồ vật. Muốn biết nhiều hơn mấy, em lấy số lớn trừ số bé.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xây và đọc biểu đồ tranh',
    instruction:
      'Xây biểu đồ: kéo hình vào đúng hàng, hoặc chạm vào hình để thêm. Chạm "−" để bớt. Đọc biểu đồ: nhìn biểu đồ rồi chạm vào đáp án.',
  },
  examples: [
    {
      problem:
        'Việt cắt được các hình. Hình vuông: 🟦🟦🟦🟦🟦🟦. Hình tròn: 🔴🔴🔴🔴🔴🔴🔴🔴. Hình tam giác: 🔺🔺🔺🔺. Hình chữ nhật: ▬▬▬▬▬. Hình nào nhiều nhất, hình nào ít nhất?',
      steps: [
        'Đếm hình vuông: 6. Hình tròn: 8.',
        'Đếm hình tam giác: 4. Hình chữ nhật: 5.',
        'So sánh: 4 < 5 < 6 < 8.',
      ],
      answer: 'Hình tròn nhiều nhất, hình tam giác ít nhất.',
    },
    {
      problem:
        'Biểu đồ về hoa. Hoa hồng: 🌹🌹🌹🌹🌹🌹. Hoa cúc: 🌼🌼🌼🌼. Hoa hướng dương: 🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻. Có tất cả mấy bông hoa? Hoa hồng nhiều hơn hoa cúc mấy bông?',
      steps: [
        'Đếm: 6 bông hoa hồng, 4 bông hoa cúc, 10 bông hoa hướng dương.',
        'Tất cả: 6 + 4 + 10 = 20.',
        'Hoa hồng nhiều hơn hoa cúc: 6 − 4 = 2.',
      ],
      answer: 'Có 20 bông hoa. Hoa hồng nhiều hơn hoa cúc 2 bông.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Hàng quả táo trên biểu đồ tranh có các hình này. Có mấy quả táo?',
      picture: 'apple',
      answer: 6,
      choices: [4, 5, 6, 7],
      hints: ['Mỗi hình là một quả táo. Em đếm từng hình.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu. Có 6 quả táo.',
    },
    {
      type: 'choice',
      prompt:
        'Biểu đồ về sân nhà bác Ba. Gà: 🐔🐔🐔🐔🐔🐔🐔🐔. Ngỗng: 🦢🦢🦢🦢🦢. Vịt: 🦆🦆🦆🦆🦆🦆. Con vật nào nhiều nhất?',
      options: ['Gà', 'Ngỗng', 'Vịt'],
      answer: 0,
      hints: ['Em đếm số hình của mỗi con vật. Số nào lớn nhất?'],
      solution: 'Có 8 con gà, 5 con ngỗng, 6 con vịt. Gà nhiều nhất.',
    },
    {
      type: 'number',
      prompt: 'Gà: 🐔🐔🐔🐔🐔🐔🐔🐔. Ngỗng: 🦢🦢🦢🦢🦢. Gà nhiều hơn ngỗng mấy con?',
      answer: 3,
      hints: ['Em đếm số gà, số ngỗng.', 'Em lấy số lớn trừ số bé.'],
      solution: '8 − 5 = 3. Gà nhiều hơn ngỗng 3 con.',
    },
    {
      type: 'number',
      prompt: 'Ngỗng: 🦢🦢🦢🦢🦢. Vịt: 🦆🦆🦆🦆🦆🦆. Ngỗng ít hơn vịt mấy con?',
      answer: 1,
      hints: ['Em đếm số ngỗng, số vịt rồi lấy số lớn trừ số bé.'],
      solution: '6 − 5 = 1. Ngỗng ít hơn vịt 1 con.',
    },
    {
      type: 'order',
      prompt: 'Gà có 8 con, ngỗng có 5 con, vịt có 6 con. Xếp từ ít nhất đến nhiều nhất.',
      items: ['Gà', 'Ngỗng', 'Vịt'],
      answer: [1, 2, 0],
      hints: ['Em so sánh ba số 8, 5, 6.'],
      solution: '5 < 6 < 8: ngỗng, vịt, gà.',
    },
    {
      type: 'choice',
      prompt:
        'Búp bê: 🪆🪆🪆🪆🪆🪆🪆. Gấu bông: 🧸🧸🧸🧸🧸. Sóc bông: 🐿️🐿️🐿️🐿️🐿️🐿️🐿️. Hai loại nào có số lượng bằng nhau?',
      options: ['Búp bê và sóc bông', 'Búp bê và gấu bông', 'Gấu bông và sóc bông'],
      answer: 0,
      hints: ['Em đếm mỗi loại. Hai loại nào có cùng số hình?'],
      solution: 'Búp bê có 7, sóc bông có 7, gấu bông có 5. Số búp bê bằng số sóc bông.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ về quả trong giỏ. Táo: 🍎🍎🍎. Cam: 🍊🍊🍊🍊🍊. Chuối: 🍌🍌. Có tất cả mấy quả?',
      answer: 10,
      hints: ['Em đếm mỗi loại rồi cộng các số lại.'],
      solution: '3 + 5 + 2 = 10. Có tất cả 10 quả.',
    },
    {
      type: 'match',
      prompt:
        'Mỗi bó có 10 que tính. Hộp A có 4 bó, hộp B có 8 bó, hộp C có 6 bó. Nối mỗi hộp với số que tính.',
      left: ['Hộp A', 'Hộp B', 'Hộp C'],
      right: ['60 que', '40 que', '80 que'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Mỗi bó là 10 que. Em đếm thêm 10: 10, 20, 30, ...'],
      solution: 'Hộp A có 40 que, hộp B có 80 que, hộp C có 60 que.',
    },
  ],
  takeaways: [
    'Biểu đồ tranh xếp hình theo từng cột hay từng hàng.',
    'Mỗi hình là một đồ vật: em đếm hình để biết số lượng.',
    'Cột cao nhất, hàng dài nhất là loại nhiều nhất.',
    'Nhiều hơn mấy: lấy số lớn trừ số bé.',
  ],
};
