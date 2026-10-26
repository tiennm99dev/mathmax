/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng và trừ phân thức đại số cùng mẫu và khác mẫu, phân thức đối, tính chất của phép cộng và cách rút gọn kết quả.',
  intro:
    'Hai vòi nước cùng chảy vào một bể. Vòi thứ nhất chảy riêng thì đầy bể sau $x$ giờ, vòi thứ hai sau $x + 2$ giờ. Trong một giờ, cả hai vòi chảy được $\\dfrac{1}{x} + \\dfrac{1}{x + 2}$ bể. Viết tổng này thành một phân thức thế nào? Ta làm như cộng phân số: cùng mẫu thì cộng tử, khác mẫu thì quy đồng trước.',
  objectives: [
    'Cộng, trừ hai phân thức cùng mẫu.',
    'Cộng, trừ các phân thức khác mẫu bằng cách quy đồng mẫu thức.',
    'Tìm phân thức đối và dùng tính chất của phép cộng để tính nhanh.',
  ],
  sections: [
    {
      heading: 'Phép cộng phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng hai phân thức cùng mẫu',
          text: 'Muốn cộng hai phân thức có cùng mẫu thức, ta cộng các tử thức với nhau và giữ nguyên mẫu thức: $\\dfrac{A}{M} + \\dfrac{B}{M} = \\dfrac{A + B}{M}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng hai phân thức khác mẫu',
          text: 'Muốn cộng hai phân thức có mẫu thức khác nhau, ta quy đồng mẫu thức rồi cộng các phân thức có cùng mẫu thức vừa tìm được.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{3}{2x} + \\dfrac{5}{4x^2} = \\dfrac{3 \\cdot 2x}{4x^2} + \\dfrac{5}{4x^2} = \\dfrac{6x + 5}{4x^2}.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính chất',
          text: 'Phép cộng phân thức có các tính chất giao hoán và kết hợp: $\\dfrac{A}{B} + \\dfrac{C}{D} = \\dfrac{C}{D} + \\dfrac{A}{B}$; $\\left(\\dfrac{A}{B} + \\dfrac{C}{D}\\right) + \\dfrac{E}{F} = \\dfrac{A}{B} + \\left(\\dfrac{C}{D} + \\dfrac{E}{F}\\right)$; và $\\dfrac{A}{B} + 0 = \\dfrac{A}{B}$. Nhờ đó ta có thể nhóm các phân thức cùng mẫu để tính nhanh.',
        },
        {
          type: 'p',
          text: 'Sau khi cộng, nếu tử và mẫu của kết quả có nhân tử chung thì ta rút gọn. Chẳng hạn $\\dfrac{1}{x^2 + x} + \\dfrac{1}{x + 1} = \\dfrac{1 + x}{x(x + 1)} = \\dfrac{1}{x}$.',
        },
      ],
    },
    {
      heading: 'Phép trừ phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân thức đối',
          text: 'Hai phân thức được gọi là đối nhau nếu tổng của chúng bằng $0$. Phân thức đối của $\\dfrac{A}{B}$ kí hiệu là $-\\dfrac{A}{B}$, và $-\\dfrac{A}{B} = \\dfrac{-A}{B} = \\dfrac{A}{-B}$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\dfrac{x - 1}{x + 2}$ và $\\dfrac{1 - x}{x + 2}$ là hai phân thức đối nhau vì tổng của chúng là $\\dfrac{0}{x + 2} = 0$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc trừ',
          text: 'Muốn trừ phân thức $\\dfrac{A}{B}$ cho phân thức $\\dfrac{C}{D}$, ta cộng $\\dfrac{A}{B}$ với phân thức đối của $\\dfrac{C}{D}$: $\\dfrac{A}{B} - \\dfrac{C}{D} = \\dfrac{A}{B} + \\left(-\\dfrac{C}{D}\\right)$. Với hai phân thức cùng mẫu: $\\dfrac{A}{M} - \\dfrac{B}{M} = \\dfrac{A - B}{M}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dấu trừ trước tử thức',
          text: 'Khi trừ, cả tử thức của phân thức bị trừ phải đặt trong ngoặc: $\\dfrac{2x}{x - 1} - \\dfrac{x + 1}{x - 1} = \\dfrac{2x - (x + 1)}{x - 1} = \\dfrac{x - 1}{x - 1} = 1$. Viết $2x - x + 1$ là sai dấu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trình quy đồng: lập mẫu thức chung từ nhân tử',
    instruction:
      'Chọn một phép tính. Bước 1 đã phân tích các mẫu thành nhân tử. Ở bước 2, chỉnh hệ số và số mũ của từng nhân tử để được mẫu thức chung đơn giản nhất: thiếu thì MTC không chia hết cho một mẫu, thừa thì chưa đơn giản nhất. Khi đúng, bảng nhân tử phụ hiện ra cùng phép cộng (trừ) các tử thức và kết quả đã rút gọn.',
  },
  examples: [
    {
      problem: 'Thực hiện phép cộng $\\dfrac{2x + 1}{x + 3} + \\dfrac{x + 8}{x + 3}$.',
      steps: [
        'Hai phân thức cùng mẫu, nên cộng các tử và giữ nguyên mẫu: $\\dfrac{2x + 1 + x + 8}{x + 3} = \\dfrac{3x + 9}{x + 3}$.',
        'Rút gọn: $3x + 9 = 3(x + 3)$, nên $\\dfrac{3(x + 3)}{x + 3} = 3$.',
      ],
      answer: '$3$.',
    },
    {
      problem: 'Thực hiện phép tính $\\dfrac{x}{x - 2} + \\dfrac{4}{4 - 2x}$.',
      steps: [
        'Đổi dấu để có nhân tử chung: $4 - 2x = -2(x - 2)$, nên $\\dfrac{4}{4 - 2x} = \\dfrac{4}{-2(x - 2)} = -\\dfrac{2}{x - 2}$.',
        'Hai phân thức đã cùng mẫu: $\\dfrac{x}{x - 2} - \\dfrac{2}{x - 2} = \\dfrac{x - 2}{x - 2}$.',
      ],
      answer: '$1$.',
    },
    {
      problem: 'Thực hiện phép trừ $\\dfrac{1}{x - 3} - \\dfrac{6}{x^2 - 9}$.',
      steps: [
        'Phân tích mẫu: $x^2 - 9 = (x - 3)(x + 3)$. MTC $= (x - 3)(x + 3)$; nhân tử phụ của $x - 3$ là $x + 3$.',
        '$\\dfrac{1}{x - 3} - \\dfrac{6}{x^2 - 9} = \\dfrac{x + 3}{(x - 3)(x + 3)} - \\dfrac{6}{(x - 3)(x + 3)} = \\dfrac{x + 3 - 6}{(x - 3)(x + 3)}$.',
        '$= \\dfrac{x - 3}{(x - 3)(x + 3)}$, chia cả tử và mẫu cho $x - 3$.',
      ],
      answer: '$\\dfrac{1}{x + 3}$.',
    },
    {
      problem: 'Tính nhanh $\\dfrac{x}{x + 1} + \\dfrac{2}{x - 1} + \\dfrac{1}{x + 1}$.',
      steps: [
        'Dùng tính chất giao hoán và kết hợp, nhóm hai phân thức cùng mẫu: $\\left(\\dfrac{x}{x + 1} + \\dfrac{1}{x + 1}\\right) + \\dfrac{2}{x - 1}$.',
        '$\\dfrac{x}{x + 1} + \\dfrac{1}{x + 1} = \\dfrac{x + 1}{x + 1} = 1$.',
        '$1 + \\dfrac{2}{x - 1} = \\dfrac{x - 1}{x - 1} + \\dfrac{2}{x - 1} = \\dfrac{x + 1}{x - 1}$.',
      ],
      answer: '$\\dfrac{x + 1}{x - 1}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kết quả đã rút gọn của phép tính $\\dfrac{3x}{x + 2} + \\dfrac{6}{x + 2}$ là',
      options: ['$3$', '$\\dfrac{3x + 6}{2x + 4}$', '$3x$', '$\\dfrac{3}{x + 2}$'],
      answer: 0,
      hints: ['Cùng mẫu: cộng các tử, giữ nguyên mẫu.', 'Phân tích tử $3x + 6$ thành nhân tử.'],
      solution:
        '$\\dfrac{3x + 6}{x + 2} = \\dfrac{3(x + 2)}{x + 2} = 3$. Lựa chọn thứ hai sai vì đã cộng cả hai mẫu.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phân thức đối của phân thức $\\dfrac{x - 1}{x + 2}$.',
      options: [
        '$\\dfrac{1 - x}{x + 2}$',
        '$\\dfrac{x - 1}{-x - 2}$',
        '$\\dfrac{1 - x}{-x - 2}$',
        '$\\dfrac{x + 2}{x - 1}$',
      ],
      answers: [0, 1],
      hints: [
        'Phân thức đối của $\\dfrac{A}{B}$ là $\\dfrac{-A}{B} = \\dfrac{A}{-B}$.',
        'Đổi dấu cả tử và mẫu thì được phân thức bằng nó, không phải phân thức đối.',
      ],
      solution:
        '$\\dfrac{1 - x}{x + 2}$ (đổi dấu tử) và $\\dfrac{x - 1}{-x - 2}$ (đổi dấu mẫu) là phân thức đối. $\\dfrac{1 - x}{-x - 2}$ đổi dấu cả tử và mẫu nên bằng chính $\\dfrac{x - 1}{x + 2}$; $\\dfrac{x + 2}{x - 1}$ là phân thức nghịch đảo (bài sau).',
    },
    {
      type: 'number',
      prompt:
        'Thực hiện phép trừ $\\dfrac{x^2}{x - 3} - \\dfrac{9}{x - 3}$ rồi tính giá trị của kết quả tại $x = 7$.',
      answer: 10,
      hints: ['Cùng mẫu: trừ các tử.', '$x^2 - 9 = (x - 3)(x + 3)$.'],
      solution:
        '$\\dfrac{x^2 - 9}{x - 3} = \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$. Tại $x = 7$: $7 + 3 = 10$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép cộng $\\dfrac{1}{x} + \\dfrac{1}{x + 1}$ là',
      options: [
        '$\\dfrac{2x + 1}{x(x + 1)}$',
        '$\\dfrac{2}{2x + 1}$',
        '$\\dfrac{2}{x(x + 1)}$',
        '$\\dfrac{x + 2}{x(x + 1)}$',
      ],
      answer: 0,
      hints: ['MTC $= x(x + 1)$. Nhân tử phụ của $x$ là $x + 1$, của $x + 1$ là $x$.'],
      solution:
        '$\\dfrac{1}{x} + \\dfrac{1}{x + 1} = \\dfrac{x + 1}{x(x + 1)} + \\dfrac{x}{x(x + 1)} = \\dfrac{2x + 1}{x(x + 1)}$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép cộng $\\dfrac{x}{x - y} + \\dfrac{y}{y - x}$ là',
      options: ['$1$', '$0$', '$\\dfrac{x + y}{x - y}$', '$-1$'],
      answer: 0,
      hints: ['$y - x = -(x - y)$, nên $\\dfrac{y}{y - x} = -\\dfrac{y}{x - y}$.'],
      solution: '$\\dfrac{x}{x - y} - \\dfrac{y}{x - y} = \\dfrac{x - y}{x - y} = 1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Thực hiện phép tính $\\dfrac{2}{x - 1} - \\dfrac{x + 3}{x^2 - 1}$ rồi tính giá trị của kết quả tại $x = 3$.',
      answer: [1, 4],
      hints: [
        'MTC $= (x - 1)(x + 1)$; nhân tử phụ của $x - 1$ là $x + 1$.',
        'Tử thức: $2(x + 1) - (x + 3) = x - 1$; rút gọn rồi thay $x = 3$.',
      ],
      solution:
        '$\\dfrac{2(x + 1) - (x + 3)}{(x - 1)(x + 1)} = \\dfrac{x - 1}{(x - 1)(x + 1)} = \\dfrac{1}{x + 1}$. Tại $x = 3$: $\\dfrac{1}{4}$. Kiểm tra trực tiếp: $\\dfrac{2}{2} - \\dfrac{6}{8} = \\dfrac{1}{4}$.',
    },
    {
      type: 'text',
      prompt:
        'Phép trừ $\\dfrac{3}{2x} - \\dfrac{1}{x^2}$ cho kết quả $\\dfrac{\\ldots}{2x^2}$. Tử thức là gì?',
      accept: ['3x - 2', '3x-2', '3x − 2', '3x−2'],
      hints: ['MTC $= 2x^2$; nhân tử phụ của $2x$ là $x$, của $x^2$ là $2$.'],
      solution:
        '$\\dfrac{3x}{2x^2} - \\dfrac{2}{2x^2} = \\dfrac{3x - 2}{2x^2}$. Tử thức là $3x - 2$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước cộng (trừ) hai phân thức khác mẫu theo đúng thứ tự.',
      items: [
        'Tìm nhân tử phụ, nhân cả tử và mẫu với nhân tử phụ',
        'Phân tích các mẫu thành nhân tử',
        'Rút gọn kết quả (nếu được)',
        'Tìm mẫu thức chung',
        'Cộng (trừ) các tử thức, giữ nguyên mẫu thức chung',
      ],
      answer: [1, 3, 0, 4, 2],
      hints: ['Quy đồng mẫu thức trước, rồi mới cộng (trừ) các tử.'],
      solution:
        'Phân tích các mẫu thành nhân tử → tìm MTC → tìm nhân tử phụ và quy đồng → cộng (trừ) các tử thức → rút gọn kết quả.',
    },
    {
      type: 'fraction',
      prompt:
        'Vòi thứ nhất chảy riêng đầy bể sau $x$ giờ, vòi thứ hai sau $x + 2$ giờ. Viết phân thức biểu thị phần bể cả hai vòi cùng chảy được trong $1$ giờ, rồi tính nó khi $x = 4$.',
      answer: [5, 12],
      hints: [
        'Trong $1$ giờ, vòi thứ nhất chảy được $\\dfrac{1}{x}$ bể, vòi thứ hai $\\dfrac{1}{x + 2}$ bể.',
        '$\\dfrac{1}{x} + \\dfrac{1}{x + 2} = \\dfrac{2x + 2}{x(x + 2)}$.',
      ],
      solution:
        '$\\dfrac{1}{x} + \\dfrac{1}{x + 2} = \\dfrac{x + 2 + x}{x(x + 2)} = \\dfrac{2x + 2}{x(x + 2)}$. Khi $x = 4$: $\\dfrac{10}{24} = \\dfrac{5}{12}$ bể.',
    },
  ],
  takeaways: [
    'Cùng mẫu: $\\dfrac{A}{M} \\pm \\dfrac{B}{M} = \\dfrac{A \\pm B}{M}$.',
    'Khác mẫu: quy đồng mẫu thức rồi cộng (trừ) các phân thức cùng mẫu vừa tìm được.',
    'Phân thức đối: $-\\dfrac{A}{B} = \\dfrac{-A}{B} = \\dfrac{A}{-B}$; $\\dfrac{A}{B} - \\dfrac{C}{D} = \\dfrac{A}{B} + \\left(-\\dfrac{C}{D}\\right)$.',
    'Khi trừ, đặt cả tử thức bị trừ trong ngoặc; rút gọn kết quả nếu tử và mẫu còn nhân tử chung.',
  ],
};
