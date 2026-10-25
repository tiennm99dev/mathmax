/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc nội tiếp của đường tròn, số đo bằng nửa số đo cung bị chắn, các hệ quả về góc cùng chắn một cung và góc nội tiếp chắn nửa đường tròn.',
  intro:
    'Đứng ở bất kì chỗ nào trên khán đài hình tròn, em nhìn khung thành dưới cùng một góc. Đó là tính chất của góc nội tiếp: đỉnh nằm trên đường tròn, hai cạnh chứa hai dây cung, và số đo luôn bằng nửa số đo cung bị chắn.',
  objectives: [
    'Nhận biết góc nội tiếp và cung bị chắn của nó.',
    'Phát biểu và vận dụng: số đo góc nội tiếp bằng nửa số đo cung bị chắn.',
    'Vận dụng các hệ quả: các góc nội tiếp cùng chắn một cung thì bằng nhau, góc nội tiếp chắn nửa đường tròn là góc vuông.',
  ],
  sections: [
    {
      heading: 'Góc nội tiếp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc nội tiếp',
          text: 'Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó. Cung nằm bên trong góc gọi là cung bị chắn.',
        },
        {
          type: 'p',
          text: 'Với $M$, $A$, $B$ nằm trên đường tròn $(O)$, góc $\\widehat{AMB}$ là góc nội tiếp chắn cung $AB$ không chứa $M$. Góc ở tâm $\\widehat{AOB}$ có đỉnh là tâm $O$ và có số đo bằng số đo cung nhỏ $AB$.',
        },
      ],
    },
    {
      heading: 'Liên hệ với cung bị chắn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong một đường tròn, số đo của góc nội tiếp bằng nửa số đo của cung bị chắn: $$\\widehat{AMB} = \\frac{1}{2}\\, \\text{sđ}\\,\\overset{\\frown}{AB}.$$',
        },
        {
          type: 'p',
          text: 'Khi $M$ nằm trên cung lớn, cung bị chắn là cung nhỏ $AB$ và $\\widehat{AMB} = \\dfrac{1}{2}\\widehat{AOB}$. Khi $M$ chuyển sang cung nhỏ, góc chắn cung lớn (lớn hơn $180^\\circ$) nên $\\widehat{AMB}$ trở thành góc tù.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số đo cung lớn bằng $360^\\circ$ trừ số đo cung nhỏ. Hai góc nội tiếp ở hai phía của dây $AB$ có tổng bằng $180^\\circ$.',
        },
      ],
    },
    {
      heading: 'Hệ quả',
      blocks: [
        {
          type: 'list',
          items: [
            'Các góc nội tiếp cùng chắn một cung (hoặc chắn các cung bằng nhau) thì bằng nhau.',
            'Góc nội tiếp (nhỏ hơn hoặc bằng $90^\\circ$) có số đo bằng nửa số đo góc ở tâm cùng chắn một cung.',
            'Góc nội tiếp chắn nửa đường tròn là góc vuông.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nếu $AB$ là đường kính và $M$ nằm trên đường tròn ($M \\ne A, B$) thì $\\widehat{AMB} = 90^\\circ$. Đây là cách nhanh để tạo ra góc vuông.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh của góc nội tiếp',
    instruction:
      'Kéo điểm M quanh đường tròn. Khi M ở trên cùng một cung, số đo ∠AMB không đổi; khi M vượt qua A hoặc B, cung bị chắn đổi và góc đổi theo.',
  },
  examples: [
    {
      problem:
        'Cho đường tròn $(O)$ có $\\widehat{AOB} = 120^\\circ$, $M$ nằm trên cung lớn $AB$. Tính $\\widehat{AMB}$.',
      steps: [
        'Góc ở tâm $\\widehat{AOB} = 120^\\circ$ nên cung nhỏ $AB$ có số đo $120^\\circ$.',
        '$M$ ở trên cung lớn nên $\\widehat{AMB}$ chắn cung nhỏ $AB$.',
        '$\\widehat{AMB} = \\dfrac{1}{2} \\cdot 120^\\circ$.',
      ],
      answer: '$\\widehat{AMB} = 60^\\circ$.',
    },
    {
      problem:
        'Vẫn đường tròn trên, nếu $M$ nằm trên cung nhỏ $AB$ thì $\\widehat{AMB}$ bằng bao nhiêu?',
      steps: [
        'Khi đó góc chắn cung lớn $AB$, có số đo $360^\\circ - 120^\\circ = 240^\\circ$.',
        '$\\widehat{AMB} = \\dfrac{1}{2} \\cdot 240^\\circ$.',
      ],
      answer: '$\\widehat{AMB} = 120^\\circ$.',
    },
    {
      problem:
        'Cho $AB$ là đường kính của $(O)$, $C$ nằm trên đường tròn, $AC = 6$ cm, $BC = 8$ cm. Tính bán kính.',
      steps: [
        '$\\widehat{ACB}$ chắn nửa đường tròn nên $\\widehat{ACB} = 90^\\circ$.',
        'Theo định lí Pythagore: $AB^2 = 6^2 + 8^2 = 100$, $AB = 10$ cm.',
      ],
      answer: 'Bán kính bằng $AB : 2 = 5$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Góc nội tiếp chắn cung có số đo $80^\\circ$. Số đo góc đó là bao nhiêu độ?',
      answer: 40,
      unit: '°',
      hints: ['Góc nội tiếp bằng nửa cung bị chắn.'],
      solution: '$80^\\circ : 2 = 40^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Góc nội tiếp $\\widehat{ACB} = 35^\\circ$. Góc ở tâm $\\widehat{AOB}$ cùng chắn cung $AB$ bằng bao nhiêu độ?',
      answer: 70,
      unit: '°',
      hints: ['Góc ở tâm gấp đôi góc nội tiếp cùng chắn một cung.'],
      solution: '$\\widehat{AOB} = 2 \\cdot 35^\\circ = 70^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        '$AB$ là đường kính của $(O)$ và $M$ nằm trên đường tròn ($M \\ne A, B$). Khi đó $\\widehat{AMB}$',
      options: [
        'bằng $45^\\circ$',
        'bằng $90^\\circ$',
        'bằng $180^\\circ$',
        'phụ thuộc vị trí của $M$',
      ],
      answer: 1,
      hints: ['Đường kính chia đường tròn thành hai nửa, mỗi nửa $180^\\circ$.'],
      solution:
        'Góc nội tiếp chắn nửa đường tròn bằng $\\dfrac{1}{2} \\cdot 180^\\circ = 90^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Bốn điểm $A, B, C, D$ nằm trên một đường tròn, $C$ và $D$ cùng phía với dây $AB$, $\\widehat{ACB} = 52^\\circ$. Tính $\\widehat{ADB}$.',
      answer: 52,
      unit: '°',
      hints: ['Hai góc cùng chắn cung $AB$ nào?'],
      solution:
        '$\\widehat{ACB}$ và $\\widehat{ADB}$ cùng chắn cung $AB$ nên bằng nhau: $52^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Trong $(O)$, cung nhỏ $AB$ có số đo $100^\\circ$. $M$ nằm trên cung nhỏ $AB$. Tính $\\widehat{AMB}$.',
      answer: 130,
      unit: '°',
      hints: [
        '$M$ trên cung nhỏ nên góc chắn cung lớn.',
        'Cung lớn: $360^\\circ - 100^\\circ = 260^\\circ$.',
      ],
      solution: '$\\widehat{AMB} = \\dfrac{1}{2} \\cdot 260^\\circ = 130^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Mọi góc nội tiếp chắn nửa đường tròn đều là góc vuông.',
        'Góc nội tiếp luôn bằng góc ở tâm cùng chắn một cung.',
        'Hai góc nội tiếp cùng chắn một cung thì bằng nhau.',
        'Góc có đỉnh nằm trên đường tròn luôn là góc nội tiếp.',
      ],
      answers: [0, 2],
      hints: [
        'Góc nội tiếp bằng nửa, không bằng, góc ở tâm.',
        'Hai cạnh của góc nội tiếp phải chứa hai dây cung.',
      ],
      solution:
        'Khẳng định 1 và 3 đúng. Góc nội tiếp bằng nửa góc ở tâm; một góc có đỉnh trên đường tròn nhưng cạnh không cắt đường tròn thì không phải góc nội tiếp.',
    },
  ],
  takeaways: [
    'Góc nội tiếp có đỉnh trên đường tròn và hai cạnh chứa hai dây cung.',
    'Số đo góc nội tiếp bằng nửa số đo cung bị chắn.',
    'Các góc nội tiếp cùng chắn một cung thì bằng nhau.',
    'Góc nội tiếp chắn nửa đường tròn là góc vuông.',
  ],
};
