/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình bậc hai một ẩn ax² + bx + c = 0 với a khác 0: giải các dạng đặc biệt, biệt thức Δ, công thức nghiệm và công thức nghiệm thu gọn.',
  intro:
    'Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng $3$ m và diện tích $40$ m². Gọi chiều rộng là $x$ (m), ta có $x(x + 3) = 40$, tức là $x^2 + 3x - 40 = 0$. Phương trình này chứa $x^2$ nên không phải phương trình bậc nhất. Bài này cho em cách giải mọi phương trình dạng đó.',
  objectives: [
    'Nhận biết phương trình bậc hai một ẩn và các hệ số $a$, $b$, $c$ của nó.',
    'Giải phương trình bậc hai dạng đặc biệt bằng cách đưa về phương trình tích hoặc dạng $(x + m)^2 = n$.',
    "Tính biệt thức $\\Delta$ (hoặc $\\Delta'$) và dùng công thức nghiệm để giải phương trình bậc hai.",
  ],
  sections: [
    {
      heading: 'Định nghĩa phương trình bậc hai một ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Phương trình bậc hai một ẩn (nói gọn là phương trình bậc hai) là phương trình có dạng $$ax^2 + bx + c = 0,$$ trong đó $x$ là ẩn; $a$, $b$, $c$ là những số cho trước gọi là các hệ số và $a \\ne 0$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $x^2 - 4x + 3 = 0$ $(a = 1, b = -4, c = 3)$; $-2x^2 + 5x = 0$ $(a = -2, b = 5, c = 0)$; $3x^2 - 12 = 0$ $(a = 3, b = 0, c = -12)$ đều là phương trình bậc hai. Phương trình $0x^2 + 2x - 1 = 0$ không phải phương trình bậc hai vì $a = 0$.',
        },
      ],
    },
    {
      heading: 'Giải phương trình bậc hai dạng đặc biệt',
      blocks: [
        {
          type: 'list',
          items: [
            'Khi $c = 0$: $ax^2 + bx = 0 \\Leftrightarrow x(ax + b) = 0 \\Leftrightarrow x = 0$ hoặc $x = -\\dfrac{b}{a}$.',
            'Khi $b = 0$: $ax^2 + c = 0 \\Leftrightarrow x^2 = -\\dfrac{c}{a}$; phương trình có hai nghiệm $\\pm\\sqrt{-\\dfrac{c}{a}}$ nếu $-\\dfrac{c}{a} > 0$, có nghiệm $x = 0$ nếu $c = 0$ và vô nghiệm nếu $-\\dfrac{c}{a} < 0$.',
            'Phương trình đưa được về dạng $(x + m)^2 = n$: nếu $n \\ge 0$ thì $x + m = \\pm\\sqrt{n}$; nếu $n < 0$ thì vô nghiệm.',
          ],
        },
        {
          type: 'p',
          text: 'Chẳng hạn $3x^2 - 12x = 0 \\Leftrightarrow 3x(x - 4) = 0$, nên $x = 0$ hoặc $x = 4$. Còn $x^2 - 4x + 1 = 0 \\Leftrightarrow x^2 - 4x + 4 = 3 \\Leftrightarrow (x - 2)^2 = 3$, nên $x = 2 + \\sqrt{3}$ hoặc $x = 2 - \\sqrt{3}$.',
        },
      ],
    },
    {
      heading: 'Công thức nghiệm của phương trình bậc hai',
      blocks: [
        {
          type: 'p',
          text: 'Biến đổi $ax^2 + bx + c = 0$ như trên (chia hai vế cho $a$ rồi thêm bớt để tạo bình phương), ta được $$\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{b^2 - 4ac}{4a^2}.$$ Vế phải có dấu của biểu thức $b^2 - 4ac$, nên số nghiệm phụ thuộc vào biểu thức này.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức nghiệm',
          text: 'Xét phương trình $ax^2 + bx + c = 0$ $(a \\ne 0)$ và biệt thức $\\Delta = b^2 - 4ac$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $\\Delta > 0$ thì phương trình có hai nghiệm phân biệt $x_1 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}$, $x_2 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}$.',
            'Nếu $\\Delta = 0$ thì phương trình có nghiệm kép $x_1 = x_2 = -\\dfrac{b}{2a}$.',
            'Nếu $\\Delta < 0$ thì phương trình vô nghiệm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu $a$ và $c$ trái dấu ($ac < 0$) thì $\\Delta = b^2 - 4ac > 0$, nên phương trình luôn có hai nghiệm phân biệt.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức nghiệm thu gọn',
          text: "Khi $b = 2b'$ (chẳng hạn $b$ chẵn), đặt $\\Delta' = b'^2 - ac$. Nếu $\\Delta' > 0$: hai nghiệm phân biệt $x_1 = \\dfrac{-b' + \\sqrt{\\Delta'}}{a}$, $x_2 = \\dfrac{-b' - \\sqrt{\\Delta'}}{a}$. Nếu $\\Delta' = 0$: nghiệm kép $x_1 = x_2 = -\\dfrac{b'}{a}$. Nếu $\\Delta' < 0$: vô nghiệm.",
        },
        {
          type: 'p',
          text: 'Ta cũng có thể giải phương trình bậc hai bằng máy tính cầm tay: chọn chương trình giải phương trình bậc hai, nhập lần lượt $a$, $b$, $c$ rồi đọc các nghiệm. Máy tính chỉ cho kết quả; khi trình bày lời giải, em vẫn cần tính $\\Delta$ và viết công thức nghiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biệt thức Δ và giao điểm của parabol với trục hoành',
    instruction:
      'Kéo các thanh trượt $a$, $b$, $c$. Nghiệm của $ax^2 + bx + c = 0$ là hoành độ giao điểm của parabol $y = ax^2 + bx + c$ với trục hoành: $\\Delta > 0$ cho hai giao điểm, $\\Delta = 0$ cho một điểm tiếp xúc, $\\Delta < 0$ thì parabol không chạm trục hoành. Làm lần lượt các thử thách.',
  },
  examples: [
    {
      problem: 'Giải phương trình $2x^2 - 5x + 3 = 0$.',
      steps: [
        'Các hệ số: $a = 2$, $b = -5$, $c = 3$.',
        '$\\Delta = (-5)^2 - 4 \\cdot 2 \\cdot 3 = 25 - 24 = 1 > 0$, $\\sqrt{\\Delta} = 1$.',
        'Phương trình có hai nghiệm phân biệt: $x_1 = \\dfrac{5 + 1}{2 \\cdot 2} = \\dfrac{3}{2}$, $x_2 = \\dfrac{5 - 1}{2 \\cdot 2} = 1$.',
      ],
      answer: 'Phương trình có hai nghiệm $x_1 = \\dfrac{3}{2}$, $x_2 = 1$.',
    },
    {
      problem: 'Giải phương trình $4x^2 - 4x + 1 = 0$.',
      steps: [
        '$a = 4$, $b = -4$, $c = 1$.',
        '$\\Delta = (-4)^2 - 4 \\cdot 4 \\cdot 1 = 16 - 16 = 0$.',
        'Phương trình có nghiệm kép $x_1 = x_2 = -\\dfrac{-4}{2 \\cdot 4} = \\dfrac{1}{2}$.',
      ],
      answer: 'Phương trình có nghiệm kép $x_1 = x_2 = \\dfrac{1}{2}$.',
    },
    {
      problem: 'Giải phương trình $x^2 - 6x + 4 = 0$ bằng công thức nghiệm thu gọn.',
      steps: [
        "$a = 1$, $b = -6$ nên $b' = -3$, $c = 4$.",
        "$\\Delta' = (-3)^2 - 1 \\cdot 4 = 5 > 0$.",
        '$x_1 = \\dfrac{3 + \\sqrt{5}}{1} = 3 + \\sqrt{5}$, $x_2 = 3 - \\sqrt{5}$.',
      ],
      answer: 'Phương trình có hai nghiệm $x_1 = 3 + \\sqrt{5}$, $x_2 = 3 - \\sqrt{5}$.',
    },
    {
      problem: 'Giải phương trình $3x^2 + 2x + 5 = 0$.',
      steps: [
        "$a = 3$, $b = 2$ nên $b' = 1$, $c = 5$.",
        "$\\Delta' = 1^2 - 3 \\cdot 5 = -14 < 0$.",
      ],
      answer: 'Phương trình vô nghiệm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phương trình nào dưới đây là phương trình bậc hai một ẩn?',
      options: [
        '$x^3 - 2x = 0$',
        '$0x^2 + 3x - 1 = 0$',
        '$-2x^2 + 5x = 0$',
        '$\\dfrac{1}{x^2} + x = 0$',
      ],
      answer: 2,
      hints: ['Dạng $ax^2 + bx + c = 0$ với $a \\ne 0$; $b$, $c$ được phép bằng $0$.'],
      solution:
        '$-2x^2 + 5x = 0$ có $a = -2 \\ne 0$, $b = 5$, $c = 0$. Phương trình $x^3 - 2x = 0$ có bậc ba, $0x^2 + 3x - 1 = 0$ có $a = 0$, còn $\\dfrac{1}{x^2} + x = 0$ có ẩn ở mẫu.',
    },
    {
      type: 'number',
      prompt: 'Tính biệt thức $\\Delta$ của phương trình $3x^2 - 7x + 2 = 0$.',
      answer: 25,
      hints: ['$\\Delta = b^2 - 4ac$ với $a = 3$, $b = -7$, $c = 2$.'],
      solution: '$\\Delta = (-7)^2 - 4 \\cdot 3 \\cdot 2 = 49 - 24 = 25$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình $x^2 + 2x + 5 = 0$ có bao nhiêu nghiệm?',
      options: ['Hai nghiệm phân biệt', 'Nghiệm kép', 'Vô nghiệm'],
      answer: 2,
      hints: ["Tính $\\Delta$ (hoặc $\\Delta'$) rồi xét dấu."],
      solution: "$\\Delta' = 1^2 - 1 \\cdot 5 = -4 < 0$, nên phương trình vô nghiệm.",
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $2x^2 + 3x - 2 = 0$. Nhập nghiệm lớn hơn (dạng số thập phân).',
      answer: 0.5,
      hints: [
        '$\\Delta = 3^2 - 4 \\cdot 2 \\cdot (-2)$.',
        '$\\Delta = 25$, $\\sqrt{\\Delta} = 5$.',
      ],
      solution:
        '$\\Delta = 9 + 16 = 25$. $x_1 = \\dfrac{-3 + 5}{4} = 0{,}5$, $x_2 = \\dfrac{-3 - 5}{4} = -2$. Nghiệm lớn hơn là $0{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Tìm nghiệm dương của phương trình $5x^2 - 20 = 0$.',
      answer: 2,
      hints: ['Đây là dạng $b = 0$: chuyển vế rồi chia cho $5$.'],
      solution:
        '$5x^2 = 20 \\Leftrightarrow x^2 = 4 \\Leftrightarrow x = 2$ hoặc $x = -2$. Nghiệm dương là $2$.',
    },
    {
      type: 'number',
      prompt: "Tính $\\Delta'$ của phương trình $x^2 - 8x + 7 = 0$.",
      answer: 9,
      hints: ["$b = -8$ nên $b' = -4$.", "$\\Delta' = b'^2 - ac$."],
      solution:
        "$b' = -4$, $\\Delta' = (-4)^2 - 1 \\cdot 7 = 9$. (Từ đó $x_1 = 4 + 3 = 7$, $x_2 = 4 - 3 = 1$.)",
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phương trình có hai nghiệm phân biệt.',
      options: [
        '$x^2 - 3x - 10 = 0$',
        '$2x^2 + x + 1 = 0$',
        '$-3x^2 + 2x + 7 = 0$',
        '$x^2 - 6x + 9 = 0$',
        '$4x^2 - 5x + 1 = 0$',
      ],
      answers: [0, 2, 4],
      hints: [
        'Phương trình có $a$, $c$ trái dấu luôn có hai nghiệm phân biệt.',
        'Các phương trình còn lại: tính $\\Delta$.',
      ],
      solution:
        "$x^2 - 3x - 10 = 0$ và $-3x^2 + 2x + 7 = 0$ có $ac < 0$. $2x^2 + x + 1 = 0$: $\\Delta = 1 - 8 = -7 < 0$. $x^2 - 6x + 9 = 0$: $\\Delta' = 9 - 9 = 0$ (nghiệm kép). $4x^2 - 5x + 1 = 0$: $\\Delta = 25 - 16 = 9 > 0$.",
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để phương trình $x^2 - 4x + m = 0$ có nghiệm kép.',
      answer: 4,
      hints: ["Nghiệm kép khi $\\Delta' = 0$.", "$\\Delta' = (-2)^2 - m$."],
      solution:
        "$\\Delta' = 4 - m = 0 \\Leftrightarrow m = 4$. Khi đó $x^2 - 4x + 4 = (x - 2)^2 = 0$ có nghiệm kép $x = 2$.",
    },
    {
      type: 'number',
      prompt:
        'Giải phương trình $x^2 - 2x - 1 = 0$. Nhập nghiệm dương, làm tròn đến hàng phần trăm.',
      answer: 2.41,
      tolerance: 0.005,
      hints: ["$b' = -1$, $\\Delta' = (-1)^2 - 1 \\cdot (-1)$.", '$\\sqrt{2} \\approx 1{,}414$.'],
      solution:
        "$\\Delta' = 1 + 1 = 2$, $x_1 = 1 + \\sqrt{2} \\approx 2{,}41$, $x_2 = 1 - \\sqrt{2} \\approx -0{,}41$. Nghiệm dương $\\approx 2{,}41$.",
    },
  ],
  takeaways: [
    'Phương trình bậc hai: $ax^2 + bx + c = 0$ với $a \\ne 0$.',
    '$\\Delta = b^2 - 4ac$: $\\Delta > 0$ hai nghiệm $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$; $\\Delta = 0$ nghiệm kép $-\\dfrac{b}{2a}$; $\\Delta < 0$ vô nghiệm.',
    "Khi $b = 2b'$: $\\Delta' = b'^2 - ac$ và $x = \\dfrac{-b' \\pm \\sqrt{\\Delta'}}{a}$.",
    '$a$ và $c$ trái dấu thì phương trình luôn có hai nghiệm phân biệt.',
  ],
};
