/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tứ giác, các đỉnh, cạnh, góc và đường chéo của tứ giác; tứ giác lồi; định lí tổng các góc của một tứ giác bằng 360 độ.',
  intro:
    'Mặt bàn, ô cửa sổ, mảnh ruộng, cánh diều đều gợi cho ta hình ảnh của tứ giác. Ở lớp 7, em đã biết tổng ba góc của một tam giác bằng $180^\\circ$. Còn bốn góc của một tứ giác thì sao? Bài này giới thiệu tứ giác, tứ giác lồi và trả lời câu hỏi đó.',
  objectives: [
    'Nhận biết tứ giác, các đỉnh, cạnh, góc, đường chéo; phân biệt hai đỉnh (cạnh) kề nhau và đối nhau.',
    'Nhận biết tứ giác lồi.',
    'Giải thích được định lí tổng các góc của một tứ giác bằng $360^\\circ$ và dùng nó để tính góc.',
  ],
  sections: [
    {
      heading: 'Tứ giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tứ giác',
          text: 'Tứ giác $ABCD$ là hình gồm bốn đoạn thẳng $AB$, $BC$, $CD$, $DA$, trong đó không có hai đoạn thẳng nào cùng nằm trên một đường thẳng.',
        },
        {
          type: 'p',
          text: 'Các điểm $A$, $B$, $C$, $D$ là các đỉnh; các đoạn thẳng $AB$, $BC$, $CD$, $DA$ là các cạnh của tứ giác. Khi gọi tên, ta đọc các đỉnh theo thứ tự đi vòng quanh tứ giác, nên tứ giác $ABCD$ cũng có thể gọi là $BCDA$, $CDAB$, $ADCB$, … nhưng không gọi là $ABDC$.',
        },
        {
          type: 'table',
          caption: 'Các yếu tố của tứ giác $ABCD$',
          head: ['Yếu tố', 'Trong tứ giác $ABCD$'],
          rows: [
            [
              'Hai đỉnh kề nhau (cùng thuộc một cạnh)',
              '$A$ và $B$, $B$ và $C$, $C$ và $D$, $D$ và $A$',
            ],
            ['Hai đỉnh đối nhau (không cùng thuộc một cạnh)', '$A$ và $C$, $B$ và $D$'],
            ['Hai cạnh kề nhau (có chung một đỉnh)', '$AB$ và $BC$, $BC$ và $CD$, …'],
            ['Hai cạnh đối nhau (không có đỉnh chung)', '$AB$ và $CD$, $AD$ và $BC$'],
            ['Đường chéo (nối hai đỉnh đối nhau)', '$AC$ và $BD$'],
            [
              'Góc',
              '$\\widehat{A} = \\widehat{DAB}$, $\\widehat{B} = \\widehat{ABC}$, $\\widehat{C} = \\widehat{BCD}$, $\\widehat{D} = \\widehat{CDA}$',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Tứ giác lồi',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tứ giác lồi',
          text: 'Tứ giác lồi là tứ giác mà hai đỉnh thuộc một cạnh bất kì luôn nằm về một phía của đường thẳng đi qua hai đỉnh còn lại.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, với tứ giác lồi $ABCD$: hai đỉnh $A$, $B$ nằm cùng phía đối với đường thẳng $CD$; hai đỉnh $B$, $C$ nằm cùng phía đối với đường thẳng $DA$; và tương tự với hai cạnh còn lại. Nếu có một cạnh mà đường thẳng chứa nó tách hai đỉnh còn lại về hai phía thì tứ giác không lồi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Từ nay, khi nói đến tứ giác mà không giải thích gì thêm, ta hiểu đó là tứ giác lồi.',
        },
      ],
    },
    {
      heading: 'Tổng các góc của một tứ giác',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Tổng các góc của một tứ giác bằng $360^\\circ$.',
        },
        {
          type: 'tex',
          tex: '\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^\\circ',
        },
        {
          type: 'p',
          text: 'Giải thích. Kẻ đường chéo $AC$. Đường chéo chia tứ giác $ABCD$ thành hai tam giác $ABC$ và $ACD$; nó cũng chia góc $A$ thành $\\widehat{BAC}$ và $\\widehat{CAD}$, chia góc $C$ thành $\\widehat{BCA}$ và $\\widehat{ACD}$. Trong mỗi tam giác, tổng ba góc bằng $180^\\circ$:',
        },
        {
          type: 'tex',
          tex: '\\widehat{BAC} + \\widehat{B} + \\widehat{BCA} = 180^\\circ, \\qquad \\widehat{CAD} + \\widehat{D} + \\widehat{ACD} = 180^\\circ',
        },
        {
          type: 'p',
          text: 'Cộng hai đẳng thức theo vế, ta được $\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 180^\\circ + 180^\\circ = 360^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Góc ngoài',
          text: 'Góc kề bù với một góc của tứ giác gọi là góc ngoài của tứ giác tại đỉnh đó. Góc ngoài tại đỉnh $D$ bằng $180^\\circ - \\widehat{D}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tứ giác kéo được',
    instruction:
      'Kéo bốn đỉnh $A$, $B$, $C$, $D$ (hoặc chọn một đỉnh rồi dùng phím mũi tên). Quan sát khi nào tứ giác không còn lồi. Với tứ giác lồi, chọn đường chéo $AC$ hoặc $BD$ để chia nó thành hai tam giác và xem vì sao tổng bốn góc luôn là $360^\\circ$.',
  },
  examples: [
    {
      problem:
        'Cho tứ giác $ABCD$ có $\\widehat{A} = 120^\\circ$, $\\widehat{B} = 80^\\circ$, $\\widehat{C} = 100^\\circ$. Tính $\\widehat{D}$.',
      steps: [
        'Theo định lí tổng các góc của tứ giác: $\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^\\circ$.',
        'Suy ra $\\widehat{D} = 360^\\circ - (120^\\circ + 80^\\circ + 100^\\circ) = 360^\\circ - 300^\\circ$.',
      ],
      answer: '$\\widehat{D} = 60^\\circ$.',
    },
    {
      problem:
        'Cho tứ giác $MNPQ$ có $MN \\perp NP$, $MQ \\perp QP$ và $\\widehat{P} = 120^\\circ$. Tính $\\widehat{M}$.',
      steps: [
        'Vì $MN \\perp NP$ nên $\\widehat{N} = 90^\\circ$; vì $MQ \\perp QP$ nên $\\widehat{Q} = 90^\\circ$.',
        'Trong tứ giác $MNPQ$: $\\widehat{M} = 360^\\circ - (\\widehat{N} + \\widehat{P} + \\widehat{Q}) = 360^\\circ - (90^\\circ + 120^\\circ + 90^\\circ)$.',
      ],
      answer: '$\\widehat{M} = 60^\\circ$.',
    },
    {
      problem:
        'Tứ giác $ABCD$ có các góc tỉ lệ với $1$, $2$, $3$, $4$, tức là $\\widehat{A} : \\widehat{B} : \\widehat{C} : \\widehat{D} = 1 : 2 : 3 : 4$. Tính các góc của tứ giác.',
      steps: [
        'Đặt $\\widehat{A} = x$, khi đó $\\widehat{B} = 2x$, $\\widehat{C} = 3x$, $\\widehat{D} = 4x$.',
        'Tổng các góc: $x + 2x + 3x + 4x = 360^\\circ$, tức là $10x = 360^\\circ$, nên $x = 36^\\circ$.',
      ],
      answer:
        '$\\widehat{A} = 36^\\circ$, $\\widehat{B} = 72^\\circ$, $\\widehat{C} = 108^\\circ$, $\\widehat{D} = 144^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} = 65^\\circ$, $\\widehat{B} = 110^\\circ$, $\\widehat{C} = 75^\\circ$. Tính số đo góc $D$ (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: [
        'Tổng bốn góc của tứ giác bằng $360^\\circ$.',
        'Lấy $360^\\circ$ trừ tổng ba góc đã biết.',
      ],
      solution:
        '$\\widehat{D} = 360^\\circ - (65^\\circ + 110^\\circ + 75^\\circ) = 360^\\circ - 250^\\circ = 110^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Trong tứ giác $ABCD$, cặp đỉnh nào là hai đỉnh đối nhau?',
      options: ['$A$ và $B$', '$A$ và $C$', '$B$ và $C$', '$D$ và $A$'],
      answer: 1,
      hints: ['Hai đỉnh đối nhau là hai đỉnh không cùng thuộc một cạnh nào.'],
      solution:
        'Các cạnh là $AB$, $BC$, $CD$, $DA$. Hai đỉnh $A$ và $C$ không cùng thuộc cạnh nào, nên chúng đối nhau.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đường chéo của tứ giác $MNPQ$.',
      options: ['$MN$', '$MP$', '$NP$', '$NQ$', '$PQ$'],
      answers: [1, 3],
      hints: ['Đường chéo nối hai đỉnh đối nhau.', 'Các cạnh là $MN$, $NP$, $PQ$, $QM$.'],
      solution:
        'Hai cặp đỉnh đối nhau là $M$, $P$ và $N$, $Q$, nên hai đường chéo là $MP$ và $NQ$. Các đoạn $MN$, $NP$, $PQ$ là cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Tứ giác $ABCD$ là tứ giác lồi khi nào?',
      options: [
        'Khi hai đỉnh thuộc một cạnh bất kì luôn nằm về một phía của đường thẳng đi qua hai đỉnh còn lại.',
        'Khi mỗi góc của nó đều nhỏ hơn $90^\\circ$.',
        'Khi hai đường chéo của nó bằng nhau.',
        'Khi bốn cạnh của nó bằng nhau.',
      ],
      answer: 0,
      hints: ['Nhớ lại định nghĩa: xét đường thẳng đi qua hai đỉnh của một cạnh.'],
      solution:
        'Theo định nghĩa, tứ giác lồi là tứ giác mà hai đỉnh thuộc một cạnh bất kì luôn nằm về một phía của đường thẳng đi qua hai đỉnh còn lại. Các điều kiện kia không phải định nghĩa (một tứ giác lồi có thể có góc tù, hai đường chéo khác nhau, các cạnh khác nhau).',
    },
    {
      type: 'number',
      prompt: 'Một tứ giác có ba góc vuông. Góc còn lại bằng bao nhiêu độ?',
      answer: 90,
      unit: '°',
      hints: ['Ba góc vuông có tổng $3 \\cdot 90^\\circ = 270^\\circ$.'],
      solution: 'Góc còn lại bằng $360^\\circ - 270^\\circ = 90^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} = \\widehat{B}$, $\\widehat{C} = 100^\\circ$, $\\widehat{D} = 60^\\circ$. Tính $\\widehat{A}$ (đơn vị độ).',
      answer: 100,
      unit: '°',
      hints: [
        '$\\widehat{A} + \\widehat{B} = 360^\\circ - (\\widehat{C} + \\widehat{D})$.',
        'Hai góc $A$, $B$ bằng nhau nên mỗi góc bằng một nửa tổng đó.',
      ],
      solution:
        '$\\widehat{A} + \\widehat{B} = 360^\\circ - 160^\\circ = 200^\\circ$. Vì $\\widehat{A} = \\widehat{B}$ nên $\\widehat{A} = 200^\\circ : 2 = 100^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} = 75^\\circ$, $\\widehat{B} = 90^\\circ$, $\\widehat{C} = 120^\\circ$. Góc ngoài của tứ giác tại đỉnh $D$ bằng bao nhiêu độ?',
      answer: 105,
      unit: '°',
      hints: ['Tính $\\widehat{D}$ trước.', 'Góc ngoài tại $D$ kề bù với $\\widehat{D}$.'],
      solution:
        '$\\widehat{D} = 360^\\circ - (75^\\circ + 90^\\circ + 120^\\circ) = 75^\\circ$. Góc ngoài tại $D$ bằng $180^\\circ - 75^\\circ = 105^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Một tứ giác có thể có cả bốn góc đều là góc nhọn không?',
      options: [
        'Có thể.',
        'Không, vì tổng bốn góc nhọn nhỏ hơn $360^\\circ$.',
        'Không, vì tổng bốn góc nhọn lớn hơn $360^\\circ$.',
      ],
      answer: 1,
      hints: ['Mỗi góc nhọn nhỏ hơn $90^\\circ$. Bốn góc như vậy có tổng tối đa là bao nhiêu?'],
      solution:
        'Nếu cả bốn góc đều nhọn thì tổng của chúng nhỏ hơn $4 \\cdot 90^\\circ = 360^\\circ$, trái với định lí tổng các góc. Vậy không có tứ giác nào có bốn góc nhọn.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} : \\widehat{B} : \\widehat{C} : \\widehat{D} = 2 : 3 : 3 : 4$. Tính $\\widehat{D}$ (đơn vị độ).',
      answer: 120,
      unit: '°',
      hints: [
        'Đặt $\\widehat{A} = 2x$, $\\widehat{B} = 3x$, $\\widehat{C} = 3x$, $\\widehat{D} = 4x$.',
        'Tổng $12x = 360^\\circ$.',
      ],
      solution:
        '$2x + 3x + 3x + 4x = 12x = 360^\\circ$, nên $x = 30^\\circ$ và $\\widehat{D} = 4x = 120^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} + \\widehat{B} = 140^\\circ$ và $\\widehat{C} - \\widehat{D} = 40^\\circ$. Tính $\\widehat{C}$ (đơn vị độ).',
      answer: 130,
      unit: '°',
      hints: [
        'Từ định lí tổng các góc: $\\widehat{C} + \\widehat{D} = 360^\\circ - 140^\\circ = 220^\\circ$.',
        'Biết tổng và hiệu của $\\widehat{C}$ và $\\widehat{D}$.',
      ],
      solution:
        '$\\widehat{C} + \\widehat{D} = 220^\\circ$ và $\\widehat{C} - \\widehat{D} = 40^\\circ$, nên $\\widehat{C} = (220^\\circ + 40^\\circ) : 2 = 130^\\circ$ (và $\\widehat{D} = 90^\\circ$).',
    },
  ],
  takeaways: [
    'Tứ giác $ABCD$ gồm bốn đoạn thẳng $AB$, $BC$, $CD$, $DA$, không có hai đoạn nào cùng nằm trên một đường thẳng; hai đường chéo là $AC$ và $BD$.',
    'Tứ giác lồi: hai đỉnh thuộc một cạnh bất kì luôn nằm về một phía của đường thẳng đi qua hai đỉnh còn lại. Nói "tứ giác" mà không giải thích thêm là nói tứ giác lồi.',
    'Tổng các góc của một tứ giác bằng $360^\\circ$: kẻ một đường chéo để chia tứ giác thành hai tam giác.',
    'Góc ngoài tại một đỉnh bằng $180^\\circ$ trừ góc của tứ giác tại đỉnh đó.',
  ],
};
