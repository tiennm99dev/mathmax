/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng, trừ hai đa thức một biến theo hàng ngang (bỏ ngoặc, nhóm và thu gọn các hạng tử cùng bậc) hoặc theo cột dọc (sắp xếp hai đa thức theo cùng một thứ tự, đặt các hạng tử cùng bậc thẳng cột rồi cộng, trừ từng cột).',
  intro:
    'Một cửa hàng bán hai loại hộp quà. Nếu số tiền thu được từ loại thứ nhất và loại thứ hai được biểu thị bởi hai đa thức của cùng một biến $x$, thì tổng số tiền là tổng hai đa thức đó. Cộng hai đa thức cũng giống như cộng hai số nhiều chữ số: chỉ cộng các "hàng" giống nhau, ở đây là các hạng tử cùng bậc.',
  objectives: [
    'Thu gọn đa thức bằng cách nhóm và cộng các hạng tử cùng bậc.',
    'Cộng hai đa thức một biến theo hàng ngang và theo cột dọc.',
    'Trừ hai đa thức một biến, chú ý đổi dấu các hạng tử của đa thức bị trừ.',
  ],
  sections: [
    {
      heading: 'Cộng hai đa thức một biến',
      blocks: [
        {
          type: 'p',
          text: 'Cho $P(x) = 2x^3 - 3x^2 + 5x - 1$ và $Q(x) = -2x^3 + x^2 + 4$. Có hai cách tính $P(x) + Q(x)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách 1: Cộng theo hàng ngang',
          text: 'Viết tổng hai đa thức, bỏ dấu ngoặc, nhóm các hạng tử cùng bậc rồi thu gọn.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} P(x) + Q(x) &= (2x^3 - 3x^2 + 5x - 1) \\\\ &\\quad + (-2x^3 + x^2 + 4) \\\\ &= (2x^3 - 2x^3) + (-3x^2 + x^2) \\\\ &\\quad + 5x + (-1 + 4) \\\\ &= -2x^2 + 5x + 3. \\end{aligned}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách 2: Cộng theo cột dọc',
          text: 'Sắp xếp hai đa thức theo cùng một thứ tự (thường là lũy thừa giảm dần của biến), đặt các hạng tử cùng bậc ở cùng một cột rồi cộng theo từng cột.',
        },
        {
          type: 'table',
          caption: 'Đặt tính cộng theo cột (dấu — : không có hạng tử bậc đó)',
          head: ['Đa thức', 'Bậc 3', 'Bậc 2', 'Bậc 1', 'Bậc 0'],
          rows: [
            ['$P(x)$', '$2x^3$', '$-3x^2$', '$5x$', '$-1$'],
            ['$+\\;Q(x)$', '$-2x^3$', '$x^2$', '—', '$4$'],
            ['$P(x) + Q(x)$', '$0$', '$-2x^2$', '$5x$', '$3$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Phép cộng đa thức một biến có tính chất giao hoán và kết hợp như phép cộng các số: $P + Q = Q + P$; $\\;(P + Q) + R = P + (Q + R)$.',
        },
      ],
    },
    {
      heading: 'Trừ hai đa thức một biến',
      blocks: [
        {
          type: 'p',
          text: 'Trừ hai đa thức cũng làm theo hàng ngang hoặc theo cột dọc. Điểm khác duy nhất: khi bỏ dấu ngoặc có dấu trừ đằng trước, phải đổi dấu mọi hạng tử của đa thức bị trừ.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} P(x) - Q(x) &= (2x^3 - 3x^2 + 5x - 1) \\\\ &\\quad - (-2x^3 + x^2 + 4) \\\\ &= 2x^3 - 3x^2 + 5x - 1 \\\\ &\\quad + 2x^3 - x^2 - 4 \\\\ &= 4x^3 - 4x^2 + 5x - 5. \\end{aligned}',
        },
        {
          type: 'p',
          text: 'Khi trừ theo cột, ở mỗi cột ta lấy hạng tử của $P(x)$ trừ đi hạng tử của $Q(x)$, ví dụ cột bậc $3$: $2x^3 - (-2x^3) = 4x^3$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Một lỗi hay gặp là khi bỏ ngoặc chỉ đổi dấu hạng tử đầu tiên của $Q(x)$. Phải đổi dấu tất cả: ta có $P - Q = P + (-Q)$, trong đó $-Q(x) = 2x^3 - x^2 - 4$ là đa thức có mọi hệ số đổi dấu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt thẳng cột theo bậc',
    instruction:
      'Chọn một cặp đa thức và phép tính. Ở cách viết "Như đề bài", các hạng tử cùng bậc có cùng màu. Chuyển sang "Đặt thẳng cột": các hạng tử cùng màu xếp vào một cột. Bấm "Tính cột tiếp theo" để cộng hoặc trừ từng cột, từ bậc cao nhất.',
  },
  examples: [
    {
      problem:
        'Cho $P(x) = x^4 + 3x^2 - 2x + 1$ và $Q(x) = -2x^3 + x^2 + 2x - 4$. Tính $P(x) + Q(x)$ theo hàng ngang.',
      steps: [
        '$P(x) + Q(x) = x^4 + 3x^2 - 2x + 1 - 2x^3 + x^2 + 2x - 4$.',
        'Nhóm các hạng tử cùng bậc: $x^4 - 2x^3 + (3x^2 + x^2) + (-2x + 2x) + (1 - 4)$.',
        'Thu gọn: $x^4 - 2x^3 + 4x^2 + 0x - 3$.',
      ],
      answer: '$P(x) + Q(x) = x^4 - 2x^3 + 4x^2 - 3$.',
    },
    {
      problem: 'Với $P(x)$, $Q(x)$ như trên, tính $P(x) - Q(x)$ theo cột dọc.',
      steps: [
        'Hai đa thức đã sắp xếp theo lũy thừa giảm dần. Đặt các hạng tử cùng bậc thẳng cột; $P(x)$ không có hạng tử bậc $3$ (hệ số $0$).',
        'Cột bậc $4$: $x^4 - 0 = x^4$. Cột bậc $3$: $0 - (-2x^3) = 2x^3$.',
        'Cột bậc $2$: $3x^2 - x^2 = 2x^2$. Cột bậc $1$: $-2x - 2x = -4x$. Cột bậc $0$: $1 - (-4) = 5$.',
      ],
      answer: '$P(x) - Q(x) = x^4 + 2x^3 + 2x^2 - 4x + 5$.',
    },
    {
      problem: 'Tìm đa thức $R(x)$ sao cho $R(x) + (x^2 - 2x) = 3x^2 + x - 1$.',
      steps: [
        '$R(x)$ là hiệu: $R(x) = (3x^2 + x - 1) - (x^2 - 2x)$.',
        'Bỏ ngoặc, đổi dấu các hạng tử của đa thức bị trừ: $3x^2 + x - 1 - x^2 + 2x$.',
        'Thu gọn: $(3x^2 - x^2) + (x + 2x) - 1 = 2x^2 + 3x - 1$.',
      ],
      answer: '$R(x) = 2x^2 + 3x - 1$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cho $P(x) = 0{,}5x^2 + 2x - 3$ và $Q(x) = 1{,}5x^2 - x$. Hệ số của $x^2$ trong $P(x) + Q(x)$ bằng bao nhiêu?',
      answer: 2,
      hints: ['Cộng hệ số của hai hạng tử bậc $2$.'],
      solution: '$0{,}5x^2 + 1{,}5x^2 = 2x^2$, nên hệ số của $x^2$ là $2$.',
    },
    {
      type: 'choice',
      prompt: 'Với $P(x) = 0{,}5x^2 + 2x - 3$ và $Q(x) = 1{,}5x^2 - x$, tổng $P(x) + Q(x)$ bằng',
      options: ['$2x^2 + x - 3$', '$2x^2 + 3x - 3$', '$x^2 + x - 3$', '$2x^2 - x - 3$'],
      answer: 0,
      hints: ['Cộng từng cặp hạng tử cùng bậc: bậc $2$, bậc $1$, bậc $0$.'],
      solution: '$(0{,}5x^2 + 1{,}5x^2) + (2x - x) - 3 = 2x^2 + x - 3$.',
    },
    {
      type: 'choice',
      prompt: 'Với $P(x) = 0{,}5x^2 + 2x - 3$ và $Q(x) = 1{,}5x^2 - x$, hiệu $P(x) - Q(x)$ bằng',
      options: ['$-x^2 + x - 3$', '$-x^2 + 3x - 3$', '$x^2 + 3x - 3$', '$-x^2 + 3x + 3$'],
      answer: 1,
      hints: ['Bỏ ngoặc: $-(1{,}5x^2 - x) = -1{,}5x^2 + x$.'],
      solution: '$0{,}5x^2 + 2x - 3 - 1{,}5x^2 + x = -x^2 + 3x - 3$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $P(x) = x^3 + 2x - 1$ và $Q(x) = -x^3 + x^2 + 5$. Tìm bậc của đa thức $P(x) + Q(x)$.',
      answer: 2,
      hints: ['Cộng hai hạng tử bậc $3$ trước.'],
      solution:
        '$P(x) + Q(x) = (x^3 - x^3) + x^2 + 2x + (-1 + 5) = x^2 + 2x + 4$, có bậc $2$ (không phải $3$, vì hai hạng tử bậc $3$ triệt tiêu).',
    },
    {
      type: 'number',
      prompt:
        'Cho $P(x) = 4x^3 - x + 2$ và $Q(x) = 3x^3 + 2x^2 - x$. Hệ số của $x$ trong $P(x) - Q(x)$ bằng bao nhiêu?',
      answer: 0,
      hints: ['Lấy hệ số của $x$ trong $P$ trừ hệ số của $x$ trong $Q$.'],
      solution:
        '$-x - (-x) = -x + x = 0$, nên hệ số của $x$ là $0$: $P(x) - Q(x) = x^3 - 2x^2 + 2$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $P(x) = 2x^2 - 3x + 1$ và $Q(x) = x^2 + 3x - 5$. Tính giá trị của $P(x) + Q(x)$ tại $x = 1$.',
      answer: -1,
      hints: ['Thu gọn $P(x) + Q(x)$ trước rồi thay $x = 1$; hoặc tính $P(1) + Q(1)$.'],
      solution:
        '$P(x) + Q(x) = 3x^2 - 4$, tại $x = 1$ có giá trị $3 - 4 = -1$. Kiểm tra: $P(1) = 0$, $Q(1) = -1$, tổng $-1$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(x) = x^2 - 7$ và $Q(x) = 2x - 10$. Tìm hệ số tự do của $P(x) - Q(x)$.',
      answer: 3,
      hints: ['Hệ số tự do của hiệu bằng hiệu hai hệ số tự do.'],
      solution: '$P(x) - Q(x) = x^2 - 2x - 7 + 10 = x^2 - 2x + 3$, hệ số tự do là $3$.',
    },
    {
      type: 'choice',
      prompt: 'Tìm đa thức $R(x)$ sao cho $R(x) - (2x^2 - x + 3) = x^2 + 4x$.',
      options: ['$-x^2 + 5x - 3$', '$3x^2 + 5x - 3$', '$3x^2 + 3x + 3$', '$3x^2 + 5x + 3$'],
      answer: 2,
      hints: ['$R(x)$ là số bị trừ: $R(x) = (x^2 + 4x) + (2x^2 - x + 3)$.'],
      solution: '$R(x) = x^2 + 4x + 2x^2 - x + 3 = 3x^2 + 3x + 3$.',
    },
    {
      type: 'multi',
      prompt: 'Với mọi đa thức $P$, $Q$, $R$ của cùng một biến, những đẳng thức nào luôn đúng?',
      options: [
        '$P + Q = Q + P$',
        '$P - Q = Q - P$',
        '$(P + Q) + R = P + (Q + R)$',
        '$P - Q = P + (-Q)$',
      ],
      answers: [0, 2, 3],
      hints: ['Thử với hai số, chẳng hạn $5$ và $2$.'],
      solution:
        'Phép cộng có tính chất giao hoán và kết hợp, và trừ $Q$ là cộng với đa thức đối $-Q$. Phép trừ không giao hoán: $5 - 2 \\ne 2 - 5$.',
    },
  ],
  takeaways: [
    'Cộng (trừ) theo hàng ngang: bỏ ngoặc, nhóm các hạng tử cùng bậc rồi thu gọn.',
    'Cộng (trừ) theo cột dọc: sắp xếp hai đa thức theo cùng thứ tự, đặt các hạng tử cùng bậc thẳng cột rồi tính từng cột.',
    'Khi trừ, đổi dấu tất cả các hạng tử của đa thức bị trừ: $P - Q = P + (-Q)$.',
    'Các hạng tử cùng bậc có thể triệt tiêu nhau, nên bậc của tổng (hiệu) có thể nhỏ hơn bậc của hai đa thức ban đầu.',
  ],
};
