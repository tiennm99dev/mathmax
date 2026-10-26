/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: giá trị và đồ thị của hàm số, hàm số bậc nhất y = ax + b và cách vẽ đồ thị, hệ số góc, hai đường thẳng song song, cắt nhau và các bài toán thực tế dùng hàm số bậc nhất.',
  intro:
    'Ba bài vừa học đi từ khái niệm hàm số (Bài 27) đến hàm số bậc nhất $y = ax + b$ (Bài 28) và hệ số góc của đường thẳng (Bài 29). Bài luyện tập này gom chúng lại: tính giá trị, kiểm tra một điểm có thuộc đồ thị không, tìm tham số $m$ để đồ thị thoả mãn một điều kiện, tìm giao điểm của hai đường thẳng và dùng hàm số bậc nhất để tính tiền taxi hay giá trị còn lại của một chiếc máy.',
  objectives: [
    'Tính giá trị của hàm số và kiểm tra một điểm có thuộc đồ thị hay không.',
    'Vẽ đồ thị hàm số bậc nhất, tìm giao điểm với hai trục toạ độ và giao điểm của hai đường thẳng.',
    'Tìm tham số để đồ thị đi qua một điểm, song song hoặc cắt một đường thẳng cho trước.',
    'Lập và dùng hàm số bậc nhất trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Giá trị của hàm số', '$f(a)$: thay $x = a$ vào công thức $y = f(x)$'],
            ['Điểm thuộc đồ thị', '$M(x_0; y_0)$ thuộc đồ thị của $y = f(x)$ khi $y_0 = f(x_0)$'],
            ['Hàm số bậc nhất', '$y = ax + b$ với $a \\ne 0$'],
            [
              'Đồ thị',
              'Đường thẳng cắt trục tung tại $(0; b)$, cắt trục hoành tại $\\left(-\\dfrac{b}{a}; 0\\right)$',
            ],
            ['Hệ số góc', '$a$; $a > 0$: góc tạo với $Ox$ là góc nhọn, $a < 0$: góc tù'],
            [
              "$d\\colon y = ax + b$, $d'\\colon y = a'x + b'$",
              "$d \\parallel d'$ khi $a = a'$, $b \\ne b'$; $d \\equiv d'$ khi $a = a'$, $b = b'$; $d$ cắt $d'$ khi $a \\ne a'$",
            ],
          ],
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Tìm $m$ để đồ thị đi qua điểm $A(x_0; y_0)$: thay $x = x_0$, $y = y_0$ vào công thức, giải phương trình ẩn $m$, rồi đối chiếu điều kiện $a \\ne 0$.',
            "Tìm giao điểm của hai đường thẳng cắt nhau: giải phương trình $ax + b = a'x + b'$ để được hoành độ, thay vào một trong hai công thức để được tung độ.",
            'Hai đường thẳng cắt nhau tại một điểm trên trục tung: hai hệ số góc khác nhau và hai hệ số tự do bằng nhau.',
            'Bài toán thực tế: đọc ra hàm số $y = ax + b$, rồi tính $y$ khi biết $x$, hoặc giải phương trình để tìm $x$ khi biết $y$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi hệ số $a$ chứa tham số, như $y = (3 - m)x + 2m + 1$, luôn ghi điều kiện để hàm số là bậc nhất ($m \\ne 3$) và kiểm tra giá trị $m$ tìm được trước khi kết luận.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh $12$ câu, bốn câu cho mỗi bài từ Bài 27 đến Bài 29. Đáp số là số nguyên, phân số (gõ dạng $-5/2$) hoặc số thập phân (gõ dấu phẩy, ví dụ $1{,}5$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập hàm số và đồ thị',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào; bấm "Làm bộ đề mới" để luyện thêm.',
  },
  examples: [
    {
      problem:
        'Cho hai hàm số bậc nhất $y = 2x - 1$ và $y = -x + 2$. a) Vẽ đồ thị của hai hàm số trên cùng một mặt phẳng toạ độ. b) Tìm toạ độ giao điểm của hai đồ thị.',
      steps: [
        'a) Đồ thị của $y = 2x - 1$ là đường thẳng đi qua $(0; -1)$ và $\\left(\\dfrac{1}{2}; 0\\right)$.',
        'Đồ thị của $y = -x + 2$ là đường thẳng đi qua $(0; 2)$ và $(2; 0)$.',
        'b) Hai hệ số góc $2 \\ne -1$ nên hai đường thẳng cắt nhau. Hoành độ giao điểm thoả mãn $2x - 1 = -x + 2$, tức là $3x = 3$, $x = 1$.',
        'Thay $x = 1$ vào $y = 2x - 1$: $y = 1$.',
      ],
      answer: 'Hai đồ thị cắt nhau tại điểm $A(1; 1)$.',
    },
    {
      problem:
        'Cho hàm số $y = (3 - m)x + 2m + 1$ với $m \\ne 3$. a) Tìm $m$ để đồ thị của hàm số đi qua điểm $(1; 2)$. b) Tìm $m$ để đồ thị của hàm số cắt đường thẳng $y = x + 1$ tại một điểm trên trục tung.',
      steps: [
        'a) Thay $x = 1$, $y = 2$: $2 = (3 - m) \\cdot 1 + 2m + 1$, tức là $2 = m + 4$, nên $m = -2$ (thoả mãn $m \\ne 3$).',
        'b) Đường thẳng $y = x + 1$ cắt trục tung tại điểm $(0; 1)$. Đồ thị cần đi qua điểm này: $1 = (3 - m) \\cdot 0 + 2m + 1$, nên $m = 0$.',
        'Với $m = 0$, hệ số góc là $3 \\ne 1$, nên hai đường thẳng đúng là cắt nhau (tại $(0; 1)$).',
      ],
      answer: 'a) $m = -2$; b) $m = 0$.',
    },
    {
      problem:
        'Giá cước taxi của một hãng là $T(x) = 10\\,000 + 13\\,600(x - 1)$ (đồng) cho quãng đường $x$ km, với $1 < x \\le 30$. a) Đi $20$ km phải trả bao nhiêu tiền? b) Một khách trả $200\\,400$ đồng. Khách đó đã đi bao nhiêu ki-lô-mét?',
      steps: [
        'a) $T(20) = 10\\,000 + 13\\,600 \\cdot 19 = 10\\,000 + 258\\,400 = 268\\,400$ (đồng).',
        'b) Giải $10\\,000 + 13\\,600(x - 1) = 200\\,400$: $13\\,600(x - 1) = 190\\,400$, nên $x - 1 = 14$, $x = 15$ (thoả mãn $1 < x \\le 30$).',
      ],
      answer: 'a) $268\\,400$ đồng; b) $15$ km.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho hàm số $y = f(x) = -2x^2 + 3$. Tính $f(-1)$.',
      answer: 1,
      hints: ['Thay $x = -1$; nhớ $(-1)^2 = 1$.'],
      solution: '$f(-1) = -2 \\cdot (-1)^2 + 3 = -2 + 3 = 1$.',
    },
    {
      type: 'choice',
      prompt: 'Điểm nào thuộc đồ thị của hàm số $y = -3x + 1$?',
      options: ['$(1; -2)$', '$(0; -1)$', '$(2; 5)$', '$(-1; -2)$'],
      answer: 0,
      hints: ['Thay hoành độ của từng điểm vào công thức rồi so với tung độ.'],
      solution:
        'Với $x = 1$: $y = -3 + 1 = -2$, đúng bằng tung độ. Các điểm khác: $f(0) = 1$, $f(2) = -5$, $f(-1) = 4$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hàm số bậc nhất.',
      options: [
        '$y = 1 - 4x$',
        '$y = 0x + 2$',
        '$y = \\dfrac{x - 1}{2}$',
        '$y = \\dfrac{3}{x}$',
        '$y = -0{,}5x$',
      ],
      answers: [0, 2, 4],
      hints: [
        'Viết lại mỗi hàm số về dạng $y = ax + b$ nếu được, rồi kiểm tra $a \\ne 0$.',
        '$\\dfrac{3}{x}$ có biến ở mẫu, không viết được dạng $ax + b$.',
      ],
      solution:
        '$y = -4x + 1$, $y = \\dfrac{1}{2}x - \\dfrac{1}{2}$ và $y = -0{,}5x$ là hàm số bậc nhất. $y = 0x + 2$ có $a = 0$; $y = \\dfrac{3}{x}$ không có dạng $ax + b$.',
    },
    {
      type: 'fraction',
      prompt:
        'Đồ thị của hàm số $y = 2x + 5$ cắt trục hoành tại điểm có hoành độ bằng bao nhiêu? Nhập dạng phân số.',
      answer: [-5, 2],
      hints: ['Điểm trên trục hoành có tung độ $0$.', 'Giải $2x + 5 = 0$.'],
      solution:
        '$2x + 5 = 0 \\Leftrightarrow x = -\\dfrac{5}{2}$. Giao điểm là $\\left(-\\dfrac{5}{2}; 0\\right)$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hàm số bậc nhất $y = (m + 2)x - 3$ với $m \\ne -2$. Tìm $m$ để đồ thị của hàm số đi qua điểm $A(1; 2)$.',
      answer: 3,
      hints: ['Thay $x = 1$, $y = 2$ vào công thức.', '$2 = (m + 2) - 3$.'],
      solution:
        'Thay toạ độ của $A$: $2 = (m + 2) \\cdot 1 - 3 \\Leftrightarrow m + 2 = 5 \\Leftrightarrow m = 3$ (thoả mãn $m \\ne -2$).',
    },
    {
      type: 'number',
      prompt: 'Đường thẳng $y = ax + b$ có hệ số góc bằng $-2$ và đi qua điểm $(2; 1)$. Tìm $b$.',
      answer: 5,
      hints: ['Hệ số góc $-2$ nghĩa là $a = -2$.', 'Thay $x = 2$, $y = 1$ vào $y = -2x + b$.'],
      solution: '$1 = -2 \\cdot 2 + b \\Leftrightarrow b = 5$. Đường thẳng là $y = -2x + 5$.',
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng nào song song với đường thẳng $y = -3x + 2$?',
      options: ['$y = 3x + 2$', '$y = -3x + 2$', '$y = -3x - 1$', '$y = 2x - 3$'],
      answer: 2,
      hints: [
        'Song song: cùng hệ số góc và khác hệ số tự do.',
        'Cẩn thận với đường thẳng trùng với đường thẳng đã cho.',
      ],
      solution:
        '$y = -3x - 1$ có hệ số góc $-3$ và hệ số tự do $-1 \\ne 2$ nên song song. $y = -3x + 2$ trùng với đường thẳng đã cho; hai đường còn lại có hệ số góc khác $-3$ nên cắt nó.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để đường thẳng $y = (2m - 1)x + 4$ song song với đường thẳng $y = 5x - 1$.',
      answer: 3,
      hints: ['Hệ số tự do $4 \\ne -1$, nên chỉ cần hai hệ số góc bằng nhau.'],
      solution:
        '$2m - 1 = 5 \\Leftrightarrow m = 3$. Khi đó đường thẳng là $y = 5x + 4$, song song với $y = 5x - 1$.',
    },
    {
      type: 'choice',
      prompt: 'Góc tạo bởi đường thẳng $y = -x + 4$ và trục $Ox$ là góc gì?',
      options: ['Góc nhọn', 'Góc tù', 'Góc vuông'],
      answer: 1,
      hints: ['Xem dấu của hệ số góc.'],
      solution: 'Hệ số góc $-1 < 0$ nên góc tạo bởi đường thẳng và trục $Ox$ là góc tù.',
    },
    {
      type: 'number',
      prompt:
        'Hai đường thẳng $y = 2x + 1$ và $y = -x + 7$ cắt nhau tại điểm $A$. Tìm tung độ của $A$.',
      answer: 5,
      hints: [
        'Tìm hoành độ trước: giải $2x + 1 = -x + 7$.',
        'Thay hoành độ vừa tìm vào một trong hai công thức.',
      ],
      solution:
        '$2x + 1 = -x + 7 \\Leftrightarrow 3x = 6 \\Leftrightarrow x = 2$; $y = 2 \\cdot 2 + 1 = 5$. Vậy $A(2; 5)$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hàm số với đặc điểm đồ thị của nó.',
      left: ['$y = 2x + 3$', '$y = -2x + 3$', '$y = 2x - 3$', '$y = -2x - 3$'],
      right: [
        'Cắt trục tung tại $(0; 3)$ và đi lên',
        'Cắt trục tung tại $(0; 3)$ và đi xuống',
        'Cắt trục tung tại $(0; -3)$ và đi lên',
        'Cắt trục tung tại $(0; -3)$ và đi xuống',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hệ số tự do $b$ cho giao điểm $(0; b)$ với trục tung.',
        'Dấu của $a$ cho biết đường thẳng đi lên hay đi xuống.',
      ],
      solution:
        '$b = 3$ hoặc $b = -3$ quyết định giao điểm với trục tung; $a = 2 > 0$ thì đi lên, $a = -2 < 0$ thì đi xuống.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc máy photocopy mua mới giá $18$ triệu đồng. Mỗi năm giá trị của máy giảm đều $6$ triệu đồng, nên sau $x$ năm giá trị còn lại là $V(x) = 18 - 6x$ (triệu đồng), $0 \\le x \\le 3$. Sau bao nhiêu năm giá trị của máy còn $9$ triệu đồng? (Viết dạng số thập phân.)',
      answer: 1.5,
      unit: 'năm',
      hints: ['Giải phương trình $18 - 6x = 9$.'],
      solution:
        '$18 - 6x = 9 \\Leftrightarrow 6x = 9 \\Leftrightarrow x = 1{,}5$ (thoả mãn). Sau $1{,}5$ năm máy còn $9$ triệu đồng.',
    },
  ],
  takeaways: [
    'Điểm $M(x_0; y_0)$ thuộc đồ thị của $y = f(x)$ khi $y_0 = f(x_0)$; điều này cho phương trình để tìm tham số.',
    'Đồ thị của $y = ax + b$ ($a \\ne 0$) là đường thẳng cắt trục tung tại $(0; b)$; vẽ nó bằng hai điểm.',
    "Hai đường thẳng $y = ax + b$ và $y = a'x + b'$: song song khi $a = a'$, $b \\ne b'$; cắt nhau khi $a \\ne a'$, giao điểm tìm từ $ax + b = a'x + b'$.",
    'Bài toán có tham số trong hệ số góc: luôn ghi và kiểm tra điều kiện $a \\ne 0$.',
  ],
};
