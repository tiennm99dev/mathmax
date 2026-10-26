/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố bảy hằng đẳng thức đáng nhớ, gồm bình phương của tổng, hiệu, hiệu hai bình phương, lập phương của tổng, hiệu, tổng và hiệu hai lập phương.',
  intro:
    'Ba bài vừa qua cho em đủ bảy hằng đẳng thức đáng nhớ. Bài luyện tập này giúp em dùng chúng theo cả hai chiều: khai triển một bình phương hay lập phương, và nhận ra một biểu thức là vế của hằng đẳng thức nào để viết gọn, rút gọn hoặc tính nhanh.',
  objectives: [
    'Khai triển và viết gọn bình phương của một tổng, một hiệu và hiệu hai bình phương.',
    'Khai triển và viết gọn lập phương của một tổng, một hiệu.',
    'Viết tổng và hiệu hai lập phương thành tích; rút gọn biểu thức và tính nhanh.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Hằng đẳng thức', 'Ví dụ dùng để tính nhanh'],
          rows: [
            ['$(A + B)^2 = A^2 + 2AB + B^2$', '$101^2 = 10000 + 200 + 1 = 10201$'],
            ['$(A - B)^2 = A^2 - 2AB + B^2$', '$99^2 = 10000 - 200 + 1 = 9801$'],
            ['$A^2 - B^2 = (A + B)(A - B)$', '$52 \\cdot 48 = 50^2 - 2^2 = 2496$'],
            ['$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$', '$x^3 + 6x^2 + 12x + 8 = (x + 2)^3$'],
            ['$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$', '$x^3 - 3x^2 + 3x - 1 = (x - 1)^3$'],
            ['$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$', '$x^3 + 8 = (x + 2)(x^2 - 2x + 4)$'],
            ['$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$', '$x^3 - 1 = (x - 1)(x^2 + x + 1)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những chỗ hay nhầm',
          text: '$(A + B)^2 \\ne A^2 + B^2$ và $(A + B)^3 \\ne A^3 + B^3$. Trong tổng, hiệu hai lập phương, hạng tử giữa của ngoặc thứ hai là $AB$ (không phải $2AB$) và mang dấu ngược với ngoặc thứ nhất.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 6, Bài 7 và Bài 8. Mọi đáp số là số nguyên; số âm gõ với dấu "-" đằng trước, ví dụ $-12$.',
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
      problem: 'Rút gọn biểu thức $(x + 2y)^2 - (x - 2y)^2$.',
      steps: [
        'Cách 1: khai triển, $(x^2 + 4xy + 4y^2) - (x^2 - 4xy + 4y^2) = 8xy$.',
        'Cách 2: dùng hiệu hai bình phương với $A = x + 2y$, $B = x - 2y$: $(A + B)(A - B) = 2x \\cdot 4y$.',
      ],
      answer: '$(x + 2y)^2 - (x - 2y)^2 = 8xy$.',
    },
    {
      problem: 'Tính giá trị của biểu thức $x^3 - 6x^2 + 12x - 8$ tại $x = 22$.',
      steps: [
        'Nhận dạng: $x^3 - 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 - 2^3 = (x - 2)^3$.',
        'Tại $x = 22$: $(22 - 2)^3 = 20^3$.',
      ],
      answer: 'Giá trị của biểu thức là $8000$.',
    },
    {
      problem: 'Biết $a - b = 3$ và $ab = 10$. Tính $a^3 - b^3$.',
      steps: [
        '$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ và $a^2 + b^2 = (a - b)^2 + 2ab = 9 + 20 = 29$.',
        'Do đó $a^2 + ab + b^2 = 29 + 10 = 39$, và $a^3 - b^3 = 3 \\cdot 39$.',
      ],
      answer: '$a^3 - b^3 = 117$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính nhanh $98^2$.',
      answer: 9604,
      hints: ['Viết $98 = 100 - 2$.', 'Dùng bình phương của một hiệu.'],
      solution: '$98^2 = (100 - 2)^2 = 10000 - 400 + 4 = 9604$.',
    },
    {
      type: 'choice',
      prompt: 'Khai triển $(x - 3y)^2$ được',
      options: ['$x^2 - 9y^2$', '$x^2 - 6xy + 9y^2$', '$x^2 - 3xy + 9y^2$', '$x^2 + 6xy + 9y^2$'],
      answer: 1,
      hints: [
        'Áp dụng $(A - B)^2$ với $A = x$, $B = 3y$.',
        '$2AB = 2 \\cdot x \\cdot 3y = 6xy$; $B^2 = 9y^2$.',
      ],
      solution: '$(x - 3y)^2 = x^2 - 2 \\cdot x \\cdot 3y + (3y)^2 = x^2 - 6xy + 9y^2$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $21 \\cdot 19$.',
      answer: 399,
      hints: ['$21 = 20 + 1$ và $19 = 20 - 1$.', 'Dùng hiệu hai bình phương.'],
      solution: '$21 \\cdot 19 = (20 + 1)(20 - 1) = 20^2 - 1^2 = 400 - 1 = 399$.',
    },
    {
      type: 'number',
      prompt: 'Rút gọn biểu thức $(x + 2)^2 - (x - 2)^2$ rồi tính giá trị tại $x = 12{,}5$.',
      answer: 100,
      hints: [
        'Dùng hiệu hai bình phương hoặc khai triển hai bình phương.',
        'Biểu thức rút gọn là $8x$.',
      ],
      solution:
        '$(x + 2)^2 - (x - 2)^2 = \\big((x + 2) + (x - 2)\\big)\\big((x + 2) - (x - 2)\\big) = 2x \\cdot 4 = 8x$. Tại $x = 12{,}5$: $8 \\cdot 12{,}5 = 100$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^3 + 3x^2 + 3x + 1$ tại $x = 99$.',
      answer: 1000000,
      hints: ['Biểu thức là lập phương của một tổng.', '$x^3 + 3x^2 + 3x + 1 = (x + 1)^3$.'],
      solution: '$x^3 + 3x^2 + 3x + 1 = (x + 1)^3$. Tại $x = 99$: $100^3 = 1\\,000\\,000$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $(x + 1)^3 - (x - 1)^3$ tại $x = 5$.',
      answer: 152,
      hints: ['Khai triển hai lập phương rồi thu gọn.', 'Biểu thức rút gọn là $6x^2 + 2$.'],
      solution:
        '$(x + 1)^3 - (x - 1)^3 = (x^3 + 3x^2 + 3x + 1) - (x^3 - 3x^2 + 3x - 1) = 6x^2 + 2$. Tại $x = 5$: $6 \\cdot 25 + 2 = 152$ (kiểm tra: $6^3 - 4^3 = 216 - 64 = 152$).',
    },
    {
      type: 'choice',
      prompt: 'Tích $(2x + 1)(4x^2 - 2x + 1)$ bằng',
      options: ['$8x^3 - 1$', '$(2x + 1)^3$', '$8x^3 + 1$', '$2x^3 + 1$'],
      answer: 2,
      hints: [
        'Tích có dạng $(A + B)(A^2 - AB + B^2)$ với $A = 2x$, $B = 1$.',
        'Đó là tổng hai lập phương $A^3 + B^3$.',
      ],
      solution: '$(2x + 1)(4x^2 - 2x + 1) = (2x)^3 + 1^3 = 8x^3 + 1$.',
    },
    {
      type: 'number',
      prompt: 'Biết $a - b = 3$ và $ab = 10$. Tính $a^3 - b^3$.',
      answer: 117,
      hints: ['$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$.', '$a^2 + ab + b^2 = (a - b)^2 + 3ab$.'],
      solution:
        '$a^2 + ab + b^2 = (a - b)^2 + 3ab = 9 + 30 = 39$. Vậy $a^3 - b^3 = 3 \\cdot 39 = 117$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với biểu thức luôn bằng nó.',
      left: ['$a^2 - b^2$', '$a^3 + b^3$', '$(a - b)^3$'],
      right: [
        '$(a + b)(a^2 - ab + b^2)$',
        '$a^3 - 3a^2b + 3ab^2 - b^3$',
        '$(a - b)(a^2 - ab + b^2)$',
        '$(a + b)(a - b)$',
      ],
      pairs: [
        [0, 3],
        [1, 0],
        [2, 1],
      ],
      hints: [
        'Xem lại bảng bảy hằng đẳng thức.',
        'Thẻ thừa có dấu không khớp với hằng đẳng thức nào.',
      ],
      solution:
        '$a^2 - b^2 = (a + b)(a - b)$; $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$; $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$. Thẻ $(a - b)(a^2 - ab + b^2)$ không bằng biểu thức nào.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đẳng thức đúng với mọi $a$, $b$.',
      options: [
        '$(a + b)^2 = a^2 + 2ab + b^2$',
        '$(a - b)^3 = -(b - a)^3$',
        '$a^3 + b^3 = (a + b)^3$',
        '$(a + b)(a - b) = a^2 - b^2$',
        '$(a - b)^2 = a^2 - b^2$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Thử với $a = 2$, $b = 1$ để loại đẳng thức sai.',
        'Lập phương của hai số đối nhau là hai số đối nhau.',
      ],
      solution:
        'Ba đẳng thức đúng là hằng đẳng thức bình phương của một tổng, $(a - b)^3 = -(b - a)^3$ và hiệu hai bình phương. Với $a = 2$, $b = 1$: $a^3 + b^3 = 9 \\ne 27 = (a + b)^3$ và $(a - b)^2 = 1 \\ne 3 = a^2 - b^2$.',
    },
  ],
  takeaways: [
    'Bảy hằng đẳng thức đáng nhớ dùng được theo hai chiều: khai triển và viết gọn.',
    'Viết số thành $100 \\pm k$, $20 \\pm 1$, … để tính nhanh bằng hằng đẳng thức.',
    'Biết $a + b$ (hoặc $a - b$) và $ab$ là tính được $a^2 + b^2$, $a^3 + b^3$, $a^3 - b^3$.',
  ],
};
