/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương VI: hệ thống hoá tỉ lệ thức, tính chất của dãy tỉ số bằng nhau, đại lượng tỉ lệ thuận và đại lượng tỉ lệ nghịch, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương VI bắt đầu từ một đẳng thức giữa hai tỉ số, tỉ lệ thức, rồi mở rộng thành dãy tỉ số bằng nhau và dùng chúng để giải các bài toán về hai đại lượng tỉ lệ thuận, tỉ lệ nghịch trong đời sống. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Tỉ lệ thức và đại lượng tỉ lệ.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: tìm số hạng chưa biết của tỉ lệ thức, tìm các số theo dãy tỉ số bằng nhau, tìm hệ số tỉ lệ và giá trị tương ứng.',
    'Vận dụng đại lượng tỉ lệ thuận, tỉ lệ nghịch và bài toán chia tỉ lệ để giải các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương VI',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 20. Tỉ lệ thức',
              'Tỉ lệ thức là đẳng thức của hai tỉ số $\\frac{a}{b} = \\frac{c}{d}$ (hay $a : b = c : d$); $a$, $d$ là ngoại tỉ, $b$, $c$ là trung tỉ. Nếu $\\frac{a}{b} = \\frac{c}{d}$ thì $ad = bc$. Nếu $ad = bc$ ($a, b, c, d \\ne 0$) thì lập được bốn tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$, $\\frac{a}{c} = \\frac{b}{d}$, $\\frac{d}{b} = \\frac{c}{a}$, $\\frac{d}{c} = \\frac{b}{a}$.',
            ],
            [
              'Bài 21. Tính chất của dãy tỉ số bằng nhau',
              '$\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f} = \\frac{a + c + e}{b + d + f} = \\frac{a - c + e}{b - d + f}$ (các tỉ số có nghĩa). $a : b : c = m : n : p$ nghĩa là $\\frac{a}{m} = \\frac{b}{n} = \\frac{c}{p}$.',
            ],
            [
              'Bài 22. Đại lượng tỉ lệ thuận',
              '$y = kx$ ($k \\ne 0$); $x$ tỉ lệ thuận với $y$ theo hệ số $\\frac{1}{k}$. $\\frac{y_1}{x_1} = \\frac{y_2}{x_2} = \\ldots = k$ và $\\frac{x_1}{x_2} = \\frac{y_1}{y_2}$.',
            ],
            [
              'Bài 23. Đại lượng tỉ lệ nghịch',
              '$y = \\frac{a}{x}$ hay $xy = a$ ($a \\ne 0$); $x$ tỉ lệ nghịch với $y$ theo cùng hệ số $a$. $x_1y_1 = x_2y_2 = \\ldots = a$ và $\\frac{x_1}{x_2} = \\frac{y_2}{y_1}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mạch kiến thức',
          text: 'Tỉ lệ thức và dãy tỉ số bằng nhau là công cụ; đại lượng tỉ lệ thuận, tỉ lệ nghịch là nơi dùng công cụ đó. Bài toán tỉ lệ thuận dẫn tới $\\frac{x}{m} = \\frac{y}{n}$; bài toán tỉ lệ nghịch dẫn tới $mx = ny$, tức là $\\frac{x}{\\frac{1}{m}} = \\frac{y}{\\frac{1}{n}}$.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Nhân chéo sai: từ $\\frac{a}{b} = \\frac{c}{d}$ suy ra $ad = bc$, không phải $ac = bd$.',
            'Lấy hiệu mà đổi thứ tự ở mẫu: $\\frac{x}{3} = \\frac{y}{5}$ và $y - x = 14$ thì dùng $\\frac{y - x}{5 - 3}$, không dùng $\\frac{y - x}{3 - 5}$.',
            'Quên đổi hệ số: với tổng $2x + 3y - z$ cần viết $\\frac{2x}{4} = \\frac{3y}{9} = \\frac{z}{4}$ trước khi cộng.',
            'Nhầm loại tỉ lệ: cùng quãng đường thì vận tốc tăng, thời gian giảm (tỉ lệ nghịch); không được lập $\\frac{v_1}{t_1} = \\frac{v_2}{t_2}$.',
            'Chia tỉ lệ nghịch với $2$; $3$; $4$ mà chia theo $2 : 3 : 4$: phải chia theo $\\frac{1}{2} : \\frac{1}{3} : \\frac{1}{4} = 6 : 4 : 3$.',
            'Nhầm hệ số của chiều ngược lại: tỉ lệ thuận đổi thành $\\frac{1}{k}$, tỉ lệ nghịch giữ nguyên $a$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 10 câu, hai câu cho mỗi kĩ năng: Bài 20, Bài 21, Bài 22, Bài 23 và vận dụng thực tế. Đáp số luôn là số nguyên; nhập số âm với dấu trừ, ví dụ $-7$. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu, để em biết cần ôn lại bài nào.',
  },
  examples: [
    {
      problem: 'Tìm hai số $x$, $y$, biết $3x = 5y$ và $x + y = 32$.',
      steps: [
        'Từ $3x = 5y$ lập được tỉ lệ thức $\\frac{x}{5} = \\frac{y}{3}$.',
        'Theo tính chất của dãy tỉ số bằng nhau: $\\frac{x}{5} = \\frac{y}{3} = \\frac{x + y}{5 + 3} = \\frac{32}{8} = 4$.',
        '$x = 5 \\cdot 4 = 20$; $y = 3 \\cdot 4 = 12$. Thử lại: $3 \\cdot 20 = 5 \\cdot 12 = 60$ và $20 + 12 = 32$.',
      ],
      answer: '$x = 20$, $y = 12$.',
    },
    {
      problem:
        'Một người đi xe đạp từ nhà đến thư viện với vận tốc $15$ km/h hết $2$ giờ. Lúc về, người đó đi với vận tốc $20$ km/h. Hỏi thời gian về là bao nhiêu giờ?',
      steps: [
        'Quãng đường đi và về như nhau, nên vận tốc và thời gian là hai đại lượng tỉ lệ nghịch.',
        'Gọi thời gian về là $t$ (giờ): $15 \\cdot 2 = 20 \\cdot t$.',
        '$t = \\frac{30}{20} = 1{,}5$ (giờ).',
      ],
      answer: 'Thời gian về là $1{,}5$ giờ (1 giờ 30 phút).',
    },
    {
      problem:
        'Số học sinh ba lớp 7A, 7B, 7C lần lượt là $40$, $42$, $48$. Ba lớp trồng được $260$ cây, số cây mỗi lớp trồng tỉ lệ thuận với số học sinh. Tính số cây mỗi lớp trồng được.',
      steps: [
        'Gọi số cây ba lớp trồng là $a$, $b$, $c$: $\\frac{a}{40} = \\frac{b}{42} = \\frac{c}{48}$ và $a + b + c = 260$.',
        '$\\frac{a}{40} = \\frac{b}{42} = \\frac{c}{48} = \\frac{a + b + c}{40 + 42 + 48} = \\frac{260}{130} = 2$.',
        '$a = 80$, $b = 84$, $c = 96$. Thử lại: $80 + 84 + 96 = 260$.',
      ],
      answer: 'Lớp 7A trồng $80$ cây, lớp 7B trồng $84$ cây, lớp 7C trồng $96$ cây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nếu $\\frac{a}{b} = \\frac{c}{d}$ ($b, d \\ne 0$) thì',
      options: ['$ac = bd$', '$ad = bc$', '$ab = cd$', '$a + d = b + c$'],
      answer: 1,
      hints: ['Tích hai ngoại tỉ bằng tích hai trung tỉ.'],
      solution:
        'Ngoại tỉ là $a$, $d$; trung tỉ là $b$, $c$. Nhân hai vế với $bd$ ta được $ad = bc$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{x}{-4} = \\frac{9}{6}$.',
      answer: -6,
      hints: ['Nhân chéo: $6x = (-4) \\cdot 9$.'],
      solution: '$6x = (-4) \\cdot 9 = -36$, nên $x = \\frac{-36}{6} = -6$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $2{,}5 : x = 7{,}5 : 0{,}9$.',
      answer: 0.3,
      tolerance: 0.0001,
      hints: ['$x$ là một trung tỉ.', 'Tích hai ngoại tỉ: $2{,}5 \\cdot 0{,}9$.'],
      solution: '$7{,}5 \\cdot x = 2{,}5 \\cdot 0{,}9 = 2{,}25$, nên $x = 2{,}25 : 7{,}5 = 0{,}3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{x}{3} = \\frac{y}{5}$ và $y - x = 14$.',
      answer: 21,
      hints: ['$\\frac{x}{3} = \\frac{y}{5} = \\frac{y - x}{5 - 3}$.'],
      solution:
        '$\\frac{x}{3} = \\frac{y}{5} = \\frac{y - x}{5 - 3} = \\frac{14}{2} = 7$, nên $x = 21$ (và $y = 35$).',
    },
    {
      type: 'number',
      prompt: 'Cho $\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{4}$ và $2x + 3y - z = 36$. Tính $y$.',
      answer: 12,
      hints: [
        'Viết $\\frac{x}{2} = \\frac{2x}{4}$ và $\\frac{y}{3} = \\frac{3y}{9}$.',
        '$\\frac{2x}{4} = \\frac{3y}{9} = \\frac{z}{4} = \\frac{2x + 3y - z}{4 + 9 - 4}$.',
      ],
      solution:
        '$\\frac{2x}{4} = \\frac{3y}{9} = \\frac{z}{4} = \\frac{36}{9} = 4$, nên $x = 8$, $y = 12$, $z = 16$. Thử lại: $16 + 36 - 16 = 36$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho biết $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $3$. Khi đó $x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ',
      options: ['$3$', '$-3$', '$\\frac{1}{3}$', '$-\\frac{1}{3}$'],
      answer: 2,
      hints: ['Từ $y = 3x$, hãy biểu diễn $x$ theo $y$.'],
      solution: 'Từ $y = 3x$ suy ra $x = \\frac{1}{3}y$, nên hệ số tỉ lệ là $\\frac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho biết $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $5$. Khi đó $x$ tỉ lệ nghịch với $y$ theo hệ số tỉ lệ',
      options: ['$5$', '$\\frac{1}{5}$', '$-5$', '$25$'],
      answer: 0,
      hints: ['$xy = 5$ cũng chính là $yx = 5$.'],
      solution:
        'Từ $xy = 5$ ta có $x = \\frac{5}{y}$, nên $x$ tỉ lệ nghịch với $y$ theo cùng hệ số tỉ lệ $5$.',
    },
    {
      type: 'number',
      prompt:
        'Số đo ba góc của một tam giác tỉ lệ với $2$; $3$; $4$. Số đo góc lớn nhất là bao nhiêu độ?',
      answer: 80,
      hints: [
        'Tổng ba góc của một tam giác bằng $180^\\circ$.',
        '$\\frac{A}{2} = \\frac{B}{3} = \\frac{C}{4} = \\frac{180^\\circ}{2 + 3 + 4}$.',
      ],
      solution:
        '$\\frac{\\widehat{A}}{2} = \\frac{\\widehat{B}}{3} = \\frac{\\widehat{C}}{4} = \\frac{180^\\circ}{9} = 20^\\circ$, nên ba góc là $40^\\circ$, $60^\\circ$, $80^\\circ$. Góc lớn nhất là $80^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Để làm xong một công việc trong $8$ giờ cần $30$ công nhân. Nếu có thêm $10$ công nhân nữa (năng suất như nhau) thì thời gian làm xong công việc đó giảm được bao nhiêu giờ?',
      answer: 2,
      hints: [
        'Số công nhân và thời gian làm xong cùng một công việc tỉ lệ nghịch.',
        'Có $40$ công nhân thì $30 \\cdot 8 = 40 \\cdot t$.',
      ],
      solution:
        'Với $40$ công nhân: $t = \\frac{30 \\cdot 8}{40} = 6$ giờ. Thời gian giảm được $8 - 6 = 2$ giờ.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có chiều dài $12$ m, chiều rộng $5$ m. Giữ nguyên diện tích, nếu chiều dài là $15$ m thì chiều rộng là bao nhiêu mét?',
      answer: 4,
      hints: ['Diện tích không đổi nên chiều dài và chiều rộng tỉ lệ nghịch.'],
      solution: '$12 \\cdot 5 = 15 \\cdot b$, nên $b = \\frac{60}{15} = 4$ m.',
    },
    {
      type: 'number',
      prompt: 'Chia số $210$ thành ba phần tỉ lệ nghịch với $3$; $5$; $6$. Tìm phần thứ hai.',
      answer: 60,
      hints: [
        'Đặt $3x = 5y = 6z = c$.',
        '$x + y + z = c\\left(\\frac{1}{3} + \\frac{1}{5} + \\frac{1}{6}\\right) = \\frac{21c}{30}$.',
      ],
      solution:
        '$\\frac{21c}{30} = 210$ nên $c = 300$. Ba phần là $\\frac{300}{3} = 100$, $\\frac{300}{5} = 60$, $\\frac{300}{6} = 50$ (thử lại $100 + 60 + 50 = 210$). Phần thứ hai là $60$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cặp đại lượng với mối quan hệ đúng của chúng.',
      left: [
        'Quãng đường và thời gian đi (vận tốc không đổi)',
        'Vận tốc và thời gian đi hết một quãng đường cố định',
        'Diện tích và độ dài cạnh của hình vuông',
      ],
      right: ['Tỉ lệ nghịch', 'Không phải hai đại lượng tỉ lệ', 'Tỉ lệ thuận'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: [
        'Viết công thức: $s = vt$, $t = \\frac{s}{v}$, $S = a^2$.',
        'Dạng $y = kx$ là tỉ lệ thuận, dạng $xy = a$ là tỉ lệ nghịch.',
      ],
      solution:
        '$s = v \\cdot t$ với $v$ không đổi: tỉ lệ thuận. $v \\cdot t = s$ không đổi: tỉ lệ nghịch. $S = a^2$: cạnh gấp đôi thì diện tích gấp bốn, nên không tỉ lệ thuận, cũng không tỉ lệ nghịch.',
    },
  ],
  takeaways: [
    'Tỉ lệ thức: tích ngoại tỉ bằng tích trung tỉ; từ $ad = bc$ lập được bốn tỉ lệ thức.',
    'Dãy tỉ số bằng nhau cho phép cộng, trừ tử với tử, mẫu với mẫu để tìm giá trị chung.',
    'Tỉ lệ thuận: thương không đổi; tỉ lệ nghịch: tích không đổi.',
    'Bài toán thực tế: xác định loại tỉ lệ, lập tỉ lệ thức hoặc dãy tỉ số bằng nhau, tính rồi thử lại.',
  ],
};
