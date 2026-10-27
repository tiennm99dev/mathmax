/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: định lí Viète, nhẩm nghiệm, tìm hai số biết tổng và tích, tính biểu thức đối xứng của hai nghiệm và giải bài toán bằng cách lập phương trình bậc hai.',
  intro:
    'Bài 20 cho em định lí Viète để "đọc" tổng và tích hai nghiệm ngay từ các hệ số, còn Bài 21 dùng phương trình bậc hai để giải các bài toán thực tế. Bài luyện tập này phối hợp hai công cụ đó: nhẩm nghiệm, tính giá trị biểu thức của hai nghiệm mà không giải phương trình, tìm hai số khi biết tổng và tích, rồi lập và giải phương trình từ một tình huống thực tế.',
  objectives: [
    'Vận dụng định lí Viète để nhẩm nghiệm và tính giá trị các biểu thức đối xứng của hai nghiệm.',
    'Tìm hai số khi biết tổng và tích của chúng.',
    'Giải bài toán thực tế bằng cách lập phương trình bậc hai và chọn nghiệm thoả mãn điều kiện của ẩn.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Định lí Viète',
              'Nếu $x_1$, $x_2$ là hai nghiệm của $ax^2 + bx + c = 0$ $(a \\ne 0)$ thì $x_1 + x_2 = -\\dfrac{b}{a}$, $x_1 x_2 = \\dfrac{c}{a}$',
            ],
            [
              'Nhẩm nghiệm',
              '$a + b + c = 0$: $x_1 = 1$, $x_2 = \\dfrac{c}{a}$; $a - b + c = 0$: $x_1 = -1$, $x_2 = -\\dfrac{c}{a}$',
            ],
            [
              'Tìm hai số',
              'Hai số có tổng $S$, tích $P$ là nghiệm của $x^2 - Sx + P = 0$ (điều kiện $S^2 - 4P \\ge 0$)',
            ],
            [
              'Biểu thức đối xứng',
              '$x_1^2 + x_2^2 = S^2 - 2P$; $(x_1 - x_2)^2 = S^2 - 4P$; $x_1^3 + x_2^3 = S^3 - 3PS$',
            ],
            [
              'Giải bài toán bằng cách lập phương trình',
              'Chọn ẩn, đặt điều kiện; lập phương trình; giải; đối chiếu điều kiện rồi trả lời',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Dùng định lí Viète khi phương trình vô nghiệm: $x^2 - 3x + 5 = 0$ có $\\Delta = -11 < 0$ nên không có "tổng hai nghiệm bằng $3$". Quên dấu trừ trong $x_1 + x_2 = -\\dfrac{b}{a}$. Trong bài toán thực tế, nhận cả nghiệm âm hoặc nghiệm làm một đại lượng khác vô lí.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều giữa định lí Viète và bài toán lập phương trình. Đáp số là số nguyên hoặc số thập phân (dùng dấu phẩy).',
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
      problem:
        'Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $x^2 - 5x + 3 = 0$. Không giải phương trình, hãy tính: a) $x_1^2 + x_2^2$; b) $(x_1 - x_2)^2$.',
      steps: [
        '$\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 3 = 13 > 0$ nên phương trình có hai nghiệm phân biệt.',
        'Theo định lí Viète: $x_1 + x_2 = 5$, $x_1 x_2 = 3$.',
        'a) $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = 25 - 6 = 19$.',
        'b) $(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = 25 - 12 = 13$.',
      ],
      answer: 'a) $x_1^2 + x_2^2 = 19$; b) $(x_1 - x_2)^2 = 13$.',
    },
    {
      problem: 'Tìm hai số $u$ và $v$, biết $u^2 + v^2 = 125$ và $uv = 22$.',
      steps: [
        '$(u + v)^2 = u^2 + v^2 + 2uv = 125 + 44 = 169$, nên $u + v = 13$ hoặc $u + v = -13$.',
        'Nếu $u + v = 13$, $uv = 22$: $u$, $v$ là nghiệm của $x^2 - 13x + 22 = 0$; $\\Delta = 169 - 88 = 81$, hai nghiệm là $11$ và $2$.',
        'Nếu $u + v = -13$, $uv = 22$: $u$, $v$ là nghiệm của $x^2 + 13x + 22 = 0$, hai nghiệm là $-2$ và $-11$.',
      ],
      answer: '$(u; v)$ là một trong các cặp $(11; 2)$, $(2; 11)$, $(-11; -2)$, $(-2; -11)$.',
    },
    {
      problem:
        'Một mảnh đất hình chữ nhật có chu vi $34$ m và đường chéo dài $13$ m. Tính chiều dài và chiều rộng của mảnh đất.',
      steps: [
        'Gọi chiều dài, chiều rộng là $x$, $y$ (m), $x \\ge y > 0$. Nửa chu vi: $x + y = 17$.',
        'Theo định lí Pythagore: $x^2 + y^2 = 13^2 = 169$, nên $xy = \\dfrac{(x + y)^2 - (x^2 + y^2)}{2} = \\dfrac{289 - 169}{2} = 60$.',
        '$x$, $y$ là nghiệm của $t^2 - 17t + 60 = 0$; $\\Delta = 289 - 240 = 49$, $t_1 = \\dfrac{17 + 7}{2} = 12$, $t_2 = \\dfrac{17 - 7}{2} = 5$.',
      ],
      answer: 'Chiều dài $12$ m, chiều rộng $5$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Phương trình $\\sqrt{2}x^2 - (\\sqrt{2} + 1)x + 1 = 0$ có một nghiệm $x_1 = 1$. Nghiệm còn lại là',
      options: [
        '$\\dfrac{\\sqrt{2}}{2}$',
        '$-\\dfrac{\\sqrt{2}}{2}$',
        '$\\sqrt{2}$',
        '$\\sqrt{2} + 1$',
      ],
      answer: 0,
      hints: ['Kiểm tra $a + b + c = 0$.', 'Nghiệm còn lại là $x_2 = \\dfrac{c}{a}$.'],
      solution:
        '$a + b + c = \\sqrt{2} - \\sqrt{2} - 1 + 1 = 0$ nên $x_1 = 1$ và $x_2 = \\dfrac{c}{a} = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Nhẩm nghiệm của phương trình $2x^2 + (\\sqrt{3} - 1)x - 3 + \\sqrt{3} = 0$.',
      options: [
        '$x_1 = 1$, $x_2 = \\dfrac{\\sqrt{3} - 3}{2}$',
        '$x_1 = -1$, $x_2 = \\dfrac{3 - \\sqrt{3}}{2}$',
        '$x_1 = -1$, $x_2 = \\dfrac{\\sqrt{3} - 3}{2}$',
        '$x_1 = 1$, $x_2 = \\dfrac{3 + \\sqrt{3}}{2}$',
      ],
      answer: 1,
      hints: ['Tính $a + b + c$ và $a - b + c$; tổng nào bằng $0$?'],
      solution:
        '$a - b + c = 2 - (\\sqrt{3} - 1) + (-3 + \\sqrt{3}) = 0$ nên $x_1 = -1$, $x_2 = -\\dfrac{c}{a} = -\\dfrac{-3 + \\sqrt{3}}{2} = \\dfrac{3 - \\sqrt{3}}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình nào có hai nghiệm với tổng bằng $3$?',
      options: [
        '$x^2 - 3x + 5 = 0$',
        '$x^2 + 3x - 1 = 0$',
        '$2x^2 - 6x - 1 = 0$',
        '$3x^2 - x - 1 = 0$',
      ],
      answer: 2,
      hints: [
        'Tổng hai nghiệm là $-\\dfrac{b}{a}$, nhưng chỉ khi phương trình có nghiệm.',
        'Kiểm tra $\\Delta$ của phương trình đầu tiên.',
      ],
      solution:
        '$x^2 - 3x + 5 = 0$ có $\\Delta = 9 - 20 < 0$, vô nghiệm. $x^2 + 3x - 1 = 0$ có tổng $-3$; $3x^2 - x - 1 = 0$ có tổng $\\dfrac{1}{3}$. $2x^2 - 6x - 1 = 0$ có $ac < 0$ nên có hai nghiệm, tổng $\\dfrac{6}{2} = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $x^2 - 11x + 30 = 0$. Không giải phương trình, tính $x_1^2 + x_2^2$.',
      answer: 61,
      hints: ['$x_1 + x_2 = 11$, $x_1 x_2 = 30$.', '$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.'],
      solution:
        '$\\Delta = 121 - 120 = 1 > 0$. Theo định lí Viète: $x_1 + x_2 = 11$, $x_1 x_2 = 30$. $x_1^2 + x_2^2 = 11^2 - 2 \\cdot 30 = 61$.',
    },
    {
      type: 'number',
      prompt:
        'Với $x_1$, $x_2$ là hai nghiệm của phương trình $x^2 - 11x + 30 = 0$, tính $x_1^3 + x_2^3$ mà không giải phương trình.',
      answer: 341,
      hints: ['$x_1^3 + x_2^3 = (x_1 + x_2)^3 - 3x_1 x_2(x_1 + x_2)$.'],
      solution: '$x_1^3 + x_2^3 = 11^3 - 3 \\cdot 30 \\cdot 11 = 1331 - 990 = 341$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hai số $u$ và $v$ biết $u + v = 15$, $uv = 56$ và $u > v$. Nhập $u$.',
      answer: 8,
      hints: ['$u$, $v$ là hai nghiệm của $x^2 - 15x + 56 = 0$.'],
      solution:
        '$x^2 - 15x + 56 = 0$ có $\\Delta = 225 - 224 = 1$, hai nghiệm $\\dfrac{15 + 1}{2} = 8$ và $\\dfrac{15 - 1}{2} = 7$. Vì $u > v$ nên $u = 8$, $v = 7$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để phương trình $x^2 - 2x + m = 0$ có hai nghiệm $x_1$, $x_2$ thoả mãn $x_1^2 + x_2^2 = 10$.',
      answer: -3,
      hints: [
        'Theo định lí Viète, $x_1 + x_2 = 2$ và $x_1 x_2 = m$.',
        "Viết $x_1^2 + x_2^2$ theo $m$, rồi kiểm tra điều kiện $\\Delta' \\ge 0$.",
      ],
      solution:
        "Phương trình có nghiệm khi $\\Delta' = 1 - m \\ge 0$, tức $m \\le 1$. Khi đó $x_1^2 + x_2^2 = 2^2 - 2m = 4 - 2m = 10$, nên $m = -3$ (thoả mãn $m \\le 1$).",
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán bằng cách lập phương trình.',
      items: [
        'Giải phương trình vừa lập được.',
        'Chọn ẩn số và đặt điều kiện thích hợp cho ẩn.',
        'Kiểm tra nghiệm nào thoả mãn điều kiện của ẩn rồi trả lời.',
        'Biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết.',
        'Lập phương trình biểu thị mối quan hệ giữa các đại lượng.',
      ],
      answer: [1, 3, 4, 0, 2],
      hints: ['Phải có ẩn rồi mới lập được phương trình.', 'Bước kiểm tra điều kiện luôn ở cuối.'],
      solution:
        'Chọn ẩn và đặt điều kiện; biểu diễn các đại lượng theo ẩn; lập phương trình; giải phương trình; đối chiếu điều kiện rồi trả lời.',
    },
    {
      type: 'number',
      prompt:
        'Tìm hai số tự nhiên hơn kém nhau $5$ đơn vị, biết tích của chúng bằng $150$. Nhập số lớn hơn.',
      answer: 15,
      hints: ['Gọi số nhỏ là $x$ $(x \\in \\mathbb{N})$ thì số lớn là $x + 5$.'],
      solution:
        '$x(x + 5) = 150 \\Leftrightarrow x^2 + 5x - 150 = 0$; $\\Delta = 25 + 600 = 625$, $x_1 = \\dfrac{-5 + 25}{2} = 10$, $x_2 = \\dfrac{-5 - 25}{2} = -15$ (loại). Hai số là $10$ và $15$; số lớn hơn là $15$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc hộp hình hộp chữ nhật không nắp có đáy là hình vuông, chiều cao $10$ cm. Tổng diện tích xung quanh và diện tích đáy của hộp là $800$ cm². Tính độ dài cạnh đáy (làm tròn đến hàng phần mười của centimét).',
      answer: 14.6,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        'Gọi cạnh đáy là $x$ (cm), $x > 0$: diện tích đáy $x^2$, diện tích xung quanh $4 \\cdot 10x$.',
        "Giải $x^2 + 40x - 800 = 0$ bằng $\\Delta'$.",
      ],
      solution:
        "$x^2 + 40x = 800 \\Leftrightarrow x^2 + 40x - 800 = 0$; $\\Delta' = 20^2 + 800 = 1200$; $x_1 = -20 + \\sqrt{1200} \\approx 14{,}64$, $x_2 = -20 - \\sqrt{1200} < 0$ (loại). Cạnh đáy khoảng $14{,}6$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Quãng đường từ $A$ đến $B$ dài $36$ km. Lúc về, một người đi xe đạp tăng vận tốc thêm $3$ km/h nên thời gian về ít hơn thời gian đi $36$ phút. Tính vận tốc lúc đi.',
      answer: 12,
      unit: 'km/h',
      hints: [
        'Gọi vận tốc lúc đi là $x$ (km/h), $x > 0$; $36$ phút $= 0{,}6$ giờ.',
        'Lập phương trình $\\dfrac{36}{x} - \\dfrac{36}{x + 3} = 0{,}6$.',
      ],
      solution:
        '$\\dfrac{36}{x} - \\dfrac{36}{x + 3} = 0{,}6 \\Leftrightarrow \\dfrac{108}{x(x + 3)} = 0{,}6 \\Leftrightarrow x^2 + 3x - 180 = 0$; $\\Delta = 9 + 720 = 729$, $x_1 = \\dfrac{-3 + 27}{2} = 12$, $x_2 = -15$ (loại). Vận tốc lúc đi là $12$ km/h.',
    },
    {
      type: 'multi',
      prompt:
        'Một cửa hàng bán áo phông với giá $p = 100 - 0{,}02x$ (nghìn đồng), trong đó $x$ là số áo bán được; doanh thu là $R = x(100 - 0{,}02x)$ nghìn đồng. Cửa hàng cần bán bao nhiêu chiếc áo để doanh thu đạt $120$ triệu đồng? Chọn tất cả đáp số đúng.',
      options: [
        '$1\\,000$ chiếc',
        '$2\\,000$ chiếc',
        '$2\\,500$ chiếc',
        '$3\\,000$ chiếc',
        '$6\\,000$ chiếc',
      ],
      answers: [1, 3],
      hints: [
        '$120$ triệu đồng $= 120\\,000$ nghìn đồng.',
        'Đưa về $x^2 - 5\\,000x + 6\\,000\\,000 = 0$.',
      ],
      solution:
        "$x(100 - 0{,}02x) = 120\\,000 \\Leftrightarrow 0{,}02x^2 - 100x + 120\\,000 = 0 \\Leftrightarrow x^2 - 5\\,000x + 6\\,000\\,000 = 0$. $\\Delta' = 2\\,500^2 - 6\\,000\\,000 = 250\\,000$, $\\sqrt{\\Delta'} = 500$, nên $x = 3\\,000$ hoặc $x = 2\\,000$. Cả hai đều cho giá dương ($40$ và $60$ nghìn đồng), nên cửa hàng cần bán $2\\,000$ hoặc $3\\,000$ chiếc áo.",
    },
  ],
  takeaways: [
    'Trước khi dùng định lí Viète, kiểm tra phương trình có nghiệm ($\\Delta \\ge 0$, hoặc $ac < 0$).',
    'Biểu thức đối xứng của hai nghiệm luôn viết được theo $S = x_1 + x_2$ và $P = x_1 x_2$.',
    'Hai số có tổng $S$, tích $P$ là nghiệm của $x^2 - Sx + P = 0$.',
    'Giải bài toán bằng cách lập phương trình: luôn đối chiếu nghiệm với điều kiện của ẩn trước khi trả lời.',
  ],
};
