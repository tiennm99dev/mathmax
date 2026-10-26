/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trường hợp bằng nhau cạnh - góc - cạnh (c.g.c) và góc - cạnh - góc (g.c.g) của hai tam giác, cách chọn trường hợp phù hợp và vận dụng vào bài toán đo khoảng cách.',
  intro:
    'Muốn biết khoảng cách giữa hai cây ở hai bờ một cái ao, ta không thể kéo thước thẳng qua mặt nước. Nhưng nếu dựng được trên bờ một tam giác bằng tam giác có cạnh là đoạn thẳng nối hai cây, ta chỉ cần đo cạnh tương ứng. Ở Bài 13, ba cặp cạnh bằng nhau là đủ để hai tam giác bằng nhau. Bài này cho thấy hai cạnh và góc xen giữa, hoặc một cạnh và hai góc kề, cũng đủ.',
  objectives: [
    'Phát biểu trường hợp bằng nhau cạnh - góc - cạnh (c.g.c) và nhận ra góc xen giữa hai cạnh.',
    'Phát biểu trường hợp bằng nhau góc - cạnh - góc (g.c.g) và nhận ra hai góc kề một cạnh.',
    'Chọn đúng trường hợp để chứng minh hai tam giác bằng nhau, rồi suy ra các cạnh, các góc tương ứng bằng nhau.',
    'Vận dụng vào bài toán thực tế như đo khoảng cách không đo trực tiếp được.',
  ],
  sections: [
    {
      heading: 'Trường hợp cạnh - góc - cạnh (c.g.c)',
      blocks: [
        {
          type: 'p',
          text: 'Trong tam giác $ABC$, góc $A$ là góc xen giữa hai cạnh $AB$ và $AC$. Dựng tam giác $ABC$ có $AB = 3$ cm, $\\widehat{A} = 70^\\circ$, $AC = 4$ cm: vẽ góc $xAy$ bằng $70^\\circ$, lấy $B$ trên $Ax$ và $C$ trên $Ay$ đúng độ dài, chỉ có một cách nối $BC$. Ai dựng cũng được cùng một tam giác.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trường hợp c.g.c',
          text: 'Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau.',
        },
        {
          type: 'tex',
          tex: "AB = A'B',\\; \\widehat{A} = \\widehat{A'},\\; AC = A'C' \\;\\Rightarrow\\; \\triangle ABC = \\triangle A'B'C'\\ (\\text{c.g.c})",
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Góc phải xen giữa',
          text: 'Hai cạnh và một góc không xen giữa chưa đủ: có những tam giác $ABC$ khác nhau cùng có $AB$, $AC$ và $\\widehat{B}$ như nhau. Thử chế độ "Hai cạnh, góc không xen giữa" trong phần khám phá.',
        },
      ],
    },
    {
      heading: 'Trường hợp góc - cạnh - góc (g.c.g)',
      blocks: [
        {
          type: 'p',
          text: 'Trong tam giác $ABC$, hai góc $B$ và $C$ là hai góc kề cạnh $BC$. Biết $BC$ và hai góc $\\widehat{B}$, $\\widehat{C}$ (có tổng nhỏ hơn $180^\\circ$), hai tia xuất phát từ $B$ và $C$ cắt nhau tại đúng một điểm $A$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trường hợp g.c.g',
          text: 'Nếu một cạnh và hai góc kề cạnh ấy của tam giác này bằng một cạnh và hai góc kề cạnh ấy của tam giác kia thì hai tam giác đó bằng nhau.',
        },
        {
          type: 'tex',
          tex: "\\widehat{B} = \\widehat{B'},\\; BC = B'C',\\; \\widehat{C} = \\widehat{C'} \\;\\Rightarrow\\; \\triangle ABC = \\triangle A'B'C'\\ (\\text{g.c.g})",
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu hai tam giác có một cặp cạnh bằng nhau và hai cặp góc bằng nhau nhưng các góc không kề cạnh đó, hãy dùng định lí tổng ba góc để suy ra cặp góc thứ ba bằng nhau, rồi áp dụng g.c.g.',
        },
        {
          type: 'p',
          text: 'Ba cặp góc bằng nhau thì không đủ: hai tam giác có cùng ba góc vẫn có thể to nhỏ khác nhau.',
        },
      ],
    },
    {
      heading: 'Chọn trường hợp bằng nhau',
      blocks: [
        {
          type: 'table',
          head: ['Đã biết bằng nhau', 'Trường hợp'],
          rows: [
            ['Ba cặp cạnh', 'c.c.c'],
            ['Hai cặp cạnh và cặp góc xen giữa', 'c.g.c'],
            ['Một cặp cạnh và hai cặp góc kề cạnh đó', 'g.c.g'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nêu hai tam giác cần xét, viết các đỉnh theo đúng thứ tự tương ứng.',
            'Liệt kê các cặp cạnh, góc bằng nhau kèm lí do: giả thiết, cạnh chung, hai góc đối đỉnh, tia phân giác, ...',
            'Kết luận hai tam giác bằng nhau và ghi trường hợp (c.g.c) hay (g.c.g); từ đó suy ra cạnh, góc tương ứng bằng nhau.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Dữ kiện nào xác định duy nhất một tam giác?',
    instruction:
      'Chọn loại dữ kiện rồi kéo các thanh trượt. Dữ kiện đã cho được tô màu hồng. Với c.g.c và g.c.g, chỉ dựng được một tam giác. Với hai cạnh và một góc không xen giữa, hoặc với ba góc, hãy tìm số đo khiến có hai tam giác khác nhau cùng thoả mãn.',
  },
  examples: [
    {
      problem:
        'Hai đoạn thẳng $AB$ và $CD$ cắt nhau tại $O$ là trung điểm của mỗi đoạn. Chứng minh $\\triangle OAC = \\triangle OBD$ và $AC = BD$.',
      steps: [
        'Xét $\\triangle OAC$ và $\\triangle OBD$.',
        '$OA = OB$ ($O$ là trung điểm của $AB$); $\\widehat{AOC} = \\widehat{BOD}$ (hai góc đối đỉnh); $OC = OD$ ($O$ là trung điểm của $CD$).',
        'Góc $AOC$ xen giữa $OA$, $OC$; góc $BOD$ xen giữa $OB$, $OD$. Vậy $\\triangle OAC = \\triangle OBD$ (c.g.c).',
        'Suy ra $AC = BD$ (hai cạnh tương ứng).',
      ],
      answer: '$\\triangle OAC = \\triangle OBD$ (c.g.c), nên $AC = BD$.',
    },
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{B} = \\widehat{C}$. Tia phân giác của góc $A$ cắt $BC$ tại $D$. Chứng minh $\\triangle ABD = \\triangle ACD$, từ đó suy ra $AB = AC$.',
      steps: [
        'Xét $\\triangle ABD$ và $\\triangle ACD$: $\\widehat{BAD} = \\widehat{CAD}$ ($AD$ là tia phân giác của góc $A$) và $\\widehat{B} = \\widehat{C}$ (giả thiết).',
        'Theo định lí tổng ba góc: $\\widehat{ADB} = 180^\\circ - \\widehat{B} - \\widehat{BAD}$ và $\\widehat{ADC} = 180^\\circ - \\widehat{C} - \\widehat{CAD}$, nên $\\widehat{ADB} = \\widehat{ADC}$.',
        'Cạnh $AD$ chung, hai góc kề nó là $\\widehat{BAD} = \\widehat{CAD}$ và $\\widehat{ADB} = \\widehat{ADC}$. Vậy $\\triangle ABD = \\triangle ACD$ (g.c.g).',
        'Suy ra $AB = AC$ (hai cạnh tương ứng).',
      ],
      answer: '$\\triangle ABD = \\triangle ACD$ (g.c.g), nên $AB = AC$.',
    },
    {
      problem:
        'Để đo khoảng cách giữa hai cây $A$ và $B$ ở hai bờ ao, bạn Nam chọn điểm $O$ trên bờ nhìn thấy cả hai cây, lấy $C$ trên tia đối của tia $OA$ sao cho $OC = OA$, lấy $D$ trên tia đối của tia $OB$ sao cho $OD = OB$, rồi đo được $CD = 25$ m. Tính $AB$.',
      steps: [
        'Xét $\\triangle OAB$ và $\\triangle OCD$: $OA = OC$, $OB = OD$ (cách lấy điểm), $\\widehat{AOB} = \\widehat{COD}$ (hai góc đối đỉnh).',
        'Vậy $\\triangle OAB = \\triangle OCD$ (c.g.c).',
        'Suy ra $AB = CD$ (hai cạnh tương ứng), mà $CD = 25$ m.',
      ],
      answer: '$AB = 25$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $AB = DE$, $BC = EF$. Cần thêm điều kiện nào để $\\triangle ABC = \\triangle DEF$ theo trường hợp c.g.c?',
      options: [
        '$\\widehat{A} = \\widehat{D}$',
        '$\\widehat{B} = \\widehat{E}$',
        '$\\widehat{C} = \\widehat{F}$',
        '$AC = DF$',
      ],
      answer: 1,
      hints: ['Góc nào xen giữa hai cạnh $AB$ và $BC$?'],
      solution:
        'Góc xen giữa $AB$ và $BC$ là $\\widehat{B}$, góc xen giữa $DE$ và $EF$ là $\\widehat{E}$. Cần $\\widehat{B} = \\widehat{E}$. (Thêm $AC = DF$ thì hai tam giác bằng nhau theo c.c.c, không phải c.g.c.)',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle MNP$ có $\\widehat{B} = \\widehat{N}$, $BC = NP$. Cần thêm điều kiện nào để $\\triangle ABC = \\triangle MNP$ theo trường hợp g.c.g?',
      options: [
        '$AB = MN$',
        '$AC = MP$',
        '$\\widehat{C} = \\widehat{P}$',
        '$\\widehat{A} = \\widehat{P}$',
      ],
      answer: 2,
      hints: ['Hai góc kề cạnh $BC$ là những góc nào?'],
      solution:
        'Hai góc kề cạnh $BC$ là $\\widehat{B}$ và $\\widehat{C}$; kề cạnh $NP$ là $\\widehat{N}$ và $\\widehat{P}$. Cần thêm $\\widehat{C} = \\widehat{P}$.',
    },
    {
      type: 'multi',
      prompt:
        "Những bộ dữ kiện nào chắc chắn cho $\\triangle ABC = \\triangle A'B'C'$? Chọn tất cả.",
      options: [
        "$AB = A'B'$, $\\widehat{A} = \\widehat{A'}$, $AC = A'C'$",
        "$AB = A'B'$, $AC = A'C'$, $\\widehat{B} = \\widehat{B'}$",
        "$\\widehat{B} = \\widehat{B'}$, $BC = B'C'$, $\\widehat{C} = \\widehat{C'}$",
        "$\\widehat{A} = \\widehat{A'}$, $\\widehat{B} = \\widehat{B'}$, $\\widehat{C} = \\widehat{C'}$",
        "$\\widehat{A} = \\widehat{A'}$, $\\widehat{B} = \\widehat{B'}$, $BC = B'C'$",
      ],
      answers: [0, 2, 4],
      hints: [
        'Kiểm tra góc đã cho có xen giữa hai cạnh, hay hai góc có kề cạnh đã cho không.',
        'Biết hai cặp góc bằng nhau thì cặp góc thứ ba cũng bằng nhau.',
      ],
      solution:
        "Bộ 1 là c.g.c. Bộ 3 là g.c.g. Bộ 5: từ $\\widehat{A} = \\widehat{A'}$, $\\widehat{B} = \\widehat{B'}$ suy ra $\\widehat{C} = \\widehat{C'}$, rồi dùng g.c.g với cạnh $BC$. Bộ 2 có góc $B$ không xen giữa $AB$, $AC$; bộ 4 chỉ có góc, tam giác có thể to nhỏ khác nhau.",
    },
    {
      type: 'number',
      prompt:
        'Hai đoạn thẳng $AB$ và $CD$ cắt nhau tại trung điểm $O$ của mỗi đoạn. Biết $AC = 7$ cm. Tính $BD$ (cm).',
      answer: 7,
      unit: 'cm',
      hints: ['Xét $\\triangle OAC$ và $\\triangle OBD$; chú ý hai góc đối đỉnh tại $O$.'],
      solution:
        '$OA = OB$, $\\widehat{AOC} = \\widehat{BOD}$ (đối đỉnh), $OC = OD$ nên $\\triangle OAC = \\triangle OBD$ (c.g.c), suy ra $BD = AC = 7$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ và $\\triangle ADC$ (hai điểm $B$, $D$ nằm khác phía đối với $AC$) có $AB = AD$, $\\widehat{BAC} = \\widehat{DAC}$. Biết $\\widehat{BAC} = 30^\\circ$, $\\widehat{ABC} = 100^\\circ$. Tính $\\widehat{ACD}$ (độ).',
      answer: 50,
      unit: '°',
      hints: [
        'Chứng minh $\\triangle ABC = \\triangle ADC$ trước: cạnh nào là cạnh chung?',
        'Góc $ACD$ tương ứng với góc nào của $\\triangle ABC$?',
      ],
      solution:
        '$AB = AD$, $\\widehat{BAC} = \\widehat{DAC}$, $AC$ chung nên $\\triangle ABC = \\triangle ADC$ (c.g.c). Suy ra $\\widehat{ACD} = \\widehat{ACB} = 180^\\circ - 30^\\circ - 100^\\circ = 50^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hai điểm $C$, $D$ nằm khác phía đối với đường thẳng $AB$ sao cho $\\widehat{CAB} = \\widehat{DAB}$ và $\\widehat{CBA} = \\widehat{DBA}$. Biết $BC = 5$ cm. Tính $BD$ (cm).',
      answer: 5,
      unit: 'cm',
      hints: ['Cạnh $AB$ chung; hai góc nào kề cạnh $AB$ trong mỗi tam giác?'],
      solution:
        '$\\triangle ABC$ và $\\triangle ABD$ có $\\widehat{CAB} = \\widehat{DAB}$, $AB$ chung, $\\widehat{CBA} = \\widehat{DBA}$ nên $\\triangle ABC = \\triangle ABD$ (g.c.g). Suy ra $BD = BC = 5$ cm.',
    },
    {
      type: 'order',
      prompt:
        'Cho góc $xOy$ có tia phân giác $Ot$. Lấy $A$ trên $Ox$, $B$ trên $Oy$ sao cho $OA = OB$, và $M$ trên $Ot$. Sắp xếp các bước chứng minh $MA = MB$.',
      items: [
        'Vậy $\\triangle OAM = \\triangle OBM$ (c.g.c).',
        'Xét $\\triangle OAM$ và $\\triangle OBM$.',
        'Suy ra $MA = MB$ (hai cạnh tương ứng).',
        '$OA = OB$ (giả thiết), $\\widehat{AOM} = \\widehat{BOM}$ ($Ot$ là tia phân giác), $OM$ là cạnh chung.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Mở đầu bằng việc nêu hai tam giác cần xét, kết thúc bằng điều cần chứng minh.'],
      solution:
        'Xét hai tam giác; nêu ba dữ kiện (hai cạnh và góc xen giữa); kết luận hai tam giác bằng nhau (c.g.c); suy ra $MA = MB$.',
    },
    {
      type: 'number',
      prompt:
        'Muốn đo khoảng cách hai điểm $A$, $B$ bị ngăn bởi một hồ nước, người ta chọn điểm $O$ rồi lấy $C$, $D$ sao cho $O$ là trung điểm của $AC$ và của $BD$. Đo được $CD = 32$ m. Khoảng cách $AB$ bằng bao nhiêu mét?',
      answer: 32,
      unit: 'm',
      hints: ['Hai tam giác $OAB$ và $OCD$ có những cặp cạnh, góc nào bằng nhau?'],
      solution:
        '$OA = OC$, $\\widehat{AOB} = \\widehat{COD}$ (đối đỉnh), $OB = OD$ nên $\\triangle OAB = \\triangle OCD$ (c.g.c). Suy ra $AB = CD = 32$ m.',
    },
  ],
  takeaways: [
    'c.g.c: hai cạnh và góc xen giữa bằng nhau thì hai tam giác bằng nhau.',
    'g.c.g: một cạnh và hai góc kề cạnh đó bằng nhau thì hai tam giác bằng nhau.',
    'Góc trong c.g.c phải xen giữa hai cạnh; hai góc trong g.c.g phải kề cạnh đã cho (nếu không, tính góc thứ ba trước).',
    'Hai cạnh và một góc không xen giữa, hay ba góc, chưa đủ để kết luận hai tam giác bằng nhau.',
  ],
};
