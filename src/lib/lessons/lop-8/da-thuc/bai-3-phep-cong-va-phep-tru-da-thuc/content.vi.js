/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng và trừ hai đa thức nhiều biến: viết tổng hay hiệu, bỏ dấu ngoặc, nhóm các hạng tử đồng dạng rồi thu gọn.',
  intro:
    'Hai mảnh đất có diện tích $A = x^2y - 3xy + 2y$ và $B = 4xy + x^2y - 5$ (cùng đơn vị đo). Tổng diện tích là $A + B$, phần chênh lệch là $A - B$. Cộng, trừ đa thức cũng giống cộng, trừ các số có nhiều chữ số: các hạng tử đồng dạng được "xếp cùng cột" rồi cộng với nhau.',
  objectives: [
    'Thực hiện phép cộng hai đa thức.',
    'Thực hiện phép trừ hai đa thức, chú ý đổi dấu các hạng tử của đa thức trừ.',
    'Tìm đa thức chưa biết trong một tổng hay một hiệu.',
  ],
  sections: [
    {
      heading: 'Cộng hai đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Để cộng hai đa thức, ta viết hai đa thức thành tổng (mỗi đa thức trong một cặp ngoặc), bỏ dấu ngoặc, rồi nhóm các hạng tử đồng dạng và thu gọn.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} A + B &= (x^2y - 3xy + 2y) + (4xy + x^2y - 5) \\\\ &= x^2y - 3xy + 2y + 4xy + x^2y - 5 \\\\ &= (x^2y + x^2y) + (-3xy + 4xy) + 2y - 5 \\\\ &= 2x^2y + xy + 2y - 5 \\end{aligned}',
        },
        {
          type: 'p',
          text: 'Phép cộng đa thức có tính chất giao hoán và kết hợp như phép cộng các số: $A + B = B + A$ và $(A + B) + C = A + (B + C)$.',
        },
      ],
    },
    {
      heading: 'Trừ hai đa thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Để trừ đa thức $A$ cho đa thức $B$, ta viết $A - B$ (mỗi đa thức trong một cặp ngoặc), bỏ dấu ngoặc (đổi dấu mọi hạng tử của $B$), rồi nhóm các hạng tử đồng dạng và thu gọn.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} A - B &= (3x^2 - 2xy + y^2) - (x^2 + 5xy - y^2) \\\\ &= 3x^2 - 2xy + y^2 - x^2 - 5xy + y^2 \\\\ &= 2x^2 - 7xy + 2y^2 \\end{aligned}',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Lỗi hay gặp là chỉ đổi dấu hạng tử đầu tiên của $B$. Dấu "$-$" trước ngoặc đổi dấu tất cả các hạng tử trong ngoặc: $-(x^2 + 5xy - y^2) = -x^2 - 5xy + y^2$.',
        },
        {
          type: 'p',
          text: 'Ta cũng có thể đặt tính theo cột như với số: viết $A$, viết $-B$ ở hàng dưới sao cho các hạng tử đồng dạng thẳng cột, rồi cộng từng cột.',
        },
        {
          type: 'table',
          caption: 'Đặt tính $A - B = A + (-B)$ theo cột',
          head: ['Hàng', '$x^2$', '$xy$', '$y^2$'],
          rows: [
            ['$A$', '$3x^2$', '$-2xy$', '$+y^2$'],
            ['$-B$', '$-x^2$', '$-5xy$', '$+y^2$'],
            ['$A - B$', '$2x^2$', '$-7xy$', '$+2y^2$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp cột hạng tử đồng dạng',
    instruction:
      'Chọn một phép tính. Với phép trừ, trước hết đổi dấu các hạng tử của $B$. Bấm "Xếp cột" để các hạng tử đồng dạng trượt vào cùng một cột, rồi nhập hệ số của tổng mỗi cột và bấm "Kiểm tra".',
  },
  examples: [
    {
      problem: 'Cho $A = x^2y - 3xy + 2y$ và $B = 4xy + x^2y - 5$. Tính $A + B$.',
      steps: [
        'Viết tổng và bỏ ngoặc: $A + B = x^2y - 3xy + 2y + 4xy + x^2y - 5$.',
        'Nhóm các hạng tử đồng dạng: $(x^2y + x^2y) + (-3xy + 4xy) + 2y - 5$.',
        'Thu gọn: $2x^2y + xy + 2y - 5$.',
      ],
      answer: '$A + B = 2x^2y + xy + 2y - 5$.',
    },
    {
      problem: 'Cho $A = 3x^2 - 2xy + y^2$ và $B = x^2 + 5xy - y^2$. Tính $A - B$.',
      steps: [
        'Viết hiệu: $A - B = (3x^2 - 2xy + y^2) - (x^2 + 5xy - y^2)$.',
        'Bỏ ngoặc, đổi dấu mọi hạng tử của $B$: $3x^2 - 2xy + y^2 - x^2 - 5xy + y^2$.',
        'Nhóm và thu gọn: $(3x^2 - x^2) + (-2xy - 5xy) + (y^2 + y^2)$.',
      ],
      answer: '$A - B = 2x^2 - 7xy + 2y^2$.',
    },
    {
      problem: 'Tìm đa thức $M$, biết $M + (x^2 - 2xy) = 3x^2 + xy - 1$.',
      steps: [
        '$M$ là một số hạng của tổng, nên $M = (3x^2 + xy - 1) - (x^2 - 2xy)$.',
        'Bỏ ngoặc: $M = 3x^2 + xy - 1 - x^2 + 2xy$.',
        'Thu gọn: $M = 2x^2 + 3xy - 1$.',
      ],
      answer: '$M = 2x^2 + 3xy - 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kết quả của phép tính $(2x^2y - xy) + (x^2y + 3xy)$ là',
      options: ['$3x^2y + 4xy$', '$3x^2y + 2xy$', '$x^2y + 2xy$', '$5x^3y^2$'],
      answer: 1,
      hints: ['Bỏ ngoặc rồi nhóm $2x^2y$ với $x^2y$, $-xy$ với $3xy$.'],
      solution: '$2x^2y - xy + x^2y + 3xy = (2x^2y + x^2y) + (-xy + 3xy) = 3x^2y + 2xy$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép tính $(x^2 - 2xy + 3) - (x^2 + xy - 1)$ là',
      options: ['$-xy + 2$', '$2x^2 - 3xy + 4$', '$-3xy + 4$', '$-3xy + 2$'],
      answer: 2,
      hints: [
        'Bỏ ngoặc thứ hai phải đổi dấu cả ba hạng tử: $-x^2 - xy + 1$.',
        'Sau đó nhóm $x^2 - x^2$, $-2xy - xy$ và $3 + 1$.',
      ],
      solution: '$x^2 - 2xy + 3 - x^2 - xy + 1 = (x^2 - x^2) + (-2xy - xy) + (3 + 1) = -3xy + 4$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $A = 3x^2y - 2xy^2 + xy$ và $B = -x^2y + 5xy^2 - 4xy$. Tính $A + B$ rồi cho biết hệ số của hạng tử chứa $xy^2$.',
      answer: 3,
      hints: ['Chỉ cần cộng hai hạng tử đồng dạng chứa $xy^2$: $-2xy^2$ và $5xy^2$.'],
      solution: '$A + B = 2x^2y + 3xy^2 - 3xy$. Hệ số của $xy^2$ là $-2 + 5 = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Với $A = 3x^2y - 2xy^2 + xy$ và $B = -x^2y + 5xy^2 - 4xy$, tính $A - B$ rồi cho biết hệ số của hạng tử chứa $x^2y$.',
      answer: 4,
      hints: ['Đổi dấu $B$: hạng tử $-x^2y$ thành $+x^2y$.'],
      solution:
        '$A - B = 3x^2y - 2xy^2 + xy + x^2y - 5xy^2 + 4xy = 4x^2y - 7xy^2 + 5xy$. Hệ số của $x^2y$ là $4$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $(x^3y + 2xy - 1) - (x^3y - xy + 4)$.',
      answer: 2,
      hints: ['Thu gọn hiệu trước khi tìm bậc.', 'Hai hạng tử $x^3y$ triệt tiêu nhau.'],
      solution:
        '$x^3y + 2xy - 1 - x^3y + xy - 4 = 3xy - 5$. Hạng tử bậc cao nhất là $3xy$ (bậc $2$), nên đa thức có bậc $2$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $P = x^2 + 2xy - 3$ và $Q = -x^2 + xy + 1$. Tính giá trị của $P + Q$ tại $x = 2$, $y = -1$.',
      answer: -8,
      hints: ['Thu gọn $P + Q$ trước rồi mới thay số.', '$P + Q = 3xy - 2$.'],
      solution:
        '$P + Q = (x^2 - x^2) + (2xy + xy) + (-3 + 1) = 3xy - 2$. Tại $x = 2$, $y = -1$: $3 \\cdot 2 \\cdot (-1) - 2 = -8$.',
    },
    {
      type: 'choice',
      prompt: 'Tìm đa thức $M$, biết $M - (2xy - y^2) = x^2 + y^2$.',
      options: ['$x^2 - 2xy + 2y^2$', '$x^2 + 2xy + 2y^2$', '$x^2 - 2xy$', '$x^2 + 2xy$'],
      answer: 3,
      hints: [
        '$M$ là số bị trừ: số bị trừ bằng hiệu cộng số trừ.',
        '$M = (x^2 + y^2) + (2xy - y^2)$.',
      ],
      solution: '$M = x^2 + y^2 + 2xy - y^2 = x^2 + 2xy$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước trừ đa thức $A$ cho đa thức $B$ theo đúng thứ tự.',
      items: [
        'Nhóm các hạng tử đồng dạng.',
        'Viết hiệu $(A) - (B)$, mỗi đa thức trong một cặp ngoặc.',
        'Cộng các hạng tử đồng dạng để thu gọn.',
        'Bỏ dấu ngoặc, đổi dấu mọi hạng tử của $B$.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải bỏ ngoặc trước thì mới nhóm được các hạng tử của hai đa thức.'],
      solution:
        'Viết hiệu trong ngoặc → bỏ ngoặc và đổi dấu các hạng tử của $B$ → nhóm các hạng tử đồng dạng → thu gọn.',
    },
    {
      type: 'number',
      prompt:
        'Một tam giác có ba cạnh dài $2x + y$, $x + 3y$ và $3x - y$ (cm). Viết đa thức biểu thị chu vi tam giác rồi tính chu vi khi $x = 4$, $y = 2$.',
      answer: 30,
      unit: 'cm',
      hints: ['Chu vi là tổng ba cạnh.', 'Tổng thu gọn là $6x + 3y$.'],
      solution:
        'Chu vi $= (2x + y) + (x + 3y) + (3x - y) = 6x + 3y$. Khi $x = 4$, $y = 2$: $6 \\cdot 4 + 3 \\cdot 2 = 30$ (cm).',
    },
  ],
  takeaways: [
    'Cộng hai đa thức: viết tổng, bỏ ngoặc, nhóm các hạng tử đồng dạng và thu gọn.',
    'Trừ hai đa thức: viết hiệu, bỏ ngoặc và đổi dấu tất cả các hạng tử của đa thức trừ, rồi nhóm và thu gọn.',
    'Có thể đặt tính theo cột: các hạng tử đồng dạng thẳng một cột, $A - B = A + (-B)$.',
  ],
};
