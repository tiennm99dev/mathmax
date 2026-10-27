/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khai căn bậc hai với phép nhân và phép chia: căn của một tích bằng tích các căn, căn của một thương bằng thương các căn; khai căn một tích, một thương, nhân và chia các căn bậc hai.',
  intro:
    'Tính nhẩm $\\sqrt{49 \\cdot 144}$ thế nào cho nhanh? Nhân ra $7\\,056$ rồi tìm căn thì khá vất vả. Nhưng $\\sqrt{49} = 7$ và $\\sqrt{144} = 12$, mà $7 \\cdot 12 = 84$, và $84^2 = 7\\,056$. Bài này cho em hai quy tắc giúp khai căn một tích, một thương nhanh hơn.',
  objectives: [
    'Phát biểu và chứng minh quy tắc căn của một tích, căn của một thương.',
    'Khai căn một tích, một thương; nhân, chia các căn bậc hai.',
    'Áp dụng hai quy tắc cho biểu thức chứa chữ, chú ý điều kiện không âm của biểu thức lấy căn.',
  ],
  sections: [
    {
      heading: 'Khai căn bậc hai và phép nhân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Căn của một tích',
          text: 'Nếu $a$ và $b$ là hai số không âm thì $\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$.',
        },
        {
          type: 'p',
          text: 'Chứng minh: $\\sqrt{a} \\cdot \\sqrt{b}$ không âm và $(\\sqrt{a} \\cdot \\sqrt{b})^2 = (\\sqrt{a})^2 \\cdot (\\sqrt{b})^2 = ab$. Vậy $\\sqrt{a} \\cdot \\sqrt{b}$ chính là căn bậc hai số học của $ab$.',
        },
        {
          type: 'list',
          items: [
            'Khai căn một tích: khai căn từng thừa số rồi nhân các kết quả, $\\sqrt{16 \\cdot 25} = 4 \\cdot 5 = 20$.',
            'Nhân các căn bậc hai: nhân các số dưới dấu căn rồi khai căn, $\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$.',
            'Quy tắc mở rộng cho tích nhiều số không âm, và cho biểu thức: với $A \\ge 0$, $B \\ge 0$ thì $\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không có quy tắc cho phép cộng',
          text: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$, còn $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$. Nói chung $\\sqrt{a + b} \\ne \\sqrt{a} + \\sqrt{b}$.',
        },
        { type: 'widget', name: 'any-numbers' },
      ],
    },
    {
      heading: 'Khai căn bậc hai và phép chia',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Căn của một thương',
          text: 'Nếu $a$ là số không âm và $b$ là số dương thì $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$.',
        },
        {
          type: 'p',
          text: 'Chứng minh: $\\dfrac{\\sqrt{a}}{\\sqrt{b}}$ không âm và $\\left(\\dfrac{\\sqrt{a}}{\\sqrt{b}}\\right)^2 = \\dfrac{a}{b}$. Điều kiện $b > 0$ để mẫu khác $0$.',
        },
        {
          type: 'list',
          items: [
            'Khai căn một thương: $\\sqrt{\\dfrac{25}{121}} = \\dfrac{\\sqrt{25}}{\\sqrt{121}} = \\dfrac{5}{11}$.',
            'Chia hai căn bậc hai: $\\dfrac{\\sqrt{80}}{\\sqrt{5}} = \\sqrt{\\dfrac{80}{5}} = \\sqrt{16} = 4$.',
            'Với biểu thức $A \\ge 0$, $B > 0$: $\\sqrt{\\dfrac{A}{B}} = \\dfrac{\\sqrt{A}}{\\sqrt{B}}$.',
          ],
        },
        {
          type: 'table',
          head: ['Quy tắc', 'Điều kiện', 'Ví dụ'],
          rows: [
            [
              '$\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$',
              '$a \\ge 0$, $b \\ge 0$',
              '$\\sqrt{5} \\cdot \\sqrt{45} = \\sqrt{225} = 15$',
            ],
            [
              '$\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$',
              '$a \\ge 0$, $b > 0$',
              '$\\dfrac{\\sqrt{75}}{\\sqrt{3}} = \\sqrt{25} = 5$',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép và chia hình vuông',
    instruction:
      'Chọn hai số chính phương $a$ và $b$. Ở "Căn của một tích", hình vuông lớn được ghép từ $b$ khối vuông diện tích $a$: em hãy đếm cạnh của nó rồi nhập vào ô. Ở "Căn của một thương", hình vuông diện tích $a$ được chia thành $b$ mảnh bằng nhau; cạnh mảnh vàng (các đường nét đứt chia cạnh lớn thành từng đơn vị độ dài) cho biết $\\sqrt{\\dfrac{a}{b}}$.',
  },
  examples: [
    {
      problem: 'Tính $\\sqrt{49 \\cdot 144}$ và $\\sqrt{0{,}09 \\cdot 64}$.',
      steps: [
        '$\\sqrt{49 \\cdot 144} = \\sqrt{49} \\cdot \\sqrt{144} = 7 \\cdot 12 = 84$.',
        '$\\sqrt{0{,}09 \\cdot 64} = \\sqrt{0{,}09} \\cdot \\sqrt{64} = 0{,}3 \\cdot 8 = 2{,}4$.',
      ],
      answer: '$\\sqrt{49 \\cdot 144} = 84$; $\\sqrt{0{,}09 \\cdot 64} = 2{,}4$.',
    },
    {
      problem: 'Tính $\\sqrt{1{,}3} \\cdot \\sqrt{52} \\cdot \\sqrt{10}$.',
      steps: [
        'Nhân các số dưới dấu căn: $\\sqrt{1{,}3} \\cdot \\sqrt{52} \\cdot \\sqrt{10} = \\sqrt{1{,}3 \\cdot 52 \\cdot 10}$.',
        '$1{,}3 \\cdot 10 = 13$, nên tích bằng $13 \\cdot 52 = 13 \\cdot 13 \\cdot 4 = 676$.',
        '$\\sqrt{676} = \\sqrt{13^2 \\cdot 2^2} = 13 \\cdot 2 = 26$.',
      ],
      answer: '$\\sqrt{1{,}3} \\cdot \\sqrt{52} \\cdot \\sqrt{10} = 26$.',
    },
    {
      problem: 'Tính $\\sqrt{1\\dfrac{9}{16}}$ và $\\dfrac{\\sqrt{2}}{\\sqrt{18}}$.',
      steps: [
        'Đổi hỗn số: $1\\dfrac{9}{16} = \\dfrac{25}{16}$, nên $\\sqrt{\\dfrac{25}{16}} = \\dfrac{\\sqrt{25}}{\\sqrt{16}} = \\dfrac{5}{4}$.',
        '$\\dfrac{\\sqrt{2}}{\\sqrt{18}} = \\sqrt{\\dfrac{2}{18}} = \\sqrt{\\dfrac{1}{9}} = \\dfrac{1}{3}$.',
      ],
      answer:
        '$\\sqrt{1\\dfrac{9}{16}} = \\dfrac{5}{4}$; $\\dfrac{\\sqrt{2}}{\\sqrt{18}} = \\dfrac{1}{3}$.',
    },
    {
      problem:
        'Rút gọn $\\sqrt{2a} \\cdot \\sqrt{8a}$ với $a \\ge 0$, và $\\dfrac{\\sqrt{50x^3}}{\\sqrt{2x}}$ với $x > 0$.',
      steps: [
        '$\\sqrt{2a} \\cdot \\sqrt{8a} = \\sqrt{16a^2} = \\sqrt{(4a)^2} = |4a| = 4a$ vì $a \\ge 0$.',
        '$\\dfrac{\\sqrt{50x^3}}{\\sqrt{2x}} = \\sqrt{\\dfrac{50x^3}{2x}} = \\sqrt{25x^2} = |5x| = 5x$ vì $x > 0$.',
      ],
      answer: '$\\sqrt{2a} \\cdot \\sqrt{8a} = 4a$; $\\dfrac{\\sqrt{50x^3}}{\\sqrt{2x}} = 5x$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{16 \\cdot 25}$.',
      answer: 20,
      hints: ['Khai căn từng thừa số rồi nhân.'],
      solution: '$\\sqrt{16 \\cdot 25} = \\sqrt{16} \\cdot \\sqrt{25} = 4 \\cdot 5 = 20$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{5} \\cdot \\sqrt{45}$.',
      answer: 15,
      hints: ['Nhân các số dưới dấu căn trước.', '$5 \\cdot 45 = 225$.'],
      solution: '$\\sqrt{5} \\cdot \\sqrt{45} = \\sqrt{5 \\cdot 45} = \\sqrt{225} = 15$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{12{,}1 \\cdot 360}$.',
      answer: 66,
      hints: [
        'Viết $12{,}1 \\cdot 360 = 121 \\cdot 36$.',
        'Khai căn từng thừa số: $\\sqrt{121}$ và $\\sqrt{36}$.',
      ],
      solution:
        '$12{,}1 \\cdot 360 = 121 \\cdot 36$, nên $\\sqrt{12{,}1 \\cdot 360} = \\sqrt{121} \\cdot \\sqrt{36} = 11 \\cdot 6 = 66$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\sqrt{\\dfrac{9}{169}}$ (nhập dưới dạng phân số).',
      answer: [3, 13],
      hints: ['Căn của thương bằng thương các căn.'],
      solution: '$\\sqrt{\\dfrac{9}{169}} = \\dfrac{\\sqrt{9}}{\\sqrt{169}} = \\dfrac{3}{13}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\dfrac{\\sqrt{75}}{\\sqrt{3}}$.',
      answer: 5,
      hints: ['Đưa về một căn: $\\sqrt{\\dfrac{75}{3}}$.'],
      solution: '$\\dfrac{\\sqrt{75}}{\\sqrt{3}} = \\sqrt{\\dfrac{75}{3}} = \\sqrt{25} = 5$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\sqrt{2\\dfrac{7}{9}}$ (nhập dưới dạng phân số).',
      answer: [5, 3],
      hints: ['Đổi hỗn số ra phân số trước.', '$2\\dfrac{7}{9} = \\dfrac{25}{9}$.'],
      solution:
        '$2\\dfrac{7}{9} = \\dfrac{25}{9}$, nên $\\sqrt{2\\dfrac{7}{9}} = \\dfrac{\\sqrt{25}}{\\sqrt{9}} = \\dfrac{5}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Đẳng thức nào sai?',
      options: [
        '$\\sqrt{4 \\cdot 9} = \\sqrt{4} \\cdot \\sqrt{9}$',
        '$\\sqrt{4 + 9} = \\sqrt{4} + \\sqrt{9}$',
        '$\\sqrt{\\dfrac{36}{4}} = \\dfrac{\\sqrt{36}}{\\sqrt{4}}$',
        '$\\sqrt{0{,}25} = 0{,}5$',
      ],
      answer: 1,
      hints: [
        'Tính hai vế của từng đẳng thức.',
        'Có quy tắc cho tích và thương, còn cho tổng thì sao?',
      ],
      solution:
        '$\\sqrt{4 + 9} = \\sqrt{13} \\approx 3{,}61$, còn $\\sqrt{4} + \\sqrt{9} = 5$. Ba đẳng thức còn lại đúng: $6 = 2 \\cdot 3$; $3 = \\dfrac{6}{2}$; $0{,}5^2 = 0{,}25$.',
    },
    {
      type: 'choice',
      prompt: 'Với $a \\ge 0$, biểu thức $\\sqrt{3a} \\cdot \\sqrt{27a}$ bằng',
      options: ['$9a$', '$81a$', '$9a^2$', '$3a$'],
      answer: 0,
      hints: [
        'Nhân dưới dấu căn: $3a \\cdot 27a = 81a^2$.',
        'Dùng $\\sqrt{A^2} = |A|$ và $a \\ge 0$.',
      ],
      solution:
        '$\\sqrt{3a} \\cdot \\sqrt{27a} = \\sqrt{81a^2} = \\sqrt{(9a)^2} = |9a| = 9a$ vì $a \\ge 0$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có hai cạnh $3{,}2$ m và $5$ m. Một hình vuông có cùng diện tích với hình chữ nhật đó. Tính cạnh hình vuông.',
      answer: 4,
      unit: 'm',
      hints: ['Cạnh hình vuông là $\\sqrt{3{,}2 \\cdot 5}$.'],
      solution:
        'Diện tích hình chữ nhật là $3{,}2 \\cdot 5 = 16$ (m²). Cạnh hình vuông là $\\sqrt{16} = 4$ (m).',
    },
  ],
  takeaways: [
    '$\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$ với $a \\ge 0$, $b \\ge 0$.',
    '$\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$ với $a \\ge 0$, $b > 0$.',
    'Đọc theo hai chiều: khai căn từng thừa số rồi nhân, hoặc nhân dưới dấu căn rồi khai căn.',
    'Không có quy tắc như vậy cho phép cộng: $\\sqrt{a + b} \\ne \\sqrt{a} + \\sqrt{b}$ nói chung.',
  ],
};
