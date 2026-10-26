/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đại lượng y tỉ lệ nghịch với x khi y = a/x hay xy = a với a là hằng số khác 0; tích hai giá trị tương ứng luôn bằng hệ số tỉ lệ a. Vận dụng giải các bài toán tỉ lệ nghịch.',
  intro:
    'Một quãng đường dài $120$ km. Đi với vận tốc $40$ km/h thì hết $3$ giờ, với $60$ km/h thì hết $2$ giờ, với $120$ km/h thì chỉ $1$ giờ. Vận tốc tăng bao nhiêu lần thì thời gian giảm bấy nhiêu lần, còn tích vận tốc và thời gian luôn bằng $120$. Vận tốc và thời gian là hai đại lượng tỉ lệ nghịch.',
  objectives: [
    'Nhận biết hai đại lượng tỉ lệ nghịch qua công thức $y = \\frac{a}{x}$ hay $xy = a$ và tìm hệ số tỉ lệ.',
    'Hiểu và vận dụng các tính chất của hai đại lượng tỉ lệ nghịch.',
    'Giải bài toán tỉ lệ nghịch và phân biệt với bài toán tỉ lệ thuận.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Nếu đại lượng $y$ liên hệ với đại lượng $x$ theo công thức $y = \\frac{a}{x}$ hay $xy = a$ ($a$ là một hằng số khác $0$) thì ta nói $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: hình chữ nhật có diện tích $24$ cm$^2$, chiều dài $x$ (cm) và chiều rộng $y$ (cm) thoả mãn $xy = 24$, nên $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $24$. Thời gian $t$ (giờ) đi hết quãng đường $120$ km với vận tốc $v$ (km/h) là $t = \\frac{120}{v}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a$ thì $x$ cũng tỉ lệ nghịch với $y$ theo hệ số tỉ lệ $a$, vì $xy = a$ cũng là $yx = a$. Ta nói $x$ và $y$ là hai đại lượng tỉ lệ nghịch với nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'So sánh: tỉ lệ thuận thì thương $\\frac{y}{x}$ không đổi và hệ số của chiều ngược lại là $\\frac{1}{k}$; tỉ lệ nghịch thì tích $xy$ không đổi và hai chiều có cùng hệ số $a$.',
        },
      ],
    },
    {
      heading: 'Tính chất',
      blocks: [
        {
          type: 'p',
          text: 'Giả sử $y$ tỉ lệ nghịch với $x$ theo hệ số $a$. Với các giá trị $x_1, x_2, x_3, \\ldots$ khác $0$ của $x$, ta có các giá trị tương ứng $y_1 = \\frac{a}{x_1}$, $y_2 = \\frac{a}{x_2}$, $y_3 = \\frac{a}{x_3}, \\ldots$ của $y$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Nếu hai đại lượng tỉ lệ nghịch với nhau thì: tích hai giá trị tương ứng của chúng luôn không đổi và bằng hệ số tỉ lệ, $x_1y_1 = x_2y_2 = x_3y_3 = \\ldots = a$; tỉ số hai giá trị bất kì của đại lượng này bằng nghịch đảo của tỉ số hai giá trị tương ứng của đại lượng kia, $\\frac{x_1}{x_2} = \\frac{y_2}{y_1}$; $\\;\\frac{x_1}{x_3} = \\frac{y_3}{y_1}$; $\\ldots$',
        },
        {
          type: 'table',
          caption: 'Hình chữ nhật diện tích $24$ cm$^2$: chiều dài $x$ và chiều rộng $y$ (cm)',
          head: ['$x$', '$2$', '$3$', '$4$', '$6$', '$8$'],
          rows: [
            ['$y$', '$12$', '$8$', '$6$', '$4$', '$3$'],
            ['$xy$', '$24$', '$24$', '$24$', '$24$', '$24$'],
          ],
        },
        {
          type: 'p',
          text: 'Từ $x = 2$ lên $x = 6$ (gấp $3$ lần), $y$ giảm từ $12$ xuống $4$ (còn $\\frac{1}{3}$): $\\frac{2}{6} = \\frac{4}{12}$, đúng như tính chất $\\frac{x_1}{x_2} = \\frac{y_2}{y_1}$.',
        },
      ],
    },
    {
      heading: 'Bài toán về đại lượng tỉ lệ nghịch',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định hai đại lượng tỉ lệ nghịch (thường có một đại lượng thứ ba giữ không đổi, như quãng đường, khối lượng công việc, số tiền).',
            'Dùng tích không đổi $x_1y_1 = x_2y_2$, hoặc tỉ số nghịch đảo $\\frac{x_1}{x_2} = \\frac{y_2}{y_1}$, để lập đẳng thức.',
            'Tính đại lượng cần tìm rồi trả lời.',
          ],
        },
        {
          type: 'p',
          text: 'Nếu $x$, $y$, $z$ tỉ lệ nghịch với $m$, $n$, $p$ thì $mx = ny = pz$, tức là $x$, $y$, $z$ tỉ lệ thuận với $\\frac{1}{m}$, $\\frac{1}{n}$, $\\frac{1}{p}$: $\\frac{x}{1/m} = \\frac{y}{1/n} = \\frac{z}{1/p}$. Khi đó dùng tính chất của dãy tỉ số bằng nhau như ở Bài 21.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hình chữ nhật có diện tích không đổi',
    instruction:
      'Chọn diện tích rồi kéo đỉnh đỏ để đổi chiều dài $x$; chiều rộng $y$ tự thay đổi để diện tích giữ nguyên. Bấm "Ghi lại" vài lần để lập bảng giá trị: cột $x \\cdot y$ luôn bằng diện tích, và khi chiều dài gấp bao nhiêu lần thì chiều rộng giảm bấy nhiêu lần.',
  },
  examples: [
    {
      problem:
        'Cho biết $y$ tỉ lệ nghịch với $x$ và khi $x = 4$ thì $y = -6$. a) Tìm hệ số tỉ lệ. b) Biểu diễn $y$ theo $x$. c) Tính $y$ khi $x = 3$.',
      steps: [
        'a) Hệ số tỉ lệ $a = xy = 4 \\cdot (-6) = -24$.',
        'b) $y = \\frac{-24}{x}$.',
        'c) Khi $x = 3$: $y = \\frac{-24}{3} = -8$.',
      ],
      answer: '$a = -24$; $y = \\frac{-24}{x}$; $y = -8$ khi $x = 3$.',
    },
    {
      problem:
        'Một ô tô đi từ A đến B với vận tốc $40$ km/h thì hết $3$ giờ. Nếu đi với vận tốc $60$ km/h thì ô tô đi từ A đến B hết bao nhiêu giờ?',
      steps: [
        'Gọi thời gian cần tìm là $t$ (giờ). Trên cùng quãng đường AB, vận tốc và thời gian là hai đại lượng tỉ lệ nghịch.',
        'Tích không đổi: $60 \\cdot t = 40 \\cdot 3 = 120$.',
        '$t = 120 : 60 = 2$.',
      ],
      answer: 'Ô tô đi hết $2$ giờ.',
    },
    {
      problem:
        'Ba đội máy san đất làm ba khối lượng công việc như nhau. Đội thứ nhất hoàn thành công việc trong $4$ ngày, đội thứ hai trong $6$ ngày, đội thứ ba trong $8$ ngày. Hỏi mỗi đội có bao nhiêu máy, biết đội thứ nhất có nhiều hơn đội thứ hai $2$ máy (các máy có cùng năng suất)?',
      steps: [
        'Gọi số máy của ba đội là $x$, $y$, $z$. Cùng khối lượng công việc thì số máy tỉ lệ nghịch với số ngày: $4x = 6y = 8z$.',
        'Suy ra $\\frac{x}{\\frac{1}{4}} = \\frac{y}{\\frac{1}{6}} = \\frac{z}{\\frac{1}{8}} = \\frac{x - y}{\\frac{1}{4} - \\frac{1}{6}} = \\frac{2}{\\frac{1}{12}} = 24$.',
        '$x = 24 \\cdot \\frac{1}{4} = 6$; $y = 24 \\cdot \\frac{1}{6} = 4$; $z = 24 \\cdot \\frac{1}{8} = 3$.',
        'Thử lại: $4 \\cdot 6 = 6 \\cdot 4 = 8 \\cdot 3 = 24$ và $6 - 4 = 2$.',
      ],
      answer: 'Ba đội lần lượt có $6$, $4$ và $3$ máy.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho biết $y$ tỉ lệ nghịch với $x$ và khi $x = 2$ thì $y = 15$. Tìm hệ số tỉ lệ $a$.',
      answer: 30,
      hints: ['Hệ số tỉ lệ là tích $xy$.'],
      solution: '$a = xy = 2 \\cdot 15 = 30$.',
    },
    {
      type: 'number',
      prompt: 'Với $x$, $y$ như câu trên ($x = 2$ thì $y = 15$), tính $y$ khi $x = 6$.',
      answer: 5,
      hints: ['$y = \\frac{30}{x}$.'],
      solution: '$y = \\frac{30}{6} = 5$.',
    },
    {
      type: 'choice',
      prompt:
        'Nếu $x$ tỉ lệ nghịch với $y$ theo hệ số tỉ lệ $-3$ thì $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ',
      options: ['$-3$', '$3$', '$-\\frac{1}{3}$', '$\\frac{1}{3}$'],
      answer: 0,
      hints: ['Viết đẳng thức tích $xy = -3$ và đọc theo chiều ngược lại.'],
      solution:
        '$xy = -3$ cũng là $yx = -3$, nên $y$ tỉ lệ nghịch với $x$ theo cùng hệ số $-3$ (khác với tỉ lệ thuận, nơi hệ số đổi thành nghịch đảo).',
    },
    {
      type: 'choice',
      prompt: 'Bảng giá trị nào cho biết $x$ và $y$ là hai đại lượng tỉ lệ nghịch?',
      options: [
        '$x$: $1$; $2$; $4$ và $y$: $3$; $6$; $12$',
        '$x$: $2$; $3$; $4$ và $y$: $12$; $8$; $5$',
        '$x$: $1$; $2$; $4$ và $y$: $12$; $6$; $3$',
        '$x$: $1$; $3$; $5$ và $y$: $15$; $5$; $2$',
      ],
      answer: 2,
      hints: ['Tính các tích $xy$ trong mỗi bảng.'],
      solution:
        'Ở bảng thứ ba, $1 \\cdot 12 = 2 \\cdot 6 = 4 \\cdot 3 = 12$. Bảng thứ nhất có $\\frac{y}{x} = 3$ không đổi (tỉ lệ thuận); bảng thứ hai có các tích $24$; $24$; $20$; bảng thứ tư có $15$; $15$; $10$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp đại lượng nào sau đây tỉ lệ nghịch với nhau?',
      options: [
        'Quãng đường đi được và thời gian đi, khi vận tốc không đổi',
        'Vận tốc và thời gian đi hết một quãng đường cố định',
        'Số quyển vở mua được và số tiền phải trả, khi giá mỗi quyển không đổi',
        'Cạnh và chu vi của hình vuông',
      ],
      answer: 1,
      hints: ['Tìm cặp có tích không đổi.'],
      solution:
        'Với quãng đường $s$ cố định, $v \\cdot t = s$ không đổi nên vận tốc và thời gian tỉ lệ nghịch. Ba cặp còn lại có thương không đổi: $s = vt$, tiền $=$ giá $\\cdot$ số vở, chu vi $= 4 \\cdot$ cạnh, nên chúng tỉ lệ thuận.',
    },
    {
      type: 'number',
      prompt:
        '$12$ công nhân xây xong một ngôi nhà trong $30$ ngày. Hỏi $18$ công nhân (cùng năng suất) xây xong ngôi nhà đó trong bao nhiêu ngày?',
      answer: 20,
      unit: 'ngày',
      hints: [
        'Số công nhân và số ngày làm là hai đại lượng tỉ lệ nghịch.',
        '$18 \\cdot t = 12 \\cdot 30$.',
      ],
      solution:
        'Gọi số ngày cần tìm là $t$: $18t = 12 \\cdot 30 = 360$, nên $t = 360 : 18 = 20$ ngày.',
    },
    {
      type: 'number',
      prompt:
        'Với số tiền đủ mua $15$ quyển vở giá $8$ nghìn đồng một quyển, em mua được bao nhiêu quyển vở loại giá $12$ nghìn đồng một quyển?',
      answer: 10,
      hints: ['Với cùng số tiền, số vở mua được tỉ lệ nghịch với giá một quyển.'],
      solution:
        'Số tiền là $15 \\cdot 8 = 120$ nghìn đồng. Gọi số vở mua được là $n$: $12n = 120$, nên $n = 10$ quyển.',
    },
    {
      type: 'number',
      prompt:
        'Ba đội máy cày làm ba cánh đồng rộng như nhau. Đội thứ nhất cày xong trong $2$ ngày, đội thứ hai trong $3$ ngày, đội thứ ba trong $6$ ngày. Ba đội có tất cả $18$ máy cày cùng năng suất. Đội thứ nhất có bao nhiêu máy?',
      answer: 9,
      hints: [
        'Số máy tỉ lệ nghịch với số ngày: $2x = 3y = 6z$.',
        'Viết thành $\\frac{x}{\\frac{1}{2}} = \\frac{y}{\\frac{1}{3}} = \\frac{z}{\\frac{1}{6}}$ rồi dùng tổng $x + y + z = 18$.',
      ],
      solution:
        '$\\frac{x}{\\frac{1}{2}} = \\frac{y}{\\frac{1}{3}} = \\frac{z}{\\frac{1}{6}} = \\frac{x + y + z}{\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6}} = \\frac{18}{1} = 18$. Vậy $x = 18 \\cdot \\frac{1}{2} = 9$ máy (hai đội kia có $6$ và $3$ máy; thử lại $2 \\cdot 9 = 3 \\cdot 6 = 6 \\cdot 3$).',
    },
  ],
  takeaways: [
    '$y$ tỉ lệ nghịch với $x$ theo hệ số $a$ ($a \\ne 0$) khi $y = \\frac{a}{x}$ hay $xy = a$; khi đó $x$ cũng tỉ lệ nghịch với $y$ theo hệ số $a$.',
    'Tích hai giá trị tương ứng luôn không đổi: $x_1y_1 = x_2y_2 = \\ldots = a$.',
    'Tỉ số hai giá trị của đại lượng này bằng nghịch đảo tỉ số hai giá trị tương ứng của đại lượng kia: $\\frac{x_1}{x_2} = \\frac{y_2}{y_1}$.',
    '$x$, $y$, $z$ tỉ lệ nghịch với $m$, $n$, $p$ khi $mx = ny = pz$, tức là tỉ lệ thuận với $\\frac{1}{m}$, $\\frac{1}{n}$, $\\frac{1}{p}$.',
  ],
};
