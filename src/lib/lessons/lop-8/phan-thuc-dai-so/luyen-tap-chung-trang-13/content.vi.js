/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: điều kiện xác định, giá trị và hai phân thức bằng nhau; rút gọn phân thức, quy tắc đổi dấu và quy đồng mẫu thức.',
  intro:
    'Hai bài đầu chương cho em hai công cụ: biết khi nào một phân thức có nghĩa (điều kiện xác định) và biến đổi một phân thức thành phân thức bằng nó (rút gọn, quy đồng). Bài luyện tập này giúp em dùng chúng thành thạo, nhất là những chỗ hay nhầm: gạch hạng tử thay vì nhân tử, quên đổi dấu, chọn mẫu thức chung chưa đơn giản nhất.',
  objectives: [
    'Tìm điều kiện xác định và tính giá trị của phân thức.',
    'Kiểm tra hai phân thức bằng nhau; rút gọn phân thức, kể cả khi cần đổi dấu.',
    'Tìm mẫu thức chung, nhân tử phụ và quy đồng mẫu thức nhiều phân thức.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ', 'Ví dụ'],
          rows: [
            [
              'Điều kiện xác định',
              'Giá trị của mẫu khác $0$',
              '$\\dfrac{x + 1}{x^2 - 4}$: $x \\ne 2$, $x \\ne -2$',
            ],
            [
              'Hai phân thức bằng nhau',
              '$\\dfrac{A}{B} = \\dfrac{C}{D}$ nếu $A \\cdot D = B \\cdot C$',
              '$\\dfrac{x}{3} = \\dfrac{x^2}{3x}$',
            ],
            [
              'Tính chất cơ bản',
              'Nhân (chia) cả tử và mẫu với cùng một đa thức khác $0$ (một nhân tử chung)',
              '$\\dfrac{A}{B} = \\dfrac{A \\cdot M}{B \\cdot M}$',
            ],
            [
              'Quy tắc đổi dấu',
              '$\\dfrac{A}{B} = \\dfrac{-A}{-B}$',
              '$\\dfrac{1 - x}{2 - x} = \\dfrac{x - 1}{x - 2}$',
            ],
            [
              'Rút gọn',
              'Phân tích tử và mẫu thành nhân tử, chia cho nhân tử chung',
              '$\\dfrac{x^2 - 9}{x^2 + 3x} = \\dfrac{x - 3}{x}$',
            ],
            [
              'Quy đồng',
              'Tìm MTC, nhân tử phụ = MTC : mẫu, nhân cả tử và mẫu với nhân tử phụ',
              'MTC của $\\dfrac{1}{2x}$, $\\dfrac{1}{3x^2}$ là $6x^2$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, trộn đều từ Bài 21 và Bài 22. Đáp số là số nguyên, phân số (gõ dạng $-7/3$) hoặc số thập phân (gõ dấu phẩy, ví dụ $1{,}25$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Cho phân thức $P = \\dfrac{x^2 - 2x}{x^2 - 4}$. a) Tìm điều kiện xác định của $P$. b) Rút gọn $P$. c) Tính giá trị của $P$ tại $x = 3$. Có tính được giá trị của $P$ tại $x = 2$ không?',
      steps: [
        'a) $x^2 - 4 = (x - 2)(x + 2) \\ne 0$ khi $x \\ne 2$ và $x \\ne -2$.',
        'b) $P = \\dfrac{x(x - 2)}{(x - 2)(x + 2)} = \\dfrac{x}{x + 2}$.',
        'c) $x = 3$ thỏa mãn điều kiện xác định: $P = \\dfrac{3}{3 + 2} = \\dfrac{3}{5}$.',
        'Tại $x = 2$ mẫu $x^2 - 4$ bằng $0$, nên $P$ không xác định, dù biểu thức rút gọn $\\dfrac{x}{x + 2}$ vẫn tính được. Luôn tìm điều kiện xác định từ phân thức ban đầu.',
      ],
      answer:
        'a) $x \\ne \\pm 2$; b) $P = \\dfrac{x}{x + 2}$; c) $P = \\dfrac{3}{5}$; tại $x = 2$ không tính được.',
    },
    {
      problem:
        'Quy đồng mẫu thức hai phân thức $\\dfrac{1}{x^2 - 1}$ và $\\dfrac{x}{x^2 + 2x + 1}$.',
      steps: [
        'Phân tích các mẫu: $x^2 - 1 = (x - 1)(x + 1)$; $x^2 + 2x + 1 = (x + 1)^2$.',
        'MTC $= (x - 1)(x + 1)^2$ (mỗi nhân tử lấy số mũ cao nhất).',
        'Nhân tử phụ: của $x^2 - 1$ là $x + 1$; của $x^2 + 2x + 1$ là $x - 1$.',
      ],
      answer:
        '$\\dfrac{1}{x^2 - 1} = \\dfrac{x + 1}{(x - 1)(x + 1)^2}$; $\\dfrac{x}{x^2 + 2x + 1} = \\dfrac{x(x - 1)}{(x - 1)(x + 1)^2}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các giá trị của $x$ tại đó phân thức $\\dfrac{2x}{x^2 - 3x}$ không xác định.',
      options: ['$x = 0$', '$x = 3$', '$x = -3$', '$x = 2$'],
      answers: [0, 1],
      hints: ['Phân tích mẫu: $x^2 - 3x = x(x - 3)$.'],
      solution:
        '$x(x - 3) = 0$ khi $x = 0$ hoặc $x = 3$. Phân thức xác định khi $x \\ne 0$ và $x \\ne 3$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính giá trị của phân thức $\\dfrac{x^2 - 2x}{x^2 - 4}$ tại $x = 1$.',
      answer: [1, 3],
      hints: ['Kiểm tra mẫu khác $0$, rồi thay $x = 1$ vào tử và mẫu.'],
      solution:
        'Tử: $1 - 2 = -1$; mẫu: $1 - 4 = -3 \\ne 0$. Giá trị: $\\dfrac{-1}{-3} = \\dfrac{1}{3}$. (Cũng có thể rút gọn trước: $\\dfrac{x}{x + 2} = \\dfrac{1}{3}$.)',
    },
    {
      type: 'choice',
      prompt: 'Phân thức nào bằng phân thức $\\dfrac{x + 2}{x - 1}$?',
      options: [
        '$\\dfrac{x^2 + 4x + 4}{x^2 + x - 2}$',
        '$\\dfrac{x^2 + 4}{x^2 - 1}$',
        '$\\dfrac{x + 4}{x + 1}$',
        '$\\dfrac{2x + 2}{2x - 1}$',
      ],
      answer: 0,
      hints: [
        'Kiểm tra $A \\cdot D = B \\cdot C$, hoặc rút gọn từng lựa chọn.',
        '$x^2 + 4x + 4 = (x + 2)^2$ và $x^2 + x - 2 = (x - 1)(x + 2)$.',
      ],
      solution:
        '$\\dfrac{(x + 2)^2}{(x - 1)(x + 2)} = \\dfrac{x + 2}{x - 1}$. Các lựa chọn khác có được bằng cách cộng hoặc bình phương riêng từng hạng tử, không phải nhân cả tử và mẫu với cùng một đa thức.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn phân thức $\\dfrac{x^3 - 8}{x^2 - 4}$ được',
      options: [
        '$\\dfrac{x^2 + 2x + 4}{x + 2}$',
        '$\\dfrac{x^2 - 2x + 4}{x + 2}$',
        '$x - 2$',
        '$\\dfrac{x + 2}{x^2 + 2x + 4}$',
      ],
      answer: 0,
      hints: ['$x^3 - 8$ là hiệu hai lập phương: $x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)$.'],
      solution: '$\\dfrac{(x - 2)(x^2 + 2x + 4)}{(x - 2)(x + 2)} = \\dfrac{x^2 + 2x + 4}{x + 2}$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn phân thức $\\dfrac{2x^2 - 2}{x^2 - 2x + 1}$ rồi tính giá trị của nó tại $x = 3$.',
      answer: 4,
      hints: ['$2x^2 - 2 = 2(x - 1)(x + 1)$; $x^2 - 2x + 1 = (x - 1)^2$.'],
      solution:
        '$\\dfrac{2(x - 1)(x + 1)}{(x - 1)^2} = \\dfrac{2(x + 1)}{x - 1}$. Tại $x = 3$: $\\dfrac{2 \\cdot 4}{2} = 4$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn phân thức $\\dfrac{(x - y)^2}{y^2 - x^2}$ được',
      options: [
        '$\\dfrac{y - x}{x + y}$',
        '$\\dfrac{x - y}{x + y}$',
        '$-1$',
        '$\\dfrac{x - y}{y - x}$',
      ],
      answer: 0,
      hints: [
        'Đổi dấu để có nhân tử chung: $y^2 - x^2 = -(x - y)(x + y)$.',
        'Sau khi chia cho $x - y$, đổi dấu tử để mẫu không có dấu trừ phía trước.',
      ],
      solution:
        '$\\dfrac{(x - y)^2}{-(x - y)(x + y)} = \\dfrac{x - y}{-(x + y)} = \\dfrac{-(x - y)}{x + y} = \\dfrac{y - x}{x + y}$.',
    },
    {
      type: 'choice',
      prompt:
        'Mẫu thức chung đơn giản nhất của hai phân thức $\\dfrac{1}{x^2 - 4}$ và $\\dfrac{3}{x^2 - 4x + 4}$ là',
      options: [
        '$(x + 2)(x - 2)^2$',
        '$(x + 2)(x - 2)$',
        '$(x^2 - 4)(x^2 - 4x + 4)$',
        '$(x + 2)^2(x - 2)^2$',
      ],
      answer: 0,
      hints: [
        'Phân tích: $x^2 - 4 = (x - 2)(x + 2)$; $x^2 - 4x + 4 = (x - 2)^2$.',
        'Mỗi nhân tử lấy với số mũ cao nhất.',
      ],
      solution:
        'Các nhân tử là $x + 2$ (số mũ cao nhất $1$) và $x - 2$ (số mũ cao nhất $2$). MTC $= (x + 2)(x - 2)^2$. Tích hai mẫu cũng chia hết cho mỗi mẫu nhưng không đơn giản nhất.',
    },
    {
      type: 'text',
      prompt:
        'Quy đồng $\\dfrac{1}{x^2 - 4}$ và $\\dfrac{3}{x^2 - 4x + 4}$ với MTC $= (x + 2)(x - 2)^2$. Nhân tử phụ của mẫu $x^2 - 4$ là gì?',
      accept: ['x - 2', 'x-2', 'x − 2', 'x−2', '(x - 2)', '(x-2)'],
      hints: ['Nhân tử phụ = MTC : mẫu thức; $x^2 - 4 = (x - 2)(x + 2)$.'],
      solution:
        '$(x + 2)(x - 2)^2 : [(x - 2)(x + 2)] = x - 2$. Vậy $\\dfrac{1}{x^2 - 4} = \\dfrac{x - 2}{(x + 2)(x - 2)^2}$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số $a$ để phân thức $\\dfrac{x^2 + ax}{x^2 - 9}$ rút gọn được thành $\\dfrac{x}{x - 3}$.',
      answer: 3,
      hints: [
        '$x^2 + ax = x(x + a)$ và $x^2 - 9 = (x - 3)(x + 3)$.',
        'Để còn lại $\\dfrac{x}{x - 3}$, nhân tử $x + a$ phải gạch được với một nhân tử của mẫu.',
      ],
      solution:
        '$\\dfrac{x(x + a)}{(x - 3)(x + 3)} = \\dfrac{x}{x - 3}$ khi $x + a = x + 3$, tức là $a = 3$. Kiểm tra: $x \\cdot (x^2 - 9) = (x - 3)(x^2 + 3x)$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phát biểu đúng.',
      options: [
        'Mỗi đa thức là một phân thức với mẫu bằng $1$.',
        'Phân thức $\\dfrac{x + 1}{x^2 + 1}$ xác định với mọi giá trị của $x$.',
        '$\\dfrac{x + 3}{x + 5} = \\dfrac{3}{5}$.',
        'Phân thức không xác định tại giá trị của biến làm tử bằng $0$.',
      ],
      answers: [0, 1],
      hints: [
        'Chỉ mẫu bằng $0$ mới làm phân thức không xác định.',
        'Không được gạch hạng tử $x$ ở tử và mẫu.',
      ],
      solution:
        'Đúng: phát biểu thứ nhất, và thứ hai vì $x^2 + 1 \\ge 1 > 0$. Sai: $\\dfrac{x + 3}{x + 5} \\ne \\dfrac{3}{5}$ (thử $x = 1$: $\\dfrac{4}{6} \\ne \\dfrac{3}{5}$); tử bằng $0$ thì phân thức vẫn xác định và bằng $0$.',
    },
  ],
  takeaways: [
    'Tìm điều kiện xác định từ phân thức ban đầu, trước khi rút gọn.',
    'Rút gọn: phân tích thành nhân tử, đổi dấu khi cần ($B - A = -(A - B)$), rồi chia cả tử và mẫu cho nhân tử chung.',
    'MTC đơn giản nhất: BCNN của các hệ số nhân với mỗi nhân tử lấy số mũ cao nhất; nhân tử phụ = MTC : mẫu.',
  ],
};
