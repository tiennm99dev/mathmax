/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quan hệ chia hết giữa hai số tự nhiên, ước và bội, cách tìm tập hợp ước và bội của một số, và hai tính chất chia hết của một tổng.',
  intro:
    'Có $24$ chiếc bánh, xếp đều vào $6$ hộp thì vừa hết, mỗi hộp $4$ chiếc; xếp vào $5$ hộp thì thừa ra $4$ chiếc. Khi nào phép chia "vừa hết"? Bài này gọi tên quan hệ đó là quan hệ chia hết, rồi dùng nó để nói về ước, bội và về tổng của nhiều số.',
  objectives: [
    'Nhận biết quan hệ chia hết và dùng kí hiệu $a \\vdots b$, $a \\not\\vdots\\, b$.',
    'Hiểu ước và bội; tìm tập hợp $\\text{Ư}(a)$ và các bội trong $\\text{B}(b)$.',
    'Vận dụng tính chất chia hết của một tổng để xét một tổng (hiệu) có chia hết cho một số hay không mà không cần tính.',
  ],
  sections: [
    {
      heading: 'Quan hệ chia hết',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chia hết',
          text: 'Cho hai số tự nhiên $a$ và $b$ ($b \\ne 0$). Nếu có số tự nhiên $k$ sao cho $a = k \\cdot b$ thì ta nói $a$ chia hết cho $b$, kí hiệu $a \\vdots b$. Nếu $a$ không chia hết cho $b$, ta kí hiệu $a \\not\\vdots\\, b$.',
        },
        {
          type: 'p',
          text: 'Nói cách khác, $a \\vdots b$ khi phép chia $a$ cho $b$ có số dư bằng $0$. Ví dụ $24 = 4 \\cdot 6$ nên $24 \\vdots 6$; còn $24 = 4 \\cdot 5 + 4$, dư $4$, nên $24 \\not\\vdots\\, 5$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ước và bội',
          text: 'Nếu $a \\vdots b$ thì ta nói $a$ là một bội của $b$, còn $b$ là một ước của $a$. Tập hợp các ước của $a$ kí hiệu là $\\text{Ư}(a)$, tập hợp các bội của $b$ kí hiệu là $\\text{B}(b)$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $24 \\vdots 6$ nên $24$ là bội của $6$ và $6$ là ước của $24$.',
        },
      ],
    },
    {
      heading: 'Cách tìm ước và bội',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm ước',
          text: 'Để tìm các ước của $a$ ($a > 1$), ta lần lượt chia $a$ cho các số tự nhiên từ $1$ đến $a$ để xem $a$ chia hết cho những số nào; các số đó là ước của $a$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm bội',
          text: 'Để tìm các bội của một số $n$ khác $0$, ta nhân $n$ lần lượt với $0, 1, 2, 3, \\ldots$',
        },
        {
          type: 'table',
          head: ['Số', 'Tập hợp các ước', 'Một số bội đầu tiên'],
          rows: [
            ['$6$', '$\\{1; 2; 3; 6\\}$', '$0; 6; 12; 18; 24; \\ldots$'],
            ['$12$', '$\\{1; 2; 3; 4; 6; 12\\}$', '$0; 12; 24; 36; 48; \\ldots$'],
            ['$7$', '$\\{1; 7\\}$', '$0; 7; 14; 21; 28; \\ldots$'],
          ],
          caption: 'Ước và bội của một vài số.',
        },
        {
          type: 'list',
          items: [
            'Số $1$ là ước của mọi số tự nhiên; mỗi số $a \\ne 0$ là ước của chính nó.',
            'Số $0$ là bội của mọi số tự nhiên khác $0$.',
            'Một số $a \\ne 0$ chỉ có hữu hạn ước, nhưng có vô số bội.',
          ],
        },
      ],
    },
    {
      heading: 'Tính chất chia hết của một tổng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 1',
          text: 'Nếu tất cả các số hạng của một tổng đều chia hết cho cùng một số thì tổng chia hết cho số đó: $a \\vdots m$ và $b \\vdots m$ $\\Rightarrow$ $(a + b) \\vdots m$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 2',
          text: 'Nếu trong một tổng chỉ có một số hạng không chia hết cho một số đã cho, còn các số hạng khác đều chia hết cho số đó thì tổng không chia hết cho số đã cho: $a \\not\\vdots\\, m$ và $b \\vdots m$ $\\Rightarrow$ $(a + b) \\not\\vdots\\, m$.',
        },
        {
          type: 'p',
          text: 'Hai tính chất đúng cho tổng có nhiều số hạng và cho cả hiệu (với số bị trừ không nhỏ hơn số trừ). Ví dụ: $70 \\vdots 7$ và $21 \\vdots 7$ nên $(70 - 21) \\vdots 7$; còn $70 \\vdots 7$, $15 \\not\\vdots\\, 7$ nên $(70 + 15) \\not\\vdots\\, 7$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi có từ hai số hạng trở lên không chia hết cho $m$, ta chưa kết luận được gì: $7 + 5 = 12 \\vdots 6$ nhưng $7 + 4 = 11 \\not\\vdots\\, 6$, dù $7, 5, 4$ đều không chia hết cho $6$.',
        },
        { type: 'widget', name: 'tinh-chat-tong' },
      ],
    },
  ],
  explore: {
    title: 'Lưới số 1-100: bội và ước',
    instruction:
      'Chọn số $n$. Các bội của $n$ được tô màu, các ước của $n$ có viền vàng. Chạm vào một ô để xem phép chia của nó cho $n$. Ở chế độ "Tự tìm ước", em tự chạm các ô là ước của $n$ rồi bấm "Kiểm tra".',
  },
  examples: [
    {
      problem: 'Tìm tập hợp $\\text{Ư}(20)$.',
      steps: [
        'Lần lượt chia $20$ cho $1, 2, 3, \\ldots, 20$.',
        '$20$ chia hết cho $1, 2, 4, 5, 10, 20$ và không chia hết cho các số còn lại.',
      ],
      answer: '$\\text{Ư}(20) = \\{1; 2; 4; 5; 10; 20\\}$.',
    },
    {
      problem: 'Viết tập hợp $A$ các bội của $9$ nhỏ hơn $50$.',
      steps: [
        'Nhân $9$ lần lượt với $0, 1, 2, 3, \\ldots$: $0; 9; 18; 27; 36; 45; 54; \\ldots$',
        'Giữ lại các số nhỏ hơn $50$; từ $54$ trở đi đều lớn hơn $50$.',
      ],
      answer: '$A = \\{0; 9; 18; 27; 36; 45\\}$.',
    },
    {
      problem:
        'Không tính, hãy cho biết: a) $15 + 1\\,003$ có chia hết cho $5$ không? b) $72 - 48$ có chia hết cho $8$ không?',
      steps: [
        'a) $15 \\vdots 5$, còn $1\\,003 = 200 \\cdot 5 + 3$ nên $1\\,003 \\not\\vdots\\, 5$. Chỉ một số hạng không chia hết cho $5$, theo tính chất 2, tổng không chia hết cho $5$.',
        'b) $72 = 9 \\cdot 8$ và $48 = 6 \\cdot 8$ nên cả hai số đều chia hết cho $8$. Theo tính chất 1 (áp dụng cho hiệu), $(72 - 48) \\vdots 8$.',
      ],
      answer: 'a) Không chia hết cho $5$. b) Chia hết cho $8$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các ước của $18$.',
      options: ['$1$', '$4$', '$6$', '$9$', '$12$', '$18$', '$36$'],
      answers: [0, 2, 3, 5],
      hints: ['$b$ là ước của $18$ khi $18 \\vdots b$.', 'Thử chia $18$ cho từng số.'],
      solution:
        '$\\text{Ư}(18) = \\{1; 2; 3; 6; 9; 18\\}$. Trong các lựa chọn có $1, 6, 9, 18$. Số $36$ là bội của $18$, không phải ước.',
    },
    {
      type: 'number',
      prompt: 'Số $30$ có bao nhiêu ước?',
      answer: 8,
      hints: [
        'Chia $30$ lần lượt cho $1, 2, 3, \\ldots, 30$.',
        'Các ước đi theo cặp có tích bằng $30$: $1 \\cdot 30$, $2 \\cdot 15$, …',
      ],
      solution:
        'Các cặp $1 \\cdot 30$, $2 \\cdot 15$, $3 \\cdot 10$, $5 \\cdot 6$ cho $\\text{Ư}(30) = \\{1; 2; 3; 5; 6; 10; 15; 30\\}$, gồm $8$ ước.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu bội của $7$ lớn hơn $20$ và nhỏ hơn $60$?',
      answer: 6,
      hints: ['Nhân $7$ lần lượt với $0, 1, 2, \\ldots$', 'Bội đầu tiên lớn hơn $20$ là $21$.'],
      solution: 'Các bội đó là $21; 28; 35; 42; 49; 56$ ($63 > 60$), tất cả có $6$ số.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$ lớn nhất sao cho $x \\in \\text{B}(9)$ và $x < 100$.',
      answer: 99,
      hints: ['Các bội của $9$ là $9 \\cdot k$.', 'Tìm $k$ lớn nhất để $9 \\cdot k < 100$.'],
      solution: '$9 \\cdot 11 = 99 < 100$ còn $9 \\cdot 12 = 108 > 100$, nên $x = 99$.',
    },
    {
      type: 'choice',
      prompt: 'Không tính tổng, cho biết tổng nào chia hết cho $6$.',
      options: ['$24 + 36 + 12$', '$18 + 25$', '$30 + 14$', '$42 + 9$'],
      answer: 0,
      hints: [
        'Xét từng số hạng có chia hết cho $6$ không.',
        'Tổng chia hết cho $6$ khi mọi số hạng đều chia hết cho $6$.',
      ],
      solution:
        '$24, 36, 12$ đều chia hết cho $6$ nên tổng chia hết cho $6$ (tính chất 1). Ba tổng còn lại đều có đúng một số hạng không chia hết cho $6$ ($25$, $14$, $9$) nên không chia hết cho $6$ (tính chất 2).',
    },
    {
      type: 'choice',
      prompt: 'Tổng $42 + 70 + 19$ có chia hết cho $7$ không?',
      options: ['Chia hết cho $7$', 'Không chia hết cho $7$', 'Chưa đủ dữ kiện để kết luận'],
      answer: 1,
      hints: ['$42 = 6 \\cdot 7$ và $70 = 10 \\cdot 7$.', 'Còn $19$ thì sao?'],
      solution:
        '$42 \\vdots 7$, $70 \\vdots 7$, còn $19 \\not\\vdots\\, 7$. Chỉ một số hạng không chia hết cho $7$ nên tổng không chia hết cho $7$. Kiểm tra: $131 = 18 \\cdot 7 + 5$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho $A = 15 + 30 + x$ với $x$ là số tự nhiên. Chọn các giá trị của $x$ để $A \\vdots 5$.',
      options: ['$x = 10$', '$x = 12$', '$x = 25$', '$x = 33$', '$x = 40$'],
      answers: [0, 2, 4],
      hints: [
        '$15$ và $30$ đều chia hết cho $5$.',
        'Theo hai tính chất, $A \\vdots 5$ đúng khi $x \\vdots 5$.',
      ],
      solution:
        'Vì $15 \\vdots 5$ và $30 \\vdots 5$: nếu $x \\vdots 5$ thì $A \\vdots 5$ (tính chất 1), nếu $x \\not\\vdots\\, 5$ thì $A \\not\\vdots\\, 5$ (tính chất 2). Vậy chọn $x = 10, 25, 40$.',
    },
    {
      type: 'number',
      prompt:
        'Cô giáo chia $36$ học sinh lớp 6A thành các nhóm có số người bằng nhau, mỗi nhóm có từ $3$ đến $9$ học sinh. Có bao nhiêu cách chia?',
      answer: 4,
      hints: [
        'Số học sinh mỗi nhóm phải là ước của $36$.',
        '$\\text{Ư}(36) = \\{1; 2; 3; 4; 6; 9; 12; 18; 36\\}$.',
      ],
      solution:
        'Các ước của $36$ từ $3$ đến $9$ là $3, 4, 6, 9$. Vậy có $4$ cách chia: nhóm $3$ em ($12$ nhóm), $4$ em ($9$ nhóm), $6$ em ($6$ nhóm), $9$ em ($4$ nhóm).',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        'Số $0$ là bội của mọi số tự nhiên khác $0$.',
        'Số $1$ là bội của mọi số tự nhiên.',
        'Mọi số tự nhiên khác $0$ đều có ít nhất hai ước.',
        'Số $0$ là ước của mọi số tự nhiên.',
      ],
      answer: 0,
      hints: ['$0 = 0 \\cdot b$ với mọi $b$.', 'Số $1$ có bao nhiêu ước?'],
      solution:
        '$0 = 0 \\cdot b$ nên $0 \\vdots b$ với mọi $b \\ne 0$: khẳng định đầu đúng. Số $1$ chỉ là bội của $1$; số $1$ chỉ có một ước là $1$; không có phép chia cho $0$ nên $0$ không là ước của số nào.',
    },
  ],
  takeaways: [
    '$a \\vdots b$ ($b \\ne 0$) khi $a = k \\cdot b$ với $k$ là số tự nhiên; khi đó $a$ là bội của $b$ và $b$ là ước của $a$.',
    'Tìm $\\text{Ư}(a)$: chia $a$ cho $1, 2, \\ldots, a$. Tìm bội của $n$: nhân $n$ với $0, 1, 2, \\ldots$',
    'Mọi số hạng chia hết cho $m$ thì tổng chia hết cho $m$.',
    'Chỉ một số hạng không chia hết cho $m$ thì tổng không chia hết cho $m$.',
  ],
};
