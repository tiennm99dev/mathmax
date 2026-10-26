/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chia đơn thức cho đơn thức, chia đa thức cho đơn thức, chia hai đa thức đã sắp xếp bằng cách đặt tính như chia số tự nhiên; phép chia hết A = B · Q và phép chia có dư A = B · Q + R với R bằng 0 hoặc có bậc nhỏ hơn bậc của B.',
  intro:
    'Cho hai đa thức $A = 2x^4 - 3x^3 - 3x^2 + 6x - 2$ và $B = x^2 - 2$. Liệu có đa thức $P$ nào để $A = B \\cdot P$ không? Tìm $P$ chính là thực hiện phép chia $A : B$. Ta sẽ đặt tính chia hai đa thức giống hệt như chia hai số tự nhiên: chia, nhân, trừ, rồi lặp lại.',
  objectives: [
    'Chia một đơn thức cho một đơn thức, một đa thức cho một đơn thức.',
    'Đặt tính chia hai đa thức một biến đã sắp xếp theo lũy thừa giảm dần.',
    'Phân biệt phép chia hết và phép chia có dư; viết $A = B \\cdot Q + R$ và kiểm tra kết quả bằng phép nhân.',
  ],
  sections: [
    {
      heading: 'Làm quen với phép chia đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chia hết',
          text: 'Cho hai đa thức $A$ và $B$ với $B \\ne 0$. Nếu có đa thức $Q$ sao cho $A = B \\cdot Q$ thì ta nói đa thức $A$ chia hết cho đa thức $B$; $Q$ là thương của phép chia $A$ cho $B$, kí hiệu $A : B = Q$ hoặc $\\dfrac{A}{B} = Q$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chia đơn thức cho đơn thức',
          text: 'Với $b \\ne 0$ và $m \\ge n$: $\\;ax^m : bx^n = \\dfrac{a}{b}x^{m - n}$. Ta chia hệ số cho hệ số, lũy thừa của biến cho lũy thừa của biến (trừ số mũ). Khi $m < n$ thì $ax^m$ không chia hết cho $bx^n$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $12x^3 : 4x = 3x^2$; $\\;3x^7 : x^4 = 3x^3$; $\\;(-6x^5) : 2x^5 = -3$ (vì $x^0 = 1$).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chia đa thức cho đơn thức',
          text: 'Muốn chia một đa thức cho một đơn thức (trường hợp chia hết), ta chia từng hạng tử của đa thức cho đơn thức đó rồi cộng các kết quả với nhau.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} &(-x^6 + 5x^4 - 2x^3) : 0{,}5x^2 \\\\ &= (-x^6) : 0{,}5x^2 + 5x^4 : 0{,}5x^2 + (-2x^3) : 0{,}5x^2 \\\\ &= -2x^4 + 10x^2 - 4x \\end{aligned}',
        },
      ],
    },
    {
      heading: 'Chia đa thức cho đa thức, trường hợp chia hết',
      blocks: [
        {
          type: 'p',
          text: 'Để chia đa thức $A$ cho đa thức $B$ (cả hai đã sắp xếp theo lũy thừa giảm dần của biến), ta đặt tính như chia hai số tự nhiên và lặp lại ba thao tác:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chia: chia hạng tử bậc cao nhất của đa thức bị chia (hoặc của dư vừa có) cho hạng tử bậc cao nhất của đa thức chia, được một hạng tử của thương.',
            'Nhân: nhân hạng tử vừa tìm được với đa thức chia, viết tích dưới đa thức bị chia sao cho các hạng tử cùng bậc thẳng cột.',
            'Trừ: lấy đa thức bị chia trừ đi tích đó, được dư thứ nhất. Tiếp tục với dư này cho đến khi được dư bằng $0$ hoặc dư có bậc nhỏ hơn bậc của đa thức chia.',
          ],
        },
        {
          type: 'table',
          caption: 'Đặt tính $(2x^4 - 3x^3 - 3x^2 + 6x - 2) : (x^2 - 2)$',
          head: ['Dòng', 'Bậc 4', 'Bậc 3', 'Bậc 2', 'Bậc 1', 'Bậc 0'],
          rows: [
            ['Bị chia', '$2x^4$', '$-3x^3$', '$-3x^2$', '$6x$', '$-2$'],
            ['Trừ $2x^2 \\cdot (x^2 - 2)$', '$2x^4$', '—', '$-4x^2$', '—', '—'],
            ['Dư thứ nhất', '—', '$-3x^3$', '$x^2$', '$6x$', '$-2$'],
            ['Trừ $-3x \\cdot (x^2 - 2)$', '—', '$-3x^3$', '—', '$6x$', '—'],
            ['Dư thứ hai', '—', '—', '$x^2$', '—', '$-2$'],
            ['Trừ $1 \\cdot (x^2 - 2)$', '—', '—', '$x^2$', '—', '$-2$'],
            ['Dư cuối cùng', '—', '—', '—', '—', '$0$'],
          ],
        },
        {
          type: 'p',
          text: 'Dư cuối cùng bằng $0$, nên phép chia là phép chia hết và thương là $2x^2 - 3x + 1$. Vậy đa thức cần tìm ở đầu bài là $P = 2x^2 - 3x + 1$. Kiểm tra bằng phép nhân: $(x^2 - 2)(2x^2 - 3x + 1) = 2x^4 - 3x^3 + x^2 - 4x^2 + 6x - 2 = 2x^4 - 3x^3 - 3x^2 + 6x - 2$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu đa thức bị chia khuyết một bậc nào đó, nên để trống cột của bậc ấy khi đặt tính để các hạng tử cùng bậc luôn thẳng cột.',
        },
      ],
    },
    {
      heading: 'Chia đa thức cho đa thức, trường hợp có dư',
      blocks: [
        {
          type: 'p',
          text: 'Chia $D = 5x^3 - 3x^2 - x + 7$ cho $E = x^2 + 1$: $\\;5x^3 : x^2 = 5x$, dư thứ nhất là $D - 5x(x^2 + 1) = -3x^2 - 6x + 7$; $\\;-3x^2 : x^2 = -3$, dư thứ hai là $-3x^2 - 6x + 7 - (-3)(x^2 + 1) = -6x + 10$. Dư $-6x + 10$ có bậc $1$ nhỏ hơn bậc $2$ của $E$ nên phép chia dừng lại.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phép chia có dư',
          text: 'Với hai đa thức $A$, $B$ ($B \\ne 0$), luôn tìm được duy nhất hai đa thức $Q$ (thương) và $R$ (dư) sao cho $A = B \\cdot Q + R$, trong đó $R = 0$ hoặc $R$ có bậc nhỏ hơn bậc của $B$. Khi $R = 0$ ta có phép chia hết; khi $R \\ne 0$ ta có phép chia có dư.',
        },
        {
          type: 'tex',
          tex: '5x^3 - 3x^2 - x + 7 = (x^2 + 1)(5x - 3) + (-6x + 10)',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Nếu bậc của $A$ nhỏ hơn bậc của $B$ thì thương $Q = 0$ và dư $R = A$. Ví dụ: $(21x - 4) : 3x^2$ có thương $0$ và dư $21x - 4$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia đa thức như chia số',
    instruction:
      'Chọn một phép chia rồi bấm “Bước tiếp” (hoặc Tab tới nút rồi Enter) để làm từng thao tác chia, nhân, trừ. Bên trái là phép chia đa thức, bên phải là phép chia số tự nhiên có cùng số vòng: hai phép chia đi cùng nhịp. Quan sát xem khi nào phải dừng, và kiểm tra lại bằng đẳng thức bị chia = chia · thương + dư.',
  },
  examples: [
    {
      problem: 'Thực hiện phép chia $(-5x^3 + 15x^2 + 18x) : (-5x)$.',
      steps: [
        'Chia từng hạng tử cho $-5x$: $(-5x^3) : (-5x) = x^2$; $\\;15x^2 : (-5x) = -3x$; $\\;18x : (-5x) = -3{,}6$.',
        'Cộng các kết quả: $x^2 - 3x - 3{,}6$.',
        'Kiểm tra: $-5x \\cdot (x^2 - 3x - 3{,}6) = -5x^3 + 15x^2 + 18x$.',
      ],
      answer: '$x^2 - 3x - 3{,}6$.',
    },
    {
      problem: 'Đặt tính để chia $6x^3 - 2x^2 - 9x + 3$ cho $3x - 1$.',
      steps: [
        '$6x^3 : 3x = 2x^2$; $\\;2x^2(3x - 1) = 6x^3 - 2x^2$; dư thứ nhất: $-9x + 3$.',
        '$-9x : 3x = -3$; $\\;-3(3x - 1) = -9x + 3$; dư thứ hai: $0$.',
        'Thương là $2x^2 - 3$ (không có hạng tử bậc $1$), phép chia hết.',
      ],
      answer: '$(6x^3 - 2x^2 - 9x + 3) : (3x - 1) = 2x^2 - 3$.',
    },
    {
      problem:
        'Tìm thương $Q$ và dư $R$ khi chia $A = 3x^4 - 6x - 5$ cho $B = x^2 + 3x - 1$, rồi viết $A = B \\cdot Q + R$.',
      steps: [
        '$3x^4 : x^2 = 3x^2$; $\\;3x^2 \\cdot B = 3x^4 + 9x^3 - 3x^2$; dư: $-9x^3 + 3x^2 - 6x - 5$.',
        '$-9x^3 : x^2 = -9x$; $\\;-9x \\cdot B = -9x^3 - 27x^2 + 9x$; dư: $30x^2 - 15x - 5$.',
        '$30x^2 : x^2 = 30$; $\\;30 \\cdot B = 30x^2 + 90x - 30$; dư: $-105x + 25$, bậc $1 < 2$ nên dừng.',
        'Kiểm tra tại $x = 1$: $A(1) = -8$; $B(1) \\cdot Q(1) + R(1) = 3 \\cdot 24 + (-80) = -8$.',
      ],
      answer:
        '$Q = 3x^2 - 9x + 30$, $R = -105x + 25$; $\\;3x^4 - 6x - 5 = (x^2 + 3x - 1)(3x^2 - 9x + 30) - 105x + 25$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kết quả của phép chia $8x^5 : 4x^3$ là',
      options: ['$2x^2$', '$2x^8$', '$4x^2$', '$2x^{15}$'],
      answer: 0,
      hints: ['Chia hệ số cho hệ số, rồi trừ các số mũ của $x$.'],
      solution: '$8x^5 : 4x^3 = (8 : 4)x^{5 - 3} = 2x^2$.',
    },
    {
      type: 'choice',
      prompt: 'Đơn thức $3x^2$ không chia hết cho đơn thức nào dưới đây?',
      options: ['$x$', '$-6x^2$', '$x^3$', '$0{,}5x$'],
      answer: 2,
      hints: ['$ax^m$ chia hết cho $bx^n$ ($b \\ne 0$) khi $m \\ge n$.'],
      solution:
        'Số mũ $2$ của $3x^2$ nhỏ hơn số mũ $3$ của $x^3$, nên $3x^2$ không chia hết cho $x^3$. Các phép chia còn lại cho $3x$; $\\;-0{,}5$; $\\;6x$.',
    },
    {
      type: 'number',
      prompt:
        'Thực hiện phép chia $(12x^4 - 6x^3 + 3x^2) : 3x^2$. Hệ số của $x$ trong thương là bao nhiêu?',
      answer: -2,
      hints: ['Chia từng hạng tử cho $3x^2$.', 'Hạng tử bậc $1$ của thương đến từ $-6x^3 : 3x^2$.'],
      solution: '$(12x^4 - 6x^3 + 3x^2) : 3x^2 = 4x^2 - 2x + 1$. Hệ số của $x$ là $-2$.',
    },
    {
      type: 'choice',
      prompt: 'Thương của phép chia $(x^3 - 1) : (x - 1)$ là',
      options: ['$x^2 + x + 1$', '$x^2 - x + 1$', '$x^2 + 1$', '$x^2 + x - 1$'],
      answer: 0,
      hints: [
        'Đặt tính, để trống các cột bậc $2$ và bậc $1$ của $x^3 - 1$.',
        'Vòng đầu: $x^3 : x = x^2$, dư thứ nhất là $x^2 - 1$.',
      ],
      solution:
        '$x^3 : x = x^2$, dư $x^2 - 1$; $\\;x^2 : x = x$, dư $x - 1$; $\\;x : x = 1$, dư $0$. Thương $x^2 + x + 1$. Kiểm tra: $(x - 1)(x^2 + x + 1) = x^3 - 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm dư khi chia $2x^2 + 3x - 4$ cho $x - 1$.',
      answer: 1,
      hints: [
        'Vòng đầu: $2x^2 : x = 2x$, dư thứ nhất $5x - 4$.',
        'Chia tiếp $5x - 4$ cho $x - 1$.',
      ],
      solution:
        '$2x(x - 1) = 2x^2 - 2x$, dư $5x - 4$; $\\;5(x - 1) = 5x - 5$, dư $1$. Vậy $2x^2 + 3x - 4 = (x - 1)(2x + 5) + 1$, dư bằng $1$.',
    },
    {
      type: 'choice',
      prompt: 'Dư của phép chia $(x^3 - 3x^2 + x - 1) : (x^2 - 3x)$ là',
      options: ['$x - 1$', '$-1$', '$x + 1$', '$0$'],
      answer: 0,
      hints: ['$x^3 : x^2 = x$. Tính $x(x^2 - 3x)$ rồi trừ.'],
      solution:
        '$x(x^2 - 3x) = x^3 - 3x^2$; dư $x - 1$ có bậc $1$ nhỏ hơn bậc $2$ của đa thức chia nên dừng. Thương $x$, dư $x - 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số $a$ để đa thức $x^2 - 5x + a$ chia hết cho đa thức $x - 2$.',
      answer: 6,
      hints: [
        'Đặt tính chia như bình thường, coi $a$ là một số.',
        'Dư cuối cùng là một biểu thức chứa $a$; chia hết khi dư bằng $0$.',
      ],
      solution:
        '$x(x - 2) = x^2 - 2x$, dư $-3x + a$; $\\;-3(x - 2) = -3x + 6$, dư $a - 6$. Chia hết khi $a - 6 = 0$, tức là $a = 6$. Khi đó $x^2 - 5x + 6 = (x - 2)(x - 3)$.',
    },
    {
      type: 'number',
      prompt: 'Chia một đa thức bậc $5$ cho một đa thức bậc $2$. Thương có bậc bằng bao nhiêu?',
      answer: 3,
      hints: ['Hạng tử đầu tiên của thương là thương của hai hạng tử bậc cao nhất.'],
      solution:
        'Hạng tử đầu tiên của thương là $ax^5 : bx^2 = \\frac{a}{b}x^3$, các hạng tử sau có bậc nhỏ hơn. Vậy thương có bậc $5 - 2 = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có diện tích $6x^2 + 7x + 2$ (cm$^2$) và chiều rộng $2x + 1$ (cm). Tìm chiều dài theo $x$, rồi tính chiều dài khi $x = 3$.',
      answer: 11,
      unit: 'cm',
      hints: ['Chiều dài bằng diện tích chia cho chiều rộng.', '$6x^2 : 2x = 3x$.'],
      solution:
        '$(6x^2 + 7x + 2) : (2x + 1)$: $\\;3x(2x + 1) = 6x^2 + 3x$, dư $4x + 2$; $\\;2(2x + 1) = 4x + 2$, dư $0$. Chiều dài là $3x + 2$ (cm); khi $x = 3$, chiều dài là $11$ cm. Kiểm tra: $7 \\cdot 11 = 77 = 6 \\cdot 9 + 21 + 2$.',
    },
  ],
  takeaways: [
    '$A$ chia hết cho $B$ ($B \\ne 0$) khi có $Q$ để $A = B \\cdot Q$.',
    'Chia đơn thức: $ax^m : bx^n = \\frac{a}{b}x^{m - n}$ ($m \\ge n$). Chia đa thức cho đơn thức: chia từng hạng tử rồi cộng.',
    'Chia hai đa thức đã sắp xếp: lặp lại chia, nhân, trừ cho đến khi dư bằng $0$ hoặc có bậc nhỏ hơn bậc của đa thức chia.',
    'Luôn có $A = B \\cdot Q + R$ với $R = 0$ (chia hết) hoặc bậc của $R$ nhỏ hơn bậc của $B$ (chia có dư); kiểm tra bằng phép nhân.',
  ],
};
