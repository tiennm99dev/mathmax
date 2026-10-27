/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đưa thừa số ra ngoài và vào trong dấu căn, khử mẫu của biểu thức lấy căn, trục căn thức ở mẫu bằng biểu thức liên hợp, và phối hợp các phép biến đổi để rút gọn biểu thức chứa căn thức bậc hai.',
  intro:
    'Máy tính cho $\\sqrt{50} + \\sqrt{18} - \\sqrt{8} \\approx 8{,}485$, nhưng kết quả đúng và gọn là $6\\sqrt{2}$. Để có được nó, ta cần vài phép biến đổi đơn giản: đưa thừa số ra ngoài dấu căn, đưa vào trong, trục căn thức ở mẫu. Bài này giới thiệu từng phép và cách phối hợp chúng để rút gọn biểu thức.',
  objectives: [
    'Đưa thừa số ra ngoài dấu căn và vào trong dấu căn.',
    'Khử mẫu của biểu thức lấy căn và trục căn thức ở mẫu.',
    'Phối hợp các phép biến đổi để rút gọn biểu thức chứa căn thức bậc hai.',
  ],
  sections: [
    {
      heading: 'Đưa thừa số ra ngoài dấu căn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Nếu $a$ là một số và $b$ là một số không âm thì $\\sqrt{a^2 b} = |a|\\sqrt{b}$. Tổng quát, với biểu thức $B \\ge 0$: $\\sqrt{A^2 B} = |A|\\sqrt{B}$.',
        },
        {
          type: 'p',
          text: 'Thật vậy, $\\sqrt{a^2 b} = \\sqrt{a^2} \\cdot \\sqrt{b} = |a|\\sqrt{b}$. Muốn đưa thừa số ra ngoài, ta tách số dưới dấu căn thành tích của một số chính phương với một số khác: $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.',
        },
        {
          type: 'p',
          text: 'Phép biến đổi này giúp nhận ra các căn thức đồng dạng (cùng một căn, chỉ khác hệ số) để cộng, trừ: $\\sqrt{12} + \\sqrt{27} = 2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$.',
        },
      ],
    },
    {
      heading: 'Đưa thừa số vào trong dấu căn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Với $B \\ge 0$: nếu $A \\ge 0$ thì $A\\sqrt{B} = \\sqrt{A^2 B}$; nếu $A < 0$ thì $A\\sqrt{B} = -\\sqrt{A^2 B}$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $5\\sqrt{4} = \\sqrt{25 \\cdot 4} = \\sqrt{100}$, còn $-5\\sqrt{4} = -\\sqrt{100}$. Dấu trừ ở ngoài phải giữ lại, vì một căn bậc hai số học không bao giờ âm.',
        },
        {
          type: 'p',
          text: 'Phép biến đổi này thường dùng để so sánh: $3\\sqrt{5} = \\sqrt{45}$ và $2\\sqrt{11} = \\sqrt{44}$; vì $45 > 44$ nên $3\\sqrt{5} > 2\\sqrt{11}$.',
        },
      ],
    },
    {
      heading: 'Khử mẫu và trục căn thức ở mẫu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Khử mẫu của biểu thức lấy căn',
          text: 'Với $A \\cdot B \\ge 0$ và $B \\ne 0$: $\\sqrt{\\dfrac{A}{B}} = \\dfrac{\\sqrt{AB}}{|B|}$. Chẳng hạn $\\sqrt{\\dfrac{3}{5}} = \\sqrt{\\dfrac{3 \\cdot 5}{5^2}} = \\dfrac{\\sqrt{15}}{5}$.',
        },
        {
          type: 'p',
          text: 'Trục căn thức ở mẫu là biến đổi một biểu thức có căn ở mẫu thành biểu thức có mẫu không chứa căn. Ta nhân cả tử và mẫu với một biểu thức thích hợp:',
        },
        {
          type: 'table',
          head: ['Mẫu có dạng', 'Nhân tử và mẫu với', 'Kết quả'],
          rows: [
            [
              '$\\sqrt{B}$ ($B > 0$)',
              '$\\sqrt{B}$',
              '$\\dfrac{A}{\\sqrt{B}} = \\dfrac{A\\sqrt{B}}{B}$',
            ],
            [
              '$\\sqrt{A} + B$ ($A \\ge 0$, $A \\ne B^2$)',
              '$\\sqrt{A} - B$',
              '$\\dfrac{C}{\\sqrt{A} + B} = \\dfrac{C(\\sqrt{A} - B)}{A - B^2}$',
            ],
            [
              '$\\sqrt{A} - B$ ($A \\ge 0$, $A \\ne B^2$)',
              '$\\sqrt{A} + B$',
              '$\\dfrac{C}{\\sqrt{A} - B} = \\dfrac{C(\\sqrt{A} + B)}{A - B^2}$',
            ],
            [
              '$\\sqrt{A} \\pm \\sqrt{B}$ ($A, B \\ge 0$, $A \\ne B$)',
              '$\\sqrt{A} \\mp \\sqrt{B}$',
              '$\\dfrac{C}{\\sqrt{A} \\pm \\sqrt{B}} = \\dfrac{C(\\sqrt{A} \\mp \\sqrt{B})}{A - B}$',
            ],
          ],
          caption:
            'Hai biểu thức $\\sqrt{A} + \\sqrt{B}$ và $\\sqrt{A} - \\sqrt{B}$ gọi là hai biểu thức liên hợp.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao nhân với biểu thức liên hợp?',
          text: 'Vì $(\\sqrt{A} - \\sqrt{B})(\\sqrt{A} + \\sqrt{B}) = A - B$ theo hằng đẳng thức hiệu hai bình phương: căn ở mẫu biến mất.',
        },
      ],
    },
    {
      heading: 'Rút gọn biểu thức chứa căn thức bậc hai',
      blocks: [
        {
          type: 'p',
          text: 'Để rút gọn, ta phối hợp các phép tính và các phép biến đổi đã học: đưa thừa số ra ngoài dấu căn để làm xuất hiện các căn đồng dạng, khử mẫu, trục căn thức, dùng hằng đẳng thức, rồi thu gọn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Với biểu thức chứa chữ, nhớ điều kiện: $\\sqrt{x^2 \\cdot 5} = |x|\\sqrt{5}$, chỉ bằng $x\\sqrt{5}$ khi $x \\ge 0$. Và chỉ được cộng các căn đồng dạng: $2\\sqrt{3} + \\sqrt{2}$ không gộp được nữa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trình biến đổi từng bước',
    instruction:
      'Chọn một bài, rồi ở mỗi bước bấm vào quy tắc em định dùng. Chọn đúng, dòng biến đổi tiếp theo hiện ra; chọn sai, em được giải thích quy tắc đó dùng khi nào. Cột bên phải tính giá trị gần đúng của mỗi dòng: biến đổi đúng thì giá trị không đổi.',
  },
  examples: [
    {
      problem:
        'Đưa thừa số ra ngoài dấu căn: a) $\\sqrt{72}$; b) $\\sqrt{27a}$ với $a \\ge 0$; c) $\\sqrt{50x^2}$ với $x < 0$.',
      steps: [
        'a) $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.',
        'b) $\\sqrt{27a} = \\sqrt{9 \\cdot 3a} = 3\\sqrt{3a}$.',
        'c) $\\sqrt{50x^2} = \\sqrt{(5x)^2 \\cdot 2} = |5x|\\sqrt{2}$. Vì $x < 0$ nên $|5x| = -5x$.',
      ],
      answer: 'a) $6\\sqrt{2}$; b) $3\\sqrt{3a}$; c) $-5x\\sqrt{2}$.',
    },
    {
      problem: 'Đưa thừa số vào trong dấu căn rồi so sánh $5\\sqrt{2}$ và $4\\sqrt{3}$.',
      steps: [
        '$5\\sqrt{2} = \\sqrt{5^2 \\cdot 2} = \\sqrt{50}$.',
        '$4\\sqrt{3} = \\sqrt{4^2 \\cdot 3} = \\sqrt{48}$.',
        '$50 > 48$ nên $\\sqrt{50} > \\sqrt{48}$.',
      ],
      answer: '$5\\sqrt{2} > 4\\sqrt{3}$.',
    },
    {
      problem: 'Trục căn thức ở mẫu: a) $\\dfrac{5}{2\\sqrt{3}}$; b) $\\dfrac{4}{3 + \\sqrt{5}}$.',
      steps: [
        'a) Nhân cả tử và mẫu với $\\sqrt{3}$: $\\dfrac{5\\sqrt{3}}{2\\sqrt{3} \\cdot \\sqrt{3}} = \\dfrac{5\\sqrt{3}}{6}$.',
        'b) Biểu thức liên hợp của $3 + \\sqrt{5}$ là $3 - \\sqrt{5}$: $\\dfrac{4(3 - \\sqrt{5})}{(3 + \\sqrt{5})(3 - \\sqrt{5})} = \\dfrac{4(3 - \\sqrt{5})}{9 - 5}$.',
        'Mẫu bằng $4$, rút gọn được $3 - \\sqrt{5}$.',
      ],
      answer: 'a) $\\dfrac{5\\sqrt{3}}{6}$; b) $3 - \\sqrt{5}$.',
    },
    {
      problem: 'Rút gọn $P = \\dfrac{x - 4}{\\sqrt{x} - 2}$ với $x \\ge 0$, $x \\ne 4$.',
      steps: [
        'Với $x \\ge 0$ thì $x = (\\sqrt{x})^2$, nên $x - 4 = (\\sqrt{x})^2 - 2^2 = (\\sqrt{x} - 2)(\\sqrt{x} + 2)$.',
        'Vì $x \\ne 4$ nên $\\sqrt{x} - 2 \\ne 0$; chia cả tử và mẫu cho $\\sqrt{x} - 2$.',
      ],
      answer: '$P = \\sqrt{x} + 2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đưa thừa số ra ngoài dấu căn: $\\sqrt{52}$ bằng',
      options: ['$2\\sqrt{13}$', '$4\\sqrt{13}$', '$13\\sqrt{2}$', '$2\\sqrt{26}$'],
      answer: 0,
      hints: ['Tìm thừa số chính phương lớn nhất của $52$.'],
      solution: '$52 = 4 \\cdot 13$, nên $\\sqrt{52} = \\sqrt{2^2 \\cdot 13} = 2\\sqrt{13}$.',
    },
    {
      type: 'choice',
      prompt: 'Đưa thừa số vào trong dấu căn: $-2\\sqrt{7}$ bằng',
      options: ['$\\sqrt{28}$', '$-\\sqrt{28}$', '$-\\sqrt{14}$', '$\\sqrt{-28}$'],
      answer: 1,
      hints: ['Thừa số $-2$ âm: dấu trừ ở lại bên ngoài.'],
      solution: '$-2 < 0$ nên $-2\\sqrt{7} = -\\sqrt{2^2 \\cdot 7} = -\\sqrt{28}$.',
    },
    {
      type: 'choice',
      prompt: 'Khử mẫu của biểu thức lấy căn: $\\sqrt{\\dfrac{3}{5}}$ bằng',
      options: [
        '$\\dfrac{\\sqrt{15}}{5}$',
        '$\\dfrac{\\sqrt{3}}{5}$',
        '$\\dfrac{\\sqrt{15}}{25}$',
        '$\\dfrac{3}{\\sqrt{5}}$',
      ],
      answer: 0,
      hints: ['Nhân cả tử và mẫu dưới dấu căn với $5$ để mẫu thành $5^2$.'],
      solution:
        '$\\sqrt{\\dfrac{3}{5}} = \\sqrt{\\dfrac{3 \\cdot 5}{5^2}} = \\dfrac{\\sqrt{15}}{5}$.',
    },
    {
      type: 'number',
      prompt: 'Rút gọn $\\sqrt{12} + \\sqrt{27} - \\sqrt{75}$.',
      answer: 0,
      hints: ['Đưa thừa số ra ngoài để các căn cùng là $\\sqrt{3}$.'],
      solution:
        '$\\sqrt{12} = 2\\sqrt{3}$, $\\sqrt{27} = 3\\sqrt{3}$, $\\sqrt{75} = 5\\sqrt{3}$. Tổng bằng $(2 + 3 - 5)\\sqrt{3} = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Trục căn thức ở mẫu: $\\dfrac{6}{\\sqrt{2}}$ bằng',
      options: ['$3\\sqrt{2}$', '$6\\sqrt{2}$', '$\\dfrac{\\sqrt{2}}{3}$', '$3$'],
      answer: 0,
      hints: ['Nhân cả tử và mẫu với $\\sqrt{2}$.'],
      solution: '$\\dfrac{6}{\\sqrt{2}} = \\dfrac{6\\sqrt{2}}{2} = 3\\sqrt{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Trục căn thức ở mẫu: $\\dfrac{1}{\\sqrt{3} - 1}$ bằng',
      options: [
        '$\\dfrac{\\sqrt{3} + 1}{2}$',
        '$\\sqrt{3} + 1$',
        '$\\dfrac{\\sqrt{3} - 1}{2}$',
        '$\\dfrac{\\sqrt{3} + 1}{4}$',
      ],
      answer: 0,
      hints: ['Biểu thức liên hợp của $\\sqrt{3} - 1$ là $\\sqrt{3} + 1$.', 'Mẫu thành $3 - 1$.'],
      solution:
        '$\\dfrac{1}{\\sqrt{3} - 1} = \\dfrac{\\sqrt{3} + 1}{(\\sqrt{3} - 1)(\\sqrt{3} + 1)} = \\dfrac{\\sqrt{3} + 1}{3 - 1} = \\dfrac{\\sqrt{3} + 1}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(3\\sqrt{2} - \\sqrt{8}) \\cdot \\sqrt{2}$.',
      answer: 2,
      hints: ['Đưa thừa số ra ngoài: $\\sqrt{8} = 2\\sqrt{2}$.'],
      solution:
        '$3\\sqrt{2} - \\sqrt{8} = 3\\sqrt{2} - 2\\sqrt{2} = \\sqrt{2}$, nên biểu thức bằng $\\sqrt{2} \\cdot \\sqrt{2} = 2$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $2\\sqrt{6}$ và $3\\sqrt{3}$.',
      options: [
        '$2\\sqrt{6} < 3\\sqrt{3}$',
        '$2\\sqrt{6} = 3\\sqrt{3}$',
        '$2\\sqrt{6} > 3\\sqrt{3}$',
      ],
      answer: 0,
      hints: ['Đưa thừa số vào trong dấu căn ở cả hai số.'],
      solution:
        '$2\\sqrt{6} = \\sqrt{24}$ và $3\\sqrt{3} = \\sqrt{27}$. Vì $24 < 27$ nên $2\\sqrt{6} < 3\\sqrt{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Với $x < 0$, biểu thức $\\sqrt{5x^2}$ bằng',
      options: ['$x\\sqrt{5}$', '$-x\\sqrt{5}$', '$5x$', '$-5x$'],
      answer: 1,
      hints: ['$\\sqrt{5x^2} = |x|\\sqrt{5}$.', 'Khi $x < 0$ thì $|x| = -x$.'],
      solution: '$\\sqrt{5x^2} = |x|\\sqrt{5} = -x\\sqrt{5}$ vì $x < 0$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn $\\dfrac{x - 9}{\\sqrt{x} + 3}$ với $x \\ge 0$.',
      options: ['$\\sqrt{x} - 3$', '$\\sqrt{x} + 3$', '$x - 3$', '$\\sqrt{x} - 9$'],
      answer: 0,
      hints: ['Viết $x - 9 = (\\sqrt{x})^2 - 3^2$ rồi phân tích thành nhân tử.'],
      solution:
        'Với $x \\ge 0$: $x - 9 = (\\sqrt{x} - 3)(\\sqrt{x} + 3)$, và $\\sqrt{x} + 3 > 0$, nên biểu thức bằng $\\sqrt{x} - 3$.',
    },
  ],
  takeaways: [
    '$\\sqrt{A^2 B} = |A|\\sqrt{B}$ với $B \\ge 0$ (đưa ra ngoài); $A\\sqrt{B} = \\sqrt{A^2 B}$ khi $A \\ge 0$, $= -\\sqrt{A^2 B}$ khi $A < 0$ (đưa vào trong).',
    'Khử mẫu: $\\sqrt{\\dfrac{A}{B}} = \\dfrac{\\sqrt{AB}}{|B|}$; trục căn thức: nhân tử và mẫu với $\\sqrt{B}$ hoặc với biểu thức liên hợp.',
    'Rút gọn: đưa về các căn đồng dạng, trục căn ở mẫu, dùng hằng đẳng thức, nhớ điều kiện của chữ.',
  ],
};
