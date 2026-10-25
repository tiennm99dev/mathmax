/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân số với tử và mẫu là số nguyên, quy tắc hai phân số bằng nhau a·d = b·c, tính chất cơ bản của phân số và cách rút gọn về phân số tối giản.',
  intro:
    'Ở tiểu học em đã gặp phân số như $\\frac{3}{4}$ với tử và mẫu là số tự nhiên. Nhưng nếu nhiệt độ giảm $3^\\circ\\text{C}$ trong $4$ giờ thì mỗi giờ nhiệt độ thay đổi bao nhiêu? Kết quả là $(-3) : 4$, một thương không phải số nguyên. Để viết được những thương như vậy, ta mở rộng phân số sang tử và mẫu là số nguyên.',
  objectives: [
    'Nhận biết phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$; đọc và viết phân số có tử hoặc mẫu âm.',
    'Nhận biết hai phân số bằng nhau bằng quy tắc $a \\cdot d = b \\cdot c$.',
    'Dùng tính chất cơ bản của phân số để viết các phân số bằng nhau, đưa mẫu âm về mẫu dương và rút gọn phân số.',
  ],
  sections: [
    {
      heading: 'Mở rộng khái niệm phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân số',
          text: 'Người ta gọi $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$ là một phân số; $a$ là tử số (tử), $b$ là mẫu số (mẫu) của phân số.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\frac{-3}{4}$ (đọc là "âm ba phần bốn"), $\\frac{5}{-7}$ (đọc là "năm phần âm bảy"), $\\frac{0}{9}$ đều là phân số. Thương $(-3) : 4$ ở phần mở đầu được viết là $\\frac{-3}{4}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Mỗi số nguyên $a$ cũng là một phân số, vì $a = \\frac{a}{1}$. Chẳng hạn $-5 = \\frac{-5}{1}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mẫu số luôn khác $0$: $\\frac{4}{0}$ không phải là phân số. Tử và mẫu phải là số nguyên, nên $\\frac{1{,}5}{4}$ cũng không phải là phân số.',
        },
      ],
    },
    {
      heading: 'Hai phân số bằng nhau',
      blocks: [
        {
          type: 'p',
          text: 'Ở tiểu học, $\\frac{1}{2} = \\frac{2}{4}$ vì hai phần tô trên hai băng giấy dài bằng nhau. Để ý rằng $1 \\cdot 4 = 2 \\cdot 2$. Điều đó dẫn tới quy tắc dùng được cả cho tử và mẫu âm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc bằng nhau của hai phân số',
          text: 'Hai phân số $\\frac{a}{b}$ và $\\frac{c}{d}$ bằng nhau nếu $a \\cdot d = b \\cdot c$.',
        },
        { type: 'tex', tex: '\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c' },
        {
          type: 'table',
          caption: 'Kiểm tra bằng tích chéo',
          head: ['Hai phân số', '$a \\cdot d$', '$b \\cdot c$', 'Kết luận'],
          rows: [
            [
              '$\\frac{-3}{4}$ và $\\frac{6}{-8}$',
              '$(-3) \\cdot (-8) = 24$',
              '$4 \\cdot 6 = 24$',
              'bằng nhau',
            ],
            [
              '$\\frac{2}{5}$ và $\\frac{3}{7}$',
              '$2 \\cdot 7 = 14$',
              '$5 \\cdot 3 = 15$',
              'không bằng nhau',
            ],
            [
              '$\\frac{4}{6}$ và $\\frac{6}{9}$',
              '$4 \\cdot 9 = 36$',
              '$6 \\cdot 6 = 36$',
              'bằng nhau',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Tính chất cơ bản của phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất cơ bản',
          text: 'Nếu nhân cả tử và mẫu của một phân số với cùng một số nguyên khác $0$ thì ta được một phân số bằng phân số đã cho. Nếu chia cả tử và mẫu của một phân số cho cùng một ước chung của chúng thì ta được một phân số bằng phân số đã cho.',
        },
        {
          type: 'tex',
          tex: '\\frac{a}{b} = \\frac{a \\cdot m}{b \\cdot m} \\;\\; (m \\in \\mathbb{Z},\\ m \\ne 0), \\qquad \\frac{a}{b} = \\frac{a : n}{b : n} \\;\\; (n \\in \\text{ƯC}(a, b))',
        },
        {
          type: 'list',
          items: [
            'Mỗi phân số có vô số phân số bằng nó: $\\frac{2}{3} = \\frac{4}{6} = \\frac{6}{9} = \\frac{-8}{-12} = \\dots$',
            'Nhân cả tử và mẫu với $-1$, ta viết được một phân số có mẫu âm thành phân số bằng nó có mẫu dương: $\\frac{5}{-7} = \\frac{-5}{7}$. Ta thường viết phân số với mẫu dương.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Rút gọn phân số',
          text: 'Chia cả tử và mẫu của phân số cho một ước chung khác $1$ và $-1$ là rút gọn phân số. Phân số tối giản là phân số mà tử và mẫu không có ước chung nào khác $1$ và $-1$. Muốn rút gọn ngay về phân số tối giản, ta bỏ dấu "$-$" (nếu có) của tử và mẫu, tìm ƯCLN của hai số tự nhiên nhận được, rồi chia cả tử và mẫu cho ƯCLN đó.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\frac{-18}{24} = \\frac{-18 : 6}{24 : 6} = \\frac{-3}{4}$, vì ƯCLN$(18, 24) = 6$; phân số $\\frac{-3}{4}$ là tối giản.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai băng phân số dài bằng nhau',
    instruction:
      'Chọn phân số ở băng trên. Ở băng dưới, đổi mẫu rồi kéo mép phần tô (hoặc chạm vào ô) để phần tô dài đúng bằng băng trên. Mỗi lần khớp, em tìm được một phân số bằng phân số đã cho; hãy tìm đủ cả danh sách.',
  },
  examples: [
    {
      problem: 'Hai phân số $\\frac{-3}{4}$ và $\\frac{6}{-8}$ có bằng nhau không?',
      steps: [
        'Tính tích của tử phân số này với mẫu phân số kia: $(-3) \\cdot (-8) = 24$.',
        'Tính tích của mẫu phân số này với tử phân số kia: $4 \\cdot 6 = 24$.',
        'Hai tích bằng nhau.',
      ],
      answer: '$\\frac{-3}{4} = \\frac{6}{-8}$.',
    },
    {
      problem: 'Tìm số nguyên $x$, biết $\\frac{x}{4} = \\frac{-15}{20}$.',
      steps: ['Theo quy tắc bằng nhau: $x \\cdot 20 = 4 \\cdot (-15) = -60$.', '$x = (-60) : 20$.'],
      answer: '$x = -3$.',
    },
    {
      problem: 'Rút gọn phân số $\\frac{-24}{36}$ về phân số tối giản.',
      steps: [
        'ƯCLN$(24, 36) = 12$.',
        'Chia cả tử và mẫu cho $12$: $\\frac{-24}{36} = \\frac{-24 : 12}{36 : 12}$.',
        'Tử $-2$ và mẫu $3$ không còn ước chung nào khác $1$ và $-1$.',
      ],
      answer: '$\\frac{-24}{36} = \\frac{-2}{3}$, là phân số tối giản.',
    },
    {
      problem: 'Viết phân số $\\frac{5}{-7}$ thành phân số bằng nó có mẫu dương.',
      steps: [
        'Nhân cả tử và mẫu với $-1$: $\\frac{5}{-7} = \\frac{5 \\cdot (-1)}{(-7) \\cdot (-1)}$.',
      ],
      answer: '$\\frac{5}{-7} = \\frac{-5}{7}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cách viết là phân số.',
      options: [
        '$\\frac{-3}{5}$',
        '$\\frac{5}{0}$',
        '$\\frac{0}{7}$',
        '$\\frac{6}{-11}$',
        '$\\frac{1{,}5}{4}$',
      ],
      answers: [0, 2, 3],
      hints: [
        'Phân số $\\frac{a}{b}$ cần $a$, $b$ là số nguyên và $b \\ne 0$.',
        'Tử bằng $0$ thì vẫn được; mẫu bằng $0$ thì không.',
      ],
      solution:
        '$\\frac{-3}{5}$, $\\frac{0}{7}$, $\\frac{6}{-11}$ là phân số. $\\frac{5}{0}$ có mẫu bằng $0$; $\\frac{1{,}5}{4}$ có tử $1{,}5$ không phải số nguyên.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $\\frac{x}{6} = \\frac{10}{15}$.',
      answer: 4,
      hints: ['Dùng quy tắc: $x \\cdot 15 = 6 \\cdot 10$.', 'Tính $60 : 15$.'],
      solution: '$x \\cdot 15 = 6 \\cdot 10 = 60$, nên $x = 60 : 15 = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $\\frac{-4}{x} = \\frac{8}{-14}$.',
      answer: 7,
      hints: [
        'Quy tắc bằng nhau: $(-4) \\cdot (-14) = x \\cdot 8$.',
        '$(-4) \\cdot (-14) = 56$; tìm $x$ để $8x = 56$.',
      ],
      solution:
        '$(-4) \\cdot (-14) = 8x$, tức $56 = 8x$, nên $x = 7$. Thử lại: $\\frac{-4}{7} = \\frac{8}{-14}$ vì $(-4) \\cdot (-14) = 7 \\cdot 8 = 56$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\frac{-18}{24}$ về phân số tối giản (viết dạng a/b, ví dụ -2/3).',
      answer: [-3, 4],
      simplest: true,
      hints: ['Tìm ƯCLN$(18, 24)$.', 'ƯCLN$(18, 24) = 6$; chia cả tử và mẫu cho $6$.'],
      solution: '$\\frac{-18}{24} = \\frac{-18 : 6}{24 : 6} = \\frac{-3}{4}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào bằng phân số $\\frac{3}{-5}$?',
      options: ['$\\frac{3}{5}$', '$\\frac{-5}{3}$', '$\\frac{-6}{10}$', '$\\frac{6}{-5}$'],
      answer: 2,
      hints: ['Kiểm tra từng phân số bằng tích chéo với $\\frac{3}{-5}$.'],
      solution:
        '$3 \\cdot 10 = 30$ và $(-5) \\cdot (-6) = 30$, nên $\\frac{3}{-5} = \\frac{-6}{10}$. Phân số $\\frac{3}{5}$ dương còn $\\frac{3}{-5}$ âm; $\\frac{-5}{3}$ đảo ngược tử và mẫu; $\\frac{6}{-5}$ chỉ nhân tử với $2$.',
    },
    {
      type: 'number',
      prompt:
        'Viết phân số $\\frac{2}{-7}$ thành phân số bằng nó có mẫu là $21$. Tử của phân số mới bằng bao nhiêu?',
      answer: -6,
      hints: [
        'Trước hết đưa về mẫu dương: $\\frac{2}{-7} = \\frac{-2}{7}$.',
        '$21 = 7 \\cdot 3$; nhân cả tử và mẫu với $3$.',
      ],
      solution:
        '$\\frac{2}{-7} = \\frac{-2}{7} = \\frac{-2 \\cdot 3}{7 \\cdot 3} = \\frac{-6}{21}$. Tử là $-6$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các cặp phân số bằng nhau.',
      options: [
        '$\\frac{-2}{3}$ và $\\frac{4}{-6}$',
        '$\\frac{3}{5}$ và $\\frac{6}{12}$',
        '$\\frac{5}{-8}$ và $\\frac{-10}{16}$',
        '$\\frac{1}{-2}$ và $\\frac{1}{2}$',
      ],
      answers: [0, 2],
      hints: ['Với mỗi cặp, so sánh $a \\cdot d$ với $b \\cdot c$.'],
      solution:
        '$(-2) \\cdot (-6) = 12 = 3 \\cdot 4$ và $5 \\cdot 16 = 80 = (-8) \\cdot (-10)$: hai cặp này bằng nhau. $3 \\cdot 12 = 36 \\ne 30 = 5 \\cdot 6$; $1 \\cdot 2 = 2 \\ne -2 = (-2) \\cdot 1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một tấm bánh được cắt thành $8$ phần bằng nhau, Mai đã ăn $6$ phần. Viết phân số tối giản biểu thị phần bánh Mai đã ăn.',
      answer: [3, 4],
      simplest: true,
      hints: [
        'Phần bánh đã ăn là $\\frac{6}{8}$ tấm bánh.',
        'Rút gọn: chia cả tử và mẫu cho ƯCLN$(6, 8)$.',
      ],
      solution: '$\\frac{6}{8} = \\frac{6 : 2}{8 : 2} = \\frac{3}{4}$ tấm bánh.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu phân số bằng $\\frac{2}{3}$ có mẫu là số nguyên dương nhỏ hơn $20$?',
      answer: 6,
      hints: [
        'Phân số bằng $\\frac{2}{3}$ có mẫu dương là $\\frac{2k}{3k}$ với $k$ nguyên dương.',
        'Đếm các bội của $3$ nhỏ hơn $20$.',
      ],
      solution:
        'Các mẫu là $3, 6, 9, 12, 15, 18$, ứng với $\\frac{2}{3}, \\frac{4}{6}, \\frac{6}{9}, \\frac{8}{12}, \\frac{10}{15}, \\frac{12}{18}$: có $6$ phân số.',
    },
  ],
  takeaways: [
    'Phân số $\\frac{a}{b}$: $a, b \\in \\mathbb{Z}$, $b \\ne 0$; số nguyên $a$ viết được là $\\frac{a}{1}$.',
    '$\\frac{a}{b} = \\frac{c}{d}$ khi $a \\cdot d = b \\cdot c$.',
    'Nhân (hoặc chia) cả tử và mẫu với cùng một số nguyên khác $0$ (cùng một ước chung) được phân số bằng phân số đã cho.',
    'Rút gọn về tối giản: chia cả tử và mẫu cho ƯCLN của chúng (không kể dấu); thường viết phân số với mẫu dương.',
  ],
};
