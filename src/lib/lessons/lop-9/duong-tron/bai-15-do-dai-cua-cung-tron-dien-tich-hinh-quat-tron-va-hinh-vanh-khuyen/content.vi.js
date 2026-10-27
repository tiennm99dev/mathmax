/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức tính độ dài cung tròn n độ, diện tích hình quạt tròn và diện tích hình vành khuyên, cùng các bài toán thực tế.',
  intro:
    'Một chiếc quạt giấy xòe ra, một miếng bánh pizza cắt từ tâm, hay mặt một chiếc đĩa CD có lỗ ở giữa: đó là hình quạt tròn và hình vành khuyên. Muốn tính viền cong của miếng bánh hay diện tích mặt đĩa, ta chỉ cần biết chúng chiếm bao nhiêu phần của cả hình tròn.',
  objectives: [
    'Tính độ dài cung tròn $n^\\circ$ của đường tròn bán kính $R$.',
    'Nhận biết hình quạt tròn, hình vành khuyên và tính diện tích của chúng.',
    'Vận dụng các công thức để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Độ dài cung tròn',
      blocks: [
        {
          type: 'p',
          text: 'Độ dài (chu vi) của đường tròn bán kính $R$ là $C = 2\\pi R$. Cả đường tròn ứng với cung $360^\\circ$, nên cung $1^\\circ$ có độ dài $\\dfrac{2\\pi R}{360} = \\dfrac{\\pi R}{180}$, và cung $n^\\circ$ có độ dài gấp $n$ lần.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ dài cung tròn',
          text: 'Trên đường tròn bán kính $R$, độ dài $l$ của một cung $n^\\circ$ là $$l = \\frac{\\pi R n}{180}.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lưu ý',
          text: 'Khi tính gần đúng, ta thường lấy $\\pi \\approx 3{,}14$ hoặc dùng phím $\\pi$ của máy tính cầm tay, rồi làm tròn kết quả theo yêu cầu. Nên giữ $\\pi$ trong các bước trung gian và chỉ làm tròn ở bước cuối.',
        },
      ],
    },
    {
      heading: 'Hình quạt tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình quạt tròn',
          text: 'Hình quạt tròn là một phần hình tròn giới hạn bởi một cung tròn và hai bán kính đi qua hai mút của cung đó. Hình quạt ứng với cung $n^\\circ$ gọi là hình quạt tròn $n^\\circ$.',
        },
        {
          type: 'p',
          text: 'Hình tròn bán kính $R$ có diện tích $\\pi R^2$ và ứng với $360^\\circ$, nên hình quạt $n^\\circ$ chiếm $\\dfrac{n}{360}$ diện tích hình tròn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích hình quạt tròn',
          text: 'Diện tích $S$ của hình quạt tròn bán kính $R$, cung $n^\\circ$ là $$S = \\frac{\\pi R^2 n}{360}.$$',
        },
        {
          type: 'p',
          text: 'Vì $l = \\dfrac{\\pi R n}{180}$ nên ta cũng có $S = \\dfrac{lR}{2}$: diện tích hình quạt bằng nửa tích độ dài cung với bán kính.',
        },
      ],
    },
    {
      heading: 'Hình vành khuyên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình vành khuyên',
          text: 'Cho hai đường tròn cùng tâm $O$, bán kính $R$ và $r$ ($R > r$). Phần hình tròn $(O; R)$ nằm bên ngoài hình tròn $(O; r)$ gọi là hình vành khuyên.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích hình vành khuyên',
          text: 'Diện tích hình vành khuyên giới hạn bởi hai đường tròn $(O; R)$ và $(O; r)$ với $R > r$ là $$S = \\pi R^2 - \\pi r^2 = \\pi\\left(R^2 - r^2\\right).$$',
        },
      ],
    },
  ],
  explore: {
    title: 'Mở hình quạt, khoét vành khuyên',
    instruction:
      'Ở chế độ "Hình quạt tròn", kéo chấm đỏ quanh tâm để đổi số đo cung $n$, kéo chấm xám để đổi bán kính $R$. Hình quạt chiếm $\\dfrac{n}{360}$ hình tròn, nên độ dài cung và diện tích cũng bằng $\\dfrac{n}{360}$ chu vi và diện tích hình tròn. Chuyển sang "Hình vành khuyên" và đổi hai bán kính.',
  },
  examples: [
    {
      problem:
        'Tính độ dài cung $60^\\circ$ của đường tròn bán kính $6$ cm (làm tròn đến hàng phần trăm).',
      steps: [
        'Áp dụng công thức $l = \\dfrac{\\pi R n}{180}$ với $R = 6$, $n = 60$.',
        '$l = \\dfrac{\\pi \\cdot 6 \\cdot 60}{180} = 2\\pi$.',
        '$2\\pi \\approx 6{,}28$ cm.',
      ],
      answer: '$l = 2\\pi \\approx 6{,}28$ cm.',
    },
    {
      problem:
        'Một chiếc quạt giấy khi xòe ra là hình quạt tròn bán kính $10$ cm, cung $72^\\circ$. Tính diện tích mặt quạt (làm tròn đến hàng phần trăm).',
      steps: [
        'Áp dụng $S = \\dfrac{\\pi R^2 n}{360}$ với $R = 10$, $n = 72$.',
        '$S = \\dfrac{\\pi \\cdot 100 \\cdot 72}{360} = 20\\pi$.',
        '$20\\pi \\approx 62{,}83$ cm².',
      ],
      answer: 'Diện tích mặt quạt là $20\\pi \\approx 62{,}83$ cm².',
    },
    {
      problem:
        'Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính $5$ cm và $3$ cm (làm tròn đến hàng phần trăm).',
      steps: [
        '$S = \\pi\\left(R^2 - r^2\\right)$ với $R = 5$, $r = 3$.',
        '$S = \\pi(25 - 9) = 16\\pi$.',
        '$16\\pi \\approx 50{,}27$ cm².',
      ],
      answer: '$S = 16\\pi \\approx 50{,}27$ cm².',
    },
    {
      problem:
        'Kim phút của một chiếc đồng hồ dài $10$ cm. Trong $20$ phút, đầu kim phút vạch nên một cung tròn dài bao nhiêu (làm tròn đến hàng phần trăm)?',
      steps: [
        'Kim phút quay một vòng $360^\\circ$ trong $60$ phút, nên trong $20$ phút nó quay $\\dfrac{20}{60} \\cdot 360^\\circ = 120^\\circ$.',
        '$l = \\dfrac{\\pi \\cdot 10 \\cdot 120}{180} = \\dfrac{20\\pi}{3}$.',
        '$\\dfrac{20\\pi}{3} \\approx 20{,}94$ cm.',
      ],
      answer: 'Đầu kim vạch cung dài khoảng $20{,}94$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tính độ dài cung $40^\\circ$ của đường tròn bán kính $9$ cm (làm tròn đến hàng phần trăm).',
      answer: 6.28,
      tolerance: 0.005,
      unit: 'cm',
      hints: [
        '$l = \\dfrac{\\pi R n}{180}$.',
        'Rút gọn $\\dfrac{9 \\cdot 40}{180}$ trước khi nhân với $\\pi$.',
      ],
      solution: '$l = \\dfrac{\\pi \\cdot 9 \\cdot 40}{180} = 2\\pi \\approx 6{,}28$ cm.',
    },
    {
      type: 'number',
      prompt: 'Một cung $90^\\circ$ có độ dài $3\\pi$ cm. Tính bán kính của đường tròn.',
      answer: 6,
      unit: 'cm',
      hints: ['Thay $n = 90$ vào $l = \\dfrac{\\pi R n}{180}$ để được $l$ theo $R$.'],
      solution:
        '$l = \\dfrac{\\pi R \\cdot 90}{180} = \\dfrac{\\pi R}{2}$. Từ $\\dfrac{\\pi R}{2} = 3\\pi$ suy ra $R = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình quạt tròn bán kính $6$ cm, cung $120^\\circ$ (làm tròn đến hàng phần trăm).',
      answer: 37.7,
      tolerance: 0.005,
      unit: 'cm²',
      hints: [
        '$S = \\dfrac{\\pi R^2 n}{360}$.',
        'Cung $120^\\circ$ là $\\dfrac{1}{3}$ đường tròn.',
      ],
      solution: '$S = \\dfrac{\\pi \\cdot 36 \\cdot 120}{360} = 12\\pi \\approx 37{,}70$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính $7$ cm và $4$ cm (làm tròn đến hàng phần trăm).',
      answer: 103.67,
      tolerance: 0.005,
      unit: 'cm²',
      hints: ['$S = \\pi\\left(R^2 - r^2\\right)$, với $R$ là bán kính lớn.'],
      solution: '$S = \\pi(49 - 16) = 33\\pi \\approx 103{,}67$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc dài $1{,}2$ m dao động, đầu con lắc vạch một cung tròn ứng với góc $30^\\circ$. Tính độ dài cung đó (làm tròn đến hàng phần trăm).',
      answer: 0.63,
      tolerance: 0.005,
      unit: 'm',
      hints: ['Chiều dài con lắc là bán kính, góc quét là số đo cung.'],
      solution: '$l = \\dfrac{\\pi \\cdot 1{,}2 \\cdot 30}{180} = 0{,}2\\pi \\approx 0{,}63$ m.',
    },
    {
      type: 'choice',
      prompt: 'Công thức tính diện tích hình quạt tròn bán kính $R$, cung $n^\\circ$ là',
      options: [
        '$S = \\dfrac{\\pi R n}{180}$',
        '$S = \\dfrac{\\pi R^2 n}{180}$',
        '$S = \\dfrac{\\pi R^2 n}{360}$',
        '$S = \\dfrac{\\pi R n}{360}$',
      ],
      answer: 2,
      hints: ['Hình quạt $n^\\circ$ chiếm $\\dfrac{n}{360}$ hình tròn có diện tích $\\pi R^2$.'],
      solution:
        '$S = \\pi R^2 \\cdot \\dfrac{n}{360} = \\dfrac{\\pi R^2 n}{360}$. Còn $\\dfrac{\\pi R n}{180}$ là độ dài cung.',
    },
    {
      type: 'number',
      prompt:
        'Một hình quạt tròn bán kính $5$ cm có độ dài cung $6$ cm. Tính diện tích hình quạt đó.',
      answer: 15,
      unit: 'cm²',
      hints: ['Không cần tìm số đo cung: dùng $S = \\dfrac{lR}{2}$.'],
      solution: '$S = \\dfrac{lR}{2} = \\dfrac{6 \\cdot 5}{2} = 15$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Trên đường tròn bán kính $10$ cm, một cung có độ dài $5\\pi$ cm. Tính số đo của cung đó.',
      answer: 90,
      unit: '°',
      hints: ['Giải $\\dfrac{\\pi \\cdot 10 \\cdot n}{180} = 5\\pi$ để tìm $n$.'],
      solution:
        '$\\dfrac{10\\pi n}{180} = 5\\pi \\Rightarrow n = \\dfrac{5 \\cdot 180}{10} = 90$. Cung có số đo $90^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Diện tích hình vành khuyên giới hạn bởi hai đường tròn $(O; 4\\text{ cm})$ và $(O; 2\\text{ cm})$ là',
      options: ['$4\\pi$ cm²', '$2\\pi$ cm²', '$12\\pi$ cm²', '$16\\pi$ cm²'],
      answer: 2,
      hints: [
        'Lấy diện tích hình tròn lớn trừ diện tích hình tròn nhỏ, không trừ bán kính trước rồi mới bình phương.',
      ],
      solution:
        '$S = \\pi(4^2 - 2^2) = 12\\pi$ cm². Đáp án $4\\pi$ sai vì đã tính $\\pi(4 - 2)^2$.',
    },
  ],
  takeaways: [
    'Độ dài cung $n^\\circ$: $l = \\dfrac{\\pi R n}{180}$.',
    'Diện tích hình quạt $n^\\circ$: $S = \\dfrac{\\pi R^2 n}{360} = \\dfrac{lR}{2}$.',
    'Diện tích hình vành khuyên: $S = \\pi\\left(R^2 - r^2\\right)$ với $R > r$.',
    'Cung hay hình quạt $n^\\circ$ đều chiếm $\\dfrac{n}{360}$ của cả đường tròn hay hình tròn.',
  ],
};
