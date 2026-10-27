/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dây và đường kính của đường tròn, đường kính là dây lớn nhất; góc ở tâm, cung nhỏ, cung lớn, cung bị chắn và số đo của một cung.',
  intro:
    'Trên mặt đồng hồ, hai kim luôn xuất phát từ tâm. Chúng tạo thành một góc và chia vành đồng hồ thành hai phần: một cung nhỏ và một cung lớn. Bài này gọi tên những đoạn thẳng và những phần đường tròn như vậy, và cho biết cách đo một cung bằng độ.',
  objectives: [
    'Nhận biết dây, đường kính của đường tròn; biết đường kính là dây lớn nhất.',
    'Nhận biết góc ở tâm, cung nhỏ, cung lớn, cung bị chắn.',
    'Tính số đo của cung nhỏ, cung lớn, nửa đường tròn từ số đo góc ở tâm.',
  ],
  sections: [
    {
      heading: 'Dây và đường kính của đường tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dây và đường kính',
          text: 'Đoạn thẳng nối hai điểm phân biệt thuộc một đường tròn gọi là một dây (hay dây cung) của đường tròn đó. Dây đi qua tâm gọi là đường kính.',
        },
        {
          type: 'p',
          text: 'Đường kính của đường tròn $(O; R)$ có độ dài $2R$; tâm $O$ là trung điểm của mỗi đường kính.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong một đường tròn, đường kính là dây lớn nhất.',
        },
        {
          type: 'p',
          text: 'Chứng minh. Xét dây $AB$ bất kì của đường tròn $(O; R)$. Nếu $AB$ đi qua $O$ thì $AB = 2R$. Nếu $AB$ không đi qua $O$ thì trong tam giác $OAB$, theo bất đẳng thức tam giác, $AB < OA + OB = R + R = 2R$. Vậy luôn có $AB \\le 2R$.',
        },
      ],
    },
    {
      heading: 'Góc ở tâm, cung và số đo của một cung',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc ở tâm',
          text: 'Góc có đỉnh trùng với tâm của đường tròn được gọi là góc ở tâm.',
        },
        {
          type: 'p',
          text: 'Hai điểm $A$, $B$ trên đường tròn chia đường tròn thành hai cung. Cung có hai mút $A$, $B$ kí hiệu là $\\overset\\frown{AB}$. Với góc ở tâm $\\widehat{AOB} = \\alpha$ ($0^\\circ < \\alpha < 180^\\circ$): cung nằm bên trong góc gọi là cung nhỏ, cung còn lại gọi là cung lớn. Khi $\\alpha = 180^\\circ$, $AB$ là đường kính và mỗi cung là một nửa đường tròn.',
        },
        {
          type: 'p',
          text: 'Cung nằm bên trong góc ở tâm $\\widehat{AOB}$ gọi là cung bị chắn bởi góc đó; ta cũng nói góc $\\widehat{AOB}$ chắn cung nhỏ $AB$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số đo của một cung',
          text: 'Số đo của cung nhỏ bằng số đo của góc ở tâm chắn cung đó. Số đo của nửa đường tròn bằng $180^\\circ$. Số đo của cung lớn bằng $360^\\circ$ trừ đi số đo của cung nhỏ có chung hai mút.',
        },
        {
          type: 'tex',
          tex: '\\text{sđ}\\,\\overset\\frown{AB}_{\\text{nhỏ}} = \\widehat{AOB}, \\qquad \\text{sđ}\\,\\overset\\frown{AB}_{\\text{lớn}} = 360^\\circ - \\widehat{AOB}.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Hai cung trên một đường tròn (hay trên hai đường tròn bằng nhau) gọi là bằng nhau nếu chúng có cùng số đo. Nếu điểm $C$ nằm trên cung $AB$ thì $\\text{sđ}\\,\\overset\\frown{AB} = \\text{sđ}\\,\\overset\\frown{AC} + \\text{sđ}\\,\\overset\\frown{CB}$. Cả đường tròn có số đo $360^\\circ$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dây, góc ở tâm và hai cung',
    instruction:
      'Kéo hai đầu $A$, $B$ của dây trên đường tròn bán kính $4$ cm. Theo dõi góc ở tâm $\\widehat{AOB}$, số đo cung nhỏ (đỏ), cung lớn (xanh) và độ dài dây $AB$. Dây dài nhất khi nào?',
  },
  examples: [
    {
      problem:
        'Cho đường tròn $(O; R)$ và dây $AB = R$. Tính số đo góc $\\widehat{AOB}$, số đo cung nhỏ $AB$ và cung lớn $AB$.',
      steps: [
        '$OA = OB = R$ và $AB = R$ nên tam giác $OAB$ đều, suy ra $\\widehat{AOB} = 60^\\circ$.',
        'Cung nhỏ $AB$ bị chắn bởi góc ở tâm $\\widehat{AOB}$, nên $\\text{sđ}\\,\\overset\\frown{AB}_{\\text{nhỏ}} = 60^\\circ$.',
        'Cung lớn: $360^\\circ - 60^\\circ = 300^\\circ$.',
      ],
      answer:
        '$\\widehat{AOB} = 60^\\circ$; cung nhỏ $AB$ có số đo $60^\\circ$, cung lớn $AB$ có số đo $300^\\circ$.',
    },
    {
      problem:
        'Lúc $4$ giờ, hai kim đồng hồ tạo thành một góc ở tâm. Tính số đo của cung nhỏ và cung lớn có hai mút là hai đầu kim (coi hai kim dài bằng nhau).',
      steps: [
        'Mặt đồng hồ chia thành $12$ phần bằng nhau, mỗi phần ứng với cung $360^\\circ : 12 = 30^\\circ$.',
        'Lúc $4$ giờ, kim phút chỉ số $12$, kim giờ chỉ số $4$: hai kim cách nhau $4$ phần, góc ở tâm bằng $4 \\cdot 30^\\circ = 120^\\circ$.',
        'Cung nhỏ có số đo $120^\\circ$; cung lớn có số đo $360^\\circ - 120^\\circ = 240^\\circ$.',
      ],
      answer: 'Cung nhỏ $120^\\circ$, cung lớn $240^\\circ$.',
    },
    {
      problem:
        'Cho đường tròn $(O; 5\\text{ cm})$ và dây $AB$ có $\\widehat{AOB} = 90^\\circ$. Tính độ dài dây $AB$ và so sánh với đường kính.',
      steps: [
        'Tam giác $OAB$ vuông cân tại $O$ với $OA = OB = 5$ cm.',
        'Theo định lí Pythagore: $AB^2 = 5^2 + 5^2 = 50$, nên $AB = 5\\sqrt{2} \\approx 7{,}07$ cm.',
        'Đường kính dài $2 \\cdot 5 = 10$ cm, và $7{,}07 < 10$, đúng như định lí đường kính là dây lớn nhất.',
      ],
      answer: '$AB = 5\\sqrt{2} \\approx 7{,}07$ cm, nhỏ hơn đường kính $10$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đường tròn $(O; 5\\text{ cm})$ không thể có dây nào dưới đây?',
      options: ['Dây dài $6$ cm', 'Dây dài $8$ cm', 'Dây dài $10$ cm', 'Dây dài $11$ cm'],
      answer: 3,
      hints: ['Dây lớn nhất của đường tròn là đường kính.', 'Đường kính dài $2R$.'],
      solution:
        'Đường kính dài $2 \\cdot 5 = 10$ cm là dây lớn nhất, nên không có dây nào dài $11$ cm. Các dây $6$ cm, $8$ cm, $10$ cm (đường kính) đều có.',
    },
    {
      type: 'number',
      prompt: 'Góc ở tâm $\\widehat{AOB} = 75^\\circ$. Tính số đo của cung lớn $AB$.',
      answer: 285,
      unit: '°',
      hints: [
        'Cung nhỏ $AB$ có số đo bằng góc ở tâm.',
        'Cung lớn và cung nhỏ chung hai mút có tổng số đo $360^\\circ$.',
      ],
      solution:
        '$\\text{sđ}\\,\\overset\\frown{AB}_{\\text{lớn}} = 360^\\circ - 75^\\circ = 285^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Lúc $5$ giờ, tính số đo cung nhỏ có hai mút là hai đầu kim đồng hồ (coi hai kim dài bằng nhau).',
      answer: 150,
      unit: '°',
      hints: [
        'Hai số liền nhau trên mặt đồng hồ ứng với cung $30^\\circ$.',
        'Kim phút chỉ số $12$, kim giờ chỉ số $5$.',
      ],
      solution:
        'Hai kim cách nhau $5$ phần, mỗi phần $30^\\circ$, nên cung nhỏ có số đo $5 \\cdot 30^\\circ = 150^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Cho đường tròn $(O; 6\\text{ cm})$ và dây $MN = 6$ cm. Tính số đo cung nhỏ $MN$.',
      answer: 60,
      unit: '°',
      hints: ['Xét tam giác $OMN$: ba cạnh có độ dài thế nào?'],
      solution:
        '$OM = ON = MN = 6$ cm nên tam giác $OMN$ đều, $\\widehat{MON} = 60^\\circ$. Vậy cung nhỏ $MN$ có số đo $60^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Cung lớn $AB$ có số đo $220^\\circ$. Góc ở tâm $\\widehat{AOB}$ bằng',
      options: ['$220^\\circ$', '$140^\\circ$', '$110^\\circ$', '$40^\\circ$'],
      answer: 1,
      hints: ['Góc ở tâm $\\widehat{AOB}$ chắn cung nhỏ $AB$.'],
      solution:
        'Cung nhỏ $AB$ có số đo $360^\\circ - 220^\\circ = 140^\\circ$, nên $\\widehat{AOB} = 140^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho đường tròn $(O; 4\\text{ cm})$ và dây $CD$ với $\\widehat{COD} = 90^\\circ$. Tính $CD$ (làm tròn đến hàng phần trăm).',
      answer: 5.66,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['Tam giác $OCD$ vuông cân tại $O$.', 'Dùng định lí Pythagore: $CD^2 = OC^2 + OD^2$.'],
      solution: '$CD^2 = 4^2 + 4^2 = 32$, nên $CD = 4\\sqrt{2} \\approx 5{,}66$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $C$ nằm trên cung nhỏ $AB$ của đường tròn $(O)$, biết $\\text{sđ}\\,\\overset\\frown{AC} = 40^\\circ$ và $\\text{sđ}\\,\\overset\\frown{CB} = 65^\\circ$. Tính số đo góc $\\widehat{AOB}$.',
      answer: 105,
      unit: '°',
      hints: ['$C$ nằm trên cung $AB$ nên số đo cung $AB$ bằng tổng hai cung nhỏ.'],
      solution:
        '$\\text{sđ}\\,\\overset\\frown{AB} = 40^\\circ + 65^\\circ = 105^\\circ$. Đây là cung nhỏ nên $\\widehat{AOB} = 105^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho đường tròn $(O; 13\\text{ cm})$ và dây $AB = 24$ cm. Gọi $H$ là trung điểm của $AB$. Tính khoảng cách $OH$ từ tâm đến dây.',
      answer: 5,
      unit: 'cm',
      hints: [
        'Tam giác $OAB$ cân tại $O$, nên trung tuyến $OH$ cũng là đường cao: $OH \\perp AB$.',
        'Trong tam giác vuông $OHA$: $OH^2 = OA^2 - AH^2$.',
      ],
      solution:
        '$AH = 24 : 2 = 12$ cm và $OH \\perp AB$ (tam giác $OAB$ cân tại $O$). Do đó $OH^2 = 13^2 - 12^2 = 25$, nên $OH = 5$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Mỗi đường kính là một dây.',
        'Mỗi dây là một đường kính.',
        'Số đo cung lớn luôn lớn hơn $180^\\circ$.',
        'Góc ở tâm có đỉnh nằm trên đường tròn.',
      ],
      answers: [0, 2],
      hints: [
        'Đường kính là dây đi qua tâm; dây không nhất thiết đi qua tâm.',
        'Góc ở tâm có đỉnh ở đâu?',
      ],
      solution:
        'Đường kính là một dây đặc biệt (đi qua tâm), nhưng dây không đi qua tâm thì không phải đường kính. Cung nhỏ có số đo nhỏ hơn $180^\\circ$ nên cung lớn $= 360^\\circ - \\text{cung nhỏ} > 180^\\circ$. Góc ở tâm có đỉnh là tâm, không nằm trên đường tròn.',
    },
  ],
  takeaways: [
    'Dây nối hai điểm của đường tròn; dây qua tâm là đường kính, dài $2R$ và là dây lớn nhất.',
    'Góc ở tâm có đỉnh là tâm đường tròn; nó chắn cung nhỏ nằm bên trong góc.',
    'Số đo cung nhỏ bằng góc ở tâm chắn nó; nửa đường tròn $180^\\circ$; cung lớn $= 360^\\circ -$ cung nhỏ.',
  ],
};
