/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về tổng ba góc và góc ngoài của tam giác, hai tam giác bằng nhau và trường hợp bằng nhau cạnh - cạnh - cạnh.',
  intro:
    'Bài luyện tập này ôn lại Bài 12 (Tổng các góc trong một tam giác) và Bài 13 (Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác). Em sẽ tính góc nhờ định lí tổng ba góc và góc ngoài, viết đúng kí hiệu hai tam giác bằng nhau, rồi dùng trường hợp c.c.c để suy ra các góc bằng nhau.',
  objectives: [
    'Tính góc chưa biết của tam giác bằng định lí tổng ba góc, tính chất hai góc nhọn của tam giác vuông và tính chất góc ngoài.',
    'Viết kí hiệu hai tam giác bằng nhau theo đúng thứ tự đỉnh và suy ra cạnh, góc tương ứng.',
    'Chứng minh hai tam giác bằng nhau theo trường hợp c.c.c và dùng nó để chứng minh hai góc bằng nhau.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Tổng ba góc', '$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.'],
            ['Tam giác vuông', 'Hai góc nhọn phụ nhau: tổng bằng $90^\\circ$.'],
            [
              'Góc ngoài',
              'Kề bù với một góc của tam giác; bằng tổng hai góc trong không kề với nó.',
            ],
            [
              'Hai tam giác bằng nhau',
              'Các cạnh tương ứng và các góc tương ứng bằng nhau; viết các đỉnh tương ứng theo cùng thứ tự.',
            ],
            ['Trường hợp c.c.c', 'Ba cạnh của tam giác này bằng ba cạnh của tam giác kia.'],
          ],
        },
      ],
    },
    {
      heading: 'Mẹo làm bài',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Khi biết tổng và hiệu (hoặc tỉ số) của hai góc, đặt ẩn rồi dùng định lí tổng ba góc.',
            'Để viết $\\triangle ABC = \\triangle \\ldots$, tìm đỉnh tương ứng với từng đỉnh $A$, $B$, $C$: hai cạnh bằng nhau thì hai đầu mút của chúng ứng với nhau.',
            'Muốn chứng minh hai góc bằng nhau, tìm hai tam giác chứa hai góc đó, chứng minh hai tam giác bằng nhau, rồi kết luận "hai góc tương ứng".',
            'Hai góc kề bù mà bằng nhau thì mỗi góc bằng $90^\\circ$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Góc ngoài tại một đỉnh bằng tổng hai góc ở hai đỉnh còn lại, không phải hai góc bất kì.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về tổng ba góc, góc ngoài, cạnh và góc tương ứng của hai tam giác bằng nhau, và trường hợp c.c.c. Nhập một số tự nhiên: số đo góc bằng độ hoặc độ dài bằng xăng-ti-mét. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng dạng bài theo kết quả lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $AB = AC$, $M$ là trung điểm của $BC$. Chứng minh $\\triangle ABM = \\triangle ACM$ và $AM \\perp BC$.',
      steps: [
        'Xét $\\triangle ABM$ và $\\triangle ACM$: $AB = AC$ (giả thiết), $MB = MC$ ($M$ là trung điểm của $BC$), $AM$ là cạnh chung.',
        'Vậy $\\triangle ABM = \\triangle ACM$ (c.c.c), suy ra $\\widehat{AMB} = \\widehat{AMC}$ (hai góc tương ứng).',
        'Hai góc $AMB$ và $AMC$ kề bù nên $\\widehat{AMB} + \\widehat{AMC} = 180^\\circ$; chúng bằng nhau nên mỗi góc bằng $90^\\circ$.',
        'Do đó $AM \\perp BC$.',
      ],
      answer: '$\\triangle ABM = \\triangle ACM$ (c.c.c) và $AM \\perp BC$.',
    },
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{A} = 60^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$, và $\\widehat{ADB} = 80^\\circ$. Tính $\\widehat{ABC}$ và $\\widehat{C}$.',
      steps: [
        'Trong tam giác $ABD$: $\\widehat{ABD} = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ$.',
        '$BD$ là tia phân giác của góc $B$ nên $\\widehat{ABC} = 2 \\cdot 40^\\circ = 80^\\circ$.',
        'Trong tam giác $ABC$: $\\widehat{C} = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ$.',
      ],
      answer: '$\\widehat{ABC} = 80^\\circ$, $\\widehat{C} = 40^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 80^\\circ$ và $\\widehat{B} - \\widehat{C} = 20^\\circ$. Tính $\\widehat{B}$ (độ).',
      answer: 60,
      unit: '°',
      hints: [
        '$\\widehat{B} + \\widehat{C} = 180^\\circ - 80^\\circ$.',
        'Biết tổng và hiệu: số lớn = (tổng + hiệu) : 2.',
      ],
      solution:
        '$\\widehat{B} + \\widehat{C} = 100^\\circ$, $\\widehat{B} - \\widehat{C} = 20^\\circ$, nên $\\widehat{B} = (100^\\circ + 20^\\circ) : 2 = 60^\\circ$ (và $\\widehat{C} = 40^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Góc ngoài tại đỉnh $A$ của tam giác $ABC$ bằng $120^\\circ$ và $\\widehat{B} = 2\\,\\widehat{C}$. Tính $\\widehat{C}$ (độ).',
      answer: 40,
      unit: '°',
      hints: [
        'Góc ngoài tại $A$ bằng tổng hai góc trong không kề với nó.',
        '$\\widehat{B} + \\widehat{C} = 120^\\circ$ và $\\widehat{B} = 2\\,\\widehat{C}$.',
      ],
      solution:
        '$\\widehat{B} + \\widehat{C} = 120^\\circ$, tức $3\\,\\widehat{C} = 120^\\circ$, nên $\\widehat{C} = 40^\\circ$ (và $\\widehat{B} = 80^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = \\widehat{B}$ và góc ngoài tại đỉnh $C$ bằng $130^\\circ$. Tính $\\widehat{A}$ (độ).',
      answer: 65,
      unit: '°',
      hints: ['Góc ngoài tại $C$ bằng $\\widehat{A} + \\widehat{B}$.'],
      solution:
        '$\\widehat{A} + \\widehat{B} = 130^\\circ$ và $\\widehat{A} = \\widehat{B}$, nên $\\widehat{A} = 65^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Một tam giác có hai góc bằng $45^\\circ$. Tam giác đó là',
      options: ['tam giác nhọn', 'tam giác vuông', 'tam giác tù', 'không tồn tại'],
      answer: 1,
      hints: ['Tính góc thứ ba.'],
      solution: 'Góc thứ ba bằng $180^\\circ - 45^\\circ - 45^\\circ = 90^\\circ$: tam giác vuông.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle MNP$ có $AB = MP$, $BC = PN$, $CA = NM$. Cách viết nào đúng?',
      options: [
        '$\\triangle ABC = \\triangle MNP$',
        '$\\triangle ABC = \\triangle MPN$',
        '$\\triangle ABC = \\triangle PMN$',
        '$\\triangle ABC = \\triangle NPM$',
      ],
      answer: 1,
      hints: [
        '$B$ là đầu mút chung của $AB$ và $BC$; đỉnh tương ứng là đầu mút chung của $MP$ và $PN$.',
      ],
      solution:
        '$B$ ứng với $P$ (chung của $MP$, $PN$), $A$ ứng với $M$, $C$ ứng với $N$. Vậy $\\triangle ABC = \\triangle MPN$ (c.c.c).',
    },
    {
      type: 'multi',
      prompt: '$\\triangle ABC = \\triangle MNP$. Chọn tất cả các đẳng thức đúng.',
      options: [
        '$AB = MN$',
        '$AC = MN$',
        '$\\widehat{C} = \\widehat{P}$',
        '$\\widehat{B} = \\widehat{P}$',
        '$BC = NP$',
      ],
      answers: [0, 2, 4],
      hints: ['$A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$.'],
      solution:
        'Đúng: $AB = MN$, $\\widehat{C} = \\widehat{P}$, $BC = NP$. Sai: $AC$ ứng với $MP$; $\\widehat{B}$ ứng với $\\widehat{N}$.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC = \\triangle DEF$ có $AB = 5$ cm, $AC = 7$ cm, $EF = 6$ cm. Tính chu vi tam giác $ABC$ (cm).',
      answer: 18,
      unit: 'cm',
      hints: ['$BC$ tương ứng với cạnh nào của $\\triangle DEF$?'],
      solution: '$BC = EF = 6$ cm, nên chu vi $\\triangle ABC$ là $5 + 6 + 7 = 18$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC = \\triangle DEF$ có $\\widehat{A} = 50^\\circ$, $\\widehat{F} = 70^\\circ$. Tính $\\widehat{E}$ (độ).',
      answer: 60,
      unit: '°',
      hints: ['$\\widehat{C} = \\widehat{F}$ và $\\widehat{E} = \\widehat{B}$.'],
      solution:
        '$\\widehat{C} = \\widehat{F} = 70^\\circ$, nên $\\widehat{B} = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$, và $\\widehat{E} = \\widehat{B} = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $AB = AD$, $CB = CD$ và $\\widehat{BAD} = 100^\\circ$. Tính $\\widehat{BAC}$ (độ).',
      answer: 50,
      unit: '°',
      hints: [
        'Chứng minh $\\triangle ABC = \\triangle ADC$ (c.c.c).',
        'Suy ra $\\widehat{BAC} = \\widehat{DAC}$, mà hai góc này cộng lại bằng $\\widehat{BAD}$.',
      ],
      solution:
        '$AB = AD$, $CB = CD$, $AC$ chung nên $\\triangle ABC = \\triangle ADC$ (c.c.c), suy ra $\\widehat{BAC} = \\widehat{DAC} = 100^\\circ : 2 = 50^\\circ$.',
    },
    {
      type: 'order',
      prompt:
        'Tam giác $ABC$ có $AB = AC$, $M$ là trung điểm của $BC$. Sắp xếp các bước chứng minh $AM \\perp BC$.',
      items: [
        'Suy ra $\\widehat{AMB} = \\widehat{AMC}$ (hai góc tương ứng).',
        'Xét $\\triangle ABM$ và $\\triangle ACM$: $AB = AC$, $MB = MC$, $AM$ chung.',
        'Hai góc $AMB$, $AMC$ kề bù và bằng nhau nên mỗi góc bằng $90^\\circ$, tức $AM \\perp BC$.',
        'Vậy $\\triangle ABM = \\triangle ACM$ (c.c.c).',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Chứng minh hai tam giác bằng nhau trước, rồi mới suy ra hai góc bằng nhau.'],
      solution:
        'Xét hai tam giác với ba cặp cạnh bằng nhau, kết luận $\\triangle ABM = \\triangle ACM$ (c.c.c), suy ra hai góc tương ứng bằng nhau, rồi dùng hai góc kề bù.',
    },
  ],
  takeaways: [
    'Tổng ba góc bằng $180^\\circ$; trong tam giác vuông, hai góc nhọn phụ nhau.',
    'Góc ngoài bằng tổng hai góc trong không kề với nó.',
    'Viết hai tam giác bằng nhau theo đúng thứ tự đỉnh tương ứng.',
    'Từ hai tam giác bằng nhau (c.c.c), suy ra các góc tương ứng bằng nhau.',
  ],
};
