/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố định nghĩa hai tam giác đồng dạng, tỉ số đồng dạng và ba trường hợp đồng dạng c.c.c, c.g.c, g.g, với bộ đề tự sinh chấm điểm tức thì.',
  intro:
    'Muốn dùng tam giác đồng dạng để tính độ dài, em cần làm đúng ba việc: chọn trường hợp đồng dạng phù hợp với dữ kiện, viết kí hiệu theo đúng thứ tự đỉnh tương ứng, rồi lập tỉ lệ thức giữa các cạnh tương ứng. Bài luyện tập này giúp em rèn cả ba việc đó.',
  objectives: [
    'Xác định đỉnh, cạnh, góc tương ứng và tỉ số đồng dạng của hai tam giác đồng dạng.',
    'Chọn đúng trường hợp c.c.c, c.g.c hay g.g để chứng minh hai tam giác đồng dạng.',
    'Lập tỉ lệ thức từ hai tam giác đồng dạng để tính độ dài, chu vi, số đo góc.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              "Định nghĩa $\\triangle A'B'C' \\backsim \\triangle ABC$",
              "$\\widehat{A'} = \\widehat{A}$, $\\widehat{B'} = \\widehat{B}$, $\\widehat{C'} = \\widehat{C}$ và $\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC} = \\dfrac{C'A'}{CA} = k$",
            ],
            [
              '$MN \\parallel BC$, $M \\in AB$, $N \\in AC$',
              '$\\triangle AMN \\backsim \\triangle ABC$',
            ],
            ['Cạnh – cạnh – cạnh', 'Ba cạnh tương ứng tỉ lệ'],
            ['Cạnh – góc – cạnh', 'Hai cạnh tỉ lệ và góc xen giữa bằng nhau'],
            ['Góc – góc', 'Hai cặp góc bằng nhau'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai tam giác có chung một góc, có hai góc đối đỉnh, hoặc có các góc so le trong, đồng vị tạo bởi hai đường thẳng song song là những dấu hiệu thường gặp để dùng trường hợp g.g.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, năm câu cho mỗi bài 33 và 34. Độ dài viết dấu phẩy thập phân, ví dụ $7{,}5$; số đo góc tính bằng độ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Hình thang $ABCD$ ($AB \\parallel CD$) có hai đường chéo cắt nhau tại $O$, $AB = 4$ cm, $CD = 10$ cm, $OA = 2$ cm, $OB = 3$ cm. Tính $OC$ và $OD$.',
      steps: [
        'Xét $\\triangle OAB$ và $\\triangle OCD$: $\\widehat{OAB} = \\widehat{OCD}$ (so le trong, $AB \\parallel CD$) và $\\widehat{AOB} = \\widehat{COD}$ (đối đỉnh).',
        'Vậy $\\triangle OAB \\backsim \\triangle OCD$ (g.g), với $A \\leftrightarrow C$, $B \\leftrightarrow D$.',
        'Suy ra $\\dfrac{OA}{OC} = \\dfrac{OB}{OD} = \\dfrac{AB}{CD} = \\dfrac{4}{10} = \\dfrac{2}{5}$.',
        '$OC = 2 : \\dfrac{2}{5} = 5$ cm và $OD = 3 : \\dfrac{2}{5} = 7{,}5$ cm.',
      ],
      answer: '$OC = 5$ cm, $OD = 7{,}5$ cm.',
    },
    {
      problem:
        'Cho $\\triangle ABC$ có $AB = 8$ cm, $AC = 6$ cm, $BC = 10$ cm. Lấy $D$ trên cạnh $AB$, $E$ trên cạnh $AC$ sao cho $AD = 3$ cm, $AE = 4$ cm. Chứng minh $\\triangle ADE \\backsim \\triangle ACB$ và tính $DE$.',
      steps: [
        '$\\dfrac{AD}{AC} = \\dfrac{3}{6} = \\dfrac{1}{2}$ và $\\dfrac{AE}{AB} = \\dfrac{4}{8} = \\dfrac{1}{2}$, nên $\\dfrac{AD}{AC} = \\dfrac{AE}{AB}$.',
        'Hai tam giác có chung góc $A$, là góc xen giữa hai cặp cạnh đó.',
        'Vậy $\\triangle ADE \\backsim \\triangle ACB$ (c.g.c) với tỉ số $\\dfrac{1}{2}$.',
        '$DE$ ứng với $CB$: $DE = \\dfrac{1}{2} \\cdot 10 = 5$ cm.',
      ],
      answer: '$\\triangle ADE \\backsim \\triangle ACB$ và $DE = 5$ cm.',
    },
    {
      problem:
        '$\\triangle ABC$ có $AB = 6$ cm, $BC = 8$ cm, $CA = 10$ cm; $\\triangle MNP$ có $MN = 9$ cm, $NP = 12$ cm, $PM = 15$ cm. Biết $\\widehat{B} = 90^\\circ$, tính $\\widehat{N}$.',
      steps: [
        '$\\dfrac{MN}{AB} = \\dfrac{9}{6} = \\dfrac{3}{2}$, $\\dfrac{NP}{BC} = \\dfrac{12}{8} = \\dfrac{3}{2}$, $\\dfrac{PM}{CA} = \\dfrac{15}{10} = \\dfrac{3}{2}$.',
        'Vậy $\\triangle MNP \\backsim \\triangle ABC$ (c.c.c), $N$ ứng với $B$.',
        'Do đó $\\widehat{N} = \\widehat{B}$.',
      ],
      answer: '$\\widehat{N} = 90^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "$\\triangle A'B'C' \\backsim \\triangle ABC$ với $AB = 6$ cm, $A'B' = 4$ cm, $BC = 9$ cm. Tính $B'C'$.",
      answer: 6,
      unit: 'cm',
      hints: ["Tỉ số đồng dạng $k = \\dfrac{A'B'}{AB}$.", "$B'C' = k \\cdot BC$."],
      solution: "$k = \\dfrac{4}{6} = \\dfrac{2}{3}$, nên $B'C' = \\dfrac{2}{3} \\cdot 9 = 6$ cm.",
    },
    {
      type: 'fraction',
      prompt:
        '$\\triangle ABC \\backsim \\triangle DEF$ theo tỉ số $\\dfrac{3}{2}$. Hỏi $\\triangle DEF \\backsim \\triangle ABC$ theo tỉ số nào?',
      answer: [2, 3],
      hints: ['$\\dfrac{AB}{DE} = \\dfrac{3}{2}$. Tỉ số mới là $\\dfrac{DE}{AB}$.'],
      solution: 'Tỉ số đảo ngược: $\\dfrac{DE}{AB} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thang $ABCD$ ($AB \\parallel CD$) có hai đường chéo cắt nhau tại $O$, $AB = 6$ cm, $CD = 9$ cm, $OD = 6$ cm. Tính $OB$.',
      answer: 4,
      unit: 'cm',
      hints: [
        '$\\triangle OAB \\backsim \\triangle OCD$ (g.g: góc so le trong và góc đối đỉnh).',
        '$\\dfrac{OB}{OD} = \\dfrac{AB}{CD}$.',
      ],
      solution: '$\\dfrac{OB}{6} = \\dfrac{6}{9}$, nên $OB = 4$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $\\triangle ABC$, $D \\in AB$, $E \\in AC$ thoả mãn $\\dfrac{AD}{AC} = \\dfrac{AE}{AB}$. Hai tam giác $ADE$ và $ACB$ đồng dạng theo trường hợp nào?',
      options: ['Cạnh – cạnh – cạnh', 'Cạnh – góc – cạnh', 'Góc – góc', 'Không đồng dạng'],
      answer: 1,
      hints: ['Hai tam giác có chung góc nào? Góc đó có xen giữa hai cạnh tỉ lệ không?'],
      solution:
        'Hai cạnh $AD$, $AE$ tỉ lệ với $AC$, $AB$, và góc $A$ chung xen giữa, nên $\\triangle ADE \\backsim \\triangle ACB$ (c.g.c).',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\triangle ABC$ có $AB = 12$ cm, $AC = 9$ cm, $BC = 15$ cm. $D \\in AB$, $E \\in AC$ với $AD = 6$ cm, $AE = 8$ cm. Tính $DE$.',
      answer: 10,
      unit: 'cm',
      hints: [
        'So sánh $\\dfrac{AD}{AC}$ với $\\dfrac{AE}{AB}$.',
        '$\\triangle ADE \\backsim \\triangle ACB$, nên $\\dfrac{DE}{CB}$ bằng tỉ số đó.',
      ],
      solution:
        '$\\dfrac{AD}{AC} = \\dfrac{6}{9} = \\dfrac{2}{3}$, $\\dfrac{AE}{AB} = \\dfrac{8}{12} = \\dfrac{2}{3}$, góc $A$ chung, nên $\\triangle ADE \\backsim \\triangle ACB$ (c.g.c). $DE = \\dfrac{2}{3} \\cdot 15 = 10$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ có $AB = 4$ cm, $BC = 6$ cm, $CA = 7$ cm. $\\triangle DEF$ có $DE = 10$ cm, $EF = 15$ cm. Độ dài $FD$ bằng bao nhiêu thì $\\triangle DEF \\backsim \\triangle ABC$?',
      answer: 17.5,
      unit: 'cm',
      hints: ['$\\dfrac{DE}{AB} = \\dfrac{EF}{BC} = k$.', 'Cần $FD = k \\cdot CA$.'],
      solution:
        '$k = \\dfrac{10}{4} = \\dfrac{15}{6} = 2{,}5$, nên $FD = 2{,}5 \\cdot 7 = 17{,}5$ cm (trường hợp c.c.c).',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC \\backsim \\triangle MNP$ với $\\widehat{A} = 60^\\circ$ và $\\widehat{N} = 75^\\circ$. Góc $C$ bằng bao nhiêu độ?',
      answer: 45,
      hints: [
        '$\\widehat{B} = \\widehat{N}$.',
        'Tổng ba góc của $\\triangle ABC$ là $180^\\circ$.',
      ],
      solution:
        '$\\widehat{B} = \\widehat{N} = 75^\\circ$, nên $\\widehat{C} = 180^\\circ - 60^\\circ - 75^\\circ = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Để đo khoảng cách $AB$ giữa hai điểm ở hai bên bờ sông, người ta đứng ở bờ có điểm $B$, chọn điểm $C$ và $E$ sao cho $B$, $C$, $E$ thẳng hàng, rồi chọn $D$ sao cho $A$, $C$, $D$ thẳng hàng, $AB \\perp BE$ và $DE \\perp BE$. Đo được $BC = 20$ m, $CE = 5$ m, $DE = 6$ m. Tính $AB$.',
      answer: 24,
      unit: 'm',
      hints: [
        '$\\triangle ABC$ và $\\triangle DEC$ có góc vuông tại $B$, $E$ và hai góc đối đỉnh tại $C$.',
        '$\\dfrac{AB}{DE} = \\dfrac{BC}{EC}$.',
      ],
      solution:
        '$\\triangle ABC \\backsim \\triangle DEC$ (g.g) nên $\\dfrac{AB}{DE} = \\dfrac{BC}{EC} = \\dfrac{20}{5} = 4$, suy ra $AB = 4 \\cdot 6 = 24$ m.',
    },
    {
      type: 'number',
      prompt:
        'Hai tam giác đồng dạng có chu vi lần lượt là $30$ cm và $45$ cm. Một cạnh của tam giác nhỏ dài $8$ cm. Cạnh tương ứng của tam giác lớn dài bao nhiêu?',
      answer: 12,
      unit: 'cm',
      hints: ['Tỉ số chu vi bằng tỉ số đồng dạng.'],
      solution: '$k = \\dfrac{45}{30} = 1{,}5$, nên cạnh tương ứng dài $1{,}5 \\cdot 8 = 12$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Cho $\\triangle ABC \\backsim \\triangle DEF$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$\\widehat{B} = \\widehat{E}$',
        '$\\dfrac{AC}{DF} = \\dfrac{BC}{EF}$',
        '$\\dfrac{AB}{EF} = \\dfrac{BC}{DE}$',
        '$\\triangle BAC \\backsim \\triangle EDF$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Ghép đỉnh theo thứ tự: $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$.',
      ],
      solution:
        '$B$ ứng với $E$ nên $\\widehat{B} = \\widehat{E}$; $AC$ ứng với $DF$, $BC$ ứng với $EF$. Đổi chỗ cùng lúc hai đỉnh tương ứng vẫn giữ đúng cặp: $\\triangle BAC \\backsim \\triangle EDF$. Còn $AB$ ứng với $DE$ chứ không phải $EF$.',
    },
  ],
  takeaways: [
    'Viết kí hiệu đồng dạng theo đúng thứ tự đỉnh tương ứng trước khi lập tỉ lệ thức.',
    'Chung góc, đối đỉnh, so le trong, đồng vị là các dấu hiệu quen thuộc của trường hợp g.g.',
    'Với c.g.c, góc bằng nhau phải xen giữa hai cặp cạnh tỉ lệ.',
    'Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng.',
  ],
};
