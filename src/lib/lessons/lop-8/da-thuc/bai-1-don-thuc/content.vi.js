/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đơn thức nhiều biến: đơn thức thu gọn, hệ số, phần biến, bậc của đơn thức, đơn thức đồng dạng và cách cộng, trừ các đơn thức đồng dạng.',
  intro:
    'Một bể cá hình hộp chữ nhật có chiều dài $2x$ (dm), chiều rộng $x$ (dm) và chiều cao $y$ (dm). Thể tích của bể là $2x \\cdot x \\cdot y = 2x^2y$ ($\\text{dm}^3$). Biểu thức $2x^2y$ chỉ gồm một tích của số và các biến: đó là một đơn thức. Ở lớp 7 em đã quen với đa thức một biến; lớp 8 mở rộng sang các biểu thức có nhiều biến như $x$, $y$, $z$.',
  objectives: [
    'Nhận biết đơn thức và đơn thức thu gọn; chỉ ra hệ số, phần biến của đơn thức thu gọn.',
    'Thu gọn một đơn thức và tìm bậc của đơn thức.',
    'Nhận biết các đơn thức đồng dạng; cộng, trừ các đơn thức đồng dạng.',
    'Tính giá trị của một đơn thức khi biết giá trị của các biến.',
  ],
  sections: [
    {
      heading: 'Đơn thức và đơn thức thu gọn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn thức',
          text: 'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc có dạng tích của những số và biến.',
        },
        {
          type: 'p',
          text: 'Các biểu thức $5$; $x$; $-\\frac{1}{2}xy^2$; $3x \\cdot 2y$ đều là đơn thức. Các biểu thức $x + y$, $\\frac{2}{x}$, $2(x - y)$ không phải là đơn thức vì có phép cộng, phép trừ hoặc phép chia cho biến.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn thức thu gọn',
          text: 'Đơn thức thu gọn là đơn thức chỉ gồm một số, hoặc có dạng tích của một số với những biến, mỗi biến chỉ xuất hiện một lần và đã được nâng lên lũy thừa với số mũ nguyên dương. Trong đơn thức thu gọn, phần số gọi là hệ số, phần còn lại gọi là phần biến.',
        },
        {
          type: 'p',
          text: 'Đơn thức $3x \\cdot 2y \\cdot x$ chưa thu gọn vì biến $x$ xuất hiện hai lần. Nhân các số với nhau và nhân các lũy thừa cùng cơ số, ta được dạng thu gọn:',
        },
        {
          type: 'tex',
          tex: '3x \\cdot 2y \\cdot x = (3 \\cdot 2) \\cdot (x \\cdot x) \\cdot y = 6x^2y',
        },
        {
          type: 'table',
          caption: 'Hệ số và phần biến của một số đơn thức thu gọn',
          head: ['Đơn thức', 'Hệ số', 'Phần biến'],
          rows: [
            ['$6x^2y$', '$6$', '$x^2y$'],
            ['$-xy^3z$', '$-1$', '$xy^3z$'],
            ['$\\frac{2}{3}y^2$', '$\\frac{2}{3}$', '$y^2$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi viết đơn thức thu gọn, ta viết hệ số trước phần biến và thường viết các biến theo thứ tự bảng chữ cái. Hệ số $1$ hay $-1$ không cần viết số $1$: ta viết $xy$ thay cho $1xy$ và $-xy$ thay cho $-1xy$.',
        },
      ],
    },
    {
      heading: 'Bậc của đơn thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bậc của đơn thức',
          text: 'Tổng số mũ của các biến trong một đơn thức thu gọn với hệ số khác $0$ gọi là bậc của đơn thức đó.',
        },
        {
          type: 'list',
          items: [
            '$6x^2y$ có bậc $2 + 1 = 3$; $-xy^3z$ có bậc $1 + 3 + 1 = 5$.',
            'Một số khác $0$ là đơn thức bậc $0$, chẳng hạn $-7$ có bậc $0$.',
            'Số $0$ cũng là một đơn thức, gọi là đơn thức không; đơn thức không không có bậc.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Muốn tìm bậc phải thu gọn trước. Đơn thức $x^2 \\cdot 3xy$ có bậc $4$ (vì bằng $3x^3y$), không phải $2$.',
        },
      ],
    },
    {
      heading: 'Đơn thức đồng dạng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn thức đồng dạng',
          text: 'Hai đơn thức đồng dạng là hai đơn thức với hệ số khác $0$ và có cùng phần biến. Các số khác $0$ cũng được coi là những đơn thức đồng dạng với nhau.',
        },
        {
          type: 'p',
          text: '$3x^2y$, $-5x^2y$ và $7yx^2$ đồng dạng (vì $7yx^2 = 7x^2y$). Còn $x^2y$ và $xy^2$ không đồng dạng: cùng các chữ $x$, $y$ nhưng số mũ khác nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng, trừ đơn thức đồng dạng',
          text: 'Để cộng (hay trừ) các đơn thức đồng dạng, ta cộng (hay trừ) các hệ số với nhau và giữ nguyên phần biến.',
        },
        { type: 'tex', tex: '3x^2y - 5x^2y + 7x^2y = (3 - 5 + 7)x^2y = 5x^2y' },
        {
          type: 'p',
          text: 'Hai đơn thức không đồng dạng thì không gộp được: $x^2y + xy^2$ giữ nguyên, không viết thành $2x^2y$ hay $2x^3y^3$.',
        },
      ],
    },
    {
      heading: 'Giá trị của đơn thức',
      blocks: [
        {
          type: 'p',
          text: 'Để tính giá trị của một đơn thức tại các giá trị cho trước của biến, ta thay giá trị đó vào đơn thức rồi thực hiện phép tính. Nên thu gọn đơn thức trước để tính gọn hơn.',
        },
        {
          type: 'tex',
          tex: '2x^2y \\text{ tại } x = 3,\\ y = -1:\\quad 2 \\cdot 3^2 \\cdot (-1) = -18',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ đơn thức đồng dạng',
    instruction:
      'Chọn (hoặc kéo) từng thẻ đơn thức vào một nhóm sao cho mỗi nhóm chỉ gồm các đơn thức đồng dạng. Mỗi nhóm đúng tự cộng hệ số và cho biết bậc của tổng. Chú ý những thẻ viết biến theo thứ tự lạ như $7yx^2$.',
  },
  examples: [
    {
      problem:
        'Thu gọn đơn thức $A = \\frac{1}{3}x^2y \\cdot (-6)xy^3$. Chỉ ra hệ số, phần biến và bậc của $A$.',
      steps: [
        'Nhóm các số với nhau và các lũy thừa cùng cơ số với nhau: $A = \\left[\\frac{1}{3} \\cdot (-6)\\right] \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3)$.',
        '$\\frac{1}{3} \\cdot (-6) = -2$; $x^2 \\cdot x = x^3$; $y \\cdot y^3 = y^4$. Vậy $A = -2x^3y^4$.',
        'Hệ số là $-2$, phần biến là $x^3y^4$, bậc là $3 + 4 = 7$.',
      ],
      answer: '$A = -2x^3y^4$; hệ số $-2$, phần biến $x^3y^4$, bậc $7$.',
    },
    {
      problem: 'Tính tổng $S = 3xy^2 - 5xy^2 + 7xy^2$.',
      steps: [
        'Ba đơn thức có cùng phần biến $xy^2$ nên đồng dạng.',
        'Cộng, trừ các hệ số và giữ nguyên phần biến: $S = (3 - 5 + 7)xy^2$.',
      ],
      answer: '$S = 5xy^2$.',
    },
    {
      problem: 'Tính giá trị của đơn thức $B = -\\frac{1}{2}x^2y$ tại $x = -2$, $y = 3$.',
      steps: [
        'Thay $x = -2$, $y = 3$: $B = -\\frac{1}{2} \\cdot (-2)^2 \\cdot 3$.',
        '$(-2)^2 = 4$, nên $B = -\\frac{1}{2} \\cdot 4 \\cdot 3 = -6$.',
      ],
      answer: '$B = -6$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các biểu thức là đơn thức.',
      options: ['$3x^2y$', '$x + 1$', '$-5$', '$\\frac{1}{2}xy^3$', '$\\frac{x}{y}$'],
      answers: [0, 2, 3],
      hints: [
        'Đơn thức chỉ là một số, một biến hoặc một tích của số và biến.',
        'Biểu thức có phép cộng, hoặc có phép chia cho biến, không phải đơn thức.',
      ],
      solution:
        '$3x^2y$, $-5$ và $\\frac{1}{2}xy^3$ là đơn thức. $x + 1$ có phép cộng, $\\frac{x}{y}$ có phép chia cho biến $y$ nên không phải đơn thức.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đơn thức $-\\frac{3}{4}x^3y^2z$.',
      answer: 6,
      hints: ['Bậc là tổng số mũ của các biến.', 'Biến $z$ có số mũ $1$.'],
      solution: 'Đơn thức đã thu gọn, bậc là $3 + 2 + 1 = 6$.',
    },
    {
      type: 'choice',
      prompt: 'Thu gọn đơn thức $2x^2y \\cdot (-3)xy^3$ ta được',
      options: ['$-6x^2y^3$', '$-x^3y^4$', '$-6x^3y^4$', '$6x^3y^4$'],
      answer: 2,
      hints: [
        'Nhân các hệ số với nhau: $2 \\cdot (-3)$.',
        'Nhân các lũy thừa cùng cơ số bằng cách cộng số mũ: $x^2 \\cdot x = x^{2+1}$.',
      ],
      solution:
        '$2x^2y \\cdot (-3)xy^3 = [2 \\cdot (-3)] \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3) = -6x^3y^4$.',
    },
    {
      type: 'number',
      prompt:
        'Thu gọn đơn thức $\\frac{1}{2}x \\cdot (-4)xy^2 \\cdot y$ rồi cho biết hệ số của nó.',
      answer: -2,
      hints: ['Nhân riêng phần số: $\\frac{1}{2} \\cdot (-4)$.'],
      solution:
        '$\\frac{1}{2}x \\cdot (-4)xy^2 \\cdot y = \\left[\\frac{1}{2} \\cdot (-4)\\right] x^2y^3 = -2x^2y^3$. Hệ số là $-2$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đơn thức ở cột trái với một đơn thức đồng dạng với nó.',
      left: ['$3x^2y$', '$-xy^2$', '$5xy$'],
      right: ['$-\\frac{1}{2}xy$', '$7yx^2$', '$2y^2x$', '$x^2y^2$'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: [
        'Viết lại phần biến theo thứ tự $x$ rồi $y$: $7yx^2 = 7x^2y$.',
        'Đồng dạng cần cùng số mũ của từng biến, không chỉ cùng chữ cái.',
      ],
      solution:
        '$3x^2y$ đồng dạng với $7yx^2 = 7x^2y$; $-xy^2$ đồng dạng với $2y^2x = 2xy^2$; $5xy$ đồng dạng với $-\\frac{1}{2}xy$. Đơn thức $x^2y^2$ không đồng dạng với đơn thức nào ở cột trái.',
    },
    {
      type: 'choice',
      prompt: 'Tổng $5x^2y + (-8x^2y) + x^2y$ bằng',
      options: ['$-2x^2y$', '$-3x^2y$', '$-2x^6y^3$', '$14x^2y$'],
      answer: 0,
      hints: ['Ba đơn thức đồng dạng: cộng các hệ số, giữ nguyên phần biến.'],
      solution: '$5x^2y + (-8x^2y) + x^2y = (5 - 8 + 1)x^2y = -2x^2y$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của đơn thức $-3x^2y^3$ tại $x = 2$, $y = -1$.',
      answer: 12,
      hints: ['Thay $x = 2$, $y = -1$ vào đơn thức.', '$2^2 = 4$ và $(-1)^3 = -1$.'],
      solution: '$-3 \\cdot 2^2 \\cdot (-1)^3 = -3 \\cdot 4 \\cdot (-1) = 12$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây đúng?',
      options: [
        'Số $5$ là đơn thức bậc $0$.',
        'Số $0$ là đơn thức bậc $0$.',
        'Đơn thức $x^3y$ có bậc $3$.',
        '$2x^2y$ và $2xy^2$ là hai đơn thức đồng dạng.',
      ],
      answer: 0,
      hints: [
        'Nhớ lại: số khác $0$ có bậc bao nhiêu, còn số $0$ thì sao?',
        'Bậc của $x^3y$ là tổng số mũ của cả $x$ và $y$.',
      ],
      solution:
        'Số $5 \\ne 0$ là đơn thức bậc $0$: đúng. Số $0$ không có bậc; $x^3y$ có bậc $4$; $x^2y$ và $xy^2$ khác phần biến nên không đồng dạng.',
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật có chiều dài $3x$, chiều rộng $x$ và chiều cao $2y$ (cùng đơn vị đo). Thể tích của nó là một đơn thức thu gọn. Tìm bậc của đơn thức đó.',
      answer: 3,
      hints: ['Thể tích bằng dài nhân rộng nhân cao.', 'Thu gọn $3x \\cdot x \\cdot 2y$.'],
      solution: '$V = 3x \\cdot x \\cdot 2y = 6x^2y$, có bậc $2 + 1 = 3$.',
    },
  ],
  takeaways: [
    'Đơn thức là một số, một biến hoặc một tích của các số và biến; đơn thức thu gọn có dạng hệ số nhân phần biến, mỗi biến xuất hiện một lần.',
    'Bậc của đơn thức thu gọn (hệ số khác $0$) là tổng số mũ của các biến; số khác $0$ có bậc $0$, số $0$ không có bậc.',
    'Đơn thức đồng dạng có hệ số khác $0$ và cùng phần biến; cộng, trừ chúng bằng cách cộng, trừ hệ số và giữ nguyên phần biến.',
  ],
};
