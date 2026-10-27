/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: đưa thừa số ra ngoài và vào trong dấu căn, trục căn thức ở mẫu, rút gọn biểu thức chứa căn thức bậc hai, căn bậc ba và căn thức bậc ba.',
  intro:
    'Bài 9 cho em các phép biến đổi để rút gọn biểu thức chứa căn bậc hai, Bài 10 mở rộng sang căn bậc ba. Bài luyện tập này phối hợp cả hai: làm xuất hiện các căn đồng dạng, khử căn ở mẫu bằng biểu thức liên hợp, tính và so sánh căn bậc ba, kể cả của số âm.',
  objectives: [
    'Đưa thừa số ra ngoài hoặc vào trong dấu căn để rút gọn và so sánh.',
    'Trục căn thức ở mẫu, rút gọn biểu thức chứa căn thức bậc hai.',
    'Tính căn bậc ba, vận dụng tính chất của căn bậc ba và giải phương trình chứa căn bậc ba đơn giản.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Phép biến đổi', 'Công thức', 'Ví dụ'],
          rows: [
            [
              'Đưa thừa số ra ngoài dấu căn',
              '$\\sqrt{A^2 B} = |A|\\sqrt{B}$ ($B \\ge 0$)',
              '$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$',
            ],
            [
              'Đưa thừa số vào trong dấu căn',
              '$A\\sqrt{B} = \\sqrt{A^2 B}$ nếu $A \\ge 0$; $A\\sqrt{B} = -\\sqrt{A^2 B}$ nếu $A < 0$',
              '$-3\\sqrt{2} = -\\sqrt{18}$',
            ],
            [
              'Khử mẫu của biểu thức lấy căn',
              '$\\sqrt{\\dfrac{A}{B}} = \\dfrac{\\sqrt{AB}}{|B|}$ ($AB \\ge 0$, $B \\ne 0$)',
              '$\\sqrt{\\dfrac{2}{3}} = \\dfrac{\\sqrt{6}}{3}$',
            ],
            [
              'Trục căn thức ở mẫu',
              'Nhân tử và mẫu với $\\sqrt{B}$ hoặc với biểu thức liên hợp của mẫu',
              '$\\dfrac{1}{\\sqrt{3} - 1} = \\dfrac{\\sqrt{3} + 1}{2}$',
            ],
            [
              'Căn bậc ba',
              '$\\sqrt[3]{a} = x \\Leftrightarrow x^3 = a$; mọi số thực có đúng một căn bậc ba',
              '$\\sqrt[3]{-125} = -5$',
            ],
            [
              'Tính chất căn bậc ba',
              '$a < b \\Leftrightarrow \\sqrt[3]{a} < \\sqrt[3]{b}$; $\\sqrt[3]{ab} = \\sqrt[3]{a} \\cdot \\sqrt[3]{b}$; $\\sqrt[3]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[3]{a}}{\\sqrt[3]{b}}$ ($b \\ne 0$)',
              '$\\sqrt[3]{2} \\cdot \\sqrt[3]{4} = \\sqrt[3]{8} = 2$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Cộng hai căn không đồng dạng ($\\sqrt{2} + \\sqrt{3} \\ne \\sqrt{5}$); quên giữ dấu trừ khi đưa thừa số âm vào trong dấu căn ($-2\\sqrt{3} = -\\sqrt{12}$, không phải $\\sqrt{12}$); nghĩ rằng căn bậc ba của số âm không xác định ($\\sqrt[3]{-8} = -2$).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ ba kĩ năng của Bài 9 và Bài 10. Đáp số là số nguyên hoặc số thập phân (dùng dấu phẩy).',
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
      problem: 'Rút gọn biểu thức $\\sqrt{45} - 2\\sqrt{20} + \\sqrt{80}$.',
      steps: [
        'Đưa thừa số ra ngoài dấu căn: $\\sqrt{45} = \\sqrt{9 \\cdot 5} = 3\\sqrt{5}$; $\\sqrt{20} = 2\\sqrt{5}$; $\\sqrt{80} = \\sqrt{16 \\cdot 5} = 4\\sqrt{5}$.',
        'Thay vào: $3\\sqrt{5} - 2 \\cdot 2\\sqrt{5} + 4\\sqrt{5} = (3 - 4 + 4)\\sqrt{5}$.',
      ],
      answer: '$\\sqrt{45} - 2\\sqrt{20} + \\sqrt{80} = 3\\sqrt{5}$.',
    },
    {
      problem:
        'Rút gọn biểu thức $P = \\dfrac{1}{\\sqrt{x} - 2} + \\dfrac{1}{\\sqrt{x} + 2}$ với $x \\ge 0$, $x \\ne 4$.',
      steps: [
        'Mẫu chung: $(\\sqrt{x} - 2)(\\sqrt{x} + 2) = x - 4$, khác $0$ vì $x \\ne 4$.',
        'Quy đồng: $P = \\dfrac{(\\sqrt{x} + 2) + (\\sqrt{x} - 2)}{x - 4}$.',
        'Thu gọn tử: $(\\sqrt{x} + 2) + (\\sqrt{x} - 2) = 2\\sqrt{x}$.',
      ],
      answer: '$P = \\dfrac{2\\sqrt{x}}{x - 4}$.',
    },
    {
      problem: 'Tính $\\sqrt[3]{-27} + \\sqrt[3]{0{,}008} - \\dfrac{\\sqrt[3]{16}}{\\sqrt[3]{2}}$.',
      steps: [
        '$\\sqrt[3]{-27} = -3$ vì $(-3)^3 = -27$.',
        '$\\sqrt[3]{0{,}008} = 0{,}2$ vì $0{,}2^3 = 0{,}008$.',
        '$\\dfrac{\\sqrt[3]{16}}{\\sqrt[3]{2}} = \\sqrt[3]{\\dfrac{16}{2}} = \\sqrt[3]{8} = 2$.',
        'Vậy biểu thức bằng $-3 + 0{,}2 - 2 = -4{,}8$.',
      ],
      answer: 'Giá trị của biểu thức là $-4{,}8$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Rút gọn: $\\sqrt{18} + \\sqrt{50} - \\sqrt{32} = a\\sqrt{2}$. Tìm $a$.',
      answer: 4,
      hints: [
        'Viết mỗi số dưới dấu căn thành $2$ nhân với một số chính phương.',
        '$18 = 9 \\cdot 2$, $50 = 25 \\cdot 2$, $32 = 16 \\cdot 2$.',
      ],
      solution:
        '$\\sqrt{18} = 3\\sqrt{2}$, $\\sqrt{50} = 5\\sqrt{2}$, $\\sqrt{32} = 4\\sqrt{2}$. Tổng bằng $(3 + 5 - 4)\\sqrt{2} = 4\\sqrt{2}$, nên $a = 4$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $3\\sqrt{7}$ và $2\\sqrt{15}$.',
      options: [
        '$3\\sqrt{7} > 2\\sqrt{15}$',
        '$3\\sqrt{7} = 2\\sqrt{15}$',
        '$3\\sqrt{7} < 2\\sqrt{15}$',
      ],
      answer: 0,
      hints: ['Đưa thừa số vào trong dấu căn ở cả hai số.'],
      solution:
        '$3\\sqrt{7} = \\sqrt{9 \\cdot 7} = \\sqrt{63}$ và $2\\sqrt{15} = \\sqrt{4 \\cdot 15} = \\sqrt{60}$. Vì $63 > 60$ nên $3\\sqrt{7} > 2\\sqrt{15}$.',
    },
    {
      type: 'choice',
      prompt: 'Trục căn thức ở mẫu của $\\dfrac{2}{\\sqrt{5} - \\sqrt{3}}$, ta được',
      options: [
        '$\\sqrt{5} + \\sqrt{3}$',
        '$\\sqrt{5} - \\sqrt{3}$',
        '$2(\\sqrt{5} + \\sqrt{3})$',
        '$\\dfrac{\\sqrt{5} + \\sqrt{3}}{2}$',
      ],
      answer: 0,
      hints: [
        'Nhân cả tử và mẫu với biểu thức liên hợp $\\sqrt{5} + \\sqrt{3}$.',
        '$(\\sqrt{5} - \\sqrt{3})(\\sqrt{5} + \\sqrt{3}) = 5 - 3$.',
      ],
      solution:
        '$\\dfrac{2}{\\sqrt{5} - \\sqrt{3}} = \\dfrac{2(\\sqrt{5} + \\sqrt{3})}{(\\sqrt{5} - \\sqrt{3})(\\sqrt{5} + \\sqrt{3})} = \\dfrac{2(\\sqrt{5} + \\sqrt{3})}{2} = \\sqrt{5} + \\sqrt{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính $\\dfrac{\\sqrt{5} + 1}{\\sqrt{5} - 1} + \\dfrac{\\sqrt{5} - 1}{\\sqrt{5} + 1}$.',
      answer: 3,
      hints: [
        'Mẫu chung là $(\\sqrt{5} - 1)(\\sqrt{5} + 1) = 4$.',
        'Khai triển $(\\sqrt{5} + 1)^2$ và $(\\sqrt{5} - 1)^2$.',
      ],
      solution:
        'Quy đồng: $\\dfrac{(\\sqrt{5} + 1)^2 + (\\sqrt{5} - 1)^2}{5 - 1} = \\dfrac{(6 + 2\\sqrt{5}) + (6 - 2\\sqrt{5})}{4} = \\dfrac{12}{4} = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn $\\dfrac{x - 4}{\\sqrt{x} - 2}$ với $x \\ge 0$, $x \\ne 4$.',
      options: ['$\\sqrt{x} + 2$', '$\\sqrt{x} - 2$', '$x + 2$', '$1$'],
      answer: 0,
      hints: [
        'Với $x \\ge 0$ thì $x = (\\sqrt{x})^2$.',
        'Phân tích $x - 4$ thành hiệu hai bình phương.',
      ],
      solution:
        '$x - 4 = (\\sqrt{x})^2 - 2^2 = (\\sqrt{x} - 2)(\\sqrt{x} + 2)$, nên $\\dfrac{x - 4}{\\sqrt{x} - 2} = \\sqrt{x} + 2$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $B = \\dfrac{x - \\sqrt{x}}{\\sqrt{x} - 1} + \\dfrac{x - 4}{\\sqrt{x} + 2}$ với $x > 0$, $x \\ne 1$. Rút gọn $B$ rồi tính giá trị của $B$ tại $x = 9$.',
      answer: 4,
      hints: [
        'Đặt nhân tử chung: $x - \\sqrt{x} = \\sqrt{x}(\\sqrt{x} - 1)$.',
        '$x - 4 = (\\sqrt{x} - 2)(\\sqrt{x} + 2)$.',
      ],
      solution:
        '$B = \\dfrac{\\sqrt{x}(\\sqrt{x} - 1)}{\\sqrt{x} - 1} + \\dfrac{(\\sqrt{x} - 2)(\\sqrt{x} + 2)}{\\sqrt{x} + 2} = \\sqrt{x} + \\sqrt{x} - 2 = 2\\sqrt{x} - 2$. Tại $x = 9$: $B = 2 \\cdot 3 - 2 = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt[3]{-64} + \\sqrt[3]{0{,}125} \\cdot \\sqrt[3]{216}$.',
      answer: -1,
      hints: ['Tính từng căn bậc ba; căn bậc ba của số âm là số âm.'],
      solution:
        '$\\sqrt[3]{-64} = -4$, $\\sqrt[3]{0{,}125} = 0{,}5$, $\\sqrt[3]{216} = 6$. Biểu thức bằng $-4 + 0{,}5 \\cdot 6 = -4 + 3 = -1$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt[3]{2} \\cdot \\sqrt[3]{-32}$.',
      answer: -4,
      hints: [
        'Dùng tính chất $\\sqrt[3]{a} \\cdot \\sqrt[3]{b} = \\sqrt[3]{ab}$, đúng cả với số âm.',
      ],
      solution:
        '$\\sqrt[3]{2} \\cdot \\sqrt[3]{-32} = \\sqrt[3]{2 \\cdot (-32)} = \\sqrt[3]{-64} = -4$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $2\\sqrt[3]{3}$ và $\\sqrt[3]{25}$.',
      options: [
        '$2\\sqrt[3]{3} < \\sqrt[3]{25}$',
        '$2\\sqrt[3]{3} = \\sqrt[3]{25}$',
        '$2\\sqrt[3]{3} > \\sqrt[3]{25}$',
      ],
      answer: 0,
      hints: ['Viết $2 = \\sqrt[3]{8}$ rồi đưa vào trong một căn bậc ba.'],
      solution:
        '$2\\sqrt[3]{3} = \\sqrt[3]{8} \\cdot \\sqrt[3]{3} = \\sqrt[3]{24}$. Vì $24 < 25$ nên $\\sqrt[3]{24} < \\sqrt[3]{25}$, tức $2\\sqrt[3]{3} < \\sqrt[3]{25}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\sqrt[3]{2x - 1} = 3$.',
      answer: 14,
      hints: ['Lập phương hai vế: $(\\sqrt[3]{A})^3 = A$.'],
      solution: 'Lập phương hai vế: $2x - 1 = 27$, nên $2x = 28$, $x = 14$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với dạng rút gọn của nó.',
      left: [
        '$\\sqrt{12}$',
        '$\\dfrac{6}{\\sqrt{2}}$',
        '$\\sqrt[3]{-27}$',
        '$\\sqrt{3x^2}$ với $x < 0$',
      ],
      right: ['$-x\\sqrt{3}$', '$3\\sqrt{2}$', '$x\\sqrt{3}$', '$2\\sqrt{3}$', '$-3$'],
      pairs: [
        [0, 3],
        [1, 1],
        [2, 4],
        [3, 0],
      ],
      hints: ['Đưa thừa số ra ngoài dấu căn; trục căn thức ở mẫu.', 'Với $x < 0$ thì $|x| = -x$.'],
      solution:
        '$\\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$; $\\dfrac{6}{\\sqrt{2}} = \\dfrac{6\\sqrt{2}}{2} = 3\\sqrt{2}$; $\\sqrt[3]{-27} = -3$; $\\sqrt{3x^2} = |x|\\sqrt{3} = -x\\sqrt{3}$ vì $x < 0$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối gỗ hình lập phương có thể tích $50$ dm³. Tính độ dài cạnh của khối gỗ (làm tròn kết quả đến hàng phần trăm).',
      answer: 3.68,
      tolerance: 0.005,
      unit: 'dm',
      hints: [
        'Thể tích hình lập phương cạnh $a$ là $a^3$.',
        'Dùng máy tính cầm tay để tính $\\sqrt[3]{50}$.',
      ],
      solution:
        'Cạnh khối gỗ là $a = \\sqrt[3]{50} \\approx 3{,}684$, làm tròn đến hàng phần trăm được $a \\approx 3{,}68$ dm.',
    },
  ],
  takeaways: [
    'Đưa thừa số ra ngoài dấu căn để làm xuất hiện các căn đồng dạng; đưa vào trong để so sánh.',
    'Trục căn thức ở mẫu: nhân với $\\sqrt{B}$, hoặc với biểu thức liên hợp khi mẫu là tổng, hiệu có căn.',
    'Mọi số thực có đúng một căn bậc ba; $\\sqrt[3]{A^3} = A$ và các tính chất nhân, chia, so sánh đúng với cả số âm.',
  ],
};
