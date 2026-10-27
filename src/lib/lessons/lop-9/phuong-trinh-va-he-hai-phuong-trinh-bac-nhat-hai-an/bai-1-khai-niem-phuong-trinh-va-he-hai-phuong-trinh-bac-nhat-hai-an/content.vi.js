/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình bậc nhất hai ẩn ax + by = c, nghiệm và tập nghiệm biểu diễn bởi một đường thẳng; hệ hai phương trình bậc nhất hai ẩn và nghiệm của hệ.',
  intro:
    'Bài toán cổ: "Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn. Hỏi có bao nhiêu gà, bao nhiêu chó?" Gọi $x$ là số gà, $y$ là số chó, ta được hai hệ thức $x + y = 36$ và $2x + 4y = 100$. Mỗi hệ thức là một phương trình bậc nhất hai ẩn; ghép chúng lại ta được một hệ phương trình. Bài này giải thích các khái niệm đó và cách nhìn nghiệm trên mặt phẳng toạ độ.',
  objectives: [
    'Nhận biết phương trình bậc nhất hai ẩn và kiểm tra một cặp số có là nghiệm của nó không.',
    'Viết nghiệm tổng quát và biểu diễn tập nghiệm của phương trình bậc nhất hai ẩn bằng một đường thẳng.',
    'Nhận biết hệ hai phương trình bậc nhất hai ẩn và kiểm tra một cặp số có là nghiệm của hệ không.',
  ],
  sections: [
    {
      heading: 'Phương trình bậc nhất hai ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Phương trình bậc nhất hai ẩn $x$ và $y$ là hệ thức dạng $ax + by = c$, trong đó $a$, $b$, $c$ là các số đã biết ($a \\ne 0$ hoặc $b \\ne 0$).',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $2x + 3y = 4$, $0x + 2y = 3$, $x + 0y = 2$ đều là phương trình bậc nhất hai ẩn. Các hệ thức $x^2 + y = 1$ hay $xy - y = 3$ thì không phải, vì chúng chứa $x^2$ và $xy$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nghiệm',
          text: 'Nếu tại $x = x_0$ và $y = y_0$ ta có $ax_0 + by_0 = c$ là một khẳng định đúng thì cặp số $(x_0; y_0)$ được gọi là một nghiệm của phương trình $ax + by = c$.',
        },
        {
          type: 'p',
          text: 'Ví dụ, $(-1; 2)$ là một nghiệm của $2x + 3y = 4$ vì $2 \\cdot (-1) + 3 \\cdot 2 = 4$; còn $(1; 2)$ không là nghiệm vì $2 \\cdot 1 + 3 \\cdot 2 = 8 \\ne 4$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phương trình bậc nhất hai ẩn luôn có vô số nghiệm: chọn $x$ tuỳ ý rồi tính $y$ (khi $b \\ne 0$). Chẳng hạn $2x - y = 1$ cho $y = 2x - 1$, nên các nghiệm của nó là $(x; 2x - 1)$ với $x \\in \\mathbb{R}$ tuỳ ý.',
        },
      ],
    },
    {
      heading: 'Biểu diễn tập nghiệm trên mặt phẳng toạ độ',
      blocks: [
        {
          type: 'p',
          text: 'Trong mặt phẳng toạ độ $Oxy$, mỗi nghiệm $(x_0; y_0)$ được biểu diễn bởi điểm có toạ độ $(x_0; y_0)$. Tất cả các điểm biểu diễn nghiệm tạo thành một đường thẳng, gọi là đường thẳng $ax + by = c$.',
        },
        {
          type: 'table',
          head: ['Trường hợp', 'Viết lại', 'Tập nghiệm là'],
          rows: [
            [
              '$a \\ne 0$, $b \\ne 0$',
              '$y = -\\dfrac{a}{b}x + \\dfrac{c}{b}$',
              'đường thẳng $y = -\\dfrac{a}{b}x + \\dfrac{c}{b}$',
            ],
            [
              '$a = 0$, $b \\ne 0$',
              '$y = \\dfrac{c}{b}$',
              'đường thẳng song song với $Ox$ (trùng $Ox$ khi $c = 0$)',
            ],
            [
              '$a \\ne 0$, $b = 0$',
              '$x = \\dfrac{c}{a}$',
              'đường thẳng song song với $Oy$ (trùng $Oy$ khi $c = 0$)',
            ],
          ],
          caption: 'Ba trường hợp của phương trình $ax + by = c$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Để vẽ đường thẳng $ax + by = c$, chỉ cần tìm hai nghiệm của phương trình, biểu diễn chúng thành hai điểm rồi kẻ đường thẳng đi qua hai điểm đó.',
        },
      ],
    },
    {
      heading: 'Hệ hai phương trình bậc nhất hai ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Hệ hai phương trình bậc nhất hai ẩn có dạng $$\\begin{cases} ax + by = c \\\\ a'x + b'y = c' \\end{cases}$$ trong đó mỗi phương trình $ax + by = c$ và $a'x + b'y = c'$ là một phương trình bậc nhất hai ẩn.",
        },
        {
          type: 'p',
          text: 'Mỗi cặp số $(x_0; y_0)$ là nghiệm của cả hai phương trình được gọi là một nghiệm của hệ. Giải hệ phương trình là tìm tất cả các nghiệm (tìm tập nghiệm) của nó.',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} 2x - y = 0 \\\\ x + y = 3 \\end{cases} \\quad \\text{có nghiệm } (1; 2) \\text{ vì } 2 \\cdot 1 - 2 = 0 \\text{ và } 1 + 2 = 3',
        },
        {
          type: 'callout',
          tone: 'note',
          text: "Trên mặt phẳng toạ độ, nghiệm của hệ được biểu diễn bởi điểm chung của hai đường thẳng $ax + by = c$ và $a'x + b'y = c'$. Một điểm chỉ nằm trên một trong hai đường thẳng thì chưa phải là nghiệm của hệ.",
        },
      ],
    },
  ],
  explore: {
    title: 'Săn nghiệm trên lưới toạ độ',
    instruction:
      'Ở chế độ "Một phương trình", kéo điểm M (hoặc dùng phím mũi tên) tới các nút lưới, đọc phép thay số và bấm "Ghi lại điểm M". Tìm đủ ba nghiệm rồi vẽ tập nghiệm: các chấm xanh nằm trên một đường thẳng. Sang chế độ "Hệ hai phương trình", tìm điểm thoả mãn cả hai phương trình.',
  },
  examples: [
    {
      problem:
        'Trong các cặp số $(-1; 2)$, $(1; 2)$ và $(2; 0)$, cặp số nào là nghiệm của phương trình $2x + 3y = 4$?',
      steps: [
        'Thay $(-1; 2)$: $2 \\cdot (-1) + 3 \\cdot 2 = 4$, đúng.',
        'Thay $(1; 2)$: $2 \\cdot 1 + 3 \\cdot 2 = 8 \\ne 4$, sai.',
        'Thay $(2; 0)$: $2 \\cdot 2 + 3 \\cdot 0 = 4$, đúng.',
      ],
      answer: 'Các cặp số $(-1; 2)$ và $(2; 0)$ là nghiệm; $(1; 2)$ không là nghiệm.',
    },
    {
      problem: 'Viết nghiệm tổng quát và biểu diễn tập nghiệm của phương trình $2x - y = 1$.',
      steps: [
        'Biểu diễn $y$ theo $x$: $y = 2x - 1$.',
        'Mỗi giá trị của $x$ cho một nghiệm $(x; 2x - 1)$, với $x \\in \\mathbb{R}$ tuỳ ý.',
        'Lấy $x = 0$ được điểm $(0; -1)$; lấy $x = 1$ được điểm $(1; 1)$.',
        'Tập nghiệm là đường thẳng đi qua hai điểm $(0; -1)$ và $(1; 1)$, tức đường thẳng $y = 2x - 1$.',
      ],
      answer:
        'Nghiệm tổng quát $(x; 2x - 1)$, $x \\in \\mathbb{R}$; tập nghiệm là đường thẳng $y = 2x - 1$.',
    },
    {
      problem: 'Biểu diễn tập nghiệm của phương trình $0x + 2y = 6$.',
      steps: [
        'Với mọi $x$, phương trình cho $2y = 6$, tức $y = 3$.',
        'Nghiệm tổng quát là $(x; 3)$ với $x \\in \\mathbb{R}$ tuỳ ý.',
        'Các điểm $(x; 3)$ nằm trên đường thẳng $y = 3$, song song với trục $Ox$ và cắt trục $Oy$ tại điểm $(0; 3)$.',
      ],
      answer: 'Tập nghiệm là đường thẳng $y = 3$, song song với trục $Ox$.',
    },
    {
      problem:
        'Kiểm tra xem mỗi cặp số $(1; 2)$ và $(2; 1)$ có là nghiệm của hệ $\\begin{cases} 2x - y = 0 \\\\ x + y = 3 \\end{cases}$ không.',
      steps: [
        '$(1; 2)$: $2 \\cdot 1 - 2 = 0$ và $1 + 2 = 3$, thoả mãn cả hai phương trình.',
        '$(2; 1)$: $1 + 2 = 3$ đúng nhưng $2 \\cdot 2 - 1 = 3 \\ne 0$, không thoả mãn phương trình thứ nhất.',
      ],
      answer: '$(1; 2)$ là nghiệm của hệ; $(2; 1)$ không là nghiệm của hệ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hệ thức nào là phương trình bậc nhất hai ẩn?',
      options: ['$x^2 + y = 3$', '$2x - 5y = 1$', '$xy + x = 2$', '$\\dfrac{1}{x} + y = 4$'],
      answer: 1,
      hints: [
        'Phương trình bậc nhất hai ẩn có dạng $ax + by = c$: không có $x^2$, $xy$ hay ẩn ở mẫu.',
      ],
      solution:
        '$2x - 5y = 1$ có dạng $ax + by = c$ với $a = 2$, $b = -5$, $c = 1$. Các hệ thức còn lại chứa $x^2$, $xy$ hoặc $\\dfrac{1}{x}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cặp số là nghiệm của phương trình $x - 2y = 3$.',
      options: ['$(3; 0)$', '$(1; 1)$', '$(1; -1)$', '$(0; 1{,}5)$', '$(5; 1)$'],
      answers: [0, 2, 4],
      hints: ['Thay từng cặp số vào vế trái $x - 2y$ và so sánh với $3$.'],
      solution:
        '$3 - 0 = 3$ đúng; $1 - 2 = -1$ sai; $1 - 2 \\cdot (-1) = 3$ đúng; $0 - 2 \\cdot 1{,}5 = -3$ sai; $5 - 2 = 3$ đúng. Các nghiệm là $(3; 0)$, $(1; -1)$, $(5; 1)$.',
    },
    {
      type: 'number',
      prompt: 'Cặp số $(x; 4)$ là một nghiệm của phương trình $3x - 2y = 1$. Tìm $x$.',
      answer: 3,
      hints: ['Thay $y = 4$ vào phương trình.', 'Được $3x - 8 = 1$.'],
      solution: 'Thay $y = 4$: $3x - 8 = 1$, nên $3x = 9$ và $x = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để cặp số $(2; -1)$ là một nghiệm của phương trình $mx + 3y = 5$.',
      answer: 4,
      hints: ['Thay $x = 2$, $y = -1$ vào phương trình rồi giải phương trình ẩn $m$.'],
      solution: 'Thay vào: $2m + 3 \\cdot (-1) = 5$, tức $2m = 8$, nên $m = 4$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của phương trình $0x + 3y = -6$ được biểu diễn bởi',
      options: [
        'đường thẳng $y = -2$, song song với trục $Ox$',
        'đường thẳng $x = -2$, song song với trục $Oy$',
        'đường thẳng $y = -2x$ đi qua gốc toạ độ',
        'chỉ một điểm $(0; -2)$',
      ],
      answer: 0,
      hints: ['Với mọi $x$, phương trình cho $3y = -6$.'],
      solution:
        'Với mọi $x$ ta có $y = -2$, nên các nghiệm là $(x; -2)$, $x \\in \\mathbb{R}$. Chúng nằm trên đường thẳng $y = -2$, song song với trục $Ox$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng biểu diễn tập nghiệm của phương trình $2x + 5y = 10$ cắt trục $Ox$ tại điểm có hoành độ bằng bao nhiêu?',
      answer: 5,
      hints: ['Mọi điểm trên trục $Ox$ có tung độ $y = 0$.'],
      solution: 'Thay $y = 0$: $2x = 10$, nên $x = 5$. Đường thẳng cắt $Ox$ tại $(5; 0)$.',
    },
    {
      type: 'text',
      prompt:
        'Viết nghiệm tổng quát của phương trình $x + y = 3$ dưới dạng $(x; \\ldots)$: biểu diễn $y$ theo $x$, em được $y = \\ldots$',
      accept: ['3 - x', '3-x', '-x + 3', '-x+3', '3 − x', '3−x', '−x + 3', '−x+3'],
      hints: ['Chuyển $x$ sang vế phải.'],
      solution: '$y = 3 - x$, nên các nghiệm là $(x; 3 - x)$ với $x \\in \\mathbb{R}$ tuỳ ý.',
    },
    {
      type: 'choice',
      prompt:
        'Cặp số nào là nghiệm của hệ $\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}$?',
      options: ['$(3; 2)$', '$(2; 3)$', '$(1; 4)$', '$(1; 1)$'],
      answer: 1,
      hints: [
        'Nghiệm của hệ phải thoả mãn cả hai phương trình.',
        'Loại các cặp số làm sai phương trình thứ hai.',
      ],
      solution:
        '$(3; 2)$: $6 - 2 = 4 \\ne 1$; $(1; 4)$: $2 - 4 = -2 \\ne 1$; $(1; 1)$: $1 + 1 = 2 \\ne 5$. Chỉ $(2; 3)$ thoả mãn cả hai: $2 + 3 = 5$ và $4 - 3 = 1$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong bài toán cổ, gọi $x$ là số gà và $y$ là số chó, ta có hệ $\\begin{cases} x + y = 36 \\\\ 2x + 4y = 100 \\end{cases}$. Cặp số nào là nghiệm của hệ?',
      options: ['$(20; 16)$', '$(14; 22)$', '$(22; 14)$', '$(18; 18)$'],
      answer: 2,
      hints: ['Cả bốn cặp đều có tổng bằng $36$; hãy kiểm tra phương trình về số chân.'],
      solution:
        '$2 \\cdot 22 + 4 \\cdot 14 = 44 + 56 = 100$, đúng. Các cặp khác cho $104$, $116$, $108$. Vậy có $22$ con gà và $14$ con chó.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phương trình với đường thẳng biểu diễn tập nghiệm của nó.',
      left: ['$0x + y = 2$', '$x + 0y = -1$', '$x - y = 0$'],
      right: ['song song với trục $Ox$', 'song song với trục $Oy$', 'đi qua gốc toạ độ $O$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['$a = 0$ cho $y$ không đổi; $b = 0$ cho $x$ không đổi.'],
      solution:
        '$0x + y = 2$ là đường thẳng $y = 2$, song song với $Ox$; $x + 0y = -1$ là đường thẳng $x = -1$, song song với $Oy$; $x - y = 0$ là đường thẳng $y = x$, đi qua $O(0; 0)$.',
    },
  ],
  takeaways: [
    'Phương trình bậc nhất hai ẩn: $ax + by = c$ với $a \\ne 0$ hoặc $b \\ne 0$; nó có vô số nghiệm.',
    'Cặp số $(x_0; y_0)$ là nghiệm khi $ax_0 + by_0 = c$ đúng.',
    'Tập nghiệm của $ax + by = c$ được biểu diễn bởi một đường thẳng; khi $a = 0$ nó song song (hoặc trùng) với $Ox$, khi $b = 0$ nó song song (hoặc trùng) với $Oy$.',
    'Nghiệm của hệ hai phương trình là cặp số thoả mãn đồng thời cả hai phương trình, ứng với điểm chung của hai đường thẳng.',
  ],
};
