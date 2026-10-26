/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân đơn thức với đa thức: nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích. Nhân đa thức với đa thức: nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích và thu gọn.',
  intro:
    'Một mảnh vườn hình chữ nhật có chiều dài $x + 3$ (m) và chiều rộng $x + 2$ (m). Chia mảnh vườn thành bốn ô nhỏ theo các đoạn $x$, $3$ và $x$, $2$ trên hai cạnh, ta thấy diện tích của nó bằng $x^2 + 3x + 2x + 6$. Mỗi ô là tích của một hạng tử ở cạnh này với một hạng tử ở cạnh kia: đó chính là quy tắc nhân hai đa thức.',
  objectives: [
    'Nhân hai đơn thức một biến: nhân các hệ số và cộng các số mũ.',
    'Nhân một đơn thức với một đa thức.',
    'Nhân hai đa thức theo hàng ngang hoặc đặt tính theo cột, rồi thu gọn kết quả.',
  ],
  sections: [
    {
      heading: 'Nhân đơn thức với đa thức',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: muốn nhân hai đơn thức, ta nhân hai hệ số với nhau và nhân hai lũy thừa của biến với nhau: $ax^m \\cdot bx^n = (a \\cdot b)x^{m + n}$. Ví dụ: $2x \\cdot 3x^2 = 6x^3$; $\\;(-3x^2) \\cdot 2x^3 = -6x^5$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn nhân một đơn thức với một đa thức, ta nhân đơn thức với từng hạng tử của đa thức rồi cộng các tích với nhau.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} &2x \\cdot (3x^2 - x + 5) \\\\ &= 2x \\cdot 3x^2 + 2x \\cdot (-x) + 2x \\cdot 5 \\\\ &= 6x^3 - 2x^2 + 10x \\end{aligned}',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Khi nhân hai lũy thừa của biến, ta cộng các số mũ chứ không nhân: $x^2 \\cdot x^3 = x^5$, không phải $x^6$. Dấu của từng hạng tử đi theo hạng tử đó khi nhân.',
        },
      ],
    },
    {
      heading: 'Nhân đa thức với đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn nhân một đa thức với một đa thức, ta nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích với nhau.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} &(2x + 3)(x - 1) \\\\ &= 2x \\cdot x + 2x \\cdot (-1) + 3 \\cdot x + 3 \\cdot (-1) \\\\ &= 2x^2 - 2x + 3x - 3 \\\\ &= 2x^2 + x - 3 \\end{aligned}',
        },
        {
          type: 'p',
          text: 'Ta cũng có thể đặt tính theo cột: sắp xếp hai đa thức theo lũy thừa giảm dần; nhân lần lượt từng hạng tử của đa thức thứ hai với đa thức thứ nhất, viết mỗi kết quả trên một dòng sao cho các hạng tử cùng bậc thẳng cột; rồi cộng theo cột.',
        },
        {
          type: 'table',
          caption: 'Đặt tính $(x^2 - 3x + 2)(2x - 1)$ theo cột',
          head: ['Dòng', 'Bậc 3', 'Bậc 2', 'Bậc 1', 'Bậc 0'],
          rows: [
            ['$x^2 - 3x + 2$', '—', '$x^2$', '$-3x$', '$2$'],
            ['$\\times\\; 2x - 1$', '—', '—', '$2x$', '$-1$'],
            ['Nhân với $-1$', '—', '$-x^2$', '$3x$', '$-2$'],
            ['Nhân với $2x$', '$2x^3$', '$-6x^2$', '$4x$', '—'],
            ['Cộng theo cột', '$2x^3$', '$-7x^2$', '$7x$', '$-2$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Phép nhân đa thức một biến có các tính chất giao hoán, kết hợp và phân phối đối với phép cộng như phép nhân các số: $PQ = QP$; $\\;(PQ)R = P(QR)$; $\\;P(Q + R) = PQ + PR$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng nhân các hạng tử',
    instruction:
      'Chọn một phép nhân. Mỗi ô của bảng là tích của hạng tử ở đầu hàng với hạng tử ở đầu cột: chạm vào ô (hoặc dùng Tab rồi Enter) để tính. Các ô cùng màu có cùng bậc; khi tính đủ các ô, cộng các ô cùng màu để được tích. Với $(x + 3)(x + 2)$, bảng nhân chính là mô hình diện tích của hình chữ nhật.',
  },
  examples: [
    {
      problem: 'Tính $-3x^2 \\cdot (2x^3 - x + 4)$.',
      steps: [
        'Nhân $-3x^2$ với từng hạng tử: $(-3x^2) \\cdot 2x^3 + (-3x^2) \\cdot (-x) + (-3x^2) \\cdot 4$.',
        '$= -6x^5 + 3x^3 - 12x^2$.',
      ],
      answer: '$-6x^5 + 3x^3 - 12x^2$.',
    },
    {
      problem: 'Tính $(x - 2)(x^2 + 2x + 4)$.',
      steps: [
        'Nhân $x$ với từng hạng tử của đa thức thứ hai: $x^3 + 2x^2 + 4x$.',
        'Nhân $-2$ với từng hạng tử của đa thức thứ hai: $-2x^2 - 4x - 8$.',
        'Cộng các tích và thu gọn: $x^3 + (2x^2 - 2x^2) + (4x - 4x) - 8 = x^3 - 8$.',
      ],
      answer: '$(x - 2)(x^2 + 2x + 4) = x^3 - 8$.',
    },
    {
      problem: 'Đặt tính theo cột để tính $(x^2 - 3x + 2)(2x - 1)$.',
      steps: [
        'Nhân $-1$ với $x^2 - 3x + 2$: $-x^2 + 3x - 2$.',
        'Nhân $2x$ với $x^2 - 3x + 2$: $2x^3 - 6x^2 + 4x$, viết lệch sang trái một cột để các hạng tử cùng bậc thẳng cột.',
        'Cộng theo cột: $2x^3 + (-x^2 - 6x^2) + (3x + 4x) - 2 = 2x^3 - 7x^2 + 7x - 2$.',
      ],
      answer: '$2x^3 - 7x^2 + 7x - 2$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^3$ trong tích $2x \\cdot (3x^2 - x + 5)$.',
      answer: 6,
      hints: ['Hạng tử nào của đa thức nhân với $2x$ cho ra lũy thừa $x^3$?'],
      solution: '$2x \\cdot 3x^2 = 6x^3$, nên hệ số của $x^3$ là $6$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép nhân $-3x^2 \\cdot (2x^3 - x + 4)$ là',
      options: [
        '$-6x^5 + 3x^3 - 12x^2$',
        '$-6x^6 + 3x^2 - 12x^2$',
        '$-6x^5 - 3x^3 - 12x^2$',
        '$-6x^5 + 3x^3 + 4$',
      ],
      answer: 0,
      hints: [
        'Nhân $-3x^2$ với cả ba hạng tử, kể cả hạng tử $4$.',
        'Cộng các số mũ khi nhân hai lũy thừa; $(-3x^2) \\cdot (-x)$ mang dấu cộng.',
      ],
      solution:
        '$(-3x^2) \\cdot 2x^3 = -6x^5$; $\\;(-3x^2) \\cdot (-x) = 3x^3$; $\\;(-3x^2) \\cdot 4 = -12x^2$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép nhân $(2x + 3)(x - 1)$ là',
      options: ['$2x^2 + x - 3$', '$2x^2 - 3$', '$2x^2 - x - 3$', '$2x^2 + 5x - 3$'],
      answer: 0,
      hints: ['Có tất cả $2 \\cdot 2 = 4$ tích cần cộng.'],
      solution: '$(2x + 3)(x - 1) = 2x^2 - 2x + 3x - 3 = 2x^2 + x - 3$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(x) = (3x - 2)(x + 4)$. Tìm hệ số của $x$ trong $P(x)$ sau khi thu gọn.',
      answer: 10,
      hints: ['Hai tích cho hạng tử bậc $1$ là $3x \\cdot 4$ và $(-2) \\cdot x$.'],
      solution: '$P(x) = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8$. Hệ số của $x$ là $10$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số tự do của tích $(2x - 5)(x^2 - x + 3)$.',
      answer: -15,
      hints: ['Hệ số tự do của tích là tích của hai hệ số tự do.'],
      solution:
        'Chỉ có tích $(-5) \\cdot 3 = -15$ không chứa $x$. Thật vậy, $(2x - 5)(x^2 - x + 3) = 2x^3 - 7x^2 + 11x - 15$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $(x^3 - 2x + 1)(x^2 + 4)$.',
      answer: 5,
      hints: ['Hạng tử bậc cao nhất của tích là tích hai hạng tử bậc cao nhất.'],
      solution:
        'Hạng tử bậc cao nhất là $x^3 \\cdot x^2 = x^5$ và không có hạng tử nào khác cùng bậc, nên tích có bậc $5$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $(x - 2)(x^2 + 2x + 4)$ tại $x = 3$.',
      answer: 19,
      hints: ['Có thể thu gọn tích trước: $(x - 2)(x^2 + 2x + 4) = x^3 - 8$.'],
      solution:
        'Tích thu gọn là $x^3 - 8$, tại $x = 3$ bằng $27 - 8 = 19$. Kiểm tra: $(3 - 2)(9 + 6 + 4) = 19$.',
    },
    {
      type: 'choice',
      prompt: 'Thu gọn biểu thức $x(x + 2) - (x + 1)(x - 1)$.',
      options: ['$2x + 1$', '$2x - 1$', '$2x^2 + 2x - 1$', '$1$'],
      answer: 0,
      hints: ['$(x + 1)(x - 1) = x^2 - 1$; nhớ đổi dấu khi bỏ ngoặc có dấu trừ.'],
      solution: '$x^2 + 2x - (x^2 - 1) = x^2 + 2x - x^2 + 1 = 2x + 1$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có chiều dài $2x + 1$ (cm) và chiều rộng $x + 3$ (cm). Diện tích của nó là đa thức $(2x + 1)(x + 3)$. Thu gọn đa thức đó rồi tính diện tích khi $x = 2$.',
      answer: 25,
      unit: 'cm²',
      hints: ['$(2x + 1)(x + 3) = 2x^2 + 6x + x + 3$.'],
      solution:
        '$(2x + 1)(x + 3) = 2x^2 + 7x + 3$. Tại $x = 2$: $2 \\cdot 4 + 7 \\cdot 2 + 3 = 25$ (cm$^2$); kiểm tra: $5 \\cdot 5 = 25$.',
    },
  ],
  takeaways: [
    'Nhân hai đơn thức: nhân các hệ số, cộng các số mũ: $ax^m \\cdot bx^n = abx^{m + n}$.',
    'Nhân đơn thức với đa thức: nhân đơn thức với từng hạng tử rồi cộng các tích.',
    'Nhân đa thức với đa thức: nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia, cộng các tích rồi thu gọn.',
    'Có thể đặt tính theo cột, viết các hạng tử cùng bậc thẳng cột rồi cộng.',
  ],
};
