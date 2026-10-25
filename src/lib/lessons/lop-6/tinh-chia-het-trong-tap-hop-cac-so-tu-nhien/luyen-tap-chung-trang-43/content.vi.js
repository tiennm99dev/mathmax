/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố quan hệ chia hết và tính chất chia hết của một tổng, các dấu hiệu chia hết cho 2, 3, 5, 9, số nguyên tố và phân tích ra thừa số nguyên tố.',
  intro:
    'Em đã biết khi nào $a \\vdots b$, đã có bốn dấu hiệu chia hết để kiểm tra nhanh và đã biết tách một số thành tích các thừa số nguyên tố. Bài luyện tập này nối ba công cụ đó lại: tìm ước, bội, tìm chữ số chưa biết và nhận ra số nguyên tố, hợp số.',
  objectives: [
    'Tìm ước, bội của một số; dùng tính chất chia hết của một tổng mà không cần tính tổng.',
    'Vận dụng dấu hiệu chia hết cho $2, 3, 5, 9$ để kiểm tra và tìm chữ số chưa biết.',
    'Nhận biết số nguyên tố, hợp số và phân tích một số ra thừa số nguyên tố.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'list',
          items: [
            '$a \\vdots b$ ($b \\ne 0$) khi có số tự nhiên $k$ để $a = k \\cdot b$; khi đó $a$ là bội của $b$, $b$ là ước của $a$.',
            'Mọi số hạng chia hết cho $m$ thì tổng chia hết cho $m$; chỉ một số hạng không chia hết cho $m$ thì tổng không chia hết cho $m$.',
            'Chia hết cho $2$: tận cùng $0, 2, 4, 6, 8$. Chia hết cho $5$: tận cùng $0$ hoặc $5$. Chia hết cho $3$ (cho $9$): tổng các chữ số chia hết cho $3$ (cho $9$).',
            'Số nguyên tố là số tự nhiên lớn hơn $1$, chỉ có hai ước là $1$ và chính nó. Số tự nhiên lớn hơn $1$ có nhiều hơn hai ước là hợp số. Số $0$ và số $1$ không là số nguyên tố, cũng không là hợp số.',
            'Mọi hợp số đều phân tích được thành tích các thừa số nguyên tố, ví dụ $84 = 2^2 \\cdot 3 \\cdot 7$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 8, Bài 9 và Bài 10.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai, em sẽ thấy lời giải từng bước. Bản đồ kĩ năng tô màu theo từng bài: xanh là vững, vàng là cần luyện thêm, đỏ là cần ôn lại.',
  },
  examples: [
    {
      problem: 'Phân tích $84$ ra thừa số nguyên tố rồi cho biết $84$ có bao nhiêu ước.',
      steps: [
        'Chia liên tiếp cho các số nguyên tố: $84 : 2 = 42$, $42 : 2 = 21$, $21 : 3 = 7$, $7 : 7 = 1$.',
        'Vậy $84 = 2^2 \\cdot 3 \\cdot 7$.',
        'Liệt kê các ước theo cặp có tích bằng $84$: $1 \\cdot 84$, $2 \\cdot 42$, $3 \\cdot 28$, $4 \\cdot 21$, $6 \\cdot 14$, $7 \\cdot 12$.',
      ],
      answer:
        '$84 = 2^2 \\cdot 3 \\cdot 7$; $\\text{Ư}(84) = \\{1; 2; 3; 4; 6; 7; 12; 14; 21; 28; 42; 84\\}$ gồm $12$ ước.',
    },
    {
      problem: 'Tìm các chữ số $a$, $b$ để số $\\overline{a7b}$ chia hết cho cả $2$, $5$ và $9$.',
      steps: [
        'Chia hết cho cả $2$ và $5$ nên chữ số tận cùng $b = 0$.',
        'Chia hết cho $9$ nên $a + 7 + 0$ chia hết cho $9$. Vì $1 \\le a \\le 9$, ta có $a + 7 = 9$, $a = 2$.',
        'Kiểm tra: $270 = 9 \\cdot 30$.',
      ],
      answer: '$a = 2$, $b = 0$; số cần tìm là $270$.',
    },
    {
      problem:
        'Không tính tổng, cho biết $1\\,260 + 3\\,445$ có chia hết cho $5$ không, có chia hết cho $2$ không.',
      steps: [
        '$1\\,260$ tận cùng bằng $0$, $3\\,445$ tận cùng bằng $5$: cả hai đều chia hết cho $5$, nên tổng chia hết cho $5$.',
        '$1\\,260 \\vdots 2$ còn $3\\,445 \\not\\vdots\\, 2$: chỉ một số hạng không chia hết cho $2$, nên tổng không chia hết cho $2$.',
      ],
      answer: 'Tổng chia hết cho $5$ nhưng không chia hết cho $2$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn các số nguyên tố.',
      options: ['$2$', '$9$', '$17$', '$21$', '$29$', '$51$'],
      answers: [0, 2, 4],
      hints: [
        'Số nguyên tố chỉ có hai ước là $1$ và chính nó.',
        'Thử chia cho $3$: $9 = 3 \\cdot 3$, $21 = 3 \\cdot 7$, còn $51$?',
      ],
      solution:
        '$2, 17, 29$ là số nguyên tố. $9 = 3^2$, $21 = 3 \\cdot 7$, $51 = 3 \\cdot 17$ là hợp số (tổng chữ số của $51$ là $6 \\vdots 3$).',
    },
    {
      type: 'choice',
      prompt: 'Kết quả phân tích số $120$ ra thừa số nguyên tố là',
      options: [
        '$2^3 \\cdot 3 \\cdot 5$',
        '$2^2 \\cdot 30$',
        '$2 \\cdot 3 \\cdot 4 \\cdot 5$',
        '$2^3 \\cdot 15$',
      ],
      answer: 0,
      hints: [
        'Mọi thừa số trong kết quả phải là số nguyên tố.',
        '$120 : 2 = 60$, $60 : 2 = 30$, …',
      ],
      solution:
        '$120 = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 5 = 2^3 \\cdot 3 \\cdot 5$. Các cách viết khác còn chứa hợp số $30$, $4$ hoặc $15$.',
    },
    {
      type: 'number',
      prompt: 'Số $45$ có bao nhiêu ước?',
      answer: 6,
      hints: ['Tìm các cặp số có tích bằng $45$.'],
      solution:
        '$45 = 1 \\cdot 45 = 3 \\cdot 15 = 5 \\cdot 9$, nên $\\text{Ư}(45) = \\{1; 3; 5; 9; 15; 45\\}$, gồm $6$ ước.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các số chia hết cho cả $2$ và $9$.',
      options: ['$1\\,236$', '$4\\,518$', '$2\\,970$', '$7\\,551$'],
      answers: [1, 2],
      hints: [
        'Chia hết cho $2$: chữ số tận cùng chẵn.',
        'Chia hết cho $9$: tổng các chữ số chia hết cho $9$.',
      ],
      solution:
        '$1\\,236$ có tổng chữ số $12$, không chia hết cho $9$. $4\\,518$ và $2\\,970$ tận cùng chẵn, tổng chữ số đều là $18$. $7\\,551$ là số lẻ. Vậy chọn $4\\,518$ và $2\\,970$.',
    },
    {
      type: 'number',
      prompt: 'Thay $*$ bởi chữ số thích hợp để số $\\overline{2*4}$ chia hết cho $9$.',
      answer: 3,
      hints: ['Tổng các chữ số là $2 + * + 4 = 6 + *$.'],
      solution:
        '$6 + * \\vdots 9$ với $0 \\le * \\le 9$ nên $* = 3$. Kiểm tra: $234 = 9 \\cdot 26$.',
    },
    {
      type: 'choice',
      prompt: 'Tổng $5 \\cdot 7 \\cdot 11 + 13 \\cdot 17$ là số nguyên tố hay hợp số?',
      options: ['Số nguyên tố', 'Hợp số'],
      answer: 1,
      hints: [
        'Không cần tính: mỗi số hạng là số chẵn hay số lẻ?',
        'Tổng của hai số lẻ là số chẵn.',
      ],
      solution:
        'Hai tích $5 \\cdot 7 \\cdot 11$ và $13 \\cdot 17$ đều là số lẻ nên tổng là số chẵn lớn hơn $2$, chia hết cho $2$. Vậy tổng là hợp số. (Thật vậy, $385 + 221 = 606 = 2 \\cdot 303$.)',
    },
    {
      type: 'multi',
      prompt: 'Chọn các giá trị của $x$ để tổng $36 + 48 + x$ không chia hết cho $6$.',
      options: ['$x = 12$', '$x = 14$', '$x = 16$', '$x = 18$'],
      answers: [1, 2],
      hints: [
        '$36$ và $48$ đều chia hết cho $6$.',
        'Tổng không chia hết cho $6$ khi $x \\not\\vdots\\, 6$.',
      ],
      solution:
        'Vì $36 \\vdots 6$ và $48 \\vdots 6$, tổng chia hết cho $6$ đúng khi $x \\vdots 6$. $12$ và $18$ chia hết cho $6$; $14$ và $16$ thì không. Vậy chọn $x = 14$ và $x = 16$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên tố nhỏ nhất lớn hơn $50$.',
      answer: 53,
      hints: [
        'Bỏ qua các số chẵn và các số tận cùng bằng $5$.',
        'Kiểm tra $51$ và $53$ với các số nguyên tố $3, 5, 7$.',
      ],
      solution:
        '$51 = 3 \\cdot 17$ là hợp số, $52$ chẵn. $53$ không chia hết cho $2, 3, 5, 7$ (và $7^2 = 49 < 53 < 64 = 8^2$), nên $53$ là số nguyên tố.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số tự nhiên từ $1$ đến $50$ chia hết cho cả $2$ và $5$?',
      answer: 5,
      hints: ['Số chia hết cho cả $2$ và $5$ có chữ số tận cùng là $0$.'],
      solution: 'Đó là các số $10; 20; 30; 40; 50$. Có $5$ số.',
    },
    {
      type: 'number',
      prompt:
        'Cần xếp $24$ quyển sách thành các chồng có số quyển bằng nhau, mỗi chồng nhiều hơn $1$ quyển và ít hơn $24$ quyển. Có bao nhiêu cách xếp?',
      answer: 6,
      hints: [
        'Số quyển mỗi chồng là một ước của $24$.',
        '$\\text{Ư}(24) = \\{1; 2; 3; 4; 6; 8; 12; 24\\}$.',
      ],
      solution:
        'Các ước của $24$ lớn hơn $1$ và nhỏ hơn $24$ là $2, 3, 4, 6, 8, 12$. Có $6$ cách xếp.',
    },
    {
      type: 'number',
      prompt: 'Biết $300 = 2^a \\cdot 3 \\cdot 5^b$. Tính $a + b$.',
      answer: 4,
      hints: [
        'Phân tích $300$ ra thừa số nguyên tố.',
        '$300 = 3 \\cdot 100$ và $100 = 2^2 \\cdot 5^2$.',
      ],
      solution: '$300 = 2^2 \\cdot 3 \\cdot 5^2$, nên $a = 2$, $b = 2$ và $a + b = 4$.',
    },
  ],
  takeaways: [
    'Tìm ước bằng cách chia thử hoặc ghép cặp; tìm bội bằng cách nhân với $0, 1, 2, \\ldots$',
    'Tính chất chia hết của một tổng giúp kết luận mà không cần tính tổng.',
    'Dấu hiệu chia hết: $2$ và $5$ nhìn chữ số tận cùng, $3$ và $9$ nhìn tổng các chữ số.',
    'Phân tích ra thừa số nguyên tố: chia liên tiếp cho các số nguyên tố từ nhỏ đến lớn.',
  ],
};
