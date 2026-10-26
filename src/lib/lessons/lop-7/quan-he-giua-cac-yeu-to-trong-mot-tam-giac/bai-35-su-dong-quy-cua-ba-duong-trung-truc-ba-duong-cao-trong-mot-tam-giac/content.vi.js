/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba đường trung trực của tam giác đồng quy tại một điểm cách đều ba đỉnh; ba đường cao của tam giác đồng quy tại trực tâm.',
  intro:
    'Ba gia đình sống ở ba ngôi nhà $A$, $B$, $C$ không thẳng hàng muốn đào chung một cái giếng sao cho đường đi từ giếng đến ba nhà dài bằng nhau. Nên đào giếng ở đâu? Bài này cho câu trả lời bằng các đường trung trực của tam giác, rồi giới thiệu thêm các đường cao và trực tâm.',
  objectives: [
    'Nhận biết đường trung trực và đường cao của một tam giác.',
    'Biết ba đường trung trực đồng quy tại một điểm cách đều ba đỉnh, và vận dụng tính chất đó.',
    'Biết ba đường cao đồng quy tại trực tâm; nhận biết vị trí của trực tâm trong tam giác nhọn, vuông, tù.',
  ],
  sections: [
    {
      heading: 'Đường trung trực của tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường trung trực của tam giác',
          text: 'Đường trung trực của mỗi cạnh của một tam giác gọi là một đường trung trực của tam giác đó. Mỗi tam giác có ba đường trung trực.',
        },
        {
          type: 'p',
          text: 'Nhắc lại (Bài 16): đường trung trực của đoạn thẳng $AB$ là đường thẳng vuông góc với $AB$ tại trung điểm của nó; mỗi điểm nằm trên đường trung trực của $AB$ thì cách đều $A$ và $B$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Ba đường trung trực của một tam giác cùng đi qua một điểm. Điểm này cách đều ba đỉnh của tam giác.',
        },
        {
          type: 'p',
          text: 'Giải thích: gọi $O$ là giao điểm của hai đường trung trực của $AB$ và $AC$.',
        },
        {
          type: 'list',
          items: [
            '$O$ nằm trên đường trung trực của $AB$ nên $OA = OB$.',
            '$O$ nằm trên đường trung trực của $AC$ nên $OA = OC$.',
            'Suy ra $OB = OC$, tức là $O$ cách đều $B$ và $C$, nên $O$ nằm trên đường trung trực của $BC$.',
          ],
        },
        { type: 'tex', tex: 'OA = OB = OC' },
        {
          type: 'p',
          text: 'Vì $OA = OB = OC$ nên đường tròn tâm $O$, bán kính $OA$ đi qua cả ba đỉnh $A$, $B$, $C$. Ta gọi đó là đường tròn ngoại tiếp tam giác $ABC$.',
        },
        {
          type: 'table',
          head: ['Tam giác', 'Vị trí giao điểm $O$ của ba đường trung trực'],
          rows: [
            ['Nhọn', 'Nằm bên trong tam giác'],
            ['Vuông', 'Là trung điểm của cạnh huyền'],
            ['Tù', 'Nằm bên ngoài tam giác'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trong tam giác vuông, $O$ là trung điểm của cạnh huyền nên đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: nếu $\\widehat{A} = 90^\\circ$ và $M$ là trung điểm của $BC$ thì $AM = MB = MC = \\dfrac{BC}{2}$.',
        },
      ],
    },
    {
      heading: 'Đường cao và trực tâm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường cao của tam giác',
          text: 'Trong tam giác $ABC$, đoạn vuông góc kẻ từ đỉnh $A$ đến đường thẳng $BC$ gọi là đường cao (xuất phát từ đỉnh $A$) của tam giác. Mỗi tam giác có ba đường cao.',
        },
        {
          type: 'p',
          text: 'Nếu $AD \\perp BC$ tại $D$, $BE \\perp CA$ tại $E$, $CF \\perp AB$ tại $F$ thì $AD$, $BE$, $CF$ là ba đường cao của tam giác $ABC$. Chân đường cao có thể nằm trên phần kéo dài của cạnh, khi tam giác có góc tù.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Ba đường cao của một tam giác cùng đi qua một điểm. Điểm đó gọi là trực tâm của tam giác.',
        },
        {
          type: 'table',
          head: ['Tam giác', 'Vị trí trực tâm $H$'],
          rows: [
            ['Nhọn', 'Nằm bên trong tam giác'],
            ['Vuông', 'Trùng với đỉnh góc vuông'],
            ['Tù', 'Nằm bên ngoài tam giác'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Với tam giác tù, ba đoạn đường cao không cùng đi qua một điểm; chính các đường thẳng chứa chúng mới đồng quy tại trực tâm $H$, nằm ngoài tam giác.',
        },
      ],
    },
    {
      heading: 'Các đường đặc biệt trong tam giác cân',
      blocks: [
        {
          type: 'p',
          text: 'Cho tam giác $ABC$ cân tại $A$ và $M$ là trung điểm của $BC$. Hai tam giác $ABM$ và $ACM$ bằng nhau (c.c.c), nên $\\widehat{BAM} = \\widehat{CAM}$ và $\\widehat{AMB} = \\widehat{AMC} = 90^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Trong một tam giác cân, đường trung trực của cạnh đáy đồng thời là đường trung tuyến, đường phân giác, đường cao cùng xuất phát từ đỉnh đối diện với cạnh đó.',
        },
        {
          type: 'p',
          text: 'Trong tam giác đều, điều đó đúng với cả ba cạnh, nên trọng tâm, giao điểm ba đường phân giác, giao điểm ba đường trung trực và trực tâm trùng nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Điểm $O$ và trực tâm $H$ di chuyển',
    instruction:
      'Kéo ba đỉnh $A$, $B$, $C$. Ở chế độ «Trung trực», quan sát ba đường trung trực luôn gặp nhau tại $O$ với $OA = OB = OC$, và đường tròn tâm $O$ đi qua ba đỉnh. Chuyển sang «Đường cao» để thấy ba đường cao gặp nhau tại trực tâm $H$. Hãy kéo cho tam giác thành vuông rồi tù và xem $O$, $H$ đi ra ngoài tam giác thế nào.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 10$ cm. Gọi $O$ là giao điểm của ba đường trung trực của tam giác. Tính $OA$, $OB$, $OC$.',
      steps: [
        'Tam giác vuông nên giao điểm $O$ của ba đường trung trực là trung điểm của cạnh huyền $BC$.',
        '$OB = OC = \\dfrac{BC}{2} = \\dfrac{10}{2} = 5$ (cm).',
        '$O$ cách đều ba đỉnh nên $OA = OB = 5$ cm.',
      ],
      answer: '$OA = OB = OC = 5$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ nhọn có $\\widehat{A} = 60^\\circ$. Hai đường cao $BE$ và $CF$ cắt nhau tại $H$. Tính $\\widehat{ABE}$ và $\\widehat{BHC}$.',
      steps: [
        'Tam giác $ABE$ vuông tại $E$: $\\widehat{ABE} = 90^\\circ - \\widehat{A} = 90^\\circ - 60^\\circ = 30^\\circ$.',
        'Tam giác $BFH$ vuông tại $F$ có $\\widehat{FBH} = \\widehat{ABE} = 30^\\circ$, nên $\\widehat{BHF} = 90^\\circ - 30^\\circ = 60^\\circ$.',
        '$F$, $H$, $C$ thẳng hàng nên $\\widehat{BHC}$ và $\\widehat{BHF}$ kề bù: $\\widehat{BHC} = 180^\\circ - 60^\\circ = 120^\\circ$.',
      ],
      answer: '$\\widehat{ABE} = 30^\\circ$, $\\widehat{BHC} = 120^\\circ$.',
    },
    {
      problem:
        'Tam giác $ABC$ nhọn có trực tâm $H$. Chứng minh $A$ là trực tâm của tam giác $HBC$.',
      steps: [
        'Gọi $AD$, $CF$ là hai đường cao của tam giác $ABC$, cùng đi qua $H$.',
        'Trong tam giác $HBC$: $AD \\perp BC$ tại $D$ và $H$ nằm trên $AD$, nên đường thẳng $HA$ chứa đường cao kẻ từ $H$.',
        '$CF \\perp AB$ và $H$ nằm trên $CF$, nên $BA \\perp HC$ tại $F$: đường thẳng $BA$ chứa đường cao kẻ từ $B$ của tam giác $HBC$.',
        'Hai đường cao này cắt nhau tại $A$, nên $A$ là trực tâm của tam giác $HBC$.',
      ],
      answer: '$A$ là trực tâm của tam giác $HBC$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Giao điểm của ba đường trung trực của một tam giác',
      options: [
        'cách đều ba cạnh của tam giác',
        'cách đều ba đỉnh của tam giác',
        'luôn nằm bên trong tam giác',
        'là trực tâm của tam giác',
      ],
      answer: 1,
      hints: [
        'Mỗi điểm trên đường trung trực của một đoạn thẳng cách đều hai đầu mút của đoạn đó.',
      ],
      solution:
        'Giao điểm của ba đường trung trực cách đều ba đỉnh. Điểm cách đều ba cạnh là giao điểm ba đường phân giác; giao điểm ba đường trung trực nằm ngoài tam giác khi tam giác tù.',
    },
    {
      type: 'number',
      prompt:
        'Gọi $O$ là giao điểm của ba đường trung trực của tam giác $MNP$. Biết $OM = 7$ cm. Tính $ON + OP$ (cm).',
      answer: 14,
      unit: 'cm',
      hints: ['So sánh $ON$, $OP$ với $OM$.'],
      solution: '$O$ cách đều ba đỉnh nên $ON = OP = OM = 7$ cm, và $ON + OP = 14$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$, $BC = 13$ cm, $M$ là trung điểm của $BC$. Tính $AM$ (cm).',
      answer: 6.5,
      unit: 'cm',
      hints: [
        'Giao điểm ba đường trung trực của tam giác vuông nằm ở đâu?',
        '$M$ cách đều ba đỉnh $A$, $B$, $C$.',
      ],
      solution:
        'Trong tam giác vuông, giao điểm ba đường trung trực là trung điểm $M$ của cạnh huyền, nên $AM = MB = \\dfrac{BC}{2} = 6{,}5$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ vuông tại $B$. Trực tâm của tam giác là',
      options: ['điểm $A$', 'điểm $B$', 'điểm $C$', 'trung điểm của $AC$'],
      answer: 1,
      hints: ['Trong tam giác vuông tại $B$, hai cạnh góc vuông $BA$, $BC$ cũng là hai đường cao.'],
      solution:
        '$BA \\perp BC$ nên $BA$ là đường cao kẻ từ $A$ và $BC$ là đường cao kẻ từ $C$. Hai đường cao cắt nhau tại $B$, nên trực tâm là $B$ (đỉnh góc vuông). Trung điểm của $AC$ là giao điểm ba đường trung trực.',
    },
    {
      type: 'multi',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 120^\\circ$. Gọi $O$ là giao điểm ba đường trung trực, $H$ là trực tâm. Chọn tất cả các khẳng định đúng.',
      options: [
        '$O$ nằm bên ngoài tam giác',
        '$H$ nằm bên ngoài tam giác',
        '$H$ trùng với $A$',
        '$OA = OB = OC$',
      ],
      answers: [0, 1, 3],
      hints: ['Tam giác có góc tù: $O$ và $H$ nằm ở đâu?', '$O$ luôn cách đều ba đỉnh.'],
      solution:
        'Tam giác tù tại $A$ nên cả $O$ và $H$ nằm ngoài tam giác; $O$ luôn cách đều ba đỉnh. $H$ trùng với một đỉnh chỉ khi tam giác vuông tại đỉnh đó.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ nhọn có $\\widehat{A} = 50^\\circ$, trực tâm $H$. Tính $\\widehat{BHC}$ (độ).',
      answer: 130,
      unit: '°',
      hints: [
        'Gọi $BE$, $CF$ là hai đường cao. Tính $\\widehat{ABE}$ trong tam giác vuông $ABE$.',
        'Tính $\\widehat{BHF}$ trong tam giác vuông $BFH$, rồi dùng hai góc kề bù.',
      ],
      solution:
        '$\\widehat{ABE} = 90^\\circ - 50^\\circ = 40^\\circ$; trong tam giác $BFH$ vuông tại $F$: $\\widehat{BHF} = 90^\\circ - 40^\\circ = 50^\\circ$. Vậy $\\widehat{BHC} = 180^\\circ - 50^\\circ = 130^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$ và đường cao $AD$. Tính $\\widehat{BAD}$ (độ).',
      answer: 20,
      unit: '°',
      hints: ['Trong tam giác cân, đường cao xuất phát từ đỉnh còn là đường gì?'],
      solution:
        'Tam giác cân tại $A$ nên đường cao $AD$ cũng là đường phân giác: $\\widehat{BAD} = \\dfrac{40^\\circ}{2} = 20^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Ba ngôi nhà $A$, $B$, $C$ không thẳng hàng. Cần đào một cái giếng cách đều ba ngôi nhà. Vị trí của giếng là',
      options: [
        'giao điểm của ba đường trung tuyến',
        'giao điểm của ba đường phân giác',
        'giao điểm của ba đường trung trực',
        'trực tâm của tam giác $ABC$',
      ],
      answer: 2,
      hints: ['Giếng cách đều ba điểm $A$, $B$, $C$ (ba đỉnh), không phải ba cạnh.'],
      solution:
        'Điểm cách đều ba đỉnh $A$, $B$, $C$ là giao điểm của ba đường trung trực của tam giác $ABC$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong tam giác đều $ABC$, trọng tâm $G$, giao điểm $I$ của ba đường phân giác, giao điểm $O$ của ba đường trung trực và trực tâm $H$',
      options: [
        'trùng nhau',
        'là bốn điểm phân biệt',
        'thẳng hàng nhưng phân biệt',
        'chỉ có $G$ và $H$ trùng nhau',
      ],
      answer: 0,
      hints: ['Trong tam giác cân, đường trung trực của cạnh đáy còn là những đường nào?'],
      solution:
        'Tam giác đều cân tại cả ba đỉnh, nên mỗi đường trung trực đồng thời là trung tuyến, phân giác và đường cao. Bốn điểm $G$, $I$, $O$, $H$ trùng nhau.',
    },
  ],
  takeaways: [
    'Ba đường trung trực đồng quy tại $O$ với $OA = OB = OC$; $O$ là tâm đường tròn đi qua ba đỉnh.',
    'Ba đường cao (hoặc các đường thẳng chứa chúng) đồng quy tại trực tâm $H$.',
    'Tam giác nhọn: $O$, $H$ ở trong; tam giác vuông: $O$ là trung điểm cạnh huyền, $H$ là đỉnh góc vuông; tam giác tù: $O$, $H$ ở ngoài.',
    'Trong tam giác cân, đường trung trực của cạnh đáy cũng là trung tuyến, phân giác, đường cao xuất phát từ đỉnh.',
  ],
};
