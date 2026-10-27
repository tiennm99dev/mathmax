/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tứ giác nội tiếp có bốn đỉnh nằm trên một đường tròn; trong tứ giác nội tiếp tổng hai góc đối bằng 180°, và ngược lại tứ giác có tổng hai góc đối bằng 180° thì nội tiếp được đường tròn.',
  intro:
    'Qua ba điểm không thẳng hàng luôn vẽ được một đường tròn. Nhưng với bốn điểm thì không phải lúc nào cũng vậy. Khi nào bốn đỉnh của một tứ giác cùng nằm trên một đường tròn? Câu trả lời nằm ở các góc đối của tứ giác.',
  objectives: [
    'Nhận biết tứ giác nội tiếp đường tròn.',
    'Chứng minh và vận dụng: trong tứ giác nội tiếp, tổng hai góc đối bằng $180^\\circ$.',
    'Dùng dấu hiệu tổng hai góc đối bằng $180^\\circ$ để chứng minh một tứ giác nội tiếp; nhận biết hình chữ nhật, hình vuông là tứ giác nội tiếp.',
  ],
  sections: [
    {
      heading: 'Tứ giác nội tiếp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Tứ giác có bốn đỉnh nằm trên một đường tròn gọi là tứ giác nội tiếp đường tròn (gọi tắt là tứ giác nội tiếp). Đường tròn đó gọi là đường tròn ngoại tiếp tứ giác.',
        },
        {
          type: 'p',
          text: 'Ví dụ: nếu $A$, $B$, $C$, $D$ nằm trên đường tròn $(O)$ theo thứ tự đó thì $ABCD$ là tứ giác nội tiếp $(O)$. Nếu $D$ nằm trong hoặc nằm ngoài đường tròn đi qua $A$, $B$, $C$ thì $ABCD$ không nội tiếp.',
        },
      ],
    },
    {
      heading: 'Tổng hai góc đối của tứ giác nội tiếp',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong một tứ giác nội tiếp, tổng số đo hai góc đối nhau bằng $180^\\circ$: $$\\widehat{A} + \\widehat{C} = 180^\\circ, \\quad \\widehat{B} + \\widehat{D} = 180^\\circ.$$',
        },
        {
          type: 'p',
          text: 'Chứng minh. $\\widehat{BAD}$ là góc nội tiếp chắn cung $BCD$, $\\widehat{BCD}$ là góc nội tiếp chắn cung $BAD$. Hai cung này hợp thành cả đường tròn, nên',
        },
        {
          type: 'tex',
          tex: '\\widehat{BAD} + \\widehat{BCD} = \\frac{1}{2}\\left(\\text{sđ}\\,\\overset{\\frown}{BCD} + \\text{sđ}\\,\\overset{\\frown}{BAD}\\right) = \\frac{1}{2} \\cdot 360^\\circ = 180^\\circ.',
        },
        {
          type: 'p',
          text: 'Vì tổng bốn góc của tứ giác bằng $360^\\circ$, cặp góc đối còn lại cũng có tổng $180^\\circ$.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu nhận biết tứ giác nội tiếp',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí đảo',
          text: 'Nếu một tứ giác có tổng số đo hai góc đối nhau bằng $180^\\circ$ thì tứ giác đó nội tiếp được đường tròn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hình chữ nhật, hình vuông',
          text: 'Hình chữ nhật và hình vuông có bốn góc vuông, nên tổng hai góc đối bằng $90^\\circ + 90^\\circ = 180^\\circ$: chúng là tứ giác nội tiếp. Tâm đường tròn ngoại tiếp là giao điểm hai đường chéo, bán kính bằng nửa đường chéo. Hình vuông cạnh $a$ có $R = \\dfrac{a\\sqrt{2}}{2}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Điều kiện là tổng hai góc đối, không phải hai góc kề một cạnh. Mọi hình bình hành đều có hai góc kề bù nhau, nhưng hình bình hành chỉ nội tiếp khi nó là hình chữ nhật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo bốn đỉnh của tứ giác',
    instruction:
      'Kéo các đỉnh (hoặc chọn một đỉnh rồi dùng phím mũi tên) và theo dõi tổng hai góc đối. Khi $D$ chạm đường tròn nét đứt đi qua $A$, $B$, $C$, tổng $\\widehat{A} + \\widehat{C}$ đúng bằng $180^\\circ$ và đường tròn chuyển sang màu xanh.',
  },
  examples: [
    {
      problem:
        'Tứ giác $ABCD$ nội tiếp đường tròn có $\\widehat{A} = 75^\\circ$, $\\widehat{B} = 110^\\circ$. Tính $\\widehat{C}$ và $\\widehat{D}$.',
      steps: [
        '$ABCD$ nội tiếp nên $\\widehat{A} + \\widehat{C} = 180^\\circ$, suy ra $\\widehat{C} = 180^\\circ - 75^\\circ = 105^\\circ$.',
        'Tương tự $\\widehat{B} + \\widehat{D} = 180^\\circ$, suy ra $\\widehat{D} = 180^\\circ - 110^\\circ = 70^\\circ$.',
        'Kiểm tra: $75^\\circ + 110^\\circ + 105^\\circ + 70^\\circ = 360^\\circ$.',
      ],
      answer: '$\\widehat{C} = 105^\\circ$, $\\widehat{D} = 70^\\circ$.',
    },
    {
      problem:
        'Cho tam giác nhọn $ABC$ có hai đường cao $BD$ và $CE$ cắt nhau tại $H$. Chứng minh tứ giác $ADHE$ nội tiếp.',
      steps: [
        '$BD \\perp AC$ tại $D$ nên $\\widehat{ADH} = 90^\\circ$.',
        '$CE \\perp AB$ tại $E$ nên $\\widehat{AEH} = 90^\\circ$.',
        'Hai góc này là hai góc đối của tứ giác $ADHE$ và $\\widehat{ADH} + \\widehat{AEH} = 180^\\circ$.',
      ],
      answer: 'Theo dấu hiệu nhận biết, tứ giác $ADHE$ nội tiếp (đường tròn có đường kính $AH$).',
    },
    {
      problem:
        'Hình chữ nhật $ABCD$ có $AB = 5$ cm, $BC = 12$ cm. Tính bán kính đường tròn ngoại tiếp hình chữ nhật.',
      steps: [
        'Hình chữ nhật là tứ giác nội tiếp; tâm đường tròn là giao điểm $O$ của hai đường chéo.',
        '$AC^2 = AB^2 + BC^2 = 25 + 144 = 169$, nên $AC = 13$ cm.',
        '$R = OA = \\dfrac{AC}{2}$.',
      ],
      answer: '$R = 6{,}5$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tứ giác $ABCD$ nội tiếp có $\\widehat{B} = 64^\\circ$. Tính $\\widehat{D}$.',
      answer: 116,
      unit: '°',
      hints: ['$\\widehat{B}$ và $\\widehat{D}$ là hai góc đối nhau.'],
      solution: '$\\widehat{D} = 180^\\circ - 64^\\circ = 116^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Tứ giác nào sau đây không nội tiếp được đường tròn?',
      options: [
        'Hình chữ nhật',
        'Hình vuông',
        'Hình thang cân',
        'Hình bình hành có một góc bằng $60^\\circ$',
      ],
      answer: 3,
      hints: ['Kiểm tra tổng hai góc đối của từng hình.'],
      solution:
        'Hình bình hành có góc $60^\\circ$ thì góc đối diện cũng bằng $60^\\circ$, tổng $120^\\circ \\ne 180^\\circ$, nên không nội tiếp. Hình chữ nhật, hình vuông có tổng hai góc đối $180^\\circ$; hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} + \\widehat{D} = 180^\\circ$ và $\\widehat{C} = \\widehat{D}$ nên $\\widehat{A} + \\widehat{C} = 180^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tính bán kính đường tròn ngoại tiếp hình vuông cạnh $4$ cm (làm tròn đến hàng phần trăm).',
      answer: 2.83,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['Bán kính bằng nửa đường chéo.', 'Đường chéo hình vuông cạnh $a$ bằng $a\\sqrt{2}$.'],
      solution: '$R = \\dfrac{4\\sqrt{2}}{2} = 2\\sqrt{2} \\approx 2{,}83$ cm.',
    },
    {
      type: 'number',
      prompt: 'Tứ giác $ABCD$ nội tiếp có $\\widehat{A} = 2\\widehat{C}$. Tính $\\widehat{A}$.',
      answer: 120,
      unit: '°',
      hints: ['$\\widehat{A} + \\widehat{C} = 180^\\circ$; thay $\\widehat{A} = 2\\widehat{C}$.'],
      solution:
        '$2\\widehat{C} + \\widehat{C} = 180^\\circ$ nên $\\widehat{C} = 60^\\circ$ và $\\widehat{A} = 120^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Với các số đo góc dưới đây, tứ giác $ABCD$ nào chắc chắn nội tiếp?',
      options: [
        '$\\widehat{A} = 100^\\circ$, $\\widehat{C} = 80^\\circ$',
        '$\\widehat{B} = 95^\\circ$, $\\widehat{D} = 95^\\circ$',
        '$\\widehat{A} = \\widehat{B} = \\widehat{C} = \\widehat{D} = 90^\\circ$',
        '$\\widehat{A} = 70^\\circ$, $\\widehat{B} = 110^\\circ$',
      ],
      answers: [0, 2],
      hints: [
        'Chỉ xét tổng của hai góc đối nhau: $\\widehat{A}$ với $\\widehat{C}$, $\\widehat{B}$ với $\\widehat{D}$.',
      ],
      solution:
        'Phương án 1: $100^\\circ + 80^\\circ = 180^\\circ$, nội tiếp. Phương án 3: hình chữ nhật, nội tiếp. Phương án 2: $95^\\circ + 95^\\circ = 190^\\circ$, không nội tiếp. Phương án 4: $\\widehat{A}$ và $\\widehat{B}$ là hai góc kề, chưa đủ để kết luận.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác nhọn $ABC$ có $\\widehat{BAC} = 50^\\circ$, hai đường cao $BD$ và $CE$ cắt nhau tại $H$. Tính $\\widehat{DHE}$.',
      answer: 130,
      unit: '°',
      hints: [
        'Tứ giác $ADHE$ có hai góc vuông đối nhau tại $D$ và $E$.',
        'Trong tứ giác nội tiếp $ADHE$, góc $\\widehat{DHE}$ đối với góc $\\widehat{A}$.',
      ],
      solution:
        '$\\widehat{ADH} + \\widehat{AEH} = 90^\\circ + 90^\\circ = 180^\\circ$ nên $ADHE$ nội tiếp. Do đó $\\widehat{DHE} = 180^\\circ - \\widehat{DAE} = 180^\\circ - 50^\\circ = 130^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ nội tiếp có $\\widehat{BAD} = 82^\\circ$. Tia $Cx$ là tia đối của tia $CD$. Tính $\\widehat{BCx}$.',
      answer: 82,
      unit: '°',
      hints: [
        'Tính $\\widehat{BCD}$ trước.',
        '$\\widehat{BCx}$ và $\\widehat{BCD}$ là hai góc kề bù.',
      ],
      solution:
        '$\\widehat{BCD} = 180^\\circ - 82^\\circ = 98^\\circ$, nên $\\widehat{BCx} = 180^\\circ - 98^\\circ = 82^\\circ$. Góc ngoài tại một đỉnh của tứ giác nội tiếp bằng góc trong ở đỉnh đối diện.',
    },
  ],
  takeaways: [
    'Tứ giác nội tiếp là tứ giác có bốn đỉnh nằm trên một đường tròn.',
    'Trong tứ giác nội tiếp, tổng hai góc đối bằng $180^\\circ$.',
    'Tứ giác có tổng hai góc đối bằng $180^\\circ$ thì nội tiếp được đường tròn.',
    'Hình chữ nhật, hình vuông nội tiếp đường tròn có tâm là giao điểm hai đường chéo, bán kính bằng nửa đường chéo.',
  ],
};
