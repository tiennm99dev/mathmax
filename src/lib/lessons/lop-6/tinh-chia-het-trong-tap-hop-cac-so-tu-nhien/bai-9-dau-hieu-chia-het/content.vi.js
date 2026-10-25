/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dấu hiệu chia hết cho 2, cho 5 dựa vào chữ số tận cùng, dấu hiệu chia hết cho 3, cho 9 dựa vào tổng các chữ số, và cách vận dụng để tìm chữ số chưa biết.',
  intro:
    'Không cần đặt phép chia, chỉ nhìn các chữ số, em vẫn biết $2\\,025$ chia hết cho $5$, cho $3$ và cho $9$, nhưng không chia hết cho $2$. Bài này giải thích vì sao và cho em bốn dấu hiệu chia hết dùng suốt cả năm học.',
  objectives: [
    'Nhận biết một số chia hết cho $2$, cho $5$ qua chữ số tận cùng.',
    'Nhận biết một số chia hết cho $3$, cho $9$ qua tổng các chữ số.',
    'Vận dụng các dấu hiệu để tìm chữ số chưa biết và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Dấu hiệu chia hết cho 2, cho 5',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi số tự nhiên đều viết được thành $10 \\cdot a + c$, trong đó $c$ là chữ số tận cùng. Ví dụ $2\\,346 = 10 \\cdot 234 + 6$. Vì $10 \\cdot a$ luôn chia hết cho $2$ và cho $5$, theo tính chất chia hết của một tổng, số đó chia hết cho $2$ (cho $5$) khi và chỉ khi $c$ chia hết cho $2$ (cho $5$).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dấu hiệu chia hết cho 2',
          text: 'Các số có chữ số tận cùng là $0, 2, 4, 6, 8$ thì chia hết cho $2$ và chỉ những số đó mới chia hết cho $2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dấu hiệu chia hết cho 5',
          text: 'Các số có chữ số tận cùng là $0$ hoặc $5$ thì chia hết cho $5$ và chỉ những số đó mới chia hết cho $5$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số có chữ số tận cùng là $0$ thì chia hết cho cả $2$ và $5$.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu chia hết cho 9, cho 3',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi số đều bằng tổng các chữ số của nó cộng với một số chia hết cho $9$. Ví dụ:',
        },
        {
          type: 'tex',
          tex: '378 = 3 \\cdot 100 + 7 \\cdot 10 + 8 = (3 + 7 + 8) + (3 \\cdot 99 + 7 \\cdot 9)',
        },
        {
          type: 'p',
          text: 'Phần $3 \\cdot 99 + 7 \\cdot 9$ chia hết cho $9$ (và cho $3$). Do đó $378$ chia hết cho $9$ (cho $3$) khi và chỉ khi tổng các chữ số $3 + 7 + 8 = 18$ chia hết cho $9$ (cho $3$).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dấu hiệu chia hết cho 9',
          text: 'Các số có tổng các chữ số chia hết cho $9$ thì chia hết cho $9$ và chỉ những số đó mới chia hết cho $9$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dấu hiệu chia hết cho 3',
          text: 'Các số có tổng các chữ số chia hết cho $3$ thì chia hết cho $3$ và chỉ những số đó mới chia hết cho $3$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số chia hết cho $9$ thì chia hết cho $3$, nhưng số chia hết cho $3$ chưa chắc chia hết cho $9$: $12 \\vdots 3$ nhưng $12 \\not\\vdots\\, 9$.',
        },
      ],
    },
    {
      heading: 'Vận dụng: tìm chữ số chưa biết',
      blocks: [
        {
          type: 'p',
          text: 'Khi một chữ số bị che bởi dấu $*$, ta dùng dấu hiệu để tìm nó: điều kiện chia hết cho $2$ hoặc $5$ ràng buộc chữ số tận cùng, điều kiện chia hết cho $3$ hoặc $9$ ràng buộc tổng các chữ số.',
        },
        {
          type: 'table',
          head: ['Chia hết cho', 'Nhìn vào', 'Điều kiện'],
          rows: [
            ['$2$', 'chữ số tận cùng', '$0, 2, 4, 6, 8$'],
            ['$5$', 'chữ số tận cùng', '$0$ hoặc $5$'],
            ['$3$', 'tổng các chữ số', 'chia hết cho $3$'],
            ['$9$', 'tổng các chữ số', 'chia hết cho $9$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Trò chơi phân loại số rơi',
    instruction:
      'Một số rơi từ trên xuống. Trước khi nó chạm đất, hãy chọn mọi giỏ $2, 3, 5, 9$ mà số đó chia hết (có thể chọn nhiều giỏ hoặc không giỏ nào) rồi bấm "Thả vào giỏ". Em có thể chọn "Không tính giờ" để làm thong thả.',
  },
  examples: [
    {
      problem:
        'Trong các số $2\\,020$; $1\\,335$; $4\\,567$, số nào chia hết cho $2$? Số nào chia hết cho $5$?',
      steps: [
        '$2\\,020$ có chữ số tận cùng là $0$ nên chia hết cho cả $2$ và $5$.',
        '$1\\,335$ có chữ số tận cùng là $5$ nên chia hết cho $5$, không chia hết cho $2$.',
        '$4\\,567$ có chữ số tận cùng là $7$ nên không chia hết cho $2$, cũng không chia hết cho $5$.',
      ],
      answer: 'Chia hết cho $2$: $2\\,020$. Chia hết cho $5$: $2\\,020$ và $1\\,335$.',
    },
    {
      problem:
        'Các số $2\\,457$ và $1\\,245$ có chia hết cho $3$ không? Có chia hết cho $9$ không?',
      steps: [
        '$2 + 4 + 5 + 7 = 18$, chia hết cho $9$ nên $2\\,457$ chia hết cho $9$ và cho $3$.',
        '$1 + 2 + 4 + 5 = 12$, chia hết cho $3$ nhưng không chia hết cho $9$.',
      ],
      answer:
        '$2\\,457$ chia hết cho cả $3$ và $9$; $1\\,245$ chia hết cho $3$ nhưng không chia hết cho $9$.',
    },
    {
      problem: 'Thay dấu $*$ bởi một chữ số để số $\\overline{3*5}$ chia hết cho $9$.',
      steps: [
        'Tổng các chữ số là $3 + * + 5 = 8 + *$.',
        'Cần $8 + *$ chia hết cho $9$, với $*$ là chữ số từ $0$ đến $9$, nên $8 + * = 9$.',
        'Suy ra $* = 1$. Kiểm tra: $315 = 9 \\cdot 35$.',
      ],
      answer: '$* = 1$, ta được số $315$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn các số chia hết cho $2$.',
      options: ['$1\\,236$', '$2\\,745$', '$5\\,670$', '$9\\,001$', '$3\\,408$'],
      answers: [0, 2, 4],
      hints: ['Chỉ cần nhìn chữ số tận cùng.', 'Chữ số tận cùng phải là $0, 2, 4, 6$ hoặc $8$.'],
      solution:
        '$1\\,236$, $5\\,670$, $3\\,408$ tận cùng bằng $6, 0, 8$ nên chia hết cho $2$; $2\\,745$ và $9\\,001$ tận cùng bằng $5$ và $1$ nên không chia hết cho $2$.',
    },
    {
      type: 'choice',
      prompt: 'Số nào chia hết cho cả $2$ và $5$?',
      options: ['$2\\,745$', '$1\\,236$', '$5\\,670$', '$3\\,408$'],
      answer: 2,
      hints: ['Số chia hết cho cả $2$ và $5$ có chữ số tận cùng là gì?'],
      solution: 'Số chia hết cho cả $2$ và $5$ phải tận cùng bằng $0$. Chỉ có $5\\,670$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các số chia hết cho $9$.',
      options: ['$123$', '$459$', '$2\\,019$', '$3\\,105$', '$5\\,554$'],
      answers: [1, 3],
      hints: ['Tính tổng các chữ số của từng số.', 'Tổng các chữ số phải chia hết cho $9$.'],
      solution:
        'Tổng các chữ số: $123 \\to 6$, $459 \\to 18$, $2\\,019 \\to 12$, $3\\,105 \\to 9$, $5\\,554 \\to 19$. Chỉ $18$ và $9$ chia hết cho $9$, nên chọn $459$ và $3\\,105$.',
    },
    {
      type: 'choice',
      prompt: 'Số nào chia hết cho $3$ nhưng không chia hết cho $9$?',
      options: ['$72$', '$111$', '$405$', '$100$'],
      answer: 1,
      hints: ['Tổng các chữ số chia hết cho $3$ nhưng không chia hết cho $9$.'],
      solution:
        'Tổng các chữ số: $72 \\to 9$, $111 \\to 3$, $405 \\to 9$, $100 \\to 1$. Chỉ $111$ có tổng chia hết cho $3$ mà không chia hết cho $9$.',
    },
    {
      type: 'number',
      prompt:
        'Thay $*$ bởi chữ số thích hợp để số $\\overline{37*}$ chia hết cho $9$. Chữ số đó là bao nhiêu?',
      answer: 8,
      hints: [
        'Tổng các chữ số là $3 + 7 + * = 10 + *$.',
        '$10 + *$ phải là bội của $9$ và $* \\le 9$.',
      ],
      solution:
        '$10 + * \\vdots 9$ với $0 \\le * \\le 9$ nên $10 + * = 18$, $* = 8$. Ta có $378 = 9 \\cdot 42$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các chữ số có thể thay cho $*$ để $\\overline{25*}$ chia hết cho $3$.',
      options: ['$2$', '$3$', '$5$', '$6$', '$8$', '$9$'],
      answers: [0, 2, 4],
      hints: ['Tổng các chữ số là $7 + *$.', '$7 + *$ có thể bằng $9$, $12$ hoặc $15$.'],
      solution:
        '$7 + * \\in \\{9; 12; 15\\}$ nên $* \\in \\{2; 5; 8\\}$, cho các số $252$, $255$, $258$, đều chia hết cho $3$.',
    },
    {
      type: 'number',
      prompt:
        'Thay $*$ bởi chữ số thích hợp để số $\\overline{4*0}$ chia hết cho cả $2$, $5$ và $9$. Chữ số đó là bao nhiêu?',
      answer: 5,
      hints: [
        'Chữ số tận cùng là $0$ nên số đã chia hết cho $2$ và $5$.',
        'Còn cần $4 + * + 0$ chia hết cho $9$.',
      ],
      solution:
        '$4 + * \\vdots 9$ với $0 \\le * \\le 9$ nên $* = 5$. Số cần tìm là $450 = 9 \\cdot 50$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên nhỏ nhất có ba chữ số chia hết cho cả $3$ và $5$.',
      answer: 105,
      hints: [
        'Số chia hết cho $5$ tận cùng bằng $0$ hoặc $5$.',
        'Thử lần lượt $100, 105, 110, \\ldots$ và xét tổng các chữ số.',
      ],
      solution:
        '$100$ có tổng chữ số $1$, không chia hết cho $3$. $105$ tận cùng bằng $5$ và có tổng chữ số $6 \\vdots 3$. Vậy số cần tìm là $105$.',
    },
    {
      type: 'number',
      prompt:
        'Cô giáo có một số quyển vở nhiều hơn $50$ và ít hơn $70$. Chia đều cho $2$ nhóm, $3$ nhóm hay $5$ nhóm đều vừa hết. Cô có bao nhiêu quyển vở?',
      answer: 60,
      hints: [
        'Số vở chia hết cho $2$ và $5$ nên tận cùng bằng $0$.',
        'Giữa $50$ và $70$ có $60$; xét tổng chữ số để kiểm tra chia hết cho $3$.',
      ],
      solution:
        'Số vở tận cùng bằng $0$ và nằm giữa $50$ và $70$, nên là $60$. Tổng chữ số $6 + 0 = 6 \\vdots 3$. Vậy cô có $60$ quyển vở.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        'Số chia hết cho $3$ thì chia hết cho $9$.',
        'Số chia hết cho $9$ thì chia hết cho $3$.',
        'Số có chữ số tận cùng là $4$ thì chia hết cho $4$.',
        'Số chia hết cho $2$ thì có chữ số tận cùng là $0$.',
      ],
      answer: 1,
      hints: ['Thử phản ví dụ với các số nhỏ như $12$, $14$, $6$.'],
      solution:
        'Vì $9 = 3 \\cdot 3$, số chia hết cho $9$ thì chia hết cho $3$. Các khẳng định khác sai: $12 \\vdots 3$ nhưng $12 \\not\\vdots\\, 9$; $14$ tận cùng là $4$ nhưng $14 \\not\\vdots\\, 4$; $6 \\vdots 2$ nhưng tận cùng là $6$.',
    },
  ],
  takeaways: [
    'Chia hết cho $2$: chữ số tận cùng là $0, 2, 4, 6, 8$. Chia hết cho $5$: chữ số tận cùng là $0$ hoặc $5$.',
    'Chia hết cho $3$ (cho $9$): tổng các chữ số chia hết cho $3$ (cho $9$).',
    'Số chia hết cho $9$ thì chia hết cho $3$; điều ngược lại không đúng.',
    'Tìm chữ số $*$: điều kiện với $2$, $5$ khóa chữ số tận cùng, điều kiện với $3$, $9$ khóa tổng các chữ số.',
  ],
};
