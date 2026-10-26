/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: phân tích đa thức thành nhân tử bằng đặt nhân tử chung, hằng đẳng thức và nhóm hạng tử, rồi vận dụng để tìm x, tính nhanh và giải bài toán thực tế.',
  intro:
    'Phân tích đa thức thành nhân tử là công cụ dùng mãi về sau: để tìm $x$, để tính nhanh và để rút gọn phân thức đại số sau này. Bài luyện tập này giúp em chọn đúng phương pháp, phối hợp nhiều phương pháp và phân tích đến cùng.',
  objectives: [
    'Chọn và phối hợp các phương pháp đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử.',
    'Phân tích triệt để: các nhân tử không còn phân tích tiếp được.',
    'Vận dụng phân tích thành nhân tử để tìm $x$, tính nhanh và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt nhân tử chung trước nếu các hạng tử có nhân tử chung (kể cả sau khi đổi dấu).',
            'Xem phần còn lại có dạng một hằng đẳng thức đáng nhớ hay không.',
            'Nếu chưa được, nhóm các hạng tử để làm xuất hiện nhân tử chung hoặc hằng đẳng thức.',
            'Kiểm tra lại bằng cách nhân các nhân tử, và xem mỗi nhân tử còn phân tích tiếp được không.',
          ],
        },
        { type: 'tex', tex: '2x^3 - 8x = 2x(x^2 - 4) = 2x(x - 2)(x + 2)' },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều ba phương pháp và các bài vận dụng. Mọi đáp số là số nguyên; số âm gõ với dấu "-" đằng trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập số cần điền hoặc đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại phương pháp nào.',
  },
  examples: [
    {
      problem: 'Phân tích đa thức $x^2 - 2xy + y^2 - 16$ thành nhân tử.',
      steps: [
        'Nhóm ba hạng tử đầu: $x^2 - 2xy + y^2 = (x - y)^2$.',
        'Đa thức bằng $(x - y)^2 - 4^2$, là hiệu hai bình phương.',
      ],
      answer: '$x^2 - 2xy + y^2 - 16 = (x - y - 4)(x - y + 4)$.',
    },
    {
      problem: 'Tìm $x$, biết $x(x - 2) - 3(2 - x) = 0$.',
      steps: [
        'Đổi dấu: $-3(2 - x) = 3(x - 2)$, nên vế trái bằng $x(x - 2) + 3(x - 2) = (x - 2)(x + 3)$.',
        '$(x - 2)(x + 3) = 0$ khi $x - 2 = 0$ hoặc $x + 3 = 0$.',
      ],
      answer: '$x = 2$ hoặc $x = -3$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phân tích $2x^2 - 8$ thành nhân tử được',
      options: ['$2(x - 4)(x + 4)$', '$2(x - 2)(x + 2)$', '$2(x - 2)^2$', '$(x - 2)(x + 4)$'],
      answer: 1,
      hints: [
        'Đặt nhân tử chung $2$ trước.',
        'Trong ngoặc còn $x^2 - 4$, là hiệu hai bình phương.',
      ],
      solution: '$2x^2 - 8 = 2(x^2 - 4) = 2(x - 2)(x + 2)$.',
    },
    {
      type: 'number',
      prompt: 'Điền số thích hợp: $x^2 + 2xy + y^2 - 9 = (x + y - 3)(x + y + \\square)$.',
      answer: 3,
      hints: ['$x^2 + 2xy + y^2 = (x + y)^2$.', '$(x + y)^2 - 9$ là hiệu hai bình phương.'],
      solution: '$x^2 + 2xy + y^2 - 9 = (x + y)^2 - 3^2 = (x + y - 3)(x + y + 3)$. Ô trống là $3$.',
    },
    {
      type: 'choice',
      prompt: 'Phân tích $x^2 - 3x + xy - 3y$ thành nhân tử được',
      options: ['$(x + 3)(x - y)$', '$(x - 3)(x + y)$', '$(x - 3)(x - y)$', '$(x + y)(x + 3)$'],
      answer: 1,
      hints: ['Nhóm $(x^2 - 3x) + (xy - 3y)$.', 'Hai nhóm có chung nhân tử $x - 3$.'],
      solution: '$x^2 - 3x + xy - 3y = x(x - 3) + y(x - 3) = (x - 3)(x + y)$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đa thức với dạng phân tích thành nhân tử của nó.',
      left: ['$x^2 - 5x$', '$x^2 - 25$', '$x^2 - 10x + 25$'],
      right: ['$(x - 5)^2$', '$x(x - 5)$', '$(x + 5)^2$', '$(x - 5)(x + 5)$'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
      ],
      hints: [
        'Một đa thức có nhân tử chung, một là hiệu hai bình phương, một là bình phương của một hiệu.',
      ],
      solution:
        '$x^2 - 5x = x(x - 5)$; $x^2 - 25 = (x - 5)(x + 5)$; $x^2 - 10x + 25 = (x - 5)^2$. Thẻ $(x + 5)^2 = x^2 + 10x + 25$ không khớp.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x > 0$, biết $2x^2 - 18 = 0$.',
      answer: 3,
      hints: ['$2x^2 - 18 = 2(x^2 - 9)$.', '$x^2 - 9 = (x - 3)(x + 3)$.'],
      solution:
        '$2x^2 - 18 = 2(x - 3)(x + 3) = 0$ nên $x = 3$ hoặc $x = -3$. Vì $x > 0$ nên $x = 3$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các giá trị của $x$ thoả mãn $x(x - 5) - 2(5 - x) = 0$.',
      options: ['$5$', '$-5$', '$2$', '$-2$'],
      answers: [0, 3],
      hints: ['Đổi dấu: $-2(5 - x) = 2(x - 5)$.', 'Vế trái bằng $(x - 5)(x + 2)$.'],
      solution:
        '$x(x - 5) - 2(5 - x) = x(x - 5) + 2(x - 5) = (x - 5)(x + 2) = 0$, nên $x - 5 = 0$ hoặc $x + 2 = 0$, tức $x = 5$ hoặc $x = -2$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $87^2 + 26 \\cdot 87 + 13^2$.',
      answer: 10000,
      hints: ['$26 \\cdot 87 = 2 \\cdot 87 \\cdot 13$.', 'Biểu thức là bình phương của một tổng.'],
      solution: '$87^2 + 2 \\cdot 87 \\cdot 13 + 13^2 = (87 + 13)^2 = 100^2 = 10000$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $73^2 - 27^2$.',
      answer: 4600,
      hints: ['Dùng hiệu hai bình phương.', '$73 + 27 = 100$.'],
      solution: '$73^2 - 27^2 = (73 + 27)(73 - 27) = 100 \\cdot 46 = 4600$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^3 - 3x^2 + 3x - 1$ tại $x = 101$.',
      answer: 1000000,
      hints: ['Biểu thức là lập phương của một hiệu.', '$x^3 - 3x^2 + 3x - 1 = (x - 1)^3$.'],
      solution: '$x^3 - 3x^2 + 3x - 1 = (x - 1)^3$. Tại $x = 101$: $100^3 = 1\\,000\\,000$.',
    },
    {
      type: 'number',
      prompt:
        'Hai mảnh đất hình vuông có cạnh $54$ m và $46$ m. Diện tích mảnh lớn hơn diện tích mảnh nhỏ bao nhiêu mét vuông?',
      answer: 800,
      unit: 'm²',
      hints: ['Hiệu diện tích là $54^2 - 46^2$.', 'Dùng hiệu hai bình phương; $54 + 46 = 100$.'],
      solution: '$54^2 - 46^2 = (54 + 46)(54 - 46) = 100 \\cdot 8 = 800\\ \\text{m}^2$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có diện tích $x^2 + 7x + 12$ ($\\text{cm}^2$) và một cạnh dài $x + 3$ (cm). Với $x = 6$, cạnh còn lại dài bao nhiêu xăng-ti-mét?',
      answer: 10,
      unit: 'cm',
      hints: [
        'Phân tích $x^2 + 7x + 12$ thành tích có nhân tử $x + 3$.',
        '$x^2 + 7x + 12 = x^2 + 3x + 4x + 12$; nhóm hai hạng tử một.',
      ],
      solution:
        '$x^2 + 7x + 12 = x(x + 3) + 4(x + 3) = (x + 3)(x + 4)$. Cạnh còn lại là $x + 4$; với $x = 6$ dài $10$ cm (kiểm tra: $9 \\cdot 10 = 90 = 36 + 42 + 12$).',
    },
  ],
  takeaways: [
    'Thứ tự thường dùng: đặt nhân tử chung, rồi hằng đẳng thức, rồi nhóm hạng tử.',
    'Phân tích đến cùng: $2x^2 - 8 = 2(x - 2)(x + 2)$, không dừng ở $2(x^2 - 4)$.',
    'Tích bằng $0$ khi một thừa số bằng $0$; phân tích thành nhân tử là bước đầu để tìm $x$.',
  ],
};
