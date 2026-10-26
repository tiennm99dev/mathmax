/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba trường hợp đồng dạng của hai tam giác: cạnh – cạnh – cạnh, cạnh – góc – cạnh và góc – góc, cùng cách dùng chúng để chứng minh đồng dạng và tính độ dài.',
  intro:
    'Theo định nghĩa, muốn biết hai tam giác đồng dạng ta phải kiểm tra ba cặp góc và ba tỉ số cạnh. Thực ra không cần nhiều như vậy: chỉ một phần dữ kiện đã đủ quyết định hình dạng của tam giác. Bài này giới thiệu ba trường hợp đồng dạng, giống như ba trường hợp bằng nhau em đã học ở lớp 7.',
  objectives: [
    'Phát biểu ba trường hợp đồng dạng c.c.c, c.g.c và g.g của hai tam giác.',
    'Chọn đúng trường hợp để chứng minh hai tam giác đồng dạng, viết các đỉnh tương ứng theo đúng thứ tự.',
    'Dùng tam giác đồng dạng để lập tỉ lệ thức và tính độ dài đoạn thẳng.',
  ],
  sections: [
    {
      heading: 'Trường hợp đồng dạng thứ nhất: cạnh – cạnh – cạnh',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí (c.c.c)',
          text: 'Nếu ba cạnh của tam giác này tỉ lệ với ba cạnh của tam giác kia thì hai tam giác đó đồng dạng.',
        },
        {
          type: 'tex',
          tex: "\\frac{A'B'}{AB} = \\frac{B'C'}{BC} = \\frac{C'A'}{CA} \\Rightarrow \\triangle A'B'C' \\backsim \\triangle ABC",
        },
        {
          type: 'p',
          text: 'Để kiểm tra, ta xếp cạnh của mỗi tam giác theo thứ tự từ nhỏ đến lớn rồi lập tỉ số các cạnh cùng vị trí: nhỏ với nhỏ, vừa với vừa, lớn với lớn. Nếu ba tỉ số bằng nhau thì hai tam giác đồng dạng, và các góc đối diện các cạnh tương ứng là các góc tương ứng.',
        },
      ],
    },
    {
      heading: 'Trường hợp đồng dạng thứ hai: cạnh – góc – cạnh',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí (c.g.c)',
          text: 'Nếu hai cạnh của tam giác này tỉ lệ với hai cạnh của tam giác kia và hai góc tạo bởi các cặp cạnh đó bằng nhau thì hai tam giác đồng dạng.',
        },
        {
          type: 'tex',
          tex: "\\frac{A'B'}{AB} = \\frac{A'C'}{AC},\\ \\widehat{A'} = \\widehat{A} \\Rightarrow \\triangle A'B'C' \\backsim \\triangle ABC",
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Góc bằng nhau phải là góc xen giữa hai cặp cạnh tỉ lệ. Nếu góc bằng nhau không nằm giữa hai cạnh đó thì chưa kết luận được.',
        },
      ],
    },
    {
      heading: 'Trường hợp đồng dạng thứ ba: góc – góc',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí (g.g)',
          text: 'Nếu hai góc của tam giác này lần lượt bằng hai góc của tam giác kia thì hai tam giác đó đồng dạng.',
        },
        {
          type: 'tex',
          tex: "\\widehat{A'} = \\widehat{A},\\ \\widehat{B'} = \\widehat{B} \\Rightarrow \\triangle A'B'C' \\backsim \\triangle ABC",
        },
        {
          type: 'p',
          text: 'Vì tổng ba góc của tam giác bằng $180^\\circ$, hai cặp góc bằng nhau kéo theo cặp góc thứ ba cũng bằng nhau. Trường hợp này thường dùng khi hai tam giác có chung một góc, hoặc có các góc so le trong, đồng vị bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hệ quả: hai tam giác cân có góc ở đỉnh bằng nhau thì đồng dạng, vì các góc ở đáy cũng bằng nhau. Mọi tam giác đều đồng dạng với nhau.',
        },
        {
          type: 'table',
          caption: 'So sánh với các trường hợp bằng nhau của hai tam giác',
          head: ['Bằng nhau', 'Đồng dạng'],
          rows: [
            ['c.c.c: ba cạnh bằng nhau', 'c.c.c: ba cạnh tỉ lệ'],
            [
              'c.g.c: hai cạnh bằng nhau, góc xen giữa bằng nhau',
              'c.g.c: hai cạnh tỉ lệ, góc xen giữa bằng nhau',
            ],
            ['g.c.g: một cạnh và hai góc kề bằng nhau', 'g.g: hai góc bằng nhau (không cần cạnh)'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ dựng hai tam giác',
    instruction:
      'Chọn một trường hợp, rồi nhập dữ kiện cho △ABC và △A′B′C′. Hai tam giác được vẽ cùng tỉ lệ. Khi điều kiện của trường hợp được thoả, bảng bên dưới cho thấy mọi cạnh tương ứng đều tỉ lệ và mọi góc tương ứng đều bằng nhau. Thử làm sai một điều kiện, chẳng hạn đổi góc xen giữa trong c.g.c, để thấy hai tam giác không còn cùng hình dạng.',
  },
  examples: [
    {
      problem:
        '$\\triangle ABC$ có $AB = 4$ cm, $BC = 6$ cm, $CA = 8$ cm; $\\triangle DEF$ có $DE = 6$ cm, $EF = 9$ cm, $FD = 12$ cm. Hai tam giác có đồng dạng không? Nếu có, viết kí hiệu đúng thứ tự đỉnh.',
      steps: [
        'Xếp cạnh từ nhỏ đến lớn: $AB < BC < CA$ và $DE < EF < FD$.',
        'Lập tỉ số: $\\dfrac{DE}{AB} = \\dfrac{6}{4} = \\dfrac{3}{2}$, $\\dfrac{EF}{BC} = \\dfrac{9}{6} = \\dfrac{3}{2}$, $\\dfrac{FD}{CA} = \\dfrac{12}{8} = \\dfrac{3}{2}$.',
        'Ba tỉ số bằng nhau nên hai tam giác đồng dạng (c.c.c), với $D \\leftrightarrow A$, $E \\leftrightarrow B$, $F \\leftrightarrow C$.',
      ],
      answer: '$\\triangle DEF \\backsim \\triangle ABC$ với tỉ số đồng dạng $\\dfrac{3}{2}$.',
    },
    {
      problem:
        '$\\triangle ABC$ có $AB = 6$ cm, $AC = 9$ cm, $BC = 12$ cm. $\\triangle DEF$ có $DE = 4$ cm, $DF = 6$ cm và $\\widehat{D} = \\widehat{A}$. Chứng minh $\\triangle DEF \\backsim \\triangle ABC$ và tính $EF$.',
      steps: [
        '$\\dfrac{DE}{AB} = \\dfrac{4}{6} = \\dfrac{2}{3}$ và $\\dfrac{DF}{AC} = \\dfrac{6}{9} = \\dfrac{2}{3}$, nên $\\dfrac{DE}{AB} = \\dfrac{DF}{AC}$.',
        '$\\widehat{D} = \\widehat{A}$, và đó là góc xen giữa hai cặp cạnh trên.',
        'Vậy $\\triangle DEF \\backsim \\triangle ABC$ (c.g.c), tỉ số đồng dạng $\\dfrac{2}{3}$.',
        '$EF$ ứng với $BC$: $EF = \\dfrac{2}{3} \\cdot 12 = 8$ cm.',
      ],
      answer: '$\\triangle DEF \\backsim \\triangle ABC$ và $EF = 8$ cm.',
    },
    {
      problem:
        'Cho $\\triangle ABC$ có $AB = 6$ cm, $AC = 9$ cm. Lấy điểm $D$ trên cạnh $AC$ sao cho $\\widehat{ABD} = \\widehat{ACB}$. Tính $AD$.',
      steps: [
        'Xét $\\triangle ABD$ và $\\triangle ACB$: $\\widehat{A}$ chung và $\\widehat{ABD} = \\widehat{ACB}$.',
        'Vậy $\\triangle ABD \\backsim \\triangle ACB$ (g.g), với $A \\leftrightarrow A$, $B \\leftrightarrow C$, $D \\leftrightarrow B$.',
        'Suy ra $\\dfrac{AB}{AC} = \\dfrac{AD}{AB}$, tức $AB^2 = AD \\cdot AC$.',
        '$AD = \\dfrac{AB^2}{AC} = \\dfrac{36}{9} = 4$ cm.',
      ],
      answer: '$AD = 4$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ có ba cạnh $3$ cm, $4$ cm, $6$ cm. Tam giác có ba cạnh nào dưới đây đồng dạng với $\\triangle ABC$?',
      options: [
        '$6$ cm, $8$ cm, $10$ cm',
        '$6$ cm, $8$ cm, $12$ cm',
        '$4$ cm, $5$ cm, $7$ cm',
        '$9$ cm, $12$ cm, $16$ cm',
      ],
      answer: 1,
      hints: [
        'Xếp các cạnh từ nhỏ đến lớn rồi lập ba tỉ số nhỏ – nhỏ, vừa – vừa, lớn – lớn.',
        'Ba tỉ số phải bằng nhau (trường hợp c.c.c).',
      ],
      solution:
        '$\\dfrac{6}{3} = \\dfrac{8}{4} = \\dfrac{12}{6} = 2$. Các bộ khác có một tỉ số lệch, ví dụ $\\dfrac{9}{3} = \\dfrac{12}{4} = 3$ nhưng $\\dfrac{16}{6} \\ne 3$.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ có $AB = 5$ cm, $BC = 7$ cm, $CA = 8$ cm. $\\triangle MNP$ có $MN = 10$ cm, $NP = 14$ cm. Độ dài $PM$ bằng bao nhiêu thì $\\triangle MNP \\backsim \\triangle ABC$?',
      answer: 16,
      unit: 'cm',
      hints: [
        'Tỉ số $\\dfrac{MN}{AB}$ và $\\dfrac{NP}{BC}$ đều bằng một số $k$.',
        'Cần $\\dfrac{PM}{CA} = k$.',
      ],
      solution:
        '$k = \\dfrac{10}{5} = \\dfrac{14}{7} = 2$. Theo c.c.c, cần $\\dfrac{PM}{CA} = 2$ nên $PM = 2 \\cdot 8 = 16$ cm.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $\\dfrac{AB}{DE} = \\dfrac{AC}{DF}$. Cần thêm điều kiện nào để kết luận $\\triangle ABC \\backsim \\triangle DEF$ theo trường hợp c.g.c?',
      options: [
        '$\\widehat{B} = \\widehat{E}$',
        '$\\widehat{A} = \\widehat{D}$',
        '$\\widehat{C} = \\widehat{F}$',
        '$\\widehat{B} = \\widehat{D}$',
      ],
      answer: 1,
      hints: ['Góc bằng nhau phải là góc tạo bởi hai cặp cạnh tỉ lệ.'],
      solution:
        'Cạnh $AB$, $AC$ tạo thành góc $A$; cạnh $DE$, $DF$ tạo thành góc $D$. Vậy cần $\\widehat{A} = \\widehat{D}$.',
    },
    {
      type: 'multi',
      prompt:
        "Mỗi điều kiện sau đây có đủ để kết luận $\\triangle A'B'C' \\backsim \\triangle ABC$ không? Chọn tất cả các điều kiện đủ.",
      options: [
        "$\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC} = \\dfrac{C'A'}{CA}$",
        "$\\dfrac{A'B'}{AB} = \\dfrac{A'C'}{AC}$ và $\\widehat{A'} = \\widehat{A}$",
        "$\\widehat{A'} = \\widehat{A}$ và $\\widehat{B'} = \\widehat{B}$",
        "$\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC}$ và $\\widehat{A'} = \\widehat{A}$",
        "Chỉ có $\\widehat{A'} = \\widehat{A}$",
      ],
      answers: [0, 1, 2],
      hints: [
        'So mỗi điều kiện với ba trường hợp c.c.c, c.g.c, g.g.',
        'Với c.g.c, góc bằng nhau phải xen giữa hai cạnh tỉ lệ.',
      ],
      solution:
        'Ba điều kiện đầu lần lượt là c.c.c, c.g.c, g.g. Điều kiện thứ tư có góc $A$ không xen giữa hai cạnh $AB$, $BC$ (góc xen giữa là góc $B$), nên chưa đủ. Một cặp góc bằng nhau cũng chưa đủ.',
    },
    {
      type: 'number',
      prompt:
        "$\\triangle ABC$ có $AB = 4$ cm, $AC = 6$ cm, $BC = 5$ cm. $\\triangle A'B'C'$ có $A'B' = 6$ cm, $A'C' = 9$ cm và $\\widehat{A'} = \\widehat{A}$. Tính $B'C'$.",
      answer: 7.5,
      unit: 'cm',
      hints: [
        "Tính $\\dfrac{A'B'}{AB}$ và $\\dfrac{A'C'}{AC}$.",
        "Hai tam giác đồng dạng (c.g.c), nên $B'C' = k \\cdot BC$.",
      ],
      solution:
        "$\\dfrac{A'B'}{AB} = \\dfrac{6}{4} = \\dfrac{A'C'}{AC} = \\dfrac{9}{6} = 1{,}5$ và $\\widehat{A'} = \\widehat{A}$, nên $\\triangle A'B'C' \\backsim \\triangle ABC$ (c.g.c). Do đó $B'C' = 1{,}5 \\cdot 5 = 7{,}5$ cm.",
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ có $\\widehat{A} = 70^\\circ$, $\\widehat{B} = 50^\\circ$, $AB = 6$ cm. $\\triangle DEF$ có $\\widehat{D} = 70^\\circ$, $\\widehat{F} = 60^\\circ$, $DE = 9$ cm. Tính tỉ số $\\dfrac{EF}{BC}$ (viết dạng số thập phân).',
      answer: 1.5,
      hints: [
        'Tính góc còn lại của mỗi tam giác để ghép đỉnh tương ứng.',
        '$\\widehat{C} = 60^\\circ$ nên $\\triangle DEF \\backsim \\triangle ABC$ (g.g).',
      ],
      solution:
        '$\\widehat{C} = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ = \\widehat{F}$ và $\\widehat{D} = \\widehat{A}$, nên $\\triangle DEF \\backsim \\triangle ABC$ (g.g) với $E \\leftrightarrow B$, $F \\leftrightarrow C$. Do đó $\\dfrac{EF}{BC} = \\dfrac{DE}{AB} = \\dfrac{9}{6} = 1{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\triangle ABC$ có $AB = 8$ cm, $AC = 16$ cm. Điểm $D$ trên cạnh $AC$ thoả mãn $\\widehat{ABD} = \\widehat{ACB}$. Tính $AD$.',
      answer: 4,
      unit: 'cm',
      hints: [
        '$\\triangle ABD$ và $\\triangle ACB$ có chung góc $A$.',
        'Từ $\\triangle ABD \\backsim \\triangle ACB$ suy ra $\\dfrac{AD}{AB} = \\dfrac{AB}{AC}$.',
      ],
      solution:
        '$\\triangle ABD \\backsim \\triangle ACB$ (g.g) nên $AB^2 = AD \\cdot AC$, suy ra $AD = \\dfrac{64}{16} = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        "$\\triangle ABC$ có ba cạnh $3$ cm, $5$ cm, $7$ cm. $\\triangle A'B'C' \\backsim \\triangle ABC$ và cạnh lớn nhất của $\\triangle A'B'C'$ dài $14$ cm. Tính chu vi $\\triangle A'B'C'$.",
      answer: 30,
      unit: 'cm',
      hints: [
        'Cạnh lớn nhất ứng với cạnh lớn nhất, nên $k = \\dfrac{14}{7}$.',
        'Mỗi cạnh, do đó cả chu vi, được nhân với $k$.',
      ],
      solution:
        "$k = \\dfrac{14}{7} = 2$. Chu vi $\\triangle ABC$ là $3 + 5 + 7 = 15$ cm, nên chu vi $\\triangle A'B'C'$ là $2 \\cdot 15 = 30$ cm.",
    },
    {
      type: 'choice',
      prompt:
        'Hai tam giác cân $ABC$ (cân tại $A$) và $MNP$ (cân tại $M$) có $\\widehat{A} = \\widehat{M} = 40^\\circ$. Hai tam giác này có đồng dạng không?',
      options: [
        'Có, theo trường hợp góc – góc',
        'Có, theo trường hợp cạnh – cạnh – cạnh',
        'Không, vì chưa biết độ dài các cạnh',
        'Không, vì chỉ có một cặp góc bằng nhau',
      ],
      answer: 0,
      hints: ['Tính các góc ở đáy của mỗi tam giác cân.'],
      solution:
        'Mỗi góc ở đáy bằng $\\dfrac{180^\\circ - 40^\\circ}{2} = 70^\\circ$, nên $\\widehat{B} = \\widehat{N}$ và $\\widehat{A} = \\widehat{M}$. Vậy $\\triangle ABC \\backsim \\triangle MNP$ (g.g).',
    },
  ],
  takeaways: [
    'c.c.c: ba cạnh tương ứng tỉ lệ thì hai tam giác đồng dạng.',
    'c.g.c: hai cạnh tỉ lệ và góc xen giữa bằng nhau thì hai tam giác đồng dạng.',
    'g.g: hai cặp góc bằng nhau thì hai tam giác đồng dạng; không cần biết cạnh nào.',
    'Viết kí hiệu đồng dạng theo đúng thứ tự đỉnh tương ứng, rồi mới lập tỉ lệ thức để tính độ dài.',
  ],
};
