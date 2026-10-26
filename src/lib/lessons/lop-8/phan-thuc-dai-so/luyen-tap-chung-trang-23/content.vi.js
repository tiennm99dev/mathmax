/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: cộng, trừ phân thức cùng mẫu và khác mẫu, quy tắc đổi dấu, nhân, chia phân thức và rút gọn biểu thức có nhiều phép tính.',
  intro:
    'Với Bài 23 và Bài 24, em đã làm được cả bốn phép tính trên phân thức. Bài luyện tập này giúp em phối hợp chúng: chọn mẫu thức chung gọn nhất, đổi dấu đúng chỗ, phân tích thành nhân tử trước khi nhân hay chia, và rút gọn một biểu thức có nhiều phép tính về dạng đơn giản nhất.',
  objectives: [
    'Cộng, trừ phân thức cùng mẫu và khác mẫu, dùng quy tắc đổi dấu khi hai mẫu đối nhau.',
    'Nhân, chia phân thức; tìm phân thức nghịch đảo.',
    'Rút gọn biểu thức có nhiều phép tính, chứng tỏ giá trị của biểu thức không phụ thuộc vào biến.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Quy tắc', 'Ví dụ'],
          rows: [
            [
              'Cộng, trừ cùng mẫu',
              '$\\dfrac{A}{M} \\pm \\dfrac{B}{M} = \\dfrac{A \\pm B}{M}$',
              '$\\dfrac{x}{x - 1} - \\dfrac{1}{x - 1} = 1$',
            ],
            [
              'Cộng, trừ khác mẫu',
              'Quy đồng mẫu thức rồi cộng (trừ) các tử thức',
              '$\\dfrac{1}{x} - \\dfrac{1}{x + 1} = \\dfrac{1}{x(x + 1)}$',
            ],
            [
              'Phân thức đối',
              '$-\\dfrac{A}{B} = \\dfrac{-A}{B} = \\dfrac{A}{-B}$',
              '$\\dfrac{2}{2 - x} = \\dfrac{-2}{x - 2}$',
            ],
            [
              'Nhân',
              '$\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{A \\cdot C}{B \\cdot D}$',
              '$\\dfrac{x}{3} \\cdot \\dfrac{6}{x^2} = \\dfrac{2}{x}$',
            ],
            [
              'Chia',
              '$\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C}$, với $\\dfrac{C}{D} \\ne 0$',
              '$\\dfrac{x}{2} : \\dfrac{x}{4} = 2$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những lỗi hay gặp',
          text: 'Trừ phân thức mà quên đặt tử thức bị trừ trong ngoặc; cộng tử với tử, mẫu với mẫu ($\\dfrac{1}{x} + \\dfrac{1}{y} \\ne \\dfrac{2}{x + y}$); nhân ra rồi mới tìm nhân tử chung (nên phân tích thành nhân tử trước); khi chia lại lật ngược phân thức bị chia thay vì phân thức chia.',
        },
      ],
    },
    {
      heading: 'Biến đổi biểu thức có nhiều phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Một biểu thức có nhiều phép tính trên phân thức được làm như với phân số: trong ngoặc trước, rồi nhân, chia, sau cùng cộng, trừ. Kết quả cuối cùng cần rút gọn đến tối giản.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm điều kiện xác định: mọi mẫu thức khác $0$, và mọi phân thức chia khác $0$.',
            'Phân tích các tử và mẫu thành nhân tử.',
            'Thực hiện các phép tính theo thứ tự, rút gọn sau mỗi bước.',
            'Nếu kết quả là một hằng số thì giá trị của biểu thức không phụ thuộc vào giá trị của biến (trong điều kiện xác định).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới về Bài 23 và Bài 24. Đáp số là số nguyên, phân số (gõ dạng $-7/3$) hoặc số thập phân (gõ dấu phẩy, ví dụ $1{,}25$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề cộng, trừ, nhân, chia phân thức',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại phép cộng, trừ hay phép nhân, chia.',
  },
  examples: [
    {
      problem:
        'Chứng tỏ giá trị của biểu thức $A = \\dfrac{x}{x - 2} - \\dfrac{2}{x + 2} - \\dfrac{8}{x^2 - 4}$ không phụ thuộc vào giá trị của biến (với $x \\ne 2$, $x \\ne -2$).',
      steps: [
        'Phân tích mẫu: $x^2 - 4 = (x - 2)(x + 2)$, nên MTC $= (x - 2)(x + 2)$.',
        'Quy đồng: $A = \\dfrac{x(x + 2) - 2(x - 2) - 8}{(x - 2)(x + 2)}$.',
        'Tử thức: $x^2 + 2x - 2x + 4 - 8 = x^2 - 4$.',
        '$A = \\dfrac{x^2 - 4}{(x - 2)(x + 2)} = \\dfrac{x^2 - 4}{x^2 - 4} = 1$.',
      ],
      answer:
        '$A = 1$ với mọi $x \\ne \\pm 2$, nên giá trị của $A$ không phụ thuộc vào giá trị của biến.',
    },
    {
      problem:
        'Rút gọn biểu thức $B = \\left(\\dfrac{x}{x + 1} - 1\\right) : \\dfrac{x^2 - 1}{x^2 + x}$.',
      steps: [
        'Điều kiện: $x + 1 \\ne 0$, $x^2 + x = x(x + 1) \\ne 0$ và phân thức chia khác $0$, tức là $x \\ne 0$, $x \\ne -1$, $x \\ne 1$.',
        'Trong ngoặc: $\\dfrac{x}{x + 1} - 1 = \\dfrac{x - (x + 1)}{x + 1} = \\dfrac{-1}{x + 1}$.',
        'Phân thức chia: $\\dfrac{x^2 - 1}{x^2 + x} = \\dfrac{(x - 1)(x + 1)}{x(x + 1)} = \\dfrac{x - 1}{x}$.',
        '$B = \\dfrac{-1}{x + 1} \\cdot \\dfrac{x}{x - 1} = \\dfrac{-x}{(x + 1)(x - 1)} = \\dfrac{-x}{x^2 - 1}$.',
      ],
      answer: '$B = \\dfrac{-x}{x^2 - 1}$ với $x \\ne 0$, $x \\ne \\pm 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kết quả của phép cộng $\\dfrac{x}{x - 2} + \\dfrac{2}{2 - x}$ là',
      options: ['$1$', '$\\dfrac{x + 2}{x - 2}$', '$0$', '$\\dfrac{x + 2}{2 - x}$'],
      answer: 0,
      hints: ['Hai mẫu đối nhau: dùng quy tắc đổi dấu $\\dfrac{2}{2 - x} = \\dfrac{-2}{x - 2}$.'],
      solution:
        '$\\dfrac{x}{x - 2} + \\dfrac{-2}{x - 2} = \\dfrac{x - 2}{x - 2} = 1$ (với $x \\ne 2$).',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép trừ $\\dfrac{x + 1}{x - 1} - \\dfrac{x - 1}{x + 1}$ là',
      options: [
        '$\\dfrac{4x}{x^2 - 1}$',
        '$0$',
        '$\\dfrac{2}{x^2 - 1}$',
        '$\\dfrac{-4x}{x^2 - 1}$',
      ],
      answer: 0,
      hints: [
        'MTC $= (x - 1)(x + 1) = x^2 - 1$.',
        'Tử thức là $(x + 1)^2 - (x - 1)^2$; dùng hiệu hai bình phương hoặc khai triển.',
      ],
      solution:
        '$\\dfrac{(x + 1)^2 - (x - 1)^2}{x^2 - 1} = \\dfrac{(x^2 + 2x + 1) - (x^2 - 2x + 1)}{x^2 - 1} = \\dfrac{4x}{x^2 - 1}$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số $a$ để $\\dfrac{3}{x - 2} + \\dfrac{a}{x + 2} = \\dfrac{5x + 2}{x^2 - 4}$ với mọi $x \\ne \\pm 2$.',
      answer: 2,
      hints: [
        'Quy đồng vế trái với MTC $x^2 - 4$; tử thức là $3(x + 2) + a(x - 2)$.',
        'So sánh $(3 + a)x + 6 - 2a$ với $5x + 2$.',
      ],
      solution:
        '$3(x + 2) + a(x - 2) = (3 + a)x + (6 - 2a)$. Bằng $5x + 2$ khi $3 + a = 5$ và $6 - 2a = 2$, tức là $a = 2$ (hai điều kiện cho cùng một giá trị).',
    },
    {
      type: 'fraction',
      prompt:
        'Dùng đẳng thức $\\dfrac{1}{n} - \\dfrac{1}{n + 1} = \\dfrac{1}{n(n + 1)}$, tính tổng $S = \\dfrac{1}{1 \\cdot 2} + \\dfrac{1}{2 \\cdot 3} + \\dfrac{1}{3 \\cdot 4} + \\dots + \\dfrac{1}{9 \\cdot 10}$.',
      answer: [9, 10],
      simplest: true,
      hints: [
        'Viết mỗi số hạng thành hiệu: $\\dfrac{1}{1 \\cdot 2} = 1 - \\dfrac{1}{2}$, $\\dfrac{1}{2 \\cdot 3} = \\dfrac{1}{2} - \\dfrac{1}{3}$, …',
        'Các số hạng ở giữa triệt tiêu nhau.',
      ],
      solution:
        '$S = \\left(1 - \\dfrac{1}{2}\\right) + \\left(\\dfrac{1}{2} - \\dfrac{1}{3}\\right) + \\dots + \\left(\\dfrac{1}{9} - \\dfrac{1}{10}\\right) = 1 - \\dfrac{1}{10} = \\dfrac{9}{10}$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép nhân $\\dfrac{x^2 - 4}{x + 3} \\cdot \\dfrac{2x + 6}{x - 2}$ là',
      options: ['$2x + 4$', '$x + 2$', '$2x - 4$', '$\\dfrac{2(x + 2)}{x + 3}$'],
      answer: 0,
      hints: ['$x^2 - 4 = (x - 2)(x + 2)$ và $2x + 6 = 2(x + 3)$.'],
      solution: '$\\dfrac{(x - 2)(x + 2) \\cdot 2(x + 3)}{(x + 3)(x - 2)} = 2(x + 2) = 2x + 4$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép chia $\\dfrac{x^2 - 1}{x} : \\dfrac{x + 1}{x^2}$ là',
      options: [
        '$x(x - 1)$',
        '$\\dfrac{x - 1}{x}$',
        '$x(x + 1)$',
        '$\\dfrac{(x^2 - 1)(x + 1)}{x^3}$',
      ],
      answer: 0,
      hints: [
        'Nhân phân thức bị chia với phân thức nghịch đảo của $\\dfrac{x + 1}{x^2}$, tức là $\\dfrac{x^2}{x + 1}$.',
      ],
      solution:
        '$\\dfrac{(x - 1)(x + 1)}{x} \\cdot \\dfrac{x^2}{x + 1} = x(x - 1)$. Lựa chọn cuối là kết quả khi nhân thay vì chia.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó (với $x \\ne 0$).',
      left: [
        '$\\dfrac{2}{x} + \\dfrac{3}{x}$',
        '$\\dfrac{2}{x} - \\dfrac{3}{x}$',
        '$\\dfrac{2}{x} \\cdot \\dfrac{3}{x}$',
        '$\\dfrac{2}{x} : \\dfrac{3}{x}$',
      ],
      right: [
        '$\\dfrac{5}{x}$',
        '$\\dfrac{-1}{x}$',
        '$\\dfrac{6}{x^2}$',
        '$\\dfrac{2}{3}$',
        '$\\dfrac{5}{2x}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Cộng, trừ cùng mẫu: giữ nguyên mẫu. Nhân: tử nhân tử, mẫu nhân mẫu. Chia: nhân với nghịch đảo.',
      ],
      solution:
        '$\\dfrac{2 + 3}{x} = \\dfrac{5}{x}$; $\\dfrac{2 - 3}{x} = \\dfrac{-1}{x}$; $\\dfrac{2 \\cdot 3}{x \\cdot x} = \\dfrac{6}{x^2}$; $\\dfrac{2}{x} \\cdot \\dfrac{x}{3} = \\dfrac{2}{3}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phát biểu đúng.',
      options: [
        'Phân thức nghịch đảo của $\\dfrac{x - 3}{x + 1}$ là $\\dfrac{x + 1}{x - 3}$ (với $x \\ne 3$, $x \\ne -1$).',
        'Phân thức đối của $\\dfrac{x - 3}{x + 1}$ là $\\dfrac{3 - x}{x + 1}$.',
        '$\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{C}{D} : \\dfrac{A}{B}$ với mọi phân thức khác $0$.',
        '$\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{2}{x + y}$.',
      ],
      answers: [0, 1],
      hints: [
        'Đối nhau: tổng bằng $0$. Nghịch đảo: tích bằng $1$.',
        'Thử với số cụ thể để kiểm tra hai phát biểu cuối, ví dụ $x = y = 1$.',
      ],
      solution:
        'Hai phát biểu đầu đúng. Phép chia không giao hoán: $\\dfrac{1}{x} : \\dfrac{2}{x} = \\dfrac{1}{2}$ nhưng $\\dfrac{2}{x} : \\dfrac{1}{x} = 2$. Với $x = y = 1$: $\\dfrac{1}{1} + \\dfrac{1}{1} = 2$ còn $\\dfrac{2}{1 + 1} = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn biểu thức $P = \\left(\\dfrac{1}{x - 1} + \\dfrac{1}{x + 1}\\right) : \\dfrac{2x}{x^2 - 1}$ (với $x \\ne 0$, $x \\ne \\pm 1$). $P$ bằng bao nhiêu?',
      answer: 1,
      hints: [
        'Trong ngoặc: MTC $= x^2 - 1$, tử thức $(x + 1) + (x - 1)$.',
        'Chia cho $\\dfrac{2x}{x^2 - 1}$ là nhân với $\\dfrac{x^2 - 1}{2x}$.',
      ],
      solution:
        '$\\dfrac{1}{x - 1} + \\dfrac{1}{x + 1} = \\dfrac{2x}{x^2 - 1}$, nên $P = \\dfrac{2x}{x^2 - 1} \\cdot \\dfrac{x^2 - 1}{2x} = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn $Q = \\dfrac{x^2 + 2x}{x - 3} \\cdot \\dfrac{x^2 - 9}{x + 2}$ rồi tính giá trị của $Q$ tại $x = 4$.',
      answer: 28,
      hints: [
        '$x^2 + 2x = x(x + 2)$ và $x^2 - 9 = (x - 3)(x + 3)$.',
        'Sau khi rút gọn, $Q$ là một đa thức.',
      ],
      solution:
        '$Q = \\dfrac{x(x + 2)(x - 3)(x + 3)}{(x - 3)(x + 2)} = x(x + 3)$. Tại $x = 4$ (thoả mãn $x \\ne 3$, $x \\ne -2$): $Q = 4 \\cdot 7 = 28$.',
    },
    {
      type: 'number',
      prompt:
        'Bạn An đạp xe đến nhà bà cách nhà mình $30$ km với vận tốc $x$ (km/h); lúc về An đi xe buýt với vận tốc lớn hơn lúc đi $5$ km/h. Tổng thời gian đi và về là $T = \\dfrac{30}{x} + \\dfrac{30}{x + 5}$ (giờ). Tính $T$ khi $x = 10$ (đơn vị giờ).',
      answer: 5,
      hints: ['Thay $x = 10$: thời gian đi $\\dfrac{30}{10}$, thời gian về $\\dfrac{30}{15}$.'],
      solution:
        'Thu gọn: $T = \\dfrac{30(x + 5) + 30x}{x(x + 5)} = \\dfrac{60x + 150}{x(x + 5)}$. Tại $x = 10$: $T = \\dfrac{750}{150} = 5$ giờ (đi $3$ giờ, về $2$ giờ).',
    },
  ],
  takeaways: [
    'Cộng, trừ: quy đồng về cùng mẫu (mẫu đối nhau thì đổi dấu), cộng trừ các tử thức, rồi rút gọn.',
    'Nhân, chia: phân tích thành nhân tử trước, chia là nhân với phân thức nghịch đảo của phân thức chia.',
    'Biểu thức nhiều phép tính: tìm điều kiện xác định, làm trong ngoặc trước, rút gọn sau mỗi bước.',
  ],
};
