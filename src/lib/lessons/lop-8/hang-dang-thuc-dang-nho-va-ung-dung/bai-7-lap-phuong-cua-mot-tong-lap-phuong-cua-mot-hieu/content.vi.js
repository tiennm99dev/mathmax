/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai hằng đẳng thức lập phương của một tổng và lập phương của một hiệu, minh hoạ bằng khối lập phương cạnh a + b tách thành 8 khối, dùng để khai triển, viết gọn và tính nhanh.',
  intro:
    'Một khối rubik cạnh $a + b$ có thể cắt thành $8$ khối nhỏ bằng ba nhát cắt. Đếm thể tích các khối nhỏ đó, em sẽ tìm ra công thức khai triển $(a + b)^3$ mà không cần nhân ba lần. Bài này giới thiệu hai hằng đẳng thức tiếp theo: lập phương của một tổng và lập phương của một hiệu.',
  objectives: [
    'Nhận biết và phát biểu hằng đẳng thức $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$.',
    'Nhận biết và phát biểu hằng đẳng thức $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$.',
    'Khai triển lập phương của một tổng, một hiệu và viết một đa thức về dạng lập phương.',
    'Vận dụng để rút gọn biểu thức và tính nhanh.',
  ],
  sections: [
    {
      heading: 'Lập phương của một tổng',
      blocks: [
        {
          type: 'p',
          text: 'Ta có $(a + b)^3 = (a + b)(a + b)^2 = (a + b)(a^2 + 2ab + b^2)$. Nhân đa thức với đa thức rồi thu gọn:',
        },
        {
          type: 'tex',
          tex: '(a + b)(a^2 + 2ab + b^2) = a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Lập phương của một tổng',
          text: 'Với hai biểu thức tuỳ ý $A$ và $B$: $$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3.$$',
        },
        {
          type: 'p',
          text: 'Hình ảnh khối: cắt khối lập phương cạnh $a + b$ bằng ba mặt phẳng song song với các mặt, ta được $1$ khối lập phương cạnh $a$, $3$ khối hộp $a \\times a \\times b$, $3$ khối hộp $a \\times b \\times b$ và $1$ khối lập phương cạnh $b$. Tổng thể tích là $a^3 + 3a^2b + 3ab^2 + b^3$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: 'Số mũ của $A$ giảm dần $3, 2, 1, 0$; số mũ của $B$ tăng dần $0, 1, 2, 3$; các hệ số là $1, 3, 3, 1$.',
        },
      ],
    },
    {
      heading: 'Lập phương của một hiệu',
      blocks: [
        {
          type: 'p',
          text: 'Viết $A - B = A + (-B)$ rồi áp dụng lập phương của một tổng: các hạng tử chứa $B$ với số mũ lẻ đổi dấu.',
        },
        {
          type: 'tex',
          tex: '(A - B)^3 = A^3 + 3A^2(-B) + 3A(-B)^2 + (-B)^3',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Lập phương của một hiệu',
          text: 'Với hai biểu thức tuỳ ý $A$ và $B$: $$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3.$$',
        },
        {
          type: 'table',
          caption: 'Hai hằng đẳng thức của bài',
          head: ['Hằng đẳng thức', 'Dấu các hạng tử'],
          rows: [
            ['$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$', 'Tất cả là dấu $+$'],
            ['$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$', 'Xen kẽ $+, -, +, -$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '$(a + b)^3 \\ne a^3 + b^3$. Ví dụ $(1 + 2)^3 = 27$ trong khi $1^3 + 2^3 = 9$. Cũng chú ý $(B - A)^3 = -(A - B)^3$, vì lập phương của hai số đối nhau là hai số đối nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tách khối lập phương cạnh a + b',
    instruction:
      'Chọn a và b bằng hai thanh trượt, bấm "Tách thành 8 khối" để thấy các khối nhỏ, rồi chọn từng nhóm a³, 3a²b, 3ab², b³ để tô sáng. Tổng thể tích các nhóm luôn bằng (a + b)³.',
  },
  examples: [
    {
      problem: 'Khai triển $(x + 1)^3$.',
      steps: [
        'Áp dụng lập phương của một tổng với $A = x$, $B = 1$.',
        '$(x + 1)^3 = x^3 + 3 \\cdot x^2 \\cdot 1 + 3 \\cdot x \\cdot 1^2 + 1^3$.',
      ],
      answer: '$(x + 1)^3 = x^3 + 3x^2 + 3x + 1$.',
    },
    {
      problem: 'Khai triển $(2x - y)^3$.',
      steps: [
        'Áp dụng lập phương của một hiệu với $A = 2x$, $B = y$.',
        '$(2x - y)^3 = (2x)^3 - 3 \\cdot (2x)^2 \\cdot y + 3 \\cdot 2x \\cdot y^2 - y^3$.',
        '$= 8x^3 - 3 \\cdot 4x^2 \\cdot y + 6xy^2 - y^3$.',
      ],
      answer: '$(2x - y)^3 = 8x^3 - 12x^2y + 6xy^2 - y^3$.',
    },
    {
      problem: 'Viết biểu thức $x^3 - 6x^2y + 12xy^2 - 8y^3$ dưới dạng lập phương của một hiệu.',
      steps: [
        '$x^3$ là $A^3$ với $A = x$; $8y^3 = (2y)^3$ là $B^3$ với $B = 2y$.',
        'Kiểm tra hai hạng tử giữa: $3A^2B = 3 \\cdot x^2 \\cdot 2y = 6x^2y$ và $3AB^2 = 3 \\cdot x \\cdot (2y)^2 = 12xy^2$.',
        'Các dấu xen kẽ $+, -, +, -$ khớp với lập phương của một hiệu.',
      ],
      answer: '$x^3 - 6x^2y + 12xy^2 - 8y^3 = (x - 2y)^3$.',
    },
    {
      problem: 'Tính nhanh $101^3$.',
      steps: [
        'Viết $101 = 100 + 1$.',
        '$(100 + 1)^3 = 100^3 + 3 \\cdot 100^2 \\cdot 1 + 3 \\cdot 100 \\cdot 1^2 + 1^3$.',
        '$= 1\\,000\\,000 + 30\\,000 + 300 + 1$.',
      ],
      answer: '$101^3 = 1\\,030\\,301$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khai triển $(x + 2)^3$ được',
      options: [
        '$x^3 + 8$',
        '$x^3 + 6x^2 + 12x + 8$',
        '$x^3 + 2x^2 + 4x + 8$',
        '$x^3 + 3x^2 + 3x + 8$',
      ],
      answer: 1,
      hints: [
        'Áp dụng $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ với $A = x$, $B = 2$.',
        '$3A^2B = 3 \\cdot x^2 \\cdot 2$ và $3AB^2 = 3 \\cdot x \\cdot 4$.',
      ],
      solution:
        '$(x + 2)^3 = x^3 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 + 2^3 = x^3 + 6x^2 + 12x + 8$.',
    },
    {
      type: 'number',
      prompt: 'Khai triển $(2x - 1)^3$. Hệ số của $x$ trong kết quả là bao nhiêu?',
      answer: 6,
      hints: [
        'Áp dụng lập phương của một hiệu với $A = 2x$, $B = 1$.',
        'Hạng tử chứa $x$ là $3AB^2$, mang dấu $+$.',
      ],
      solution:
        '$(2x - 1)^3 = 8x^3 - 3 \\cdot 4x^2 \\cdot 1 + 3 \\cdot 2x \\cdot 1 - 1 = 8x^3 - 12x^2 + 6x - 1$. Hệ số của $x$ là $6$.',
    },
    {
      type: 'number',
      prompt: 'Điền số thích hợp: $x^3 + 9x^2 + 27x + 27 = (x + \\square)^3$.',
      answer: 3,
      hints: [
        'Hạng tử cuối là $B^3$: số nào có lập phương bằng $27$?',
        'Kiểm tra lại $3A^2B = 9x^2$.',
      ],
      solution:
        '$27 = 3^3$ và $3 \\cdot x^2 \\cdot 3 = 9x^2$, $3 \\cdot x \\cdot 3^2 = 27x$. Vậy $x^3 + 9x^2 + 27x + 27 = (x + 3)^3$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $23^3 - 9 \\cdot 23^2 + 27 \\cdot 23 - 27$.',
      answer: 8000,
      hints: [
        'Đặt $x = 23$: biểu thức là $x^3 - 9x^2 + 27x - 27$.',
        'Đó là lập phương của một hiệu $(x - 3)^3$.',
      ],
      solution: '$23^3 - 9 \\cdot 23^2 + 27 \\cdot 23 - 27 = (23 - 3)^3 = 20^3 = 8000$.',
    },
    {
      type: 'choice',
      prompt: 'Với mọi $a$, $b$, biểu thức $(-a - b)^3$ bằng',
      options: ['$(a + b)^3$', '$-(a + b)^3$', '$-(a - b)^3$', '$a^3 + b^3$'],
      answer: 1,
      hints: ['$-a - b = -(a + b)$.', 'Lập phương của một số âm thì đổi dấu: $(-M)^3 = -M^3$.'],
      solution: '$(-a - b)^3 = (-(a + b))^3 = -(a + b)^3$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với dạng khai triển của nó.',
      left: ['$(a + b)^3$', '$(a - b)^3$', '$(b - a)^3$'],
      right: [
        '$a^3 - 3a^2b + 3ab^2 - b^3$',
        '$a^3 + 3a^2b + 3ab^2 + b^3$',
        '$a^3 - b^3$',
        '$-a^3 + 3a^2b - 3ab^2 + b^3$',
      ],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 3],
      ],
      hints: [
        'Lập phương của một tổng có toàn dấu $+$; của một hiệu có dấu xen kẽ.',
        '$(b - a)^3 = -(a - b)^3$: đổi dấu mọi hạng tử của $(a - b)^3$.',
      ],
      solution:
        '$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$; $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$; $(b - a)^3 = -(a - b)^3 = -a^3 + 3a^2b - 3ab^2 + b^3$. Biểu thức $a^3 - b^3$ không khớp với cái nào.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $(x + 2)^3 - (x - 2)^3$ tại $x = 10$.',
      answer: 1216,
      hints: [
        'Khai triển hai lập phương rồi thu gọn: các hạng tử $x^3$ và $12x$ triệt tiêu.',
        'Biểu thức rút gọn là $12x^2 + 16$.',
      ],
      solution:
        '$(x + 2)^3 - (x - 2)^3 = (x^3 + 6x^2 + 12x + 8) - (x^3 - 6x^2 + 12x - 8) = 12x^2 + 16$. Tại $x = 10$: $12 \\cdot 100 + 16 = 1216$ (kiểm tra: $12^3 - 8^3 = 1728 - 512 = 1216$).',
    },
    {
      type: 'number',
      prompt:
        'Một khối lập phương cạnh $a$ cm được làm to thêm thành khối lập phương cạnh $(a + 1)$ cm. Với $a = 9$, thể tích tăng thêm bao nhiêu $\\text{cm}^3$?',
      answer: 271,
      unit: 'cm³',
      hints: ['$(a + 1)^3 - a^3 = 3a^2 + 3a + 1$.', 'Thay $a = 9$ vào $3a^2 + 3a + 1$.'],
      solution:
        '$(a + 1)^3 - a^3 = a^3 + 3a^2 + 3a + 1 - a^3 = 3a^2 + 3a + 1$. Với $a = 9$: $3 \\cdot 81 + 27 + 1 = 271\\ \\text{cm}^3$ (kiểm tra: $1000 - 729 = 271$).',
    },
  ],
  takeaways: [
    '$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$: hệ số $1, 3, 3, 1$, toàn dấu cộng.',
    '$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$: dấu xen kẽ, bắt đầu bằng dấu cộng.',
    'Khối lập phương cạnh $a + b$ gồm $1 + 3 + 3 + 1 = 8$ khối nhỏ ứng với bốn hạng tử.',
    'Nhận ra dạng lập phương giúp viết gọn biểu thức và tính nhanh, như $23^3 - 9 \\cdot 23^2 + 27 \\cdot 23 - 27 = 20^3$.',
  ],
};
