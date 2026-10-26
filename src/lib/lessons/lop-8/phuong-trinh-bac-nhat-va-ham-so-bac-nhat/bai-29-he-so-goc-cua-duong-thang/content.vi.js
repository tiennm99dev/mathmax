/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ số góc của đường thẳng y = ax + b, góc tạo bởi đường thẳng và trục Ox, điều kiện để hai đường thẳng song song, trùng nhau hoặc cắt nhau.',
  intro:
    'Hai con dốc cùng độ nghiêng thì chạy song song với nhau, dù một con dốc nằm cao hơn. Với đường thẳng $y = ax + b$, độ nghiêng do hệ số $a$ quyết định. Bài này gọi tên hệ số đó là hệ số góc và dùng nó để biết hai đường thẳng song song, trùng nhau hay cắt nhau mà không cần vẽ.',
  objectives: [
    'Nhận biết hệ số góc của đường thẳng $y = ax + b$ $(a \\ne 0)$.',
    'Nhận biết góc tạo bởi đường thẳng và trục $Ox$; liên hệ dấu của $a$ với góc đó.',
    'Nhận biết hai đường thẳng song song, trùng nhau, cắt nhau qua các hệ số.',
    'Tìm tham số để hai đường thẳng song song hoặc cắt nhau; viết phương trình đường thẳng song song với một đường thẳng cho trước.',
  ],
  sections: [
    {
      heading: 'Hệ số góc của đường thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc tạo bởi đường thẳng và trục Ox',
          text: 'Gọi $A$ là giao điểm của đường thẳng $y = ax + b$ $(a \\ne 0)$ với trục $Ox$ và $T$ là một điểm thuộc đường thẳng có tung độ dương. Góc $\\alpha$ tạo bởi tia $Ax$ và tia $AT$ được gọi là góc tạo bởi đường thẳng $y = ax + b$ và trục $Ox$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hệ số góc',
          text: 'Hệ số $a$ trong đường thẳng $y = ax + b$ $(a \\ne 0)$ được gọi là hệ số góc của đường thẳng đó.',
        },
        {
          type: 'list',
          items: [
            'Nếu $a > 0$ thì góc $\\alpha$ là góc nhọn; $a$ càng lớn thì $\\alpha$ càng lớn (nhưng vẫn nhỏ hơn $90^\\circ$).',
            'Nếu $a < 0$ thì góc $\\alpha$ là góc tù.',
            'Các đường thẳng có cùng hệ số góc $a$ thì tạo với trục $Ox$ các góc bằng nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Muốn đọc hệ số góc, hãy viết hàm số về dạng $y = ax + b$ trước: đường thẳng $y = 4 - 3x$ có hệ số góc $-3$, không phải $4$.',
        },
      ],
    },
    {
      heading: 'Hai đường thẳng song song, cắt nhau',
      blocks: [
        {
          type: 'p',
          text: "Cho hai đường thẳng $d\\colon y = ax + b$ $(a \\ne 0)$ và $d'\\colon y = a'x + b'$ $(a' \\ne 0)$.",
        },
        {
          type: 'table',
          head: ['Điều kiện', "Vị trí của $d$ và $d'$"],
          rows: [
            ["$a = a'$ và $b \\ne b'$", "$d$ song song với $d'$ $(d \\parallel d')$"],
            ["$a = a'$ và $b = b'$", "$d$ trùng với $d'$ $(d \\equiv d')$"],
            ["$a \\ne a'$", "$d$ cắt $d'$"],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: "Nếu $a \\ne a'$ và $b = b'$ thì hai đường thẳng cắt nhau tại điểm $(0; b)$ trên trục tung. Để tìm giao điểm khi $a \\ne a'$, giải phương trình $ax + b = a'x + b'$ để được hoành độ, rồi thay vào để tính tung độ.",
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đường thẳng và hệ số góc',
    instruction:
      "Kéo các thanh trượt a, b của d và a', b' của d'. Quan sát cung đánh dấu góc α với trục Ox và dòng thông báo song song, trùng nhau hay cắt nhau. Làm lần lượt các thử thách.",
  },
  examples: [
    {
      problem:
        'Tìm hệ số góc của đường thẳng $y = \\dfrac{1}{2} - \\dfrac{3}{2}x$. Góc tạo bởi đường thẳng này và trục $Ox$ là góc nhọn hay góc tù?',
      steps: [
        'Viết lại: $y = -\\dfrac{3}{2}x + \\dfrac{1}{2}$, nên $a = -\\dfrac{3}{2}$.',
        '$a < 0$ nên góc tạo bởi đường thẳng và trục $Ox$ là góc tù.',
      ],
      answer: 'Hệ số góc là $-\\dfrac{3}{2}$; góc tạo với $Ox$ là góc tù.',
    },
    {
      problem:
        "Cho $d\\colon y = 2x + 3$ và $d'\\colon y = (m - 1)x + 1$ với $m \\ne 1$. Tìm $m$ để $d \\parallel d'$.",
      steps: [
        "$d \\parallel d'$ khi hai hệ số góc bằng nhau và hai hệ số tự do khác nhau.",
        '$m - 1 = 2$ nên $m = 3$ (thoả mãn $m \\ne 1$); và $3 \\ne 1$ đúng.',
      ],
      answer: '$m = 3$.',
    },
    {
      problem:
        'Xét vị trí tương đối của các cặp đường thẳng: a) $y = 3x - 1$ và $y = 3x + 2$; b) $y = 3x + 2$ và $y = -x + 2$.',
      steps: [
        'a) Cùng hệ số góc $3$, hệ số tự do $-1 \\ne 2$: hai đường thẳng song song.',
        'b) Hệ số góc $3 \\ne -1$: hai đường thẳng cắt nhau; vì cùng $b = 2$ nên chúng cắt nhau tại điểm $(0; 2)$ trên trục tung.',
      ],
      answer: 'a) Song song; b) cắt nhau tại $(0; 2)$.',
    },
    {
      problem:
        'Viết phương trình đường thẳng song song với đường thẳng $y = -2x + 5$ và đi qua điểm $A(1; 4)$.',
      steps: [
        'Đường thẳng cần tìm có dạng $y = ax + b$ với $a = -2$ và $b \\ne 5$.',
        'Đi qua $A(1; 4)$: $4 = -2 \\cdot 1 + b$, nên $b = 6$ (khác $5$).',
      ],
      answer: '$y = -2x + 6$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hệ số góc của đường thẳng $y = 4 - 3x$ bằng bao nhiêu?',
      answer: -3,
      hints: ['Viết lại về dạng $y = ax + b$.'],
      solution: '$y = -3x + 4$ nên hệ số góc là $-3$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hệ số góc của đường thẳng $y = \\dfrac{2x - 1}{3}$ bằng bao nhiêu? Nhập dạng phân số.',
      answer: [2, 3],
      hints: ['Tách: $\\dfrac{2x - 1}{3} = \\dfrac{2}{3}x - \\dfrac{1}{3}$.'],
      solution: '$y = \\dfrac{2}{3}x - \\dfrac{1}{3}$ nên hệ số góc là $\\dfrac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng nào tạo với trục $Ox$ một góc tù?',
      options: ['$y = x - 5$', '$y = 3x$', '$y = -2x + 1$', '$y = 0{,}5x + 2$'],
      answer: 2,
      hints: ['Góc tù ứng với hệ số góc âm.'],
      solution: 'Chỉ $y = -2x + 1$ có hệ số góc $-2 < 0$, nên tạo với $Ox$ một góc tù.',
    },
    {
      type: 'choice',
      prompt: 'Cặp đường thẳng nào song song với nhau?',
      options: [
        '$y = 2x + 1$ và $y = 2x - 3$',
        '$y = 2x + 1$ và $y = -2x + 1$',
        '$y = 3x$ và $y = 3x$',
        '$y = x + 1$ và $y = 2x + 1$',
      ],
      answer: 0,
      hints: ["Song song: $a = a'$ và $b \\ne b'$."],
      solution:
        '$y = 2x + 1$ và $y = 2x - 3$ có cùng hệ số góc $2$ và $1 \\ne -3$. Cặp thứ hai và thứ tư cắt nhau; cặp thứ ba trùng nhau.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để đường thẳng $y = (m + 2)x - 1$ song song với đường thẳng $y = 5x + 3$.',
      answer: 3,
      hints: ['Hai hệ số góc phải bằng nhau.'],
      solution: '$m + 2 = 5$ nên $m = 3$; hệ số tự do $-1 \\ne 3$ nên hai đường thẳng song song.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $y = ax + b$ song song với đường thẳng $y = -2x + 5$ và đi qua điểm $(3; 1)$. Tìm $b$.',
      answer: 7,
      hints: ['Song song nên $a = -2$.', 'Thay $x = 3$, $y = 1$: $1 = -6 + b$.'],
      solution:
        '$a = -2$; $1 = -2 \\cdot 3 + b$ nên $b = 7$. Vì $7 \\ne 5$ nên đường thẳng $y = -2x + 7$ song song với đường thẳng đã cho.',
    },
    {
      type: 'multi',
      prompt: 'Cho $d\\colon y = 3x - 2$. Chọn tất cả các đường thẳng cắt $d$.',
      options: ['$y = 3x + 1$', '$y = -3x - 2$', '$y = x$', '$y = 3x - 2$', '$y = 0{,}5x + 7$'],
      answers: [1, 2, 4],
      hints: ["Cắt nhau khi và chỉ khi $a \\ne a'$."],
      solution:
        'Các đường thẳng có hệ số góc khác $3$ là $y = -3x - 2$, $y = x$, $y = 0{,}5x + 7$. $y = 3x + 1$ song song với $d$; $y = 3x - 2$ trùng với $d$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cặp đường thẳng với vị trí tương đối của chúng.',
      left: [
        '$y = x + 2$ và $y = x - 1$',
        '$y = 2(x - 1)$ và $y = 2x - 2$',
        '$y = 2x + 1$ và $y = -x + 1$',
        '$y = x$ và $y = 3x + 2$',
      ],
      right: [
        'Song song',
        'Trùng nhau',
        'Cắt nhau tại một điểm trên trục tung',
        'Cắt nhau tại một điểm không nằm trên trục tung',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ["Viết từng hàm số về dạng $y = ax + b$ rồi so sánh $a$ với $a'$, $b$ với $b'$."],
      solution:
        "Cặp 1: $a = a' = 1$, $2 \\ne -1$: song song. Cặp 2: $2(x - 1) = 2x - 2$: trùng nhau. Cặp 3: $2 \\ne -1$, cùng $b = 1$: cắt nhau tại $(0; 1)$. Cặp 4: $1 \\ne 3$, $0 \\ne 2$: cắt nhau tại $(-1; -1)$.",
    },
    {
      type: 'number',
      prompt: 'Tìm hoành độ giao điểm của hai đường thẳng $y = 2x + 1$ và $y = -x + 4$.',
      answer: 1,
      hints: ['Tại giao điểm hai tung độ bằng nhau: $2x + 1 = -x + 4$.'],
      solution:
        '$2x + 1 = -x + 4 \\Leftrightarrow 3x = 3 \\Leftrightarrow x = 1$. Khi đó $y = 3$, giao điểm là $(1; 3)$.',
    },
  ],
  takeaways: [
    'Trong $y = ax + b$ $(a \\ne 0)$, $a$ là hệ số góc; $a > 0$: góc với $Ox$ nhọn, $a < 0$: góc tù.',
    "$a = a'$, $b \\ne b'$: song song; $a = a'$, $b = b'$: trùng nhau; $a \\ne a'$: cắt nhau.",
    "Cắt nhau và $b = b'$ thì giao điểm nằm trên trục tung tại $(0; b)$.",
    'Đường thẳng song song với $y = ax + b$ có cùng hệ số góc $a$ và hệ số tự do khác $b$.',
  ],
};
