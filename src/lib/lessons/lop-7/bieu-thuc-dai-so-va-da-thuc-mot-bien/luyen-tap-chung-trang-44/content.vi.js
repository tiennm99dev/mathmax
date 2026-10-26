/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về phép nhân và phép chia đa thức một biến: nhân đơn thức với đa thức, nhân hai đa thức, thu gọn biểu thức, chia đa thức cho đơn thức, đặt tính chia hai đa thức, tìm thương và dư.',
  intro:
    'Bài luyện tập này ôn lại Bài 27 (Phép nhân đa thức một biến) và Bài 28 (Phép chia đa thức một biến). Hai phép tính có liên hệ chặt chẽ: chia là phép ngược của nhân, nên mọi kết quả chia đều kiểm tra được bằng một phép nhân, $A = B \\cdot Q + R$.',
  objectives: [
    'Nhân đơn thức với đa thức, nhân đa thức với đa thức rồi thu gọn.',
    'Chia đa thức cho đơn thức; đặt tính chia hai đa thức đã sắp xếp.',
    'Tìm thương và dư, tìm tham số để phép chia là phép chia hết, và kiểm tra kết quả bằng phép nhân.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Nhân hai đơn thức',
              '$ax^m \\cdot bx^n = abx^{m + n}$: nhân các hệ số, cộng các số mũ.',
            ],
            [
              'Nhân đơn thức với đa thức',
              'Nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích.',
            ],
            [
              'Nhân đa thức với đa thức',
              'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia, cộng các tích rồi thu gọn.',
            ],
            [
              'Chia đơn thức cho đơn thức',
              '$ax^m : bx^n = \\frac{a}{b}x^{m - n}$ với $b \\ne 0$, $m \\ge n$.',
            ],
            [
              'Chia đa thức cho đơn thức',
              'Chia từng hạng tử của đa thức cho đơn thức rồi cộng các kết quả.',
            ],
            [
              'Chia hai đa thức',
              'Đặt tính, lặp lại chia, nhân, trừ đến khi dư bằng $0$ hoặc có bậc nhỏ hơn bậc của đa thức chia; $A = B \\cdot Q + R$.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Lưu ý khi làm bài',
      blocks: [
        {
          type: 'list',
          items: [
            'Nhân hai lũy thừa thì cộng số mũ, chia thì trừ số mũ: $x^2 \\cdot x^3 = x^5$, $x^5 : x^3 = x^2$.',
            'Trước dấu trừ là một tích thì tính tích trong ngoặc trước, rồi đổi dấu mọi hạng tử khi bỏ ngoặc.',
            'Khi đặt tính chia, sắp xếp cả hai đa thức theo lũy thừa giảm dần và để trống cột của bậc bị khuyết.',
            'Dừng phép chia khi dư bằng $0$ hoặc có bậc nhỏ hơn bậc của đa thức chia, không dừng sớm hơn.',
            'Kiểm tra phép chia bằng phép nhân: đa thức chia nhân thương, cộng dư, phải được đa thức bị chia.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 10 câu trộn ngẫu nhiên về phép nhân (Bài 27) và phép chia (Bài 28) đa thức một biến. Đáp số luôn là số nguyên; nhập số âm với dấu trừ, ví dụ $-7$. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Chứng tỏ rằng giá trị của biểu thức $(x + 2)(x - 3) - x(x - 1)$ không phụ thuộc vào giá trị của biến $x$.',
      steps: [
        '$(x + 2)(x - 3) = x^2 - 3x + 2x - 6 = x^2 - x - 6$.',
        '$x(x - 1) = x^2 - x$.',
        'Biểu thức bằng $x^2 - x - 6 - x^2 + x = -6$, là một hằng số.',
      ],
      answer: 'Biểu thức luôn bằng $-6$ với mọi giá trị của $x$.',
    },
    {
      problem:
        'Tìm thương và dư khi chia $x^3 + 2x^2 - 3x + 5$ cho $x^2 + x$. Kiểm tra lại bằng phép nhân.',
      steps: [
        '$x^3 : x^2 = x$; $\\;x(x^2 + x) = x^3 + x^2$; dư thứ nhất: $x^2 - 3x + 5$.',
        '$x^2 : x^2 = 1$; $\\;1 \\cdot (x^2 + x) = x^2 + x$; dư thứ hai: $-4x + 5$, bậc $1 < 2$ nên dừng.',
        'Kiểm tra: $(x^2 + x)(x + 1) + (-4x + 5) = x^3 + 2x^2 + x - 4x + 5 = x^3 + 2x^2 - 3x + 5$.',
      ],
      answer: 'Thương $x + 1$, dư $-4x + 5$.',
    },
    {
      problem:
        'Một hình hộp chữ nhật có thể tích $x^3 + 5x^2 + 6x$ (cm$^3$), đáy là hình chữ nhật có hai cạnh $x$ (cm) và $x + 2$ (cm). Tìm chiều cao của hình hộp theo $x$.',
      steps: [
        'Diện tích đáy: $x(x + 2) = x^2 + 2x$.',
        'Chiều cao bằng thể tích chia cho diện tích đáy: $(x^3 + 5x^2 + 6x) : (x^2 + 2x)$.',
        '$x^3 : x^2 = x$, dư $3x^2 + 6x$; $\\;3x^2 : x^2 = 3$, dư $0$. Thương là $x + 3$.',
      ],
      answer: 'Chiều cao là $x + 3$ (cm).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^2$ trong tích $(2x - 3)(x^2 + x - 1)$.',
      answer: -1,
      hints: ['Hai tích cho $x^2$ là $2x \\cdot x$ và $(-3) \\cdot x^2$.'],
      solution:
        '$(2x - 3)(x^2 + x - 1) = 2x^3 + 2x^2 - 2x - 3x^2 - 3x + 3 = 2x^3 - x^2 - 5x + 3$. Hệ số của $x^2$ là $-1$.',
    },
    {
      type: 'choice',
      prompt: 'Thu gọn tích $(x - 1)(x + 1)(x^2 + 1)$.',
      options: ['$x^4 - 1$', '$x^4 + 1$', '$x^4 - 2x^2 + 1$', '$x^3 - 1$'],
      answer: 0,
      hints: ['Nhân hai thừa số đầu trước: $(x - 1)(x + 1) = x^2 - 1$.'],
      solution:
        '$(x - 1)(x + 1) = x^2 - 1$; $\\;(x^2 - 1)(x^2 + 1) = x^4 + x^2 - x^2 - 1 = x^4 - 1$.',
    },
    {
      type: 'choice',
      prompt: 'Thu gọn biểu thức $2x(x - 3) - (x - 2)(2x + 1)$.',
      options: ['$-3x + 2$', '$-9x - 2$', '$-3x - 2$', '$-9x + 2$'],
      answer: 0,
      hints: [
        '$(x - 2)(2x + 1) = 2x^2 - 3x - 2$.',
        'Bỏ ngoặc có dấu trừ phía trước thì đổi dấu cả ba hạng tử.',
      ],
      solution: '$2x^2 - 6x - (2x^2 - 3x - 2) = 2x^2 - 6x - 2x^2 + 3x + 2 = -3x + 2$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tích với kết quả thu gọn của nó.',
      left: ['$(x + 2)(x - 2)$', '$(x - 2)(x - 2)$', '$(x + 2)(x + 2)$'],
      right: ['$x^2 - 4$', '$x^2 - 4x + 4$', '$x^2 + 4x + 4$', '$x^2 + 4$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Mỗi tích có bốn tích hạng tử; hai tích ở giữa có thể triệt tiêu hoặc cộng dồn.'],
      solution:
        '$(x + 2)(x - 2) = x^2 - 2x + 2x - 4 = x^2 - 4$; $\\;(x - 2)(x - 2) = x^2 - 4x + 4$; $\\;(x + 2)(x + 2) = x^2 + 4x + 4$. Không tích nào bằng $x^2 + 4$.',
    },
    {
      type: 'number',
      prompt:
        'Thực hiện phép chia $(6x^4 - 9x^3 + 3x^2) : (-3x^2)$. Hệ số của $x$ trong thương là bao nhiêu?',
      answer: 3,
      hints: ['Chia từng hạng tử cho $-3x^2$; chú ý dấu.'],
      solution:
        '$6x^4 : (-3x^2) = -2x^2$; $\\;(-9x^3) : (-3x^2) = 3x$; $\\;3x^2 : (-3x^2) = -1$. Thương $-2x^2 + 3x - 1$, hệ số của $x$ là $3$.',
    },
    {
      type: 'choice',
      prompt: 'Thương của phép chia $(2x^3 - 5x^2 + 6x - 15) : (2x - 5)$ là',
      options: ['$x^2 + 3$', '$x^2 - 3$', '$x^2 + 3x$', '$2x^2 + 3$'],
      answer: 0,
      hints: ['Vòng đầu: $2x^3 : 2x = x^2$; tính dư thứ nhất.'],
      solution:
        '$x^2(2x - 5) = 2x^3 - 5x^2$, dư $6x - 15$; $\\;3(2x - 5) = 6x - 15$, dư $0$. Thương $x^2 + 3$.',
    },
    {
      type: 'choice',
      prompt: 'Dư của phép chia $(x^3 + 2x^2 - 3x + 5) : (x^2 + x)$ là',
      options: ['$-4x + 5$', '$-2x + 5$', '$5$', '$-4x - 5$'],
      answer: 0,
      hints: ['Chia đến khi dư có bậc nhỏ hơn $2$.'],
      solution:
        '$x(x^2 + x) = x^3 + x^2$, dư $x^2 - 3x + 5$; $\\;1 \\cdot (x^2 + x)$, dư $-4x + 5$. Dư là $-4x + 5$.',
    },
    {
      type: 'multi',
      prompt: 'Những phép chia nào dưới đây là phép chia hết?',
      options: [
        '$(x^2 - 1) : (x + 1)$',
        '$(x^2 + 1) : (x + 1)$',
        '$(x^3 + x) : x$',
        '$(x^2 + x) : x^2$',
      ],
      answers: [0, 2],
      hints: ['Đặt tính từng phép chia và xem dư có bằng $0$ không.'],
      solution:
        '$x^2 - 1 = (x + 1)(x - 1)$: chia hết. $\\;x^2 + 1 = (x + 1)(x - 1) + 2$: dư $2$. $\\;(x^3 + x) : x = x^2 + 1$: chia hết. $\\;x^2 + x = x^2 \\cdot 1 + x$: dư $x$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số $a$ để đa thức $2x^3 - 3x^2 + x + a$ chia hết cho đa thức $x + 1$.',
      answer: 6,
      hints: [
        'Đặt tính, coi $a$ là một số: thương bắt đầu bằng $2x^2$.',
        'Dư cuối cùng có dạng $a + $ (một số); cho nó bằng $0$.',
      ],
      solution:
        '$2x^2(x + 1) = 2x^3 + 2x^2$, dư $-5x^2 + x + a$; $\\;-5x(x + 1) = -5x^2 - 5x$, dư $6x + a$; $\\;6(x + 1) = 6x + 6$, dư $a - 6$. Chia hết khi $a - 6 = 0$, tức $a = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật có thể tích $x^3 + 5x^2 + 6x$ (cm$^3$), đáy có hai cạnh $x$ (cm) và $x + 2$ (cm). Tính chiều cao của hình hộp khi $x = 2$.',
      answer: 5,
      unit: 'cm',
      hints: ['Chiều cao bằng thể tích chia cho diện tích đáy $x^2 + 2x$.'],
      solution:
        '$(x^3 + 5x^2 + 6x) : (x^2 + 2x) = x + 3$. Khi $x = 2$, chiều cao là $5$ cm. Kiểm tra: thể tích $8 + 20 + 12 = 40$ cm$^3$ $= 2 \\cdot 4 \\cdot 5$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $(x + 2)(x - 3) - x(x - 1)$ tại $x = 2026$.',
      answer: -6,
      hints: ['Thu gọn biểu thức trước khi thay số.'],
      solution:
        'Biểu thức thu gọn bằng $x^2 - x - 6 - x^2 + x = -6$ với mọi $x$, nên tại $x = 2026$ nó bằng $-6$.',
    },
  ],
  takeaways: [
    'Nhân đa thức: nhân từng hạng tử với từng hạng tử, cộng các tích rồi thu gọn.',
    'Chia đa thức cho đơn thức: chia từng hạng tử; chia hai đa thức: chia, nhân, trừ và lặp lại.',
    'Mọi phép chia đều kiểm tra được bằng phép nhân: $A = B \\cdot Q + R$.',
    'Tìm tham số để chia hết: đặt tính, cho dư cuối cùng bằng $0$.',
  ],
};
