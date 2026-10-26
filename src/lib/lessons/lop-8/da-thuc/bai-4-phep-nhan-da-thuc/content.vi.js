/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép nhân đa thức nhiều biến: nhân hai đơn thức, nhân đơn thức với đa thức và nhân đa thức với đa thức, minh họa bằng mô hình diện tích.',
  intro:
    'Một hình chữ nhật có chiều dài $x + 2y$ và chiều rộng $x - y$. Diện tích của nó là tích $(x + 2y)(x - y)$. Chia hình chữ nhật thành các ô theo từng hạng tử của hai cạnh, diện tích cả hình bằng tổng diện tích các ô. Đó chính là quy tắc nhân đa thức với đa thức.',
  objectives: [
    'Nhân hai đơn thức.',
    'Nhân đơn thức với đa thức.',
    'Nhân đa thức với đa thức và thu gọn kết quả.',
  ],
  sections: [
    {
      heading: 'Nhân đơn thức với đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhân hai đơn thức',
          text: 'Để nhân hai đơn thức, ta nhân hai hệ số với nhau và nhân hai phần biến với nhau (nhân các lũy thừa cùng cơ số: $x^m \\cdot x^n = x^{m+n}$).',
        },
        {
          type: 'tex',
          tex: '(-2x^2y) \\cdot 3xy^3 = (-2 \\cdot 3) \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3) = -6x^3y^4',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhân đơn thức với đa thức',
          text: 'Muốn nhân một đơn thức với một đa thức, ta nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích với nhau.',
        },
        {
          type: 'tex',
          tex: '2x\\,(3x^2 - 5xy + 1) = 2x \\cdot 3x^2 + 2x \\cdot (-5xy) + 2x \\cdot 1 = 6x^3 - 10x^2y + 2x',
        },
      ],
    },
    {
      heading: 'Nhân đa thức với đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn nhân một đa thức với một đa thức, ta nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích với nhau.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} (x + 2y)(x - y) &= x \\cdot x + x \\cdot (-y) + 2y \\cdot x + 2y \\cdot (-y) \\\\ &= x^2 - xy + 2xy - 2y^2 \\\\ &= x^2 + xy - 2y^2 \\end{aligned}',
        },
        {
          type: 'table',
          caption: 'Mô hình diện tích (bảng nhân) của $(x + 2y)(x - y)$',
          head: ['$\\times$', '$x$', '$-y$'],
          rows: [
            ['$x$', '$x^2$', '$-xy$'],
            ['$2y$', '$2xy$', '$-2y^2$'],
          ],
        },
        {
          type: 'p',
          text: 'Một đa thức có $m$ hạng tử nhân với một đa thức có $n$ hạng tử cho $m \\cdot n$ tích (số ô của bảng). Sau đó luôn thu gọn: các tích đồng dạng phải được cộng lại.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phép nhân đa thức có các tính chất giao hoán, kết hợp và phân phối đối với phép cộng như phép nhân các số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mô hình diện tích của phép nhân',
    instruction:
      'Chọn một phép nhân. Mỗi ô của bảng là tích của hạng tử đầu hàng với hạng tử đầu cột: chạm vào ô để tính. Khi đủ các ô, bấm "Cộng các ô và thu gọn": các ô cùng màu là tích đồng dạng. Cuối cùng, đổi giá trị của $x$, $y$ để thấy tích hai thừa số luôn bằng giá trị của kết quả.',
  },
  examples: [
    {
      problem: 'Tính $3xy \\cdot (x^2 - 2xy + 4)$.',
      steps: [
        'Nhân $3xy$ với từng hạng tử: $3xy \\cdot x^2 + 3xy \\cdot (-2xy) + 3xy \\cdot 4$.',
        '$3xy \\cdot x^2 = 3x^3y$; $3xy \\cdot (-2xy) = -6x^2y^2$; $3xy \\cdot 4 = 12xy$.',
      ],
      answer: '$3xy(x^2 - 2xy + 4) = 3x^3y - 6x^2y^2 + 12xy$.',
    },
    {
      problem: 'Tính $(2x - 3y)(x + y + 4)$.',
      steps: [
        'Nhân $2x$ với từng hạng tử của đa thức thứ hai: $2x^2 + 2xy + 8x$.',
        'Nhân $-3y$ với từng hạng tử: $-3xy - 3y^2 - 12y$.',
        'Cộng các tích và thu gọn: $2x^2 + (2xy - 3xy) + 8x - 3y^2 - 12y$.',
      ],
      answer: '$(2x - 3y)(x + y + 4) = 2x^2 - xy + 8x - 3y^2 - 12y$.',
    },
    {
      problem: 'Chứng minh $(x + y)(x^2 - xy + y^2) = x^3 + y^3$.',
      steps: [
        'Nhân $x$ với từng hạng tử: $x^3 - x^2y + xy^2$.',
        'Nhân $y$ với từng hạng tử: $x^2y - xy^2 + y^3$.',
        'Cộng lại: $-x^2y + x^2y = 0$ và $xy^2 - xy^2 = 0$, chỉ còn $x^3 + y^3$.',
      ],
      answer: 'Vế trái bằng $x^3 + y^3$, đẳng thức được chứng minh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tích $(-3x^2y) \\cdot 2xy^2$ bằng',
      options: ['$-6x^2y^2$', '$-x^3y^3$', '$6x^3y^3$', '$-6x^3y^3$'],
      answer: 3,
      hints: [
        'Nhân hai hệ số: $(-3) \\cdot 2$.',
        'Cộng số mũ của cùng một biến: $x^2 \\cdot x = x^3$.',
      ],
      solution: '$(-3x^2y) \\cdot 2xy^2 = (-3 \\cdot 2) \\cdot x^{2+1} \\cdot y^{1+2} = -6x^3y^3$.',
    },
    {
      type: 'number',
      prompt: 'Tính $3xy(x^2 - 2y)$. Hệ số của hạng tử chứa $xy^2$ trong kết quả là bao nhiêu?',
      answer: -6,
      hints: ['Nhân $3xy$ với hạng tử $-2y$.'],
      solution: '$3xy(x^2 - 2y) = 3x^3y - 6xy^2$. Hệ số của $xy^2$ là $-6$.',
    },
    {
      type: 'choice',
      prompt: 'Tích $(x - 3)(x + 2)$ bằng',
      options: ['$x^2 + x - 6$', '$x^2 - 6$', '$x^2 - x - 6$', '$x^2 - 5x - 6$'],
      answer: 2,
      hints: ['Nhân $x$ với $x + 2$, nhân $-3$ với $x + 2$, rồi cộng.', '$2x - 3x = -x$.'],
      solution: '$(x - 3)(x + 2) = x^2 + 2x - 3x - 6 = x^2 - x - 6$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(2x + y)(x - 3y)$. Hệ số của hạng tử chứa $xy$ sau khi thu gọn là bao nhiêu?',
      answer: -5,
      hints: ['Có hai tích chứa $xy$: $2x \\cdot (-3y)$ và $y \\cdot x$.'],
      solution:
        '$(2x + y)(x - 3y) = 2x^2 - 6xy + xy - 3y^2 = 2x^2 - 5xy - 3y^2$. Hệ số của $xy$ là $-5$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tích với kết quả của nó.',
      left: ['$x(x + y)$', '$(x + 1)(x - 1)$', '$y(x - y)$'],
      right: ['$x^2 - 1$', '$x^2 + xy$', '$xy - y^2$', '$x^2 + 1$'],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      hints: [
        'Nhân từng hạng tử rồi thu gọn; với $(x + 1)(x - 1)$ hai tích $-x$ và $x$ triệt tiêu.',
      ],
      solution:
        '$x(x + y) = x^2 + xy$; $(x + 1)(x - 1) = x^2 - x + x - 1 = x^2 - 1$; $y(x - y) = xy - y^2$. Biểu thức $x^2 + 1$ không khớp với tích nào.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $(x^2y + 1)(xy - 2)$.',
      answer: 5,
      hints: ['Nhân ra rồi tìm bậc của từng hạng tử.', '$x^2y \\cdot xy = x^3y^2$.'],
      solution:
        '$(x^2y + 1)(xy - 2) = x^3y^2 - 2x^2y + xy - 2$. Hạng tử bậc cao nhất là $x^3y^2$ (bậc $5$), nên đa thức có bậc $5$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $(x - y)(x^2 + xy + y^2)$ tại $x = 3$, $y = 2$.',
      answer: 19,
      hints: [
        'Có thể thay số trực tiếp, hoặc nhân ra trước.',
        'Nhân ra và thu gọn ta được $x^3 - y^3$.',
      ],
      solution:
        '$(x - y)(x^2 + xy + y^2) = x^3 + x^2y + xy^2 - x^2y - xy^2 - y^3 = x^3 - y^3$. Tại $x = 3$, $y = 2$: $27 - 8 = 19$.',
    },
    {
      type: 'number',
      prompt: 'Rút gọn $x(x - 2y) - y(y - 2x)$ rồi tính giá trị tại $x = 6$, $y = 5$.',
      answer: 11,
      hints: [
        '$x(x - 2y) = x^2 - 2xy$ và $y(y - 2x) = y^2 - 2xy$.',
        'Chú ý dấu trừ đứng trước tích thứ hai.',
      ],
      solution:
        '$x^2 - 2xy - (y^2 - 2xy) = x^2 - 2xy - y^2 + 2xy = x^2 - y^2$. Tại $x = 6$, $y = 5$: $36 - 25 = 11$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chiều dài $2x + 3$ (m) và chiều rộng $x - 1$ (m). Viết đa thức biểu thị diện tích mảnh vườn rồi tính diện tích (theo $\\text{m}^2$) khi $x = 5$.',
      answer: 52,
      hints: ['Diện tích $S = (2x + 3)(x - 1)$.', 'Nhân ra: $S = 2x^2 + x - 3$.'],
      solution:
        '$S = (2x + 3)(x - 1) = 2x^2 - 2x + 3x - 3 = 2x^2 + x - 3$. Khi $x = 5$: $S = 50 + 5 - 3 = 52$ ($\\text{m}^2$); kiểm tra: $13 \\cdot 4 = 52$.',
    },
  ],
  takeaways: [
    'Nhân hai đơn thức: nhân các hệ số và nhân các phần biến (cộng số mũ của cùng một biến).',
    'Nhân đơn thức với đa thức: nhân đơn thức với từng hạng tử rồi cộng các tích.',
    'Nhân đa thức với đa thức: nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia, cộng các tích rồi thu gọn.',
  ],
};
