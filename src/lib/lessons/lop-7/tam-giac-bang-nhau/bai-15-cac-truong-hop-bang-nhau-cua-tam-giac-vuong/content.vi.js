/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các trường hợp bằng nhau của tam giác vuông: hai cạnh góc vuông, cạnh góc vuông và góc nhọn kề, cạnh huyền và góc nhọn, cạnh huyền và cạnh góc vuông.',
  intro:
    'Hai tam giác vuông đã có sẵn một cặp góc bằng nhau: hai góc vuông. Vì thế, để kết luận hai tam giác vuông bằng nhau, ta chỉ cần thêm hai cặp dữ kiện. Bài này chỉ ra những cặp dữ kiện nào là đủ, trong đó có một trường hợp chỉ dành riêng cho tam giác vuông: cạnh huyền và một cạnh góc vuông.',
  objectives: [
    'Nhận ra cạnh huyền, cạnh góc vuông, góc nhọn của tam giác vuông.',
    'Nêu được bốn trường hợp bằng nhau của tam giác vuông và giải thích ba trường hợp đầu từ c.g.c, g.c.g.',
    'Vận dụng trường hợp cạnh huyền - cạnh góc vuông và cạnh huyền - góc nhọn để chứng minh hai đoạn thẳng, hai góc bằng nhau.',
  ],
  sections: [
    {
      heading: 'Các trường hợp suy ra từ c.g.c và g.c.g',
      blocks: [
        {
          type: 'p',
          text: 'Xét $\\triangle ABC$ vuông tại $A$ và $\\triangle DEF$ vuông tại $D$. Vì $\\widehat{A} = \\widehat{D} = 90^\\circ$, các trường hợp c.g.c và g.c.g cho ngay:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai cạnh góc vuông',
          text: 'Nếu hai cạnh góc vuông của tam giác vuông này bằng hai cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó bằng nhau. (Góc vuông xen giữa hai cạnh góc vuông: c.g.c.)',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cạnh góc vuông và góc nhọn kề',
          text: 'Nếu một cạnh góc vuông và một góc nhọn kề cạnh ấy của tam giác vuông này bằng một cạnh góc vuông và góc nhọn kề cạnh ấy của tam giác vuông kia thì hai tam giác vuông đó bằng nhau. (Cạnh góc vuông kề góc vuông và góc nhọn: g.c.g.)',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cạnh huyền và góc nhọn',
          text: 'Nếu cạnh huyền và một góc nhọn của tam giác vuông này bằng cạnh huyền và một góc nhọn của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.',
        },
        {
          type: 'p',
          text: 'Giải thích trường hợp cạnh huyền và góc nhọn: nếu $BC = EF$ và $\\widehat{B} = \\widehat{E}$ thì $\\widehat{C} = 90^\\circ - \\widehat{B} = 90^\\circ - \\widehat{E} = \\widehat{F}$ (hai góc nhọn của tam giác vuông phụ nhau). Cạnh huyền $BC$ kề hai góc $\\widehat{B}$, $\\widehat{C}$, nên $\\triangle ABC = \\triangle DEF$ (g.c.g).',
        },
      ],
    },
    {
      heading: 'Trường hợp cạnh huyền và cạnh góc vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cạnh huyền - cạnh góc vuông',
          text: 'Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này bằng cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.',
        },
        {
          type: 'tex',
          tex: '\\widehat{A} = \\widehat{D} = 90^\\circ,\\; BC = EF,\\; AB = DE \\;\\Rightarrow\\; \\triangle ABC = \\triangle DEF',
        },
        {
          type: 'p',
          text: 'Đặt $\\triangle DEF$ lên $\\triangle ABC$ sao cho cạnh góc vuông $DE$ trùng $AB$ ($D$ trùng $A$, $E$ trùng $B$) và $F$, $C$ nằm cùng phía đối với $AB$. Khi đó $F$ và $C$ cùng nằm trên tia vuông góc với $AB$ tại $A$, và cùng cách $B$ một khoảng bằng cạnh huyền. Trên tia đó chỉ có đúng một điểm như vậy, nên $F$ trùng $C$ và hai tam giác trùng khít.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đây là trường hợp riêng của tam giác vuông. Với tam giác bất kì, hai cạnh và một góc không xen giữa chưa đủ để hai tam giác bằng nhau (Bài 14).',
        },
      ],
    },
    {
      heading: 'Tóm tắt',
      blocks: [
        {
          type: 'table',
          head: ['Hai tam giác vuông có', 'Kết luận'],
          rows: [
            ['Hai cạnh góc vuông bằng nhau', 'Bằng nhau (c.g.c)'],
            ['Một cạnh góc vuông và góc nhọn kề cạnh ấy bằng nhau', 'Bằng nhau (g.c.g)'],
            ['Cạnh huyền và một góc nhọn bằng nhau', 'Bằng nhau'],
            ['Cạnh huyền và một cạnh góc vuông bằng nhau', 'Bằng nhau'],
            ['Chỉ hai góc nhọn bằng nhau', 'Chưa đủ'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng tam giác vuông từ hai dữ kiện',
    instruction:
      'Chọn một cặp dữ kiện. Tam giác $ABC$ (xám) vuông tại $A$ đã cho trước. Kéo hai thanh trượt để dựng tam giác $DEF$ (tím) vuông tại $D$. Khi hai dữ kiện bằng hai dữ kiện tương ứng của $ABC$, hai tam giác trùng khít và bảng cho thấy mọi cạnh, góc còn lại cũng bằng nhau.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $AB = AC$. Kẻ $AH$ vuông góc với $BC$ ($H$ thuộc $BC$). Chứng minh $HB = HC$.',
      steps: [
        'Xét $\\triangle AHB$ vuông tại $H$ và $\\triangle AHC$ vuông tại $H$.',
        'Cạnh huyền $AB = AC$ (giả thiết); cạnh góc vuông $AH$ chung.',
        'Vậy $\\triangle AHB = \\triangle AHC$ (cạnh huyền - cạnh góc vuông).',
        'Suy ra $HB = HC$ (hai cạnh tương ứng).',
      ],
      answer: '$HB = HC$, tức là $H$ là trung điểm của $BC$.',
    },
    {
      problem:
        'Cho $M$ là một điểm trên tia phân giác $Ot$ của góc $xOy$ (khác $O$). Kẻ $MA \\perp Ox$ ($A \\in Ox$), $MB \\perp Oy$ ($B \\in Oy$). Chứng minh $MA = MB$.',
      steps: [
        'Xét $\\triangle OAM$ vuông tại $A$ và $\\triangle OBM$ vuông tại $B$.',
        'Cạnh huyền $OM$ chung; $\\widehat{AOM} = \\widehat{BOM}$ ($Ot$ là tia phân giác).',
        'Vậy $\\triangle OAM = \\triangle OBM$ (cạnh huyền - góc nhọn).',
        'Suy ra $MA = MB$ (hai cạnh tương ứng).',
      ],
      answer: '$MA = MB$: mỗi điểm trên tia phân giác cách đều hai cạnh của góc.',
    },
    {
      problem:
        'Tam giác $ABC$ có $AB = AC$. Kẻ $BH \\perp AC$ ($H \\in AC$), $CK \\perp AB$ ($K \\in AB$). Chứng minh $BH = CK$.',
      steps: [
        'Xét $\\triangle ABH$ vuông tại $H$ và $\\triangle ACK$ vuông tại $K$.',
        'Cạnh huyền $AB = AC$ (giả thiết); góc nhọn $\\widehat{A}$ chung.',
        'Vậy $\\triangle ABH = \\triangle ACK$ (cạnh huyền - góc nhọn), nên $BH = CK$ (hai cạnh tương ứng).',
      ],
      answer: '$BH = CK$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ và $\\triangle DEF$ vuông tại $D$ có $BC = EF$, $\\widehat{B} = \\widehat{E}$. Hai tam giác bằng nhau theo trường hợp nào?',
      options: [
        'Hai cạnh góc vuông',
        'Cạnh góc vuông và góc nhọn kề',
        'Cạnh huyền và góc nhọn',
        'Cạnh huyền và cạnh góc vuông',
      ],
      answer: 2,
      hints: ['$BC$ đối diện góc vuông $A$, vậy $BC$ là cạnh gì?'],
      solution:
        '$BC$, $EF$ là cạnh huyền và $\\widehat{B}$, $\\widehat{E}$ là góc nhọn: trường hợp cạnh huyền và góc nhọn.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ và $\\triangle DEF$ vuông tại $D$ có $BC = EF$, $AC = DF$. Hai tam giác bằng nhau theo trường hợp nào?',
      options: [
        'Hai cạnh góc vuông',
        'Cạnh góc vuông và góc nhọn kề',
        'Cạnh huyền và góc nhọn',
        'Cạnh huyền và cạnh góc vuông',
      ],
      answer: 3,
      hints: ['Cạnh nào là cạnh huyền, cạnh nào kề góc vuông?'],
      solution:
        '$BC = EF$ là hai cạnh huyền, $AC = DF$ là hai cạnh góc vuông: trường hợp cạnh huyền và cạnh góc vuông.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ và $\\triangle DEF$ vuông tại $D$ có $AB = DE$. Cần thêm điều kiện nào để hai tam giác bằng nhau theo trường hợp cạnh huyền - cạnh góc vuông?',
      options: [
        '$AC = DF$',
        '$BC = EF$',
        '$\\widehat{B} = \\widehat{E}$',
        '$\\widehat{C} = \\widehat{F}$',
      ],
      answer: 1,
      hints: ['Cạnh huyền của hai tam giác là cạnh nào?'],
      solution:
        'Cần cặp cạnh huyền: $BC = EF$. (Thêm $AC = DF$ là trường hợp hai cạnh góc vuông; thêm $\\widehat{B} = \\widehat{E}$ là cạnh góc vuông và góc nhọn kề.)',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = AC$, kẻ $AH \\perp BC$ ($H \\in BC$). Biết $HB = 4$ cm. Tính $BC$ (cm).',
      answer: 8,
      unit: 'cm',
      hints: [
        'Chứng minh $\\triangle AHB = \\triangle AHC$: hai tam giác vuông có chung cạnh nào?',
        'Từ đó $HC = HB$.',
      ],
      solution:
        '$\\triangle AHB = \\triangle AHC$ (cạnh huyền $AB = AC$, cạnh góc vuông $AH$ chung), nên $HC = HB = 4$ cm. Vậy $BC = HB + HC = 8$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$M$ nằm trên tia phân giác của góc $xOy$, $MA \\perp Ox$ ($A \\in Ox$), $MB \\perp Oy$ ($B \\in Oy$). Biết $MA = 3$ cm. Tính $MB$ (cm).',
      answer: 3,
      unit: 'cm',
      hints: ['Hai tam giác vuông $OAM$, $OBM$ có chung cạnh huyền nào và góc nhọn nào bằng nhau?'],
      solution:
        '$\\triangle OAM = \\triangle OBM$ (cạnh huyền $OM$ chung, $\\widehat{AOM} = \\widehat{BOM}$), nên $MB = MA = 3$ cm.',
    },
    {
      type: 'number',
      prompt: 'Cũng với hình trên, biết $\\widehat{xOy} = 64^\\circ$. Tính $\\widehat{OMB}$ (độ).',
      answer: 58,
      unit: '°',
      hints: [
        '$\\widehat{BOM} = \\widehat{xOy} : 2$.',
        'Trong tam giác $OBM$ vuông tại $B$, hai góc nhọn phụ nhau.',
      ],
      solution:
        '$\\widehat{BOM} = 64^\\circ : 2 = 32^\\circ$. Tam giác $OBM$ vuông tại $B$ nên $\\widehat{OMB} = 90^\\circ - 32^\\circ = 58^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ và $\\triangle MNP$ vuông tại $M$ có $BC = NP$, $\\widehat{C} = \\widehat{P} = 35^\\circ$. Tính $\\widehat{N}$ (độ).',
      answer: 55,
      unit: '°',
      hints: [
        'Hai tam giác vuông này bằng nhau theo trường hợp nào?',
        '$\\widehat{N}$ tương ứng với $\\widehat{B}$, mà $\\widehat{B} + \\widehat{C} = 90^\\circ$.',
      ],
      solution:
        '$\\triangle ABC = \\triangle MNP$ (cạnh huyền - góc nhọn), nên $\\widehat{N} = \\widehat{B}$. Trong tam giác $ABC$ vuông tại $A$: $\\widehat{B} = 90^\\circ - 35^\\circ = 55^\\circ$. Vậy $\\widehat{N} = 55^\\circ$ (cũng có thể tính ngay $\\widehat{N} = 90^\\circ - \\widehat{P}$ trong tam giác vuông $MNP$).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về hai tam giác vuông.',
      options: [
        'Hai tam giác vuông có hai góc nhọn tương ứng bằng nhau thì bằng nhau.',
        'Hai tam giác vuông có cạnh huyền và một cạnh góc vuông tương ứng bằng nhau thì bằng nhau.',
        'Hai tam giác vuông có một cạnh góc vuông và góc nhọn kề cạnh ấy tương ứng bằng nhau thì bằng nhau.',
        'Hai tam giác vuông có cạnh huyền bằng nhau thì bằng nhau.',
      ],
      answers: [1, 2],
      hints: [
        'Mỗi trường hợp cần đúng hai cặp dữ kiện ngoài góc vuông, và ít nhất một cặp là cạnh.',
      ],
      solution:
        'Đúng: khẳng định 2 (cạnh huyền - cạnh góc vuông) và 3 (g.c.g). Sai: chỉ có góc thì tam giác có thể to nhỏ khác nhau; chỉ có cạnh huyền thì góc nhọn có thể khác nhau.',
    },
  ],
  takeaways: [
    'Hai tam giác vuông bằng nhau nếu có: hai cạnh góc vuông, hoặc một cạnh góc vuông và góc nhọn kề, tương ứng bằng nhau.',
    'Cạnh huyền và một góc nhọn bằng nhau cũng đủ, vì góc nhọn còn lại tự động bằng nhau.',
    'Cạnh huyền và một cạnh góc vuông bằng nhau là trường hợp riêng của tam giác vuông.',
    'Luôn chỉ rõ cạnh nào là cạnh huyền (đối diện góc vuông) trước khi chọn trường hợp.',
  ],
};
