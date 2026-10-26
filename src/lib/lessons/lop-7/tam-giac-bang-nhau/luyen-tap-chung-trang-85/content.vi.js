/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về các trường hợp bằng nhau của tam giác vuông, tam giác cân, tam giác đều và đường trung trực của đoạn thẳng.',
  intro:
    'Bài luyện tập này ôn lại Bài 15 (Các trường hợp bằng nhau của tam giác vuông) và Bài 16 (Tam giác cân. Đường trung trực của đoạn thẳng). Em sẽ dùng hai góc ở đáy bằng nhau của tam giác cân để có thêm dữ kiện, chứng minh hai tam giác vuông bằng nhau để suy ra một tam giác cân, và dùng tính chất cách đều hai mút của đường trung trực.',
  objectives: [
    'Chọn đúng trường hợp bằng nhau của tam giác vuông: hai cạnh góc vuông, cạnh góc vuông và góc nhọn kề, cạnh huyền và góc nhọn, cạnh huyền và cạnh góc vuông.',
    'Tính góc trong tam giác cân, tam giác đều; chứng minh một tam giác là tam giác cân.',
    'Vận dụng tính chất của đường trung trực để suy ra hai đoạn thẳng bằng nhau.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Hai tam giác vuông có', 'Trường hợp'],
          rows: [
            ['Hai cạnh góc vuông bằng nhau', 'Hai cạnh góc vuông (c.g.c)'],
            [
              'Một cạnh góc vuông và góc nhọn kề cạnh ấy bằng nhau',
              'Cạnh góc vuông - góc nhọn kề (g.c.g)',
            ],
            ['Cạnh huyền và một góc nhọn bằng nhau', 'Cạnh huyền - góc nhọn'],
            ['Cạnh huyền và một cạnh góc vuông bằng nhau', 'Cạnh huyền - cạnh góc vuông'],
          ],
        },
        {
          type: 'list',
          items: [
            'Tam giác $ABC$ cân tại $A$ ($AB = AC$) khi và chỉ khi $\\widehat{B} = \\widehat{C}$; khi đó $\\widehat{B} = \\widehat{C} = \\dfrac{180^\\circ - \\widehat{A}}{2}$.',
            'Tam giác đều có ba cạnh bằng nhau, mỗi góc bằng $60^\\circ$.',
            'Điểm $M$ nằm trên đường trung trực của $AB$ khi và chỉ khi $MA = MB$.',
          ],
        },
      ],
    },
    {
      heading: 'Chứng minh một tam giác cân',
      blocks: [
        {
          type: 'p',
          text: 'Muốn chứng minh tam giác $ADE$ cân tại $A$, ta chứng minh $AD = AE$ (thường bằng hai tam giác bằng nhau chứa hai cạnh ấy) hoặc chứng minh $\\widehat{D} = \\widehat{E}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trong tam giác cân, hai góc ở đáy bằng nhau là nguồn dữ kiện có sẵn: hãy dùng nó khi chọn trường hợp c.g.c, g.c.g hoặc cạnh huyền - góc nhọn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về hai tam giác vuông bằng nhau, tam giác cân, tam giác đều và đường trung trực. Nhập một số tự nhiên: số đo góc bằng độ, độ dài bằng xăng-ti-mét. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ cân tại $A$. Trên cạnh $BC$ lấy hai điểm $D$, $E$ sao cho $BD = CE$ ($D$ nằm giữa $B$ và $E$). Chứng minh tam giác $ADE$ cân.',
      steps: [
        'Xét $\\triangle ABD$ và $\\triangle ACE$: $AB = AC$ và $\\widehat{B} = \\widehat{C}$ (tam giác $ABC$ cân tại $A$), $BD = CE$ (giả thiết).',
        'Vậy $\\triangle ABD = \\triangle ACE$ (c.g.c).',
        'Suy ra $AD = AE$ (hai cạnh tương ứng), nên tam giác $ADE$ cân tại $A$.',
      ],
      answer: 'Tam giác $ADE$ cân tại $A$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ cân tại $A$. Kẻ $BH \\perp AC$ ($H \\in AC$) và $CK \\perp AB$ ($K \\in AB$). Chứng minh $BK = CH$ và tam giác $AKH$ cân.',
      steps: [
        'Xét $\\triangle KBC$ vuông tại $K$ và $\\triangle HCB$ vuông tại $H$: cạnh huyền $BC$ chung, $\\widehat{KBC} = \\widehat{HCB}$ (hai góc ở đáy của tam giác cân $ABC$).',
        'Vậy $\\triangle KBC = \\triangle HCB$ (cạnh huyền - góc nhọn), suy ra $BK = CH$.',
        'Ta có $AK = AB - BK$ và $AH = AC - CH$, mà $AB = AC$, $BK = CH$, nên $AK = AH$.',
        'Do đó tam giác $AKH$ cân tại $A$.',
      ],
      answer: '$BK = CH$ và tam giác $AKH$ cân tại $A$.',
    },
    {
      problem:
        'Cho đoạn thẳng $AB$. Hai điểm $M$, $N$ nằm khác phía đối với $AB$ và cùng nằm trên đường trung trực của $AB$. Chứng minh $\\widehat{MAN} = \\widehat{MBN}$.',
      steps: [
        '$M$, $N$ nằm trên đường trung trực của $AB$ nên $MA = MB$ và $NA = NB$.',
        'Xét $\\triangle MAN$ và $\\triangle MBN$: $MA = MB$, $NA = NB$, $MN$ chung. Vậy $\\triangle MAN = \\triangle MBN$ (c.c.c).',
        'Suy ra $\\widehat{MAN} = \\widehat{MBN}$ (hai góc tương ứng).',
      ],
      answer: '$\\widehat{MAN} = \\widehat{MBN}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ cân tại $A$, trên cạnh $BC$ lấy $D$, $E$ sao cho $BD = CE$. Hai tam giác $ABD$ và $ACE$ bằng nhau theo trường hợp nào?',
      options: ['c.c.c', 'c.g.c', 'g.c.g', 'cạnh huyền - cạnh góc vuông'],
      answer: 1,
      hints: ['Góc nào xen giữa hai cạnh $BA$ và $BD$?'],
      solution:
        '$AB = AC$, $\\widehat{B} = \\widehat{C}$ (góc xen giữa), $BD = CE$: trường hợp c.g.c.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với hình trên, biết $\\widehat{BAC} = 100^\\circ$ và $\\widehat{BAD} = 25^\\circ$ ($D$ nằm giữa $B$ và $E$). Tính $\\widehat{DAE}$ (độ).',
      answer: 50,
      unit: '°',
      hints: [
        'Từ $\\triangle ABD = \\triangle ACE$, góc $CAE$ bằng góc nào?',
        '$\\widehat{DAE} = \\widehat{BAC} - \\widehat{BAD} - \\widehat{CAE}$.',
      ],
      solution:
        '$\\triangle ABD = \\triangle ACE$ nên $\\widehat{CAE} = \\widehat{BAD} = 25^\\circ$. Vậy $\\widehat{DAE} = 100^\\circ - 25^\\circ - 25^\\circ = 50^\\circ$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước chứng minh tam giác $ADE$ ở câu 1 là tam giác cân.',
      items: [
        'Suy ra $AD = AE$, nên tam giác $ADE$ cân tại $A$.',
        'Vậy $\\triangle ABD = \\triangle ACE$ (c.g.c).',
        'Xét $\\triangle ABD$ và $\\triangle ACE$.',
        '$AB = AC$, $\\widehat{B} = \\widehat{C}$ (tam giác $ABC$ cân tại $A$), $BD = CE$ (giả thiết).',
      ],
      answer: [2, 3, 1, 0],
      hints: ['Nêu hai tam giác, liệt kê dữ kiện, kết luận bằng nhau, rồi suy ra.'],
      solution:
        'Xét hai tam giác; nêu $AB = AC$, $\\widehat{B} = \\widehat{C}$, $BD = CE$; kết luận $\\triangle ABD = \\triangle ACE$ (c.g.c); suy ra $AD = AE$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$, kẻ $BH \\perp AC$ ($H \\in AC$), $CK \\perp AB$ ($K \\in AB$). Biết $BH = 5$ cm. Tính $CK$ (cm).',
      answer: 5,
      unit: 'cm',
      hints: [
        'Xét hai tam giác vuông $ABH$ và $ACK$: cạnh huyền nào bằng nhau, góc nhọn nào chung?',
      ],
      solution:
        '$\\triangle ABH$ vuông tại $H$ và $\\triangle ACK$ vuông tại $K$ có cạnh huyền $AB = AC$, góc nhọn $\\widehat{A}$ chung, nên $\\triangle ABH = \\triangle ACK$ (cạnh huyền - góc nhọn). Suy ra $CK = BH = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ và có $AB = AC$ (tam giác vuông cân). Tính $\\widehat{B}$ (độ).',
      answer: 45,
      unit: '°',
      hints: [
        'Tam giác cân tại $A$ nên $\\widehat{B} = \\widehat{C}$.',
        'Hai góc nhọn của tam giác vuông phụ nhau.',
      ],
      solution:
        '$\\widehat{B} = \\widehat{C}$ và $\\widehat{B} + \\widehat{C} = 90^\\circ$, nên $\\widehat{B} = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{BAC} = 70^\\circ$. Kẻ $AH \\perp BC$ ($H \\in BC$). Tính $\\widehat{BAH}$ (độ).',
      answer: 35,
      unit: '°',
      hints: [
        'Chứng minh $\\triangle AHB = \\triangle AHC$ (cạnh huyền - cạnh góc vuông).',
        'Hai góc $BAH$, $CAH$ bằng nhau và có tổng bằng $\\widehat{BAC}$.',
      ],
      solution:
        '$\\triangle AHB = \\triangle AHC$ (cạnh huyền $AB = AC$, cạnh góc vuông $AH$ chung), nên $\\widehat{BAH} = \\widehat{CAH} = 70^\\circ : 2 = 35^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Đường trung trực của cạnh $BC$ trong tam giác $ABC$ đi qua đỉnh $A$. Khi đó tam giác $ABC$',
      options: ['cân tại $A$', 'cân tại $B$', 'vuông tại $A$', 'là tam giác đều'],
      answer: 0,
      hints: ['$A$ nằm trên đường trung trực của $BC$, vậy $A$ cách đều hai điểm nào?'],
      solution:
        '$A$ nằm trên đường trung trực của $BC$ nên $AB = AC$: tam giác $ABC$ cân tại $A$. (Không đủ dữ kiện để kết luận nó vuông hay đều.)',
    },
    {
      type: 'number',
      prompt:
        'Đường trung trực của đoạn thẳng $BC$ đi qua điểm $A$ (không thuộc $BC$). Biết $AB = 7$ cm, $BC = 5$ cm. Tính chu vi tam giác $ABC$ (cm).',
      answer: 19,
      unit: 'cm',
      hints: ['$AC$ bằng đoạn nào?'],
      solution: '$AC = AB = 7$ cm nên chu vi tam giác $ABC$ là $7 + 7 + 5 = 19$ cm.',
    },
    {
      type: 'multi',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ và $\\triangle DEF$ vuông tại $D$. Chọn tất cả các cặp dữ kiện đủ để kết luận $\\triangle ABC = \\triangle DEF$.',
      options: [
        '$AB = DE$ và $AC = DF$',
        '$BC = EF$ và $\\widehat{B} = \\widehat{E}$',
        '$\\widehat{B} = \\widehat{E}$ và $\\widehat{C} = \\widehat{F}$',
        '$BC = EF$ và $AC = DF$',
      ],
      answers: [0, 1, 3],
      hints: ['Mỗi trường hợp bằng nhau của tam giác vuông cần ít nhất một cặp cạnh.'],
      solution:
        'Đủ: hai cạnh góc vuông (1), cạnh huyền - góc nhọn (2), cạnh huyền - cạnh góc vuông (4). Hai cặp góc nhọn bằng nhau thì hai tam giác có thể to nhỏ khác nhau.',
    },
    {
      type: 'number',
      prompt: 'Tam giác đều $ABC$ có $M$ là trung điểm của $BC$. Tính $\\widehat{BAM}$ (độ).',
      answer: 30,
      unit: '°',
      hints: [
        'Chứng minh $\\triangle ABM = \\triangle ACM$ (c.c.c).',
        'Mỗi góc của tam giác đều bằng $60^\\circ$.',
      ],
      solution:
        '$AB = AC$, $MB = MC$, $AM$ chung nên $\\triangle ABM = \\triangle ACM$ (c.c.c), suy ra $\\widehat{BAM} = \\widehat{CAM} = 60^\\circ : 2 = 30^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$ ($M$ không thuộc $AB$) và $\\widehat{MAB} = 50^\\circ$. Tính $\\widehat{AMB}$ (độ).',
      answer: 80,
      unit: '°',
      hints: ['$MA = MB$, nên tam giác $MAB$ là tam giác gì?'],
      solution:
        '$MA = MB$ nên tam giác $MAB$ cân tại $M$, $\\widehat{MBA} = \\widehat{MAB} = 50^\\circ$. Vậy $\\widehat{AMB} = 180^\\circ - 50^\\circ - 50^\\circ = 80^\\circ$.',
    },
  ],
  takeaways: [
    'Hai góc ở đáy bằng nhau của tam giác cân thường là dữ kiện còn thiếu để chứng minh hai tam giác bằng nhau.',
    'Muốn chứng minh một tam giác cân, chứng minh hai cạnh bằng nhau hoặc hai góc bằng nhau.',
    'Luôn chỉ rõ cạnh huyền trước khi chọn trường hợp bằng nhau của tam giác vuông.',
    'Điểm trên đường trung trực của $AB$ cách đều $A$ và $B$, và ngược lại.',
  ],
};
