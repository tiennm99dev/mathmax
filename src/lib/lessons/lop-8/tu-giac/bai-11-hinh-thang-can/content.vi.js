/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình thang, hình thang cân; tính chất hai cạnh bên và hai đường chéo của hình thang cân; dấu hiệu nhận biết hình thang cân.',
  intro:
    'Nhìn nghiêng một chiếc xô, mặt cắt của con đê hay chiếc túi xách, em sẽ thấy một tứ giác có hai cạnh song song và cân đối hai bên. Đó là hình thang cân. Bài này cho em biết hình thang cân có những tính chất gì và làm sao nhận ra nó.',
  objectives: [
    'Nhận biết hình thang, hình thang cân và các yếu tố của chúng.',
    'Giải thích được tính chất về góc kề một đáy, cạnh bên và đường chéo của hình thang cân.',
    'Nhận biết một hình thang là hình thang cân bằng dấu hiệu về góc hoặc về đường chéo.',
  ],
  sections: [
    {
      heading: 'Hình thang',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thang',
          text: 'Hình thang là tứ giác có hai cạnh đối song song.',
        },
        {
          type: 'p',
          text: 'Trong hình thang $ABCD$ với $AB \\parallel CD$: hai cạnh song song $AB$ và $CD$ là hai đáy (thường gọi $AB$ là đáy nhỏ, $CD$ là đáy lớn); hai cạnh $AD$ và $BC$ là hai cạnh bên. Đoạn vuông góc kẻ từ một điểm của đáy này đến đường thẳng chứa đáy kia gọi là một đường cao của hình thang.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Vì $AB \\parallel CD$ nên hai góc kề một cạnh bên là hai góc trong cùng phía, chúng bù nhau: $\\widehat{A} + \\widehat{D} = 180^\\circ$ và $\\widehat{B} + \\widehat{C} = 180^\\circ$. Hình thang có một góc vuông gọi là hình thang vuông.',
        },
      ],
    },
    {
      heading: 'Hình thang cân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thang cân',
          text: 'Hình thang cân là hình thang có hai góc kề một đáy bằng nhau.',
        },
        {
          type: 'p',
          text: 'Hình thang $ABCD$ ($AB \\parallel CD$) là hình thang cân khi $\\widehat{C} = \\widehat{D}$ (hoặc $\\widehat{A} = \\widehat{B}$).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Trong hình thang, nếu hai góc kề một đáy bằng nhau thì hai góc kề đáy kia cũng bằng nhau: từ $\\widehat{D} = \\widehat{C}$ suy ra $\\widehat{A} = 180^\\circ - \\widehat{D} = 180^\\circ - \\widehat{C} = \\widehat{B}$.',
        },
      ],
    },
    {
      heading: 'Tính chất của hình thang cân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1',
          text: 'Trong hình thang cân, hai cạnh bên bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2',
          text: 'Trong hình thang cân, hai đường chéo bằng nhau.',
        },
        {
          type: 'p',
          text: 'Giải thích Định lí 2 khi đã có Định lí 1: hai tam giác $ADC$ và $BCD$ có cạnh chung $DC$, $AD = BC$ và $\\widehat{ADC} = \\widehat{BCD}$, nên $\\triangle ADC = \\triangle BCD$ (c.g.c). Suy ra $AC = BD$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Một hình thang có hai cạnh bên bằng nhau chưa chắc là hình thang cân. Chẳng hạn, hình thang có hai cạnh bên song song và bằng nhau thì hai góc kề một đáy của nó thường không bằng nhau.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu nhận biết hình thang cân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 3',
          text: 'Nếu một hình thang có hai đường chéo bằng nhau thì đó là hình thang cân.',
        },
        {
          type: 'p',
          text: 'Định lí 3 là định lí đảo của Định lí 2: giả thiết của định lí này là kết luận của định lí kia. Như vậy, để chứng minh một tứ giác là hình thang cân, ta chứng minh nó là hình thang rồi chỉ ra một trong hai điều sau:',
        },
        {
          type: 'list',
          items: [
            'Hai góc kề một đáy bằng nhau (theo định nghĩa).',
            'Hai đường chéo bằng nhau (Định lí 3).',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Hình thang kéo được',
    instruction:
      'Kéo đỉnh $A$, $B$ của đáy nhỏ hoặc đỉnh $C$ của đáy lớn (đáy $AB$ luôn song song với $DC$). Tìm vị trí làm hai góc kề đáy $DC$ bằng nhau rồi so sánh hai cạnh bên và hai đường chéo. Nút "Làm thành hình thang cân" đưa $B$ về đúng vị trí đối xứng.',
  },
  examples: [
    {
      problem:
        'Cho hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{D} = 70^\\circ$. Tính các góc còn lại của hình thang.',
      steps: [
        'Hình thang cân có hai góc kề đáy $CD$ bằng nhau: $\\widehat{C} = \\widehat{D} = 70^\\circ$.',
        'Hai góc kề cạnh bên $AD$ bù nhau: $\\widehat{A} = 180^\\circ - \\widehat{D} = 110^\\circ$.',
        'Tương tự, $\\widehat{B} = 180^\\circ - \\widehat{C} = 110^\\circ$.',
      ],
      answer: '$\\widehat{A} = \\widehat{B} = 110^\\circ$, $\\widehat{C} = 70^\\circ$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ cân tại $A$. Trên các cạnh $AB$, $AC$ lấy lần lượt các điểm $M$, $N$ sao cho $AM = AN$. Chứng minh rằng $BMNC$ là hình thang cân.',
      steps: [
        'Tam giác $AMN$ cân tại $A$ nên $\\widehat{AMN} = \\dfrac{180^\\circ - \\widehat{A}}{2}$; tam giác $ABC$ cân tại $A$ nên $\\widehat{ABC} = \\dfrac{180^\\circ - \\widehat{A}}{2}$.',
        'Do đó $\\widehat{AMN} = \\widehat{ABC}$. Hai góc này ở vị trí đồng vị nên $MN \\parallel BC$, tức $BMNC$ là hình thang.',
        'Hình thang $BMNC$ có hai góc kề đáy $BC$ là $\\widehat{B} = \\widehat{C}$ (vì tam giác $ABC$ cân tại $A$).',
      ],
      answer: '$BMNC$ là hình thang cân.',
    },
    {
      problem:
        'Hình thang $ABCD$ ($AB \\parallel CD$) có hai đường chéo $AC = BD = 7$ cm và cạnh bên $AD = 4$ cm. Tính $BC$.',
      steps: [
        'Hình thang $ABCD$ có hai đường chéo bằng nhau nên là hình thang cân (Định lí 3).',
        'Trong hình thang cân, hai cạnh bên bằng nhau (Định lí 1): $BC = AD$.',
      ],
      answer: '$BC = 4$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{C} = 65^\\circ$. Tính $\\widehat{A}$ (đơn vị độ).',
      answer: 115,
      unit: '°',
      hints: [
        'Hai góc kề đáy $CD$ bằng nhau: $\\widehat{D} = \\widehat{C}$.',
        '$\\widehat{A}$ và $\\widehat{D}$ kề cạnh bên $AD$ nên bù nhau.',
      ],
      solution:
        '$\\widehat{D} = \\widehat{C} = 65^\\circ$, nên $\\widehat{A} = 180^\\circ - 65^\\circ = 115^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Hình thang cân là',
      options: [
        'hình thang có hai góc kề một đáy bằng nhau.',
        'hình thang có hai cạnh bên bằng nhau.',
        'tứ giác có hai đường chéo bằng nhau.',
        'tứ giác có hai góc đối bằng nhau.',
      ],
      answer: 0,
      hints: [
        'Nhớ lại định nghĩa trong bài. Cẩn thận: có hình thang có hai cạnh bên bằng nhau mà không cân.',
      ],
      solution:
        'Theo định nghĩa, hình thang cân là hình thang có hai góc kề một đáy bằng nhau. Hình thang có hai cạnh bên bằng nhau chưa chắc cân; tứ giác có hai đường chéo bằng nhau chưa chắc là hình thang.',
    },
    {
      type: 'multi',
      prompt:
        'Cho hình thang cân $ABCD$ ($AB \\parallel CD$). Chọn tất cả các khẳng định luôn đúng.',
      options: [
        '$AD = BC$',
        '$AC = BD$',
        '$\\widehat{A} = \\widehat{C}$',
        '$\\widehat{A} = \\widehat{B}$',
        '$\\widehat{A} + \\widehat{D} = 180^\\circ$',
        '$AB = CD$',
      ],
      answers: [0, 1, 3, 4],
      hints: [
        'Dùng Định lí 1, Định lí 2 và chú ý về góc kề đáy.',
        'Hai góc kề một cạnh bên của hình thang bù nhau.',
      ],
      solution:
        'Đúng: $AD = BC$ (Định lí 1), $AC = BD$ (Định lí 2), $\\widehat{A} = \\widehat{B}$ (hai góc kề đáy $AB$), $\\widehat{A} + \\widehat{D} = 180^\\circ$ (kề cạnh bên $AD$). Không luôn đúng: $\\widehat{A} = \\widehat{C}$ (khi hình thang cân không có góc vuông thì một góc tù, một góc nhọn) và $AB = CD$ (thường đáy nhỏ ngắn hơn đáy lớn).',
    },
    {
      type: 'number',
      prompt:
        'Hình thang $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} = 3\\widehat{D}$. Tính $\\widehat{D}$ (đơn vị độ).',
      answer: 45,
      unit: '°',
      hints: [
        '$\\widehat{A} + \\widehat{D} = 180^\\circ$ vì hai góc kề cạnh bên $AD$.',
        'Thay $\\widehat{A} = 3\\widehat{D}$: $4\\widehat{D} = 180^\\circ$.',
      ],
      solution:
        '$3\\widehat{D} + \\widehat{D} = 180^\\circ$, nên $\\widehat{D} = 45^\\circ$ (và $\\widehat{A} = 135^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ có đáy nhỏ $AB = 6$ cm, đáy lớn $CD = 14$ cm và cạnh bên $AD = 5$ cm. Tính chu vi của hình thang.',
      answer: 30,
      unit: 'cm',
      hints: ['Hai cạnh bên của hình thang cân bằng nhau: $BC = AD$.'],
      solution: '$BC = AD = 5$ cm. Chu vi bằng $6 + 14 + 5 + 5 = 30$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Tứ giác $ABCD$ có $AB \\parallel CD$ và hai đường chéo $AC = BD$. Tứ giác $ABCD$ là',
      options: [
        'hình thang cân.',
        'hình thang nhưng chưa chắc là hình thang cân.',
        'không phải hình thang.',
      ],
      answer: 0,
      hints: [
        'Có $AB \\parallel CD$ nên $ABCD$ là hình thang.',
        'Hình thang có hai đường chéo bằng nhau thì sao?',
      ],
      solution:
        'Vì $AB \\parallel CD$ nên $ABCD$ là hình thang; hình thang này có hai đường chéo bằng nhau nên là hình thang cân (Định lí 3).',
    },
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} - \\widehat{D} = 40^\\circ$. Tính $\\widehat{C}$ (đơn vị độ).',
      answer: 70,
      unit: '°',
      hints: [
        '$\\widehat{A} + \\widehat{D} = 180^\\circ$.',
        'Tìm $\\widehat{D}$ từ tổng và hiệu, rồi dùng $\\widehat{C} = \\widehat{D}$.',
      ],
      solution:
        '$\\widehat{D} = (180^\\circ - 40^\\circ) : 2 = 70^\\circ$. Hình thang cân có $\\widehat{C} = \\widehat{D} = 70^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Trên $AB$, $AC$ lấy $M$, $N$ sao cho $AM = AN$. Tính $\\widehat{BMN}$ (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: [
        'Tam giác $AMN$ cân tại $A$: $\\widehat{AMN} = (180^\\circ - 40^\\circ) : 2$.',
        '$\\widehat{BMN}$ kề bù với $\\widehat{AMN}$.',
      ],
      solution:
        '$\\widehat{AMN} = 70^\\circ$, nên $\\widehat{BMN} = 180^\\circ - 70^\\circ = 110^\\circ$. (Đó cũng là góc của hình thang cân $BMNC$ kề đáy $MN$: $\\widehat{B} = 70^\\circ$ và $70^\\circ + 110^\\circ = 180^\\circ$.)',
    },
  ],
  takeaways: [
    'Hình thang là tứ giác có hai cạnh đối song song; hai góc kề một cạnh bên bù nhau.',
    'Hình thang cân là hình thang có hai góc kề một đáy bằng nhau; khi đó hai góc kề đáy kia cũng bằng nhau.',
    'Trong hình thang cân: hai cạnh bên bằng nhau, hai đường chéo bằng nhau.',
    'Hình thang có hai đường chéo bằng nhau là hình thang cân. Hình thang có hai cạnh bên bằng nhau thì chưa chắc.',
  ],
};
