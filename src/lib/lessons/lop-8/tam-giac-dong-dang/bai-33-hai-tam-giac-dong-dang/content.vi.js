/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định nghĩa hai tam giác đồng dạng, kí hiệu, tỉ số đồng dạng và định lí về tam giác tạo bởi một đường thẳng song song với một cạnh.',
  intro:
    'Một tấm ảnh phóng to có cùng hình dạng với ảnh gốc: các góc giữ nguyên, các độ dài được nhân với cùng một số. Hai tam giác như vậy gọi là đồng dạng. Bài này giải thích chính xác điều đó và cách dùng tỉ số đồng dạng để tính độ dài.',
  objectives: [
    "Phát biểu định nghĩa hai tam giác đồng dạng và viết kí hiệu $\\triangle A'B'C' \\backsim \\triangle ABC$.",
    'Xác định tỉ số đồng dạng $k$ và dùng nó để tính độ dài cạnh.',
    'Nhận biết tam giác đồng dạng tạo bởi một đường thẳng song song với một cạnh của tam giác.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tam giác đồng dạng',
          text: "$\\triangle A'B'C'$ gọi là đồng dạng với $\\triangle ABC$ nếu $\\widehat{A'} = \\widehat{A}$, $\\widehat{B'} = \\widehat{B}$, $\\widehat{C'} = \\widehat{C}$ và $\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC} = \\dfrac{C'A'}{CA}$.",
        },
        {
          type: 'p',
          text: "Kí hiệu: $\\triangle A'B'C' \\backsim \\triangle ABC$, viết các đỉnh tương ứng theo cùng thứ tự. Tỉ số $k = \\dfrac{A'B'}{AB}$ gọi là tỉ số đồng dạng.",
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Thứ tự đỉnh quan trọng: $\\triangle MNP \\backsim \\triangle ABC$ nghĩa là $M$ ứng với $A$, $N$ với $B$, $P$ với $C$.',
        },
      ],
    },
    {
      heading: 'Tính chất',
      blocks: [
        {
          type: 'list',
          items: [
            'Mỗi tam giác đồng dạng với chính nó, với tỉ số $k = 1$.',
            "Nếu $\\triangle A'B'C' \\backsim \\triangle ABC$ theo tỉ số $k$ thì $\\triangle ABC \\backsim \\triangle A'B'C'$ theo tỉ số $\\dfrac{1}{k}$.",
            "Nếu $\\triangle A''B''C'' \\backsim \\triangle A'B'C'$ và $\\triangle A'B'C' \\backsim \\triangle ABC$ thì $\\triangle A''B''C'' \\backsim \\triangle ABC$.",
            'Hai tam giác bằng nhau là hai tam giác đồng dạng với tỉ số $1$.',
          ],
        },
      ],
    },
    {
      heading: 'Đường thẳng song song với một cạnh',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới đồng dạng với tam giác đã cho.',
        },
        {
          type: 'p',
          text: 'Cụ thể, nếu $M \\in AB$, $N \\in AC$ và $MN \\parallel BC$ thì $\\triangle AMN \\backsim \\triangle ABC$, nên $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phóng to, thu nhỏ tam giác',
    instruction:
      'Kéo thanh trượt hệ số k. Mọi cạnh của △A′B′C′ được nhân với k nên ba tỉ số A′B′/AB, B′C′/BC, C′A′/CA luôn bằng nhau, còn các góc và các dấu đánh cạnh tương ứng không đổi.',
  },
  examples: [
    {
      problem:
        "Cho $\\triangle A'B'C' \\backsim \\triangle ABC$ với $AB = 4$, $BC = 6$, $CA = 5$ và $A'B' = 8$. Tính $B'C'$ và $C'A'$.",
      steps: [
        "Tỉ số đồng dạng: $k = \\dfrac{A'B'}{AB} = \\dfrac{8}{4} = 2$.",
        "$B'C' = k \\cdot BC = 2 \\cdot 6 = 12$.",
        "$C'A' = k \\cdot CA = 2 \\cdot 5 = 10$.",
      ],
      answer: "$B'C' = 12$ và $C'A' = 10$.",
    },
    {
      problem:
        'Cho $\\triangle ABC$, $M \\in AB$, $N \\in AC$ với $MN \\parallel BC$, $AM = 3$, $AB = 9$, $BC = 12$. Tính $MN$.',
      steps: [
        '$MN \\parallel BC$ nên $\\triangle AMN \\backsim \\triangle ABC$.',
        'Tỉ số đồng dạng $k = \\dfrac{AM}{AB} = \\dfrac{3}{9} = \\dfrac{1}{3}$.',
        '$MN = \\dfrac{1}{3} \\cdot BC$.',
      ],
      answer: '$MN = 4$.',
    },
    {
      problem:
        'Cho $\\triangle DEF \\backsim \\triangle ABC$ với $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 70^\\circ$. Tính $\\widehat{F}$.',
      steps: [
        '$F$ ứng với $C$, nên $\\widehat{F} = \\widehat{C}$.',
        '$\\widehat{C} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$.',
      ],
      answer: '$\\widehat{F} = 60^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        "$\\triangle A'B'C' \\backsim \\triangle ABC$ với $A'B' = 3$ cm và $AB = 12$ cm. Tỉ số đồng dạng $k$ bằng bao nhiêu?",
      answer: [1, 4],
      hints: ["$k = \\dfrac{A'B'}{AB}$."],
      solution: '$k = \\dfrac{3}{12} = \\dfrac{1}{4}$.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle MNP \\backsim \\triangle ABC$ theo tỉ số $k = 3$, $BC = 5$ cm. Tính $NP$.',
      answer: 15,
      unit: 'cm',
      hints: ['$N$ ứng với $B$, $P$ ứng với $C$.', '$NP = k \\cdot BC$.'],
      solution: '$NP = 3 \\cdot 5 = 15$ cm.',
    },
    {
      type: 'choice',
      prompt: '$\\triangle ABC \\backsim \\triangle DEF$. Khẳng định nào đúng?',
      options: [
        '$\\widehat{A} = \\widehat{E}$',
        '$\\dfrac{AB}{DE} = \\dfrac{BC}{EF}$',
        '$\\dfrac{AB}{EF} = \\dfrac{AC}{DF}$',
        '$\\widehat{C} = \\widehat{D}$',
      ],
      answer: 1,
      hints: [
        'Ghép đỉnh theo thứ tự: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$.',
      ],
      solution:
        'Cạnh $AB$ ứng với $DE$, $BC$ ứng với $EF$, nên $\\dfrac{AB}{DE} = \\dfrac{BC}{EF}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\triangle ABC$ có $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = 2$, $MB = 4$, $MN = 3$. Tính $BC$.',
      answer: 9,
      hints: ['$AB = AM + MB = 6$.', '$\\dfrac{MN}{BC} = \\dfrac{AM}{AB}$.'],
      solution: '$\\dfrac{3}{BC} = \\dfrac{2}{6}$ nên $BC = 9$.',
    },
    {
      type: 'number',
      prompt:
        "$\\triangle A'B'C' \\backsim \\triangle ABC$ theo tỉ số $2$. Chu vi $\\triangle ABC$ là $15$ cm. Chu vi $\\triangle A'B'C'$ là bao nhiêu?",
      answer: 30,
      unit: 'cm',
      hints: ['Mỗi cạnh đều được nhân với $2$.'],
      solution: 'Chu vi cũng nhân với $k$: $2 \\cdot 15 = 30$ cm.',
    },
    {
      type: 'choice',
      prompt: '$\\triangle ABC$ có $AB = 3$, $BC = 4$, $CA = 5$. Tam giác nào đồng dạng với nó?',
      options: [
        'Ba cạnh $6, 8, 10$',
        'Ba cạnh $4, 5, 6$',
        'Ba cạnh $3, 4, 6$',
        'Ba cạnh $6, 8, 9$',
      ],
      answer: 0,
      hints: ['Kiểm tra ba tỉ số cạnh có bằng nhau không.'],
      solution:
        '$\\dfrac{6}{3} = \\dfrac{8}{4} = \\dfrac{10}{5} = 2$, nên tam giác cạnh $6, 8, 10$ đồng dạng với tỉ số $2$.',
    },
  ],
  takeaways: [
    'Hai tam giác đồng dạng có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.',
    "Tỉ số đồng dạng $k = \\dfrac{A'B'}{AB}$; viết các đỉnh tương ứng theo đúng thứ tự.",
    'Một đường thẳng song song với một cạnh, cắt hai cạnh còn lại, tạo ra tam giác đồng dạng với tam giác ban đầu.',
  ],
};
