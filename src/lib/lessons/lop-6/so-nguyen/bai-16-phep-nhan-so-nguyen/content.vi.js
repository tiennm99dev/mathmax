/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân hai số nguyên khác dấu và cùng dấu, quy tắc dấu của tích, các tính chất của phép nhân số nguyên và cách dùng chúng để tính nhanh.',
  intro:
    'Một cửa hàng ghi số tiền lãi bằng số dương và số tiền lỗ bằng số âm. Nếu mỗi chiếc áo bán ra bị lỗ $15$ nghìn đồng, thì bán $4$ chiếc áo cửa hàng "lãi" bao nhiêu? Đó là $4 \\cdot (-15) = (-15) + (-15) + (-15) + (-15) = -60$ nghìn đồng, tức là lỗ $60$ nghìn đồng. Bài này cho em quy tắc nhân mọi số nguyên, kể cả khi cả hai thừa số đều âm.',
  objectives: [
    'Nhân hai số nguyên khác dấu và hai số nguyên cùng dấu.',
    'Xác định dấu của một tích nhiều thừa số.',
    'Dùng tính chất giao hoán, kết hợp, phân phối của phép nhân để tính nhanh.',
  ],
  sections: [
    {
      heading: 'Nhân hai số nguyên khác dấu',
      blocks: [
        {
          type: 'p',
          text: 'Nhân một số nguyên dương với một số nguyên âm là cộng số âm đó nhiều lần: $3 \\cdot (-4) = (-4) + (-4) + (-4) = -12$. Kết quả là số đối của $3 \\cdot 4$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn nhân hai số nguyên khác dấu, ta nhân hai phần số tự nhiên của chúng rồi đặt dấu "$-$" trước kết quả nhận được.',
        },
        { type: 'tex', tex: '(-7) \\cdot 6 = -(7 \\cdot 6) = -42, \\qquad 15 \\cdot (-4) = -60' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Tích của một số nguyên với $0$ luôn bằng $0$: $a \\cdot 0 = 0 \\cdot a = 0$.',
        },
      ],
    },
    {
      heading: 'Nhân hai số nguyên cùng dấu',
      blocks: [
        {
          type: 'p',
          text: 'Nhân hai số nguyên dương chính là nhân hai số tự nhiên khác $0$. Để thấy $(-1) \\cdot (-3)$ bằng bao nhiêu, ta đi xuống theo cột $b = -3$ của bảng nhân: $2 \\cdot (-3) = -6$, $1 \\cdot (-3) = -3$, $0 \\cdot (-3) = 0$. Mỗi lần thừa số thứ nhất giảm $1$, tích tăng $3$. Tiếp tục quy luật: $(-1) \\cdot (-3) = 3$, $(-2) \\cdot (-3) = 6$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn nhân hai số nguyên âm, ta nhân hai phần số tự nhiên của chúng với nhau: $(-a) \\cdot (-b) = a \\cdot b$ với $a, b \\in \\mathbb{N}^*$.',
        },
        { type: 'tex', tex: '(-8) \\cdot (-5) = 8 \\cdot 5 = 40' },
        {
          type: 'table',
          head: ['Dấu của $a$', 'Dấu của $b$', 'Dấu của $a \\cdot b$'],
          rows: [
            ['$+$', '$+$', '$+$'],
            ['$-$', '$-$', '$+$'],
            ['$+$', '$-$', '$-$'],
            ['$-$', '$+$', '$-$'],
          ],
          caption: 'Tích hai số nguyên cùng dấu là số dương, khác dấu là số âm.',
        },
      ],
    },
    {
      heading: 'Tính chất của phép nhân',
      blocks: [
        {
          type: 'table',
          head: ['Tính chất', 'Công thức'],
          rows: [
            ['Giao hoán', '$a \\cdot b = b \\cdot a$'],
            ['Kết hợp', '$(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$'],
            ['Nhân với $1$', '$a \\cdot 1 = 1 \\cdot a = a$'],
            ['Phân phối đối với phép cộng', '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$'],
            ['Phân phối đối với phép trừ', '$a \\cdot (b - c) = a \\cdot b - a \\cdot c$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dấu của một tích nhiều thừa số',
          text: 'Nhờ tính chất kết hợp, ta nói đến tích $a \\cdot b \\cdot c$. Trong một tích các số nguyên khác $0$: nếu có một số chẵn thừa số âm thì tích mang dấu "$+$"; nếu có một số lẻ thừa số âm thì tích mang dấu "$-$". Ví dụ $(-2) \\cdot (-3) \\cdot (-5) = -30$ (ba thừa số âm).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phân biệt với phép cộng',
          text: 'Hai số âm cộng lại cho số âm, $(-3) + (-4) = -7$; nhưng hai số âm nhân với nhau cho số dương, $(-3) \\cdot (-4) = 12$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng nhân mở rộng sang số âm',
    instruction:
      'Bảng ban đầu chỉ có tích của hai số tự nhiên. Bấm "Mở tiếp theo quy luật": trước tiên mở các cột có $b$ âm (cộng số âm nhiều lần), sau đó mở các hàng có $a$ âm bằng cách đi tiếp quy luật theo từng cột. Chọn một ô để xem vì sao tích có dấu như vậy.',
  },
  examples: [
    {
      problem: 'Tính $(-7) \\cdot 6$ và $(-8) \\cdot (-5)$.',
      steps: [
        '$(-7)$ và $6$ khác dấu: nhân hai phần số tự nhiên $7 \\cdot 6 = 42$, đặt dấu "$-$": $(-7) \\cdot 6 = -42$.',
        '$(-8)$ và $(-5)$ cùng dấu: nhân hai phần số tự nhiên, $(-8) \\cdot (-5) = 8 \\cdot 5 = 40$.',
      ],
      answer: '$(-7) \\cdot 6 = -42$; $(-8) \\cdot (-5) = 40$.',
    },
    {
      problem: 'Tính nhanh: $(-4) \\cdot (-125) \\cdot (-25) \\cdot (-8)$.',
      steps: [
        'Tích có bốn thừa số âm (số chẵn) nên mang dấu "$+$".',
        'Đổi chỗ và nhóm: $[(-4) \\cdot (-25)] \\cdot [(-125) \\cdot (-8)] = 100 \\cdot 1\\,000$.',
        '$100 \\cdot 1\\,000 = 100\\,000$.',
      ],
      answer: '$100\\,000$.',
    },
    {
      problem: 'Tính nhanh: $37 \\cdot (-19) + 37 \\cdot (-81)$.',
      steps: [
        'Dùng tính chất phân phối: $37 \\cdot (-19) + 37 \\cdot (-81) = 37 \\cdot [(-19) + (-81)]$.',
        '$(-19) + (-81) = -100$.',
        '$37 \\cdot (-100) = -3\\,700$.',
      ],
      answer: '$-3\\,700$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $(-12) \\cdot 5$.',
      answer: -60,
      hints: ['Hai số khác dấu: tích là số âm.'],
      solution: '$(-12) \\cdot 5 = -(12 \\cdot 5) = -60$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-25) \\cdot (-4)$.',
      answer: 100,
      hints: ['Hai số cùng dấu: nhân hai phần số tự nhiên.'],
      solution: '$(-25) \\cdot (-4) = 25 \\cdot 4 = 100$.',
    },
    {
      type: 'number',
      prompt: 'Tính $0 \\cdot (-2\\,023)$.',
      answer: 0,
      hints: ['Một thừa số bằng $0$ thì tích bằng bao nhiêu?'],
      solution: '$0 \\cdot a = 0$ với mọi số nguyên $a$, nên $0 \\cdot (-2\\,023) = 0$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-2) \\cdot (-3) \\cdot (-5)$.',
      answer: -30,
      hints: ['Đếm số thừa số âm để biết dấu của tích.', 'Có ba thừa số âm (số lẻ).'],
      solution: '$(-2) \\cdot (-3) = 6$, rồi $6 \\cdot (-5) = -30$.',
    },
    {
      type: 'choice',
      prompt: 'Tích $(-3) \\cdot (-5) \\cdot (-7) \\cdot (-9) \\cdot (-11)$ mang dấu gì?',
      options: ['Dấu "$+$"', 'Dấu "$-$"', 'Tích bằng $0$'],
      answer: 1,
      hints: ['Đếm xem có bao nhiêu thừa số âm.'],
      solution: 'Có $5$ thừa số âm, là số lẻ, nên tích mang dấu "$-$".',
    },
    {
      type: 'multi',
      prompt: 'Chọn các tích có giá trị dương.',
      options: [
        '$(-3) \\cdot (-7)$',
        '$(-2) \\cdot 5$',
        '$(-1) \\cdot (-1) \\cdot (-1)$',
        '$4 \\cdot (-6) \\cdot (-2)$',
        '$0 \\cdot (-9)$',
      ],
      answers: [0, 3],
      hints: ['Tích dương khi không có thừa số $0$ và số thừa số âm là số chẵn.'],
      solution:
        '$(-3) \\cdot (-7) = 21$ và $4 \\cdot (-6) \\cdot (-2) = 48$ dương. $(-2) \\cdot 5 = -10$, $(-1) \\cdot (-1) \\cdot (-1) = -1$ âm; $0 \\cdot (-9) = 0$ không dương.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $(-25) \\cdot 37 \\cdot 4$.',
      answer: -3700,
      hints: ['Đổi chỗ để nhân $(-25) \\cdot 4$ trước.'],
      solution: '$[(-25) \\cdot 4] \\cdot 37 = (-100) \\cdot 37 = -3\\,700$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $(-17) \\cdot 64 + (-17) \\cdot 36$.',
      answer: -1700,
      hints: ['Đặt thừa số chung $(-17)$ ra ngoài.'],
      solution: '$(-17) \\cdot (64 + 36) = (-17) \\cdot 100 = -1\\,700$.',
    },
    {
      type: 'number',
      prompt:
        'Lúc $20$ giờ nhiệt độ là $2\\,^\\circ\\text{C}$. Từ đó, mỗi giờ nhiệt độ giảm $3\\,^\\circ\\text{C}$. Nhiệt độ lúc $24$ giờ là bao nhiêu?',
      answer: -10,
      unit: '°C',
      hints: [
        'Mỗi giờ nhiệt độ thay đổi $-3\\,^\\circ\\text{C}$; từ $20$ giờ đến $24$ giờ là $4$ giờ.',
        'Tính $2 + 4 \\cdot (-3)$.',
      ],
      solution:
        '$2 + 4 \\cdot (-3) = 2 + (-12) = -10$. Lúc $24$ giờ nhiệt độ là $-10\\,^\\circ\\text{C}$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng bán $12$ chiếc quạt, mỗi chiếc lỗ $5$ nghìn đồng, và $20$ chiếc đèn, mỗi chiếc lãi $8$ nghìn đồng. Dùng số nguyên âm cho tiền lỗ, tính tổng số tiền lãi của cửa hàng (nghìn đồng).',
      answer: 100,
      unit: 'nghìn đồng',
      hints: ['Tính $12 \\cdot (-5) + 20 \\cdot 8$.'],
      solution: '$12 \\cdot (-5) + 20 \\cdot 8 = -60 + 160 = 100$. Cửa hàng lãi $100$ nghìn đồng.',
    },
  ],
  takeaways: [
    'Khác dấu: nhân hai phần số tự nhiên, đặt dấu "$-$". Cùng dấu: nhân hai phần số tự nhiên, tích dương.',
    '$a \\cdot 0 = 0$; $a \\cdot 1 = a$.',
    'Số thừa số âm chẵn thì tích dương, lẻ thì tích âm.',
    'Giao hoán, kết hợp, phân phối giúp đổi chỗ, nhóm và đặt thừa số chung để tính nhanh.',
  ],
};
