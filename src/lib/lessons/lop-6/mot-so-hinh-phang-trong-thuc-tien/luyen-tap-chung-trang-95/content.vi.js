/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố đặc điểm của tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân và công thức chu vi, diện tích của các tứ giác đã học.',
  intro:
    'Ba bài vừa học giúp em nhận ra các hình phẳng quen thuộc qua cạnh, góc, đường chéo và tính được chu vi, diện tích của chúng. Bài luyện tập này giúp em dùng các đặc điểm và công thức đó nhanh, đúng, kể cả khi phải kết hợp nhiều hình.',
  objectives: [
    'Nhận biết và phân biệt các hình đã học dựa vào cạnh, góc, đường chéo.',
    'Tính độ dài cạnh, đường chéo từ các đặc điểm của hình.',
    'Tính chu vi, diện tích các tứ giác đã học, kể cả hình ghép và bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Đặc điểm chính', 'Chu vi', 'Diện tích'],
          rows: [
            [
              'Hình vuông cạnh $a$',
              'Bốn cạnh bằng nhau, bốn góc vuông, hai đường chéo bằng nhau',
              '$4a$',
              '$a^2$',
            ],
            [
              'Hình chữ nhật $a$, $b$',
              'Bốn góc vuông, cạnh đối bằng nhau, hai đường chéo bằng nhau',
              '$2(a + b)$',
              '$a \\cdot b$',
            ],
            [
              'Hình thoi cạnh $a$, đường chéo $m$, $n$',
              'Bốn cạnh bằng nhau, hai đường chéo vuông góc',
              '$4a$',
              '$\\frac{1}{2} m \\cdot n$',
            ],
            [
              'Hình bình hành $a$, $b$, chiều cao $h$',
              'Cạnh đối bằng nhau và song song, đường chéo cắt nhau tại trung điểm mỗi đường',
              '$2(a + b)$',
              '$a \\cdot h$',
            ],
            [
              'Hình thang đáy $a$, $b$, chiều cao $h$',
              'Hai đáy song song (hình thang cân: hai cạnh bên bằng nhau, hai đường chéo bằng nhau)',
              'Tổng bốn cạnh',
              '$\\dfrac{(a + b) \\cdot h}{2}$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Tam giác đều: ba cạnh bằng nhau, ba góc bằng nhau. Lục giác đều: sáu cạnh bằng nhau, sáu góc bằng nhau, ba đường chéo chính bằng nhau; ghép từ sáu tam giác đều thì đường chéo chính dài gấp đôi cạnh.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 18, Bài 19 và Bài 20. Đáp số là số tự nhiên, em chỉ cần gõ số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Một hình chữ nhật có chu vi $30$ cm và chiều dài $9$ cm. Tính diện tích hình chữ nhật đó.',
      steps: [
        'Nửa chu vi bằng tổng chiều dài và chiều rộng: $30 : 2 = 15$ (cm).',
        'Chiều rộng: $15 - 9 = 6$ (cm).',
        'Diện tích: $9 \\cdot 6 = 54$ ($\\text{cm}^2$).',
      ],
      answer: '$54\\ \\text{cm}^2$.',
    },
    {
      problem:
        'Hình thang cân $ABCD$ có đáy lớn $AB = 10$ cm, đáy nhỏ $CD = 4$ cm, cạnh bên $AD = 5$ cm và chiều cao $4$ cm. Tính chu vi và diện tích của hình thang.',
      steps: [
        'Hình thang cân có hai cạnh bên bằng nhau: $BC = AD = 5$ cm.',
        'Chu vi: $10 + 4 + 5 + 5 = 24$ (cm).',
        'Diện tích: $\\dfrac{(10 + 4) \\cdot 4}{2} = \\dfrac{56}{2} = 28$ ($\\text{cm}^2$).',
      ],
      answer: 'Chu vi $24$ cm, diện tích $28\\ \\text{cm}^2$.',
    },
    {
      problem:
        'Một mảnh đất hình chữ nhật dài $20$ m, rộng $15$ m. Giữa mảnh đất có một bồn hoa hình thoi với hai đường chéo $6$ m và $4$ m. Tính diện tích phần đất còn lại.',
      steps: [
        'Diện tích mảnh đất: $20 \\cdot 15 = 300$ ($\\text{m}^2$).',
        'Diện tích bồn hoa: $\\frac{1}{2} \\cdot 6 \\cdot 4 = 12$ ($\\text{m}^2$).',
        'Phần còn lại: $300 - 12 = 288$ ($\\text{m}^2$).',
      ],
      answer: '$288\\ \\text{m}^2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào có sáu cạnh bằng nhau và ba đường chéo chính bằng nhau?',
      options: ['Hình vuông', 'Hình thoi', 'Hình tam giác đều', 'Hình lục giác đều'],
      answer: 3,
      hints: ['Đếm số cạnh: hình nào có sáu cạnh?'],
      solution:
        'Hình lục giác đều có sáu cạnh bằng nhau, sáu góc bằng nhau, ba đường chéo chính bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Ghép sáu tam giác đều cạnh $2$ cm có chung một đỉnh thành một hình lục giác đều. Chu vi của hình lục giác đó bằng bao nhiêu?',
      answer: 12,
      unit: 'cm',
      hints: [
        'Chu vi lục giác chỉ tính sáu cạnh bao ngoài, không tính các cạnh chung ở bên trong.',
        'Mỗi cạnh lục giác bằng cạnh tam giác.',
      ],
      solution:
        'Lục giác đều có sáu cạnh, mỗi cạnh $2$ cm, nên chu vi là $6 \\cdot 2 = 12$ (cm). Lưu ý không lấy tổng chu vi sáu tam giác ($36$ cm), vì các cạnh bên trong không thuộc đường bao.',
    },
    {
      type: 'number',
      prompt: 'Một hình lục giác đều có chu vi $30$ cm. Tính độ dài một đường chéo chính của nó.',
      answer: 10,
      unit: 'cm',
      hints: ['Tìm cạnh: $30 : 6$.', 'Đường chéo chính dài gấp đôi cạnh.'],
      solution: 'Cạnh: $30 : 6 = 5$ (cm). Đường chéo chính: $2 \\cdot 5 = 10$ (cm).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với công thức tính diện tích của nó.',
      left: [
        'Hình chữ nhật $a$, $b$',
        'Hình thoi, đường chéo $m$, $n$',
        'Hình bình hành, đáy $a$, cao $h$',
        'Hình thang, đáy $a$, $b$, cao $h$',
      ],
      right: [
        '$S = a \\cdot h$',
        '$S = \\dfrac{(a + b) \\cdot h}{2}$',
        '$S = a \\cdot b$',
        '$S = \\frac{1}{2} m \\cdot n$',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Công thức nào có chiều cao $h$? Chỉ hình bình hành và hình thang.'],
      solution:
        'Hình chữ nhật: $a \\cdot b$. Hình thoi: $\\frac{1}{2} m \\cdot n$. Hình bình hành: $a \\cdot h$. Hình thang: $\\dfrac{(a + b) \\cdot h}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có chu vi $30$ cm và chiều rộng $5$ cm. Tính diện tích hình chữ nhật.',
      answer: 50,
      unit: 'cm²',
      hints: ['Nửa chu vi là tổng chiều dài và chiều rộng.', 'Chiều dài $= 15 - 5$.'],
      solution:
        'Nửa chu vi: $15$ cm. Chiều dài: $15 - 5 = 10$ (cm). Diện tích: $10 \\cdot 5 = 50$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt:
        'Một hình thoi có cạnh $6$ cm. Một hình vuông có chu vi bằng chu vi hình thoi. Tính diện tích hình vuông.',
      answer: 36,
      unit: 'cm²',
      hints: [
        'Chu vi hình thoi: $4 \\cdot 6$.',
        'Hình vuông có cùng chu vi thì cạnh cũng bằng $6$ cm.',
      ],
      solution:
        'Chu vi hình thoi là $24$ cm, nên cạnh hình vuông là $24 : 4 = 6$ (cm), diện tích $6 \\cdot 6 = 36$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ có hai đáy $AB = 12$ cm, $CD = 6$ cm, cạnh bên $AD = 5$ cm. Tính chu vi hình thang.',
      answer: 28,
      unit: 'cm',
      hints: ['Hình thang cân có hai cạnh bên bằng nhau.'],
      solution: '$BC = AD = 5$ cm. Chu vi: $12 + 6 + 5 + 5 = 28$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $AB = 10$ cm, khoảng cách từ $D$ đến đường thẳng $AB$ là $6$ cm. Tính diện tích hình bình hành.',
      answer: 60,
      unit: 'cm²',
      hints: ['Khoảng cách từ $D$ đến $AB$ là chiều cao ứng với đáy $AB$.'],
      solution: '$S = AB \\cdot h = 10 \\cdot 6 = 60$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật dài $25$ m, rộng $16$ m. Ở giữa vườn có một bồn hoa hình thoi với hai đường chéo $8$ m và $5$ m. Tính diện tích phần vườn còn lại.',
      answer: 380,
      unit: 'm²',
      hints: [
        'Diện tích vườn trừ diện tích bồn hoa.',
        'Bồn hoa: $\\frac{1}{2} \\cdot 8 \\cdot 5$.',
      ],
      solution:
        'Vườn: $25 \\cdot 16 = 400$ ($\\text{m}^2$). Bồn hoa: $\\frac{1}{2} \\cdot 8 \\cdot 5 = 20$ ($\\text{m}^2$). Còn lại: $400 - 20 = 380$ ($\\text{m}^2$).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các hình theo diện tích tăng dần.',
      items: [
        'Hình vuông cạnh $5$ cm',
        'Hình chữ nhật $8$ cm $\\times$ $3$ cm',
        'Hình thoi có hai đường chéo $8$ cm và $7$ cm',
        'Hình bình hành đáy $6$ cm, chiều cao $4{,}5$ cm',
      ],
      answer: [1, 0, 3, 2],
      hints: ['Tính từng diện tích rồi so sánh.', 'Hình thoi: $\\frac{1}{2} \\cdot 8 \\cdot 7$.'],
      solution:
        'Diện tích: hình vuông $25$, hình chữ nhật $24$, hình thoi $28$, hình bình hành $6 \\cdot 4{,}5 = 27$ ($\\text{cm}^2$). Tăng dần: $24 < 25 < 27 < 28$.',
    },
    {
      type: 'text',
      prompt: 'Tứ giác có bốn cạnh bằng nhau nhưng không có góc vuông là hình gì?',
      accept: ['hình thoi', 'thoi'],
      hints: ['Bốn cạnh bằng nhau và có góc vuông thì là hình vuông.'],
      solution: 'Đó là hình thoi (không phải hình vuông).',
    },
  ],
  takeaways: [
    'Nhận ra hình qua đặc điểm cạnh, góc, đường chéo trước khi chọn công thức.',
    'Chu vi chỉ tính đường bao ngoài; diện tích hình ghép là tổng (hoặc hiệu) diện tích các phần.',
    'Biết chu vi và một cạnh của hình chữ nhật: cạnh còn lại bằng nửa chu vi trừ cạnh đã biết.',
  ],
};
