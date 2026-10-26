/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chia đơn thức cho đơn thức và đa thức cho đơn thức: điều kiện chia hết, quy tắc chia từng hạng tử và cách thử lại bằng phép nhân.',
  intro:
    'Một hình chữ nhật có diện tích $6x^2y + 9xy^2$ và chiều rộng $3xy$. Chiều dài của nó là bao nhiêu? Ở bài trước ta nhân đa thức; bài này đi ngược lại: chia một đa thức cho một đơn thức, bằng cách chia từng hạng tử. Nhưng không phải phép chia nào cũng thực hiện được: ta cần biết khi nào một đơn thức chia hết cho một đơn thức.',
  objectives: [
    'Nhận biết đơn thức $A$ chia hết cho đơn thức $B$ và thực hiện phép chia.',
    'Nhận biết đa thức chia hết cho đơn thức.',
    'Chia đa thức cho đơn thức trong trường hợp chia hết và thử lại bằng phép nhân.',
  ],
  sections: [
    {
      heading: 'Chia đơn thức cho đơn thức',
      blocks: [
        {
          type: 'p',
          text: 'Ở lớp 7 ta đã biết $x^m : x^n = x^{m - n}$ với $m \\ge n$ (quy ước $x^0 = 1$), chẳng hạn $6x^3 : 2x^2 = 3x$. Với đơn thức nhiều biến, ta làm như vậy với từng biến.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn thức chia hết cho đơn thức',
          text: 'Đơn thức $A$ chia hết cho đơn thức $B$ $(B \\ne 0)$ khi mỗi biến của $B$ đều là biến của $A$ với số mũ không lớn hơn số mũ của nó trong $A$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn chia đơn thức $A$ cho đơn thức $B$ (trường hợp $A$ chia hết cho $B$), ta làm như sau: chia hệ số của $A$ cho hệ số của $B$; chia lũy thừa của từng biến trong $A$ cho lũy thừa của cùng biến đó trong $B$; nhân các kết quả vừa tìm được với nhau.',
        },
        {
          type: 'tex',
          tex: '12x^4y^3 : (-3x^2y) = [12 : (-3)] \\cdot (x^4 : x^2) \\cdot (y^3 : y) = -4x^2y^2',
        },
        {
          type: 'p',
          text: 'Hệ số là số thực khác $0$ nên không cần chia hết cho nhau: $3x^2y : 2xy = \\frac{3}{2}x$. Biến nào có cùng số mũ ở $A$ và $B$ thì biến mất khỏi thương: $5x^2y^3 : x^2y = 5y^2$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không chia hết',
          text: '$4x^2$ không chia hết cho $xy$ vì biến $y$ của $B$ không có trong $A$. $x^3y$ không chia hết cho $x^2y^2$ vì số mũ của $y$ trong $B$ là $2$, lớn hơn số mũ $1$ của $y$ trong $A$.',
        },
      ],
    },
    {
      heading: 'Chia đa thức cho đơn thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đa thức chia hết cho đơn thức',
          text: 'Đa thức $A$ chia hết cho đơn thức $B$ $(B \\ne 0)$ khi mọi hạng tử của $A$ đều chia hết cho $B$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn chia đa thức $A$ cho đơn thức $B$ (trường hợp $A$ chia hết cho $B$), ta chia mỗi hạng tử của $A$ cho $B$ rồi cộng các kết quả với nhau.',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} (6x^3y^2 - 9x^2y^3 + 12x^2y^2) : 3x^2y^2 &= 6x^3y^2 : 3x^2y^2 + (-9x^2y^3) : 3x^2y^2 + 12x^2y^2 : 3x^2y^2 \\\\ &= 2x - 3y + 4 \\end{aligned}',
        },
        {
          type: 'table',
          caption: 'Bảng chia từng hạng tử cho $B = 3x^2y^2$',
          head: ['Hạng tử của $A$', 'Điều kiện chia hết', 'Thương'],
          rows: [
            ['$6x^3y^2$', '$x$: $3 \\ge 2$; $y$: $2 \\ge 2$', '$2x$'],
            ['$-9x^2y^3$', '$x$: $2 \\ge 2$; $y$: $3 \\ge 2$', '$-3y$'],
            ['$12x^2y^2$', '$x$: $2 \\ge 2$; $y$: $2 \\ge 2$', '$4$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: 'Phép chia là phép toán ngược của phép nhân: nếu $A : B = Q$ thì $B \\cdot Q = A$. Ở trên, $3x^2y^2 \\cdot (2x - 3y + 4) = 6x^3y^2 - 9x^2y^3 + 12x^2y^2$.',
        },
        {
          type: 'p',
          text: 'Chỉ cần một hạng tử của $A$ không chia hết cho $B$ là $A$ không chia hết cho $B$. Chẳng hạn $x^2y + 3x$ không chia hết cho $xy$ vì hạng tử $3x$ không chứa $y$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng chia từng hạng tử',
    instruction:
      'Chọn đa thức bị chia $A$ rồi lập đơn thức chia $B$ bằng hệ số và số mũ của $x$, $y$. Mỗi hàng của bảng so sánh số mũ của từng biến trong $B$ với số mũ trong hạng tử: hàng xanh là chia hết, hàng đỏ là không. Thử thách: tìm đơn thức $B$ có bậc lớn nhất mà $A$ vẫn chia hết cho $B$.',
  },
  examples: [
    {
      problem: 'Thực hiện phép chia: a) $15x^3y^4z : 5xy^2$; b) $2x^3y^2 : (-4xy^2)$.',
      steps: [
        'a) Chia hệ số: $15 : 5 = 3$; chia lũy thừa: $x^3 : x = x^2$, $y^4 : y^2 = y^2$; biến $z$ không có trong $B$ nên giữ nguyên.',
        'Vậy $15x^3y^4z : 5xy^2 = 3x^2y^2z$.',
        'b) Chia hệ số: $2 : (-4) = -\\frac{1}{2}$; $x^3 : x = x^2$; $y^2 : y^2 = 1$.',
      ],
      answer: 'a) $3x^2y^2z$; b) $-\\frac{1}{2}x^2$.',
    },
    {
      problem: 'Thực hiện phép chia $(-6x^3y^2 + 4x^2y^3 + 2x^4y) : (-2x^2y)$.',
      steps: [
        'Mỗi hạng tử đều chứa $x$ với số mũ ít nhất $2$ và $y$ với số mũ ít nhất $1$, nên đa thức chia hết cho $-2x^2y$.',
        '$-6x^3y^2 : (-2x^2y) = 3xy$; $4x^2y^3 : (-2x^2y) = -2y^2$; $2x^4y : (-2x^2y) = -x^2$.',
        'Thử lại: $-2x^2y \\cdot (3xy - 2y^2 - x^2) = -6x^3y^2 + 4x^2y^3 + 2x^4y$.',
      ],
      answer: '$3xy - 2y^2 - x^2$.',
    },
    {
      problem:
        'Tìm số tự nhiên $n$ để đa thức $A = 7x^ny^3 - 2x^4y^2$ chia hết cho đơn thức $B = 3x^2y$.',
      steps: [
        'Hạng tử $-2x^4y^2$ chia hết cho $3x^2y$ vì $4 \\ge 2$ và $2 \\ge 1$.',
        'Hạng tử $7x^ny^3$ chia hết cho $3x^2y$ khi số mũ của $x$ không nhỏ hơn $2$, tức là $n \\ge 2$ (số mũ của $y$: $3 \\ge 1$).',
      ],
      answer: '$A$ chia hết cho $B$ khi $n$ là số tự nhiên và $n \\ge 2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kết quả của phép chia $12x^4y^3 : (-4x^3y)$ là',
      options: ['$-3xy^2$', '$3xy^2$', '$-3x^7y^4$', '$-8xy^2$'],
      answer: 0,
      hints: [
        'Chia hệ số: $12 : (-4)$.',
        'Chia lũy thừa cùng cơ số thì trừ số mũ: $x^4 : x^3$, $y^3 : y$.',
      ],
      solution: '$12 : (-4) = -3$; $x^4 : x^3 = x$; $y^3 : y = y^2$. Vậy thương là $-3xy^2$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đơn thức chia hết cho đơn thức $2x^2y$.',
      options: ['$5x^3y^2$', '$-x^2y$', '$4xy^3$', '$6x^2z$', '$\\frac{1}{3}x^4y$'],
      answers: [0, 1, 4],
      hints: [
        'Đơn thức cần chứa cả $x$ và $y$.',
        'Số mũ của $x$ phải ít nhất là $2$, số mũ của $y$ ít nhất là $1$; hệ số không ảnh hưởng.',
      ],
      solution:
        '$5x^3y^2$, $-x^2y$ và $\\frac{1}{3}x^4y$ chia hết cho $2x^2y$. $4xy^3$ không chia hết vì $x$ chỉ có số mũ $1 < 2$; $6x^2z$ không chia hết vì không chứa $y$.',
    },
    {
      type: 'fraction',
      prompt: 'Thực hiện phép chia $3x^3y^2 : 2x^2y^2$. Hệ số của thương là bao nhiêu?',
      answer: [3, 2],
      hints: ['Hệ số của thương là hệ số của $A$ chia cho hệ số của $B$; có thể là phân số.'],
      solution: '$3x^3y^2 : 2x^2y^2 = \\frac{3}{2}x$, hệ số của thương là $\\frac{3}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Đa thức nào chia hết cho đơn thức $xy^2$?',
      options: ['$x^2y^2 - 3xy$', '$x^3y^2 + 5xy^3$', '$xy^2 + 4x$', '$x^2y^3 - y^2$'],
      answer: 1,
      hints: [
        'Mọi hạng tử phải chia hết cho $xy^2$: chứa $x$ và chứa $y$ với số mũ ít nhất $2$.',
        'Kiểm tra từng hạng tử, chỉ một hạng tử sai là đa thức không chia hết.',
      ],
      solution:
        'Trong $x^3y^2 + 5xy^3$, cả hai hạng tử đều chia hết cho $xy^2$. Các đa thức kia có một hạng tử không chia hết: $-3xy$ (số mũ của $y$ là $1$), $4x$ (không chứa $y$), $-y^2$ (không chứa $x$).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với thương của nó.',
      left: ['$6x^2y : 3xy$', '$-4x^3y^2 : 2x^3y$', '$x^2y^2 : (-xy)$'],
      right: ['$-xy$', '$2x$', '$2xy$', '$-2y$'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
      ],
      hints: ['Chia hệ số, rồi trừ số mũ của từng biến; biến có cùng số mũ thì biến mất.'],
      solution:
        '$6x^2y : 3xy = 2x$; $-4x^3y^2 : 2x^3y = -2y$; $x^2y^2 : (-xy) = -xy$. Đơn thức $2xy$ không phải thương của phép chia nào.',
    },
    {
      type: 'number',
      prompt:
        'Thực hiện phép chia $(8x^3y^2 - 4x^2y^3 + 6x^2y^2) : 2x^2y^2$ rồi tính giá trị của thương tại $x = 2$, $y = -1$.',
      answer: 13,
      hints: [
        'Chia từng hạng tử cho $2x^2y^2$.',
        'Thương là $4x - 2y + 3$; thay $x = 2$, $y = -1$.',
      ],
      solution:
        'Thương bằng $4x - 2y + 3$. Tại $x = 2$, $y = -1$: $4 \\cdot 2 - 2 \\cdot (-1) + 3 = 8 + 2 + 3 = 13$.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức $(x^3y^2 - 2x^2y^3) : x^2y^2 + 2y$ bằng',
      options: ['$x$', '$x + 4y$', '$x - 4y$', '$xy$'],
      answer: 0,
      hints: ['Chia trước: $(x^3y^2 - 2x^2y^3) : x^2y^2 = x - 2y$.'],
      solution: '$(x^3y^2 - 2x^2y^3) : x^2y^2 + 2y = x - 2y + 2y = x$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số tự nhiên $n$ nhỏ nhất để đa thức $4x^ny^5 - x^6y^n$ chia hết cho đơn thức $2x^4y^2$.',
      answer: 4,
      hints: [
        'Hạng tử $4x^ny^5$ cần số mũ của $x$ ít nhất là $4$.',
        'Hạng tử $-x^6y^n$ cần số mũ của $y$ ít nhất là $2$.',
      ],
      solution:
        'Cần đồng thời $n \\ge 4$ (từ $4x^ny^5$) và $n \\ge 2$ (từ $-x^6y^n$), tức là $n \\ge 4$. Số tự nhiên nhỏ nhất là $n = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có diện tích $6x^2y + 9xy^2$ ($\\text{m}^2$) và chiều rộng $3xy$ (m). Viết đa thức biểu thị chiều dài rồi tính chiều dài khi $x = 2$, $y = 1$.',
      answer: 7,
      unit: 'm',
      hints: [
        'Chiều dài bằng diện tích chia cho chiều rộng.',
        '$(6x^2y + 9xy^2) : 3xy = 2x + 3y$.',
      ],
      solution:
        'Chiều dài là $(6x^2y + 9xy^2) : 3xy = 2x + 3y$ (m). Khi $x = 2$, $y = 1$: $2 \\cdot 2 + 3 \\cdot 1 = 7$ (m). Kiểm tra: diện tích $24 + 18 = 42$, chiều rộng $6$, và $42 : 6 = 7$.',
    },
  ],
  takeaways: [
    'Đơn thức $A$ chia hết cho đơn thức $B \\ne 0$ khi mỗi biến của $B$ là biến của $A$ với số mũ không lớn hơn số mũ trong $A$.',
    'Chia đơn thức: chia hệ số, chia lũy thừa của từng biến (trừ số mũ), rồi nhân các kết quả.',
    'Đa thức chia hết cho đơn thức khi mọi hạng tử chia hết; khi đó chia từng hạng tử rồi cộng các kết quả.',
    'Thử lại phép chia bằng phép nhân: $B \\cdot (A : B) = A$.',
  ],
};
