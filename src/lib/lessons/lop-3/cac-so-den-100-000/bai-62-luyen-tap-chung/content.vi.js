/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về các số đến 100 000: đọc, viết số có năm chữ số, viết số thành tổng, so sánh, sắp xếp, làm tròn số đến hàng nghìn, hàng chục nghìn và giải bài toán.',
  intro:
    'Em đã biết số có năm chữ số, so sánh số và làm tròn số. Hôm nay em ôn lại tất cả và giải vài bài toán nhé!',
  objectives: [
    'Đọc, viết được các số trong phạm vi 100 000 và viết số thành tổng.',
    'So sánh, sắp xếp được các số trong phạm vi 100 000.',
    'Làm tròn được số đến hàng nghìn, hàng chục nghìn.',
    'Vận dụng vào bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Số', 'Đọc là', 'Viết thành tổng'],
          rows: [
            ['47 215', 'bốn mươi bảy nghìn hai trăm mười lăm', '40 000 + 7 000 + 200 + 10 + 5'],
            ['30 065', 'ba mươi nghìn không trăm sáu mươi lăm', '30 000 + 60 + 5'],
            ['81 408', 'tám mươi mốt nghìn bốn trăm linh tám', '80 000 + 1 000 + 400 + 8'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh',
          text: 'Số nào ít chữ số hơn thì bé hơn. Cùng số chữ số thì so sánh từ hàng chục nghìn sang phải.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Làm tròn',
          text: 'Đến hàng nghìn: nhìn chữ số hàng trăm. Đến hàng chục nghìn: nhìn chữ số hàng nghìn. Bé hơn 5 thì tròn xuống, còn lại thì tròn lên.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Chữ số 0 vẫn giữ chỗ của hàng: 30 065 có 0 nghìn và 0 trăm, đọc là ba mươi nghìn không trăm sáu mươi lăm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Em đọc câu hỏi rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem: 'Từ năm thẻ số 5, 0, 8, 0, 1, lập số lớn nhất và số bé nhất có năm chữ số.',
      steps: [
        'Số lớn nhất: xếp chữ số lớn nhất ở hàng chục nghìn, rồi giảm dần: 85 100.',
        'Số bé nhất: hàng chục nghìn không được là 0, nên chọn 1; các chữ số còn lại xếp tăng dần: 10 058.',
      ],
      answer: 'Số lớn nhất là 85 100, số bé nhất là 10 058.',
    },
    {
      problem:
        'Một thành phố có 46 820 học sinh tiểu học. Làm tròn đến hàng nghìn, thành phố có khoảng bao nhiêu học sinh tiểu học?',
      steps: [
        'Chữ số hàng trăm của 46 820 là 8.',
        '8 > 5 nên làm tròn lên.',
        'Làm tròn 46 820 đến hàng nghìn được 47 000.',
      ],
      answer: 'Khoảng 47 000 học sinh.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Em viết số: bảy mươi hai nghìn không trăm linh sáu.',
      answer: 72006,
      hints: ['"Không trăm" là 0 trăm, "linh" là 0 chục.'],
      solution:
        'Bảy mươi hai nghìn không trăm linh sáu gồm 7 chục nghìn, 2 nghìn, 0 trăm, 0 chục, 6 đơn vị: 72 006.',
    },
    {
      type: 'choice',
      prompt: 'Số 40 090 đọc là gì?',
      options: [
        'bốn mươi nghìn không trăm chín mươi',
        'bốn mươi nghìn chín trăm',
        'bốn mươi nghìn không trăm linh chín',
      ],
      answer: 0,
      hints: ['40 090 gồm 4 chục nghìn, 0 nghìn, 0 trăm, 9 chục, 0 đơn vị.'],
      solution:
        'Hai chữ số đầu đọc là bốn mươi nghìn. Hàng trăm là 0 nên đọc "không trăm"; 9 chục là chín mươi. Đọc: bốn mươi nghìn không trăm chín mươi.',
    },
    {
      type: 'number',
      prompt: '58 034 = 50 000 + 8 000 + ? + 4. Số còn thiếu là số nào?',
      answer: 30,
      hints: ['58 034 có 3 chục.'],
      solution:
        '58 034 gồm 5 chục nghìn, 8 nghìn, 0 trăm, 3 chục, 4 đơn vị. 58 034 = 50 000 + 8 000 + 30 + 4.',
    },
    {
      type: 'number',
      prompt: 'Số liền trước của 60 000 là số nào?',
      answer: 59999,
      hints: ['Số liền trước kém số đó 1 đơn vị.'],
      solution: '60 000 − 1 = 59 999.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ bé đến lớn.',
      items: ['47 210', '47 120', '4 721', '74 120'],
      answer: [2, 1, 0, 3],
      hints: ['4 721 có bốn chữ số nên bé nhất.', 'So sánh hàng chục nghìn của ba số còn lại.'],
      solution: '4 721 < 47 120 < 47 210 < 74 120.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 83 469 ? 83 496.',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hàng chục nghìn, hàng nghìn, hàng trăm giống nhau. Em nhìn hàng chục.'],
      solution: 'Hàng chục: 6 < 9. Vậy 83 469 < 83 496.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 36 728 đến hàng nghìn.',
      answer: 37000,
      hints: ['Chữ số hàng trăm là 7.'],
      solution: '7 > 5 nên làm tròn lên. 36 728 làm tròn đến hàng nghìn được 37 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 36 728 đến hàng chục nghìn.',
      answer: 40000,
      hints: ['Chữ số hàng nghìn là 6.'],
      solution: '6 > 5 nên làm tròn lên. 36 728 làm tròn đến hàng chục nghìn được 40 000.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với số làm tròn đến hàng chục nghìn của nó.',
      left: ['14 999', '25 000', '45 210', '64 800'],
      right: ['10 000', '30 000', '50 000', '60 000', '20 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Làm tròn đến hàng chục nghìn thì nhìn chữ số hàng nghìn.'],
      solution: '14 999 → 10 000. 25 000 → 30 000. 45 210 → 50 000. 64 800 → 60 000.',
    },
    {
      type: 'choice',
      prompt:
        'Thư viện tỉnh có 23 650 cuốn sách, thư viện huyện có 23 560 cuốn sách. Thư viện nào có nhiều sách hơn?',
      options: ['Thư viện tỉnh', 'Thư viện huyện', 'Bằng nhau'],
      answer: 0,
      hints: ['So sánh 23 650 và 23 560 ở hàng trăm.'],
      solution: 'Hàng trăm: 6 > 5 nên 23 650 > 23 560. Thư viện tỉnh có nhiều sách hơn.',
    },
    {
      type: 'number',
      prompt: 'Từ năm thẻ số 3, 0, 7, 0, 2, em lập số lớn nhất có năm chữ số.',
      answer: 73200,
      hints: ['Xếp chữ số lớn nhất ở hàng chục nghìn.', 'Các chữ số xếp giảm dần.'],
      solution: 'Xếp các chữ số giảm dần: 7, 3, 2, 0, 0. Số lớn nhất là 73 200.',
    },
    {
      type: 'number',
      prompt: 'Từ năm thẻ số 3, 0, 7, 0, 2, em lập số bé nhất có năm chữ số.',
      answer: 20037,
      hints: [
        'Hàng chục nghìn không được là chữ số 0.',
        'Chọn chữ số bé nhất khác 0 ở hàng chục nghìn.',
      ],
      solution:
        'Hàng chục nghìn là 2, chữ số bé nhất khác 0. Các chữ số còn lại 0, 0, 3, 7 xếp tăng dần: số bé nhất là 20 037.',
    },
  ],
  takeaways: [
    'Đọc, viết số từ hàng chục nghìn; chữ số 0 vẫn giữ chỗ của hàng.',
    'So sánh: đếm chữ số trước, rồi so sánh từ hàng chục nghìn.',
    'Làm tròn: bé hơn 5 thì tròn xuống, còn lại thì tròn lên.',
  ],
};
