/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương VII: hệ thống hoá biểu thức đại số, đa thức một biến, các phép cộng, trừ, nhân, chia đa thức một biến, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương VII đi từ những biểu thức chứa chữ, biểu thức đại số, đến đa thức một biến và bốn phép tính trên đa thức. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ tô màu từng bài để chỉ ra phần em đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Biểu thức đại số và đa thức một biến.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: tính giá trị của biểu thức, thu gọn và sắp xếp đa thức, tìm bậc, hệ số, nghiệm, cộng, trừ, nhân, chia đa thức.',
    'Vận dụng đa thức để biểu diễn và giải các bài toán thực tế về diện tích, thể tích, giá tiền.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương VII',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 24. Biểu thức đại số',
              'Biểu thức số chỉ gồm các số nối với nhau bởi dấu phép tính; biểu thức đại số có thêm chữ (biến). Giá trị của biểu thức: thay mỗi biến bằng số đã cho rồi tính.',
            ],
            [
              'Bài 25. Đa thức một biến',
              'Đơn thức một biến có dạng $ax^n$; đa thức một biến là tổng các đơn thức của cùng một biến. Thu gọn, sắp xếp; bậc là số mũ cao nhất, hệ số cao nhất, hệ số tự do. $a$ là nghiệm của $P(x)$ khi $P(a) = 0$. Đa thức $0$ không có bậc.',
            ],
            [
              'Bài 26. Cộng, trừ đa thức',
              'Nhóm các hạng tử cùng bậc rồi cộng (trừ) hệ số; khi trừ, đổi dấu mọi hạng tử của đa thức bị trừ. Có thể đặt tính theo cột.',
            ],
            [
              'Bài 27. Nhân đa thức',
              '$ax^m \\cdot bx^n = abx^{m + n}$. Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia, cộng các tích rồi thu gọn.',
            ],
            [
              'Bài 28. Chia đa thức',
              '$ax^m : bx^n = \\frac{a}{b}x^{m - n}$ ($m \\ge n$). Đặt tính: chia, nhân, trừ, lặp lại. $A = B \\cdot Q + R$ với $R = 0$ hoặc bậc của $R$ nhỏ hơn bậc của $B$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mạch kiến thức',
          text: 'Mọi phép tính trên đa thức đều quy về các phép tính trên hệ số của những hạng tử cùng bậc. Cộng và trừ ghép các hạng tử cùng bậc; nhân tạo ra hạng tử mới bằng cách cộng số mũ; chia là phép ngược của nhân, nên luôn kiểm tra được bằng phép nhân.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Tìm bậc khi chưa thu gọn: $2x^4 + x - 2x^4$ có bậc $1$, không phải $4$.',
            'Thay số âm mà quên ngoặc: tại $x = -3$, $x^2 = (-3)^2 = 9$, còn $-x^2 = -9$.',
            'Trừ đa thức mà chỉ đổi dấu hạng tử đầu: $-(x^2 - 2x + 1) = -x^2 + 2x - 1$.',
            'Nhân lũy thừa mà nhân số mũ: $x^2 \\cdot x^3 = x^5$, không phải $x^6$.',
            'Bỏ sót tích khi nhân hai đa thức: $(x + 2)(x + 3)$ có $2 \\cdot 2 = 4$ tích hạng tử.',
            'Dừng phép chia quá sớm hoặc quá muộn: chỉ dừng khi dư bằng $0$ hoặc có bậc nhỏ hơn bậc của đa thức chia.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 10 câu, hai câu cho mỗi bài từ Bài 24 đến Bài 28, trộn ngẫu nhiên. Đáp số luôn là số nguyên. Bản đồ kĩ năng tô màu từng bài theo kết quả lần trả lời đầu tiên: xanh là đã vững, vàng là còn chỗ nhầm, đỏ là cần ôn lại bài đó.',
  },
  examples: [
    {
      problem:
        'Cho $P(x) = 3x^2 - 5x + 2x^3 - x^2 + 4$ và $Q(x) = -2x^3 + x^2 + 5x - 1$. Thu gọn $P(x)$, tính $P(x) + Q(x)$ và tìm nghiệm của tổng đó trong các số $-1$; $1$.',
      steps: [
        '$P(x) = 2x^3 + 2x^2 - 5x + 4$.',
        '$P(x) + Q(x) = (2x^3 - 2x^3) + (2x^2 + x^2) + (-5x + 5x) + (4 - 1) = 3x^2 + 3$.',
        'Tại $x = -1$ và $x = 1$ tổng đều bằng $3 + 3 = 6 \\ne 0$, nên cả hai số đều không phải là nghiệm.',
      ],
      answer: '$P(x) + Q(x) = 3x^2 + 3$; $-1$ và $1$ không là nghiệm.',
    },
    {
      problem:
        'Một mảnh đất hình vuông cạnh $x$ (m). Người ta tăng một cạnh thêm $3$ m và giảm cạnh kia $1$ m để được mảnh đất hình chữ nhật. Viết đa thức biểu thị phần diện tích tăng thêm.',
      steps: [
        'Diện tích mới: $(x + 3)(x - 1) = x^2 - x + 3x - 3 = x^2 + 2x - 3$.',
        'Diện tích cũ: $x^2$.',
        'Phần tăng thêm: $x^2 + 2x - 3 - x^2 = 2x - 3$ (m$^2$).',
      ],
      answer: 'Diện tích tăng thêm $2x - 3$ (m$^2$), chẳng hạn $17$ m$^2$ khi $x = 10$.',
    },
    {
      problem: 'Tìm thương và dư khi chia $x^3 - 2x + 4$ cho $x - 2$.',
      steps: [
        '$x^3 : x = x^2$; $\\;x^2(x - 2) = x^3 - 2x^2$; dư thứ nhất: $2x^2 - 2x + 4$.',
        '$2x^2 : x = 2x$; $\\;2x(x - 2) = 2x^2 - 4x$; dư thứ hai: $2x + 4$.',
        '$2x : x = 2$; $\\;2(x - 2) = 2x - 4$; dư cuối cùng: $8$.',
      ],
      answer: 'Thương $x^2 + 2x + 2$, dư $8$: $x^3 - 2x + 4 = (x - 2)(x^2 + 2x + 2) + 8$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biểu thức nào dưới đây là biểu thức số?',
      options: ['$2 \\cdot 3 + 5^2$', '$2x + 3$', '$a^2 - b$', '$3(x - 1)$'],
      answer: 0,
      hints: ['Biểu thức số không chứa chữ.'],
      solution: 'Chỉ $2 \\cdot 3 + 5^2$ gồm các số và dấu phép tính; ba biểu thức kia chứa biến.',
    },
    {
      type: 'choice',
      prompt:
        'Một hình chữ nhật có chiều rộng $x$ (cm) và chiều dài hơn chiều rộng $3$ cm. Biểu thức biểu thị chu vi của hình chữ nhật là',
      options: ['$4x + 6$', '$2x + 3$', '$x(x + 3)$', '$4x + 3$'],
      answer: 0,
      hints: ['Chiều dài là $x + 3$; chu vi bằng hai lần tổng chiều dài và chiều rộng.'],
      solution:
        'Chu vi bằng $2(x + x + 3) = 2(2x + 3) = 4x + 6$ (cm). Còn $x(x + 3)$ là diện tích.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^2 - 2xy + y$ tại $x = -1$ và $y = 2$.',
      answer: 7,
      hints: ['$x^2 = (-1)^2 = 1$; $\\;-2xy = -2 \\cdot (-1) \\cdot 2$.'],
      solution: '$(-1)^2 - 2 \\cdot (-1) \\cdot 2 + 2 = 1 + 4 + 2 = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $P(x) = 5x^3 - 2x^4 + x - 3 + 2x^4$.',
      answer: 3,
      hints: ['Thu gọn trước khi tìm bậc.'],
      solution: '$-2x^4 + 2x^4 = 0$, nên $P(x) = 5x^3 + x - 3$, có bậc $3$.',
    },
    {
      type: 'text',
      prompt: 'Đa thức nào không có bậc?',
      accept: ['0', 'đa thức 0', 'đa thức không', 'không'],
      hints: ['Đó là đa thức có mọi hệ số đều bằng $0$.'],
      solution: 'Đa thức $0$ (đa thức không) không có bậc.',
    },
    {
      type: 'multi',
      prompt: 'Trong các số $0$; $1$; $2$; $3$, những số nào là nghiệm của đa thức $x^2 - 4x + 3$?',
      options: ['$0$', '$1$', '$2$', '$3$'],
      answers: [1, 3],
      hints: ['Tính giá trị của đa thức tại từng số; nghiệm làm đa thức bằng $0$.'],
      solution:
        'Tại $0$: $3$; tại $1$: $1 - 4 + 3 = 0$; tại $2$: $4 - 8 + 3 = -1$; tại $3$: $9 - 12 + 3 = 0$. Nghiệm là $1$ và $3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm nghiệm của đa thức $P(x) = 2x - 6$.',
      answer: 3,
      hints: ['Giải $2x - 6 = 0$.'],
      solution: '$2x - 6 = 0$ khi $2x = 6$, tức $x = 3$. Kiểm tra: $P(3) = 6 - 6 = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $P(x) = 2x^3 - x^2 + 4$ và $Q(x) = x^3 + 3x^2 - x$. Hiệu $P(x) - Q(x)$ bằng',
      options: [
        '$x^3 - 4x^2 + x + 4$',
        '$x^3 + 2x^2 - x + 4$',
        '$x^3 - 4x^2 - x + 4$',
        '$3x^3 + 2x^2 - x + 4$',
      ],
      answer: 0,
      hints: ['Đổi dấu mọi hạng tử của $Q(x)$, kể cả $-x$.'],
      solution: '$2x^3 - x^2 + 4 - x^3 - 3x^2 + x = x^3 - 4x^2 + x + 4$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm đa thức $R(x)$ sao cho $R(x) + (x^2 - 2x) = 3x^2 + x - 1$. Hệ số của $x$ trong $R(x)$ là bao nhiêu?',
      answer: 3,
      hints: ['$R(x) = (3x^2 + x - 1) - (x^2 - 2x)$.'],
      solution: '$R(x) = 3x^2 + x - 1 - x^2 + 2x = 2x^2 + 3x - 1$. Hệ số của $x$ là $3$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép nhân $(3x - 2)(2x + 5)$ là',
      options: ['$6x^2 + 11x - 10$', '$6x^2 - 11x - 10$', '$6x^2 + 19x - 10$', '$6x^2 - 10$'],
      answer: 0,
      hints: ['Hai tích cho hạng tử bậc $1$ là $3x \\cdot 5$ và $(-2) \\cdot 2x$.'],
      solution: '$6x^2 + 15x - 4x - 10 = 6x^2 + 11x - 10$.',
    },
    {
      type: 'number',
      prompt: 'Thực hiện phép chia $(x^4 - 1) : (x^2 + 1)$. Hệ số tự do của thương là bao nhiêu?',
      answer: -1,
      hints: ['$x^4 : x^2 = x^2$; tính dư thứ nhất rồi chia tiếp.'],
      solution:
        '$x^2(x^2 + 1) = x^4 + x^2$, dư $-x^2 - 1$; $\\;-1 \\cdot (x^2 + 1) = -x^2 - 1$, dư $0$. Thương $x^2 - 1$, hệ số tự do $-1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm dư khi chia $x^3 - 2x + 4$ cho $x - 2$.',
      answer: 8,
      hints: [
        'Đặt tính, để trống cột bậc $2$ của $x^3 - 2x + 4$.',
        'Thương có ba hạng tử: $x^2$, $2x$, $2$.',
      ],
      solution:
        '$x^3 - 2x + 4 = (x - 2)(x^2 + 2x + 2) + 8$. Kiểm tra: $(x - 2)(x^2 + 2x + 2) = x^3 - 2x - 4$, cộng $8$ được $x^3 - 2x + 4$. Dư bằng $8$.',
    },
    {
      type: 'number',
      prompt:
        'Mảnh đất hình vuông cạnh $x$ (m) được tăng một cạnh thêm $3$ m và giảm cạnh kia $1$ m. Khi $x = 10$, diện tích tăng thêm bao nhiêu mét vuông?',
      answer: 17,
      unit: 'm²',
      hints: ['Diện tích mới là $(x + 3)(x - 1)$; trừ đi diện tích cũ $x^2$.'],
      solution:
        '$(x + 3)(x - 1) - x^2 = x^2 + 2x - 3 - x^2 = 2x - 3$. Khi $x = 10$: $2 \\cdot 10 - 3 = 17$ (m$^2$). Kiểm tra: $13 \\cdot 9 - 100 = 17$.',
    },
  ],
  takeaways: [
    'Thu gọn đa thức trước khi tìm bậc, hệ số và trước khi tính toán.',
    'Cộng, trừ: gộp các hạng tử cùng bậc; khi trừ, đổi dấu mọi hạng tử của đa thức bị trừ.',
    'Nhân: từng hạng tử với từng hạng tử, cộng số mũ. Chia: chia, nhân, trừ, lặp lại; $A = B \\cdot Q + R$.',
    'Kiểm tra kết quả bằng cách thay một giá trị của $x$ vào hai vế, hoặc nhân ngược lại sau phép chia.',
  ],
};
