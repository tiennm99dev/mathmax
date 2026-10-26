/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 1: hệ thống hoá đơn thức, đa thức nhiều biến, phép cộng, trừ, nhân đa thức và phép chia đa thức cho đơn thức, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương 1 đi từ đơn thức, đa thức nhiều biến đến các phép tính cộng, trừ, nhân đa thức và chia đa thức cho đơn thức. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng tô màu từng bài để chỉ ra phần em đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Đa thức.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: thu gọn, tìm bậc, tính giá trị, cộng, trừ, nhân đa thức, chia đa thức cho đơn thức.',
    'Vận dụng đa thức để biểu diễn và giải các bài toán thực tế về diện tích, thể tích, số tiền.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương 1',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 1. Đơn thức',
              'Đơn thức là biểu thức chỉ gồm một số, một biến hoặc một tích giữa các số và các biến. Đơn thức thu gọn gồm hệ số và phần biến, mỗi biến xuất hiện một lần. Bậc là tổng số mũ các biến; số khác $0$ có bậc $0$. Hai đơn thức đồng dạng có hệ số khác $0$ và cùng phần biến.',
            ],
            [
              'Bài 2. Đa thức',
              'Đa thức là tổng của những đơn thức, mỗi đơn thức là một hạng tử. Thu gọn: cộng các hạng tử đồng dạng. Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn; đa thức $0$ không có bậc.',
            ],
            [
              'Bài 3. Cộng, trừ đa thức',
              'Bỏ ngoặc (khi trừ thì đổi dấu mọi hạng tử của đa thức bị trừ), nhóm các hạng tử đồng dạng rồi thu gọn.',
            ],
            [
              'Bài 4. Nhân đa thức',
              'Nhân hai đơn thức: nhân hệ số, cộng số mũ của cùng một biến. Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia, cộng các tích rồi thu gọn.',
            ],
            [
              'Bài 5. Chia đa thức cho đơn thức',
              'Đơn thức $A$ chia hết cho $B$ khi mỗi biến của $B$ là biến của $A$ với số mũ không lớn hơn. Đa thức chia hết cho đơn thức khi mọi hạng tử chia hết; khi đó chia từng hạng tử rồi cộng các kết quả.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mạch kiến thức',
          text: 'Mọi phép tính trên đa thức quy về phép tính trên các đơn thức: cộng, trừ ghép các hạng tử đồng dạng; nhân cộng số mũ; chia trừ số mũ. Phép chia là phép toán ngược của phép nhân, nên luôn thử lại được bằng phép nhân.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Tìm bậc khi chưa thu gọn: $x^4y + xy - x^4y$ có bậc $2$, không phải $5$.',
            'Trừ đa thức mà chỉ đổi dấu hạng tử đầu: $-(x^2 - 2xy + 1) = -x^2 + 2xy - 1$.',
            'Nhân lũy thừa mà nhân số mũ: $x^2 \\cdot x^3 = x^5$, không phải $x^6$.',
            'Coi $xy^2$ và $x^2y$ là đồng dạng: số mũ của từng biến phải bằng nhau.',
            'Kết luận đa thức chia hết khi mới kiểm tra một hạng tử: $x^2y + 3x$ không chia hết cho $xy$ vì $3x$ không chứa $y$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mười câu, mỗi bài trong chương hai câu, xuất hiện theo thứ tự ngẫu nhiên. Nhập đáp số rồi bấm "Kiểm tra"; làm sai lần đầu em được gợi ý và làm lại. Bản đồ kĩ năng tô xanh bài em đã vững, tô vàng hoặc đỏ bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Cho hai đa thức $A = 3x^2y - 2xy + 1$ và $B = x^2y + xy - 4$. Tính $A + B$ và $A - B$.',
      steps: [
        '$A + B = (3x^2y + x^2y) + (-2xy + xy) + (1 - 4) = 4x^2y - xy - 3$.',
        '$A - B = 3x^2y - 2xy + 1 - x^2y - xy + 4$ (đổi dấu mọi hạng tử của $B$).',
        '$A - B = (3x^2y - x^2y) + (-2xy - xy) + (1 + 4) = 2x^2y - 3xy + 5$.',
      ],
      answer: '$A + B = 4x^2y - xy - 3$; $A - B = 2x^2y - 3xy + 5$.',
    },
    {
      problem:
        'Rút gọn biểu thức $P = (x + y)(x - 2y) + (6x^2y^2 - 3xy^3) : 3xy$ rồi tính giá trị của $P$ tại $x = 2$, $y = 1$.',
      steps: [
        '$(x + y)(x - 2y) = x^2 - 2xy + xy - 2y^2 = x^2 - xy - 2y^2$.',
        '$(6x^2y^2 - 3xy^3) : 3xy = 2xy - y^2$.',
        '$P = x^2 - xy - 2y^2 + 2xy - y^2 = x^2 + xy - 3y^2$.',
        'Tại $x = 2$, $y = 1$: $P = 4 + 2 - 3 = 3$.',
      ],
      answer: '$P = x^2 + xy - 3y^2$; tại $x = 2$, $y = 1$ thì $P = 3$.',
    },
    {
      problem:
        'Chứng tỏ giá trị của biểu thức $Q = x(2x + 1) - x^2(x + 2) + x^3 - x + 3$ không phụ thuộc vào giá trị của biến $x$.',
      steps: [
        '$x(2x + 1) = 2x^2 + x$ và $x^2(x + 2) = x^3 + 2x^2$.',
        '$Q = 2x^2 + x - x^3 - 2x^2 + x^3 - x + 3$.',
        'Nhóm các hạng tử đồng dạng: $(2x^2 - 2x^2) + (x - x) + (-x^3 + x^3) + 3 = 3$.',
      ],
      answer: '$Q = 3$ với mọi giá trị của $x$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biểu thức nào sau đây là đơn thức?',
      options: ['$x + y$', '$-\\frac{2}{3}x^2y$', '$\\frac{x}{y}$', '$2x - 1$'],
      answer: 1,
      hints: ['Đơn thức chỉ gồm một số, một biến hoặc một tích giữa các số và các biến.'],
      solution:
        '$-\\frac{2}{3}x^2y$ là tích của số $-\\frac{2}{3}$ với các biến. $x + y$ và $2x - 1$ có phép cộng, trừ; $\\frac{x}{y}$ có phép chia cho biến.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đơn thức $-3x^2y^3z$.',
      answer: 6,
      hints: ['Cộng số mũ của tất cả các biến; $z$ có số mũ $1$.'],
      solution: 'Bậc là $2 + 3 + 1 = 6$.',
    },
    {
      type: 'choice',
      prompt: 'Đơn thức nào đồng dạng với đơn thức $2x^2y$?',
      options: ['$2xy^2$', '$-5x^2y$', '$2x^2y^2$', '$x^2$'],
      answer: 1,
      hints: ['Đồng dạng: cùng phần biến $x^2y$, hệ số khác $0$ tùy ý.'],
      solution:
        '$-5x^2y$ có phần biến $x^2y$ nên đồng dạng với $2x^2y$. Các đơn thức kia khác phần biến.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $x^4y - 2x^2y^3 + 5 - x^4y + xy$.',
      answer: 5,
      hints: ['Thu gọn trước: $x^4y - x^4y = 0$.'],
      solution:
        'Dạng thu gọn là $-2x^2y^3 + xy + 5$. Hạng tử bậc cao nhất là $-2x^2y^3$, có bậc $5$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A = x^2 - 2xy + y^2$ và $B = 2x^2 + xy - y^2$. Đa thức $A + B$ là',
      options: ['$3x^2 - xy$', '$3x^2 - 3xy + 2y^2$', '$3x^2 - xy + 2y^2$', '$x^2 + 3xy - 2y^2$'],
      answer: 0,
      hints: ['Nhóm các hạng tử đồng dạng: $x^2$ với $2x^2$, $-2xy$ với $xy$, $y^2$ với $-y^2$.'],
      solution: '$A + B = (x^2 + 2x^2) + (-2xy + xy) + (y^2 - y^2) = 3x^2 - xy$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm đa thức $M$, biết $M + (3x^2y - xy) = 5x^2y + 2xy - 1$. Hệ số của hạng tử chứa $xy$ trong $M$ là bao nhiêu?',
      answer: 3,
      hints: ['$M = (5x^2y + 2xy - 1) - (3x^2y - xy)$.'],
      solution: '$M = 5x^2y + 2xy - 1 - 3x^2y + xy = 2x^2y + 3xy - 1$. Hệ số của $xy$ là $3$.',
    },
    {
      type: 'choice',
      prompt: 'Tích $(2x - 1)(x + 3)$ bằng',
      options: ['$2x^2 + 5x - 3$', '$2x^2 + 7x - 3$', '$2x^2 - 3$', '$2x^2 + 5x + 3$'],
      answer: 0,
      hints: ['$2x \\cdot 3 = 6x$ và $-1 \\cdot x = -x$.'],
      solution: '$(2x - 1)(x + 3) = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây đúng?',
      options: [
        '$x^2y^3$ chia hết cho $xy^4$',
        '$5x^3y$ chia hết cho $2x^3y$',
        '$4x^2$ chia hết cho $2xy$',
        '$x^2 + y$ chia hết cho $y$',
      ],
      answer: 1,
      hints: [
        'So sánh số mũ của từng biến trong đơn thức chia với số mũ trong đơn thức (hạng tử) bị chia.',
        'Hệ số không cần chia hết cho nhau.',
      ],
      solution:
        '$5x^3y : 2x^3y = \\frac{5}{2}$, nên khẳng định thứ hai đúng. $x^2y^3$ không chia hết cho $xy^4$ vì $3 < 4$; $4x^2$ không chứa $y$; hạng tử $x^2$ không chứa $y$.',
    },
    {
      type: 'number',
      prompt:
        'Thực hiện phép chia $(9x^3y^2 - 6x^2y^3 + 3x^2y^2) : 3x^2y^2$ rồi tính giá trị của thương tại $x = 1$, $y = -2$.',
      answer: 8,
      hints: ['Thương là $3x - 2y + 1$.'],
      solution:
        'Thương bằng $3x - 2y + 1$. Tại $x = 1$, $y = -2$: $3 - 2 \\cdot (-2) + 1 = 3 + 4 + 1 = 8$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các đa thức theo bậc tăng dần.',
      items: ['$x^2y^3$', '$3x - 7$', '$xy - 1$', '$x^3 + y$'],
      answer: [1, 2, 3, 0],
      hints: ['Bậc của đa thức là bậc cao nhất của các hạng tử.'],
      solution:
        '$3x - 7$ có bậc $1$; $xy - 1$ có bậc $2$; $x^3 + y$ có bậc $3$; $x^2y^3$ có bậc $5$.',
    },
    {
      type: 'number',
      prompt:
        'Chứng tỏ giá trị của biểu thức $(x + 1)(x - 1) - x(x + 2) + 2x$ không phụ thuộc vào $x$. Giá trị đó bằng bao nhiêu?',
      answer: -1,
      hints: [
        'Nhân ra hai tích rồi thu gọn: các hạng tử chứa $x$ triệt tiêu hết.',
        '$(x + 1)(x - 1) = x^2 - 1$.',
      ],
      solution:
        '$(x + 1)(x - 1) - x(x + 2) + 2x = x^2 - 1 - x^2 - 2x + 2x = -1$. Biểu thức luôn bằng $-1$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chiều dài $2x + y$ (m) và chiều rộng $x + y$ (m). Viết đa thức biểu thị diện tích mảnh vườn rồi tính diện tích (theo $\\text{m}^2$) khi $x = 5$, $y = 2$.',
      answer: 84,
      hints: ['$S = (2x + y)(x + y)$.', 'Nhân ra: $S = 2x^2 + 3xy + y^2$.'],
      solution:
        '$S = (2x + y)(x + y) = 2x^2 + 2xy + xy + y^2 = 2x^2 + 3xy + y^2$. Khi $x = 5$, $y = 2$: $50 + 30 + 4 = 84$ ($\\text{m}^2$); kiểm tra: $12 \\cdot 7 = 84$.',
    },
    {
      type: 'number',
      prompt:
        'Một nhóm có $4xy$ bạn góp tiền mua quà, tổng số tiền là $12x^2y + 8xy^2$ (nghìn đồng) và chia đều cho mỗi bạn. Viết đa thức biểu thị số tiền mỗi bạn góp, rồi tính số tiền đó (nghìn đồng) khi $x = 5$, $y = 10$.',
      answer: 35,
      hints: [
        'Số tiền mỗi bạn góp bằng tổng số tiền chia cho số bạn.',
        '$(12x^2y + 8xy^2) : 4xy = 3x + 2y$.',
      ],
      solution:
        'Mỗi bạn góp $(12x^2y + 8xy^2) : 4xy = 3x + 2y$ (nghìn đồng). Khi $x = 5$, $y = 10$: $15 + 20 = 35$ (nghìn đồng). Kiểm tra: $200$ bạn góp tổng $3\\,000 + 4\\,000 = 7\\,000$ nghìn đồng, và $7\\,000 : 200 = 35$.',
    },
  ],
  takeaways: [
    'Thu gọn trước khi tìm bậc, trước khi cộng trừ và trước khi thay số.',
    'Trừ đa thức: đổi dấu mọi hạng tử của đa thức bị trừ.',
    'Nhân: cộng số mũ; chia: trừ số mũ, chỉ chia được khi mọi hạng tử chia hết.',
    'Dùng bản đồ kĩ năng để biết cần ôn lại bài nào trong chương.',
  ],
};
