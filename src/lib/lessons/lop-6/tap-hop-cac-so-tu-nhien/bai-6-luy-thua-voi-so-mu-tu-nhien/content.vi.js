/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lũy thừa với số mũ tự nhiên: định nghĩa a mũ n, cơ số và số mũ, bình phương và lập phương, số chính phương, nhân và chia hai lũy thừa cùng cơ số.',
  intro:
    'Một tế bào cứ mỗi giờ lại tách đôi. Sau $1$ giờ có $2$ tế bào, sau $2$ giờ có $2 \\cdot 2 = 4$, sau $3$ giờ có $2 \\cdot 2 \\cdot 2 = 8$. Sau $10$ giờ thì sao? Viết $10$ thừa số $2$ thật dài dòng. Toán học có cách viết gọn tích nhiều thừa số bằng nhau: lũy thừa. Sau $10$ giờ có $2^{10} = 1\\,024$ tế bào.',
  objectives: [
    'Viết gọn một tích các thừa số bằng nhau thành lũy thừa; gọi đúng cơ số, số mũ và tính giá trị lũy thừa.',
    'Nhân, chia hai lũy thừa cùng cơ số: $a^m \\cdot a^n = a^{m+n}$, $a^m : a^n = a^{m-n}$.',
    'Nhận biết số chính phương; viết một số tự nhiên thành tổng các lũy thừa của $10$.',
  ],
  sections: [
    {
      heading: 'Lũy thừa với số mũ tự nhiên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lũy thừa',
          text: 'Lũy thừa bậc $n$ của $a$, kí hiệu $a^n$, là tích của $n$ thừa số $a$: $$a^n = \\underbrace{a \\cdot a \\cdot \\ldots \\cdot a}_{n \\text{ thừa số}} \\quad (n \\in \\mathbb{N}^*).$$ Ta đọc $a^n$ là "$a$ mũ $n$" hoặc "$a$ lũy thừa $n$". Số $a$ gọi là cơ số, $n$ gọi là số mũ.',
        },
        {
          type: 'p',
          text: 'Phép nhân nhiều thừa số bằng nhau gọi là phép nâng lên lũy thừa. Ví dụ: $3 \\cdot 3 \\cdot 3 \\cdot 3 = 3^4 = 81$ (cơ số $3$, số mũ $4$).',
        },
        {
          type: 'list',
          items: [
            '$a^2$ còn đọc là "$a$ bình phương" (bình phương của $a$).',
            '$a^3$ còn đọc là "$a$ lập phương" (lập phương của $a$).',
            'Quy ước: $a^1 = a$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số chính phương',
          text: 'Số tự nhiên bằng bình phương của một số tự nhiên gọi là số chính phương. Ví dụ: $0 = 0^2$, $1 = 1^2$, $4 = 2^2$, $9 = 3^2$, $16 = 4^2$, $25 = 5^2$, ...',
        },
        {
          type: 'table',
          caption: 'Lũy thừa của $10$: số mũ bằng số chữ số $0$ sau chữ số $1$',
          head: ['$10^1$', '$10^2$', '$10^3$', '$10^4$', '$10^6$'],
          rows: [['$10$', '$100$', '$1\\,000$', '$10\\,000$', '$1\\,000\\,000$']],
        },
        {
          type: 'p',
          text: 'Nhờ lũy thừa của $10$, cấu tạo thập phân của một số được viết gọn: $23\\,197 = 2 \\cdot 10^4 + 3 \\cdot 10^3 + 1 \\cdot 10^2 + 9 \\cdot 10 + 7$.',
        },
      ],
    },
    {
      heading: 'Nhân hai lũy thừa cùng cơ số',
      blocks: [
        {
          type: 'p',
          text: 'Ví dụ: $2^3 \\cdot 2^2 = (2 \\cdot 2 \\cdot 2) \\cdot (2 \\cdot 2) = 2^5$. Có $3 + 2 = 5$ thừa số $2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ: $$a^m \\cdot a^n = a^{m+n}.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ cộng số mũ khi hai lũy thừa có cùng cơ số. Không được nhân các số mũ: $2^3 \\cdot 2^2 = 2^5$, không phải $2^6$.',
        },
      ],
    },
    {
      heading: 'Chia hai lũy thừa cùng cơ số',
      blocks: [
        {
          type: 'p',
          text: 'Ví dụ: $2^5 : 2^2 = 2^3$ vì $2^3 \\cdot 2^2 = 2^5$. Chia cho $2^2$ là bỏ đi $2$ thừa số $2$ trong $5$ thừa số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Khi chia hai lũy thừa cùng cơ số (khác $0$), ta giữ nguyên cơ số và trừ các số mũ: $$a^m : a^n = a^{m-n} \\quad (a \\ne 0,\\ m \\ge n).$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy ước',
          text: '$a^0 = 1$ với $a \\ne 0$. Chẳng hạn $5^3 : 5^3 = 5^0 = 1$, đúng với $125 : 125 = 1$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy nhân và các lũy thừa',
    instruction:
      'Ở chế độ "Máy nhân", mỗi lần bấm "Nhân thêm" đống khối được nhân lên $a$ lần và số mũ tăng $1$; mỗi màu là một bản sao của đống trước. Ở hai chế độ còn lại, kéo thanh trượt để xem vì sao $a^m \\cdot a^n = a^{m+n}$ và $a^m : a^n = a^{m-n}$.',
  },
  examples: [
    {
      problem:
        'Viết gọn các tích sau bằng lũy thừa rồi tính giá trị: a) $3 \\cdot 3 \\cdot 3 \\cdot 3$; b) $10 \\cdot 10 \\cdot 10 \\cdot 10 \\cdot 10$.',
      steps: [
        'a) Có $4$ thừa số bằng $3$: $3 \\cdot 3 \\cdot 3 \\cdot 3 = 3^4$.',
        '$3^4 = 9 \\cdot 9 = 81$.',
        'b) Có $5$ thừa số bằng $10$: tích bằng $10^5 = 100\\,000$ (chữ số $1$ và năm chữ số $0$).',
      ],
      answer: 'a) $3^4 = 81$; b) $10^5 = 100\\,000$.',
    },
    {
      problem:
        'Viết kết quả dưới dạng một lũy thừa: a) $5^3 \\cdot 5^4$; b) $7^6 : 7^4$; c) $2^3 \\cdot 4$.',
      steps: [
        'a) Cùng cơ số $5$, cộng số mũ: $5^3 \\cdot 5^4 = 5^{3+4} = 5^7$.',
        'b) Cùng cơ số $7$, trừ số mũ: $7^6 : 7^4 = 7^{6-4} = 7^2$.',
        'c) Viết $4 = 2^2$ để có cùng cơ số: $2^3 \\cdot 2^2 = 2^{3+2} = 2^5$.',
      ],
      answer: 'a) $5^7$; b) $7^2$; c) $2^5$.',
    },
    {
      problem: 'Viết số $4\\,983$ thành tổng giá trị các chữ số của nó, dùng lũy thừa của $10$.',
      steps: [
        'Chữ số $4$ ở hàng nghìn: giá trị $4 \\cdot 1\\,000 = 4 \\cdot 10^3$.',
        'Chữ số $9$ ở hàng trăm: $9 \\cdot 10^2$; chữ số $8$ ở hàng chục: $8 \\cdot 10$; chữ số $3$ ở hàng đơn vị.',
      ],
      answer: '$4\\,983 = 4 \\cdot 10^3 + 9 \\cdot 10^2 + 8 \\cdot 10 + 3$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $2^5$.',
      answer: 32,
      hints: ['$2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$.'],
      solution: '$2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$.',
    },
    {
      type: 'choice',
      prompt: 'Viết tích $5 \\cdot 5 \\cdot 5 \\cdot 25$ dưới dạng một lũy thừa của $5$.',
      options: ['$5^4$', '$5^5$', '$5^3$', '$5^6$'],
      answer: 1,
      hints: ['Viết $25$ thành lũy thừa của $5$.'],
      solution:
        '$25 = 5 \\cdot 5$, nên tích có $3 + 2 = 5$ thừa số $5$: $5 \\cdot 5 \\cdot 5 \\cdot 25 = 5^5$.',
    },
    {
      type: 'number',
      prompt: 'Viết $2^3 \\cdot 2^4$ dưới dạng $2^k$. Tìm $k$.',
      answer: 7,
      hints: ['Nhân hai lũy thừa cùng cơ số: cộng số mũ.'],
      solution: '$2^3 \\cdot 2^4 = 2^{3+4} = 2^7$, nên $k = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tính $3^8 : 3^5$.',
      answer: 27,
      hints: ['Chia hai lũy thừa cùng cơ số: trừ số mũ.', 'Kết quả là $3^3$.'],
      solution: '$3^8 : 3^5 = 3^{8-5} = 3^3 = 27$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $n$, biết $2^n = 64$.',
      answer: 6,
      hints: ['Lần lượt tính $2^1, 2^2, 2^3, \\ldots$ cho đến khi được $64$.'],
      solution: '$2^6 = 64$, nên $n = 6$.',
    },
    {
      type: 'multi',
      prompt: 'Những số nào là số chính phương?',
      options: ['$16$', '$20$', '$49$', '$50$', '$81$', '$100$'],
      answers: [0, 2, 4, 5],
      hints: [
        'Số chính phương là bình phương của một số tự nhiên.',
        'Thử $4^2$, $7^2$, $9^2$, $10^2$.',
      ],
      solution:
        '$16 = 4^2$, $49 = 7^2$, $81 = 9^2$, $100 = 10^2$ là số chính phương. $20$ và $50$ không phải: $4^2 = 16 < 20 < 25 = 5^2$ và $7^2 = 49 < 50 < 64 = 8^2$.',
    },
    {
      type: 'number',
      prompt: 'Biết $2^{10} = 1\\,024$. Tính $2^9$.',
      answer: 512,
      hints: ['$2^{10} = 2^9 \\cdot 2$.'],
      solution: '$2^9 = 2^{10} : 2 = 1\\,024 : 2 = 512$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi lũy thừa với giá trị của nó.',
      left: ['$3^4$', '$4^3$', '$5^3$', '$10^4$'],
      right: ['$64$', '$10\\,000$', '$81$', '$125$'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['$3^4 = 3 \\cdot 3 \\cdot 3 \\cdot 3$ và $4^3 = 4 \\cdot 4 \\cdot 4$ khác nhau.'],
      solution: '$3^4 = 81$, $4^3 = 64$, $5^3 = 125$, $10^4 = 10\\,000$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của tổng $3 \\cdot 10^3 + 5 \\cdot 10^2 + 2 \\cdot 10 + 8$.',
      answer: 3528,
      hints: ['$10^3 = 1\\,000$ và $10^2 = 100$.'],
      solution: '$3\\,000 + 500 + 20 + 8 = 3\\,528$.',
    },
    {
      type: 'number',
      prompt:
        'Một loại vi khuẩn cứ sau $1$ giờ thì mỗi con tách thành $2$ con. Từ $1$ con ban đầu, sau $10$ giờ có bao nhiêu con vi khuẩn?',
      answer: 1024,
      unit: 'con',
      hints: ['Sau mỗi giờ số vi khuẩn nhân với $2$.', 'Sau $10$ giờ: $1 \\cdot 2^{10}$.'],
      solution: 'Sau $10$ giờ có $2^{10} = 1\\,024$ con vi khuẩn.',
    },
  ],
  takeaways: [
    '$a^n = a \\cdot a \\cdot \\ldots \\cdot a$ ($n$ thừa số $a$); $a$ là cơ số, $n$ là số mũ; $a^1 = a$.',
    '$a^m \\cdot a^n = a^{m+n}$; $\\ a^m : a^n = a^{m-n}$ với $a \\ne 0$, $m \\ge n$; $a^0 = 1$ với $a \\ne 0$.',
    'Số chính phương là bình phương của một số tự nhiên: $0, 1, 4, 9, 16, 25, \\ldots$',
    '$10^n$ là chữ số $1$ theo sau bởi $n$ chữ số $0$.',
  ],
};
