/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bất đẳng thức, tính chất bắc cầu, liên hệ giữa thứ tự với phép cộng và với phép nhân: nhân hai vế với số dương giữ chiều, nhân với số âm đổi chiều.',
  intro:
    'Trên một chiếc cân, đĩa nặng hơn thì chìm xuống. Thêm cùng một quả cân vào hai đĩa, cân vẫn nghiêng như cũ. Với các số cũng vậy: cộng cùng một số vào hai vế, thứ tự không đổi. Nhưng nhân hai vế với một số âm thì lại khác: chiều nghiêng đảo ngược. Bài này giải thích vì sao.',
  objectives: [
    'Nhận biết bất đẳng thức, vế trái, vế phải; hai bất đẳng thức cùng chiều, ngược chiều.',
    'Dùng tính chất bắc cầu để so sánh hai số.',
    'Vận dụng liên hệ giữa thứ tự và phép cộng, phép nhân để chứng minh và so sánh.',
  ],
  sections: [
    {
      heading: 'Bất đẳng thức',
      blocks: [
        {
          type: 'p',
          text: 'Với hai số thực $a$ và $b$, luôn xảy ra đúng một trong ba trường hợp: $a = b$, $a < b$ hoặc $a > b$.',
        },
        {
          type: 'list',
          items: [
            'Số $a$ lớn hơn hoặc bằng số $b$, tức là $a > b$ hoặc $a = b$, kí hiệu là $a \\ge b$.',
            'Số $a$ nhỏ hơn hoặc bằng số $b$, tức là $a < b$ hoặc $a = b$, kí hiệu là $a \\le b$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bất đẳng thức',
          text: 'Ta gọi hệ thức dạng $a > b$ (hay $a < b$, $a \\ge b$, $a \\le b$) là bất đẳng thức, trong đó $a$ là vế trái, $b$ là vế phải của bất đẳng thức.',
        },
        {
          type: 'p',
          text: 'Hai bất đẳng thức $1 < 2$ và $-3 < -2$ (cùng dấu $<$) được gọi là hai bất đẳng thức cùng chiều. Hai bất đẳng thức $1 < 2$ và $-2 > -3$ được gọi là hai bất đẳng thức ngược chiều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất bắc cầu',
          text: 'Nếu $a < b$ và $b < c$ thì $a < c$. Tính chất tương tự cũng đúng với các bất đẳng thức có dấu $>$, $\\le$, $\\ge$.',
        },
        {
          type: 'p',
          text: 'Tính chất bắc cầu giúp so sánh hai số qua một số trung gian. Chẳng hạn $\\dfrac{2024}{2023} > 1$ và $1 > \\dfrac{2021}{2022}$, nên $\\dfrac{2024}{2023} > \\dfrac{2021}{2022}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh qua hiệu',
          text: '$a > b$ khi và chỉ khi $a - b > 0$; $a < b$ khi và chỉ khi $a - b < 0$. Muốn chứng minh $a \\ge b$, ta có thể chứng minh $a - b \\ge 0$.',
        },
      ],
    },
    {
      heading: 'Liên hệ giữa thứ tự và phép cộng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Khi cộng cùng một số vào cả hai vế của một bất đẳng thức, ta được bất đẳng thức mới cùng chiều với bất đẳng thức đã cho. Với ba số $a$, $b$, $c$: nếu $a < b$ thì $a + c < b + c$.',
        },
        {
          type: 'p',
          text: 'Tính chất tương tự đúng với các dấu $>$, $\\le$, $\\ge$. Vì trừ đi $c$ là cộng với $-c$, nên trừ cùng một số ở hai vế cũng giữ nguyên chiều. Ví dụ: $2023 < 2024$ nên $2023 + (-19) < 2024 + (-19)$.',
        },
      ],
    },
    {
      heading: 'Liên hệ giữa thứ tự và phép nhân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhân với số dương',
          text: 'Khi nhân cả hai vế của một bất đẳng thức với cùng một số dương, ta được bất đẳng thức mới cùng chiều với bất đẳng thức đã cho: nếu $a < b$ và $c > 0$ thì $ac < bc$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhân với số âm',
          text: 'Khi nhân cả hai vế của một bất đẳng thức với cùng một số âm, ta được bất đẳng thức mới ngược chiều với bất đẳng thức đã cho: nếu $a < b$ và $c < 0$ thì $ac > bc$.',
        },
        {
          type: 'table',
          head: ['Bắt đầu', 'Phép biến đổi', 'Kết quả', 'Chiều'],
          rows: [
            ['$2 < 5$', 'Cộng $-7$', '$-5 < -2$', 'Giữ nguyên'],
            ['$2 < 5$', 'Nhân với $3$', '$6 < 15$', 'Giữ nguyên'],
            ['$2 < 5$', 'Nhân với $-2$', '$-4 > -10$', 'Đổi ngược'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chia cũng như nhân',
          text: 'Chia hai vế cho $c$ là nhân hai vế với $\\dfrac{1}{c}$. Vì vậy chia cho số dương giữ chiều, chia cho số âm đổi chiều. Đặc biệt, $a < b$ thì $-a > -b$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cân nghiêng',
    instruction:
      'Hai đĩa cân là hai vế; đĩa có số lớn hơn chìm xuống. Chọn cộng hay nhân với $k$, đoán dấu mới rồi xem cân nghiêng thế nào. Thử nhân với một số âm: chiều nghiêng có đảo ngược không?',
  },
  examples: [
    {
      problem: 'So sánh hai số $\\dfrac{2024}{2023}$ và $\\dfrac{2021}{2022}$.',
      steps: [
        '$\\dfrac{2024}{2023} = 1 + \\dfrac{1}{2023} > 1$.',
        '$\\dfrac{2021}{2022} = 1 - \\dfrac{1}{2022} < 1$.',
        'Theo tính chất bắc cầu: $\\dfrac{2024}{2023} > 1 > \\dfrac{2021}{2022}$.',
      ],
      answer: '$\\dfrac{2024}{2023} > \\dfrac{2021}{2022}$.',
    },
    {
      problem: 'Cho $a < b$. Chứng minh $3a + 5 < 3b + 5$.',
      steps: [
        'Nhân hai vế của $a < b$ với số dương $3$: $3a < 3b$ (cùng chiều).',
        'Cộng $5$ vào hai vế: $3a + 5 < 3b + 5$ (cùng chiều).',
      ],
      answer: '$3a + 5 < 3b + 5$.',
    },
    {
      problem: 'Cho $a < b$. So sánh $-2a + 1$ và $-2b + 1$.',
      steps: [
        'Nhân hai vế của $a < b$ với số âm $-2$: $-2a > -2b$ (đổi chiều).',
        'Cộng $1$ vào hai vế: $-2a + 1 > -2b + 1$.',
      ],
      answer: '$-2a + 1 > -2b + 1$.',
    },
    {
      problem: 'Chứng minh rằng với mọi số thực $a$, $b$ ta có $a^2 + b^2 \\ge 2ab$.',
      steps: [
        'Xét hiệu: $a^2 + b^2 - 2ab = (a - b)^2$.',
        'Bình phương của một số luôn không âm: $(a - b)^2 \\ge 0$.',
        'Do đó $a^2 + b^2 - 2ab \\ge 0$, tức $a^2 + b^2 \\ge 2ab$. Dấu bằng xảy ra khi $a = b$.',
      ],
      answer: '$a^2 + b^2 \\ge 2ab$ với mọi $a$, $b$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biết $a < b$. Khẳng định nào sau đây đúng?',
      options: ['$a - 5 < b - 5$', '$a + 3 > b + 3$', '$-a < -b$', '$2a > 2b$'],
      answer: 0,
      hints: ['Cộng (hay trừ) cùng một số giữ chiều; nhân với số âm đổi chiều.'],
      solution:
        'Cộng $-5$ vào hai vế của $a < b$ được $a - 5 < b - 5$. Các khẳng định còn lại sai: cộng $3$ vẫn giữ chiều ($a + 3 < b + 3$), nhân với $-1$ đổi chiều ($-a > -b$), nhân với $2$ giữ chiều ($2a < 2b$).',
    },
    {
      type: 'choice',
      prompt: 'Biết $x \\ge y$. Khẳng định nào sau đây đúng?',
      options: ['$-3x \\ge -3y$', '$-3x \\le -3y$', '$-3x > -3y$', '$-3x < -3y$'],
      answer: 1,
      hints: ['$-3$ là số âm.', 'Nhân hai vế với số âm thì $\\ge$ thành $\\le$.'],
      solution:
        'Nhân hai vế của $x \\ge y$ với số âm $-3$, bất đẳng thức đổi chiều: $-3x \\le -3y$. Dấu bằng vẫn giữ (khi $x = y$), nên không thể viết dấu $<$.',
    },
    {
      type: 'multi',
      prompt: 'Cho $m > n$. Chọn tất cả các khẳng định đúng.',
      options: ['$m + 2 > n + 2$', '$5m > 5n$', '$-4m > -4n$', '$m - n > 0$', '$3 - m > 3 - n$'],
      answers: [0, 1, 3],
      hints: [
        'Xét từng khẳng định: phép biến đổi nào đã được dùng, với số dương hay số âm?',
        '$3 - m$ có được từ $-m$ bằng cách cộng $3$.',
      ],
      solution:
        'Cộng $2$: $m + 2 > n + 2$ (đúng). Nhân $5 > 0$: $5m > 5n$ (đúng). Nhân $-4 < 0$: $-4m < -4n$, nên khẳng định $-4m > -4n$ sai. Cộng $-n$: $m - n > 0$ (đúng). Nhân $-1$ rồi cộng $3$: $3 - m < 3 - n$, nên khẳng định cuối sai.',
    },
    {
      type: 'choice',
      prompt: 'Cặp bất đẳng thức nào là hai bất đẳng thức cùng chiều?',
      options: ['$1 < 2$ và $-3 < -2$', '$1 < 2$ và $-2 > -3$', '$5 > 4$ và $0 < 1$'],
      answer: 0,
      hints: ['Hai bất đẳng thức cùng chiều khi chúng cùng dấu $<$ (hoặc cùng dấu $>$).'],
      solution:
        '$1 < 2$ và $-3 < -2$ cùng dấu $<$ nên cùng chiều. Hai cặp còn lại có một dấu $<$ và một dấu $>$ nên ngược chiều.',
    },
    {
      type: 'number',
      prompt: 'Cho $x \\ge 4$. Giá trị nhỏ nhất của biểu thức $3x - 2$ là bao nhiêu?',
      answer: 10,
      hints: ['Nhân hai vế của $x \\ge 4$ với $3$, rồi cộng $-2$.'],
      solution:
        'Từ $x \\ge 4$ nhân với $3 > 0$: $3x \\ge 12$. Cộng $-2$: $3x - 2 \\ge 10$. Dấu bằng xảy ra khi $x = 4$, nên giá trị nhỏ nhất là $10$.',
    },
    {
      type: 'number',
      prompt: 'Cho $x \\le 3$. Giá trị nhỏ nhất của biểu thức $7 - 2x$ là bao nhiêu?',
      answer: 1,
      hints: [
        'Nhân hai vế của $x \\le 3$ với $-2$: bất đẳng thức đổi chiều.',
        'Được $-2x \\ge -6$; cộng $7$ vào hai vế.',
      ],
      solution:
        'Nhân hai vế của $x \\le 3$ với $-2 < 0$: $-2x \\ge -6$. Cộng $7$: $7 - 2x \\ge 1$. Dấu bằng xảy ra khi $x = 3$, nên giá trị nhỏ nhất là $1$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh hai số $\\dfrac{13}{12}$ và $\\dfrac{11}{13}$.',
      options: [
        '$\\dfrac{13}{12} > \\dfrac{11}{13}$',
        '$\\dfrac{13}{12} < \\dfrac{11}{13}$',
        '$\\dfrac{13}{12} = \\dfrac{11}{13}$',
      ],
      answer: 0,
      hints: ['So sánh mỗi phân số với $1$, rồi dùng tính chất bắc cầu.'],
      solution:
        '$\\dfrac{13}{12} > 1$ (tử lớn hơn mẫu) và $1 > \\dfrac{11}{13}$ (tử nhỏ hơn mẫu). Theo tính chất bắc cầu, $\\dfrac{13}{12} > \\dfrac{11}{13}$.',
    },
    {
      type: 'choice',
      prompt: 'Biết $-5a > -5b$. Khẳng định nào sau đây đúng?',
      options: ['$a > b$', '$a < b$', '$a = b$'],
      answer: 1,
      hints: ['Nhân hai vế với $-\\dfrac{1}{5}$, một số âm.'],
      solution:
        'Nhân hai vế của $-5a > -5b$ với số âm $-\\dfrac{1}{5}$, bất đẳng thức đổi chiều: $a < b$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Hà chứng minh: "Vì $2 > -3$ nên nhân hai vế với $-1$ được $-2 > 3$." Bạn Hà sai ở đâu?',
      options: [
        'Nhân với số âm phải đổi chiều: $-2 < 3$',
        'Không được nhân hai vế với $-1$',
        'Bạn Hà đúng, $-2 > 3$',
        'Phải cộng thêm $1$ vào hai vế',
      ],
      answer: 0,
      hints: ['$-1$ là số âm. Điều gì xảy ra với chiều của bất đẳng thức?'],
      solution:
        'Nhân hai vế với số âm $-1$ thì bất đẳng thức đổi chiều: $-2 < 3$. Kết quả $-2 > 3$ hiển nhiên sai, vì số âm luôn nhỏ hơn số dương.',
    },
  ],
  takeaways: [
    '$a > b$, $a < b$, $a \\ge b$, $a \\le b$ là các bất đẳng thức; $a$ là vế trái, $b$ là vế phải.',
    'Bắc cầu: $a < b$ và $b < c$ thì $a < c$.',
    'Cộng (trừ) cùng một số vào hai vế: bất đẳng thức giữ nguyên chiều.',
    'Nhân (chia) hai vế với cùng một số dương: giữ chiều; với cùng một số âm: đổi chiều.',
  ],
};
