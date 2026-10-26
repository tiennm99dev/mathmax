/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân tích đa thức thành nhân tử bằng ba phương pháp: đặt nhân tử chung, sử dụng hằng đẳng thức và nhóm hạng tử, cùng ứng dụng tìm x và tính nhanh.',
  intro:
    'Một mảnh vườn hình chữ nhật có diện tích $x^2 + 5x + 6$ mét vuông. Chiều dài và chiều rộng của nó là bao nhiêu? Muốn trả lời, ta cần viết đa thức thành một tích, tức là làm ngược lại phép nhân đa thức. Bài này giới thiệu ba cách làm việc đó.',
  objectives: [
    'Hiểu thế nào là phân tích đa thức thành nhân tử.',
    'Phân tích đa thức thành nhân tử bằng cách đặt nhân tử chung.',
    'Phân tích đa thức thành nhân tử bằng cách sử dụng hằng đẳng thức.',
    'Phân tích đa thức thành nhân tử bằng cách nhóm hạng tử; vận dụng để tìm x và tính nhanh.',
  ],
  sections: [
    {
      heading: 'Phân tích đa thức thành nhân tử là gì?',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Phân tích đa thức thành nhân tử (hay thừa số) là biến đổi đa thức đó thành một tích của những đa thức.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $x^2 + 5x + 6 = (x + 2)(x + 3)$: vế phải là tích của hai đa thức. Nhân ngược lại để kiểm tra: $(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.',
        },
      ],
    },
    {
      heading: 'Phương pháp đặt nhân tử chung',
      blocks: [
        {
          type: 'p',
          text: 'Khi mọi hạng tử của đa thức có chung một nhân tử, ta đặt nhân tử chung đó ra ngoài dấu ngoặc theo tính chất phân phối: $AB + AC = A(B + C)$.',
        },
        { type: 'tex', tex: '3x^2y - 6xy^2 = 3xy \\cdot x - 3xy \\cdot 2y = 3xy(x - 2y)' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đổi dấu để làm xuất hiện nhân tử chung',
          text: 'Nhiều khi cần dùng $A = -(-A)$, ví dụ $y - x = -(x - y)$, để các hạng tử có cùng một nhân tử.',
        },
      ],
    },
    {
      heading: 'Phương pháp sử dụng hằng đẳng thức',
      blocks: [
        {
          type: 'p',
          text: 'Nếu đa thức có dạng vế phải của một hằng đẳng thức đáng nhớ, ta viết nó thành tích theo vế còn lại.',
        },
        {
          type: 'table',
          head: ['Đa thức', 'Hằng đẳng thức dùng', 'Kết quả'],
          rows: [
            ['$x^2 - 6x + 9$', 'Bình phương của một hiệu', '$(x - 3)^2$'],
            ['$4x^2 - 9$', 'Hiệu hai bình phương', '$(2x - 3)(2x + 3)$'],
            ['$x^3 + 27$', 'Tổng hai lập phương', '$(x + 3)(x^2 - 3x + 9)$'],
            ['$x^3 - 3x^2 + 3x - 1$', 'Lập phương của một hiệu', '$(x - 1)^3$'],
          ],
        },
      ],
    },
    {
      heading: 'Phương pháp nhóm hạng tử',
      blocks: [
        {
          type: 'p',
          text: 'Khi các hạng tử chưa có nhân tử chung, ta nhóm chúng thành từng nhóm thích hợp sao cho mỗi nhóm phân tích được, và sau đó các nhóm lại có nhân tử chung (hoặc dùng được hằng đẳng thức).',
        },
        {
          type: 'tex',
          tex: 'x^2 - xy + x - y = (x^2 - xy) + (x - y) = x(x - y) + (x - y) = (x - y)(x + 1)',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi nhóm các hạng tử và đặt dấu $-$ trước ngoặc, phải đổi dấu mọi hạng tử trong ngoặc: $-x + y = -(x - y)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng',
          text: 'Một tích bằng $0$ khi một trong các thừa số bằng $0$. Vì thế, phân tích vế trái thành nhân tử giúp tìm $x$: $x^2 - 4x = 0 \\Leftrightarrow x(x - 4) = 0$, nên $x = 0$ hoặc $x = 4$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp mảnh thành hình chữ nhật',
    instruction:
      'Chọn một đa thức. Đa thức có một hình vuông x², một số thanh x và một số ô đơn vị. Dùng nút − / + để chọn bao nhiêu thanh x đặt bên phải, phần còn lại nằm phía dưới. Khi các ô đơn vị lấp vừa góc, em đọc được hai cạnh của hình chữ nhật, cũng là hai nhân tử.',
  },
  examples: [
    {
      problem: 'Phân tích đa thức $5x(x - y) - 3(y - x)$ thành nhân tử.',
      steps: [
        'Đổi dấu: $-3(y - x) = 3(x - y)$.',
        '$5x(x - y) - 3(y - x) = 5x(x - y) + 3(x - y)$.',
        'Đặt nhân tử chung $x - y$ ra ngoài.',
      ],
      answer: '$5x(x - y) - 3(y - x) = (x - y)(5x + 3)$.',
    },
    {
      problem: 'Phân tích đa thức $4x^2 - 9$ thành nhân tử.',
      steps: [
        '$4x^2 = (2x)^2$ và $9 = 3^2$.',
        'Áp dụng hiệu hai bình phương: $(2x)^2 - 3^2 = (2x - 3)(2x + 3)$.',
      ],
      answer: '$4x^2 - 9 = (2x - 3)(2x + 3)$.',
    },
    {
      problem: 'Phân tích đa thức $x^2 + 2x + 1 - y^2$ thành nhân tử.',
      steps: [
        'Nhóm ba hạng tử đầu: $x^2 + 2x + 1 = (x + 1)^2$.',
        'Đa thức bằng $(x + 1)^2 - y^2$, là hiệu hai bình phương.',
        '$(x + 1)^2 - y^2 = (x + 1 - y)(x + 1 + y)$.',
      ],
      answer: '$x^2 + 2x + 1 - y^2 = (x - y + 1)(x + y + 1)$.',
    },
    {
      problem: 'Tìm $x$, biết $x^2 - 4x = 0$.',
      steps: [
        'Đặt nhân tử chung: $x^2 - 4x = x(x - 4)$.',
        '$x(x - 4) = 0$ khi $x = 0$ hoặc $x - 4 = 0$.',
      ],
      answer: '$x = 0$ hoặc $x = 4$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phân tích $6x^2 - 9x$ thành nhân tử được',
      options: ['$3x(2x - 9)$', '$3x(2x - 3)$', '$6x(x - 9)$', '$3x(3x - 2)$'],
      answer: 1,
      hints: ['Nhân tử chung của $6x^2$ và $9x$ là $3x$.', 'Chia từng hạng tử cho $3x$.'],
      solution: '$6x^2 - 9x = 3x \\cdot 2x - 3x \\cdot 3 = 3x(2x - 3)$.',
    },
    {
      type: 'number',
      prompt: 'Điền số thích hợp: $x^2 - 10x + 25 = (x - \\square)^2$.',
      answer: 5,
      hints: ['Đây là bình phương của một hiệu.', '$25 = 5^2$ và $10x = 2 \\cdot x \\cdot 5$.'],
      solution: '$x^2 - 10x + 25 = x^2 - 2 \\cdot x \\cdot 5 + 5^2 = (x - 5)^2$.',
    },
    {
      type: 'choice',
      prompt: 'Phân tích $x^3 - x$ thành nhân tử được',
      options: ['$x(x - 1)^2$', '$(x - 1)(x + 1)$', '$x(x - 1)(x + 1)$', '$x^2(x - 1)$'],
      answer: 2,
      hints: [
        'Đặt nhân tử chung $x$ trước.',
        'Trong ngoặc còn $x^2 - 1$, là hiệu hai bình phương.',
      ],
      solution: '$x^3 - x = x(x^2 - 1) = x(x - 1)(x + 1)$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đa thức với dạng phân tích thành nhân tử của nó.',
      left: ['$x^2 - 4$', '$x^2 + 3x$', '$xy + y + x + 1$'],
      right: ['$x(x + 3)$', '$(x + 1)(y + 1)$', '$(x - 2)(x + 2)$', '$(x + 4)(x - 1)$'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: [
        'Mỗi đa thức dùng một phương pháp: hằng đẳng thức, đặt nhân tử chung, nhóm hạng tử.',
        '$xy + y + x + 1 = y(x + 1) + (x + 1)$.',
      ],
      solution:
        '$x^2 - 4 = (x - 2)(x + 2)$; $x^2 + 3x = x(x + 3)$; $xy + y + x + 1 = y(x + 1) + (x + 1) = (x + 1)(y + 1)$. Tích $(x + 4)(x - 1) = x^2 + 3x - 4$ không khớp.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các giá trị của $x$ thoả mãn $x^2 - 9 = 0$.',
      options: ['$-3$', '$0$', '$3$', '$9$'],
      answers: [0, 2],
      hints: ['$x^2 - 9 = (x - 3)(x + 3)$.', 'Một tích bằng $0$ khi một thừa số bằng $0$.'],
      solution:
        '$x^2 - 9 = (x - 3)(x + 3) = 0$ nên $x - 3 = 0$ hoặc $x + 3 = 0$, tức $x = 3$ hoặc $x = -3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x \\ne 0$, biết $x^2 - 7x = 0$.',
      answer: 7,
      hints: ['Đặt nhân tử chung $x$.', '$x(x - 7) = 0$; loại $x = 0$.'],
      solution: '$x^2 - 7x = x(x - 7) = 0$, nên $x = 0$ hoặc $x = 7$. Vì $x \\ne 0$ nên $x = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $15 \\cdot 91{,}5 + 150 \\cdot 0{,}85$.',
      answer: 1500,
      hints: [
        '$150 \\cdot 0{,}85 = 15 \\cdot 8{,}5$.',
        'Đặt nhân tử chung $15$; $91{,}5 + 8{,}5 = 100$.',
      ],
      solution:
        '$15 \\cdot 91{,}5 + 150 \\cdot 0{,}85 = 15 \\cdot 91{,}5 + 15 \\cdot 8{,}5 = 15 \\cdot (91{,}5 + 8{,}5) = 15 \\cdot 100 = 1500$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^2 - 2x + 1 - y^2$ tại $x = 51$, $y = 10$.',
      answer: 2400,
      hints: ['Nhóm $x^2 - 2x + 1 = (x - 1)^2$.', '$(x - 1)^2 - y^2 = (x - 1 - y)(x - 1 + y)$.'],
      solution:
        '$x^2 - 2x + 1 - y^2 = (x - 1)^2 - y^2 = (x - 1 - y)(x - 1 + y)$. Tại $x = 51$, $y = 10$: $(51 - 1 - 10)(51 - 1 + 10) = 40 \\cdot 60 = 2400$.',
    },
    {
      type: 'number',
      prompt:
        'Mảnh vườn hình chữ nhật có diện tích $x^2 + 5x + 6$ ($\\text{m}^2$) và chiều rộng $x + 2$ (m), với $x > 0$. Chiều dài hơn chiều rộng bao nhiêu mét?',
      answer: 1,
      unit: 'm',
      hints: [
        'Phân tích $x^2 + 5x + 6$ thành tích có một nhân tử là $x + 2$.',
        '$x^2 + 5x + 6 = x^2 + 2x + 3x + 6$; nhóm hai hạng tử một.',
      ],
      solution:
        '$x^2 + 5x + 6 = (x^2 + 2x) + (3x + 6) = x(x + 2) + 3(x + 2) = (x + 2)(x + 3)$. Chiều dài là $x + 3$ (m), hơn chiều rộng $(x + 3) - (x + 2) = 1$ m.',
    },
  ],
  takeaways: [
    'Phân tích đa thức thành nhân tử là viết đa thức thành một tích các đa thức.',
    'Đặt nhân tử chung: $AB + AC = A(B + C)$; có khi phải đổi dấu để thấy nhân tử chung.',
    'Dùng hằng đẳng thức khi đa thức có dạng một vế của hằng đẳng thức đáng nhớ.',
    'Nhóm hạng tử để mỗi nhóm phân tích được và giữa các nhóm xuất hiện nhân tử chung.',
    'Tích bằng $0$ khi một thừa số bằng $0$: phân tích thành nhân tử giúp tìm $x$.',
  ],
};
