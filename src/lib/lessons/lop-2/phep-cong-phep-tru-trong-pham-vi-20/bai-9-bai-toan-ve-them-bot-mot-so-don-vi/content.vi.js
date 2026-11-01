/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài toán về thêm, bớt một số đơn vị: thêm vào thì làm phép cộng, bớt đi thì làm phép trừ; tóm tắt và trình bày bài giải có câu lời giải, phép tính và đáp số.',
  intro:
    'Lọ hoa có 9 bông hoa. Việt cắm thêm 6 bông hoa. Lọ hoa có tất cả bao nhiêu bông? Em học cách giải và trình bày bài toán nhé!',
  objectives: [
    'Nhận ra bài toán thêm (dùng phép cộng) và bài toán bớt (dùng phép trừ).',
    'Tóm tắt bài toán.',
    'Trình bày bài giải: câu lời giải, phép tính, đáp số.',
  ],
  sections: [
    {
      heading: 'Bài toán thêm',
      blocks: [
        {
          type: 'p',
          text: 'Lọ hoa có 9 bông hoa. Việt cắm thêm 6 bông hoa. Hỏi lọ hoa có tất cả bao nhiêu bông hoa?',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tóm tắt',
          text: 'Có: 9 bông hoa. Thêm: 6 bông hoa. Có tất cả: ... bông hoa?',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bài giải',
          text: 'Số bông hoa có tất cả là: 9 + 6 = 15 (bông). Đáp số: 15 bông hoa.',
        },
        {
          type: 'p',
          text: 'Thêm vào thì số lượng nhiều lên. Em làm phép cộng.',
        },
      ],
    },
    {
      heading: 'Bài toán bớt',
      blocks: [
        {
          type: 'p',
          text: 'Trong bến có 15 ô tô. Có 4 ô tô rời bến. Hỏi trong bến còn lại bao nhiêu ô tô?',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tóm tắt',
          text: 'Có: 15 ô tô. Rời đi: 4 ô tô. Còn lại: ... ô tô?',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bài giải',
          text: 'Số ô tô còn lại là: 15 − 4 = 11 (ô tô). Đáp số: 11 ô tô.',
        },
        {
          type: 'p',
          text: 'Bớt đi (rời đi, bay đi, ăn hết, cho bạn) thì số lượng ít đi. Em làm phép trừ.',
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
            'Viết chữ "Bài giải".',
            'Viết câu lời giải, dựa vào câu hỏi: "Số ... có tất cả là:" hoặc "Số ... còn lại là:".',
            'Viết phép tính, tên đơn vị để trong ngoặc: 9 + 6 = 15 (bông).',
            'Viết đáp số: "Đáp số: 15 bông hoa."',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Câu chuyện tranh',
    instruction:
      'Đọc câu chuyện. Chạm "Thêm" để thêm hình, hoặc chạm vào hình để gạch bớt, cho đúng câu chuyện. Rồi chọn phép tính, chọn kết quả và xem bài giải.',
  },
  examples: [
    {
      problem:
        'Trên sân có 8 con gà con. Có thêm 5 con gà con chạy tới. Hỏi trên sân có tất cả bao nhiêu con gà con?',
      steps: [
        'Tóm tắt: Có 8 con gà con. Thêm 5 con gà con. Có tất cả: ... con gà con?',
        '"Thêm" nên em làm phép cộng: 8 + 5.',
        '8 + 2 = 10, 10 + 3 = 13. Vậy 8 + 5 = 13.',
        'Bài giải: Số con gà con có tất cả là: 8 + 5 = 13 (con).',
      ],
      answer: 'Đáp số: 13 con gà con.',
    },
    {
      problem: 'Mai có 18 quả táo. Mai cho bạn 6 quả. Hỏi Mai còn lại bao nhiêu quả táo?',
      steps: [
        'Tóm tắt: Có 18 quả táo. Cho bạn: 6 quả táo. Còn lại: ... quả táo?',
        '"Cho bạn" là bớt đi, nên em làm phép trừ: 18 − 6.',
        '18 − 6 = 12.',
        'Bài giải: Số quả táo Mai còn lại là: 18 − 6 = 12 (quả).',
      ],
      answer: 'Đáp số: 12 quả táo.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lọ hoa có 9 bông hoa. Việt cắm thêm 6 bông hoa. Em làm phép tính nào?',
      options: ['9 + 6', '9 − 6'],
      answer: 0,
      hints: ['"Cắm thêm" thì số hoa nhiều lên hay ít đi?'],
      solution: 'Cắm thêm thì số hoa nhiều lên, em làm phép cộng: 9 + 6 = 15.',
    },
    {
      type: 'count',
      prompt:
        'Trên sân có 8 con gà con. Có thêm 5 con gà con chạy tới. Hình vẽ tất cả số gà. Có tất cả mấy con gà con?',
      picture: 'chick',
      answer: 13,
      choices: [12, 13, 14],
      hints: ['Thêm vào thì em làm phép cộng: 8 + 5.'],
      solution: '8 + 5 = 13. Có tất cả 13 con gà con.',
    },
    {
      type: 'choice',
      prompt:
        'Trong bể có 17 con cá. Bố vớt 5 con cá sang bể khác. Hỏi trong bể còn lại bao nhiêu con cá?',
      options: ['12 con cá', '22 con cá', '11 con cá'],
      answer: 0,
      hints: ['Vớt đi là bớt đi. Em làm phép trừ.', 'Tính 17 − 5.'],
      solution: 'Số con cá còn lại là: 17 − 5 = 12 (con). Đáp số: 12 con cá.',
    },
    {
      type: 'count',
      prompt:
        'Lan có 16 quả bóng bay. 4 quả bị gió thổi bay mất. Hình vẽ những quả bóng còn lại. Lan còn lại mấy quả bóng bay?',
      picture: 'balloon',
      answer: 12,
      choices: [11, 12, 13],
      hints: ['Bay mất là bớt đi: em tính 16 − 4.'],
      solution: '16 − 4 = 12. Lan còn lại 12 quả bóng bay.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi câu chuyện với phép tính đúng.',
      left: [
        'Có 7 quả bóng, mua thêm 5 quả.',
        'Có 14 quả bóng, bay mất 3 quả.',
        'Có 12 quả bóng, mua thêm 3 quả.',
      ],
      right: ['7 + 5', '14 − 3', '12 + 3', '12 − 3'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Thêm thì cộng, bớt thì trừ.'],
      solution: 'Mua thêm 5 quả: 7 + 5. Bay mất 3 quả: 14 − 3. Mua thêm 3 quả: 12 + 3.',
    },
    {
      type: 'order',
      prompt:
        'Trên đĩa có 9 quả táo. Mẹ để thêm 4 quả táo. Xếp các dòng của bài giải theo đúng thứ tự.',
      items: ['Đáp số: 13 quả táo.', 'Số quả táo có tất cả là:', '9 + 4 = 13 (quả)'],
      answer: [1, 2, 0],
      hints: ['Câu lời giải viết trước, đáp số viết cuối cùng.'],
      solution: 'Số quả táo có tất cả là: 9 + 4 = 13 (quả). Đáp số: 13 quả táo.',
    },
    {
      type: 'choice',
      prompt: 'Trong vườn có 15 con bướm. 3 con bướm bay đi. Phép tính nào đúng?',
      options: ['15 − 3 = 12 (con)', '15 + 3 = 18 (con)', '15 − 3 = 13 (con)'],
      answer: 0,
      hints: ['Bay đi là bớt đi.', 'Tính lại 15 − 3 cho cẩn thận.'],
      solution: 'Số con bướm còn lại là: 15 − 3 = 12 (con). Đáp số: 12 con bướm.',
    },
    {
      type: 'choice',
      prompt: 'Đề bài có chữ "thêm", "chạy tới", "cắm thêm". Em thường làm phép tính gì?',
      options: ['Phép cộng', 'Phép trừ'],
      answer: 0,
      hints: ['Thêm vào thì số lượng nhiều lên hay ít đi?'],
      solution: 'Thêm vào thì số lượng nhiều lên, nên em làm phép cộng.',
    },
  ],
  takeaways: [
    'Thêm vào thì làm phép cộng. Bớt đi thì làm phép trừ.',
    'Bài giải gồm: câu lời giải, phép tính (đơn vị trong ngoặc) và đáp số.',
  ],
};
