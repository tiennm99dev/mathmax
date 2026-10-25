/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số nguyên tố và hợp số, phân tích một số ra thừa số nguyên tố, và sàng Eratosthenes để tìm mọi số nguyên tố đến 100.',
  intro:
    'Có những số chỉ chia hết cho 1 và chính nó, như 2, 3, 5, 7. Đó là các số nguyên tố, những "viên gạch" dựng nên mọi số tự nhiên lớn hơn 1. Trong bài này em sẽ nhận ra số nguyên tố, phân tích một số thành tích các thừa số nguyên tố và dùng sàng Eratosthenes để lọc ra tất cả số nguyên tố từ 1 đến 100.',
  objectives: [
    'Phân biệt số nguyên tố, hợp số và hai số đặc biệt 0, 1.',
    'Phân tích một số tự nhiên lớn hơn 1 ra thừa số nguyên tố theo cột dọc hoặc theo sơ đồ cây.',
    'Dùng sàng Eratosthenes để liệt kê các số nguyên tố nhỏ hơn 100.',
  ],
  sections: [
    {
      heading: 'Số nguyên tố và hợp số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số nguyên tố, hợp số',
          text: 'Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó. Hợp số là số tự nhiên lớn hơn 1 có nhiều hơn hai ước.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $7$ chỉ có hai ước là $1$ và $7$ nên $7$ là số nguyên tố. Số $9$ có ba ước $1, 3, 9$ nên $9$ là hợp số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số $0$ và số $1$ không phải là số nguyên tố, cũng không phải là hợp số. Số $2$ là số nguyên tố chẵn duy nhất.',
        },
        {
          type: 'p',
          text: 'Để kiểm tra một số $n$ có phải số nguyên tố không, em thử chia $n$ cho các số nguyên tố $2, 3, 5, 7, \\dots$ có bình phương không vượt quá $n$. Nếu không phép chia nào hết thì $n$ là số nguyên tố.',
        },
      ],
    },
    {
      heading: 'Phân tích một số ra thừa số nguyên tố',
      blocks: [
        {
          type: 'p',
          text: 'Phân tích một số tự nhiên lớn hơn 1 ra thừa số nguyên tố là viết số đó dưới dạng tích các thừa số nguyên tố. Mỗi hợp số đều phân tích được, và dù làm theo cách nào ta cũng được cùng một kết quả (không kể thứ tự).',
        },
        { type: 'tex', tex: '60 = 2 \\cdot 2 \\cdot 3 \\cdot 5 = 2^2 \\cdot 3 \\cdot 5' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chia số đó cho số nguyên tố nhỏ nhất mà nó chia hết (thường thử $2$, rồi $3$, $5$, $7$, ...).',
            'Lặp lại với thương vừa nhận được cho đến khi thương bằng $1$.',
            'Viết tích các số chia, gộp các thừa số giống nhau thành luỹ thừa.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Một số nguyên tố $p$ thì phân tích ra thừa số nguyên tố chính là $p$.',
        },
      ],
    },
    {
      heading: 'Sàng Eratosthenes',
      blocks: [
        {
          type: 'p',
          text: 'Nhà toán học Hy Lạp Eratosthenes (khoảng 276-194 trước Công nguyên) nghĩ ra cách "sàng" để giữ lại các số nguyên tố: bắt đầu từ $2$, gạch bỏ mọi bội của nó (trừ chính nó); chuyển sang số chưa bị gạch tiếp theo là $3$ và làm tương tự; lặp lại cho đến khi đã xét hết các số có bình phương không vượt quá $n$.',
        },
        {
          type: 'p',
          text: 'Với $n = 100$, chỉ cần sàng bằng $2, 3, 5, 7$ vì $11^2 = 121 > 100$. Sau bốn lần sàng còn lại đúng $25$ số nguyên tố.',
        },
        {
          type: 'table',
          caption: 'Các số nguyên tố nhỏ hơn 100',
          head: ['Khoảng', 'Số nguyên tố'],
          rows: [
            ['1-25', '2, 3, 5, 7, 11, 13, 17, 19, 23'],
            ['26-50', '29, 31, 37, 41, 43, 47'],
            ['51-75', '53, 59, 61, 67, 71, 73'],
            ['76-100', '79, 83, 89, 97'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Sàng Eratosthenes trên lưới 1-100',
    instruction:
      'Bấm vào số 2 trước, rồi 3, rồi 5, rồi 7 và quan sát các bội bị gạch dần. Bấm vào một hợp số thì ô đó sẽ lắc. Sau bốn lần bấm, các số chưa bị gạch (trừ 1) chính là các số nguyên tố.',
  },
  examples: [
    {
      problem: 'Số $91$ là số nguyên tố hay hợp số?',
      steps: [
        'Thử chia cho các số nguyên tố có bình phương không quá $91$: $2, 3, 5, 7$.',
        '$91$ lẻ nên không chia hết cho $2$; tổng chữ số $9 + 1 = 10$ không chia hết cho $3$; chữ số tận cùng là $1$ nên không chia hết cho $5$.',
        '$91 = 7 \\cdot 13$, vậy $91$ chia hết cho $7$.',
      ],
      answer: '$91$ có ước $7$ khác $1$ và $91$ nên $91$ là hợp số.',
    },
    {
      problem: 'Phân tích $120$ ra thừa số nguyên tố.',
      steps: [
        '$120 : 2 = 60$; $60 : 2 = 30$; $30 : 2 = 15$.',
        '$15$ lẻ, chia cho $3$: $15 : 3 = 5$.',
        '$5$ là số nguyên tố: $5 : 5 = 1$, dừng lại.',
        'Các số chia lần lượt là $2, 2, 2, 3, 5$.',
      ],
      answer: '$120 = 2^3 \\cdot 3 \\cdot 5$.',
    },
    {
      problem: 'Vì sao khi sàng đến $100$ ta không cần gạch bội của $11$?',
      steps: [
        'Một bội của $11$ nhỏ hơn $100$ có dạng $11 \\cdot k$ với $k \\le 9$.',
        'Mỗi số $k$ như vậy có một ước nguyên tố nhỏ hơn $11$, nên $11 \\cdot k$ đã bị gạch khi sàng bằng $2, 3, 5$ hoặc $7$.',
      ],
      answer: 'Mọi bội của $11$ dưới $100$ đã bị gạch từ trước, vì $11^2 = 121 > 100$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số nguyên tố.',
      options: ['$1$', '$2$', '$15$', '$17$', '$21$', '$29$'],
      answers: [1, 3, 5],
      hints: ['Số nguyên tố phải lớn hơn $1$ và chỉ có hai ước.', 'Thử chia $15$ và $21$ cho $3$.'],
      solution:
        '$2, 17, 29$ chỉ có hai ước nên là số nguyên tố. $15 = 3 \\cdot 5$ và $21 = 3 \\cdot 7$ là hợp số; $1$ không phải số nguyên tố.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        'Mọi số nguyên tố đều là số lẻ.',
        'Số $1$ là số nguyên tố.',
        'Có đúng một số nguyên tố chẵn.',
        'Tích của hai số nguyên tố là số nguyên tố.',
      ],
      answer: 2,
      hints: ['Hãy nghĩ đến số $2$.', 'Thử với tích $2 \\cdot 3$.'],
      solution:
        'Số $2$ là số nguyên tố chẵn duy nhất, vì mọi số chẵn lớn hơn $2$ đều có ước $2$. Tích $2 \\cdot 3 = 6$ là hợp số.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên tố nhỏ hơn $30$?',
      answer: 10,
      hints: [
        'Dùng sàng: gạch bội của $2, 3, 5$ trong các số từ $2$ đến $29$.',
        'Liệt kê: $2, 3, 5, 7, 11, \\dots$',
      ],
      solution:
        'Các số nguyên tố nhỏ hơn $30$ là $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$: có $10$ số.',
    },
    {
      type: 'text',
      prompt: 'Phân tích $84$ ra thừa số nguyên tố (viết dạng luỹ thừa, ví dụ 2^2*3*7).',
      accept: [
        '2^2*3*7',
        '2^2.3.7',
        '2^2 * 3 * 7',
        '2^2 . 3 . 7',
        '2^2x3x7',
        '2^2 x 3 x 7',
        '2^2·3·7',
        '2^2 · 3 · 7',
      ],
      hints: ['Chia $84$ cho $2$ hai lần.', '$84 : 2 : 2 = 21 = 3 \\cdot 7$.'],
      solution: '$84 = 2 \\cdot 2 \\cdot 3 \\cdot 7 = 2^2 \\cdot 3 \\cdot 7$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên tố lớn nhất nhỏ hơn $100$.',
      answer: 97,
      hints: ['Thử lùi dần từ $99$.', '$99 = 9 \\cdot 11$ và $98$ chẵn.'],
      solution:
        '$99$ chia hết cho $9$, $98$ chia hết cho $2$; $97$ không chia hết cho $2, 3, 5, 7$ nên $97$ là số nguyên tố lớn nhất dưới $100$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với kết quả phân tích ra thừa số nguyên tố.',
      left: ['$36$', '$45$', '$50$', '$98$'],
      right: ['$2 \\cdot 5^2$', '$2^2 \\cdot 3^2$', '$2 \\cdot 7^2$', '$3^2 \\cdot 5$'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: ['Nhân lại từng biểu thức bên phải để kiểm tra.', '$2 \\cdot 7^2 = 2 \\cdot 49$.'],
      solution:
        '$36 = 2^2 \\cdot 3^2$, $45 = 3^2 \\cdot 5$, $50 = 2 \\cdot 5^2$, $98 = 2 \\cdot 7^2$.',
    },
    {
      type: 'choice',
      prompt:
        'Để kiểm tra $113$ có là số nguyên tố không, cần thử chia cho những số nguyên tố nào?',
      options: ['$2, 3, 5, 7$', '$2, 3, 5, 7, 11$', 'Mọi số từ $2$ đến $112$', '$2$ và $3$'],
      answer: 0,
      hints: ['Chỉ cần thử các số nguyên tố $p$ với $p^2 \\le 113$.', '$11^2 = 121$.'],
      solution:
        '$10^2 = 100 \\le 113 < 121 = 11^2$, nên chỉ cần thử $2, 3, 5, 7$. Không phép chia nào hết, vậy $113$ là số nguyên tố.',
    },
  ],
  takeaways: [
    'Số nguyên tố lớn hơn $1$ và chỉ có hai ước là $1$ và chính nó; hợp số có nhiều hơn hai ước.',
    '$0$ và $1$ không là số nguyên tố, cũng không là hợp số; $2$ là số nguyên tố chẵn duy nhất.',
    'Mọi hợp số đều phân tích được thành tích các thừa số nguyên tố theo một cách duy nhất.',
    'Sàng Eratosthenes đến $n$ chỉ cần gạch bội của các số nguyên tố $p$ với $p^2 \\le n$.',
  ],
};
