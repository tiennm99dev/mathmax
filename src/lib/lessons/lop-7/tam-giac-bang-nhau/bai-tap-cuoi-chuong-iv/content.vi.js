/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương IV: hệ thống hoá tổng các góc trong tam giác, các trường hợp bằng nhau của tam giác và của tam giác vuông, tam giác cân và đường trung trực, kèm bài tập tổng hợp và bài toán thực tế.',
  intro:
    'Chương IV bắt đầu từ tổng ba góc của một tam giác, đi qua ba trường hợp bằng nhau c.c.c, c.g.c, g.c.g, các trường hợp riêng của tam giác vuông, rồi tới tam giác cân và đường trung trực. Bài này giúp em xâu chuỗi các kiến thức ấy, chọn đúng công cụ cho từng câu hỏi, và tìm ra phần còn cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức của chương: tổng ba góc và góc ngoài của tam giác, hai tam giác bằng nhau, các trường hợp bằng nhau, tam giác cân, tam giác đều, đường trung trực.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp: tính góc, tính độ dài, chứng minh hai đoạn thẳng hoặc hai góc bằng nhau.',
    'Vận dụng tam giác bằng nhau để đo những khoảng cách không đo trực tiếp được.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính'],
          rows: [
            [
              'Bài 12',
              'Tổng ba góc của một tam giác bằng $180^\\circ$. Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó. Trong tam giác vuông, hai góc nhọn phụ nhau.',
            ],
            [
              'Bài 13',
              'Hai tam giác bằng nhau khi các cạnh tương ứng và các góc tương ứng bằng nhau; viết $\\triangle ABC = \\triangle DEF$ theo đúng thứ tự đỉnh tương ứng. Trường hợp c.c.c.',
            ],
            ['Bài 14', 'Trường hợp c.g.c (góc xen giữa hai cạnh) và g.c.g (hai góc kề một cạnh).'],
            [
              'Bài 15',
              'Hai tam giác vuông bằng nhau nếu có: hai cạnh góc vuông; một cạnh góc vuông và góc nhọn kề; cạnh huyền và một góc nhọn; cạnh huyền và một cạnh góc vuông.',
            ],
            [
              'Bài 16',
              'Tam giác cân: hai cạnh bên bằng nhau khi và chỉ khi hai góc ở đáy bằng nhau. Tam giác đều có mỗi góc $60^\\circ$. Điểm nằm trên đường trung trực của $AB$ khi và chỉ khi cách đều $A$ và $B$.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Chọn công cụ cho từng câu hỏi',
      blocks: [
        {
          type: 'table',
          head: ['Câu hỏi', 'Công cụ'],
          rows: [
            [
              'Tính một góc của tam giác',
              'Tổng ba góc, góc ngoài, hai góc ở đáy của tam giác cân.',
            ],
            [
              'Chứng minh hai đoạn thẳng (hai góc) bằng nhau',
              'Tìm hai tam giác chứa chúng, chứng minh hai tam giác bằng nhau, rồi suy ra cạnh (góc) tương ứng.',
            ],
            ['Chứng minh tam giác cân', 'Chứng minh hai cạnh bằng nhau hoặc hai góc bằng nhau.'],
            [
              'Chứng minh một điểm nằm trên đường trung trực',
              'Chứng minh điểm đó cách đều hai mút của đoạn thẳng.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ba cặp góc bằng nhau, hoặc hai cặp cạnh và một cặp góc không xen giữa, chưa đủ để kết luận hai tam giác bằng nhau (trừ trường hợp cạnh huyền - cạnh góc vuông của tam giác vuông).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 20 câu trộn ngẫu nhiên, hai câu cho mỗi kĩ năng của chương. Nhập một số tự nhiên: số đo góc bằng độ, độ dài theo đơn vị đề bài cho. Bản đồ kĩ năng tô màu theo kết quả lần trả lời đầu của từng bài: ô chưa xanh là phần em nên ôn lại.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 36^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$. Tính các góc của tam giác $BDC$ và chứng minh tam giác $ABD$, tam giác $BDC$ đều là tam giác cân.',
      steps: [
        'Tam giác $ABC$ cân tại $A$ nên $\\widehat{ABC} = \\widehat{C} = (180^\\circ - 36^\\circ) : 2 = 72^\\circ$.',
        '$BD$ là tia phân giác nên $\\widehat{ABD} = \\widehat{DBC} = 72^\\circ : 2 = 36^\\circ$.',
        'Trong tam giác $BDC$: $\\widehat{BDC} = 180^\\circ - 36^\\circ - 72^\\circ = 72^\\circ$.',
        'Tam giác $ABD$ có $\\widehat{BAD} = \\widehat{ABD} = 36^\\circ$ nên cân tại $D$; tam giác $BDC$ có $\\widehat{BDC} = \\widehat{C} = 72^\\circ$ nên cân tại $B$.',
      ],
      answer:
        '$\\widehat{DBC} = 36^\\circ$, $\\widehat{BDC} = \\widehat{C} = 72^\\circ$; tam giác $ABD$ cân tại $D$, tam giác $BDC$ cân tại $B$.',
    },
    {
      problem:
        'Cho góc nhọn $xOy$ và tia phân giác $Ot$. Trên $Ox$ lấy $A$, trên $Oy$ lấy $B$ sao cho $OA = OB$. Chứng minh $Ot$ là đường trung trực của đoạn thẳng $AB$.',
      steps: [
        'Gọi $I$ là giao điểm của $Ot$ và $AB$. Xét $\\triangle OAI$ và $\\triangle OBI$: $OA = OB$, $\\widehat{AOI} = \\widehat{BOI}$ ($Ot$ là tia phân giác), $OI$ chung. Vậy $\\triangle OAI = \\triangle OBI$ (c.g.c).',
        'Suy ra $IA = IB$ và $\\widehat{OIA} = \\widehat{OIB}$.',
        'Hai góc $OIA$, $OIB$ kề bù và bằng nhau nên mỗi góc bằng $90^\\circ$, tức là $Ot \\perp AB$ tại $I$.',
        '$Ot$ vuông góc với $AB$ tại trung điểm $I$ của $AB$, nên $Ot$ là đường trung trực của $AB$.',
      ],
      answer: '$Ot$ là đường trung trực của $AB$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 45^\\circ$, $\\widehat{B} = 55^\\circ$. Tính $\\widehat{C}$ (độ).',
      answer: 80,
      unit: '°',
      hints: ['Tổng ba góc của một tam giác bằng $180^\\circ$.'],
      solution: '$\\widehat{C} = 180^\\circ - 45^\\circ - 55^\\circ = 80^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 60^\\circ$. Tính góc ngoài tại đỉnh $C$ (độ).',
      answer: 110,
      unit: '°',
      hints: ['Góc ngoài tại $C$ bằng tổng hai góc trong không kề với nó.'],
      solution:
        'Góc ngoài tại $C$ bằng $\\widehat{A} + \\widehat{B} = 50^\\circ + 60^\\circ = 110^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $\\triangle ABC = \\triangle MNP$. Khẳng định nào đúng?',
      options: [
        '$AB = MP$',
        '$BC = NP$',
        '$\\widehat{A} = \\widehat{N}$',
        '$\\widehat{C} = \\widehat{N}$',
      ],
      answer: 1,
      hints: ['Ghép đỉnh theo thứ tự: $A$ với $M$, $B$ với $N$, $C$ với $P$.'],
      solution:
        '$A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$, nên $BC = NP$. Các khẳng định khác ghép sai đỉnh.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi bộ dữ kiện của $\\triangle ABC$ và $\\triangle DEF$ với kết luận đúng.',
      left: [
        '$AB = DE$, $BC = EF$, $CA = FD$',
        '$AB = DE$, $\\widehat{B} = \\widehat{E}$, $BC = EF$',
        '$\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$',
        '$\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$',
      ],
      right: ['Bằng nhau (c.c.c)', 'Bằng nhau (c.g.c)', 'Bằng nhau (g.c.g)', 'Chưa đủ để kết luận'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Ba góc bằng nhau không cho biết gì về độ dài các cạnh.'],
      solution:
        'Ba cặp cạnh: c.c.c. Hai cạnh và góc xen giữa: c.g.c. Một cạnh và hai góc kề: g.c.g. Chỉ có ba cặp góc thì hai tam giác có thể to nhỏ khác nhau: chưa đủ.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $AB = DE$, $AC = DF$, $\\widehat{B} = \\widehat{E}$. Hai tam giác này',
      options: [
        'bằng nhau theo trường hợp c.g.c',
        'bằng nhau theo trường hợp g.c.g',
        'bằng nhau theo trường hợp c.c.c',
        'chưa đủ dữ kiện để kết luận',
      ],
      answer: 3,
      hints: ['Góc xen giữa hai cạnh $AB$ và $AC$ là góc nào?'],
      solution:
        'Góc xen giữa $AB$, $AC$ là $\\widehat{A}$, không phải $\\widehat{B}$. Hai cạnh và một góc không xen giữa chưa đủ để kết luận.',
    },
    {
      type: 'number',
      prompt:
        'Ba góc $\\widehat{A}$, $\\widehat{B}$, $\\widehat{C}$ của tam giác $ABC$ tỉ lệ với $1$, $2$, $3$. Tính góc lớn nhất (độ).',
      answer: 90,
      unit: '°',
      hints: [
        'Đặt $\\widehat{A} = k$, $\\widehat{B} = 2k$, $\\widehat{C} = 3k$.',
        '$6k = 180^\\circ$.',
      ],
      solution:
        '$k + 2k + 3k = 180^\\circ$ nên $k = 30^\\circ$; góc lớn nhất $\\widehat{C} = 3 \\cdot 30^\\circ = 90^\\circ$ (tam giác $ABC$ vuông tại $C$).',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 50^\\circ$. Tính $\\widehat{B}$ (độ).',
      answer: 65,
      unit: '°',
      hints: ['Hai góc ở đáy bằng nhau và có tổng bằng $180^\\circ - \\widehat{A}$.'],
      solution: '$\\widehat{B} = \\widehat{C} = (180^\\circ - 50^\\circ) : 2 = 65^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 36^\\circ$. Tia phân giác của góc $B$ cắt $AC$ tại $D$. Tính $\\widehat{BDC}$ (độ).',
      answer: 72,
      unit: '°',
      hints: [
        'Tính $\\widehat{ABC}$ và $\\widehat{C}$ trước.',
        '$\\widehat{DBC}$ bằng nửa $\\widehat{ABC}$; dùng tổng ba góc của tam giác $BDC$.',
      ],
      solution:
        '$\\widehat{ABC} = \\widehat{C} = 72^\\circ$, $\\widehat{DBC} = 36^\\circ$, nên $\\widehat{BDC} = 180^\\circ - 36^\\circ - 72^\\circ = 72^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$ có $BC = EF = 10$ cm, $AB = DE = 6$ cm. Biết $AC = 8$ cm. Tính $DF$ (cm).',
      answer: 8,
      unit: 'cm',
      hints: ['$BC$, $EF$ là hai cạnh huyền; trường hợp nào của tam giác vuông?'],
      solution:
        '$\\triangle ABC = \\triangle DEF$ (cạnh huyền - cạnh góc vuông), nên $DF = AC = 8$ cm.',
    },
    {
      type: 'text',
      prompt:
        'Điểm cách đều hai mút của một đoạn thẳng thì nằm trên đường nào của đoạn thẳng đó? (Viết ba chữ.)',
      accept: ['đường trung trực', 'trung trực'],
      hints: ['Đó là đường thẳng vuông góc với đoạn thẳng tại trung điểm của nó.'],
      solution:
        'Điểm cách đều hai mút của một đoạn thẳng thì nằm trên đường trung trực của đoạn thẳng đó.',
    },
    {
      type: 'number',
      prompt:
        'Cho góc nhọn $xOy$ có tia phân giác $Ot$; lấy $A \\in Ox$, $B \\in Oy$ với $OA = OB$; $Ot$ cắt $AB$ tại $I$. Biết $AB = 12$ cm. Tính $IA$ (cm).',
      answer: 6,
      unit: 'cm',
      hints: ['Chứng minh $\\triangle OAI = \\triangle OBI$ (c.g.c).'],
      solution:
        '$OA = OB$, $\\widehat{AOI} = \\widehat{BOI}$, $OI$ chung nên $\\triangle OAI = \\triangle OBI$ (c.g.c), suy ra $IA = IB = 12 : 2 = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Để đo khoảng cách $AB$ giữa hai cây ở hai bên một hồ nước, người ta chọn điểm $O$, lấy $C$ trên tia đối của tia $OA$ với $OC = OA$, lấy $D$ trên tia đối của tia $OB$ với $OD = OB$. Đo được $CD = 45$ m. Tính $AB$ (m).',
      answer: 45,
      unit: 'm',
      hints: ['Hai tam giác $OAB$ và $OCD$ có hai cặp cạnh bằng nhau và một cặp góc đối đỉnh.'],
      solution:
        '$OA = OC$, $\\widehat{AOB} = \\widehat{COD}$ (đối đỉnh), $OB = OD$ nên $\\triangle OAB = \\triangle OCD$ (c.g.c). Suy ra $AB = CD = 45$ m.',
    },
  ],
  takeaways: [
    'Tổng ba góc của tam giác bằng $180^\\circ$; góc ngoài bằng tổng hai góc trong không kề với nó.',
    'Ba trường hợp bằng nhau: c.c.c, c.g.c (góc xen giữa), g.c.g (hai góc kề); tam giác vuông có thêm trường hợp cạnh huyền - cạnh góc vuông và cạnh huyền - góc nhọn.',
    'Tam giác cân: hai cạnh bên bằng nhau khi và chỉ khi hai góc ở đáy bằng nhau; tam giác đều có ba góc $60^\\circ$.',
    'Một điểm nằm trên đường trung trực của một đoạn thẳng khi và chỉ khi nó cách đều hai mút của đoạn thẳng đó.',
  ],
};
