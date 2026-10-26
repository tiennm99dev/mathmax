/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường trung bình của tam giác: định nghĩa, tính chất song song với cạnh thứ ba và bằng nửa cạnh đó, cách chứng minh bằng định lí Thalès và ứng dụng đo khoảng cách.',
  intro:
    'Hai điểm $B$ và $C$ nằm ở hai bờ một cái hồ, không thể căng thước đo thẳng từ $B$ sang $C$. Chỉ cần chọn một điểm $A$ trên bờ, đánh dấu trung điểm của $AB$ và $AC$ rồi đo khoảng cách giữa hai trung điểm, nhân đôi là ra $BC$. Bí quyết nằm ở đường trung bình của tam giác.',
  objectives: [
    'Nhận biết đường trung bình của tam giác.',
    'Phát biểu và chứng minh tính chất đường trung bình: song song với cạnh thứ ba và bằng nửa cạnh đó.',
    'Dùng tính chất đường trung bình để tính độ dài, số đo góc và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường trung bình của tam giác',
          text: 'Đường trung bình của tam giác là đoạn thẳng nối trung điểm hai cạnh của tam giác.',
        },
        {
          type: 'p',
          text: 'Cho tam giác $ABC$ với $M$, $N$, $P$ lần lượt là trung điểm của $AB$, $AC$, $BC$. Tam giác $ABC$ có ba đường trung bình: $MN$, $NP$ và $MP$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng nhầm với đường trung tuyến: trung tuyến nối một đỉnh với trung điểm cạnh đối diện, còn đường trung bình nối hai trung điểm.',
        },
      ],
    },
    {
      heading: 'Tính chất đường trung bình',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Đường trung bình của tam giác thì song song với cạnh thứ ba và bằng nửa cạnh đó.',
        },
        {
          type: 'tex',
          tex: 'MA = MB,\\; NA = NC \\;\\Rightarrow\\; MN \\parallel BC \\text{ và } MN = \\dfrac{1}{2}BC',
        },
        {
          type: 'p',
          text: 'Chứng minh định lí cho đường trung bình $MN$:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vì $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{1}{2}$ nên theo định lí Thalès đảo, $MN \\parallel BC$.',
            'Qua $N$ kẻ đường thẳng song song với $AB$, cắt $BC$ tại $P$. Theo định lí Thalès trong tam giác $ABC$: $\\dfrac{CP}{CB} = \\dfrac{CN}{CA} = \\dfrac{1}{2}$, nên $P$ là trung điểm của $BC$, tức $BP = \\dfrac{1}{2}BC$.',
            'Tứ giác $MNPB$ có $MN \\parallel BP$ và $NP \\parallel MB$ nên là hình bình hành, suy ra $MN = BP = \\dfrac{1}{2}BC$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Đường thẳng đi qua trung điểm một cạnh của tam giác và song song với cạnh thứ hai thì đi qua trung điểm cạnh thứ ba (suy ra ngay từ định lí Thalès với tỉ số $\\dfrac{1}{2}$).',
        },
        {
          type: 'p',
          text: 'Vì $MN \\parallel BC$ nên các cặp góc đồng vị bằng nhau: $\\widehat{AMN} = \\widehat{ABC}$ và $\\widehat{ANM} = \\widehat{ACB}$. Ba đường trung bình chia tam giác thành bốn tam giác nhỏ có ba cạnh lần lượt bằng nửa ba cạnh của tam giác lớn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh, đường trung bình vẫn song song',
    instruction:
      'Kéo ba đỉnh $A$, $B$, $C$ trên lưới ô vuông và chọn một đường trung bình. Dù tam giác thay đổi thế nào, cạnh song song với nó luôn dài gấp đôi, và hai góc đồng vị luôn bằng nhau.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ có $BC = 9$ cm. Gọi $M$, $N$ lần lượt là trung điểm của $AB$, $AC$. Tính $MN$.',
      steps: [
        '$M$, $N$ là trung điểm của $AB$, $AC$ nên $MN$ là đường trung bình của tam giác $ABC$.',
        'Theo tính chất đường trung bình: $MN = \\dfrac{1}{2}BC = \\dfrac{9}{2}$.',
      ],
      answer: '$MN = 4{,}5$ cm (và $MN \\parallel BC$).',
    },
    {
      problem:
        'Tam giác $ABC$ có $AB = 6$ cm, $AC = 8$ cm, $BC = 10$ cm. Gọi $M$, $N$, $P$ là trung điểm của $AB$, $AC$, $BC$. Tính chu vi tam giác $MNP$.',
      steps: [
        '$MN$, $NP$, $MP$ là ba đường trung bình nên $MN = \\dfrac{BC}{2} = 5$ cm, $NP = \\dfrac{AB}{2} = 3$ cm, $MP = \\dfrac{AC}{2} = 4$ cm.',
        'Chu vi tam giác $MNP$ là $5 + 3 + 4 = 12$ cm.',
      ],
      answer: 'Chu vi tam giác $MNP$ bằng $12$ cm, đúng bằng nửa chu vi tam giác $ABC$.',
    },
    {
      problem:
        'Để đo khoảng cách giữa hai điểm $B$, $C$ ở hai bờ một hồ nước, người ta chọn điểm $A$ trên bờ rồi xác định trung điểm $M$ của $AB$ và trung điểm $N$ của $AC$. Đo được $MN = 35$ m. Tính $BC$.',
      steps: [
        '$MN$ là đường trung bình của tam giác $ABC$.',
        'Do đó $MN = \\dfrac{1}{2}BC$, suy ra $BC = 2 \\cdot MN = 2 \\cdot 35$.',
      ],
      answer: '$BC = 70$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong tam giác $ABC$, đoạn thẳng nào là một đường trung bình?',
      options: [
        'Đoạn nối đỉnh $A$ với trung điểm của $BC$',
        'Đoạn nối trung điểm của $AB$ với trung điểm của $AC$',
        'Đoạn nối trung điểm của $AB$ với một điểm bất kì trên $AC$',
        'Đoạn vuông góc kẻ từ $A$ xuống $BC$',
      ],
      answer: 1,
      hints: ['Đường trung bình nối hai điểm đặc biệt trên hai cạnh.'],
      solution:
        'Đường trung bình nối trung điểm hai cạnh. Đoạn nối đỉnh với trung điểm cạnh đối là đường trung tuyến, đoạn vuông góc từ đỉnh là đường cao.',
    },
    {
      type: 'number',
      prompt: 'Một tam giác có bao nhiêu đường trung bình?',
      answer: 3,
      hints: ['Mỗi đường trung bình ứng với một cách chọn hai trong ba cạnh.'],
      solution:
        'Có ba cách chọn hai cạnh trong ba cạnh, nên tam giác có $3$ đường trung bình ($MN$, $NP$, $MP$).',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có $BC = 12$ cm; $M$, $N$ là trung điểm của $AB$, $AC$. Tính $MN$.',
      answer: 6,
      unit: 'cm',
      hints: ['$MN$ là đường trung bình ứng với cạnh $BC$.'],
      solution: '$MN = \\dfrac{1}{2}BC = \\dfrac{12}{2} = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $M$, $N$ là trung điểm của $AB$, $AC$ và $MN = 3{,}5$ cm. Tính $BC$.',
      answer: 7,
      unit: 'cm',
      hints: ['Đường trung bình bằng nửa cạnh thứ ba, nên cạnh thứ ba gấp đôi đường trung bình.'],
      solution: '$BC = 2 \\cdot MN = 2 \\cdot 3{,}5 = 7$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{ABC} = 65^\\circ$; $M$, $N$ là trung điểm của $AB$, $AC$. Tính số đo góc $AMN$ (độ).',
      answer: 65,
      unit: '°',
      hints: ['$MN \\parallel BC$.', 'Góc $AMN$ và góc $ABC$ ở vị trí đồng vị.'],
      solution:
        '$MN$ là đường trung bình nên $MN \\parallel BC$. Do đó $\\widehat{AMN} = \\widehat{ABC} = 65^\\circ$ (hai góc đồng vị).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 7$ cm, $AC = 9$ cm, $BC = 10$ cm. Tính chu vi tam giác tạo bởi ba đường trung bình.',
      answer: 13,
      unit: 'cm',
      hints: [
        'Mỗi cạnh của tam giác nhỏ là một đường trung bình, bằng nửa một cạnh của tam giác $ABC$.',
        'Chu vi tam giác nhỏ bằng nửa chu vi tam giác $ABC$.',
      ],
      solution:
        'Ba cạnh của tam giác nhỏ là $\\dfrac{7}{2}$, $\\dfrac{9}{2}$, $\\dfrac{10}{2}$ cm, nên chu vi bằng $\\dfrac{7 + 9 + 10}{2} = 13$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AC = 10$ cm, $M$ là trung điểm của $AB$. Đường thẳng qua $M$ song song với $BC$ cắt $AC$ tại $N$. Tính $AN$.',
      answer: 5,
      unit: 'cm',
      hints: [
        'Đường thẳng qua trung điểm một cạnh, song song với cạnh thứ hai thì đi qua trung điểm cạnh thứ ba.',
      ],
      solution:
        'Theo định lí Thalès $\\dfrac{AN}{AC} = \\dfrac{AM}{AB} = \\dfrac{1}{2}$, nên $N$ là trung điểm của $AC$ và $AN = \\dfrac{10}{2} = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có hai đường chéo $AC = 10$ cm và $BD = 8$ cm. Gọi $M$, $N$, $P$, $Q$ lần lượt là trung điểm của $AB$, $BC$, $CD$, $DA$. Tính chu vi tứ giác $MNPQ$.',
      answer: 18,
      unit: 'cm',
      hints: [
        '$MN$ là đường trung bình của tam giác $ABC$, $PQ$ là đường trung bình của tam giác $ACD$.',
        'Tương tự, $NP$ và $MQ$ là đường trung bình của các tam giác $BCD$ và $ABD$.',
      ],
      solution:
        '$MN = PQ = \\dfrac{AC}{2} = 5$ cm và $NP = MQ = \\dfrac{BD}{2} = 4$ cm. Chu vi tứ giác $MNPQ$ là $5 + 4 + 5 + 4 = 18$ cm.',
    },
  ],
  takeaways: [
    'Đường trung bình của tam giác nối trung điểm hai cạnh; mỗi tam giác có ba đường trung bình.',
    'Đường trung bình song song với cạnh thứ ba và bằng nửa cạnh đó: $MN \\parallel BC$, $MN = \\dfrac{1}{2}BC$.',
    'Đường thẳng qua trung điểm một cạnh, song song với cạnh thứ hai thì đi qua trung điểm cạnh thứ ba.',
    'Muốn đo một khoảng cách không đến được, đo đường trung bình rồi nhân đôi.',
  ],
};
