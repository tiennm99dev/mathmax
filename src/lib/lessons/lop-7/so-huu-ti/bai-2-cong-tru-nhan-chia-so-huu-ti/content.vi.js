/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng, trừ, nhân, chia số hữu tỉ bằng cách đưa về phân số hoặc số thập phân; tính chất của các phép tính, quy tắc dấu ngoặc và số nghịch đảo.',
  intro:
    'Trong bình có $0{,}25$ lít nước, bạn Lan đổ thêm $\\frac{5}{6}$ lít nữa. Trong bình có bao nhiêu lít nước? Làm sao cộng một số thập phân với một phân số? Vì mọi số hữu tỉ đều viết được dưới dạng phân số, nên cộng, trừ, nhân, chia số hữu tỉ quy về những phép tính với phân số mà em đã biết từ lớp 6.',
  objectives: [
    'Cộng, trừ, nhân, chia hai số hữu tỉ cho dưới dạng phân số hoặc số thập phân.',
    'Vận dụng tính chất giao hoán, kết hợp, phân phối và quy tắc dấu ngoặc để tính hợp lí.',
    'Tìm số nghịch đảo của một số hữu tỉ khác $0$ và dùng nó để chia.',
  ],
  sections: [
    {
      heading: '1. Cộng và trừ hai số hữu tỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Để cộng, trừ hai số hữu tỉ, ta viết chúng dưới dạng phân số rồi áp dụng quy tắc cộng, trừ phân số. Khi hai số hữu tỉ cùng được viết dưới dạng số thập phân, ta có thể cộng, trừ như cộng, trừ số thập phân.',
        },
        {
          type: 'tex',
          tex: '0{,}25 + \\frac{-5}{6} = \\frac{1}{4} + \\frac{-5}{6} = \\frac{3}{12} + \\frac{-10}{12} = \\frac{-7}{12}',
        },
        {
          type: 'tex',
          tex: '-1{,}2 - 0{,}35 = -(1{,}2 + 0{,}35) = -1{,}55',
        },
        {
          type: 'p',
          text: 'Phép trừ là phép cộng với số đối: $a - b = a + (-b)$.',
        },
        {
          type: 'table',
          caption: 'Tính chất của phép cộng số hữu tỉ ($a, b, c \\in \\mathbb{Q}$)',
          head: ['Tính chất', 'Công thức'],
          rows: [
            ['Giao hoán', '$a + b = b + a$'],
            ['Kết hợp', '$(a + b) + c = a + (b + c)$'],
            ['Cộng với số $0$', '$a + 0 = 0 + a = a$'],
            ['Cộng với số đối', '$a + (-a) = 0$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy tắc dấu ngoặc',
          text: 'Trong tập $\\mathbb{Q}$, quy tắc dấu ngoặc giống như trong tập $\\mathbb{Z}$: bỏ dấu ngoặc có dấu "$-$" đằng trước thì đổi dấu mọi số hạng trong ngoặc; có dấu "$+$" đằng trước thì giữ nguyên dấu. Ví dụ: $\\frac{2}{3} - \\left(\\frac{2}{3} - \\frac{4}{5}\\right) = \\frac{2}{3} - \\frac{2}{3} + \\frac{4}{5} = \\frac{4}{5}$.',
        },
      ],
    },
    {
      heading: '2. Nhân và chia hai số hữu tỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Để nhân, chia hai số hữu tỉ, ta viết chúng dưới dạng phân số rồi áp dụng quy tắc nhân, chia phân số. Khi hai số cùng được cho dưới dạng số thập phân, ta có thể nhân, chia như với số thập phân.',
        },
        {
          type: 'tex',
          tex: '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}; \\qquad \\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} \\quad (b, c, d \\ne 0)',
        },
        {
          type: 'table',
          caption: 'Tính chất của phép nhân số hữu tỉ ($a, b, c \\in \\mathbb{Q}$)',
          head: ['Tính chất', 'Công thức'],
          rows: [
            ['Giao hoán', '$a \\cdot b = b \\cdot a$'],
            ['Kết hợp', '$(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$'],
            ['Nhân với số $1$', '$a \\cdot 1 = 1 \\cdot a = a$'],
            [
              'Phân phối đối với phép cộng và phép trừ',
              '$a(b + c) = ab + ac$; $\\;a(b - c) = ab - ac$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Quy tắc dấu',
          text: 'Như với số nguyên: tích (thương) của hai số cùng dấu là số dương, của hai số khác dấu là số âm. $(-0{,}5) \\cdot (-4) = 2$, còn $(-0{,}5) \\cdot 4 = -2$.',
        },
      ],
    },
    {
      heading: '3. Số nghịch đảo',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số nghịch đảo',
          text: 'Nếu $a$ là một số hữu tỉ khác $0$ thì $a \\cdot \\frac{1}{a} = 1$. Ta gọi $\\frac{1}{a}$ là số nghịch đảo của $a$; hai số có tích bằng $1$ là hai số nghịch đảo của nhau.',
        },
        {
          type: 'list',
          items: [
            'Số nghịch đảo của $\\frac{a}{b}$ ($a, b \\ne 0$) là $\\frac{b}{a}$: số nghịch đảo của $\\frac{-2}{5}$ là $\\frac{5}{-2} = \\frac{-5}{2}$.',
            'Số nghịch đảo của $-1{,}25 = \\frac{-5}{4}$ là $\\frac{-4}{5} = -0{,}8$.',
            'Số $0$ không có số nghịch đảo, vì mọi số nhân với $0$ đều bằng $0$.',
            'Chia cho một số khác $0$ chính là nhân với số nghịch đảo của nó: $a : b = a \\cdot \\frac{1}{b}$ ($b \\ne 0$).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng nhầm số nghịch đảo với số đối: số đối của $\\frac{2}{3}$ là $\\frac{-2}{3}$ (tổng bằng $0$), còn số nghịch đảo của $\\frac{2}{3}$ là $\\frac{3}{2}$ (tích bằng $1$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy tính số hữu tỉ từng bước',
    instruction:
      'Chọn một phép tính mẫu hoặc tự nhập hai số (phân số dạng a/b, số nguyên hay số thập phân có dấu phẩy) và chọn phép tính. Hãy tự đoán kết quả và nhấn "Kiểm tra", rồi nhấn "Bước tiếp theo" để xem máy đưa hai số về phân số, quy đồng hoặc nhân với số nghịch đảo và rút gọn như thế nào.',
  },
  examples: [
    {
      problem: 'Tính $0{,}25 + \\left(-\\frac{5}{6}\\right)$.',
      steps: [
        'Viết $0{,}25$ dưới dạng phân số: $0{,}25 = \\frac{25}{100} = \\frac{1}{4}$.',
        'Quy đồng mẫu $12$: $\\frac{1}{4} + \\frac{-5}{6} = \\frac{3}{12} + \\frac{-10}{12}$.',
        'Cộng tử, giữ mẫu: $\\frac{3 + (-10)}{12} = \\frac{-7}{12}$.',
      ],
      answer: '$0{,}25 + \\left(-\\frac{5}{6}\\right) = \\frac{-7}{12}$.',
    },
    {
      problem: 'Tính một cách hợp lí: $\\frac{-3}{7} + 0{,}4 + \\frac{-4}{7}$.',
      steps: [
        'Dùng tính chất giao hoán và kết hợp để nhóm hai phân số cùng mẫu: $\\left(\\frac{-3}{7} + \\frac{-4}{7}\\right) + 0{,}4$.',
        '$\\frac{-3}{7} + \\frac{-4}{7} = \\frac{-7}{7} = -1$.',
        '$-1 + 0{,}4 = -0{,}6$.',
      ],
      answer: 'Kết quả bằng $-0{,}6$.',
    },
    {
      problem: 'Tính $\\frac{3}{4} : (-1{,}5)$.',
      steps: [
        'Viết $-1{,}5 = \\frac{-15}{10} = \\frac{-3}{2}$; số nghịch đảo của $\\frac{-3}{2}$ là $\\frac{-2}{3}$.',
        'Chia là nhân với số nghịch đảo: $\\frac{3}{4} : \\frac{-3}{2} = \\frac{3}{4} \\cdot \\frac{-2}{3}$.',
        'Nhân tử với tử, mẫu với mẫu: $\\frac{3 \\cdot (-2)}{4 \\cdot 3} = \\frac{-6}{12} = \\frac{-1}{2}$.',
      ],
      answer: '$\\frac{3}{4} : (-1{,}5) = \\frac{-1}{2} = -0{,}5$.',
    },
    {
      problem:
        'Tính hợp lí: $\\frac{2}{5} \\cdot \\frac{-7}{3} + \\frac{2}{5} \\cdot \\frac{-8}{3}$.',
      steps: [
        'Hai tích có chung thừa số $\\frac{2}{5}$; dùng tính chất phân phối: $\\frac{2}{5} \\cdot \\left(\\frac{-7}{3} + \\frac{-8}{3}\\right)$.',
        '$\\frac{-7}{3} + \\frac{-8}{3} = \\frac{-15}{3} = -5$.',
        '$\\frac{2}{5} \\cdot (-5) = -2$.',
      ],
      answer: 'Kết quả bằng $-2$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-5}{8} + \\frac{7}{12}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [-1, 24],
      simplest: true,
      hints: ['Mẫu chung nhỏ nhất của $8$ và $12$ là $24$.'],
      solution:
        '$\\frac{-5}{8} + \\frac{7}{12} = \\frac{-15}{24} + \\frac{14}{24} = \\frac{-1}{24}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $1{,}5 - \\frac{2}{3}$.',
      answer: [5, 6],
      hints: ['$1{,}5 = \\frac{3}{2}$.', 'Quy đồng mẫu $6$.'],
      solution:
        '$1{,}5 - \\frac{2}{3} = \\frac{3}{2} - \\frac{2}{3} = \\frac{9}{6} - \\frac{4}{6} = \\frac{5}{6}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $(-0{,}75) \\cdot \\left(-\\frac{8}{9}\\right)$.',
      answer: [2, 3],
      hints: ['$-0{,}75 = \\frac{-3}{4}$.', 'Hai thừa số cùng dấu nên tích dương.'],
      solution:
        '$(-0{,}75) \\cdot \\left(-\\frac{8}{9}\\right) = \\frac{-3}{4} \\cdot \\frac{-8}{9} = \\frac{24}{36} = \\frac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $-2{,}4 : \\frac{6}{5}$.',
      answer: -2,
      hints: ['Chia cho $\\frac{6}{5}$ là nhân với $\\frac{5}{6}$.', '$-2{,}4 = \\frac{-12}{5}$.'],
      solution:
        '$-2{,}4 : \\frac{6}{5} = \\frac{-12}{5} \\cdot \\frac{5}{6} = \\frac{-60}{30} = -2$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm số nghịch đảo của $-1{,}25$.',
      answer: [-4, 5],
      hints: [
        'Viết $-1{,}25$ dưới dạng phân số trước.',
        'Số nghịch đảo của $\\frac{a}{b}$ là $\\frac{b}{a}$.',
      ],
      solution:
        '$-1{,}25 = \\frac{-5}{4}$, nên số nghịch đảo là $\\frac{4}{-5} = \\frac{-4}{5}$ (bằng $-0{,}8$).',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        'Số nghịch đảo của $\\frac{2}{3}$ là $\\frac{-2}{3}$.',
        'Số $0$ có số nghịch đảo là $0$.',
        'Số nghịch đảo của $-1$ là $-1$.',
        'Hai số nghịch đảo của nhau có tổng bằng $1$.',
      ],
      answer: 2,
      hints: ['Hai số nghịch đảo của nhau có tích bằng $1$.'],
      solution:
        '$(-1) \\cdot (-1) = 1$ nên số nghịch đảo của $-1$ là $-1$. Số nghịch đảo của $\\frac{2}{3}$ là $\\frac{3}{2}$ (còn $\\frac{-2}{3}$ là số đối); số $0$ không có số nghịch đảo; hai số nghịch đảo có tích (không phải tổng) bằng $1$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $\\frac{5}{11} + 0{,}75 + \\frac{-5}{11} + \\frac{1}{4}$.',
      answer: 1,
      hints: [
        'Nhóm hai số đối nhau với nhau.',
        '$0{,}75 + \\frac{1}{4} = \\frac{3}{4} + \\frac{1}{4}$.',
      ],
      solution:
        '$\\left(\\frac{5}{11} + \\frac{-5}{11}\\right) + \\left(0{,}75 + \\frac{1}{4}\\right) = 0 + \\left(\\frac{3}{4} + \\frac{1}{4}\\right) = 1$.',
    },
    {
      type: 'fraction',
      prompt: 'Bỏ dấu ngoặc rồi tính: $\\frac{2}{3} - \\left(\\frac{2}{3} - \\frac{4}{5}\\right)$.',
      answer: [4, 5],
      hints: ['Bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu các số hạng trong ngoặc.'],
      solution: '$\\frac{2}{3} - \\frac{2}{3} + \\frac{4}{5} = 0 + \\frac{4}{5} = \\frac{4}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính hợp lí: $\\frac{-3}{4} \\cdot \\frac{5}{13} + \\frac{-3}{4} \\cdot \\frac{8}{13}$.',
      answer: [-3, 4],
      hints: ['Đặt thừa số chung $\\frac{-3}{4}$ ra ngoài (tính chất phân phối).'],
      solution:
        '$\\frac{-3}{4} \\cdot \\left(\\frac{5}{13} + \\frac{8}{13}\\right) = \\frac{-3}{4} \\cdot \\frac{13}{13} = \\frac{-3}{4} \\cdot 1 = \\frac{-3}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm vải dài $3{,}5$ m. Lần đầu cắt đi $\\frac{3}{4}$ m, lần sau cắt đi $1{,}25$ m. Tấm vải còn lại dài bao nhiêu mét?',
      answer: 1.5,
      unit: 'm',
      hints: [
        'Đổi $\\frac{3}{4}$ m $= 0{,}75$ m.',
        'Tính $3{,}5 - 0{,}75 - 1{,}25 = 3{,}5 - (0{,}75 + 1{,}25)$.',
      ],
      solution:
        '$3{,}5 - \\left(\\frac{3}{4} + 1{,}25\\right) = 3{,}5 - (0{,}75 + 1{,}25) = 3{,}5 - 2 = 1{,}5$ (m).',
    },
    {
      type: 'number',
      prompt:
        'Một chai nước $1{,}5$ lít được rót đều vào các cốc, mỗi cốc $\\frac{1}{4}$ lít. Rót được bao nhiêu cốc?',
      answer: 6,
      unit: 'cốc',
      hints: ['Số cốc bằng $1{,}5 : \\frac{1}{4}$.', 'Chia cho $\\frac{1}{4}$ là nhân với $4$.'],
      solution: '$1{,}5 : \\frac{1}{4} = 1{,}5 \\cdot 4 = 6$ (cốc).',
    },
  ],
  takeaways: [
    'Cộng, trừ, nhân, chia số hữu tỉ: viết dưới dạng phân số rồi làm như với phân số (hoặc tính trực tiếp nếu cả hai là số thập phân).',
    '$a - b = a + (-b)$; bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu các số hạng trong ngoặc.',
    'Phép cộng và phép nhân có tính chất giao hoán, kết hợp; phép nhân phân phối đối với phép cộng và phép trừ.',
    'Số nghịch đảo của $a \\ne 0$ là $\\frac{1}{a}$; $a : b = a \\cdot \\frac{1}{b}$ với $b \\ne 0$.',
  ],
};
