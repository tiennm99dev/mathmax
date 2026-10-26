/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính chất cơ bản của phân thức đại số, quy tắc đổi dấu, cách rút gọn phân thức và quy đồng mẫu thức nhiều phân thức.',
  intro:
    'Ở lớp 6, ta rút gọn $\\dfrac{6}{8} = \\dfrac{3}{4}$ bằng cách chia cả tử và mẫu cho $2$, và quy đồng $\\dfrac{1}{6}$, $\\dfrac{1}{4}$ về mẫu chung $12$. Phân thức đại số cũng có tính chất cơ bản như phân số. Nhờ nó ta viết một phân thức gọn hơn, hoặc đưa nhiều phân thức về cùng một mẫu để chuẩn bị cộng, trừ ở bài sau.',
  objectives: [
    'Phát biểu và vận dụng tính chất cơ bản của phân thức, quy tắc đổi dấu.',
    'Rút gọn phân thức bằng cách phân tích tử và mẫu thành nhân tử rồi chia cho nhân tử chung.',
    'Tìm mẫu thức chung, nhân tử phụ và quy đồng mẫu thức nhiều phân thức.',
  ],
  sections: [
    {
      heading: 'Tính chất cơ bản của phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất cơ bản',
          text: 'Nếu nhân cả tử và mẫu của một phân thức với cùng một đa thức khác đa thức $0$ thì được một phân thức bằng phân thức đã cho: $\\dfrac{A}{B} = \\dfrac{A \\cdot M}{B \\cdot M}$ ($M$ là một đa thức khác đa thức $0$). Nếu chia cả tử và mẫu của một phân thức cho một nhân tử chung của chúng thì được một phân thức bằng phân thức đã cho: $\\dfrac{A}{B} = \\dfrac{A : N}{B : N}$ ($N$ là một nhân tử chung của $A$ và $B$).',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, nhân cả tử và mẫu của $\\dfrac{x}{x + 1}$ với $x - 1$:',
        },
        {
          type: 'tex',
          tex: '\\dfrac{x}{x + 1} = \\dfrac{x(x - 1)}{(x + 1)(x - 1)} = \\dfrac{x^2 - x}{x^2 - 1}.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy tắc đổi dấu',
          text: 'Nếu đổi dấu cả tử và mẫu của một phân thức thì được một phân thức bằng phân thức đã cho: $\\dfrac{A}{B} = \\dfrac{-A}{-B}$. Ví dụ: $\\dfrac{x - 1}{2 - x} = \\dfrac{1 - x}{x - 2}$.',
        },
      ],
    },
    {
      heading: 'Rút gọn phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Muốn rút gọn một phân thức, ta có thể',
          text: 'Phân tích tử và mẫu thành nhân tử (nếu cần) để tìm nhân tử chung; chia cả tử và mẫu cho nhân tử chung đó.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{x^2 - 4}{x^2 + 2x} = \\dfrac{(x - 2)(x + 2)}{x(x + 2)} = \\dfrac{x - 2}{x}.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chỉ gạch nhân tử, không gạch hạng tử',
          text: 'Trong $\\dfrac{x + 2}{x + 4}$, $x$ chỉ là một hạng tử của tử và mẫu, không phải nhân tử chung. Viết $\\dfrac{x + 2}{x + 4} = \\dfrac{2}{4}$ là sai: thử $x = 1$ thì $\\dfrac{3}{5} \\ne \\dfrac{1}{2}$.',
        },
        {
          type: 'p',
          text: 'Đôi khi phải đổi dấu để nhân tử chung xuất hiện, vì $B - A = -(A - B)$. Chẳng hạn $\\dfrac{3(x - y)}{y - x} = \\dfrac{3(x - y)}{-(x - y)} = -3$.',
        },
      ],
    },
    {
      heading: 'Quy đồng mẫu thức nhiều phân thức',
      blocks: [
        {
          type: 'p',
          text: 'Quy đồng mẫu thức nhiều phân thức là biến đổi các phân thức đã cho thành những phân thức có cùng mẫu thức và lần lượt bằng các phân thức đã cho. Mẫu chung đó gọi là mẫu thức chung (MTC); nó chia hết cho mẫu thức của mỗi phân thức.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Muốn quy đồng mẫu thức nhiều phân thức, ta làm như sau',
          text: 'Bước 1. Phân tích các mẫu thức thành nhân tử rồi tìm mẫu thức chung. Bước 2. Tìm nhân tử phụ của mỗi mẫu thức (bằng cách chia MTC cho mẫu thức đó). Bước 3. Nhân cả tử và mẫu của mỗi phân thức với nhân tử phụ tương ứng.',
        },
        {
          type: 'p',
          text: 'Mẫu thức chung đơn giản nhất thường được chọn là tích của nhân tử bằng số (bội chung nhỏ nhất của các hệ số nguyên dương) với các lũy thừa của mỗi nhân tử có trong các mẫu, mỗi lũy thừa lấy số mũ cao nhất.',
        },
        {
          type: 'table',
          caption: 'Quy đồng $\\dfrac{1}{6x^2y}$ và $\\dfrac{5}{4xy^3}$',
          head: ['Mẫu thức', 'MTC', 'Nhân tử phụ', 'Phân thức mới'],
          rows: [
            ['$6x^2y$', '$12x^2y^3$', '$2y^2$', '$\\dfrac{2y^2}{12x^2y^3}$'],
            ['$4xy^3$', '$12x^2y^3$', '$3x$', '$\\dfrac{15x}{12x^2y^3}$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Rút gọn từng bước',
    instruction:
      'Chọn một phân thức. Tử và mẫu đã được phân tích thành các thẻ nhân tử. Chạm một thẻ ở tử rồi chạm thẻ giống hệt ở mẫu để chia cả tử và mẫu cho nhân tử chung đó. Khi nghĩ đã hết nhân tử chung, bấm "Không còn nhân tử chung" để kiểm tra. Phân thức cuối cùng có gì đặc biệt?',
  },
  examples: [
    {
      problem: 'Rút gọn phân thức $\\dfrac{x^3 - x}{x^2 + x}$.',
      steps: [
        'Phân tích tử: $x^3 - x = x(x^2 - 1) = x(x - 1)(x + 1)$.',
        'Phân tích mẫu: $x^2 + x = x(x + 1)$.',
        'Nhân tử chung là $x(x + 1)$. Chia cả tử và mẫu cho $x(x + 1)$: $\\dfrac{x(x - 1)(x + 1)}{x(x + 1)} = \\dfrac{x - 1}{1}$.',
      ],
      answer: '$\\dfrac{x^3 - x}{x^2 + x} = x - 1$.',
    },
    {
      problem: 'Rút gọn phân thức $\\dfrac{x^2 - 4x + 4}{4 - 2x}$.',
      steps: [
        'Tử: $x^2 - 4x + 4 = (x - 2)^2$. Mẫu: $4 - 2x = 2(2 - x) = -2(x - 2)$.',
        'Nhân tử chung là $x - 2$: $\\dfrac{(x - 2)^2}{-2(x - 2)} = \\dfrac{x - 2}{-2}$.',
        'Đổi dấu cả tử và mẫu: $\\dfrac{x - 2}{-2} = \\dfrac{2 - x}{2}$.',
      ],
      answer: '$\\dfrac{2 - x}{2}$.',
    },
    {
      problem: 'Quy đồng mẫu thức hai phân thức $\\dfrac{1}{x^2 - 4}$ và $\\dfrac{3}{2x + 4}$.',
      steps: [
        'Phân tích các mẫu: $x^2 - 4 = (x - 2)(x + 2)$; $2x + 4 = 2(x + 2)$.',
        'MTC $= 2(x - 2)(x + 2)$.',
        'Nhân tử phụ: của $x^2 - 4$ là $2$; của $2x + 4$ là $x - 2$.',
        '$\\dfrac{1}{x^2 - 4} = \\dfrac{1 \\cdot 2}{(x - 2)(x + 2) \\cdot 2} = \\dfrac{2}{2(x - 2)(x + 2)}$; $\\dfrac{3}{2x + 4} = \\dfrac{3(x - 2)}{2(x + 2)(x - 2)}$.',
      ],
      answer:
        '$\\dfrac{2}{2(x - 2)(x + 2)}$ và $\\dfrac{3(x - 2)}{2(x - 2)(x + 2)}$, tức là $\\dfrac{2}{2x^2 - 8}$ và $\\dfrac{3x - 6}{2x^2 - 8}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đa thức nào điền vào chỗ trống để có $\\dfrac{x}{x + 1} = \\dfrac{x^2 - x}{\\ldots}$?',
      options: ['$x^2 - 1$', '$x^2 + 1$', '$x^2 - x$', '$(x + 1)^2$'],
      answer: 0,
      hints: [
        'Tử mới $x^2 - x = x(x - 1)$: tử cũ đã được nhân với $x - 1$.',
        'Nhân mẫu với cùng đa thức đó.',
      ],
      solution:
        'Tử đã nhân với $x - 1$, nên mẫu cũng nhân với $x - 1$: $(x + 1)(x - 1) = x^2 - 1$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn phân thức $\\dfrac{6x^2y}{9xy^3}$ được',
      options: [
        '$\\dfrac{2x}{3y^2}$',
        '$\\dfrac{2x}{3y}$',
        '$\\dfrac{3x}{2y^2}$',
        '$\\dfrac{2}{3y^2}$',
      ],
      answer: 0,
      hints: ['Nhân tử chung của $6x^2y$ và $9xy^3$ là $3xy$.'],
      solution:
        'Chia cả tử và mẫu cho $3xy$: $\\dfrac{6x^2y : 3xy}{9xy^3 : 3xy} = \\dfrac{2x}{3y^2}$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn phân thức $\\dfrac{x^2 - 9}{x^2 + 3x}$ được',
      options: [
        '$\\dfrac{x - 3}{x}$',
        '$\\dfrac{x + 3}{x}$',
        '$\\dfrac{x - 3}{x + 3}$',
        '$-\\dfrac{3}{x}$',
      ],
      answer: 0,
      hints: ['Phân tích $x^2 - 9$ và $x^2 + 3x$ thành nhân tử.'],
      solution:
        '$\\dfrac{x^2 - 9}{x^2 + 3x} = \\dfrac{(x - 3)(x + 3)}{x(x + 3)} = \\dfrac{x - 3}{x}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đẳng thức đúng.',
      options: [
        '$\\dfrac{x + 2}{x + 4} = \\dfrac{2}{4}$',
        '$\\dfrac{3x + 6}{x + 2} = 3$',
        '$\\dfrac{x - y}{y - x} = -1$',
        '$\\dfrac{x^2 + 1}{x + 1} = x$',
      ],
      answers: [1, 2],
      hints: [
        'Chỉ được chia tử và mẫu cho một nhân tử chung, không được gạch một hạng tử.',
        '$y - x = -(x - y)$.',
      ],
      solution:
        '$\\dfrac{3x + 6}{x + 2} = \\dfrac{3(x + 2)}{x + 2} = 3$ và $\\dfrac{x - y}{y - x} = \\dfrac{x - y}{-(x - y)} = -1$ là đúng. Hai đẳng thức còn lại sai vì đã gạch hạng tử chứ không phải nhân tử chung: thử $x = 2$ thì $\\dfrac{4}{6} \\ne \\dfrac{2}{4}$ và $\\dfrac{5}{3} \\ne 2$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn phân thức $\\dfrac{x^2 - 4x + 4}{x^2 - 4}$ rồi tính giá trị của nó tại $x = 98$. Viết kết quả dạng số thập phân.',
      answer: 0.96,
      hints: [
        'Tử là $(x - 2)^2$, mẫu là $(x - 2)(x + 2)$.',
        'Phân thức rút gọn là $\\dfrac{x - 2}{x + 2}$; thay $x = 98$.',
      ],
      solution:
        '$\\dfrac{(x - 2)^2}{(x - 2)(x + 2)} = \\dfrac{x - 2}{x + 2}$. Tại $x = 98$ (mẫu ban đầu khác $0$): $\\dfrac{96}{100} = 0{,}96$.',
    },
    {
      type: 'choice',
      prompt:
        'Mẫu thức chung đơn giản nhất của hai phân thức $\\dfrac{1}{6x^2}$ và $\\dfrac{5}{4x^3}$ là',
      options: ['$12x^3$', '$24x^5$', '$24x^3$', '$12x^2$'],
      answer: 0,
      hints: [
        'Phần số: bội chung nhỏ nhất của $6$ và $4$.',
        'Phần biến: lũy thừa của $x$ với số mũ cao nhất.',
      ],
      solution:
        'BCNN$(6, 4) = 12$; lũy thừa cao nhất của $x$ là $x^3$. MTC $= 12x^3$. ($24x^5$ và $24x^3$ cũng chia hết cho hai mẫu nhưng không đơn giản nhất; $12x^2$ không chia hết cho $4x^3$.)',
    },
    {
      type: 'text',
      prompt:
        'Quy đồng $\\dfrac{1}{x - 2}$ và $\\dfrac{3}{x^2 - 4}$ với MTC $= (x - 2)(x + 2)$. Nhân tử phụ của mẫu $x - 2$ là gì?',
      accept: ['x + 2', 'x+2', '(x + 2)', '(x+2)', '2 + x', '2+x'],
      hints: ['Nhân tử phụ = MTC chia cho mẫu thức đó.'],
      solution:
        '$(x - 2)(x + 2) : (x - 2) = x + 2$. Vậy $\\dfrac{1}{x - 2} = \\dfrac{x + 2}{(x - 2)(x + 2)}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân thức $\\dfrac{x - 1}{2 - x}$ bằng phân thức nào?',
      options: [
        '$\\dfrac{1 - x}{x - 2}$',
        '$\\dfrac{x - 1}{x - 2}$',
        '$\\dfrac{1 - x}{2 - x}$',
        '$\\dfrac{x + 1}{x + 2}$',
      ],
      answer: 0,
      hints: ['Đổi dấu cả tử và mẫu: $\\dfrac{A}{B} = \\dfrac{-A}{-B}$.'],
      solution:
        '$-(x - 1) = 1 - x$ và $-(2 - x) = x - 2$, nên $\\dfrac{x - 1}{2 - x} = \\dfrac{1 - x}{x - 2}$. Chỉ đổi dấu một trong hai (tử hoặc mẫu) thì được phân thức đối, không bằng.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn $\\dfrac{x^2 + x}{x^2 - 1}$ được phân thức có dạng $\\dfrac{x}{x - a}$. Tìm số $a$.',
      answer: 1,
      hints: ['$x^2 + x = x(x + 1)$; $x^2 - 1 = (x - 1)(x + 1)$.'],
      solution: '$\\dfrac{x(x + 1)}{(x - 1)(x + 1)} = \\dfrac{x}{x - 1}$, nên $a = 1$.',
    },
  ],
  takeaways: [
    '$\\dfrac{A}{B} = \\dfrac{A \\cdot M}{B \\cdot M}$ ($M$ khác đa thức $0$); $\\dfrac{A}{B} = \\dfrac{A : N}{B : N}$ ($N$ là nhân tử chung).',
    'Quy tắc đổi dấu: $\\dfrac{A}{B} = \\dfrac{-A}{-B}$.',
    'Rút gọn: phân tích tử và mẫu thành nhân tử, rồi chia cả tử và mẫu cho nhân tử chung; chỉ gạch nhân tử, không gạch hạng tử.',
    'Quy đồng: tìm MTC từ các mẫu đã phân tích, tìm nhân tử phụ của mỗi mẫu, nhân cả tử và mẫu với nhân tử phụ.',
  ],
};
