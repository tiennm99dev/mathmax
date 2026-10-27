/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 6: hàm số y = ax² và parabol, phương trình bậc hai một ẩn, biệt thức Δ và công thức nghiệm, định lí Viète và giải bài toán thực tế bằng cách lập phương trình bậc hai.',
  intro:
    'Chương 6 đưa em từ đồ thị parabol $y = ax^2$ tới phương trình bậc hai $ax^2 + bx + c = 0$: cách giải bằng biệt thức $\\Delta$, mối liên hệ giữa nghiệm và hệ số qua định lí Viète, và ứng dụng vào các bài toán thực tế như diện tích, chuyển động, lãi suất. Bài ôn tập này hệ thống lại kiến thức của chương, kèm một bộ đề tự sinh có bản đồ kĩ năng tô màu theo từng bài để em biết phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá kiến thức về hàm số $y = ax^2$ $(a \\ne 0)$, phương trình bậc hai một ẩn và định lí Viète.',
    'Giải thành thạo phương trình bậc hai, kể cả phương trình có hệ số chứa căn.',
    'Vận dụng phương trình bậc hai để giải các bài toán thực tế.',
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
              'Bài 18',
              'Hàm số $y = ax^2$ $(a \\ne 0)$',
              'Đồ thị là parabol đỉnh $O$, nhận $Oy$ làm trục đối xứng; $a > 0$: nằm phía trên trục hoành, $O$ là điểm thấp nhất; $a < 0$: nằm phía dưới trục hoành, $O$ là điểm cao nhất',
            ],
            [
              'Bài 19',
              'Phương trình bậc hai một ẩn',
              '$ax^2 + bx + c = 0$ $(a \\ne 0)$; $\\Delta = b^2 - 4ac$: $\\Delta > 0$ hai nghiệm $x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$, $\\Delta = 0$ nghiệm kép $-\\dfrac{b}{2a}$, $\\Delta < 0$ vô nghiệm',
            ],
            [
              'Bài 19',
              'Công thức nghiệm thu gọn',
              "$b = 2b'$, $\\Delta' = b'^2 - ac$; $\\Delta' > 0$: $x_{1,2} = \\dfrac{-b' \\pm \\sqrt{\\Delta'}}{a}$",
            ],
            [
              'Bài 20',
              'Định lí Viète',
              '$x_1 + x_2 = -\\dfrac{b}{a}$, $x_1 x_2 = \\dfrac{c}{a}$; nhẩm nghiệm khi $a + b + c = 0$ hoặc $a - b + c = 0$; hai số có tổng $S$, tích $P$ là nghiệm của $x^2 - Sx + P = 0$',
            ],
            [
              'Bài 21',
              'Giải bài toán bằng cách lập phương trình',
              'Chọn ẩn và đặt điều kiện; lập phương trình; giải; chọn nghiệm thoả mãn điều kiện rồi trả lời',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Hai đồ thị $y = ax^2$ và $y = -ax^2$ đối xứng với nhau qua trục hoành. Điểm $M(x_0; y_0)$ thuộc đồ thị $y = ax^2$ khi và chỉ khi $y_0 = a x_0^2$; nhờ đó ta tìm được $a$ khi biết một điểm (khác $O$) của đồ thị.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Ba lỗi hay gặp',
          text: "Quên ngoặc khi $b$ âm lúc tính $\\Delta$; dùng định lí Viète cho phương trình vô nghiệm; nhận cả nghiệm làm cho đại lượng thực tế âm (độ dài, thời gian, vận tốc) hoặc không nguyên (số người, số sản phẩm). Với hệ số chứa căn như $5x^2 - 6\\sqrt{5}x + 2 = 0$, nên dùng $\\Delta'$ với $b' = -3\\sqrt{5}$.",
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới có $10$ câu tự sinh, hai câu cho mỗi kĩ năng trong bản đồ (Bài 19 có hai kĩ năng: biệt thức và giải phương trình). Đáp số là số nguyên hoặc số thập phân (dùng dấu phẩy). Bấm "Làm bộ đề mới" để có bộ khác.',
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
      problem:
        'Cho hàm số $y = ax^2$. Tìm $a$, biết đồ thị của hàm số đi qua điểm $A(3; 3)$. Lập bảng giá trị để vẽ đồ thị với giá trị $a$ vừa tìm được.',
      steps: [
        '$A(3; 3)$ thuộc đồ thị nên $3 = a \\cdot 3^2 = 9a$, suy ra $a = \\dfrac{1}{3}$.',
        'Bảng giá trị của $y = \\dfrac{1}{3}x^2$: $x = -3, -2, -1, 0, 1, 2, 3$ cho $y = 3, \\dfrac{4}{3}, \\dfrac{1}{3}, 0, \\dfrac{1}{3}, \\dfrac{4}{3}, 3$.',
        'Đồ thị là parabol đỉnh $O$, nhận $Oy$ làm trục đối xứng, nằm phía trên trục hoành (vì $a > 0$), đi qua $(-3; 3)$, $(3; 3)$.',
      ],
      answer:
        '$a = \\dfrac{1}{3}$; đồ thị là parabol đi qua $O$, $(\\pm 3; 3)$ và $\\left(\\pm 2; \\dfrac{4}{3}\\right)$.',
    },
    {
      problem: 'Giải phương trình $5x^2 - 6\\sqrt{5}x + 2 = 0$.',
      steps: [
        "$a = 5$, $b' = -3\\sqrt{5}$, $c = 2$.",
        "$\\Delta' = (-3\\sqrt{5})^2 - 5 \\cdot 2 = 45 - 10 = 35 > 0$, $\\sqrt{\\Delta'} = \\sqrt{35}$.",
        '$x_1 = \\dfrac{3\\sqrt{5} + \\sqrt{35}}{5}$, $x_2 = \\dfrac{3\\sqrt{5} - \\sqrt{35}}{5}$.',
      ],
      answer:
        'Phương trình có hai nghiệm $x_1 = \\dfrac{3\\sqrt{5} + \\sqrt{35}}{5}$, $x_2 = \\dfrac{3\\sqrt{5} - \\sqrt{35}}{5}$.',
    },
    {
      problem:
        'Bác Hương gửi tiết kiệm $100$ triệu đồng, kì hạn $12$ tháng. Hết kì hạn đầu, bác để nguyên cả gốc lẫn lãi và gửi thêm $50$ triệu đồng vào tài khoản đó, cũng kì hạn $12$ tháng. Hết kì hạn thứ hai, bác nhận được cả gốc lẫn lãi $176$ triệu đồng. Tính lãi suất một năm, biết lãi suất không đổi.',
      steps: [
        'Gọi lãi suất một năm là $x$ (viết dưới dạng số thập phân), $x > 0$.',
        'Sau năm thứ nhất, bác có $100(1 + x)$ triệu đồng; gửi thêm thành $100(1 + x) + 50 = 150 + 100x$ triệu đồng.',
        'Sau năm thứ hai: $(150 + 100x)(1 + x) = 176 \\Leftrightarrow 100x^2 + 250x - 26 = 0 \\Leftrightarrow 50x^2 + 125x - 13 = 0$.',
        '$\\Delta = 125^2 + 4 \\cdot 50 \\cdot 13 = 18\\,225$, $\\sqrt{\\Delta} = 135$; $x_1 = \\dfrac{-125 + 135}{100} = 0{,}1$, $x_2 = \\dfrac{-125 - 135}{100} = -2{,}6$ (loại).',
      ],
      answer: 'Lãi suất là $0{,}1 = 10\\%$ một năm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điểm nào sau đây thuộc đồ thị của hàm số $y = \\dfrac{1}{2}x^2$?',
      options: ['$(1; 2)$', '$(2; 1)$', '$(-1; 2)$', '$\\left(-1; \\dfrac{1}{2}\\right)$'],
      answer: 3,
      hints: ['Thay hoành độ vào công thức và so với tung độ.'],
      solution:
        'Tại $x = 1$ hoặc $x = -1$: $y = \\dfrac{1}{2}$; tại $x = 2$: $y = 2$. Chỉ có $\\left(-1; \\dfrac{1}{2}\\right)$ thuộc đồ thị.',
    },
    {
      type: 'choice',
      prompt: 'Cho hàm số $y = -3x^2$. Khẳng định nào đúng?',
      options: [
        'Đồ thị nằm phía trên trục hoành.',
        '$O$ là điểm cao nhất của đồ thị.',
        'Đồ thị nhận trục $Ox$ làm trục đối xứng.',
        'Đồ thị đi qua điểm $(1; 3)$.',
      ],
      answer: 1,
      hints: ['Xét dấu của hệ số $a = -3$.'],
      solution:
        '$a = -3 < 0$ nên đồ thị nằm phía dưới trục hoành, $O$ là điểm cao nhất, trục đối xứng là $Oy$; tại $x = 1$ thì $y = -3$, không phải $3$.',
    },
    {
      type: 'choice',
      prompt: 'Hai đồ thị $y = \\dfrac{5}{2}x^2$ và $y = -\\dfrac{5}{2}x^2$ đối xứng với nhau qua',
      options: ['trục hoành $Ox$', 'trục tung $Oy$', 'gốc toạ độ $O$', 'đường thẳng $y = x$'],
      answer: 0,
      hints: ['Với cùng một $x$, hai giá trị $y$ là hai số đối nhau.'],
      solution:
        'Điểm $(x; y)$ thuộc đồ thị thứ nhất khi và chỉ khi $(x; -y)$ thuộc đồ thị thứ hai, nên hai parabol đối xứng nhau qua trục hoành.',
    },
    {
      type: 'fraction',
      prompt: 'Đồ thị của hàm số $y = ax^2$ đi qua điểm $A(3; 3)$. Tìm $a$.',
      answer: [1, 3],
      hints: ['Thay $x = 3$, $y = 3$ vào $y = ax^2$.'],
      solution: '$3 = a \\cdot 3^2 = 9a$, suy ra $a = \\dfrac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $x^2 + 7x + 12 = 0$ là',
      options: ['$3$ và $4$', '$-3$ và $-4$', '$3$ và $-4$', '$-3$ và $4$'],
      answer: 1,
      hints: ['Hai nghiệm có tổng $-7$ và tích $12$.'],
      solution:
        '$\\Delta = 49 - 48 = 1$; $x_1 = \\dfrac{-7 + 1}{2} = -3$, $x_2 = \\dfrac{-7 - 1}{2} = -4$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình $2x^2 + 2\\sqrt{6}x + 3 = 0$',
      options: [
        'có nghiệm kép $x_1 = x_2 = -\\dfrac{\\sqrt{6}}{2}$',
        'có nghiệm kép $x_1 = x_2 = \\dfrac{\\sqrt{6}}{2}$',
        'có hai nghiệm phân biệt',
        'vô nghiệm',
      ],
      answer: 0,
      hints: ["$b' = \\sqrt{6}$; tính $\\Delta' = b'^2 - ac$."],
      solution:
        "$\\Delta' = (\\sqrt{6})^2 - 2 \\cdot 3 = 0$ nên phương trình có nghiệm kép $x_1 = x_2 = -\\dfrac{b'}{a} = -\\dfrac{\\sqrt{6}}{2}$.",
    },
    {
      type: 'choice',
      prompt: 'Phương trình nào nhận $x_1 = 13$ và $x_2 = 25$ làm hai nghiệm?',
      options: [
        '$x^2 - 13x + 25 = 0$',
        '$x^2 - 25x + 13 = 0$',
        '$x^2 - 38x + 325 = 0$',
        '$x^2 + 38x + 325 = 0$',
      ],
      answer: 2,
      hints: ['Tính tổng $S$ và tích $P$ của hai số, rồi lập $x^2 - Sx + P = 0$.'],
      solution: '$S = 13 + 25 = 38$, $P = 13 \\cdot 25 = 325$: phương trình $x^2 - 38x + 325 = 0$.',
    },
    {
      type: 'choice',
      prompt:
        'Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $x^2 - 5x + 6 = 0$. Giá trị của $A = x_1^2 + x_2^2$ là',
      options: ['$13$', '$19$', '$25$', '$5$'],
      answer: 0,
      hints: ['$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.'],
      solution: '$\\Delta = 1 > 0$; $x_1 + x_2 = 5$, $x_1 x_2 = 6$, nên $A = 25 - 12 = 13$.',
    },
    {
      type: 'choice',
      prompt:
        'Một hình chữ nhật có chu vi $20$ cm và diện tích $24$ cm². Chiều dài và chiều rộng của hình chữ nhật là',
      options: ['$5$ cm và $4$ cm', '$6$ cm và $4$ cm', '$8$ cm và $3$ cm', '$10$ cm và $2$ cm'],
      answer: 1,
      hints: ['Hai cạnh có tổng bằng nửa chu vi và tích bằng diện tích.'],
      solution:
        "Hai cạnh có tổng $10$, tích $24$, là nghiệm của $x^2 - 10x + 24 = 0$; $\\Delta' = 25 - 24 = 1$, nên hai cạnh là $6$ cm và $4$ cm.",
    },
    {
      type: 'multi',
      prompt:
        'Tìm hai số $u$, $v$ biết $u - v = 4$ và $uv = 77$. Chọn tất cả các cặp $(u; v)$ đúng.',
      options: ['$(11; 7)$', '$(7; 11)$', '$(-7; -11)$', '$(-11; -7)$'],
      answers: [0, 2],
      hints: [
        'Đặt $t = -v$ thì $u + t = 4$ và $ut = -77$.',
        '$u$ và $t$ là nghiệm của $x^2 - 4x - 77 = 0$.',
      ],
      solution:
        "Đặt $t = -v$: $u + t = 4$, $ut = -77$, nên $u$, $t$ là nghiệm của $x^2 - 4x - 77 = 0$; $\\Delta' = 4 + 77 = 81$, hai nghiệm là $11$ và $-7$. Nếu $u = 11$ thì $t = -7$, $v = 7$; nếu $u = -7$ thì $t = 11$, $v = -11$. Vậy $(u; v) = (11; 7)$ hoặc $(-7; -11)$.",
    },
    {
      type: 'number',
      prompt:
        'Các kĩ sư thường ước tính quãng đường an toàn tối thiểu để dừng xe trên đường cao tốc bằng công thức $d = 0{,}05v^2 + 1{,}1v$, trong đó $d$ (feet) là quãng đường dừng xe và $v$ (dặm/giờ) là vận tốc. Một ô tô dừng lại sau $300$ feet kể từ lúc phanh. Tính vận tốc của ô tô lúc phanh (làm tròn đến hàng phần mười).',
      answer: 67.2,
      tolerance: 0.06,
      hints: [
        'Giải phương trình $0{,}05v^2 + 1{,}1v - 300 = 0$ với $v > 0$.',
        '$\\Delta = 1{,}1^2 + 4 \\cdot 0{,}05 \\cdot 300 = 61{,}21$.',
      ],
      solution:
        '$0{,}05v^2 + 1{,}1v - 300 = 0$, $\\Delta = 1{,}21 + 60 = 61{,}21$; $v_1 = \\dfrac{-1{,}1 + \\sqrt{61{,}21}}{0{,}1} \\approx 67{,}2$, $v_2 < 0$ (loại). Ô tô chạy khoảng $67{,}2$ dặm/giờ.',
    },
    {
      type: 'number',
      prompt:
        'Học sinh khối 8 và khối 9 của một trường cùng làm một công việc thì hoàn thành sau $1$ giờ $12$ phút. Nếu làm riêng, khối 9 hoàn thành công việc nhanh hơn khối 8 là $1$ giờ. Hỏi nếu làm riêng thì khối 9 cần bao nhiêu giờ?',
      answer: 2,
      hints: [
        '$1$ giờ $12$ phút $= 1{,}2$ giờ $= \\dfrac{6}{5}$ giờ.',
        'Gọi thời gian khối 9 làm riêng là $x$ giờ; lập $\\dfrac{1}{x} + \\dfrac{1}{x + 1} = \\dfrac{5}{6}$.',
      ],
      solution:
        '$\\dfrac{1}{x} + \\dfrac{1}{x + 1} = \\dfrac{5}{6} \\Leftrightarrow 6(2x + 1) = 5x(x + 1) \\Leftrightarrow 5x^2 - 7x - 6 = 0$; $\\Delta = 49 + 120 = 169$, $x_1 = \\dfrac{7 + 13}{10} = 2$, $x_2 = \\dfrac{7 - 13}{10} = -0{,}6$ (loại). Khối 9 làm riêng cần $2$ giờ (khối 8 cần $3$ giờ).',
    },
  ],
  takeaways: [
    'Parabol $y = ax^2$: đỉnh $O$, trục đối xứng $Oy$; dấu của $a$ quyết định parabol "mở lên" hay "úp xuống".',
    "Giải phương trình bậc hai: xác định $a$, $b$, $c$, tính $\\Delta$ (hay $\\Delta'$), xét dấu rồi dùng công thức nghiệm.",
    'Định lí Viète cho tổng và tích hai nghiệm mà không cần giải; nhớ kiểm tra phương trình có nghiệm.',
    'Bài toán thực tế: đặt điều kiện cho ẩn, lập phương trình, giải và chọn nghiệm hợp lí.',
  ],
};
