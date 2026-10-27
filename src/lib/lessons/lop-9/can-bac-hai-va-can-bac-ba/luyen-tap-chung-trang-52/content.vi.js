/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: căn bậc hai, căn thức bậc hai và điều kiện xác định, hằng đẳng thức căn của A bình phương, khai căn bậc hai với phép nhân và phép chia.',
  intro:
    'Bài 7 và Bài 8 cho em các công cụ đầu tiên để làm việc với căn bậc hai: tìm điều kiện xác định, dùng $\\sqrt{A^2} = |A|$, khai căn một tích và một thương. Bài luyện tập này giúp em phối hợp chúng và tránh hai lỗi hay gặp nhất: quên dấu giá trị tuyệt đối và "tách" căn của một tổng.',
  objectives: [
    'Tính căn bậc hai, tìm điều kiện xác định của căn thức bậc hai.',
    'Vận dụng hằng đẳng thức $\\sqrt{A^2} = |A|$ để tính và rút gọn.',
    'Khai căn một tích, một thương; nhân và chia các căn bậc hai.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ', 'Ví dụ'],
          rows: [
            [
              'Căn bậc hai',
              'Số $a > 0$ có hai căn bậc hai $\\sqrt{a}$ và $-\\sqrt{a}$; số $0$ có một; số âm không có',
              'Căn bậc hai của $25$ là $5$ và $-5$',
            ],
            [
              'Căn bậc hai số học',
              '$\\sqrt{a} \\ge 0$ và $(\\sqrt{a})^2 = a$ với $a \\ge 0$',
              '$\\sqrt{0{,}49} = 0{,}7$',
            ],
            [
              'Điều kiện xác định',
              '$\\sqrt{A}$ xác định khi $A \\ge 0$',
              '$\\sqrt{x - 3}$: $x \\ge 3$',
            ],
            [
              'Hằng đẳng thức',
              '$\\sqrt{A^2} = |A|$',
              '$\\sqrt{(1 - \\sqrt{3})^2} = \\sqrt{3} - 1$',
            ],
            [
              'Căn của một tích',
              '$\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$ ($a, b \\ge 0$)',
              '$\\sqrt{2} \\cdot \\sqrt{18} = \\sqrt{36} = 6$',
            ],
            [
              'Căn của một thương',
              '$\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$ ($a \\ge 0$, $b > 0$)',
              '$\\sqrt{\\dfrac{16}{81}} = \\dfrac{4}{9}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Viết $\\sqrt{(-3)^2} = -3$ (đúng là $3$); viết $\\sqrt{9} = \\pm 3$ (đúng là $3$); tách $\\sqrt{9 + 16}$ thành $\\sqrt{9} + \\sqrt{16}$ (đúng là $\\sqrt{25} = 5$, không phải $7$).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ ba kĩ năng. Đáp số có thể là số nguyên, số thập phân (dùng dấu phẩy) hoặc phân số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại phần nào.',
  },
  examples: [
    {
      problem: 'Tìm điều kiện xác định của biểu thức $\\sqrt{x - 5} + \\sqrt{7 - x}$.',
      steps: [
        '$\\sqrt{x - 5}$ xác định khi $x - 5 \\ge 0$, tức $x \\ge 5$.',
        '$\\sqrt{7 - x}$ xác định khi $7 - x \\ge 0$, tức $x \\le 7$.',
        'Biểu thức xác định khi cả hai căn cùng xác định.',
      ],
      answer: 'Điều kiện xác định là $5 \\le x \\le 7$.',
    },
    {
      problem: 'Tính $\\sqrt{1{,}6} \\cdot \\sqrt{250} + \\dfrac{\\sqrt{19{,}6}}{\\sqrt{4{,}9}}$.',
      steps: [
        '$\\sqrt{1{,}6} \\cdot \\sqrt{250} = \\sqrt{1{,}6 \\cdot 250} = \\sqrt{400} = 20$.',
        '$\\dfrac{\\sqrt{19{,}6}}{\\sqrt{4{,}9}} = \\sqrt{\\dfrac{19{,}6}{4{,}9}} = \\sqrt{4} = 2$.',
        'Cộng lại: $20 + 2 = 22$.',
      ],
      answer: 'Giá trị của biểu thức là $22$.',
    },
    {
      problem: 'Rút gọn $\\sqrt{(\\sqrt{3} - 2)^2} + \\sqrt{3}$.',
      steps: [
        '$\\sqrt{(\\sqrt{3} - 2)^2} = |\\sqrt{3} - 2|$.',
        'Vì $\\sqrt{3} < \\sqrt{4} = 2$ nên $\\sqrt{3} - 2 < 0$, do đó $|\\sqrt{3} - 2| = 2 - \\sqrt{3}$.',
        'Vậy biểu thức bằng $2 - \\sqrt{3} + \\sqrt{3} = 2$.',
      ],
      answer: '$\\sqrt{(\\sqrt{3} - 2)^2} + \\sqrt{3} = 2$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{0{,}0144}$.',
      answer: 0.12,
      hints: ['$12^2 = 144$.', 'Số nào có bình phương bằng $0{,}0144$?'],
      solution: '$0{,}12^2 = 0{,}0144$ và $0{,}12 > 0$, nên $\\sqrt{0{,}0144} = 0{,}12$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        '$\\sqrt{81} = \\pm 9$',
        'Căn bậc hai của $81$ là $9$ và $-9$',
        '$\\sqrt{-81} = -9$',
        'Số $81$ chỉ có một căn bậc hai là $9$',
      ],
      answer: 1,
      hints: ['Phân biệt "căn bậc hai của $81$" với kí hiệu $\\sqrt{81}$.'],
      solution:
        '$81 > 0$ có hai căn bậc hai là $9$ và $-9$; còn $\\sqrt{81}$ là căn bậc hai số học, bằng $9$. Số âm $-81$ không có căn bậc hai.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{3^2 + 4^2}$.',
      answer: 5,
      hints: ['Tính tổng dưới dấu căn trước, đừng tách căn của tổng.'],
      solution: '$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
    },
    {
      type: 'choice',
      prompt: 'Điều kiện xác định của $\\sqrt{x - 2} + \\sqrt{6 - x}$ là',
      options: ['$x \\ge 2$', '$x \\le 6$', '$2 \\le x \\le 6$', '$2 < x < 6$'],
      answer: 2,
      hints: ['Cả hai căn thức đều phải xác định.'],
      solution:
        'Cần $x - 2 \\ge 0$ và $6 - x \\ge 0$, tức $x \\ge 2$ và $x \\le 6$. Vậy $2 \\le x \\le 6$; hai đầu mút được lấy vì $\\sqrt{0} = 0$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(\\sqrt{7})^2 - \\sqrt{(-3)^2} \\cdot \\sqrt{16}$.',
      answer: -5,
      hints: ['$(\\sqrt{a})^2 = a$ và $\\sqrt{A^2} = |A|$.'],
      solution:
        '$(\\sqrt{7})^2 = 7$, $\\sqrt{(-3)^2} = |-3| = 3$, $\\sqrt{16} = 4$. Biểu thức bằng $7 - 3 \\cdot 4 = -5$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{2{,}5} \\cdot \\sqrt{14{,}4}$.',
      answer: 6,
      hints: ['Nhân các số dưới dấu căn.', '$2{,}5 \\cdot 14{,}4 = 36$.'],
      solution:
        '$\\sqrt{2{,}5} \\cdot \\sqrt{14{,}4} = \\sqrt{2{,}5 \\cdot 14{,}4} = \\sqrt{36} = 6$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\sqrt{\\dfrac{0{,}25}{0{,}81}}$ (nhập dưới dạng phân số).',
      answer: [5, 9],
      hints: [
        'Căn của thương bằng thương các căn.',
        '$\\sqrt{0{,}25} = 0{,}5$ và $\\sqrt{0{,}81} = 0{,}9$.',
      ],
      solution:
        '$\\sqrt{\\dfrac{0{,}25}{0{,}81}} = \\dfrac{\\sqrt{0{,}25}}{\\sqrt{0{,}81}} = \\dfrac{0{,}5}{0{,}9} = \\dfrac{5}{9}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{13^2 - 12^2}$.',
      answer: 5,
      hints: ['Dùng hằng đẳng thức $a^2 - b^2 = (a - b)(a + b)$.'],
      solution:
        '$13^2 - 12^2 = (13 - 12)(13 + 12) = 25$, nên $\\sqrt{13^2 - 12^2} = \\sqrt{25} = 5$.',
    },
    {
      type: 'choice',
      prompt: 'Với $a < 0$, biểu thức $\\sqrt{4a^2}$ bằng',
      options: ['$2a$', '$-2a$', '$4a$', '$-4a$'],
      answer: 1,
      hints: ['$\\sqrt{4a^2} = \\sqrt{(2a)^2} = |2a|$.', 'Khi $a < 0$ thì $2a < 0$.'],
      solution: '$\\sqrt{4a^2} = |2a| = -2a$ vì $2a < 0$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{0{,}4} \\cdot \\sqrt{6{,}4} + \\dfrac{\\sqrt{72}}{\\sqrt{2}}$.',
      answer: 7.6,
      hints: [
        'Gộp từng cặp thành một căn: $\\sqrt{0{,}4 \\cdot 6{,}4}$ và $\\sqrt{\\dfrac{72}{2}}$.',
        '$0{,}4 \\cdot 6{,}4 = 2{,}56$.',
      ],
      solution:
        '$\\sqrt{0{,}4 \\cdot 6{,}4} = \\sqrt{2{,}56} = 1{,}6$ và $\\sqrt{\\dfrac{72}{2}} = \\sqrt{36} = 6$. Tổng bằng $1{,}6 + 6 = 7{,}6$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $\\sqrt{16 + 9}$ và $\\sqrt{16} + \\sqrt{9}$.',
      options: [
        '$\\sqrt{16 + 9} < \\sqrt{16} + \\sqrt{9}$',
        '$\\sqrt{16 + 9} = \\sqrt{16} + \\sqrt{9}$',
        '$\\sqrt{16 + 9} > \\sqrt{16} + \\sqrt{9}$',
      ],
      answer: 0,
      hints: ['Tính từng vế.'],
      solution:
        '$\\sqrt{16 + 9} = \\sqrt{25} = 5$, còn $\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7$. Vậy $5 < 7$.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian $t$ (giây) để một vật rơi tự do từ độ cao $h$ (mét) chạm đất được tính gần đúng bởi $t = \\sqrt{\\dfrac{h}{5}}$. Một vật rơi từ độ cao $80$ m thì sau bao nhiêu giây chạm đất?',
      answer: 4,
      unit: 's',
      hints: ['Thay $h = 80$ vào công thức.'],
      solution: '$t = \\sqrt{\\dfrac{80}{5}} = \\sqrt{16} = 4$ (giây).',
    },
  ],
  takeaways: [
    '$\\sqrt{A}$ xác định khi $A \\ge 0$; biểu thức có nhiều căn thì mọi căn phải cùng xác định.',
    '$\\sqrt{A^2} = |A|$: xét dấu của $A$ trước khi bỏ dấu giá trị tuyệt đối.',
    'Tích và thương: $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$, $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$; tổng thì không.',
  ],
};
