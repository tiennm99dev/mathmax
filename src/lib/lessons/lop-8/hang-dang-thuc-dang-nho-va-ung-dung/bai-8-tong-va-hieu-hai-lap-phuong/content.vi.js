/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai hằng đẳng thức tổng hai lập phương và hiệu hai lập phương, cách nhận dạng, viết tổng hay hiệu thành tích, rút gọn và tính giá trị biểu thức.',
  intro:
    'Ở bài trước, em đã khai triển lập phương của một tổng và của một hiệu. Bài này đi theo chiều ngược lại: khi gặp tổng $A^3 + B^3$ hay hiệu $A^3 - B^3$, ta viết được chúng thành một tích. Đây là hai hằng đẳng thức cuối cùng trong bảy hằng đẳng thức đáng nhớ.',
  objectives: [
    'Nhận biết và phát biểu hằng đẳng thức $A^3 + B^3 = (A + B)(A^2 - AB + B^2)$.',
    'Nhận biết và phát biểu hằng đẳng thức $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$.',
    'Viết tổng, hiệu hai lập phương thành tích và ngược lại.',
    'Vận dụng để rút gọn biểu thức và tính giá trị biểu thức.',
  ],
  sections: [
    {
      heading: 'Tổng hai lập phương',
      blocks: [
        {
          type: 'p',
          text: 'Nhân đa thức với đa thức, các hạng tử ở giữa triệt tiêu từng cặp:',
        },
        {
          type: 'tex',
          tex: '(a + b)(a^2 - ab + b^2) = a^3 - a^2b + ab^2 + a^2b - ab^2 + b^3 = a^3 + b^3',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tổng hai lập phương',
          text: 'Với hai biểu thức tuỳ ý $A$ và $B$: $$A^3 + B^3 = (A + B)(A^2 - AB + B^2).$$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Biểu thức $A^2 - AB + B^2$ thường được gọi là bình phương thiếu của hiệu $A - B$: nó giống $(A - B)^2 = A^2 - 2AB + B^2$ nhưng hạng tử giữa chỉ là $AB$ chứ không phải $2AB$.',
        },
      ],
    },
    {
      heading: 'Hiệu hai lập phương',
      blocks: [
        {
          type: 'tex',
          tex: '(a - b)(a^2 + ab + b^2) = a^3 + a^2b + ab^2 - a^2b - ab^2 - b^3 = a^3 - b^3',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hiệu hai lập phương',
          text: 'Với hai biểu thức tuỳ ý $A$ và $B$: $$A^3 - B^3 = (A - B)(A^2 + AB + B^2).$$',
        },
        {
          type: 'table',
          caption: 'Bảy hằng đẳng thức đáng nhớ',
          head: ['Tên', 'Hằng đẳng thức'],
          rows: [
            ['Bình phương của một tổng', '$(A + B)^2 = A^2 + 2AB + B^2$'],
            ['Bình phương của một hiệu', '$(A - B)^2 = A^2 - 2AB + B^2$'],
            ['Hiệu hai bình phương', '$A^2 - B^2 = (A + B)(A - B)$'],
            ['Lập phương của một tổng', '$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$'],
            ['Lập phương của một hiệu', '$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$'],
            ['Tổng hai lập phương', '$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$'],
            ['Hiệu hai lập phương', '$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Dấu ở ngoặc thứ hai ngược với dấu ở ngoặc thứ nhất: tổng $(A + B)$ đi với $-AB$, hiệu $(A - B)$ đi với $+AB$. Đừng nhầm $A^3 + B^3$ với $(A + B)^3$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép thẻ hằng đẳng thức',
    instruction:
      'Chọn một tổng hoặc hiệu hai lập phương ở cột trái và một dạng tích ở cột phải. Kéo thanh trượt để so giá trị hai bên tại một giá trị x, rồi bấm "Ghép cặp". Chú ý: có cặp bằng nhau tại một giá trị x nhưng vẫn không phải hằng đẳng thức.',
  },
  examples: [
    {
      problem: 'Viết $x^3 + 8$ dưới dạng tích.',
      steps: [
        '$8 = 2^3$, nên $x^3 + 8 = x^3 + 2^3$ là tổng hai lập phương với $A = x$, $B = 2$.',
        '$x^3 + 2^3 = (x + 2)(x^2 - x \\cdot 2 + 2^2)$.',
      ],
      answer: '$x^3 + 8 = (x + 2)(x^2 - 2x + 4)$.',
    },
    {
      problem: 'Viết $27x^3 - y^3$ dưới dạng tích.',
      steps: [
        '$27x^3 = (3x)^3$, nên đây là hiệu hai lập phương với $A = 3x$, $B = y$.',
        '$(3x)^3 - y^3 = (3x - y)\\left((3x)^2 + 3x \\cdot y + y^2\\right)$.',
      ],
      answer: '$27x^3 - y^3 = (3x - y)(9x^2 + 3xy + y^2)$.',
    },
    {
      problem: 'Rút gọn biểu thức $(x - 2)(x^2 + 2x + 4) + 8$.',
      steps: [
        'Tích $(x - 2)(x^2 + 2x + 4)$ có dạng $(A - B)(A^2 + AB + B^2)$ với $A = x$, $B = 2$.',
        'Do đó $(x - 2)(x^2 + 2x + 4) = x^3 - 2^3 = x^3 - 8$.',
        'Biểu thức bằng $x^3 - 8 + 8$.',
      ],
      answer: '$(x - 2)(x^2 + 2x + 4) + 8 = x^3$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Viết $x^3 + 27$ dưới dạng tích được',
      options: [
        '$(x + 3)(x^2 + 3x + 9)$',
        '$(x + 3)(x^2 - 3x + 9)$',
        '$(x - 3)(x^2 + 3x + 9)$',
        '$(x + 3)(x^2 - 6x + 9)$',
      ],
      answer: 1,
      hints: [
        '$27 = 3^3$: đây là tổng hai lập phương với $A = x$, $B = 3$.',
        'Tổng $(A + B)$ đi với $A^2 - AB + B^2$.',
      ],
      solution: '$x^3 + 27 = x^3 + 3^3 = (x + 3)(x^2 - 3x + 9)$.',
    },
    {
      type: 'number',
      prompt: 'Điền số thích hợp: $8x^3 - 1 = (2x - 1)(4x^2 + \\square x + 1)$.',
      answer: 2,
      hints: [
        '$8x^3 = (2x)^3$ và $1 = 1^3$: hiệu hai lập phương với $A = 2x$, $B = 1$.',
        'Hạng tử giữa của ngoặc thứ hai là $AB$.',
      ],
      solution:
        '$8x^3 - 1 = (2x)^3 - 1^3 = (2x - 1)(4x^2 + 2x \\cdot 1 + 1) = (2x - 1)(4x^2 + 2x + 1)$. Ô trống là $2$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $(x - 2)(x^2 + 2x + 4)$ tại $x = 12$.',
      answer: 1720,
      hints: [
        'Biểu thức là dạng tích của hiệu hai lập phương.',
        '$(x - 2)(x^2 + 2x + 4) = x^3 - 8$.',
      ],
      solution: '$(x - 2)(x^2 + 2x + 4) = x^3 - 8$. Tại $x = 12$: $12^3 - 8 = 1728 - 8 = 1720$.',
    },
    {
      type: 'number',
      prompt: 'Rút gọn biểu thức $(x + 1)(x^2 - x + 1) - (x - 1)(x^2 + x + 1)$. Kết quả là số nào?',
      answer: 2,
      hints: [
        'Tích thứ nhất là $x^3 + 1$, tích thứ hai là $x^3 - 1$.',
        'Trừ hai kết quả, nhớ đổi dấu khi bỏ ngoặc.',
      ],
      solution: '$(x + 1)(x^2 - x + 1) - (x - 1)(x^2 + x + 1) = (x^3 + 1) - (x^3 - 1) = 2$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các biểu thức luôn bằng $a^3 - b^3$.',
      options: [
        '$(a - b)(a^2 + ab + b^2)$',
        '$(a - b)^3$',
        '$-(b^3 - a^3)$',
        '$(a - b)(a^2 - ab + b^2)$',
      ],
      answers: [0, 2],
      hints: [
        'Hiệu hai lập phương: $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$.',
        'Thử $a = 2$, $b = 1$: $a^3 - b^3 = 7$.',
      ],
      solution:
        '$(a - b)(a^2 + ab + b^2) = a^3 - b^3$ và $-(b^3 - a^3) = a^3 - b^3$. Với $a = 2$, $b = 1$: $(a - b)^3 = 1$ và $(a - b)(a^2 - ab + b^2) = 3$, khác $7$.',
    },
    {
      type: 'number',
      prompt: 'Biết $a + b = 5$ và $ab = 6$. Tính $a^3 + b^3$.',
      answer: 35,
      hints: [
        '$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ và $a^2 + b^2 = (a + b)^2 - 2ab$.',
        '$a^2 - ab + b^2 = (a + b)^2 - 3ab$.',
      ],
      solution:
        '$a^2 - ab + b^2 = (a + b)^2 - 3ab = 25 - 18 = 7$. Vậy $a^3 + b^3 = 5 \\cdot 7 = 35$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với dạng tích của nó.',
      left: ['$27x^3 + 1$', '$x^3 - 8y^3$', '$125 + y^3$'],
      right: [
        '$(x - 2y)(x^2 + 2xy + 4y^2)$',
        '$(3x + 1)(9x^2 + 3x + 1)$',
        '$(5 + y)(25 - 5y + y^2)$',
        '$(3x + 1)(9x^2 - 3x + 1)$',
      ],
      pairs: [
        [0, 3],
        [1, 0],
        [2, 2],
      ],
      hints: [
        '$27x^3 = (3x)^3$, $8y^3 = (2y)^3$, $125 = 5^3$.',
        'Tổng hai lập phương đi với dấu trừ ở giữa ngoặc thứ hai.',
      ],
      solution:
        '$27x^3 + 1 = (3x + 1)(9x^2 - 3x + 1)$; $x^3 - 8y^3 = (x - 2y)(x^2 + 2xy + 4y^2)$; $125 + y^3 = (5 + y)(25 - 5y + y^2)$. Thẻ $(3x + 1)(9x^2 + 3x + 1)$ sai dấu nên không khớp.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $(99^3 + 1) : 100$.',
      answer: 9703,
      hints: [
        '$99^3 + 1 = 99^3 + 1^3 = (99 + 1)(99^2 - 99 + 1)$.',
        'Chia cho $100$ còn lại $99^2 - 99 + 1$.',
      ],
      solution:
        '$99^3 + 1 = (99 + 1)(99^2 - 99 + 1) = 100 \\cdot (9801 - 99 + 1) = 100 \\cdot 9703$. Vậy $(99^3 + 1) : 100 = 9703$.',
    },
  ],
  takeaways: [
    '$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$.',
    '$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$.',
    'Dấu giữa ngoặc thứ hai ngược dấu của ngoặc thứ nhất, và hạng tử giữa là $AB$, không phải $2AB$.',
    'Một giá trị $x$ làm hai biểu thức khác nhau là đủ để bác bỏ một đẳng thức; bằng nhau tại một giá trị thì chưa đủ để khẳng định.',
  ],
};
