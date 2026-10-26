/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các trường hợp đồng dạng của hai tam giác vuông: một góc nhọn bằng nhau, hai cạnh góc vuông tỉ lệ, cạnh huyền và một cạnh góc vuông tỉ lệ, cùng ứng dụng đo chiều cao bằng bóng nắng.',
  intro:
    'Hai tam giác vuông đã có sẵn một cặp góc bằng nhau: hai góc vuông. Vì vậy các trường hợp đồng dạng trở nên gọn hơn nhiều, chỉ cần thêm một góc nhọn, hoặc hai cặp cạnh tỉ lệ. Nhờ đó, người ta đo được chiều cao của cây hay cột đèn chỉ bằng bóng nắng của chúng.',
  objectives: [
    'Nhận biết hai tam giác vuông đồng dạng khi có một góc nhọn bằng nhau hoặc hai cạnh góc vuông tỉ lệ.',
    'Phát biểu và vận dụng trường hợp đặc biệt: cạnh huyền và một cạnh góc vuông tỉ lệ.',
    'Dùng tam giác vuông đồng dạng để tính độ dài và đo chiều cao gián tiếp.',
  ],
  sections: [
    {
      heading: 'Áp dụng các trường hợp đồng dạng của tam giác vào tam giác vuông',
      blocks: [
        {
          type: 'p',
          text: 'Từ trường hợp góc – góc và cạnh – góc – cạnh, với chú ý rằng hai góc vuông luôn bằng nhau, ta có:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai tam giác vuông đồng dạng với nhau nếu',
          text: 'a) Tam giác vuông này có một góc nhọn bằng góc nhọn của tam giác vuông kia; hoặc b) tam giác vuông này có hai cạnh góc vuông tỉ lệ với hai cạnh góc vuông của tam giác vuông kia.',
        },
        {
          type: 'tex',
          tex: "\\widehat{A} = \\widehat{A'} = 90^\\circ,\\ \\widehat{B'} = \\widehat{B} \\Rightarrow \\triangle A'B'C' \\backsim \\triangle ABC",
        },
        {
          type: 'tex',
          tex: "\\widehat{A} = \\widehat{A'} = 90^\\circ,\\ \\frac{A'B'}{AB} = \\frac{A'C'}{AC} \\Rightarrow \\triangle A'B'C' \\backsim \\triangle ABC",
        },
      ],
    },
    {
      heading: 'Trường hợp đặc biệt: cạnh huyền và cạnh góc vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này tỉ lệ với cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó đồng dạng.',
        },
        {
          type: 'tex',
          tex: "\\widehat{A} = \\widehat{A'} = 90^\\circ,\\ \\frac{B'C'}{BC} = \\frac{A'B'}{AB} \\Rightarrow \\triangle A'B'C' \\backsim \\triangle ABC",
        },
        {
          type: 'p',
          text: "Chứng minh: đặt $\\dfrac{B'C'}{BC} = \\dfrac{A'B'}{AB} = k$. Theo định lí Pythagore, $A'C'^2 = B'C'^2 - A'B'^2 = k^2 \\left(BC^2 - AB^2\\right) = k^2 \\cdot AC^2$, nên $\\dfrac{A'C'}{AC} = k$. Ba cạnh tỉ lệ, vậy hai tam giác đồng dạng (c.c.c).",
        },
      ],
    },
    {
      heading: 'Đường cao trong tam giác vuông và đo chiều cao bằng bóng nắng',
      blocks: [
        {
          type: 'p',
          text: 'Cho $\\triangle ABC$ vuông tại $A$, đường cao $AH$. Mỗi tam giác $HBA$, $HAC$ là tam giác vuông có chung một góc nhọn với $\\triangle ABC$, nên:',
        },
        {
          type: 'tex',
          tex: '\\triangle HBA \\backsim \\triangle ABC,\\quad \\triangle HAC \\backsim \\triangle ABC,\\quad \\triangle HBA \\backsim \\triangle HAC',
        },
        {
          type: 'p',
          text: 'Từ đó suy ra các hệ thức $AB^2 = BH \\cdot BC$, $AC^2 = CH \\cdot BC$ và $AH^2 = HB \\cdot HC$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo chiều cao bằng bóng nắng',
          text: 'Các tia nắng gần như song song, nên một vật dựng đứng và bóng của nó tạo thành một tam giác vuông có góc nhọn bằng góc của tia nắng với mặt đất. Cột đèn và chiếc cọc cùng lúc tạo ra hai tam giác vuông đồng dạng: chiều cao tỉ lệ với độ dài bóng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai tam giác vuông với thanh chỉnh',
    instruction:
      'Chọn một dấu hiệu, rồi chỉnh các cạnh và góc của hai tam giác vuông (vẽ cùng tỉ lệ). Khi điều kiện tỉ lệ hoặc góc được thoả, ứng dụng báo đồng dạng và bảng bên dưới cho thấy cả ba cạnh đều tỉ lệ. Thử đặt góc B′ bằng góc C để xem trường hợp đỉnh tương ứng bị đổi chỗ.',
  },
  examples: [
    {
      problem:
        '$\\triangle ABC$ vuông tại $A$ có $BC = 10$ cm, $AB = 6$ cm. $\\triangle DEF$ vuông tại $D$ có $EF = 15$ cm, $DE = 9$ cm. Chứng minh $\\triangle DEF \\backsim \\triangle ABC$ và tính $DF$.',
      steps: [
        '$\\dfrac{EF}{BC} = \\dfrac{15}{10} = \\dfrac{3}{2}$ và $\\dfrac{DE}{AB} = \\dfrac{9}{6} = \\dfrac{3}{2}$.',
        'Cạnh huyền và một cạnh góc vuông tỉ lệ, nên $\\triangle DEF \\backsim \\triangle ABC$ với tỉ số $\\dfrac{3}{2}$.',
        'Theo định lí Pythagore, $AC^2 = 10^2 - 6^2 = 64$, nên $AC = 8$ cm.',
        '$DF$ ứng với $AC$: $DF = \\dfrac{3}{2} \\cdot 8 = 12$ cm.',
      ],
      answer: '$\\triangle DEF \\backsim \\triangle ABC$ và $DF = 12$ cm.',
    },
    {
      problem:
        'Cho $\\triangle ABC$ vuông tại $A$, đường cao $AH$, $BH = 4$ cm, $BC = 9$ cm. Chứng minh $\\triangle HBA \\backsim \\triangle ABC$ rồi tính $AB$.',
      steps: [
        '$\\triangle HBA$ vuông tại $H$, $\\triangle ABC$ vuông tại $A$, có chung góc nhọn $B$.',
        'Vậy $\\triangle HBA \\backsim \\triangle ABC$, với $H \\leftrightarrow A$, $B \\leftrightarrow B$, $A \\leftrightarrow C$.',
        'Suy ra $\\dfrac{HB}{AB} = \\dfrac{BA}{BC}$, tức $AB^2 = BH \\cdot BC = 4 \\cdot 9 = 36$.',
      ],
      answer: '$AB = 6$ cm.',
    },
    {
      problem:
        'Cùng một thời điểm, bạn Lan cao $1{,}7$ m có bóng trên mặt đất dài $0{,}6$ m, còn một cột đèn có bóng dài $1{,}5$ m. Tính chiều cao cột đèn.',
      steps: [
        'Người và bóng, cột đèn và bóng tạo thành hai tam giác vuông có góc nhọn bằng nhau (góc của tia nắng với mặt đất), nên chúng đồng dạng.',
        'Chiều cao tỉ lệ với độ dài bóng: $\\dfrac{h}{1{,}7} = \\dfrac{1{,}5}{0{,}6}$.',
        '$h = \\dfrac{1{,}7 \\cdot 1{,}5}{0{,}6} = \\dfrac{2{,}55}{0{,}6} = 4{,}25$.',
      ],
      answer: 'Cột đèn cao $4{,}25$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ có $\\widehat{B} = 35^\\circ$; $\\triangle DEF$ vuông tại $D$ có $\\widehat{F} = 55^\\circ$. Khẳng định nào đúng?',
      options: [
        '$\\triangle ABC \\backsim \\triangle DEF$',
        '$\\triangle ABC \\backsim \\triangle DFE$',
        'Hai tam giác không đồng dạng',
        'Chưa đủ dữ kiện để kết luận',
      ],
      answer: 0,
      hints: [
        'Tính góc nhọn còn lại của mỗi tam giác.',
        'Ghép đỉnh có góc bằng nhau: góc $35^\\circ$ với góc $35^\\circ$.',
      ],
      solution:
        '$\\widehat{E} = 90^\\circ - 55^\\circ = 35^\\circ = \\widehat{B}$, nên hai tam giác vuông đồng dạng với $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$: $\\triangle ABC \\backsim \\triangle DEF$.',
    },
    {
      type: 'number',
      prompt:
        "$\\triangle ABC$ vuông tại $A$ có $AB = 3$ cm, $AC = 4$ cm. $\\triangle A'B'C'$ vuông tại $A'$ có $A'B' = 4{,}5$ cm. Độ dài $A'C'$ bằng bao nhiêu thì $\\triangle A'B'C' \\backsim \\triangle ABC$?",
      answer: 6,
      unit: 'cm',
      hints: ["Hai cạnh góc vuông phải tỉ lệ: $\\dfrac{A'C'}{AC} = \\dfrac{A'B'}{AB}$."],
      solution:
        "$\\dfrac{A'B'}{AB} = \\dfrac{4{,}5}{3} = 1{,}5$, nên $A'C' = 1{,}5 \\cdot 4 = 6$ cm.",
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ có $BC = 13$ cm, $AB = 5$ cm. $\\triangle MNP$ vuông tại $M$ có $NP = 26$ cm, $MN = 10$ cm. Tính $MP$.',
      answer: 24,
      unit: 'cm',
      hints: [
        'So sánh $\\dfrac{NP}{BC}$ và $\\dfrac{MN}{AB}$.',
        'Tính $AC$ bằng định lí Pythagore rồi nhân với tỉ số đồng dạng.',
      ],
      solution:
        '$\\dfrac{NP}{BC} = \\dfrac{MN}{AB} = 2$ nên $\\triangle MNP \\backsim \\triangle ABC$ (cạnh huyền – cạnh góc vuông). $AC^2 = 169 - 25 = 144$, $AC = 12$ cm, nên $MP = 2 \\cdot 12 = 24$ cm.',
    },
    {
      type: 'multi',
      prompt:
        "$\\triangle ABC$ vuông tại $A$ và $\\triangle A'B'C'$ vuông tại $A'$. Điều kiện nào dưới đây đủ để $\\triangle A'B'C' \\backsim \\triangle ABC$? Chọn tất cả.",
      options: [
        "$\\widehat{B'} = \\widehat{B}$",
        "$\\dfrac{A'B'}{AB} = \\dfrac{A'C'}{AC}$",
        "$\\dfrac{B'C'}{BC} = \\dfrac{A'B'}{AB}$",
        "$B'C' = 2 \\cdot BC$",
      ],
      answers: [0, 1, 2],
      hints: ['Ba dấu hiệu: một góc nhọn, hai cạnh góc vuông, cạnh huyền và một cạnh góc vuông.'],
      solution:
        'Ba điều kiện đầu đúng là ba dấu hiệu đồng dạng của tam giác vuông. Chỉ biết tỉ số hai cạnh huyền thì chưa đủ: hình dạng tam giác còn thay đổi được.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$, đường cao $AH$ với $HB = 4$ cm, $HC = 9$ cm. Tính $AH$.',
      answer: 6,
      unit: 'cm',
      hints: [
        '$\\triangle HBA \\backsim \\triangle HAC$ vì cùng đồng dạng với $\\triangle ABC$.',
        'Suy ra $\\dfrac{HB}{HA} = \\dfrac{HA}{HC}$.',
      ],
      solution: '$AH^2 = HB \\cdot HC = 4 \\cdot 9 = 36$, nên $AH = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$, đường cao $AH$, $BH = 3{,}6$ cm, $BC = 10$ cm. Tính $AB$.',
      answer: 6,
      unit: 'cm',
      hints: [
        '$\\triangle HBA \\backsim \\triangle ABC$ (chung góc $B$).',
        '$AB^2 = BH \\cdot BC$.',
      ],
      solution: '$AB^2 = 3{,}6 \\cdot 10 = 36$, nên $AB = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cùng lúc, một chiếc cọc cao $1{,}5$ m cắm thẳng đứng có bóng dài $2$ m, còn một cái cây có bóng dài $12$ m. Cây cao bao nhiêu mét?',
      answer: 9,
      unit: 'm',
      hints: [
        'Hai tam giác vuông (vật – bóng) có chung góc của tia nắng nên đồng dạng.',
        'Chiều cao tỉ lệ với bóng: $\\dfrac{h}{1{,}5} = \\dfrac{12}{2}$.',
      ],
      solution: '$h = 1{,}5 \\cdot \\dfrac{12}{2} = 1{,}5 \\cdot 6 = 9$ m.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm. $\\triangle DEF \\backsim \\triangle ABC$ và cạnh huyền $EF = 5$ cm. Tính chu vi $\\triangle DEF$.',
      answer: 12,
      unit: 'cm',
      hints: [
        'Tính cạnh huyền $BC$ bằng định lí Pythagore.',
        'Tỉ số đồng dạng $k = \\dfrac{EF}{BC}$; chu vi cũng nhân với $k$.',
      ],
      solution:
        '$BC = \\sqrt{36 + 64} = 10$ cm, chu vi $\\triangle ABC$ là $24$ cm. $k = \\dfrac{5}{10} = \\dfrac{1}{2}$, nên chu vi $\\triangle DEF$ là $12$ cm.',
    },
  ],
  takeaways: [
    'Hai tam giác vuông đồng dạng nếu có một góc nhọn bằng nhau.',
    'Hai tam giác vuông đồng dạng nếu hai cạnh góc vuông tỉ lệ.',
    'Hai tam giác vuông đồng dạng nếu cạnh huyền và một cạnh góc vuông tỉ lệ.',
    'Đường cao $AH$ của tam giác vuông tại $A$ tạo ra các tam giác đồng dạng, cho $AH^2 = HB \\cdot HC$, $AB^2 = BH \\cdot BC$.',
  ],
};
