/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đại lượng y tỉ lệ thuận với x khi y = kx với k là hằng số khác 0; tỉ số hai giá trị tương ứng luôn bằng hệ số tỉ lệ k. Vận dụng giải các bài toán tỉ lệ thuận và chia tỉ lệ.',
  intro:
    'Mua táo giá $35$ nghìn đồng một ki-lô-gam: mua $1$ kg hết $35$ nghìn, $2$ kg hết $70$ nghìn, $3$ kg hết $105$ nghìn. Số kg táo tăng bao nhiêu lần thì số tiền cũng tăng bấy nhiêu lần. Số tiền và số ki-lô-gam táo là hai đại lượng tỉ lệ thuận.',
  objectives: [
    'Nhận biết hai đại lượng tỉ lệ thuận qua công thức $y = kx$ và tìm hệ số tỉ lệ.',
    'Hiểu và vận dụng các tính chất của hai đại lượng tỉ lệ thuận.',
    'Giải bài toán tỉ lệ thuận và bài toán chia một số thành các phần tỉ lệ thuận với các số cho trước.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Nếu đại lượng $y$ liên hệ với đại lượng $x$ theo công thức $y = kx$ ($k$ là một hằng số khác $0$) thì ta nói $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: số tiền $y$ (nghìn đồng) phải trả khi mua $x$ kg táo giá $35$ nghìn đồng/kg là $y = 35x$, nên $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $35$. Quãng đường $s$ (km) ô tô đi được với vận tốc $60$ km/h trong $t$ giờ là $s = 60t$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$ thì $x$ cũng tỉ lệ thuận với $y$ theo hệ số tỉ lệ $\\frac{1}{k}$, vì từ $y = kx$ ta có $x = \\frac{1}{k}y$. Ta nói $x$ và $y$ là hai đại lượng tỉ lệ thuận với nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai đại lượng cùng tăng chưa chắc đã tỉ lệ thuận. Tiền taxi gồm phí mở cửa cộng tiền theo số ki-lô-mét tăng khi đi xa hơn, nhưng đi gấp đôi quãng đường thì tiền không gấp đôi, nên không tỉ lệ thuận.',
        },
      ],
    },
    {
      heading: 'Tính chất',
      blocks: [
        {
          type: 'p',
          text: 'Giả sử $y$ tỉ lệ thuận với $x$ theo hệ số $k$. Với các giá trị $x_1, x_2, x_3, \\ldots$ khác $0$ của $x$, ta có các giá trị tương ứng $y_1 = kx_1$, $y_2 = kx_2$, $y_3 = kx_3, \\ldots$ của $y$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Nếu hai đại lượng tỉ lệ thuận với nhau thì: tỉ số hai giá trị tương ứng của chúng luôn không đổi và bằng hệ số tỉ lệ, $\\frac{y_1}{x_1} = \\frac{y_2}{x_2} = \\frac{y_3}{x_3} = \\ldots = k$; tỉ số hai giá trị bất kì của đại lượng này bằng tỉ số hai giá trị tương ứng của đại lượng kia, $\\frac{x_1}{x_2} = \\frac{y_1}{y_2}$; $\\;\\frac{x_1}{x_3} = \\frac{y_1}{y_3}$; $\\ldots$',
        },
        {
          type: 'table',
          caption: 'Số tiền $y$ (nghìn đồng) khi mua $x$ kg táo: $y = 35x$',
          head: ['$x$', '$1$', '$2$', '$3$', '$4$'],
          rows: [
            ['$y$', '$35$', '$70$', '$105$', '$140$'],
            ['$\\frac{y}{x}$', '$35$', '$35$', '$35$', '$35$'],
          ],
        },
        {
          type: 'p',
          text: 'Muốn kiểm tra hai đại lượng có tỉ lệ thuận hay không khi biết bảng giá trị, ta tính các tỉ số $\\frac{y}{x}$: nếu tất cả bằng nhau thì hai đại lượng tỉ lệ thuận, nếu có một tỉ số khác thì không.',
        },
      ],
    },
    {
      heading: 'Bài toán về đại lượng tỉ lệ thuận',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định hai đại lượng tỉ lệ thuận trong bài và gọi ẩn cho đại lượng cần tìm.',
            'Viết tỉ lệ thức hoặc dãy tỉ số bằng nhau từ tính chất của đại lượng tỉ lệ thuận.',
            'Dùng tính chất của tỉ lệ thức hoặc của dãy tỉ số bằng nhau để tính, rồi trả lời.',
          ],
        },
        {
          type: 'p',
          text: 'Bài toán chia tỉ lệ thuận: chia số $S$ thành các phần $a$, $b$, $c$ tỉ lệ thuận với $m$, $n$, $p$ nghĩa là $\\frac{a}{m} = \\frac{b}{n} = \\frac{c}{p}$ và $a + b + c = S$, đúng như bài toán ở Bài 21.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng giá trị và các điểm của y = kx',
    instruction:
      'Kéo thanh trượt để đổi hệ số $k$ và kéo điểm $P$ để đổi $x$; bảng giá trị và hàng tỉ số $y : x$ cập nhật ngay. Chuyển sang công thức $y = k \\cdot x + 2$ để thấy vì sao một đại lượng tăng theo $x$ vẫn chưa chắc tỉ lệ thuận với $x$.',
  },
  examples: [
    {
      problem:
        'Cho biết $y$ tỉ lệ thuận với $x$ và khi $x = 4$ thì $y = -12$. a) Tìm hệ số tỉ lệ $k$ của $y$ đối với $x$. b) Biểu diễn $y$ theo $x$. c) Tính $y$ khi $x = -5$.',
      steps: [
        'a) $y = kx$ nên $-12 = k \\cdot 4$, suy ra $k = \\frac{-12}{4} = -3$.',
        'b) $y = -3x$.',
        'c) Khi $x = -5$: $y = -3 \\cdot (-5) = 15$.',
      ],
      answer: '$k = -3$; $y = -3x$; $y = 15$ khi $x = -5$.',
    },
    {
      problem:
        'Hai thanh kim loại đồng chất có thể tích $10$ cm$^3$ và $15$ cm$^3$. Thanh thứ hai nặng hơn thanh thứ nhất $39$ g. Hỏi mỗi thanh nặng bao nhiêu gam?',
      steps: [
        'Gọi khối lượng hai thanh là $m_1$, $m_2$ (g). Hai thanh đồng chất nên khối lượng tỉ lệ thuận với thể tích: $\\frac{m_1}{10} = \\frac{m_2}{15}$, và $m_2 - m_1 = 39$.',
        'Theo tính chất của dãy tỉ số bằng nhau: $\\frac{m_1}{10} = \\frac{m_2}{15} = \\frac{m_2 - m_1}{15 - 10} = \\frac{39}{5} = 7{,}8$.',
        '$m_1 = 10 \\cdot 7{,}8 = 78$; $m_2 = 15 \\cdot 7{,}8 = 117$.',
      ],
      answer: 'Hai thanh nặng $78$ g và $117$ g.',
    },
    {
      problem:
        'Số đo ba góc $A$, $B$, $C$ của tam giác $ABC$ tỉ lệ thuận với $1$; $2$; $3$. Tính số đo mỗi góc.',
      steps: [
        'Ta có $\\frac{\\widehat{A}}{1} = \\frac{\\widehat{B}}{2} = \\frac{\\widehat{C}}{3}$ và $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$ (tổng ba góc của một tam giác).',
        '$\\frac{\\widehat{A}}{1} = \\frac{\\widehat{B}}{2} = \\frac{\\widehat{C}}{3} = \\frac{180^\\circ}{1 + 2 + 3} = 30^\\circ$.',
        '$\\widehat{A} = 30^\\circ$, $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 90^\\circ$.',
      ],
      answer: '$\\widehat{A} = 30^\\circ$, $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 90^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Công thức nào sau đây cho biết $y$ tỉ lệ thuận với $x$?',
      options: [
        '$y = 5x$',
        '$y = -0{,}5x$',
        '$y = x + 3$',
        '$y = \\frac{12}{x}$',
        '$y = \\frac{x}{4}$',
      ],
      answers: [0, 1, 4],
      hints: ['Cần viết được dưới dạng $y = kx$ với $k$ là hằng số khác $0$.'],
      solution:
        '$y = 5x$ ($k = 5$), $y = -0{,}5x$ ($k = -0{,}5$) và $y = \\frac{x}{4} = \\frac{1}{4}x$ ($k = \\frac{1}{4}$). Công thức $y = x + 3$ có phần cộng thêm, còn $y = \\frac{12}{x}$ chia cho $x$, nên không có dạng $y = kx$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho biết $y$ tỉ lệ thuận với $x$ và khi $x = 6$ thì $y = 4$. Tìm hệ số tỉ lệ $k$ của $y$ đối với $x$ (viết dạng phân số tối giản).',
      answer: [2, 3],
      simplest: true,
      hints: ['$k = \\frac{y}{x}$.'],
      solution: '$k = \\frac{y}{x} = \\frac{4}{6} = \\frac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Với $y$ và $x$ như câu trên ($x = 6$ thì $y = 4$), tính $y$ khi $x = 9$.',
      answer: 6,
      hints: ['Dùng $y = \\frac{2}{3}x$, hoặc tỉ lệ thức $\\frac{y}{9} = \\frac{4}{6}$.'],
      solution: '$y = \\frac{2}{3} \\cdot 9 = 6$.',
    },
    {
      type: 'choice',
      prompt:
        'Nếu $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $-2$ thì $x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ',
      options: ['$-2$', '$2$', '$-\\frac{1}{2}$', '$\\frac{1}{2}$'],
      answer: 2,
      hints: ['Từ $y = -2x$, hãy biểu diễn $x$ theo $y$.'],
      solution:
        '$y = -2x$ nên $x = -\\frac{1}{2}y$: hệ số tỉ lệ là $\\frac{1}{k} = -\\frac{1}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Bảng giá trị nào cho biết $x$ và $y$ là hai đại lượng tỉ lệ thuận?',
      options: [
        '$x$: $1$; $2$; $5$ và $y$: $4$; $6$; $12$',
        '$x$: $1$; $2$; $5$ và $y$: $3$; $6$; $15$',
        '$x$: $2$; $4$; $6$ và $y$: $6$; $3$; $2$',
        '$x$: $1$; $3$; $4$ và $y$: $2$; $6$; $9$',
      ],
      answer: 1,
      hints: ['Tính các tỉ số $\\frac{y}{x}$ trong mỗi bảng.'],
      solution:
        'Ở bảng thứ hai, $\\frac{3}{1} = \\frac{6}{2} = \\frac{15}{5} = 3$. Các bảng khác: $4$; $3$; $2{,}4$ khác nhau; $3$; $0{,}75$; $\\frac{1}{3}$ khác nhau; $2$; $2$; $2{,}25$ có một tỉ số khác.',
    },
    {
      type: 'number',
      prompt: '$5$ m dây đồng nặng $43$ g. Hỏi $12$ m dây đồng cùng loại nặng bao nhiêu gam?',
      answer: 103.2,
      tolerance: 0.001,
      unit: 'g',
      hints: [
        'Khối lượng dây tỉ lệ thuận với chiều dài.',
        'Gọi khối lượng cần tìm là $m$ (g): $\\frac{m}{12} = \\frac{43}{5}$.',
      ],
      solution:
        '$\\frac{m}{12} = \\frac{43}{5}$ nên $m = \\frac{12 \\cdot 43}{5} = \\frac{516}{5} = 103{,}2$ g.',
    },
    {
      type: 'number',
      prompt:
        'Mua $3$ kg táo hết $105$ nghìn đồng. Mua $7$ kg táo cùng loại hết bao nhiêu nghìn đồng?',
      answer: 245,
      hints: ['Số tiền tỉ lệ thuận với số ki-lô-gam táo.', 'Giá $1$ kg là $105 : 3$.'],
      solution:
        'Giá mỗi ki-lô-gam là $105 : 3 = 35$ nghìn đồng, nên $7$ kg hết $35 \\cdot 7 = 245$ nghìn đồng.',
    },
    {
      type: 'number',
      prompt:
        'Ba người góp vốn kinh doanh lần lượt $30$, $50$ và $70$ triệu đồng. Tiền lãi $45$ triệu đồng được chia tỉ lệ thuận với số vốn đã góp. Người góp $50$ triệu đồng được chia bao nhiêu triệu đồng tiền lãi?',
      answer: 15,
      hints: [
        'Gọi số lãi ba người nhận là $a$, $b$, $c$: $\\frac{a}{30} = \\frac{b}{50} = \\frac{c}{70}$.',
        'Tổng $a + b + c = 45$.',
      ],
      solution:
        '$\\frac{a}{30} = \\frac{b}{50} = \\frac{c}{70} = \\frac{45}{150} = 0{,}3$, nên $b = 50 \\cdot 0{,}3 = 15$ triệu đồng (hai người kia nhận $9$ và $21$ triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Số đo ba góc của một tam giác tỉ lệ thuận với $2$; $3$; $4$. Góc lớn nhất của tam giác bằng bao nhiêu độ?',
      answer: 80,
      hints: ['Tổng ba góc của một tam giác bằng $180^\\circ$.'],
      solution:
        'Gọi ba góc là $a$, $b$, $c$: $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{4} = \\frac{180^\\circ}{9} = 20^\\circ$. Góc lớn nhất $c = 4 \\cdot 20^\\circ = 80^\\circ$.',
    },
  ],
  takeaways: [
    '$y$ tỉ lệ thuận với $x$ theo hệ số $k$ ($k \\ne 0$) khi $y = kx$; khi đó $x$ tỉ lệ thuận với $y$ theo hệ số $\\frac{1}{k}$.',
    'Tỉ số hai giá trị tương ứng luôn không đổi: $\\frac{y_1}{x_1} = \\frac{y_2}{x_2} = \\ldots = k$.',
    'Tỉ số hai giá trị của đại lượng này bằng tỉ số hai giá trị tương ứng của đại lượng kia: $\\frac{x_1}{x_2} = \\frac{y_1}{y_2}$.',
    'Giải bài toán tỉ lệ thuận bằng tỉ lệ thức hoặc dãy tỉ số bằng nhau.',
  ],
};
