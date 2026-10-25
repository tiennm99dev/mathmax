/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định nghĩa hai tam giác bằng nhau, cách viết kí hiệu theo đỉnh tương ứng, và trường hợp bằng nhau cạnh - cạnh - cạnh (c.c.c).',
  intro:
    'Hai miếng bánh cắt từ cùng một khuôn tam giác đặt chồng lên nhau sẽ trùng khít. Trong hình học, ta nói hai tam giác bằng nhau. Bài này cho biết khi nào hai tam giác bằng nhau và chỉ ra rằng chỉ cần so sánh ba cặp cạnh là đủ để kết luận.',
  objectives: [
    "Hiểu định nghĩa hai tam giác bằng nhau và viết kí hiệu $\\triangle ABC = \\triangle A'B'C'$ đúng thứ tự đỉnh.",
    'Chỉ ra các cặp cạnh và góc tương ứng của hai tam giác bằng nhau.',
    'Vận dụng trường hợp bằng nhau cạnh - cạnh - cạnh để chứng minh hai tam giác bằng nhau.',
  ],
  sections: [
    {
      heading: 'Hai tam giác bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai tam giác bằng nhau',
          text: "Hai tam giác $ABC$ và $A'B'C'$ bằng nhau nếu chúng có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau: $AB = A'B'$, $BC = B'C'$, $CA = C'A'$, $\\widehat{A} = \\widehat{A'}$, $\\widehat{B} = \\widehat{B'}$, $\\widehat{C} = \\widehat{C'}$.",
        },
        {
          type: 'p',
          text: "Khi viết $\\triangle ABC = \\triangle A'B'C'$, các đỉnh tương ứng được viết theo cùng thứ tự: $A$ ứng với $A'$, $B$ ứng với $B'$, $C$ ứng với $C'$.",
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '$\\triangle ABC = \\triangle DEF$ và $\\triangle ABC = \\triangle EDF$ là hai khẳng định khác nhau. Hãy kiểm tra cặp đỉnh nào trùng nhau khi đặt chồng hai tam giác.',
        },
      ],
    },
    {
      heading: 'Trường hợp cạnh - cạnh - cạnh',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trường hợp c.c.c',
          text: 'Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau.',
        },
        {
          type: 'tex',
          tex: "AB = A'B',\\; BC = B'C',\\; CA = C'A' \\;\\Rightarrow\\; \\triangle ABC = \\triangle A'B'C'\\ (\\text{c.c.c})",
        },
        {
          type: 'p',
          text: 'Nói cách khác, ba độ dài cạnh xác định hoàn toàn hình dạng và kích thước của tam giác. Vì thế khung hình tam giác bằng thanh tre không bị xô lệch, khác với khung hình chữ nhật.',
        },
        {
          type: 'p',
          text: 'Trên hình vẽ, các cạnh bằng nhau được đánh cùng số dấu gạch: một gạch, hai gạch, ba gạch.',
        },
      ],
    },
    {
      heading: 'Cách trình bày một chứng minh',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Nêu hai tam giác cần xét.',
            'Liệt kê ba cặp cạnh bằng nhau, mỗi cặp kèm lí do (giả thiết, cạnh chung, ...).',
            'Kết luận hai tam giác bằng nhau (c.c.c), rồi suy ra các góc tương ứng bằng nhau nếu đề bài yêu cầu.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh để hai tam giác bằng nhau',
    instruction:
      'Kéo các đỉnh của hai tam giác. Khi ba cặp cạnh có cùng số dấu gạch dài bằng nhau, huy hiệu "bằng nhau (c.c.c)" sẽ hiện lên.',
  },
  examples: [
    {
      problem:
        'Cho $\\triangle ABC = \\triangle MNP$ với $AB = 5$ cm, $\\widehat{B} = 60^\\circ$. Tính $MN$ và $\\widehat{N}$.',
      steps: [
        'Theo thứ tự đỉnh: $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$.',
        'Cạnh $AB$ ứng với $MN$; góc $B$ ứng với góc $N$.',
      ],
      answer: '$MN = 5$ cm và $\\widehat{N} = 60^\\circ$.',
    },
    {
      problem:
        'Cho tứ giác $ABCD$ có $AB = AD$ và $CB = CD$. Chứng minh $\\triangle ABC = \\triangle ADC$ và $\\widehat{ABC} = \\widehat{ADC}$.',
      steps: [
        'Xét $\\triangle ABC$ và $\\triangle ADC$.',
        '$AB = AD$ (giả thiết), $CB = CD$ (giả thiết), $AC$ là cạnh chung.',
        'Vậy $\\triangle ABC = \\triangle ADC$ (c.c.c).',
        '$B$ ứng với $D$ nên $\\widehat{ABC} = \\widehat{ADC}$ (hai góc tương ứng).',
      ],
      answer:
        '$\\triangle ABC = \\triangle ADC$ (c.c.c), suy ra $\\widehat{ABC} = \\widehat{ADC}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '$\\triangle PQR = \\triangle XYZ$. Cạnh nào bằng cạnh $QR$?',
      options: ['$XY$', '$YZ$', '$XZ$', '$ZY$ hoặc $XY$ tuỳ hình'],
      answer: 1,
      hints: [
        'Ghép đỉnh theo thứ tự: $P \\leftrightarrow X$, $Q \\leftrightarrow Y$, $R \\leftrightarrow Z$.',
      ],
      solution: '$Q$ ứng với $Y$ và $R$ ứng với $Z$, nên $QR = YZ$.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC = \\triangle DEF$ có $\\widehat{A} = 40^\\circ$, $\\widehat{E} = 75^\\circ$. Tính $\\widehat{C}$.',
      answer: 65,
      unit: '°',
      hints: [
        '$\\widehat{B} = \\widehat{E} = 75^\\circ$.',
        'Tổng ba góc của tam giác bằng $180^\\circ$.',
      ],
      solution: '$\\widehat{C} = 180^\\circ - 40^\\circ - 75^\\circ = 65^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ có $AB = 4$, $BC = 6$, $CA = 5$; $\\triangle MNP$ có $MN = 5$, $NP = 6$, $PM = 4$. Cách viết nào đúng?',
      options: [
        '$\\triangle ABC = \\triangle MNP$',
        '$\\triangle ABC = \\triangle PNM$',
        '$\\triangle ABC = \\triangle NMP$',
        'Hai tam giác không bằng nhau',
      ],
      answer: 1,
      hints: [
        'Cạnh $AB = 4$ bằng cạnh nào của $\\triangle MNP$?',
        '$AB = PM$, $BC = NP$, $CA = MN$.',
      ],
      solution:
        '$AB = PM = 4$, $BC = NP = 6$, $CA = NM = 5$. Ghép $A \\leftrightarrow P$, $B \\leftrightarrow N$, $C \\leftrightarrow M$: $\\triangle ABC = \\triangle PNM$ (c.c.c).',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước chứng minh $\\triangle ABM = \\triangle ACM$, biết $AB = AC$ và $M$ là trung điểm của $BC$.',
      items: [
        'Vậy $\\triangle ABM = \\triangle ACM$ (c.c.c).',
        'Xét $\\triangle ABM$ và $\\triangle ACM$.',
        '$AB = AC$ (giả thiết), $MB = MC$ ($M$ là trung điểm $BC$), $AM$ là cạnh chung.',
      ],
      answer: [1, 2, 0],
      hints: ['Bắt đầu bằng việc nêu hai tam giác cần xét.'],
      solution: 'Xét hai tam giác, liệt kê ba cặp cạnh bằng nhau kèm lí do, rồi kết luận (c.c.c).',
    },
    {
      type: 'multi',
      prompt: '$\\triangle ABC = \\triangle DEF$. Chọn tất cả các đẳng thức đúng.',
      options: [
        '$AC = DF$',
        '$\\widehat{B} = \\widehat{F}$',
        '$BC = EF$',
        '$\\widehat{C} = \\widehat{F}$',
        '$AB = EF$',
      ],
      answers: [0, 2, 3],
      hints: ['$A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$.'],
      solution:
        'Đúng: $AC = DF$, $BC = EF$, $\\widehat{C} = \\widehat{F}$. Sai: $\\widehat{B}$ ứng với $\\widehat{E}$; $AB$ ứng với $DE$.',
    },
    {
      type: 'number',
      prompt:
        'Hai tam giác bằng nhau, một tam giác có chu vi $27$ cm và hai cạnh $8$ cm, $9$ cm. Cạnh thứ ba của tam giác kia dài bao nhiêu?',
      answer: 10,
      unit: 'cm',
      hints: ['Hai tam giác bằng nhau có các cạnh tương ứng bằng nhau.', '$27 - 8 - 9 = ?$'],
      solution:
        'Cạnh thứ ba của tam giác thứ nhất là $27 - 8 - 9 = 10$ cm, và tam giác kia có cùng ba cạnh.',
    },
  ],
  takeaways: [
    'Hai tam giác bằng nhau có các cạnh tương ứng và các góc tương ứng bằng nhau.',
    'Viết kí hiệu bằng nhau theo đúng thứ tự các đỉnh tương ứng.',
    'Trường hợp c.c.c: ba cặp cạnh bằng nhau thì hai tam giác bằng nhau.',
    'Từ hai tam giác bằng nhau, suy ra các góc tương ứng bằng nhau.',
  ],
};
