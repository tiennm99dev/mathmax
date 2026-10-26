/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn, và cạnh đối diện với góc lớn hơn là cạnh lớn hơn.',
  intro:
    'Ba bạn đứng ở ba đỉnh của một khu vườn hình tam giác. Không cần thước đo góc, chỉ cần biết độ dài ba cạnh, em có thể nói ngay góc nào lớn nhất không? Bài này cho thấy trong một tam giác, độ lớn của các góc và độ dài của các cạnh đối diện luôn được sắp xếp theo cùng một thứ tự.',
  objectives: [
    'Nhận biết góc đối diện và cạnh đối diện trong một tam giác.',
    'Phát biểu và vận dụng định lí: góc đối diện với cạnh lớn hơn là góc lớn hơn.',
    'Phát biểu và vận dụng định lí: cạnh đối diện với góc lớn hơn là cạnh lớn hơn; nhận ra cạnh lớn nhất trong tam giác vuông, tam giác tù.',
  ],
  sections: [
    {
      heading: 'Góc đối diện với cạnh lớn hơn',
      blocks: [
        {
          type: 'p',
          text: 'Trong tam giác $ABC$, cạnh $BC$ đối diện với góc $A$, cạnh $CA$ đối diện với góc $B$, cạnh $AB$ đối diện với góc $C$. Nói cách khác, cạnh đối diện với một góc là cạnh không đi qua đỉnh của góc ấy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1',
          text: 'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn.',
        },
        {
          type: 'tex',
          tex: '\\triangle ABC,\\; AC > AB \\;\\Rightarrow\\; \\widehat{B} > \\widehat{C}',
        },
        {
          type: 'p',
          text: 'Chứng minh: vì $AC > AB$ nên trên cạnh $AC$ lấy được điểm $D$ sao cho $AD = AB$ ($D$ nằm giữa $A$ và $C$). Tam giác $ABD$ cân tại $A$ nên $\\widehat{ABD} = \\widehat{ADB}$.',
        },
        {
          type: 'p',
          text: 'Góc $ADB$ là góc ngoài tại đỉnh $D$ của tam giác $BDC$, nên $\\widehat{ADB} = \\widehat{DBC} + \\widehat{C} > \\widehat{C}$. Mặt khác tia $BD$ nằm giữa hai tia $BA$ và $BC$ nên $\\widehat{ABC} > \\widehat{ABD}$. Vậy $\\widehat{B} > \\widehat{ABD} = \\widehat{ADB} > \\widehat{C}$.',
        },
      ],
    },
    {
      heading: 'Cạnh đối diện với góc lớn hơn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2',
          text: 'Trong một tam giác, cạnh đối diện với góc lớn hơn là cạnh lớn hơn.',
        },
        {
          type: 'tex',
          tex: '\\triangle ABC,\\; \\widehat{B} > \\widehat{C} \\;\\Rightarrow\\; AC > AB',
        },
        {
          type: 'p',
          text: 'Chứng minh (phản chứng): giả sử $AC \\le AB$. Nếu $AC = AB$ thì tam giác $ABC$ cân tại $A$, nên $\\widehat{B} = \\widehat{C}$. Nếu $AC < AB$ thì theo Định lí 1, $\\widehat{B} < \\widehat{C}$. Cả hai trường hợp đều trái với giả thiết $\\widehat{B} > \\widehat{C}$. Vậy $AC > AB$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Trong tam giác tù (tam giác vuông), góc tù (góc vuông) là góc lớn nhất nên cạnh đối diện với góc tù (góc vuông) là cạnh lớn nhất. Chẳng hạn, trong tam giác vuông, cạnh huyền là cạnh lớn nhất.',
        },
        {
          type: 'table',
          head: ['Trong $\\triangle ABC$', 'Kết luận'],
          rows: [
            ['$BC > CA > AB$', '$\\widehat{A} > \\widehat{B} > \\widehat{C}$'],
            ['$AB = AC$', '$\\widehat{B} = \\widehat{C}$ (tam giác cân)'],
            ['$\\widehat{A} = 90^\\circ$', '$BC > AB$ và $BC > AC$'],
          ],
          caption: 'Cạnh lớn hơn đối diện góc lớn hơn, cạnh bằng nhau đối diện góc bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Góc đối diện với cạnh $AB$ là góc $C$, không phải góc $A$ hay góc $B$ (hai góc kề với cạnh $AB$). Hãy tìm đỉnh không nằm trên cạnh đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp hạng góc và cạnh',
    instruction:
      'Kéo ba đỉnh $A$, $B$, $C$. Mỗi góc và cạnh đối diện của nó được tô cùng một màu, và bảng xếp hạng sắp các cạnh từ lớn đến nhỏ. Hãy quan sát: các góc luôn đứng theo đúng thứ tự ấy. Thử tạo một tam giác cân, một tam giác vuông và một tam giác tù.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $AB = 5$ cm, $BC = 7$ cm, $CA = 6$ cm. Hãy so sánh các góc của tam giác $ABC$.',
      steps: [
        'So sánh ba cạnh: $BC > CA > AB$ (vì $7 > 6 > 5$).',
        'Góc đối diện với $BC$ là $\\widehat{A}$, với $CA$ là $\\widehat{B}$, với $AB$ là $\\widehat{C}$.',
        'Theo Định lí 1, góc đối diện với cạnh lớn hơn là góc lớn hơn.',
      ],
      answer: '$\\widehat{A} > \\widehat{B} > \\widehat{C}$.',
    },
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 60^\\circ$. Hãy so sánh các cạnh của tam giác $ABC$.',
      steps: [
        'Tổng ba góc của tam giác bằng $180^\\circ$ nên $\\widehat{C} = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$.',
        'Do đó $\\widehat{C} > \\widehat{B} > \\widehat{A}$.',
        'Cạnh đối diện với $\\widehat{C}$ là $AB$, với $\\widehat{B}$ là $CA$, với $\\widehat{A}$ là $BC$. Theo Định lí 2: $AB > CA > BC$.',
      ],
      answer: '$AB > CA > BC$.',
    },
    {
      problem:
        'Tam giác $MNP$ có $\\widehat{M} = 110^\\circ$. Chứng tỏ $NP$ là cạnh lớn nhất của tam giác.',
      steps: [
        '$\\widehat{N} + \\widehat{P} = 180^\\circ - 110^\\circ = 70^\\circ$, nên $\\widehat{N} < 70^\\circ$ và $\\widehat{P} < 70^\\circ$.',
        'Vậy $\\widehat{M}$ là góc lớn nhất của tam giác $MNP$.',
        'Cạnh đối diện với $\\widehat{M}$ là $NP$, nên theo Định lí 2, $NP > MN$ và $NP > MP$.',
      ],
      answer: '$NP$ là cạnh lớn nhất.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AB = 4$ cm, $BC = 6$ cm, $CA = 5$ cm. Góc lớn nhất của tam giác là',
      options: ['$\\widehat{A}$', '$\\widehat{B}$', '$\\widehat{C}$'],
      answer: 0,
      hints: ['Tìm cạnh lớn nhất trước.', 'Góc lớn nhất đối diện với cạnh lớn nhất.'],
      solution:
        'Cạnh lớn nhất là $BC = 6$ cm. Góc đối diện với $BC$ là $\\widehat{A}$, nên $\\widehat{A}$ là góc lớn nhất.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ có $AC > AB$. Khẳng định nào sau đây đúng?',
      options: [
        '$\\widehat{C} > \\widehat{B}$',
        '$\\widehat{B} > \\widehat{C}$',
        '$\\widehat{A} > \\widehat{B}$',
        '$\\widehat{B} = \\widehat{C}$',
      ],
      answer: 1,
      hints: ['Góc đối diện với cạnh $AC$ là góc nào? Với cạnh $AB$ là góc nào?'],
      solution:
        'Góc đối diện với $AC$ là $\\widehat{B}$, góc đối diện với $AB$ là $\\widehat{C}$. Vì $AC > AB$ nên $\\widehat{B} > \\widehat{C}$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $DEF$ có $\\widehat{D} = 40^\\circ$, $\\widehat{E} = 75^\\circ$. Cạnh nhỏ nhất của tam giác là',
      options: ['$DE$', '$EF$', '$FD$'],
      answer: 1,
      hints: [
        'Tính $\\widehat{F}$ bằng tổng ba góc của tam giác.',
        'Cạnh nhỏ nhất đối diện với góc nhỏ nhất.',
      ],
      solution:
        '$\\widehat{F} = 180^\\circ - 40^\\circ - 75^\\circ = 65^\\circ$. Góc nhỏ nhất là $\\widehat{D} = 40^\\circ$, cạnh đối diện là $EF$. Vậy $EF$ là cạnh nhỏ nhất.',
    },
    {
      type: 'order',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 80^\\circ$, $\\widehat{B} = 45^\\circ$. Sắp xếp ba cạnh theo thứ tự từ nhỏ đến lớn.',
      items: ['$AB$', '$BC$', '$CA$'],
      answer: [2, 0, 1],
      hints: [
        'Tính $\\widehat{C}$ rồi so sánh ba góc.',
        'Cạnh đối diện với góc nhỏ hơn là cạnh nhỏ hơn.',
      ],
      solution:
        '$\\widehat{C} = 180^\\circ - 80^\\circ - 45^\\circ = 55^\\circ$, nên $\\widehat{B} < \\widehat{C} < \\widehat{A}$. Các cạnh đối diện lần lượt là $CA$, $AB$, $BC$, nên $CA < AB < BC$.',
    },
    {
      type: 'multi',
      prompt: 'Tam giác $ABC$ vuông tại $A$. Chọn tất cả các khẳng định chắc chắn đúng.',
      options: ['$BC > AB$', '$BC > AC$', '$AB > AC$', '$\\widehat{B} > \\widehat{A}$'],
      answers: [0, 1],
      hints: [
        'Trong tam giác vuông, góc nào lớn nhất?',
        'Hai góc nhọn $B$, $C$ có thể lớn nhỏ tùy tam giác.',
      ],
      solution:
        '$\\widehat{A} = 90^\\circ$ là góc lớn nhất nên cạnh huyền $BC$ là cạnh lớn nhất: $BC > AB$, $BC > AC$. Còn $AB$ và $AC$ thì tùy tam giác, và $\\widehat{B} < 90^\\circ = \\widehat{A}$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 2\\widehat{B}$ và $\\widehat{C} = 3\\widehat{B}$. Góc đối diện với cạnh lớn nhất có số đo bao nhiêu độ?',
      answer: 90,
      unit: '°',
      hints: [
        'Tổng ba góc: $2\\widehat{B} + \\widehat{B} + 3\\widehat{B} = 180^\\circ$.',
        'Góc đối diện với cạnh lớn nhất là góc lớn nhất.',
      ],
      solution:
        '$6\\widehat{B} = 180^\\circ$ nên $\\widehat{B} = 30^\\circ$, $\\widehat{A} = 60^\\circ$, $\\widehat{C} = 90^\\circ$. Góc lớn nhất là $\\widehat{C} = 90^\\circ$; nó đối diện với cạnh lớn nhất $AB$.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ có $AB = AC = 5$ cm và $BC = 8$ cm. Khẳng định nào sau đây đúng?',
      options: [
        '$\\widehat{A} > \\widehat{B} = \\widehat{C}$',
        '$\\widehat{B} = \\widehat{C} > \\widehat{A}$',
        '$\\widehat{A} = \\widehat{B} = \\widehat{C}$',
        '$\\widehat{A} < \\widehat{B} < \\widehat{C}$',
      ],
      answer: 0,
      hints: [
        'Hai cạnh bằng nhau đối diện hai góc bằng nhau.',
        'Cạnh $BC$ lớn nhất đối diện góc nào?',
      ],
      solution:
        '$AB = AC$ nên $\\widehat{C} = \\widehat{B}$. $BC = 8$ cm là cạnh lớn nhất nên góc đối diện $\\widehat{A}$ lớn nhất. Vậy $\\widehat{A} > \\widehat{B} = \\widehat{C}$.',
    },
    {
      type: 'text',
      prompt: 'Điền vào chỗ trống: trong một tam giác tù, cạnh lớn nhất là cạnh đối diện với góc …',
      accept: ['tù', 'góc tù'],
      hints: ['Trong tam giác tù, góc nào lớn nhất?'],
      solution:
        'Góc tù lớn hơn $90^\\circ$ còn hai góc kia đều nhọn, nên góc tù là góc lớn nhất. Cạnh lớn nhất là cạnh đối diện với góc tù.',
    },
  ],
  takeaways: [
    'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn.',
    'Trong một tam giác, cạnh đối diện với góc lớn hơn là cạnh lớn hơn.',
    'Hai cạnh bằng nhau đối diện hai góc bằng nhau; cạnh đối diện góc vuông hoặc góc tù là cạnh lớn nhất.',
  ],
};
