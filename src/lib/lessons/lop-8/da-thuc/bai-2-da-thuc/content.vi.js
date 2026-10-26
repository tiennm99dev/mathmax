/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đa thức nhiều biến: hạng tử, đa thức thu gọn, bậc của đa thức và giá trị của đa thức tại các giá trị cho trước của biến.',
  intro:
    'Một mảnh vườn gồm một phần hình vuông cạnh $x$ (m) và một phần hình chữ nhật kích thước $x$ (m) và $y$ (m). Diện tích cả mảnh vườn là $x^2 + xy$ ($\\text{m}^2$): một tổng của hai đơn thức. Những tổng như vậy gọi là đa thức. Bài này cho em biết cách viết gọn một đa thức và đọc ra bậc của nó.',
  objectives: [
    'Nhận biết đa thức và các hạng tử của đa thức.',
    'Thu gọn đa thức bằng cách nhóm và cộng các hạng tử đồng dạng.',
    'Xác định bậc của đa thức từ dạng thu gọn.',
    'Tính giá trị của đa thức tại các giá trị cho trước của biến.',
  ],
  sections: [
    {
      heading: 'Đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đa thức',
          text: 'Đa thức là một tổng của những đơn thức. Mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.',
        },
        {
          type: 'p',
          text: 'Đa thức $x^2y - 3xy + 5$ là tổng $x^2y + (-3xy) + 5$, gồm ba hạng tử $x^2y$, $-3xy$ và $5$. Khi kể hạng tử, ta kể luôn dấu đứng trước nó.',
        },
        {
          type: 'list',
          items: [
            'Mỗi đơn thức cũng được coi là một đa thức (đa thức chỉ có một hạng tử), chẳng hạn $-2xy^2$.',
            'Số $0$ cũng là một đa thức, gọi là đa thức không.',
            'Ta thường đặt tên đa thức bằng chữ in hoa: $A = x^2y - 3xy + 5$.',
          ],
        },
      ],
    },
    {
      heading: 'Đa thức thu gọn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đa thức thu gọn',
          text: 'Đa thức thu gọn là đa thức không có hai hạng tử nào đồng dạng.',
        },
        {
          type: 'p',
          text: 'Để thu gọn một đa thức, ta nhóm các hạng tử đồng dạng với nhau rồi cộng chúng (cộng hệ số, giữ nguyên phần biến). Các hạng tử có tổng bằng $0$ thì biến mất.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} M &= x^2y + 3xy - 3x^2y - 3 + 2xy + 4 \\\\ &= (x^2y - 3x^2y) + (3xy + 2xy) + (-3 + 4) \\\\ &= -2x^2y + 5xy + 1 \\end{aligned}',
        },
      ],
    },
    {
      heading: 'Bậc của đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bậc của đa thức',
          text: 'Bậc của một đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó. Đa thức không không có bậc.',
        },
        {
          type: 'table',
          caption: 'Bậc các hạng tử của $M = -2x^2y + 5xy + 1$',
          head: ['Hạng tử', '$-2x^2y$', '$5xy$', '$1$'],
          rows: [['Bậc', '$3$', '$2$', '$0$']],
        },
        {
          type: 'p',
          text: 'Hạng tử bậc cao nhất có bậc $3$, nên $M$ là đa thức bậc $3$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phải thu gọn trước khi tìm bậc. Đa thức $x^4y + 2xy - x^4y$ trông như có bậc $5$, nhưng thu gọn thì chỉ còn $2xy$, có bậc $2$.',
        },
      ],
    },
    {
      heading: 'Giá trị của đa thức',
      blocks: [
        {
          type: 'p',
          text: 'Để tính giá trị của một đa thức tại những giá trị cho trước của các biến, ta thu gọn đa thức (nếu cần), thay các giá trị đó vào rồi thực hiện phép tính.',
        },
        {
          type: 'tex',
          tex: 'M = -2x^2y + 5xy + 1 \\text{ tại } x = 1,\\ y = -1:\\quad -2 \\cdot 1^2 \\cdot (-1) + 5 \\cdot 1 \\cdot (-1) + 1 = 2 - 5 + 1 = -2',
        },
      ],
    },
  ],
  explore: {
    title: 'Gộp hạng tử, tìm bậc',
    instruction:
      'Chọn một đa thức. Bấm chọn hai hay nhiều hạng tử đồng dạng rồi bấm "Gộp"; gộp sai sẽ bị từ chối kèm lí do. Khi đa thức đã thu gọn, mỗi hạng tử hiện bậc của nó: hãy chọn bậc của cả đa thức.',
  },
  examples: [
    {
      problem: 'Thu gọn đa thức $N = x^4y - 2xy^2 + 3 - x^4y + xy^2 + 7x^2$ rồi tìm bậc của $N$.',
      steps: [
        'Nhóm các hạng tử đồng dạng: $N = (x^4y - x^4y) + (-2xy^2 + xy^2) + 7x^2 + 3$.',
        '$x^4y - x^4y = 0$ và $-2xy^2 + xy^2 = -xy^2$, nên $N = -xy^2 + 7x^2 + 3$.',
        'Các hạng tử $-xy^2$, $7x^2$, $3$ lần lượt có bậc $3$, $2$, $0$.',
      ],
      answer:
        '$N = -xy^2 + 7x^2 + 3$, có bậc $3$ (không phải $5$, vì hạng tử $x^4y$ đã triệt tiêu).',
    },
    {
      problem:
        'Thu gọn $A = 3x^2y - xy^2 + 2x^2y + 4xy^2 - 5$ và cho biết số hạng tử của dạng thu gọn.',
      steps: ['$A = (3x^2y + 2x^2y) + (-xy^2 + 4xy^2) - 5$.', '$= 5x^2y + 3xy^2 - 5$.'],
      answer: '$A = 5x^2y + 3xy^2 - 5$, có $3$ hạng tử.',
    },
    {
      problem: 'Tính giá trị của đa thức $P = x^2y + 2xy - 3$ tại $x = -1$, $y = 2$.',
      steps: [
        'Thay $x = -1$, $y = 2$: $P = (-1)^2 \\cdot 2 + 2 \\cdot (-1) \\cdot 2 - 3$.',
        '$= 2 - 4 - 3$.',
      ],
      answer: '$P = -5$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các biểu thức là đa thức.',
      options: ['$x^2 - 3xy$', '$\\frac{1}{x} + y$', '$5$', '$-2xy^2z$', '$\\frac{x}{y} - 1$'],
      answers: [0, 2, 3],
      hints: [
        'Đa thức là tổng của những đơn thức; một đơn thức hay một số cũng là đa thức.',
        'Biểu thức có phép chia cho biến không phải đa thức.',
      ],
      solution:
        '$x^2 - 3xy$, $5$ và $-2xy^2z$ là đa thức. $\\frac{1}{x} + y$ và $\\frac{x}{y} - 1$ có phép chia cho biến nên không phải đa thức.',
    },
    {
      type: 'number',
      prompt: 'Đa thức $x^3 - 2x^2y + xy - 7$ có bao nhiêu hạng tử?',
      answer: 4,
      hints: ['Mỗi đơn thức (kèm dấu đứng trước) là một hạng tử.'],
      solution: 'Các hạng tử là $x^3$, $-2x^2y$, $xy$, $-7$: có $4$ hạng tử.',
    },
    {
      type: 'choice',
      prompt: 'Thu gọn đa thức $3x^2y - xy^2 + 2x^2y + 4xy^2$ ta được',
      options: ['$5x^2y + 5xy^2$', '$5x^2y + 3xy^2$', '$8x^2y^2$', '$x^2y + 3xy^2$'],
      answer: 1,
      hints: ['Nhóm $3x^2y$ với $2x^2y$, nhóm $-xy^2$ với $4xy^2$.'],
      solution: '$(3x^2y + 2x^2y) + (-xy^2 + 4xy^2) = 5x^2y + 3xy^2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $C = 2x^3y^2 - 4xy + 7$.',
      answer: 5,
      hints: ['Đa thức đã thu gọn. Tìm bậc của từng hạng tử.', '$2x^3y^2$ có bậc $3 + 2$.'],
      solution: 'Các hạng tử có bậc $5$, $2$, $0$. Bậc cao nhất là $5$, nên $C$ có bậc $5$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $B = x^5 + 2x^2y^2 - x^5 + 3xy$.',
      answer: 4,
      hints: ['Thu gọn trước: $x^5 - x^5 = 0$.'],
      solution: '$B = 2x^2y^2 + 3xy$. Các hạng tử có bậc $4$ và $2$, nên $B$ có bậc $4$.',
    },
    {
      type: 'number',
      prompt: 'Thu gọn $E = 2xy - x^2 + 5xy - y^2$. Hệ số của hạng tử chứa $xy$ là bao nhiêu?',
      answer: 7,
      hints: ['$2xy$ và $5xy$ đồng dạng.'],
      solution: '$E = (2xy + 5xy) - x^2 - y^2 = 7xy - x^2 - y^2$. Hệ số của $xy$ là $7$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của đa thức $x^2y - 2xy + 3$ tại $x = 2$, $y = -1$.',
      answer: 3,
      hints: ['Thay $x = 2$, $y = -1$ vào từng hạng tử.', '$x^2y = 4 \\cdot (-1)$.'],
      solution: '$2^2 \\cdot (-1) - 2 \\cdot 2 \\cdot (-1) + 3 = -4 + 4 + 3 = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Tính giá trị của đa thức $D = 4xy - 3x^2y^2 + 2xy + 3x^2y^2 - 6xy + 5$ tại $x = 2024$, $y = -1$.',
      answer: 5,
      hints: [
        'Đừng thay số ngay: hãy thu gọn $D$ trước.',
        '$4xy + 2xy - 6xy = 0$ và $-3x^2y^2 + 3x^2y^2 = 0$.',
      ],
      solution:
        '$D = (4xy + 2xy - 6xy) + (-3x^2y^2 + 3x^2y^2) + 5 = 5$. Vậy $D = 5$ với mọi giá trị của $x$, $y$, nên tại $x = 2024$, $y = -1$ thì $D = 5$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây đúng?',
      options: [
        'Đa thức không có bậc $0$.',
        'Mỗi đơn thức cũng là một đa thức.',
        'Bậc của đa thức là tổng bậc của các hạng tử.',
        'Đa thức $x^2y + xy^2$ chưa thu gọn.',
      ],
      answer: 1,
      hints: [
        'Xem lại định nghĩa đa thức thu gọn và bậc của đa thức.',
        '$x^2y$ và $xy^2$ có đồng dạng không?',
      ],
      solution:
        'Mỗi đơn thức là một đa thức có một hạng tử: đúng. Đa thức không không có bậc; bậc là bậc cao nhất chứ không phải tổng; $x^2y$ và $xy^2$ không đồng dạng nên $x^2y + xy^2$ đã thu gọn.',
    },
  ],
  takeaways: [
    'Đa thức là tổng của những đơn thức; mỗi đơn thức là một hạng tử, kể cả dấu đứng trước.',
    'Đa thức thu gọn không có hai hạng tử nào đồng dạng; thu gọn bằng cách nhóm và cộng các hạng tử đồng dạng.',
    'Bậc của đa thức là bậc cao nhất của các hạng tử trong dạng thu gọn; đa thức không không có bậc.',
  ],
};
