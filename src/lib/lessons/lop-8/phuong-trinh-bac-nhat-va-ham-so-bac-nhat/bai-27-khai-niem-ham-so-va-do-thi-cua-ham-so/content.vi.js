/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khái niệm hàm số và giá trị của hàm số, hàm số cho bằng bảng và bằng công thức, mặt phẳng toạ độ, toạ độ của một điểm và đồ thị của hàm số.',
  intro:
    'Một bình nước đang được đun nóng: cứ mỗi phút, nhiệt độ của nước lại có đúng một giá trị. Ta nói nhiệt độ là một hàm số của thời gian. Bài này giới thiệu khái niệm hàm số, cách ghi một điểm bằng hai số trên mặt phẳng toạ độ, và đồ thị: bức tranh của một hàm số.',
  objectives: [
    'Nhận biết khi nào đại lượng $y$ là hàm số của đại lượng $x$; tính giá trị $f(a)$ của hàm số.',
    'Nhận biết mặt phẳng toạ độ, các trục $Ox$, $Oy$ và gốc toạ độ $O$.',
    'Xác định toạ độ của một điểm và biểu diễn một điểm khi biết toạ độ.',
    'Hiểu đồ thị của hàm số là tập hợp các điểm $(x; f(x))$; nhận biết một điểm có thuộc đồ thị hay không.',
  ],
  sections: [
    {
      heading: 'Khái niệm hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số',
          text: 'Nếu đại lượng $y$ phụ thuộc vào đại lượng thay đổi $x$ sao cho với mỗi giá trị của $x$ ta luôn xác định được chỉ một giá trị tương ứng của $y$ thì $y$ được gọi là hàm số của $x$, và $x$ được gọi là biến số.',
        },
        {
          type: 'p',
          text: 'Hàm số có thể được cho bằng bảng hoặc bằng công thức. Khi $y$ là hàm số của $x$, ta viết $y = f(x)$; giá trị của hàm số tại $x = a$ được kí hiệu là $f(a)$. Chẳng hạn với $f(x) = 2x + 1$ thì $f(3) = 2 \\cdot 3 + 1 = 7$.',
        },
        {
          type: 'table',
          head: ['$x$', '$1$', '$2$', '$3$', '$4$'],
          rows: [['$y$', '$5$', '$10$', '$15$', '$20$']],
          caption:
            'Hàm số cho bằng bảng: mỗi giá trị của $x$ ứng với đúng một giá trị của $y$ (ở đây $y = 5x$).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi $x$ thay đổi mà $y$ luôn nhận cùng một giá trị thì $y$ được gọi là hàm hằng, ví dụ $y = 3$. Ngược lại, nếu một giá trị của $x$ ứng với hai giá trị khác nhau của $y$ thì $y$ không phải là hàm số của $x$.',
        },
      ],
    },
    {
      heading: 'Mặt phẳng toạ độ',
      blocks: [
        {
          type: 'p',
          text: 'Trên mặt phẳng, vẽ hai trục số $Ox$ và $Oy$ vuông góc với nhau tại gốc của mỗi trục. Khi đó ta có hệ trục toạ độ $Oxy$; $Ox$ là trục hoành (thường nằm ngang), $Oy$ là trục tung (thẳng đứng), điểm $O$ là gốc toạ độ. Mặt phẳng có hệ trục toạ độ $Oxy$ gọi là mặt phẳng toạ độ $Oxy$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Toạ độ của một điểm',
          text: 'Từ điểm $M$ vẽ các đường vuông góc xuống hai trục, cắt $Ox$ tại điểm biểu diễn số $x_0$ và cắt $Oy$ tại điểm biểu diễn số $y_0$. Cặp số $(x_0; y_0)$ là toạ độ của điểm $M$, viết $M(x_0; y_0)$; $x_0$ là hoành độ, $y_0$ là tung độ của $M$.',
        },
        {
          type: 'list',
          items: [
            'Điểm nằm trên trục hoành có tung độ bằng $0$: $(x_0; 0)$.',
            'Điểm nằm trên trục tung có hoành độ bằng $0$: $(0; y_0)$.',
            'Gốc toạ độ là $O(0; 0)$. Hai trục chia mặt phẳng thành bốn góc phần tư I, II, III, IV (ngược chiều kim đồng hồ, bắt đầu từ góc trên bên phải).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Thứ tự trong cặp toạ độ là quan trọng: hoành độ viết trước, tung độ viết sau. $A(2; 3)$ và $B(3; 2)$ là hai điểm khác nhau.',
        },
      ],
    },
    {
      heading: 'Đồ thị của hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồ thị',
          text: 'Đồ thị của hàm số $y = f(x)$ là tập hợp tất cả các điểm $(x; y)$ trên mặt phẳng toạ độ sao cho $y = f(x)$.',
        },
        {
          type: 'p',
          text: 'Điểm $M(x_0; y_0)$ thuộc đồ thị hàm số $y = f(x)$ khi và chỉ khi $y_0 = f(x_0)$. Nếu hàm số cho bằng bảng gồm vài cặp giá trị thì đồ thị chỉ gồm vài điểm rời nhau; nếu $x$ lấy mọi giá trị thì các điểm nối liền thành một đường.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy hàm số và mặt phẳng toạ độ',
    instruction:
      'Ở "Máy hàm số", chọn một hàm số và một giá trị của x: máy tính y = f(x) và chấm điểm (x; y). Chấm thật nhiều điểm rồi bật "Hiện toàn bộ đồ thị". Ở "Đọc toạ độ", kéo điểm M đến đúng vị trí được yêu cầu.',
  },
  examples: [
    {
      problem: 'Cho hàm số $y = f(x) = 3x - 2$. Tính $f(0)$, $f(-1)$, $f(2)$.',
      steps: [
        '$f(0) = 3 \\cdot 0 - 2 = -2$.',
        '$f(-1) = 3 \\cdot (-1) - 2 = -5$.',
        '$f(2) = 3 \\cdot 2 - 2 = 4$.',
      ],
      answer: '$f(0) = -2$, $f(-1) = -5$, $f(2) = 4$.',
    },
    {
      problem:
        'Đại lượng $y$ cho bởi bảng sau có phải là hàm số của $x$ không? $x$: $1$; $2$; $2$; $3$ và $y$ tương ứng: $4$; $5$; $6$; $7$.',
      steps: [
        'Với $x = 2$ ta có hai giá trị tương ứng của $y$ là $5$ và $6$.',
        'Hàm số đòi hỏi mỗi giá trị của $x$ ứng với chỉ một giá trị của $y$.',
      ],
      answer: '$y$ không phải là hàm số của $x$.',
    },
    {
      problem:
        'Hàm số $y = f(x)$ cho bởi bảng: $x = -2; -1; 0; 1; 2$ và $y = 4; 2; 0; -2; -4$. Vẽ đồ thị của hàm số.',
      steps: [
        'Đồ thị gồm các điểm có toạ độ là các cặp giá trị tương ứng $(x; y)$ trong bảng.',
        'Đó là $A(-2; 4)$, $B(-1; 2)$, $O(0; 0)$, $C(1; -2)$, $D(2; -4)$.',
        'Biểu diễn năm điểm này trên mặt phẳng toạ độ.',
      ],
      answer:
        'Đồ thị là năm điểm $A$, $B$, $O$, $C$, $D$ (chúng cùng nằm trên một đường thẳng đi qua gốc toạ độ).',
    },
    {
      problem: 'Điểm $M(-1; 5)$ và $N(2; 1)$ có thuộc đồ thị hàm số $y = -2x + 3$ không?',
      steps: [
        'Với $x = -1$: $y = -2 \\cdot (-1) + 3 = 5$, bằng tung độ của $M$.',
        'Với $x = 2$: $y = -2 \\cdot 2 + 3 = -1 \\ne 1$.',
      ],
      answer: '$M$ thuộc đồ thị, $N$ không thuộc đồ thị.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho hàm số $f(x) = -3x + 5$. Tính $f(-2)$.',
      answer: 11,
      hints: ['Thay $x = -2$ vào công thức, chú ý dấu.'],
      solution: '$f(-2) = -3 \\cdot (-2) + 5 = 6 + 5 = 11$.',
    },
    {
      type: 'number',
      prompt: 'Cho hàm số $f(x) = x^2 - 2x$. Tính $f(3)$.',
      answer: 3,
      hints: ['$f(3) = 3^2 - 2 \\cdot 3$.'],
      solution: '$f(3) = 9 - 6 = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Bảng nào dưới đây cho $y$ là hàm số của $x$?',
      options: [
        '$x$: $1; 2; 2; 3$ và $y$: $5; 6; 7; 8$',
        '$x$: $1; 2; 3; 4$ và $y$: $5; 5; 5; 5$',
        '$x$: $0; 1; 1; 2$ và $y$: $0; 1; -1; 2$',
      ],
      answer: 1,
      hints: ['Tìm xem có giá trị nào của $x$ ứng với hai giá trị khác nhau của $y$ không.'],
      solution:
        'Ở bảng thứ hai, mỗi $x$ ứng với đúng một $y$ (luôn bằng $5$: đây là hàm hằng). Bảng thứ nhất có $x = 2$ ứng với $6$ và $7$; bảng thứ ba có $x = 1$ ứng với $1$ và $-1$.',
    },
    {
      type: 'number',
      prompt: 'Tung độ của điểm $M(-3; 4)$ là bao nhiêu?',
      answer: 4,
      hints: ['Trong $M(x_0; y_0)$, số viết sau là tung độ.'],
      solution: '$M(-3; 4)$ có hoành độ $-3$ và tung độ $4$.',
    },
    {
      type: 'choice',
      prompt: 'Điểm nào nằm trên trục tung?',
      options: ['$(0; -2)$', '$(-2; 0)$', '$(2; 2)$', '$(-2; -2)$'],
      answer: 0,
      hints: ['Mọi điểm trên trục tung có hoành độ bằng $0$.'],
      solution: '$(0; -2)$ có hoành độ $0$ nên nằm trên trục tung. $(-2; 0)$ nằm trên trục hoành.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi điểm với vị trí của nó trên mặt phẳng toạ độ.',
      left: ['$A(3; 0)$', '$B(0; -5)$', '$C(-1; 2)$', '$D(2; -3)$'],
      right: [
        'Trên trục hoành',
        'Trên trục tung',
        'Góc phần tư II',
        'Góc phần tư IV',
        'Góc phần tư I',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Tung độ $0$: trên trục hoành; hoành độ $0$: trên trục tung.',
        'Góc phần tư II: hoành độ âm, tung độ dương; góc phần tư IV: hoành độ dương, tung độ âm.',
      ],
      solution:
        '$A$ có tung độ $0$ (trục hoành), $B$ có hoành độ $0$ (trục tung), $C$ có $x < 0$, $y > 0$ (góc phần tư II), $D$ có $x > 0$, $y < 0$ (góc phần tư IV).',
    },
    {
      type: 'choice',
      prompt: 'Điểm nào thuộc đồ thị hàm số $y = 2x - 3$?',
      options: ['$(1; -1)$', '$(0; 3)$', '$(2; 2)$', '$(-1; -1)$'],
      answer: 0,
      hints: ['Thay hoành độ vào công thức rồi so sánh với tung độ.'],
      solution:
        'Với $x = 1$: $y = 2 - 3 = -1$, đúng bằng tung độ, nên $(1; -1)$ thuộc đồ thị. Các điểm khác: $f(0) = -3$, $f(2) = 1$, $f(-1) = -5$.',
    },
    {
      type: 'number',
      prompt: 'Cho hàm số $f(x) = 2x + 1$. Tìm $x$ để $f(x) = 9$.',
      answer: 4,
      hints: ['Giải phương trình $2x + 1 = 9$.'],
      solution: '$2x + 1 = 9 \\Leftrightarrow 2x = 8 \\Leftrightarrow x = 4$.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị của hàm số $y = ax$ đi qua điểm $A(2; 6)$. Tìm $a$.',
      answer: 3,
      hints: ['$A$ thuộc đồ thị nên toạ độ của $A$ thoả mãn $y = ax$.'],
      solution: 'Thay $x = 2$, $y = 6$: $6 = 2a$, nên $a = 3$.',
    },
  ],
  takeaways: [
    '$y$ là hàm số của $x$ khi mỗi giá trị của $x$ cho đúng một giá trị của $y$; viết $y = f(x)$, giá trị tại $a$ là $f(a)$.',
    'Mặt phẳng toạ độ $Oxy$: trục hoành $Ox$, trục tung $Oy$, gốc $O$; điểm $M(x_0; y_0)$ có hoành độ $x_0$, tung độ $y_0$.',
    'Đồ thị của $y = f(x)$ là tập hợp các điểm $(x; f(x))$; $M(x_0; y_0)$ thuộc đồ thị khi $y_0 = f(x_0)$.',
  ],
};
