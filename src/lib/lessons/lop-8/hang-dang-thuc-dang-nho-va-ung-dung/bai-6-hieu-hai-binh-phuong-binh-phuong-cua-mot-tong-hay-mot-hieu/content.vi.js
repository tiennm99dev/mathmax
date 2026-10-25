/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba hằng đẳng thức đáng nhớ: hiệu hai bình phương, bình phương của một tổng và bình phương của một hiệu, chứng minh bằng diện tích và dùng để tính nhanh.',
  intro:
    'Có những phép nhân đa thức xuất hiện nhiều đến mức ta học thuộc kết quả của chúng: đó là các hằng đẳng thức đáng nhớ. Bài này giới thiệu ba hằng đẳng thức đầu tiên. Mỗi đẳng thức đều có một hình ảnh diện tích dễ nhớ, và giúp em tính nhẩm những phép tính như $99^2$ hay $51 \\cdot 49$ trong vài giây.',
  objectives: [
    'Nhận biết và phát biểu hằng đẳng thức $a^2 - b^2 = (a + b)(a - b)$.',
    'Nhận biết và phát biểu $(a + b)^2 = a^2 + 2ab + b^2$ và $(a - b)^2 = a^2 - 2ab + b^2$.',
    'Giải thích các hằng đẳng thức bằng cắt ghép diện tích.',
    'Vận dụng để khai triển, viết gọn biểu thức và tính nhanh.',
  ],
  sections: [
    {
      heading: 'Hằng đẳng thức là gì?',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hằng đẳng thức',
          text: 'Nếu hai biểu thức $A$ và $B$ luôn nhận giá trị bằng nhau với mọi giá trị của các biến thì $A = B$ được gọi là một hằng đẳng thức (hay đồng nhất thức).',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $2(x + 1) = 2x + 2$ đúng với mọi $x$ nên là hằng đẳng thức, còn $x + 1 = 3$ chỉ đúng khi $x = 2$ nên không phải hằng đẳng thức.',
        },
      ],
    },
    {
      heading: 'Hiệu hai bình phương',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Với mọi biểu thức $A$, $B$: $$A^2 - B^2 = (A + B)(A - B).$$',
        },
        {
          type: 'p',
          text: 'Nhân vế phải ra là thấy ngay đẳng thức đúng:',
        },
        { type: 'tex', tex: '(A + B)(A - B) = A^2 - AB + AB - B^2 = A^2 - B^2' },
        {
          type: 'p',
          text: 'Về mặt hình học, cắt góc vuông cạnh $b$ khỏi hình vuông cạnh $a$ còn lại hình chữ L; cắt dải trên của chữ L ghép sang bên cạnh, ta được hình chữ nhật $(a + b) \\times (a - b)$.',
        },
        { type: 'tex', tex: '51 \\cdot 49 = (50 + 1)(50 - 1) = 50^2 - 1^2 = 2499' },
      ],
    },
    {
      heading: 'Bình phương của một tổng và của một hiệu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Với mọi biểu thức $A$, $B$: $$(A + B)^2 = A^2 + 2AB + B^2,$$ $$(A - B)^2 = A^2 - 2AB + B^2.$$',
        },
        {
          type: 'p',
          text: 'Hình vuông cạnh $a + b$ được chia thành một hình vuông $a \\times a$, một hình vuông $b \\times b$ và hai hình chữ nhật $a \\times b$, nên diện tích là $a^2 + 2ab + b^2$.',
        },
        {
          type: 'table',
          caption: 'Ba hằng đẳng thức và cách đọc',
          head: ['Hằng đẳng thức', 'Đọc là'],
          rows: [
            ['$(A + B)^2 = A^2 + 2AB + B^2$', 'Bình phương của một tổng'],
            ['$(A - B)^2 = A^2 - 2AB + B^2$', 'Bình phương của một hiệu'],
            ['$A^2 - B^2 = (A + B)(A - B)$', 'Hiệu hai bình phương'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '$(a + b)^2 \\ne a^2 + b^2$. Đừng quên hạng tử $2ab$: ví dụ $(3 + 4)^2 = 49$ trong khi $3^2 + 4^2 = 25$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cắt ghép hình chữ L',
    instruction:
      'Kéo hai thanh trượt để chọn a và b (với b ≤ a). Hình chữ L bên trái và hình chữ nhật bên phải luôn có cùng diện tích a² − b².',
  },
  examples: [
    {
      problem: 'Khai triển $(2x + 3)^2$.',
      steps: [
        'Áp dụng bình phương của một tổng với $A = 2x$, $B = 3$.',
        '$(2x)^2 + 2 \\cdot 2x \\cdot 3 + 3^2$.',
      ],
      answer: '$(2x + 3)^2 = 4x^2 + 12x + 9$.',
    },
    {
      problem: 'Tính nhanh $99^2$.',
      steps: [
        'Viết $99 = 100 - 1$.',
        '$(100 - 1)^2 = 100^2 - 2 \\cdot 100 \\cdot 1 + 1^2$.',
        '$= 10000 - 200 + 1$.',
      ],
      answer: '$99^2 = 9801$.',
    },
    {
      problem: 'Viết $x^2 - 16$ dưới dạng tích.',
      steps: ['$16 = 4^2$, nên $x^2 - 16 = x^2 - 4^2$.', 'Áp dụng hiệu hai bình phương.'],
      answer: '$x^2 - 16 = (x + 4)(x - 4)$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính nhanh $102 \\cdot 98$.',
      answer: 9996,
      hints: ['$102 = 100 + 2$ và $98 = 100 - 2$.', 'Dùng $(a + b)(a - b) = a^2 - b^2$.'],
      solution: '$102 \\cdot 98 = 100^2 - 2^2 = 10000 - 4 = 9996$.',
    },
    {
      type: 'choice',
      prompt: 'Khai triển $(x - 5)^2$ được',
      options: ['$x^2 - 25$', '$x^2 - 10x + 25$', '$x^2 + 10x + 25$', '$x^2 - 5x + 25$'],
      answer: 1,
      hints: ['Bình phương của một hiệu: $A^2 - 2AB + B^2$.', '$2 \\cdot x \\cdot 5 = 10x$.'],
      solution: '$(x - 5)^2 = x^2 - 2 \\cdot x \\cdot 5 + 5^2 = x^2 - 10x + 25$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $47^2 - 53^2$.',
      answer: -600,
      hints: ['Dùng $a^2 - b^2 = (a + b)(a - b)$.', '$47 + 53 = 100$ và $47 - 53 = -6$.'],
      solution: '$47^2 - 53^2 = (47 + 53)(47 - 53) = 100 \\cdot (-6) = -600$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với dạng khai triển của nó.',
      left: ['$(x + 1)^2$', '$(x - 1)^2$', '$(x + 1)(x - 1)$'],
      right: ['$x^2 - 1$', '$x^2 + 2x + 1$', '$x^2 - 2x + 1$', '$x^2 + 1$'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Nhớ hạng tử $2AB$ trong bình phương của tổng và hiệu.'],
      solution:
        '$(x + 1)^2 = x^2 + 2x + 1$, $(x - 1)^2 = x^2 - 2x + 1$, $(x + 1)(x - 1) = x^2 - 1$. Biểu thức $x^2 + 1$ không khớp với cái nào.',
    },
    {
      type: 'number',
      prompt: 'Biết $a + b = 7$ và $ab = 10$. Tính $a^2 + b^2$.',
      answer: 29,
      hints: ['$(a + b)^2 = a^2 + 2ab + b^2$.', 'Suy ra $a^2 + b^2 = (a + b)^2 - 2ab$.'],
      solution: '$a^2 + b^2 = 7^2 - 2 \\cdot 10 = 49 - 20 = 29$.',
    },
    {
      type: 'number',
      prompt: 'Điền số thích hợp: $x^2 + 6x + \\square = (x + 3)^2$.',
      answer: 9,
      hints: ['$6x = 2 \\cdot x \\cdot 3$, nên $B = 3$.'],
      solution: '$(x + 3)^2 = x^2 + 6x + 3^2$, ô trống là $9$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng với mọi $a$, $b$?',
      options: [
        '$(a + b)^2 = a^2 + b^2$',
        '$(a - b)^2 = (b - a)^2$',
        '$a^2 - b^2 = (a - b)^2$',
        '$(a + b)^2 = (a - b)^2$',
      ],
      answer: 1,
      hints: [
        'Thử với $a = 3$, $b = 1$.',
        '$b - a = -(a - b)$, và bình phương của hai số đối bằng nhau.',
      ],
      solution:
        '$(b - a)^2 = (-(a - b))^2 = (a - b)^2$. Các khẳng định còn lại sai, ví dụ với $a = 3$, $b = 1$.',
    },
  ],
  takeaways: [
    '$A^2 - B^2 = (A + B)(A - B)$: hiệu hai bình phương bằng tích của tổng và hiệu.',
    '$(A + B)^2 = A^2 + 2AB + B^2$ và $(A - B)^2 = A^2 - 2AB + B^2$; đừng quên hạng tử $2AB$.',
    'Viết một số thành $100 \\pm k$ hoặc $50 \\pm k$ để tính nhẩm nhanh bằng hằng đẳng thức.',
  ],
};
