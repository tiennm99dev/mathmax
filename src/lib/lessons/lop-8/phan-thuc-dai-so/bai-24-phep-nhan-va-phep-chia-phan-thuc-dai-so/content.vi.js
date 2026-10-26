/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân hai phân thức đại số, tính chất của phép nhân, phân thức nghịch đảo và phép chia phân thức.',
  intro:
    'Ở lớp 6 ta nhân $\\dfrac{2}{3} \\cdot \\dfrac{9}{4}$ bằng cách nhân tử với tử, mẫu với mẫu, rồi rút gọn; còn chia cho $\\dfrac{3}{4}$ là nhân với $\\dfrac{4}{3}$. Phân thức đại số được nhân, chia đúng như vậy. Mẹo quan trọng: phân tích các tử và mẫu thành nhân tử trước khi nhân, để gạch được nhân tử chung "chéo" giữa hai phân thức.',
  objectives: [
    'Nhân hai phân thức và rút gọn kết quả.',
    'Vận dụng tính chất giao hoán, kết hợp, phân phối của phép nhân để tính nhanh.',
    'Tìm phân thức nghịch đảo và chia hai phân thức.',
  ],
  sections: [
    {
      heading: 'Phép nhân phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nhân',
          text: 'Muốn nhân hai phân thức, ta nhân các tử thức với nhau, nhân các mẫu thức với nhau: $\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{A \\cdot C}{B \\cdot D}$.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{x^2 - 1}{2x} \\cdot \\dfrac{4x}{x + 1} = \\dfrac{(x - 1)(x + 1) \\cdot 4x}{2x \\cdot (x + 1)} = 2(x - 1).',
        },
        {
          type: 'p',
          text: 'Ta giữ tích ở dạng nhân tử, không nhân ra, để thấy ngay các nhân tử chung $2x$ và $x + 1$ rồi rút gọn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính chất',
          text: 'Phép nhân phân thức có các tính chất: giao hoán $\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{C}{D} \\cdot \\dfrac{A}{B}$; kết hợp $\\left(\\dfrac{A}{B} \\cdot \\dfrac{C}{D}\\right) \\cdot \\dfrac{E}{F} = \\dfrac{A}{B} \\cdot \\left(\\dfrac{C}{D} \\cdot \\dfrac{E}{F}\\right)$; phân phối đối với phép cộng $\\dfrac{A}{B} \\cdot \\left(\\dfrac{C}{D} + \\dfrac{E}{F}\\right) = \\dfrac{A}{B} \\cdot \\dfrac{C}{D} + \\dfrac{A}{B} \\cdot \\dfrac{E}{F}$; nhân với $1$: $\\dfrac{A}{B} \\cdot 1 = \\dfrac{A}{B}$.',
        },
      ],
    },
    {
      heading: 'Phép chia phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân thức nghịch đảo',
          text: 'Hai phân thức được gọi là nghịch đảo của nhau nếu tích của chúng bằng $1$. Nếu $\\dfrac{A}{B}$ là một phân thức khác $0$ thì $\\dfrac{A}{B} \\cdot \\dfrac{B}{A} = 1$, nên $\\dfrac{B}{A}$ là phân thức nghịch đảo của $\\dfrac{A}{B}$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn phân thức nghịch đảo của $\\dfrac{x - 2}{x + 3}$ là $\\dfrac{x + 3}{x - 2}$; của $x - 1$ là $\\dfrac{1}{x - 1}$. Phân thức $0$ không có phân thức nghịch đảo.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc chia',
          text: 'Muốn chia phân thức $\\dfrac{A}{B}$ cho phân thức $\\dfrac{C}{D}$ khác $0$, ta nhân $\\dfrac{A}{B}$ với phân thức nghịch đảo của $\\dfrac{C}{D}$: $\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C}$, với $\\dfrac{C}{D} \\ne 0$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phép chia không có tính chất giao hoán: $\\dfrac{A}{B} : \\dfrac{C}{D}$ nói chung khác $\\dfrac{C}{D} : \\dfrac{A}{B}$. Khi chia, chỉ lật ngược phân thức chia (phân thức đứng sau dấu $:$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép thẻ phân thức để nhân, chia',
    instruction:
      'Chọn hai thẻ phân thức và phép tính. Với phép chia, thẻ thứ hai được lật thành phân thức nghịch đảo. Các nhân tử của cả hai tử nằm ở hàng trên, của cả hai mẫu ở hàng dưới: hãy gạch các nhân tử chung, kể cả "chéo" giữa hai thẻ. Sau mỗi lần gạch, kéo thanh trượt $x$ để kiểm tra rằng phân thức còn lại vẫn có cùng giá trị với biểu thức ban đầu.',
  },
  examples: [
    {
      problem: 'Thực hiện phép nhân $\\dfrac{x^2 - 1}{2x} \\cdot \\dfrac{4x}{x + 1}$.',
      steps: [
        'Phân tích: $x^2 - 1 = (x - 1)(x + 1)$.',
        'Nhân tử với tử, mẫu với mẫu: $\\dfrac{(x - 1)(x + 1) \\cdot 4x}{2x(x + 1)}$.',
        'Chia cả tử và mẫu cho nhân tử chung $2x(x + 1)$: $\\dfrac{2(x - 1)}{1}$.',
      ],
      answer: '$2(x - 1) = 2x - 2$.',
    },
    {
      problem: 'Thực hiện phép chia $\\dfrac{x^2 - 4}{3x} : \\dfrac{x + 2}{6x^2}$.',
      steps: [
        'Nhân với phân thức nghịch đảo của $\\dfrac{x + 2}{6x^2}$: $\\dfrac{x^2 - 4}{3x} \\cdot \\dfrac{6x^2}{x + 2}$.',
        '$= \\dfrac{(x - 2)(x + 2) \\cdot 6x^2}{3x(x + 2)}$.',
        'Chia cả tử và mẫu cho $3x(x + 2)$: $= (x - 2) \\cdot 2x$.',
      ],
      answer: '$2x(x - 2) = 2x^2 - 4x$.',
    },
    {
      problem:
        'Tính nhanh $\\dfrac{x}{x + 1} \\cdot \\dfrac{3}{x - 2} + \\dfrac{x}{x + 1} \\cdot \\dfrac{x - 5}{x - 2}$.',
      steps: [
        'Dùng tính chất phân phối: $= \\dfrac{x}{x + 1} \\cdot \\left(\\dfrac{3}{x - 2} + \\dfrac{x - 5}{x - 2}\\right)$.',
        '$\\dfrac{3}{x - 2} + \\dfrac{x - 5}{x - 2} = \\dfrac{x - 2}{x - 2} = 1$.',
        'Vậy biểu thức bằng $\\dfrac{x}{x + 1} \\cdot 1$.',
      ],
      answer: '$\\dfrac{x}{x + 1}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kết quả của phép nhân $\\dfrac{3x}{x - 1} \\cdot \\dfrac{x - 1}{6x^2}$ là',
      options: ['$\\dfrac{1}{2x}$', '$2x$', '$\\dfrac{1}{2x^2}$', '$\\dfrac{x}{2}$'],
      answer: 0,
      hints: [
        'Nhân tử với tử, mẫu với mẫu, rồi tìm nhân tử chung.',
        'Nhân tử chung là $3x(x - 1)$.',
      ],
      solution:
        '$\\dfrac{3x(x - 1)}{(x - 1) \\cdot 6x^2}$; chia cả tử và mẫu cho $3x(x - 1)$ được $\\dfrac{1}{2x}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân thức nghịch đảo của $\\dfrac{x - 2}{x + 3}$ là',
      options: [
        '$\\dfrac{x + 3}{x - 2}$',
        '$\\dfrac{2 - x}{x + 3}$',
        '$\\dfrac{x + 2}{x - 3}$',
        '$\\dfrac{x + 3}{2 - x}$',
      ],
      answer: 0,
      hints: ['Hai phân thức nghịch đảo có tích bằng $1$: đổi chỗ tử và mẫu.'],
      solution:
        '$\\dfrac{x - 2}{x + 3} \\cdot \\dfrac{x + 3}{x - 2} = 1$. $\\dfrac{2 - x}{x + 3}$ là phân thức đối, không phải nghịch đảo.',
    },
    {
      type: 'choice',
      prompt: 'Phân thức nào không có phân thức nghịch đảo?',
      options: ['$\\dfrac{0}{x + 1}$', '$\\dfrac{1}{x}$', '$x - 1$', '$\\dfrac{x}{x + 1}$'],
      answer: 0,
      hints: ['Phân thức $\\dfrac{A}{B}$ có nghịch đảo khi nó khác $0$.'],
      solution:
        '$\\dfrac{0}{x + 1} = 0$, mà không có phân thức nào nhân với $0$ được $1$. Nghịch đảo của $\\dfrac{1}{x}$ là $x$, của $x - 1$ là $\\dfrac{1}{x - 1}$, của $\\dfrac{x}{x + 1}$ là $\\dfrac{x + 1}{x}$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép chia $\\dfrac{x^2 - 9}{2x} : \\dfrac{x + 3}{4x}$ là',
      options: ['$2x - 6$', '$\\dfrac{x - 3}{2}$', '$\\dfrac{(x - 3)(x + 3)^2}{8x^2}$', '$x - 3$'],
      answer: 0,
      hints: [
        'Nhân với phân thức nghịch đảo: $\\dfrac{x^2 - 9}{2x} \\cdot \\dfrac{4x}{x + 3}$.',
        '$x^2 - 9 = (x - 3)(x + 3)$.',
      ],
      solution:
        '$\\dfrac{(x - 3)(x + 3) \\cdot 4x}{2x(x + 3)} = 2(x - 3) = 2x - 6$. Lựa chọn thứ ba là kết quả của phép nhân, không phải phép chia.',
    },
    {
      type: 'fraction',
      prompt:
        'Rút gọn biểu thức $\\dfrac{x + 1}{x - 2} \\cdot \\dfrac{x^2 - 4}{x^2 + x}$ rồi tính giá trị của nó tại $x = 3$.',
      answer: [5, 3],
      hints: [
        '$x^2 - 4 = (x - 2)(x + 2)$, $x^2 + x = x(x + 1)$.',
        'Sau khi rút gọn còn $\\dfrac{x + 2}{x}$.',
      ],
      solution:
        '$\\dfrac{(x + 1)(x - 2)(x + 2)}{(x - 2) \\cdot x(x + 1)} = \\dfrac{x + 2}{x}$. Tại $x = 3$: $\\dfrac{5}{3}$. Kiểm tra trực tiếp: $\\dfrac{4}{1} \\cdot \\dfrac{5}{12} = \\dfrac{5}{3}$.',
    },
    {
      type: 'text',
      prompt:
        'Thực hiện phép nhân $\\dfrac{4x}{x + 1} \\cdot \\dfrac{x + 1}{2}$ và gõ kết quả đã rút gọn.',
      accept: ['2x', '2 x', '2*x'],
      hints: ['Gạch nhân tử chung $x + 1$ và $2$.'],
      solution: '$\\dfrac{4x(x + 1)}{2(x + 1)} = 2x$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đẳng thức đúng với mọi phân thức (các phép chia đều có nghĩa).',
      options: [
        '$\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{C}{D} \\cdot \\dfrac{A}{B}$',
        '$\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{C}{D} : \\dfrac{A}{B}$',
        '$\\dfrac{A}{B} \\cdot \\left(\\dfrac{C}{D} + \\dfrac{E}{F}\\right) = \\dfrac{A}{B} \\cdot \\dfrac{C}{D} + \\dfrac{A}{B} \\cdot \\dfrac{E}{F}$',
        '$\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A \\cdot C}{B \\cdot D}$',
      ],
      answers: [0, 2],
      hints: ['Phép nhân có tính chất giao hoán và phân phối; phép chia thì không giao hoán.'],
      solution:
        'Đúng: tính chất giao hoán của phép nhân và tính chất phân phối. Sai: phép chia không giao hoán, và $\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A \\cdot D}{B \\cdot C}$ chứ không phải $\\dfrac{A \\cdot C}{B \\cdot D}$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có diện tích $\\dfrac{x^2 - 4}{x}$ ($\\text{m}^2$) và chiều rộng $\\dfrac{x - 2}{x}$ (m), với $x > 2$. Viết biểu thức chiều dài rồi tính chiều dài khi $x = 5$.',
      answer: 7,
      unit: 'm',
      hints: [
        'Chiều dài bằng diện tích chia cho chiều rộng.',
        '$\\dfrac{x^2 - 4}{x} : \\dfrac{x - 2}{x} = \\dfrac{x^2 - 4}{x} \\cdot \\dfrac{x}{x - 2}$.',
      ],
      solution:
        '$\\dfrac{(x - 2)(x + 2)}{x} \\cdot \\dfrac{x}{x - 2} = x + 2$ (m). Khi $x = 5$, chiều dài là $7$ m. Kiểm tra: diện tích $\\dfrac{21}{5}$, chiều rộng $\\dfrac{3}{5}$, và $\\dfrac{21}{5} : \\dfrac{3}{5} = 7$.',
    },
    {
      type: 'fraction',
      prompt:
        'Thực hiện phép chia $\\dfrac{x}{x - 1} : \\dfrac{x^2}{x^2 - 1}$ rồi tính giá trị của kết quả tại $x = 4$.',
      answer: [5, 4],
      hints: [
        'Nhân với phân thức nghịch đảo $\\dfrac{x^2 - 1}{x^2}$.',
        'Kết quả rút gọn là $\\dfrac{x + 1}{x}$.',
      ],
      solution:
        '$\\dfrac{x}{x - 1} \\cdot \\dfrac{(x - 1)(x + 1)}{x^2} = \\dfrac{x + 1}{x}$. Tại $x = 4$: $\\dfrac{5}{4}$.',
    },
  ],
  takeaways: [
    '$\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{A \\cdot C}{B \\cdot D}$; phân tích thành nhân tử trước để rút gọn.',
    'Phép nhân có tính chất giao hoán, kết hợp, phân phối đối với phép cộng.',
    'Phân thức nghịch đảo của $\\dfrac{A}{B} \\ne 0$ là $\\dfrac{B}{A}$; tích của chúng bằng $1$.',
    '$\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C}$ với $\\dfrac{C}{D} \\ne 0$.',
  ],
};
