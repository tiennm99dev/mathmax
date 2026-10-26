/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố đơn thức, đa thức, thu gọn và tìm bậc, tính giá trị, phép cộng và phép trừ đa thức nhiều biến.',
  intro:
    'Ba bài đầu của chương cho em bộ công cụ cơ bản để làm việc với đa thức nhiều biến: thu gọn đơn thức, gộp các hạng tử đồng dạng, đọc bậc, rồi cộng và trừ hai đa thức. Bài luyện tập này giúp em dùng chúng nhanh và chính xác, đặc biệt là những chỗ hay nhầm: quên đổi dấu khi trừ, tìm bậc khi chưa thu gọn.',
  objectives: [
    'Thu gọn đơn thức; tìm hệ số, bậc; nhận biết và cộng các đơn thức đồng dạng.',
    'Thu gọn đa thức, tìm bậc và tính giá trị của đa thức.',
    'Cộng, trừ hai đa thức; tìm đa thức chưa biết trong một tổng hay một hiệu.',
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
              'Đơn thức thu gọn',
              'Hệ số nhân phần biến, mỗi biến xuất hiện một lần',
              '$2x \\cdot 3xy = 6x^2y$',
            ],
            [
              'Bậc của đơn thức',
              'Tổng số mũ các biến (hệ số khác $0$); số khác $0$ có bậc $0$',
              '$6x^2y$ có bậc $3$',
            ],
            [
              'Đơn thức đồng dạng',
              'Hệ số khác $0$, cùng phần biến; cộng hệ số, giữ phần biến',
              '$3xy^2 - 5xy^2 = -2xy^2$',
            ],
            [
              'Bậc của đa thức',
              'Bậc cao nhất của các hạng tử trong dạng thu gọn',
              '$x^2y - 3xy + 1$ có bậc $3$',
            ],
            [
              'Trừ hai đa thức',
              'Bỏ ngoặc sau dấu "$-$": đổi dấu mọi hạng tử',
              '$-(x - 2y) = -x + 2y$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 1, Bài 2 và Bài 3. Mọi đáp số là số nguyên; số âm gõ với dấu "-" đằng trước, ví dụ $-12$.',
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
      problem: 'Thu gọn rồi tìm bậc của đa thức $Q = x^6 - 2x^3y^4 + 3xy - x^6 + 1$.',
      steps: [
        'Nhóm các hạng tử đồng dạng: $Q = (x^6 - x^6) - 2x^3y^4 + 3xy + 1$.',
        '$x^6 - x^6 = 0$, nên $Q = -2x^3y^4 + 3xy + 1$.',
        'Các hạng tử có bậc $7$, $2$, $0$.',
      ],
      answer: '$Q = -2x^3y^4 + 3xy + 1$, có bậc $7$.',
    },
    {
      problem: 'Tìm đa thức $M$, biết $M - (x^2y - 2xy + 1) = 3x^2y + xy$.',
      steps: [
        '$M$ là số bị trừ, nên $M = (3x^2y + xy) + (x^2y - 2xy + 1)$.',
        'Bỏ ngoặc và nhóm: $M = (3x^2y + x^2y) + (xy - 2xy) + 1$.',
      ],
      answer: '$M = 4x^2y - xy + 1$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm bậc của đơn thức $\\frac{2}{3}x^2y^3z$.',
      answer: 6,
      hints: ['Bậc là tổng số mũ của các biến; hệ số không ảnh hưởng.'],
      solution: 'Bậc là $2 + 3 + 1 = 6$.',
    },
    {
      type: 'number',
      prompt: 'Đơn thức $-5$ có bậc bao nhiêu?',
      answer: 0,
      hints: ['$-5$ là một số khác $0$.'],
      solution: 'Mọi số khác $0$ là đơn thức bậc $0$, nên $-5$ có bậc $0$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp đơn thức nào đồng dạng?',
      options: [
        '$2x^2y$ và $2xy^2$',
        '$-\\frac{1}{3}xy^2z$ và $5y^2zx$',
        '$x^3$ và $3x$',
        '$4xy$ và $4x^2y^2$',
      ],
      answer: 1,
      hints: [
        'Đồng dạng cần cùng phần biến; hệ số giống nhau không quan trọng.',
        'Viết lại $5y^2zx$ theo thứ tự $x$, $y$, $z$.',
      ],
      solution:
        '$5y^2zx = 5xy^2z$ có cùng phần biến $xy^2z$ với $-\\frac{1}{3}xy^2z$. Các cặp còn lại khác số mũ nên không đồng dạng.',
    },
    {
      type: 'number',
      prompt:
        'Thu gọn đơn thức $\\left(-\\frac{1}{2}x^2y\\right) \\cdot 4xy^2 \\cdot (-3x)$. Hệ số của nó là bao nhiêu?',
      answer: 6,
      hints: ['Nhân ba hệ số: $-\\frac{1}{2} \\cdot 4 \\cdot (-3)$.'],
      solution:
        '$\\left(-\\frac{1}{2}\\right) \\cdot 4 \\cdot (-3) = 6$ và $x^2 \\cdot x \\cdot x = x^4$, $y \\cdot y^2 = y^3$. Đơn thức thu gọn là $6x^4y^3$, hệ số $6$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đơn thức hay đa thức với bậc của nó.',
      left: ['$x^2y^3$', '$-7$', '$xy + 1$'],
      right: ['bậc $0$', 'bậc $5$', 'bậc $2$', 'bậc $1$'],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      hints: ['Đơn thức: cộng số mũ. Đa thức: lấy bậc cao nhất của các hạng tử.'],
      solution:
        '$x^2y^3$ có bậc $5$; $-7$ là số khác $0$ nên có bậc $0$; $xy + 1$ có hạng tử $xy$ bậc $2$ nên có bậc $2$.',
    },
    {
      type: 'choice',
      prompt: 'Thu gọn đa thức $P = 3x^2y - 2xy^2 + x^2y + 5xy^2 - 1$ ta được',
      options: [
        '$4x^2y + 7xy^2 - 1$',
        '$4x^2y + 3xy^2 - 1$',
        '$3x^2y + 3xy^2 - 1$',
        '$7x^3y^3 - 1$',
      ],
      answer: 1,
      hints: ['Nhóm $3x^2y$ với $x^2y$, nhóm $-2xy^2$ với $5xy^2$.'],
      solution: '$P = (3x^2y + x^2y) + (-2xy^2 + 5xy^2) - 1 = 4x^2y + 3xy^2 - 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $x^6 - 2x^3y^4 + 3xy - x^6 + 1$.',
      answer: 7,
      hints: ['Thu gọn trước: hai hạng tử $x^6$ triệt tiêu.'],
      solution: 'Dạng thu gọn là $-2x^3y^4 + 3xy + 1$, hạng tử bậc cao nhất có bậc $3 + 4 = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của đa thức $M = 2x^2y - 3xy + y^2$ tại $x = -1$, $y = 2$.',
      answer: 14,
      hints: ['Thay $x = -1$, $y = 2$ vào từng hạng tử.', '$-3xy = -3 \\cdot (-1) \\cdot 2 = 6$.'],
      solution: '$M = 2 \\cdot (-1)^2 \\cdot 2 - 3 \\cdot (-1) \\cdot 2 + 2^2 = 4 + 6 + 4 = 14$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A = 4x^2y - xy + 3$ và $B = x^2y + 2xy - 5$. Đa thức $A - B$ là',
      options: ['$3x^2y + xy - 2$', '$3x^2y - 3xy + 8$', '$5x^2y + xy - 2$', '$3x^2y - 3xy - 2$'],
      answer: 1,
      hints: ['Đổi dấu mọi hạng tử của $B$: $-x^2y - 2xy + 5$.'],
      solution: '$A - B = 4x^2y - xy + 3 - x^2y - 2xy + 5 = 3x^2y - 3xy + 8$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm đa thức $M$, biết $M - (x^2y - 2xy + 1) = 3x^2y + xy$. Hệ số của hạng tử chứa $xy$ trong $M$ là bao nhiêu?',
      answer: -1,
      hints: ['$M = (3x^2y + xy) + (x^2y - 2xy + 1)$.'],
      solution: '$M = 4x^2y - xy + 1$, hệ số của $xy$ là $-1$.',
    },
    {
      type: 'number',
      prompt:
        'Tính giá trị của biểu thức $(3x^2y - 2xy + 5) + (-3x^2y + 2xy + 4)$ tại $x = 7$, $y = -3$.',
      answer: 9,
      hints: ['Thu gọn tổng trước khi thay số.'],
      solution:
        'Tổng bằng $(3x^2y - 3x^2y) + (-2xy + 2xy) + (5 + 4) = 9$, không phụ thuộc vào $x$, $y$. Vậy giá trị là $9$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình chữ nhật có chiều dài $3x + y$ (m) và chiều rộng $x + 2y$ (m). Viết đa thức biểu thị chu vi rồi tính chu vi khi $x = 10$, $y = 5$.',
      answer: 110,
      unit: 'm',
      hints: ['Chu vi bằng hai lần tổng chiều dài và chiều rộng.', 'Tổng hai cạnh là $4x + 3y$.'],
      solution:
        'Chu vi $= 2[(3x + y) + (x + 2y)] = 2(4x + 3y) = 8x + 6y$. Khi $x = 10$, $y = 5$: $80 + 30 = 110$ (m).',
    },
  ],
  takeaways: [
    'Muốn tìm bậc (của đơn thức hay đa thức) phải thu gọn trước.',
    'Khi trừ đa thức, dấu "$-$" trước ngoặc đổi dấu tất cả các hạng tử trong ngoặc.',
    'Thu gọn trước khi thay số giúp tính giá trị nhanh và ít nhầm.',
  ],
};
