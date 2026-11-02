const WORDS = ['Chắc chắn', 'Có thể', 'Không thể'];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập kiểm đếm số liệu và lựa chọn khả năng lớp 2: đếm theo từng loại, vạch kiểm đếm, biểu đồ tranh và các từ chắc chắn, có thể, không thể.',
  intro:
    'Rô-bốt cắt giấy màu thành hình vuông, hình tròn, hình tam giác. Mỗi loại có mấy hình? Rút bóng trong hộp thì chắc chắn được màu nào? Hôm nay em ôn lại cách kiểm đếm và nói về khả năng nhé!',
  objectives: [
    'Đếm số lượng theo từng loại, đọc và ghi vạch kiểm đếm.',
    'Đọc biểu đồ tranh, tìm loại nhiều nhất, ít nhất.',
    'Dùng đúng các từ chắc chắn, có thể, không thể.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Kiểm đếm',
      blocks: [
        {
          type: 'p',
          text: 'Em đếm từng loại riêng. Cứ 5 vạch, em bó lại thành một bó.',
        },
        {
          type: 'table',
          head: ['Vạch', 'Số'],
          rows: [
            ['1 bó 5 vạch', '5'],
            ['1 bó 5 vạch và 3 vạch', '8'],
            ['2 bó 5 vạch', '10'],
            ['3 bó 5 vạch và 1 vạch', '16'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biểu đồ tranh',
          text: 'Mỗi hàng là một loại. Hàng có nhiều hình nhất là loại nhiều nhất.',
        },
      ],
    },
    {
      heading: 'Chắc chắn, có thể, không thể',
      blocks: [
        {
          type: 'table',
          head: ['Từ', 'Nghĩa'],
          rows: [
            ['Chắc chắn', 'Việc đó luôn luôn xảy ra'],
            ['Có thể', 'Việc đó lúc thì xảy ra, lúc thì không'],
            ['Không thể', 'Việc đó không bao giờ xảy ra'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Khi lấy 2 quả bóng, em nghĩ đến mọi cách lấy, rồi mới chọn từ.',
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
      problem:
        'Cửa hàng bán 36 quả cam, 50 quả táo và 42 quả xoài. Loại quả nào nhiều nhất? Loại quả nào ít nhất?',
      steps: ['So sánh ba số: 36 < 42 < 50.', 'Số lớn nhất là 50. Số bé nhất là 36.'],
      answer: 'Táo nhiều nhất. Cam ít nhất.',
    },
    {
      problem:
        'Hộp có 2 quả bóng xanh và 1 quả bóng đỏ. Rô-bốt lấy 2 quả, không nhìn. Trong 2 quả có bóng xanh là việc thế nào?',
      steps: [
        'Các cách lấy: xanh và xanh, hoặc xanh và đỏ.',
        'Cách nào cũng có bóng xanh, vì hộp chỉ có 1 quả bóng đỏ.',
      ],
      answer: 'Chắc chắn trong 2 quả có bóng xanh.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Rô-bốt dán các ngôi sao lên cây. Có bao nhiêu ngôi sao?',
      picture: 'star',
      answer: 14,
      choices: [12, 14, 16],
      hints: ['Em đếm từng ngôi sao, đếm đến đâu nhớ đến đó.'],
      solution: 'Có 14 ngôi sao.',
    },
    {
      type: 'number',
      prompt: 'Việt ghi được 2 bó 5 vạch và 3 vạch. Việt đếm được bao nhiêu con gà?',
      answer: 13,
      hints: ['Mỗi bó có 5 vạch. Em cộng hai bó, rồi cộng các vạch lẻ.'],
      solution: '5 + 5 + 3 = 13. Việt đếm được 13 con gà.',
    },
    {
      type: 'match',
      prompt: 'Nối vạch kiểm đếm với số.',
      left: ['1 bó 5 vạch và 2 vạch', '2 bó 5 vạch và 4 vạch', '3 bó 5 vạch', '4 vạch'],
      right: ['7', '14', '15', '4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mỗi bó có 5 vạch. Em đếm thêm 5 cho mỗi bó.'],
      solution: '5 + 2 = 7. 5 + 5 + 4 = 14. 5 + 5 + 5 = 15. 4 vạch là 4.',
    },
    {
      type: 'choice',
      prompt: 'Mai đếm được 24 xe đạp, 38 xe máy và 19 ô tô. Loại xe nào nhiều nhất?',
      options: ['Xe đạp', 'Xe máy', 'Ô tô'],
      answer: 1,
      hints: ['Em so sánh ba số và tìm số lớn nhất.'],
      solution: '38 là số lớn nhất, nên xe máy nhiều nhất.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn số xe đó: 24 xe đạp, 38 xe máy và 19 ô tô. Số xe máy nhiều hơn số ô tô bao nhiêu xe?',
      answer: 19,
      unit: 'xe',
      hints: ['Em lấy số xe máy trừ số ô tô.'],
      solution: '38 − 19 = 19. Số xe máy nhiều hơn số ô tô 19 xe.',
    },
    {
      type: 'order',
      prompt: 'Xếp các tổ theo số cây trồng được, từ ít đến nhiều.',
      items: ['Tổ Một: 12 cây', 'Tổ Hai: 9 cây', 'Tổ Ba: 15 cây', 'Tổ Bốn: 11 cây'],
      answer: [1, 3, 0, 2],
      hints: ['Em tìm số bé nhất trước, rồi đến các số tiếp theo.'],
      solution: '9 < 11 < 12 < 15. Thứ tự là Tổ Hai, Tổ Bốn, Tổ Một, Tổ Ba.',
    },
    {
      type: 'number',
      prompt:
        'Trong biểu đồ tranh, mỗi hình là 1 con vật. Hàng gà có 6 hình, hàng vịt có 4 hình, hàng ngan có 2 hình. Có tất cả bao nhiêu con?',
      answer: 12,
      unit: 'con',
      hints: ['Em cộng số hình ở cả ba hàng.'],
      solution: '6 + 4 + 2 = 12. Có tất cả 12 con.',
    },
    {
      type: 'choice',
      prompt: 'Hộp có 4 quả bóng đỏ. Lấy 1 quả, không nhìn. Lấy được bóng đỏ là việc thế nào?',
      options: WORDS,
      answer: 0,
      hints: ['Trong hộp có màu nào khác không?'],
      solution: 'Trong hộp toàn bóng đỏ, nên chắc chắn lấy được bóng đỏ.',
    },
    {
      type: 'choice',
      prompt:
        'Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy 1 quả, không nhìn. Lấy được bóng xanh là việc thế nào?',
      options: WORDS,
      answer: 1,
      hints: ['Trong hộp có bóng xanh không? Còn màu nào khác không?'],
      solution: 'Hộp có bóng xanh và cả bóng đỏ, nên có thể lấy được bóng xanh.',
    },
    {
      type: 'choice',
      prompt: 'Vẫn hộp đó: 3 quả đỏ và 2 quả xanh. Lấy được bóng vàng là việc thế nào?',
      options: WORDS,
      answer: 2,
      hints: ['Trong hộp có bóng vàng không?'],
      solution: 'Trong hộp không có bóng vàng, nên không thể lấy được bóng vàng.',
    },
    {
      type: 'choice',
      prompt:
        'Hộp có 3 quả bóng xanh và 1 quả bóng vàng. Lấy 2 quả, không nhìn. Cả 2 quả đều là bóng vàng là việc thế nào?',
      options: WORDS,
      answer: 2,
      hints: ['Hộp có đủ 2 quả bóng vàng không?'],
      solution: 'Hộp chỉ có 1 quả bóng vàng, nên không thể lấy được 2 quả bóng vàng.',
    },
    {
      type: 'choice',
      prompt:
        'Có 3 thẻ số 2, 5, 7. Rút một thẻ, không nhìn. Số trên thẻ lớn hơn 1 là việc thế nào?',
      options: WORDS,
      answer: 0,
      hints: ['Em so sánh từng thẻ với số 1.'],
      solution: 'Thẻ nào cũng có số lớn hơn 1, nên chắc chắn.',
    },
  ],
  takeaways: [
    'Đếm từng loại riêng. Cứ 5 vạch bó lại một bó.',
    'Biểu đồ tranh: hàng có nhiều hình nhất là loại nhiều nhất.',
    'Luôn xảy ra là chắc chắn. Lúc có lúc không là có thể. Không bao giờ xảy ra là không thể.',
  ],
};
