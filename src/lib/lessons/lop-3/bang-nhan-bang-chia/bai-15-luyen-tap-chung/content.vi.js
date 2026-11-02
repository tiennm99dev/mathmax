/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Bảng nhân, bảng chia: tính nhẩm với các bảng 6, 7, 8, 9, tìm thành phần trong phép nhân, phép chia, một phần mấy và bài toán thực tế.',
  intro:
    'Việt xếp 5 bàn, mỗi bàn 6 cái li. Mai cắm 45 bông hoa vào các lọ. Em dùng bảng nhân, bảng chia để giúp hai bạn nhé!',
  objectives: [
    'Tính nhẩm với các bảng nhân, bảng chia 6, 7, 8, 9.',
    'Tìm thừa số, số bị chia và số chia.',
    'Nhận biết và tìm một phần mấy.',
    'Giải bài toán thực tế bằng phép nhân, phép chia.',
  ],
  sections: [
    {
      heading: 'Bảng nhân và bảng chia',
      blocks: [
        { type: 'p', text: 'Từ một phép nhân, em có hai phép chia.' },
        { type: 'p', text: '6 × 4 = 24. Đổi chỗ: 4 × 6 = 24.' },
        { type: 'p', text: '24 : 6 = 4 và 24 : 4 = 6.' },
      ],
    },
    {
      heading: 'Tìm thành phần',
      blocks: [
        {
          type: 'table',
          head: ['Tìm', 'Cách làm'],
          rows: [
            ['Thừa số', 'Tích chia cho thừa số kia'],
            ['Số bị chia', 'Thương nhân với số chia'],
            ['Số chia', 'Số bị chia chia cho thương'],
          ],
        },
      ],
    },
    {
      heading: 'Một phần mấy',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia thành các phần bằng nhau, lấy 1 phần. Chia thành 5 phần thì đó là $\\dfrac{1}{5}$.',
        },
        {
          type: 'p',
          text: 'Có 18 con ếch. $\\dfrac{1}{6}$ số con ếch là 18 : 6 = 3 con.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại. Hết bộ, em xem phần nào cần ôn và làm bộ bài khác.',
  },
  examples: [
    {
      problem: 'Việt xếp 5 bàn, mỗi bàn 6 cái li. Việt xếp tất cả bao nhiêu cái li?',
      steps: ['6 cái li được lấy 5 lần.', 'Em làm phép nhân: 6 × 5 = 30.'],
      answer: 'Việt xếp tất cả 30 cái li.',
    },
    {
      problem: 'Mai có 45 bông hoa, cắm vào các lọ, mỗi lọ 9 bông. Mai cắm được mấy lọ?',
      steps: ['Chia 45 bông thành từng nhóm 9 bông.', 'Em làm phép chia: 45 : 9 = 5.'],
      answer: 'Mai cắm được 5 lọ.',
    },
    {
      problem: 'Có 18 con ếch. $\\dfrac{1}{9}$ số con ếch là mấy con?',
      steps: ['Chia 18 con thành 9 phần bằng nhau.', '18 : 9 = 2.'],
      answer: '$\\dfrac{1}{9}$ số con ếch là 2 con.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả đúng.',
      left: ['6 × 3', '7 × 5', '9 × 4', '8 × 10'],
      right: ['36', '80', '18', '35'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Em đọc lại bảng nhân 6, 7, 8, 9.'],
      solution: '6 × 3 = 18. 7 × 5 = 35. 9 × 4 = 36. 8 × 10 = 80.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả đúng.',
      left: ['8 × 7', '3 × 9', '5 × 6', '4 × 8'],
      right: ['30', '56', '32', '27'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: ['Đổi chỗ các thừa số, tích không đổi.'],
      solution: '8 × 7 = 56. 3 × 9 = 27. 5 × 6 = 30. 4 × 8 = 32.',
    },
    {
      type: 'multi',
      prompt: 'Phép tính nào có kết quả bé hơn 8?',
      options: ['30 : 6', '54 : 6', '49 : 7', '72 : 9', '48 : 8'],
      answers: [0, 2, 4],
      hints: ['Em tính kết quả của từng phép tính, rồi so sánh với 8.'],
      solution:
        '30 : 6 = 5, 49 : 7 = 7, 48 : 8 = 6 đều bé hơn 8. Còn 54 : 6 = 9 và 72 : 9 = 8 thì không.',
    },
    {
      type: 'number',
      prompt: '? × 7 = 63. Số cần tìm là số nào?',
      answer: 9,
      hints: ['Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.'],
      solution: '63 : 7 = 9. Thử lại: 9 × 7 = 63.',
    },
    {
      type: 'number',
      prompt: '? : 8 = 6. Số cần tìm là số nào?',
      answer: 48,
      hints: ['Muốn tìm số bị chia, ta lấy thương nhân với số chia.'],
      solution: '6 × 8 = 48. Thử lại: 48 : 8 = 6.',
    },
    {
      type: 'number',
      prompt: '4 × ? = 36. Số cần tìm là số nào?',
      answer: 9,
      hints: ['Dấu "?" là một thừa số.'],
      solution: '36 : 4 = 9. Thử lại: 4 × 9 = 36.',
    },
    {
      type: 'number',
      prompt: '35 : ? = 5. Số cần tìm là số nào?',
      answer: 7,
      hints: ['Muốn tìm số chia, ta lấy số bị chia chia cho thương.'],
      solution: '35 : 5 = 7. Thử lại: 35 : 7 = 5.',
    },
    {
      type: 'number',
      prompt: 'Việt xếp 5 bàn, mỗi bàn 6 cái li. Việt xếp tất cả bao nhiêu cái li?',
      answer: 30,
      unit: 'cái li',
      hints: ['6 được lấy 5 lần.'],
      solution: '6 × 5 = 30 (cái li).',
    },
    {
      type: 'number',
      prompt: 'Mai có 45 bông hoa, cắm vào các lọ, mỗi lọ 9 bông. Mai cắm được mấy lọ?',
      answer: 5,
      unit: 'lọ',
      hints: ['Chia thành từng nhóm 9 bông: em làm phép chia.'],
      solution: '45 : 9 = 5 (lọ).',
    },
    {
      type: 'choice',
      prompt:
        'Một hình được chia thành 5 phần bằng nhau, tô màu 1 phần. Đã tô màu một phần mấy của hình?',
      options: ['$\\dfrac{1}{4}$', '$\\dfrac{1}{5}$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{9}$'],
      answer: 1,
      hints: ['Hình được chia thành mấy phần bằng nhau?'],
      solution: 'Hình có 5 phần bằng nhau, tô màu 1 phần: $\\dfrac{1}{5}$ hình.',
    },
    {
      type: 'match',
      prompt: 'Có 18 con ếch. Nối mỗi phần với số con ếch.',
      left: [
        '$\\dfrac{1}{6}$ số con ếch',
        '$\\dfrac{1}{9}$ số con ếch',
        '$\\dfrac{1}{2}$ số con ếch',
      ],
      right: ['9 con', '3 con', '2 con'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em lấy 18 chia cho số ở dưới.'],
      solution: '18 : 6 = 3 (con). 18 : 9 = 2 (con). 18 : 2 = 9 (con).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['7 × 8', '6 × 4', '40 : 5', '5 × 8'],
      answer: [2, 1, 3, 0],
      hints: ['Em tính từng phép tính trước.'],
      solution: '40 : 5 = 8. 6 × 4 = 24. 5 × 8 = 40. 7 × 8 = 56.',
    },
    {
      type: 'number',
      prompt:
        'Ba số ở ba đỉnh tam giác là 3, 2, 4. Số trong ô vuông là tích hai số ở hai đầu cạnh. Ô vuông ở cạnh nối số 3 và số 4 là số nào?',
      answer: 12,
      hints: ['Em nhân hai số ở hai đầu cạnh đó.'],
      solution: '3 × 4 = 12.',
    },
  ],
  takeaways: [
    'Từ một phép nhân, em có hai phép chia.',
    'Tìm thừa số và số chia bằng phép chia, tìm số bị chia bằng phép nhân.',
    'Muốn tìm một phần mấy của một nhóm đồ vật, em chia đều nhóm đó.',
  ],
};
