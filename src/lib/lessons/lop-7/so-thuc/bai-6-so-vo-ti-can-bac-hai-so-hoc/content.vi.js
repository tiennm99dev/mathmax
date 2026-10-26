/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số vô tỉ là số thập phân vô hạn không tuần hoàn; căn bậc hai số học của một số không âm và cách tính gần đúng căn bậc hai bằng máy tính cầm tay.',
  intro:
    'Bác Tám muốn lát một sân hình vuông có diện tích $2\\ \\text{m}^2$. Cạnh sân dài bao nhiêu mét? Cạnh $x$ phải thoả mãn $x^2 = 2$, nhưng $1^2 = 1$ còn nhỏ, $2^2 = 4$ đã lớn, $1{,}4^2 = 1{,}96$ vẫn nhỏ, $1{,}5^2 = 2{,}25$ lại lớn... Số $x$ này không phải là số hữu tỉ. Bài này giới thiệu một loại số mới: số vô tỉ.',
  objectives: [
    'Nhận biết số vô tỉ: số thập phân vô hạn không tuần hoàn.',
    'Hiểu khái niệm căn bậc hai số học và tính căn bậc hai số học của các số chính phương, các phân số và số thập phân đơn giản.',
    'Tính giá trị gần đúng của căn bậc hai bằng máy tính cầm tay và làm tròn kết quả.',
  ],
  sections: [
    {
      heading: '1. Số vô tỉ',
      blocks: [
        {
          type: 'p',
          text: 'Cạnh $x$ của hình vuông diện tích $2$ thoả mãn $x^2 = 2$. Thử dần từng chữ số ta được $1{,}4 < x < 1{,}5$ (vì $1{,}96 < 2 < 2{,}25$), rồi $1{,}41 < x < 1{,}42$, $1{,}414 < x < 1{,}415$,... Người ta tính được $x = 1{,}41421356237\\ldots$ là một số thập phân vô hạn mà các chữ số sau dấu phẩy không lặp lại theo một chu kì nào.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số vô tỉ',
          text: 'Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn. Tập hợp các số vô tỉ được kí hiệu là $\\mathbb{I}$.',
        },
        {
          type: 'p',
          text: 'Số $\\pi = 3{,}14159265\\ldots$ (tỉ số giữa chu vi và đường kính của một hình tròn) cũng là một số vô tỉ. Vì mỗi số hữu tỉ là số thập phân hữu hạn hoặc vô hạn tuần hoàn, một số vô tỉ không phải là số hữu tỉ: nó không viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phân biệt',
          text: '$0{,}(12) = 0{,}121212\\ldots$ là số thập phân vô hạn tuần hoàn nên là số hữu tỉ. Còn $0{,}1010010001\\ldots$ (sau mỗi chữ số $1$ thêm một chữ số $0$) là số thập phân vô hạn không tuần hoàn nên là số vô tỉ.',
        },
      ],
    },
    {
      heading: '2. Căn bậc hai số học',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Căn bậc hai số học',
          text: 'Căn bậc hai số học của số $a$ không âm là số $x$ không âm sao cho $x^2 = a$. Kí hiệu căn bậc hai số học của $a$ là $\\sqrt{a}$.',
        },
        {
          type: 'tex',
          tex: '\\sqrt{a} = x \\iff x \\ge 0 \\text{ và } x^2 = a \\qquad (a \\ge 0)',
        },
        {
          type: 'list',
          items: [
            '$\\sqrt{49} = 7$ vì $7 \\ge 0$ và $7^2 = 49$.',
            '$\\sqrt{0} = 0$; $\\;\\sqrt{1} = 1$.',
            '$\\sqrt{0{,}25} = 0{,}5$ vì $0{,}5^2 = 0{,}25$; $\\;\\sqrt{\\frac{4}{9}} = \\frac{2}{3}$ vì $\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$.',
            'Cạnh của hình vuông diện tích $2$ là $\\sqrt{2}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chú ý',
          text: 'Với mọi số $a \\ge 0$ ta có $\\left(\\sqrt{a}\\right)^2 = a$ và $\\sqrt{a} \\ge 0$. Số âm không có căn bậc hai số học. Người ta chứng minh được: nếu số tự nhiên $a$ không phải là bình phương của một số tự nhiên thì $\\sqrt{a}$ là số vô tỉ; chẳng hạn $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}, \\sqrt{6}$ là các số vô tỉ.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Cả $7^2$ và $(-7)^2$ đều bằng $49$, nhưng $\\sqrt{49} = 7$, không phải $-7$ hay "$\\pm 7$": căn bậc hai số học luôn không âm. Cũng không viết $\\sqrt{-49}$, vì số âm không có căn bậc hai số học.',
        },
      ],
    },
    {
      heading: '3. Tính căn bậc hai số học bằng máy tính cầm tay',
      blocks: [
        {
          type: 'p',
          text: 'Với số không phải là bình phương của một số hữu tỉ, ta dùng máy tính cầm tay để tính gần đúng căn bậc hai số học: bấm phím $\\sqrt{\\ }$, nhập số rồi bấm phím $=$. Kết quả trên màn hình đã được làm tròn; ta thường làm tròn tiếp theo yêu cầu.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Màn hình hiện', 'Làm tròn đến hàng phần trăm'],
          rows: [
            ['$\\sqrt{2}$', '$1{,}414213562$', '$1{,}41$'],
            ['$\\sqrt{3}$', '$1{,}732050808$', '$1{,}73$'],
            ['$\\sqrt{10}$', '$3{,}16227766$', '$3{,}16$'],
            ['$\\sqrt{50}$', '$7{,}071067812$', '$7{,}07$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Không cần máy tính vẫn ước lượng được: vì $3^2 = 9 < 10 < 16 = 4^2$ nên $3 < \\sqrt{10} < 4$. Mỗi lần thử thêm một chữ số rồi bình phương, ta chặn $\\sqrt{10}$ trong một khoảng hẹp gấp $10$ lần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chặn cạnh của hình vuông',
    instruction:
      'Kéo góc hình vuông (hoặc dùng thanh trượt, phím mũi tên) để chọn diện tích $S$. Cạnh hình vuông là $\\sqrt{S}$. Hãy tìm số tự nhiên lớn nhất có bình phương không vượt quá $S$, rồi tìm lần lượt từng chữ số sau dấu phẩy bằng cách thử bình phương. Trục số phóng to dần cho thấy khoảng chứa $\\sqrt{S}$ hẹp lại.',
  },
  examples: [
    {
      problem: 'Tính: a) $\\sqrt{81}$; b) $\\sqrt{0{,}09}$; c) $\\sqrt{\\frac{16}{25}}$.',
      steps: [
        'a) $9 \\ge 0$ và $9^2 = 81$ nên $\\sqrt{81} = 9$.',
        'b) $0{,}3 \\ge 0$ và $0{,}3^2 = 0{,}09$ nên $\\sqrt{0{,}09} = 0{,}3$.',
        'c) $\\frac{4}{5} \\ge 0$ và $\\left(\\frac{4}{5}\\right)^2 = \\frac{16}{25}$ nên $\\sqrt{\\frac{16}{25}} = \\frac{4}{5}$.',
      ],
      answer:
        '$\\sqrt{81} = 9$; $\\;\\sqrt{0{,}09} = 0{,}3$; $\\;\\sqrt{\\frac{16}{25}} = \\frac{4}{5}$.',
    },
    {
      problem: 'Tính $\\left(\\sqrt{7}\\right)^2 + \\sqrt{0{,}16}$.',
      steps: [
        'Theo chú ý, $\\left(\\sqrt{7}\\right)^2 = 7$.',
        '$0{,}4^2 = 0{,}16$ và $0{,}4 \\ge 0$ nên $\\sqrt{0{,}16} = 0{,}4$.',
        '$7 + 0{,}4 = 7{,}4$.',
      ],
      answer: '$\\left(\\sqrt{7}\\right)^2 + \\sqrt{0{,}16} = 7{,}4$.',
    },
    {
      problem:
        'Một mảnh vườn hình vuông có diện tích $50\\ \\text{m}^2$. Tính độ dài cạnh mảnh vườn (làm tròn kết quả đến hàng phần mười).',
      steps: [
        'Gọi cạnh là $x$ (m), $x > 0$. Ta có $x^2 = 50$ nên $x = \\sqrt{50}$.',
        'Máy tính cho $\\sqrt{50} = 7{,}071067812\\ldots$',
        'Làm tròn đến hàng phần mười: chữ số hàng phần trăm là $7 \\ge 5$ nên được $7{,}1$.',
      ],
      answer: 'Cạnh mảnh vườn dài khoảng $7{,}1$ m.',
    },
    {
      problem: '$\\sqrt{30}$ nằm giữa hai số tự nhiên liên tiếp nào?',
      steps: [
        'Tìm hai số chính phương liên tiếp kẹp $30$: $25 < 30 < 36$.',
        'Vì $5^2 < 30 < 6^2$ và các số đều dương nên $5 < \\sqrt{30} < 6$.',
      ],
      answer: '$5 < \\sqrt{30} < 6$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{144}$.',
      answer: 12,
      hints: ['Tìm số không âm có bình phương bằng $144$.'],
      solution: '$12 \\ge 0$ và $12^2 = 144$ nên $\\sqrt{144} = 12$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{0{,}49}$.',
      answer: 0.7,
      hints: ['Số nào bình phương bằng $0{,}49$? Nhớ rằng $7^2 = 49$.'],
      solution: '$0{,}7^2 = 0{,}49$ và $0{,}7 \\ge 0$ nên $\\sqrt{0{,}49} = 0{,}7$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\sqrt{\\frac{9}{64}}$ (viết kết quả dạng phân số $a/b$).',
      answer: [3, 8],
      hints: ['Tìm căn bậc hai số học của tử và của mẫu.'],
      solution:
        '$\\left(\\frac{3}{8}\\right)^2 = \\frac{9}{64}$ và $\\frac{3}{8} \\ge 0$ nên $\\sqrt{\\frac{9}{64}} = \\frac{3}{8}$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        '$\\sqrt{16} = \\pm 4$',
        '$\\sqrt{-9} = -3$',
        '$\\sqrt{25} = 5$',
        '$\\sqrt{0{,}4} = 0{,}2$',
      ],
      answer: 2,
      hints: [
        'Căn bậc hai số học luôn là một số không âm, và chỉ có với số không âm.',
        'Kiểm tra lại bằng cách bình phương kết quả.',
      ],
      solution:
        '$\\sqrt{16} = 4$ (không âm); số âm không có căn bậc hai số học; $0{,}2^2 = 0{,}04 \\ne 0{,}4$. Chỉ $\\sqrt{25} = 5$ là đúng.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\left(\\sqrt{13}\\right)^2 - \\sqrt{36}$.',
      answer: 7,
      hints: ['$\\left(\\sqrt{a}\\right)^2 = a$ với $a \\ge 0$.'],
      solution: '$\\left(\\sqrt{13}\\right)^2 - \\sqrt{36} = 13 - 6 = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $n$ sao cho $n < \\sqrt{70} < n + 1$.',
      answer: 8,
      hints: ['Tìm hai số chính phương liên tiếp kẹp $70$.'],
      solution: '$64 < 70 < 81$, tức là $8^2 < 70 < 9^2$, nên $8 < \\sqrt{70} < 9$: $n = 8$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay tính $\\sqrt{11}$ rồi làm tròn kết quả đến hàng phần trăm.',
      answer: 3.32,
      hints: ['Máy tính cho $\\sqrt{11} = 3{,}31662\\ldots$', 'Nhìn chữ số hàng phần nghìn.'],
      solution:
        '$\\sqrt{11} = 3{,}316624\\ldots$; chữ số hàng phần nghìn là $6 \\ge 5$ nên làm tròn được $3{,}32$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số vô tỉ.',
      options: [
        '$\\sqrt{9}$',
        '$\\sqrt{5}$',
        '$0{,}(3)$',
        '$\\pi$',
        '$-\\sqrt{2}$',
        '$\\sqrt{0{,}04}$',
      ],
      answers: [1, 3, 4],
      hints: [
        'Tính thử những căn có kết quả đẹp trước.',
        'Số thập phân vô hạn tuần hoàn là số hữu tỉ.',
      ],
      solution:
        '$\\sqrt{9} = 3$, $\\sqrt{0{,}04} = 0{,}2$ và $0{,}(3) = \\frac{1}{3}$ là số hữu tỉ. $\\sqrt{5}$, $\\pi$ và $-\\sqrt{2}$ là số vô tỉ ($5$ và $2$ không phải là số chính phương).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình vuông có diện tích $200\\ \\text{m}^2$. Tính độ dài cạnh mảnh đất, làm tròn đến hàng phần mười.',
      answer: 14.1,
      unit: 'm',
      hints: ['Cạnh bằng $\\sqrt{200}$.', 'Máy tính cho $\\sqrt{200} = 14{,}142\\ldots$'],
      solution:
        'Cạnh $x = \\sqrt{200} = 14{,}1421\\ldots$; chữ số hàng phần trăm là $4 < 5$ nên $x \\approx 14{,}1$ m.',
    },
  ],
  takeaways: [
    'Số vô tỉ là số thập phân vô hạn không tuần hoàn; tập hợp số vô tỉ kí hiệu là $\\mathbb{I}$. Ví dụ: $\\sqrt{2}$, $\\pi$.',
    'Với $a \\ge 0$: $\\sqrt{a}$ là số $x \\ge 0$ sao cho $x^2 = a$; $\\left(\\sqrt{a}\\right)^2 = a$.',
    'Nếu số tự nhiên $a$ không phải là bình phương của một số tự nhiên thì $\\sqrt{a}$ là số vô tỉ.',
    'Dùng phím $\\sqrt{\\ }$ của máy tính để tính gần đúng căn bậc hai, rồi làm tròn theo yêu cầu.',
  ],
};
