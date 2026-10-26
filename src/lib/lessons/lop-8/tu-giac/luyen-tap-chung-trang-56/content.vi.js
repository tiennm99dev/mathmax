/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố tứ giác, tổng các góc của tứ giác, hình thang, hình thang cân và các dấu hiệu nhận biết hình thang cân.',
  intro:
    'Hai bài vừa qua cho em định lí tổng các góc của tứ giác và các tính chất của hình thang cân. Bài luyện tập này giúp em phối hợp chúng: tính góc, tính độ dài và chứng minh một tứ giác là hình thang cân.',
  objectives: [
    'Tính góc của tứ giác bằng định lí tổng các góc, kể cả góc ngoài.',
    'Dùng tính chất góc, cạnh bên, đường chéo của hình thang cân để tính toán.',
    'Chứng minh một tứ giác là hình thang cân.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Điều cần nhớ'],
          rows: [
            [
              'Tứ giác $ABCD$',
              '$\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^\\circ$; góc ngoài tại một đỉnh bằng $180^\\circ$ trừ góc tại đỉnh đó.',
            ],
            [
              'Hình thang $ABCD$ ($AB \\parallel CD$)',
              '$\\widehat{A} + \\widehat{D} = 180^\\circ$, $\\widehat{B} + \\widehat{C} = 180^\\circ$.',
            ],
            [
              'Hình thang cân $ABCD$ ($AB \\parallel CD$)',
              '$\\widehat{C} = \\widehat{D}$, $\\widehat{A} = \\widehat{B}$; $AD = BC$; $AC = BD$.',
            ],
            [
              'Nhận biết hình thang cân',
              'Hình thang có hai góc kề một đáy bằng nhau, hoặc có hai đường chéo bằng nhau.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, trộn đều từ Bài 10 và Bài 11. Số đo góc tính bằng độ; độ dài viết dấu phẩy thập phân, ví dụ $7{,}5$.',
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
        'Tứ giác $ABCD$ có $AB = AD$, $CB = CD$, $\\widehat{A} = 110^\\circ$ và $\\widehat{C} = 60^\\circ$. Tính $\\widehat{B}$ và $\\widehat{D}$.',
      steps: [
        'Hai tam giác $ABC$ và $ADC$ có $AB = AD$, $CB = CD$ và cạnh chung $AC$, nên $\\triangle ABC = \\triangle ADC$ (c.c.c). Suy ra $\\widehat{B} = \\widehat{D}$.',
        'Theo định lí tổng các góc: $\\widehat{B} + \\widehat{D} = 360^\\circ - (110^\\circ + 60^\\circ) = 190^\\circ$.',
        'Do đó $\\widehat{B} = \\widehat{D} = 190^\\circ : 2$.',
      ],
      answer: '$\\widehat{B} = \\widehat{D} = 95^\\circ$.',
    },
    {
      problem:
        'Cho hình thang cân $ABCD$ ($AB \\parallel CD$), hai đường chéo cắt nhau tại $O$. Chứng minh rằng $OC = OD$ và $OA = OB$.',
      steps: [
        'Hai tam giác $ADC$ và $BCD$ có $AD = BC$ (hai cạnh bên của hình thang cân), $\\widehat{ADC} = \\widehat{BCD}$ (hai góc kề đáy $CD$) và cạnh chung $DC$, nên $\\triangle ADC = \\triangle BCD$ (c.g.c).',
        'Suy ra $\\widehat{ACD} = \\widehat{BDC}$, tức là tam giác $OCD$ có hai góc ở đáy bằng nhau, nên cân tại $O$: $OC = OD$.',
        'Hai đường chéo bằng nhau: $AC = BD$. Do đó $OA = AC - OC = BD - OD = OB$.',
      ],
      answer: '$OC = OD$ và $OA = OB$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} = 70^\\circ$, $\\widehat{B} = 130^\\circ$ và $\\widehat{C} = \\widehat{D}$. Tính $\\widehat{C}$ (đơn vị độ).',
      answer: 80,
      unit: '°',
      hints: ['$\\widehat{C} + \\widehat{D} = 360^\\circ - (\\widehat{A} + \\widehat{B})$.'],
      solution:
        '$\\widehat{C} + \\widehat{D} = 360^\\circ - 200^\\circ = 160^\\circ$, nên $\\widehat{C} = 160^\\circ : 2 = 80^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Góc ngoài của tứ giác $ABCD$ tại các đỉnh $A$, $B$, $C$ lần lượt bằng $110^\\circ$, $70^\\circ$, $100^\\circ$. Tính góc ngoài tại đỉnh $D$ (đơn vị độ).',
      answer: 80,
      unit: '°',
      hints: [
        'Tính các góc của tứ giác tại $A$, $B$, $C$: mỗi góc kề bù với góc ngoài tương ứng.',
        'Tìm $\\widehat{D}$ rồi lấy $180^\\circ - \\widehat{D}$.',
      ],
      solution:
        '$\\widehat{A} = 70^\\circ$, $\\widehat{B} = 110^\\circ$, $\\widehat{C} = 80^\\circ$, nên $\\widehat{D} = 360^\\circ - 260^\\circ = 100^\\circ$. Góc ngoài tại $D$ bằng $180^\\circ - 100^\\circ = 80^\\circ$. (Để ý: tổng bốn góc ngoài cũng bằng $360^\\circ$.)',
    },
    {
      type: 'choice',
      prompt: 'Một tứ giác có nhiều nhất bao nhiêu góc tù?',
      options: ['$1$', '$2$', '$3$', '$4$'],
      answer: 2,
      hints: [
        'Bốn góc tù có tổng lớn hơn $360^\\circ$.',
        'Thử tìm một tứ giác có ba góc tù, chẳng hạn $100^\\circ$, $100^\\circ$, $100^\\circ$.',
      ],
      solution:
        'Bốn góc tù có tổng lớn hơn $4 \\cdot 90^\\circ = 360^\\circ$, nên không thể. Tứ giác có các góc $100^\\circ$, $100^\\circ$, $100^\\circ$, $60^\\circ$ có ba góc tù. Vậy nhiều nhất là $3$ góc tù.',
    },
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} = 120^\\circ$. Tính $\\widehat{D}$ (đơn vị độ).',
      answer: 60,
      unit: '°',
      hints: ['$\\widehat{A}$ và $\\widehat{D}$ là hai góc kề cạnh bên $AD$.'],
      solution:
        'Hai góc kề một cạnh bên của hình thang bù nhau: $\\widehat{D} = 180^\\circ - 120^\\circ = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $AB = 7$ cm, cạnh bên $AD = 5$ cm và chu vi $32$ cm. Tính $CD$.',
      answer: 15,
      unit: 'cm',
      hints: ['Hai cạnh bên bằng nhau: $BC = AD$.', 'Lấy chu vi trừ ba cạnh đã biết.'],
      solution: '$BC = AD = 5$ cm, nên $CD = 32 - (7 + 5 + 5) = 15$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Hình thang $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} = \\widehat{B} = 105^\\circ$. Hình thang này có phải hình thang cân không?',
      options: [
        'Có, vì hai góc kề đáy $AB$ bằng nhau.',
        'Không, vì hai góc kề đáy lớn $CD$ chưa cho biết.',
        'Không, vì hai góc đó là góc tù.',
      ],
      answer: 0,
      hints: [
        'Định nghĩa: hình thang cân là hình thang có hai góc kề một đáy bằng nhau. Một đáy bất kì.',
      ],
      solution:
        'Hai góc kề đáy $AB$ là $\\widehat{A}$ và $\\widehat{B}$, chúng bằng nhau nên $ABCD$ là hình thang cân. Khi đó $\\widehat{C} = \\widehat{D} = 75^\\circ$.',
    },
    {
      type: 'multi',
      prompt:
        'Hình thang $ABCD$ có $AB \\parallel CD$. Điều kiện nào dưới đây đủ để khẳng định $ABCD$ là hình thang cân? Chọn tất cả.',
      options: [
        '$\\widehat{C} = \\widehat{D}$',
        '$AC = BD$',
        '$AD = BC$',
        '$\\widehat{A} = \\widehat{C}$',
        '$\\widehat{A} = \\widehat{B}$',
      ],
      answers: [0, 1, 4],
      hints: [
        'Có hai cách: góc kề một đáy, hoặc hai đường chéo.',
        'Hai cạnh bên bằng nhau thì chưa đủ.',
      ],
      solution:
        '$\\widehat{C} = \\widehat{D}$ và $\\widehat{A} = \\widehat{B}$ là hai góc kề một đáy bằng nhau (định nghĩa); $AC = BD$ là Định lí 3. Hình thang có $AD = BC$ chưa chắc cân. Với $\\widehat{A} = \\widehat{C}$: vì $\\widehat{A} + \\widehat{D} = 180^\\circ$ nên $\\widehat{C} + \\widehat{D} = 180^\\circ$, tức là $AD \\parallel BC$; hình như vậy thường không cân.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 50^\\circ$. Trên $AB$, $AC$ lấy $M$, $N$ sao cho $AM = AN$. Tính $\\widehat{MNC}$ (đơn vị độ).',
      answer: 115,
      unit: '°',
      hints: [
        'Tam giác $AMN$ cân tại $A$: $\\widehat{ANM} = (180^\\circ - 50^\\circ) : 2$.',
        '$\\widehat{MNC}$ kề bù với $\\widehat{ANM}$.',
      ],
      solution:
        '$\\widehat{ANM} = 130^\\circ : 2 = 65^\\circ$, nên $\\widehat{MNC} = 180^\\circ - 65^\\circ = 115^\\circ$. $BMNC$ là hình thang cân với $\\widehat{C} = 65^\\circ$, và $65^\\circ + 115^\\circ = 180^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $AB = BC$, $CD = DA$ (một cánh diều), $\\widehat{B} = 100^\\circ$ và $\\widehat{D} = 70^\\circ$. Tính $\\widehat{A}$ (đơn vị độ).',
      answer: 95,
      unit: '°',
      hints: [
        '$\\triangle ABD = \\triangle CBD$ (c.c.c), nên $\\widehat{A} = \\widehat{C}$.',
        '$\\widehat{A} + \\widehat{C} = 360^\\circ - (100^\\circ + 70^\\circ)$.',
      ],
      solution:
        'Vì $\\triangle ABD = \\triangle CBD$ (c.c.c) nên $\\widehat{A} = \\widehat{C}$. Ta có $\\widehat{A} + \\widehat{C} = 190^\\circ$, nên $\\widehat{A} = 95^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thang $ABCD$ ($AB \\parallel CD$) có $\\widehat{B} = 2\\widehat{C}$. Tính $\\widehat{C}$ (đơn vị độ).',
      answer: 60,
      unit: '°',
      hints: ['$\\widehat{B}$ và $\\widehat{C}$ kề cạnh bên $BC$ nên bù nhau.'],
      solution:
        '$2\\widehat{C} + \\widehat{C} = 180^\\circ$, nên $\\widehat{C} = 60^\\circ$ (và $\\widehat{B} = 120^\\circ$).',
    },
    {
      type: 'choice',
      prompt:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có hai đường chéo cắt nhau tại $O$. Tam giác $OCD$ là tam giác gì?',
      options: [
        'Tam giác cân tại $O$',
        'Tam giác đều',
        'Tam giác vuông tại $O$',
        'Không có gì đặc biệt',
      ],
      answer: 0,
      hints: ['Xem lại ví dụ thứ hai: so sánh $\\widehat{ACD}$ và $\\widehat{BDC}$.'],
      solution:
        '$\\triangle ADC = \\triangle BCD$ (c.g.c) nên $\\widehat{ACD} = \\widehat{BDC}$: tam giác $OCD$ cân tại $O$. Nó chỉ đều hoặc vuông trong những trường hợp riêng.',
    },
  ],
  takeaways: [
    'Tổng bốn góc của tứ giác bằng $360^\\circ$; tổng bốn góc ngoài cũng bằng $360^\\circ$.',
    'Trong hình thang, hai góc kề một cạnh bên bù nhau.',
    'Hình thang cân: hai góc kề một đáy bằng nhau, hai cạnh bên bằng nhau, hai đường chéo bằng nhau.',
    'Chứng minh hình thang cân: chỉ ra nó là hình thang, rồi hai góc kề một đáy bằng nhau hoặc hai đường chéo bằng nhau.',
  ],
};
