/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định lí tổng ba góc trong một tam giác bằng 180 độ, tam giác nhọn, vuông, tù, hai góc nhọn phụ nhau trong tam giác vuông và góc ngoài của tam giác.',
  intro:
    'Người ta lát nền bằng những viên gạch hình tam giác giống hệt nhau. Tại mỗi điểm chung, ba góc khác nhau của ba viên gạch nằm kề nhau và ghép lại vừa khít một góc bẹt. Phải chăng ba góc của một tam giác luôn có tổng bằng $180^\\circ$? Bài này trả lời câu hỏi đó và chỉ ra cách dùng nó để tính góc.',
  objectives: [
    'Phát biểu và chứng minh định lí: tổng ba góc trong một tam giác bằng $180^\\circ$.',
    'Nhận biết tam giác nhọn, tam giác vuông, tam giác tù; biết hai góc nhọn của tam giác vuông phụ nhau.',
    'Nhận biết góc ngoài của tam giác và tính nó bằng tổng hai góc trong không kề với nó.',
    'Tính số đo góc chưa biết của một tam giác.',
  ],
  sections: [
    {
      heading: 'Tổng ba góc trong một tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Vẽ một tam giác bất kì, đo ba góc rồi cộng lại, ta luôn được khoảng $180^\\circ$. Cắt một tam giác bằng giấy, xé hai góc rồi đặt kề góc thứ ba, ba góc ghép lại thành một góc bẹt.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Tổng ba góc trong một tam giác bằng $180^\\circ$.',
        },
        {
          type: 'tex',
          tex: '\\triangle ABC:\\quad \\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ',
        },
        {
          type: 'p',
          text: 'Chứng minh. Qua $A$ kẻ đường thẳng $xy$ song song với $BC$ (tia $Ax$ cùng phía với $B$ so với đường thẳng $AC$). Vì $xy \\parallel BC$ nên $\\widehat{xAB} = \\widehat{B}$ và $\\widehat{yAC} = \\widehat{C}$ (các cặp góc so le trong). Ba góc $\\widehat{xAB}$, $\\widehat{BAC}$, $\\widehat{CAy}$ tạo thành góc bẹt $xAy$, nên $\\widehat{B} + \\widehat{BAC} + \\widehat{C} = 180^\\circ$.',
        },
      ],
    },
    {
      heading: 'Tam giác nhọn, tam giác vuông, tam giác tù',
      blocks: [
        {
          type: 'table',
          head: ['Loại tam giác', 'Đặc điểm về góc'],
          rows: [
            ['Tam giác nhọn', 'Ba góc đều là góc nhọn.'],
            ['Tam giác vuông', 'Có một góc vuông.'],
            ['Tam giác tù', 'Có một góc tù.'],
          ],
        },
        {
          type: 'p',
          text: 'Vì tổng ba góc là $180^\\circ$, một tam giác không thể có hai góc vuông hay hai góc tù; mọi tam giác đều có ít nhất hai góc nhọn.',
        },
        {
          type: 'p',
          text: 'Trong tam giác vuông, cạnh đối diện với góc vuông gọi là cạnh huyền, hai cạnh kề góc vuông gọi là cạnh góc vuông.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai góc phụ nhau',
          text: 'Hai góc có tổng số đo bằng $90^\\circ$ là hai góc phụ nhau. Trong tam giác $ABC$ vuông tại $A$: $\\widehat{B} + \\widehat{C} = 180^\\circ - 90^\\circ = 90^\\circ$, tức là hai góc nhọn của tam giác vuông phụ nhau.',
        },
      ],
    },
    {
      heading: 'Góc ngoài của tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc ngoài',
          text: 'Góc ngoài của một tam giác là góc kề bù với một góc của tam giác ấy. Chẳng hạn, vẽ tia $Cx$ là tia đối của tia $CB$, thì $\\widehat{ACx}$ là góc ngoài tại đỉnh $C$ của tam giác $ABC$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Mỗi góc ngoài của một tam giác bằng tổng hai góc trong không kề với nó: $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$.',
        },
        {
          type: 'p',
          text: 'Từ đó, góc ngoài của tam giác lớn hơn mỗi góc trong không kề với nó.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Góc ngoài tại $C$ kề bù với $\\widehat{C}$, nhưng lại bằng tổng của hai góc còn lại $\\widehat{A} + \\widehat{B}$, không phải bằng $\\widehat{C}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xé ba góc, ghép thành góc bẹt',
    instruction:
      'Kéo các đỉnh $A$, $B$, $C$ để thay đổi tam giác. Chế độ "Ghép ba góc" đặt ba góc cạnh nhau trên một đường thẳng; "Kẻ xy // BC" cho thấy cách chứng minh bằng góc so le trong; "Góc ngoài" vẽ tia $Cx$ đối với tia $CB$ để so sánh góc ngoài với tổng hai góc trong không kề với nó.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{A} = 60^\\circ$, $\\widehat{B} = 75^\\circ$. Tính $\\widehat{C}$.',
      steps: [
        'Tổng ba góc trong tam giác $ABC$ bằng $180^\\circ$: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.',
        '$\\widehat{C} = 180^\\circ - 60^\\circ - 75^\\circ = 45^\\circ$.',
      ],
      answer: '$\\widehat{C} = 45^\\circ$.',
    },
    {
      problem:
        'Cho tam giác $ABC$, tia $Cx$ là tia đối của tia $CB$. Chứng minh rằng $\\widehat{ACx} = \\widehat{BAC} + \\widehat{ABC}$.',
      steps: [
        '$\\widehat{ACx}$ và $\\widehat{ACB}$ là hai góc kề bù nên $\\widehat{ACx} = 180^\\circ - \\widehat{ACB}$.',
        'Theo định lí tổng ba góc: $\\widehat{BAC} + \\widehat{ABC} = 180^\\circ - \\widehat{ACB}$.',
        'Hai vế phải bằng nhau, nên $\\widehat{ACx} = \\widehat{BAC} + \\widehat{ABC}$.',
      ],
      answer: 'Góc ngoài $\\widehat{ACx}$ bằng tổng hai góc trong không kề với nó.',
    },
    {
      problem:
        'Tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = 2\\,\\widehat{C}$. Tính $\\widehat{B}$ và $\\widehat{C}$.',
      steps: [
        'Hai góc nhọn của tam giác vuông phụ nhau: $\\widehat{B} + \\widehat{C} = 90^\\circ$.',
        'Thay $\\widehat{B} = 2\\,\\widehat{C}$: $3\\,\\widehat{C} = 90^\\circ$, nên $\\widehat{C} = 30^\\circ$.',
        '$\\widehat{B} = 2 \\cdot 30^\\circ = 60^\\circ$.',
      ],
      answer: '$\\widehat{B} = 60^\\circ$, $\\widehat{C} = 30^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 65^\\circ$, $\\widehat{B} = 45^\\circ$. Tính $\\widehat{C}$ (độ).',
      answer: 70,
      unit: '°',
      hints: ['Tổng ba góc trong một tam giác bằng $180^\\circ$.'],
      solution: '$\\widehat{C} = 180^\\circ - 65^\\circ - 45^\\circ = 70^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $MNP$ vuông tại $M$ có $\\widehat{N} = 32^\\circ$. Tính $\\widehat{P}$ (độ).',
      answer: 58,
      unit: '°',
      hints: [
        'Hai góc nhọn của tam giác vuông phụ nhau.',
        '$\\widehat{N} + \\widehat{P} = 90^\\circ$.',
      ],
      solution: '$\\widehat{P} = 90^\\circ - 32^\\circ = 58^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $DEF$ có $\\widehat{D} = 30^\\circ$, $\\widehat{E} = 50^\\circ$. Tam giác $DEF$ là tam giác gì?',
      options: ['Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù'],
      answer: 2,
      hints: ['Tính góc còn lại $\\widehat{F}$ trước.', 'So sánh $\\widehat{F}$ với $90^\\circ$.'],
      solution:
        '$\\widehat{F} = 180^\\circ - 30^\\circ - 50^\\circ = 100^\\circ > 90^\\circ$, nên $DEF$ là tam giác tù.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 70^\\circ$. Tia $Cx$ là tia đối của tia $CB$. Tính góc ngoài $\\widehat{ACx}$ (độ).',
      answer: 120,
      unit: '°',
      hints: ['Góc ngoài bằng tổng hai góc trong không kề với nó.'],
      solution:
        '$\\widehat{ACx} = \\widehat{A} + \\widehat{B} = 50^\\circ + 70^\\circ = 120^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có góc ngoài tại đỉnh $B$ bằng $110^\\circ$ và $\\widehat{A} = 45^\\circ$. Tính $\\widehat{C}$ (độ).',
      answer: 65,
      unit: '°',
      hints: [
        'Góc ngoài tại $B$ không kề với hai góc nào của tam giác?',
        'Góc ngoài tại $B$ bằng $\\widehat{A} + \\widehat{C}$.',
      ],
      solution:
        '$\\widehat{A} + \\widehat{C} = 110^\\circ$, nên $\\widehat{C} = 110^\\circ - 45^\\circ = 65^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{B} = \\widehat{C}$ và $\\widehat{A} = 40^\\circ$. Tính $\\widehat{B}$ (độ).',
      answer: 70,
      unit: '°',
      hints: [
        '$\\widehat{B} + \\widehat{C} = 180^\\circ - 40^\\circ$.',
        'Hai góc bằng nhau nên mỗi góc bằng một nửa tổng.',
      ],
      solution:
        '$\\widehat{B} + \\widehat{C} = 180^\\circ - 40^\\circ = 140^\\circ$, mà $\\widehat{B} = \\widehat{C}$ nên $\\widehat{B} = 140^\\circ : 2 = 70^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Ba góc $\\widehat{A}$, $\\widehat{B}$, $\\widehat{C}$ của tam giác $ABC$ tỉ lệ với $2$, $3$, $4$. Tính $\\widehat{C}$ (độ).',
      answer: 80,
      unit: '°',
      hints: [
        'Đặt $\\widehat{A} = 2k$, $\\widehat{B} = 3k$, $\\widehat{C} = 4k$.',
        '$2k + 3k + 4k = 180^\\circ$.',
      ],
      solution:
        '$9k = 180^\\circ$ nên $k = 20^\\circ$. Vậy $\\widehat{A} = 40^\\circ$, $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 4 \\cdot 20^\\circ = 80^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Một tam giác có ba góc bằng nhau. Mỗi góc của nó bằng bao nhiêu độ?',
      answer: 60,
      unit: '°',
      hints: ['Ba góc bằng nhau và có tổng $180^\\circ$.'],
      solution: 'Mỗi góc bằng $180^\\circ : 3 = 60^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Một tam giác có thể có hai góc vuông.',
        'Mọi tam giác đều có ít nhất hai góc nhọn.',
        'Góc ngoài của một tam giác lớn hơn mỗi góc trong không kề với nó.',
        'Tam giác tù có hai góc tù.',
        'Trong tam giác vuông, hai góc nhọn phụ nhau.',
      ],
      answers: [1, 2, 4],
      hints: [
        'Thử cộng hai góc vuông, hay hai góc tù: còn chỗ cho góc thứ ba không?',
        'Góc ngoài bằng tổng hai góc trong không kề với nó, mà mỗi góc đều dương.',
      ],
      solution:
        'Hai góc vuông (hoặc hai góc tù) đã có tổng không nhỏ hơn $180^\\circ$, không còn chỗ cho góc thứ ba, nên các khẳng định 1 và 4 sai, và tam giác có ít nhất hai góc nhọn. Góc ngoài $= \\widehat{A} + \\widehat{B}$ lớn hơn từng góc $\\widehat{A}$, $\\widehat{B}$. Trong tam giác vuông, $\\widehat{B} + \\widehat{C} = 90^\\circ$.',
    },
  ],
  takeaways: [
    'Tổng ba góc trong một tam giác bằng $180^\\circ$.',
    'Tam giác nhọn có ba góc nhọn, tam giác vuông có một góc vuông, tam giác tù có một góc tù.',
    'Trong tam giác vuông, hai góc nhọn phụ nhau (tổng bằng $90^\\circ$).',
    'Góc ngoài của tam giác kề bù với một góc của tam giác và bằng tổng hai góc trong không kề với nó.',
  ],
};
