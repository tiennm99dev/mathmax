/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tam giác cân và tính chất hai góc ở đáy bằng nhau, tam giác đều, đường trung trực của đoạn thẳng và tính chất mỗi điểm trên đường trung trực cách đều hai mút.',
  intro:
    'Gấp đôi một tờ giấy sao cho hai điểm $A$ và $B$ trùng nhau rồi mở ra: nếp gấp đi qua trung điểm của $AB$ và vuông góc với $AB$. Mỗi điểm trên nếp gấp ấy cách đều $A$ và $B$, và nối điểm đó với $A$, $B$ ta được một tam giác có hai cạnh bằng nhau. Bài này nghiên cứu những tam giác như vậy, tam giác cân, và nếp gấp ấy, đường trung trực của đoạn thẳng.',
  objectives: [
    'Nhận biết tam giác cân, cạnh bên, cạnh đáy, góc ở đỉnh, góc ở đáy; nhận biết tam giác đều.',
    'Phát biểu và vận dụng tính chất: trong tam giác cân hai góc ở đáy bằng nhau, và dấu hiệu: tam giác có hai góc bằng nhau là tam giác cân.',
    'Nhận biết đường trung trực của đoạn thẳng, vẽ được nó bằng thước và compa, vận dụng tính chất các điểm trên đường trung trực.',
  ],
  sections: [
    {
      heading: 'Tam giác cân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Tam giác cân là tam giác có hai cạnh bằng nhau. Nếu $\\triangle ABC$ có $AB = AC$ thì ta nói tam giác $ABC$ cân tại $A$: $AB$, $AC$ là hai cạnh bên, $BC$ là cạnh đáy, $\\widehat{A}$ là góc ở đỉnh, $\\widehat{B}$ và $\\widehat{C}$ là hai góc ở đáy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong một tam giác cân, hai góc ở đáy bằng nhau. Ngược lại, nếu một tam giác có hai góc bằng nhau thì tam giác đó là tam giác cân.',
        },
        {
          type: 'tex',
          tex: '\\triangle ABC,\\; AB = AC \\;\\Longleftrightarrow\\; \\widehat{B} = \\widehat{C}',
        },
        {
          type: 'p',
          text: 'Chứng minh thuận: gọi $M$ là trung điểm của $BC$. Hai tam giác $ABM$ và $ACM$ có $AB = AC$, $MB = MC$, $AM$ chung nên $\\triangle ABM = \\triangle ACM$ (c.c.c), suy ra $\\widehat{B} = \\widehat{C}$.',
        },
        {
          type: 'p',
          text: 'Chứng minh đảo: kẻ tia phân giác $AD$ của góc $A$ ($D$ thuộc $BC$). Vì $\\widehat{B} = \\widehat{C}$ và $\\widehat{BAD} = \\widehat{CAD}$ nên $\\widehat{ADB} = \\widehat{ADC}$ (tổng ba góc của tam giác). Hai tam giác $ABD$ và $ACD$ có $\\widehat{BAD} = \\widehat{CAD}$, $AD$ chung, $\\widehat{ADB} = \\widehat{ADC}$ nên $\\triangle ABD = \\triangle ACD$ (g.c.g), suy ra $AB = AC$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tam giác đều',
          text: 'Tam giác đều là tam giác có ba cạnh bằng nhau. Trong tam giác đều, mỗi góc bằng $60^\\circ$.',
        },
        {
          type: 'p',
          text: 'Tam giác đều $ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C}$, cân tại $B$ nên $\\widehat{A} = \\widehat{C}$. Ba góc bằng nhau và có tổng $180^\\circ$, nên mỗi góc bằng $180^\\circ : 3 = 60^\\circ$. Ngược lại, tam giác cân có một góc bằng $60^\\circ$ là tam giác đều (xem bài tập).',
        },
      ],
    },
    {
      heading: 'Đường trung trực của đoạn thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường thẳng vuông góc với một đoạn thẳng tại trung điểm của nó được gọi là đường trung trực của đoạn thẳng đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai mút của đoạn thẳng đó. Ngược lại, điểm cách đều hai mút của một đoạn thẳng thì nằm trên đường trung trực của đoạn thẳng đó.',
        },
        {
          type: 'p',
          text: 'Giải thích: gọi $d$ là đường trung trực của $AB$, cắt $AB$ tại trung điểm $O$. Nếu $M \\in d$, $M \\ne O$ thì $\\triangle MOA = \\triangle MOB$ (c.g.c: $OA = OB$, $\\widehat{MOA} = \\widehat{MOB} = 90^\\circ$, $MO$ chung), nên $MA = MB$. Ngược lại, nếu $MA = MB$ (với $M$ không thuộc $AB$) thì $\\triangle MOA = \\triangle MOB$ (c.c.c), nên $\\widehat{MOA} = \\widehat{MOB}$; hai góc kề bù bằng nhau nên mỗi góc bằng $90^\\circ$, tức là $MO \\perp AB$ tại $O$ và $M \\in d$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ cung tròn tâm $A$ bán kính $r$ lớn hơn $\\dfrac{AB}{2}$.',
            'Giữ nguyên độ mở compa, vẽ cung tròn tâm $B$; hai cung cắt nhau tại $M$ và $N$.',
            'Kẻ đường thẳng $MN$: đó là đường trung trực của $AB$, vì $M$ và $N$ cùng cách đều $A$ và $B$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu tam giác $ABC$ cân tại $A$ thì $A$ cách đều $B$ và $C$, nên $A$ nằm trên đường trung trực của cạnh đáy $BC$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Điểm trên đường trung trực',
    instruction:
      'Kéo điểm $M$ dọc đường trung trực $d$ của đoạn $AB$: hai độ dài $MA$, $MB$ luôn bằng nhau, tam giác $MAB$ cân tại $M$ và hai góc ở đáy luôn bằng nhau. Thử tìm vị trí để tam giác $MAB$ đều. Chuyển sang «Kéo tự do» để thấy: rời khỏi $d$ thì $MA \\ne MB$.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Tính $\\widehat{B}$ và $\\widehat{C}$.',
      steps: [
        'Tam giác $ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C}$ (hai góc ở đáy).',
        'Tổng ba góc: $\\widehat{B} + \\widehat{C} = 180^\\circ - 40^\\circ = 140^\\circ$.',
        'Vậy $\\widehat{B} = \\widehat{C} = 140^\\circ : 2 = 70^\\circ$.',
      ],
      answer: '$\\widehat{B} = \\widehat{C} = 70^\\circ$.',
    },
    {
      problem:
        'Tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$. Chứng minh $AM \\perp BC$ và $AM$ là đường trung trực của đoạn thẳng $BC$.',
      steps: [
        'Xét $\\triangle ABM$ và $\\triangle ACM$: $AB = AC$ (giả thiết), $MB = MC$ ($M$ là trung điểm của $BC$), $AM$ chung. Vậy $\\triangle ABM = \\triangle ACM$ (c.c.c).',
        'Suy ra $\\widehat{AMB} = \\widehat{AMC}$ (hai góc tương ứng).',
        'Hai góc $AMB$, $AMC$ kề bù nên $\\widehat{AMB} + \\widehat{AMC} = 180^\\circ$, do đó $\\widehat{AMB} = 90^\\circ$, tức là $AM \\perp BC$.',
        '$AM$ vuông góc với $BC$ tại trung điểm $M$ của $BC$, nên $AM$ là đường trung trực của $BC$.',
      ],
      answer: '$AM \\perp BC$ và $AM$ là đường trung trực của $BC$.',
    },
    {
      problem:
        'Cho đoạn thẳng $AB$. Hai điểm $M$, $N$ nằm khác phía đối với $AB$ sao cho $MA = MB$ và $NA = NB$. Chứng minh $MN$ là đường trung trực của $AB$.',
      steps: [
        '$MA = MB$ nên $M$ nằm trên đường trung trực của $AB$ (tính chất đảo).',
        '$NA = NB$ nên $N$ cũng nằm trên đường trung trực của $AB$.',
        'Hai điểm phân biệt $M$, $N$ cùng nằm trên đường trung trực của $AB$, mà qua hai điểm chỉ có một đường thẳng, nên đường thẳng $MN$ là đường trung trực của $AB$.',
      ],
      answer:
        '$MN$ là đường trung trực của $AB$; đây cũng là lí do cách vẽ bằng compa ở trên là đúng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tam giác $MNP$ cân tại $N$. Cạnh đáy của tam giác này là',
      options: ['$MN$', '$NP$', '$MP$', '$MN$ và $NP$'],
      answer: 2,
      hints: ['Cân tại $N$ nghĩa là hai cạnh xuất phát từ $N$ bằng nhau.'],
      solution:
        'Cân tại $N$: hai cạnh bên là $NM$, $NP$; cạnh đáy là cạnh đối diện đỉnh $N$, tức $MP$.',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ cân tại $A$ có $\\widehat{B} = 65^\\circ$. Tính $\\widehat{A}$ (độ).',
      answer: 50,
      unit: '°',
      hints: ['Góc $C$ bằng góc nào?', 'Dùng tổng ba góc của tam giác.'],
      solution:
        '$\\widehat{C} = \\widehat{B} = 65^\\circ$ nên $\\widehat{A} = 180^\\circ - 65^\\circ - 65^\\circ = 50^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 110^\\circ$. Tính $\\widehat{B}$ (độ).',
      answer: 35,
      unit: '°',
      hints: [
        '$\\widehat{B} = \\widehat{C}$, và $\\widehat{B} + \\widehat{C} = 180^\\circ - \\widehat{A}$.',
      ],
      solution:
        '$\\widehat{B} + \\widehat{C} = 180^\\circ - 110^\\circ = 70^\\circ$ và $\\widehat{B} = \\widehat{C}$, nên $\\widehat{B} = 35^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 80^\\circ$. Tam giác $ABC$',
      options: ['cân tại $A$', 'cân tại $B$', 'cân tại $C$', 'là tam giác đều'],
      answer: 1,
      hints: [
        'Tính $\\widehat{C}$ trước.',
        'Hai góc bằng nhau là hai góc ở đáy; đỉnh là đỉnh còn lại.',
      ],
      solution:
        '$\\widehat{C} = 180^\\circ - 50^\\circ - 80^\\circ = 50^\\circ = \\widehat{A}$. Hai góc ở đáy là $\\widehat{A}$, $\\widehat{C}$, nên tam giác cân tại $B$ ($BA = BC$).',
    },
    {
      type: 'number',
      prompt: 'Tam giác đều $ABC$ có chu vi $18$ cm. Tính độ dài cạnh $AB$ (cm).',
      answer: 6,
      unit: 'cm',
      hints: ['Ba cạnh của tam giác đều bằng nhau.'],
      solution: '$AB = BC = CA$ nên $AB = 18 : 3 = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ nằm trên đường trung trực của đoạn thẳng $AB$, $MA = 5$ cm, $AB = 6$ cm. Tính chu vi tam giác $MAB$ (cm).',
      answer: 16,
      unit: 'cm',
      hints: ['$M$ cách đều $A$ và $B$: $MB$ bằng bao nhiêu?'],
      solution: '$MB = MA = 5$ cm nên chu vi tam giác $MAB$ là $5 + 5 + 6 = 16$ cm.',
    },
    {
      type: 'multi',
      prompt:
        'Đường thẳng $d$ chắc chắn là đường trung trực của đoạn thẳng $AB$ khi nào? Chọn tất cả các trường hợp đúng.',
      options: [
        '$d$ vuông góc với $AB$ tại trung điểm của $AB$.',
        '$d$ đi qua trung điểm của $AB$.',
        '$d$ vuông góc với $AB$.',
        '$d$ đi qua hai điểm phân biệt, mỗi điểm cách đều $A$ và $B$.',
      ],
      answers: [0, 3],
      hints: ['Đường trung trực cần đủ hai điều kiện: vuông góc và đi qua trung điểm.'],
      solution:
        'Đúng: trường hợp 1 (định nghĩa) và 4 (hai điểm cách đều $A$, $B$ đều nằm trên đường trung trực). Chỉ đi qua trung điểm, hoặc chỉ vuông góc, thì chưa đủ.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Tia $Bx$ là tia đối của tia $BC$. Tính góc ngoài $\\widehat{ABx}$ (độ).',
      answer: 110,
      unit: '°',
      hints: [
        'Tính góc ở đáy $\\widehat{ABC}$ trước.',
        'Góc ngoài tại $B$ kề bù với $\\widehat{ABC}$.',
      ],
      solution:
        '$\\widehat{ABC} = (180^\\circ - 40^\\circ) : 2 = 70^\\circ$, nên $\\widehat{ABx} = 180^\\circ - 70^\\circ = 110^\\circ$ (cũng bằng $\\widehat{A} + \\widehat{C} = 40^\\circ + 70^\\circ$).',
    },
    {
      type: 'text',
      prompt: 'Tam giác cân có một góc bằng $60^\\circ$ là tam giác gì? (Viết hai hoặc ba chữ.)',
      accept: ['tam giác đều', 'đều', 'tam giac deu'],
      hints: [
        'Nếu góc $60^\\circ$ là góc ở đỉnh, hai góc ở đáy bằng bao nhiêu? Nếu là góc ở đáy thì sao?',
      ],
      solution:
        'Nếu góc ở đỉnh bằng $60^\\circ$, mỗi góc ở đáy bằng $(180^\\circ - 60^\\circ) : 2 = 60^\\circ$. Nếu một góc ở đáy bằng $60^\\circ$, góc ở đáy kia cũng $60^\\circ$ và góc ở đỉnh bằng $60^\\circ$. Ba góc bằng nhau nên tam giác cân tại cả ba đỉnh, ba cạnh bằng nhau: đó là tam giác đều.',
    },
  ],
  takeaways: [
    'Tam giác cân tại $A$: $AB = AC$, khi và chỉ khi hai góc ở đáy $\\widehat{B} = \\widehat{C}$.',
    'Tam giác đều có ba cạnh bằng nhau và mỗi góc bằng $60^\\circ$; tam giác cân có một góc $60^\\circ$ là tam giác đều.',
    'Đường trung trực của $AB$ vuông góc với $AB$ tại trung điểm của nó.',
    'Điểm nằm trên đường trung trực của $AB$ khi và chỉ khi nó cách đều $A$ và $B$.',
  ],
};
