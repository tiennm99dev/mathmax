/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng cửa sổ CAS của phần mềm GeoGebra để thu gọn, nhân, khai triển, phân tích đa thức thành nhân tử và chia đa thức, rồi tự kiểm tra kết quả tính tay.',
  intro:
    'Ở chương I và chương II, em đã cộng, trừ, nhân, chia đa thức, học các hằng đẳng thức đáng nhớ và phân tích đa thức thành nhân tử. Những phép biến đổi dài rất dễ nhầm dấu hay sót hạng tử. Cửa sổ CAS (hệ đại số máy tính) của GeoGebra làm các phép biến đổi đó chính xác chỉ sau một dòng lệnh, nên là công cụ tốt để kiểm tra bài làm của em.',
  objectives: [
    'Mở cửa sổ CAS của GeoGebra và nhập đúng một đa thức (lũy thừa, phép nhân, phân số).',
    'Thực hiện cộng, trừ, nhân đa thức và khai triển bằng lệnh Expand.',
    'Phân tích đa thức thành nhân tử bằng lệnh Factor.',
    'Tìm thương và dư của phép chia đa thức bằng các lệnh Division, Div, Mod; dùng CAS để kiểm tra kết quả tính tay.',
  ],
  sections: [
    {
      heading: 'Cửa sổ CAS và cách nhập đa thức',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic, vào menu Hiển thị (View) và chọn CAS; hoặc dùng ứng dụng GeoGebra CAS trên trang geogebra.org. Cửa sổ CAS gồm các dòng đánh số $1, 2, 3, \\ldots$: gõ biểu thức hoặc lệnh vào một dòng, nhấn Enter, kết quả hiện ngay bên dưới dòng đó.',
        },
        {
          type: 'table',
          head: ['Muốn viết', 'Gõ vào CAS', 'Ghi chú'],
          rows: [
            ['$x^2$', 'x^2', 'dấu ^ cho lũy thừa'],
            ['$3x^2y$', '3x^2y hoặc 3*x^2*y', 'phép nhân có thể bỏ dấu *'],
            ['$(5x - y)^2$', '(5x - y)^2', 'luôn đặt ngoặc quanh tổng trước khi lấy lũy thừa'],
            ['$\\dfrac{1}{3}x$', '1/3x hoặc (1/3)*x', 'phân số viết bằng dấu /'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Gõ x + 1^2 thì GeoGebra hiểu là $x + 1$, vì chỉ số $1$ được bình phương. Muốn bình phương cả tổng phải gõ (x + 1)^2.',
        },
        {
          type: 'p',
          text: 'Cộng, trừ, nhân đa thức: chỉ cần gõ cả biểu thức rồi nhấn Enter, CAS tự thu gọn. Chẳng hạn gõ (2x + y)(x - 3y) + 5xy, kết quả là $2x^2 - 3y^2$.',
        },
      ],
    },
    {
      heading: 'Các lệnh biến đổi đa thức',
      blocks: [
        {
          type: 'table',
          head: ['Việc cần làm', 'Lệnh', 'Ví dụ và kết quả'],
          rows: [
            [
              'Khai triển (nhân phá ngoặc)',
              'Expand(<biểu thức>)',
              'Expand((5x - y)^2) cho $25x^2 - 10xy + y^2$',
            ],
            [
              'Phân tích thành nhân tử',
              'Factor(<đa thức>)',
              'Factor(x^3 - 9x) cho $x(x - 3)(x + 3)$',
            ],
            [
              'Thương và dư',
              'Division(<đa thức bị chia>, <đa thức chia>)',
              'Division(x^3 - 2x^2 + 5, x - 3) cho $\\{x^2 + x + 3,\\ 14\\}$',
            ],
            [
              'Chỉ lấy thương',
              'Div(<đa thức bị chia>, <đa thức chia>)',
              'Div(x^3 - 1, x - 1) cho $x^2 + x + 1$',
            ],
            [
              'Chỉ lấy số dư',
              'Mod(<đa thức bị chia>, <đa thức chia>)',
              'Mod(x^2 + 1, x - 2) cho $5$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Kết quả của Division là một cặp trong ngoặc nhọn: phần tử thứ nhất là thương, phần tử thứ hai là số dư. Khi số dư bằng $0$, phép chia là phép chia hết.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Factor phân tích trên số hữu tỉ',
          text: 'Factor(x^2 - 2) trả lại $x^2 - 2$, vì không viết được $x^2 - 2$ thành tích các đa thức có hệ số hữu tỉ. GeoGebra còn có lệnh IFactor cho phép dùng cả số vô tỉ, chẳng hạn $x^2 - 2 = (x - \\sqrt{2})(x + \\sqrt{2})$; ở lớp 8 ta chỉ dùng Factor.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dùng CAS để kiểm tra bài làm',
          text: 'Tự tính trên giấy trước, rồi so với kết quả CAS. Kiểm tra một phép phân tích bằng cách gõ Expand(<tích em tìm được>): nếu được lại đa thức ban đầu thì em đã làm đúng. Kiểm tra phép chia: thương nhân đa thức chia, cộng số dư phải bằng đa thức bị chia.',
        },
      ],
    },
    {
      heading: 'Thực hành trên máy tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em (hoặc nhóm hai em) dùng cửa sổ CAS làm các bài dưới đây, so sánh với lời giải tay và lưu lại màn hình kết quả.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính có GeoGebra Classic hoặc truy cập geogebra.org; vở có lời giải tay của các bài.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính: $(3x^2y + 5xy - 2)(4x + 3y) - 6x^2(2xy + 3y^2)$.',
            'Khai triển: a) $(5x - y)^2$; b) $\\left(\\dfrac{1}{3}x + 2y\\right)^3$.',
            'Phân tích thành nhân tử: a) $x^4 - 4x^3 - 7x^2 + 8x + 10$; b) $(x + y + z)^3 - x^3 - y^3 - z^3$.',
            'Tìm thương và dư: a) $(3x^4y - 9x^3y^2 - 21x^2y^2) : (3x^2y)$; b) $(2x^3 + 5x^2 - 2x + 12) : (2x^2 - x + 1)$.',
            'Tự đặt thêm hai đa thức, nhờ bạn tính tay rồi cùng kiểm tra bằng CAS.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: với mỗi bài, ghi dòng lệnh đã gõ, kết quả CAS và kết quả tính tay; đánh dấu những chỗ tính tay bị sai và giải thích vì sao sai.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cửa sổ CAS mô phỏng',
    instruction:
      'Ở chế độ "Cửa sổ CAS", gõ một biểu thức hoặc lệnh (Expand, Factor, Division, Div, Mod) rồi bấm "Tính" hoặc Enter. Ở chế độ "Bài tập kiểm tra", tự làm các bài của sách, gõ kết quả để máy kiểm tra, rồi xem GeoGebra làm bằng lệnh nào.',
  },
  examples: [
    {
      problem: 'Dùng CAS tính $(3x^2y + 5xy - 2)(4x + 3y) - 6x^2(2xy + 3y^2)$.',
      steps: [
        'Gõ vào một dòng CAS: (3x^2y + 5xy - 2)(4x + 3y) - 6x^2(2xy + 3y^2), nhấn Enter.',
        'Kiểm tra tay: tích thứ nhất bằng $12x^3y + 9x^2y^2 + 20x^2y + 15xy^2 - 8x - 6y$; tích thứ hai bằng $12x^3y + 18x^2y^2$.',
        'Trừ hai kết quả: $12x^3y$ triệt tiêu, $9x^2y^2 - 18x^2y^2 = -9x^2y^2$.',
      ],
      answer: '$-9x^2y^2 + 20x^2y + 15xy^2 - 8x - 6y$.',
    },
    {
      problem:
        'Dùng CAS phân tích $x^4 - 4x^3 - 7x^2 + 8x + 10$ thành nhân tử, rồi kiểm tra lại kết quả.',
      steps: [
        'Gõ Factor(x^4 - 4x^3 - 7x^2 + 8x + 10) và nhấn Enter, được $(x - 5)(x + 1)(x^2 - 2)$.',
        'Kiểm tra: gõ Expand((x - 5)(x + 1)(x^2 - 2)). Tay: $(x - 5)(x + 1) = x^2 - 4x - 5$.',
        '$(x^2 - 4x - 5)(x^2 - 2) = x^4 - 4x^3 - 7x^2 + 8x + 10$, đúng đa thức ban đầu.',
      ],
      answer: '$x^4 - 4x^3 - 7x^2 + 8x + 10 = (x - 5)(x + 1)(x^2 - 2)$.',
    },
    {
      problem: 'Tìm thương và dư của phép chia $(2x^3 + 5x^2 - 2x + 12) : (2x^2 - x + 1)$.',
      steps: [
        'Gõ Division(2x^3 + 5x^2 - 2x + 12, 2x^2 - x + 1), CAS cho $\\{x + 3,\\ 9\\}$.',
        'Vậy thương là $x + 3$, số dư là $9$.',
        'Thử lại: $(2x^2 - x + 1)(x + 3) + 9 = 2x^3 + 5x^2 - 2x + 3 + 9 = 2x^3 + 5x^2 - 2x + 12$.',
      ],
      answer: 'Thương $x + 3$, dư $9$.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước dùng GeoGebra để khai triển $(x + 2)^3$.',
      items: [
        'Nhấn Enter và đọc kết quả bên dưới dòng lệnh.',
        'Mở GeoGebra Classic.',
        'Gõ Expand((x + 2)^3) vào một dòng của cửa sổ CAS.',
        'Vào menu Hiển thị (View), chọn CAS.',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Phải mở cửa sổ CAS rồi mới gõ lệnh được.'],
      solution:
        'Mở GeoGebra → Hiển thị, chọn CAS → gõ Expand((x + 2)^3) → nhấn Enter, được $x^3 + 6x^2 + 12x + 8$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc cần làm với lệnh CAS phù hợp.',
      left: [
        'Khai triển $(a + b)^4$',
        'Phân tích $x^2 - 9$ thành nhân tử',
        'Tìm cả thương và dư',
        'Chỉ tìm số dư',
      ],
      right: ['Factor', 'Mod', 'Expand', 'Division', 'Div'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['Div cho thương, Mod cho số dư, Division cho cả hai.'],
      solution: 'Khai triển: Expand. Phân tích: Factor. Thương và dư: Division. Chỉ số dư: Mod.',
    },
    {
      type: 'choice',
      prompt: 'Gõ Expand((2x - 3)^2) vào CAS. Kết quả là gì?',
      options: ['$4x^2 - 9$', '$4x^2 - 6x + 9$', '$4x^2 - 12x + 9$', '$2x^2 - 12x + 9$'],
      answer: 2,
      hints: ['Bình phương của một hiệu: $(A - B)^2 = A^2 - 2AB + B^2$ với $A = 2x$, $B = 3$.'],
      solution: '$(2x - 3)^2 = (2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 - 12x + 9$.',
    },
    {
      type: 'choice',
      prompt: 'Gõ Factor(x^3 - 9x) vào CAS. Kết quả là gì?',
      options: ['$x(x^2 - 9)$', '$x(x - 3)(x + 3)$', '$(x - 3)(x + 3)$', '$x^2(x - 9)$'],
      answer: 1,
      hints: ['Đặt nhân tử chung $x$, rồi dùng hiệu hai bình phương.'],
      solution:
        '$x^3 - 9x = x(x^2 - 9) = x(x - 3)(x + 3)$. Factor phân tích đến hết, nên không dừng ở $x(x^2 - 9)$.',
    },
    {
      type: 'number',
      prompt:
        'Gõ Division(x^3 - 2x^2 + 5, x - 3), CAS cho kết quả $\\{x^2 + x + 3,\\ ?\\}$. Số dư bị che là bao nhiêu?',
      answer: 14,
      hints: [
        'Thử lại: (thương)·(đa thức chia) + dư = đa thức bị chia.',
        'Tính $(x - 3)(x^2 + x + 3)$ rồi so với $x^3 - 2x^2 + 5$.',
      ],
      solution:
        '$(x - 3)(x^2 + x + 3) = x^3 - 2x^2 - 9$. Số dư bằng $(x^3 - 2x^2 + 5) - (x^3 - 2x^2 - 9) = 14$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của Division(6x^3 - 7x^2 - x + 2, 2x + 1) là gì?',
      options: [
        '$\\{3x^2 - 5x + 2,\\ 0\\}$',
        '$\\{3x^2 - 2x - 2,\\ 4\\}$',
        '$\\{3x^2 + 5x + 2,\\ 0\\}$',
        '$\\{6x^2 - 5x + 2,\\ 0\\}$',
      ],
      answer: 0,
      hints: ['Nhân thử từng thương với $2x + 1$.'],
      solution:
        '$(2x + 1)(3x^2 - 5x + 2) = 6x^3 - 10x^2 + 4x + 3x^2 - 5x + 2 = 6x^3 - 7x^2 - x + 2$, nên thương là $3x^2 - 5x + 2$ và dư $0$.',
    },
    {
      type: 'multi',
      prompt: 'Những dòng lệnh nào cho kết quả là khai triển của $(x + 1)^3$?',
      options: [
        'Expand((x + 1)^3)',
        'Expand(x + 1^3)',
        'Expand((x + 1)(x + 1)(x + 1))',
        'Factor((x + 1)^3)',
      ],
      answers: [0, 2],
      hints: [
        'Lũy thừa chỉ áp dụng cho phần đứng ngay trước dấu ^.',
        'Factor làm ngược với Expand.',
      ],
      solution:
        'Expand((x + 1)^3) và Expand((x + 1)(x + 1)(x + 1)) đều cho $x^3 + 3x^2 + 3x + 1$. Dòng x + 1^3 chỉ là $x + 1$; Factor((x + 1)^3) giữ nguyên dạng tích $(x + 1)^3$.',
    },
    {
      type: 'choice',
      prompt: 'Gõ Factor(x^2 - 2) vào CAS. Kết quả là gì?',
      options: [
        '$(x - 2)(x + 2)$',
        '$(x - \\sqrt{2})(x + \\sqrt{2})$',
        '$x^2 - 2$ (không đổi)',
        'Báo lỗi',
      ],
      answer: 2,
      hints: ['Factor chỉ phân tích thành các đa thức có hệ số hữu tỉ.'],
      solution:
        'Không có cách viết $x^2 - 2$ thành tích hai đa thức bậc nhất có hệ số hữu tỉ, nên Factor trả lại $x^2 - 2$. Lệnh IFactor mới cho $(x - \\sqrt{2})(x + \\sqrt{2})$.',
    },
  ],
  takeaways: [
    'Cửa sổ CAS: gõ biểu thức hoặc lệnh vào một dòng, nhấn Enter để có kết quả; gõ x^2 cho $x^2$ và đặt ngoặc quanh tổng trước khi lấy lũy thừa.',
    'Expand khai triển, Factor phân tích thành nhân tử (trên số hữu tỉ), Division cho cả thương và dư, Div cho thương, Mod cho số dư.',
    'Dùng CAS để kiểm tra bài làm tay: Expand một tích để thử phép phân tích; thương nhân đa thức chia cộng dư phải bằng đa thức bị chia.',
  ],
};
