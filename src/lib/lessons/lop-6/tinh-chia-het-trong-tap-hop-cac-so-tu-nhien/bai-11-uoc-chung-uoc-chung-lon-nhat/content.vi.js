/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ước chung và ước chung lớn nhất của hai số, cách tìm ƯCLN bằng phân tích ra thừa số nguyên tố và bằng thuật toán Euclid, và cách rút gọn phân số về tối giản.',
  intro:
    'Muốn chia $48$ cái kẹo và $18$ cái bánh thành các phần quà giống hệt nhau, nhiều phần nhất có thể, em cần một số chia hết cả $48$ lẫn $18$ và lớn nhất. Số đó là ước chung lớn nhất (ƯCLN). Bài này chỉ cho em hai cách tìm ƯCLN và dùng nó để rút gọn phân số.',
  objectives: [
    'Hiểu ước chung, ước chung lớn nhất và kí hiệu $\\text{ƯC}(a, b)$, $\\text{ƯCLN}(a, b)$.',
    'Tìm ƯCLN bằng cách phân tích các số ra thừa số nguyên tố.',
    'Tìm ƯCLN bằng thuật toán Euclid, thay $(a, b)$ bằng $(b, r)$ cho đến khi $r = 0$.',
    'Rút gọn một phân số về phân số tối giản bằng ƯCLN của tử và mẫu.',
  ],
  sections: [
    {
      heading: 'Ước chung và ước chung lớn nhất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ước chung, ƯCLN',
          text: 'Một số là ước chung của hai hay nhiều số nếu nó là ước của tất cả các số đó. Ước chung lớn nhất là số lớn nhất trong tập hợp các ước chung.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\text{Ư}(12) = \\{1, 2, 3, 4, 6, 12\\}$ và $\\text{Ư}(18) = \\{1, 2, 3, 6, 9, 18\\}$, nên $\\text{ƯC}(12, 18) = \\{1, 2, 3, 6\\}$ và $\\text{ƯCLN}(12, 18) = 6$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Mọi ước chung của hai số đều là ước của ƯCLN của chúng. Vì thế muốn tìm $\\text{ƯC}(a, b)$, em chỉ cần tìm các ước của $\\text{ƯCLN}(a, b)$.',
        },
      ],
    },
    {
      heading: 'Tìm ƯCLN bằng phân tích ra thừa số nguyên tố',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Phân tích mỗi số ra thừa số nguyên tố.',
            'Chọn các thừa số nguyên tố chung.',
            'Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ nhỏ nhất. Tích đó là ƯCLN.',
          ],
        },
        { type: 'tex', tex: '36 = 2^2 \\cdot 3^2, \\quad 84 = 2^2 \\cdot 3 \\cdot 7' },
        {
          type: 'p',
          text: 'Thừa số chung là $2$ và $3$; số mũ nhỏ nhất của $2$ là $2$, của $3$ là $1$. Vậy $\\text{ƯCLN}(36, 84) = 2^2 \\cdot 3 = 12$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nếu hai số không có thừa số nguyên tố chung thì ƯCLN của chúng bằng $1$. Ta nói hai số đó nguyên tố cùng nhau.',
        },
      ],
    },
    {
      heading: 'Thuật toán Euclid',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu $a = q \\cdot b + r$ thì $\\text{ƯCLN}(a, b) = \\text{ƯCLN}(b, r)$. Khi $r = 0$ thì ƯCLN chính là $b$.',
        },
        {
          type: 'p',
          text: 'Mỗi bước, số dư nhỏ hơn số chia, nên các số giảm dần và thuật toán luôn dừng. Với số lớn, cách này nhanh hơn nhiều so với phân tích ra thừa số.',
        },
        {
          type: 'p',
          text: 'Biết ƯCLN, em tìm được bội chung nhỏ nhất: $\\text{BCNN}(a, b) = \\dfrac{a \\cdot b}{\\text{ƯCLN}(a, b)}$.',
        },
      ],
    },
    {
      heading: 'Phân số tối giản',
      blocks: [
        {
          type: 'p',
          text: 'Phân số $\\dfrac{a}{b}$ là phân số tối giản khi $\\text{ƯCLN}(a, b) = 1$. Muốn rút gọn một phân số về tối giản, em chia cả tử và mẫu cho ƯCLN của chúng.',
        },
        { type: 'tex', tex: '\\frac{36}{84} = \\frac{36 : 12}{84 : 12} = \\frac{3}{7}' },
      ],
    },
  ],
  explore: {
    title: 'Thuật toán Euclid từng bước',
    instruction:
      'Nhập hai số từ 1 đến 999 rồi nhấn "Bước" để xem từng phép chia có dư. Khi số dư bằng 0, số chia cuối cùng là ƯCLN.',
  },
  examples: [
    {
      problem: 'Tìm $\\text{ƯCLN}(48, 18)$ bằng thuật toán Euclid.',
      steps: [
        '$48 = 2 \\cdot 18 + 12$, nên $\\text{ƯCLN}(48, 18) = \\text{ƯCLN}(18, 12)$.',
        '$18 = 1 \\cdot 12 + 6$, nên tiếp tục với $(12, 6)$.',
        '$12 = 2 \\cdot 6 + 0$: số dư bằng $0$, dừng lại.',
      ],
      answer: '$\\text{ƯCLN}(48, 18) = 6$ và $\\text{BCNN}(48, 18) = 48 \\cdot 18 : 6 = 144$.',
    },
    {
      problem: 'Tìm $\\text{ƯCLN}(90, 120)$ rồi tìm $\\text{ƯC}(90, 120)$.',
      steps: [
        '$90 = 2 \\cdot 3^2 \\cdot 5$ và $120 = 2^3 \\cdot 3 \\cdot 5$.',
        'Thừa số chung $2, 3, 5$, lấy số mũ nhỏ nhất: $2 \\cdot 3 \\cdot 5 = 30$.',
        'Các ước chung là các ước của $30$.',
      ],
      answer:
        '$\\text{ƯCLN}(90, 120) = 30$ và $\\text{ƯC}(90, 120) = \\{1, 2, 3, 5, 6, 10, 15, 30\\}$.',
    },
    {
      problem: 'Rút gọn phân số $\\dfrac{24}{60}$ về phân số tối giản.',
      steps: [
        '$24 = 2^3 \\cdot 3$ và $60 = 2^2 \\cdot 3 \\cdot 5$, nên $\\text{ƯCLN}(24, 60) = 2^2 \\cdot 3 = 12$.',
        'Chia cả tử và mẫu cho $12$: $\\dfrac{24 : 12}{60 : 12}$.',
      ],
      answer: '$\\dfrac{24}{60} = \\dfrac{2}{5}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm $\\text{ƯCLN}(56, 42)$.',
      answer: 14,
      hints: ['Thuật toán Euclid: $56 = 1 \\cdot 42 + 14$.', 'Tiếp theo: $42 = 3 \\cdot 14 + 0$.'],
      solution:
        '$56 = 42 + 14$, $42 = 3 \\cdot 14$. Số dư bằng $0$ nên $\\text{ƯCLN}(56, 42) = 14$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{ƯCLN}(105, 75)$.',
      answer: 15,
      hints: [
        '$105 = 3 \\cdot 5 \\cdot 7$ và $75 = 3 \\cdot 5^2$.',
        'Thừa số chung là $3$ và $5$.',
      ],
      solution:
        'Thừa số chung $3$ và $5$ với số mũ nhỏ nhất là $1$: $\\text{ƯCLN} = 3 \\cdot 5 = 15$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các ước chung của $24$ và $36$.',
      options: ['$1$', '$4$', '$8$', '$9$', '$12$', '$18$'],
      answers: [0, 1, 4],
      hints: [
        'Tìm $\\text{ƯCLN}(24, 36)$ trước.',
        'Ước chung là ước của $\\text{ƯCLN}(24, 36) = 12$.',
      ],
      solution:
        '$\\text{ƯCLN}(24, 36) = 12$, nên ước chung là $1, 2, 3, 4, 6, 12$. Trong các lựa chọn có $1, 4, 12$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{45}{75}$ về tối giản.',
      answer: [3, 5],
      simplest: true,
      hints: ['Tìm $\\text{ƯCLN}(45, 75)$.', '$\\text{ƯCLN}(45, 75) = 15$.'],
      solution: '$\\dfrac{45}{75} = \\dfrac{45 : 15}{75 : 15} = \\dfrac{3}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp số nào nguyên tố cùng nhau?',
      options: ['$12$ và $18$', '$14$ và $21$', '$8$ và $15$', '$9$ và $27$'],
      answer: 2,
      hints: [
        'Hai số nguyên tố cùng nhau khi ƯCLN của chúng bằng $1$.',
        '$8 = 2^3$ và $15 = 3 \\cdot 5$.',
      ],
      solution:
        '$8 = 2^3$ và $15 = 3 \\cdot 5$ không có thừa số chung, nên $\\text{ƯCLN}(8, 15) = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Cô giáo có $48$ quyển vở và $36$ cái bút, muốn chia đều thành các phần quà giống nhau, không thừa. Có thể chia nhiều nhất bao nhiêu phần quà?',
      answer: 12,
      hints: ['Số phần quà phải là ước chung của $48$ và $36$.', 'Nhiều nhất nghĩa là lấy ƯCLN.'],
      solution:
        '$\\text{ƯCLN}(48, 36) = 12$, nên chia được nhiều nhất $12$ phần, mỗi phần $4$ quyển vở và $3$ cái bút.',
    },
    {
      type: 'number',
      prompt: 'Biết $\\text{ƯCLN}(a, 20) = 4$ và $a \\cdot 20 = 240$. Tìm $\\text{BCNN}(a, 20)$.',
      answer: 60,
      hints: ['$\\text{BCNN}(a, b) = \\dfrac{a \\cdot b}{\\text{ƯCLN}(a, b)}$.'],
      solution: '$\\text{BCNN}(a, 20) = 240 : 4 = 60$ (ở đây $a = 12$).',
    },
  ],
  takeaways: [
    '$\\text{ƯCLN}(a, b)$ là số lớn nhất chia hết cả $a$ và $b$; mọi ước chung đều là ước của nó.',
    'Phân tích ra thừa số nguyên tố: lấy các thừa số chung với số mũ nhỏ nhất.',
    'Thuật toán Euclid: $\\text{ƯCLN}(a, b) = \\text{ƯCLN}(b, r)$ với $r$ là số dư của $a$ chia $b$.',
    'Chia tử và mẫu cho ƯCLN của chúng để được phân số tối giản.',
  ],
};
