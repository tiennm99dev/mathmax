const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung học kì 1: các số trong phạm vi 10, phép cộng, phép trừ trong phạm vi 10, các hình phẳng, các hình khối và vị trí.',
  intro:
    'Học kì 1 sắp kết thúc! Hôm nay em ôn lại tất cả: các số đến 10, phép cộng, phép trừ, các hình và vị trí. Em làm bài ôn tập để biết mình đã vững phần nào nhé!',
  objectives: [
    'Đếm, đọc, viết, so sánh và xếp thứ tự các số trong phạm vi 10.',
    'Tính cộng, trừ trong phạm vi 10 và giải bài toán nhỏ.',
    'Nhận ra các hình phẳng và các hình khối đã học.',
    'Nói đúng vị trí của đồ vật.',
  ],
  sections: [
    {
      heading: 'Các số trong phạm vi 10',
      blocks: [
        {
          type: 'p',
          text: 'Em đếm: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số nào đếm sau thì lớn hơn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'Dấu > đọc là "lớn hơn", dấu < đọc là "bé hơn", dấu = đọc là "bằng": 8 > 5, 5 < 8, 6 = 6.',
        },
      ],
    },
    {
      heading: 'Phép cộng, phép trừ',
      blocks: [
        {
          type: 'p',
          text: 'Thêm vào, gộp lại: em làm phép cộng. Bớt đi, còn lại: em làm phép trừ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng và trừ',
          text: 'Từ 3 + 5 = 8 ta có 8 − 5 = 3 và 8 − 3 = 5.',
        },
      ],
    },
    {
      heading: 'Hình và vị trí',
      blocks: [
        {
          type: 'p',
          text: 'Hình phẳng: hình vuông, hình tròn, hình tam giác, hình chữ nhật.',
        },
        {
          type: 'p',
          text: 'Hình khối: khối lập phương, khối hộp chữ nhật.',
        },
        {
          type: 'p',
          text: 'Từ chỉ vị trí: trên, dưới, bên trái, bên phải, trước, sau, ở giữa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu về số, phép tính, hình và vị trí. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Có 3 quả cam. Mẹ mua thêm 4 quả cam. Có tất cả mấy quả cam?',
      steps: [
        'Mua thêm là thêm vào: em làm phép cộng.',
        'Từ 3 em đếm thêm 4: bốn, năm, sáu, bảy.',
        '3 + 4 = 7.',
      ],
      answer: 'Có tất cả 7 quả cam.',
    },
    {
      problem: 'Chọn dấu đúng: 6 + 2 ... 9',
      steps: ['Tính trước: 6 + 2 = 8.', 'So sánh: 8 bé hơn 9.'],
      answer: '6 + 2 < 9.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy con cá?',
      picture: 'fish',
      answer: 9,
      choices: ZERO_TO_TEN,
      hints: ['Chạm vào từng con cá và đếm to.'],
      solution: 'Đếm từ một đến chín. Có 9 con cá.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 8 ... 5',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Khi đếm, số nào được đếm sau thì lớn hơn.'],
      solution: '8 được đếm sau 5, nên 8 lớn hơn 5: 8 > 5.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['7', '0', '10', '3'],
      answer: [1, 3, 0, 2],
      hints: ['Số nào bé nhất trong các số đã học?'],
      solution: 'Từ bé đến lớn: 0, 3, 7, 10.',
    },
    {
      type: 'choice',
      prompt: '10 gồm 6 và mấy?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Em nghĩ: 6 cộng mấy thì bằng 10?'],
      solution: '6 + 4 = 10, nên 10 gồm 6 và 4.',
    },
    {
      type: 'choice',
      prompt: '7 + 2 = ?',
      options: ['8', '9', '10'],
      answer: 1,
      hints: ['Từ 7 em đếm thêm 2.'],
      solution: 'Từ 7 đếm thêm 2: tám, chín. Vậy 7 + 2 = 9.',
    },
    {
      type: 'choice',
      prompt: '9 − 5 = ?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Em nghĩ: 5 cộng mấy thì bằng 9?'],
      solution: '5 + 4 = 9, nên 9 − 5 = 4.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['3 + 3', '10 − 2', '0 + 1', '5 − 5'],
      right: ['6', '8', '1', '0', '4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính từng phép tính.', 'Một số trừ đi chính nó thì bằng mấy?'],
      solution: '3 + 3 = 6. 10 − 2 = 8. 0 + 1 = 1. 5 − 5 = 0.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 4 + 4 ... 9 − 1',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Tính kết quả hai bên trước, rồi so sánh.'],
      solution: '4 + 4 = 8 và 9 − 1 = 8. Hai kết quả bằng nhau, nên 4 + 4 = 9 − 1.',
    },
    {
      type: 'choice',
      prompt: 'Hà có 5 cái nhãn vở. Hà cho bạn 2 cái. Hà còn lại mấy cái nhãn vở?',
      options: ['2', '3', '7'],
      answer: 1,
      hints: ['Cho bạn là bớt đi: em làm phép trừ.'],
      solution: '5 − 2 = 3. Hà còn lại 3 cái nhãn vở.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào có 2 cạnh dài và 2 cạnh ngắn?',
      options: ['Hình vuông', 'Hình chữ nhật', 'Hình tròn'],
      answer: 1,
      hints: ['Hình vuông có 4 cạnh dài bằng nhau.'],
      solution: 'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đồ vật có dạng hình tròn.',
      options: ['Đồng xu', 'Lá cờ Tổ quốc', 'Cái đĩa', 'Thước ê ke', 'Mặt đồng hồ'],
      answers: [0, 2, 4],
      hints: ['Đồ vật nào tròn đều, không có cạnh?'],
      solution:
        'Đồng xu, cái đĩa và mặt đồng hồ có dạng hình tròn. Lá cờ Tổ quốc là hình chữ nhật, thước ê ke là hình tam giác.',
    },
    {
      type: 'choice',
      prompt: 'Hộp sữa có dạng khối gì?',
      options: ['Khối lập phương', 'Khối hộp chữ nhật'],
      answer: 1,
      hints: ['Các mặt của hộp sữa có to bằng nhau hết không?'],
      solution: 'Hộp sữa có mặt là hình chữ nhật. Nó có dạng khối hộp chữ nhật.',
    },
    {
      type: 'choice',
      prompt:
        'Từ trái sang phải có: con mèo, con thỏ, con gà con. Con nào ở ngay bên phải con thỏ?',
      options: ['Con mèo', 'Con thỏ', 'Con gà con'],
      answer: 2,
      hints: ['Em tìm con thỏ trước, rồi nhìn sang phía tay phải.'],
      solution: 'Con mèo ở bên trái con thỏ. Con gà con ở ngay bên phải con thỏ.',
    },
  ],
  takeaways: [
    'Em đếm, so sánh và xếp thứ tự được các số đến 10.',
    'Thêm vào thì cộng, bớt đi thì trừ. Em tính nhẩm được trong phạm vi 10.',
    'Em gọi tên được các hình, các khối và nói đúng vị trí.',
  ],
};
