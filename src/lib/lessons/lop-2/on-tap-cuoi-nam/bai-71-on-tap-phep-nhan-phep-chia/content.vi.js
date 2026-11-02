/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép nhân, phép chia lớp 2: bảng nhân, bảng chia 2 và 5, viết tích thành tổng, tên các số, lập phép chia từ phép nhân và giải bài toán.',
  intro:
    'Em đã biết bảng nhân và bảng chia 2, 5. Hôm nay em ôn lại phép nhân, phép chia qua hình vẽ và bài toán. Bài ôn tập sẽ cho em biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm trong bảng nhân, bảng chia 2 và 5.',
    'Viết phép nhân từ tổng các số bằng nhau và từ hình vẽ.',
    'Gọi đúng tên các số trong phép nhân, phép chia.',
    'Lập phép chia từ phép nhân, giải bài toán.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Phép nhân',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Tổng các số bằng nhau',
          text: '4 + 4 + 4 = 12. 4 được lấy 3 lần, nên 4 × 3 = 12.',
        },
        {
          type: 'p',
          text: 'Trong 4 × 3 = 12: 4 và 3 là thừa số, 12 là tích.',
        },
      ],
    },
    {
      heading: 'Phép chia',
      blocks: [
        {
          type: 'p',
          text: 'Trong 12 : 3 = 4: 12 là số bị chia, 3 là số chia, 4 là thương.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Từ một phép nhân, em lập được hai phép chia: 4 × 3 = 12 cho 12 : 4 = 3 và 12 : 3 = 4.',
        },
      ],
    },
    {
      heading: 'Bảng nhân và bảng chia',
      blocks: [
        {
          type: 'table',
          head: ['Phép nhân', 'Phép chia'],
          rows: [
            ['2 × 3 = 6', '6 : 2 = 3'],
            ['2 × 6 = 12', '12 : 2 = 6'],
            ['2 × 9 = 18', '18 : 2 = 9'],
            ['5 × 3 = 15', '15 : 5 = 3'],
            ['5 × 6 = 30', '30 : 5 = 6'],
            ['5 × 9 = 45', '45 : 5 = 9'],
          ],
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'table',
          head: ['Bài toán nói', 'Em làm'],
          rows: [
            ['Mỗi nhóm có ... Hỏi mấy nhóm có bao nhiêu?', 'Phép nhân'],
            ['Chia đều, mỗi phần được bao nhiêu?', 'Phép chia'],
            ['Mỗi nhóm có ... Hỏi được mấy nhóm?', 'Phép chia'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Viết tích thành tổng rồi tính: 6 × 5.',
      steps: ['6 × 5 là 6 được lấy 5 lần.', '6 + 6 + 6 + 6 + 6 = 30.'],
      answer: '6 × 5 = 30.',
    },
    {
      problem:
        'Cô giáo mua 15 hộp bánh trung thu, chia đều cho 5 tổ. Hỏi mỗi tổ được mấy hộp bánh?',
      steps: [
        'Chia đều thì em làm phép chia: 15 : 5.',
        'Bài giải: Mỗi tổ được số hộp bánh là: 15 : 5 = 3 (hộp).',
      ],
      answer: 'Đáp số: 3 hộp bánh.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi tổng với phép nhân của nó.',
      left: ['3 + 3 + 3 + 3', '9 + 9', '6 + 6 + 6', '5 + 5 + 5 + 5 + 5'],
      right: ['3 × 4', '9 × 2', '6 × 3', '5 × 5', '2 × 9'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Số được cộng viết trước, số lần lấy viết sau.'],
      solution:
        '3 + 3 + 3 + 3 = 3 × 4. 9 + 9 = 9 × 2. 6 + 6 + 6 = 6 × 3. 5 + 5 + 5 + 5 + 5 = 5 × 5.',
    },
    {
      type: 'count',
      prompt: 'Có 2 hàng, mỗi hàng 5 ngôi sao. Em đếm xem có tất cả mấy ngôi sao?',
      picture: 'star',
      answer: 10,
      choices: [7, 10, 12],
      hints: ['5 được lấy 2 lần.'],
      solution: '5 × 2 = 10. Có 10 ngôi sao.',
    },
    {
      type: 'number',
      prompt: '5 × 7 = ?',
      answer: 35,
      hints: ['Em đọc lại bảng nhân 5.'],
      solution: '5 × 7 = 35.',
    },
    {
      type: 'number',
      prompt: '16 : 2 = ?',
      answer: 8,
      hints: ['2 nhân với mấy thì bằng 16?'],
      solution: 'Vì 2 × 8 = 16 nên 16 : 2 = 8.',
    },
    {
      type: 'choice',
      prompt: 'Từ 5 × 4 = 20, em có 20 : 4 = ?',
      options: ['4', '5', '16'],
      answer: 1,
      hints: ['Lấy tích chia cho thừa số này thì được thừa số kia.'],
      solution: '5 × 4 = 20, nên 20 : 4 = 5 và 20 : 5 = 4.',
    },
    {
      type: 'match',
      prompt: 'Mỗi chú ong đậu vào bông hoa có cùng kết quả. Em nối phép nhân với phép chia.',
      left: ['2 × 3', '2 × 5', '2 × 2', '2 × 4'],
      right: ['12 : 2', '20 : 2', '8 : 2', '16 : 2', '14 : 2'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính kết quả của từng phép tính.'],
      solution: '2 × 3 = 6 = 12 : 2. 2 × 5 = 10 = 20 : 2. 2 × 2 = 4 = 8 : 2. 2 × 4 = 8 = 16 : 2.',
    },
    {
      type: 'number',
      prompt: 'Mỗi chùm có 5 quả dừa. Hỏi 4 chùm như thế có bao nhiêu quả dừa?',
      answer: 20,
      unit: 'quả',
      hints: ['5 quả được lấy 4 lần, em làm phép nhân.'],
      solution: '4 chùm có số quả dừa là: 5 × 4 = 20 (quả). Đáp số: 20 quả dừa.',
    },
    {
      type: 'number',
      prompt: 'Mỗi lượt múa rồng có 2 đội. Hỏi 4 lượt múa rồng có bao nhiêu đội tham gia?',
      answer: 8,
      unit: 'đội',
      hints: ['2 đội được lấy 4 lần, em làm phép nhân.'],
      solution: '4 lượt múa rồng có số đội là: 2 × 4 = 8 (đội). Đáp số: 8 đội.',
    },
    {
      type: 'number',
      prompt:
        'Bác thợ mộc có thanh gỗ dài 20 dm, cắt thành 5 đoạn dài bằng nhau. Hỏi mỗi đoạn dài mấy đề-xi-mét?',
      answer: 4,
      unit: 'dm',
      hints: ['Cắt thành các đoạn bằng nhau là chia đều, em làm phép chia.'],
      solution: 'Mỗi đoạn gỗ dài là: 20 : 5 = 4 (dm). Đáp số: 4 dm.',
    },
    {
      type: 'number',
      prompt: 'Mỗi lượt đua thuyền có 5 thuyền. Hỏi 3 lượt đua có bao nhiêu thuyền tham gia?',
      answer: 15,
      unit: 'thuyền',
      hints: ['5 thuyền được lấy 3 lần.'],
      solution: '3 lượt đua có số thuyền là: 5 × 3 = 15 (thuyền). Đáp số: 15 thuyền.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép chia 20 : 5 = 4, số 5 gọi là gì?',
      options: ['Số bị chia', 'Số chia', 'Thương'],
      answer: 1,
      hints: ['Số đứng trước dấu chia là số bị chia. Số đứng sau dấu chia là gì?'],
      solution: '20 là số bị chia, 5 là số chia, 4 là thương.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt đếm được 8 cái chân trong một chuồng có cả gà và thỏ. Trong chuồng có mấy con thỏ?',
      options: ['1 con', '2 con', '3 con'],
      answer: 0,
      hints: ['Mỗi con gà có 2 chân, mỗi con thỏ có 4 chân. Em thử với 1 con thỏ.'],
      solution:
        'Có 1 con thỏ thì còn 8 − 4 = 4 chân, đó là 2 con gà. Có 2 con thỏ thì hết 8 chân, không còn con gà nào. Vậy có 1 con thỏ.',
    },
  ],
  takeaways: [
    '3 × 4 là 3 được lấy 4 lần: 3 + 3 + 3 + 3.',
    'Thừa số × thừa số = tích. Số bị chia : số chia = thương.',
    'Từ một phép nhân, em lập được hai phép chia.',
    'Chia đều thì làm phép chia. Mỗi nhóm có bao nhiêu, mấy nhóm thì làm phép nhân.',
  ],
};
