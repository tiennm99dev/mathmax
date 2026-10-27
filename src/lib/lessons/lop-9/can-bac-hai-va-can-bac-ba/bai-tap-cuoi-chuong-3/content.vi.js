/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 3: căn bậc hai, căn thức bậc hai và điều kiện xác định, khai căn với phép nhân và phép chia, biến đổi và rút gọn biểu thức chứa căn, căn bậc ba và các bài toán thực tế.',
  intro:
    'Chương 3 xây dựng hai phép toán mới: khai căn bậc hai và khai căn bậc ba. Bài ôn tập này hệ thống lại các định nghĩa, quy tắc và phép biến đổi của chương, kèm một bộ đề tự sinh có bản đồ kĩ năng tô màu theo từng bài để em biết phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các kiến thức về căn bậc hai, căn thức bậc hai, căn bậc ba và căn thức bậc ba.',
    'Phối hợp các phép biến đổi để tính, so sánh và rút gọn biểu thức chứa căn.',
    'Vận dụng căn bậc hai, căn bậc ba để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính', 'Điều cần nhớ'],
          rows: [
            [
              'Bài 7',
              'Căn bậc hai, căn bậc hai số học',
              'Số $a > 0$ có hai căn bậc hai $\\pm\\sqrt{a}$; $\\sqrt{a} \\ge 0$; số âm không có căn bậc hai',
            ],
            [
              'Bài 7',
              'Căn thức bậc hai',
              '$\\sqrt{A}$ xác định khi $A \\ge 0$; $\\sqrt{A^2} = |A|$',
            ],
            [
              'Bài 8',
              'Khai căn với phép nhân, phép chia',
              '$\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$ ($a, b \\ge 0$); $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$ ($a \\ge 0$, $b > 0$)',
            ],
            [
              'Bài 9',
              'Biến đổi đơn giản',
              '$\\sqrt{A^2B} = |A|\\sqrt{B}$; trục căn thức ở mẫu bằng $\\sqrt{B}$ hoặc biểu thức liên hợp',
            ],
            [
              'Bài 10',
              'Căn bậc ba, căn thức bậc ba',
              'Mọi số thực có đúng một căn bậc ba; $\\sqrt[3]{A}$ xác định khi $A$ xác định; $\\sqrt[3]{A^3} = A$',
            ],
            [
              'Bài 10',
              'Tính chất căn bậc ba',
              '$a < b \\Leftrightarrow \\sqrt[3]{a} < \\sqrt[3]{b}$; $\\sqrt[3]{ab} = \\sqrt[3]{a}\\sqrt[3]{b}$; $\\sqrt[3]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[3]{a}}{\\sqrt[3]{b}}$ ($b \\ne 0$)',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Khi rút gọn một biểu thức chứa chữ, trước hết tìm điều kiện xác định; sau đó phân tích tử và mẫu thành nhân tử (thường dùng $x = (\\sqrt{x})^2$ với $x \\ge 0$), quy đồng hoặc trục căn thức, rồi thu gọn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Căn bậc hai khác căn bậc ba ở đâu?',
          text: '$\\sqrt{A^2} = |A|$ nhưng $\\sqrt[3]{A^3} = A$; $\\sqrt{-8}$ không xác định nhưng $\\sqrt[3]{-8} = -2$; $\\sqrt{A}$ cần $A \\ge 0$, còn $\\sqrt[3]{A}$ chỉ cần $A$ xác định.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh $14$ câu, đủ bảy nhóm kĩ năng của chương. Bản đồ kĩ năng tô xanh phần em làm tốt, tô vàng hoặc đỏ phần cần ôn lại; khi đó hãy mở lại bài tương ứng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Cuối bộ đề, bản đồ kĩ năng chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem: 'Rút gọn $\\dfrac{\\sqrt{6} - \\sqrt{2}}{\\sqrt{3} - 1}$.',
      steps: [
        'Đặt nhân tử chung ở tử: $\\sqrt{6} - \\sqrt{2} = \\sqrt{2} \\cdot \\sqrt{3} - \\sqrt{2} = \\sqrt{2}(\\sqrt{3} - 1)$.',
        'Chia cho $\\sqrt{3} - 1 \\ne 0$.',
      ],
      answer: '$\\dfrac{\\sqrt{6} - \\sqrt{2}}{\\sqrt{3} - 1} = \\sqrt{2}$.',
    },
    {
      problem:
        'Rút gọn $P = \\left(\\dfrac{1}{\\sqrt{x} - 1} + \\dfrac{1}{\\sqrt{x} + 1}\\right) \\cdot \\dfrac{x - 1}{\\sqrt{x}}$ với $x > 0$, $x \\ne 1$.',
      steps: [
        'Mẫu chung của hai phân thức trong ngoặc: $(\\sqrt{x} - 1)(\\sqrt{x} + 1) = x - 1$.',
        'Trong ngoặc: $\\dfrac{(\\sqrt{x} + 1) + (\\sqrt{x} - 1)}{x - 1} = \\dfrac{2\\sqrt{x}}{x - 1}$.',
        'Nhân: $P = \\dfrac{2\\sqrt{x}}{x - 1} \\cdot \\dfrac{x - 1}{\\sqrt{x}} = 2$.',
      ],
      answer: '$P = 2$ với mọi $x > 0$, $x \\ne 1$.',
    },
    {
      problem:
        'Một thùng tôn không nắp hình lập phương chứa đầy được $1\\,331$ lít nước. Tính diện tích tôn dùng để làm thùng (bỏ qua mép nối), biết $1$ lít $= 1$ dm³.',
      steps: [
        'Thể tích thùng là $1\\,331$ dm³, nên cạnh thùng là $a = \\sqrt[3]{1\\,331} = 11$ (dm), vì $11^3 = 1\\,331$.',
        'Thùng không nắp gồm $5$ mặt hình vuông cạnh $11$ dm.',
        'Diện tích tôn: $5 \\cdot 11^2 = 5 \\cdot 121 = 605$ (dm²).',
      ],
      answer: 'Cần $605$ dm² tôn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Căn bậc hai số học của $49$ là',
      options: ['$-7$', '$7$', '$7$ và $-7$', '$2\\,401$'],
      answer: 1,
      hints: ['Căn bậc hai số học là căn bậc hai không âm.'],
      solution:
        '$49$ có hai căn bậc hai là $7$ và $-7$; căn bậc hai số học của $49$ là $\\sqrt{49} = 7$.',
    },
    {
      type: 'choice',
      prompt: 'Điều kiện xác định của $\\sqrt{2x - 6}$ là',
      options: ['$x \\ge 3$', '$x > 3$', '$x \\le 3$', '$x \\ge -3$'],
      answer: 0,
      hints: ['$\\sqrt{A}$ xác định khi $A \\ge 0$.'],
      solution: 'Cần $2x - 6 \\ge 0$, tức $2x \\ge 6$, $x \\ge 3$.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của $\\sqrt[3]{-1\\,000}$ là',
      options: ['$10$', '$-10$', 'không xác định', '$-100$'],
      answer: 1,
      hints: ['Căn bậc ba của một số âm là một số âm.'],
      solution: '$(-10)^3 = -1\\,000$ nên $\\sqrt[3]{-1\\,000} = -10$.',
    },
    {
      type: 'choice',
      prompt: '$\\sqrt{(\\sqrt{5} - 3)^2}$ bằng',
      options: ['$\\sqrt{5} - 3$', '$3 - \\sqrt{5}$', '$3 + \\sqrt{5}$', '$-3 - \\sqrt{5}$'],
      answer: 1,
      hints: ['$\\sqrt{A^2} = |A|$.', 'So sánh $\\sqrt{5}$ với $3 = \\sqrt{9}$.'],
      solution:
        '$\\sqrt{(\\sqrt{5} - 3)^2} = |\\sqrt{5} - 3|$. Vì $\\sqrt{5} < \\sqrt{9} = 3$ nên $\\sqrt{5} - 3 < 0$, do đó kết quả là $3 - \\sqrt{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng với mọi số thực $a$?',
      options: [
        '$\\sqrt[3]{a^3} = a$',
        '$\\sqrt{a^2} = a$',
        '$\\sqrt[3]{a}$ chỉ xác định khi $a \\ge 0$',
        '$\\sqrt{a} \\ge 0$',
      ],
      answer: 0,
      hints: ['Thử với một số âm, chẳng hạn $a = -2$.'],
      solution:
        'Với $a = -2$: $\\sqrt[3]{(-2)^3} = \\sqrt[3]{-8} = -2$ đúng; $\\sqrt{(-2)^2} = 2 \\ne -2$; $\\sqrt[3]{-2}$ vẫn xác định; $\\sqrt{-2}$ không xác định. Chỉ $\\sqrt[3]{a^3} = a$ đúng với mọi $a$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{0{,}36} \\cdot \\sqrt{100} - \\sqrt[3]{27}$.',
      answer: 3,
      hints: ['Tính từng căn trước: $\\sqrt{0{,}36}$, $\\sqrt{100}$, $\\sqrt[3]{27}$.'],
      solution:
        '$\\sqrt{0{,}36} = 0{,}6$, $\\sqrt{100} = 10$, $\\sqrt[3]{27} = 3$. Biểu thức bằng $0{,}6 \\cdot 10 - 3 = 3$.',
    },
    {
      type: 'number',
      prompt: 'Rút gọn: $\\sqrt{75} + \\sqrt{48} - \\sqrt{300} = a\\sqrt{3}$. Tìm $a$.',
      answer: -1,
      hints: ['Đưa thừa số ra ngoài dấu căn: mỗi số đều bằng $3$ nhân với một số chính phương.'],
      solution:
        '$\\sqrt{75} = 5\\sqrt{3}$, $\\sqrt{48} = 4\\sqrt{3}$, $\\sqrt{300} = 10\\sqrt{3}$. Tổng bằng $(5 + 4 - 10)\\sqrt{3} = -\\sqrt{3}$, nên $a = -1$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\sqrt{1\\dfrac{9}{16}}$ (nhập dưới dạng phân số).',
      answer: [5, 4],
      hints: ['Đổi hỗn số ra phân số trước khi khai căn.'],
      solution:
        '$1\\dfrac{9}{16} = \\dfrac{25}{16}$, nên $\\sqrt{\\dfrac{25}{16}} = \\dfrac{\\sqrt{25}}{\\sqrt{16}} = \\dfrac{5}{4}$.',
    },
    {
      type: 'choice',
      prompt: 'Trục căn thức ở mẫu của $\\dfrac{3}{\\sqrt{7} + 2}$, ta được',
      options: [
        '$\\sqrt{7} - 2$',
        '$\\sqrt{7} + 2$',
        '$3(\\sqrt{7} - 2)$',
        '$\\dfrac{\\sqrt{7} - 2}{3}$',
      ],
      answer: 0,
      hints: ['Biểu thức liên hợp của $\\sqrt{7} + 2$ là $\\sqrt{7} - 2$.'],
      solution:
        '$\\dfrac{3}{\\sqrt{7} + 2} = \\dfrac{3(\\sqrt{7} - 2)}{(\\sqrt{7} + 2)(\\sqrt{7} - 2)} = \\dfrac{3(\\sqrt{7} - 2)}{7 - 4} = \\sqrt{7} - 2$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\dfrac{1}{\\sqrt{5} - 2} - \\dfrac{1}{\\sqrt{5} + 2}$.',
      answer: 4,
      hints: ['Mẫu chung là $(\\sqrt{5} - 2)(\\sqrt{5} + 2) = 1$.'],
      solution:
        'Quy đồng: $\\dfrac{(\\sqrt{5} + 2) - (\\sqrt{5} - 2)}{5 - 4} = \\dfrac{4}{1} = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\sqrt{x - 2} = 5$.',
      answer: 27,
      hints: ['Điều kiện: $x \\ge 2$.', 'Bình phương hai vế (hai vế đều không âm).'],
      solution:
        'Điều kiện $x \\ge 2$. Bình phương hai vế: $x - 2 = 25$, nên $x = 27$ (thoả mãn điều kiện).',
    },
    {
      type: 'number',
      prompt:
        'Cho $A = \\dfrac{x\\sqrt{x} + 8}{\\sqrt{x} + 2}$ với $x \\ge 0$. Rút gọn $A$ rồi tính giá trị của $A$ tại $x = 16$.',
      answer: 12,
      hints: [
        'Với $x \\ge 0$: $x\\sqrt{x} = (\\sqrt{x})^3$.',
        'Dùng hằng đẳng thức tổng hai lập phương $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.',
      ],
      solution:
        '$x\\sqrt{x} + 8 = (\\sqrt{x})^3 + 2^3 = (\\sqrt{x} + 2)(x - 2\\sqrt{x} + 4)$, nên $A = x - 2\\sqrt{x} + 4$. Tại $x = 16$: $A = 16 - 2 \\cdot 4 + 4 = 12$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình vuông có diện tích $30$ m². Tính độ dài cạnh mảnh đất (làm tròn kết quả đến hàng phần mười).',
      answer: 5.5,
      tolerance: 0.05,
      unit: 'm',
      hints: ['Cạnh hình vuông bằng căn bậc hai số học của diện tích.'],
      solution:
        'Cạnh mảnh đất là $\\sqrt{30} \\approx 5{,}477$, làm tròn đến hàng phần mười được khoảng $5{,}5$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một khối bê tông hình lập phương có thể tích $0{,}125$ m³. Tính độ dài cạnh của khối bê tông theo mét.',
      answer: 0.5,
      unit: 'm',
      hints: ['Cạnh hình lập phương bằng căn bậc ba của thể tích.'],
      solution:
        '$\\sqrt[3]{0{,}125} = 0{,}5$ vì $0{,}5^3 = 0{,}125$. Cạnh khối bê tông dài $0{,}5$ m.',
    },
  ],
  takeaways: [
    '$\\sqrt{A}$ cần $A \\ge 0$ và $\\sqrt{A^2} = |A|$; $\\sqrt[3]{A}$ chỉ cần $A$ xác định và $\\sqrt[3]{A^3} = A$.',
    'Khai căn được với tích và thương, không được với tổng và hiệu.',
    'Rút gọn: tìm điều kiện, đưa thừa số ra ngoài dấu căn, trục căn thức, phân tích thành nhân tử rồi thu gọn.',
  ],
};
