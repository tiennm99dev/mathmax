/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đơn thức một biến là tích của một số với một lũy thừa của biến; đa thức một biến là tổng của những đơn thức của cùng một biến. Thu gọn, sắp xếp đa thức, xác định bậc, hệ số cao nhất, hệ số tự do và nghiệm của đa thức.',
  intro:
    'Một bể nước dạng hình lập phương cạnh $x$ (dm) có thể tích $x^3$ (dm$^3$), diện tích đáy $x^2$ (dm$^2$) và tổng độ dài các cạnh là $12x$ (dm). Các biểu thức $x^3$, $x^2$, $12x$ chỉ chứa một biến $x$ và chỉ dùng phép nhân với lũy thừa của biến. Cộng chúng lại, ta được một đa thức một biến.',
  objectives: [
    'Nhận biết đơn thức một biến, hệ số và bậc của đơn thức; nhận biết đa thức một biến và các hạng tử của nó.',
    'Thu gọn và sắp xếp đa thức một biến theo lũy thừa giảm dần hoặc tăng dần của biến.',
    'Xác định bậc, hệ số cao nhất và hệ số tự do của đa thức; tính giá trị và kiểm tra nghiệm của đa thức.',
  ],
  sections: [
    {
      heading: 'Đơn thức và đa thức một biến',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn thức một biến',
          text: 'Đơn thức một biến (gọi tắt là đơn thức) là biểu thức đại số có dạng tích của một số thực với một lũy thừa của biến, trong đó số thực gọi là hệ số, số mũ của lũy thừa của biến gọi là bậc của đơn thức. Ví dụ: $5x^2$ có hệ số $5$, bậc $2$; $\\;-x$ có hệ số $-1$, bậc $1$.',
        },
        {
          type: 'p',
          text: 'Một số khác $0$ là đơn thức bậc $0$, vì chẳng hạn $7 = 7x^0$. Số $0$ cũng là một đơn thức nhưng không có bậc. Các biểu thức $x + 2$ hay $\\frac{2}{x}$ không phải là đơn thức.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng, nhân các đơn thức',
          text: 'Cộng (trừ) hai đơn thức cùng bậc: cộng (trừ) các hệ số và giữ nguyên lũy thừa của biến, ví dụ $5x^2 - 3x^2 = 2x^2$. Nhân hai đơn thức: nhân các hệ số với nhau và nhân hai lũy thừa của biến với nhau, ví dụ $(-3x^2) \\cdot \\frac{2}{3}x = -2x^3$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đa thức một biến',
          text: 'Đa thức một biến (gọi tắt là đa thức) là tổng của những đơn thức của cùng một biến; mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó. Ta thường kí hiệu đa thức bằng chữ in hoa kèm biến trong ngoặc, ví dụ $M(x) = x^3 - 2x^2 + 7x + 1$.',
        },
        {
          type: 'list',
          items: [
            'Mỗi đơn thức cũng là một đa thức (đa thức chỉ có một hạng tử).',
            'Số $0$ được gọi là đa thức không.',
            'Hạng tử $-2x^2$ trong $M(x)$ có dấu đi theo nó: $M(x) = x^3 + (-2x^2) + 7x + 1$.',
          ],
        },
      ],
    },
    {
      heading: 'Thu gọn và sắp xếp đa thức',
      blocks: [
        {
          type: 'p',
          text: 'Đa thức thu gọn là đa thức không có hai hạng tử nào cùng bậc. Muốn thu gọn một đa thức, ta nhóm các hạng tử cùng bậc rồi cộng chúng lại.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} &-3x^2 - 12 + x^5 + x^2 - 2x^4 \\\\ &= x^5 - 2x^4 + (-3x^2 + x^2) - 12 \\\\ &= x^5 - 2x^4 - 2x^2 - 12 \\end{aligned}',
        },
        {
          type: 'p',
          text: 'Sau khi thu gọn, ta thường sắp xếp các hạng tử theo lũy thừa giảm dần (hoặc tăng dần) của biến. Lũy thừa nào bị thiếu có thể viết thêm với hệ số $0$: $\\;x^5 - 2x^4 + 0x^3 - 2x^2 + 0x - 12$.',
        },
      ],
    },
    {
      heading: 'Bậc, hệ số cao nhất và hệ số tự do',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Trong một đa thức thu gọn, khác đa thức không: bậc của hạng tử có bậc cao nhất gọi là bậc của đa thức; hệ số của hạng tử có bậc cao nhất gọi là hệ số cao nhất; hệ số của hạng tử bậc $0$ gọi là hệ số tự do.',
        },
        {
          type: 'table',
          head: ['Đa thức thu gọn', 'Bậc', 'Hệ số cao nhất', 'Hệ số tự do'],
          rows: [
            ['$x^5 - 2x^4 - 2x^2 - 12$', '$5$', '$1$', '$-12$'],
            ['$-3x^2 - x + 7$', '$2$', '$-3$', '$7$'],
            ['$4x^3 + x^2 + 8x$', '$3$', '$4$', '$0$'],
            ['$9$', '$0$', '$9$', '$9$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Phải thu gọn đa thức trước khi tìm bậc: $2x^3 - 3x^2 - x - 2x^3 + 7 = -3x^2 - x + 7$ có bậc $2$, không phải bậc $3$. Đa thức không không có bậc; trong một đa thức thu gọn, hệ số cao nhất phải khác $0$.',
        },
      ],
    },
    {
      heading: 'Nghiệm của đa thức một biến',
      blocks: [
        {
          type: 'p',
          text: 'Giá trị của đa thức $F(x)$ tại $x = a$ được kí hiệu là $F(a)$: thay $x = a$ vào đa thức rồi tính. Ví dụ, với $F(x) = x^2 - 4$ thì $F(3) = 3^2 - 4 = 5$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nghiệm của đa thức',
          text: 'Nếu tại $x = a$, đa thức $F(x)$ có giá trị bằng $0$, tức là $F(a) = 0$, thì ta nói $a$ (hoặc $x = a$) là một nghiệm của đa thức $F(x)$.',
        },
        {
          type: 'list',
          items: [
            '$F(x) = x^2 - 4$ có hai nghiệm $2$ và $-2$, vì $F(2) = F(-2) = 0$.',
            '$G(x) = x^2 + 1$ không có nghiệm, vì $x^2 \\ge 0$ nên $G(x) \\ge 1$ với mọi $x$.',
            'Một đa thức (khác đa thức không) có thể có một, hai, ... nghiệm hoặc không có nghiệm nào.',
            'Nếu hệ số tự do bằng $0$ thì $x = 0$ là một nghiệm, chẳng hạn $P(x) = x^2 + x$ có nghiệm $0$.',
          ],
        },
        {
          type: 'p',
          text: 'Chọn một đa thức và thử từng giá trị của $x$. Khi $P(a) = 0$, điểm nằm trên trục hoành và $a$ là một nghiệm.',
        },
        { type: 'widget', name: 'nghiem' },
      ],
    },
  ],
  explore: {
    title: 'Thẻ hạng tử: thu gọn và sắp xếp',
    instruction:
      'Mỗi thẻ là một hạng tử. Chọn một thẻ: thẻ cùng bậc với nó được tô vàng, bấm "Gộp" để thu gọn. Sau đó dời các thẻ (nút ◀ ▶ hoặc phím mũi tên trái, phải) để số mũ giảm dần. Khi xong, bậc, hệ số cao nhất và hệ số tự do hiện ra.',
  },
  examples: [
    {
      problem:
        'Thu gọn và sắp xếp đa thức $A(x) = -3x^2 - 12 + x^5 + x^2 - 2x^4$ theo lũy thừa giảm dần của biến. Tìm bậc, hệ số cao nhất và hệ số tự do của $A(x)$.',
      steps: [
        'Hai hạng tử cùng bậc $2$ là $-3x^2$ và $x^2$: $-3x^2 + x^2 = -2x^2$.',
        'Sắp xếp theo lũy thừa giảm dần: $A(x) = x^5 - 2x^4 - 2x^2 - 12$.',
        'Hạng tử bậc cao nhất là $x^5$ nên $A(x)$ có bậc $5$, hệ số cao nhất là $1$; hạng tử bậc $0$ là $-12$ nên hệ số tự do là $-12$.',
      ],
      answer: '$A(x) = x^5 - 2x^4 - 2x^2 - 12$; bậc $5$, hệ số cao nhất $1$, hệ số tự do $-12$.',
    },
    {
      problem:
        'Tìm bậc, hệ số cao nhất và hệ số tự do của đa thức $Q(x) = 2x^3 - 3x^2 - x - 2x^3 + 7$.',
      steps: [
        'Thu gọn: $2x^3 - 2x^3 = 0$, nên $Q(x) = -3x^2 - x + 7$.',
        'Hạng tử bậc cao nhất là $-3x^2$: bậc $2$, hệ số cao nhất $-3$.',
        'Hạng tử bậc $0$ là $7$: hệ số tự do $7$.',
      ],
      answer: 'Bậc $2$, hệ số cao nhất $-3$, hệ số tự do $7$.',
    },
    {
      problem: 'Trong các số $-2$; $0$; $2$, số nào là nghiệm của đa thức $F(x) = x^2 - 4$?',
      steps: [
        '$F(-2) = (-2)^2 - 4 = 4 - 4 = 0$.',
        '$F(0) = 0^2 - 4 = -4 \\ne 0$.',
        '$F(2) = 2^2 - 4 = 0$.',
      ],
      answer: '$-2$ và $2$ là nghiệm của $F(x)$; $0$ không phải là nghiệm.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Những biểu thức nào sau đây là đơn thức một biến $x$?',
      options: ['$-5x^3$', '$x + 2$', '$\\frac{1}{2}x$', '$\\frac{2}{x}$', '$7$'],
      answers: [0, 2, 4],
      hints: ['Đơn thức một biến là tích của một số với một lũy thừa của biến.'],
      solution:
        '$-5x^3$, $\\frac{1}{2}x$ và $7 = 7x^0$ là đơn thức. $x + 2$ là tổng của hai đơn thức (một đa thức), còn $\\frac{2}{x}$ là phép chia cho biến nên không phải đơn thức.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $P(x) = 3x^2 - 5 + x^4 - 3x^2 + 2x$.',
      answer: 4,
      hints: ['Thu gọn đa thức trước.', '$3x^2 - 3x^2 = 0$.'],
      solution:
        '$P(x) = x^4 + 2x - 5$ sau khi thu gọn. Hạng tử bậc cao nhất là $x^4$, nên $P(x)$ có bậc $4$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số tự do của đa thức $P(x) = 3x^2 - 5 + x^4 - 3x^2 + 2x$.',
      answer: -5,
      hints: ['Hệ số tự do là hệ số của hạng tử bậc $0$ (hạng tử không chứa $x$).'],
      solution: '$P(x) = x^4 + 2x - 5$, hạng tử bậc $0$ là $-5$, nên hệ số tự do là $-5$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số cao nhất của đa thức $Q(x) = 2x^3 - 3x^2 - x - 2x^3 + 7$.',
      answer: -3,
      hints: ['Hai hạng tử bậc $3$ có tổng bằng bao nhiêu?'],
      solution:
        '$2x^3 - 2x^3 = 0$, nên $Q(x) = -3x^2 - x + 7$. Hạng tử bậc cao nhất là $-3x^2$, hệ số cao nhất là $-3$.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các hạng tử của đa thức $5x - 1 + 4x^3 + x^2$ theo lũy thừa giảm dần của biến.',
      items: ['$5x$', '$-1$', '$4x^3$', '$x^2$'],
      answer: [2, 3, 0, 1],
      hints: ['Hạng tử nào có số mũ của $x$ lớn nhất? Hạng tử $-1$ có bậc $0$.'],
      solution:
        'Bậc của các hạng tử: $4x^3$ bậc $3$, $x^2$ bậc $2$, $5x$ bậc $1$, $-1$ bậc $0$. Ta được $4x^3 + x^2 + 5x - 1$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(x) = x^2 + x - 2$. Tính $P(-3)$.',
      answer: 4,
      hints: ['Thay $x = -3$ và đặt $-3$ trong ngoặc.'],
      solution: '$P(-3) = (-3)^2 + (-3) - 2 = 9 - 3 - 2 = 4$.',
    },
    {
      type: 'multi',
      prompt:
        'Trong các số $1$; $-1$; $2$; $-2$, những số nào là nghiệm của đa thức $Q(x) = x^2 + x - 2$?',
      options: ['$1$', '$-1$', '$2$', '$-2$'],
      answers: [0, 3],
      hints: ['Tính $Q$ tại từng số; số nào cho giá trị $0$ là nghiệm.'],
      solution:
        '$Q(1) = 1 + 1 - 2 = 0$; $\\;Q(-1) = 1 - 1 - 2 = -2$; $\\;Q(2) = 4 + 2 - 2 = 4$; $\\;Q(-2) = 4 - 2 - 2 = 0$. Vậy $1$ và $-2$ là nghiệm.',
    },
    {
      type: 'number',
      prompt: 'Tìm nghiệm của đa thức $2x - 6$.',
      answer: 3,
      hints: ['Tìm $x$ sao cho $2x - 6 = 0$.'],
      solution: '$2x - 6 = 0$ khi $2x = 6$, tức là $x = 3$. Vậy nghiệm của đa thức là $3$.',
    },
    {
      type: 'choice',
      prompt: 'Đa thức nào sau đây không có nghiệm?',
      options: ['$x^2 - 1$', '$x^2 + 1$', '$x^2 + x$', '$2x + 1$'],
      answer: 1,
      hints: ['Với mọi $x$, $x^2 \\ge 0$.'],
      solution:
        '$x^2 + 1 \\ge 1 > 0$ với mọi $x$ nên không có nghiệm. Các đa thức kia có nghiệm: $x^2 - 1$ có nghiệm $1$ và $-1$; $x^2 + x$ có nghiệm $0$ và $-1$; $2x + 1$ có nghiệm $-\\frac{1}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây đúng?',
      options: [
        'Đa thức $5$ có bậc $1$.',
        'Đa thức không có bậc $0$.',
        'Đa thức $5$ có bậc $0$, còn đa thức không không có bậc.',
        'Đa thức $x^3 + 2x - x^3$ có bậc $3$.',
      ],
      answer: 2,
      hints: ['$5 = 5x^0$.', 'Nhớ thu gọn đa thức trước khi tìm bậc.'],
      solution:
        '$5 = 5x^0$ là đa thức bậc $0$; đa thức không không có bậc. Đa thức $x^3 + 2x - x^3 = 2x$ có bậc $1$.',
    },
  ],
  takeaways: [
    'Đơn thức một biến: tích của một số (hệ số) với một lũy thừa của biến (số mũ là bậc). Đa thức một biến: tổng các đơn thức của cùng một biến, mỗi đơn thức là một hạng tử.',
    'Thu gọn: cộng các hạng tử cùng bậc; sắp xếp theo lũy thừa giảm dần (hoặc tăng dần) của biến.',
    'Với đa thức thu gọn khác $0$: bậc là số mũ cao nhất, hệ số cao nhất là hệ số của hạng tử bậc cao nhất, hệ số tự do là hệ số của hạng tử bậc $0$. Đa thức không không có bậc.',
    '$a$ là nghiệm của $F(x)$ khi $F(a) = 0$; một đa thức có thể có một, nhiều hoặc không có nghiệm.',
  ],
};
