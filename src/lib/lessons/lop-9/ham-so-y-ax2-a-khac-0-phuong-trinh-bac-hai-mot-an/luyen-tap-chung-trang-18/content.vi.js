/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: hàm số y = ax² và đồ thị parabol, phương trình bậc hai một ẩn, biệt thức Δ, công thức nghiệm và công thức nghiệm thu gọn.',
  intro:
    'Bài 18 và Bài 19 cho em hai công cụ gắn chặt với nhau: parabol $y = ax^2$ và phương trình bậc hai $ax^2 + bx + c = 0$. Bài luyện tập này giúp em tính giá trị, xác định hệ số $a$ từ một điểm của đồ thị, tính $\\Delta$ để biết số nghiệm và giải phương trình bậc hai một cách chắc chắn.',
  objectives: [
    'Tính giá trị của hàm số $y = ax^2$, tìm $a$ khi biết một điểm thuộc đồ thị.',
    "Tính $\\Delta$ hoặc $\\Delta'$ và kết luận số nghiệm của phương trình bậc hai.",
    'Giải phương trình bậc hai, kể cả các dạng khuyết $b$ hoặc khuyết $c$.',
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
              'Hàm số $y = ax^2$ $(a \\ne 0)$',
              'Xác định với mọi $x$; $x$ và $-x$ cho cùng giá trị $y$',
            ],
            [
              'Đồ thị',
              'Parabol đỉnh $O$, trục đối xứng $Oy$; $a > 0$: phía trên trục hoành; $a < 0$: phía dưới',
            ],
            ['Điểm thuộc đồ thị', '$M(x_0; y_0)$ thuộc đồ thị khi $y_0 = a x_0^2$'],
            ['Biệt thức', "$\\Delta = b^2 - 4ac$; khi $b = 2b'$: $\\Delta' = b'^2 - ac$"],
            [
              'Công thức nghiệm',
              '$\\Delta > 0$: $x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$; $\\Delta = 0$: $x_1 = x_2 = -\\dfrac{b}{2a}$; $\\Delta < 0$: vô nghiệm',
            ],
            [
              'Dạng đặc biệt',
              '$c = 0$: đặt nhân tử chung $x$; $b = 0$: đưa về $x^2 = -\\dfrac{c}{a}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: "Quên dấu ngoặc khi $b$ âm: $\\Delta$ của $x^2 - 5x + 6 = 0$ là $(-5)^2 - 24 = 1$, không phải $-25 - 24$. Quên chia cho $2a$ (hoặc cho $a$ khi dùng $\\Delta'$). Chia hai vế của $ax^2 + bx = 0$ cho $x$ làm mất nghiệm $x = 0$.",
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ ba kĩ năng. Đáp số là số nguyên hoặc số thập phân (dùng dấu phẩy).',
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
        'Cho hàm số $y = ax^2$ có đồ thị đi qua điểm $A(2; -2)$. Tìm $a$ và tìm các điểm thuộc đồ thị có tung độ bằng $-8$.',
      steps: [
        '$A(2; -2)$ thuộc đồ thị nên $-2 = a \\cdot 2^2$, suy ra $a = -\\dfrac{1}{2}$.',
        'Điểm có tung độ $-8$: $-\\dfrac{1}{2}x^2 = -8 \\Leftrightarrow x^2 = 16 \\Leftrightarrow x = 4$ hoặc $x = -4$.',
      ],
      answer: '$a = -\\dfrac{1}{2}$; hai điểm cần tìm là $(4; -8)$ và $(-4; -8)$.',
    },
    {
      problem: 'Giải phương trình $3x^2 - 2x - 5 = 0$.',
      steps: [
        "$a = 3$, $b = -2$ nên $b' = -1$, $c = -5$.",
        "$\\Delta' = (-1)^2 - 3 \\cdot (-5) = 16 > 0$, $\\sqrt{\\Delta'} = 4$.",
        '$x_1 = \\dfrac{1 + 4}{3} = \\dfrac{5}{3}$, $x_2 = \\dfrac{1 - 4}{3} = -1$.',
      ],
      answer: 'Phương trình có hai nghiệm $x_1 = \\dfrac{5}{3}$, $x_2 = -1$.',
    },
    {
      problem: 'Tìm hoành độ giao điểm của parabol $y = x^2$ và đường thẳng $y = x + 6$.',
      steps: [
        'Hoành độ giao điểm là nghiệm của phương trình $x^2 = x + 6$, tức $x^2 - x - 6 = 0$.',
        '$\\Delta = (-1)^2 - 4 \\cdot 1 \\cdot (-6) = 25$, $\\sqrt{\\Delta} = 5$.',
        '$x_1 = \\dfrac{1 + 5}{2} = 3$, $x_2 = \\dfrac{1 - 5}{2} = -2$.',
      ],
      answer: 'Hai giao điểm có hoành độ $3$ và $-2$, tức là $(3; 9)$ và $(-2; 4)$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho hàm số $y = -0{,}25x^2$. Tính giá trị của $y$ tại $x = 6$.',
      answer: -9,
      hints: ['$6^2 = 36$.'],
      solution: '$y = -0{,}25 \\cdot 6^2 = -0{,}25 \\cdot 36 = -9$.',
    },
    {
      type: 'fraction',
      prompt:
        'Đồ thị của hàm số $y = ax^2$ đi qua điểm $B(-2; -3)$. Tìm $a$ (nhập dưới dạng phân số).',
      answer: [-3, 4],
      hints: ['Thay $x = -2$, $y = -3$ vào $y = ax^2$.'],
      solution: '$-3 = a \\cdot (-2)^2 = 4a$, suy ra $a = -\\dfrac{3}{4}$.',
    },
    {
      type: 'choice',
      prompt: 'Parabol $y = ax^2$ đi qua điểm $A(2; -8)$. Khẳng định nào đúng?',
      options: [
        '$a = 2$, parabol nằm phía trên trục hoành',
        '$a = -2$, parabol nằm phía dưới trục hoành',
        '$a = -4$, parabol nằm phía dưới trục hoành',
        '$a = -2$, $O$ là điểm thấp nhất của parabol',
      ],
      answer: 1,
      hints: ['Tìm $a$ từ $-8 = a \\cdot 2^2$, rồi xét dấu của $a$.'],
      solution:
        '$-8 = 4a \\Rightarrow a = -2 < 0$: parabol nằm phía dưới trục hoành và $O$ là điểm cao nhất.',
    },
    {
      type: 'number',
      prompt: 'Tính biệt thức $\\Delta$ của phương trình $-x^2 + 4x + 5 = 0$.',
      answer: 36,
      hints: ['$a = -1$, $b = 4$, $c = 5$.'],
      solution: '$\\Delta = 4^2 - 4 \\cdot (-1) \\cdot 5 = 16 + 20 = 36$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $x^2 - 7x + 12 = 0$. Nhập nghiệm lớn hơn.',
      answer: 4,
      hints: ['$\\Delta = 49 - 48$.'],
      solution:
        '$\\Delta = (-7)^2 - 4 \\cdot 12 = 1$. $x_1 = \\dfrac{7 + 1}{2} = 4$, $x_2 = \\dfrac{7 - 1}{2} = 3$. Nghiệm lớn hơn là $4$.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $4x^2 + 12x + 9 = 0$ có nghiệm kép. Tìm nghiệm đó.',
      answer: -1.5,
      hints: ["$b' = 6$, $\\Delta' = 36 - 36 = 0$.", "Nghiệm kép $x = -\\dfrac{b'}{a}$."],
      solution:
        "$\\Delta' = 6^2 - 4 \\cdot 9 = 0$, nghiệm kép $x_1 = x_2 = -\\dfrac{6}{4} = -1{,}5$.",
    },
    {
      type: 'choice',
      prompt: 'Không giải phương trình, cho biết $2x^2 - 3x - 7 = 0$ có bao nhiêu nghiệm.',
      options: ['Vô nghiệm', 'Nghiệm kép', 'Hai nghiệm phân biệt', 'Chưa đủ dữ kiện để kết luận'],
      answer: 2,
      hints: ['Xét dấu của tích $ac$.'],
      solution:
        '$a = 2$ và $c = -7$ trái dấu nên $\\Delta = b^2 - 4ac > 0$: phương trình có hai nghiệm phân biệt.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để phương trình $x^2 - 2x + m = 0$ có một nghiệm bằng $3$.',
      answer: -3,
      hints: ['Thay $x = 3$ vào phương trình.'],
      solution:
        '$3^2 - 2 \\cdot 3 + m = 0 \\Leftrightarrow 3 + m = 0 \\Leftrightarrow m = -3$. Khi đó $x^2 - 2x - 3 = 0$ có hai nghiệm $3$ và $-1$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm hoành độ dương của giao điểm giữa parabol $y = 2x^2$ và đường thẳng $y = 3x + 2$.',
      answer: 2,
      hints: ['Giải phương trình $2x^2 = 3x + 2$.', '$2x^2 - 3x - 2 = 0$ có $\\Delta = 25$.'],
      solution:
        '$2x^2 - 3x - 2 = 0$, $\\Delta = 9 + 16 = 25$; $x_1 = \\dfrac{3 + 5}{4} = 2$, $x_2 = \\dfrac{3 - 5}{4} = -0{,}5$. Hoành độ dương là $2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $n$ biết tích của $n$ và số liền sau nó bằng $132$.',
      answer: 11,
      hints: ['$n(n + 1) = 132$ đưa về $n^2 + n - 132 = 0$.', '$\\Delta = 1 + 528 = 529 = 23^2$.'],
      solution:
        '$n^2 + n - 132 = 0$, $\\Delta = 529$, $\\sqrt{\\Delta} = 23$. $n_1 = \\dfrac{-1 + 23}{2} = 11$, $n_2 = \\dfrac{-1 - 23}{2} = -12$ (loại vì $n$ là số tự nhiên). Vậy $n = 11$.',
    },
  ],
  takeaways: [
    'Tìm $a$ của $y = ax^2$: thay toạ độ một điểm (khác $O$) của đồ thị vào công thức.',
    "Giải phương trình bậc hai: xác định $a$, $b$, $c$, tính $\\Delta$ (hay $\\Delta'$), xét dấu rồi dùng công thức nghiệm.",
    'Nếu $ac < 0$ thì phương trình luôn có hai nghiệm phân biệt.',
  ],
};
