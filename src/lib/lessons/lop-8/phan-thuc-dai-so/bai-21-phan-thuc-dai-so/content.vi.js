/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân thức đại số: định nghĩa, tử thức và mẫu thức, điều kiện xác định, giá trị của phân thức và hai phân thức bằng nhau.',
  intro:
    'Một ô tô đi quãng đường $120$ km với vận tốc $x$ (km/h). Thời gian đi là $\\dfrac{120}{x}$ giờ. Biểu thức này không phải đa thức: biến $x$ nằm ở mẫu. Những biểu thức có dạng "đa thức chia cho đa thức" như vậy gọi là phân thức đại số. Chúng giống phân số ở lớp 6, chỉ khác là tử và mẫu là đa thức, và mẫu không được bằng $0$.',
  objectives: [
    'Nhận biết phân thức đại số, tử thức và mẫu thức của nó.',
    'Tìm điều kiện xác định và tính giá trị của một phân thức.',
    'Nhận biết hai phân thức bằng nhau bằng đẳng thức $A \\cdot D = B \\cdot C$.',
  ],
  sections: [
    {
      heading: 'Phân thức đại số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Một phân thức đại số (hay nói gọn là phân thức) là một biểu thức có dạng $\\dfrac{A}{B}$, trong đó $A$, $B$ là những đa thức và $B$ khác đa thức $0$. $A$ được gọi là tử thức (hay tử), $B$ được gọi là mẫu thức (hay mẫu).',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\dfrac{x + 1}{x - 2}$, $\\dfrac{x^2 - 2x + 1}{2x + 3}$, $\\dfrac{3xy}{x - y}$ là các phân thức. Phân thức $\\dfrac{x^2 - 2x + 1}{2x + 3}$ có tử thức $x^2 - 2x + 1$ và mẫu thức $2x + 3$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Mỗi đa thức cũng được coi là một phân thức với mẫu thức bằng $1$: $x^2 - 3 = \\dfrac{x^2 - 3}{1}$. Mỗi số thực cũng là một phân thức; đặc biệt số $0$ và số $1$ là những phân thức.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '$\\dfrac{2x}{0}$ không phải phân thức vì mẫu là đa thức $0$. $\\dfrac{\\sqrt{x} + 1}{x}$ cũng không phải phân thức vì tử $\\sqrt{x} + 1$ không phải đa thức.',
        },
      ],
    },
    {
      heading: 'Điều kiện xác định và giá trị của phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điều kiện xác định',
          text: 'Điều kiện xác định của phân thức $\\dfrac{A}{B}$ là điều kiện của biến để giá trị tương ứng của mẫu thức $B$ khác $0$.',
        },
        {
          type: 'p',
          text: 'Nếu tại $x = a$ mà mẫu bằng $0$ thì phân thức không xác định tại $x = a$. Nếu tại những giá trị của biến thỏa mãn điều kiện xác định, ta thay vào phân thức và tính được một số: đó là giá trị của phân thức tại các giá trị đã cho của biến.',
        },
        {
          type: 'table',
          caption: 'Phân thức $P = \\dfrac{x + 1}{x - 2}$ tại một vài giá trị của $x$',
          head: ['$x$', 'Tử $x + 1$', 'Mẫu $x - 2$', 'Giá trị của $P$'],
          rows: [
            ['$0$', '$1$', '$-2$', '$-\\dfrac{1}{2}$'],
            ['$2$', '$3$', '$0$', 'không xác định'],
            ['$4$', '$5$', '$2$', '$\\dfrac{5}{2}$'],
            ['$-1$', '$0$', '$-3$', '$0$'],
          ],
        },
        {
          type: 'p',
          text: 'Vậy điều kiện xác định của $P$ là $x - 2 \\ne 0$, tức là $x \\ne 2$. Lưu ý: tử bằng $0$ thì phân thức vẫn xác định và có giá trị bằng $0$ (dòng cuối của bảng); chỉ mẫu bằng $0$ mới làm phân thức không xác định.',
        },
        {
          type: 'p',
          text: 'Với mẫu là tích, mẫu bằng $0$ khi một thừa số bằng $0$. Chẳng hạn $x^2 - 4 = (x - 2)(x + 2)$ bằng $0$ khi $x = 2$ hoặc $x = -2$, nên $\\dfrac{x - 1}{x^2 - 4}$ xác định khi $x \\ne 2$ và $x \\ne -2$. Với phân thức nhiều biến cũng vậy: $\\dfrac{3xy}{x - y}$ xác định khi $x \\ne y$.',
        },
      ],
    },
    {
      heading: 'Hai phân thức bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai phân thức bằng nhau',
          text: 'Hai phân thức $\\dfrac{A}{B}$ và $\\dfrac{C}{D}$ gọi là bằng nhau nếu $A \\cdot D = B \\cdot C$. Ta viết $\\dfrac{A}{B} = \\dfrac{C}{D}$ nếu $A \\cdot D = B \\cdot C$.',
        },
        {
          type: 'p',
          text: 'Đây là cách so sánh hai phân số đã học ở lớp 6: $\\dfrac{a}{b} = \\dfrac{c}{d}$ khi $a \\cdot d = b \\cdot c$. Chẳng hạn $\\dfrac{x - 1}{x} = \\dfrac{x^2 - 1}{x^2 + x}$ vì',
        },
        {
          type: 'tex',
          tex: '(x - 1)(x^2 + x) = x(x - 1)(x + 1) = x(x^2 - 1).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Đẳng thức $A \\cdot D = B \\cdot C$ là đẳng thức giữa hai đa thức: hai vế phải bằng nhau sau khi nhân ra và thu gọn, không chỉ tại một vài giá trị của biến.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khi nào phân thức không xác định?',
    instruction:
      'Chọn một phân thức rồi kéo thanh trượt để thay đổi $x$. Xem tử và mẫu được tính thế nào. Thử thách: tìm mọi giá trị của $x$ làm mẫu bằng $0$; mỗi giá trị tìm được hiện thành dấu ✕ đỏ trên trục số. Với phân thức $\\dfrac{x^2 - 1}{x^2 + x}$, so sánh giá trị của nó với phân thức bằng nó $\\dfrac{x - 1}{x}$.',
  },
  examples: [
    {
      problem:
        'Cho phân thức $P = \\dfrac{3x + 1}{x^2 - 9}$. a) Tìm điều kiện xác định của $P$. b) Tính giá trị của $P$ tại $x = 1$.',
      steps: [
        'a) $P$ xác định khi mẫu khác $0$: $x^2 - 9 \\ne 0$.',
        'Ta có $x^2 - 9 = (x - 3)(x + 3)$, bằng $0$ khi $x = 3$ hoặc $x = -3$.',
        'Vậy điều kiện xác định của $P$ là $x \\ne 3$ và $x \\ne -3$.',
        'b) $x = 1$ thỏa mãn điều kiện xác định. Thay vào: $P = \\dfrac{3 \\cdot 1 + 1}{1^2 - 9} = \\dfrac{4}{-8}$.',
      ],
      answer: 'a) $x \\ne 3$ và $x \\ne -3$; b) $P = -\\dfrac{1}{2}$.',
    },
    {
      problem:
        'Hai phân thức $\\dfrac{x - 1}{x + 1}$ và $\\dfrac{x^2 - 2x + 1}{x^2 - 1}$ có bằng nhau không?',
      steps: [
        'Tính $A \\cdot D = (x - 1)(x^2 - 1) = (x - 1)(x - 1)(x + 1)$.',
        'Tính $B \\cdot C = (x + 1)(x^2 - 2x + 1) = (x + 1)(x - 1)^2 = (x - 1)(x - 1)(x + 1)$.',
        'Hai tích là cùng một đa thức, nên $A \\cdot D = B \\cdot C$.',
      ],
      answer: 'Có: $\\dfrac{x - 1}{x + 1} = \\dfrac{x^2 - 2x + 1}{x^2 - 1}$.',
    },
    {
      problem: 'Tìm đa thức $A$ thỏa mãn $\\dfrac{A}{x - 2} = \\dfrac{x^2 + 2x}{x^2 - 4}$.',
      steps: [
        'Theo định nghĩa hai phân thức bằng nhau: $A \\cdot (x^2 - 4) = (x - 2)(x^2 + 2x)$.',
        'Phân tích: $(x - 2)(x^2 + 2x) = (x - 2) \\cdot x(x + 2) = x(x^2 - 4)$.',
        'Vậy $A \\cdot (x^2 - 4) = x \\cdot (x^2 - 4)$, suy ra $A = x$.',
      ],
      answer: '$A = x$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các biểu thức là phân thức đại số.',
      options: [
        '$\\dfrac{x + 1}{x - 2}$',
        '$3x^2 - 1$',
        '$5$',
        '$\\dfrac{2x}{0}$',
        '$\\dfrac{\\sqrt{x} + 1}{x}$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Tử và mẫu phải là đa thức, mẫu khác đa thức $0$.',
        'Mỗi đa thức, mỗi số thực đều là phân thức với mẫu bằng $1$.',
      ],
      solution:
        '$\\dfrac{x + 1}{x - 2}$, $3x^2 - 1 = \\dfrac{3x^2 - 1}{1}$ và $5 = \\dfrac{5}{1}$ là phân thức. $\\dfrac{2x}{0}$ có mẫu là đa thức $0$; $\\dfrac{\\sqrt{x} + 1}{x}$ có tử không phải đa thức.',
    },
    {
      type: 'number',
      prompt: 'Phân thức $\\dfrac{2x + 1}{x - 5}$ không xác định tại $x$ bằng bao nhiêu?',
      answer: 5,
      hints: ['Phân thức không xác định khi mẫu bằng $0$.'],
      solution: 'Mẫu $x - 5 = 0$ khi $x = 5$. Vậy phân thức không xác định tại $x = 5$.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các giá trị của $x$ tại đó phân thức $\\dfrac{x + 3}{x^2 - 4x}$ không xác định.',
      options: ['$x = 0$', '$x = 4$', '$x = -3$', '$x = -4$', '$x = 2$'],
      answers: [0, 1],
      hints: [
        'Chỉ mẫu bằng $0$ mới làm phân thức không xác định; tử bằng $0$ thì không sao.',
        'Phân tích mẫu: $x^2 - 4x = x(x - 4)$.',
      ],
      solution:
        '$x^2 - 4x = x(x - 4) = 0$ khi $x = 0$ hoặc $x = 4$. Tại $x = -3$ tử bằng $0$ nhưng mẫu bằng $21 \\ne 0$, nên phân thức vẫn xác định (có giá trị $0$).',
    },
    {
      type: 'fraction',
      prompt: 'Tính giá trị của phân thức $\\dfrac{x^2 - 1}{2x + 1}$ tại $x = 2$.',
      answer: [3, 5],
      hints: ['Kiểm tra mẫu khác $0$ tại $x = 2$, rồi thay $x = 2$ vào tử và mẫu.'],
      solution:
        'Tại $x = 2$: tử $2^2 - 1 = 3$, mẫu $2 \\cdot 2 + 1 = 5 \\ne 0$. Giá trị là $\\dfrac{3}{5}$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của phân thức $\\dfrac{x^2 + 2x}{x - 1}$ tại $x = -2$.',
      answer: 0,
      hints: ['Tính riêng tử và mẫu tại $x = -2$.', 'Tử bằng $(-2)^2 + 2 \\cdot (-2)$.'],
      solution:
        'Mẫu: $-2 - 1 = -3 \\ne 0$, nên phân thức xác định. Tử: $(-2)^2 + 2 \\cdot (-2) = 4 - 4 = 0$. Giá trị là $\\dfrac{0}{-3} = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Phân thức nào bằng phân thức $\\dfrac{x - 1}{x}$?',
      options: [
        '$\\dfrac{x^2 - 1}{x^2 + x}$',
        '$\\dfrac{x^2 - 1}{x^2}$',
        '$\\dfrac{x - 1}{x + 1}$',
        '$\\dfrac{x^2 - x}{x}$',
      ],
      answer: 0,
      hints: [
        'Với mỗi lựa chọn $\\dfrac{C}{D}$, so sánh $(x - 1) \\cdot D$ với $x \\cdot C$.',
        'Phân tích $x^2 - 1 = (x - 1)(x + 1)$ và $x^2 + x = x(x + 1)$.',
      ],
      solution:
        '$(x - 1)(x^2 + x) = x(x - 1)(x + 1) = x(x^2 - 1)$, nên $\\dfrac{x - 1}{x} = \\dfrac{x^2 - 1}{x^2 + x}$. Với $\\dfrac{x^2 - x}{x}$: $(x - 1) \\cdot x \\ne x(x^2 - x) = x^2(x - 1)$; hai lựa chọn còn lại cũng không thỏa mãn.',
    },
    {
      type: 'text',
      prompt:
        'Tìm đa thức $A$ thỏa mãn $\\dfrac{A}{x + 3} = \\dfrac{x^2 - 3x}{x^2 - 9}$. Gõ đa thức $A$.',
      accept: ['x', 'A = x', 'A=x'],
      hints: [
        'Hai phân thức bằng nhau: $A \\cdot (x^2 - 9) = (x + 3)(x^2 - 3x)$.',
        'Phân tích $(x + 3)(x^2 - 3x) = x(x - 3)(x + 3)$.',
      ],
      solution: '$A(x^2 - 9) = (x + 3)(x^2 - 3x) = x(x - 3)(x + 3) = x(x^2 - 9)$, nên $A = x$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số $a$ để hai phân thức $\\dfrac{2}{x - 1}$ và $\\dfrac{2x + a}{x^2 - 1}$ bằng nhau.',
      answer: 2,
      hints: [
        'Cần $2(x^2 - 1) = (x - 1)(2x + a)$ với mọi $x$.',
        'Nhân ra vế phải: $2x^2 + (a - 2)x - a$, rồi so sánh với $2x^2 - 2$.',
      ],
      solution:
        '$(x - 1)(2x + a) = 2x^2 + (a - 2)x - a$. Để bằng $2x^2 - 2$ ta cần $a - 2 = 0$ và $-a = -2$, tức là $a = 2$. Thử lại: $\\dfrac{2x + 2}{x^2 - 1} = \\dfrac{2(x + 1)}{(x - 1)(x + 1)}$, và $2(x^2 - 1) = (x - 1)(2x + 2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đi quãng đường $120$ km với vận tốc $x$ (km/h), nên thời gian đi là $\\dfrac{120}{x}$ (giờ). Tính thời gian đi khi $x = 48$.',
      answer: 2.5,
      unit: 'h',
      hints: ['Thay $x = 48$ vào phân thức $\\dfrac{120}{x}$.'],
      solution: '$\\dfrac{120}{48} = \\dfrac{5}{2} = 2{,}5$ (giờ).',
    },
  ],
  takeaways: [
    'Phân thức $\\dfrac{A}{B}$: $A$, $B$ là đa thức, $B$ khác đa thức $0$. Mỗi đa thức, mỗi số thực là một phân thức.',
    'Điều kiện xác định: giá trị của mẫu khác $0$. Phân thức không xác định tại giá trị làm mẫu bằng $0$.',
    'Giá trị của phân thức: thay giá trị của biến (thỏa mãn điều kiện xác định) vào rồi tính.',
    '$\\dfrac{A}{B} = \\dfrac{C}{D}$ nếu $A \\cdot D = B \\cdot C$.',
  ],
};
