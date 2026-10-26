/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai góc kề bù có tổng số đo 180 độ, hai góc đối đỉnh thì bằng nhau, tia phân giác chia một góc thành hai góc bằng nhau và cách vẽ tia phân giác.',
  intro:
    'Hai chiếc đũa đặt chéo nhau, hai thanh của một chiếc kéo đang mở: đó là hình ảnh hai đường thẳng cắt nhau. Chúng tạo thành bốn góc có chung đỉnh. Trong bài này em sẽ biết các góc ấy liên hệ với nhau thế nào và làm sao chia một góc thành hai phần bằng nhau.',
  objectives: [
    'Nhận biết hai góc kề bù và dùng tính chất: hai góc kề bù có tổng số đo bằng $180^\\circ$.',
    'Nhận biết hai góc đối đỉnh và dùng tính chất: hai góc đối đỉnh thì bằng nhau.',
    'Nhận biết tia phân giác của một góc, tính số đo các góc tạo bởi tia phân giác và vẽ tia phân giác bằng dụng cụ học tập.',
  ],
  sections: [
    {
      heading: 'Hai góc kề bù',
      blocks: [
        {
          type: 'p',
          text: "Vẽ góc $\\widehat{xOy}$ rồi vẽ tia $Ox'$ là tia đối của tia $Ox$. Ta được hai góc $\\widehat{xOy}$ và $\\widehat{yOx'}$: chúng có chung cạnh $Oy$, còn hai cạnh kia $Ox$ và $Ox'$ là hai tia đối nhau.",
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai góc kề bù',
          text: 'Hai góc có một cạnh chung, hai cạnh còn lại là hai tia đối nhau được gọi là hai góc kề bù.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: "Hai góc kề bù có tổng số đo bằng $180^\\circ$: $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$.",
        },
        {
          type: 'p',
          text: "Vì $Ox$ và $Ox'$ là hai tia đối nhau nên $\\widehat{xOx'}$ là góc bẹt, và tia $Oy$ chia góc bẹt ấy thành hai góc kề bù. Do đó nếu biết một góc thì tính được góc kia: $\\widehat{yOx'} = 180^\\circ - \\widehat{xOy}$.",
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai góc có tổng số đo $180^\\circ$ (hai góc bù nhau) chưa chắc đã kề bù: chúng còn phải có chung một cạnh và hai cạnh còn lại là hai tia đối nhau.',
        },
      ],
    },
    {
      heading: 'Hai góc đối đỉnh',
      blocks: [
        {
          type: 'p',
          text: "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ tạo thành bốn góc: $\\widehat{xOy}$, $\\widehat{yOx'}$, $\\widehat{x'Oy'}$ và $\\widehat{y'Ox}$. Cạnh $Ox'$ của $\\widehat{x'Oy'}$ là tia đối của cạnh $Ox$, cạnh $Oy'$ là tia đối của cạnh $Oy$.",
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai góc đối đỉnh',
          text: 'Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.',
        },
        {
          type: 'p',
          text: "Hai đường thẳng cắt nhau tạo thành hai cặp góc đối đỉnh: $\\widehat{xOy}$ và $\\widehat{x'Oy'}$; $\\widehat{yOx'}$ và $\\widehat{y'Ox}$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Hai góc đối đỉnh thì bằng nhau.',
        },
        {
          type: 'p',
          text: "Lí do: $\\widehat{xOy}$ và $\\widehat{x'Oy'}$ cùng kề bù với $\\widehat{yOx'}$, nên cả hai đều bằng $180^\\circ - \\widehat{yOx'}$.",
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Điều ngược lại không đúng: hai góc bằng nhau chưa chắc đã đối đỉnh.',
        },
      ],
    },
    {
      heading: 'Tia phân giác của một góc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tia phân giác',
          text: 'Tia nằm giữa hai cạnh của một góc và tạo với hai cạnh ấy hai góc bằng nhau được gọi là tia phân giác của góc đó.',
        },
        {
          type: 'p',
          text: 'Nếu $Oz$ là tia phân giác của $\\widehat{xOy}$ thì:',
        },
        { type: 'tex', tex: '\\widehat{xOz} = \\widehat{zOy} = \\frac{\\widehat{xOy}}{2}.' },
        {
          type: 'p',
          text: 'Mỗi góc (khác góc bẹt) có đúng một tia phân giác. Đường thẳng chứa tia phân giác của một góc là đường phân giác của góc đó.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ bằng thước đo góc: đo $\\widehat{xOy}$, chẳng hạn $\\widehat{xOy} = 64^\\circ$; vẽ tia $Oz$ nằm giữa $Ox$, $Oy$ sao cho $\\widehat{xOz} = 64^\\circ : 2 = 32^\\circ$.',
            'Gấp giấy: vẽ góc $\\widehat{xOy}$ trên giấy, gấp sao cho cạnh $Ox$ trùng cạnh $Oy$; nếp gấp là tia phân giác.',
            'Dùng thước hai lề: đặt thước sao cho một lề trùng $Ox$, kẻ một đường theo lề kia; làm tương tự với $Oy$. Hai đường vừa kẻ cắt nhau tại $M$; tia $OM$ là tia phân giác của $\\widehat{xOy}$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đường thẳng cắt nhau',
    instruction:
      "Kéo điểm trên tia $Oy$ (hoặc dùng phím mũi tên) để xoay đường thẳng $yy'$. Chọn Đối đỉnh hoặc Kề bù để xem các cặp góc. Ở chế độ Tia phân giác, xoay tia $Ot$ cho đến khi hai góc $\\widehat{xOt}$ và $\\widehat{tOy}$ bằng nhau.",
  },
  examples: [
    {
      problem:
        "Cho hai góc kề bù $\\widehat{xOy}$ và $\\widehat{yOx'}$, biết $\\widehat{xOy} = 62^\\circ$. Tính $\\widehat{yOx'}$.",
      steps: [
        "Hai góc kề bù có tổng số đo bằng $180^\\circ$: $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$.",
        "Suy ra $\\widehat{yOx'} = 180^\\circ - 62^\\circ = 118^\\circ$.",
      ],
      answer: "$\\widehat{yOx'} = 118^\\circ$.",
    },
    {
      problem:
        'Hai đường thẳng $mn$ và $pq$ cắt nhau tại $O$, $\\widehat{mOp} = 50^\\circ$. Tính số đo ba góc còn lại.',
      steps: [
        '$\\widehat{nOq}$ và $\\widehat{mOp}$ là hai góc đối đỉnh ($On$ là tia đối của $Om$, $Oq$ là tia đối của $Op$), nên $\\widehat{nOq} = \\widehat{mOp} = 50^\\circ$.',
        '$\\widehat{pOn}$ và $\\widehat{mOp}$ kề bù (chung cạnh $Op$, còn $Om$, $On$ là hai tia đối nhau), nên $\\widehat{pOn} = 180^\\circ - 50^\\circ = 130^\\circ$.',
        '$\\widehat{mOq}$ và $\\widehat{pOn}$ đối đỉnh, nên $\\widehat{mOq} = 130^\\circ$.',
      ],
      answer: '$\\widehat{nOq} = 50^\\circ$, $\\widehat{pOn} = \\widehat{mOq} = 130^\\circ$.',
    },
    {
      problem:
        "Cho $\\widehat{xOy} = 140^\\circ$ và $Ox'$ là tia đối của tia $Ox$. Vẽ tia phân giác $Om$ của $\\widehat{xOy}$. Tính $\\widehat{mOx'}$.",
      steps: [
        '$Om$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{xOm} = 140^\\circ : 2 = 70^\\circ$.',
        "$\\widehat{xOm}$ và $\\widehat{mOx'}$ kề bù (chung cạnh $Om$, còn $Ox$, $Ox'$ là hai tia đối nhau).",
        "Suy ra $\\widehat{mOx'} = 180^\\circ - 70^\\circ = 110^\\circ$.",
      ],
      answer: "$\\widehat{mOx'} = 110^\\circ$.",
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Hai góc $\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù, $\\widehat{xOy} = 35^\\circ$. Tính $\\widehat{yOx'}$ (đơn vị độ).",
      answer: 145,
      unit: '°',
      hints: [
        'Hai góc kề bù có tổng số đo bằng bao nhiêu?',
        'Lấy $180^\\circ$ trừ đi $35^\\circ$.',
      ],
      solution: "$\\widehat{yOx'} = 180^\\circ - 35^\\circ = 145^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        "Hai đường thẳng $aa'$ và $bb'$ cắt nhau tại $O$, $\\widehat{aOb} = 72^\\circ$. Tính $\\widehat{a'Ob'}$ (đơn vị độ).",
      answer: 72,
      unit: '°',
      hints: [
        "$Oa'$ là tia đối của $Oa$, $Ob'$ là tia đối của $Ob$. Hai góc $\\widehat{aOb}$ và $\\widehat{a'Ob'}$ ở vị trí nào?",
      ],
      solution:
        "$\\widehat{a'Ob'}$ và $\\widehat{aOb}$ đối đỉnh nên $\\widehat{a'Ob'} = 72^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        "Cũng với hai đường thẳng $aa'$ và $bb'$ cắt nhau tại $O$, $\\widehat{aOb} = 72^\\circ$. Tính $\\widehat{aOb'}$ (đơn vị độ).",
      answer: 108,
      unit: '°',
      hints: [
        "$\\widehat{aOb}$ và $\\widehat{aOb'}$ có chung cạnh $Oa$; hai cạnh còn lại $Ob$, $Ob'$ là hai tia thế nào?",
        'Hai góc đó kề bù.',
      ],
      solution:
        "$\\widehat{aOb}$ và $\\widehat{aOb'}$ kề bù nên $\\widehat{aOb'} = 180^\\circ - 72^\\circ = 108^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        '$Ot$ là tia phân giác của $\\widehat{xOy}$ và $\\widehat{xOt} = 38^\\circ$. Tính $\\widehat{xOy}$ (đơn vị độ).',
      answer: 76,
      unit: '°',
      hints: ['Tia phân giác chia góc thành hai góc bằng nhau, mỗi góc bằng một nửa góc ban đầu.'],
      solution:
        '$\\widehat{tOy} = \\widehat{xOt} = 38^\\circ$, nên $\\widehat{xOy} = 2 \\cdot 38^\\circ = 76^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Câu nào là định nghĩa hai góc đối đỉnh?',
      options: [
        'Hai góc có chung đỉnh và có số đo bằng nhau.',
        'Hai góc có một cạnh chung, hai cạnh còn lại là hai tia đối nhau.',
        'Hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.',
        'Hai góc có tổng số đo bằng $180^\\circ$.',
      ],
      answer: 2,
      hints: ['Nhớ lại định nghĩa: điều kiện nói về các cạnh của hai góc, không nói về số đo.'],
      solution:
        'Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia. Phương án thứ hai là định nghĩa hai góc kề bù; hai góc bằng nhau hoặc có tổng $180^\\circ$ chưa chắc là đối đỉnh.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Hai góc đối đỉnh thì bằng nhau.',
        'Hai góc bằng nhau thì đối đỉnh.',
        'Hai góc kề bù có tổng số đo bằng $180^\\circ$.',
        'Hai góc có tổng số đo bằng $180^\\circ$ thì kề bù.',
        'Tia phân giác của một góc tạo với hai cạnh của góc đó hai góc bằng nhau.',
      ],
      answers: [0, 2, 4],
      hints: [
        'Một tính chất đúng chưa chắc đúng khi đảo ngược lại.',
        'Thử vẽ hai góc bằng nhau ở hai chỗ khác nhau trên trang giấy: chúng có đối đỉnh không?',
      ],
      solution:
        'Đúng: hai góc đối đỉnh thì bằng nhau; hai góc kề bù có tổng $180^\\circ$; tia phân giác tạo với hai cạnh hai góc bằng nhau. Sai: hai góc bằng nhau có thể ở hai chỗ khác nhau nên không đối đỉnh; hai góc có tổng $180^\\circ$ có thể không có cạnh chung nên không kề bù.',
    },
    {
      type: 'number',
      prompt:
        'Hai góc kề bù, trong đó số đo góc này gấp $4$ lần số đo góc kia. Tính số đo góc lớn hơn (đơn vị độ).',
      answer: 144,
      unit: '°',
      hints: [
        'Gọi góc nhỏ là $x$, góc lớn là $4x$. Tổng của chúng bằng bao nhiêu?',
        'Giải $x + 4x = 180^\\circ$.',
      ],
      solution:
        '$x + 4x = 180^\\circ$ nên $5x = 180^\\circ$, $x = 36^\\circ$. Góc lớn bằng $4 \\cdot 36^\\circ = 144^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hai đường thẳng cắt nhau tạo thành bốn góc. Tổng của hai góc đối đỉnh bằng $100^\\circ$. Tính số đo mỗi góc trong hai góc còn lại (đơn vị độ).',
      answer: 130,
      unit: '°',
      hints: [
        'Hai góc đối đỉnh bằng nhau, nên mỗi góc bằng $100^\\circ : 2$.',
        'Mỗi góc còn lại kề bù với một trong hai góc đó.',
      ],
      solution:
        'Hai góc đối đỉnh bằng nhau nên mỗi góc bằng $50^\\circ$. Mỗi góc còn lại kề bù với một góc $50^\\circ$, nên bằng $180^\\circ - 50^\\circ = 130^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        "Cho $\\widehat{xOy} = 120^\\circ$, $Ox'$ là tia đối của tia $Ox$ và $On$ là tia phân giác của $\\widehat{yOx'}$. Tính $\\widehat{yOn}$ (đơn vị độ).",
      answer: 30,
      unit: '°',
      hints: [
        "Trước hết tính $\\widehat{yOx'}$: nó kề bù với $\\widehat{xOy}$.",
        "Rồi lấy một nửa của $\\widehat{yOx'}$.",
      ],
      solution:
        "$\\widehat{yOx'} = 180^\\circ - 120^\\circ = 60^\\circ$. $On$ là tia phân giác của $\\widehat{yOx'}$ nên $\\widehat{yOn} = 60^\\circ : 2 = 30^\\circ$.",
    },
  ],
  takeaways: [
    'Hai góc kề bù: có một cạnh chung, hai cạnh còn lại là hai tia đối nhau; tổng số đo bằng $180^\\circ$.',
    'Hai góc đối đỉnh: mỗi cạnh của góc này là tia đối của một cạnh của góc kia; hai góc đối đỉnh thì bằng nhau.',
    'Tia $Oz$ là tia phân giác của $\\widehat{xOy}$ khi $Oz$ nằm giữa $Ox$, $Oy$ và $\\widehat{xOz} = \\widehat{zOy} = \\dfrac{\\widehat{xOy}}{2}$.',
  ],
};
