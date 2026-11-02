/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần; phân biệt gấp lên một số lần với thêm một số đơn vị.',
  intro:
    'Con 9 tuổi. Tuổi bố gấp 4 lần tuổi con. Bố bao nhiêu tuổi? Em dùng băng giấy để xem "gấp lên" nghĩa là gì nhé!',
  objectives: [
    'Biết cách gấp một số lên một số lần.',
    'Phân biệt gấp lên một số lần và thêm một số đơn vị.',
    'Giải bài toán có gấp lên một số lần.',
  ],
  sections: [
    {
      heading: 'Gấp một số lên một số lần',
      blocks: [
        { type: 'p', text: 'Một băng giấy dài 6 cm. Em lấy 3 băng như thế, xếp nối nhau.' },
        { type: 'p', text: 'Băng mới dài: 6 + 6 + 6 = 18 (cm). Em viết gọn: 6 × 3 = 18.' },
        { type: 'p', text: 'Ta nói: 6 gấp lên 3 lần được 18.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần.',
        },
      ],
    },
    {
      heading: 'Gấp lên và thêm vào',
      blocks: [
        { type: 'p', text: 'Hai cách nói này khác nhau. Em đừng nhầm nhé.' },
        {
          type: 'table',
          head: ['Cách nói', 'Phép tính', 'Kết quả'],
          rows: [
            ['6 gấp lên 3 lần', '6 × 3', '18'],
            ['6 thêm 3 đơn vị', '6 + 3', '9'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Nhân bản băng giấy',
    instruction:
      'Em bấm "Nhân bản thêm một băng" cho đủ số lần. Xem băng dài ra và phép tính thay đổi. Khi đúng, em so sánh với cách thêm đơn vị. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Con 9 tuổi. Tuổi bố gấp 4 lần tuổi con. Hỏi bố bao nhiêu tuổi?',
      steps: ['Tuổi bố là 9 gấp lên 4 lần.', 'Em làm phép nhân: 9 × 4 = 36.'],
      answer: 'Bố 36 tuổi.',
    },
    {
      problem: 'Gấp 15 lên 4 lần được mấy? Thêm 4 đơn vị vào 15 được mấy?',
      steps: ['Gấp lên 4 lần: 15 × 4 = 60.', 'Thêm 4 đơn vị: 15 + 4 = 19.'],
      answer: 'Gấp lên được 60. Thêm vào được 19.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Gấp 10 lên 5 lần được mấy?',
      answer: 50,
      hints: ['Gấp lên một số lần thì em làm phép nhân.'],
      solution: '10 × 5 = 50.',
    },
    {
      type: 'number',
      prompt: 'Gấp 24 lên 3 lần được mấy?',
      answer: 72,
      hints: ['Em đặt tính 24 × 3.', '3 nhân 4 bằng 12, viết 2, nhớ 1.'],
      solution:
        '3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7. Vậy 24 × 3 = 72.',
    },
    {
      type: 'choice',
      prompt: 'Thêm 8 đơn vị vào 6 được mấy?',
      options: ['14', '48', '2', '68'],
      answer: 0,
      hints: ['Thêm vào thì em làm phép cộng.'],
      solution: '6 + 8 = 14.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách nói với kết quả đúng.',
      left: ['7 gấp lên 5 lần', '7 thêm 5 đơn vị', '16 gấp lên 2 lần', '16 thêm 2 đơn vị'],
      right: ['35', '12', '32', '18'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Gấp lên là nhân. Thêm là cộng.'],
      solution: '7 × 5 = 35. 7 + 5 = 12. 16 × 2 = 32. 16 + 2 = 18.',
    },
    {
      type: 'choice',
      prompt: 'Gấp 9 lên 2 lần. Em làm phép tính nào?',
      options: ['9 × 2', '9 + 2', '9 − 2', '9 : 2'],
      answer: 0,
      hints: ['Gấp lên một số lần là phép gì?'],
      solution: 'Muốn gấp 9 lên 2 lần, em lấy 9 nhân với 2: 9 × 2 = 18.',
    },
    {
      type: 'number',
      prompt: 'Mai có 5 quả táo. Số táo của Hương gấp 3 lần số táo của Mai. Hương có mấy quả táo?',
      answer: 15,
      hints: ['Số táo của Hương là 5 gấp lên 3 lần.'],
      solution: '5 × 3 = 15. Hương có 15 quả táo.',
    },
    {
      type: 'number',
      prompt: 'Có 9 cái bàn, mỗi bàn xếp 2 cái ghế. Cần bao nhiêu cái ghế?',
      answer: 18,
      hints: ['Mỗi bàn có 2 cái ghế. Có 9 bàn như thế, nên 2 được lấy 9 lần.'],
      solution: '2 × 9 = 18. Cần 18 cái ghế.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 45?',
      options: ['15 × 3', '9 × 5', '23 × 2', '16 × 2'],
      answers: [0, 1],
      hints: ['Em tính từng phép nhân rồi so với 45.'],
      solution: '15 × 3 = 45. 9 × 5 = 45. 23 × 2 = 46. 16 × 2 = 32.',
    },
  ],
  takeaways: [
    'Gấp một số lên một số lần: lấy số đó nhân với số lần.',
    'Thêm một số đơn vị: lấy số đó cộng với số đơn vị.',
  ],
};
