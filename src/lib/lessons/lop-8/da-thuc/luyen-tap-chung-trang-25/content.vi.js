/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố phép nhân đơn thức với đa thức, nhân đa thức với đa thức và phép chia đa thức cho đơn thức, rút gọn và tính giá trị biểu thức.',
  intro:
    'Phép nhân và phép chia đa thức cho đơn thức là hai phép toán ngược nhau: nhân thì cộng số mũ, chia thì trừ số mũ. Bài luyện tập này giúp em dùng chúng thành thạo khi rút gọn biểu thức, tính giá trị và tìm điều kiện để một đa thức chia hết cho một đơn thức.',
  objectives: [
    'Nhân đơn thức với đa thức, nhân đa thức với đa thức và thu gọn kết quả.',
    'Nhận biết đa thức chia hết cho đơn thức; chia đa thức cho đơn thức.',
    'Rút gọn biểu thức có cả phép nhân và phép chia rồi tính giá trị.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ', 'Ví dụ'],
          rows: [
            [
              'Nhân đơn thức với đa thức',
              'Nhân đơn thức với từng hạng tử rồi cộng các tích',
              '$2x(x - 3y) = 2x^2 - 6xy$',
            ],
            [
              'Nhân đa thức với đa thức',
              'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia, cộng các tích rồi thu gọn',
              '$(x + y)(x - 2y) = x^2 - xy - 2y^2$',
            ],
            [
              'Đơn thức chia hết cho đơn thức',
              'Mỗi biến của $B$ là biến của $A$ với số mũ không lớn hơn số mũ trong $A$',
              '$x^3y^2$ chia hết cho $x^2y$',
            ],
            [
              'Chia đa thức cho đơn thức',
              'Mọi hạng tử chia hết thì chia từng hạng tử rồi cộng các kết quả',
              '$(4x^2y - 2xy) : 2xy = 2x - 1$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Nhân lũy thừa thì cộng số mũ: $x^2 \\cdot x^3 = x^5$, không phải $x^6$. Chia một hạng tử cho chính nó được $1$, không phải $0$: $(x^2y + xy) : xy = x + 1$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới về phép nhân đa thức và phép chia đa thức cho đơn thức. Mọi đáp số là số nguyên; số âm gõ với dấu "-" đằng trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại Bài 4 hay Bài 5.',
  },
  examples: [
    {
      problem:
        'Rút gọn biểu thức $A = (x - 2y)(x + 2y) - x(x - y)$ rồi tính giá trị của $A$ tại $x = 3$, $y = 1$.',
      steps: [
        '$(x - 2y)(x + 2y) = x^2 + 2xy - 2xy - 4y^2 = x^2 - 4y^2$.',
        '$x(x - y) = x^2 - xy$.',
        '$A = x^2 - 4y^2 - (x^2 - xy) = x^2 - 4y^2 - x^2 + xy = xy - 4y^2$.',
        'Tại $x = 3$, $y = 1$: $A = 3 \\cdot 1 - 4 \\cdot 1^2 = -1$.',
      ],
      answer: '$A = xy - 4y^2$; tại $x = 3$, $y = 1$ thì $A = -1$.',
    },
    {
      problem: 'Tính $[(2x + y)(x - y) - (2x^2 - y^2)] : (-xy)$.',
      steps: [
        '$(2x + y)(x - y) = 2x^2 - 2xy + xy - y^2 = 2x^2 - xy - y^2$.',
        'Trừ đi $2x^2 - y^2$: $2x^2 - xy - y^2 - 2x^2 + y^2 = -xy$.',
        'Chia cho $-xy$: $(-xy) : (-xy) = 1$.',
      ],
      answer: 'Kết quả bằng $1$ (với $x \\ne 0$, $y \\ne 0$).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tích $2x^2y(3x - y)$ bằng',
      options: ['$6x^3y - 2x^2y^2$', '$6x^2y - 2x^2y^2$', '$6x^3y - 2x^2y$', '$5x^3y - 2x^2y^2$'],
      answer: 0,
      hints: ['Nhân $2x^2y$ với từng hạng tử $3x$ và $-y$.'],
      solution:
        '$2x^2y \\cdot 3x = 6x^3y$ và $2x^2y \\cdot (-y) = -2x^2y^2$, nên tích là $6x^3y - 2x^2y^2$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(x + 2y)(3x - y)$. Hệ số của hạng tử chứa $xy$ sau khi thu gọn là bao nhiêu?',
      answer: 5,
      hints: ['Hai tích chứa $xy$ là $x \\cdot (-y)$ và $2y \\cdot 3x$.'],
      solution:
        '$(x + 2y)(3x - y) = 3x^2 - xy + 6xy - 2y^2 = 3x^2 + 5xy - 2y^2$. Hệ số của $xy$ là $5$.',
    },
    {
      type: 'choice',
      prompt: 'Tích $(x - y)(x^2 + xy + y^2)$ bằng',
      options: ['$x^3 - y^3$', '$x^3 + y^3$', '$x^3 - 2x^2y + y^3$', '$x^3 + 2xy - y^3$'],
      answer: 0,
      hints: [
        'Nhân $x$ rồi nhân $-y$ với từng hạng tử của $x^2 + xy + y^2$.',
        'Các hạng tử $x^2y$ và $xy^2$ triệt tiêu.',
      ],
      solution: '$x^3 + x^2y + xy^2 - x^2y - xy^2 - y^3 = x^3 - y^3$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép chia $(6x^3y - 3x^2y^2) : (-3x^2y)$ là',
      options: ['$-2x + y$', '$2x - y$', '$-2x - y$', '$-2xy + y$'],
      answer: 0,
      hints: ['Chia từng hạng tử cho $-3x^2y$; chú ý dấu.'],
      solution: '$6x^3y : (-3x^2y) = -2x$ và $-3x^2y^2 : (-3x^2y) = y$. Thương là $-2x + y$.',
    },
    {
      type: 'number',
      prompt:
        'Thực hiện phép chia $(15x^4y^3 - 10x^3y^2 + 5x^2y^2) : 5x^2y^2$ rồi tính giá trị của thương tại $x = -1$, $y = 2$.',
      answer: 9,
      hints: ['Thương là $3x^2y - 2x + 1$.', 'Thay $x = -1$, $y = 2$: $x^2 = 1$.'],
      solution:
        'Thương bằng $3x^2y - 2x + 1$. Tại $x = -1$, $y = 2$: $3 \\cdot 1 \\cdot 2 - 2 \\cdot (-1) + 1 = 6 + 2 + 1 = 9$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đa thức chia hết cho đơn thức $3xy$.',
      options: [
        '$6x^2y - 9xy^2$',
        '$x^2y + xy$',
        '$3xy + 3x$',
        '$12x^3y^2 - 2xy^3 + xy$',
        '$9x^2 - 3xy$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Mọi hạng tử phải chứa cả $x$ và $y$.',
        'Hệ số không cần chia hết cho $3$: $xy : 3xy = \\frac{1}{3}$.',
      ],
      solution:
        'Các đa thức $6x^2y - 9xy^2$, $x^2y + xy$ và $12x^3y^2 - 2xy^3 + xy$ có mọi hạng tử chứa cả $x$ và $y$ nên chia hết cho $3xy$. Đa thức $3xy + 3x$ có hạng tử $3x$ không chứa $y$; đa thức $9x^2 - 3xy$ có hạng tử $9x^2$ không chứa $y$.',
    },
    {
      type: 'fraction',
      prompt:
        'Thực hiện phép chia $(4x^3y^2 - 6x^2y^3) : 4x^2y^2$. Hệ số của hạng tử chứa $y$ trong thương là bao nhiêu?',
      answer: [-3, 2],
      hints: ['Chia $-6x^2y^3$ cho $4x^2y^2$: hệ số $-6 : 4$.'],
      solution:
        '$4x^3y^2 : 4x^2y^2 = x$ và $-6x^2y^3 : 4x^2y^2 = -\\frac{3}{2}y$. Thương là $x - \\frac{3}{2}y$, hệ số của $y$ là $-\\frac{3}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn biểu thức $x(x - 2y) - (x - y)(x + y)$ rồi tính giá trị tại $x = 2$, $y = -3$.',
      answer: 21,
      hints: ['$(x - y)(x + y) = x^2 - y^2$.', 'Biểu thức rút gọn là $-2xy + y^2$.'],
      solution:
        '$x^2 - 2xy - (x^2 - y^2) = -2xy + y^2$. Tại $x = 2$, $y = -3$: $-2 \\cdot 2 \\cdot (-3) + (-3)^2 = 12 + 9 = 21$.',
    },
    {
      type: 'number',
      prompt:
        'Chứng tỏ giá trị của biểu thức $(x + 2)(x - 3) - x(x - 1)$ không phụ thuộc vào giá trị của $x$. Giá trị đó bằng bao nhiêu?',
      answer: -6,
      hints: ['Nhân ra cả hai tích rồi thu gọn.', '$(x + 2)(x - 3) = x^2 - x - 6$.'],
      solution:
        '$(x + 2)(x - 3) - x(x - 1) = x^2 - 3x + 2x - 6 - x^2 + x = -6$. Biểu thức luôn bằng $-6$ với mọi $x$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số tự nhiên $n$ nhỏ nhất để đa thức $3x^5y^n - x^ny^3$ chia hết cho đơn thức $x^3y^2$.',
      answer: 3,
      hints: [
        'Hạng tử $3x^5y^n$ cần số mũ của $y$ ít nhất là $2$.',
        'Hạng tử $-x^ny^3$ cần số mũ của $x$ ít nhất là $3$.',
      ],
      solution:
        'Cần đồng thời $n \\ge 2$ và $n \\ge 3$, tức là $n \\ge 3$. Số tự nhiên nhỏ nhất là $n = 3$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tích với kết quả của nó.',
      left: ['$(x + 1)(x + 2)$', '$(x - 1)(x + 2)$', '$(x + 1)(x - 2)$'],
      right: ['$x^2 - x - 2$', '$x^2 + 3x + 2$', '$x^2 + x - 2$', '$x^2 - 3x + 2$'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Hạng tử bậc nhất có hệ số bằng tổng hai số; hạng tử tự do bằng tích hai số.'],
      solution:
        '$(x + 1)(x + 2) = x^2 + 3x + 2$; $(x - 1)(x + 2) = x^2 + x - 2$; $(x + 1)(x - 2) = x^2 - x - 2$. Đa thức $x^2 - 3x + 2$ là tích $(x - 1)(x - 2)$, không có trong cột trái.',
    },
    {
      type: 'number',
      prompt:
        'Một bể cá hình hộp chữ nhật có chiều dài $x + 3$ (dm), chiều rộng $x$ (dm) và chiều cao $2$ dm. Viết đa thức biểu thị thể tích của bể rồi tính thể tích (theo $\\text{dm}^3$) khi $x = 4$.',
      answer: 56,
      hints: ['Thể tích bằng chiều dài nhân chiều rộng nhân chiều cao.', '$V = 2x(x + 3)$.'],
      solution:
        '$V = (x + 3) \\cdot x \\cdot 2 = 2x^2 + 6x$ ($\\text{dm}^3$). Khi $x = 4$: $V = 32 + 24 = 56$ ($\\text{dm}^3$); kiểm tra: $7 \\cdot 4 \\cdot 2 = 56$.',
    },
  ],
  takeaways: [
    'Nhân đa thức: nhân từng hạng tử rồi thu gọn; số hạng tử trước khi thu gọn bằng tích số hạng tử của hai đa thức.',
    'Chia đa thức cho đơn thức chỉ thực hiện được khi mọi hạng tử chia hết; thử lại bằng phép nhân.',
    'Rút gọn trước khi thay số giúp tính giá trị nhanh và ít nhầm.',
  ],
};
