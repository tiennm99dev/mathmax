/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Căn bậc ba của một số thực, kí hiệu căn bậc ba, tính căn bậc ba bằng cách nhẩm và bằng máy tính cầm tay, căn thức bậc ba và hằng đẳng thức căn bậc ba của A lập phương, các tính chất của căn bậc ba.',
  intro:
    'Một thùng nước hình lập phương chứa được đúng $343$ dm³ nước. Cạnh thùng dài bao nhiêu? Ta cần số $x$ sao cho $x^3 = 343$, và $x = 7$ vì $7^3 = 343$. Số $7$ gọi là căn bậc ba của $343$. Khác với căn bậc hai, căn bậc ba có cả với số âm.',
  objectives: [
    'Nhận biết căn bậc ba của một số thực và kí hiệu $\\sqrt[3]{a}$.',
    'Tính căn bậc ba bằng cách nhẩm hoặc bằng máy tính cầm tay.',
    'Nhận biết căn thức bậc ba, vận dụng $\\sqrt[3]{A^3} = A$ để tính và rút gọn.',
    'Vận dụng tính chất của căn bậc ba để so sánh và tính toán.',
  ],
  sections: [
    {
      heading: 'Căn bậc ba',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Căn bậc ba của một số thực $a$ là số thực $x$ sao cho $x^3 = a$.',
        },
        {
          type: 'list',
          items: [
            'Mỗi số thực $a$ có đúng một căn bậc ba, kí hiệu là $\\sqrt[3]{a}$; số $3$ gọi là chỉ số của căn.',
            'Căn bậc ba của số dương là số dương, của số âm là số âm, của số $0$ là $0$.',
            'Với mọi số thực $a$: $(\\sqrt[3]{a})^3 = \\sqrt[3]{a^3} = a$.',
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\sqrt[3]{8} = 2$ vì $2^3 = 8$; $\\sqrt[3]{-125} = -5$ vì $(-5)^3 = -125$; $\\sqrt[3]{0{,}064} = 0{,}4$ vì $0{,}4^3 = 0{,}064$.',
        },
        {
          type: 'p',
          text: 'Khi $a$ không là lập phương của một số hữu tỉ, ta dùng máy tính cầm tay (phím $\\sqrt[3]{\\;\\;}$) để tính gần đúng: $\\sqrt[3]{10} \\approx 2{,}15$; $\\sqrt[3]{-50} \\approx -3{,}68$ (làm tròn đến hàng phần trăm).',
        },
        {
          type: 'table',
          head: ['Số', 'Căn bậc hai', 'Căn bậc ba'],
          rows: [
            ['Số dương $a$', 'hai căn: $\\sqrt{a}$ và $-\\sqrt{a}$', 'một căn: $\\sqrt[3]{a} > 0$'],
            ['Số $0$', '$\\sqrt{0} = 0$', '$\\sqrt[3]{0} = 0$'],
            ['Số âm $a$', 'không có', 'một căn: $\\sqrt[3]{a} < 0$'],
          ],
          caption: 'So sánh căn bậc hai và căn bậc ba.',
        },
      ],
    },
    {
      heading: 'Căn thức bậc ba',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Căn thức bậc ba là biểu thức có dạng $\\sqrt[3]{A}$, trong đó $A$ là một biểu thức đại số; $A$ gọi là biểu thức lấy căn. $\\sqrt[3]{A}$ xác định khi $A$ xác định.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\sqrt[3]{2x - 1}$ xác định với mọi $x$, không cần $2x - 1 \\ge 0$ như căn bậc hai. Còn $\\sqrt[3]{\\dfrac{1}{x - 2}}$ xác định khi $x \\ne 2$, vì đó là điều kiện để $\\dfrac{1}{x - 2}$ xác định.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hằng đẳng thức',
          text: 'Với $A$ là một biểu thức: $\\sqrt[3]{A^3} = (\\sqrt[3]{A})^3 = A$. Không cần dấu giá trị tuyệt đối như $\\sqrt{A^2} = |A|$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\sqrt[3]{(1 - x)^3} = 1 - x$ với mọi $x$; $\\sqrt[3]{-8x^3} = \\sqrt[3]{(-2x)^3} = -2x$.',
        },
      ],
    },
    {
      heading: 'Tính chất của căn bậc ba',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Với các số thực $a$, $b$: (1) $a < b \\Leftrightarrow \\sqrt[3]{a} < \\sqrt[3]{b}$; (2) $\\sqrt[3]{ab} = \\sqrt[3]{a} \\cdot \\sqrt[3]{b}$; (3) với $b \\ne 0$, $\\sqrt[3]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[3]{a}}{\\sqrt[3]{b}}$.',
        },
        {
          type: 'p',
          text: 'Các tính chất này đúng với mọi số thực, kể cả số âm. Ví dụ: $\\sqrt[3]{54} \\cdot \\sqrt[3]{4} = \\sqrt[3]{216} = 6$; $2 = \\sqrt[3]{8} > \\sqrt[3]{7}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khối lập phương và đường cong y = x³',
    instruction:
      'Kéo ô vuông cam trên trục tung (hoặc dùng phím mũi tên, giữ Shift để nhảy $10$) để chọn số $a$ từ $-125$ đến $125$. Đường thẳng $y = a$ cắt đường cong $y = x^3$ tại đúng một điểm, hoành độ của nó là $\\sqrt[3]{a}$. Khối lập phương bên cạnh có thể tích $|a|$ và cạnh $|\\sqrt[3]{a}|$; nó chuyển sang màu đỏ khi $a$ âm.',
  },
  examples: [
    {
      problem: 'Tìm căn bậc ba của các số: $8$; $-125$; $0{,}064$; $-\\dfrac{1}{27}$.',
      steps: [
        '$2^3 = 8$ nên $\\sqrt[3]{8} = 2$.',
        '$(-5)^3 = -125$ nên $\\sqrt[3]{-125} = -5$.',
        '$0{,}4^3 = 0{,}064$ nên $\\sqrt[3]{0{,}064} = 0{,}4$.',
        '$\\left(-\\dfrac{1}{3}\\right)^3 = -\\dfrac{1}{27}$ nên $\\sqrt[3]{-\\dfrac{1}{27}} = -\\dfrac{1}{3}$.',
      ],
      answer: 'Lần lượt là $2$; $-5$; $0{,}4$; $-\\dfrac{1}{3}$.',
    },
    {
      problem: 'Tính giá trị của $\\sqrt[3]{x^3 + 3x^2 + 3x + 1}$ tại $x = 4$.',
      steps: [
        'Theo hằng đẳng thức lập phương của một tổng, $x^3 + 3x^2 + 3x + 1 = (x + 1)^3$.',
        'Do đó $\\sqrt[3]{x^3 + 3x^2 + 3x + 1} = \\sqrt[3]{(x + 1)^3} = x + 1$.',
        'Tại $x = 4$, giá trị là $4 + 1 = 5$.',
      ],
      answer: 'Giá trị của biểu thức tại $x = 4$ là $5$.',
    },
    {
      problem: 'So sánh $2\\sqrt[3]{3}$ và $\\sqrt[3]{23}$.',
      steps: [
        '$2 = \\sqrt[3]{8}$, nên $2\\sqrt[3]{3} = \\sqrt[3]{8} \\cdot \\sqrt[3]{3} = \\sqrt[3]{24}$.',
        'Vì $24 > 23$ nên $\\sqrt[3]{24} > \\sqrt[3]{23}$.',
      ],
      answer: '$2\\sqrt[3]{3} > \\sqrt[3]{23}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\sqrt[3]{-64}$.',
      answer: -4,
      hints: ['Số nào lập phương lên bằng $-64$?', 'Căn bậc ba của số âm là số âm.'],
      solution: '$(-4)^3 = -64$, nên $\\sqrt[3]{-64} = -4$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt[3]{0{,}027}$.',
      answer: 0.3,
      hints: ['$3^3 = 27$.'],
      solution: '$0{,}3^3 = 0{,}027$, nên $\\sqrt[3]{0{,}027} = 0{,}3$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\sqrt[3]{-\\dfrac{8}{125}}$ (nhập dưới dạng phân số).',
      answer: [-2, 5],
      hints: ['$2^3 = 8$ và $5^3 = 125$.'],
      solution:
        '$\\left(-\\dfrac{2}{5}\\right)^3 = -\\dfrac{8}{125}$, nên $\\sqrt[3]{-\\dfrac{8}{125}} = -\\dfrac{2}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        '$\\sqrt[3]{-27}$ không xác định',
        'Số âm không có căn bậc ba',
        '$\\sqrt[3]{-27} = -3$',
        '$\\sqrt[3]{27} = \\pm 3$',
      ],
      answer: 2,
      hints: ['Mỗi số thực có đúng một căn bậc ba.'],
      solution:
        '$(-3)^3 = -27$ nên $\\sqrt[3]{-27} = -3$. Mỗi số thực, kể cả số âm, có đúng một căn bậc ba, nên $\\sqrt[3]{27}$ chỉ bằng $3$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(\\sqrt[3]{7})^3 + \\sqrt[3]{(-2)^3}$.',
      answer: 5,
      hints: ['$(\\sqrt[3]{a})^3 = \\sqrt[3]{a^3} = a$ với mọi $a$.'],
      solution: '$(\\sqrt[3]{7})^3 = 7$ và $\\sqrt[3]{(-2)^3} = -2$. Tổng bằng $7 + (-2) = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Dùng máy tính cầm tay, tính $\\sqrt[3]{100}$ rồi làm tròn kết quả đến hàng phần trăm.',
      answer: 4.64,
      hints: ['Máy cho $4{,}6415\\ldots$', 'Xem chữ số hàng phần nghìn để làm tròn.'],
      solution:
        '$\\sqrt[3]{100} = 4{,}6415\\ldots$ Chữ số hàng phần nghìn là $1 < 5$, nên làm tròn được $4{,}64$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $4$ và $\\sqrt[3]{63}$.',
      options: ['$4 > \\sqrt[3]{63}$', '$4 = \\sqrt[3]{63}$', '$4 < \\sqrt[3]{63}$'],
      answer: 0,
      hints: ['Viết $4$ dưới dạng căn bậc ba.'],
      solution:
        '$4 = \\sqrt[3]{64}$ và $64 > 63$, nên $\\sqrt[3]{64} > \\sqrt[3]{63}$, tức $4 > \\sqrt[3]{63}$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của $\\sqrt[3]{x^3 - 6x^2 + 12x - 8}$ tại $x = -3$.',
      answer: -5,
      hints: [
        'Biểu thức dưới dấu căn là lập phương của một hiệu.',
        '$x^3 - 6x^2 + 12x - 8 = (x - 2)^3$.',
      ],
      solution:
        '$\\sqrt[3]{x^3 - 6x^2 + 12x - 8} = \\sqrt[3]{(x - 2)^3} = x - 2$. Tại $x = -3$: $-3 - 2 = -5$.',
    },
    {
      type: 'choice',
      prompt: 'Căn thức $\\sqrt[3]{\\dfrac{1}{x - 2}}$ xác định khi',
      options: ['$x \\ne 2$', '$x > 2$', '$x \\ge 2$', 'mọi số thực $x$'],
      answer: 0,
      hints: ['$\\sqrt[3]{A}$ xác định khi $A$ xác định.'],
      solution:
        '$\\dfrac{1}{x - 2}$ xác định khi $x \\ne 2$. Căn bậc ba không đòi biểu thức lấy căn không âm, nên điều kiện chỉ là $x \\ne 2$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt[3]{54} \\cdot \\sqrt[3]{4}$.',
      answer: 6,
      hints: ['$\\sqrt[3]{a} \\cdot \\sqrt[3]{b} = \\sqrt[3]{ab}$.'],
      solution: '$\\sqrt[3]{54} \\cdot \\sqrt[3]{4} = \\sqrt[3]{216} = 6$ vì $6^3 = 216$.',
    },
    {
      type: 'number',
      prompt: 'Một thùng nước hình lập phương có thể tích $343$ dm³. Tính độ dài cạnh của thùng.',
      answer: 7,
      unit: 'dm',
      hints: ['Cạnh $x$ thoả mãn $x^3 = 343$.'],
      solution: 'Cạnh thùng là $\\sqrt[3]{343} = 7$ (dm), vì $7^3 = 343$.',
    },
  ],
  takeaways: [
    'Căn bậc ba của $a$ là số $x$ sao cho $x^3 = a$; mỗi số thực có đúng một căn bậc ba $\\sqrt[3]{a}$, cùng dấu với $a$.',
    '$(\\sqrt[3]{a})^3 = \\sqrt[3]{a^3} = a$; tổng quát $\\sqrt[3]{A^3} = A$, không có giá trị tuyệt đối.',
    '$\\sqrt[3]{A}$ xác định khi $A$ xác định.',
    '$a < b \\Leftrightarrow \\sqrt[3]{a} < \\sqrt[3]{b}$; $\\sqrt[3]{ab} = \\sqrt[3]{a}\\sqrt[3]{b}$; $\\sqrt[3]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[3]{a}}{\\sqrt[3]{b}}$ ($b \\ne 0$).',
  ],
};
